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
 * Chapter 3 — Just one more thing. The 14 features, yes-if, the positive no,
 * trade-offs, scope creep, request myths, change requests, deal sheet v3.
 * Challenge: the Friday-night request.
 */
const unit: OriginalUnit = {
  key: 'u03',
  title: 'Just one more thing',
  marker: 'Deal sheet v3',
  story: 'Harlow & Finch likes the core app. Then come "a few small additions": fourteen of them, same price, same date, plus 120-day payment terms.',
  goal: 'Answer unreasonable requests with yes-if or a positive no, use trade-offs, stop scope creep and run a simple change process.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
