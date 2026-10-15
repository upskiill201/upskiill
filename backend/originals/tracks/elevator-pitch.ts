import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './elevator-pitch/beginner/u01';
import u02 from './elevator-pitch/beginner/u02';
import u03 from './elevator-pitch/beginner/u03';
import u04 from './elevator-pitch/beginner/u04';
import u05 from './elevator-pitch/beginner/u05';

/**
 * How to Give a Convincing Elevator Pitch — storyline "Ada's Big Minute".
 * A SHORT Original (founder, 2026-10-15): one level, 5 chapters × 10 lessons.
 * Founder asked for a simple, easy-to-follow story: one person (Ada), one goal
 * (60 seconds on stage at the Lagos Tech Fest), a five-week countdown, and a
 * pitch draft that improves every chapter. Arjun mentors. Outline and research:
 * docs/originals/elevator-pitch-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'elevator-pitch',
  title: 'How to Give a Convincing Elevator Pitch',
  category: 'Communication',
  format: 'short',
  description:
    'Say who you are and what you do in under a minute, so people want to hear more: for jobs, ideas, networking and the big stage.',
  levels: [
    {
      level: 1,
      slug: 'how-to-give-a-convincing-elevator-pitch',
      title: 'How to Give a Convincing Elevator Pitch',
      subtitle: 'Ada\'s Big Minute: five weeks to get one minute right',
      shortDescription:
        'Build a pitch people remember: one clear sentence, a hook, a story, a confident delivery and a clear ask, for yourself, your idea or your business.',
      description:
        'Ada\'s little side app just got shortlisted for "60 Seconds", the pitch night at the Lagos Tech Fest. She has five weeks to prepare one minute on stage. On day one she gets stuck in a lift with the head judge and talks about her database for thirty floors. Follow Ada week by week as her pitch goes from disaster to done, and build your own alongside hers. You\'ll learn what the research says actually convinces people: why preparation beats passion, why the first ten seconds matter, why stories and specifics stick, and how to turn nerves into energy. Pitch yourself at a networking event, pitch an idea to your boss, or pitch a business to a judge.',
      startingPoint:
        'Anyone who freezes or rambles when someone asks "So, what do you do?", or has an idea, a job hunt or a business to pitch. No experience needed.',
      endOutcome:
        'Give a clear, memorable pitch in 10, 30 or 60 seconds, for yourself, an idea or a business, and handle the questions that follow.',
      outcomes: [
        'Build a pitch around one clear sentence and a simple structure',
        'Introduce yourself so people remember you',
        'Make your pitch stick with a hook, a story and specifics',
        'Deliver it with confidence, even when you\'re nervous',
        'End with a clear ask, handle questions and follow up',
      ],
      skills: ['Elevator pitch', 'Self-introduction', 'Storytelling', 'Public speaking', 'Persuasion', 'Networking'],
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
