'use client';

/**
 * Learn — one short card at a time (lib/lesson/learnCards.ts).
 *
 * The first card carries the lesson title; the rest carry "Learn · 2 of 5"
 * and the creator's own heading. Cards swipe left to go on and right to go
 * back (the player owns the gesture); the dots under the card say where you
 * are in the stack.
 */

import DOMPurify from 'dompurify';
import { AlertTriangle, Check, Headphones, Info, Lightbulb, NotebookPen, Pin, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CodeBlock } from '../code/CodeBlock';
import type { LearnCard } from '@/lib/lesson/learnCards';
import { StepHeading } from './StepHeading';
import { TeySays } from '../TeySays';
import styles from '../Lesson.module.css';

const sanitize = (raw: string) => DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });

/** Plain text of a creator bullet, minus any leading emoji the editor let in. */
function bulletText(raw: string) {
  const text = raw
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
  return text.replace(/^[\p{Extended_Pictographic}️‍\s]+/u, '');
}

const CALLOUT = {
  tip: { label: 'Tip', tone: 'var(--color-brand)', icon: <Lightbulb className="w-6 h-6 stroke-[2.5]" /> },
  warning: { label: 'Watch out', tone: 'var(--warning)', icon: <AlertTriangle className="w-6 h-6 stroke-[2.5]" /> },
  remember: { label: 'Remember', tone: 'var(--brand-purple)', icon: <Pin className="w-6 h-6 stroke-[2.5]" /> },
} as const;

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[24px] border-2 border-[var(--border)] bg-white p-5 md:p-7"
      style={{ boxShadow: '0 4px 0 var(--border)' }}
    >
      {children}
    </div>
  );
}

export function LearnStep({
  title,
  card,
  index,
  total,
  points,
  onMediaEnded,
  checkPick = null,
  onCheckPick,
}: {
  title: string;
  card: LearnCard;
  index: number;
  total: number;
  /** "You'll learn to" bullets, for the intro card. */
  points: string[];
  onMediaEnded: () => void;
  /** Quick-check card: the answer picked so far (null = not yet). */
  checkPick?: number | null;
  onCheckPick?: (i: number) => void;
}) {
  const first = index === 0;
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <StepHeading
        phase="learn"
        eyebrow={total > 1 ? `Learn · ${index + 1} of ${total}` : undefined}
        title={first ? title : undefined}
      />

      {card.kind === 'intro' && (
        <>
          <TeySays pose="pointing" lineKey="intro">
            Here&apos;s what you&apos;ll be able to do by the end of this one.
          </TeySays>
          <Card>
            <ul className="flex flex-col gap-3.5">
              {points
                .slice(0, 5)
                .map(bulletText)
                .filter(Boolean)
                .map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-[16.5px] md:text-[17px] font-bold text-ink leading-snug">
                    <span
                      className="mt-[1px] shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--lesson-select-bg)' }}
                    >
                      <Check className="w-4 h-4 stroke-[3.5] text-[var(--color-brand)]" aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
            </ul>
          </Card>
        </>
      )}

      {card.kind === 'video' && (
        <div className="rounded-[24px] overflow-hidden bg-[var(--color-ink)] aspect-video">
          {/* #t=0.1 paints the first frame instead of a black box. */}
          <video
            src={`${card.url}#t=0.1`}
            controls
            playsInline
            preload="metadata"
            controlsList="nodownload"
            onEnded={onMediaEnded}
            onError={onMediaEnded}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      {(card.kind === 'video' || card.kind === 'audio') && card.caption && (
        <p className="-mt-2 text-center text-[15px] font-semibold text-[var(--text-secondary)]">{card.caption}</p>
      )}

      {card.kind === 'audio' && (
        <Card>
          <div className="flex flex-col items-center gap-4">
            <span
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--lesson-select-bg)' }}
            >
              <Headphones className="w-8 h-8 text-[var(--color-brand)]" aria-hidden="true" />
            </span>
            <audio src={card.url} controls onEnded={onMediaEnded} onError={onMediaEnded} className="w-full max-w-[480px]" />
          </div>
        </Card>
      )}

      {card.kind === 'text' && (
        <Card>
          <div
            className={`${styles.prose} text-[17px] md:text-[18px] leading-[1.65] text-ink`}
            dangerouslySetInnerHTML={{ __html: sanitize(card.html) }}
          />
        </Card>
      )}

      {card.kind === 'code' && <CodeBlock code={card.code} language={card.language} caption={card.caption} />}

      {card.kind === 'image' && (
        <figure className="m-0 flex flex-col gap-3">
          <div className="rounded-[24px] overflow-hidden border-2 border-[var(--border)] bg-white" style={{ boxShadow: '0 4px 0 var(--border)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- creator upload, any host */}
            <img src={card.url} alt={card.alt} className="w-full h-auto max-h-[60dvh] object-contain" />
          </div>
          {card.caption && <figcaption className="text-center text-[15px] font-semibold text-[var(--text-secondary)]">{card.caption}</figcaption>}
        </figure>
      )}

      {card.kind === 'callout' && (
        <div
          className="rounded-[24px] border-2 p-5 md:p-6 flex gap-4 items-start"
          style={{
            borderColor: `color-mix(in srgb, ${CALLOUT[card.tone].tone} 45%, var(--border))`,
            backgroundColor: `color-mix(in srgb, ${CALLOUT[card.tone].tone} 9%, white)`,
            boxShadow: `0 4px 0 color-mix(in srgb, ${CALLOUT[card.tone].tone} 45%, var(--border))`,
          }}
        >
          <span
            className="shrink-0 w-11 h-11 rounded-[14px] flex items-center justify-center text-white"
            style={{ backgroundColor: CALLOUT[card.tone].tone }}
            aria-hidden="true"
          >
            {CALLOUT[card.tone].icon}
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.08em]" style={{ color: CALLOUT[card.tone].tone }}>
              {CALLOUT[card.tone].label}
            </p>
            <p className="text-[17px] leading-[1.55] font-semibold text-ink whitespace-pre-line">{card.text}</p>
          </div>
        </div>
      )}

      {card.kind === 'check' && (
        <>
          <TeySays pose="thinking" lineKey={`check-${card.id}`}>
            Quick check! This one doesn&apos;t cost hearts.
          </TeySays>
          <Card>
            <p className="text-[18px] md:text-[19px] font-extrabold text-ink leading-snug">{card.question}</p>
            <div className="mt-4 flex flex-col gap-2.5" role="radiogroup" aria-label="Answers">
              {card.options.map((o, i) => {
                const picked = checkPick === i;
                const answered = checkPick !== null;
                const right = i === card.correctIndex;
                const tone = answered && right ? 'var(--lesson-correct)' : picked ? 'var(--lesson-wrong)' : 'var(--border)';
                return (
                  <motion.button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={picked}
                    disabled={answered}
                    onClick={() => onCheckPick?.(i)}
                    animate={picked && !right && !reduce ? { x: [0, -8, 8, -5, 5, 0] } : undefined}
                    transition={{ duration: 0.35 }}
                    className="w-full min-h-[52px] rounded-[16px] border-2 px-4 py-3 text-left text-[16px] font-bold text-ink flex items-center justify-between gap-3 disabled:cursor-default"
                    style={{
                      borderColor: tone,
                      boxShadow: `0 3px 0 ${tone}`,
                      backgroundColor: answered && (right || picked) ? `color-mix(in srgb, ${tone} 9%, white)` : 'white',
                    }}
                  >
                    {o}
                    {answered && right && <Check className="w-5 h-5 shrink-0 stroke-[3] text-[var(--lesson-correct)]" aria-label="Right answer" />}
                    {picked && !right && <X className="w-5 h-5 shrink-0 stroke-[3] text-[var(--lesson-wrong)]" aria-label="Your answer" />}
                  </motion.button>
                );
              })}
            </div>
            {checkPick !== null && card.explanation && (
              <p className="mt-4 text-[15.5px] leading-[1.55] font-semibold text-[var(--text-secondary)]">{card.explanation}</p>
            )}
          </Card>
        </>
      )}

      {card.kind === 'notes' && (
        <Card>
          <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            <NotebookPen className="w-4 h-4" aria-hidden="true" />
            From your instructor
          </p>
          <div className="mt-3 flex flex-col gap-3 text-[16.5px] leading-[1.6] text-ink font-medium">
            {card.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Card>
      )}

      {card.kind === 'empty' && (
        <Card>
          <div className="flex flex-col items-center text-center gap-2">
            <Info className="w-8 h-8 text-[var(--text-muted)]" aria-hidden="true" />
            <p className="text-[17px] font-extrabold text-ink">Nothing to read here yet</p>
            <p className="text-[15px] font-semibold text-[var(--text-secondary)]">
              The instructor hasn&apos;t added this part. Carry on to the next step.
            </p>
          </div>
        </Card>
      )}

      {total > 1 && (
        <div className="flex justify-center gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 22 : 8,
                backgroundColor: i <= index ? 'var(--color-brand)' : 'var(--border)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LearnStep;
