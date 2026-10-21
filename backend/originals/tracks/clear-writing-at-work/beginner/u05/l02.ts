import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: bad news in five steps. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Bad news in five steps',
  summary: 'Zanele writes the week 9 email to Mr Kamau. Five steps keep it short, honest and calm.',
  minutes: 12,
  outcomes: [
    'Write bad news in a clear order',
    'Own the problem without drama',
    'End with a plan and a next update',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps for bad news',
      steps: [
        { title: '1. Say the news in the subject and first line', body: '"Saturday pilot, week 9: late deliveries rose to 28%." No warm-up paragraph.' },
        { title: '2. Give the cause in one sentence', body: '"Two Saturday drivers left for a courier firm, so Saturday ran short."' },
        { title: '3. Say what it means', body: '"The pilot average is still 22%. The rollout plan doesn\'t change, but driver supply is now the main risk."' },
        { title: '4. Say what you\'re doing', body: '"Mrs Mwangi is offering Saturdays to the 9 drivers who didn\'t sign up. Two agency drivers cover until then."' },
        { title: '5. Say when they\'ll hear next', body: '"I\'ll send week 10 next Tuesday." Then stop. No long apology, no blame.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bad news: the news, the cause, what it means, what you\'re doing, when they\'ll hear next.',
    },
  ],
  apply: {
    scenario: 'The week 9 email.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['The news, first', 'The cause', 'What it means', 'What you\'re doing', 'When they\'ll hear next'],
      },
      {
        kind: 'mcq',
        prompt: 'What should the subject line of a bad-news email do?',
        options: [
          { text: 'State the news' },
          { text: 'Hide it: "Quick update"', why: 'He should know before opening.' },
          { text: 'Say "URGENT!!!"', why: 'State the news calmly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the email, or leave it out?',
        groups: ['Include', 'Leave out'],
        items: [
          { text: 'Two drivers left for a courier firm', group: 0 },
          { text: 'A paragraph blaming the drivers', group: 1 },
          { text: 'Agency drivers cover until then', group: 0 },
          { text: 'Three paragraphs of apology', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many drivers didn\'t sign up for Saturdays at first?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Zanele\'s line.',
        pairs: [
          ['The cause', '"Two drivers left for a courier firm"'],
          ['What it means', '"Driver supply is now the main risk"'],
          ['What you\'re doing', '"Two agency drivers cover until then"'],
          ['Next update', '"Week 10 next Tuesday"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Shouldn\'t we apologise properly? A full paragraph at least.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'One line owning it is enough. A long apology makes it about us; he needs the plan.' },
          { text: 'Yes, a full page of apology.', why: 'It buries the plan.' },
          { text: 'Never apologise.', why: 'One line is right.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 5.',
        template: 'Say when they\'ll [[1]] next. Then [[2]].',
        blanks: [['hear'], ['stop']],
        distractors: ['pay', 'apologise'],
      },
      {
        kind: 'mcq',
        prompt: 'What is the pilot average after week 9?',
        options: [
          { text: '22%' },
          { text: '28%', why: 'That\'s week 9 alone.' },
          { text: '34%', why: 'That was March, before the pilot.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the five steps?',
        lines: [
          'Subject: Saturday pilot, week 9: late deliveries rose to 28%',
          'Two Saturday drivers left for a courier firm.',
          'Honestly, the drivers let us all down badly.',
          'I\'ll send week 10 next Tuesday.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Blame adds heat and no information.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many agency drivers cover until the new drivers start?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite a piece of bad news you once sent using the five steps.',
    starters: ['The news:...', 'What I\'m doing:...'],
  },
  deepen: {
    title: 'Calm is a skill',
    summary: 'A calm bad-news email tells the reader the problem is in hand. Panic, blame and long apologies tell them the opposite, whatever the words say.',
  },
  notes: 'Bad-news structure: common business-writing practice (news, cause, impact, action, next update). Fictional: pilot average 22% after week 9; 9 drivers didn\'t sign up (40 minus 31).',
};

export default lesson;
