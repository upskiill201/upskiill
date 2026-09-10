/** Shared currency config for the Celebration Engine (single source of truth). */

export type CelebrationCurrency = 'COINS' | 'XP' | 'HEARTS' | 'STREAK' | 'FREEZE';

export const CURRENCY_ICONS: Record<CelebrationCurrency, string> = {
  COINS: '/Icons/Coin.png',
  XP: '/Icons/gem.png',
  HEARTS: '/Icons/heart.png',
  STREAK: '/Icons/burn.png',
  FREEZE: '/Icons/snowflake.svg',
};

export const CURRENCY_LABELS: Record<CelebrationCurrency, string> = {
  COINS: 'COINS',
  XP: 'XP',
  HEARTS: 'HEARTS',
  STREAK: 'DAY STREAK',
  FREEZE: 'STREAK FREEZE',
};

export const CURRENCY_COLORS: Record<CelebrationCurrency, string> = {
  COINS: '#EAB308',
  XP: '#6C8CFF',
  HEARTS: '#F87171',
  STREAK: '#FF8A00',
  FREEZE: '#1CB0F6',
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
    default:
      return 'COINS';
  }
}
