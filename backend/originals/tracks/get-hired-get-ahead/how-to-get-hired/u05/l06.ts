import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 6 — reading the offer letter line by line. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Read the letter',
  summary: 'Njangi Pay\'s offer letter has six lines that matter. Clinton almost skipped four of them. Tap each one to see what it really means for him.',
  minutes: 11,
  outcomes: ['Read each line of an offer letter', 'Spot lines worth a question', 'Know what to clarify before you negotiate'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of the offer',
      text: 'Role: Graduate Developer, Offline Team, reporting to Ngozi Bate.\nSalary: 300,000 XAF per month, before tax and social contributions.\nContract: permanent, with a six-month probation period.\nBenefits: transport allowance; health cover after probation.\nReview: salary reviewed annually.\nStart: two weeks after graduation. Please reply by Friday.',
      hotspots: [
        { phrase: 'reporting to Ngozi Bate', note: 'Who you\'ll learn from every day. Clinton met her on Monday and liked how direct she was. That\'s worth a lot.' },
        { phrase: 'before tax and social contributions', note: 'Gross, not take-home. Ask someone local what that means in actual money each month.' },
        { phrase: 'six-month probation period', note: 'A trial period. Ask what notice applies during it, and what happens at the end.' },
        { phrase: 'health cover after probation', note: 'Not from day one. Worth knowing, and possibly worth asking about.' },
        { phrase: 'salary reviewed annually', note: 'A year is a long wait. An earlier review, after probation, is a reasonable thing to ask for.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Read every line. Note what to clarify (take-home pay, probation terms) and what you might ask for (an earlier review).',
    },
  ],
  apply: {
    scenario: 'Clinton reads the offer letter.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Something to clarify, or something to ask for?',
        groups: ['Clarify', 'Ask for'],
        items: [
          { text: 'What take-home pay will be', group: 0 },
          { text: 'A review after probation', group: 1 },
          { text: 'Notice during probation', group: 0 },
          { text: 'Health cover from day one', group: 1 },
          { text: 'What happens at the end of probation', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "before tax and social contributions" mean?',
        options: [
          { text: 'He gets extra money', why: 'The opposite: deductions come off.' },
          { text: 'It\'s gross pay; take-home will be less' },
          { text: 'No tax at all', why: 'Tax and contributions are deducted.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it means.',
        pairs: [
          ['Reporting to Ngozi', 'Who he\'ll learn from'],
          ['Six-month probation', 'A trial period'],
          ['Reviewed annually', 'A year until a pay change'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best question for Brenda.',
        from: 'clinton',
        message: 'What should I clarify before I negotiate?',
        options: [
          { text: '"Why is it so low?"', why: 'Clarify first, calmly.' },
          { text: 'Nothing, just negotiate.', why: 'Understand the offer first.' },
          { text: '"Could you tell me how probation works, and roughly what take-home would be?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Clinton almost misread.',
        lines: ['Reporting to Ngozi Bate.', '300,000 is what I\'ll take home each month.', 'Start two weeks after graduation.'],
        bug: 1,
        explanation: 'It\'s before tax and contributions. Take-home is less.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s reading steps in order.',
        lines: ['Read every line', 'Note what to clarify', 'Note what to ask for', 'Ask the clarifying questions first'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which ask is most reasonable for Clinton?',
        options: [
          { text: 'A salary review after probation, instead of after a year' },
          { text: 'Double the salary', why: 'Not grounded in his research.' },
          { text: 'A company car', why: 'Not realistic for a graduate role.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] first, then [[2]].',
        blanks: [['Clarify'], ['negotiate', 'ask']],
        distractors: ['Sign', 'argue', 'accept'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does XAF stand for? CFA ___. (one word)',
        answers: ['franc', 'francs'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth a question, or clear already?',
        groups: ['Worth a question', 'Clear'],
        items: [
          { text: 'Take-home pay', group: 0 },
          { text: 'Who he reports to', group: 1 },
          { text: 'Probation notice', group: 0 },
          { text: 'Reply by Friday', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at any contract or agreement you\'ve signed (a phone plan, a lease, a job). Is there a line you never really understood?',
    starters: ['I never understood...', 'I could ask...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Find out roughly what is deducted from salaries where you live (tax, social contributions), so you can estimate take-home pay from any offer.',
  },
  notes: 'XAF = Central African CFA franc, used in Cameroon. Probation, deductions and health cover terms are story details; check local rules.',
};

export default lesson;
