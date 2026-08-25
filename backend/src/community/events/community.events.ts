/**
 * Domain events for the Course Community feature. Emitted from services after
 * the transactional work succeeds; consumed asynchronously by
 * listeners/community.listener.ts for notification fanout.
 */

export class PostCreatedEvent {
  constructor(
    public readonly postId: string,
    public readonly authorId: string,
    public readonly communityId: string,
    public readonly courseId: string | null,
    public readonly postType: string,
    public readonly title: string | null,
    public readonly excerpt: string,
    public readonly mentionedUserIds: string[] = [],
  ) {}
}

export class CommentCreatedEvent {
  constructor(
    public readonly commentId: string,
    public readonly postId: string,
    public readonly authorId: string, // who wrote the comment
    public readonly postAuthorId: string, // post owner (notified on top-level comments)
    public readonly parentAuthorId: string | null, // reply target (notified on replies)
    public readonly excerpt: string,
    public readonly mentionedUserIds: string[] = [],
  ) {}
}

export class ContentLikedEvent {
  constructor(
    public readonly actorId: string,
    public readonly ownerId: string, // content author (notified)
    public readonly entityType: 'POST' | 'COMMENT',
    public readonly entityId: string,
    public readonly excerpt: string,
  ) {}
}
