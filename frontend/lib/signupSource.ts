/**
 * Remembers which page sent a reader to the sign-up form, for the length of the
 * tab. The waitlist stores `source` as a 40-character field, so the value is
 * short: "blog:<slug>".
 */
const KEY = 'teyro_signup_source';
const MAX = 40;

export function rememberSignupSource(source: string): void {
  try {
    sessionStorage.setItem(KEY, source.slice(0, MAX));
  } catch {
    // private windows and blocked storage: the form falls back to its own source
  }
}

export function recalledSignupSource(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}
