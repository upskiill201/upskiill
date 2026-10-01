/**
 * Onboarding analytics.
 *
 * The privacy assertions here matter more than the plumbing ones: the brief
 * is explicit that free text and self-reported learning barriers must not
 * reach an analytics provider, and that is easy to regress by adding one
 * convenient field to a payload.
 */

jest.mock('@/lib/analytics', () => ({ captureEvent: jest.fn() }));

import { captureEvent } from '@/lib/analytics';
import {
  resetOnboardingAnalytics,
  trackCategorySelected,
  trackFirstLearningAction,
  trackOnboardingCompleted,
  trackOnboardingStarted,
  trackStepSkipped,
  trackStepViewed,
} from '../analytics';
import type { OnboardingAnswersV2 } from '../types';

const capture = captureEvent as jest.Mock;

const answers: OnboardingAnswersV2 = {
  name: 'Ada Lovelace',
  category: 'ai',
  interests: ['build-agents'],
  goals: ['career'],
  experienceLevel: 'beginner',
  priorAttempt: 'stopped',
  barriers: ['consistency', 'distracted'],
  dailyCommitment: '10',
  preferredTime: 'evening',
};

beforeEach(() => {
  capture.mockClear();
  resetOnboardingAnalytics();
});

describe('duplicate suppression', () => {
  it('counts a step view once per session, however many times it mounts', () => {
    // StrictMode double-mounts in dev; a refresh re-mounts in production.
    trackStepViewed('category', 3);
    trackStepViewed('category', 3);
    trackStepViewed('category', 3);
    expect(capture).toHaveBeenCalledTimes(1);
  });

  it('still counts distinct steps separately', () => {
    trackStepViewed('category', 3);
    trackStepViewed('goals', 4);
    expect(capture).toHaveBeenCalledTimes(2);
  });

  it('fires onboarding_started only once', () => {
    trackOnboardingStarted();
    trackOnboardingStarted();
    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture.mock.calls[0][0]).toBe('onboarding_started');
  });
});

describe('privacy', () => {
  it('never sends the learner name, barriers, or prior attempt', () => {
    trackOnboardingCompleted(answers);

    const payload = JSON.stringify(capture.mock.calls[0][1]);
    expect(payload).not.toContain('Ada');
    expect(payload).not.toContain('Lovelace');
    expect(payload).not.toContain('consistency');
    expect(payload).not.toContain('distracted');
    expect(payload).not.toContain('stopped');
  });

  it('still sends the funnel dimensions worth measuring', () => {
    trackOnboardingCompleted(answers);
    expect(capture.mock.calls[0][1]).toMatchObject({
      category: 'ai',
      primary_interest: 'build-agents',
      experience_level: 'beginner',
      daily_commitment_minutes: '10',
      preferred_time: 'evening',
    });
  });

  it('sends counts, not contents, for the multi-selects', () => {
    trackOnboardingCompleted(answers);
    const props = capture.mock.calls[0][1];
    expect(props.goal_count).toBe(1);
    expect(props.interest_count).toBe(1);
    expect(props).not.toHaveProperty('goals');
    expect(props).not.toHaveProperty('barriers');
  });
});

describe('events', () => {
  it('records the category split on its own', () => {
    trackCategorySelected('coding');
    expect(capture).toHaveBeenCalledWith('onboarding_category_selected', { category: 'coding' });
  });

  it('records a skip distinctly from a completion', () => {
    trackStepSkipped('barriers', 8);
    expect(capture).toHaveBeenCalledWith('onboarding_step_skipped', {
      step: 'barriers',
      step_number: 8,
    });
  });

  it('flags whether the catalog could actually serve the chosen track', () => {
    trackFirstLearningAction({ destination: 'course', category: 'ai' });
    expect(capture).toHaveBeenCalledWith(
      'first_learning_action_started',
      expect.objectContaining({ destination: 'course', had_recommendation: true }),
    );

    capture.mockClear();
    trackFirstLearningAction({ destination: 'explore', category: 'ai' });
    expect(capture).toHaveBeenCalledWith(
      'first_learning_action_started',
      expect.objectContaining({ had_recommendation: false }),
    );
  });
});

describe('resilience', () => {
  it('never lets a failing analytics provider break the flow', () => {
    capture.mockImplementationOnce(() => {
      throw new Error('posthog exploded');
    });
    expect(() => trackStepViewed('name', 2)).not.toThrow();
  });
});
