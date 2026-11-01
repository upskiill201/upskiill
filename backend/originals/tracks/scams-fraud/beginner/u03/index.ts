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
 * Chapter 3 — Phishing and impersonation. The fraud-team call and one-time
 * codes, the safe-account scam, phishing/smishing/vishing, account keys and
 * remote access, fake vs real bank texts, invoice fraud at Kinwell, online
 * safety myths, and the scam file v3. Challenge: courier fraud on Nan.
 * Cliffhanger: Jayden's "easy £500".
 */
const unit: OriginalUnit = {
  key: 'u03',
  title: 'Phishing and impersonation',
  marker: 'Who\'s really calling?',
  story: 'Grace\'s phone rings, and the screen shows her bank\'s real number. "This is the fraud team. We need to secure your money right now."',
  goal: 'Handle calls, texts and emails that pretend to be your bank, the police or a supplier: protect your codes, and always verify through your own channel.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
