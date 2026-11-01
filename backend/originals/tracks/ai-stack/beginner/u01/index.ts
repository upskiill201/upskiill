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
 * Chapter 1 — Press Send. The whole AI stack in one chapter: a message's
 * journey, the six layers, myths, which layer breaks, build vs buy, the
 * jobs, a stack in a few lines of Python, why it changes, cost per answer,
 * failure modes, a review checklist, reading a diagram and the plan.
 * Climax: Ask Rao v0.1. Outline: docs/originals/the-ai-stack-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'Press Send',
  marker: 'v0.1',
  story: 'Mr Rao sends one line: "Add AI. Like ChatGPT. For my shop. How much?" Kavya opens a chatbot. Joel opens a notebook.',
  goal: 'Trace a message through every layer of the AI stack.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
