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
 * Chapter 4 — Test before you build. "I need an app", what an MVP is and
 * isn't, four cheap tests, setting the pass mark first, sign-ups vs payments,
 * doing it by hand with Mama Rose, reading results honestly, and evidence
 * board v4. Challenge: the second weekend, pass or fail.
 */
const unit: OriginalUnit = {
  key: 'u04',
  title: 'Test before you build',
  marker: '12 paid pre-orders',
  story: 'Clinton wants a developer. Miracle says do it by hand first: a WhatsApp post, Mama Rose and a borrowed bicycle.',
  goal: 'Run a cheap test that measures what people do, with the pass mark set before you start.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
