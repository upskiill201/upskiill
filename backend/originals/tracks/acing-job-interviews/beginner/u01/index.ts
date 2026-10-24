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
 * Chapter 1 — Tell me about yourself. Four minutes, how interviews work, what
 * interviewers look for, present-past-future, rambling vs shaped, myths,
 * structured interviews, interview card v1. Challenge: the rejection email.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'Tell me about yourself',
  marker: 'Interview card v1',
  story: 'Remi\'s first interview, a bank phone screen. "Tell me about yourself." Four minutes later he\'s still on his first computer.',
  goal: 'Understand how interviews work and what they check, and answer "tell me about yourself" in about a minute.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
