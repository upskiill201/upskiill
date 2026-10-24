import type { OriginalUnit } from '../../../../../src/originals/originals-authoring.types';
import l01 from './l01';

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
  lessons: [l01],
};

export default unit;
