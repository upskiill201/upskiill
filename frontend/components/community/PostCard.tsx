'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Heart, MessageCircle, Eye, Pin, Lock, Flame, Paperclip, BookOpen, MoreHorizontal, Trash2, Link2,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import type { CommunityPost } from '@/lib/communityApi';
import { timeAgo, togglePostLike } from '@/lib/communityApi';
import { renderRichText } from '@/lib/communityRender';
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

export function PostTypeBadge({ postType }: { postType: string }) {
  return (
    <span className={`${shared.typeBadge} ${shared[TYPE_BADGE[postType] ?? 'badgeGeneral']}`}>
      {postType.toLowerCase()}
    </span>
  );
}

interface PostCardProps {
  post: CommunityPost;
  /** Origin chip (community name + link) when rendered in the global feed */
  origin?: { name: string; courseId: string | null; courseThumbnailUrl?: string | null };
  /** Deep-link target; defaults to the community post page */
  detailHref?: string;
  isModerator?: boolean;
  currentUserId?: string;
  onDeleted?: (postId: string) => void;
  clampBody?: boolean;
}

export default function PostCard({
  post,
  origin,
  detailHref,
  isModerator = false,
  currentUserId,
  onDeleted,
  clampBody = true,
}: PostCardProps) {
  const router = useRouter();
  const [liked, setLiked] = React.useState(post.likedByMe);
  const [likeCount, setLikeCount] = React.useState(post.likeCount);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [burst, setBurst] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const href =
    detailHref ??
    (origin?.courseId
      ? `/dashboard/community/${origin.courseId}/p/${post.id}`
      : `/dashboard/community/course/p/${post.id}`);

  const handleLike = async () => {
    if (busy) return;
    setBusy(true);
    // Optimistic flip — the API returns the authoritative count.
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((c) => c + (nextLiked ? 1 : -1));
    if (nextLiked) setBurst((b) => b + 1); // celebratory pop on like
    try {
      const res = await togglePostLike(post.id, liked);
      setLiked(res.liked);
      setLikeCount(res.likeCount);
    } catch {
      setLiked(liked); // revert on failure
      setLikeCount((c) => c + (nextLiked ? -1 : 1));
    } finally {
      setBusy(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
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
      alert('Could not delete the post. Please try again.');
    }
  };

  return (
    <motion.article
      className={`${styles.card} ${post.isPinned ? styles.pinned : ''}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      onClick={() => router.push(href)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && router.push(href)}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.headerRow}>
        <Avatar src={post.author.avatarUrl ?? undefined} name={post.author.fullName} size="md" />
        <div className={styles.authorBlock}>
          <span className={styles.authorName}>{post.author.fullName}</span>
          <div className={styles.metaRow}>
            <span className={`${shared.typeBadge} ${shared[TYPE_BADGE[post.postType] ?? 'badgeGeneral']}`}>
              {post.postType.toLowerCase()}
            </span>
            {post.author.streakDays > 0 && (
              <span className={styles.streak}>
                <Flame size={12} /> {post.author.streakDays}
              </span>
            )}
            <span className={styles.dot} />
            <span className={styles.streak}>{timeAgo(post.createdAt)}</span>
            {post.editedAt && (
              <>
                <span className={styles.dot} />
                <span className={styles.streak}>edited</span>
              </>
            )}
            {post.isPinned && (
              <>
                <span className={styles.dot} />
                <span className={`${styles.streak}`} style={{ color: 'var(--brand-blue)', fontWeight: 700 }}>
                  <Pin size={12} /> Pinned
                </span>
              </>
            )}
            {post.isLocked && (
              <>
                <span className={styles.dot} />
                <span className={styles.streak}>
                  <Lock size={12} /> Locked
                </span>
              </>
            )}
          </div>
        </div>

        {origin && (
          <span className={styles.originChip} onClick={(e) => e.stopPropagation()}>
            {origin.courseThumbnailUrl && (
              <Image src={origin.courseThumbnailUrl} alt="" width={16} height={16} style={{ borderRadius: 4 }} />
            )}
            {origin.name}
          </span>
        )}

        <span className={styles.spacer} />

        {(isModerator || post.userId === currentUserId) && (
          <div className={styles.menuWrap} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.actionBtn}
              aria-label="Post options"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <MoreHorizontal size={16} />
            </button>
            {menuOpen && (
              <div className={styles.menu}>
                {post.userId === currentUserId && onDeleted && (
                  <button className={`${styles.menuItem} ${styles.menuItemDanger}`} onClick={handleDelete}>
                    <Trash2 size={14} /> Delete post
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {post.title && <h3 className={styles.title}>{post.title}</h3>}

      <div className={`${styles.body} ${clampBody ? '' : styles.bodyFull}`}>
        {renderRichText(post.contentText)}
      </div>

      {post.lesson && (
        <span className={styles.lessonTag}>
          <BookOpen size={13} /> Lesson: {post.lesson.title}
        </span>
      )}

      {post.images.length > 0 && (
        <div className={styles.imageGrid}>
          {post.images.slice(0, 4).map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
      )}

      {post.attachments.length > 0 && (
        <div className={styles.attachments}>
          {post.attachments.map((a) => (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className={styles.attachmentLink}
              onClick={(e) => e.stopPropagation()}
            >
              <Paperclip size={14} /> {a.filename}
            </a>
          ))}
        </div>
      )}

      {/* Engagement stats line */}
      {(likeCount > 0 || post.commentCount > 0 || typeof post.viewCount === 'number') && (
        <div className={styles.statsRow}>
          {likeCount > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Heart size={12} fill="currentColor" /> {likeCount}
            </span>
          )}
          {post.commentCount > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <MessageCircle size={12} /> {post.commentCount}
            </span>
          )}
          <span className={styles.spacer} />
          {typeof post.viewCount === 'number' && (
            <span className={styles.views}>
              <Eye size={12} /> {post.viewCount}
            </span>
          )}
        </div>
      )}

      {/* Action bar — Like · Comment · Copy link, split from stats by a hairline */}
      <div className={styles.footerRow} onClick={(e) => e.stopPropagation()}>
        <button
          className={`${styles.actionBtn} ${liked ? styles.actionBtnLiked : ''}`}
          onClick={handleLike}
          aria-pressed={liked}
        >
          <motion.span
            key={burst}
            style={{ display: 'inline-flex' }}
            initial={burst > 0 ? { scale: 0.6 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 600, damping: 15 }}
          >
            <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          </motion.span>
          Like
        </button>
        <button className={styles.actionBtn} onClick={() => router.push(`${href}#comments`)}>
          <MessageCircle size={16} /> Comment
        </button>
        <button className={styles.actionBtn} onClick={handleCopyLink}>
          <Link2 size={16} /> {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </motion.article>
  );
}

/** Loading placeholder matching the card shape. */
export function PostCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={shared.skeletonAvatar} />
      <div className={styles.skeletonCol}>
        <div className={`${shared.skeletonLine} ${shared.skeletonLineShort}`} />
        <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} />
        <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} style={{ width: '70%' }} />
      </div>
    </div>
  );
}
