/**
 * @jest-environment jsdom
 */
import {
  CREATOR_STEPS,
  TOTAL_CREATOR_STEPS,
  canAdvanceCreator,
  creatorStepByNumber,
  firstUnansweredStep,
} from '../steps';
import { weeksToFirstCourse, type CreatorAnswers } from '../catalog';
import { lineFor, reactionFor } from '../dialogue';
import {
  CREATOR_ONBOARDING_KEY,
  clearCreatorOnboarding,
  getCreatorOnboarding,
  migrateLegacyAnswers,
  saveCreatorAnswers,
  toSignupPayload,
} from '../storage';
import { CREATOR_TRACKS, normalizeCourseCategory } from '@/lib/creator/categories';
import { headlineIdeas, suggestUsername } from '../profile';

const complete: CreatorAnswers = {
  name: 'Ada',
  creatorType: 'engineer',
  track: 'coding',
  topics: ['web-development'],
  experience: 'some',
  audience: 'none',
  existing: ['videos'],
  goal: 'earn',
  weeklyHours: '3-5',
};

describe('creator onboarding steps', () => {
  it('numbers the 14 steps 1..14 in order', () => {
    expect(TOTAL_CREATOR_STEPS).toBe(14);
    expect(CREATOR_STEPS.map((s) => s.number)).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
  });

  it('gates each question on its own answer', () => {
    const topics = creatorStepByNumber(5)!;
    expect(canAdvanceCreator(topics, { track: 'coding', topics: [] })).toBe(false);
    expect(canAdvanceCreator(topics, { track: 'coding', topics: ['web-development'] })).toBe(true);
    expect(canAdvanceCreator(creatorStepByNumber(2)!, { name: '   ' })).toBe(false);
    // Screens without input never block.
    expect(canAdvanceCreator(creatorStepByNumber(11)!, {})).toBe(true);
  });

  it('finds the first unanswered question, or none when all are in', () => {
    expect(firstUnansweredStep({})).toBe(2);
    expect(firstUnansweredStep({ ...complete, goal: undefined })).toBe(9);
    expect(firstUnansweredStep(complete)).toBeNull();
  });

  it('switching track wipes the topics (declared on the track step)', () => {
    expect(creatorStepByNumber(4)!.invalidates).toEqual(['topics']);
  });
});

describe('creator plan maths', () => {
  it('turns weekly hours into weeks to an 8-lesson first course', () => {
    expect(weeksToFirstCourse('1-2')).toBe(8);
    expect(weeksToFirstCourse('3-5')).toBe(4);
    expect(weeksToFirstCourse('6-10')).toBe(2);
    expect(weeksToFirstCourse('10-plus')).toBe(2);
  });
});

describe("Tey's creator lines", () => {
  it('has a line for every step, with no emojis', () => {
    for (const step of CREATOR_STEPS) {
      const beat = lineFor(step.id, complete);
      expect(beat.text.length).toBeGreaterThan(0);
      expect(beat.text).not.toMatch(/\p{Extended_Pictographic}/u);
    }
  });

  it('uses what it knows', () => {
    expect(lineFor('type', { name: 'Ada' }).text).toContain('Ada');
    expect(lineFor('topics', { track: 'ai' }).text).toContain('AI');
  });

  it('reacts to picks, and stays warm for a brand-new creator', () => {
    expect(reactionFor('track', { track: 'ai' })?.text).toMatch(/AI/);
    expect(reactionFor('type', { creatorType: 'new-creator' })?.poseFamily).toBe('warm');
    expect(reactionFor('topics', { topics: [] })).toBeNull();
  });
});

describe('creator onboarding storage', () => {
  beforeEach(() => localStorage.clear());

  it('saves and resumes answers under the v2 key', () => {
    saveCreatorAnswers({ track: 'ai' }, 4);
    const state = getCreatorOnboarding();
    expect(state.answers).toEqual({ track: 'ai' });
    expect(state.furthestStep).toBe(4);
    expect(localStorage.getItem(CREATOR_ONBOARDING_KEY)).not.toBeNull();
    clearCreatorOnboarding();
    expect(getCreatorOnboarding().answers).toEqual({});
  });

  it('carries the 16-step flow’s answers over once, then drops the old key', () => {
    localStorage.setItem(
      'teyro_creator_onboarding',
      JSON.stringify({
        step2: { creatorType: 'youtube_educator' },
        step3: { categories: ['programming'] },
        step4: { audienceSize: '1k_10k' },
        step6: { existingContent: ['recorded_videos', 'unknown'] },
      }),
    );
    expect(getCreatorOnboarding().answers).toEqual({
      creatorType: 'content-creator',
      track: 'coding',
      audience: '1k-10k',
      existing: ['videos'],
    });
    expect(localStorage.getItem('teyro_creator_onboarding')).toBeNull();
  });

  it('ignores legacy categories outside the launch tracks', () => {
    expect(migrateLegacyAnswers({ step3: { categories: ['music'] } }).track).toBeUndefined();
  });

  it('sends nothing for an empty session, and a version-2 payload otherwise', () => {
    expect(toSignupPayload({})).toBeNull();
    expect(toSignupPayload({ topics: [] })).toBeNull();
    expect(toSignupPayload({ track: 'ai' })).toEqual({ version: 2, track: 'ai' });
  });
});

describe('launch categories', () => {
  it('uses the learner interests as creator topics, minus "not sure yet"', () => {
    expect(CREATOR_TRACKS.coding.topics.map((t) => t.id)).toEqual([
      'web-development',
      'mobile-development',
      'programming-fundamentals',
      'software-development',
    ]);
    expect(CREATOR_TRACKS.ai.topics.some((t) => t.id === 'exploring')).toBe(false);
  });

  it.each([
    ['Coding', 'coding'],
    ['AI', 'ai'],
    ['Programming & Development', 'coding'],
    ['Development', 'coding'],
    ['IT & Software', 'coding'],
    ['AI & Machine Learning', 'ai'],
    ['Artificial Intelligence', 'ai'],
    ['Data Science', 'ai'],
    ['Music & Audio Production', null],
    ['', null],
  ])('maps "%s" to %s', (input, expected) => {
    expect(normalizeCourseCategory(input)).toBe(expected);
  });
});

describe('profile step helpers', () => {
  it('suggests a clean username from a name', () => {
    expect(suggestUsername('Ada Lovelace')).toBe('adalovelace');
    expect(suggestUsername('Zoë O’Brien-Smith')).toBe('zoeobriensmith');
    expect(suggestUsername(undefined)).toBe('');
  });

  it('writes headline ideas from the answers, all short enough to save', () => {
    const ideas = headlineIdeas(complete);
    expect(ideas[0]).toBe('Software engineer teaching Coding');
    expect(ideas.every((i) => i.length <= 120)).toBe(true);
  });
});
