/**
 * Tey's voice for the Weekly Lucky Spin prize reveal — shared by
 * WeeklyLuckySpinCard.tsx and HeraldSpinReveal.tsx, which previously each
 * hardcoded the identical "🎉 YOU WON..." template independently.
 */

import { pickFromPool } from './pool';

const SPIN_WIN_COMMON = [
  '🎉 You won {amount} {name}!',
  'Ooh, {amount} {name} — nice! 🎉',
  'Cha-ching! {amount} {name} for you. 🎉',
];

const SPIN_WIN_RARE = [
  '🎉 JACKPOT! {amount} {name}!',
  'No way — {amount} {name}?! Lucky you 😲',
  "That's the good stuff. {amount} {name}! 🔥",
];

export function pickSpinPrizeMessage(amount: number, name: string, rarityTier?: string): string {
  const isRare = rarityTier === 'rare';
  const template = pickFromPool(isRare ? SPIN_WIN_RARE : SPIN_WIN_COMMON, isRare ? 'spin:rare' : 'spin:common');
  return template.replace('{amount}', String(amount)).replace('{name}', name);
}
