import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './clear-writing-at-work/beginner/u01';
import u02 from './clear-writing-at-work/beginner/u02';
import u03 from './clear-writing-at-work/beginner/u03';
import u04 from './clear-writing-at-work/beginner/u04';

/**
 * Clear Writing at Work — storyline "Zanele Writes It Plain".
 * A SHORT Original (founder, 2026-10-21): one level, 5 chapters × 10 lessons.
 * Moved out of launch-lineup.ts (slugs kept). After Data Science for
 * Beginners, Zanele runs the Saturday dispatch pilot and has to write about
 * it: updates, a report, requests, bad news and a memo to Mr Kamau.
 * Lesson 9 of every chapter is her plain checklist.
 * Outline and research: docs/originals/launch-lineup-short-courses.md.
 */
const track: OriginalTrackDef = {
  slug: 'clear-writing-at-work',
  title: 'Clear Writing at Work',
  category: 'Communication',
  format: 'short',
  description: 'Write emails, messages and documents that people read, understand and act on.',
  levels: [
    {
      level: 1,
      slug: 'clear-writing-at-work-beginner',
      title: 'Clear Writing at Work',
      subtitle: 'Zanele Writes It Plain: get read, get understood, get replies',
      shortDescription:
        'Learn the habits behind clear work writing: fewer words, plain language, the point and the ask first, documents people can skim, and hard messages said kindly.',
      description:
        "Zanele is a junior analyst at Synergix in Nairobi. English is her third language, and she writes long to sound professional. When she sends the CEO a careful 900-word update on the delivery pilot, his reply is one character: \"?\". Follow Zanele as she learns to write for busy readers: cut to the point, swap jargon for plain words, put the result and the ask first, turn a 12-page report into a one-pager people actually read, and deliver bad news, say no and give feedback in writing, with AI as an editor rather than an author. Every lesson draws on research, from Writing for Busy Readers to why needlessly complex writing makes people seem less capable. No experience needed.",
      startingPoint: 'You write emails and messages at work and want them to be clearer and get better results.',
      endOutcome: 'Write work messages and short documents that are clear, kind, and get the response you need.',
      outcomes: [
        'Write less and put the point in the first two lines',
        'Use plain words and short sentences that anyone can read',
        'Make clear asks people find easy to answer',
        'Structure documents people can skim',
        'Write bad news, a no and feedback clearly and kindly',
      ],
      skills: ['Plain language', 'Email writing', 'Business writing', 'Editing', 'Report writing'],
      upcomingUnits: 1,
      units: [u01, u02, u03, u04],
    },
  ],
};

export default track;
