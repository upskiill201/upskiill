import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './coding-agents/beginner/u01';
import u02 from './coding-agents/beginner/u02';

/**
 * Working with AI Coding Agents — storyline "The Delivery Board".
 * Outline: docs/originals/working-with-ai-coding-agents-outline.md (approved 2026-10-20).
 *
 * At Synergix in Nairobi, after Data Science for Beginners, Mr Kamau wants a
 * Delivery Board that flags at-risk orders. IT is Felix, alone, so he gives
 * Remi an AI coding agent: "Build it with this. I'll review." Zanele is the
 * first user. Lessons run real Python in the browser with the practice agent
 * (frontend/public/python/teyro_agent.py): no real AI model is ever called.
 */
const track: OriginalTrackDef = {
  slug: 'working-with-ai-coding-agents',
  title: 'Working with AI Coding Agents',
  category: 'Coding',
  description:
    'Learn to work with AI coding agents like a professional: brief them clearly, review their code, catch their mistakes with tests, and ship safely.',
  levels: [
    {
      level: 1,
      slug: 'working-with-ai-coding-agents',
      title: 'Working with AI Coding Agents',
      subtitle: 'The Delivery Board: brief it, check it, ship it',
      shortDescription:
        'Learn to work with AI coding agents like a professional: write briefs they can\'t misread, review their code, catch their mistakes with tests, and ship safely. Practise with a built-in agent in your browser.',
      description:
        "At Synergix in Nairobi, the boss wants a Delivery Board that flags late deliveries every morning, and IT is one person with a six-month backlog. So Felix hands Remi an AI coding agent: \"Build it with this. I'll review.\" Remi's first brief is one line, and the agent cheerfully builds the wrong thing. Follow Remi as he learns to work with an agent the way professionals do: briefs it can't misread, small steps, reading every change, tests as the judge, recovering when it goes wrong, keeping secrets and data safe, and shipping through review. You'll practise with a built-in agent in your browser that makes the real mistakes agents make, so you learn to catch them. Ten minutes a lesson, made for your phone.",
      startingPoint:
        'You can read a little Python (variables, if, functions) and want to build with AI coding agents. Nothing to install.',
      endOutcome:
        'Brief, plan, review, test, debug and ship agent-written code safely, and explain to a reviewer why each change can be trusted.',
      outcomes: [
        'Explain what a coding agent does and where it goes wrong',
        'Write briefs with a goal, examples, limits and a finish line',
        'Break work into small steps and ask for a plan first',
        'Read diffs and catch scope creep and invented code',
        'Use tests as the judge, not the agent\'s word',
        'Keep secrets, data and your project safe, and ship through review',
      ],
      skills: ['AI coding agents', 'Code review', 'Testing', 'Prompting', 'Python', 'Software safety'],
      upcomingUnits: 7,
      units: [u01, u02],
    },
  ],
};

export default track;
