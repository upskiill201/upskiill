/**
 * Dialogue engine tests.
 *
 * Two jobs here. The first is ordinary correctness — priority ordering, token
 * interpolation, the name budget.
 *
 * The second is the guard suite: structural assertions over the whole copy
 * deck that a future contributor cannot quietly violate. Onboarding copy is
 * the kind of thing that gets edited in a hurry, and "don't make the learner
 * who admitted they struggle feel worse" is too important to leave to whoever
 * is reviewing the diff.
 */

import { DIALOGUE_RULES } from '../dialogue/rules';
import { matchRule, resetDialogueState, resolveDialogue, resolveReaction } from '../dialogue/resolve';
import { interpolate } from '../dialogue/tokens';
import { POSE_FAMILY, type DialogueSlot, type StepId } from '../dialogue/types';
import { CATEGORIES } from '../catalog';
import { STEP_DEFINITIONS } from '../steps';
import type { ExperienceLevel, LearningCategory, OnboardingAnswersV2 } from '../types';
import { SUPPORTIVE_POSES } from '../types';

beforeEach(() => resetDialogueState());

const base: OnboardingAnswersV2 = {
  name: 'Ada',
  category: 'ai',
  interests: ['build-agents'],
  goals: ['build-projects'],
  experienceLevel: 'beginner',
  dailyCommitment: '10',
  preferredTime: 'evening',
};

// ─── Exhaustiveness ──────────────────────────────────────────────────────────

/** Every combination a learner can actually reach. */
function allAnswerCombinations(): OnboardingAnswersV2[] {
  const levels: ExperienceLevel[] = ['beginner', 'tried-a-little', 'basics', 'experienced'];
  const out: OnboardingAnswersV2[] = [];

  for (const category of Object.keys(CATEGORIES) as LearningCategory[]) {
    for (const interest of CATEGORIES[category].interests) {
      for (const level of levels) {
        out.push({ ...base, category, interests: [interest.id], experienceLevel: level });
      }
    }
  }
  return out;
}

describe('exhaustiveness', () => {
  const slotsUsed: [DialogueSlot, StepId][] = DIALOGUE_RULES.map((r) => [r.slot, r.step]);
  const uniquePairs = Array.from(new Set(slotsUsed.map(([s, st]) => `${s}:${st}`))).map(
    (k) => k.split(':') as [DialogueSlot, StepId],
  );

  it.each(uniquePairs)('%s on step "%s" resolves for every answer combination', (slot, step) => {
    for (const answers of allAnswerCombinations()) {
      expect(matchRule(slot, step, answers)).toBeDefined();
    }
  });

  it('resolves every used slot/step pair from a completely empty answer bag', () => {
    // A learner who deep-links to a later step, or resumes on a fresh device
    // before the backend reconciles, has almost nothing in the bag.
    for (const [slot, step] of uniquePairs) {
      expect(matchRule(slot, step, {})).toBeDefined();
    }
  });

  it('gives every step a spoken beat, so no screen is silent', () => {
    for (const step of STEP_DEFINITIONS) {
      // `reveal` counts: the path screen speaks through it.
      const hasBeat = DIALOGUE_RULES.some((r) => r.step === step.id && r.slot !== 'react');
      expect({ step: step.id, hasBeat }).toEqual({ step: step.id, hasBeat: true });
    }
  });

  it('gives every step that records an answer a react beat', () => {
    const answerSteps = STEP_DEFINITIONS.filter((s) => s.answerKey && s.id !== 'account');
    for (const step of answerSteps) {
      const hasReact = DIALOGUE_RULES.some((r) => r.step === step.id && r.slot === 'react');
      expect({ step: step.id, hasReact }).toEqual({ step: step.id, hasReact: true });
    }
  });
});

// ─── The guard suite ─────────────────────────────────────────────────────────

describe('copy deck guards', () => {
  it('has a priority-0 catch-all for every used slot/step pair', () => {
    const pairs = new Set(DIALOGUE_RULES.map((r) => `${r.slot}:${r.step}`));
    for (const pair of pairs) {
      const [slot, step] = pair.split(':');
      const hasCatchAll = DIALOGUE_RULES.some(
        (r) => r.slot === slot && r.step === step && r.priority === 0,
      );
      expect({ pair, hasCatchAll }).toEqual({ pair, hasCatchAll: true });
    }
  });

  it('uses only supportive poses on barrier and prior-attempt beats', () => {
    // Someone telling us they struggle gets warmth, never a smirk.
    const sensitive = DIALOGUE_RULES.filter(
      (r) => r.step === 'barriers' || r.step === 'prior-attempt',
    );
    expect(sensitive.length).toBeGreaterThan(0);
    for (const rule of sensitive) {
      expect({ step: rule.step, line: rule.lines[0], pose: rule.pose }).toEqual({
        step: rule.step,
        line: rule.lines[0],
        pose: expect.stringMatching(new RegExp(`^(${SUPPORTIVE_POSES.join('|')})$`)),
      });
    }
  });

  it('supplies a name-free fallback on every rule that uses {name}', () => {
    for (const rule of DIALOGUE_RULES) {
      const usesName = rule.lines.some((l) => l.includes('{name}'));
      if (!usesName) continue;
      expect({ step: rule.step, slot: rule.slot, hasFallback: Boolean(rule.linesWithoutName?.length) })
        .toEqual({ step: rule.step, slot: rule.slot, hasFallback: true });
    }
  });

  it('never leaves a name token in a fallback line', () => {
    for (const rule of DIALOGUE_RULES) {
      for (const line of rule.linesWithoutName ?? []) {
        expect(line).not.toContain('{name}');
      }
    }
  });

  it('never promises mastery in a guaranteed timeframe', () => {
    for (const rule of DIALOGUE_RULES) {
      for (const line of [...rule.lines, ...(rule.linesWithoutName ?? [])]) {
        expect(line.toLowerCase()).not.toMatch(
          /master .* in \d+|guarantee|you will be (fluent|an expert)|fix(es)? (your|the) (problem|distraction)/,
        );
      }
    }
  });

  it('never calls the learner lazy, incapable, or otherwise judges them', () => {
    for (const rule of DIALOGUE_RULES) {
      for (const line of [...rule.lines, ...(rule.linesWithoutName ?? [])]) {
        expect(line.toLowerCase()).not.toMatch(
          // Aimed at the LEARNER specifically. Teasing the task or the approach
          // is in voice ("the good kind of lazy"); calling the person lazy is not.
          /you(?:'re| are)? (?:just )?(?:lazy|hopeless|pathetic|not good enough)|you failed|you can't handle|no excuses|stop making excuses/,
        );
      }
    }
  });

  it('only references tokens the interpolator knows about', () => {
    const known = /\{(name|interest|goal|commitment|time|category)\}/g;
    for (const rule of DIALOGUE_RULES) {
      for (const line of [...rule.lines, ...(rule.linesWithoutName ?? [])]) {
        expect(line.replace(known, '')).not.toMatch(/\{[a-zA-Z]+\}/);
      }
    }
  });

  it('maps every declared pose to a sound family, so audio can never be unwired', () => {
    for (const rule of DIALOGUE_RULES) {
      expect(POSE_FAMILY[rule.pose]).toBeDefined();
    }
  });
});

// ─── Resolution behavior ─────────────────────────────────────────────────────

describe('rule selection', () => {
  it('prefers the more specific rule', () => {
    const generic = matchRule('ack', 'commitment', {});
    const specific = matchRule('ack', 'commitment', { barriers: ['no-time'] });
    expect(specific!.priority).toBeGreaterThan(generic!.priority);
    expect(specific!.lines[0]).toContain("time's tight");
  });

  it('reacts differently to Coding and AI', () => {
    const coding = matchRule('react', 'category', { category: 'coding' })!;
    const ai = matchRule('react', 'category', { category: 'ai' })!;
    expect(coding.lines).not.toEqual(ai.lines);
    expect(ai.lines.join(' ')).toMatch(/AI/);
  });

  it('gives each of the eight interests its own reaction', () => {
    const ids = [
      ...CATEGORIES.coding.interests.map((i) => i.id),
      ...CATEGORIES.ai.interests.map((i) => i.id),
    ];
    const unique = Array.from(new Set(ids));
    const lines = unique.map((id) => {
      const category: LearningCategory = CATEGORIES.ai.interests.some((i) => i.id === id)
        ? 'ai'
        : 'coding';
      return matchRule('react', 'interests', { category, interests: [id] })!.lines[0];
    });
    expect(new Set(lines).size).toBe(unique.length);
  });

  it('welcomes a beginner and acknowledges an experienced learner differently', () => {
    const beginner = matchRule('react', 'experience', { experienceLevel: 'beginner' })!;
    const experienced = matchRule('react', 'experience', { experienceLevel: 'experienced' })!;
    expect(beginner.lines[0]).not.toBe(experienced.lines[0]);
    expect(SUPPORTIVE_POSES).toContain(beginner.pose);
  });

  it('escalates the reminders ask when consistency is the stated barrier', () => {
    const plain = matchRule('ack', 'reminders', {})!;
    const consistency = matchRule('ack', 'reminders', {
      barriers: ['consistency'],
      preferredTime: 'evening',
    })!;
    expect(consistency.priority).toBeGreaterThan(plain.priority);
    expect(consistency.lines[0]).toContain('consistency');
  });
});

describe('token interpolation', () => {
  it('resolves ids to catalog labels, never raw ids', () => {
    const text = interpolate('{interest} in the {time}', base);
    expect(text).toBe('Build AI Agents in the evening');
    expect(text).not.toContain('build-agents');
  });

  it('collapses an unresolvable token instead of rendering braces', () => {
    const text = interpolate('Alright {name} — what next?', {});
    expect(text).not.toMatch(/\{|\}/);
    expect(text).toBe('Alright — what next?');
  });

  it('renders the commitment in minutes', () => {
    expect(interpolate('{commitment} a day', base)).toBe('10 minutes a day');
  });
});

describe('name budget', () => {
  it('does not use the name in consecutive beats', () => {
    const answers = { ...base, name: 'Ada' };
    const beats = [
      resolveDialogue('prompt', 'category', answers),
      resolveDialogue('ack', 'goals', answers),
      resolveDialogue('prompt', 'interests', answers),
    ];
    const withName = beats.filter((b) => b?.text.includes('Ada'));
    expect(withName.length).toBeLessThanOrEqual(1);
  });

  it('falls back to a name-free line when no name has been given', () => {
    const beat = resolveDialogue('prompt', 'category', { category: 'ai' });
    expect(beat!.text).not.toContain('undefined');
    expect(beat!.text).not.toContain('{name}');
  });
});

describe('reactions', () => {
  it('reflects the value just tapped, not the committed state', () => {
    // The tap has not been written to the answers bag yet.
    const beat = resolveReaction('category', {}, { category: 'coding' });
    expect(beat!.text.toLowerCase()).toMatch(/developer|coding/);
  });

  it('carries a pose family so the sound is chosen from the beat, not by hand', () => {
    const beat = resolveReaction('category', {}, { category: 'ai' });
    expect(beat!.poseFamily).toBe(POSE_FAMILY[beat!.pose]);
  });

  it('returns null rather than throwing for a step with no beats of that slot', () => {
    expect(resolveDialogue('react', 'path-reveal', base)).toBeNull();
  });
});
