import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Before/After: a vague yes vs a written one. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'A vague yes vs a written one',
  summary: 'Tobi agrees: "₦420,000 now, and we\'ll look at more in a few months." Ada is about to say thanks and go. Lucía\'s rule: if it isn\'t written, it didn\'t happen.',
  minutes: 12,
  outcomes: [
    'Turn a spoken agreement into a clear written one',
    'Include numbers, dates and conditions',
    'Write a friendly summary email',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Spoken and vague vs written and clear',
      before: {
        label: 'Vague',
        text: '"₦420,000 now, and we\'ll look at more in a few months."\nWhen is "a few months"?\nHow much is "more"?\nWhat does Ada have to do?\nIn three months, they\'ll remember it differently.',
      },
      after: {
        label: 'Written',
        text: 'Hi Tobi, thanks for today. To confirm what we agreed:\n- ₦420,000 a month from 1 November.\n- Review on 1 February: ₦480,000 a month once the design system v1 is shipped and the new onboarding flow is live.\n- ₦150,000 for a design course this quarter.\nDoes this match your notes?',
      },
      notes: [
        'Numbers, dates and conditions, all in one short message.',
        '"Does this match your notes?" invites him to confirm, not argue.',
        'Send it the same day, while you both remember.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'After any agreement, send a short summary the same day: numbers, dates, conditions, and "Does this match your notes?"',
    },
  ],
  apply: {
    scenario: 'The summary email.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Clear or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: '₦420,000 from 1 November', group: 0 },
          { text: '"More in a few months"', group: 1 },
          { text: 'Review on 1 February', group: 0 },
          { text: '"We\'ll see how it goes"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why end with "Does this match your notes?"',
        options: [
          { text: 'It invites him to confirm or correct, in a friendly way' },
          { text: 'It\'s just polite filler', why: 'It turns the email into a confirmed agreement.' },
          { text: 'It reopens the negotiation', why: 'It checks, rather than reopens.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague phrase to its clear version.',
        pairs: [
          ['"Now"', 'From 1 November'],
          ['"A few months"', 'On 1 February'],
          ['"More"', '₦480,000 a month'],
          ['"If things go well"', 'Design system and onboarding done'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'From ₦420,000 to ₦480,000 at the review. How much more a month, in naira?',
        answers: ['60000', '60,000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Won\'t an email look like I don\'t trust him?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'It looks organised. Managers forget, budgets change, people move. A summary protects both of you.' },
          { text: 'Yes, don\'t send it.', why: 'Then "a few months" becomes never.' },
          { text: 'Send it to the whole company.', why: 'Just Tobi is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What a summary needs.',
        template: 'Numbers, [[1]] and [[2]].',
        blanks: [['dates'], ['conditions']],
        distractors: ['feelings', 'emojis'],
      },
      {
        kind: 'mcq',
        prompt: 'When should Ada send the summary?',
        options: [
          { text: 'The same day' },
          { text: 'Next month', why: 'Memories fade fast.' },
          { text: 'Only if something goes wrong', why: 'Then it\'s too late.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s draft summary is still vague?',
        lines: [
          '₦420,000 a month from 1 November.',
          'Review on 1 February.',
          'A raise "if things go well".',
          '₦150,000 course budget this quarter.',
        ],
        bug: 2,
        fix: '₦480,000 once the design system and onboarding flow are done.',
        explanation: '"Well" means different things to each of them.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the course budget in the summary, in naira?',
        answers: ['150000', '150,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the summary email.',
        lines: ['Thank him', 'List the numbers and dates', 'State the conditions', 'Ask if it matches his notes'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a verbal agreement you\'ve made. Write the summary message you should have sent.',
    starters: ['To confirm what we agreed:...'],
  },
  deepen: {
    title: 'Memory and agreements',
    summary: 'People remember conversations in ways that suit them, without lying. A same-day written summary is the simplest way to make sure both sides remember the same deal.',
  },
  notes: 'Fictional agreement: ₦420,000 from 1 November; review 1 February to ₦480,000 on two conditions; ₦150,000 course budget.',
};

export default lesson;
