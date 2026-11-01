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
 * Chapter 1 — 7 weeks to the 100th. "The Shoebox". Seat G7 is sold twice;
 * Juno reads Walt's cards with SELECT, then designs and builds the Starlight's
 * first tables with CREATE TABLE and INSERT. Lessons 1–5 are the free
 * stretch. Outline: docs/originals/sql-databases-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'The Shoebox',
  marker: '7 weeks to the 100th',
  story: 'Seat G7 is sold twice on a sold-out night. Walt\'s records are a shoebox, and the bank wants proof.',
  goal: 'Read a table with SELECT, then design tables and create and fill them with CREATE TABLE and INSERT.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
