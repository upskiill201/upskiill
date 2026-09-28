'use client';

/**
 * "Send us a message" — one sheet for every kind of message. Feedback asks
 * how Teyro feels (five faces); a question asks what it's about; a problem
 * asks what happened. On send, Tey confirms with the conversation number.
 */

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Angry, Frown, Laugh, Meh, Send, Smile, type LucideIcon } from 'lucide-react';
import { Sheet } from '@/components/studio/StudioParts';
import { playSound } from '@/lib/audio/lessonSounds';
import {
  CREATOR_TOPICS,
  LEARNER_TOPICS,
  createTicket,
  type SupportAudience,
  type SupportKind,
} from '@/lib/support/support';
import { TEY_POSE_SRC } from '@/components/lesson/TeySays';
import u from './support.module.css';

export type ComposerIntent = 'FEEDBACK' | 'IDEA' | 'BUG' | 'HELP';

const MOODS: { value: number; label: string; icon: LucideIcon }[] = [
  { value: 1, label: 'Frustrating', icon: Angry },
  { value: 2, label: 'Not great', icon: Frown },
  { value: 3, label: 'Okay', icon: Meh },
  { value: 4, label: 'Good', icon: Smile },
  { value: 5, label: 'Love it', icon: Laugh },
];

const COPY: Record<ComposerIntent, { title: string; prompt: string; placeholder: string; subject: boolean }> = {
  FEEDBACK: {
    title: 'Share feedback',
    prompt: 'What’s working, and what isn’t?',
    placeholder: 'Tell us anything: what you love, what gets in your way, what feels confusing…',
    subject: false,
  },
  IDEA: {
    title: 'Suggest an idea',
    prompt: 'What would make Teyro better for you?',
    placeholder: 'Describe your idea and what it would help you do.',
    subject: false,
  },
  BUG: {
    title: 'Report a problem',
    prompt: 'What happened?',
    placeholder: 'What were you doing, what did you expect, and what happened instead?',
    subject: true,
  },
  HELP: {
    title: 'Ask for help',
    prompt: 'How can we help?',
    placeholder: 'Tell us what you need help with. The more detail, the faster we can help.',
    subject: true,
  },
};

export function SupportComposer({
  open,
  intent,
  audience,
  basePath,
  onClose,
  onSent,
}: {
  open: boolean;
  intent: ComposerIntent;
  audience: SupportAudience;
  basePath: string;
  onClose: () => void;
  onSent: () => void;
}) {
  const topics = audience === 'CREATOR' ? CREATOR_TOPICS : LEARNER_TOPICS;
  const [mood, setMood] = useState<number | null>(null);
  const [topic, setTopic] = useState<SupportKind>(topics[0].kind);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ id: string; publicId: string } | null>(null);
  const copy = COPY[intent];

  // Each opening starts clean.
  useEffect(() => {
    if (!open) return;
    setMood(null);
    setTopic(topics[0].kind);
    setSubject('');
    setMessage('');
    setError(null);
    setSent(null);
  }, [open, intent, topics]);

  const kind: SupportKind = intent === 'HELP' ? topic : intent;
  const tooShort = message.trim().length < 5;

  const submit = async () => {
    if (tooShort || sending) return;
    setSending(true);
    setError(null);
    try {
      let pagePath: string | undefined;
      try {
        const ref = document.referrer ? new URL(document.referrer) : null;
        if (ref && ref.origin === window.location.origin) pagePath = ref.pathname;
      } catch {
        /* no usable referrer */
      }
      const res = await createTicket({
        audience,
        kind,
        subject: copy.subject && subject.trim() ? subject.trim() : undefined,
        message: message.trim(),
        mood: intent === 'FEEDBACK' && mood ? mood : undefined,
        pagePath,
      });
      playSound('post');
      setSent(res);
      onSent();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Sheet open={open} title={sent ? 'Message sent' : copy.title} onClose={onClose} labelledBy="support-composer-title">
      {sent ? (
        <div className={u.sent}>
          <Image src={TEY_POSE_SRC.cheering} alt="" width={112} height={134} />
          <strong>Thanks! We got it.</strong>
          <p>
            {intent === 'FEEDBACK' || intent === 'IDEA'
              ? 'Every message is read by the Teyro team. If we have a question, we’ll reply here.'
              : 'Our team will reply in this conversation, and you’ll get a notification when we do.'}
          </p>
          <span className={u.ref}>Reference {sent.publicId}</span>
          <div className={u.sentActions}>
            <Link href={`${basePath}/${sent.id}`} className={u.btnPrimary} onClick={onClose}>
              See conversation
            </Link>
            <button type="button" className={u.btnGhost} onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      ) : (
        <form
          className={u.form}
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          {intent === 'FEEDBACK' && (
            <fieldset className={u.fieldset}>
              <legend className={u.label}>How does Teyro feel right now?</legend>
              <div className={u.moods}>
                {MOODS.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      className={`${u.mood} ${mood === m.value ? u.moodOn : ''}`}
                      aria-pressed={mood === m.value}
                      aria-label={m.label}
                      onClick={() => {
                        setMood(m.value);
                        playSound('select', i);
                      }}
                    >
                      <Icon size={28} strokeWidth={2.2} aria-hidden="true" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {intent === 'HELP' && (
            <fieldset className={u.fieldset}>
              <legend className={u.label}>What is it about?</legend>
              <div className={u.chips}>
                {topics.map((t) => (
                  <button
                    key={t.kind}
                    type="button"
                    className={`${u.chip} ${topic === t.kind ? u.chipOn : ''}`}
                    aria-pressed={topic === t.kind}
                    onClick={() => setTopic(t.kind)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {copy.subject && (
            <label className={u.field}>
              <span className={u.label}>
                In a few words <span className={u.optional}>(optional)</span>
              </span>
              <input
                className={u.input}
                value={subject}
                maxLength={140}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={intent === 'BUG' ? 'e.g. The lesson froze on the last question' : 'e.g. How do I change my course price?'}
              />
            </label>
          )}

          <label className={u.field}>
            <span className={u.label}>{copy.prompt}</span>
            <textarea
              className={u.textarea}
              value={message}
              maxLength={4000}
              rows={6}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.placeholder}
            />
            <span className={u.counter}>{message.length}/4000</span>
          </label>

          {intent === 'BUG' && (
            <p className={u.note}>We’ll include the page you came from and your device type, so we can find the problem faster.</p>
          )}
          {error && (
            <p className={u.error} role="alert">
              {error}
            </p>
          )}

          <button type="submit" className={u.btnPrimary} disabled={tooShort || sending}>
            <Send size={18} aria-hidden="true" /> {sending ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}
    </Sheet>
  );
}
