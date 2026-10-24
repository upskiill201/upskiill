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
 * Chapter 2 — Chips, GPUs and clouds. Why AI needs special chips, CPU vs GPU,
 * memory = parameters x bytes, the chip supply chain, training vs inference,
 * renting cloud GPUs, local runtimes and shrinking models, AI on phones,
 * tokens-per-second maths, energy and cost, and the hosting decision.
 * Climax: Ask Rao v0.2. Outline: docs/originals/the-ai-stack-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u02',
  title: 'Chips, GPUs and clouds',
  marker: 'v0.2',
  story: 'Kavya runs a free open model on the office laptop. The fan screams, and the first reply takes forty seconds.',
  goal: 'Explain why AI needs GPUs, and estimate memory, speed and hosting cost.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
