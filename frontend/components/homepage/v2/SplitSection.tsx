'use client';

/**
 * SplitSection — headline + one sentence on one side, one visual on the other,
 * alternating side each time down the page.
 *
 * The alternation is the whole point: once the eye learns the rhythm it stops
 * having to parse the layout, which is most of why a page like this reads as
 * calm. Deliberately offers no slot for bullet lists, badges or a second
 * paragraph — if a section needs those, the section is wrong.
 *
 * On mobile the visual always comes first regardless of desktop side, so the
 * reading order stays picture → claim the whole way down.
 */

import React from 'react';

interface SplitSectionProps {
  headline: string;
  copy: string;
  visual: React.ReactNode;
  /** Which side the visual sits on at >= lg. */
  visualSide?: 'left' | 'right';
  /** Rendered under the copy — used only by the install section's buttons. */
  action?: React.ReactNode;
}

export default function SplitSection({
  headline,
  copy,
  visual,
  visualSide = 'right',
  action,
}: SplitSectionProps) {
  const visualFirst = visualSide === 'left';

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
      <div className={visualFirst ? 'lg:order-2' : 'lg:order-1'}>
        {/* Baloo 2 — see app/page.tsx for why the marketing headline font
            differs from the app-wide h1-h6 default. */}
        <h2
          className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight"
          style={{ fontFamily: 'var(--font-celebration)' }}
        >
          {headline}
        </h2>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-soft md:text-xl">
          {copy}
        </p>
        {action ? <div className="mt-8">{action}</div> : null}
      </div>

      <div className={`${visualFirst ? 'lg:order-1' : 'lg:order-2'} order-first`}>
        {visual}
      </div>
    </div>
  );
}
