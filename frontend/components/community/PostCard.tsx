'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ThumbsUp, MessageSquare, Pin, Lock, Flame, Paperclip, BookOpen,
  MoreHorizontal, Trash2, Link2, BarChart3, Check,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import type { CommunityPost } from '@/lib/communityApi';
import { timeAgo, togglePostLike } from '@/lib/communityApi';
import { plainExcerpt } from '@/lib/communityRender';
import shared from './community.module.css';
import styles from './PostCard.module.css';

const TYPE_BADGE: Record<string, string> = {
  QUESTION: 'badgeQuestion',
  TIP: 'badgeTip',
  WIN: 'badgeWin',
  RESOURCE: 'badgeResource',
  DISCUSSION: 'badgeDiscussion',
  POLL: 'badgePoll',
  GENERAL: 'badgeGeneral',
  ANNOUNCEMENT: 'badgeAnnouncement',
  CHALLENGE: 'badgeChallenge',
};

/** Human category label — the word after "in" in the card's meta line. */
const TYPE_LABEL: Record<string, string> = {
  QUESTION: 'Questions',
  TIP: 'Tips',
  WIN: 'Wins',
  RESOURCE: 'Resources',
  DISCUSSION: 'Discussion',
  POLL: 'Polls',
  GENERAL: 'General',
  ANNOUNCEMENT: 'Announcements',
  CHALLENGE: 'Challenges',
  PROGRESS: 'Progress',
  MILESTONE: 'Milestones',
  ACHIEVEMENT: 'Achievements',
};

export function categoryLabel(postType: string): string {
  return TYPE_LABEL[postType] ?? postType.charAt(0) + postType.slice(1).toLowerCase();
}

export function PostTypeBadge({ postType }: { postType: string }) {
  return (
    <span className={`${shared.typeBadge} ${shared[TYPE_BADGE[postType] ?? 'badgeGeneral']}`}>
      {postType.toLowerCase()}
    </span>
  );
}

interface PostCardProps {
  post: CommunityPost;
  /** Origin chip (community name + link) when rendered in the global feed. */
  origin?: { name: string; courseId: string | null; courseThumbnailUrl?: string | null };
  /** Deep-link target; defaults to the community post page. */
  detailHref?: string;
  isModerator?: boolean;
  currentUserId?: string;
  onDeleted?: (postId: string) => void;
  /** Tapping the category in the meta line filters the list to it. */
  onCategoryClick?: (postType: string) => void;
}

function PostCard({
  post,
  origin,
  detailHref,
  isModerator = false,
  currentUserId,
  onDeleted,
  onCategoryClick,
}: PostCardProps) {
  const router = useRouter();
  const [liked, setLiked] = React.useState(post.likedByMe);
  const [likeCount, setLikeCount] = React.useState(post.likeCount);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [burst, setBurst] = React.useState(0);
  const busy = React.useRef(false);

  const href =
    detailHref ??
    (origin?.courseId
      ? `/dashboard/community/${origin.courseId}/p/${post.id}`
      : `/dashboard/community/course/p/${post.id}`);

  // Server truth can arrive after an optimistic flip (another tab, a refetch),
  // so the card follows the prop rather than freezing on first mount.
  React.useEffect(() => {
    setLiked(post.likedByMe);
    setLikeCount(post.likeCount);
  }, [post.likedByMe, post.likeCount]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [menuOpen]);

  const handleLike = async () => {
    if (busy.current) return;
    busy.current = true;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((c) => Math.max(0, c + (nextLiked ? 1 : -1)));
    if (nextLiked) setBurst((b) => b + 1);
    try {
      const res = await togglePostLike(post.id, liked);
      setLiked(res.liked);
      setLikeCount(res.likeCount);
    } catch {
      setLiked(liked);
      setLikeCount((c) => Math.max(0, c + (nextLiked ? -1 : 1)));
    } finally {
      busy.current = false;
    }
  };

  const handleCopyLink = async () => {
    setMenuOpen(false);
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const handleDelete = async () => {
    if (!onDeleted) return;
    setMenuOpen(false);
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    try {
      const { deletePost } = await import('@/lib/communityApi');
      await deletePost(post.id);
      onDeleted(post.id);
    } catch {
      window.alert('Could not delete the post. Please try again.');
    }
  };

  const excerpt = plainExcerpt(post.contentText);
  const heroImage = post.images?.[0] ?? null;
  const commenters = post.commenters ?? [];
  const canModerate = isModerator || post.userId === currentUserId;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16 }}
      onClick={() => router.push(href)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(href);
        }
      }}
    >
      {post.isPinned && (
        <div className={styles.pinnedBar}>
          <span>
            <Pin size={14} /> Pinned
          </span>
        </div>
      )}

      <div className={styles.headerRow}>
        <Avatar src={post.author.avatarUrl ?? undefined} name={post.author.fullName} size="md" />
        <div className={styles.authorBlock}>
          <span className={styles.authorName}>{post.author.fullName}</span>
          <div className={styles.metaRow}>
            <span>{timeAgo(post.createdAt)}</span>
            <span>in</span>
            {onCategoryClick ? (
              <button
                className={styles.categoryLink}
                onClick={(e) => {
                  e.stopPropagation();
                  onCategoryClick(post.postType);
                }}
              >
                {categoryLabel(post.postType)}
              </button>
            ) : (
              <span className={styles.categoryLink}>{categoryLabel(post.postType)}</span>
            )}
            {post.author.streakDays > 0 && (
              <span className={styles.streak}>
                <Flame size={12} /> {post.author.streakDays}
              </span>
            )}
            {post.editedAt && <span>· edited</span>}
            {post.isLocked && (
              <span className={styles.lockTag}>
                · <Lock size={12} /> Locked
              </span>
            )}
          </div>
        </div>

        {origin && (
          <span className={styles.originChip} onClick={(e) => e.stopPropagation()}>
            {origin.courseThumbnailUrl && (
              <Image
                src={origin.courseThumbnailUrl}
                alt=""
                width={20}
                height={20}
                className={styles.originThumb}
              />
            )}
            {origin.name}
          </span>
        )}

        <div className={styles.menuWrap} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.iconBtn}
            aria-label="Post options"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
          >
            <MoreHorizontal size={17} />
          </button>
          {menuOpen && (
            <div className={styles.menu} role="menu">
              <button className={styles.menuItem} onClick={handleCopyLink} role="menuitem">
                {copied ? <Check size={15} /> : <Link2 size={15} />}
                {copied ? 'Link copied' : 'Copy link'}
              </button>
              {canModerate && onDeleted && (
                <button
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={handleDelete}
                  role="menuitem"
                >
                  <Trash2 size={15} /> Delete post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.bodyRow}>
        <div className={styles.bodyText}>
          {post.title && <h3 className={styles.title}>{post.title}</h3>}
          {excerpt && (
            <p className={`${styles.excerpt} ${post.title ? '' : styles.excerptLead}`}>{excerpt}</p>
          )}

          {post.lesson && (
            <span className={styles.lessonTag}>
              <BookOpen size={13} /> {post.lesson.title}
            </span>
          )}

          {(post.poll || post.attachments.length > 0 || (post.images?.length ?? 0) > 1) && (
            <div className={styles.inlineHints}>
              {post.poll && (
                <span className={styles.hint}>
                  <BarChart3 size={13} /> Poll · {post.poll.options.length} options
                </span>
              )}
              {post.attachments.length > 0 && (
                <span className={styles.hint}>
                  <Paperclip size={13} /> {post.attachments.length} attachment
                  {post.attachments.length > 1 ? 's' : ''}
                </span>
              )}
              {(post.images?.length ?? 0) > 1 && (
                <span className={styles.hint}>+{post.images.length - 1} more images</span>
              )}
            </div>
          )}
        </div>

        {heroImage && (
          /* eslint-disable-next-line @next/next/no-img-element -- learner
             uploads are arbitrary S3/CloudFront keys, not a fixed remote
             allowlist next/image can be configured against. */
          <img className={styles.thumb} src={heroImage} alt="" loading="lazy" />
        )}
      </div>

      <div className={styles.footerRow} onClick={(e) => e.stopPropagation()}>
        <button
          className={`${styles.statBtn} ${liked ? styles.statBtnLiked : ''}`}
          onClick={handleLike}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike this post' : 'Like this post'}
        >
          <motion.span
            key={burst}
            style={{ display: 'inline-flex' }}
            initial={burst > 0 ? { scale: 0.6 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 600, damping: 15 }}
          >
            <ThumbsUp size={16} fill={liked ? 'currentColor' : 'none'} />
          </motion.span>
          {likeCount}
        </button>

        <button
          className={styles.statBtn}
          onClick={() => router.push(`${href}#comments`)}
          aria-label="Open comments"
        >
          <MessageSquare size={16} />
          {post.commentCount}
        </button>

        {commenters.length > 0 ? (
          <div className={styles.facepile}>
            {commenters.slice(0, 5).map((c) => (
              <Avatar key={c.id} src={c.avatarUrl ?? undefined} name={c.fullName} size="xs" />
            ))}
          </div>
        ) : (
          <span className={styles.footerSpacer} />
        )}

        {post.lastCommentAt && (
          <span className={styles.newComment}>New comment {timeAgo(post.lastCommentAt)}</span>
        )}
      </div>
    </motion.article>
  );
}

/**
 * Feed and community pages re-render on every filter tap, like, and poll vote.
 * Cards are pure functions of their post, so memoising them keeps a 20-card
 * list from re-rendering 20 motion subtrees when one unrelated bit of page
 * state changes.
 */
export default React.memo(PostCard);

/** Loading placeholder matching the card shape. */
export function PostCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={shared.skeletonAvatar} />
      <div className={styles.skeletonCol}>
        <div className={`${shared.skeletonLine} ${shared.skeletonLineShort}`} />
        <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} style={{ height: 16 }} />
        <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} style={{ width: '70%' }} />
      </div>
    </div>
  );
}
