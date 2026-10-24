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
 * Chapter 2, decisions. Comparisons and booleans, if / else if / else, && || !, strict equality, the ternary, truthy and falsy.
 * Outline: docs/originals/javascript-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u02',
  title: 'Locals Tuesday',
  marker: 'Dec 8 · Locals Tuesday',
  story: 'Locals Tuesday: $20 for everyone, unless they\'re under 6. Or over 70. The ticket window needs rules.',
  goal: 'Make programs decide with comparisons, if, else, && and ||.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
