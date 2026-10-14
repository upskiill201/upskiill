/**
 * The "Teyro" account that publishes every Original (scripts/originals.ts
 * applies this on each load, so editing it here updates the live account).
 *
 * Shown on every Original's course page ("Made by Teyro") and at
 * /creator-profile/teyro. Facts only: nothing here claims numbers, awards or
 * accounts we don't have. Add social links here once the official handles
 * are confirmed.
 */
export const TEYRO_ACCOUNT = {
  fullName: 'Teyro',
  /** The Tey tile is the logo (the app icon), never paired with a wordmark. */
  avatarUrl: '/Icons/icon-512.png',
  username: 'teyro',
  /** Not "founding_creator": Teyro is the platform, so it gets no creator badge. */
  creatorStatus: 'teyro_official',
  headline: 'Official Teyro Originals: game-like courses made by the Teyro team',
  tagline: 'Learn real skills, one fun lesson at a time.',
  bio: 'Teyro Originals are courses made by the Teyro team and taught by Tey. Every course follows one story from the first lesson to the last, with 10 to 15 minute lessons, practice from the first minute, checkpoints, streaks and real projects. One subscription unlocks them all.',
  about:
    "Most people who start an online course never finish it. Not because they lack talent, but because most courses are built like textbooks with a login page. Teyro exists to change that: learning real, practical skills should be as engaging as the games and apps that already hold our attention.\n\nTeyro Originals are where we show what that looks like. Each course is written in-house around one story, so you follow real people, like Ada building her first program in Lagos or Kofi getting through his final year in Accra, while you learn the skill yourself. Lessons run Learn, Apply, Reflect, Deepen; you practise from the first minute; Tey explains every idea and every mistake in plain words; and checkpoints make sure it sticks before you move on.\n\nNew chapters are released regularly, and the courses grow level by level, from Beginner upwards.",
  location: 'Online, worldwide',
  languages: ['English'],
  primaryExpertise: 'AI, coding and career skills',
  skills: [
    { name: 'AI tools', level: 'Expert' },
    { name: 'Python', level: 'Expert' },
    { name: 'Studying with AI', level: 'Expert' },
    { name: 'Prompting', level: 'Expert' },
    { name: 'Learning design', level: 'Expert' },
  ],
  teachingLevels: ['Beginner'],
  contentFormats: ['Interactive lessons', 'Story-based lessons', 'Coding exercises', 'Projects'],
  website: 'https://teyro.app',
} as const;
