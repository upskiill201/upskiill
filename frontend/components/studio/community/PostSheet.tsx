'use client';

/**
 * A community post opened from the studio: the post, its thread, and a reply
 * box. The creator's own comments carry the CREATOR badge, as learners see
 * them. Answering a question takes it off "To answer".
 */

import { useState } from 'react';
import useSWR from 'swr';
import { CornerDownRight, Lock, Pin, Send } from 'lucide-react';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { ago, studioFetch, studioSend, type Face } from '@/lib/creator/studio';
import { PersonAvatar, Pill, Sheet, Skel, studio as s } from '../StudioParts';
import { POST_TYPE_LABEL } from './types';

interface ThreadAuthor extends Face {
  isCreator?: boolean;
}

interface ThreadComment {
  id: string;
  contentText: string;
  createdAt: string;
  author: ThreadAuthor;
  replies?: ThreadComment[];
}

interface FullPost {
  id: string;
  postType: string;
  title: string | null;
  contentText: string;
  images: string[];
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  author: ThreadAuthor;
  lesson: { id: string; title: string } | null;
}

export function PostSheet({ postId, onClose, onReplied }: { postId: string; onClose: () => void; onReplied: () => void }) {
  const post = useSWR<FullPost>(`/api/posts/${postId}`, studioFetch);
  const thread = useSWR<{ comments: ThreadComment[]; total: number }>(`/api/posts/${postId}/comments?pageSize=50`, studioFetch);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<ThreadComment | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    const body = text.trim();
    if (!body || busy) return;
    setBusy(true);
    setError(null);
    try {
      await studioSend(`/api/posts/${postId}/comments`, 'POST', { contentText: body, ...(replyTo ? { parentId: replyTo.id } : {}) });
      setText('');
      setReplyTo(null);
      playSound('comment');
      playHaptic('success', false);
      await thread.mutate();
      onReplied();
    } catch (e) {
      playSound('wrong');
      setError(e instanceof Error ? e.message : 'Your reply didn’t send.');
    } finally {
      setBusy(false);
    }
  };

  const p = post.data;
  return (
    <Sheet open onClose={onClose} title={p ? p.title || POST_TYPE_LABEL[p.postType] || 'Post' : 'Post'}>
      {post.error ? (
        <div className={s.errorBox} role="alert">
          <span>{post.error.message || 'This post didn’t load. It may have been removed.'}</span>
        </div>
      ) : !p ? (
        <>
          <Skel h={48} />
          <Skel h={120} />
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <PersonAvatar face={p.author} size={36} />
            <strong style={{ fontSize: 14.5 }}>{p.author.fullName}</strong>
            {p.author.isCreator && <Pill tone="var(--color-brand)">Creator</Pill>}
            <span className={s.hint}>{ago(p.createdAt)}</span>
            <Pill>{POST_TYPE_LABEL[p.postType] ?? p.postType}</Pill>
            {p.isPinned && (
              <Pill tone="var(--warning)">
                <Pin size={11} aria-hidden="true" /> Pinned
              </Pill>
            )}
            {p.isLocked && (
              <Pill>
                <Lock size={11} aria-hidden="true" /> Locked
              </Pill>
            )}
          </div>
          {p.lesson && <span className={s.hint}>About the lesson “{p.lesson.title}”</span>}
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{p.contentText}</p>
          {p.images.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
              {p.images.slice(0, 4).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element -- community uploads
                <img key={src} src={src} alt="" style={{ width: '100%', borderRadius: 12, aspectRatio: '4 / 3', objectFit: 'cover' }} />
              ))}
            </div>
          )}
        </>
      )}

      <div className={s.sectionHead}>
        <span className={s.statLabel}>{thread.data ? `${thread.data.total} comments` : 'Comments'}</span>
      </div>
      {!thread.data ? (
        <Skel h={80} />
      ) : thread.data.comments.length === 0 ? (
        <span className={s.hint}>No replies yet. Yours will be the first.</span>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {thread.data.comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Comment c={c} onReply={() => setReplyTo(c)} />
              {(c.replies ?? []).map((r) => (
                <div key={r.id} style={{ paddingLeft: 32 }}>
                  <Comment c={r} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {p?.isLocked ? null : (
        <label className={s.label}>
          {replyTo ? (
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <CornerDownRight size={14} aria-hidden="true" /> Replying to {replyTo.author.fullName}
              <button type="button" className={s.btnGhost} onClick={() => setReplyTo(null)}>
                Cancel
              </button>
            </span>
          ) : (
            'Your reply'
          )}
          <textarea
            className={s.textarea}
            value={text}
            maxLength={2000}
            placeholder="Answer as the creator. Learners see your CREATOR badge."
            onChange={(e) => setText(e.target.value)}
          />
        </label>
      )}
      {error && (
        <div className={s.errorBox} role="alert">
          <span>{error}</span>
        </div>
      )}
      <div className={s.sheetActions}>
        <button type="button" className={s.btn} onClick={onClose}>
          Close
        </button>
        {!p?.isLocked && (
          <button type="button" className={s.btnPrimary} disabled={busy || !text.trim()} onClick={() => void send()}>
            <Send size={16} aria-hidden="true" /> {busy ? 'Sending…' : 'Reply'}
          </button>
        )}
      </div>
    </Sheet>
  );
}

function Comment({ c, onReply }: { c: ThreadComment; onReply?: () => void }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <PersonAvatar face={c.author} size={30} />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: '8px 12px',
          borderRadius: 14,
          background: c.author.isCreator ? 'color-mix(in srgb, var(--color-brand) 8%, var(--bg-card))' : 'var(--bg-section)',
        }}
      >
        <span style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: 13.5 }}>{c.author.fullName}</strong>
          {c.author.isCreator && <Pill tone="var(--color-brand)">Creator</Pill>}
          <span className={s.hint}>{ago(c.createdAt)}</span>
        </span>
        <p style={{ margin: '4px 0 0', fontSize: 14.5, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{c.contentText}</p>
        {onReply && (
          <button type="button" className={s.btnGhost} style={{ minHeight: 28, padding: 0, fontSize: 12 }} onClick={onReply}>
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
