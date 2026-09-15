import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ProfileService } from '../profile/profile.service';
import { EmailService } from '../email/email.service';
import { UserOnboardingService } from '../user-onboarding/user-onboarding.service';
import { firebaseAdmin } from './firebase-admin';
import { Role } from '@prisma/client';

// signToken hard-fails when JWT_SECRET is unset (A2) — give every test a value.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';

jest.mock('bcrypt');
jest.mock('./firebase-admin', () => ({
  firebaseAdmin: {
    auth: jest.fn().mockReturnValue({
      verifyIdToken: jest.fn(),
    }),
  },
}));

// signToken reads JWT_SECRET directly (no committed fallback) — supply one for tests
process.env.JWT_SECRET ||= 'test-jwt-secret';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;
  let emailService: EmailService;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            enrollment: {
              findMany: jest.fn(),
            },
            section: {
              findMany: jest.fn(),
            },
            creatorOnboardingDraft: {
              update: jest.fn(),
            },
            profile: {
              upsert: jest.fn(),
            },
            studentProfile: {
              upsert: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mocked-jwt-token'),
          },
        },
        {
          provide: ProfileService,
          useValue: {
            hydrateFromOnboarding: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendVerificationEmail: jest.fn(),
            sendWelcomeEmail: jest.fn(),
            sendPasswordResetEmail: jest.fn(),
          },
        },
        {
          provide: UserOnboardingService,
          useValue: {
            applyPreSignupAnswers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
    emailService = module.get<EmailService>(EmailService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    const dto = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    };

    it('should successfully sign up a new STUDENT user and require email verification', async () => {
      const mockUser = { id: '1', ...dto, role: 'STUDENT' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.signup(dto);

      // Duplicate-account probe includes the student relation for link decisions
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
        include: { studentProfile: true },
      });
      // Fixed work factor — no separate salt lookup anymore
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 12);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: dto.email,
          password: 'hashedPassword',
          fullName: dto.fullName,
          role: 'STUDENT',
          isVerified: false,
          hasStudentAccess: true,
          hasCreatorAccess: false,
          profile: { create: {} },
          studentProfile: { create: {} },
        }),
      });
      // Verification email goes out; no JWT until the account is verified
      expect(emailService.sendVerificationEmail).toHaveBeenCalled();
      expect(jwt.signAsync).not.toHaveBeenCalled();
      // The email builds its magic link from the RAW code — no stored hash
      // may be passed (that double-hash made link verification impossible)
      expect((emailService.sendVerificationEmail as jest.Mock).mock.calls[0]).toHaveLength(4);
      expect(result).toEqual({
        message: 'Check your email to verify your account',
        userId: '1',
        requiresVerification: true,
      });
    });

    it('should successfully link creatorOnboardingDraft to user if draftId is provided', async () => {
      const dtoWithDraft = { ...dto, draftId: 'draft-123' };
      const mockUser = { id: '1', ...dto, role: 'STUDENT' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (prisma.creatorOnboardingDraft.update as jest.Mock).mockResolvedValue({});

      await service.signup(dtoWithDraft);

      expect(prisma.creatorOnboardingDraft.update).toHaveBeenCalledWith({
        where: { id: 'draft-123' },
        data: { userId: mockUser.id },
      });
    });

    it('should hydrate the creator profile from onboarding answers on INSTRUCTOR signup', async () => {
      // The role must be the Prisma Role enum, not a bare string, or this
      // object no longer satisfies SignupDto and the file fails to typecheck.
      const instructorDto = { ...dto, role: Role.INSTRUCTOR, draftId: 'draft-1' };
      const onboarding = {
        step7: { biggestChallenge: ['not_enough_time'] },
        step3: { categories: ['Marketing'] },
      };
      const mockUser = { id: '2', ...instructorDto, password: 'hashedPassword', role: 'INSTRUCTOR' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      await service.signup({ ...instructorDto, onboarding });

      // The array-shaped step7 used to throw inside hydration and get
      // swallowed — every answer was lost. It must reach the profile service.
      expect(profileService.hydrateFromOnboarding).toHaveBeenCalledWith('2', onboarding);
    });

    it('should successfully sign up a new INSTRUCTOR user and require email verification', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' as any };
      const mockUser = { id: '1', ...dtoWithRole };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.signup(dtoWithRole);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: dto.email,
          password: 'hashedPassword',
          fullName: dto.fullName,
          role: 'INSTRUCTOR',
          isVerified: false,
          hasStudentAccess: false,
          hasCreatorAccess: true,
          profile: { create: {} },
        }),
      });
      expect((result as any).requiresVerification).toBe(true);
    });

    it('should clamp an ADMIN role request down to STUDENT — self-service never grants ADMIN', async () => {
      const dtoWithAdminRole = { ...dto, role: 'ADMIN' as any };
      const mockUser = { id: '1', ...dto };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      await service.signup(dtoWithAdminRole);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          role: 'STUDENT',
          hasStudentAccess: true,
          hasCreatorAccess: false,
        }),
      });
    });

    it('should throw ConflictException when a verified account already exists (no linking)', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: '1',
        email: dto.email,
        password: 'oldHashedPassword',
        role: 'STUDENT',
        isVerified: true,
        hasStudentAccess: true,
        hasCreatorAccess: false,
      });

      await expect(service.signup(dto)).rejects.toThrow(ConflictException);
      await expect(service.signup(dto)).rejects.toThrow('An account with this email already exists.');
    });

    it('should throw ConflictException asking for the password when upgrading to INSTRUCTOR with wrong credentials', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' as any };
      const existingUser = {
        id: '1',
        email: dto.email,
        password: 'oldHashedPassword',
        role: 'STUDENT',
        isVerified: true,
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signup(dtoWithRole)).rejects.toThrow(ConflictException);
      await expect(service.signup(dtoWithRole)).rejects.toThrow(
        'Enter your password to activate your Creator profile',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(dtoWithRole.password, existingUser.password);
    });

    it('should successfully link a verified STUDENT into INSTRUCTOR with correct credentials', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' as any };
      const existingUser = {
        id: '1',
        email: dto.email,
        password: 'oldHashedPassword',
        fullName: dto.fullName,
        role: 'STUDENT',
        isVerified: true,
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };
      const upgradedUser = { ...existingUser, role: 'INSTRUCTOR', hasCreatorAccess: true };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(existingUser) // duplicate-email probe
        .mockResolvedValue(upgradedUser); // signToken access-flag fetch
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.user.update as jest.Mock).mockResolvedValue(upgradedUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.signup(dtoWithRole);

      expect(bcrypt.compare).toHaveBeenCalledWith(dtoWithRole.password, existingUser.password);
      // Role upgrade also flips the creator access flag and ensures a Profile row
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: existingUser.id },
        data: { role: 'INSTRUCTOR', hasCreatorAccess: true },
        include: { studentProfile: true },
      });
      expect(prisma.profile.upsert).toHaveBeenCalledWith({
        where: { userId: existingUser.id },
        create: { userId: existingUser.id },
        update: {},
      });
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: '1', email: dto.email, fullName: dto.fullName, role: 'INSTRUCTOR' },
        hasBothRoles: true,
        linked: true,
        verified: true,
        message: 'Creator profile activated successfully',
      });
    });
  });

  describe('login', () => {
    const dto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const activeUser = {
      id: '1',
      email: dto.email,
      password: 'hashedPassword',
      fullName: 'Test User',
      role: 'STUDENT',
      isVerified: true,
      hasStudentAccess: true,
      hasCreatorAccess: false,
      deletedAt: null,
      accountStatus: 'ACTIVE',
      accountLockedUntil: null,
      failedLoginAttempts: 0,
    };

    it('should successfully login an existing user and return a server-side redirect', async () => {
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(activeUser) // credential lookup
        .mockResolvedValue(activeUser); // signToken access-flag lookup
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.user.update as jest.Mock).mockResolvedValue(activeUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.login(dto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email.toLowerCase().trim() },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, activeUser.password);
      // JWT now carries the dual-role access flags
      expect(jwt.signAsync).toHaveBeenCalledWith(
        {
          sub: activeUser.id,
          email: activeUser.email,
          role: activeUser.role,
          hasCreatorAccess: false,
          hasStudentAccess: true,
        },
        { expiresIn: '7d', secret: expect.any(String) },
      );
      // Successful logins are tracked and the redirect is decided server-side
      expect(prisma.user.update).toHaveBeenCalled();
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: '1', email: dto.email, fullName: 'Test User', role: 'STUDENT' },
        hasBothRoles: false,
        redirectTo: '/dashboard',
      });
    });

    it('should throw ForbiddenException if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
      await expect(service.login(dto)).rejects.toThrow('Incorrect credentials');
    });

    it('should throw ForbiddenException if password does not match', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(activeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      (prisma.user.update as jest.Mock).mockResolvedValue(activeUser);

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
      await expect(service.login(dto)).rejects.toThrow('Incorrect credentials');
    });

    it('should successfully login and grant creator access when the instructor portal is requested', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' };
      const upgradedUser = { ...activeUser, role: 'INSTRUCTOR', hasCreatorAccess: true };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(activeUser)
        .mockResolvedValue(upgradedUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.user.update as jest.Mock)
        .mockResolvedValueOnce(upgradedUser) // role upgrade
        .mockResolvedValue(upgradedUser); // successful-login tracking
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.login(dtoWithRole);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: activeUser.id },
        data: { role: 'INSTRUCTOR', hasCreatorAccess: true },
      });
      expect(result.user.role).toBe('INSTRUCTOR');
      // Both access flags now set → canonical destination is the role picker
      expect((result as any).redirectTo).toBe('/role-select');
    });

    it('should never downgrade an ADMIN to INSTRUCTOR when logging in via the instructor portal', async () => {
      const adminUser = { ...activeUser, role: 'ADMIN', hasCreatorAccess: false };
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(adminUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.user.update as jest.Mock).mockResolvedValue({ ...adminUser, hasCreatorAccess: true });
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.login(dtoWithRole);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: adminUser.id },
        data: { hasCreatorAccess: true },
      });
      expect(prisma.user.update).not.toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ role: 'INSTRUCTOR' }) }),
      );
      expect(result.user.role).toBe('ADMIN');
    });
  });

  describe('verifyCode', () => {
    const code = '123456';
    const codeHash = require('crypto')
      .createHash('sha256')
      .update(code)
      .digest('hex');
    const pendingUser = {
      id: '1',
      email: 'pending@example.com',
      fullName: 'Pending User',
      role: 'STUDENT',
      isVerified: false,
      verifyToken: codeHash,
      tokenExpiry: new Date(Date.now() + 5 * 60 * 1000),
      verifyAttempts: 0,
      profile: null,
    };

    it('verifies a matching code, resets the attempt counter and signs in', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(pendingUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(pendingUser);

      const result = await service.verifyCode(pendingUser.email, code);

      // Lookup is by email alone — token comparison happens in constant time
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { email: pendingUser.email },
        include: { profile: true },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: pendingUser.id },
        data: {
          isVerified: true,
          verifyToken: null,
          tokenExpiry: null,
          verifyAttempts: 0,
        },
      });
      expect(result.access_token).toBe('mocked-jwt-token');
    });

    it('counts an atomic miss against the guess cap', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(pendingUser);

      await expect(
        service.verifyCode(pendingUser.email, '000000'),
      ).rejects.toThrow('Invalid verification code');

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: pendingUser.id },
        data: { verifyAttempts: { increment: 1 } },
      });
    });

    it('voids the pending code after 5 failed attempts', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({
        ...pendingUser,
        verifyAttempts: 5,
      });

      await expect(service.verifyCode(pendingUser.email, code)).rejects.toThrow(
        'Too many incorrect attempts. Please request a new code.',
      );

      // Even the CORRECT code is refused — the token is voided
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: pendingUser.id },
        data: { verifyToken: null, tokenExpiry: null, verifyAttempts: 0 },
      });
    });

    it('does not touch the database for unknown emails', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.verifyCode('ghost@example.com', code)).rejects.toThrow(
        'Invalid verification code',
      );
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('clears expired codes instead of verifying them', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({
        ...pendingUser,
        tokenExpiry: new Date(Date.now() - 1000),
      });

      await expect(service.verifyCode(pendingUser.email, code)).rejects.toThrow(
        'Verification code expired',
      );
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: pendingUser.id },
        data: { verifyToken: null, tokenExpiry: null, verifyAttempts: 0 },
      });
    });
  });

  describe('firebaseSignIn', () => {
    const idToken = 'valid_firebase_token';

    it('should create a new user if one does not exist', async () => {
      const decodedToken = { email: 'new@example.com', name: 'New User', picture: 'avatar.png', email_verified: true };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: decodedToken.name,
        role: 'STUDENT',
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // existing-user probe
        .mockResolvedValue(mockUser); // signToken access-flag lookup
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.firebaseSignIn(idToken, 'STUDENT');

      expect(firebaseAdmin.auth().verifyIdToken).toHaveBeenCalledWith(idToken);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: decodedToken.email } });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: decodedToken.email,
          fullName: decodedToken.name,
          role: 'STUDENT',
          hasStudentAccess: true,
          hasCreatorAccess: false,
          profile: { create: { avatarUrl: decodedToken.picture } },
          studentProfile: { create: {} },
        }),
      });
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: '1', email: mockUser.email, fullName: mockUser.fullName, role: 'STUDENT' },
        hasBothRoles: false,
      });
    });

    it('should log in an existing user without creating a new row', async () => {
      const decodedToken = { email: 'existing@example.com', email_verified: true, picture: 'avatar.png' };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: 'Existing User',
        role: 'STUDENT',
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValue(mockUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.firebaseSignIn(idToken, 'STUDENT');

      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: '1', email: mockUser.email, fullName: mockUser.fullName, role: 'STUDENT' },
        hasBothRoles: false,
      });
    });

    it('should upgrade existing user to INSTRUCTOR with a creator profile row if requested', async () => {
      const decodedToken = { email: 'existing@example.com', email_verified: true, picture: 'avatar.png' };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: 'Existing User',
        role: 'STUDENT',
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };
      const updatedUser = { ...mockUser, role: 'INSTRUCTOR', hasCreatorAccess: true };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValue(updatedUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.firebaseSignIn(idToken, 'INSTRUCTOR');

      expect(prisma.profile.upsert).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        create: { userId: mockUser.id, avatarUrl: decodedToken.picture || null },
        update: {},
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { role: 'INSTRUCTOR', hasCreatorAccess: true },
      });
      expect(result.user.role).toBe('INSTRUCTOR');
      expect((result as any).hasBothRoles).toBe(true);
    });

    it('should never downgrade an ADMIN to INSTRUCTOR via Firebase sign-in', async () => {
      const decodedToken = { email: 'admin@example.com', email_verified: true, picture: 'avatar.png' };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: 'Admin User',
        role: 'ADMIN',
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };
      const updatedUser = { ...mockUser, hasCreatorAccess: true };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValue(updatedUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.firebaseSignIn(idToken, 'INSTRUCTOR');

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { hasCreatorAccess: true },
      });
      expect(prisma.user.update).not.toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ role: 'INSTRUCTOR' }) }),
      );
      expect(result.user.role).toBe('ADMIN');
    });

    it('should throw UnauthorizedException if no email in token', async () => {
      const decodedToken = { name: 'No Email User' };

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);

      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow(UnauthorizedException);
      // Business-rule rejections pass through unwrapped (no "Invalid Firebase Token" prefix)
      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow('No email found in Firebase token');
    });

    it('should throw UnauthorizedException if token verification fails', async () => {
      const error = new Error('Verification failed');
      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockRejectedValue(error);

      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow(UnauthorizedException);
      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow('Invalid Firebase Token: Verification failed');
    });

    it('should successfully link creatorOnboardingDraft to user if draftId is provided', async () => {
      const decodedToken = { email: 'existing@example.com', email_verified: true, picture: 'avatar.png' };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: 'Existing User',
        role: 'STUDENT',
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValue(mockUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);
      (prisma.creatorOnboardingDraft.update as jest.Mock).mockResolvedValue({});

      await service.firebaseSignIn(idToken, 'STUDENT', 'draft-123');

      expect(prisma.creatorOnboardingDraft.update).toHaveBeenCalledWith({
        where: { id: 'draft-123' },
        data: { userId: mockUser.id },
      });
    });

    it('should reject sign-in when the provider has not verified the email claim', async () => {
      const decodedToken = { email: 'unverified@example.com', email_verified: false };

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);

      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow(UnauthorizedException);
      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow(
        'not verified with your sign-in provider',
      );
      // The unverified claim must never reach user lookup or creation
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('should clamp an ADMIN role request down to STUDENT — self-service never grants ADMIN', async () => {
      const decodedToken = {
        email: 'new@example.com',
        name: 'New User',
        picture: 'avatar.png',
        email_verified: true,
      };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: decodedToken.name,
        role: 'STUDENT',
        hasStudentAccess: true,
        hasCreatorAccess: false,
      };

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // existing-user probe
        .mockResolvedValue(mockUser); // signToken access-flag lookup
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      await service.firebaseSignIn(idToken, 'ADMIN');

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          role: 'STUDENT',
          hasStudentAccess: true,
          hasCreatorAccess: false,
        }),
      });
    });

    it('should hydrate the creator profile from onboarding answers for a new INSTRUCTOR', async () => {
      const decodedToken = { email: 'creator@example.com', name: 'New Creator', email_verified: true };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: decodedToken.name,
        role: 'INSTRUCTOR',
        hasStudentAccess: false,
        hasCreatorAccess: true,
      };
      const onboarding = { step7: { biggestChallenge: ['time', 'editing'] }, step3: { categories: ['Design'] } };

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // existing-user probe
        .mockResolvedValue(mockUser); // signToken access-flag lookup
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      await service.firebaseSignIn(idToken, 'INSTRUCTOR', undefined, onboarding);

      // The Google path used to silently drop this payload — it must hydrate
      expect(profileService.hydrateFromOnboarding).toHaveBeenCalledWith('1', onboarding);
    });

    it('should NOT re-hydrate onboarding answers over an existing creator profile', async () => {
      const decodedToken = { email: 'creator@example.com', name: 'Existing Creator', email_verified: true };
      const mockUser = {
        id: '1',
        email: decodedToken.email,
        fullName: decodedToken.name,
        role: 'INSTRUCTOR',
        hasStudentAccess: false,
        hasCreatorAccess: true,
      };
      const onboarding = { step3: { categories: ['Stale answers'] } };

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockUser) // already a creator before this call
        .mockResolvedValue(mockUser);

      await service.firebaseSignIn(idToken, 'INSTRUCTOR', undefined, onboarding);

      // Stale localStorage answers must never clobber settings-page edits
      expect(profileService.hydrateFromOnboarding).not.toHaveBeenCalled();
    });
  });

  describe('verifyEmail', () => {
    it('should verify with the RAW code from the magic link — single hash, matching the stored value', async () => {
      const code = '123456';
      const storedHash = require('crypto').createHash('sha256').update(code).digest('hex');
      const mockUser = {
        id: '1',
        email: 'verify@example.com',
        fullName: 'Verify User',
        role: 'STUDENT',
        verifyToken: storedHash,
        tokenExpiry: new Date(Date.now() + 5 * 60 * 1000),
        profile: null,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue({ ...mockUser, isVerified: true, verifyToken: null });

      const result = await service.verifyEmail(code);

      // Lookup hashes the incoming token exactly ONCE
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { verifyToken: storedHash },
        include: { profile: true },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { isVerified: true, verifyToken: null, tokenExpiry: null },
      });
      expect(emailService.sendWelcomeEmail).toHaveBeenCalled();
      expect(result.access_token).toBe('mocked-jwt-token');
    });

    it('should reject an expired verification token', async () => {
      const mockUser = {
        id: '1',
        email: 'expired@example.com',
        fullName: 'Expired User',
        role: 'STUDENT',
        verifyToken: 'some-hash',
        tokenExpiry: new Date(Date.now() - 60 * 1000),
        profile: null,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(service.verifyEmail('123456')).rejects.toThrow(ForbiddenException);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('should reject an unknown token without leaking whether the account exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.verifyEmail('000000')).rejects.toThrow(ForbiddenException);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });

  describe('switchRole', () => {
    const baseUser = {
      id: '1',
      email: 'dual@example.com',
      fullName: 'Dual User',
      role: 'STUDENT',
      hasStudentAccess: true,
      hasCreatorAccess: true,
    };

    it('should switch between owned roles and issue a fresh token', async () => {
      const instructorUser = { ...baseUser, role: 'INSTRUCTOR' };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(baseUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(instructorUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.switchRole(baseUser.id, 'INSTRUCTOR');

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: baseUser.id },
        data: { role: 'INSTRUCTOR' },
      });
      expect(result.access_token).toBe(mockToken);
      expect(result.user.role).toBe('INSTRUCTOR');
    });

    it('should reject switching to ADMIN even when both access flags are set', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(baseUser);

      await expect(service.switchRole(baseUser.id, 'ADMIN')).rejects.toThrow(ForbiddenException);
      await expect(service.switchRole(baseUser.id, 'ADMIN')).rejects.toThrow('Invalid role target');
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('should reject case-obfuscated admin targets', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(baseUser);

      await expect(service.switchRole(baseUser.id, 'admin')).rejects.toThrow('Invalid role target');
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('should reject an INSTRUCTOR switch when the account has no creator access flag', async () => {
      const studentOnly = { ...baseUser, hasCreatorAccess: false };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(studentOnly);

      await expect(service.switchRole(studentOnly.id, 'INSTRUCTOR')).rejects.toThrow(
        'No creator profile found for this account',
      );
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });

  describe('signToken', () => {
    it('should sign and return a token and user payload including access flags', async () => {
      const userId = '1';
      const email = 'test@example.com';
      const fullName = 'Test User';
      const role = 'STUDENT';
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        hasCreatorAccess: true,
        hasStudentAccess: true,
      });
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.signToken(userId, email, fullName, role);

      // Access flags come straight from the DB so stale-role tokens stay honest
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { hasCreatorAccess: true, hasStudentAccess: true },
      });
      expect(jwt.signAsync).toHaveBeenCalledWith(
        { sub: userId, email, role, hasCreatorAccess: true, hasStudentAccess: true },
        { expiresIn: '7d', secret: expect.any(String) },
      );
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: userId, email, fullName, role },
      });
    });
  });

  describe('getMyEnrollments', () => {
    it('returns enrollments with real per-course lesson totals in one grouped query', async () => {
      const userId = '1';
      const mockEnrollments = [
        { id: '1', courseId: '100', userId, course: { id: '100', title: 'Course A' } },
        { id: '2', courseId: '200', userId, course: { id: '200', title: 'Course B' } },
      ];
      // Two sections in course 100 (3 lessons), one in course 200 (4 lessons)
      const mockSections = [
        { courseId: '100', _count: { lessons: 2 } },
        { courseId: '100', _count: { lessons: 1 } },
        { courseId: '200', _count: { lessons: 4 } },
      ];

      (prisma.enrollment.findMany as jest.Mock).mockResolvedValue(mockEnrollments);
      (prisma.section.findMany as jest.Mock).mockResolvedValue(mockSections);

      const result = await service.getMyEnrollments(userId);

      expect(prisma.enrollment.findMany).toHaveBeenCalledWith({
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
            },
          },
        },
        // Most recently STUDIED first, not most recently enrolled — enrolling
        // in a second course must not bury the one the student is partway
        // through on the dashboard. This assertion tracked the older
        // `id: 'desc'` ordering and was left behind by that fix.
        orderBy: { updatedAt: 'desc' },
      });
      // ONE grouped query for all enrolled courses — no N+1
      expect(prisma.section.findMany).toHaveBeenCalledWith({
        where: { courseId: { in: ['100', '200'] } },
        select: { courseId: true, _count: { select: { lessons: true } } },
      });
      expect(result).toEqual([
        {
          ...mockEnrollments[0],
          course: { ...mockEnrollments[0].course, totalLessons: 3 },
        },
        {
          ...mockEnrollments[1],
          course: { ...mockEnrollments[1].course, totalLessons: 4 },
        },
      ]);
    });

    it('short-circuits without a section query when there are no enrollments', async () => {
      (prisma.enrollment.findMany as jest.Mock).mockResolvedValue([]);

      const result = await service.getMyEnrollments('1');

      expect(result).toEqual([]);
      expect(prisma.section.findMany).not.toHaveBeenCalled();
    });
  });
});
