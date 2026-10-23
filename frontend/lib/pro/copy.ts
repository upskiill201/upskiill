/**
 * Teyro Pro paywall copy. One place for every word the paywall says, per
 * moment, so the playbook's rules hold everywhere:
 *   - the headline is the learner's goal or the result, never "Go Pro"
 *   - benefits are results, not a feature list
 *   - the button says exactly what happens
 *   - every number comes from /pro/plans, never from here
 */
import type { PaywallMoment, ProPlan } from './api';

export function formatUsd(minor: number): string {
  const dollars = minor / 100;
  return `$${dollars.toFixed(dollars % 1 === 0 ? 0 : 2)}`;
}

/** Always two decimals: prices read as prices ($5.00/mo, not $5/mo). */
export function formatPrice(minor: number): string {
  return `$${(minor / 100).toFixed(2)}`;
}

export function formatDay(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

export interface PaywallContext {
  name?: string | null;
  /** The outcome they chose in onboarding, as a phrase: "land a tech job". */
  goal?: string | null;
  courseTitle?: string | null;
}

/** First name only, and only if it looks like a name. */
function first(name?: string | null): string | null {
  const n = name?.trim().split(/\s+/)[0];
  return n && n.length <= 24 ? n : null;
}

export function headlineFor(moment: PaywallMoment, ctx: PaywallContext): { title: string; sub: string } {
  const name = first(ctx.name);
  const course = ctx.courseTitle?.trim();
  switch (moment) {
    case 'ONBOARDING':
      return {
        title: ctx.goal ? `${name ? `${name}, your` : 'Your'} plan to ${ctx.goal}` : `${name ? `${name}, your` : 'Your'} plan is ready`,
        sub: course
          ? `Keep going with ${course}, a few minutes a day, with every Teyro course unlocked.`
          : 'A few minutes a day, with every Teyro course unlocked.',
      };
    case 'LOCKED_LESSON':
      return {
        title: course ? `Keep going with ${course}` : 'Keep the momentum going',
        sub: 'This lesson is part of Teyro Pro. Pro opens it, and every other course too.',
      };
    case 'DAILY_LIMIT':
      return {
        title: "You're on a roll. Don't stop now",
        sub: "That's today's free lessons done. Pro has no daily limit.",
      };
    case 'OUT_OF_HEARTS':
      return {
        title: 'Out of hearts? Not with Pro',
        sub: 'Unlimited hearts, so a mistake never ends your lesson.',
      };
    case 'AFTER_SUCCESS':
      return {
        title: name ? `Nice work, ${name}. Keep this pace` : 'Chapter done. Keep this pace',
        sub: course ? `Unlock the rest of ${course} and every other course.` : 'Unlock every course and learn without limits.',
      };
    case 'RETURN_AFTER_BREAK':
      return {
        title: name ? `Welcome back, ${name}` : 'Welcome back',
        sub: 'Pick up right where you left off, with nothing standing in your way.',
      };
    case 'STREAK_REPAIR':
      return {
        title: 'Save your streak with Pro',
        sub: 'Pro includes a free streak repair every month.',
      };
    default:
      return {
        title: ctx.goal ? `Your plan to ${ctx.goal}` : 'Learn anything on Teyro',
        sub: 'Every course, no daily limit, unlimited hearts.',
      };
  }
}

/** Benefits as results, in the order that matters for this moment. */
export function benefitsFor(moment: PaywallMoment): { key: string; title: string; body: string }[] {
  const all = {
    courses: {
      key: 'courses',
      title: 'Learn anything on Teyro',
      body: 'Every course, including ones from creators. New ones as they launch.',
    },
    limit: {
      key: 'limit',
      title: 'Learn as much as you want',
      body: 'No daily lesson limit. Binge a chapter when you have the time.',
    },
    hearts: {
      key: 'hearts',
      title: 'Mistakes never stop you',
      body: 'Unlimited hearts, so you can try, fail and try again.',
    },
    streak: {
      key: 'streak',
      title: 'Your streak is protected',
      body: 'A free streak repair every month if life gets in the way.',
    },
  };
  switch (moment) {
    case 'DAILY_LIMIT':
      return [all.limit, all.courses, all.hearts, all.streak];
    case 'OUT_OF_HEARTS':
      return [all.hearts, all.limit, all.courses, all.streak];
    case 'STREAK_REPAIR':
      return [all.streak, all.limit, all.hearts, all.courses];
    default:
      return [all.courses, all.limit, all.hearts, all.streak];
  }
}

export function planLabel(plan: ProPlan): string {
  return plan === 'YEARLY' ? 'Yearly' : 'Monthly';
}

/** What the main button says: exactly what happens next. */
export function ctaFor(opts: { trial: boolean; trialDays: number; plan: ProPlan; dueTodayMinor: number }): string {
  if (opts.trial) return `Start my ${opts.trialDays}-day free trial`;
  return `Subscribe for ${formatPrice(opts.dueTodayMinor)}`;
}
