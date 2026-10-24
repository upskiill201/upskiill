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
 * Chapter 1 of Level 2, the DOM. querySelector, textContent, classList, attributes and styles, querySelectorAll, updating rows from data, null bugs.
 * Outline: docs/originals/javascript-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'The Board in the Lodge',
  marker: 'Jan 4',
  story: 'The lodge has a TV and a web page. Mags wants it to show today\'s trails, not July\'s.',
  goal: 'Find elements on a page and change their text, classes and attributes.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
