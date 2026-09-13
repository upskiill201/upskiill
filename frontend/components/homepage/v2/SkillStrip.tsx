'use client';

/**
 * SkillStrip — breadth in one glance.
 *
 * These are the real interest categories from onboarding step 2, with their
 * real 3D icons, so the strip answers "is my thing here?" without shipping a
 * catalog grid. "Other" is dropped: useful as an onboarding escape hatch,
 * meaningless as a marketing claim.
 *
 * Marquee on desktop, static wrapped rows on mobile, and static under
 * prefers-reduced-motion. The animation is pure CSS — no JS drives it.
 */

import React from 'react';
import Image from 'next/image';

const SKILLS = [
  { label: 'Coding', image: '/User onbarding Assets/Step 2 icons/Coding_3d_icon.webp' },
  { label: 'Design', image: '/User onbarding Assets/Step 2 icons/Design_3d_icon.webp' },
  { label: 'Photography', image: '/User onbarding Assets/Step 2 icons/Photography_3d_icon.webp' },
  { label: 'Cooking', image: '/User onbarding Assets/Step 2 icons/Cooking_3d_icon.webp' },
  { label: 'Marketing', image: '/User onbarding Assets/Step 2 icons/Marketing_3d_icon.webp' },
  { label: 'Fitness', image: '/User onbarding Assets/Step 2 icons/Fitness_3d_icon.webp' },
  { label: 'Writing', image: '/User onbarding Assets/Step 2 icons/Writing_3d_icon.webp' },
  { label: 'Business', image: '/User onbarding Assets/Step 2 icons/Business_3d_icon.webp' },
  { label: 'Music', image: '/User onbarding Assets/Step 2 icons/music_3d_icon.webp' },
];

function Chip({ label, image }: { label: string; image: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5">
      <Image src={image} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
      <span className="whitespace-nowrap text-xs font-bold text-white">{label}</span>
    </span>
  );
}

export default function SkillStrip() {
  return (
    <section className="w-full overflow-hidden bg-ink py-4 md:py-5">
      {/* Mobile: wrapped, static, no motion at all. */}
      <div className="flex flex-wrap justify-center gap-2 px-6 md:hidden">
        {SKILLS.map((s) => (
          <Chip key={s.label} {...s} />
        ))}
      </div>

      {/* Desktop: one continuous marquee. The list is duplicated so the
          translate can loop seamlessly at -50%. */}
      <div className="hidden md:block [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="teyro-marquee flex w-max gap-2">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <Chip key={`${s.label}-${i}`} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
