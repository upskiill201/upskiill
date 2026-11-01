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
 * Chapter 3 — 5 weeks to the 100th. "Who Came to What?". Foreign keys,
 * JOIN … ON, aliases, three-table joins, LEFT JOIN and finding rows with no
 * match, ending in Walt's 100th-birthday invitation list.
 * Outline: docs/originals/sql-databases-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u03',
  title: 'Who Came to What?',
  marker: '5 weeks to the 100th',
  story: 'Ms Delgado asks who the regulars are and what they come to see. The answer is spread across three tables.',
  goal: 'Combine tables with JOIN and LEFT JOIN to answer questions that cross them.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
