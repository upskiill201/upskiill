import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';

/**
 * The rest of the launch line-up (docs/ORIGINALS_PLAYBOOK.md §13): course
 * details only, written so the founder can review them. No units yet, so the
 * loader skips them ("no units written yet") until lessons exist.
 * When a Track gets its first unit, move it to its own file like ai-at-work.ts.
 */

// Outline and story: docs/originals/study-smarter-beginner-outline.md (approved 2026-10-14).
const studySmarter: OriginalTrackDef = {
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
      shortDescription: 'Turn AI into a patient tutor: explain hard topics, quiz yourself, plan revision and write better, all within your school\'s rules.',
      description:
        "AI can make studying much easier, or quietly stop you from learning anything. This course shows the difference. Follow Kofi through his final year of school in Accra, with his mentor Miracle and their study group in Buea, as Tey teaches you to use AI to understand, practise, plan and write, while doing your own thinking and staying within your school's rules.",
      startingPoint: 'You are a secondary-school or university student. You have heard of AI tools like ChatGPT. No technical background needed.',
      endOutcome: 'Use AI as a study partner to understand topics, quiz yourself and plan revision, honestly and within your school\'s rules.',
      outcomes: [
        'Get clear explanations of hard topics at your level',
        'Turn notes into practice questions and flashcards',
        'Plan revision you will actually stick to',
        'Use AI for writing honestly, without breaking academic rules',
      ],
      skills: ['Studying with AI', 'Self-quizzing', 'Revision planning', 'Academic honesty', 'Research basics'],
      upcomingUnits: 13,
      units: [],
    },
  ],
};

const pythonForBeginners: OriginalTrackDef = {
  slug: 'python-for-beginners',
  title: 'Python for Beginners',
  category: 'Coding',
  description: 'Learn to code in Python from zero, writing and running real code in every lesson.',
  levels: [
    {
      level: 1,
      slug: 'python-for-beginners',
      title: 'Python for Beginners',
      subtitle: 'Write real code from your very first lesson',
      shortDescription: 'Go from never having coded to writing small, useful Python programs, running real code inside every lesson.',
      description:
        'Python is one of the most popular first programming languages, used for everything from automation to data and AI. In this course you write and run real code from the first lesson, in short steps, with Tey explaining every idea in plain words.',
      startingPoint: 'You have never written code, or tried once and gave up. You can use a computer or phone comfortably.',
      endOutcome: 'Write small Python programs that solve real problems, and read other people\'s simple code.',
      outcomes: [
        'Understand variables, decisions and loops',
        'Write and run your own Python programs',
        'Work with text, numbers and lists',
        'Read and fix simple errors on your own',
      ],
      skills: ['Python', 'Programming basics', 'Problem solving', 'Debugging'],
      upcomingUnits: 12,
      units: [],
    },
  ],
};

const acingJobInterviews: OriginalTrackDef = {
  slug: 'acing-job-interviews',
  title: 'Acing Job Interviews',
  category: 'Career',
  description: 'Prepare for job interviews with confidence: tell your story, answer the hard questions, and follow up well.',
  levels: [
    {
      level: 1,
      slug: 'acing-job-interviews-beginner',
      title: 'Acing Job Interviews: Beginner',
      subtitle: 'Walk in prepared, walk out proud',
      shortDescription: 'Learn how interviews really work and practise answering with clear, true stories about what you have done.',
      description:
        'Most people go into interviews hoping it goes well. This course gives you a method instead: research the role, prepare true stories with the STAR method, practise with AI as your mock interviewer, handle tricky questions, and follow up the right way.',
      startingPoint: 'You are applying for jobs or internships, or will be soon. Any level of experience.',
      endOutcome: 'Answer common and tricky interview questions with clear, structured, honest stories, and follow up confidently.',
      outcomes: [
        'Research a role and company in under an hour',
        'Answer with clear STAR stories',
        'Practise with AI as a mock interviewer',
        'Handle salary, weakness and "any questions?" moments',
      ],
      skills: ['Interviewing', 'STAR answers', 'Self-presentation', 'Follow-up'],
      upcomingUnits: 12,
      units: [],
    },
  ],
};

const clearWritingAtWork: OriginalTrackDef = {
  slug: 'clear-writing-at-work',
  title: 'Clear Writing at Work',
  category: 'Communication',
  description: 'Write emails, messages and documents that people read, understand and act on.',
  levels: [
    {
      level: 1,
      slug: 'clear-writing-at-work-beginner',
      title: 'Clear Writing at Work: Beginner',
      subtitle: 'Get read, get understood, get replies',
      shortDescription: 'Learn the habits behind clear work writing: plain words, the point first, and asks people actually answer.',
      description:
        'Clear writing is one of the most valuable skills at work and one of the least taught. With Tey and Ada, you learn plain language, how to structure any message, how to write for busy and senior readers, and how to give and ask for things clearly, with and without AI.',
      startingPoint: 'You write emails and messages at work and want them to be clearer and get better results.',
      endOutcome: 'Write work messages and short documents that are clear, kind, and get the response you need.',
      outcomes: [
        'Write in plain language that busy people read',
        'Put the point and the ask first',
        'Structure documents people can skim',
        'Give feedback and say no clearly and kindly',
      ],
      skills: ['Plain language', 'Email writing', 'Business writing', 'Editing'],
      upcomingUnits: 12,
      units: [],
    },
  ],
};

const speakLikeACeo: OriginalTrackDef = {
  slug: 'speak-like-a-ceo',
  title: 'Speak Like a CEO',
  category: 'Communication',
  description: 'Speak with clarity and confidence: in everyday conversations, in meetings, in presentations and on stage.',
  levels: [
    {
      level: 1,
      slug: 'speak-like-a-ceo-beginner',
      title: 'Speak Like a CEO: Beginner',
      subtitle: 'Clear, calm and confident when it counts',
      shortDescription: 'Learn how confident speakers structure what they say, from a quick update in a meeting to a talk in front of a room.',
      description:
        'Confident speaking is mostly technique, not talent. This course teaches it step by step: everyday clarity, speaking up in meetings, structuring a presentation, and handling nerves and questions. You practise by recording yourself and checking against clear criteria.',
      startingPoint: 'You want to speak more clearly and confidently at work, in meetings or in front of people. No experience needed.',
      endOutcome: 'Speak up in meetings and give a short, well-structured talk with calm confidence.',
      outcomes: [
        'Make your point in under 30 seconds',
        'Speak up confidently in meetings',
        'Structure a short presentation',
        'Handle nerves and tough questions',
      ],
      skills: ['Public speaking', 'Presenting', 'Meeting skills', 'Executive presence'],
      upcomingUnits: 12,
      units: [],
    },
  ],
};

export const launchLineup: OriginalTrackDef[] = [studySmarter, pythonForBeginners, acingJobInterviews, clearWritingAtWork, speakLikeACeo];
