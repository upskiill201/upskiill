/**
 * Tey's voice for the Step 7 WhatsApp outcome screen (`Step7Content.tsx`) —
 * the reaction to step 6's connect-or-skip choice, right before the demo
 * challenge. Previously a single fixed 4-5 line speech (all paragraphs
 * accumulate in one bubble — see SpeechBubble.tsx), which learners reported
 * as confusing to read through. Cut down to two short beats — the reaction,
 * then the transition into the challenge — and pooled so a variant doesn't
 * repeat back-to-back, same mechanism as every other Tey domain.
 */

import { pickFromPool } from './pool';

/** Joins a variant's lines with the Unicode line-separator character (U+2028)
 *  — never typed by hand and never present in this copy — so
 *  `pickFromPool`'s string-based pool/dedupe can pick a whole variant at once
 *  instead of mixing lines from different variants together. */
const LINE_SEP = ' ';

const HEADLINE_STYLE = 'font-size:1.25rem;color:#071233;font-weight:900;display:block';

const VERIFIED_VARIANTS: string[][] = [
  [
    `<strong style="${HEADLINE_STYLE}">You&apos;re all set! ✅</strong>`,
    `I won&apos;t spam you — unless you ghost your lessons. 😏 Ready for a quick challenge?`,
  ],
  [
    `<strong style="${HEADLINE_STYLE}">Nice, you&apos;re verified! ✅</strong>`,
    `I&apos;ll only bug you if you skip a lesson. 😅 Ready to try something fun?`,
  ],
  [
    `<strong style="${HEADLINE_STYLE}">WhatsApp connected! ✅</strong>`,
    `Now let&apos;s see what you&apos;re made of — ready for a 2-minute challenge?`,
  ],
];

const SKIPPED_VARIANTS: string[][] = [
  [
    `<strong style="${HEADLINE_STYLE}">No WhatsApp? Noted. 😅</strong>`,
    `You can always turn it on later. For now — ready for a quick challenge?`,
  ],
  [
    `<strong style="${HEADLINE_STYLE}">Skipped WhatsApp — fair enough.</strong>`,
    `I&apos;ll win you over some other way. 😉 Ready for a 2-minute challenge?`,
  ],
  [
    `<strong style="${HEADLINE_STYLE}">Playing it safe, I see. 👀</strong>`,
    `No worries — you can connect it anytime. Ready to jump in?`,
  ],
];

function pickVariant(variants: string[][], key: string): string[] {
  const pool = variants.map((v) => v.join(LINE_SEP));
  return pickFromPool(pool, key).split(LINE_SEP);
}

export function pickWhatsAppVerifiedLines(): string[] {
  return pickVariant(VERIFIED_VARIANTS, 'onboarding:whatsapp-verified');
}

export function pickWhatsAppSkippedLines(): string[] {
  return pickVariant(SKIPPED_VARIANTS, 'onboarding:whatsapp-skipped');
}
