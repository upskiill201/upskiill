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

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    let existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const requestedRole = (dto as any).role || 'STUDENT';

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

        return this.signToken(
          existing.id,
          existing.email,
          existing.fullName,
          existing.role,
        );
      }

      throw new ForbiddenException('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        fullName: dto.fullName,
        role: requestedRole as Role,
      },
    });

    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Incorrect credentials');
    }

    const pwMatches = await bcrypt.compare(dto.password, user.password);

    if (!pwMatches) {
      throw new ForbiddenException('Incorrect credentials');
    }

    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  async firebaseSignIn(idToken: string, requestedRole: string) {
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
        const hash = await bcrypt.hash(Math.random().toString(36), salt);

        user = await this.prisma.user.create({
          data: {
            email,
            password: hash,
            fullName: name,
            role: requestedRole as Role,
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
