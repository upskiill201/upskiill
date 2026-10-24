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
 * Chapter 6 — 3 weeks to go. "The Fix Loop". Login links don't arrive;
 * five guessed fixes later, sign-ups double and a database safety rule has
 * been switched off (fix 3, paid off in Chapter 7). Real errors, the
 * Console, reproduce first, fresh sessions, why-first, taking over, tests
 * for bugs. Learner build: one bug fixed properly, with a test.
 */
const unit: OriginalUnit = {
  key: 'u06',
  title: 'The Fix Loop',
  marker: '3 weeks to go',
  story: 'Login links never arrive. Five fixes later, sign-ups double, and it\'s 1 a.m.',
  goal: 'Debug with the AI: real errors, reproduce, stop fix loops, take over.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
