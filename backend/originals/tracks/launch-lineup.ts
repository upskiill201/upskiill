import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';

/**
 * The rest of the launch line-up (docs/ORIGINALS_PLAYBOOK.md §13): course
 * details only, written so the founder can review them. No units yet, so the
 * loader skips them ("no units written yet") until lessons exist.
 * When a Track gets its first unit, move it to its own file like ai-at-work.ts.
 */

const speakLikeACeo: OriginalTrackDef = {
  slug: 'speak-like-a-ceo',
  title: 'Speak Like a CEO',
  category: 'Communication',
  description: 'Speak with clarity and confidence: in everyday conversations, in meetings, in presentations and on stage.',
  levels: [
    {
      level: 1,
      slug: 'speak-like-a-ceo-beginner',
      title: 'Speak Like a CEO: Beginner',
      subtitle: 'Clear, calm and confident when it counts',
      shortDescription: 'Learn how confident speakers structure what they say, from a quick update in a meeting to a talk in front of a room.',
      description:
        'Confident speaking is mostly technique, not talent. This course teaches it step by step: everyday clarity, speaking up in meetings, structuring a presentation, and handling nerves and questions. You practise by recording yourself and checking against clear criteria.',
      startingPoint: 'You want to speak more clearly and confidently at work, in meetings or in front of people. No experience needed.',
      endOutcome: 'Speak up in meetings and give a short, well-structured talk with calm confidence.',
      outcomes: [
        'Make your point in under 30 seconds',
        'Speak up confidently in meetings',
        'Structure a short presentation',
        'Handle nerves and tough questions',
      ],
      skills: ['Public speaking', 'Presenting', 'Meeting skills', 'Executive presence'],
      upcomingUnits: 12,
      units: [],
    },
  ],
};

export const launchLineup: OriginalTrackDef[] = [speakLikeACeo];
