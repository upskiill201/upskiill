/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  ConflictException,
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
import { UserOnboardingService } from '../user-onboarding/user-onboarding.service';
import { getJwtSecret } from './jwt-secret.util';

// Precomputed once at boot — lets credential-miss paths burn the same bcrypt
// cost as a real check so response latency cannot probe for accounts.
const DUMMY_BCRYPT_HASH = bcrypt.hashSync('teyro-timing-equalizer', 12);

// Failed verify-code submissions allowed before the pending code is voided.
const MAX_VERIFY_ATTEMPTS = 5;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private profileService: ProfileService,
    private emailService: EmailService,
    private userOnboarding: UserOnboardingService,
  ) {}

  async signup(dto: SignupDto) {
    let existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { studentProfile: true },
    });

    const requestedRole = dto.role || 'STUDENT';

    if (existing) {
      // The bcrypt comparison runs ONLY on the two linking paths that act on
      // its result. Running it unconditionally let response timing separate
      // "account exists" from "no account" on paths that throw anyway (B9).
      const wantsInstructorUpgrade =
        requestedRole === 'INSTRUCTOR' &&
        (!existing.hasCreatorAccess || existing.role !== 'INSTRUCTOR');
      const wantsStudentLink = requestedRole === 'STUDENT' && !existing.hasStudentAccess;

      if (wantsInstructorUpgrade || wantsStudentLink) {
        const pwMatches = await bcrypt.compare(dto.password, existing.password);
        if (!pwMatches) {
          throw new ConflictException({
            statusCode: 409,
            code: 'EMAIL_ALREADY_EXISTS',
            message: wantsInstructorUpgrade
              ? 'An account with this email already exists. Enter your password to activate your Creator profile.'
              : 'An account with this email already exists. Enter your password to activate your Student profile.',
            canLink: true,
            isVerified: existing.isVerified,
          });
        }
      }

      if (wantsInstructorUpgrade) {
        // Upgrade account to INSTRUCTOR, set creator access flag
        existing = await this.prisma.user.update({
          where: { id: existing.id },
          data: { role: 'INSTRUCTOR', hasCreatorAccess: true },
          include: { studentProfile: true },
        });

        // Ensure creator profile row exists
        await this.prisma.profile.upsert({
          where: { userId: existing.id },
          create: { userId: existing.id },
          update: {},
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

        if (dto.onboarding) {
          try {
            await this.profileService.hydrateFromOnboarding(existing.id, dto.onboarding as any);
          } catch (err) {
            console.warn(`Profile hydration failed for linked user ${existing.id}:`, err);
          }
        }

        const hasBothRoles = existing.hasStudentAccess && existing.hasCreatorAccess;

        if (existing.isVerified) {
          const tokens = await this.signToken(existing.id, existing.email, existing.fullName, existing.role);
          return {
            ...tokens,
            hasBothRoles,
            linked: true,
            verified: true,
            message: 'Creator profile activated successfully',
          };
        } else {
          await this.resendVerification(existing.email);
          return {
            message: 'Account linked, but is not verified. Check your email.',
            userId: existing.id,
            requiresVerification: true,
          };
        }
      }

      if (wantsStudentLink) {
        // Enable student access on existing user
        existing = await this.prisma.user.update({
          where: { id: existing.id },
          data: { hasStudentAccess: true },
          include: { studentProfile: true },
        });

        // Ensure student profile row exists
        await this.prisma.studentProfile.upsert({
          where: { userId: existing.id },
          create: { userId: existing.id },
          update: {},
        });

        // The learner may have completed pre-signup steps (WhatsApp
        // verification, Step 9 challenge) before linking the account —
        // settle any pending proofs now. Best-effort, non-fatal.
        if (dto.onboarding) {
          try {
            await this.userOnboarding.applyPreSignupAnswers(existing.id, dto.onboarding);
          } catch (err) {
            console.warn(`Pre-signup answer reconciliation failed for linked user ${existing.id}:`, err);
          }
        }

        const hasBothRoles = existing.hasStudentAccess && existing.hasCreatorAccess;

        if (existing.isVerified) {
          const tokens = await this.signToken(existing.id, existing.email, existing.fullName, existing.role);
          return {
            ...tokens,
            hasBothRoles,
            linked: true,
            verified: true,
            message: 'Student profile activated successfully',
          };
        } else {
          await this.resendVerification(existing.email);
          return {
            message: 'Account linked, but is not verified. Check your email.',
            userId: existing.id,
            requiresVerification: true,
          };
        }
      }

      if (existing.isVerified) {
        throw new ConflictException({
          statusCode: 409,
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'An account with this email already exists.',
          canLink: false,
          isVerified: true,
        });
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

    // CSPRNG — Math.random is predictable, fatal for a 6-digit code space.
    const code = crypto.randomInt(100_000, 1_000_000).toString();
    const verifyToken = crypto.createHash('sha256').update(code).digest('hex');
    const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const isStudent = requestedRole === 'STUDENT';
    const isInstructor = requestedRole === 'INSTRUCTOR';

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        fullName: dto.fullName,
        role: requestedRole as Role,
        isVerified: false,
        verifyToken,
        tokenExpiry,
        hasStudentAccess: isStudent,
        hasCreatorAccess: isInstructor,
        profile: {
          create: {},
        },
        // Create StudentProfile row for student signups
        ...(isStudent ? { studentProfile: { create: {} } } : {}),
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

    // Students carry pre-signup proofs inside their onboarding answers:
    // WhatsApp verification (Step 6) and the deferred challenge reward
    // (Step 9). Settle both now that the account exists. Best-effort,
    // non-fatal — must never block the verification email below.
    if (dto.onboarding) {
      try {
        await this.userOnboarding.applyPreSignupAnswers(user.id, dto.onboarding);
      } catch (err) {
        console.warn(`Pre-signup answer reconciliation failed for user ${user.id}:`, err);
      }
    }

    // Send verification email
    await this.emailService.sendVerificationEmail(user.email, code, user.fullName, user.role, verifyToken);

    return { 
      message: 'Check your email to verify your account', 
      userId: user.id,
      requiresVerification: true 
    };
  }

  
  async forgotPassword(email: string, requestedRole?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Always return the same message to avoid email enumeration
    const message = { message: 'If that email exists, a reset link has been sent.' };

    if (!user) {
      return message;
    }

    // 1. Delete existing unused tokens
    await this.prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, used: false },
    });

    // 2. Generate raw token and hash it
    const plainToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(plainToken).digest('hex');
    
    // 3. Store in DB (expires in 30 minutes)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
        used: false,
      },
    });

    // Use requestedRole if provided, otherwise default to user's database role
    const roleForEmail = requestedRole || user.role;

    // 4. Send Email
    await this.emailService.sendPasswordResetEmail(user.email, plainToken, user.fullName.split(' ')[0], roleForEmail);

    return message;
  }

  async validateResetToken(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken) {
      return { valid: false, reason: 'invalid' };
    }

    if (resetToken.used) {
      return { valid: false, reason: 'used' };
    }

    if (new Date() > resetToken.expiresAt) {
      return { valid: false, reason: 'expired' };
    }

    return { valid: true };
  }

  async resetPassword(token: string, newPassword: string) {
    if (newPassword.length < 8) {
      throw new ConflictException('Password must be at least 8 characters long');
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken) {
      throw new ForbiddenException({ error: 'invalid_token' });
    }

    if (resetToken.used) {
      throw new ForbiddenException({ error: 'token_used' });
    }

    if (new Date() > resetToken.expiresAt) {
      throw new ForbiddenException({ error: 'token_expired' });
    }

    // Hash new password
    const hash = await bcrypt.hash(newPassword, 12);

    // Update user password and mark token as used
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ]);

    return { message: 'Password updated successfully' };
  }

  async login(dto: LoginDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (!user) {
      // Burn one bcrypt round so login latency can't reveal whether the
      // email exists.
      await this.dummyPasswordCompare(dto.password);
      throw new ForbiddenException('Incorrect credentials');
    }

    // Account status & soft-delete check
    if (user.deletedAt || user.accountStatus === 'SUSPENDED' || user.accountStatus === 'DELETED') {
      throw new ForbiddenException('Account is suspended or disabled');
    }

    // Account lock check
    const now = new Date();
    if (user.accountLockedUntil && now < user.accountLockedUntil) {
      throw new ForbiddenException(
        'Account is temporarily locked due to failed attempts. Try again later.',
      );
    }

    const pwMatches = await bcrypt.compare(dto.password, user.password);

    if (!pwMatches) {
      const newFailedAttempts = (user.failedLoginAttempts || 0) + 1;
      const shouldLock = newFailedAttempts >= 5;
      const lockTime = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: newFailedAttempts,
          ...(shouldLock
            ? { accountLockedUntil: lockTime, accountStatus: 'LOCKED' }
            : {}),
        },
      });

      throw new ForbiddenException('Incorrect credentials');
    }

    // Upgrade account to INSTRUCTOR if logged in via instructor portal
    if (dto.role === 'INSTRUCTOR' && user.role !== 'INSTRUCTOR') {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { role: 'INSTRUCTOR', hasCreatorAccess: true },
      });
    }

    if (!user.isVerified) {
      throw new ForbiddenException({
        message: 'Email not verified',
        requiresVerification: true,
        email: user.email,
      });
    }

    // Successful login tracking
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: now,
        loginCount: { increment: 1 },
        failedLoginAttempts: 0,
        accountLockedUntil: null,
        ...(user.accountStatus === 'LOCKED' ? { accountStatus: 'ACTIVE' } : {}),
      },
    });

    const hasBothRoles = user.hasStudentAccess && user.hasCreatorAccess;

    // Canonical post-login destination determined server-side from real DB profile flags.
    // This prevents the client from blindly redirecting to /dashboard regardless of role.
    let redirectTo = '/onboarding/0';
    if (hasBothRoles) {
      redirectTo = '/role-select';
    } else if (user.hasCreatorAccess) {
      redirectTo = '/creator';
    } else if (user.hasStudentAccess) {
      redirectTo = '/dashboard';
    }

    return {
      ...await this.signToken(user.id, user.email, user.fullName, user.role),
      hasBothRoles,
      redirectTo,
    };
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

    // `role` lets the controller route the post-verification redirect:
    // students land back in their flow (/dashboard), creators in studio.
    return { ...await this.signToken(user.id, user.email, user.fullName, user.role), role: user.role };
  }

  async verifyCode(email: string, code: string) {
    const hashedToken = crypto.createHash('sha256').update(code).digest('hex');

    // Look up by email alone — never filter on the token here, so every miss
    // flows through the same compare-and-count path (no existence oracle).
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { profile: true }
    });

    if (!user) {
      // No such account: burn comparable CPU so timing can't confirm it.
      await bcrypt.compare(code, DUMMY_BCRYPT_HASH);
      throw new ForbiddenException('Invalid verification code');
    }

    // Guess cap: five misses void the pending code; the learner must resend.
    if (user.verifyAttempts >= MAX_VERIFY_ATTEMPTS) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verifyToken: null, tokenExpiry: null, verifyAttempts: 0 },
      });
      throw new ForbiddenException(
        'Too many incorrect attempts. Please request a new code.',
      );
    }

    const stored = user.verifyToken;
    if (!stored || !this.timingSafeDigestEquals(stored, hashedToken)) {
      if (stored) {
        // Atomic so concurrent guesses all count toward the cap.
        await this.prisma.user.update({
          where: { id: user.id },
          data: { verifyAttempts: { increment: 1 } },
        });
      }
      throw new ForbiddenException('Invalid verification code');
    }

    if (user.tokenExpiry && new Date() > user.tokenExpiry) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verifyToken: null, tokenExpiry: null, verifyAttempts: 0 },
      });
      throw new ForbiddenException('Verification code expired');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        tokenExpiry: null,
        verifyAttempts: 0,
      },
    });

    const onboardingMock = {
      step11: { firstName: user.fullName.split(' ')[0] },
      step3: { categories: [user.profile?.niche || 'your topic'] },
    };

    await this.emailService.sendWelcomeEmail(user.email, onboardingMock);

    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  /**
   * Constant-time digest equality for fixed-width sha256 hex strings.
   * Falls back to a dummy digest when either side is missing/malformed so a
   * cleared or corrupt token still costs the same comparison as a real one.
   */
  private timingSafeDigestEquals(expectedHex: string, actualHex: string): boolean {
    const dummy = '0'.repeat(64);
    const expected = /^[0-9a-f]{64}$/.test(expectedHex) ? expectedHex : dummy;
    const actual = /^[0-9a-f]{64}$/.test(actualHex) ? actualHex : dummy;
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(actual, 'hex'));
  }

  /**
   * Burns one bcrypt comparison without touching any real credential —
   * equalizes login latency between existing and nonexistent accounts.
   */
  private async dummyPasswordCompare(password: string): Promise<void> {
    await bcrypt.compare(password, DUMMY_BCRYPT_HASH);
  }

  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new ForbiddenException('User not found');
    if (user.isVerified) throw new ForbiddenException('User is already verified');

    // CSPRNG — same reasoning as signup (B9).
    const code = crypto.randomInt(100_000, 1_000_000).toString();
    const hashedToken = crypto.createHash('sha256').update(code).digest('hex');
    const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verifyToken: hashedToken,
        tokenExpiry,
      },
    });

    await this.emailService.sendVerificationEmail(user.email, code, user.fullName, user.role, hashedToken);
    return { message: 'Verification email resent' };
  }

  async firebaseSignIn(
    idToken: string,
    requestedRole: string,
    draftId?: string,
    onboarding?: Record<string, unknown>,
  ) {
    try {
      // 1. Verify token with Firebase Admin
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      const email = decodedToken.email;
      const name = decodedToken.name || decodedToken.displayName || 'User';

      if (!email) {
        throw new UnauthorizedException('No email found in Firebase token');
      }

      const isInstructor = requestedRole === 'INSTRUCTOR';
      const isStudent = requestedRole === 'STUDENT';

      // 2. Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Create user with generic password since they use social login
        const salt = await bcrypt.genSalt(10);
        const randomPassword = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(randomPassword, salt);

        user = await this.prisma.user.create({
          data: {
            email,
            password: hash,
            fullName: name,
            role: requestedRole as Role,
            hasStudentAccess: isStudent,
            hasCreatorAccess: isInstructor,
            profile: {
              create: {
                avatarUrl: decodedToken.picture || null,
              },
            },
            ...(isStudent ? { studentProfile: { create: {} } } : {}),
          },
        });
      } else {
        // User exists — update role and access flags as needed
        const updates: any = {};
        if (isInstructor && user.role !== 'INSTRUCTOR') {
          updates.role = 'INSTRUCTOR';
          updates.hasCreatorAccess = true;
          // Ensure creator Profile row exists
          await this.prisma.profile.upsert({
            where: { userId: user.id },
            create: { userId: user.id, avatarUrl: decodedToken.picture || null },
            update: {},
          });
        }
        if (isStudent && !user.hasStudentAccess) {
          updates.hasStudentAccess = true;
          await this.prisma.studentProfile.upsert({
            where: { userId: user.id },
            create: { userId: user.id },
            update: {},
          });
        }
        if (Object.keys(updates).length > 0) {
          user = await this.prisma.user.update({
            where: { id: user.id },
            data: updates,
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

      // Google sign-ins from the student onboarding flow carry pre-signup
      // proofs in their answers (WhatsApp verification, deferred challenge
      // reward). Settle both now. Best-effort, non-fatal.
      if (onboarding) {
        try {
          await this.userOnboarding.applyPreSignupAnswers(user.id, onboarding);
        } catch (err) {
          console.warn(`Pre-signup answer reconciliation failed for user ${user.id}:`, err);
        }
      }

      const hasBothRoles = user.hasStudentAccess && user.hasCreatorAccess;
      return {
        ...await this.signToken(user.id, user.email, user.fullName, user.role),
        hasBothRoles,
      };
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
    const userRow = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { hasCreatorAccess: true, hasStudentAccess: true },
    });

    const payload = {
      sub: userId,
      email,
      role,
      hasCreatorAccess: userRow?.hasCreatorAccess ?? false,
      hasStudentAccess: userRow?.hasStudentAccess ?? false,
    };
    const secret = getJwtSecret();

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

  /**
   * Issues a new JWT with a different role for dual-role users.
   * Called by POST /auth/switch-role.
   */
  async switchRole(userId: string, targetRole: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ForbiddenException('User not found');
    if (!user.hasStudentAccess && !user.hasCreatorAccess) {
      throw new ForbiddenException('Insufficient access');
    }

    const roleEnum = targetRole.toUpperCase();
    if (roleEnum === 'INSTRUCTOR' && !user.hasCreatorAccess) {
      throw new ForbiddenException('No creator profile found for this account');
    }
    if (roleEnum === 'STUDENT' && !user.hasStudentAccess) {
      throw new ForbiddenException('No student profile found for this account');
    }

    // Update the stored role so future logins default to the switched role
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { role: roleEnum as Role },
    });

    return this.signToken(updated.id, updated.email, updated.fullName, updated.role);
  }

  async getMyEnrollments(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: {
        // Optional: sort by enrollment creation date instead
        id: 'desc',
      },
    });

    if (enrollments.length === 0) return [];

    // Real per-course lesson totals in ONE grouped query (no N+1) — the
    // My Learning page renders "LESSON x / total" from this instead of a
    // hardcoded 25.
    const courseIds = enrollments.map((e) => e.courseId);
    const sections = await this.prisma.section.findMany({
      where: { courseId: { in: courseIds } },
      select: { courseId: true, _count: { select: { lessons: true } } },
    });
    const lessonsByCourse = new Map<string, number>();
    for (const s of sections) {
      lessonsByCourse.set(
        s.courseId,
        (lessonsByCourse.get(s.courseId) ?? 0) + s._count.lessons,
      );
    }

    return enrollments.map((enrollment) => ({
      ...enrollment,
      course: {
        ...enrollment.course,
        totalLessons: lessonsByCourse.get(enrollment.courseId) ?? 0,
      },
    }));
  }
}
