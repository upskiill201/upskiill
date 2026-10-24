import type { OriginalUnit } from '../../../../../src/originals/originals-authoring.types';
import l01 from './l01';
import l02 from './l02';
import l03 from './l03';
import l04 from './l04';

/**
 * Chapter 1 — Sol 1. "The Board Goes Dark". Sol 1. HABCON dies; Ines writes her first C on the backup board: main, printf, \n, comments, #include, %d, and reading compiler errors.
 * Outline: docs/originals/c-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'The Board Goes Dark',
  marker: 'Sol 1',
  story: 'A power surge kills HABCON. The backup board shows a blinking cursor, and it only runs C.',
  goal: 'Write, compile and run a C program that prints a report, and fix the errors the compiler finds.',
  lessons: [l01, l02, l03, l04],
};

export default unit;
