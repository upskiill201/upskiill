/**
 * Teyro's own small UI glyphs for onboarding and the paywall: chunky,
 * rounded strokes that match the illustration set (no generic icon font).
 * They take the text colour, so a button or link colours them.
 */

import type { CSSProperties, ReactNode } from 'react';

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
  chevronDown: <path d="M5.5 9.5L12 16l6.5-6.5" />,
  chevronsUp: <path d="M6.5 12.5L12 7l5.5 5.5M6.5 18L12 12.5l5.5 5.5" />,
  arrowUp: <path d="M12 19.5v-14M6.5 11L12 5.5l5.5 5.5" />,
  arrowDown: <path d="M12 4.5v14M6.5 13l5.5 5.5 5.5-5.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  upRight: <path d="M7 17L17 7M8.6 7H17v8.4" />,
  downRight: <path d="M7 7l10 10M17 8.6V17H8.6" />,
  downLeft: <path d="M17 7L7 17M15.4 17H7V8.6" />,
  download: (
    <>
      <path d="M12 3.6v11M7.4 10.4L12 15l4.6-4.6" />
      <path d="M4 15.6v2.6A2.2 2.2 0 0 0 6.2 20.4h11.6a2.2 2.2 0 0 0 2.2-2.2v-2.6" />
    </>
  ),
  pencil: (
    <>
      <path d="M14.6 5.4l4 4L8.4 19.6H4.4v-4Z" />
      <path d="M12.6 7.4l4 4" />
    </>
  ),
  doc: (
    <>
      <path d="M6.4 3.4h7.4l4.8 4.8v11.4a1 1 0 0 1-1 1H6.4a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1Z" />
      <path d="M13.6 3.6v4.8h4.8M8.8 12.6h6.4M8.8 16.4h4.4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M9.4 9.4a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2.2-2.6 3.8" />
      <circle cx="12" cy="17.4" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  link: <path d="M10.4 13.6a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1.2 1.2M13.6 10.4a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1.2-1.2" />,
  copy: (
    <>
      <rect x="8.4" y="8.4" width="12" height="12" rx="2.4" />
      <path d="M15.6 5.4V5A1.6 1.6 0 0 0 14 3.6H5.2A1.6 1.6 0 0 0 3.6 5.2V14A1.6 1.6 0 0 0 5.2 15.6h.4" />
    </>
  ),
  ticket: (
    <>
      <path d="M3.4 8.4V6.6a1.6 1.6 0 0 1 1.6-1.6h14a1.6 1.6 0 0 1 1.6 1.6v1.8a3.6 3.6 0 0 0 0 7.2v1.8a1.6 1.6 0 0 1-1.6 1.6H5a1.6 1.6 0 0 1-1.6-1.6v-1.8a3.6 3.6 0 0 0 0-7.2Z" />
      <path d="M13.6 8v1.2M13.6 11.4v1.2M13.6 14.8V16" />
    </>
  ),
  verified: (
    <>
      <path d={'M12 2.8l2.3 1.7 2.8-.2.9 2.7 2.4 1.5-.9 2.7.9 2.7-2.4 1.5-.9 2.7-2.8-.2L12 19.6l-2.3-1.7-2.8.2-.9-2.7-2.4-1.5.9-2.7-.9-2.7 2.4-1.5.9-2.7 2.8.2Z'} fill="currentColor" />
      <path d="M8.6 11.4l2.4 2.4 4.4-4.4" stroke="white" strokeWidth="2.4" />
    </>
  ),
  bug: (
    <>
      <path d="M8 8.6a4 4 0 0 1 8 0v5.4a4 4 0 0 1-8 0Z" fill="currentColor" />
      <path d="M9.4 5.2L8 3.6M14.6 5.2L16 3.6M8 11H4.4M19.6 11H16M8 15.4l-3.2 2M16 15.4l3.2 2M8.4 7.6l-3-1.6M15.6 7.6l3-1.6" />
    </>
  ),
  pin: (
    <>
      <path d="M9 3.6h6l-1.2 5.2 3.6 3.6v1.6H6.6v-1.6l3.6-3.6Z" fill="currentColor" />
      <path d="M12 14v6.4" />
    </>
  ),
  coinDollar: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M14.8 9.2c-.4-1-1.4-1.6-2.8-1.6-1.6 0-2.8.8-2.8 2s1.2 1.7 2.8 2 2.8.9 2.8 2.2-1.2 2.1-2.8 2.1c-1.5 0-2.5-.7-2.9-1.7M12 6v1.6M12 16v1.8" />
    </>
  ),
  image: (
    <>
      <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6" />
      <circle cx="9" cy="9.6" r="1.8" fill="currentColor" stroke="none" />
      <path d="M4 17.4l5-4.6 3.4 3 2.8-2.6 4.8 4.4" />
    </>
  ),
  upload: (
    <>
      <path d="M12 15V4.2M7.4 8.6L12 4l4.6 4.6" />
      <path d="M4 15.6v2.6A2.2 2.2 0 0 0 6.2 20.4h11.6a2.2 2.2 0 0 0 2.2-2.2v-2.6" />
    </>
  ),
  spinner: <path d="M12 3.4a8.6 8.6 0 1 0 8.6 8.6" />,
  search: (
    <>
      <circle cx="10.6" cy="10.6" r="6.4" />
      <path d="M15.4 15.4l4.6 4.6" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.8c3.4 2.2 5 5.4 5 9.4v3.2H7v-3.2c0-4 1.6-7.2 5-9.4Z" fill="currentColor" />
      <path d="M7 12.4l-2.6 2.8v3h2.6M17 12.4l2.6 2.8v3H17M10.4 18.4l1.6 2.8 1.6-2.8" />
    </>
  ),
  house: (
    <>
      <path d="M3.6 11.4L12 4l8.4 7.4" />
      <path d="M5.8 9.8v9.6a1 1 0 0 0 1 1h3.6v-5.6h3.2v5.6h3.6a1 1 0 0 0 1-1V9.8" />
    </>
  ),
  mic: (
    <>
      <rect x="8.6" y="3" width="6.8" height="11.4" rx="3.4" fill="currentColor" />
      <path d="M5.6 11.4a6.4 6.4 0 0 0 12.8 0M12 17.8v3.2" />
    </>
  ),
  text: <path d="M5 6.4V4.6h14v1.8M12 4.6v14.8M9 19.4h6" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.4" ry="2.8" />
      <path d="M4.6 6v12c0 1.6 3.3 2.8 7.4 2.8s7.4-1.2 7.4-2.8V6M4.6 12c0 1.6 3.3 2.8 7.4 2.8s7.4-1.2 7.4-2.8" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9.4L12 4l9 5.4Z" fill="currentColor" />
      <path d="M5.6 11.4v6.2M10 11.4v6.2M14 11.4v6.2M18.4 11.4v6.2M3.4 20.4h17.2" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.6 4.2v4.4h-4.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  play: <path d="M8.5 5.8v12.4L18.4 12Z" fill="currentColor" />,
  hourglass: (
    <>
      <path d="M6.4 3.4h11.2M6.4 20.6h11.2" />
      <path d="M7.6 3.4c0 4.2 4.4 5.4 4.4 8.6s-4.4 4.4-4.4 8.6h8.8c0-4.2-4.4-5.4-4.4-8.6s4.4-4.4 4.4-8.6Z" />
      <path d="M9.6 18.6h4.8L12 15.6Z" fill="currentColor" />
    </>
  ),

  // ── Solid silhouettes: path nodes and chips (the stroke rounds them) ────
  star: (
    <path
      d="M12 3L14.6 9L21.1 9.6L16.2 14L17.6 20.4L12 17L6.4 20.4L7.8 14L2.9 9.6L9.4 9Z"
      fill="currentColor"
    />
  ),
  book: (
    <>
      <path d="M3.5 6c3-1.3 5.8-1.1 8.5 1v12.5c-2.7-2-5.5-2.2-8.5-1Z" fill="currentColor" />
      <path d="M20.5 6c-3-1.3-5.8-1.1-8.5 1v12.5c2.7-2 5.5-2.2 8.5-1Z" fill="currentColor" />
    </>
  ),
  dumbbell: (
    <>
      <rect x="2.6" y="9.2" width="2.6" height="5.6" rx="1" fill="currentColor" />
      <rect x="5.8" y="6.4" width="3.2" height="11.2" rx="1.2" fill="currentColor" />
      <rect x="15" y="6.4" width="3.2" height="11.2" rx="1.2" fill="currentColor" />
      <rect x="18.8" y="9.2" width="2.6" height="5.6" rx="1" fill="currentColor" />
      <path d="M9 12h6" />
    </>
  ),
  bulb: (
    <>
      <path
        d="M12 3a6.4 6.4 0 0 0-3.9 11.5c.9.7 1.4 1.5 1.4 2.5h5c0-1 .5-1.8 1.4-2.5A6.4 6.4 0 0 0 12 3Z"
        fill="currentColor"
      />
      <path d="M10 20.6h4" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v5.2a5 5 0 0 1-10 0Z" fill="currentColor" />
      <path d="M7 6.2H4.6c0 2.4 1.2 3.8 3 4.2M17 6.2h2.4c0 2.4-1.2 3.8-3 4.2M12 14.4v3.4" />
      <rect x="7.6" y="18.4" width="8.8" height="2.6" rx="1.2" fill="currentColor" />
    </>
  ),
  medal: (
    <>
      <path d="M6.6 2.8h3.6l2.4 5.6H9Z" fill="currentColor" />
      <path d="M17.4 2.8h-3.6l-1.2 2.8 1.6 2.8H15Z" fill="currentColor" />
      <circle cx="12" cy="15.2" r="5.6" />
      <path
        d="M12 12.2l.9 1.9 2.1.2-1.6 1.4.5 2-1.9-1.1-1.9 1.1.5-2-1.6-1.4 2.1-.2Z"
        fill="currentColor"
        strokeWidth="1.2"
      />
    </>
  ),
  headphones: (
    <>
      <path d="M4.6 15.5v-3a7.4 7.4 0 0 1 14.8 0v3" />
      <rect x="3" y="13.6" width="4.6" height="7" rx="2" fill="currentColor" />
      <rect x="16.4" y="13.6" width="4.6" height="7" rx="2" fill="currentColor" />
    </>
  ),
  code: <path d="M8.5 6.8L3.6 12l4.9 5.2M15.5 6.8l4.9 5.2-4.9 5.2" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M15.6 8.4l-2 5.2-5.2 2 2-5.2Z" fill="currentColor" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 4.6h11l-2.4 4.2L17 13H6Z" fill="currentColor" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20.5v-8" />
      <path d="M12 12.6C12 8.4 9 6 4.6 6c0 4.4 2.8 6.6 7.4 6.6Z" fill="currentColor" />
      <path d="M12 10.6c.2-3.6 2.8-5.8 7.4-5.6-.2 3.8-2.8 5.8-7.4 5.6Z" fill="currentColor" />
    </>
  ),
  trees: (
    <>
      <path d="M8 3.6L3 13h10Z" fill="currentColor" />
      <path d="M8 13v7" />
      <path d="M16.4 7.4L12.4 15h8Z" fill="currentColor" />
      <path d="M16.4 15v5.2" />
    </>
  ),
  mountain: <path d="M2.6 19.4L9 8.2l3.4 5.4 2.4-3.4 6.6 9.2Z" fill="currentColor" />,
  mountainSnow: (
    <>
      <path d="M2.6 19.4L10 6.4l7.4 13Z" />
      <path d="M7.4 11l2.6-4.6 2.6 4.6-1.4.9-1.2-1-1.2 1Z" fill="currentColor" />
      <path d="M15.4 12.2l1.6-2.2 4.4 9.4" />
    </>
  ),
  flame: (
    <path
      d="M13 2.6c.4 3.4-1.8 5-3.4 6.8C8 11.2 6 13 6 15.6a6 6 0 0 0 12 0c0-2.6-1.2-4.6-2.6-6-.2 1.8-1 2.8-2 3.2.8-3.8-.2-7.2-.4-10.2Z"
      fill="currentColor"
    />
  ),
  heart: (
    <path
      d="M12 20s-8-4.6-8-10.4A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.6C20 15.4 12 20 12 20Z"
      fill="currentColor"
    />
  ),
  bell: (
    <>
      <path d="M6 16.6V11a6 6 0 0 1 12 0v5.6l1.4 1.4H4.6Z" fill="currentColor" />
      <path d="M10 20.8a2.3 2.3 0 0 0 4 0" />
    </>
  ),
  bellRing: (
    <>
      <path d="M7 16.6V11.4a5 5 0 0 1 10 0v5.2l1.2 1.4H5.8Z" fill="currentColor" />
      <path d="M10.4 20.8a2 2 0 0 0 3.2 0M3.4 9a8.6 8.6 0 0 1 2.4-4.6M20.6 9a8.6 8.6 0 0 0-2.4-4.6" />
    </>
  ),
  bellOff: (
    <>
      <path d="M6 16.6V11a6 6 0 0 1 12 0v5.6l1.4 1.4H4.6Z" />
      <path d="M10 20.8a2.3 2.3 0 0 0 4 0M3.6 3.6l16.8 16.8" />
    </>
  ),
  snowflake: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.6 4.6L12 6.6l2.4-2M9.6 19.4l2.4-2 2.4 2" />,
  unlock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="3" fill="currentColor" stroke="none" />
      <path d="M8 10.5V8a4 4 0 0 1 7.6-1.8" />
    </>
  ),
  card: (
    <>
      <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="3" />
      <path d="M3 10h18M6.6 14.6h3.6" />
    </>
  ),
  crown: <path d="M3.6 18.4L2.8 7.6l5 4.2L12 5l4.2 6.8 5-4.2-.8 10.8Z" fill="currentColor" />,
  at: (
    <>
      <circle cx="12" cy="12" r="3.4" />
      <path d="M15.4 8.6V13a2.6 2.6 0 0 0 5.2 0V12a8.6 8.6 0 1 0-3.4 6.9" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3.6 10v4h3.4L17 19V5L7 10Z" fill="currentColor" />
      <path d="M7.4 14.2l1.4 5.2M20.4 9.6v4.8" />
    </>
  ),
  bubble: (
    <path d="M4 6.6A2.6 2.6 0 0 1 6.6 4h10.8A2.6 2.6 0 0 1 20 6.6v7.8a2.6 2.6 0 0 1-2.6 2.6H11l-5 3.6V17A2.6 2.6 0 0 1 4 14.4Z" fill="currentColor" />
  ),
  party: (
    <>
      <path d="M4 20l4.6-12.4 7.8 7.8Z" fill="currentColor" />
      <path d="M13.6 4.2c.4 1.6-.2 2.8-1.6 3.6M19.8 10.4c-1.6-.4-2.8.2-3.6 1.6M16.6 3.4v1.4M20.6 7.4h-1.4" />
    </>
  ),
  userPlus: (
    <>
      <circle cx="9.5" cy="8" r="4" fill="currentColor" />
      <path d="M2.8 20.4a6.8 6.8 0 0 1 13.4 0Z" fill="currentColor" />
      <path d="M19 7.6v6M16 10.6h6" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M5.9 5.9l3.6 3.6M18.1 5.9l-3.6 3.6M5.9 18.1l3.6-3.6M18.1 18.1l-3.6-3.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </>
  ),

  // ── Teyro HQ menu ──────────────────────────────────────────────────────
  gauge: (
    <>
      <path d="M3.6 16.6a8.6 8.6 0 1 1 16.8 0" />
      <path d="M12 14l4.2-4.6" />
      <circle cx="12" cy="14.2" r="1.9" fill="currentColor" />
    </>
  ),
  cap: (
    <>
      <path d="M2.6 9.4L12 5l9.4 4.4L12 13.8Z" fill="currentColor" />
      <path d="M6.6 11.8v4c1.6 1.6 3.4 2.4 5.4 2.4s3.8-.8 5.4-2.4v-4M20.4 10.2v5.2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.6" fill="currentColor" />
      <path d="M2.6 20a6.4 6.4 0 0 1 12.8 0Z" fill="currentColor" />
      <path d="M15.8 4.8a3.4 3.4 0 0 1 0 6.4M17.8 13.8a6.2 6.2 0 0 1 3.6 5.8" />
    </>
  ),
  userCheck: (
    <>
      <circle cx="9" cy="8" r="3.8" fill="currentColor" />
      <path d="M2.4 20.2a6.6 6.6 0 0 1 13.2 0Z" fill="currentColor" />
      <path d="M16.4 10.6l2 2 3.6-4" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7.6A2.4 2.4 0 0 1 6.4 5.2h11.2v2.4" />
      <rect x="3.4" y="7.6" width="17.6" height="12" rx="2.6" />
      <circle cx="16.4" cy="13.6" r="1.5" fill="currentColor" />
    </>
  ),
  chart: (
    <>
      <rect x="4" y="12.4" width="3.6" height="7.6" rx="1" fill="currentColor" />
      <rect x="10.2" y="7.4" width="3.6" height="12.6" rx="1" fill="currentColor" />
      <rect x="16.4" y="3.8" width="3.6" height="16.2" rx="1" fill="currentColor" />
    </>
  ),
  folderIn: (
    <>
      <path d="M3.4 7.2A2.2 2.2 0 0 1 5.6 5h3.8l2 2.2h7a2.2 2.2 0 0 1 2.2 2.2v8.4a2.2 2.2 0 0 1-2.2 2.2H5.6a2.2 2.2 0 0 1-2.2-2.2Z" />
      <path d="M12 10.4v5.4M9.6 13.4l2.4 2.4 2.4-2.4" />
    </>
  ),
  tag: (
    <>
      <path d="M3.6 12.2V4.6a1 1 0 0 1 1-1h7.6l8.4 8.4a1.6 1.6 0 0 1 0 2.2l-6.4 6.4a1.6 1.6 0 0 1-2.2 0Z" />
      <circle cx="8.2" cy="8.2" r="1.6" fill="currentColor" />
    </>
  ),
  video: (
    <>
      <rect x="2.8" y="6" width="13" height="12" rx="2.6" />
      <path d="M15.8 10.4l5.4-3v9.2l-5.4-3Z" fill="currentColor" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="7.4" width="16" height="12.6" rx="4" />
      <circle cx="9" cy="13.6" r="1.6" fill="currentColor" />
      <circle cx="15" cy="13.6" r="1.6" fill="currentColor" />
      <path d="M12 7.4V4.2M10.4 3.6h3.2" />
    </>
  ),
  send: (
    <>
      <path d="M3.4 11.2L20.6 3.4l-5.4 17.2-3.6-7.2Z" />
      <path d="M11.6 13.4L20.6 3.4" />
    </>
  ),
  activity: <path d="M2.8 12.4h4l2.4-6.2 4.4 12 2.4-5.8h5.2" />,
  phone: (
    <>
      <rect x="6.4" y="2.8" width="11.2" height="18.4" rx="2.8" />
      <path d="M10.6 17.8h2.8" />
    </>
  ),
  external: (
    <>
      <path d="M13.6 4h6.4v6.4M20 4l-8.4 8.4" />
      <path d="M18 14v4.4a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18.4V7.6A1.6 1.6 0 0 1 5.6 6H10" />
    </>
  ),
  logout: (
    <>
      <path d="M10 4H6.2A2.2 2.2 0 0 0 4 6.2v11.6A2.2 2.2 0 0 0 6.2 20H10" />
      <path d="M14.4 16.4L18.8 12l-4.4-4.4M18.4 12H9.6" />
    </>
  ),
  funnel: <path d="M3.4 4.6h17.2l-6.6 8v6.6l-4 1.8v-8.4Z" fill="currentColor" />,

  // ── Month badges: the season's mark ────────────────────────────────────
  sun: (
    <>
      <circle cx="12" cy="12" r="4.4" fill="currentColor" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5" />
    </>
  ),
  cloudSun: (
    <>
      <path d="M9 3.4v1.4M3.4 9h1.4M5 5l1 1M13 5l-1 1" />
      <path d="M6.2 11.4a3.4 3.4 0 0 1 5.8-2.6" />
      <path d="M7.4 20.4a3.8 3.8 0 0 1-.4-7.6 5.2 5.2 0 0 1 10-1.2 4.4 4.4 0 0 1 .4 8.8Z" fill="currentColor" />
    </>
  ),
  flower: (
    <>
      <path d="M12 21v-7.4M12 17.4c-1.4-2-3.6-2.6-5.8-2.2.4 2.4 2.6 3.6 5.8 2.2Z" />
      <path d="M6.6 4.6l2.8 2.2L12 3.4l2.6 3.4 2.8-2.2v4.8a5.4 5.4 0 0 1-10.8 0Z" fill="currentColor" />
    </>
  ),
  waves: (
    <path d="M2.8 8c1.5-1.4 3.1-1.4 4.6 0s3.1 1.4 4.6 0 3.1-1.4 4.6 0 3.1 1.4 4.6 0M2.8 13c1.5-1.4 3.1-1.4 4.6 0s3.1 1.4 4.6 0 3.1-1.4 4.6 0 3.1 1.4 4.6 0M2.8 18c1.5-1.4 3.1-1.4 4.6 0s3.1 1.4 4.6 0 3.1-1.4 4.6 0 3.1 1.4 4.6 0" />
  ),
  leaf: (
    <>
      <path d="M5 19C4.4 10.4 9.6 5 20 4.4 19.6 14.4 14 19.8 5 19Z" fill="currentColor" />
      <path d="M3.6 20.6L9 15" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type GlyphName = keyof typeof PATHS;

/** Every glyph's name, for the dev bench. */
export const GLYPH_NAMES = Object.keys(PATHS) as GlyphName[];

export function Glyph({
  name,
  size = 24,
  strokeWidth = 3,
  className,
  style,
}: {
  name: GlyphName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}) {
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
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}
