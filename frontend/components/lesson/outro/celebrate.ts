/**
 * The finish screen's confetti, in four shapes, so two finishes in a row
 * don't pop the same way (lib/lesson/moments.ts picks one per moment):
 *
 *   burst    one pop from behind Tey
 *   cannons  two bursts from the bottom corners, crossing
 *   stars    gold stars — a flawless lesson
 *   rain     a soft fall from the top — welcome back
 *
 * Colours come from the lesson's own tokens, read off the page at the
 * moment of firing — canvas can't read CSS variables itself.
 */

import { fireConfetti } from '@/lib/confetti';
import type { ConfettiStyle } from '@/lib/lesson/moments';

const TOKENS = ['--lesson-gold', '--lesson-correct', '--color-brand', '--brand-purple', '--warning'];

function palette(el: Element | null): string[] | undefined {
  if (!el) return undefined;
  const cs = getComputedStyle(el);
  const colors = TOKENS.map((t) => cs.getPropertyValue(t).trim()).filter(Boolean);
  return colors.length ? colors : undefined;
}

export function fireCelebration(style: ConfettiStyle, el: Element | null) {
  const colors = palette(el);
  const gold = colors?.[0] ? [colors[0]] : undefined;
  switch (style) {
    case 'cannons':
      fireConfetti({ particleCount: 70, angle: 60, spread: 60, startVelocity: 55, origin: { x: 0, y: 0.85 }, colors });
      fireConfetti({ particleCount: 70, angle: 120, spread: 60, startVelocity: 55, origin: { x: 1, y: 0.85 }, colors });
      break;
    case 'stars':
      fireConfetti({ particleCount: 60, spread: 100, startVelocity: 38, scalar: 1.3, shapes: ['star'], origin: { y: 0.35 }, colors: gold });
      setTimeout(
        () => fireConfetti({ particleCount: 40, spread: 140, startVelocity: 30, scalar: 0.9, shapes: ['star'], origin: { y: 0.4 }, colors: gold }),
        250,
      );
      break;
    case 'rain':
      fireConfetti({ particleCount: 120, spread: 180, startVelocity: 12, gravity: 0.6, ticks: 320, origin: { x: 0.5, y: -0.1 }, colors });
      break;
    default:
      fireConfetti({ particleCount: 90, spread: 90, startVelocity: 42, origin: { y: 0.35 }, colors });
  }
}
