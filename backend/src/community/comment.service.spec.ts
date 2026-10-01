import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentService, COMMUNITY_COMMENT_SOURCE } from './comment.service';
import { CommunityService } from './community.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CommentService', () => {
  let service: CommentService;
  let prisma: Record<string, any>;
  let emitter: Record<string, any>;

  const postId = 'post-1';
  const communityId = 'comm-1';

  beforeEach(async () => {
    prisma = {
      // Batched ([create, update]) or interactive (callback) — both supported.
      $transaction: jest.fn((cb) =>
        Array.isArray(cb) ? Promise.all(cb) : cb({
          comment: {
            create: jest.fn().mockResolvedValue({
              id: 'comment-new',
              postId,
              parentId: null,
              userId: 'learner-2',
              contentText: 'Great question — here is how I did it.',
              likeCount: 0,
              status: 'ACTIVE',
              editedAt: null,
              createdAt: new Date(),
              user: {
                id: 'learner-2',
                fullName: 'B',
                avatarUrl: null,
                studentProfile: { streakDays: 4 },
              },
            }),
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            count: jest.fn().mockResolvedValue(2), // replies soft-deleted alongside
          },
          post: {
            update: jest.fn().mockResolvedValue({}),
          },
          studentProfile: {
            findUnique: jest.fn().mockResolvedValue({ id: 'sp-1' }),
            update: jest.fn().mockResolvedValue({}),
          },
          gemTransaction: {
            count: jest.fn().mockResolvedValue(0),
            create: jest.fn().mockResolvedValue({}),
          },
        }),
      ),
      post: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      comment: {
        create: jest.fn().mockResolvedValue({
          id: 'comment-new',
          postId,
          parentId: null,
          userId: 'learner-2',
          contentText: 'Great question — here is how I did it.',
          likeCount: 0,
          status: 'ACTIVE',
          editedAt: null,
          createdAt: new Date(),
          user: { id: 'learner-2', fullName: 'B', avatarUrl: null, studentProfile: { streakDays: 4 } },
        }),
        findUnique: jest.fn(),
        count: jest.fn().mockResolvedValue(0),
        findMany: jest.fn().mockResolvedValue([]),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      like: { findMany: jest.fn().mockResolvedValue([]) },
    };
    emitter = { emit: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        { provide: PrismaService, useValue: prisma },
        {
          provide: CommunityService,
          useValue: {
            assertMember: jest
              .fn()
              .mockResolvedValue({ membership: { role: 'MEMBER' }, isModerator: false }),
            assertModerator: jest.fn().mockRejectedValue(new ForbiddenException()),
            assertCanWrite: jest.fn(),
            creatorIdOf: jest.fn().mockResolvedValue('creator-1'),
          },
        },
        { provide: EventEmitter2, useValue: emitter },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('addComment', () => {
    beforeEach(() => {
      prisma.post.findUnique.mockResolvedValue({
        id: postId,
        communityId,
        status: 'ACTIVE',
        isLocked: false,
        userId: 'post-author-1',
      });
    });

    it('creates the comment, bumps counters, pays capped XP (after replying) and emits', async () => {
      const result = await service.addComment(postId, { id: 'learner-2' }, {
        contentText: 'Great question — here is how I did it.',
      } as any);

      expect(result.id).toBe('comment-new');
      expect(prisma.post.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ commentCount: { increment: 1 } }) }),
      );
      // The reward settles in the background.
      await new Promise((r) => setImmediate(r));
      expect(emitter.emit).toHaveBeenCalledWith('xp.awarded', expect.objectContaining({ amount: 5 }));
      expect(emitter.emit).toHaveBeenCalledWith(
        'community.comment.created',
        expect.objectContaining({
          postId,
          authorId: 'learner-2',
          postAuthorId: 'post-author-1',
          parentAuthorId: null,
        }),
      );
    });

    it('rejects comments on locked posts for non-moderators', async () => {
      prisma.post.findUnique.mockResolvedValue({
        id: postId, communityId, status: 'ACTIVE', isLocked: true, userId: 'x',
      });

      await expect(
        service.addComment(postId, { id: 'learner-2' }, { contentText: 'hi' } as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('refuses replies aimed at another reply (one thread level)', async () => {
      prisma.comment.findUnique.mockResolvedValue({
        id: 'reply-1', postId, parentId: 'root-1', userId: 'someone', status: 'ACTIVE',
      });

      await expect(
        service.addComment(postId, { id: 'learner-2' }, {
          contentText: 'threaded too deep',
          parentId: 'reply-1',
        } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('rejects replies pointing at comments of a different post', async () => {
      prisma.comment.findUnique.mockResolvedValue({
        id: 'other-post-comment', postId: 'other-post', parentId: null,
        userId: 'someone', status: 'ACTIVE',
      });

      await expect(
        service.addComment(postId, { id: 'learner-2' }, {
          contentText: 'cross-post reply',
          parentId: 'other-post-comment',
        } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteComment', () => {
    it('soft-deletes the subtree and decrements the post counter once per removed row', async () => {
      // the deleter is a moderator of this community
      (service as any).communityService.assertModerator = jest.fn().mockResolvedValue({});
      let capturedTx: any;
      prisma.$transaction.mockImplementation(async (cb: any) => {
        capturedTx = {
          comment: {
            updateMany: jest.fn().mockResolvedValue({ count: 3 }), // root + 2 replies
            count: jest.fn().mockResolvedValue(2),
          },
          post: { update: jest.fn() },
        };
        return cb(capturedTx);
      });
      prisma.comment.findUnique.mockResolvedValue({
        id: 'root-1',
        status: 'ACTIVE',
        userId: 'learner-2',
        post: { id: postId, communityId, userId: 'author-1' },
      });

      await service.deleteComment('root-1', { id: 'mod-1', role: undefined });

      expect(capturedTx.comment.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { OR: [{ id: 'root-1' }, { parentId: 'root-1' }] } }),
      );
    });
  });
});
