'use client';

import React from 'react';
import Image from 'next/image';
import { Lock, CornerDownRight } from 'lucide-react';
import MemberAvatar from './MemberAvatar';
import ProfileLink from './ProfileLink';
import type { CommentNode } from '@/lib/communityApi';
import {
  addComment,
  deleteComment,
  getComments,
  timeAgo,
  toggleCommentLike,
} from '@/lib/communityApi';
import { renderRichText } from '@/lib/communityRender';
import TeyMascot from './TeyMascot';
import shared from './community.module.css';
import styles from './CommentThread.module.css';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { getCachedUser } from '@/lib/user-cache';
import { CreatorBadge } from '@/components/community/CreatorBadge';


interface CommentThreadProps {
  postId: string;
  isLocked: boolean;
  isModerator?: boolean;
  currentUserId?: string;
  onCommentAdded?: () => void;
}

export default function CommentThread({
  postId,
  isLocked,
  isModerator = false,
  currentUserId,
  onCommentAdded,
}: CommentThreadProps) {
  const [comments, setComments] = React.useState<CommentNode[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [state, setState] = React.useState<'loading' | 'error' | 'done'>('loading');
  const [errorMsg, setErrorMsg] = React.useState('');

  const [draft, setDraft] = React.useState('');
  const [replyTo, setReplyTo] = React.useState<CommentNode | null>(null);
  const [sending, setSending] = React.useState(false);

  const loadPage = React.useCallback(async (p: number, replace: boolean) => {
    setState('loading');
    try {
      const res = await getComments(postId, p);
      setTotal(res.total);
      setPage(p);
      setComments((prev) => (replace ? res.comments : [...prev, ...res.comments]));
      setState('done');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not load comments.');
      setState('error');
    }
  }, [postId]);

  React.useEffect(() => {
    void loadPage(1, true);
  }, [loadPage]);

  const handleSubmit = async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    setErrorMsg('');

    // Optimistic: the comment lands (with its sound) the moment you send it;
    // the server's copy swaps in when it answers, a failure takes it back out.
    const me = getCachedUser();
    const parentId = replyTo?.id ?? null;
    const tempId = `pending-${Date.now()}`;
    const pending: CommentNode = {
      id: tempId,
      postId,
      parentId,
      contentText: text,
      likeCount: 0,
      createdAt: new Date().toISOString(),
      author: { id: me?.id ?? currentUserId ?? '', fullName: me?.fullName ?? 'You', avatarUrl: me?.avatarUrl ?? null, streakDays: 0 },
      likedByMe: false,
      userId: me?.id ?? currentUserId ?? '',
      replies: [],
    };
    const place = (list: CommentNode[], node: CommentNode, swapId?: string): CommentNode[] => {
      if (!node.parentId) {
        return swapId ? list.map((c) => (c.id === swapId ? { ...node, replies: c.replies ?? [] } : c)) : [...list, node];
      }
      return list.map((c) =>
        c.id !== node.parentId
          ? c
          : {
              ...c,
              replies: swapId
                ? (c.replies ?? []).map((r) => (r.id === swapId ? node : r))
                : [...(c.replies ?? []), node],
            },
      );
    };
    const drop = (list: CommentNode[]): CommentNode[] =>
      list.filter((c) => c.id !== tempId).map((c) => ({ ...c, replies: c.replies?.filter((r) => r.id !== tempId) }));

    setComments((prev) => place(prev, pending));
    if (!parentId) setTotal((t) => t + 1);
    playSound('comment');
    playHaptic('success', false);
    setDraft('');
    setReplyTo(null);

    try {
      const saved = await addComment(postId, text, parentId ?? undefined);
      setComments((prev) => place(prev, { ...saved, replies: saved.replies ?? [] }, tempId));
      onCommentAdded?.();
    } catch (err) {
      setComments(drop);
      if (!parentId) setTotal((t) => Math.max(0, t - 1));
      setDraft(text);
      setErrorMsg(err instanceof Error ? err.message : 'Could not post your comment.');
      playSound('nodeLocked');
    } finally {
      setSending(false);
    }
  };

  // Optimistic: the heart fills (with its sound) on tap; a failure flips it back.
  const handleLike = async (c: CommentNode) => {
    const flip = (node: CommentNode): CommentNode =>
      node.id === c.id
        ? { ...node, likedByMe: !node.likedByMe, likeCount: Math.max(0, node.likeCount + (node.likedByMe ? -1 : 1)) }
        : { ...node, replies: node.replies?.map(flip) };
    playSound(c.likedByMe ? 'toggleOff' : 'like');
    playHaptic(c.likedByMe ? 'light' : 'medium', false);
    setComments((prev) => prev.map(flip));
    try {
      await toggleCommentLike(c.id, c.likedByMe);
    } catch {
      setComments((prev) => prev.map(flip));
    }
  };

  const handleDelete = async (c: CommentNode) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(c.id);
      await loadPage(1, true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not delete the comment.');
    }
  };

  const renderOne = (c: CommentNode, isReply: boolean) => (
    <div key={c.id} className={isReply ? styles.replies : styles.comment} style={isReply ? undefined : undefined}>
      <div className={`${styles.comment} ${c.id.startsWith('pending-') ? styles.pending : ''}`}>
        <ProfileLink userId={c.id.startsWith('pending-') ? null : c.author.id} label={`${c.author.fullName}'s profile`}>
          <MemberAvatar name={c.author.fullName} src={c.author.avatarUrl} level={c.author.level} size="sm" plain />
        </ProfileLink>
        <div className={styles.bubbleCol}>
          <div className={styles.bubble}>
            <ProfileLink userId={c.id.startsWith('pending-') ? null : c.author.id}>
              <span className={styles.authorName}>{c.author.fullName}</span>
            </ProfileLink>
            {c.author.isCreator && <CreatorBadge />}
            <span className={styles.time}>{timeAgo(c.createdAt)}</span>
            <div className={styles.text}>{renderRichText(c.contentText)}</div>
          </div>
          {c.id.startsWith('pending-') ? (
            <div className={styles.actions}>
              <span className={styles.sendingLabel}>Sending…</span>
            </div>
          ) : (
          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${c.likedByMe ? styles.liked : ''}`}
              onClick={() => handleLike(c)}
            >
              <Image src={c.likedByMe ? '/art/ui/like.svg' : '/art/ui/like-off.svg'} alt="" width={16} height={16} /> {c.likeCount}
            </button>
            {!isReply && !isLocked && (
              <button
                className={styles.actionBtn}
                onClick={() => { setReplyTo(replyTo?.id === c.id ? null : c); }}
              >
                <CornerDownRight size={12} /> Reply
              </button>
            )}
            {(c.userId === currentUserId || isModerator) && (
              <button
                className={`${styles.actionBtn} ${styles.liked}`}
                onClick={() => handleDelete(c)}
                aria-label="Delete comment"
              >
                Delete
              </button>
            )}
          </div>
          )}

          {/* Nested replies (one level) */}
          {!isReply && c.replies && c.replies.length > 0 && (
            <div className={styles.replies}>
              {c.replies.map((r) => renderOne(r, true))}
            </div>
          )}

          {/* Inline reply box under the target comment */}
          {!isReply && replyTo?.id === c.id && (
            <div className={styles.replyFormRow}>
              <input
                className={styles.replyInput}
                autoFocus
                placeholder={`Reply to ${c.author.fullName}…`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div id="comments" className={styles.thread}>
      <h4 className={styles.sectionTitle}>
        {total > 0 ? `${total} ${total === 1 ? 'comment' : 'comments'}` : 'Conversation'}
      </h4>

      {isLocked && (
        <div className={styles.lockedNote}>
          <Lock size={15} /> Comments are closed{isModerator ? ' — you locked this post.' : '.'}
        </div>
      )}

      {state === 'loading' && comments.length === 0 && (
        <>
          {[0, 1].map((i) => (
            <div key={i} className={styles.comment}>
              <div className={shared.skeletonAvatar} style={{ width: 32, height: 32 }} />
              <div className={styles.bubbleCol}>
                <div className={`${shared.skeletonLine} ${shared.skeletonLineShort}`} />
                <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} />
              </div>
            </div>
          ))}
        </>
      )}

      {state === 'error' && comments.length === 0 && (
        <div className={shared.errorBanner}>
          <span>Something went wrong loading comments.</span>
          <button className={styles.loadMoreBtn} onClick={() => loadPage(1, true)}>
            Try again
          </button>
        </div>
      )}

      {state !== 'loading' && total === 0 && !isLocked && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 0 8px' }}>
          <TeyMascot size={72} />
          <p className={styles.deleted} style={{ fontStyle: 'normal', fontWeight: 700 }}>
            No comments yet — be the first to help out!
          </p>
        </div>
      )}

      {comments.map((c) => renderOne(c, false))}

      {state === 'done' && comments.length < total && (
        <button className={styles.loadMoreBtn} onClick={() => loadPage(page + 1, false)}>
          Load more comments
        </button>
      )}

      {!isLocked && (
        <div className={styles.composerRow}>
          <div className={styles.textareaWrap}>
            {replyTo && (
              <div className={styles.actions}>
                <span className={styles.time}>
                  Replying to <strong>{replyTo.author.fullName}</strong>{' '}
                  <button
                    className={styles.actionBtn}
                    onClick={() => setReplyTo(null)}
                    aria-label="Cancel reply"
                  >
                    cancel
                  </button>
                </span>
              </div>
            )}
            <textarea
              className={styles.textarea}
              placeholder="Share your thoughts…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            {draft.trim() && (
              <div className={styles.sendBtn}>
                <button className={styles.sendBtn3d} disabled={sending} onClick={handleSubmit}>
                  {sending ? 'Posting…' : 'Post comment'}
                </button>
              </div>
            )}
            {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
