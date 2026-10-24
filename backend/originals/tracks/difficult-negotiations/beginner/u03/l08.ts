import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Explain cards: a change-request process. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'A change-request process',
  summary: 'Arjun doesn\'t want to negotiate every tweak from scratch. Kavya designs a one-page change request that both sides agree to before the project starts.',
  minutes: 12,
  outcomes: [
    'Use a simple change-request form',
    'Agree a day rate for changes in advance',
    'Keep a running log both sides can see',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Kavya\'s change request: one form for every addition after the scope is signed.</p><table><tr><th>Field</th><th>Example</th></tr><tr><td>What</td><td>Show last month\'s points on the home screen</td></tr><tr><td>Why</td><td>Customers keep asking at the till</td></tr><tr><td>Time</td><td>1 day</td></tr><tr><td>Cost</td><td>£450 (the agreed change rate of £450 a day)</td></tr><tr><td>Effect on date</td><td>None if approved this week</td></tr><tr><td>Approved by</td><td>Ms Okafor-Lane, by email</td></tr></table><p>Three rules make it work:</p><ul><li><strong>Agree the change rate in the contract</strong>, so nobody haggles over each change.</li><li><strong>Nothing starts before approval.</strong> A request isn\'t a change until it\'s approved.</li><li><strong>A shared log</strong> of every change, so both sides see the total.</li></ul><p>The process makes saying yes easy, because every yes is priced.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Agree a change rate up front. Then every new request gets a form: what, why, time, cost, effect on the date, approval.',
    },
  ],
  apply: {
    scenario: 'The change form.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the fields on the change form.',
        lines: ['What', 'Why', 'Time', 'Cost', 'Effect on date', 'Approved by'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A change takes 3 days at £450 a day. Cost, in pounds?',
        answers: ['1350', '1,350', '£1,350'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why agree the change rate in the contract?',
        options: [
          { text: 'To charge more later', why: 'It\'s about avoiding repeated haggling.' },
          { text: 'It\'s not needed', why: 'It saves arguments.' },
          { text: 'So nobody has to haggle over the price of each change' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Follows the process, or breaks it?',
        groups: ['Follows', 'Breaks'],
        items: [
          { text: 'Starting work after email approval', group: 0 },
          { text: 'Building it first, asking later', group: 1 },
          { text: 'Adding it to the shared log', group: 0 },
          { text: 'A quick yes on WhatsApp, no cost', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Won\'t a form feel bureaucratic to the client?',
        prompt: "Kavya's best reply?",
        options: [
          { text: 'It\'s one short email. Clients like knowing the cost before they commit. It saves them surprises.' },
          { text: 'Yes, skip it.', why: 'Then changes go unpriced.' },
          { text: 'Make it ten pages.', why: 'Keep it short.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key rule.',
        template: 'A request isn\'t a [[1]] until it\'s [[2]].',
        blanks: [['change'], ['approved']],
        distractors: ['problem', 'forgotten'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to what it prevents.',
        pairs: [
          ['Agreed change rate', 'Haggling over every change'],
          ['Approval before work', 'Unpaid surprise work'],
          ['Shared log', 'Arguments about the total'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include "effect on date"?',
        options: [
          { text: 'To scare them', why: 'It\'s honest information.' },
          { text: 'It\'s optional decoration', why: 'Dates matter as much as cost.' },
          { text: 'Changes can push the launch; the client should see that before approving' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this change request is missing something?',
        lines: [
          'What: show last month\'s points.',
          'Time: 1 day. Cost: £450.',
          'Effect on date: none.',
          'Approved by: (we\'ll start anyway).',
        ],
        bug: 3,
        fix: 'Approved by: Ms Okafor-Lane, before work starts.',
        explanation: 'Nothing starts before approval.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the agreed change rate per day, in pounds?',
        answers: ['450', '£450'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Design a three-line change process for something you do: what you\'d need to know before saying yes to extras.',
    starters: ['Before any extra, I need...'],
  },
  deepen: {
    title: 'Change control',
    summary: 'Formal projects call this change control. Even freelancers benefit from a light version: a day rate for extras and approval in writing before starting.',
  },
  notes: 'Change control: standard project-management practice (PMI PMBOK). Fictional change rate £450/day.',
};

export default lesson;
