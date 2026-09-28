'use client';

/**
 * Help & feedback — the same page for learners (/dashboard/help) and
 * creators (/creator/help), with each audience's own topics and answers.
 *
 *   Tey asks how we can help, over four big actions
 *   Your conversations with Teyro, replies flagged
 *   Quick answers to the common questions
 */

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Bug, ChevronRight, LifeBuoy, Lightbulb, MessageSquareHeart, RotateCw, type LucideIcon } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import { TEY_POSE_SRC } from '@/components/lesson/TeySays';
import { playSound } from '@/lib/audio/lessonSounds';
import { getCachedUser } from '@/lib/user-cache';
import { useHydrated } from '@/components/studio/useHydrated';
import {
  CREATOR_FAQ,
  KIND_LABEL,
  LEARNER_FAQ,
  STATUS_LABEL,
  supportFetch,
  supportKeys,
  type SupportAudience,
  type TicketSummary,
} from '@/lib/support/support';
import { SupportComposer, type ComposerIntent } from './SupportComposer';
import u from './support.module.css';

const ACTIONS: { intent: ComposerIntent; label: string; sub: Record<SupportAudience, string>; icon: LucideIcon; tone: string }[] = [
  {
    intent: 'FEEDBACK',
    label: 'Share feedback',
    sub: { LEARNER: 'Tell us how Teyro feels', CREATOR: 'Tell us how the Studio feels' },
    icon: MessageSquareHeart,
    tone: 'var(--brand-purple)',
  },
  {
    intent: 'IDEA',
    label: 'Suggest an idea',
    sub: { LEARNER: 'A feature or course you want', CREATOR: 'A tool that would help you teach' },
    icon: Lightbulb,
    tone: 'var(--warning)',
  },
  {
    intent: 'BUG',
    label: 'Report a problem',
    sub: { LEARNER: 'Something isn’t working', CREATOR: 'Something in the Studio broke' },
    icon: Bug,
    tone: 'var(--error-red)',
  },
  {
    intent: 'HELP',
    label: 'Ask for help',
    sub: { LEARNER: 'Lessons, payments, your account', CREATOR: 'Review, payouts, the Studio' },
    icon: LifeBuoy,
    tone: 'var(--color-brand)',
  },
];

function ago(iso: string) {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 14) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function SupportHub({
  audience,
  basePath,
  aside,
}: {
  audience: SupportAudience;
  basePath: string;
  /** Extra content under the actions (the creator guide card). */
  aside?: ReactNode;
}) {
  const hydrated = useHydrated();
  const { mutate: globalMutate } = useSWRConfig();
  const list = useSWR<TicketSummary[]>(supportKeys.list(audience), supportFetch);
  const [intent, setIntent] = useState<ComposerIntent | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cached?.fullName) setName(cached.fullName.trim().split(/\s+/)[0]);
    // ?new=bug|idea|feedback|help opens the composer straight away.
    const q = new URLSearchParams(window.location.search).get('new')?.toUpperCase();
    if (q && ['FEEDBACK', 'IDEA', 'BUG', 'HELP'].includes(q)) setIntent(q as ComposerIntent);
  }, []);

  const tickets = hydrated ? list.data : undefined;
  const faq = audience === 'CREATOR' ? CREATOR_FAQ : LEARNER_FAQ;

  return (
    <div className={u.page}>
      <header className={u.hero}>
        <Image src={TEY_POSE_SRC.waving} alt="" width={112} height={134} className={u.heroTey} priority />
        <div className={u.heroText}>
          <h1 className={u.title}>{name ? `Hi ${name}! How can we help?` : 'How can we help?'}</h1>
          <p className={u.sub}>
            {audience === 'CREATOR'
              ? 'Questions about your courses, payouts or the Studio, ideas for tools you need, or something broken: the Teyro team reads every message.'
              : 'Stuck, found a bug, or have an idea? Tell us. The Teyro team reads every message and replies right here.'}
          </p>
        </div>
      </header>

      <div className={u.actions}>
        {ACTIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <button
              key={a.intent}
              type="button"
              className={u.action}
              style={{ '--tone': a.tone } as CSSProperties}
              onClick={() => {
                setIntent(a.intent);
                playSound('navTap', i);
              }}
            >
              <span className={u.actionIcon} aria-hidden="true">
                <Icon size={26} strokeWidth={2.4} />
              </span>
              <span className={u.actionText}>
                <strong>{a.label}</strong>
                <span>{a.sub[audience]}</span>
              </span>
              <ChevronRight size={20} className={u.actionArrow} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {aside}

      <section className={u.section} aria-labelledby="support-convos">
        <h2 id="support-convos" className={u.sectionTitle}>
          Your conversations
        </h2>
        {list.error && !tickets ? (
          <div className={u.errorBox} role="alert">
            <span>Your conversations didn’t load.</span>
            <button type="button" className={u.btnGhostSm} onClick={() => void list.mutate()}>
              <RotateCw size={14} aria-hidden="true" /> Try again
            </button>
          </div>
        ) : !tickets ? (
          <div className={u.list} aria-busy="true">
            {[0, 1].map((i) => (
              <div key={i} className={u.skelRow} />
            ))}
          </div>
        ) : tickets.length === 0 ? (
          <div className={u.empty}>
            <Image src={TEY_POSE_SRC.searching} alt="" width={72} height={86} />
            <span>
              <strong>No conversations yet</strong>
              When you send us a message, you’ll find it and our reply here.
            </span>
          </div>
        ) : (
          <ul className={u.list}>
            {tickets.map((t) => {
              const st = STATUS_LABEL[t.status];
              return (
                <li key={t.id}>
                  <Link href={`${basePath}/${t.id}`} className={`${u.row} ${t.userUnread ? u.rowUnread : ''}`}>
                    <span className={u.rowMain}>
                      <span className={u.rowTop}>
                        <span className={u.kind}>{KIND_LABEL[t.kind]}</span>
                        <span className={u.status} style={{ '--tone': st.tone } as CSSProperties}>
                          {st.label}
                        </span>
                      </span>
                      <strong className={u.rowTitle}>{t.subject}</strong>
                      {t.preview && (
                        <span className={u.rowPreview}>
                          {t.preview.fromTeyro ? 'Teyro: ' : 'You: '}
                          {t.preview.text}
                        </span>
                      )}
                    </span>
                    <span className={u.rowSide}>
                      <span className={u.rowTime}>{ago(t.lastActivityAt)}</span>
                      {t.userUnread && <span className={u.unreadDot} aria-label="New reply" />}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className={u.section} aria-labelledby="support-faq">
        <h2 id="support-faq" className={u.sectionTitle}>
          Quick answers
        </h2>
        <Accordion items={faq} />
      </section>

      <SupportComposer
        open={intent !== null}
        intent={intent ?? 'FEEDBACK'}
        audience={audience}
        basePath={basePath}
        onClose={() => setIntent(null)}
        onSent={() => void globalMutate((k) => typeof k === 'string' && k.startsWith('/api/support/'))}
      />
    </div>
  );
}
