import type { OriginalUnit } from '../../../../../src/originals/originals-authoring.types';
import l01 from './l01';
import l02 from './l02';
import l03 from './l03';
import l04 from './l04';
import l05 from './l05';
import l06 from './l06';
import l07 from './l07';

/**
 * Chapter 4 of Level 2, forms. value, submit and preventDefault, Number() and NaN, validation rules, error messages, built-in validation, selects/radios/checkboxes, success and reset.
 * Outline: docs/originals/javascript-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u04',
  title: 'Ski School Sign-Up',
  marker: 'Jan 14 · MLK week',
  story: 'Ski school sign-ups arrive on napkins. Nora builds a form, and Wes tries to break it.',
  goal: 'Read form input, stop page reloads, and validate input with clear messages.',
  lessons: [l01, l02, l03, l04, l05, l06, l07],
};

export default unit;
