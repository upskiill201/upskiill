import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: research in an hour. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Research in an hour',
  summary: 'Ada gives Remi a timer and a plan: five blocks, one hour, and he\'ll know more about Mtaa Labs than most candidates.',
  minutes: 12,
  outcomes: [
    'Research a company and role in about an hour',
    'Focus on what you\'ll actually use in the interview',
    'Turn research into things to say',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'One hour, five blocks',
      steps: [
        { title: '1. Use the product (15 min)', body: 'Remi installs the Mtaa Labs app and tracks a test delivery. He notices the shop owner\'s screen is all in English, no Swahili option.' },
        { title: '2. Read the job ad closely (15 min)', body: 'He highlights the skills (JavaScript, Git, "curious about small businesses") and the work: "build features for 3,000 shop owners".' },
        { title: '3. Look up the company (10 min)', body: 'Website, news, recent posts. Mtaa Labs raised its first funding round this year and is expanding to Mombasa.' },
        { title: '4. Look up your interviewer (10 min)', body: 'Wanjiru, the CTO, wrote a post about building for slow phones. That\'s a great topic to mention.' },
        { title: '5. Write your notes (10 min)', body: 'Three facts, one "why us?" sentence, and three questions to ask. That\'s what he\'ll actually use.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Product, job ad, company, interviewer, notes. One hour, and finish with things you can say.',
    },
  ],
  apply: {
    scenario: 'One hour.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five blocks.',
        lines: ['Use the product', 'Read the job ad closely', 'Look up the company', 'Look up your interviewer', 'Write your notes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the block to what Remi found.',
        pairs: [
          ['Use the product', 'No Swahili option'],
          ['Job ad', '3,000 shop owners'],
          ['Company', 'Expanding to Mombasa'],
          ['Interviewer', 'A post about slow phones'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shop owners does the job ad mention?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why finish with notes rather than more reading?',
        options: [
          { text: 'Research only helps if it becomes things you can say in the interview' },
          { text: 'Reading is useless', why: 'It\'s useful when turned into notes.' },
          { text: 'To fill the hour', why: 'Notes are what you use.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Is it weird to mention the CTO\'s blog post? Like I\'m stalking her?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Not if it\'s her public work and it\'s relevant: "I read your post about slow phones; that\'s why I liked the app\'s light design." That\'s interest, not stalking.' },
          { text: 'Yes, never mention it.', why: 'Public, relevant work is fine to mention.' },
          { text: 'Mention her holiday photos too.', why: 'That\'s personal, not professional.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The notes.',
        template: 'Three [[1]], one "why us?" sentence, and three [[2]] to ask.',
        blanks: [['facts'], ['questions']],
        distractors: ['jokes', 'complaints'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Professional research, or too personal?',
        groups: ['Professional', 'Too personal'],
        items: [
          { text: 'The interviewer\'s public blog post', group: 0 },
          { text: 'Their family photos', group: 1 },
          { text: 'The company\'s funding news', group: 0 },
          { text: 'Where they live', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The app has no Swahili option. How could Remi use that?',
        options: [
          { text: 'As a thoughtful question: "Have you thought about Swahili for shop owners?"' },
          { text: 'To say the app is bad', why: 'Frame it as curiosity, not criticism.' },
          { text: 'Not at all', why: 'It\'s a good, specific talking point.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which block in Remi\'s plan wastes time?',
        lines: [
          'Use the app for 15 minutes.',
          'Read the job ad closely.',
          'Read every review on every app store for two hours.',
          'Write my notes.',
        ],
        bug: 2,
        fix: 'Look up the company for 10 minutes.',
        explanation: 'Two hours on reviews breaks the one-hour plan.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes are spent using the product?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Do the one-hour research plan for a company you\'re interested in. What were your three facts?',
    starters: ['Fact 1:...', 'My "why us?" sentence:...'],
  },
  deepen: {
    title: 'Use the product',
    summary: 'For consumer or business apps, using the product is the fastest research there is. It gives you real details, honest opinions and good questions.',
  },
  notes: 'Fictional: Mtaa Labs app (no Swahili option), 3,000 shop owners, first funding round, expanding to Mombasa; CTO Wanjiru\'s post on slow phones.',
};

export default lesson;
