import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './lead-without-boss/beginner/u01';
import u02 from './lead-without-boss/beginner/u02';
import u03 from './lead-without-boss/beginner/u03';
import u04 from './lead-without-boss/beginner/u04';
import u05 from './lead-without-boss/beginner/u05';

/**
 * How to Lead Without Being the Boss — storyline "Remi's Six-Week Fix".
 * Course 2 of the Leadership & Management track
 * (docs/originals/leadership-track-plan.md). A SHORT Original: one level,
 * 5 chapters × 10 lessons, a Week 1 → Week 6 countdown on the map.
 * Outline and research: docs/originals/lead-without-being-the-boss-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'how-to-lead-without-being-the-boss',
  title: 'How to Lead Without Being the Boss',
  category: 'Leadership & Management',
  format: 'short',
  description:
    'Get things done through people who don\'t report to you: earn credibility, win help, build a shared goal and keep it moving, with no title at all.',
  levels: [
    {
      level: 1,
      slug: 'how-to-lead-without-being-the-boss',
      title: 'How to Lead Without Being the Boss',
      subtitle: "Remi's Six-Week Fix: five teams, nobody reports to him, and the CEO is watching",
      shortDescription:
        'Learn to lead without authority: credibility, influence, asking for help, shared goals, running meetings you don\'t own, following up and getting results across teams.',
      description:
        "Remi just got his first real job, and his first impossible task. Synergix's business customers wait 21 days for a refund, and the CEO wants it under five. In six weeks. The fix needs Finance, IT, Logistics, Marketing and the warehouse, and not one of them reports to Remi. Follow Remi's six weeks in Nairobi, from a kick-off meeting nobody comes to, to standing in front of the CEO with the number. Every lesson is a story beat plus the influence tool that moves it forward, built on what the research says works: the bases of power, credibility, reciprocity, asking for help, shared goals and follow-through. Ten minutes a lesson, made for your phone, ready on the bus.",
      startingPoint:
        'Anyone who needs things done by people they don\'t manage: team members, project leads, students running group work, new joiners. No title needed.',
      endOutcome:
        'Lead people who don\'t report to you: earn their trust, win their help, agree a shared goal, run the work and deliver the result together.',
      outcomes: [
        'Know where influence comes from when you have no title',
        'Build credibility fast with people from other teams',
        'Ask for help in a way people want to say yes to',
        'Turn your idea into a goal everyone owns',
        'Keep work moving with follow-up, not nagging',
        'Present results so the whole team shines',
      ],
      skills: ['Influence', 'Leadership', 'Stakeholder management', 'Collaboration', 'Persuasion', 'Project leadership'],
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
