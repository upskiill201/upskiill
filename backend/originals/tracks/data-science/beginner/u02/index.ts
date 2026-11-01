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
 * Chapter 2 — 4 weeks to Kamau. "Messy data." Felix's raw export
 * (deliveries.csv, 408 rows): info and isna, duplicates, blanks, city
 * spellings, " km" text, the 99-day typo and a reproducible cleaning script.
 * Outline: docs/originals/data-science-for-beginners-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u02',
  title: 'Messy data',
  marker: '4 weeks to Kamau',
  story: 'Felix sends the real export: 408 rows for 400 deliveries, 29 spellings of 10 cities, and one delivery that took 99 days.',
  goal: 'Clean a messy dataset in code, keep the raw data untouched and log every change.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
