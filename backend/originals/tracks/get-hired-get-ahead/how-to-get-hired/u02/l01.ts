import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 1 — opens the chapter: five interns, one he can keep. Story choice: week 1. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Five interns, one desk',
  summary: 'First morning at Kmer Logistics. Clinton is one of five part-time interns. Mr Tamba is friendly, fast and honest: "In three months, I can afford to keep one of you." How should Clinton spend week one?',
  minutes: 11,
  outcomes: ['Explain what an internship is really for', 'Choose a smart first week', 'Learn what matters to the person you work for'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:30am',
      beats: [
        { speaker: 'narrator', text: 'Ten weeks to graduation. Kmer Logistics is one floor above a phone shop in Bonamoussadi, Douala: six desks, a whiteboard covered in delivery routes, and a kettle. Five interns squeeze around one table.' },
        { speaker: 'narrator', text: 'Mr Tamba, the founder, claps once. "Welcome. You\'ll each own a small project. In three months, I can afford to keep one of you full-time. Questions? No? Good. Go."' },
        { speaker: 'clinton', text: 'One of five. And I still have the Njangi Pay interview. No pressure.' },
        { speaker: 'miracle', text: 'An internship is three things: learning, proof for your CV, and someone who\'ll vouch for you. Even if he keeps someone else, you can leave with all three.' },
      ],
      choice: {
        prompt: 'How should Clinton spend week one?',
        options: [
          {
            text: 'Find out what Mr Tamba worries about most, and do his own project well.',
            outcome: 'By Thursday he knows the biggest worry: drivers can\'t confirm deliveries without mobile data. His project now has a point.',
            best: true,
          },
          {
            text: 'Stay late every night so he looks the busiest.',
            outcome: 'Mr Tamba leaves at 6pm and doesn\'t see it. Clinton is tired, and his project is no better.',
          },
          {
            text: 'Do exactly what he\'s told, nothing more, and wait to be noticed.',
            outcome: 'Fine work, but nobody knows whether it helps. Waiting to be noticed rarely works with five interns.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'An internship gives you learning, proof and a reference. Find out what matters to the person you work for.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> how to find and check an internship, how to stand out in your first weeks, how to ask for feedback, and how to leave with a reference, whether or not you\'re kept on. Your kit piece: an internship plan.</p>',
    },
  ],
  apply: {
    scenario: 'Clinton\'s first week at Kmer Logistics.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What three things can an internship give Clinton?',
        options: [
          { text: 'Only money', why: 'Pay helps, but learning, proof and a reference last longer.' },
          { text: 'Learning, proof for his CV, and a reference' },
          { text: 'Only a job offer', why: 'An offer is a bonus. The three lasting things are learning, proof and a reference.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Smart week-one move, or not?',
        groups: ['Smart', 'Not smart'],
        items: [
          { text: 'Ask what worries Mr Tamba most', group: 0 },
          { text: 'Stay late so he looks busy', group: 1 },
          { text: 'Learn the other interns\' names', group: 0 },
          { text: 'Wait silently to be noticed', group: 1 },
          { text: 'Do his own project well', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'He can only keep one of five. Is there any point if it isn\'t me?',
        options: [
          { text: 'No, I should quit now.', why: 'There are three wins even without the job.' },
          { text: 'Only if I beat everyone else.', why: 'The other wins don\'t depend on beating anyone.' },
          { text: 'Yes: I\'ll still leave with new skills, a project for my CV and a reference.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the week-one plan that won\'t help.',
        lines: ['Find out the biggest problem.', 'Look busy until 10pm every night.', 'Do his own project well.'],
        bug: 1,
        explanation: 'Looking busy isn\'t the same as being useful.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Clinton learn by Thursday?',
        options: [
          { text: 'Drivers can\'t confirm deliveries without mobile data' },
          { text: 'Mr Tamba likes tea', why: 'The useful thing was the biggest worry.' },
          { text: 'The office closes at 6pm', why: 'He learned the biggest worry: offline delivery confirmations.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each week-one choice to what happened.',
        pairs: [
          ['Find out the biggest worry', 'His project now has a point'],
          ['Stay late every night', 'Tired, and nobody noticed'],
          ['Wait to be noticed', 'Nobody knows if his work helps'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s point.',
        template: 'An internship gives you learning, [[1]] and a [[2]].',
        blanks: [['proof'], ['reference']],
        distractors: ['money', 'holiday', 'title'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many interns does Kmer have? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s the best question for Mr Tamba in week one?',
        options: [
          { text: '"Which one of us will you keep?"', why: 'Too early, and he won\'t know yet.' },
          { text: '"Can I leave early on Fridays?"', why: 'Ask about the work first.' },
          { text: '"What would make this project really useful for you?"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lasts after the internship, or not?',
        groups: ['Lasts', 'Doesn\'t last'],
        items: [
          { text: 'A project for his CV', group: 0 },
          { text: 'A reference from Mr Tamba', group: 0 },
          { text: 'Looking busy at 9pm', group: 1 },
          { text: 'New skills', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you started an internship tomorrow, what would you want to leave with: which skill, which proof, and which person to vouch for you?',
    starters: ['The skill:', 'The person:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask someone who has done an internship: "What do you wish you\'d done in your first week?" Write down the answer.',
  },
  notes: 'Opens L2 Ch2 (A foot in the door; founder topics: How to Get Your First Internship, How to Stand Out as a Graduate). Kmer Logistics and Mr Tamba are invented; Bonamoussadi is a real Douala neighbourhood. Interns other than Clinton are named extras.',
};

export default lesson;
