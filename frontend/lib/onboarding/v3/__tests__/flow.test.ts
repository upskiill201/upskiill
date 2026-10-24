import { flowFor, losesProgress, nextOf, prevOf, progressFor } from '../flow';
import { topicOf } from '../lines';

describe('onboarding v3 flow', () => {
  it('starts like Duolingo: "I want to learn…" is the first question', () => {
    const ids = flowFor('start').map((s) => s.id);
    expect(ids.slice(0, 5)).toEqual(['splash', 'welcome', 'intro', 'learn', 'name']);
  });

  it('asks "new or know some?" before the lesson, then branches', () => {
    expect(nextOf('path', 'start')).toBe('lesson-intro');
    expect(nextOf('path', 'placement')).toBe('placement-intro');
    expect(nextOf('taste-done', 'start')).toBe('chest');
    expect(nextOf('placement', 'placement')).toBe('chest');
    expect(prevOf('chest', 'placement')).toBe('placement');
  });

  it('never walks a step from the other path', () => {
    expect(flowFor('start').some((s) => s.branch === 'placement')).toBe(false);
    expect(flowFor('placement').some((s) => s.branch === 'start')).toBe(false);
  });

  it('moves the bar forward on every step, from a head start', () => {
    const flow = flowFor('start');
    const values = flow.map((s) => progressFor(s.id, 'start'));
    expect(values[0]).toBeGreaterThan(0);
    values.slice(1).forEach((v, i) => expect(v).toBeGreaterThan(values[i]));
    expect(values[values.length - 1]).toBe(1);
  });

  it('warns about leaving only once there is something real to lose', () => {
    expect(losesProgress('commit')).toBe(false);
    expect(losesProgress('lesson-intro')).toBe(false);
    expect(losesProgress('taste-done')).toBe(true);
    expect(losesProgress('chest')).toBe(true);
    expect(losesProgress('save')).toBe(true);
    expect(losesProgress('plan')).toBe(false);
  });
});

describe('topicOf', () => {
  it('names what they are learning the way a person would', () => {
    expect(topicOf('Python for Beginners')).toBe('Python');
    expect(topicOf('Machine Learning for Beginners')).toBe('Machine Learning');
    expect(topicOf('AI at Work: Beginner')).toBe('AI at Work');
    expect(topicOf(undefined)).toBeUndefined();
  });
});
