'use client';

/**
 * The path's loading state, drawn in the path's own shape — a banner and a
 * winding line of nodes — so the screen never jumps from "a loader" to "a
 * map". Replaces the full-screen loader home used to block on.
 */

import { nodeOffset } from '@/lib/path/model';

export function PathSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading your learning path" className="w-full">
      <div className="mt-3 h-[72px] rounded-[18px] bg-[var(--border)] animate-pulse" />
      <div className="flex flex-col items-center gap-[22px] pt-10">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="w-[76px] h-[70px] rounded-[50%] bg-[var(--border)] animate-pulse"
            style={{
              transform: `translateX(${nodeOffset(i) * 62}px)`,
              boxShadow: '0 7px 0 var(--border-strong)',
              animationDelay: `${i * 90}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PathSkeleton;
