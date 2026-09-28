'use client';

/**
 * Reflect, in two taps of the bar:
 *
 *   1. "How well did that land?" — one tap, four honest answers.
 *   2. Your own words — Tey answers what you tapped, the instructor's prompt
 *      follows, starter chips get a blank page moving. Optional: the button
 *      says SKIP until you've written something.
 *
 * The tap is the part everyone does; the writing is there for anyone who
 * wants it to stick. A forced 20-word minimum was where learners quit.
 */

import DOMPurify from 'dompurify';
import { motion, useReducedMotion } from 'framer-motion';
import { CircleHelp, Meh, Plus, Smile, ThumbsUp, type LucideIcon } from 'lucide-react';
import { countWords, type LessonContent } from '@/lib/lesson/content';
import { playHaptic } from '@/lib/haptics';
import type { Confidence } from '@/lib/tey/lessonVoice';
import { StepHeading } from './StepHeading';
import { TeySays } from '../TeySays';

const sanitize = (raw: string) => DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });

export const CONFIDENCE_OPTIONS: { id: Confidence; label: string; icon: LucideIcon; color: string }[] = [
  { id: 'solid', label: "I've got it", icon: ThumbsUp, color: 'var(--lesson-correct)' },
  { id: 'mostly', label: 'Mostly', icon: Smile, color: 'var(--color-brand)' },
  { id: 'fuzzy', label: 'Still a bit fuzzy', icon: Meh, color: 'var(--warning)' },
  { id: 'lost', label: "I'm lost", icon: CircleHelp, color: 'var(--brand-purple)' },
];

function AnswerBox({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label: string }) {
  const words = countWords(value);
  return (
    <div
      className="rounded-[18px] border-2 bg-white focus-within:border-[var(--brand-purple)] transition-colors"
      style={{ borderColor: words > 0 ? 'var(--brand-purple)' : 'var(--border)' }}
    >
      <textarea
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="block w-full resize-none rounded-[18px] bg-transparent px-4 pt-4 pb-2 text-[16px] font-medium text-ink leading-relaxed placeholder:text-[var(--text-muted)] focus:outline-none"
      />
      <div className="px-4 pb-3 flex justify-end">
        <span className="text-[13px] font-extrabold tabular-nums text-[var(--text-muted)]">
          {words === 1 ? '1 word' : `${words} words`}
        </span>
      </div>
    </div>
  );
}

export function ReflectStep({
  sub,
  reflect,
  confidence,
  onConfidence,
  teyLine,
  text,
  onText,
  guided,
  onGuided,
}: {
  sub: 'confidence' | 'write';
  reflect: LessonContent['reflect'];
  confidence: Confidence | null;
  onConfidence: (c: Confidence) => void;
  /** Tey's answer to the confidence tap. */
  teyLine: string;
  text: string;
  onText: (v: string) => void;
  guided: string[];
  onGuided: (i: number, v: string) => void;
}) {
  const reducedMotion = useReducedMotion();

  if (sub === 'confidence') {
    return (
      <div className="flex flex-col gap-5 md:gap-6">
        <StepHeading phase="reflect" title="How well did that land?" />
        <TeySays pose="thinking" lineKey="confidence">
          Be honest — there&apos;s no wrong answer here.
        </TeySays>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="How well did that land?">
          {CONFIDENCE_OPTIONS.map((o, i) => {
            const picked = confidence === o.id;
            const Icon = o.icon;
            return (
              <motion.button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={picked}
                onClick={() => onConfidence(o.id)}
                whileTap={reducedMotion ? undefined : { y: 3 }}
                animate={picked && !reducedMotion ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.25 }}
                className="rounded-[20px] border-2 p-4 md:p-5 flex flex-col items-center gap-2.5 text-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-purple)]/25"
                style={{
                  borderColor: picked ? o.color : 'var(--border)',
                  backgroundColor: picked ? `color-mix(in srgb, ${o.color} 12%, white)` : 'white',
                  boxShadow: `0 4px 0 ${picked ? o.color : 'var(--border)'}`,
                }}
              >
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `color-mix(in srgb, ${o.color} 16%, white)` }}
                >
                  <Icon className="w-7 h-7 stroke-[2.4]" style={{ color: o.color }} aria-hidden="true" />
                </span>
                <span className="text-[15.5px] md:text-[16px] font-extrabold text-ink leading-tight">{o.label}</span>
                <span className="sr-only">Press {i + 1}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <StepHeading phase="reflect" eyebrow="Reflect · In your words" />

      <TeySays pose="pointing" lineKey={`write-${confidence}`}>
        {teyLine}
      </TeySays>

      <div
        className="text-[18px] md:text-[20px] font-extrabold text-ink leading-snug"
        style={{ fontFamily: 'var(--font-jakarta)' }}
        dangerouslySetInnerHTML={{ __html: sanitize(reflect.prompt) }}
      />

      {reflect.type === 'open' ? (
        <>
          {reflect.starters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {reflect.starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    playHaptic('selection', false);
                    if (!text.includes(s)) onText(text ? `${text}\n${s} ` : `${s} `);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--border)] px-3.5 py-2 text-[14px] font-bold text-ink cursor-pointer hover:border-[var(--brand-purple)]"
                  style={{ boxShadow: '0 2px 0 var(--border)' }}
                >
                  <Plus className="w-4 h-4 stroke-[3] text-[var(--brand-purple)]" aria-hidden="true" />
                  {s}
                </button>
              ))}
            </div>
          )}
          <AnswerBox value={text} onChange={onText} placeholder="One line is plenty…" label="Your reflection" />
        </>
      ) : (
        <div className="flex flex-col gap-5">
          {reflect.guidedQuestions.map((q, i) => (
            <div key={i} className="flex flex-col gap-2.5">
              <p className="text-[16.5px] font-extrabold text-ink leading-snug">
                <span className="text-[var(--brand-purple)]">{i + 1}.</span> {q}
              </p>
              <AnswerBox value={guided[i] ?? ''} onChange={(v) => onGuided(i, v)} placeholder="Your answer…" label={q} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReflectStep;
