/**
 * Teyro's own small UI glyphs for onboarding and the paywall: chunky,
 * rounded strokes that match the illustration set (no generic icon font).
 * They take the text colour, so a button or link colours them.
 */

import type { ReactNode } from 'react';

const PATHS = {
  back: <path d="M19.5 12H5.5M11.5 5.5L5 12l6.5 6.5" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  check: <path d="M5 12.6l4.6 4.6L19.2 7.4" />,
  chevron: <path d="M9.5 5.5L16 12l-6.5 6.5" />,
  soundOn: (
    <>
      <path d="M4 9.2h3.6L12.6 5v14l-5-4.2H4Z" fill="currentColor" />
      <path d="M16 9a4.2 4.2 0 0 1 0 6M18.8 6.4a8 8 0 0 1 0 11.2" />
    </>
  ),
  soundOff: (
    <>
      <path d="M4 9.2h3.6L12.6 5v14l-5-4.2H4Z" fill="currentColor" />
      <path d="M16.2 9.4l5 5.2M21.2 9.4l-5 5.2" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6.2 5.5 12 5.5 21.5 12 21.5 12 17.8 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M2.5 12S6.2 5.5 12 5.5 21.5 12 21.5 12 17.8 18.5 12 18.5 2.5 12 2.5 12Z" />
      <path d="M4.5 4.5l15 15" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="3" fill="currentColor" stroke="none" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  sparkle: (
    <path
      d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  arrow: <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />,
  menu: <path d="M4.5 6.5h15M4.5 12h15M4.5 17.5h15" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="none" />
      <path d="M12 7.2v6" stroke="white" />
      <circle cx="12" cy="16.8" r="1.5" fill="white" stroke="none" />
    </>
  ),
  chevronLeft: <path d="M14.5 5.5L8 12l6.5 6.5" />,
} satisfies Record<string, ReactNode>;

export type GlyphName = keyof typeof PATHS;

export function Glyph({ name, size = 24, strokeWidth = 3, className }: { name: GlyphName; size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
