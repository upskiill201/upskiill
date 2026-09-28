'use client';

/**
 * Nudge a learner who went quiet or got stuck, or cheer one who's nearly
 * there. The note lands in their inbox (and on their phone when their
 * reminder settings allow) and opens their next lesson. `{first}` becomes
 * each learner's first name, so one note works for a whole group.
 *
 * Limits are the server's: a nudge per learner per course every 3 days, a
 * cheer once a day. Anyone skipped is reported back, never an error.
 */

import { useEffect, useState, type CSSProperties } from 'react';
import { BellRing, PartyPopper, Send } from 'lucide-react';
import { useSWRConfig } from 'swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { firstName, studioKeys, studioSend, type Face } from '@/lib/creator/studio';
import { Faces, Sheet, TeyLine, studio as s } from './StudioParts';

export type NudgeKind = 'NUDGE' | 'CHEER';

const TEMPLATES: Record<NudgeKind, string[]> = {
  NUDGE: [
    'Hey {first}, your next lesson is waiting. Ten minutes today keeps you moving.',
    'Hi {first}! Stuck on something? Ask in the community and I’ll help you through it.',
    '{first}, you’ve already done the hard part. Pick it back up today?',
  ],
  CHEER: [
    '{first}, you’re almost there! Finish strong.',
    'Great work so far, {first}. I’m proud of your progress!',
    'One last push, {first}. You’ve got this!',
  ],
};

const MAX = 240;

interface Result {
  sent: number;
  skipped: { learnerId: string; reason: 'RECENT' | 'NOT_ENROLLED' }[];
}

export function NudgeSheet({
  open,
  kind,
  courseId,
  courseTitle,
  learnerIds,
  faces,
  onClose,
  onSent,
}: {
  open: boolean;
  kind: NudgeKind;
  courseId: string;
  courseTitle?: string;
  learnerIds: string[];
  faces: Face[];
  onClose: () => void;
  onSent?: (r: Result) => void;
}) {
  const { mutate } = useSWRConfig();
  const [text, setText] = useState(TEMPLATES[kind][0]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!open) return;
    setText(TEMPLATES[kind][0]);
    setResult(null);
    setError(null);
  }, [open, kind]);

  const count = learnerIds.length;
  const sample = faces[0] ? firstName(faces[0].fullName) : 'Sam';
  const preview = text.replace(/\{first\}/g, sample);
  const who = count === 1 && faces[0] ? firstName(faces[0].fullName) : `${count} learners`;

  const send = async () => {
    if (busy || text.trim().length < 2) return;
    setBusy(true);
    setError(null);
    try {
      const r = await studioSend<Result>('/api/students/nudges', 'POST', {
        courseId,
        learnerIds: learnerIds.slice(0, 50),
        kind,
        message: text.trim(),
      });
      setResult(r);
      playSound(kind === 'NUDGE' ? 'nudgeSent' : 'cheerSent');
      playHaptic('success', false);
      onSent?.(r);
      void mutate(studioKeys.badges);
      void mutate((key) => typeof key === 'string' && (key.startsWith('/api/students') || key.includes('/pulse') || key.includes('/insight')));
    } catch (e) {
      playSound('wrong');
      setError(e instanceof Error ? e.message : 'That didn’t send. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const Icon = kind === 'NUDGE' ? BellRing : PartyPopper;
  const recent = result?.skipped.filter((x) => x.reason === 'RECENT').length ?? 0;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={result ? (kind === 'NUDGE' ? 'Nudge sent' : 'Cheer sent') : kind === 'NUDGE' ? `Nudge ${who}` : `Cheer on ${who}`}
    >
      {result ? (
        <>
          <TeyLine pose={result.sent > 0 ? 'cheering' : 'thinking'}>
            {result.sent > 0
              ? `Sent to ${result.sent === 1 ? who : `${result.sent} learners`}. It opens their next lesson.`
              : 'Nobody new to reach this time.'}
            {recent > 0 && (
              <>
                {' '}
                {recent} {recent === 1 ? 'was' : 'were'} {kind === 'NUDGE' ? 'nudged in the last 3 days' : 'cheered today'}, so
                they were skipped.
              </>
            )}
          </TeyLine>
          <button type="button" className={s.btnPrimary} onClick={onClose}>
            Done
          </button>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Faces faces={faces.slice(0, 5)} total={count} />
            <span className={s.hint}>
              {courseTitle ? `${courseTitle} · ` : ''}They get it in their inbox, and on their phone if reminders are on.
            </span>
          </div>

          <div className={s.chips} role="group" aria-label="Start from">
            {TEMPLATES[kind].map((t, i) => (
              <button
                key={t}
                type="button"
                className={`${s.chip} ${text === t ? s.chipOn : ''}`}
                onClick={() => {
                  setText(t);
                  playSound('select');
                }}
              >
                Idea {i + 1}
              </button>
            ))}
          </div>

          <label className={s.label}>
            Your note
            <textarea
              className={s.textarea}
              value={text}
              maxLength={MAX}
              onChange={(e) => setText(e.target.value)}
            />
            <span className={s.hint}>
              {'{first}'} becomes each learner’s first name · {MAX - text.length} left
            </span>
          </label>

          <div className={s.card} style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span className={s.statIcon} style={{ '--tone': kind === 'NUDGE' ? 'var(--color-brand)' : 'var(--success-green)' } as CSSProperties}>
              <Icon size={16} aria-hidden="true" />
            </span>
            <span style={{ fontSize: 14.5, lineHeight: 1.45 }}>
              <strong>{kind === 'NUDGE' ? 'You sent a nudge' : 'You’re cheering them on'}</strong>
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>{preview || '…'}</span>
            </span>
          </div>

          {error && (
            <div className={s.errorBox} role="alert">
              <span>{error}</span>
            </div>
          )}

          <div className={s.sheetActions}>
            <button type="button" className={s.btn} onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className={kind === 'NUDGE' ? s.btnPrimary : s.btnGood}
              disabled={busy || text.trim().length < 2 || count === 0}
              onClick={() => void send()}
            >
              <Send size={16} aria-hidden="true" />
              {busy ? 'Sending…' : kind === 'NUDGE' ? 'Send nudge' : 'Send cheer'}
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}
