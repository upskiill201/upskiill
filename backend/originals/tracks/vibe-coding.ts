import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './vibe-coding/beginner/u01';
import u02 from './vibe-coding/beginner/u02';
import u03 from './vibe-coding/beginner/u03';
import u04 from './vibe-coding/beginner/u04';
import u05 from './vibe-coding/beginner/u05';
import u06 from './vibe-coding/beginner/u06';
import u07 from './vibe-coding/beginner/u07';
import u08 from './vibe-coding/beginner/u08';

/**
 * Vibe Coding: Build Apps with AI — storyline "Second Line". A SHORT Original
 * (8 chapters × 10 lessons) in the AI set, and one of Teyro's signature
 * courses. New Orleans, eight weeks: Hazel, a band director who has never
 * coded, builds the Esplanade Brass's fundraising app with Claude Code so 24
 * kids can get to the National Brass Showcase ($18,000). Benny is the first
 * user and bug-finder; Ruth, a retired engineer, is the reviewer.
 *
 * Practical: the phone teaches, the learner's own computer builds. Every
 * Deepen is one real step in their own project, and every chapter ends with
 * something they built on their machine. No AI is called inside Teyro (Phase
 * One guard): the AI replies, diffs and terminal output in lessons are
 * written examples. Why Claude Code, the facts policy (prices only in lesson
 * 1.3), and the stack (HTML/CSS/JS, Supabase, Vercel, GitHub) are in
 * docs/originals/vibe-coding-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'vibe-coding-build-apps-with-ai',
  title: 'Vibe Coding: Build Apps with AI',
  category: 'AI',
  format: 'short',
  description:
    'Build real apps with an AI coding tool, even if you have never coded: install it, brief it, check its work, test it, fix it when it is wrong, keep it safe, and put your app live.',
  levels: [
    {
      level: 1,
      slug: 'vibe-coding-build-apps-with-ai',
      title: 'Vibe Coding: Build Apps with AI',
      thumbnailUrl: '/originals/vibe-coding-build-apps-with-ai.jpg',
      subtitle: 'Second Line: one band, one clipboard in the rain, eight weeks to build the app that gets them to D.C.',
      shortDescription:
        'Never coded? Build a real app anyway. Learn to use Claude Code on your own computer: brief it, check it, test it, fix it, secure it, and put your app live.',
      description:
        "New Orleans, eight weeks before the National Brass Showcase. The Esplanade Brass needs $18,000 to get 24 kids to Washington, D.C., and the band's whole system is a clipboard, until a second line in the rain turns it to pulp. Hazel, the band director, has never written a line of code. Her trumpet captain says, \"Just vibe code it, Miss B.\" Follow Hazel as she builds the band's app with an AI coding tool, one chapter a week, while you build your own: a personal site, a small tool, then a real app with a database and login, live on the internet. You'll learn the parts most tutorials skip: writing a brief the AI can't misread, checking what it changed, making tests the judge, undoing mistakes with git, fixing bugs when the AI is wrong, and keeping secrets and data safe. Ten minutes a lesson on your phone, and one real step on your computer.",
      startingPoint:
        'Complete beginners. You have never coded. You need a computer (Mac, Windows or Linux) and a paid Claude plan for the building steps; the course tells you exactly what to set up.',
      endOutcome:
        'Plan, build, check, test, fix, secure and put live a small real app with an AI coding tool, and explain why you trust it.',
      outcomes: [
        'Install and run Claude Code in a project on your own computer',
        'Write briefs and plans the AI builds the right thing from',
        'Check what the AI changed, and make tests the judge',
        'Undo mistakes and back up your work with git and GitHub',
        'Build an app with a database and email login, and debug it',
        'Keep secrets and data safe, then put your app live',
      ],
      skills: ['Vibe coding', 'Claude Code', 'Prompting for code', 'Testing', 'Git and GitHub', 'Debugging', 'App security basics', 'Deploying'],
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05, u06, u07, u08],
    },
  ],
};

export default track;
