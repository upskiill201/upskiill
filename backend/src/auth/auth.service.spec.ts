import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { firebaseAdmin } from './firebase-admin';

jest.mock('bcrypt');
jest.mock('./firebase-admin', () => ({
  firebaseAdmin: {
    auth: jest.fn().mockReturnValue({
      verifyIdToken: jest.fn(),
    }),
  },
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            enrollment: {
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
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

    it('should successfully sign up a new STUDENT user', async () => {
      const mockUser = { id: '1', ...dto, role: 'STUDENT' };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.signup(dto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 'salt');
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          password: 'hashedPassword',
          fullName: dto.fullName,
          role: 'STUDENT',
          profile: { create: {} },
        },
      });
      expect(jwt.signAsync).toHaveBeenCalledWith(
        { sub: mockUser.id, email: mockUser.email, role: mockUser.role },
        { expiresIn: '7d', secret: expect.any(String) },
      );
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: mockUser.id, email: mockUser.email, fullName: mockUser.fullName, role: mockUser.role },
      });
    });

    it('should successfully sign up a new INSTRUCTOR user', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' };
      const mockUser = { id: '1', ...dtoWithRole };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.signup(dtoWithRole);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          password: 'hashedPassword',
          fullName: dto.fullName,
          role: 'INSTRUCTOR',
          profile: { create: {} },
        },
      });
      expect(result.user.role).toBe('INSTRUCTOR');
    });

    it('should throw ForbiddenException if email already in use (no instructor upgrade)', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1', email: dto.email, role: 'STUDENT' });

      await expect(service.signup(dto)).rejects.toThrow(ForbiddenException);
      await expect(service.signup(dto)).rejects.toThrow('Email already in use');
    });

    it('should throw ForbiddenException if upgrading to INSTRUCTOR with incorrect credentials', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' };
      const existingUser = { id: '1', email: dto.email, password: 'oldHashedPassword', role: 'STUDENT' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signup(dtoWithRole)).rejects.toThrow(ForbiddenException);
      await expect(service.signup(dtoWithRole)).rejects.toThrow('Incorrect credentials');
      expect(bcrypt.compare).toHaveBeenCalledWith(dtoWithRole.password, existingUser.password);
    });

    it('should successfully upgrade existing STUDENT to INSTRUCTOR', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' };
      const existingUser = { id: '1', email: dto.email, password: 'oldHashedPassword', fullName: dto.fullName, role: 'STUDENT' };
      const updatedUser = { ...existingUser, role: 'INSTRUCTOR' };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.signup(dtoWithRole);

      expect(bcrypt.compare).toHaveBeenCalledWith(dtoWithRole.password, existingUser.password);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: existingUser.id },
        data: { role: 'INSTRUCTOR' },
      });
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: updatedUser.id, email: updatedUser.email, fullName: updatedUser.fullName, role: updatedUser.role },
      });
    });
  });

  describe('login', () => {
    const dto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully login an existing user', async () => {
      const mockUser = { id: '1', email: dto.email, password: 'hashedPassword', fullName: 'Test User', role: 'STUDENT' };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.login(dto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, mockUser.password);
      expect(jwt.signAsync).toHaveBeenCalledWith(
        { sub: mockUser.id, email: mockUser.email, role: mockUser.role },
        { expiresIn: '7d', secret: expect.any(String) },
      );
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: mockUser.id, email: mockUser.email, fullName: mockUser.fullName, role: mockUser.role },
      });
    });

    it('should throw ForbiddenException if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
      await expect(service.login(dto)).rejects.toThrow('Incorrect credentials');
    });

    it('should throw ForbiddenException if password does not match', async () => {
      const mockUser = { id: '1', email: dto.email, password: 'hashedPassword', role: 'STUDENT' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
      await expect(service.login(dto)).rejects.toThrow('Incorrect credentials');
    });

    it('should successfully login and upgrade STUDENT to INSTRUCTOR when requested', async () => {
      const dtoWithRole = { ...dto, role: 'INSTRUCTOR' };
      const mockUser = { id: '1', email: dto.email, password: 'hashedPassword', fullName: 'Test User', role: 'STUDENT' };
      const updatedUser = { ...mockUser, role: 'INSTRUCTOR' };
      const mockToken = 'mocked_jwt_token';

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.login(dtoWithRole);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { role: 'INSTRUCTOR' },
      });
      expect(result.user.role).toBe('INSTRUCTOR');
      expect(jwt.signAsync).toHaveBeenCalledWith(
        { sub: updatedUser.id, email: updatedUser.email, role: updatedUser.role },
        { expiresIn: '7d', secret: expect.any(String) },
      );
    });
  });

  describe('firebaseSignIn', () => {
    const idToken = 'valid_firebase_token';

    it('should create a new user if one does not exist', async () => {
      const decodedToken = { email: 'new@example.com', name: 'New User', picture: 'avatar.png' };
      const mockUser = { id: '1', email: decodedToken.email, fullName: decodedToken.name, role: 'STUDENT' };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.firebaseSignIn(idToken, 'STUDENT');

      expect(firebaseAdmin.auth().verifyIdToken).toHaveBeenCalledWith(idToken);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: decodedToken.email } });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: decodedToken.email,
          password: 'hashedPassword',
          fullName: decodedToken.name,
          role: 'STUDENT',
          profile: { create: { avatarUrl: decodedToken.picture } },
        },
      });
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: mockUser.id, email: mockUser.email, fullName: mockUser.fullName, role: mockUser.role },
      });
    });

    it('should log in an existing user', async () => {
      const decodedToken = { email: 'existing@example.com' };
      const mockUser = { id: '1', email: decodedToken.email, fullName: 'Existing User', role: 'STUDENT' };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.firebaseSignIn(idToken, 'STUDENT');

      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: mockUser.id, email: mockUser.email, fullName: mockUser.fullName, role: mockUser.role },
      });
    });

    it('should upgrade existing user to INSTRUCTOR if requested', async () => {
      const decodedToken = { email: 'existing@example.com' };
      const mockUser = { id: '1', email: decodedToken.email, fullName: 'Existing User', role: 'STUDENT' };
      const updatedUser = { ...mockUser, role: 'INSTRUCTOR' };
      const mockToken = 'mocked_jwt_token';

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);
      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.firebaseSignIn(idToken, 'INSTRUCTOR');

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { role: 'INSTRUCTOR' },
      });
      expect(result.user.role).toBe('INSTRUCTOR');
    });

    it('should throw UnauthorizedException if no email in token', async () => {
      const decodedToken = { name: 'No Email User' };

      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockResolvedValue(decodedToken);

      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow(UnauthorizedException);
      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow('Invalid Firebase Token: No email found in Firebase token');
    });

    it('should throw UnauthorizedException if token verification fails', async () => {
      const error = new Error('Verification failed');
      (firebaseAdmin.auth().verifyIdToken as jest.Mock).mockRejectedValue(error);

      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow(UnauthorizedException);
      await expect(service.firebaseSignIn(idToken, 'STUDENT')).rejects.toThrow('Invalid Firebase Token: Verification failed');
    });
  });

  describe('signToken', () => {
    it('should sign and return a token and user payload', async () => {
      const userId = '1';
      const email = 'test@example.com';
      const fullName = 'Test User';
      const role = 'STUDENT';
      const mockToken = 'mocked_jwt_token';

      (jwt.signAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await service.signToken(userId, email, fullName, role);

      expect(jwt.signAsync).toHaveBeenCalledWith(
        { sub: userId, email, role },
        { expiresIn: '7d', secret: expect.any(String) },
      );
      expect(result).toEqual({
        access_token: mockToken,
        user: { id: userId, email, fullName, role },
      });
    });
  });

  describe('getMyEnrollments', () => {
    it('should return a list of enrollments for a user', async () => {
      const userId = '1';
      const mockEnrollments = [{ id: '1', courseId: '100', userId }];

      (prisma.enrollment.findMany as jest.Mock).mockResolvedValue(mockEnrollments);

      const result = await service.getMyEnrollments(userId);

      expect(prisma.enrollment.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { course: true },
        orderBy: { id: 'desc' },
      });
      expect(result).toEqual(mockEnrollments);
    });
  });
});
