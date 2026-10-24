import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 7 — turning "not yet" into a plan with dates. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'From "not yet" to "by when"',
  summary: 'Ngozi says, "Let\'s revisit it in a few months." Clinton nods. Later, Tey asks him a question he can\'t answer: "Revisit it when, exactly? And against what?"',
  minutes: 11,
  outcomes: ['Agree a date to revisit a promotion', 'Agree what success looks like', 'Write it down together'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: '"Let\'s revisit it in a few months" sounds fine, but it\'s vague. A few months can quietly become a year. What would make it clearer?',
          replies: ['A date', 'I don\'t know'],
        },
        {
          tey: 'Three things: a date, the specific things she needs to see, and how you\'ll check progress. For example: "Let\'s review on 1 March. By then: I\'ve led the retry-service project with Kemi and written its design doc. We\'ll check in monthly."',
          replies: ['Won\'t that feel pushy?'],
        },
        {
          tey: 'Most managers find it helpful, as long as it\'s framed as a plan, not a contract. "To make sure I focus on the right things, could we agree what you\'d want to see, and when we\'ll look again?"',
          replies: ['And if she can\'t promise?'],
        },
        {
          tey: 'She probably can\'t promise a promotion; budgets and cycles matter. But she can agree what she\'d want to see and when you\'ll talk again. That\'s enough. Write it down and send her a short summary.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Turn "revisit later" into a date, specific evidence, and check-ins. Frame it as a plan, then write it down.',
    },
  ],
  apply: {
    scenario: 'Clinton turns "not yet" into a plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "Let\'s revisit it in a few months" risky?',
        options: [
          { text: 'It\'s rude', why: 'It\'s vague.' },
          { text: 'It\'s vague, and can quietly become a year' },
          { text: 'It\'s not risky', why: 'Vague plans drift.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the plan in order.',
        lines: ['A date to review', 'What she\'d need to see', 'How you\'ll check progress', 'Write it down and send a summary'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear plan, or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: 'Review on 1 March', group: 0 },
          { text: 'Some time later', group: 1 },
          { text: 'Lead the retry-service project with Kemi', group: 0 },
          { text: 'Do more stuff', group: 1 },
          { text: 'Monthly check-ins', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best line to Ngozi.',
        from: 'clinton',
        message: 'How do I ask for a clear plan without sounding pushy?',
        options: [
          { text: '"Promise me a promotion by March."', why: 'Ask for a plan, not a promise.' },
          { text: 'Say nothing.', why: 'Ask, framed as a plan.' },
          { text: '"To make sure I focus on the right things, could we agree what you\'d want to see, and when we\'ll look again?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unrealistic ask.',
        lines: ['Agree a review date.', 'Get a guaranteed promotion in writing.', 'Agree what she\'d want to see.'],
        bug: 1,
        explanation: 'She probably can\'t guarantee it. A plan is enough.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each plan part to Clinton\'s version.',
        pairs: [
          ['Date', '1 March'],
          ['Evidence', 'Lead the retry-service project'],
          ['Check-ins', 'Monthly'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why might Ngozi not promise a promotion?',
        options: [
          { text: 'Budgets and promotion cycles may not be in her control' },
          { text: 'She doesn\'t like him', why: 'It\'s about budgets and cycles.' },
          { text: 'Promises are illegal', why: 'It\'s about budgets and cycles.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'A [[1]], specific evidence, and check-ins. Frame it as a [[2]].',
        blanks: [['date'], ['plan']],
        distractors: ['threat', 'contract', 'guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How often will Clinton and Ngozi check progress? (one word)',
        answers: ['monthly'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Something a manager can usually agree to, or usually can\'t?',
        groups: ['Usually can', 'Usually can\'t'],
        items: [
          { text: 'A review date', group: 0 },
          { text: 'A guaranteed promotion', group: 1 },
          { text: 'What she\'d want to see', group: 0 },
          { text: 'A fixed raise amount months ahead', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a vague "later" in your life (a raise, a role, a project) that needs a date and criteria?',
    starters: ['The vague "later" is...', 'I could ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a three-line plan summary you could send after any "not yet": date, evidence, check-ins.',
  },
  notes: 'Common management advice; dates are story details.',
};

export default lesson;
