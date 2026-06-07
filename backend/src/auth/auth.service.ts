/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { firebaseAdmin } from './firebase-admin';
import { Role } from '@prisma/client';
import * as crypto from 'crypto';
import { ProfileService } from '../profile/profile.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private profileService: ProfileService,
    private emailService: EmailService,
  ) {}

  async signup(dto: SignupDto) {
    let existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const requestedRole = dto.role || 'STUDENT';

    if (existing) {
      if (requestedRole === 'INSTRUCTOR' && existing.role !== 'INSTRUCTOR') {
        const pwMatches = await bcrypt.compare(dto.password, existing.password);
        if (!pwMatches) {
          throw new ForbiddenException('Incorrect credentials');
        }

        // Upgrade account to INSTRUCTOR
        existing = await this.prisma.user.update({
          where: { id: existing.id },
          data: { role: 'INSTRUCTOR' },
        });

        if (dto.draftId) {
          try {
            await this.prisma.creatorOnboardingDraft.update({
              where: { id: dto.draftId },
              data: { userId: existing.id },
            });
          } catch (err) {
            console.warn(`Could not link draft ${dto.draftId} to existing user ${existing.id}:`, err);
          }
        }

        return this.signToken(
          existing.id,
          existing.email,
          existing.fullName,
          existing.role,
        );
      }

      if (existing.isVerified) {
        throw new import('@nestjs/common').ConflictException('Email already in use');
      } else {
        // Idempotent: User exists but not verified, resend email
        await this.resendVerification(existing.email);
        return {
          message: 'Account exists but is not verified. Check your email.',
          userId: existing.id,
          requiresVerification: true,
        };
      }
    }

    const hash = await bcrypt.hash(dto.password, 12);

    const plainToken = crypto.randomBytes(32).toString('hex');
    const verifyToken = crypto.createHash('sha256').update(plainToken).digest('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        fullName: dto.fullName,
        role: requestedRole as Role,
        isVerified: false,
        verifyToken,
        tokenExpiry,
        profile: {
          create: {},
        },
      },
    });

    if (dto.draftId) {
      try {
        await this.prisma.creatorOnboardingDraft.update({
          where: { id: dto.draftId },
          data: { userId: user.id },
        });
      } catch (err) {
        console.warn(`Could not link draft ${dto.draftId} to user ${user.id}:`, err);
      }
    }

    // Hydrate the creator profile from onboarding answers if provided
    if (dto.onboarding && requestedRole === 'INSTRUCTOR') {
      try {
        await this.profileService.hydrateFromOnboarding(user.id, dto.onboarding as any);
      } catch (err) {
        console.warn(`Profile hydration failed for user ${user.id}:`, err);
        // Non-fatal — profile can be completed later from the settings page
      }
    }

    // Send verification email
    await this.emailService.sendVerificationEmail(user.email, plainToken);

    return { 
      message: 'Check your email to verify your account', 
      userId: user.id,
      requiresVerification: true 
    };
  }

  async login(dto: LoginDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Incorrect credentials');
    }

    const pwMatches = await bcrypt.compare(dto.password, user.password);

    if (!pwMatches) {
      throw new ForbiddenException('Incorrect credentials');
    }

    // Upgrade account to INSTRUCTOR if they logged in via the instructor portal
    // and aren't an instructor yet
    if (dto.role === 'INSTRUCTOR' && user.role !== 'INSTRUCTOR') {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { role: 'INSTRUCTOR' },
      });
    }

    if (!user.isVerified) {
      throw new ForbiddenException({
        message: 'Email not verified',
        requiresVerification: true,
        email: user.email,
      });
    }

    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  async verifyEmail(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await this.prisma.user.findUnique({
      where: { verifyToken: hashedToken },
      include: { profile: true }
    });

    if (!user) {
      throw new ForbiddenException('Invalid verification token');
    }

    if (user.tokenExpiry && new Date() > user.tokenExpiry) {
      throw new ForbiddenException('Verification token expired');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        tokenExpiry: null,
      },
    });

    // We hydrated onboarding answers into the profile during signup
    // So we can extract the category from the profile for the welcome email
    const onboardingMock = {
      step11: { firstName: user.fullName.split(' ')[0] },
      step3: { categories: [user.profile?.niche || 'your topic'] },
    };

    await this.emailService.sendWelcomeEmail(user.email, onboardingMock);

    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new ForbiddenException('User not found');
    if (user.isVerified) throw new ForbiddenException('User is already verified');

    const plainToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(plainToken).digest('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verifyToken: hashedToken,
        tokenExpiry,
      },
    });

    await this.emailService.sendVerificationEmail(user.email, plainToken);
    return { message: 'Verification email resent' };
  }

  async firebaseSignIn(
    idToken: string,
    requestedRole: string,
    draftId?: string,
  ) {
    try {
      // 1. Verify token with Firebase Admin
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      const email = decodedToken.email;
      const name = decodedToken.name || decodedToken.displayName || 'User';

      if (!email) {
        throw new UnauthorizedException('No email found in Firebase token');
      }

      // 2. Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Create user with generic password since they use social login
        // Also assign them the role they requested when signing up via social
        const salt = await bcrypt.genSalt(10);
        const randomPassword = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(randomPassword, salt);

        user = await this.prisma.user.create({
          data: {
            email,
            password: hash,
            fullName: name,
            role: requestedRole as Role,
            profile: {
              create: {
                avatarUrl: decodedToken.picture || null,
              },
            },
          },
        });
      } else {
        // User exists! If they are logging into the instructor portal, upgrade them!
        if (requestedRole === 'INSTRUCTOR' && user.role !== 'INSTRUCTOR') {
          user = await this.prisma.user.update({
            where: { id: user.id },
            data: { role: 'INSTRUCTOR' },
          });
        }
      }

      // Link onboarding draft if provided
      if (draftId) {
        try {
          await this.prisma.creatorOnboardingDraft.update({
            where: { id: draftId },
            data: { userId: user.id },
          });
        } catch (err) {
          console.warn(`Could not link draft ${draftId} to user ${user.id}:`, err);
        }
      }

      // 3. Issue the standard JWT session token
      return this.signToken(user.id, user.email, user.fullName, user.role);
    } catch (error: any) {
      throw new UnauthorizedException(
        'Invalid Firebase Token: ' + error.message,
      );
    }
  }

  async signToken(
    userId: string,
    email: string,
    fullName: string,
    role: string,
  ) {
    const payload = { sub: userId, email, role };
    const secret = process.env.JWT_SECRET || 'super-secret-upskiill-key-2024';

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: secret,
    });

    return {
      access_token: token,
      user: {
        id: userId,
        email,
        fullName,
        role,
      },
    };
  }

  async getMyEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: {
        // Optional: sort by enrollment creation date instead
        id: 'desc',
      },
    });
  }
}
