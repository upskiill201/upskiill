/** Shared currency config for the Celebration Engine (single source of truth). */

export type CelebrationCurrency = 'COINS' | 'XP' | 'HEARTS' | 'STREAK' | 'FREEZE' | 'BOOST';

export const CURRENCY_ICONS: Record<CelebrationCurrency, string> = {
  COINS: '/Icons/Coin.png',
  XP: '/Icons/gem.png',
  HEARTS: '/Icons/heart.png',
  STREAK: '/Icons/burn.png',
  FREEZE: '/Icons/snowflake.svg',
  // No dedicated XP-boost asset exists yet — reuses the XP gem icon.
  BOOST: '/Icons/gem.png',
};

export const CURRENCY_LABELS: Record<CelebrationCurrency, string> = {
  COINS: 'COINS',
  XP: 'XP',
  HEARTS: 'HEARTS',
  STREAK: 'DAY STREAK',
  FREEZE: 'STREAK FREEZE',
  BOOST: 'XP BOOST',
};

export const CURRENCY_COLORS: Record<CelebrationCurrency, string> = {
  COINS: '#EAB308',
  XP: '#6C8CFF',
  HEARTS: '#F87171',
  STREAK: '#FF8A00',
  FREEZE: '#1CB0F6',
  BOOST: '#A855F7',
};

/** Human names for backend reward-type enums (toasts, prize copy). */
export function currencyDisplayName(backendType: string | undefined | null): string {
  switch ((backendType || '').toUpperCase()) {
    case 'COINS':
    case 'GEMS':
      return 'COINS';
    case 'XP':
      return 'XP';
    case 'HEARTS':
    case 'LIVES':
      return 'HEARTS';
    case 'STREAK':
      return 'DAY STREAK';
    case 'STREAK_FREEZE':
      return 'STREAK FREEZE';
    default:
      return (backendType || 'REWARD').replace(/_/g, ' ');
  }
}

/** Backend reward-type strings → celebration currency. */
export function toCelebrationCurrency(
  backendType: string | undefined | null
): CelebrationCurrency {
  switch ((backendType || '').toUpperCase()) {
    case 'COINS':
    case 'GEMS': // legacy name treated as coins (CLAUDE.md §5)
      return 'COINS';
    case 'XP':
      return 'XP';
    case 'HEARTS':
    case 'LIVES':
      return 'HEARTS';
    case 'STREAK':
      return 'STREAK';
    case 'STREAK_FREEZE':
      return 'FREEZE';
    case 'XP_BOOST':
      return 'BOOST';
    default:
      return 'COINS';
  }
}

// ─── Treasure Chest (Rive) reward-type mapping ──────────────────────────────
// The TChest view model's `rewards.rewardType` enum, verified directly from
// the treasure_chest.riv binary — "hartRewards" is the animator's real
// spelling, not a typo. Do not rename it to "heartRewards".

export type TeyroRewardType = 'coins' | 'xp' | 'streakFreeze' | 'xpBoost' | 'hearts';

export type RiveRewardType =
  | 'coinRewards'
  | 'xpRewards'
  | 'streakFreezeRewards'
  | 'xpBoostRewards'
  | 'hartRewards';

const TEYRO_TO_RIVE_REWARD_TYPE: Record<TeyroRewardType, RiveRewardType> = {
  coins: 'coinRewards',
  xp: 'xpRewards',
  streakFreeze: 'streakFreezeRewards',
  xpBoost: 'xpBoostRewards',
  hearts: 'hartRewards',
};

/** TeyroRewardType → the exact Rive enum value to set on `rewards.rewardType`. */
export function toRiveRewardType(teyroType: TeyroRewardType): RiveRewardType {
  return TEYRO_TO_RIVE_REWARD_TYPE[teyroType];
}

/** Backend reward-type strings → TreasureChest's TeyroRewardType. */
export function toTreasureChestRewardType(
  backendType: string | undefined | null
): TeyroRewardType {
  switch ((backendType || '').toUpperCase()) {
    case 'COINS':
    case 'GEMS':
      return 'coins';
    case 'XP':
      return 'xp';
    case 'HEARTS':
    case 'LIVES':
      return 'hearts';
    case 'STREAK_FREEZE':
      return 'streakFreeze';
    case 'XP_BOOST':
      return 'xpBoost';
    default:
      return 'coins';
  }
}
