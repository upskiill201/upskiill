import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './leadership-for-beginners/beginner/u01';
import u02 from './leadership-for-beginners/beginner/u02';
import u03 from './leadership-for-beginners/beginner/u03';
import u04 from './leadership-for-beginners/beginner/u04';
import u05 from './leadership-for-beginners/beginner/u05';

/**
 * Leadership for Beginners — storyline "Lucía's First 90 Days". The first
 * course in the Leadership & Management track (founder, 2026-10-16;
 * docs/originals/leadership-track-plan.md). A SHORT Original: one level,
 * 5 chapters × 10 lessons, a Day 1 → Day 90 countdown on the map.
 * Outline and research: docs/originals/leadership-for-beginners-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'leadership-for-beginners',
  title: 'Leadership for Beginners',
  category: 'Leadership & Management',
  format: 'short',
  description:
    'Your first 90 days as a leader: go from doing the work to leading the people who do it, without losing your friends or your mind.',
  levels: [
    {
      level: 1,
      slug: 'leadership-for-beginners',
      title: 'Leadership for Beginners',
      subtitle: "Lucía's First 90 Days: promoted over her best friend, leading the team she sat in yesterday",
      shortDescription:
        'Learn what new leaders actually do: one-on-ones, psychological safety, clear goals, delegation, feedback, praise, hard conversations and leading under pressure.',
      description:
        "Lucía just got the job. So did her stomach ache. Yesterday she sat in the team; today she leads it, including Marta, her best work friend, who applied for the same job, and Diego, who has been here twelve years and thinks he should have. Follow Lucía's first 90 days at Nopal, a Mexico City snack brand, from an awkward first team meeting to a summer launch that nearly goes wrong. Every lesson is a short story beat plus the leadership tool that fixes it, built on what the research says works: Google's studies of great managers and great teams, the science of one-on-ones, goal-setting, feedback and recognition. Ten minutes a lesson, made for your phone, ready on the bus.",
      startingPoint:
        "Anyone who has just become, or is about to become, a team lead, supervisor or manager. Or anyone who leads without the title. No experience needed.",
      endOutcome:
        'Lead a small team with confidence: run great one-on-ones, set clear goals, delegate, give feedback and praise that lands, handle hard conversations and keep calm under pressure.',
      outcomes: [
        'Make the switch from doing the work to leading the people who do it',
        'Run one-on-ones your team actually looks forward to',
        'Build a team where people speak up, including about mistakes',
        'Set clear goals and delegate without micromanaging',
        'Give feedback and praise that help, and handle a hard conversation',
        'Lead calmly through a crisis and manage up to your boss',
      ],
      skills: ['Leadership', 'Management', 'One-on-ones', 'Delegation', 'Feedback', 'Psychological safety'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/leadership-for-beginners.jpg',
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
