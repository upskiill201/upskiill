/**
 * The personalized path narrative.
 *
 * Composes three sentences from the learner's real answers:
 *   (a) what you're here for      — category + primary interest + goals
 *   (b) where you're starting     — experience level + prior attempt
 *   (c) how that shapes it        — barriers + commitment + preferred time
 *
 * Deterministic templates. No LLM call, no network request: combining a
 * handful of known answers does not justify an AI round trip, and onboarding
 * must not depend on a provider being up.
 *
 * It describes PREFERENCES AND APPROACH only. It never names a course, a
 * lesson or a timeframe, because at this point in the flow we have not
 * checked the catalog and have no right to promise anything.
 *
 * The same composed output feeds the reveal screen, the review screen and the
 * completion card, so the three can never contradict each other.
 */

import { interestLabel } from './catalog';
import { commitmentOption } from './commitment';
import type { ExperienceLevel, LearningInterest, OnboardingAnswersV2 } from './types';
import { hasBarrier, hasGoal, primaryInterest } from './types';

export interface PathSummary {
  /** The three composed sentences, in order. */
  sentences: string[];
  /** Joined for display; the array is kept for testing and for staggered reveal. */
  text: string;
  /**
   * The same three sentences by role, so the reveal screen can label each
   * row without relying on array position (an empty sentence is dropped from
   * `sentences`, which would shift every label after it).
   */
  parts: { goal: string; start: string; habit: string };
  /** Short chips for the review screen and completion card. */
  highlights: { label: string; value: string }[];
}

// ─── (a) What you're here for ────────────────────────────────────────────────

// Plain words, short sentences: this is read on a phone by people of every
// reading level and first language. No idioms ("pick a lane", "wield").

const INTEREST_AMBITION: Record<string, string> = {
  'build-agents': 'You want to build AI agents that do real work for you.',
  automations: 'You want to automate the boring, repetitive stuff.',
  'use-tools': 'You want to get really good at using AI tools.',
  'web-development': 'You want to build websites and web apps that people can use.',
  'mobile-development': 'You want to build apps for phones.',
  'programming-fundamentals': 'You want to learn how code really works, from the ground up.',
  'software-development': 'You want to build real software that runs.',
};

function openingSentence(a: OnboardingAnswersV2): string {
  const interest = primaryInterest(a);

  if (interest && interest !== 'exploring' && INTEREST_AMBITION[interest]) {
    return INTEREST_AMBITION[interest];
  }
  if (a.category === 'ai') {
    return "You're into AI and still deciding which part. That's fine. We'll explore it together.";
  }
  if (a.category === 'coding') {
    return "You want to learn to code and haven't picked a direction yet. We'll find it by building things.";
  }
  return "You're here to learn something real.";
}

/** Appended to (a) when a goal genuinely sharpens it. */
function goalClause(a: OnboardingAnswersV2): string {
  if (hasGoal(a, 'career')) return ' And you want it to help your career.';
  if (hasGoal(a, 'freelance')) return ' And you want skills people will pay for.';
  if (hasGoal(a, 'startup')) return " And you're building something of your own.";
  if (hasGoal(a, 'build-projects')) return ' And you want to make your own projects.';
  if (hasGoal(a, 'automate')) return ' And you want to save yourself time.';
  return '';
}

// ─── (b) Where you're starting ───────────────────────────────────────────────

const LEVEL_START: Record<ExperienceLevel, string> = {
  beginner: "You're starting fresh. That's great: you'll learn it the right way from day one.",
  'tried-a-little': "You've tried a bit before, so we'll build on what you already know.",
  basics: "You know the basics, so we'll skip the intro stuff.",
  experienced: "You already know your way around, so we'll go deeper.",
};

function startingSentence(a: OnboardingAnswersV2): string {
  const base = a.experienceLevel ? LEVEL_START[a.experienceLevel] : '';

  // The prior-attempt signal is the strongest churn predictor we have, so it
  // gets acknowledged here — supportively, and without guessing at a reason.
  if (a.priorAttempt === 'stopped') {
    return `${base} You've started before and stopped. That's normal! This time we'll make it easier to keep going.`.trim();
  }
  if (a.priorAttempt === 'self-taught-a-little') {
    return `${base} And you've already taught yourself some. That counts!`.trim();
  }
  return base;
}

// ─── (c) How that shapes the experience ──────────────────────────────────────

function shapingSentence(a: OnboardingAnswersV2): string {
  const commitment = commitmentOption(a.dailyCommitment);
  const minutes = commitment ? `${commitment.minutes} minutes` : 'a short session';
  const when =
    a.preferredTime && a.preferredTime !== 'no-preference'
      ? ` in the ${a.preferredTime}`
      : ', whenever it fits';

  if (hasBarrier(a, 'consistency') || a.priorAttempt === 'stopped') {
    return `Sticking with it is the hard part, so we'll do ${minutes}${when}. A little every day beats a lot once in a while.`;
  }
  if (hasBarrier(a, 'no-time')) {
    return `Time is tight, so it's just ${minutes}${when}. Even a busy day has room for that.`;
  }
  if (hasBarrier(a, 'distracted')) {
    return `You get distracted easily, so each session is only ${minutes}${when}, and worth sticking around for.`;
  }
  if (hasBarrier(a, 'what-next')) {
    return `I'll always show you what to do next. You just show up for ${minutes}${when}.`;
  }
  if (hasBarrier(a, 'hard-concepts')) {
    return `When something gets hard, we'll break it into small pieces. ${capitalize(minutes)}${when}, no rushing.`;
  }
  if (hasBarrier(a, 'boring')) {
    return `If it ever gets boring, that's my job to fix. ${capitalize(minutes)}${when}, and I'll make it count.`;
  }
  return `We'll do ${minutes}${when}. Small enough to keep up, big enough to matter.`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Composition ─────────────────────────────────────────────────────────────

export function buildPathSummary(a: OnboardingAnswersV2): PathSummary {
  const parts = {
    goal: (openingSentence(a) + goalClause(a)).trim(),
    start: startingSentence(a).trim(),
    habit: shapingSentence(a).trim(),
  };
  const sentences = [parts.goal, parts.start, parts.habit].filter(Boolean);

  return {
    sentences,
    parts,
    text: sentences.join(' '),
    highlights: buildHighlights(a),
  };
}

/**
 * The compact version for the completion card.
 * Uses catalog labels only — never a raw id, never a DB field name.
 */
function buildHighlights(a: OnboardingAnswersV2): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = [];
  const interest = primaryInterest(a);
  const commitment = commitmentOption(a.dailyCommitment);

  if (interest && interest !== 'exploring') {
    out.push({ label: 'Focus', value: interestLabel(a.category, interest) });
  }
  if (commitment) {
    out.push({ label: 'Daily goal', value: `${commitment.minutes} min` });
  }
  if (a.preferredTime && a.preferredTime !== 'no-preference') {
    out.push({ label: 'Best time', value: capitalize(a.preferredTime) });
  }
  return out;
}

/** Extra interests, for the reveal screen's secondary line. */
export function secondaryInterests(a: OnboardingAnswersV2): LearningInterest[] {
  return (a.interests ?? []).slice(1);
}
