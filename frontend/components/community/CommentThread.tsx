'use client';

import React from 'react';
import { Heart, Reply, Lock, CornerDownRight } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
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
    try {
      await addComment(postId, text, replyTo?.id);
      setDraft('');
      setReplyTo(null);
      await loadPage(1, true); // refresh counts + ordering
      onCommentAdded?.();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not post your comment.');
    } finally {
      setSending(false);
    }
  };

  const handleLike = async (c: CommentNode) => {
    try {
      await toggleCommentLike(c.id, c.likedByMe);
      const flip = (node: CommentNode): CommentNode =>
        node.id === c.id
          ? { ...node, likedByMe: !node.likedByMe, likeCount: node.likeCount + (node.likedByMe ? -1 : 1) }
          : { ...node, replies: node.replies?.map(flip) };
      setComments((prev) => prev.map(flip));
    } catch {
      /* leave state as-is on failure */
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
      <div className={styles.comment}>
        <Avatar src={c.author.avatarUrl ?? undefined} name={c.author.fullName} size="sm" />
        <div className={styles.bubbleCol}>
          <div className={styles.bubble}>
            <span className={styles.authorName}>{c.author.fullName}</span>
            <span className={styles.time}>{timeAgo(c.createdAt)}</span>
            <div className={styles.text}>{renderRichText(c.contentText)}</div>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${c.likedByMe ? styles.liked : ''}`}
              onClick={() => handleLike(c)}
            >
              <Heart size={12} fill={c.likedByMe ? 'currentColor' : 'none'} /> {c.likeCount}
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
