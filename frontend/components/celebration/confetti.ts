/**
 * Confetti palettes for the bright celebration stage.
 *
 * canvas-confetti paints on a canvas and can't take var(...), so the brand
 * tokens from app/globals.css are resolved at fire time. No white pieces —
 * they vanish on the white stage.
 */

const PALETTES = {
  /** Everyday wins: gold first, brand accents. */
  gold: ['--warning', '--color-brand', '--brand-purple', '--success-green'],
  /** Streak: all fire. */
  fire: ['--warning', '--error-red', '--warning', '--color-brand'],
  /** Level up and course milestones: brand-led. */
  brand: ['--color-brand', '--warning', '--brand-purple', '--success-green'],
  /** Section complete / unlocks: green-led. */
  green: ['--success-green', '--warning', '--color-brand'],
} as const;

export type ConfettiPalette = keyof typeof PALETTES;

export function confettiColors(palette: ConfettiPalette = 'gold'): string[] {
  if (typeof window === 'undefined') return [];
  const css = getComputedStyle(document.documentElement);
  return PALETTES[palette].map((t) => css.getPropertyValue(t).trim()).filter(Boolean);
}
