/**
 * A lesson written by the course importer (backend course-import/rich-lesson
 * buildRichLesson, dumped into fixtures/imported-rich-lesson.json) must play
 * in full: the player's sanitizer drops anything malformed without a word,
 * so this pins that nothing the importer writes is silently lost.
 */

import imported from './fixtures/imported-rich-lesson.json';
import { readLessonContent } from '../content';
import { learnCards } from '../learnCards';
import { gradeExercise, validateExercise, type Exercise } from '../blocks';

const lesson = { id: 'l1', title: 'Composition', description: imported.description, contentBlocks: imported.contentBlocks };

describe('an imported rich lesson', () => {
  const content = readLessonContent(lesson);

  it('keeps every Learn card the importer wrote, plus the intro', () => {
    const written = (imported.contentBlocks.learn[0] as { value: unknown[] }).value.length;
    expect(content.learn.cards).toHaveLength(written);
    const deck = learnCards(content.learn);
    expect(deck[0].kind).toBe('intro');
    expect(deck.map((c) => c.kind)).toEqual(expect.arrayContaining(['video', 'text', 'callout', 'check']));
  });

  it('keeps every exercise, and each one is valid and answerable', () => {
    expect(content.apply.exercises).toHaveLength(imported.stats.exercises);
    for (const ex of content.apply.exercises as Exercise[]) expect(validateExercise(ex)).toBeNull();
  });

  it('grades the right answers as right', () => {
    for (const ex of content.apply.exercises as Exercise[]) {
      const right =
        ex.kind === 'mcq'
          ? { kind: 'mcq' as const, optionId: ex.correctOptionId }
          : ex.kind === 'fillBlank'
            ? { kind: 'fillBlank' as const, filled: ex.blanks.map((b) => b.answers[0]) }
            : ex.kind === 'findBug'
              ? { kind: 'findBug' as const, line: ex.bugLine }
              : ex.kind === 'orderLines'
                ? { kind: 'orderLines' as const, order: ex.lines.map((_, i) => i) }
                : { kind: 'matchPairs' as const, matches: Object.fromEntries(ex.pairs.map((p) => [p.id, p.id])) };
      expect(gradeExercise(ex, right)).toBe(true);
    }
  });

  it('carries the reflection starters and the deepen step through', () => {
    expect(content.reflect.prompt).toContain('last edit');
    expect(content.reflect.starters.length).toBeGreaterThan(0);
    expect(content.deepen.title).toBe('Leading lines');
  });
});
