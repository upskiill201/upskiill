/**
 * Tey's voice for the CLAIM scene (lesson complete / XP+coins payout) —
 * replaces the single fixed `'Lesson complete!'` default title with a pool
 * tiered by how much XP just landed. `scene.title` (an existing override
 * prop, used by DailyRewardWatcher/WeeklyLuckySpinCard for their own
 * titles) still wins over all of this.
 */

import { pickFromPool } from './pool';

const NORMAL = ['Lesson complete!', 'Nice one! Keep going! 🔥', "That's how it's done!", 'Okayyy, I see you! 👀'];

const BIG = ['Okay, somebody is showing off! 😤', 'THAT was impressive! 🔥', 'Look at you goooo! 🚀', 'WAIT… YOU DID THAT?! 😳'];

export function pickClaimTitle(rewards: { currency: string; amount: number }[]): string {
  const xp = rewards.filter((r) => r.currency === 'XP').reduce((s, r) => s + r.amount, 0);
  const pool = xp >= 40 ? BIG : NORMAL;
  return pickFromPool(pool, xp >= 40 ? 'claim:BIG' : 'claim:NORMAL');
}
