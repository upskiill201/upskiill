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
 * Chapter 3 of Level 2, building pages. createElement and append, lists from arrays, innerHTML and when not to, remove and clear, render(), delegation, sort and filter then draw, duplicate bugs.
 * Outline: docs/originals/javascript-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u03',
  title: 'Building the Page',
  marker: 'Jan 11',
  story: 'The rental shop\'s gear list changes every hour. Typing it into HTML by hand isn\'t working.',
  goal: 'Build and rebuild page content from data.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
