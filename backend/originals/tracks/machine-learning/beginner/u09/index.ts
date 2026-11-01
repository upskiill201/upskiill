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
 * Chapter 9 — Too good to be true. Overfitting (Chidi's unlimited tree),
 * underfitting, training vs validation, the sweet spot, cross-validation
 * (leave-one-week-out), cross_val_score with the minutes measure, tuning,
 * GridSearchCV, more data vs better models, simplicity, honest tuning,
 * learning curves, Chidi's test-week shortcut, tuning mistakes and reading
 * cv_results_. Challenge: the eleven-week league table. v0.9 = v0.8 with
 * C = 0.1. Cliffhanger: many trees voting (Chapter 10).
 */
const unit: OriginalUnit = {
  key: 'u09',
  title: 'Too good to be true',
  marker: 'v0.9',
  story: 'Chidi\'s tree is nearly perfect on old weeks and worse than nothing on new ones. Miracle wants eleven weeks of proof.',
  goal: 'Spot overfitting, use cross-validation and tune settings honestly.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
