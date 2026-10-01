import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostService, COMMUNITY_POST_SOURCE } from './post.service';
import { CommunityService } from './community.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PostService', () => {
  let service: PostService;
  let prisma: Record<string, any>;
  let emitter: Record<string, any>;

  const communityId = 'comm-1';

  function makeTx(overrides: Partial<Record<string, any>> = {}) {
    return {
      post: {
        create: jest.fn().mockResolvedValue({
          id: 'post-new',
          userId: 'learner-1',
          communityId,
          courseId: 'course-1',
          postType: 'QUESTION',
          title: null,
          contentText: 'Help?',
          images: [],
          likeCount: 0,
          commentCount: 0,
          viewCount: 0,
          isPinned: false,
          isLocked: false,
          status: 'ACTIVE',
          lastActivityAt: new Date(),
          createdAt: new Date(),
          pollOptions: [],
          attachments: [],
          user: { id: 'learner-1', fullName: 'A', avatarUrl: null, studentProfile: null },
          lesson: null,
        }),
      },
      studentProfile: {
        findUnique: jest.fn().mockResolvedValue({ id: 'sp-1' }),
        update: jest.fn().mockResolvedValue({}),
      },
      gemTransaction: {
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({}),
      },
      ...overrides,
    };
  }

  beforeEach(async () => {
    prisma = {
      $transaction: jest.fn((cb) => cb(makeTx())),
      post: {
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      like: {
        create: jest.fn(),
        deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
        findMany: jest.fn().mockResolvedValue([]),
      },
      pollOption: {
        findFirst: jest.fn(),
        findMany: jest.fn().mockResolvedValue([
          { id: 'opt-a', text: 'Yes', position: 0, voteCount: 3 },
          { id: 'opt-b', text: 'No', position: 1, voteCount: 1 },
        ]),
        update: jest.fn().mockResolvedValue({}),
      },
      pollVote: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn().mockResolvedValue([]),
      },
      lesson: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    };
    emitter = { emit: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: PrismaService, useValue: prisma },
        {
          provide: CommunityService,
          useValue: {
            assertMember: jest
              .fn()
              .mockResolvedValue({ membership: { role: 'MEMBER' }, isModerator: false }),
            assertModerator: jest.fn().mockResolvedValue({}),
            getCommunityById: jest.fn().mockResolvedValue({ id: communityId, courseId: 'course-1' }),
            getCommunityByCourseId: jest.fn(),
            assertCanWrite: jest.fn(),
            creatorIdOf: jest.fn().mockResolvedValue('creator-1'),
          },
        },
        { provide: EventEmitter2, useValue: emitter },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createPost — XP daily caps', () => {
    it('pays the first two posts of the day and reports XP earned', async () => {
      const tx = makeTx();
      prisma.$transaction.mockImplementation((cb) => cb(tx));

      const result = await service.createPost(communityId, { id: 'learner-1' }, {
        contentText: 'How do I start with SEO?',
        postType: 'QUESTION',
      } as any);

      expect(result.xpAwarded).toEqual({ xp: 15, coins: 5 });
      expect(tx.gemTransaction.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ source: COMMUNITY_POST_SOURCE }),
      });
      expect(emitter.emit).toHaveBeenCalledWith(
        'community.post.created',
        expect.objectContaining({ postId: 'post-new' }),
      );
    });

    it('stops paying once the daily cap of paid posts is reached', async () => {
      const tx = makeTx({
        gemTransaction: {
          count: jest.fn().mockResolvedValue(2), // already paid twice today
          create: jest.fn(),
        },
      });
      prisma.$transaction.mockImplementation((cb) => cb(tx));

      const result = await service.createPost(communityId, { id: 'learner-1' }, {
        contentText: 'Third post of the day',
      } as any);

      expect(result.xpAwarded).toEqual({ xp: 0, coins: 0 });
      expect(tx.studentProfile.update).not.toHaveBeenCalled();
      expect(tx.gemTransaction.create).not.toHaveBeenCalled();
    });

    it('skips rewards for creators without a student profile', async () => {
      (service as any).communityService.assertMember = jest.fn().mockResolvedValue({
        membership: { role: 'ADMIN' },
        isModerator: true,
      });
      const tx = makeTx({
        studentProfile: { findUnique: jest.fn().mockResolvedValue(null) },
      });
      prisma.$transaction.mockImplementation((cb) => cb(tx));

      const result = await service.createPost(communityId, { id: 'creator-1' }, {
        contentText: 'Welcome to the course!',
        postType: 'ANNOUNCEMENT',
      } as any);

      expect(result.xpAwarded).toEqual({ xp: 0, coins: 0 });
    });
  });

  describe('moderator-only post types', () => {
    it('rejects ANNOUNCEMENT from a plain member', async () => {
      await expect(
        service.createPost(communityId, { id: 'learner-1' }, {
          contentText: 'fake announcement',
          postType: 'ANNOUNCEMENT',
        } as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('allows ANNOUNCEMENT when the caller is a moderator', async () => {
      (service as any).communityService.assertMember = jest.fn().mockResolvedValue({
        membership: { role: 'ADMIN' },
        isModerator: true,
      });
      const tx = makeTx({
        studentProfile: { findUnique: jest.fn().mockResolvedValue(null) },
      });
      prisma.$transaction.mockImplementation((cb: any) => cb(tx));

      await expect(
        service.createPost(communityId, { id: 'creator-1' }, {
          contentText: 'Real announcement',
          postType: 'ANNOUNCEMENT',
        } as any),
      ).resolves.toBeTruthy();
    });
  });

  describe('poll voting', () => {
    beforeEach(() => {
      prisma.post.findUnique.mockResolvedValue({
        id: 'poll-post',
        communityId,
        status: 'ACTIVE',
        postType: 'POLL',
        isLocked: false,
        userId: 'author-1',
        likeCount: 0,
        commentCount: 0,
      });
      prisma.pollOption.findFirst.mockResolvedValue({ id: 'opt-a', postId: 'poll-post' });
      // votePoll's transaction touches pollVote/pollOption — hand it the
      // top-level prisma mock so assertions see the calls.
      prisma.$transaction.mockImplementation((cb: any) => cb(prisma));
    });

    it('rejects votes on non-poll posts', async () => {
      prisma.post.findUnique.mockResolvedValue({
        id: 'x', communityId, status: 'ACTIVE', postType: 'TIP', isLocked: false,
      });
      await expect(
        service.votePoll('x', { id: 'u1' }, 'opt-a'),
      ).rejects.toThrow(BadRequestException);
    });

    it('records a first vote and bumps the option count', async () => {
      prisma.pollVote.findUnique.mockResolvedValue(null);

      const result = await service.votePoll('poll-post', { id: 'voter-1' }, 'opt-a');

      expect(prisma.pollVote.create).toHaveBeenCalledWith({
        data: { postId: 'poll-post', optionId: 'opt-a', userId: 'voter-1' },
      });
      expect(prisma.pollOption.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'opt-a' } }),
      );
      expect(result.votedOptionId).toBe('opt-a');
    });

    it('moves an existing vote instead of creating a second one', async () => {
      prisma.pollVote.findUnique.mockResolvedValue({
        id: 'pv-1', postId: 'poll-post', optionId: 'opt-b', userId: 'voter-1',
      });

      const result = await service.votePoll('poll-post', { id: 'voter-1' }, 'opt-a');

      expect(prisma.pollVote.create).not.toHaveBeenCalled();
      expect(prisma.pollVote.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'pv-1' } }),
      );
      // old option decremented, new incremented
      const updatedIds = prisma.pollOption.update.mock.calls.map(
        (c: any) => c[0].where.id,
      );
      expect(updatedIds).toContain('opt-b');
      expect(updatedIds).toContain('opt-a');
      expect(result.votedOptionId).toBe('opt-a');
    });

    it('is a no-op when re-clicking the same option', async () => {
      prisma.pollVote.findUnique.mockResolvedValue({
        id: 'pv-1', postId: 'poll-post', optionId: 'opt-a', userId: 'voter-1',
      });

      await service.votePoll('poll-post', { id: 'voter-1' }, 'opt-a');

      expect(prisma.pollVote.create).not.toHaveBeenCalled();
      expect(prisma.pollVote.update).not.toHaveBeenCalled();
      expect(prisma.pollOption.update).not.toHaveBeenCalled();
    });
  });

  describe('likes', () => {
    it('does not double-count when the like row already exists', async () => {
      prisma.post.findUnique.mockResolvedValue({
        id: 'p1', communityId, status: 'ACTIVE', userId: 'author-1', likeCount: 4,
      });
      // tx.like.create rejects (unique constraint) → no counter bump, honest reply
      prisma.$transaction.mockImplementation((cb: any) =>
        cb({ like: { create: jest.fn().mockRejectedValue(new Error('unique constraint')) } }),
      );

      const result = await service.likePost('p1', 'liker-1');

      expect(result.liked).toBe(false);
      expect(result.likeCount).toBe(4); // unchanged
    });
  });

  describe('moderation flags', () => {
    it('pin requires moderator powers', async () => {
      prisma.post.findUnique.mockResolvedValue({
        id: 'p1', communityId, status: 'ACTIVE', userId: 'someone-else',
      });
      (service as any).communityService.assertModerator = jest
        .fn()
        .mockRejectedValue(new ForbiddenException());

      await expect(
        service.setPinned('p1', { id: 'learner-1' }, true),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
