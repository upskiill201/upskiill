import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: the Lekki flat vs the Yaba upgrade. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Lekki or Yaba?',
  summary: 'The group chat wants sea views. Miracle runs the numbers on two flats: the Lekki dream and a bigger place near her current one in Yaba.',
  minutes: 11,
  outcomes: [
    'Compare a big upgrade to a planned one',
    'Work out what housing costs as a share of income',
    'Upgrade without losing the gap',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two flats, one raise',
      before: {
        label: 'The Lekki flat',
        text: 'Rent: ₦7,000,000 a year, up front, plus agency and legal fees\nPer month: about ₦583,000\nVs her current ₦200,000 a month: about ₦383,000 more\nThe whole raise and more, gone\nUp front cost: wipes out her emergency fund\nCommute: much longer to the office',
      },
      after: {
        label: 'The bigger Yaba flat',
        text: 'Rent: ₦3,000,000 a year\nPer month: ₦250,000\nVs her current ₦200,000: ₦50,000 more\nA real upgrade: a second room for working and guests\nPaid from the "now" half of the raise\nEmergency fund untouched, commute the same',
      },
      notes: [
        'Housing is usually the biggest cost. A big jump here is the fastest way to lose the gap.',
        'Paying a year up front from savings can empty an emergency fund in one day. Save the rent separately first.',
        'Miracle still upgrades. She just picks the upgrade her plan can carry.',
        'Sea views are lovely. They\'re not worth her dad\'s retirement plan or her own.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Upgrade housing with the "now" half, not with your whole raise or your emergency fund. Housing creep is the most expensive kind.',
    },
  ],
  apply: {
    scenario: 'Lekki vs Yaba.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦3,000,000 a year in rent. How much is that per month?',
        answers: ['250000', '250,000', '₦250,000', '₦250000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The Lekki flat costs about ₦383,000 more a month. Her raise is ₦250,000. What happens?',
        options: [
          { text: 'She saves more', why: 'It costs more than the raise.' },
          { text: 'Nothing changes', why: 'It takes more than the raise.' },
          { text: 'The whole raise is gone, and she\'d have to cut saving too' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lekki or Yaba?',
        groups: ['Lekki', 'Yaba'],
        items: [
          { text: 'Costs more than the whole raise', group: 0 },
          { text: 'Paid from the "now" half', group: 1 },
          { text: 'Empties the emergency fund', group: 0 },
          { text: 'A second room for working', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Yaba?! You\'re a lead now! Live like it!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Fine, Lekki.', why: 'Pressure isn\'t a plan.' },
          { text: 'I\'m living better than last year, with a second room. I\'m just not handing my whole raise to a landlord.' },
          { text: 'I can\'t afford anything.', why: 'She can; she\'s choosing.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Upgrade housing with the [[1]] half, not your whole [[2]].',
        blanks: [['"now"', 'now'], ['raise']],
        distractors: ['future', 'pension'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each flat to its monthly rent.',
        pairs: [
          ['Current Yaba flat', '₦200,000'],
          ['Bigger Yaba flat', '₦250,000'],
          ['Lekki flat', 'About ₦583,000'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step of a move plan is risky?',
        lines: [
          'Choose a flat the "now" half can carry.',
          'Save the rent separately before moving.',
          'Pay the year up front from the emergency fund.',
        ],
        bug: 2,
        fix: 'Save the rent in its own pot first.',
        explanation: 'An emptied emergency fund leaves her one shock from debt.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is housing creep "the most expensive kind"?',
        options: [
          { text: 'Housing is usually the biggest cost, and it\'s hard to undo quickly' },
          { text: 'It isn\'t', why: 'It\'s the biggest line in most budgets.' },
          { text: 'Landlords are greedy', why: 'It\'s about the share of income.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At the bigger Yaba flat, what share of ₦1,250,000 is ₦250,000 rent? (In percent.)',
        answers: ['20', '20%'],
        placeholder: 'A percent',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a sensible housing upgrade.',
        lines: ['Decide the most the "now" half can carry', 'Look at flats in that range', 'Save the rent in its own pot', 'Move'],
      },
    ],
  },
  reflect: {
    prompt: 'What share of your income goes on housing? Is there a pressure in your life to upgrade it?',
    starters: ['About...', 'The pressure comes from...'],
  },
  deepen: {
    title: 'Paying rent up front',
    summary: 'In many cities, including Lagos, landlords often ask for a year or more of rent up front. Treat it like any big known cost: save towards it monthly in a separate pot, so it never comes from your emergency fund.',
  },
  notes: '7,000,000/12 ≈ 583,333; 3,000,000/12 = 250,000; 250,000/1,250,000 = 20%. Bisi per CAST. Illustrative rents.',
};

export default lesson;
