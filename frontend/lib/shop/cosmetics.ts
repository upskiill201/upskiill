/**
 * Cosmetic artwork — the single source of truth for how every shop cosmetic
 * renders, wherever it appears (shop card, purchase scene, profile avatar,
 * inventory grid).
 *
 * The backend sends an opaque `art` token and never a colour, so artwork can
 * be redrawn without a migration or a deploy dependency between the two
 * sides. This file is the other half of that contract.
 *
 * Colours here are *content*, not theme — the same reasoning as
 * components/celebration/currency.ts and achievements/badgeArt.tsx, which
 * likewise carry their own palettes. Page chrome still uses the CSS variables
 * from docs/08-color-system.md.
 */

export type ShopRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
export type CosmeticSlot = 'FRAME' | 'BACKGROUND' | 'CELEBRATION_FX' | 'XP_FX';

// ─── Rarity ──────────────────────────────────────────────────────────────────

export interface RarityStyle {
  label: string;
  /** Text/border accent. */
  color: string;
  /** Card wash behind the item art. */
  wash: string;
  /** Outer glow for the reveal beat — Legendary should feel expensive. */
  glow: string;
}

export const RARITY_STYLES: Record<ShopRarity, RarityStyle> = {
  COMMON: {
    label: 'Common',
    color: '#64748B',
    wash: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
    glow: '0 0 0 rgba(0,0,0,0)',
  },
  RARE: {
    label: 'Rare',
    color: '#3D5AFE',
    wash: 'linear-gradient(135deg, #EEF2FF 0%, #DBE3FF 100%)',
    glow: '0 0 32px rgba(61, 90, 254, 0.45)',
  },
  EPIC: {
    label: 'Epic',
    color: '#7B61FF',
    wash: 'linear-gradient(135deg, #F3EEFF 0%, #E4DAFF 100%)',
    glow: '0 0 40px rgba(123, 97, 255, 0.55)',
  },
  LEGENDARY: {
    label: 'Legendary',
    color: '#F59E0B',
    wash: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    glow: '0 0 52px rgba(245, 158, 11, 0.65)',
  },
};

export function rarityStyle(rarity: string): RarityStyle {
  return RARITY_STYLES[(rarity as ShopRarity) ?? 'COMMON'] ?? RARITY_STYLES.COMMON;
}

// ─── Art tokens ──────────────────────────────────────────────────────────────

export interface CosmeticArt {
  /** Ring/gradient painted for this cosmetic. */
  gradient: string;
  /** Optional second ring for frames with a visible inner edge. */
  innerGradient?: string;
  /** Drives the ambient particle/animation treatment on scenes. */
  motion?: 'none' | 'pulse' | 'orbit' | 'flicker' | 'sweep';
  /** Short line used where the item has no description of its own. */
  caption?: string;
}

/**
 * Frames are rendered as a conic/linear ring around the avatar. Backgrounds
 * are painted behind the profile card. Effects are represented by their key
 * colour on cards and by a real animation in the celebration layer.
 */
export const COSMETIC_ART: Record<string, CosmeticArt> = {
  // ── Frames ────────────────────────────────────────────────────────────────
  'frame-ember': {
    gradient: 'conic-gradient(from 210deg, #F97316, #FDBA74, #EA580C, #F97316)',
    motion: 'flicker',
  },
  'frame-frost': {
    gradient: 'conic-gradient(from 180deg, #38BDF8, #E0F2FE, #0EA5E9, #38BDF8)',
    motion: 'pulse',
  },
  'frame-nebula': {
    gradient: 'conic-gradient(from 140deg, #6C8CFF, #C084FC, #312E81, #6C8CFF)',
    motion: 'orbit',
  },
  'frame-circuit': {
    gradient: 'conic-gradient(from 90deg, #22C55E, #4ADE80, #065F46, #22C55E)',
    motion: 'sweep',
  },
  'frame-studio': {
    gradient: 'conic-gradient(from 260deg, #F59E0B, #FDE68A, #B45309, #F59E0B)',
    motion: 'pulse',
  },
  'frame-champion': {
    gradient: 'conic-gradient(from 0deg, #EAB308, #FEF08A, #A16207, #EAB308)',
    innerGradient: 'linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0))',
    motion: 'sweep',
  },
  'frame-legend': {
    gradient:
      'conic-gradient(from 45deg, #F59E0B, #FDE68A, #7B61FF, #3D5AFE, #F59E0B)',
    innerGradient: 'linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0))',
    motion: 'orbit',
  },
  'frame-supernova': {
    gradient:
      'conic-gradient(from 0deg, #FFFFFF, #6C8CFF, #C084FC, #F59E0B, #FFFFFF)',
    innerGradient: 'radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%)',
    motion: 'orbit',
  },
  'frame-arcade-gold': {
    gradient: 'conic-gradient(from 30deg, #EAB308, #22C55E, #A855F7, #EAB308)',
    motion: 'sweep',
  },
  'frame-directors-cut': {
    gradient: 'conic-gradient(from 300deg, #F59E0B, #1F2A44, #FDE68A, #F59E0B)',
    motion: 'sweep',
  },
  'frame-haunted': {
    gradient: 'conic-gradient(from 200deg, #F97316, #1F2A44, #A855F7, #F97316)',
    motion: 'flicker',
  },

  // ── Backgrounds ───────────────────────────────────────────────────────────
  'bg-aurora': {
    gradient: 'linear-gradient(135deg, #A7F3D0 0%, #6C8CFF 55%, #C084FC 100%)',
    motion: 'pulse',
  },
  'bg-deep-space': {
    gradient: 'linear-gradient(160deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    motion: 'orbit',
  },
  'bg-arcade': {
    gradient: 'linear-gradient(135deg, #1F2A44 0%, #A855F7 50%, #22C55E 100%)',
    motion: 'sweep',
  },
  'bg-studio-set': {
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 60%, #B45309 100%)',
    motion: 'pulse',
  },
  'bg-golden-hour': {
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #F97316 45%, #7B61FF 100%)',
    motion: 'pulse',
  },
  'bg-cosmic-tey': {
    gradient:
      'radial-gradient(circle at 30% 20%, #C084FC 0%, transparent 45%), linear-gradient(160deg, #0F172A 0%, #3D5AFE 100%)',
    motion: 'orbit',
  },
  'bg-first-snow': {
    gradient: 'linear-gradient(160deg, #E0F2FE 0%, #93C5FD 50%, #1E3A8A 100%)',
    motion: 'pulse',
  },

  // ── Celebration effects ───────────────────────────────────────────────────
  'fx-confetti': {
    gradient: 'linear-gradient(135deg, #F87171 0%, #FBBF24 35%, #34D399 70%, #60A5FA 100%)',
    motion: 'pulse',
    caption: 'Paper storm on every celebration',
  },
  'fx-star-shower': {
    gradient: 'linear-gradient(135deg, #312E81 0%, #6C8CFF 60%, #FFFFFF 100%)',
    motion: 'orbit',
    caption: 'Falling light instead of paper',
  },
  'fx-pixel-burst': {
    gradient: 'linear-gradient(135deg, #22C55E 0%, #A855F7 55%, #1F2A44 100%)',
    motion: 'sweep',
    caption: '8-bit explosion',
  },
  'fx-film-flash': {
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FDE68A 45%, #1F2A44 100%)',
    motion: 'sweep',
    caption: 'Shutter clack and studio bloom',
  },
  'fx-phoenix': {
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #F97316 45%, #DC2626 100%)',
    motion: 'flicker',
    caption: 'Your celebrations catch fire',
  },
  'fx-anniversary': {
    gradient: 'linear-gradient(135deg, #3D5AFE 0%, #7B61FF 50%, #FDE68A 100%)',
    motion: 'pulse',
    caption: 'One more year of learning out loud',
  },

  // ── XP effects ────────────────────────────────────────────────────────────
  'xpfx-spark': {
    gradient: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
    motion: 'flicker',
    caption: 'Sparks trail your XP',
  },
  'xpfx-comet': {
    gradient: 'linear-gradient(135deg, #6C8CFF 0%, #FFFFFF 100%)',
    motion: 'orbit',
    caption: 'XP arcs like a comet',
  },
  'xpfx-combo': {
    gradient: 'linear-gradient(135deg, #A855F7 0%, #22C55E 100%)',
    motion: 'sweep',
    caption: 'Back-to-back lessons stack a combo',
  },

  // ── Power-ups & chests (card art only — these are not equippable) ─────────
  heart: { gradient: 'linear-gradient(135deg, #FCA5A5 0%, #EF4444 100%)' },
  freeze: { gradient: 'linear-gradient(135deg, #BAE6FD 0%, #0EA5E9 100%)' },
  retry: { gradient: 'linear-gradient(135deg, #C7D2FE 0%, #6366F1 100%)' },
  'boost-xp': { gradient: 'linear-gradient(135deg, #DDD6FE 0%, #7B61FF 100%)' },
  'boost-xp2': { gradient: 'linear-gradient(135deg, #A78BFA 0%, #4C1D95 100%)' },
  'boost-coin': { gradient: 'linear-gradient(135deg, #FDE68A 0%, #EAB308 100%)' },
  repair: { gradient: 'linear-gradient(135deg, #FDBA74 0%, #EA580C 100%)' },
  shield: { gradient: 'linear-gradient(135deg, #A7F3D0 0%, #059669 100%)' },
  vault: { gradient: 'linear-gradient(135deg, #E0F2FE 0%, #0369A1 100%)' },
  'chest-bronze': { gradient: 'linear-gradient(135deg, #FDBA74 0%, #B45309 100%)' },
  'chest-silver': { gradient: 'linear-gradient(135deg, #E2E8F0 0%, #64748B 100%)' },
  'chest-gold': { gradient: 'linear-gradient(135deg, #FDE68A 0%, #EAB308 100%)' },
};

const FALLBACK_ART: CosmeticArt = {
  gradient: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)',
  motion: 'none',
};

export function cosmeticArt(token: string | null | undefined): CosmeticArt {
  if (!token) return FALLBACK_ART;
  return COSMETIC_ART[token] ?? FALLBACK_ART;
}

// ─── Category labels ─────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<string, string> = {
  POWER_UP: 'Power-Ups',
  CHEST: 'Mystery Chests',
  FRAME: 'Profile Frames',
  BACKGROUND: 'Profile Backdrops',
  CELEBRATION_FX: 'Celebration Effects',
  XP_FX: 'XP Effects',
};

export const SLOT_LABELS: Record<CosmeticSlot, string> = {
  FRAME: 'Frame',
  BACKGROUND: 'Backdrop',
  CELEBRATION_FX: 'Celebration',
  XP_FX: 'XP Effect',
};
