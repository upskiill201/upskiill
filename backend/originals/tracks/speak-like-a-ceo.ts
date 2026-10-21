import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './speak-like-a-ceo/beginner/u01';
import u02 from './speak-like-a-ceo/beginner/u02';

/**
 * Speak Like a CEO — storyline "Lucía Takes the Room".
 * A SHORT Original (founder, 2026-10-21): one level, 5 chapters × 10 lessons.
 * Moved out of launch-lineup.ts (slugs kept). After her first 90 days leading
 * the team at Nopal (Leadership for Beginners), Lucía gives a weekly
 * two-minute update to Carmen and, in five weeks, presents the chili-lime
 * launch results to 300 people at the Encuentro. Lesson 9 of every chapter is
 * her talk card. Avoids Make People Listen (holding the floor) and Elevator
 * Pitch (the one-minute pitch). Practice = record yourself + checklist; no AI.
 * Outline and research: docs/originals/launch-lineup-short-courses.md.
 */
const track: OriginalTrackDef = {
  slug: 'speak-like-a-ceo',
  title: 'Speak Like a CEO',
  category: 'Communication',
  format: 'short',
  description: 'Speak with clarity and confidence: in everyday conversations, in meetings, in presentations and on stage.',
  levels: [
    {
      level: 1,
      slug: 'speak-like-a-ceo-beginner',
      title: 'Speak Like a CEO',
      subtitle: 'Lucía Takes the Room: clear, calm and confident when it counts',
      shortDescription:
        'Learn how confident speakers structure what they say, from a two-minute update in a meeting to a talk in front of 300 people.',
      description:
        'Lucía writes clearly and rambles out loud. Her weekly two-minute update to Carmen runs to four, and in five weeks she has to present the chili-lime launch results to 300 people at Nopal\'s all-hands, the Encuentro. Follow Lucía as she learns to lead with the headline, speak up with senior leaders, build a talk with slides that help, steady her voice and nerves, and handle tough questions. Confident speaking is mostly technique, not talent, and every lesson draws on research, from how listeners use "um" to why your nerves are less visible than you think. You practise by recording yourself and checking against a clear talk card. No experience needed.',
      startingPoint: 'You want to speak more clearly and confidently at work, in meetings or in front of people. No experience needed.',
      endOutcome: 'Speak up in meetings and give a short, well-structured talk with calm confidence.',
      outcomes: [
        'Make your point in under 30 seconds',
        'Speak up confidently with senior people',
        'Structure a short presentation with slides that help',
        'Use your voice, pauses and nerves well',
        'Handle questions, including tough ones',
      ],
      skills: ['Public speaking', 'Presenting', 'Meeting skills', 'Executive presence'],
      upcomingUnits: 3,
      units: [u01, u02],
    },
  ],
};

export default track;
