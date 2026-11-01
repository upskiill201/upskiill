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
 * Chapter 2 — 6 weeks to the 100th. "Find Me a Seat". Leo's bet: Walt's
 * memory against the database. Filtering, sorting, patterns, lists, ranges,
 * missing values and calculated columns on the full Starlight database.
 * Outline: docs/originals/sql-databases-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u02',
  title: 'Find Me a Seat',
  marker: '6 weeks to the 100th',
  story: 'The shoebox is typed in. Walt asks a question every five minutes, and Leo bets the database can\'t keep up.',
  goal: 'Ask the Starlight database questions with WHERE, AND/OR, ORDER BY, LIMIT, LIKE, IN, BETWEEN and IS NULL.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
