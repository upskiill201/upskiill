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
 * Chapter 6 — Predicting yes or no. Back to the no-show question with
 * scikit-learn: logistic regression, predict_proba, coefficients, the call
 * list, thresholds, decision trees, reading a tree, choosing depth on
 * validation, comparing models fairly under a rule agreed first,
 * explainability, three classes, classifier bugs and honest reporting.
 * Data: appointments.csv (and clinic_weeks.csv for the bands).
 * Challenge: Bisi's Monday call list. Cliffhanger: "everyone comes" scores
 * 81.5%, so accuracy is a trap (Chapter 7).
 */
const unit: OriginalUnit = {
  key: 'u06',
  title: 'Predicting yes or no',
  marker: 'v0.6',
  story: 'Folake asks for the no-show predictor, built with scikit-learn. Chidi wants the deepest tree; Miracle wants the rule written first.',
  goal: 'Train, compare and explain classifiers with scikit-learn, and turn their chances into a call list.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
