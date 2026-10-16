import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './set-clear-expectations/beginner/u01';
import u02 from './set-clear-expectations/beginner/u02';
import u03 from './set-clear-expectations/beginner/u03';
import u04 from './set-clear-expectations/beginner/u04';

/**
 * How to Set Clear Expectations — storyline "Arjun's 30-Day Build".
 * Leadership & Management track (docs/originals/leadership-track-plan.md).
 * A SHORT Original: one level, 5 chapters × 10 lessons, a Day 1 → Day 30
 * countdown on the map. Outline and research:
 * docs/originals/set-clear-expectations-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'how-to-set-clear-expectations',
  title: 'How to Set Clear Expectations',
  category: 'Leadership & Management',
  format: 'short',
  description:
    'Say what you need so clearly that people can deliver it: what done looks like, who does what, how good is good enough, and what happens when it changes.',
  levels: [
    {
      level: 1,
      slug: 'how-to-set-clear-expectations',
      title: 'How to Set Clear Expectations',
      subtitle: "Arjun's 30-Day Build: two new juniors, one picky client, and Diwali won't wait",
      shortDescription:
        'Learn to set expectations people can actually meet: clear briefs, roles, quality bars, priorities, checking understanding, handling change and fixing missed expectations.',
      description:
        "Arjun just won his biggest project ever: Mr Rao's online shop, live before the Diwali sale, in 30 days. It's too big for one person, so he hires his first two juniors. On Day 3, both of them have built the wrong thing, and Arjun can't understand why. It was obvious! Follow Arjun's 30 days from Bengaluru, as he learns that what's obvious in his head is invisible to everyone else. Every lesson is a story beat plus the tool that fixes it, built on what the research says works: the curse of knowledge, role clarity, definitions of done, checking understanding and handling change. Ten minutes a lesson, made for your phone, ready on the bus.",
      startingPoint:
        'Anyone who hands work to other people: team leads, managers, freelancers with helpers, project owners, students running group work. No experience needed.',
      endOutcome:
        'Set expectations people can meet: brief clearly, agree who does what and what good looks like, check understanding, handle changes and fix gaps without blame.',
      outcomes: [
        'Spot the curse of knowledge before it costs you a week',
        'Write a brief with what, why, done and by when',
        'Agree who owns what, and who decides',
        'Show what good looks like, and check it early',
        'Reset expectations when the client changes everything',
        'Fix a missed expectation without blame',
      ],
      skills: ['Expectations', 'Delegation', 'Leadership', 'Briefing', 'Project management', 'Communication'],
      upcomingUnits: 1,
      units: [u01, u02, u03, u04],
    },
  ],
};

export default track;
