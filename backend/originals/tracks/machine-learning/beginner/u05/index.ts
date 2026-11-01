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
 * Chapter 5 — Predicting numbers. Folake's weekly-bookings question, a line
 * by hand, slope and intercept, errors, MAE, the best line, scikit-learn (and
 * its one-time ~70 MB download), fit and predict, more features,
 * coefficients, baselines, the nurse curve, uncertainty, regression bugs,
 * reading a result, and the weekly forecast. Data: clinic_weeks.csv.
 * Challenge: the Easter forecast. Cliffhanger: Folake asks for the no-show
 * classifier (Chapter 6).
 */
const unit: OriginalUnit = {
  key: 'u05',
  title: 'Predicting numbers',
  marker: 'v0.5',
  story: 'Folake asks an easier question first: how many patients will each clinic get next week?',
  goal: 'Fit a line by hand and with scikit-learn, measure its error honestly, and forecast next week.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
