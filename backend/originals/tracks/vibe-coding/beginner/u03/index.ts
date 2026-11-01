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
 * Chapter 3 — 6 weeks to go. "It Looks Right". The car-wash thermometer
 * says $1,200,600 (amounts glued as text). Reading diffs, asking it to
 * explain, ticking the brief, manual checklists, edge cases, tests.html,
 * and the weakened test. Learner build: a checklist and passing tests.
 */
const unit: OriginalUnit = {
  key: 'u03',
  title: 'It Looks Right',
  marker: '6 weeks to go',
  story: 'The thermometer cheers "WE\'RE GOING TO D.C.!" at the car wash. The cash box says $1,800.',
  goal: 'Read what the AI changed, check it against the brief, and make tests the judge.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
