import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './conflict-at-work/beginner/u01';
import u02 from './conflict-at-work/beginner/u02';
import u03 from './conflict-at-work/beginner/u03';
import u04 from './conflict-at-work/beginner/u04';
import u05 from './conflict-at-work/beginner/u05';

/**
 * How to Manage Conflict at Work — storyline "Grace Keeps the Peace".
 * A SHORT Original: one level, 5 chapters × 10 lessons. Course 3 of 3 in the
 * Negotiation & Conflict track (also covers De-escalate an Argument, Resolve
 * Misunderstandings, Respond to Unfair Criticism and Set Boundaries Without
 * Damaging Relationships). Grace, an ex-nurse turned UX researcher at
 * Kinwell, can calm patients but freezes with colleagues. Lesson 9 of every
 * chapter is her "ward rules for the office".
 * Outline and research: docs/originals/how-to-manage-conflict-at-work-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'how-to-manage-conflict-at-work',
  title: 'How to Manage Conflict at Work',
  category: 'Negotiation & Conflict',
  format: 'short',
  description:
    'Calm arguments, clear up misunderstandings, answer unfair criticism and set boundaries at work, without becoming the office villain or the office doormat.',
  levels: [
    {
      level: 1,
      slug: 'how-to-manage-conflict-at-work',
      title: 'How to Manage Conflict at Work',
      thumbnailUrl: '/originals/how-to-manage-conflict-at-work.jpg',
      subtitle: 'Grace Keeps the Peace: calm the room, clear it up, keep the relationship',
      shortDescription:
        'Conflict at work does not go away when you ignore it. Learn to cool down an argument, clear up misunderstandings, answer unfair criticism and set boundaries, without becoming the office villain or the office doormat.',
      description:
        "Grace spent 18 years as a ward nurse calming frightened patients at 3 a.m. Now a UX researcher at a Manchester health-tech company, she freezes when a colleague is angry with her. Then a launch deadline pits her research against a developer's code, a one-word Slack message starts a two-day cold war, a new product manager calls her report \"just opinions\" in front of the team, and her manager keeps adding projects. Follow Grace as she learns when to address conflict and how, how to de-escalate a raised voice, check what someone really meant, respond to criticism without flinching or fighting, and set boundaries that hold without damaging relationships. Every lesson draws on research, from team-conflict studies to how badly tone travels in writing. No experience needed.",
      startingPoint:
        'You work with other people and find conflict uncomfortable: you avoid it, or it escalates. No experience needed.',
      endOutcome:
        'Choose how to handle a conflict, calm a heated conversation, clear up misunderstandings, respond to unfair criticism and set clear boundaries at work.',
      outcomes: [
        'Choose the right way to handle each conflict instead of defaulting',
        'De-escalate an argument as it heats up',
        'Clear up misunderstandings, especially in writing',
        'Respond to unfair criticism calmly and with evidence',
        'Set and hold boundaries without damaging relationships',
      ],
      skills: ['Conflict resolution', 'De-escalation', 'Feedback', 'Boundaries', 'Workplace communication', 'Emotional regulation'],
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
