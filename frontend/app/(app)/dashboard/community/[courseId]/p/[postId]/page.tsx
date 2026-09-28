'use client';

/**
 * One post and its discussion — Skool's post view, Duolingo's feel.
 * Cached (SWR), so coming back paints instantly; likes are optimistic with
 * their sound; moderators get pin / lock / delete, each with feedback.
 */

import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle, ArrowLeft, BookOpen, Eye, Hash, Lock, Paperclip, Pin, Trash2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import CommentThread from '@/components/community/CommentThread';
import PollBlock from '@/components/community/PollBlock';
import MemberAvatar from '@/components/community/MemberAvatar';
import ProfileLink from '@/components/community/ProfileLink';
import PostTypeArt from '@/components/community/PostTypeArt';
import { TYPE_ICON, categoryLabel } from '@/components/community/PostCard';
import shared from '@/components/community/community.module.css';
import { fetcher } from '@/lib/swr';
import { renderRichText } from '@/lib/communityRender';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { deletePost, setPostFlag, timeAgo, togglePostLike, type CommunityPost } from '@/lib/communityApi';
import styles from './PostDetail.module.css';
import { CreatorBadge } from '@/components/community/CreatorBadge';

type DetailPost = CommunityPost & {
  canModerate: boolean;
  community: { id: string; courseId: string | null; courseTitle: string | null } | null;
};

export default function PostDetailPage() {
  const { courseId, postId } = useParams<{ courseId: string; postId: string }>();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const { data: post, error, mutate } = useSWR<DetailPost>(`/api/posts/${postId}`, fetcher, { revalidateOnFocus: false });
  const [burst, setBurst] = React.useState(0);
  const likeBusy = React.useRef(false);

  if (error && !post) {
    return (
      <div className={styles.page}>
        <div className={shared.errorBanner}>
          <AlertCircle size={28} />
          <span>{error instanceof Error ? error.message : 'Could not load this post.'}</span>
          <Button variant="outline" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.page} aria-busy="true">
        <div className={styles.skeleton} style={{ height: 40, width: 180 }} />
        <div className={styles.skeleton} style={{ height: 260 }} />
        <div className={styles.skeleton} style={{ height: 120 }} />
      </div>
    );
  }

  const backHref = `/dashboard/community/${courseId ?? post.community?.courseId ?? ''}`;
  const Icon = TYPE_ICON[post.postType] ?? Hash;

  const like = async () => {
    if (likeBusy.current) return;
    likeBusy.current = true;
    const next = !post.likedByMe;
    playSound(next ? 'like' : 'toggleOff');
    playHaptic(next ? 'medium' : 'light', false);
    if (next) setBurst((b) => b + 1);
    void mutate({ ...post, likedByMe: next, likeCount: Math.max(0, post.likeCount + (next ? 1 : -1)) }, { revalidate: false });
    try {
      const res = await togglePostLike(post.id, !next);
      void mutate((cur) => (cur ? { ...cur, likedByMe: res.liked, likeCount: res.likeCount } : cur), { revalidate: false });
    } catch {
      void mutate();
      playSound('nodeLocked');
    } finally {
      likeBusy.current = false;
    }
  };

  const moderate = async (flag: 'pin' | 'lock', value: boolean) => {
    playSound(value ? 'toggleOn' : 'toggleOff');
    void mutate({ ...post, [flag === 'pin' ? 'isPinned' : 'isLocked']: value }, { revalidate: false });
    try {
      await setPostFlag(post.id, flag, value);
    } catch {
      playSound('nodeLocked');
    }
    void mutate();
  };

  return (
    <div className={styles.page}>
      <Link href={backHref} className={styles.backLink} onClick={() => playSound('navTap', 0)}>
        <ArrowLeft size={18} strokeWidth={2.75} /> Back to community
      </Link>

      <article className={styles.card}>
        {post.isPinned && (
          <div className={styles.pinned}>
            <Pin size={14} strokeWidth={2.75} /> Pinned
          </div>
        )}

        <header className={styles.author}>
          <ProfileLink userId={post.author.id} label={`${post.author.fullName}'s profile`}>
            <MemberAvatar userId={post.author.id} name={post.author.fullName} src={post.author.avatarUrl} level={post.author.level} size="lg" />
          </ProfileLink>
          <div className={styles.authorText}>
            <span style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              <ProfileLink userId={post.author.id}>
                <span className={styles.authorName}>{post.author.fullName}</span>
              </ProfileLink>
              {post.author.isCreator && <CreatorBadge />}
            </span>
            <span className={styles.meta}>
              {timeAgo(post.createdAt)}
              <span className={`${styles.category} ${styles[`cat_${post.postType}`] ?? ''}`}>
                <PostTypeArt postType={post.postType} size={18} fallback={Icon} />
                {categoryLabel(post.postType)}
              </span>
              {typeof post.viewCount === 'number' && (
                <span className={styles.metaItem}>
                  <Eye size={13} strokeWidth={2.5} /> {post.viewCount}
                </span>
              )}
              {post.isLocked && (
                <span className={styles.metaItem}>
                  <Lock size={13} strokeWidth={2.5} /> Comments locked
                </span>
              )}
            </span>
          </div>
        </header>

        {post.title && <h1 className={styles.title}>{post.title}</h1>}
        <div className={styles.body}>{renderRichText(post.contentText)}</div>

        {post.lesson && (
          <Link href={`/learn/${post.community?.courseId ?? courseId}`} className={styles.lessonTag}>
            <BookOpen size={14} strokeWidth={2.75} /> {post.lesson.title}
          </Link>
        )}

        {post.images.length > 0 && (
          <div className={styles.images}>
            {post.images.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element -- learner uploads, arbitrary host
              <img key={src} src={src} alt="" />
            ))}
          </div>
        )}

        {post.poll && <PollBlock post={post} onChanged={() => void mutate()} />}

        {post.attachments.length > 0 && (
          <div className={styles.attachments}>
            {post.attachments.map((a) => (
              <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className={styles.attachment}>
                <Paperclip size={16} strokeWidth={2.5} /> {a.filename}
              </a>
            ))}
          </div>
        )}

        <footer className={styles.actions}>
          <button
            type="button"
            className={`${styles.actionBtn} ${post.likedByMe ? styles.actionLiked : ''}`}
            onClick={() => void like()}
            aria-pressed={post.likedByMe}
          >
            <motion.span
              key={burst}
              style={{ display: 'inline-flex' }}
              initial={burst > 0 && !reducedMotion ? { scale: 0.5, rotate: -15 } : false}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 14 }}
            >
              <Image src={post.likedByMe ? '/art/ui/like.svg' : '/art/ui/like-off.svg'} alt="" width={24} height={24} />
            </motion.span>
            {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}
            <AnimatePresence>
              {burst > 0 && post.likedByMe && !reducedMotion && (
                <motion.span
                  key={burst}
                  className={styles.plusOne}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -24 }}
                  transition={{ duration: 0.8 }}
                  aria-hidden="true"
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a href="#comments" className={styles.actionBtn} onClick={() => playSound('navTap', 1)}>
            <Image src="/art/ui/comment.svg" alt="" width={24} height={24} /> {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
          </a>
        </footer>

        {post.canModerate && (
          <div className={styles.modRow}>
            <button type="button" className={styles.modBtn} onClick={() => void moderate('pin', !post.isPinned)}>
              <Pin size={14} strokeWidth={2.75} /> {post.isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button type="button" className={styles.modBtn} onClick={() => void moderate('lock', !post.isLocked)}>
              <Lock size={14} strokeWidth={2.75} /> {post.isLocked ? 'Unlock comments' : 'Lock comments'}
            </button>
            <button
              type="button"
              className={`${styles.modBtn} ${styles.modDanger}`}
              onClick={async () => {
                playSound('menuOpen');
                if (!window.confirm('Delete this post? This cannot be undone.')) return;
                try {
                  await deletePost(post.id);
                  playSound('toggleOff');
                  router.push(backHref);
                } catch {
                  playSound('nodeLocked');
                }
              }}
            >
              <Trash2 size={14} strokeWidth={2.75} /> Delete
            </button>
          </div>
        )}
      </article>

      <section id="comments" className={styles.comments}>
        <CommentThread
          postId={post.id}
          isLocked={post.isLocked}
          isModerator={post.canModerate}
          onCommentAdded={() => void mutate()}
        />
      </section>
    </div>
  );
}
