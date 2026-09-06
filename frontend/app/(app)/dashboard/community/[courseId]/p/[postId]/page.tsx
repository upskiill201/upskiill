'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Pin, Lock, Trash2, AlertCircle, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import PostCard from '@/components/community/PostCard';
import CommentThread from '@/components/community/CommentThread';
import PollBlock from '@/components/community/PollBlock';
import { PostTypeBadge } from '@/components/community/PostCard';
import shared from '@/components/community/community.module.css';
import styles from './PostDetail.module.css';
import {
  getPost,
  setPostFlag,
  deletePost,
  timeAgo,
  type CommunityPost,
} from '@/lib/communityApi';

type DetailPost = CommunityPost & {
  canModerate: boolean;
  community: { id: string; courseId: string | null; courseTitle: string | null } | null;
};

export default function PostDetailPage() {
  const routeParams = useParams<{ courseId: string; postId: string }>();
  const { courseId, postId } = routeParams;
  const router = useRouter();

  const [post, setPost] = React.useState<DetailPost | null>(null);
  const [state, setState] = React.useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMsg, setErrorMsg] = React.useState('');

  const load = React.useCallback(async () => {
    setState('loading');
    try {
      const p = await getPost(postId);
      setPost(p as DetailPost);
      setState('ready');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not load this post.');
      setState('error');
    }
  }, [postId]);

  React.useEffect(() => {
    void load();
  }, [load]);

  if (state === 'error') {
    return (
      <div className={styles.page}>
        <div className={shared.errorBanner}>
          <AlertCircle size={28} />
          <span>{errorMsg}</span>
          <Button variant="outline" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </div>
    );
  }

  if (state === 'loading' || !post) {
    return (
      <div className={styles.page}>
        <div className={`${shared.skeletonLine} ${shared.skeletonLineShort}`} style={{ width: 120 }} />
        <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} style={{ height: 200 }} />
        <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} />
      </div>
    );
  }

  const backHref = `/dashboard/community/${courseId ?? post.community?.courseId ?? ''}`;

  return (
    <div className={styles.page}>
      <Link href={backHref} className={styles.backLink}>
        <ArrowLeft size={15} /> Back to community
      </Link>

      <article className={styles.detailCard}>
        {/* Moderation toolbar */}
        {post.canModerate && (
          <div className={styles.moderationRow}>
            <button
              className={`${styles.modBtn} ${post.isPinned ? styles.modBtnActive : ''}`}
              onClick={async () => {
                await setPostFlag(post.id, 'pin', !post.isPinned);
                void load();
              }}
            >
              <Pin size={13} /> {post.isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button
              className={`${styles.modBtn} ${post.isLocked ? styles.modBtnActive : ''}`}
              onClick={async () => {
                await setPostFlag(post.id, 'lock', !post.isLocked);
                void load();
              }}
            >
              <Lock size={13} /> {post.isLocked ? 'Unlock comments' : 'Lock comments'}
            </button>
            <button
              className={`${styles.modBtn} ${styles.modBtnDanger}`}
              onClick={async () => {
                if (!window.confirm('Delete this post?')) return;
                await deletePost(post.id);
                router.push(backHref);
              }}
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        )}

        <h1 className={styles.detailTitle}>
          {post.title ?? `${post.postType.charAt(0)}${post.postType.slice(1).toLowerCase()}`}
        </h1>
        <div className={styles.detailMeta}>
          <PostTypeBadge postType={post.postType} />
          <span>{timeAgo(post.createdAt)}</span>
          {typeof post.viewCount === 'number' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Eye size={13} /> {post.viewCount}
            </span>
          )}
          {post.lesson && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
               · Lesson: {post.lesson.title}
            </span>
          )}
        </div>

        <p className={styles.detailBody}>{post.contentText}</p>

        {post.images.length > 0 && (
          <div className={styles.detailImages}>
            {post.images.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" />
            ))}
          </div>
        )}

        {post.poll && (
          <PollBlock post={post} onChanged={() => void load()} />
        )}

        {post.attachments.length > 0 && (
          <div className={styles.detailAttachments}>
            {post.attachments.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className={styles.attachmentLink}
              >
                {a.filename}
              </a>
            ))}
          </div>
        )}
      </article>

      <CommentThread
        postId={post.id}
        isLocked={post.isLocked}
        isModerator={post.canModerate}
        onCommentAdded={() => void load()}
      />
    </div>
  );
}
