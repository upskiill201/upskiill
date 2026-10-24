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
 * Chapter 10 — Many trees. Wobbly trees, bootstrap draws, random forests,
 * how many trees, feature importance, importance vs cause, boosting, forest
 * vs tree, size and speed, tuning a forest, when a simple model wins, and
 * choosing for the clinic. Forests and boosting lose to v0.9 over 11 weeks
 * (reported honestly); v0.95 keeps v0.9 and adds a drivers chart.
 * Cliffhanger: 300 clinics, no labels (Chapter 11).
 */
const unit: OriginalUnit = {
  key: 'u10',
  title: 'Many trees',
  marker: 'v0.95',
  story: 'Chidi\'s idea: if one tree wobbles, let a hundred vote. The forest beats every tree, but can it beat v0.9?',
  goal: 'Use random forests and feature importance, and judge them against a simple model honestly.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
