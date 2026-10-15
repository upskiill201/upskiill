import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './small-talk/beginner/u01';

/**
 * The Art of Small Talk — storyline "Grace Says Hello".
 * A SHORT Original (founder, 2026-10-15): one level, 5 chapters × 10 lessons.
 * Outline and research: docs/originals/small-talk-outline.md.
 *
 * Cast: Grace leads (ex-nurse, junior UX researcher at Kinwell, Manchester);
 * Femi, Priya and Jayden are course-only; Arjun and Ada are shared cast.
 */
const track: OriginalTrackDef = {
  slug: 'small-talk',
  title: 'The Art of Small Talk',
  category: 'Communication',
  format: 'short',
  description:
    'Start conversations with anyone, keep them going, and leave people glad they met you. A short, research-backed course on small talk at work and everywhere else.',
  levels: [
    {
      level: 1,
      slug: 'the-art-of-small-talk',
      title: 'The Art of Small Talk',
      subtitle: 'Grace Says Hello: from dreading small talk to enjoying it',
      shortDescription:
        'Start a conversation with anyone, keep it going with the right questions, handle small talk at work and at events, and turn it into real connection.',
      description:
        'Grace spent 18 years as a nurse calming strangers at 3 a.m. On her first day in a tech job, she freezes at the coffee machine. Follow her through her first two months as she learns what small talk is really for, how to start it, keep it going, use it at work and at events, and turn it into real connection. Tey shows you the research behind every lesson: why conversations with strangers go better than we expect, why follow-up questions make people like you, and why people like you more than you think. Ten-to-fifteen-minute lessons, five short chapters, and plenty to laugh at along the way.',
      startingPoint:
        'Anyone who dreads small talk: new starters, career-changers, introverts, people working in a second language, students heading into internships. No experience needed.',
      endOutcome:
        'Start a conversation with anyone, keep it going naturally, and leave it so the other person is glad you talked.',
      outcomes: [
        'Start a conversation anywhere, with anyone',
        'Keep it going with follow-up questions and good listening',
        'Handle small talk at work, on video calls and with senior people',
        'Walk into an event, join a group and leave gracefully',
        'Turn small talk into real connection, and recover from awkward moments',
      ],
      skills: ['Small talk', 'Conversation skills', 'Networking', 'Listening', 'Confidence', 'Workplace relationships'],
      upcomingUnits: 4,
      units: [u01],
    },
  ],
};

export default track;
