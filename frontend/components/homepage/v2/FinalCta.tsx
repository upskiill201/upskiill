'use client';

/**
 * FinalCta — closing section, built to match Coddy's own: a white band, a
 * short "Learn ___ with {brand}" headline, a tactile pill button, then a
 * blue wave banner with the mascot standing in the valley and reward icons
 * arranged along the wave's shoulders (our own treasure chest, XP gems,
 * streak flame, a Fitness skill icon from onboarding, and a completed-
 * lesson checkmark — not Coddy's icons re-skinned, since Teyro teaches
 * more than one thing).
 *
 * The wave is a single full-bleed SVG (viewBox 0 0 1000 300, symmetric
 * around x=500, preserveAspectRatio="none") rather than a capped-width
 * curve glued to flat side rectangles. An earlier version split those two
 * pieces, and on a wide screen the curve's shoulders landed outside the
 * capped stage, cutting the S-curve off before it returned to full height.
 * A single full-bleed path has no seam to misalign at any viewport width.
 * The icon/mascot cluster still lives in a capped-width stage centered
 * over the same curve so it always lines up with the trough.
 *
 * The banner sits OUTSIDE the `items-center` flex column that centers the
 * heading/button, as a plain block-level sibling — not nested inside it.
 * The classic `left-1/2 -translate-x-1/2 w-screen` full-bleed trick relies
 * on the element's flow ("static") position starting flush with its
 * container's left edge; `align-items: center` on a flex parent instead
 * centers an overflowing child ahead of that offset, which silently
 * shifted the whole banner left of true center on any viewport wider than
 * Band's 1100px column — the right shoulder of the curve then never
 * reached the viewport's right edge, reading as the wave "cutting off."
 */

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import TactileButton from './TactileButton';

const STAGE_WIDTH = 720;

// Wave geometry, in the SVG's own 0–300 unit space (independent of
// on-screen pixels — preserveAspectRatio="none" stretches it to fill the
// banner at any width/height). Symmetric around x=500: every control/anchor
// point left of center has a mirrored twin on the right, so both shoulders
// curve back up to full height with matching radii.
const WAVE_PATH =
  'M0,60 C160,60 220,180 400,205 C460,215 540,215 600,205 C780,180 840,60 1000,60 L1000,300 L0,300 Z';

// Distance from the wave banner's bottom edge up to the trough's deepest
// point (205 of 300 units → (300-205)/300), as a percentage. Used to plant
// the mascot's feet on that line instead of the container's flat bottom.
const TROUGH_FROM_BOTTOM_PCT = 24;

interface FinalCtaProps {
  headline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function FinalCta({
  headline = 'Learn New Skills with Teyro',
  ctaLabel = 'GET STARTED',
  ctaHref = '/start',
}: FinalCtaProps) {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center">
        <h2
          className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.15] tracking-tight text-ink"
          style={{ fontFamily: 'var(--font-celebration)' }}
        >
          {headline}
        </h2>

        <TactileButton href={ctaHref} className="mt-7">
          {ctaLabel}
        </TactileButton>
      </div>

      {/* Full-bleed wave banner — breaks out of Band's centered max-width. Must
          stay outside the flex column above; see the file-level comment. */}
      <div className="relative left-1/2 mt-16 h-[300px] w-screen -translate-x-1/2 overflow-hidden md:h-[380px]">
        <svg
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path d={WAVE_PATH} style={{ fill: 'var(--color-brand-dark)' }} />
        </svg>

        {/* Capped-width stage — icons and the mascot share this box, centered
            over the same curve, so they always land on the trough. */}
        <div className="absolute inset-0 mx-auto w-full" style={{ maxWidth: STAGE_WIDTH }}>
          {/* Left shoulder: treasure chest + gem pair, climbing toward the peak */}
          <div className="absolute left-[9%] top-[20%] h-20 w-20 md:h-28 md:w-28">
            <Image src="/Tressure box.webp" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[23%] top-[42%] h-12 w-12 rotate-[-8deg] md:h-16 md:w-16">
            <Image src="/Icons/gem.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[16%] top-[58%] h-12 w-12 rotate-[10deg] md:h-16 md:w-16">
            <Image src="/Icons/gem.png" alt="" fill className="object-contain" />
          </div>

          {/* Streak flame, near the peak, clear of the mascot's raised arm */}
          <div className="absolute left-[53%] top-[6%] h-12 w-12 md:h-16 md:w-16">
            <Image src="/Icons/burn.png" alt="" fill className="object-contain" />
          </div>

          {/* Right shoulder, mirroring the left: fitness icon + checkmark badge */}
          <div className="absolute right-[9%] top-[20%] h-20 w-20 md:h-28 md:w-28">
            <Image
              src="/User onbarding Assets/Step 2 icons/Fitness_3d_icon.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div
            className="absolute right-[10%] top-[52%] flex h-12 w-12 items-center justify-center rounded-2xl md:h-16 md:w-16"
            style={{ backgroundColor: '#58cc02', boxShadow: '0 5px 0 #46a302' }}
          >
            <Check size={26} strokeWidth={4} color="white" />
          </div>

          {/* Tey, feet planted on the trough's deepest point rather than the
              stage's flat bottom edge — see TROUGH_FROM_BOTTOM_PCT above. */}
          <div
            className="absolute left-1/2 h-[210px] w-[210px] -translate-x-1/2 md:h-[270px] md:w-[270px]"
            style={{ bottom: `${TROUGH_FROM_BOTTOM_PCT}%`, zIndex: 1 }}
          >
            <Image src="/dashboard tey.webp" alt="Tey, the Teyro mascot" fill sizes="270px" className="object-contain" priority={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
