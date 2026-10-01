'use client';

/**
 * One conversation with Teyro: the user's messages on the right, Teyro
 * Support's on the left with Tey, a reply box, and "Mark as solved".
 * Replying to a solved conversation reopens it.
 */

import Image from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ArrowLeft, CheckCheck, RotateCw, Send } from 'lucide-react';
import { TEY_POSE_SRC } from '@/components/lesson/TeySays';
import { playSound } from '@/lib/audio/lessonSounds';
import { useHydrated } from '@/components/studio/useHydrated';
import {
  KIND_LABEL,
  STATUS_LABEL,
  closeTicket,
  replyTicket,
  supportFetch,
  supportKeys,
  type TicketThread,
} from '@/lib/support/support';
import u from './support.module.css';

const when = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export function TicketThreadView({ id, basePath }: { id: string; basePath: string }) {
  const hydrated = useHydrated();
  const { mutate: globalMutate } = useSWRConfig();
  const { data, error, mutate } = useSWR<TicketThread>(supportKeys.thread(id), supportFetch);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const thread = hydrated ? data : undefined;

  const refreshLists = () => void globalMutate((k) => typeof k === 'string' && k.startsWith('/api/support/') && !k.includes(id));

  const send = async () => {
    if (!draft.trim() || busy) return;
    setBusy(true);
    setErr(null);
    try {
      const next = await replyTicket(id, draft.trim());
      await mutate(next, { revalidate: false });
      setDraft('');
      playSound('comment');
      refreshLists();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const solve = async () => {
    setBusy(true);
    try {
      await closeTicket(id);
      playSound('toggleOn');
      await mutate();
      refreshLists();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={u.page}>
      <Link href={basePath} className={u.back}>
        <ArrowLeft size={18} aria-hidden="true" /> Help & feedback
      </Link>

      {error && !thread ? (
        <div className={u.errorBox} role="alert">
          <span>This conversation didn’t load.</span>
          <button type="button" className={u.btnGhostSm} onClick={() => void mutate()}>
            <RotateCw size={14} aria-hidden="true" /> Try again
          </button>
        </div>
      ) : !thread ? (
        <div className={u.list} aria-busy="true">
          <div className={u.skelRow} style={{ height: 60 }} />
          <div className={u.skelRow} style={{ height: 120 }} />
        </div>
      ) : (
        <>
          <header className={u.threadHead}>
            <span className={u.rowTop}>
              <span className={u.kind}>{KIND_LABEL[thread.kind]}</span>
              <span className={u.status} style={{ '--tone': STATUS_LABEL[thread.status].tone } as CSSProperties}>
                {STATUS_LABEL[thread.status].label}
              </span>
              <span className={u.ref}>{thread.publicId}</span>
            </span>
            <h1 className={u.threadTitle}>{thread.subject}</h1>
          </header>

          <ol className={u.messages}>
            {thread.replies.map((r) =>
              r.fromTeyro ? (
                <li key={r.id} className={u.msgTeyro}>
                  <Image src={TEY_POSE_SRC.welcome} alt="" width={44} height={52} className={u.msgTey} />
                  <div>
                    <span className={u.msgWho}>Teyro Support · {when(r.createdAt)}</span>
                    <p className={u.bubbleTeyro}>{r.message}</p>
                  </div>
                </li>
              ) : (
                <li key={r.id} className={u.msgMine}>
                  <div>
                    <span className={u.msgWho}>You · {when(r.createdAt)}</span>
                    <p className={u.bubbleMine}>{r.message}</p>
                  </div>
                </li>
              ),
            )}
          </ol>

          {thread.status === 'OPEN' && thread.replies.every((r) => !r.fromTeyro) && (
            <p className={u.note}>Thanks for writing in. The Teyro team will reply here, and you’ll get a notification when we do.</p>
          )}

          <form
            className={u.replyBox}
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label className={u.srOnly} htmlFor="support-reply">
              Your reply
            </label>
            <textarea
              id="support-reply"
              className={u.textarea}
              rows={3}
              maxLength={4000}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={thread.status === 'CLOSED' ? 'Still need help? Reply to reopen this conversation.' : 'Write a reply…'}
            />
            {err && (
              <p className={u.error} role="alert">
                {err}
              </p>
            )}
            <div className={u.replyActions}>
              {thread.status !== 'CLOSED' && (
                <button type="button" className={u.btnGhost} onClick={() => void solve()} disabled={busy}>
                  <CheckCheck size={18} aria-hidden="true" /> Mark as solved
                </button>
              )}
              <button type="submit" className={u.btnPrimary} disabled={busy || !draft.trim()}>
                <Send size={18} aria-hidden="true" /> Send
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
