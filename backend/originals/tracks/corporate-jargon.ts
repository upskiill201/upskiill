import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './corporate-jargon/beginner/u01';
import u02 from './corporate-jargon/beginner/u02';

/**
 * Corporate Jargon: Speak the Language of Business — storyline "Remi's Internship".
 * Outline and story: docs/originals/corporate-jargon-beginner-outline.md (approved 2026-10-15).
 *
 * Cast: Remi leads (a 12-week internship at Synergix, Nairobi); Ada is his
 * WhatsApp lifeline in Lagos. Brian, Zanele, Mrs Achieng, Mr Kamau, Felix and
 * Pauline are course-only (CAST.md).
 */
const track: OriginalTrackDef = {
  slug: 'corporate-jargon',
  title: 'Corporate Jargon: Speak the Language of Business',
  category: 'Communication',
  description:
    'Learn what people really mean at work, from "circle back" to "let\'s take this offline", and how to answer in clear, confident, professional English.',
  levels: [
    {
      level: 1,
      slug: 'corporate-jargon-beginner',
      title: 'Corporate Jargon: Beginner',
      subtitle: "Remi's Internship: 12 weeks to decode the office",
      shortDescription:
        'Decode the language of offices and meetings: jargon, acronyms, euphemisms and unwritten rules, and learn to answer in plain, professional English.',
      description:
        "\"Let's circle back, take this offline and grab the low-hanging fruit.\" If you've ever nodded along to a sentence like that without being sure what it meant, this course is for you. Follow Remi through his 12-week internship at Synergix in Nairobi, from a first meeting where he understands nothing to the day he's offered a job. Along the way Tey decodes the phrases, acronyms and polite code that offices run on, and shows you how to reply in clear, confident English, in meetings, in emails and in the lift with the CEO. One 10 to 15 minute lesson at a time, with plenty of laughs.",
      startingPoint:
        'You are a student, intern, graduate or career-changer, or you work in English as an additional language. No office experience needed.',
      endOutcome: 'Understand what people really mean at work, and answer in clear, confident, professional English.',
      outcomes: [
        'Decode the jargon people use in meetings, emails and chats',
        'Read the business acronyms everyone else seems to know',
        'Switch from casual to professional English when it matters',
        'Read between the lines of feedback and polite office code',
        'Follow the unwritten rules and the real politics of a workplace',
        'Say what you mean in plain, confident words',
      ],
      skills: ['Business English', 'Workplace communication', 'Meetings', 'Professional writing', 'Office politics', 'Confidence at work'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/corporate-jargon-beginner.jpg',
      upcomingUnits: 10,
      units: [u01, u02],
    },
  ],
};

export default track;
