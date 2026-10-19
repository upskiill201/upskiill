import type { OriginalUnit } from '../../../../../src/originals/originals-authoring.types';
import l01 from './l01';
import l02 from './l02';
import l03 from './l03';
import l04 from './l04';
import l05 from './l05';

/**
 * Chapter 1 — Meet your agent. The vague brief, chat vs autocomplete vs agent,
 * the agent loop, strengths and weaknesses, the tools it uses, "Done!" as a
 * claim, the job shift to judging, the trust ladder, the Delivery Board project,
 * running it yourself, agents you'll meet, cost, the weather dashboard, first-week
 * mistakes and session logs. Climax: the real task, written down.
 * Outline: docs/originals/working-with-ai-coding-agents-outline.md.
 */
const unit: OriginalUnit = {
  key: 'u01',
  title: 'Meet your agent',
  marker: 'make the delivery thing',
  story: 'Felix hands Remi an AI coding agent. Remi types "make the delivery thing". The agent builds a weather dashboard.',
  goal: 'Explain what a coding agent does, and where it helps and where it goes wrong.',
  lessons: [l01, l02, l03, l04, l05],
};

export default unit;
