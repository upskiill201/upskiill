/**
 * The name printed on certificates — kept apart from the profile name so a
 * learner can be "CodeKing99" in the app and "Ada Okafor" on paper.
 *
 * The rules here mirror backend/src/certificate/certificate-name.ts; the
 * server is the one that enforces them.
 */

/** GET /certificates/name */
export interface CertificateNameState {
  /** The confirmed certificate name, or null until the learner confirms one. */
  name: string | null;
  /** What to prefill: the confirmed name, else the name already on their certificates, else the profile name. */
  suggested: string;
  confirmedAt: string | null;
  /** The one free correction is open until this moment (null once used or before confirming). */
  editableUntil: string | null;
  canEdit: boolean;
  /** Certificates already issued (they carry the old, unconfirmed name until confirmed). */
  held: number;
  /** Courses finished whose certificate waits on the name. */
  earnedUnclaimed: number;
}

export const CERTIFICATE_NAME_MAX = 60;

const ALLOWED = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;

function titleCase(word: string): string {
  return word.toLocaleLowerCase().replace(/(^|[-'’])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toLocaleUpperCase());
}

/** Trims, collapses spaces, and fixes ALL CAPS or all-lowercase typing. Mixed case is left as typed (McDonald, de Souza). */
export function normaliseCertificateName(raw: string): string {
  const name = raw.normalize('NFC').replace(/\s+/g, ' ').trim();
  const letters = name.replace(/[^\p{L}]/gu, '');
  if (letters && (letters === letters.toLocaleUpperCase() || letters === letters.toLocaleLowerCase())) {
    return name.split(' ').map(titleCase).join(' ');
  }
  return name;
}

/** Why a name can't go on a certificate, or null when it can. Run on the normalised name. */
export function certificateNameProblem(name: string): string | null {
  if (!name) return 'Type the name you want on your certificate.';
  if (name.length > CERTIFICATE_NAME_MAX) return `Keep it under ${CERTIFICATE_NAME_MAX} characters.`;
  if (/\d/.test(name)) return 'Names can’t contain numbers.';
  if (!ALLOWED.test(name)) return 'Use letters only. Hyphens and apostrophes are fine.';
  if (name.split(' ').filter((w) => /\p{L}/u.test(w)).length < 2) return 'Add your first name and surname.';
  if (/^teyro learner$/i.test(name)) return 'Use your own name.';
  return null;
}

export async function saveCertificateName(name: string): Promise<CertificateNameState> {
  const res = await fetch('/api/certificates/name', {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, confirm: true }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    throw new Error(typeof message === 'string' ? message : 'Couldn’t save your name. Try again.');
  }
  return (await res.json()) as CertificateNameState;
}
