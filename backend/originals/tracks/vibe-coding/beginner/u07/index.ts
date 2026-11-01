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
 * Chapter 7 — 2 weeks to go. "Locks on the Doors". Benny reads every
 * parent's phone number with the public key, because fix 3 switched the
 * database rules off. Secrets, a leaked key on GitHub, row level security,
 * XSS and page-only checks, prompt injection, look-alike packages,
 * permission rules. Learner build: a full security pass.
 */
const unit: OriginalUnit = {
  key: 'u07',
  title: 'Locks on the Doors',
  marker: '2 weeks to go',
  story: 'Benny opens the app in Chemistry and can read every parent\'s phone number. And delete them.',
  goal: 'Keep secrets out, turn on database rules, distrust pasted text and unknown packages.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
