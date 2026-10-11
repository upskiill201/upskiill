/**
 * When Teyro asks for reminder notifications — Duolingo's rule: a few times,
 * at good moments, and never nagging.
 *
 *  1. Onboarding's last step asks once.
 *  2. In the app, at most MAX_IN_APP_ASKS more asks, each right after the
 *     learner finishes a lesson (the moment reminders obviously matter).
 *  2b. Right after enrolling, before lesson 1 (decideEnrollAsk): learners who
 *     enrol straight from a course page never see onboarding's ask, and an
 *     unreachable learner who doesn't start is a learner lost. Its own small
 *     budget, so it never eats the after-lesson asks.
 *  3. In a browser tab that can install Teyro, the ask is "install first":
 *     reminders belong to the installed app (on iPhone they only work there).
 *     An install ask spends from the same budget.
 *
 * Spacing: the first in-app ask waits ≥ MIN_GAP_AFTER_ONBOARDING_H after the
 * onboarding ask; the second waits ≥ MIN_GAP_BETWEEN_DAYS after the first.
 * One exception: an install ask followed by the learner actually opening the
 * installed app — the reminders ask there is the payoff of the install, so it
 * comes at the next lesson with no wait.
 *
 * Nothing is asked once reminders are on, or once the browser has recorded a
 * "Block" (only the learner can undo that, in settings).
 *
 * The ledger lives in localStorage: notification permission is per device,
 * so the budget is too. Pure functions here; the watcher does the I/O.
 */

export const MAX_IN_APP_ASKS = 2;
export const MIN_GAP_AFTER_ONBOARDING_H = 20;
export const MIN_GAP_BETWEEN_DAYS = 3;

const KEY = 'teyro:reminder-asks';
const HOUR = 3_600_000;

export type AskKind = 'install' | 'enable';

export interface AskEntry {
  at: string;
  kind: AskKind;
  where: 'onboarding' | 'in-app' | 'enroll';
}

export interface AskLedger {
  asks: AskEntry[];
}

export type AskDecision = { ask: false; reason: string } | { ask: true; kind: AskKind };

export interface AskContext {
  now: Date;
  /** Browser notification permission ('unsupported' when there is no API). */
  permission: NotificationPermission | 'unsupported';
  subscribed: boolean;
  /** Running as the installed app. */
  standalone: boolean;
  /** This browser can install Teyro (native prompt, iOS share sheet, or menu). */
  installable: boolean;
  /** iPhone/iPad in a tab: push only exists inside the installed app. */
  needsInstall: boolean;
}

export function readLedger(): AskLedger {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as AskLedger) : null;
    return parsed && Array.isArray(parsed.asks) ? parsed : { asks: [] };
  } catch {
    return { asks: [] };
  }
}

export function recordAsk(kind: AskKind, where: AskEntry['where'], now = new Date()): void {
  try {
    const ledger = readLedger();
    ledger.asks.push({ at: now.toISOString(), kind, where });
    window.localStorage.setItem(KEY, JSON.stringify(ledger));
  } catch {
    // Storage unavailable: the learner may be asked again, never blocked.
  }
}

/** Install first, in a tab that can install; else the permission ask; else nothing. */
function askKindFor(ctx: AskContext): AskKind | null {
  return !ctx.standalone && ctx.installable
    ? 'install'
    : ctx.permission === 'default' && !ctx.needsInstall
      ? 'enable'
      : // Granted but not subscribed (a failed subscribe) — asking again
        // re-runs the subscribe inside a tap, which is the fix.
        ctx.permission === 'granted' && !ctx.subscribed
        ? 'enable'
        : null;
}

export const MAX_ENROLL_ASKS = 2;
/** Onboarding just asked (they enrolled straight after it): don't ask twice in a row. */
export const ENROLL_QUIET_AFTER_ASK_MIN = 30;

/** Which ask (if any) is due right after enrolling, before lesson 1. */
export function decideEnrollAsk(ledger: AskLedger, ctx: AskContext): AskDecision {
  if (ctx.subscribed && ctx.permission === 'granted') return { ask: false, reason: 'already-on' };
  if (ctx.permission === 'denied') return { ask: false, reason: 'blocked' };
  const kind = askKindFor(ctx);
  if (!kind) return { ask: false, reason: 'unsupported' };

  if (ledger.asks.filter((a) => a.where === 'enroll').length >= MAX_ENROLL_ASKS) {
    return { ask: false, reason: 'budget-spent' };
  }
  const last = ledger.asks[ledger.asks.length - 1];
  if (last && ctx.now.getTime() - new Date(last.at).getTime() < ENROLL_QUIET_AFTER_ASK_MIN * 60_000) {
    return { ask: false, reason: 'too-soon' };
  }
  return { ask: true, kind };
}

/** Which ask (if any) is due right now, after a finished lesson. */
export function decideInAppAsk(ledger: AskLedger, ctx: AskContext): AskDecision {
  if (ctx.subscribed && ctx.permission === 'granted') return { ask: false, reason: 'already-on' };
  if (ctx.permission === 'denied') return { ask: false, reason: 'blocked' };

  const kind = askKindFor(ctx);
  if (!kind) return { ask: false, reason: 'unsupported' };

  const inApp = ledger.asks.filter((a) => a.where === 'in-app');
  if (inApp.length >= MAX_IN_APP_ASKS) return { ask: false, reason: 'budget-spent' };

  const last = ledger.asks[ledger.asks.length - 1];
  if (!last) return { ask: true, kind };

  // The install worked and this is the installed app: ask now.
  if (last.kind === 'install' && ctx.standalone && kind === 'enable') return { ask: true, kind };

  const since = ctx.now.getTime() - new Date(last.at).getTime();
  const gap =
    last.where === 'onboarding' ? MIN_GAP_AFTER_ONBOARDING_H * HOUR : MIN_GAP_BETWEEN_DAYS * 24 * HOUR;
  if (since < gap) return { ask: false, reason: 'too-soon' };

  return { ask: true, kind };
}
