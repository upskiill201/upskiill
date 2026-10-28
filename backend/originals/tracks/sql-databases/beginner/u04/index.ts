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
 * Chapter 4 — 4 weeks to the 100th. "Prove It to the Bank". Aggregates,
 * GROUP BY with joins, HAVING (which finds seat G7 sold twice), COUNT forms
 * and CASE, ending in the honest report for Ms Delgado.
 * Outline: docs/originals/sql-databases-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u04',
  title: 'Prove It to the Bank',
  marker: '4 weeks to the 100th',
  story: 'Dana calls the Starlight a hobby. The bank wants totals, and Walt wants to know what his free tickets cost.',
  goal: 'Summarise data with COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
