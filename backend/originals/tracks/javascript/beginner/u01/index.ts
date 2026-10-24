import type { OriginalUnit } from '../../../../../src/originals/originals-authoring.types';
import l01 from './l01';
import l02 from './l02';
import l03 from './l03';
import l04 from './l04';
import l05 from './l05';
import l06 from './l06';
import l07 from './l07';
import l08 from './l08';
import l09 from './l09';
import l10 from './l10';

/**
 * Chapter 1, opening day. Nora meets the console: console.log, strings, numbers, let and const, template literals, types and error messages. Lessons 1–5 are the free stretch.
 * Outline: docs/originals/javascript-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'The Phone Won\'t Stop',
  marker: 'Opening day, Dec 4',
  story: 'Opening day, and the phone rings forty times an hour. The website Nora built can\'t answer a thing.',
  goal: 'Print text and numbers with console.log, do maths, and store values in variables.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
