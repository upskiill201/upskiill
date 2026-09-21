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
// Every name below was read out of the treasure_chest.riv binary with the
// installed runtime, not taken from the integration guide — the guide and the
// asset disagree in two places and the asset wins:
//
//  1. The nested view model on `TChest` is named `rewords` (with an 'o'). The
//     guide calls it `rewards`; that path resolves to null on the real file.
//     `CHEST_REWARD_VM_CANDIDATES` tries the guide's spelling too, so the day
//     the animator fixes the typo this keeps working with no code change.
//  2. "hartRewards" is the animator's real spelling. Do not "fix" it.

export type TeyroRewardType = 'coins' | 'xp' | 'streakFreeze' | 'xpBoost' | 'hearts';

export type RiveRewardType =
  | 'coinRewards'
  | 'xpRewards'
  | 'streakFreezeRewards'
  | 'xpBoostRewards'
  | 'hartRewards';

/** Nested view-model property names to probe, in priority order. */
export const CHEST_REWARD_VM_CANDIDATES = ['rewords', 'rewards'] as const;
/** The enum property inside that nested view model. */
export const CHEST_REWARD_ENUM_PROPERTY = 'rewardType';
/** Root-level triggers on `TChest`. */
export const CHEST_TRIGGER_CLICK = 'click';
export const CHEST_TRIGGER_RESET = 'reset';
/** Name of the Rive *event* (not a view-model trigger) fired at reveal. */
export const CHEST_REVEAL_EVENT = 'rewardReveal';

const TEYRO_TO_RIVE_REWARD_TYPE: Record<TeyroRewardType, RiveRewardType> = {
  coins: 'coinRewards',
  xp: 'xpRewards',
  streakFreeze: 'streakFreezeRewards',
  xpBoost: 'xpBoostRewards',
  hearts: 'hartRewards',
};

/** Every enum value the asset actually declares — used to verify the contract
 *  at load time rather than discovering a rename mid-reveal. */
export const RIVE_REWARD_TYPES: readonly RiveRewardType[] =
  Object.values(TEYRO_TO_RIVE_REWARD_TYPE);

export function isTeyroRewardType(value: unknown): value is TeyroRewardType {
  // hasOwnProperty, not `in`: `in` walks the prototype chain, so 'constructor'
  // and 'toString' would validate and then map to undefined — which Rive
  // accepts silently and renders as the default reward.
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(TEYRO_TO_RIVE_REWARD_TYPE, value)
  );
}

/** TeyroRewardType → the exact Rive enum value to set on `rewords.rewardType`. */
export function toRiveRewardType(teyroType: TeyroRewardType): RiveRewardType {
  return TEYRO_TO_RIVE_REWARD_TYPE[teyroType];
}

/** Same mapping, but total: returns null for anything the chest cannot show,
 *  so callers fall back deliberately instead of silently revealing coins. */
export function safeToRiveRewardType(value: unknown): RiveRewardType | null {
  return isTeyroRewardType(value) ? TEYRO_TO_RIVE_REWARD_TYPE[value] : null;
}

/**
 * Backend reward-type strings → TreasureChest's TeyroRewardType.
 *
 * Returns null for anything the chest has no animation for. Callers must not
 * substitute coins: the server has already decided (and persisted) the real
 * reward, so showing a coin animation for it would lie to the learner.
 */
export function toTreasureChestRewardType(
  backendType: string | undefined | null
): TeyroRewardType | null {
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
      return null;
  }
}
