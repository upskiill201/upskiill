/**
 * "Sign back in" (Duolingo's: "choose from accounts saved on this device").
 *
 * After a successful log in or sign up, the device remembers who it was: a
 * first name, the email and a photo URL. Never a password, a token or
 * anything else, and only on this device. The log in screen offers it as a
 * one-tap start (it fills the email; the password is still asked), shows the
 * email masked, and has a Remove button. It survives log out on purpose
 * (that's the point of "sign back in"); Remove forgets it for good.
 */

const KEY = 'teyro:saved-account';

export interface SavedAccount {
  email: string;
  firstName: string | null;
  avatarUrl: string | null;
  role: 'STUDENT' | 'INSTRUCTOR';
  savedAt: number;
}

export function readSavedAccount(role: SavedAccount['role'] = 'STUDENT'): SavedAccount | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as SavedAccount;
    if (!a?.email || typeof a.email !== 'string' || a.role !== role) return null;
    return a;
  } catch {
    return null;
  }
}

export function saveAccount(a: { email: string; fullName?: string | null; avatarUrl?: string | null; role?: SavedAccount['role'] }) {
  try {
    const email = a.email.trim().toLowerCase();
    if (!email.includes('@')) return;
    const first = a.fullName?.trim().split(/\s+/)[0] || null;
    const value: SavedAccount = {
      email,
      firstName: first ? first.slice(0, 40) : null,
      avatarUrl: a.avatarUrl && /^https:\/\//.test(a.avatarUrl) ? a.avatarUrl : null,
      role: a.role ?? 'STUDENT',
      savedAt: Date.now(),
    };
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* private mode: nothing to remember */
  }
}

export function forgetSavedAccount() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* nothing to forget */
  }
}

/** "ad***@gmail.com": enough to recognise your own, not enough to read someone's. */
export function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  const keep = user.length <= 2 ? user.slice(0, 1) : user.slice(0, 2);
  return `${keep}${'•'.repeat(Math.max(2, Math.min(6, user.length - keep.length)))}@${domain}`;
}
