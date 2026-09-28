'use client';

/**
 * OptionCard — the answer card used by every question step.
 *
 * Accessibility notes that are load-bearing, not decoration:
 *  - Real <button> elements, so keyboard and screen readers get them free.
 *  - `role="radio"` / `role="checkbox"` + `aria-checked` so selection state is
 *    announced, not just drawn.
 *  - Selection is signalled THREE ways — a check icon, a border change and
 *    the aria state — because color alone is not an accessible signal.
 *  - Minimum 60px target height, comfortably over the 44px touch guideline,
 *    and the whole card is the target rather than a small control inside it.
 *
 * The chunky bottom edge (a solid 0-blur shadow that collapses on press) is
 * what makes these feel like tappable game pieces rather than form rows.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

export interface OptionCardProps {
  id: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  /** Multi-select renders a checkbox role; single-select a radio. */
  multi?: boolean;
  /** Rendered less prominently — used for "I'm still figuring it out". */
  secondary?: boolean;
  /** Optional illustration. Decorative: the label carries the meaning. */
  imageSrc?: string;
  /** Decorative icon, drawn in a tinted tile. */
  icon?: ReactNode;
  /** Colour for the icon tile — any CSS colour, normally a token var. */
  tone?: string;
  badge?: string;
  disabled?: boolean;
}

export function OptionCard({
  id,
  label,
  description,
  selected,
  onSelect,
  multi = false,
  secondary = false,
  imageSrc,
  icon,
  tone = 'var(--color-brand)',
  badge,
  disabled = false,
}: OptionCardProps) {
  const reducedMotion = useReducedMotion();

  const edge = selected ? 'var(--color-brand)' : 'var(--border)';

  return (
    <motion.button
      type="button"
      id={`option-${id}`}
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      whileTap={reducedMotion || disabled ? undefined : { y: 3, boxShadow: `0 0px 0 ${edge}` }}
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      className={[
        'group relative w-full flex items-center gap-3 md:gap-4 rounded-[16px] text-left',
        'border-2 transition-colors duration-150 cursor-pointer',
        secondary
          ? 'min-h-[54px] px-4 py-2.5'
          : description
            ? 'min-h-[60px] md:min-h-[68px] px-3.5 md:px-4 py-3'
            : 'min-h-[56px] md:min-h-[64px] px-3.5 md:px-4 py-2.5',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        selected ? 'border-brand bg-band' : 'border-[var(--border)] bg-white hover:bg-slate-50',
      ].join(' ')}
      style={{ boxShadow: `0 3px 0 ${edge}` }}
    >
      {imageSrc && (
        <span className="relative w-11 h-11 shrink-0">
          <Image src={imageSrc} alt="" aria-hidden="true" fill className="object-contain" />
        </span>
      )}
      {!imageSrc && icon && (
        <span
          aria-hidden="true"
          className="shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-[12px] flex items-center justify-center [&>svg]:w-[22px] [&>svg]:h-[22px] [&>svg]:stroke-[2.25]"
          style={
            {
              color: tone,
              backgroundColor: `color-mix(in srgb, ${tone} 13%, white)`,
            } as CSSProperties
          }
        >
          {icon}
        </span>
      )}

      <span className="flex-1 min-w-0">
        <span
          className={[
            'block font-extrabold leading-tight',
            selected ? 'text-brand-deep' : 'text-ink',
            secondary ? 'text-[15px]' : 'text-[16px] md:text-[17px]',
          ].join(' ')}
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {label}
        </span>
        {description && (
          // Long labels wrap rather than clip — several of these run to two
          // lines on a 360px viewport.
          <span className="block text-[13.5px] md:text-[14px] leading-snug text-ink-soft mt-0.5">
            {description}
          </span>
        )}
      </span>

      {badge && (
        <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wide text-white">
          {badge}
        </span>
      )}

      {/* The non-color half of the selection signal. Round for pick-one,
          square for pick-many — the shape tells you the rule before you tap. */}
      <span
        aria-hidden="true"
        className={[
          'shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-colors',
          multi ? 'rounded-[7px]' : 'rounded-full',
          selected ? 'bg-brand border-brand' : 'border-[var(--border-strong)] bg-white',
        ].join(' ')}
      >
        {selected && <Check className="w-4 h-4 text-white stroke-[3.5]" />}
      </span>
    </motion.button>
  );
}

/**
 * Groups option cards with a real fieldset/legend, so assistive tech
 * announces the question before the options rather than reading nine
 * unattached buttons.
 */
export function OptionGroup({
  legend,
  multi = false,
  columns = 1,
  children,
  className = '',
}: {
  legend: string;
  multi?: boolean;
  /** Desktop only. Long lists of short labels go two-up, so they fit. */
  columns?: 1 | 2;
  children: ReactNode;
  className?: string;
}) {
  const grid = [
    'flex flex-col gap-2 md:gap-3',
    columns === 2 ? 'md:grid md:grid-cols-2' : '',
  ].join(' ');

  return (
    <fieldset className={className}>
      <legend className="sr-only">{legend}</legend>
      {/* <fieldset> already has an implicit role of "group", so only the
          single-select case needs an explicit role here — adding one for
          multi-select made screen readers announce the question twice. */}
      {multi ? (
        <div className={grid}>{children}</div>
      ) : (
        <div role="radiogroup" aria-label={legend} className={grid}>
          {children}
        </div>
      )}
    </fieldset>
  );
}

export default OptionCard;
