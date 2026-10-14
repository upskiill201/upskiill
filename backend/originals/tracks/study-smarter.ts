import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './study-smarter/beginner/u01';
import u02 from './study-smarter/beginner/u02';
import u03 from './study-smarter/beginner/u03';

/**
 * Study Smarter with AI — storyline "Kofi's Final Year".
 * Outline and story: docs/originals/study-smarter-beginner-outline.md (approved 2026-10-14).
 *
 * Cast: Kofi leads (Accra); Miracle mentors him, Clinton and David (Buea) as
 * one online study group; Efua and Mrs Asante are course-only, in Accra.
 */
const track: OriginalTrackDef = {
  slug: 'study-smarter-with-ai',
  title: 'Study Smarter with AI',
  category: 'AI',
  description: 'Use AI to study smarter at school and university: understand faster, revise better and write honestly, without cheating yourself.',
  levels: [
    {
      level: 1,
      slug: 'study-smarter-with-ai-beginner',
      title: 'Study Smarter with AI: Beginner',
      subtitle: "Kofi's Final Year: learn faster, and still do your own thinking",
      shortDescription:
        'Turn any AI chat into an honest study partner: understand hard topics at your level, test yourself, take notes that stick and get ready for exams.',
      description:
        "AI can make studying much easier, or quietly stop you learning anything. This course shows you the difference, one 10 to 15 minute lesson at a time. Follow Kofi through his final year of school in Accra, with his mentor Miracle and their study group in Buea, Cameroon, as he goes from a wall of text he can't follow to teaching the hardest topic to his class. Along the way Tey teaches you the study habits with the strongest research behind them, like testing yourself and spacing it out, and how to use AI for each one while doing your own thinking and staying within your school's rules. It works with ChatGPT, Gemini, Claude, Copilot or any other chat assistant.",
      startingPoint:
        'You are at secondary school or university, and you have tried or heard of AI tools like ChatGPT. No technical background needed.',
      endOutcome:
        "Use AI as a study partner to understand any topic, test yourself and build revision notes that stick, honestly and within your school's rules.",
      outcomes: [
        'Get clear explanations of any topic, at your level',
        "Find the hidden gap when a topic just won't click",
        'Test yourself with AI the way the research says works',
        'Take notes that stick: Cornell notes, flashcards and one-page revision sheets',
        'Catch AI mistakes before they end up in your notes',
        "Use AI honestly, within your school's rules",
      ],
      skills: ['Studying with AI', 'Self-testing', 'Note-taking', 'Revision', 'Exam technique', 'Academic honesty'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/study-smarter-with-ai-beginner.jpg',
      upcomingUnits: 10,
      units: [u01, u02, u03],
    },
  ],
};

export default track;
