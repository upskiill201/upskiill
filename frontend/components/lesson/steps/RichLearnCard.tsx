'use client';

/**
 * The Teyro Originals Learn formats (docs/ORIGINALS_PLAYBOOK.md §4), one
 * screen each:
 *
 *   reading   a proper article page that scrolls
 *   story     a scene with the cast, ending in a decision
 *   chat      Tey teaches in a chat; tap a reply to move it along
 *   steps     a worked example, revealed one step at a time
 *   compare   before / after, with what changed
 *   explore   a real artefact with tappable phrases
 *   myth      quick-fire: myth or fact?
 *   tryIt     runnable Python (components/code), done once it runs cleanly
 *
 * None of these cost hearts. The interactive ones call `onDone` once the
 * learner has finished them (the player holds Continue until then); `done`
 * re-opens a finished card fully revealed when the learner swipes back.
 */

import DOMPurify from 'dompurify';
import { motion, useReducedMotion } from 'framer-motion';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import { useEffect, useMemo, useState } from 'react';
import { CAST_NAMES, type RichLearnCard, type StorySpeaker } from '@/lib/lesson/blocks';
import { inlineMarkdown } from '@/lib/lesson/inlineMarkdown';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { CodeBlock } from '../code/CodeBlock';
import { TryItCard } from '@/components/code/TryItCard';
import { TeySays } from '../TeySays';
import styles from '../Lesson.module.css';

const sanitize = (raw: string) => DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });

/** Kinds that must be finished before Continue lights up. */
export const GATED_RICH_KINDS = new Set<RichLearnCard['kind']>(['story', 'chat', 'steps', 'explore', 'myth', 'tryIt']);

/** A story without a decision has nothing to finish. */
export function richCardNeedsAction(card: RichLearnCard): boolean {
  if (card.kind === 'story') return Boolean(card.choice);
  return GATED_RICH_KINDS.has(card.kind);
}

function tap(n = 0) {
  playSound('select', n);
  playHaptic('selection', false);
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[24px] border-2 border-[var(--border)] bg-white p-5 md:p-7 ${className}`}
      style={{ boxShadow: '0 4px 0 var(--border)' }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <h2 className="text-[20px] md:text-[22px] font-extrabold text-ink leading-tight">{children}</h2>;
}

/** A chunky choice button, the same feel as exercise tiles. */
function ChoiceButton({
  onClick,
  disabled,
  tone = 'idle',
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  tone?: 'idle' | 'picked' | 'good' | 'bad';
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const border =
    tone === 'good'
      ? 'var(--lesson-correct)'
      : tone === 'bad'
        ? 'var(--lesson-wrong)'
        : tone === 'picked'
          ? 'var(--color-brand)'
          : 'var(--border)';
  const bg =
    tone === 'good'
      ? 'var(--lesson-correct-bg)'
      : tone === 'bad'
        ? 'var(--lesson-wrong-bg)'
        : tone === 'picked'
          ? 'var(--lesson-select-bg)'
          : 'var(--bg-card)';
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled || reduce ? undefined : { y: 2 }}
      className="w-full min-h-[52px] rounded-[16px] border-2 px-4 py-3 text-left text-[16px] font-bold text-ink leading-snug cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
      style={{ borderColor: border, backgroundColor: bg, boxShadow: `0 3px 0 ${border}` }}
    >
      {children}
    </motion.button>
  );
}

// ─── Reading ──────────────────────────────────────────────────────────────

function Reading({ card }: { card: Extract<RichLearnCard, { kind: 'reading' }> }) {
  return (
    <Panel>
      <CardTitle>{card.title}</CardTitle>
      <article
        className={`${styles.prose} ${card.title ? 'mt-3' : ''} text-[17px] md:text-[18px] leading-[1.7] text-ink`}
        dangerouslySetInnerHTML={{ __html: sanitize(inlineMarkdown(card.html)) }}
      />
    </Panel>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────

function speakerName(s: StorySpeaker): string | null {
  if (s === 'narrator') return null;
  if (s === 'tey') return 'Tey';
  return CAST_NAMES[s];
}

function Story({
  card,
  done,
  onDone,
}: {
  card: Extract<RichLearnCard, { kind: 'story' }>;
  done: boolean;
  onDone: () => void;
}) {
  const [pick, setPick] = useState<number | null>(done && card.choice ? Math.max(0, card.choice.options.findIndex((o) => o.best)) : null);
  const chosen = pick !== null && card.choice ? card.choice.options[pick] : null;

  return (
    <div className="flex flex-col gap-4">
      <Panel className="flex flex-col gap-3.5">
        <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--brand-purple)]">
          <Glyph name="sparkle" className="w-4 h-4" />
          {card.title ?? 'Story'}
        </p>
        {card.beats.map((b, i) => {
          const name = speakerName(b.speaker);
          return name ? (
            <p key={i} className="text-[17px] leading-[1.6] text-ink">
              <span className="font-extrabold" style={{ color: b.speaker === 'tey' ? 'var(--color-brand)' : 'var(--brand-purple)' }}>
                {name}:
              </span>{' '}
              <span className="font-semibold">{b.text}</span>
            </p>
          ) : (
            <p key={i} className="text-[17px] leading-[1.6] font-medium italic text-[var(--text-secondary)]">
              {b.text}
            </p>
          );
        })}
      </Panel>

      {card.choice && (
        <>
          <p className="text-[18px] font-extrabold text-ink leading-snug">{card.choice.prompt}</p>
          <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Your decision">
            {card.choice.options.map((o, i) => (
              <ChoiceButton
                key={i}
                disabled={pick !== null}
                tone={pick === null ? 'idle' : i === pick ? (o.best ? 'good' : 'picked') : o.best ? 'good' : 'idle'}
                onClick={() => {
                  tap(i);
                  setPick(i);
                  playSound(o.best ? 'correct' : 'cardNext');
                  onDone();
                }}
              >
                {o.text}
              </ChoiceButton>
            ))}
          </div>
          {chosen && (
            <TeySays pose={chosen.best ? 'cheering' : 'thinking'} lineKey={`story-${card.id}-${pick}`}>
              {chosen.outcome}
            </TeySays>
          )}
        </>
      )}
    </div>
  );
}

// ─── Chat with Tey ────────────────────────────────────────────────────────

function Chat({
  card,
  done,
  onDone,
}: {
  card: Extract<RichLearnCard, { kind: 'chat' }>;
  done: boolean;
  onDone: () => void;
}) {
  // How many Tey turns are on screen, and what the learner said after each.
  const [shown, setShown] = useState(done ? card.turns.length : 1);
  const [said, setSaid] = useState<string[]>(() => (done ? card.turns.map((t) => t.replies?.[0] ?? '') : []));
  const last = card.turns[shown - 1];
  const finished = shown >= card.turns.length && (!last?.replies?.length || said.length >= shown);

  useEffect(() => {
    if (finished && !done) onDone();
  }, [finished, done, onDone]);

  const reply = (text: string, i: number) => {
    tap(i);
    setSaid((s) => [...s, text]);
    if (shown < card.turns.length) {
      playSound('cardNext');
      setShown((n) => n + 1);
    }
  };

  return (
    <Panel className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-brand)]">
        <Glyph name="bubble" className="w-4 h-4" />
        Chat with Tey
      </p>
      {card.turns.slice(0, shown).map((t, i) => (
        <div key={i} className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-start max-w-[88%] rounded-[18px] rounded-bl-[6px] px-4 py-3 text-[16.5px] font-semibold leading-snug text-white whitespace-pre-line"
            style={{ backgroundColor: 'var(--color-brand)' }}
          >
            {t.tey}
          </motion.div>
          {said[i] && (
            <div
              className="self-end max-w-[80%] rounded-[18px] rounded-br-[6px] border-2 px-4 py-2.5 text-[16px] font-bold text-ink"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-section)' }}
            >
              {said[i]}
            </div>
          )}
        </div>
      ))}
      {!finished && (
        <div className="mt-1 flex flex-wrap justify-end gap-2" aria-label="Your reply">
          {(last?.replies?.length ? last.replies : ['Go on']).map((r, i) => (
            <button
              key={r}
              type="button"
              onClick={() => reply(r, i)}
              className="rounded-full border-2 px-4 py-2 text-[15px] font-extrabold cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
              style={{ borderColor: 'var(--color-brand)', color: 'var(--color-brand)', boxShadow: '0 3px 0 var(--color-brand)' }}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </Panel>
  );
}

// ─── Step-by-step walkthrough ─────────────────────────────────────────────

function Steps({
  card,
  done,
  onDone,
}: {
  card: Extract<RichLearnCard, { kind: 'steps' }>;
  done: boolean;
  onDone: () => void;
}) {
  const [shown, setShown] = useState(done ? card.steps.length : 1);
  const all = shown >= card.steps.length;

  useEffect(() => {
    if (all && !done) onDone();
  }, [all, done, onDone]);

  return (
    <div className="flex flex-col gap-3">
      <CardTitle>{card.title}</CardTitle>
      <ol className="flex flex-col gap-3">
        {card.steps.slice(0, shown).map((s, i) => (
          <motion.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Panel className="flex gap-4">
              <span
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[16px] font-extrabold text-white"
                style={{ backgroundColor: 'var(--color-brand)' }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex flex-col gap-2">
                <p className="text-[17px] font-extrabold text-ink leading-snug">{s.title}</p>
                <p className="text-[16px] font-semibold leading-[1.55] text-[var(--text-secondary)] whitespace-pre-line">{s.body}</p>
                {s.code && <CodeBlock code={s.code} language={s.language ?? 'plaintext'} compact />}
              </div>
            </Panel>
          </motion.li>
        ))}
      </ol>
      {!all && (
        <ChoiceButton
          onClick={() => {
            tap(shown);
            playSound('cardNext');
            setShown((n) => n + 1);
          }}
        >
          <span className="flex items-center justify-center gap-2 text-[var(--color-brand)]">
            <Glyph name="arrowDown" className="w-5 h-5 stroke-[2.6]" />
            Next step ({shown + 1} of {card.steps.length})
          </span>
        </ChoiceButton>
      )}
    </div>
  );
}

// ─── Before / After ───────────────────────────────────────────────────────

function Compare({ card }: { card: Extract<RichLearnCard, { kind: 'compare' }> }) {
  const sides = [
    { side: card.before, label: card.before.label ?? 'Before', tone: 'var(--lesson-wrong)', bg: 'var(--lesson-wrong-bg)', glyph: 'close' as GlyphName },
    { side: card.after, label: card.after.label ?? 'After', tone: 'var(--lesson-correct)', bg: 'var(--lesson-correct-bg)', glyph: 'check' as GlyphName },
  ];
  return (
    <div className="flex flex-col gap-3">
      <CardTitle>{card.title}</CardTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {sides.map(({ side, label, tone, bg, glyph }) => (
          <div key={label} className="rounded-[20px] border-2 p-4" style={{ borderColor: tone, backgroundColor: bg }}>
            <p className="flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.08em]" style={{ color: tone }}>
              <Glyph name={glyph} className="w-4 h-4 stroke-[3]" />
              {label}
            </p>
            <p className="mt-2 text-[16px] font-semibold leading-[1.55] text-ink whitespace-pre-line">{side.text}</p>
          </div>
        ))}
      </div>
      <Panel>
        <p className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-secondary)]">What changed</p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {card.notes.map((n, i) => (
            <li key={i} className="flex gap-2.5 text-[16px] font-semibold leading-snug text-ink">
              <Glyph name="chevron" className="w-5 h-5 shrink-0 mt-px text-[var(--color-brand)]" />
              {n}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

// ─── Tap to explore ───────────────────────────────────────────────────────

function Explore({
  card,
  done,
  onDone,
}: {
  card: Extract<RichLearnCard, { kind: 'explore' }>;
  done: boolean;
  onDone: () => void;
}) {
  const [seen, setSeen] = useState<Set<number>>(() => new Set(done ? card.hotspots.map((_, i) => i) : []));
  const [open, setOpen] = useState<number | null>(null);

  // Split the text around each hotspot's first appearance, in reading order.
  const parts = useMemo(() => {
    const marks = card.hotspots
      .map((h, i) => ({ i, at: card.text.indexOf(h.phrase), len: h.phrase.length }))
      .filter((m) => m.at >= 0)
      .sort((a, b) => a.at - b.at);
    const out: ({ text: string } | { hotspot: number; text: string })[] = [];
    let pos = 0;
    for (const m of marks) {
      if (m.at < pos) continue; // overlapping phrases: first one wins
      out.push({ text: card.text.slice(pos, m.at) });
      out.push({ hotspot: m.i, text: card.text.slice(m.at, m.at + m.len) });
      pos = m.at + m.len;
    }
    out.push({ text: card.text.slice(pos) });
    return out;
  }, [card.text, card.hotspots]);

  const all = seen.size >= card.hotspots.length;
  useEffect(() => {
    if (all && !done) onDone();
  }, [all, done, onDone]);

  const openHotspot = (i: number) => {
    tap(i);
    setOpen(i);
    setSeen((s) => new Set(s).add(i));
  };

  return (
    <div className="flex flex-col gap-3">
      <CardTitle>{card.title}</CardTitle>
      <p className="text-[14px] font-bold text-[var(--text-secondary)]">
        Tap each highlighted part ({seen.size} of {card.hotspots.length})
      </p>
      <Panel>
        <p className="text-[16.5px] leading-[2] font-semibold text-ink whitespace-pre-line">
          {parts.map((p, k) =>
            'hotspot' in p ? (
              // A span, not a <button>: browsers force buttons to inline-block,
              // which breaks a long phrase out of the sentence it belongs to.
              <span
                key={k}
                role="button"
                tabIndex={0}
                onClick={() => openHotspot(p.hotspot)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openHotspot(p.hotspot);
                  }
                }}
                className="rounded-[6px] px-1 underline decoration-2 underline-offset-4 cursor-pointer font-extrabold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
                style={{
                  // Keep the highlight on every line when the phrase wraps.
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                  backgroundColor: seen.has(p.hotspot) ? 'var(--lesson-select-bg)' : 'color-mix(in srgb, var(--warning) 22%, var(--bg-card))',
                  color: open === p.hotspot ? 'var(--lesson-picked-ink)' : 'inherit',
                }}
                aria-expanded={open === p.hotspot}
              >
                {p.text}
              </span>
            ) : (
              <span key={k}>{p.text}</span>
            ),
          )}
        </p>
      </Panel>
      {open !== null && (
        <TeySays pose="pointing" lineKey={`explore-${card.id}-${open}`}>
          {card.hotspots[open].note}
        </TeySays>
      )}
    </div>
  );
}

// ─── Myth or Fact ─────────────────────────────────────────────────────────

function Myth({
  card,
  done,
  onDone,
}: {
  card: Extract<RichLearnCard, { kind: 'myth' }>;
  done: boolean;
  onDone: () => void;
}) {
  const [answers, setAnswers] = useState<(boolean | null)[]>(() =>
    card.statements.map((s) => (done ? s.isFact : null)),
  );
  const all = answers.every((a) => a !== null);
  useEffect(() => {
    if (all && !done) onDone();
  }, [all, done, onDone]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[20px] md:text-[22px] font-extrabold text-ink">Myth or fact?</h2>
      {card.statements.map((s, i) => {
        const a = answers[i];
        const right = a !== null && a === s.isFact;
        return (
          <Panel key={i} className="flex flex-col gap-3">
            <p className="text-[17px] font-extrabold text-ink leading-snug">{s.text}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Myth', value: false, glyph: 'thumbDown' as GlyphName },
                { label: 'Fact', value: true, glyph: 'thumbUp' as GlyphName },
              ].map(({ label, value, glyph }) => (
                <ChoiceButton
                  key={label}
                  disabled={a !== null}
                  tone={a === null ? 'idle' : value === s.isFact ? 'good' : a === value ? 'bad' : 'idle'}
                  onClick={() => {
                    tap(i);
                    playSound(value === s.isFact ? 'correct' : 'cardBack');
                    setAnswers((prev) => prev.map((p, j) => (j === i ? value : p)));
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Glyph name={glyph} className="w-5 h-5 stroke-[2.5]" />
                    {label}
                  </span>
                </ChoiceButton>
              ))}
            </div>
            {a !== null && (
              <p className="text-[15.5px] font-semibold leading-[1.55] text-[var(--text-secondary)]">
                <span className="font-extrabold" style={{ color: right ? 'var(--lesson-correct-ink)' : 'var(--lesson-wrong-ink)' }}>
                  {right ? 'Right! ' : 'Not quite. '}
                  {s.isFact ? "It's a fact." : "It's a myth."}
                </span>{' '}
                {s.explain}
              </p>
            )}
          </Panel>
        );
      })}
    </div>
  );
}

export function RichLearnCardView({
  card,
  done,
  onDone,
}: {
  card: RichLearnCard;
  done: boolean;
  onDone: () => void;
}) {
  switch (card.kind) {
    case 'reading':
      return <Reading card={card} />;
    case 'story':
      return <Story card={card} done={done} onDone={onDone} />;
    case 'chat':
      return <Chat card={card} done={done} onDone={onDone} />;
    case 'steps':
      return <Steps card={card} done={done} onDone={onDone} />;
    case 'compare':
      return <Compare card={card} />;
    case 'explore':
      return <Explore card={card} done={done} onDone={onDone} />;
    case 'myth':
      return <Myth card={card} done={done} onDone={onDone} />;
    case 'tryIt':
      return <TryItCard card={card} done={done} onDone={onDone} />;
  }
}

export default RichLearnCardView;
