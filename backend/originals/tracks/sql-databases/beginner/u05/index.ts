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
 * Chapter 5 — The 100th birthday. "Opening Night". UPDATE and DELETE done
 * safely, UNIQUE / CHECK / REFERENCES, transactions, indexes, views and how
 * the Starlight Tickets app sends SQL with ? parameters; the finale is the
 * sold-out birthday weekend. Outline: docs/originals/sql-databases-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u05',
  title: 'Opening Night',
  marker: 'The 100th birthday',
  story: 'Tickets go on sale. The database must take bookings, refuse mistakes and stay fast, live, in front of a full lobby.',
  goal: 'Change data safely and protect it with constraints, keys, transactions and indexes, then use it from an app.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
