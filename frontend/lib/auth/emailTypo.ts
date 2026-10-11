/**
 * Catches the mistyped email domain before it becomes a dead account.
 *
 * A real Teyro signup went in as "…@gamil.com": the verification email went
 * nowhere, and the person made a second account. One edit away from a common
 * provider (a swap, a missing or extra letter, a wrong TLD) is close enough to
 * ask "Did you mean …?" — never to change it silently.
 */

const DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'live.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'yahoo.fr',
  'hotmail.fr',
  'ymail.com',
  'msn.com',
  'me.com',
];

/** Well-known misspellings that are more than one edit away. */
const KNOWN: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.om': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'iclod.com': 'icloud.com',
};

/** Damerau-Levenshtein distance, capped: we only care about 0, 1 or "more". */
function distance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

/** The corrected address when the domain looks like a typo, else null. */
export function suggestEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  const at = email.lastIndexOf('@');
  if (at < 1 || at === email.length - 1) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (DOMAINS.includes(domain)) return null;

  const known = KNOWN[domain];
  if (known) return `${local}@${known}`;

  // Only domains that look finished (have a dot) — not "gma" mid-typing.
  if (!domain.includes('.')) return null;
  const close = DOMAINS.find((d) => distance(domain, d) === 1);
  return close ? `${local}@${close}` : null;
}
