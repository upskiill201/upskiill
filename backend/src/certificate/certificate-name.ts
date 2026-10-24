/**
 * Rules for the name printed on certificates. Mirrored for instant feedback
 * in frontend/lib/certificates/name.ts — this copy is the one that counts.
 */

export const CERTIFICATE_NAME_MAX = 60;

/** The one free correction stays open this long after the first confirmation. */
export const CORRECTION_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const ALLOWED = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;

function titleCase(word: string): string {
  return word
    .toLocaleLowerCase()
    .replace(
      /(^|[-'’])(\p{L})/gu,
      (_, sep: string, ch: string) => sep + ch.toLocaleUpperCase(),
    );
}

/** Trims, collapses spaces, and fixes ALL CAPS or all-lowercase typing. Mixed case is kept as typed (McDonald, de Souza). */
export function normaliseCertificateName(raw: string): string {
  const name = String(raw ?? '')
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim();
  const letters = name.replace(/[^\p{L}]/gu, '');
  if (
    letters &&
    (letters === letters.toLocaleUpperCase() ||
      letters === letters.toLocaleLowerCase())
  ) {
    return name.split(' ').map(titleCase).join(' ');
  }
  return name;
}

/** Why a (normalised) name can't go on a certificate, or null when it can. */
export function certificateNameProblem(name: string): string | null {
  if (!name) return 'Type the name you want on your certificate.';
  if (name.length > CERTIFICATE_NAME_MAX)
    return `Keep it under ${CERTIFICATE_NAME_MAX} characters.`;
  if (/\d/.test(name)) return 'Names can’t contain numbers.';
  if (!ALLOWED.test(name))
    return 'Use letters only. Hyphens and apostrophes are fine.';
  if (name.split(' ').filter((w) => /\p{L}/u.test(w)).length < 2)
    return 'Add your first name and surname.';
  if (/^teyro learner$/i.test(name)) return 'Use your own name.';
  return null;
}
