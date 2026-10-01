'use client';

import { PHASE_COLOR, PHASE_LABEL, type LessonPhase } from '@/lib/lesson/content';

/** Phase chip + title at the top of every lesson screen. */
export function StepHeading({
  phase,
  title,
  eyebrow,
}: {
  phase: LessonPhase;
  /** Omitted on follow-on cards, where the chip alone says where you are. */
  title?: string;
  /** Replaces the phase name, e.g. "Apply · Question 2 of 5". */
  eyebrow?: string;
}) {
  const color = PHASE_COLOR[phase];
  return (
    <div>
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-extrabold uppercase tracking-[0.08em]"
        style={{ color, backgroundColor: `color-mix(in srgb, ${color} 12%, white)` }}
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
        {eyebrow ?? PHASE_LABEL[phase]}
      </span>
      {title && (
        <h1
          className="mt-3 text-[24px] md:text-[30px] font-extrabold text-ink leading-[1.15]"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {title}
        </h1>
      )}
    </div>
  );
}

export default StepHeading;
