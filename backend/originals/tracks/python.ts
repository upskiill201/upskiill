import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './python/beginner/u01';

/**
 * Python for Beginners — storyline "Ada's First Program".
 * Outline and story: docs/originals/python-beginner-outline.md (approved 2026-10-14).
 *
 * Ada (Lagos) builds a tracker for her office ajo (rotating savings group);
 * Arjun, a freelance developer who works for her startup, mentors her. Each
 * chapter adds a feature, and the map marker is the program's version.
 * Every lesson runs real Python in the browser (playbook §7, lib/code).
 */
const track: OriginalTrackDef = {
  slug: 'python-for-beginners',
  title: 'Python for Beginners',
  category: 'Coding',
  description: 'Learn to code in Python from zero, writing and running real code in every lesson.',
  levels: [
    {
      level: 1,
      slug: 'python-for-beginners',
      title: 'Python for Beginners',
      subtitle: "Ada's First Program: write real code from your very first lesson",
      shortDescription:
        'Learn Python the fun way: 10-minute lessons, a streak to keep, and real code you write and run in every lesson, right on your phone.',
      description:
        "Python is one of the world's most popular programming languages, and one of the friendliest to start with. This course takes you from where Python began to writing real programs, one 10 to 15 minute lesson at a time. Follow Ada in Lagos as she turns her office savings group's messy notebook into a program everyone trusts, adding a new feature every chapter. You write and run real Python in every lesson, right in your browser, with nothing to install, and Tey explains every idea and every error in plain words.",
      startingPoint: 'You have never written code, or tried once and gave up. You can use a phone or computer comfortably.',
      endOutcome: "Write small Python programs that solve real problems, and read and fix other people's simple code.",
      outcomes: [
        'Write and run real Python from your first lesson',
        'Store and work with text, numbers, lists and dictionaries',
        'Make programs decide and repeat with if, loops and functions',
        'Read error messages and fix your own bugs',
        'Save data to files and use Python\'s built-in tools',
        'Build a complete program from scratch',
      ],
      skills: ['Python', 'Programming basics', 'Problem solving', 'Debugging'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/python-for-beginners.jpg',
      upcomingUnits: 12,
      units: [u01],
    },
  ],
};

export default track;
