/**
 * Human words for the raw values Teyro HQ's growth pages show: onboarding
 * screen ids, quit reasons, answers, paywall moments and exit-survey routes.
 * Unknown values fall back to a tidied version of the raw one, so a new
 * screen or moment still reads sensibly before it gets a label here.
 */

const tidy = (v: string) => {
  const s = v.replace(/[-_]+/g, ' ').trim().toLowerCase();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : v;
};

const STEP: Record<string, string> = {
  splash: 'Splash',
  welcome: 'Welcome',
  intro: 'Tey says hi',
  learn: 'I want to learn…',
  name: 'Their name',
  source: 'How they heard',
  goal: 'Why they learn',
  experience: 'How much they know',
  daily: 'Daily goal',
  outcome: "What they'll get",
  projection: 'Projection',
  'reminder-time': 'Reminder time',
  commit: 'Hold to commit',
  path: 'New or know some?',
  'lesson-intro': 'Lesson start',
  lesson: 'The taste lesson',
  'taste-done': 'Great start',
  'placement-intro': 'Placement start',
  placement: 'Placement test',
  chest: 'Gift chest',
  save: 'Save progress (sign up)',
  plan: 'Building their plan',
  paywall: 'Pro paywall',
  result: "You're in",
  install: 'Install + reminders',
  enter: 'Enter the app',
  // Earlier v3 screens, still in older events.
  category: 'Category (old)',
  course: 'Course pick (old)',
  situation: 'Situation (old)',
};

const QUIT: Record<string, string> = {
  'no-time': 'No time right now',
  'not-expected': 'Not what they expected',
  'too-many-questions': 'Too many questions',
  'too-hard': 'Lesson too hard',
  'just-looking': 'Just looking',
  'no answer': 'Left without saying',
};

const ANSWER: Record<string, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  google: 'Google',
  friend: 'A friend',
  x: 'X',
  linkedin: 'LinkedIn',
  'app-store': 'App store',
  other: 'Other',
  'tech-job': 'Land a tech job',
  'grow-at-work': 'Grow at work',
  'build-my-own': 'Build my own thing',
  money: 'Manage money',
  'lead-team': 'Lead a team',
  'speak-confidently': 'Speak with confidence',
  'keep-up-ai': 'Keep up with AI',
  'stay-sharp': 'Keep my brain sharp',
  start: 'From the start',
  placement: 'Placement test',
  email: 'Email',
  google_signin: 'Google',
  existing: 'Logged in to an existing account',
  mobile: 'Phone',
  tablet: 'Tablet',
  desktop: 'Computer',
};

const MOMENT: Record<string, string> = {
  ONBOARDING: 'After onboarding',
  LOCKED_LESSON: 'Locked lesson',
  DAILY_LIMIT: 'Daily lesson limit',
  OUT_OF_HEARTS: 'Out of hearts',
  AFTER_SUCCESS: 'After a win',
  RETURN_AFTER_BREAK: 'Back after a break',
  DEEP_LINK: 'Push or email link',
  SETTINGS: 'Settings',
  STREAK_REPAIR: 'Streak repair',
};

const EXIT_REASON: Record<string, string> = {
  TOO_EXPENSIVE: 'Too expensive',
  NOT_SURE: "Not sure it's for them",
  JUST_LOOKING: 'Just looking',
  DECIDE_LATER: "They'll decide later",
  OTHER: 'Something else',
};

const EXIT_ROUTE: Record<string, string> = {
  DISCOUNT_OFFER: 'shown the one-time offer',
  MONTHLY_PLAN: 'shown monthly',
  PROOF: 'shown what they will learn',
  LET_IN: 'let into the free plan',
  REMINDER: 'reminded in 24 hours',
  THANKS: 'thanked',
};

const STATUS: Record<string, string> = {
  TRIALING: 'On trial',
  ACTIVE: 'Active',
  PAST_DUE: 'Payment failed',
  CANCELED: 'Canceled',
  EXPIRED: 'Ended',
  INCOMPLETE: 'Not started',
};

export const stepLabel = (v: string | null | undefined) => (v ? STEP[v] ?? tidy(v) : 'Nothing yet');
export const quitLabel = (v: string) => QUIT[v] ?? tidy(v);
export const answerLabel = (v: string) => ANSWER[v] ?? tidy(v);
export const momentLabel = (v: string | null | undefined) => (v ? MOMENT[v] ?? tidy(v) : 'Unknown');
export const exitReasonLabel = (v: string) => EXIT_REASON[v] ?? tidy(v);
export const exitRouteLabel = (v: string) => EXIT_ROUTE[v] ?? tidy(v);
export const proStatusLabel = (v: string) => STATUS[v] ?? tidy(v);
export const planLabel = (v: string) => (v === 'YEARLY' ? 'Yearly' : v === 'MONTHLY' ? 'Monthly' : tidy(v));
export const providerLabel = (v: string) => (v === 'MESOMB' ? 'Mobile Money' : v === 'STRIPE' ? 'Card' : tidy(v));
export const eventLabel = (v: string) => tidy(v);
