'use client';

/**
 * TeyBubble — the speech bubble Tey talks through.
 *
 * Without a bubble, Tey's line was a bold heading floating somewhere near
 * him: it read as a form title, not as a character talking to you. The tail
 * is what makes it speech — it points at Tey, left when he sits beside the
 * bubble (question steps), down when he stands under it (hero steps).
 *
 * The tail is a rotated square sharing the bubble's fill and border, so the
 * outline runs unbroken from the body into the point, with no SVG to keep in
 * sync with the bubble's size.
 */

import type { ReactNode } from 'react';

export interface TeyBubbleProps {
  tail: 'left' | 'down';
  children: ReactNode;
  className?: string;
}

export function TeyBubble({ tail, children, className = '' }: TeyBubbleProps) {
  return (
    <div
      className={[
        'relative rounded-[20px] border-2 bg-white',
        'px-4 py-3 md:px-6 md:py-4',
        className,
      ].join(' ')}
      style={{
        borderColor: 'var(--border)',
        boxShadow: '0 4px 0 var(--border)',
      }}
    >
      <span
        aria-hidden="true"
        className={[
          'absolute w-4 h-4 md:w-5 md:h-5 bg-white border-2 rotate-45',
          tail === 'left'
            ? // Only the two outer edges carry a border, so the inner edges
              // melt into the bubble body.
              '-left-[9px] md:-left-[11px] top-1/2 -translate-y-1/2 border-r-0 border-t-0'
            : '-bottom-[9px] md:-bottom-[11px] left-1/2 -translate-x-1/2 border-l-0 border-t-0',
        ].join(' ')}
        style={{ borderColor: 'var(--border)' }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export default TeyBubble;
