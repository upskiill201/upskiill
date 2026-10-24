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
 * Chapter 8 — Showcase week. "Showcase Week". The localhost link reaches
 * nobody. Building and hosting, deploying to Vercel, live settings (Site
 * URL, email sender), costs and limits (no prices: those live only in 1.3),
 * context and fresh sessions, how the skills transfer to other tools, what
 * to build next. Finale: the fundraiser dinner. Learner build: their app live.
 */
const unit: OriginalUnit = {
  key: 'u08',
  title: 'Showcase Week',
  marker: 'Showcase week',
  story: 'Ten days to the bus. Hazel texts the app link to every parent. It starts with "localhost".',
  goal: 'Put the app live, watch costs and limits, and keep building with any tool.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
