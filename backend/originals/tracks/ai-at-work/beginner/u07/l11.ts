import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 11 — budgets and simple costs. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Budgets and simple costs',
  summary: 'Carmen will ask: "What did the pilot cost per shop?" Ada builds a simple cost table with AI\'s help, and checks every line.',
  minutes: 12,
  outcomes: [
    'Build a simple cost table',
    'Work out cost per unit',
    'Spot missing costs with AI\'s help',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A simple cost table in five steps',
      steps: [
        { title: '1. List every cost', body: 'Flyers, banner, Tolu\'s travel, the bank\'s manual settlement fee, support phone credit.' },
        { title: '2. Ask AI what\'s missing', body: '"Here are the costs of a 3-month market pilot. What costs are commonly forgotten?" (Staff time? Phones? Refunds?)' },
        { title: '3. One row per cost, one column per month', body: 'Then a total column. Use SUM formulas, not typed totals.' },
        { title: '4. Divide by what matters', body: 'Total cost / 50 shops = cost per shop. Total cost / payments = cost per payment.' },
        { title: '5. Label estimates', body: 'Mark anything not yet invoiced as "estimate". Carmen needs to know which numbers are firm.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'List every cost, ask AI what\'s usually forgotten, total with formulas, divide by the unit that matters, and label estimates.',
    },
  ],
  apply: {
    scenario: 'Ada builds the pilot cost table.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['List every cost', 'Ask AI what\'s missing', 'Build the table with formulas', 'Divide by the unit', 'Label estimates'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The pilot cost 15,000 GHS for 50 shops. What\'s the cost per shop?',
        answers: ['300', '300 GHS'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Often-forgotten cost, or obvious one?',
        groups: ['Often forgotten', 'Obvious'],
        items: [
          { text: 'Staff time', group: 0 },
          { text: 'Printing flyers', group: 1 },
          { text: 'Refunds to shops', group: 0 },
          { text: 'The banner', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best finds missing costs?',
        options: [
          { text: 'Is my budget OK?', why: 'Invites "yes".' },
          { text: 'Here are the costs of a 3-month market payments pilot. What costs are commonly forgotten in pilots like this?' },
          { text: 'Make my budget smaller.', why: 'Not the question.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why use SUM formulas instead of typing totals?',
        options: [
          { text: 'Formulas update when a cost changes; typed totals go stale' },
          { text: 'They look better', why: 'They stay correct.' },
          { text: 'No difference', why: 'Typed totals don\'t update.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Is the 300 GHS per shop final?',
        prompt: 'The bank fee isn\'t invoiced yet. Best reply?',
        options: [
          { text: 'Nearly: the bank fee is an estimate until their invoice arrives, so it could be 280-320 per shop.' },
          { text: 'Yes, final.', why: 'Part of it is an estimate.' },
          { text: 'I don\'t know.', why: 'She knows which part is firm.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Divide by the [[1]] that matters, and label [[2]].',
        blanks: [['unit'], ['estimates']],
        distractors: ['colour', 'jokes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the cost table is a problem?',
        lines: [
          'Flyers: 600 GHS (invoiced)',
          'Banner: 400 GHS (invoiced)',
          'Bank settlement fee: 4,000 GHS',
          'Total: =SUM(B2:B4)',
        ],
        bug: 2,
        fix: 'Bank settlement fee: 4,000 GHS (estimate)',
        explanation: 'Not invoiced yet, so it must be labelled as an estimate.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the division.',
        pairs: [
          ['Cost per shop', 'Total cost / 50'],
          ['Cost per payment', 'Total cost / number of payments'],
          ['Cost per month', 'Total cost / 3'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '15,000 GHS total over 3 months. Cost per month?',
        answers: ['5000', '5,000'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s label for unconfirmed costs.',
        tiles: ['Estimate:', 'not', 'yet', 'invoiced'],
        distractors: ['final'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Firm number, or estimate?',
        groups: ['Firm', 'Estimate'],
        items: [
          { text: 'Invoiced flyer cost', group: 0 },
          { text: 'Next month\'s phone credit', group: 1 },
          { text: 'Paid banner cost', group: 0 },
          { text: 'Bank fee before the invoice', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a project you\'re on, what\'s the "cost per" number that matters most? Do you know it?',
    starters: ['Cost per...', 'Roughly:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI what costs are usually forgotten for a project like yours. Add any you missed.' },
  notes: 'Figures fictional.',
};

export default lesson;
