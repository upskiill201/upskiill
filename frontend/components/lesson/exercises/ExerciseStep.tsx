'use client';

/**
 * Apply, v2 — every exercise kind as a Duolingo screen. The player owns
 * CHECK / CONTINUE and grading (lib/lesson/blocks.ts gradeExercise); each
 * view here only collects the learner's response and, once answered, shows
 * what was right.
 *
 *   mcq         big pressable cards (with code above for "predict the output",
 *               long prompt cards for "pick the better prompt")
 *   fillBlank   tap words from the bank into the blanks; tap a blank to undo
 *   findBug     tap the line with the mistake
 *   orderLines  tap lines from the bank to build the answer, in order
 *   matchPairs  tap a term, then its meaning
 *
 * Every tap plays a note and a haptic; nothing needs a keyboard or dragging,
 * so it all works one-handed on a phone.
 */

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import {
  BLANK_RE,
  fillBlankBank,
  seededShuffle,
  type Exercise,
  type ExerciseResponse,
  type FillBlankExercise,
  type FindBugExercise,
  type MatchPairsExercise,
  type McqExercise,
  type OrderLinesExercise,
} from '@/lib/lesson/blocks';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { CodeBlock, CodeLine } from '../code/CodeBlock';
import { StepHeading } from '../steps/StepHeading';
import { TeySays, type TeyPose } from '../TeySays';
import type { AnswerState } from '../steps/ApplyStep';

type Tone = 'idle' | 'picked' | 'correct' | 'wrong' | 'muted';

const COLORS: Record<Tone, { border: string; bg: string; ink: string }> = {
  idle: { border: 'var(--border)', bg: 'white', ink: 'var(--color-ink)' },
  picked: { border: 'var(--color-brand)', bg: 'var(--lesson-select-bg)', ink: 'var(--color-brand-deep)' },
  correct: { border: 'var(--lesson-correct)', bg: 'var(--lesson-correct-bg)', ink: 'var(--lesson-correct-ink)' },
  wrong: { border: 'var(--lesson-wrong)', bg: 'var(--lesson-wrong-bg)', ink: 'var(--lesson-wrong-ink)' },
  muted: { border: 'var(--border)', bg: 'var(--bg-section)', ink: 'var(--text-muted)' },
};

function tap(n = 0) {
  playSound('select', n);
  playHaptic('selection', false);
}

/** The chunky 3D tile every exercise uses. */
function Tile({
  tone,
  onClick,
  disabled,
  children,
  mono = false,
  className = '',
  label,
}: {
  tone: Tone;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  mono?: boolean;
  className?: string;
  label?: string;
}) {
  const reduce = useReducedMotion();
  const c = COLORS[tone];
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      animate={reduce ? undefined : tone === 'wrong' ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.3 }}
      whileTap={disabled || reduce ? undefined : { y: 2 }}
      className={`rounded-[14px] border-2 px-3.5 py-2.5 text-left font-bold leading-snug cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25 ${mono ? 'font-mono text-[15px]' : 'text-[16px]'} ${className}`}
      style={{ borderColor: c.border, backgroundColor: c.bg, color: c.ink, boxShadow: `0 3px 0 ${c.border}` }}
    >
      {children}
    </motion.button>
  );
}

export interface ExerciseStepProps {
  exercise: Exercise;
  /** "Apply · 2 of 5", or "Fix a mistake". */
  eyebrow: string;
  scenario: string;
  response: ExerciseResponse | null;
  onResponse: (r: ExerciseResponse) => void;
  answer: AnswerState;
  tey: { pose: TeyPose; line: string; key: string | number };
}

const DEFAULT_LINE: Record<Exercise['kind'], string> = {
  mcq: 'Pick the answer you think is right.',
  fillBlank: 'Tap the words to fill the blanks.',
  findBug: 'Read it carefully, then tap the line that is wrong.',
  orderLines: 'Tap the lines in the order they should go.',
  matchPairs: 'Tap a term, then the thing it matches.',
};

export function ExerciseStep(props: ExerciseStepProps) {
  const { exercise, eyebrow, scenario, tey } = props;
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <StepHeading phase="apply" eyebrow={eyebrow} title={exercise.prompt} />
      <TeySays pose={tey.pose} lineKey={tey.key} size="sm">
        {tey.line || scenario || DEFAULT_LINE[exercise.kind]}
      </TeySays>
      {exercise.kind === 'mcq' && <McqView {...props} exercise={exercise} />}
      {exercise.kind === 'fillBlank' && <FillBlankView {...props} exercise={exercise} />}
      {exercise.kind === 'findBug' && <FindBugView {...props} exercise={exercise} />}
      {exercise.kind === 'orderLines' && <OrderLinesView {...props} exercise={exercise} />}
      {exercise.kind === 'matchPairs' && <MatchPairsView {...props} exercise={exercise} />}
    </div>
  );
}

type ViewProps<E> = Omit<ExerciseStepProps, 'exercise'> & { exercise: E };

// ─── Multiple choice ──────────────────────────────────────────────────────

function McqView({ exercise, response, onResponse, answer }: ViewProps<McqExercise>) {
  const locked = answer !== 'idle';
  const picked = response?.kind === 'mcq' ? response.optionId : null;
  const long = exercise.variant === 'pickPrompt';

  return (
    <>
      {exercise.code && <CodeBlock code={exercise.code} language={exercise.language} compact />}
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Answers">
        {exercise.options.map((o, i) => {
          const isPicked = picked === o.id;
          const tone: Tone =
            isPicked && answer === 'correct'
              ? 'correct'
              : isPicked && answer === 'wrong'
                ? 'wrong'
                : answer === 'wrong' && o.id === exercise.correctOptionId
                  ? 'correct'
                  : isPicked
                    ? 'picked'
                    : 'idle';
          return (
            <Tile
              key={o.id}
              tone={tone}
              disabled={locked}
              mono={exercise.variant === 'predictOutput'}
              className={`w-full ${long ? 'min-h-[72px] whitespace-pre-line' : 'min-h-[60px]'} flex items-start gap-3`}
              onClick={() => {
                tap(i);
                onResponse({ kind: 'mcq', optionId: o.id });
              }}
            >
              <span
                className="shrink-0 w-7 h-7 rounded-[9px] border-2 flex items-center justify-center text-[13px] font-extrabold font-sans"
                style={{ borderColor: COLORS[tone].border }}
                aria-hidden="true"
              >
                {long ? String.fromCharCode(65 + i) : i + 1}
              </span>
              <span className="pt-0.5">{o.text}</span>
            </Tile>
          );
        })}
      </div>
    </>
  );
}

// ─── Fill in the blanks ───────────────────────────────────────────────────

function FillBlankView({ exercise, response, onResponse, answer }: ViewProps<FillBlankExercise>) {
  const locked = answer !== 'idle';
  const bank = useMemo(() => fillBlankBank(exercise), [exercise]);
  const filled: (string | null)[] =
    response?.kind === 'fillBlank' ? response.filled : exercise.blanks.map(() => null);

  // How many times each word is used, so a word can't be placed twice.
  const used = (w: string) => filled.filter((f) => f === w).length;
  const available = (w: string) => used(w) < bank.filter((b) => b === w).length;

  const place = (w: string) => {
    const slot = filled.indexOf(null);
    if (slot < 0 || !available(w)) return;
    tap(slot);
    const next = [...filled];
    next[slot] = w;
    onResponse({ kind: 'fillBlank', filled: next });
  };

  const clear = (i: number) => {
    if (filled[i] === null) return;
    playSound('cardBack');
    const next = [...filled];
    next[i] = null;
    onResponse({ kind: 'fillBlank', filled: next });
  };

  // Split the template into text and blank slots ("[[1]]" → slot 0).
  const parts = useMemo(() => {
    const out: ({ text: string } | { slot: number })[] = [];
    let last = 0;
    let n = 0;
    for (const m of exercise.template.matchAll(BLANK_RE)) {
      out.push({ text: exercise.template.slice(last, m.index) });
      out.push({ slot: n++ });
      last = (m.index ?? 0) + m[0].length;
    }
    out.push({ text: exercise.template.slice(last) });
    return out;
  }, [exercise.template]);

  const isCode = Boolean(exercise.language && exercise.language !== 'plaintext');

  const slotTone = (i: number): Tone => {
    if (answer === 'idle') return filled[i] ? 'picked' : 'muted';
    const ok = exercise.blanks[i]?.answers.some((a) => a.trim() === (filled[i] ?? '').trim());
    return ok ? 'correct' : 'wrong';
  };

  return (
    <>
      <div
        className={`rounded-[20px] border-2 p-4 md:p-5 leading-[2.4] ${isCode ? 'font-mono text-[15px] whitespace-pre-wrap' : 'text-[18px] font-bold text-ink'}`}
        style={
          isCode
            ? { backgroundColor: 'var(--color-ink)', borderColor: 'var(--color-ink)', color: 'color-mix(in srgb, white 90%, var(--color-ink))' }
            : { borderColor: 'var(--border)', backgroundColor: 'white' }
        }
      >
        {parts.map((p, i) =>
          'text' in p ? (
            <span key={i}>{p.text}</span>
          ) : (
            <button
              key={i}
              type="button"
              disabled={locked || filled[p.slot] === null}
              onClick={() => clear(p.slot)}
              aria-label={filled[p.slot] ? `Blank ${p.slot + 1}: ${filled[p.slot]}. Tap to remove.` : `Blank ${p.slot + 1}, empty`}
              className="inline-flex align-middle min-w-[64px] min-h-[38px] mx-1 px-2.5 rounded-[10px] border-2 border-b-4 items-center justify-center font-bold"
              style={{
                borderColor: COLORS[slotTone(p.slot)].border,
                backgroundColor: COLORS[slotTone(p.slot)].bg,
                color: COLORS[slotTone(p.slot)].ink,
                fontFamily: isCode ? 'ui-monospace, Menlo, Consolas, monospace' : undefined,
              }}
            >
              {filled[p.slot] ?? ' '}
            </button>
          ),
        )}
      </div>

      {answer === 'wrong' && (
        <p className="text-[15px] font-bold text-[var(--lesson-correct-ink)]">
          Answer: {exercise.blanks.map((b) => b.answers[0]).join(', ')}
        </p>
      )}

      <div className="flex flex-wrap gap-2.5 justify-center" aria-label="Word bank">
        {bank.map((w, i) => {
          const gone = !available(w);
          return (
            <Tile key={`${w}-${i}`} tone={gone ? 'muted' : 'idle'} disabled={locked || gone} mono={isCode} onClick={() => place(w)}>
              <span style={{ visibility: gone ? 'hidden' : 'visible' }}>{w}</span>
            </Tile>
          );
        })}
      </div>
    </>
  );
}

// ─── Find the bug ─────────────────────────────────────────────────────────

function FindBugView({ exercise, response, onResponse, answer }: ViewProps<FindBugExercise>) {
  const locked = answer !== 'idle';
  const picked = response?.kind === 'findBug' ? response.line : null;
  const isCode = Boolean(exercise.language && exercise.language !== 'plaintext');

  return (
    <>
      <div
        className="rounded-[20px] overflow-hidden border-2"
        style={isCode ? { backgroundColor: 'var(--color-ink)', borderColor: 'var(--color-ink)' } : { backgroundColor: 'white', borderColor: 'var(--border)' }}
        role="radiogroup"
        aria-label="Lines"
      >
        {exercise.lines.map((line, i) => {
          const tone: Tone =
            answer !== 'idle' && i === exercise.bugLine
              ? picked === i
                ? 'correct'
                : 'wrong'
              : picked === i
                ? answer === 'idle'
                  ? 'picked'
                  : 'wrong'
                : 'idle';
          const active = tone !== 'idle';
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={picked === i}
              disabled={locked}
              onClick={() => {
                tap(i);
                onResponse({ kind: 'findBug', line: i });
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left border-l-4 transition-colors disabled:cursor-default disabled:opacity-100"
              style={{
                borderLeftColor: active ? COLORS[tone].border : 'transparent',
                backgroundColor: active
                  ? `color-mix(in srgb, ${COLORS[tone].border} ${isCode ? 30 : 14}%, transparent)`
                  : 'transparent',
              }}
            >
              <span
                className="shrink-0 w-6 text-right font-mono text-[13px]"
                style={{ color: isCode ? 'color-mix(in srgb, white 45%, var(--color-ink))' : 'var(--text-muted)' }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="min-w-0 overflow-x-auto">
                {isCode ? (
                  <CodeLine text={line} language={exercise.language} onDark />
                ) : (
                  <span className="text-[16px] font-semibold text-ink">{line}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {answer !== 'idle' && exercise.fix && (
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--lesson-correct-ink)]">The fix</p>
          <CodeBlock code={exercise.fix} language={exercise.language} compact />
        </div>
      )}
    </>
  );
}

// ─── Put in order ─────────────────────────────────────────────────────────

function OrderLinesView({ exercise, response, onResponse, answer }: ViewProps<OrderLinesExercise>) {
  const locked = answer !== 'idle';
  const order = response?.kind === 'orderLines' ? response.order : [];
  const shuffled = useMemo(
    () => seededShuffle(exercise.lines.map((_, i) => i), exercise.id),
    [exercise.id, exercise.lines],
  );
  const isCode = Boolean(exercise.language && exercise.language !== 'plaintext');

  const add = (idx: number) => {
    if (order.includes(idx)) return;
    tap(order.length);
    onResponse({ kind: 'orderLines', order: [...order, idx] });
  };
  const remove = (pos: number) => {
    playSound('cardBack');
    onResponse({ kind: 'orderLines', order: order.filter((_, p) => p !== pos) });
  };

  const placedTone = (pos: number): Tone => {
    if (answer === 'idle') return 'picked';
    return (exercise.lines[order[pos]] ?? '').trim() === (exercise.lines[pos] ?? '').trim() ? 'correct' : 'wrong';
  };

  return (
    <>
      <ol
        className="min-h-[120px] rounded-[20px] border-2 border-dashed p-3 flex flex-col gap-2"
        style={{ borderColor: 'var(--border-strong)' }}
        aria-label="Your answer"
      >
        {order.length === 0 && (
          <li className="m-auto text-[15px] font-semibold text-[var(--text-muted)]">Tap the lines below in order</li>
        )}
        {order.map((idx, pos) => (
          <li key={`${idx}-${pos}`}>
            <Tile tone={placedTone(pos)} disabled={locked} mono={isCode} className="w-full flex items-center gap-3" onClick={() => remove(pos)}>
              <span className="shrink-0 font-sans text-[13px] font-extrabold opacity-70">{pos + 1}</span>
              {isCode ? <CodeLine text={exercise.lines[idx]} language={exercise.language} /> : exercise.lines[idx]}
            </Tile>
          </li>
        ))}
      </ol>

      {answer === 'wrong' && (
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--lesson-correct-ink)]">Right order</p>
          {isCode ? (
            <CodeBlock code={exercise.lines.join('\n')} language={exercise.language} compact />
          ) : (
            <ol className="list-decimal pl-6 text-[16px] font-bold text-ink flex flex-col gap-1">
              {exercise.lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ol>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2" aria-label="Lines to place">
        {shuffled.map((idx) => {
          const gone = order.includes(idx);
          return (
            <Tile key={idx} tone={gone ? 'muted' : 'idle'} disabled={locked || gone} mono={isCode} className="w-full" onClick={() => add(idx)}>
              <span style={{ visibility: gone ? 'hidden' : 'visible' }}>
                {isCode ? <CodeLine text={exercise.lines[idx]} language={exercise.language} /> : exercise.lines[idx]}
              </span>
            </Tile>
          );
        })}
      </div>
    </>
  );
}

// ─── Match pairs ──────────────────────────────────────────────────────────

/** Pair colours, so each made match reads at a glance. */
const PAIR_TONES = ['var(--color-brand)', 'var(--brand-purple)', 'var(--warning)', 'var(--success-green)', 'var(--brand-indigo)', 'var(--error-red)'];

function MatchPairsView({ exercise, response, onResponse, answer }: ViewProps<MatchPairsExercise>) {
  const locked = answer !== 'idle';
  const matches = response?.kind === 'matchPairs' ? response.matches : {};
  const pending = response?.kind === 'matchPairs' ? response.pendingLeft ?? null : null;
  const lefts = useMemo(() => seededShuffle(exercise.pairs, `${exercise.id}-l`), [exercise.id, exercise.pairs]);
  const rights = useMemo(() => seededShuffle(exercise.pairs, `${exercise.id}-r`), [exercise.id, exercise.pairs]);

  const matchedRight = (rightId: string) => Object.entries(matches).find(([, r]) => r === rightId)?.[0] ?? null;
  const toneFor = (leftId: string | null) =>
    leftId ? PAIR_TONES[Object.keys(matches).indexOf(leftId) % PAIR_TONES.length] : null;

  const emit = (next: Record<string, string>, pendingLeft: string | null) =>
    onResponse({ kind: 'matchPairs', matches: next, ...(pendingLeft ? { pendingLeft } : {}) });

  const pickLeft = (id: string) => {
    if (matches[id]) {
      // Tapping a made pair undoes it.
      playSound('cardBack');
      const next = { ...matches };
      delete next[id];
      emit(next, null);
      return;
    }
    tap(0);
    emit(matches, pending === id ? null : id);
  };

  const pickRight = (id: string) => {
    const owner = matchedRight(id);
    if (owner) {
      playSound('cardBack');
      const next = { ...matches };
      delete next[owner];
      emit(next, pending);
      return;
    }
    if (!pending) return;
    tap(3);
    emit({ ...matches, [pending]: id }, null);
  };

  const resultTone = (leftId: string): Tone => (matches[leftId] === leftId ? 'correct' : 'wrong');

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2.5" aria-label="Terms">
          {lefts.map((p) => {
            const made = Boolean(matches[p.id]);
            const tone: Tone = locked ? resultTone(p.id) : pending === p.id ? 'picked' : 'idle';
            const pairTone = !locked && made ? toneFor(p.id) : null;
            return (
              <Tile key={p.id} tone={tone} disabled={locked} className="w-full min-h-[56px] flex items-center justify-between gap-2" onClick={() => pickLeft(p.id)}>
                <span>{p.left}</span>
                {pairTone && <span className="shrink-0 w-3 h-3 rounded-full" style={{ backgroundColor: pairTone }} aria-label="Matched" />}
              </Tile>
            );
          })}
        </div>
        <div className="flex flex-col gap-2.5" aria-label="Meanings">
          {rights.map((p) => {
            const owner = matchedRight(p.id);
            const tone: Tone = locked ? (owner ? resultTone(owner) : 'idle') : 'idle';
            const pairTone = !locked && owner ? toneFor(owner) : null;
            return (
              <Tile key={p.id} tone={tone} disabled={locked || (!pending && !owner)} className="w-full min-h-[56px] flex items-center justify-between gap-2" onClick={() => pickRight(p.id)}>
                <span>{p.right}</span>
                {pairTone && <span className="shrink-0 w-3 h-3 rounded-full" style={{ backgroundColor: pairTone }} aria-label="Matched" />}
              </Tile>
            );
          })}
        </div>
      </div>
      {answer === 'wrong' && (
        <ul className="flex flex-col gap-1.5 text-[15px] font-bold text-[var(--lesson-correct-ink)]">
          {exercise.pairs.map((p) => (
            <li key={p.id} className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 stroke-[3]" aria-hidden="true" />
              {p.left} <span aria-hidden="true">→</span> {p.right}
            </li>
          ))}
        </ul>
      )}
      {!locked && Object.keys(matches).length > 0 && (
        <p className="text-center text-[13px] font-semibold text-[var(--text-muted)]">Tap a match to undo it.</p>
      )}
    </>
  );
}

/** Tick or cross for results summaries elsewhere. */
export function ResultMark({ ok }: { ok: boolean }) {
  return ok ? (
    <Check className="w-5 h-5 stroke-[3] text-[var(--lesson-correct)]" aria-label="Right" />
  ) : (
    <X className="w-5 h-5 stroke-[3] text-[var(--lesson-wrong)]" aria-label="Wrong" />
  );
}

export default ExerciseStep;
