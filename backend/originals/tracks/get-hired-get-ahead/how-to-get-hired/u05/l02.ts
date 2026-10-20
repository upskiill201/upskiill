import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 2 — what's in a job offer, and what to check locally. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What\'s in an offer',
  summary: 'Brenda\'s email arrives with a two-page letter. Clinton reads the salary line and nothing else. Miracle makes him read every line, because the salary is only one part of what he\'s being offered.',
  minutes: 12,
  outcomes: ['List the main parts of a job offer', 'Know which parts to check locally', 'Compare offers on more than salary'],
  learn: [
    {
      kind: 'reading',
      title: 'More than a number',
      html:
        '<p>A job offer usually covers more than salary. The main parts:</p>' +
        '<ul><li><strong>Pay</strong>: the base salary, how often it\'s paid, and whether it\'s before or after tax and deductions.</li>' +
        '<li><strong>Benefits</strong>: health cover, transport or meal allowances, pension or social security contributions, paid leave.</li>' +
        '<li><strong>Contract</strong>: permanent or fixed-term, the probation period, and the notice period on each side.</li>' +
        '<li><strong>The work</strong>: job title, team, manager, hours, location or remote days.</li>' +
        '<li><strong>Growth</strong>: training budget, mentoring, when your first salary review happens.</li>' +
        '<li><strong>Dates</strong>: start date, and the deadline to reply.</li></ul>' +
        '<p><strong>Check locally.</strong> What\'s normal (and what\'s legally required) for contracts, probation, notice, tax and social contributions depends on your country. A careers office, a trusted person in the industry, or your country\'s labour office can explain what an offer means.</p>' +
        '<p>When you compare offers, compare the <strong>whole offer</strong>. 300,000 francs with good mentoring and a six-month review may be better for a first job than slightly more with none.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pay, benefits, contract, the work, growth, dates. Read every line, and check local rules.',
    },
  ],
  apply: {
    scenario: 'Clinton reads his offer letter.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which part of the offer?',
        groups: ['Contract', 'Growth'],
        items: [
          { text: 'Probation period', group: 0 },
          { text: 'Training budget', group: 1 },
          { text: 'Notice period', group: 0 },
          { text: 'First salary review date', group: 1 },
          { text: 'Permanent or fixed-term', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why read every line, not just the salary?',
        options: [
          { text: 'The rest (benefits, contract, growth) can matter as much' },
          { text: 'To look busy', why: 'The other parts change what the offer is worth.' },
          { text: 'There\'s no reason', why: 'Probation, notice and growth all matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to an example.',
        pairs: [
          ['Benefits', 'A transport allowance'],
          ['The work', 'Offline team, reports to Ngozi'],
          ['Dates', 'Start two weeks after graduation'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I don\'t understand what "probation: six months" means for me. Who do I ask?',
        options: [
          { text: 'Brenda, and Mrs Ewane or someone in the industry who knows the local rules.' },
          { text: 'Nobody, just sign.', why: 'Ask. It matters.' },
          { text: 'Guess.', why: 'Ask someone who knows the local rules.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s mistake.',
        lines: ['Read the salary line.', 'Skipped the rest because it looked boring.', 'Checked the start date.'],
        bug: 1,
        explanation: 'The "boring" parts include probation, notice and growth.',
      },
      {
        kind: 'mcq',
        prompt: 'Who can explain what\'s legally normal where you live?',
        options: [
          { text: 'A careers office, a trusted person in the industry, or the labour office' },
          { text: 'A random comment online', why: 'Use reliable local sources.' },
          { text: 'Nobody', why: 'Local sources can help.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is better for a first job, all else equal?',
        options: [
          { text: 'Slightly less pay, with real mentoring and an early review' },
          { text: 'Always the highest number, nothing else matters', why: 'Growth matters a lot early on.' },
          { text: 'The longest job title', why: 'Compare the whole offer.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Compare the [[1]] offer. Check [[2]] rules.',
        blanks: [['whole'], ['local']],
        distractors: ['salary', 'foreign', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many months is the probation in Clinton\'s offer? (a number)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a job offer, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'Notice period', group: 0 },
          { text: 'The CEO\'s weekend plans', group: 1 },
          { text: 'Paid leave', group: 0 },
          { text: 'Start date', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Apart from salary, which part of an offer would matter most to you right now? Why?',
    starters: ['For me, it\'s...', 'Because...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Find out what probation and notice periods are normal in your country and field. Ask your careers office or someone who works there.',
  },
  notes: 'Kept general (playbook §9): contract types, probation, notice, tax and social contributions differ by country. Six-month probation is a story detail.',
};

export default lesson;
