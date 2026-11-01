/**
 * Teyro avatars — the drawn characters that stand in for a profile photo.
 *
 * A character is 14 small choices (background, skin, face, hair, …). It is
 * stored as a SITE PATH in the same avatarUrl field a photo uses:
 *
 *     /avatars/v1/<14 base-36 chars>.svg
 *
 * so every API that already returns a photo returns a character too, with no
 * schema change, and any plain <img> still works (app/avatars/v1/[file] serves
 * the SVG). The Avatar component spots the path and draws it inline instead.
 *
 * Someone who has chosen nothing still gets a character, picked from their id
 * (seedAvatar), so the same person always looks the same — never a letter.
 *
 * Only an uploaded photo counts as "has a photo" (the Coins thank-you, the
 * network's photo boost); a character is the friendly default, not the goal.
 */

export const BUILT_AVATAR_PREFIX = '/avatars/v1/';

/** Every part and how many options it has, in the order they are encoded. */
export const AVATAR_PARTS = {
  bg: 8,
  skin: 8,
  head: 3,
  hair: 15,
  hairColor: 9,
  eyes: 8,
  brows: 4,
  mouth: 7,
  blush: 2,
  beard: 5,
  glasses: 4,
  extra: 10,
  shirt: 9,
  outfit: 8,
} as const;

export type AvatarPart = keyof typeof AVATAR_PARTS;
export type AvatarConfig = Record<AvatarPart, number>;

const ORDER = Object.keys(AVATAR_PARTS) as AvatarPart[];

export function encodeAvatar(c: AvatarConfig): string {
  return ORDER.map((k) => clampPart(k, c[k]).toString(36)).join('');
}

export function decodeAvatar(code: string): AvatarConfig | null {
  if (!/^[0-9a-z]{14}$/.test(code)) return null;
  const out = {} as AvatarConfig;
  for (let i = 0; i < ORDER.length; i++) {
    const v = parseInt(code[i], 36);
    if (!(v >= 0 && v < AVATAR_PARTS[ORDER[i]])) return null;
    out[ORDER[i]] = v;
  }
  return out;
}

function clampPart(k: AvatarPart, v: number): number {
  const n = AVATAR_PARTS[k];
  return Number.isFinite(v) ? Math.min(n - 1, Math.max(0, Math.round(v))) : 0;
}

export function builtAvatarUrl(c: AvatarConfig): string {
  return `${BUILT_AVATAR_PREFIX}${encodeAvatar(c)}.svg`;
}

/** The character stored in an avatarUrl, or null for a photo / nothing. */
export function avatarFromUrl(url: string | null | undefined): AvatarConfig | null {
  if (!url) return null;
  const at = url.indexOf(BUILT_AVATAR_PREFIX);
  if (at === -1) return null;
  const code = url.slice(at + BUILT_AVATAR_PREFIX.length).replace(/\.svg.*$/, '');
  return decodeAvatar(code);
}

export function isBuiltAvatar(url: string | null | undefined): boolean {
  return !!url && url.includes(BUILT_AVATAR_PREFIX);
}

/** A real uploaded photo (not empty, not a drawn character). */
export function isPhoto(url: string | null | undefined): boolean {
  // Same rule as backend avatar.constants isPhoto.
  return !!url && /^https?:\/\//i.test(url) && !isBuiltAvatar(url);
}

// ── Seeded defaults ──────────────────────────────────────────────────────

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A random but tasteful character: rare extras, natural hair colours mostly. */
export function randomAvatar(rand: () => number = Math.random): AvatarConfig {
  const pick = (n: number) => Math.floor(rand() * n);
  const chance = (p: number) => rand() < p;
  return {
    bg: pick(AVATAR_PARTS.bg),
    skin: pick(AVATAR_PARTS.skin),
    head: pick(AVATAR_PARTS.head),
    hair: chance(0.05) ? 0 : 1 + pick(AVATAR_PARTS.hair - 1),
    // Natural colours (0–5) most of the time; a bold one now and then.
    hairColor: chance(0.85) ? pick(6) : 6 + pick(3),
    eyes: pick(AVATAR_PARTS.eyes),
    brows: pick(AVATAR_PARTS.brows),
    mouth: chance(0.7) ? pick(2) : pick(AVATAR_PARTS.mouth),
    blush: chance(0.4) ? 1 : 0,
    beard: chance(0.18) ? 1 + pick(AVATAR_PARTS.beard - 1) : 0,
    glasses: chance(0.25) ? 1 + pick(AVATAR_PARTS.glasses - 1) : 0,
    extra: chance(0.15) ? 1 + pick(AVATAR_PARTS.extra - 1) : 0,
    shirt: pick(AVATAR_PARTS.shirt),
    outfit: pick(AVATAR_PARTS.outfit),
  };
}

/** The character someone gets before choosing one: stable per seed (their id). */
export function seedAvatar(seed: string): AvatarConfig {
  return randomAvatar(rng(hashString(seed || 'teyro')));
}

/**
 * Ready-made characters for onboarding's one-tap pick: varied skin, hair and
 * style so everyone can find themselves without building anything.
 */
export const STARTER_AVATARS: AvatarConfig[] = [
  { bg: 0, skin: 1, head: 0, hair: 1, hairColor: 1, eyes: 5, brows: 1, mouth: 0, blush: 0, beard: 0, glasses: 0, extra: 0, shirt: 0, outfit: 0 },
  { bg: 5, skin: 5, head: 1, hair: 5, hairColor: 0, eyes: 1, brows: 1, mouth: 1, blush: 1, beard: 0, glasses: 0, extra: 1, shirt: 3, outfit: 1 },
  { bg: 2, skin: 3, head: 2, hair: 3, hairColor: 2, eyes: 0, brows: 3, mouth: 4, blush: 0, beard: 3, glasses: 0, extra: 0, shirt: 1, outfit: 2 },
  { bg: 3, skin: 0, head: 1, hair: 7, hairColor: 4, eyes: 2, brows: 2, mouth: 0, blush: 1, beard: 0, glasses: 1, extra: 0, shirt: 4, outfit: 3 },
  { bg: 1, skin: 6, head: 0, hair: 9, hairColor: 0, eyes: 5, brows: 1, mouth: 1, blush: 0, beard: 0, glasses: 0, extra: 2, shirt: 6, outfit: 0 },
  { bg: 4, skin: 2, head: 0, hair: 11, hairColor: 0, eyes: 1, brows: 1, mouth: 0, blush: 1, beard: 0, glasses: 0, extra: 0, shirt: 5, outfit: 1 },
  { bg: 6, skin: 4, head: 2, hair: 2, hairColor: 0, eyes: 0, brows: 3, mouth: 1, blush: 0, beard: 2, glasses: 3, extra: 0, shirt: 7, outfit: 2 },
  { bg: 7, skin: 1, head: 1, hair: 8, hairColor: 3, eyes: 2, brows: 2, mouth: 5, blush: 1, beard: 0, glasses: 0, extra: 5, shirt: 2, outfit: 3 },
  { bg: 0, skin: 7, head: 0, hair: 4, hairColor: 0, eyes: 5, brows: 1, mouth: 1, blush: 0, beard: 0, glasses: 2, extra: 0, shirt: 8, outfit: 0 },
  { bg: 5, skin: 2, head: 2, hair: 10, hairColor: 7, eyes: 4, brows: 2, mouth: 4, blush: 0, beard: 0, glasses: 0, extra: 0, shirt: 0, outfit: 1 },
  { bg: 2, skin: 5, head: 1, hair: 6, hairColor: 1, eyes: 0, brows: 1, mouth: 0, blush: 1, beard: 0, glasses: 1, extra: 1, shirt: 1, outfit: 2 },
  { bg: 3, skin: 3, head: 0, hair: 0, hairColor: 5, eyes: 1, brows: 3, mouth: 1, blush: 0, beard: 3, glasses: 2, extra: 0, shirt: 3, outfit: 3 },
];
