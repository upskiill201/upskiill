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
 * Chapter 1 — The first hello. Grace's first week at Kinwell. Lessons 1–5
 * are the free stretch (paywall before lesson 6). Outline:
 * docs/originals/small-talk-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'The first hello',
  marker: 'Week 1',
  story: 'First day in tech. A stranger says "Morning!" and Grace asks how his pain is.',
  goal: 'Start a conversation with anyone, and stop dreading it.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
