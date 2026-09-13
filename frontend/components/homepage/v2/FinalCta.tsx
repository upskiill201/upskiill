'use client';

/**
 * FinalCta — closing section, built to match Coddy's own: a white band, a
 * short "Learn ___ with {brand}" headline, a plain outlined button, then a
 * blue wave banner with the mascot standing in the valley and real reward
 * icons floating around it (not Coddy's icons re-skinned — our own treasure
 * chest, XP gem, coin, streak flame and a Fitness skill icon from
 * onboarding, since Teyro teaches more than one thing).
 *
 * The wave's curve geometry lives inside the SAME capped-width box as the
 * mascot/icon cluster (STAGE_WIDTH), not spread across the full viewport.
 * An earlier version put the curve in viewport-wide coordinates while the
 * cluster stayed capped — on a wide screen the two hill peaks then landed
 * far outside the visible cluster, so what showed around the mascot was
 * just a random middle fragment of the curve, reading as one lopsided
 * slope instead of a valley. A plain flat rectangle sits behind the capped
 * curve, at the same height as the curve's flat left/right edges, so full-
 * bleed blue still reaches both sides of the screen without redrawing the
 * hills out there.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

const STAGE_WIDTH = 720;
const STAGE_HEIGHT = 300;
// Height of the curve's flat edges, as a fraction of STAGE_HEIGHT — the flat
// full-bleed rectangle behind the stage starts at this same height so the
// two pieces line up with no visible seam.
const EDGE_HEIGHT_PCT = 20;

export default function FinalCta() {
  return (
    <div className="flex flex-col items-center text-center">
      <h2
        className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.15] tracking-tight text-ink"
        style={{ fontFamily: 'var(--font-celebration)' }}
      >
        Learn New Skills with Teyro
      </h2>

      <Link
        href="/start"
        className="mt-7 flex h-14 items-center justify-center rounded-2xl border border-slate-300 bg-white px-9 text-base font-extrabold tracking-wide text-brand transition-colors hover:bg-slate-50"
      >
        GET STARTED
      </Link>

      {/* Full-bleed wave banner — breaks out of Band's centered max-width. */}
      <div className="relative left-1/2 mt-16 h-[300px] w-screen -translate-x-1/2 overflow-hidden md:h-[380px]">
        {/* Flat fill for the margins OUTSIDE the capped stage only — width
            collapses to 0 on screens narrower than the stage, where the
            stage itself is already full-bleed and handles its own edges.
            (An earlier version made this span the full container width,
            which covered the stage too — since both pieces are the same
            blue, that silently erased the curve, leaving a flat rectangle
            with no visible wave at all.) */}
        <div
          className="absolute left-0 bottom-0"
          style={{ top: `${EDGE_HEIGHT_PCT}%`, width: `max(0px, calc((100% - ${STAGE_WIDTH}px) / 2))`, backgroundColor: '#0172FD' }}
        />
        <div
          className="absolute right-0 bottom-0"
          style={{ top: `${EDGE_HEIGHT_PCT}%`, width: `max(0px, calc((100% - ${STAGE_WIDTH}px) / 2))`, backgroundColor: '#0172FD' }}
        />

        {/* Capped-width stage — the curve and the cluster share this box,
            so the hills always sit right where the mascot/icons are. */}
        <div className="absolute inset-0 mx-auto w-full max-w-[720px]">
          <svg
            viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path
              d={`M0,${STAGE_HEIGHT * 0.2} C 130,${STAGE_HEIGHT * 0.2} 190,${STAGE_HEIGHT * 0.42} 290,${STAGE_HEIGHT * 0.48} C 340,${STAGE_HEIGHT * 0.51} 380,${STAGE_HEIGHT * 0.51} 430,${STAGE_HEIGHT * 0.48} C 530,${STAGE_HEIGHT * 0.42} 590,${STAGE_HEIGHT * 0.2} ${STAGE_WIDTH},${STAGE_HEIGHT * 0.2} L${STAGE_WIDTH},${STAGE_HEIGHT} L0,${STAGE_HEIGHT} Z`}
              fill="#0172FD"
            />
          </svg>

          {/* Treasure chest, upper-left hill */}
          <div className="absolute left-[10%] top-[26%] h-16 w-16 md:h-20 md:w-20">
            <Image src="/Tressure box.webp" alt="" fill className="object-contain" />
          </div>

          {/* XP gems + coin, drifting up toward the chest */}
          <div className="absolute left-[24%] top-[44%] h-7 w-7 rotate-[-8deg] md:h-9 md:w-9">
            <Image src="/Icons/gem.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[17%] top-[58%] h-6 w-6 rotate-[10deg] md:h-7 md:w-7">
            <Image src="/Icons/gem.png" alt="" fill className="object-contain" />
          </div>
          <div className="absolute left-[29%] top-[66%] h-7 w-7 rotate-[4deg] md:h-8 md:w-8">
            <Image src="/Icons/Coin.png" alt="" fill className="object-contain" />
          </div>

          {/* Streak flame, above and clear of the mascot's bounding box */}
          <div className="absolute left-[58%] top-[12%] h-10 w-10 md:h-14 md:w-14">
            <Image src="/Icons/burn.png" alt="" fill className="object-contain" />
          </div>

          {/* Fitness skill icon, upper-right hill (Teyro teaches more than code) */}
          <div className="absolute right-[12%] top-[20%] h-16 w-16 md:h-20 md:w-20">
            <Image
              src="/User onbarding Assets/Step 2 icons/Fitness_3d_icon.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Completed-lesson badge, lower-right */}
          <div
            className="absolute right-[8%] top-[56%] flex h-12 w-12 items-center justify-center rounded-2xl md:h-16 md:w-16"
            style={{ backgroundColor: '#58cc02', boxShadow: '0 5px 0 #46a302' }}
          >
            <Check size={26} strokeWidth={4} color="white" />
          </div>

          {/* Tey, standing in the valley */}
          <div className="absolute bottom-0 left-1/2 h-[210px] w-[210px] -translate-x-1/2 md:h-[270px] md:w-[270px]">
            <Image src="/dashboard tey.webp" alt="Tey, the Teyro mascot" fill sizes="270px" className="object-contain" priority={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
