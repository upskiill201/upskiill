'use client';

/**
 * Loads every Tey pose the lesson can show, the moment it opens — hidden,
 * with the same `sizes` each screen uses, so the browser fetches exactly the
 * image each screen will ask for. Without it, a pose's first appearance
 * (the first card, "Let's fix your mistakes", the finish) landed as an empty
 * space where Tey should be, then popped in.
 */

import Image from 'next/image';
import { TEY_POSE_SRC, type TeyPose } from './TeySays';

const WARM: { pose: TeyPose; sizes: string }[] = [
  // Beside the bubble on every step.
  { pose: 'pointing', sizes: '112px' },
  { pose: 'thinking', sizes: '112px' },
  { pose: 'cheering', sizes: '112px' },
  { pose: 'searching', sizes: '112px' },
  // The big ones: fix-your-mistakes, the quit sheet, lesson complete.
  { pose: 'thinking', sizes: '320px' },
  { pose: 'thinking', sizes: '120px' },
  { pose: 'cheering', sizes: '(min-width: 768px) 380px, 70vw' },
  { pose: 'flame', sizes: '(min-width: 768px) 380px, 70vw' },
  { pose: 'welcome', sizes: '(min-width: 768px) 380px, 70vw' },
];

export function TeyPreload() {
  return (
    <div aria-hidden="true" className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none">
      {WARM.map(({ pose, sizes }) => (
        <div key={`${pose}-${sizes}`} className="relative w-px h-px">
          <Image src={TEY_POSE_SRC[pose]} alt="" fill priority sizes={sizes} />
        </div>
      ))}
    </div>
  );
}

export default TeyPreload;
