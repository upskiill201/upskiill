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
 * Chapter 1 — Busy and broke. The 500-franc problem, what a price has to cover,
 * the cost of one bag (1,125 FCFA), margin vs markup, your time as a cost,
 * pricing myths, break-even, and price card v1. Challenge: the rainy-day hill
 * pickup that loses 825 FCFA. Outline: docs/originals/price-a-product-or-service-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'Busy and broke',
  marker: '1,500, guessed',
  story: 'WashDay is busy, but Clinton guessed his price. David adds up every cost of one bag, and some orders lose money.',
  goal: 'Work out the full cost of one sale, your margin, your hourly pay and your break-even.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
