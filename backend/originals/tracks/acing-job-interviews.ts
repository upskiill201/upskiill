import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './acing-job-interviews/beginner/u01';

/**
 * Acing Job Interviews — storyline "Remi's Interview Season".
 * A SHORT Original (founder, 2026-10-21): one level, 5 chapters × 10 lessons.
 * Moved out of launch-lineup.ts (slugs kept). Remi has three internship
 * interviews in five weeks (Savanna Bank, Mtaa Labs, Synergix); a prequel to
 * Corporate Jargon. Lesson 9 of every chapter is his interview card.
 * Outline and research: docs/originals/launch-lineup-short-courses.md.
 */
const track: OriginalTrackDef = {
  slug: 'acing-job-interviews',
  title: 'Acing Job Interviews',
  category: 'Career',
  format: 'short',
  description: 'Prepare for job interviews with confidence: tell your story, answer the hard questions, and follow up well.',
  levels: [
    {
      level: 1,
      slug: 'acing-job-interviews-beginner',
      title: 'Acing Job Interviews',
      subtitle: "Remi's Interview Season: walk in prepared, walk out proud",
      shortDescription:
        'Learn how interviews really work and practise answering with clear, true stories about what you have done, from the first phone screen to the final round.',
      description:
        "Remi is a final-year computer science student in Nairobi with three internship interviews in five weeks: a bank phone screen, a startup's technical interview and a final round at Synergix. In the first one he talks about himself for four minutes and gets turned down. Follow Remi as he learns what interviewers are really checking, answers \"tell me about yourself\" in a minute, researches a company in an hour, builds a bank of true STAR stories, handles weaknesses, salary questions and problems he can't solve, stays steady in a group exercise and a panel, and follows up well. Every lesson draws on research about how interviews predict job performance, from structured interviews to interview nerves. No experience needed.",
      startingPoint: 'You are applying for jobs or internships, or will be soon. Any level of experience.',
      endOutcome: 'Answer common and tricky interview questions with clear, structured, honest stories, and follow up confidently.',
      outcomes: [
        'Answer "tell me about yourself" in about a minute',
        'Research a role and company in under an hour',
        'Answer with clear, honest STAR stories',
        'Handle salary, weakness and problems you can\'t solve',
        'Do well in final rounds and follow up the right way',
      ],
      skills: ['Interviewing', 'STAR answers', 'Self-presentation', 'Research', 'Follow-up'],
      upcomingUnits: 4,
      units: [u01],
    },
  ],
};

export default track;
