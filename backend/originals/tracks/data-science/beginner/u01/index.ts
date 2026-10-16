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
 * Chapter 1 — 5 weeks to Kamau. "What's the question?" First Python (print,
 * numbers, variables, lists), loading a CSV with pandas, rows and columns,
 * value_counts, a good data question and column types. Lessons 1–5 are the
 * free stretch. Outline: docs/originals/data-science-for-beginners-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: "What's the question?",
  marker: '5 weeks to Kamau',
  story: 'Kamau says 1 in 3 deliveries is late and wants to know why. Zanele has never written code. Emeka says it\'s one driver.',
  goal: 'Write your first Python, load a dataset with pandas and turn a vague worry into a clear question.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
