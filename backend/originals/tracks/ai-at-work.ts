import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './ai-at-work/beginner/u01';
import u02 from './ai-at-work/beginner/u02';
import u03 from './ai-at-work/beginner/u03';
import u04 from './ai-at-work/beginner/u04';
import u05 from './ai-at-work/beginner/u05';
import u06 from './ai-at-work/beginner/u06';
import u07 from './ai-at-work/beginner/u07';
import u08 from './ai-at-work/beginner/u08';
import u09 from './ai-at-work/beginner/u09';
import u11 from './ai-at-work/beginner/u11';
import u10 from './ai-at-work/beginner/u10';
import u12 from './ai-at-work/beginner/u12';

/**
 * AI at Work — the pilot Original (docs/ORIGINALS_PLAYBOOK.md §13).
 *
 * Course-level details are a first draft for the founder to edit. Units are
 * added here as they are written: each unit in its own file under
 * ai-at-work/beginner/, then listed in `units` below. Until the first unit
 * exists, `npm run originals` checks the course details only.
 *
 * Cast: Ada leads; Lucía is her client contact (docs/originals/CAST.md).
 */
const track: OriginalTrackDef = {
  slug: 'ai-at-work',
  title: 'AI at Work',
  category: 'AI',
  description: 'Use AI tools to do real work faster and better: write, summarise, research, plan and check, without the guesswork.',
  levels: [
    {
      level: 1,
      slug: 'ai-at-work-beginner',
      title: 'AI at Work: Beginner',
      subtitle: 'Get useful answers from AI tools, every day',
      shortDescription: 'Learn to get genuinely useful work out of AI tools, from your first prompt to everyday workflows.',
      description:
        'Most people try an AI tool, get a generic answer, and give up. This course fixes that. With Tey and Ada, you learn how to ask, check and use AI for the work you actually do: emails, summaries, research, planning and more.',
      startingPoint: 'You have heard of AI tools like ChatGPT and maybe tried one. No technical background needed.',
      endOutcome: 'Use an AI tool to draft, summarise and check real work in minutes, and know when not to trust it.',
      outcomes: [
        'Write prompts that get a useful first answer',
        'Summarise long documents and meetings with AI',
        'Check AI answers for mistakes before you use them',
        'Build simple AI habits into your workday',
      ],
      skills: ['Prompting', 'AI writing', 'Summarising', 'Fact-checking AI', 'AI workflows'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/ai-at-work-beginner.jpg',
      upcomingUnits: 1,
      units: [u01, u02, u03, u04, u05, u06, u07, u08, u09, u10, u11, u12],
    },
  ],
};

export default track;
