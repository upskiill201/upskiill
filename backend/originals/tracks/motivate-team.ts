import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './motivate-team/beginner/u01';
import u02 from './motivate-team/beginner/u02';

/**
 * How to Motivate a Team — storyline "Miracle's Rollout". Leadership &
 * Management track (docs/originals/leadership-track-plan.md). A SHORT
 * Original: one level, 5 chapters × 10 lessons, a Week 1 → Week 8
 * countdown on the map. Outline and research:
 * docs/originals/motivate-a-team-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'how-to-motivate-a-team',
  title: 'How to Motivate a Team',
  category: 'Leadership & Management',
  format: 'short',
  description:
    'Motivation isn\'t pizza and pep talks. Learn what actually makes people care about their work: purpose, autonomy, growth, fairness and being seen.',
  levels: [
    {
      level: 1,
      slug: 'how-to-motivate-a-team',
      title: 'How to Motivate a Team',
      subtitle: "Miracle's Rollout: the least motivated team in the company, and eight weeks to launch",
      shortDescription:
        'Learn what really motivates people at work: fixing the basics, purpose, autonomy, mastery, fair recognition, healthy workloads and leading through a hard week.',
      description:
        "Miracle is a developer. Then the lead of Afiya's Clinic Success team quits, and she's asked to take over the least motivated team in the company, eight weeks before 300 clinics go live. Bisi has seen three managers come and go. Chidi has a bank offer in his inbox. Halima isn't sure she belongs. The COO's advice: \"Buy them pizza.\" Follow Miracle's eight weeks in Lagos as she learns what actually makes people care. Every lesson is a story beat plus the tool that changes things, built on decades of motivation research: self-determination theory, the job characteristics model, the progress principle, fairness and recognition. Ten minutes a lesson, made for your phone, ready on the bus.",
      startingPoint:
        'Anyone who leads people: team leads, managers, supervisors, captains, organisers of volunteers or student groups. No experience needed.',
      endOutcome:
        'Build a team that wants to do great work: fix what demotivates, connect work to purpose, give real autonomy and growth, recognise fairly and lead well under pressure.',
      outcomes: [
        'Know what really motivates people, and the myths that don\'t',
        'Find out why people stay, before they decide to leave',
        'Connect everyday work to the people it helps',
        'Give autonomy and growth without losing control',
        'Recognise people fairly and protect them from burnout',
        'Keep a team going through its hardest week',
      ],
      skills: ['Motivation', 'Leadership', 'Engagement', 'Recognition', 'Team building', 'Retention'],
      upcomingUnits: 3,
      units: [u01, u02],
    },
  ],
};

export default track;
