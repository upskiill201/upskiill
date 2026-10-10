/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import {
  ForbiddenException,
  HttpException,
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
import { AuthEmailService } from '../email/auth-email.service';
import { UserOnboardingService } from '../user-onboarding/user-onboarding.service';
import { getJwtSecret } from './jwt-secret.util';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
    private authEmails: AuthEmailService,
    private userOnboarding: UserOnboardingService,
    private events: EventEmitter2,
  ) {}

  /** Tells the earnings module someone became a creator (Founding programme). Idempotent. */
  private markCreatorJoined(userId: string) {
    this.events.emit('creator.joined', { userId });
  }

  async signup(dto: SignupDto) {
    let existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { studentProfile: true },
    });

    // Security: self-service signups may only ever create STUDENT or INSTRUCTOR
    // accounts — ADMIN is never a client-selectable role.
    const requestedRole =
      dto.role === Role.INSTRUCTOR ? Role.INSTRUCTOR : Role.STUDENT;

    if (existing) {
      // The bcrypt comparison runs ONLY on the two linking paths that act on
      // its result. Running it unconditionally let response timing separate
      // "account exists" from "no account" on paths that throw anyway (B9).
      const wantsInstructorUpgrade =
        requestedRole === 'INSTRUCTOR' &&
        existing.role !== Role.ADMIN &&
        (!existing.hasCreatorAccess || existing.role !== 'INSTRUCTOR');
      const wantsStudentLink =
        requestedRole === 'STUDENT' && !existing.hasStudentAccess;

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

        this.markCreatorJoined(existing.id);

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
            console.warn(
              `Could not link draft ${dto.draftId} to existing user ${existing.id}:`,
              err,
            );
          }
        }

        if (dto.onboarding) {
          try {
            await this.profileService.hydrateFromOnboarding(
              existing.id,
              dto.onboarding as any,
            );
          } catch (err) {
            console.warn(
              `Profile hydration failed for linked user ${existing.id}:`,
              err,
            );
          }
        }

        const hasBothRoles =
          existing.hasStudentAccess && existing.hasCreatorAccess;

        if (existing.isVerified) {
          const tokens = await this.signToken(
            existing.id,
            existing.email,
            existing.fullName,
            existing.role,
          );
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
            await this.userOnboarding.applyPreSignupAnswers(
              existing.id,
              dto.onboarding,
            );
          } catch (err) {
            console.warn(
              `Pre-signup answer reconciliation failed for linked user ${existing.id}:`,
              err,
            );
          }
        }

        const hasBothRoles =
          existing.hasStudentAccess && existing.hasCreatorAccess;

        if (existing.isVerified) {
          const tokens = await this.signToken(
            existing.id,
            existing.email,
            existing.fullName,
            existing.role,
          );
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
        console.warn(
          `Could not link draft ${dto.draftId} to user ${user.id}:`,
          err,
        );
      }
    }

    if (requestedRole === 'INSTRUCTOR') this.markCreatorJoined(user.id);

    // Hydrate the creator profile from onboarding answers if provided
    if (dto.onboarding && requestedRole === 'INSTRUCTOR') {
      try {
        await this.profileService.hydrateFromOnboarding(
          user.id,
          dto.onboarding as any,
        );
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
        await this.userOnboarding.applyPreSignupAnswers(
          user.id,
          dto.onboarding,
        );
      } catch (err) {
        console.warn(
          `Pre-signup answer reconciliation failed for user ${user.id}:`,
          err,
        );
      }
    }

    // Send verification email — the magic link is built from the RAW code so
    // verifyEmail()'s single sha256 matches the stored hash (sending the
    // stored hash made the link double-hash and never verify).
    // Not awaited-to-block: the response returns as soon as this call is
    // issued, the send itself still happens immediately in the background.
    void this.authEmails.sendVerificationEmail(
      user.email,
      code,
      user.fullName,
      user.role,
      user.id,
      tokenExpiry.getTime().toString(),
    );

    return {
      message: 'Check your email to verify your account',
      userId: user.id,
      requiresVerification: true,
    };
  }

  async forgotPassword(email: string, requestedRole?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Always return the same message to avoid email enumeration
    const message = {
      message: 'If that email exists, a reset link has been sent.',
    };

    if (!user) {
      return message;
    }

    // 1. Delete existing unused tokens
    await this.prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, used: false },
    });

    // 2. Generate raw token and hash it
    const plainToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(plainToken)
      .digest('hex');

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

    // 4. Send Email — not awaited-to-block, see sendVerificationEmail above.
    void this.authEmails.sendPasswordResetEmail(
      user.email,
      plainToken,
      user.fullName.split(' ')[0],
      roleForEmail,
      user.id,
    );

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
      throw new ConflictException(
        'Password must be at least 8 characters long',
      );
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
    if (
      user.deletedAt ||
      user.accountStatus === 'SUSPENDED' ||
      user.accountStatus === 'DELETED'
    ) {
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

    // Upgrade account to INSTRUCTOR if logged in via instructor portal —
    // never for an ADMIN, whose role already supersedes INSTRUCTOR and must
    // never be silently overwritten by a creator-portal login.
    if (
      dto.role === 'INSTRUCTOR' &&
      user.role !== 'INSTRUCTOR' &&
      user.role !== Role.ADMIN
    ) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { role: 'INSTRUCTOR', hasCreatorAccess: true },
      });
      this.markCreatorJoined(user.id);
    } else if (
      dto.role === 'INSTRUCTOR' &&
      user.role === Role.ADMIN &&
      !user.hasCreatorAccess
    ) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { hasCreatorAccess: true },
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
      ...(await this.signToken(user.id, user.email, user.fullName, user.role)),
      hasBothRoles,
      redirectTo,
    };
  }

  async verifyEmail(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await this.prisma.user.findUnique({
      where: { verifyToken: hashedToken },
      include: { profile: true },
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

    void this.authEmails.sendWelcomeEmail(user.email, user.fullName, user.id);

    // `role` lets the controller route the post-verification redirect:
    // students land back in their flow (/dashboard), creators in studio.
    return {
      ...(await this.signToken(user.id, user.email, user.fullName, user.role)),
      role: user.role,
    };
  }

  async verifyCode(email: string, code: string) {
    const hashedToken = crypto.createHash('sha256').update(code).digest('hex');

    // Look up by email alone — never filter on the token here, so every miss
    // flows through the same compare-and-count path (no existence oracle).
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { profile: true },
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

    void this.authEmails.sendWelcomeEmail(user.email, user.fullName, user.id);

    return this.signToken(user.id, user.email, user.fullName, user.role);
  }

  /**
   * Constant-time digest equality for fixed-width sha256 hex strings.
   * Falls back to a dummy digest when either side is missing/malformed so a
   * cleared or corrupt token still costs the same comparison as a real one.
   */
  private timingSafeDigestEquals(
    expectedHex: string,
    actualHex: string,
  ): boolean {
    const dummy = '0'.repeat(64);
    const expected = /^[0-9a-f]{64}$/.test(expectedHex) ? expectedHex : dummy;
    const actual = /^[0-9a-f]{64}$/.test(actualHex) ? actualHex : dummy;
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(actual, 'hex'),
    );
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
    if (user.isVerified)
      throw new ForbiddenException('User is already verified');

    // Anti-spam cooldown: every signup attempt against an unverified account
    // funnels here, so rapid retries used to fire an email each time until the
    // IP throttle kicked in. tokenExpiry is mintTime + 10 min — if less than a
    // minute has passed since minting, the previous email is still fresh.
    const mintedAtMs = user.tokenExpiry
      ? user.tokenExpiry.getTime() - 10 * 60 * 1000
      : 0;
    if (user.verifyToken && Date.now() - mintedAtMs < 60_000) {
      return {
        message: 'A verification email was just sent — check your inbox.',
        recentlySent: true,
      };
    }

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

    void this.authEmails.sendVerificationEmail(
      user.email,
      code,
      user.fullName,
      user.role,
      user.id,
      tokenExpiry.getTime().toString(),
    );
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

      // Security: account linking below matches users by email claim, so an
      // unverified provider email could take over an existing password account.
      if (decodedToken.email_verified !== true) {
        throw new UnauthorizedException(
          'Your email address is not verified with your sign-in provider. Verify it and try again.',
        );
      }

      // Security: ADMIN is not a self-service role — clamp to STUDENT/INSTRUCTOR.
      const safeRole =
        requestedRole === Role.INSTRUCTOR ? Role.INSTRUCTOR : Role.STUDENT;
      const isInstructor = safeRole === Role.INSTRUCTOR;
      const isStudent = !isInstructor;

      // 2. Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      // Hydration only fires when onboarding JUST completed for a creator
      // account that didn't have one before — never re-hydrate an existing
      // creator's profile (their settings-page edits would be clobbered by
      // stale localStorage answers).
      const hadCreatorAccess = user?.hasCreatorAccess ?? false;

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
            role: safeRole,
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
        // User exists — update role and access flags as needed. Never
        // downgrade an ADMIN to INSTRUCTOR just because they signed in
        // through a creator-facing path — ADMIN already supersedes it.
        const updates: any = {};
        if (
          isInstructor &&
          user.role !== 'INSTRUCTOR' &&
          user.role !== Role.ADMIN
        ) {
          updates.role = 'INSTRUCTOR';
          updates.hasCreatorAccess = true;
          this.markCreatorJoined(user.id);
          // Ensure creator Profile row exists
          await this.prisma.profile.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              avatarUrl: decodedToken.picture || null,
            },
            update: {},
          });
        } else if (
          isInstructor &&
          user.role === Role.ADMIN &&
          !user.hasCreatorAccess
        ) {
          updates.hasCreatorAccess = true;
          await this.prisma.profile.upsert({
            where: { userId: user.id },
            create: {
              userId: user.id,
              avatarUrl: decodedToken.picture || null,
            },
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
          console.warn(
            `Could not link draft ${draftId} to user ${user.id}:`,
            err,
          );
        }
      }

      // Google sign-ins from the student onboarding flow carry pre-signup
      // proofs in their answers (WhatsApp verification, deferred challenge
      // reward). Settle both now. Best-effort, non-fatal.
      if (onboarding) {
        try {
          await this.userOnboarding.applyPreSignupAnswers(user.id, onboarding);
        } catch (err) {
          console.warn(
            `Pre-signup answer reconciliation failed for user ${user.id}:`,
            err,
          );
        }
      }

      // Hydrate the creator profile from onboarding answers — mirrors the
      // email signup path. Non-fatal: the profile can be completed later
      // from the settings page.
      if (onboarding && isInstructor && !hadCreatorAccess) {
        try {
          await this.profileService.hydrateFromOnboarding(user.id, onboarding);
        } catch (err) {
          console.warn(`Profile hydration failed for user ${user.id}:`, err);
        }
      }

      const hasBothRoles = user.hasStudentAccess && user.hasCreatorAccess;
      return {
        ...(await this.signToken(
          user.id,
          user.email,
          user.fullName,
          user.role,
        )),
        hasBothRoles,
      };
    } catch (error: any) {
      // Business-rule rejections (unverified email, missing email claim) must
      // reach the client intact — only wrap genuine token-verification failures.
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException(
        'Invalid Firebase Token: ' + error.message,
      );
    }
  }

  /**
   * Sliding session: a learner who keeps opening the app stays signed in.
   * The token lives 7 days; once the one in use is over a day old, /auth/me
   * hands back a fresh 7-day one. Only someone away a full week has to sign
   * in again. Returns null when the current token is still fresh.
   */
  async refreshTokenIfStale(
    currentToken: string | undefined,
    user: { id: string; email: string; fullName?: string | null; role: string },
  ): Promise<string | null> {
    if (!currentToken) return null;
    const decoded = this.jwt.decode(currentToken) as { iat?: number } | null;
    const issuedAtMs = decoded?.iat ? decoded.iat * 1000 : 0;
    if (Date.now() - issuedAtMs < 24 * 60 * 60 * 1000) return null;
    const { access_token } = await this.signToken(user.id, user.email, user.fullName ?? '', user.role);
    return access_token;
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

    const roleEnum =
      typeof targetRole === 'string' ? targetRole.toUpperCase() : '';

    // Security: role switching is only ever STUDENT <-> INSTRUCTOR between
    // profiles the account already owns. Anything else — most importantly
    // ADMIN — is never a valid self-service target.
    if (roleEnum !== Role.INSTRUCTOR && roleEnum !== Role.STUDENT) {
      throw new ForbiddenException('Invalid role target');
    }
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

    return this.signToken(
      updated.id,
      updated.email,
      updated.fullName,
      updated.role,
    );
  }

  /**
   * Adds a creator profile to the signed-in account (the learner app's
   * "Become a creator", and creator onboarding for anyone already signed in).
   *
   * The session proves who this is, so unlike the sign-up / login upgrade
   * paths no password is asked for. Grants creator access, makes INSTRUCTOR
   * the active role (an ADMIN keeps ADMIN), ensures the Profile row, saves
   * the onboarding answers onto it and reissues the session token.
   * Idempotent: an existing creator just gets their answers saved.
   */
  async becomeCreator(userId: string, onboarding?: Record<string, unknown>) {
    let user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Please sign in again.');

    const needsRole = user.role !== Role.INSTRUCTOR && user.role !== Role.ADMIN;
    if (!user.hasCreatorAccess || needsRole) {
      user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          hasCreatorAccess: true,
          ...(needsRole ? { role: Role.INSTRUCTOR } : {}),
        },
      });
    }

    this.markCreatorJoined(userId);

    await this.prisma.profile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    if (onboarding) {
      try {
        await this.profileService.hydrateFromOnboarding(userId, onboarding);
      } catch (err) {
        // The studio still opens; the answers can be filled in from the profile.
        console.warn(`Profile hydration failed for user ${userId}:`, err);
      }
    }

    return {
      ...(await this.signToken(user.id, user.email, user.fullName, user.role)),
      hasBothRoles: user.hasStudentAccess && user.hasCreatorAccess,
      redirectTo: '/creator',
    };
  }

  async getMyEnrollments(userId: string) {
    // Trimmed from `include: { course: true }` (the entire Course row —
    // curriculum Json, description @db.Text, skills/requirements/outcomes
    // Json, etc.) to only the fields the three student-side consumers of
    // this endpoint actually render (dashboard, my-learning, courses/[id]
    // detail page, explore page — all grepped and confirmed). This endpoint
    // is called from three different pages per session.
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      select: {
        id: true,
        courseId: true,
        progress: true,
        completedLessons: true,
        course: {
          select: {
            id: true,
            slug: true,
            title: true,
            category: true,
            level: true,
            shortDescription: true,
            subtitle: true,
            thumbnailUrl: true,
          },
        },
      },
      orderBy: {
        // Most recently STUDIED first (bumped by @updatedAt on every lesson
        // completion), not most recently enrolled — otherwise enrolling in a
        // second course instantly buries the one the student is actually
        // partway through on the dashboard's "Your Journey" card.
        updatedAt: 'desc',
      },
    });

    if (enrollments.length === 0) return [];

    // Every course's section → published-lesson order in ONE query (no N+1).
    // It gives two things:
    //  - real lesson totals ("LESSON x / total" instead of a hardcoded 25);
    //  - `nextLesson`, so the home screen can send the learner straight to
    //    their next lesson on the map without first loading the whole course.
    //
    // The ordering here MUST match what the learner sees on the map:
    // `CourseService.findOne` returns every section by `orderIndex` and, for
    // students, only published lessons by `orderIndex`. `sectionIndex` is the
    // section's position in that full list, because that is exactly what the
    // /learn/[id]/section/[sectionIndex] route indexes into.
    const courseIds = enrollments.map((e) => e.courseId);
    const sections = await this.prisma.section.findMany({
      where: { courseId: { in: courseIds } },
      orderBy: { orderIndex: 'asc' },
      select: {
        courseId: true,
        title: true,
        lessons: {
          where: { status: 'published' },
          orderBy: { orderIndex: 'asc' },
          select: { id: true, title: true },
        },
      },
    });

    const sectionsByCourse = new Map<string, typeof sections>();
    for (const s of sections) {
      const list = sectionsByCourse.get(s.courseId) ?? [];
      list.push(s);
      sectionsByCourse.set(s.courseId, list);
    }

    return enrollments.map((enrollment) => {
      const courseSections = sectionsByCourse.get(enrollment.courseId) ?? [];
      const done = new Set(
        Array.isArray(enrollment.completedLessons)
          ? (enrollment.completedLessons as unknown[]).filter(
              (id): id is string => typeof id === 'string',
            )
          : [],
      );

      let totalLessons = 0;
      // Counted against PUBLISHED lessons, from the same `completedLessons`
      // the map reads — not from the stored `progress` %, which can drift
      // from it (seeded data shows 64% with an empty array). Home and the
      // map must never disagree about where the learner is.
      let completedCount = 0;
      let nextLesson: {
        id: string;
        title: string;
        sectionIndex: number;
        sectionTitle: string;
        /** 1-based position across the whole course, for "Lesson 4 of 25". */
        number: number;
      } | null = null;

      courseSections.forEach((section, sectionIndex) => {
        for (const lesson of section.lessons) {
          totalLessons += 1;
          if (done.has(lesson.id)) completedCount += 1;
          if (!nextLesson && !done.has(lesson.id)) {
            nextLesson = {
              id: lesson.id,
              title: lesson.title,
              sectionIndex,
              sectionTitle: section.title,
              number: totalLessons,
            };
          }
        }
      });

      return {
        ...enrollment,
        // null when every published lesson is done — the course is finished,
        // or has no published lessons yet. Never guessed.
        nextLesson,
        completedCount,
        course: { ...enrollment.course, totalLessons },
      };
    });
  }
}
