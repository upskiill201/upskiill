import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Step-by-step: how interviews work. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How interviews work',
  summary: 'Remi thought an interview was one conversation. Ada explains the usual stages, from the screen to the final round, and what each one is really checking.',
  minutes: 12,
  outcomes: [
    'Name the common stages of a hiring process',
    'Know what each stage is checking',
    'Prepare differently for each stage',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five common stages',
      steps: [
        { title: '1. Application', body: 'Your CV and form. Checking: do you meet the basic requirements?' },
        { title: '2. Screen', body: 'A short call, often with a recruiter. Checking: can you explain yourself clearly, and are you genuinely interested? Savanna Bank\'s call was this.' },
        { title: '3. Skills test or technical interview', body: 'A task, test or problem. Checking: can you actually do the work? Mtaa Labs will ask Remi to solve a coding problem.' },
        { title: '4. Final round', body: 'Panels, group exercises, senior people. Checking: how you think, work with others and fit the team. Synergix runs an assessment day.' },
        { title: '5. Offer and references', body: 'They check references and make an offer. You can ask questions and, sometimes, negotiate.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Each stage checks something different. Prepare for what that stage is checking.',
    },
  ],
  apply: {
    scenario: 'The stages.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five common stages.',
        lines: ['Application', 'Screen', 'Skills test or technical interview', 'Final round', 'Offer and references'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the stage to what it checks.',
        pairs: [
          ['Application', 'Basic requirements'],
          ['Screen', 'Clear and genuinely interested'],
          ['Technical interview', 'Can you do the work?'],
          ['Final round', 'How you think and work with others'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What was Savanna Bank\'s phone call?',
        options: [
          { text: 'A screen' },
          { text: 'A final round', why: 'It was the first call.' },
          { text: 'An offer', why: 'It was an early check.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which stage is this most likely?',
        groups: ['Screen', 'Technical', 'Final round'],
        items: [
          { text: 'A 20-minute call with a recruiter', group: 0 },
          { text: 'Solve a coding problem live', group: 1 },
          { text: 'A group exercise and a panel', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'So should I prepare the same way for all three?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No. Screens test clarity and interest. Mtaa Labs tests skills. Synergix tests how you think with others. Prepare for each.' },
          { text: 'Yes, same answers everywhere.', why: 'Each stage checks something different.' },
          { text: 'Don\'t prepare, just be yourself.', why: 'Be yourself, prepared.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Prepare for what that [[1]] is [[2]].',
        blanks: [['stage'], ['checking', 'testing']],
        distractors: ['company', 'wearing'],
      },
      {
        kind: 'mcq',
        prompt: 'What can you sometimes do at the offer stage?',
        options: [
          { text: 'Ask questions and negotiate' },
          { text: 'Nothing; just accept', why: 'Questions and negotiation are normal.' },
          { text: 'Ask for another interview', why: 'It\'s about the offer\'s terms.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s notes is wrong?',
        lines: [
          'Screen: be clear and show real interest.',
          'Technical: show I can do the work.',
          'Final round: only my grades matter now.',
          'Offer: ask questions.',
        ],
        bug: 2,
        fix: 'Final round: how I think and work with others.',
        explanation: 'By the final round, they\'re looking beyond grades.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many common stages are there in Ada\'s list?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Checked early or late in the process?',
        groups: ['Early', 'Late'],
        items: [
          { text: 'Meets basic requirements', group: 0 },
          { text: 'References', group: 1 },
          { text: 'Explains themselves clearly', group: 0 },
          { text: 'Fits the team', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a job you want, which stages do you think you\'ll face? Which worries you most?',
    starters: ['I\'ll probably face...', 'The one that worries me is...'],
  },
  deepen: {
    title: 'Every company differs',
    summary: 'Some companies skip stages; some add take-home tasks or several panels. It\'s fine to ask the recruiter: "What are the next steps, and what should I prepare?"',
  },
  notes: 'Typical hiring stages (application, screen, skills assessment, final round, offer/references) are common practice; details vary by employer.',
};

export default lesson;
