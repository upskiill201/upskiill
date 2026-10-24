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
import l11 from './l11';
import l12 from './l12';
import l13 from './l13';
import l14 from './l14';
import l15 from './l15';
import l16 from './l16';
import l17 from './l17';
import l18 from './l18';
import l19 from './l19';
import l20 from './l20';

/**
 * Chapter 7 — Is it actually good? The accuracy trap, baselines
 * (DummyClassifier), the four outcomes, confusion matrices, precision,
 * recall, the trade-off, thresholds chosen on validation, costs (minutes
 * lost), F1, per-clinic scores, choosing metrics first, the board slide,
 * metric mistakes and reading other people's claims. Data: appointments.csv.
 * Challenge: v0.7's honest scorecard. Cliffhanger: the text columns the
 * model can't read (Chapter 8).
 */
const unit: OriginalUnit = {
  key: 'u07',
  title: 'Is it actually good?',
  marker: 'v0.7',
  story: 'Folake: "It\'s 82% accurate, ship it!" But "everyone comes" scores 81.5%. Halima finds the numbers that actually matter.',
  goal: 'Measure a classifier honestly with baselines, confusion matrices, precision, recall and costs, and choose its threshold.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
