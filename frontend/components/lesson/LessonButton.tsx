'use client';

/**
 * The lesson's one button: chunky, 3D, and it physically presses — the lip
 * underneath collapses as the face drops onto it. Colour says what pressing
 * does: blue to go on, green after a right answer, red after a wrong one.
 */

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export type LessonButtonVariant = 'primary' | 'correct' | 'wrong' | 'ghost';

const FACE: Record<LessonButtonVariant, { bg: string; lip: string; fg: string; border?: string }> = {
  primary: { bg: 'var(--color-brand)', lip: 'var(--color-brand-dark)', fg: 'white' },
  correct: { bg: 'var(--lesson-correct)', lip: 'var(--lesson-correct-dark)', fg: 'white' },
  wrong: { bg: 'var(--lesson-wrong)', lip: 'var(--lesson-wrong-dark)', fg: 'white' },
  ghost: { bg: 'white', lip: 'var(--border)', fg: 'var(--text-secondary)', border: 'var(--border)' },
};

export function LessonButton({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
  className = '',
  autoFocus,
}: {
  variant?: LessonButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  autoFocus?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const face = FACE[variant];
  const lip = disabled ? '0 0 0 transparent' : `0 4px 0 ${face.lip}`;

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      autoFocus={autoFocus}
      whileTap={disabled || reducedMotion ? undefined : { y: 4, boxShadow: `0 0px 0 ${face.lip}` }}
      transition={{ type: 'spring', stiffness: 800, damping: 30 }}
      className={[
        'h-[50px] md:h-[52px] px-6 rounded-[16px] text-[16px] font-extrabold uppercase tracking-[0.06em]',
        'flex items-center justify-center gap-2 select-none',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/30',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      style={{
        backgroundColor: disabled ? 'var(--border)' : face.bg,
        color: disabled ? 'var(--text-muted)' : face.fg,
        boxShadow: lip,
        border: face.border && !disabled ? `2px solid ${face.border}` : undefined,
        fontFamily: 'var(--font-jakarta)',
      }}
    >
      {children}
    </motion.button>
  );
}

export default LessonButton;
