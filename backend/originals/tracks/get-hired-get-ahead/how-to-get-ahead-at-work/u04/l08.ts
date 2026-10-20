import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 8 — exploring a possible direction with conversations and small experiments. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Explore before you decide',
  summary: '"Product" sounds exciting to Clinton, but he\'s never actually done it. Miracle says the cheapest way to find out is to talk to people who do, and try a small piece of the work.',
  minutes: 12,
  outcomes: ['Learn about a role through conversations', 'Try a small piece of the work safely', 'Decide what to do with what you learn'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to explore a direction',
      steps: [
        { title: '1. Talk to three people who do it', body: 'Aïcha, Njangi Pay\'s product manager; a product person Tchami knows; someone who moved from engineering to product. Same four-question chat as Level 2.' },
        { title: '2. Ask what the work is really like', body: '"What does a hard week look like?" "What do people misunderstand about the job?" Aïcha: "Half my time is saying no to good ideas."' },
        { title: '3. Try a small piece of the work', body: 'Clinton offers to write the user-research summary for the sync-service split. Two days of interviews with support and drivers.' },
        { title: '4. Notice how it feels', body: 'Energy audit again. The interviews: energy up. Writing the summary: up. Saying no to support\'s wish list: hard, but interesting.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Talk to three people. Ask what\'s hard. Try a small piece. Notice how it feels.',
    },
  ],
  apply: {
    scenario: 'Clinton explores product.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Talk to three people who do it', 'Ask what the work is really like', 'Try a small piece of the work', 'Notice how it feels'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Aïcha say about product work?',
        options: [
          { text: '"Half my time is saying no to good ideas."' },
          { text: '"It\'s all fun ideas."', why: 'Much of it is saying no.' },
          { text: '"It\'s just meetings."', why: 'It\'s saying no to good ideas.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe small experiment, or a big leap?',
        groups: ['Small experiment', 'Big leap'],
        items: [
          { text: 'Write one user-research summary', group: 0 },
          { text: 'Quit to become a product manager', group: 1 },
          { text: 'Sit in on a product planning meeting', group: 0 },
          { text: 'Sign up for an expensive MBA tomorrow', group: 1 },
          { text: 'Interview five drivers', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the question that won\'t reveal much.',
        lines: ['What does a hard week look like?', 'Is product cool?', 'What do people misunderstand about the job?'],
        bug: 1,
        explanation: 'Too vague. Ask about the hard parts.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s offer to Aïcha.',
        from: 'clinton',
        message: 'How do I ask Aïcha for a small piece of product work?',
        options: [
          { text: '"Could I write the user-research summary for the sync-service split? I\'d interview support and drivers, and you\'d review it."' },
          { text: '"Can I have your job?"', why: 'Offer a small piece.' },
          { text: '"Teach me everything."', why: 'Offer a specific task.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each experience to how it felt.',
        pairs: [
          ['Interviewing drivers', 'Energy up, lots of questions'],
          ['Writing the summary', 'Energy up, lost track of time'],
          ['Saying no to support\'s wish list', 'Hard, but interesting'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why try a small piece before deciding?',
        options: [
          { text: 'It shows what the work is really like, cheaply' },
          { text: 'To avoid deciding ever', why: 'To decide with real data.' },
          { text: 'It\'s required', why: 'It gives real data.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Ask what\'s [[1]]. Try a small [[2]].',
        blanks: [['hard'], ['piece']],
        distractors: ['easy', 'leap', 'title'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people should Clinton talk to? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good exploration habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Asking about the hard parts', group: 0 },
          { text: 'Only reading glamorous posts', group: 1 },
          { text: 'Noticing your energy', group: 0 },
          { text: 'Deciding before trying', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What role are you curious about? Who could you talk to, and what small piece could you try?',
    starters: ['I\'m curious about...', 'A small piece:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Book one conversation with someone in a role you\'re curious about. Ask: "What does a hard week look like?"',
  },
  notes: 'Aïcha is a named extra (product manager at Njangi Pay). Informational interviews reuse L2 Ch1. Small experiments foreshadow Ch5 (Ibarra, Working Identity, 2003).',
};

export default lesson;
