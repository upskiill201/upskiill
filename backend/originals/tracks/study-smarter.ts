import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './study-smarter/beginner/u01';

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
      subtitle: "Kofi's Final Year: the honest shortcut",
      shortDescription: "Turn AI into a patient tutor: explain hard topics, quiz yourself, plan revision and write better, all within your school's rules.",
      description:
        "AI can make studying much easier, or quietly stop you from learning anything. This course shows the difference. Follow Kofi through his final year of school in Accra, with his mentor Miracle and their study group in Buea, as Tey teaches you to use AI to understand, practise, plan and write, while doing your own thinking and staying within your school's rules.",
      startingPoint: 'You are a secondary-school or university student. You have heard of AI tools like ChatGPT. No technical background needed.',
      endOutcome: "Use AI as a study partner to understand topics, quiz yourself and plan revision, honestly and within your school's rules.",
      outcomes: [
        'Get clear explanations of hard topics at your level',
        'Turn notes into practice questions and flashcards',
        'Plan revision you will actually stick to',
        'Use AI for writing honestly, without breaking academic rules',
      ],
      skills: ['Studying with AI', 'Self-quizzing', 'Revision planning', 'Academic honesty', 'Research basics'],
      upcomingUnits: 12,
      units: [u01],
    },
  ],
};

export default track;
