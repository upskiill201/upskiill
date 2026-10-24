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
 * Chapter 3 — Inside a model. Next-token prediction, tokens and counting them,
 * training in one picture, parameters, context windows and forgetting, temperature,
 * system prompts and roles, why models make things up, languages and token cost,
 * multimodal models, model cards, and what the model can know about the shop.
 * Climax: Ask Rao v0.3. Outline: docs/originals/the-ai-stack-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u03',
  title: 'Inside a model',
  marker: 'v0.3',
  story: 'Joel asks the question nobody on the team can answer: "But what IS a model?"',
  goal: 'Explain tokens, next-token prediction, context windows and temperature.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
