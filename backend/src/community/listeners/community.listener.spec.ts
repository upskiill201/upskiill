import { CommunityListener } from './community.listener';
import { CommentCreatedEvent, ContentLikedEvent, PostCreatedEvent } from '../events/community.events';

const COURSE = 'course-1';
const OTHER = 'course-2';

/** Learners and which course each is focused on. */
function setup(focus: Record<string, string | null>, opts: { creatorId?: string } = {}) {
  const creatorId = opts.creatorId ?? 'creator';
  const prisma = {
    community: {
      findUnique: jest.fn().mockResolvedValue({
        courseId: COURSE,
        course: { title: 'Web Basics', instructorId: creatorId },
      }),
    },
    post: { findUnique: jest.fn().mockResolvedValue({ communityId: 'comm-1' }) },
    comment: { findUnique: jest.fn().mockResolvedValue({ postId: 'post-1' }) },
    user: { findUnique: jest.fn().mockResolvedValue({ fullName: 'Amara Okafor' }) },
    communityMembership: { findMany: jest.fn() },
    // The focus resolver reads these two tables.
    studentProfile: {
      findMany: jest.fn(async ({ where }: { where: { userId: { in: string[] } } }) =>
        where.userId.in.map((userId) => ({ userId, focusCourseId: focus[userId] ?? null })),
      ),
    },
    enrollment: {
      findMany: jest.fn(async ({ where }: { where: { userId: { in: string[] } } }) =>
        where.userId.in
          .filter((userId) => focus[userId])
          .map((userId) => ({ userId, courseId: focus[userId] as string })),
      ),
    },
  };
  const notifications = { createMany: jest.fn().mockResolvedValue(undefined) };
  const hub = { notify: jest.fn().mockResolvedValue({ pushed: true, deliveryId: 'd' }) };
  const emailJobs = { enqueue: jest.fn().mockResolvedValue(undefined) };
  const listener = new CommunityListener(
    prisma as never,
    notifications as never,
    {} as never,
    hub as never,
    emailJobs as never,
  );
  return { listener, prisma, notifications, hub, emailJobs };
}

const comment = (over: Partial<ConstructorParameters<typeof CommentCreatedEvent>> = []) =>
  new CommentCreatedEvent('c1', 'post-1', 'author', 'owner', null, 'How do I center a div?', ...(over as []));

describe('CommunityListener — focus course only', () => {
  it('notifies a post owner whose focus course is this community, in Tey’s voice', async () => {
    const { listener, hub, emailJobs } = setup({ owner: COURSE });
    await listener.handleCommentCreated(comment());

    expect(hub.notify).toHaveBeenCalledTimes(1);
    const call = hub.notify.mock.calls[0][0];
    expect(call).toMatchObject({
      userId: 'owner',
      kind: 'COMMUNITY_COMMENT',
      actorId: 'author',
      title: 'Amara commented on your post',
      url: `/dashboard/community/${COURSE}/p/post-1`,
      inbox: { type: 'TEY_COMMUNITY_COMMENT', entityType: 'POST', entityId: 'post-1' },
    });
    expect(call.body).toContain('“How do I center a div?”');
    expect(emailJobs.enqueue).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'owner', eventType: 'COMMUNITY_ACTIVITY' }),
    );
  });

  it('stays silent when the post owner is focused on a different course', async () => {
    const { listener, hub, emailJobs, notifications } = setup({ owner: OTHER });
    await listener.handleCommentCreated(comment());
    expect(hub.notify).not.toHaveBeenCalled();
    expect(emailJobs.enqueue).not.toHaveBeenCalled();
    expect(notifications.createMany).not.toHaveBeenCalled();
  });

  it('with no explicit choice, follows the most recently active enrolment', async () => {
    // enrolled in the course, nothing chosen → focus resolves to it
    const { listener, hub } = setup({ owner: COURSE });
    await listener.handleCommentCreated(comment());
    expect(hub.notify).toHaveBeenCalledTimes(1);
  });

  it('a reply goes to the comment author as COMMUNITY_REPLY, not to the post owner twice', async () => {
    const { listener, hub } = setup({ replied: COURSE, owner: COURSE });
    const ev = new CommentCreatedEvent('c2', 'post-1', 'author', 'owner', 'replied', 'Thanks, that worked');
    await listener.handleCommentCreated(ev);
    expect(hub.notify).toHaveBeenCalledTimes(1);
    expect(hub.notify.mock.calls[0][0]).toMatchObject({ userId: 'replied', kind: 'COMMUNITY_REPLY' });
  });

  it('never notifies someone about their own comment', async () => {
    const { listener, hub } = setup({ author: COURSE });
    const ev = new CommentCreatedEvent('c3', 'post-1', 'author', 'author', null, 'mine');
    await listener.handleCommentCreated(ev);
    expect(hub.notify).not.toHaveBeenCalled();
  });

  it('keeps the course creator on the studio bell, unchanged', async () => {
    const { listener, hub, notifications } = setup({}, { creatorId: 'owner' });
    await listener.handleCommentCreated(comment());
    expect(hub.notify).not.toHaveBeenCalled();
    expect(notifications.createMany).toHaveBeenCalledWith([
      expect.objectContaining({
        userId: 'owner',
        type: 'STUDIO_COMMENT',
        deepLink: `/creator/community?course=${COURSE}&post=post-1`,
      }),
    ]);
  });

  it('a new post reaches focused members only, skipping the author and anyone mentioned', async () => {
    const { listener, hub, prisma } = setup({ a: COURSE, b: OTHER, c: COURSE, author: COURSE, m: COURSE });
    prisma.communityMembership.findMany
      // mention validation
      .mockResolvedValueOnce([{ userId: 'm' }])
      // fan-out members
      .mockResolvedValueOnce(['a', 'b', 'c', 'author', 'm', 'creator'].map((userId) => ({ userId })));
    const ev = new PostCreatedEvent('post-9', 'author', 'comm-1', COURSE, 'GENERAL', null, 'Finished module 1!', ['m']);
    await listener.handlePostCreated(ev);

    const notified = hub.notify.mock.calls.map((c) => [c[0].userId, c[0].kind]).sort();
    expect(notified).toEqual([
      ['a', 'COMMUNITY_POST'],
      ['c', 'COMMUNITY_POST'],
      ['m', 'COMMUNITY_MENTION'],
    ]);
  });

  it('announcements go out as the creator speaking to the class', async () => {
    const { listener, hub, prisma } = setup({ a: COURSE });
    prisma.communityMembership.findMany.mockResolvedValueOnce([{ userId: 'a' }]);
    const ev = new PostCreatedEvent('post-10', 'creator', 'comm-1', COURSE, 'ANNOUNCEMENT', 'Quiz on Friday', 'Quiz on Friday');
    await listener.handlePostCreated(ev);
    expect(hub.notify.mock.calls[0][0]).toMatchObject({
      userId: 'a',
      kind: 'COMMUNITY_ANNOUNCEMENT',
      title: 'New announcement in Web Basics',
    });
  });

  it('a like is a quiet bell row for the focus course only — never a push', async () => {
    const focused = setup({ owner: COURSE });
    await focused.listener.handleContentLiked(new ContentLikedEvent('liker', 'owner', 'POST', 'post-1', 'Nice post'));
    expect(focused.hub.notify).not.toHaveBeenCalled();
    expect(focused.notifications.createMany).toHaveBeenCalledWith([
      expect.objectContaining({ userId: 'owner', type: 'POST_LIKE' }),
    ]);

    const elsewhere = setup({ owner: OTHER });
    await elsewhere.listener.handleContentLiked(new ContentLikedEvent('liker', 'owner', 'POST', 'post-1', 'Nice post'));
    expect(elsewhere.notifications.createMany).not.toHaveBeenCalled();
  });
});
