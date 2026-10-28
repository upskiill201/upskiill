/**
 * Teyro characters with a personality (founder, 2026-10-28): a vibe and a
 * career look each, so picking one says something about you — "Chill Coder",
 * "Per My Last Email", "Objection!". Onboarding offers these as one-tap
 * picks; the avatar builder starts from one and lets you change anything.
 *
 * A persona is only a starting config: what gets saved is the character
 * itself (lib/avatar/avatar.ts), so tweaking one never breaks anything.
 */

import type { AvatarConfig } from './avatar';

export type PersonaCareer = 'tech' | 'business' | 'law' | 'health' | 'creative' | 'money' | 'teaching' | 'sales';

export interface Persona {
  id: string;
  /** The name on the card. */
  name: string;
  /** The personality, in a few words. */
  vibe: string;
  career: PersonaCareer;
  /** What they'd say. Shown under the name when picked. */
  line: string;
  config: AvatarConfig;
}

// Part indices (see lib/avatar/draw.ts):
//   eyes   0 bright · 1 happy · 2 dots · 3 sleepy · 4 wink · 5 lashes · 6 side-eye · 7 narrowed
//   mouth  0 smile · 1 grin · 2 calm · 3 "o" · 4 smirk · 5 tongue · 6 unimpressed
//   outfit 0 tee · 1 hoodie · 2 collared · 3 jacket · 4 suit & tie · 5 blazer · 6 scrubs · 7 turtleneck
//   extra  0 none · 1 hoops · 2 headphones · 3 cap · 4 beanie · 5 flower · 6 pencil · 7 headset · 8 stethoscope · 9 beret
//   hair   0 bald · 1 crop · 2 buzz · 3 quiff · 4 afro · 5 bun · 6 long · 7 bob · 8 locs · 9 curls · 10 spiky · 11 wrap · 12 puffs · 13 ponytail · 14 undercut
//   glasses 0 none · 1 round · 2 square · 3 shades
export const PERSONAS: Persona[] = [
  {
    id: 'chill-coder',
    name: 'Crack Coder',
    vibe: 'Chill',
    career: 'tech',
    line: 'Already pushed the fix.',
    config: { bg: 0, skin: 2, head: 2, hair: 14, hairColor: 0, eyes: 7, brows: 1, mouth: 4, blush: 0, beard: 1, glasses: 0, extra: 0, shirt: 7, outfit: 1 },
  },
  {
    id: 'per-my-last-email',
    name: 'Per My Last Email',
    vibe: 'Passive-aggressive',
    career: 'business',
    line: 'As previously discussed…',
    config: { bg: 3, skin: 0, head: 1, hair: 7, hairColor: 3, eyes: 6, brows: 2, mouth: 6, blush: 0, beard: 0, glasses: 2, extra: 0, shirt: 8, outfit: 2 },
  },
  {
    id: 'objection',
    name: 'Objection!',
    vibe: 'Sharp',
    career: 'law',
    line: 'I rest my case.',
    config: { bg: 7, skin: 5, head: 2, hair: 3, hairColor: 0, eyes: 7, brows: 3, mouth: 4, blush: 0, beard: 0, glasses: 0, extra: 0, shirt: 7, outfit: 4 },
  },
  {
    id: 'cool-founder',
    name: 'Cool Founder',
    vibe: 'Cool',
    career: 'business',
    line: "We're pre-revenue. On purpose.",
    config: { bg: 4, skin: 3, head: 0, hair: 3, hairColor: 1, eyes: 0, brows: 1, mouth: 4, blush: 0, beard: 1, glasses: 3, extra: 0, shirt: 0, outfit: 5 },
  },
  {
    id: 'sunny-designer',
    name: 'Sunny Designer',
    vibe: 'Upbeat',
    career: 'creative',
    line: 'Can we make it pop?',
    config: { bg: 5, skin: 1, head: 1, hair: 7, hairColor: 7, eyes: 5, brows: 0, mouth: 1, blush: 1, beard: 0, glasses: 0, extra: 9, shirt: 4, outfit: 7 },
  },
  {
    id: 'calm-doctor',
    name: 'Calm Doctor',
    vibe: 'Steady',
    career: 'health',
    line: "Deep breath. You've got this.",
    config: { bg: 1, skin: 6, head: 0, hair: 5, hairColor: 0, eyes: 0, brows: 0, mouth: 0, blush: 0, beard: 0, glasses: 0, extra: 8, shirt: 5, outfit: 6 },
  },
  {
    id: 'data-nerd',
    name: 'Data Nerd',
    vibe: 'Curious',
    career: 'tech',
    line: 'Actually, the data says…',
    config: { bg: 0, skin: 4, head: 1, hair: 9, hairColor: 1, eyes: 2, brows: 2, mouth: 1, blush: 0, beard: 0, glasses: 1, extra: 0, shirt: 1, outfit: 0 },
  },
  {
    id: 'the-closer',
    name: 'The Closer',
    vibe: 'Smooth',
    career: 'sales',
    line: "Let's circle back. Today.",
    config: { bg: 2, skin: 2, head: 2, hair: 1, hairColor: 2, eyes: 4, brows: 1, mouth: 4, blush: 0, beard: 2, glasses: 0, extra: 7, shirt: 3, outfit: 5 },
  },
  {
    id: 'unbothered',
    name: 'Unbothered',
    vibe: 'Unbothered',
    career: 'creative',
    line: "Not my circus. Not my monkeys.",
    config: { bg: 6, skin: 7, head: 0, hair: 8, hairColor: 0, eyes: 6, brows: 0, mouth: 2, blush: 0, beard: 0, glasses: 0, extra: 1, shirt: 6, outfit: 3 },
  },
  {
    id: 'overachiever',
    name: 'Overachiever',
    vibe: 'Driven',
    career: 'business',
    line: 'Already finished. Twice.',
    config: { bg: 4, skin: 1, head: 1, hair: 5, hairColor: 2, eyes: 7, brows: 3, mouth: 0, blush: 1, beard: 0, glasses: 2, extra: 0, shirt: 4, outfit: 2 },
  },
  {
    id: 'finance-whiz',
    name: 'Finance Whiz',
    vibe: 'Confident',
    career: 'money',
    line: 'Compound interest is my love language.',
    config: { bg: 1, skin: 3, head: 2, hair: 2, hairColor: 0, eyes: 0, brows: 1, mouth: 4, blush: 0, beard: 3, glasses: 0, extra: 0, shirt: 7, outfit: 4 },
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    vibe: 'Sleepy',
    career: 'tech',
    line: 'Just one more bug. At 3am.',
    config: { bg: 3, skin: 2, head: 0, hair: 10, hairColor: 8, eyes: 3, brows: 0, mouth: 3, blush: 0, beard: 0, glasses: 0, extra: 4, shirt: 3, outfit: 1 },
  },
  {
    id: 'hype-marketer',
    name: 'Hype Marketer',
    vibe: 'Loud',
    career: 'sales',
    line: "This is going viral. Trust.",
    config: { bg: 5, skin: 5, head: 1, hair: 12, hairColor: 0, eyes: 1, brows: 2, mouth: 5, blush: 1, beard: 0, glasses: 3, extra: 0, shirt: 2, outfit: 0 },
  },
  {
    id: 'kind-teacher',
    name: 'Kind Teacher',
    vibe: 'Patient',
    career: 'teaching',
    line: "There are no silly questions.",
    config: { bg: 2, skin: 4, head: 1, hair: 6, hairColor: 5, eyes: 0, brows: 0, mouth: 0, blush: 1, beard: 0, glasses: 1, extra: 6, shirt: 1, outfit: 3 },
  },
  {
    id: 'ai-wizard',
    name: 'AI Wizard',
    vibe: 'Excited',
    career: 'tech',
    line: 'I asked the model. It agreed with me.',
    config: { bg: 0, skin: 0, head: 0, hair: 4, hairColor: 6, eyes: 5, brows: 2, mouth: 1, blush: 0, beard: 0, glasses: 1, extra: 0, shirt: 3, outfit: 0 },
  },
  {
    id: 'quiet-genius',
    name: 'Quiet Genius',
    vibe: 'Mysterious',
    career: 'law',
    line: '…',
    config: { bg: 7, skin: 6, head: 2, hair: 11, hairColor: 0, eyes: 0, brows: 1, mouth: 2, blush: 0, beard: 0, glasses: 2, extra: 0, shirt: 4, outfit: 5 },
  },
];

export const PERSONA_BY_ID: Record<string, Persona> = Object.fromEntries(PERSONAS.map((p) => [p.id, p]));
