import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './make-people-listen/beginner/u01';
import u02 from './make-people-listen/beginner/u02';
import u03 from './make-people-listen/beginner/u03';

/**
 * How to Make People Listen to You — storyline "Tey FM: Can You Hear Me?".
 * A SHORT Original (founder, 2026-10-15): one level, 5 chapters × 10 lessons,
 * framed as a late-night radio phone-in anthology: each chapter is a different
 * caller from the shared cast. Outline and research:
 * docs/originals/make-people-listen-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'make-people-listen',
  title: 'How to Make People Listen to You',
  category: 'Communication',
  format: 'short',
  description:
    'Get your point across so people actually hear it, in messages, meetings and hard conversations, without shouting and without pushing.',
  levels: [
    {
      level: 1,
      slug: 'how-to-make-people-listen-to-you',
      title: 'How to Make People Listen to You',
      subtitle: 'Tey FM: Can You Hear Me? Five callers, one problem: nobody listens',
      shortDescription:
        'Learn why people tune out and how to be heard: one clear point, a voice people trust, holding the floor in meetings, and changing minds without pushing.',
      description:
        'Welcome to Tey FM, the late-night radio show for everyone who feels unheard. Each chapter, a new caller rings in: Clinton, muted by his whole class group chat; Arjun, whose clients ignore his warnings; David, the quiet one whose ideas get taken; Lucía, whose new team talks over her; and Miracle, who needs her family to hear her out. You\'re the producer, coaching each caller with what the research actually says: why the "goldfish attention span" is a myth, why your voice signals intelligence, why experts struggle to be understood, and why pushing makes people push back. Short lessons, five very different stories, and tools you can use tomorrow.',
      startingPoint:
        'Anyone who feels talked over, ignored, muted or unheard: at work, at school, in group chats or at home. No experience needed.',
      endOutcome:
        'Say what matters so people actually hear it, in messages, meetings and hard conversations, without shouting and without pushing.',
      outcomes: [
        'Get heard by listening first and having one clear point',
        'Explain expert ideas so they stick, and put the answer first',
        'Use your voice, pace and pauses so people take you seriously',
        'Hold the floor in meetings and handle interruptions calmly',
        'Change minds without pushing, even with people who disagree',
      ],
      skills: ['Being heard', 'Clear messages', 'Voice and delivery', 'Meetings', 'Persuasion', 'Listening'],
      upcomingUnits: 2,
      units: [u01, u02, u03],
    },
  ],
};

export default track;
