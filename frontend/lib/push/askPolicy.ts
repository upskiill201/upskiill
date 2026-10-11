/**
 * When Teyro asks to install the app and turn on reminders. Founder's rule:
 * a learner Tey can't reach is a learner Tey loses, so the ask comes back
 * every day until it's done — no budget, no "two strikes and stop".
 *
 *  1. Onboarding's last step asks.
 *  2. Right after enrolling, before lesson 1 (decideEnrollAsk): learners who
 *     enrol straight from a course page never see onboarding's ask.
 *  3. In the app (decideInAppAsk), at most once a day: on app open and after
 *     a finished lesson, whichever comes first.
 *  4. In a browser tab that can install Teyro, the ask is "install first":
 *     reminders belong to the installed app (on iPhone they only work there).
 *  5. HQ can ask on demand (the server tells the watcher; not decided here).
 *
 * Spacing: MIN_GAP_H between any two asks, so it's daily, never twice in a
 * sitting. One exception: an install ask followed by the learner actually
 * opening the installed app — the reminders ask there is the payoff of the
 * install, so it comes straight away.
 *
 * Nothing is asked once reminders are on, or once the browser has recorded a
 * "Block" for this tab with nothing to install (only the learner can undo a
 * block, in settings; the server's emails explain how).
 *
 * The ledger lives in localStorage: notification permission is per device,
 * so the budget is too. Pure functions here; the watcher does the I/O.
 */

/** Hours between two asks: about once a day, at whatever time they open the app. */
export const MIN_GAP_H = 20;

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

/** Onboarding just asked (they enrolled straight after it): don't ask twice in a row. */
export const ENROLL_QUIET_AFTER_ASK_MIN = 30;

/** Which ask (if any) is due right after enrolling, before lesson 1. */
export function decideEnrollAsk(ledger: AskLedger, ctx: AskContext): AskDecision {
  if (ctx.subscribed && ctx.permission === 'granted') return { ask: false, reason: 'already-on' };
  const kind = askKindFor(ctx);
  if (!kind) return { ask: false, reason: ctx.permission === 'denied' ? 'blocked' : 'unsupported' };

  const last = ledger.asks[ledger.asks.length - 1];
  if (last && ctx.now.getTime() - new Date(last.at).getTime() < ENROLL_QUIET_AFTER_ASK_MIN * 60_000) {
    return { ask: false, reason: 'too-soon' };
  }
  return { ask: true, kind };
}

/** Which ask (if any) is due right now: on app open or after a lesson. */
export function decideInAppAsk(ledger: AskLedger, ctx: AskContext): AskDecision {
  if (ctx.subscribed && ctx.permission === 'granted') return { ask: false, reason: 'already-on' };

  // A blocked tab can still be asked to install (the installed app gets its
  // own permission); with nothing to install, there's nothing to ask here.
  const kind = askKindFor(ctx);
  if (!kind) return { ask: false, reason: ctx.permission === 'denied' ? 'blocked' : 'unsupported' };

  const last = ledger.asks[ledger.asks.length - 1];
  if (!last) return { ask: true, kind };

  // The install worked and this is the installed app: ask now.
  if (last.kind === 'install' && ctx.standalone && kind === 'enable') return { ask: true, kind };

  if (ctx.now.getTime() - new Date(last.at).getTime() < MIN_GAP_H * HOUR) return { ask: false, reason: 'too-soon' };
  return { ask: true, kind };
}
