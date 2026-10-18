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
 * Chapter 2 — The Python you need. Python basics (variables, lists, if,
 * loops), pandas: read_csv, first look, picking, filtering, value_counts,
 * groupby, blanks, duplicates, spellings, new columns, rates vs counts,
 * sanity checks, common bugs. Climax: v0.2, the clean table (2,412 -> 2,389).
 * Outline: docs/originals/machine-learning-for-beginners-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u02',
  title: 'The Python you need',
  marker: 'v0.2',
  story: 'Emmanuel sends the booking export: 2,412 rows, and some of it is "a bit creative".',
  goal: 'Load, explore and clean a dataset with pandas.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
