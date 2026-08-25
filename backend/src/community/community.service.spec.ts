import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CommunityService } from './community.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CommunityService', () => {
  let service: CommunityService;
  let prisma: Record<string, any>;

  const communityId = 'comm-1';
  const courseId = 'course-1';

  beforeEach(async () => {
    prisma = {
      community: {
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      communityMembership: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
        count: jest.fn().mockResolvedValue(5),
        findMany: jest.fn().mockResolvedValue([]),
      },
      enrollment: {
        findUnique: jest.fn(),
      },
      courseAccessEntitlement: {
        findFirst: jest.fn(),
      },
    };

    // Default community shape used by every access test
    prisma.community.findUnique.mockResolvedValue({
      id: communityId,
      name: 'Digital Marketing Mastery',
      courseId,
      memberCount: 5,
      description: null,
      course: { id: courseId, instructorId: 'creator-1' },
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('assertMember — access matrix', () => {
    it('admits a seated member without extra lookups', async () => {
      prisma.communityMembership.findUnique.mockResolvedValue({
        role: 'MEMBER',
        userId: 'learner-1',
        communityId,
      });
      prisma.enrollment.findUnique.mockResolvedValue(null);

      const ctx = await service.assertMember(communityId, 'learner-1');

      expect(ctx.isModerator).toBe(false);
      expect(prisma.communityMembership.upsert).not.toHaveBeenCalled();
    });

    it('lazily seats an enrolled learner who has no membership row yet', async () => {
      prisma.communityMembership.findUnique.mockResolvedValue(null);
      prisma.enrollment.findUnique.mockResolvedValue({ id: 'e1' });
      prisma.courseAccessEntitlement.findFirst.mockResolvedValue(null);
      prisma.communityMembership.upsert.mockResolvedValue({
        role: 'MEMBER',
        userId: 'learner-2',
      });

      const ctx = await service.assertMember(communityId, 'learner-2');

      expect(ctx.isModerator).toBe(false);
      expect(prisma.communityMembership.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: { userId: 'learner-2', communityId, role: 'MEMBER' },
        }),
      );
    });

    it('seats via an active entitlement when no enrollment exists', async () => {
      prisma.communityMembership.findUnique.mockResolvedValue(null);
      prisma.enrollment.findUnique.mockResolvedValue(null);
      prisma.courseAccessEntitlement.findFirst.mockResolvedValue({ id: 'ent-1' });
      prisma.communityMembership.upsert.mockResolvedValue({ role: 'MEMBER' });

      await service.assertMember(communityId, 'subscriber-1');
      expect(prisma.communityMembership.upsert).toHaveBeenCalled();
    });

    it('rejects outsiders with no membership and no course access', async () => {
      prisma.communityMembership.findUnique.mockResolvedValue(null);
      prisma.enrollment.findUnique.mockResolvedValue(null);
      prisma.courseAccessEntitlement.findFirst.mockResolvedValue(null);

      await expect(service.assertMember(communityId, 'stranger-1')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('treats the course creator as moderator even without a membership row', async () => {
      prisma.communityMembership.upsert.mockResolvedValue({
        role: 'ADMIN',
        userId: 'creator-1',
      });

      const ctx = await service.assertMember(communityId, 'creator-1');

      expect(ctx.isModerator).toBe(true);
      // Creator gets seated with the ADMIN role
      expect(prisma.communityMembership.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: { userId: 'creator-1', communityId, role: 'ADMIN' },
        }),
      );
    });

    it('lets platform admins through without a membership row', async () => {
      const ctx = await service.assertMember(communityId, 'admin-1', 'ADMIN');
      expect(ctx.isModerator).toBe(true);
    });
  });

  describe('assertModerator', () => {
    it('blocks plain members from moderation powers', async () => {
      prisma.communityMembership.findUnique.mockResolvedValue({
        role: 'MEMBER',
        userId: 'learner-1',
      });
      prisma.enrollment.findUnique.mockResolvedValue(null);

      await expect(
        service.assertModerator(communityId, 'learner-1'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('allows ADMIN-role members', async () => {
      prisma.communityMembership.findUnique.mockResolvedValue({
        role: 'ADMIN',
        userId: 'mod-1',
      });
      prisma.enrollment.findUnique.mockResolvedValue(null);

      const ctx = await service.assertModerator(communityId, 'mod-1');
      expect(ctx.isModerator).toBe(true);
    });
  });

  describe('getOverview', () => {
    it('404s for unknown communities', async () => {
      prisma.community.findUnique.mockResolvedValue(null);
      await expect(service.getOverview('nope', 'u1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('joinCourseCommunity (enrollment auto-join)', () => {
    it('is a silent no-op when the course has no community yet', async () => {
      prisma.community.findUnique.mockResolvedValue(null);

      await expect(
        service.joinCourseCommunity(courseId, 'learner-9'),
      ).resolves.toBeUndefined();
      expect(prisma.communityMembership.upsert).not.toHaveBeenCalled();
    });

    it('upserts a MEMBER row when the community exists', async () => {
      prisma.community.findUnique.mockResolvedValue({ id: communityId });
      prisma.communityMembership.upsert.mockResolvedValue({ role: 'MEMBER' });

      await service.joinCourseCommunity(courseId, 'learner-9');
      expect(prisma.communityMembership.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId_communityId: { userId: 'learner-9', communityId } },
        }),
      );
    });
  });
});
