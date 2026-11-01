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
 * Chapter 3 — 3 weeks to Kamau. "What's normal?" Mean vs median, mode,
 * spread and quartiles, Tukey's fences, rates from True/False, groupby,
 * counts vs rates and small groups. Ends on Saturday: 87% late.
 * Outline: docs/originals/data-science-for-beginners-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u03',
  title: "What's normal?",
  marker: '3 weeks to Kamau',
  story: 'Emeka\'s average is wrong, Baraka is 60% late, and HR is one email away. Then Saturday turns up: 87% late.',
  goal: 'Summarise data honestly with medians, spread, rates and groupby, and never trust a rate without its count.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
