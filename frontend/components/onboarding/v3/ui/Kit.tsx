'use client';

/**
 * Onboarding v3's building blocks: the top bar, Tey talking in a bubble, the
 * chunky answer pieces, the footer and the hero moments. Every screen is
 * assembled from these so the whole flow moves and sounds the same.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { playTypingKey } from '@/lib/audio/onboardingAudio';
import { Art, type ArtName } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import css from './v3.module.css';

// ── Top bar ───────────────────────────────────────────────────────────────

export function TopBar(props: {
  progress: number;
  onBack?: () => void;
  backHidden?: boolean;
  muted?: boolean;
  onToggleSound?: () => void;
}) {
  const reduce = useReducedMotion();
  const pct = Math.round(Math.max(0, Math.min(1, props.progress)) * 100);
  return (
    <div className={css.top}>
      <div className={css.topInner}>
        <button type="button" className={css.iconBtn} onClick={props.onBack} disabled={props.backHidden} aria-label="Back">
          <Glyph name="back" size={26} />
        </button>
        <div
          className={css.track}
          role="progressbar"
          aria-label="Onboarding progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <motion.div
            className={css.fill}
            initial={false}
            animate={{ width: `${Math.max(6, pct)}%` }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 18 }}
          />
        </div>
        {props.onToggleSound && (
          <button
            type="button"
            className={css.iconBtn}
            onClick={props.onToggleSound}
            aria-label={props.muted ? 'Turn sound on' : 'Turn sound off'}
            aria-pressed={!props.muted}
          >
            <Glyph name={props.muted ? 'soundOff' : 'soundOn'} size={24} strokeWidth={2.6} />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Tey talking ───────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 24) {
  const reduce = useReducedMotion();
  // Progress belongs to one line of text: a new line starts again from 0.
  const [progress, setProgress] = useState({ text, n: 0 });
  const shown = reduce ? text.length : progress.text === text ? progress.n : 0;
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setProgress({ text, n: i });
      // Keystrokes, game-dialogue style: about every other letter, never on
      // a space, sometimes skipped so it sounds like a person typing.
      const ch = text[i - 1];
      if (ch && ch !== ' ' && i % 2 === 0 && Math.random() > 0.2) playTypingKey();
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, reduce]);
  return { typed: text.slice(0, shown), done: shown >= text.length };
}

/** The bubble's text types itself out; screen readers get it whole at once. */
function Spoken({ text }: { text: string }) {
  const { typed, done } = useTypewriter(text);
  return (
    <>
      <span aria-hidden="true">
        {typed}
        {!done && <span className={css.caret} />}
        {/* Holds the bubble at its final size so nothing jumps as it types. */}
        <span style={{ visibility: 'hidden' }}>{text.slice(typed.length)}</span>
      </span>
      <span className={css.srOnly} aria-live="polite">
        {text}
      </span>
    </>
  );
}

/** Tey beside a bubble holding the question (most screens). */
export function TeyLine({ teySrc, text, hopKey }: { teySrc: string; text: string; hopKey?: string | null }) {
  const reduce = useReducedMotion();
  return (
    <div className={css.teyRow}>
      <motion.div
        key={hopKey ?? 'still'}
        initial={reduce || !hopKey ? false : { y: 0, scale: 1 }}
        animate={reduce || !hopKey ? undefined : { y: [0, -14, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={teySrc} alt="" className={`${css.tey} ${css.teyFloat}`} width={96} height={96} />
      </motion.div>
      <div className={css.bubble}>
        <Spoken text={text} />
      </div>
    </div>
  );
}

/** Big Tey with the bubble above (hero moments). */
export function TeyHero({ teySrc, text, size = 168 }: { teySrc: string; text?: string; size?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className={css.teyHero}>
      {text && (
        <div className={css.bubbleUp}>
          <Spoken text={text} />
        </div>
      )}
      <motion.div
        initial={reduce ? false : { scale: 0.6, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={teySrc} alt="" width={size} height={size} className={css.teyFloat} style={{ objectFit: 'contain' }} />
      </motion.div>
    </div>
  );
}

// ── Answers ───────────────────────────────────────────────────────────────

export function ChoiceGroup(props: { label: string; layout?: 'list' | 'grid2' | 'grid3'; children: ReactNode }) {
  const cls = props.layout === 'grid2' ? css.grid2 : props.layout === 'grid3' ? css.grid3 : css.choices;
  return (
    <div role="radiogroup" aria-label={props.label} className={cls}>
      {props.children}
    </div>
  );
}

export function Choice(props: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  sub?: string;
  meta?: string;
  badge?: string;
  art?: ArtName;
  artSize?: number;
  media?: ReactNode;
  layout?: 'row' | 'tile' | 'small';
  index?: number;
  chevron?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const layout = props.layout ?? 'row';
  const size = props.artSize ?? (layout === 'tile' ? 64 : layout === 'small' ? 44 : 52);
  const cls = [css.choice, layout === 'tile' ? css.tile : layout === 'small' ? `${css.tile} ${css.tileSmall}` : '', props.className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={props.selected}
      onClick={props.onSelect}
      className={cls}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(10, props.index ?? 0) * 0.045, duration: 0.28, ease: 'easeOut' }}
    >
      {props.badge && <span className={css.badge}>{props.badge}</span>}
      {props.media ?? (props.art && (
        <span className={css.art} key={props.selected ? 'on' : 'off'}>
          <Art name={props.art} size={size} wiggle={props.selected} />
        </span>
      ))}
      <span className={layout === 'row' ? css.text : undefined}>
        <span className={css.label}>{props.label}</span>
        {props.sub && <span className={css.sub}>{props.sub}</span>}
      </span>
      {props.meta && <span className={css.meta}>{props.meta}</span>}
      {props.chevron && <Glyph name="chevron" size={22} className={css.chev} />}
      <AnimatePresence>
        {props.selected && !props.chevron && (
          <motion.span
            className={css.check}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 20 }}
            aria-hidden="true"
          >
            <Glyph name="check" size={16} strokeWidth={3.6} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ── Buttons, footer ───────────────────────────────────────────────────────

export function Btn({
  variant = 'primary',
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'green' | 'outline' | 'ghost' }) {
  const v = variant === 'green' ? css.btnGreen : variant === 'outline' ? css.btnOutline : variant === 'ghost' ? css.btnGhost : '';
  return <button type="button" {...rest} className={[css.btn, v, className ?? ''].filter(Boolean).join(' ')} />;
}

/** The sticky bottom: Tey's reaction to the last tap, then the button(s). */
export function Footer(props: { reaction?: string | null; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div className={css.footer} data-reacting={props.reaction ? 'true' : 'false'}>
      <div className={css.footerInner}>
        <AnimatePresence mode="wait">
          {props.reaction && (
            <motion.p
              key={props.reaction}
              className={css.reaction}
              role="status"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <span className={css.reactionIcon} aria-hidden="true">
                <Glyph name="check" size={18} strokeWidth={3.6} />
              </span>
              {props.reaction}
            </motion.p>
          )}
        </AnimatePresence>
        {props.children}
      </div>
    </div>
  );
}

// ── Screens ───────────────────────────────────────────────────────────────

/** One onboarding screen: top bar, a sliding body, a footer. */
export function Screen(props: {
  top?: ReactNode;
  footer?: ReactNode;
  stepKey: string;
  direction: 1 | -1;
  children: ReactNode;
  center?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={css.screen}>
      {props.top}
      <AnimatePresence mode="wait" initial={false} custom={props.direction}>
        <motion.main
          key={props.stepKey}
          className={`${css.body} ${props.center ? css.center : ''}`}
          custom={props.direction}
          initial={reduce ? false : { opacity: 0, x: 36 * props.direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -36 * props.direction }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {props.children}
        </motion.main>
      </AnimatePresence>
      {props.footer}
    </div>
  );
}

/** A full moment: big art, a title, a line, then whatever the moment needs. */
export function Hero(props: { art?: ReactNode; title?: string; body?: ReactNode; children?: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div className={css.hero}>
      {props.art && <div className={css.heroArt}>{props.art}</div>}
      {props.title && (
      <motion.h1
        className={css.heroTitle}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {props.title}
      </motion.h1>
      )}
      {props.body && (
        <motion.p
          className={css.heroBody}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          {props.body}
        </motion.p>
      )}
      {props.children}
    </div>
  );
}

export { css as kitCss };
