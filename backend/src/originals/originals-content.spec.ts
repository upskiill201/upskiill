import { phaseStateFromBlocks } from '../lesson/lesson-blocks.util';
import type { AuthoredExercise, OriginalLesson, OriginalTrackDef } from './originals-authoring.types';
import { buildContentBlocks, buildExercise, keys, lessonXp, stableId } from './originals-content';
import { lintTrack, mainFormat } from './originals-lint';

const mcq = (prompt: string): AuthoredExercise => ({
  kind: 'mcq',
  prompt,
  options: [{ text: 'Right' }, { text: 'Wrong', why: 'Because.' }],
  answer: 0,
});

const lesson = (key: string, over: Partial<OriginalLesson> = {}): OriginalLesson => ({
  key,
  title: `Lesson ${key}`,
  summary: 'A lesson.',
  minutes: 12,
  outcomes: ['Do one thing', 'Do another'],
  learn: [{ kind: 'text', html: '<p>An idea.</p>' }],
  apply: { items: [mcq('Q1')] },
  reflect: { prompt: 'Where will you use this?' },
  ...over,
});

const trackOf = (lessons: OriginalLesson[]): OriginalTrackDef => ({
  slug: 't',
  title: 'T',
  category: 'AI',
  description: 'd',
  levels: [
    {
      level: 1,
      slug: 't-beginner',
      title: 'T',
      shortDescription: 's',
      description: 'd',
      startingPoint: 's',
      endOutcome: 'e',
      outcomes: [],
      skills: [],
      upcomingUnits: 12,
      units: [{ key: 'u01', title: 'U', goal: 'g', lessons }],
    },
  ],
});

const errors = (t: OriginalTrackDef) => lintTrack(t).filter((i) => i.level === 'error').map((i) => i.message);

describe('originals-content', () => {
  it('derives the same UUID-shaped id from the same key, every time', () => {
    const a = stableId('lesson:ai:1:u01:l01');
    expect(a).toBe(stableId('lesson:ai:1:u01:l01'));
    expect(a).not.toBe(stableId('lesson:ai:1:u01:l02'));
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('builds blocks that pass the server publish checks', () => {
    const t = trackOf([lesson('l01')]);
    const l = t.levels[0];
    const blocks = buildContentBlocks(l.units[0].lessons[0], keys.lesson(t, l, l.units[0], l.units[0].lessons[0]));
    const state = phaseStateFromBlocks(blocks);
    expect(state.learn?.errors).toEqual([]);
    expect(state.apply?.errors).toEqual([]);
  });

  it('turns answer indexes into option ids, and chat replies into the mcq chat variant', () => {
    const built = buildExercise(
      { kind: 'chatReply', from: 'lucia', message: 'Status?', prompt: 'Reply', options: [{ text: 'A' }, { text: 'B' }], answer: 1 },
      'k',
      0,
    ) as any;
    expect(built.kind).toBe('mcq');
    expect(built.variant).toBe('chat');
    expect(built.character).toBe('lucia');
    expect(built.correctOptionId).toBe(built.options[1].id);
  });

  it('points sorted items at their group ids', () => {
    const built = buildExercise(
      { kind: 'sortGroups', prompt: 'Sort', groups: ['A', 'B'], items: [{ text: 'x', group: 1 }, { text: 'y', group: 0 }, { text: 'z', group: 1 }] },
      'k',
      0,
    ) as any;
    expect(built.items[0].groupId).toBe(built.groups[1].id);
    expect(built.items[1].groupId).toBe(built.groups[0].id);
  });

  it('pays 20 XP for a milestone and 10 otherwise, unless written', () => {
    expect(lessonXp(lesson('a'))).toBe(10);
    expect(lessonXp(lesson('a', { milestone: 'CHECKPOINT' }))).toBe(20);
    expect(lessonXp(lesson('a', { xp: 15 }))).toBe(15);
  });
});

describe('originals-lint', () => {
  it('requires every 5th lesson to be a Checkpoint, and no others', () => {
    const five = [1, 2, 3, 4, 5].map((n) => lesson(`l0${n}`));
    expect(errors(trackOf(five))).toContain('Lesson 5 must be a Checkpoint (every 5th lesson is).');

    const early = [lesson('l01', { milestone: 'CHECKPOINT' })];
    expect(errors(trackOf(early))).toContain("Only every 5th lesson is a Checkpoint; lesson 1 isn't.");
  });

  it('makes the last checkpoint of a full unit its Unit Challenge', () => {
    const lessons = Array.from({ length: 20 }, (_, i) =>
      lesson(`l${i + 1}`, (i + 1) % 5 === 0 ? { milestone: 'CHECKPOINT' } : {}),
    );
    expect(errors(trackOf(lessons))).toContain("A unit's last Checkpoint is its Unit Challenge.");
    lessons[19] = { ...lessons[19], milestone: 'UNIT_CHALLENGE' };
    expect(errors(trackOf(lessons))).not.toContain("A unit's last Checkpoint is its Unit Challenge.");
  });

  it('refuses emoji and "gems"', () => {
    const t = trackOf([lesson('l01', { summary: 'Win 5 gems' }), lesson('l02', { title: 'Great \u{1F389}' })]);
    expect(errors(t)).toEqual(
      expect.arrayContaining(['Says "gems". The currency is always "Coins".', expect.stringContaining('emoji')]),
    );
  });

  it('catches an answer index with no option', () => {
    const bad = lesson('l01', { apply: { items: [{ ...mcq('Q'), answer: 5 } as AuthoredExercise] } });
    expect(errors(trackOf([bad]))).toContain('"Q": answer index 5 has no option.');
  });

  it('warns, without blocking, when playbook targets are missed', () => {
    const issues = lintTrack(trackOf([lesson('l01', { minutes: 4 })]));
    expect(issues.some((i) => i.level === 'warning' && /10–15/.test(i.message))).toBe(true);
    expect(issues.filter((i) => i.level === 'error')).toEqual([]);
  });

  it('reads a lesson\'s main format from its first teaching card', () => {
    expect(mainFormat(lesson('a'))).toBe('cards');
    expect(mainFormat(lesson('a', { learn: [{ kind: 'callout', tone: 'tip', text: 't' }, { kind: 'myth', statements: [] }] }))).toBe('myth');
  });
});
