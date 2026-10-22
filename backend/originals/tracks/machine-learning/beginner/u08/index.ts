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
 * Chapter 8 — Better ingredients. Features matter, categories to numbers,
 * one-hot encoding, scaling, missing values, new and time features, the rain
 * feature, pipelines, fitting on training rows only, too many features,
 * features to leave out, floor knowledge tested against a rule agreed first,
 * feature bugs and reading a pipeline. Data: appointments.csv and
 * appointments_raw.csv. Challenge: v0.8 on the raw export. v0.8 ties v0.7 on
 * week 12 (reported honestly). Cliffhanger: Chidi's near-perfect tree, and
 * "better or lucky?" (Chapter 9).
 */
const unit: OriginalUnit = {
  key: 'u08',
  title: 'Better ingredients',
  marker: 'v0.8',
  story: 'Bisi says the model ignores half the spreadsheet. Halima turns floor knowledge into features, and lets the data decide which ones stay.',
  goal: 'Engineer features: encode categories, scale numbers, fill gaps, and build a pipeline that\'s safe on messy data.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
