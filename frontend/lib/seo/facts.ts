/**
 * What Teyro actually does — the only source of product claims for the SEO
 * pages (/features, /for, /alternatives). Each line was checked against the
 * code on 2026-09-28; the comment says where. Change the product, change this.
 *
 * Nothing here may be a guess. A comparison page that overstates Teyro loses
 * the one reader it exists for: the person already deciding to switch.
 */

import { LEARNER_ENTRY } from '../launch';

// While the app is gated (lib/launch.ts) every "start" button is a notify-me link.
export const START_HREF = LEARNER_ENTRY.href;
export const START_LABEL = LEARNER_ENTRY.gated ? 'Get notified at launch' : 'Get Teyro free';

export const TEYRO = {
  name: 'Teyro',
  oneLiner: 'Short daily coding and AI lessons with streaks, leagues and friends that keep you coming back.',
  // homepage FAQ (components/homepage/v3/Sections.tsx)
  subjects:
    'Coding (web development, mobile apps, programming fundamentals, software development) and AI (using AI tools, building agents and automations)',
  subjectsShort: 'Coding and AI',
  // Each lesson: Learn → Apply → Reflect → Deepen (schema.prisma phase blocks)
  lessonFormat: 'Four short steps per lesson: learn one idea, apply it straight away, reflect, then go deeper if you want',
  // settings DAILY_GOALS: 20/50/100/200 XP ≈ 5/10/15/20 min
  dailyTime: '5 to 20 minutes a day — you pick the goal',
  // homepage FAQ: many courses free; paid courses give 2 free lessons
  price: 'Free to start. Many courses are free end to end; paid courses let you try the first two lessons free',
  priceShort: 'Free to start',
  // gamification.service.ts computeRefill + refillLivesWithXp
  hearts: '5 hearts; one comes back every 4 hours, or refill all five with 120 coins you earn by learning',
  // streak.service.ts, shop registry STREAK_REPAIR
  streaks: 'Daily streak with freezes for busy days and a 48-hour repair window if you slip',
  // league.config.ts
  leagues: 'Weekly leagues with real learners (no bots), Bronze up to Diamond',
  // missions.service.ts QUEST_POOL, chest.service.ts
  rewards: 'Three daily quests, a daily chest, streak chests, coins and a shop',
  // community.service.ts COMMUNITY_UNLOCK_LESSONS = 2
  community: 'Each course has a community you join after your second lesson',
  // homepage: installs to Home Screen, no app store, works offline
  platforms: 'Runs in the browser and installs to your Home Screen on iPhone and Android in one tap — no app store',
  platformsShort: 'Web + Home Screen app',
  // backend has no certificate issuance
  certificates: 'No completion certificates yet',
  // there is no ad code anywhere in the frontend
  ads: 'No ads',
  offline: 'Opens instantly and keeps working offline once installed',
} as const;

/** Honest limits — every comparison page shows these. */
export const TEYRO_LIMITS = [
  'Coding and AI only — no languages, maths or creative skills',
  'No completion certificates yet',
  'A young catalogue: fewer courses than the big marketplaces',
  'No native app store listing; it installs from the browser instead',
] as const;

/**
 * The visuals the pages can show beside a claim. Each maps to a product mock
 * drawn from the real app (components/homepage/v3/Visuals.tsx).
 */
export type VisualKey =
  | 'phone'
  | 'lesson'
  | 'method'
  | 'streak'
  | 'league'
  | 'friends'
  | 'rewards'
  | 'reminders';

export const VISUAL_KEYS: VisualKey[] = [
  'phone',
  'lesson',
  'method',
  'streak',
  'league',
  'friends',
  'rewards',
  'reminders',
];
