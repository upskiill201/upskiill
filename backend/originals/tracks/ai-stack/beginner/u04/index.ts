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
 * Chapter 4 — Choosing a model. Closed and open-weight models, licences, price
 * per million tokens, input vs output, speed and latency, benchmarks read
 * honestly, testing on your own questions (all three practice models score
 * 20/30), small models, routing, fine-tuning vs prompts vs RAG, privacy, the
 * surprise bill, pricing pages and the model decision. Climax: Ask Rao v0.4.
 */
const unit: OriginalUnit = {
  key: 'u04',
  title: 'Choosing a model',
  marker: 'v0.4',
  story: 'Kavya picks the biggest model. Arjun asks for the bill: $54 a month. Joel tests three models on the shop\'s own questions.',
  goal: 'Compare closed and open-weight models on quality, cost, speed and licence.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
