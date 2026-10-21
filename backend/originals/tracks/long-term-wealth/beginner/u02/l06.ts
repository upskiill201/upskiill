import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Before/After: saving by hand vs automatic. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'By hand vs automatic',
  summary: 'Miracle\'s old system: 13%, by hand, when she remembered. Her new one: 20%, automatic, on payday. Same person, same salary. Side by side, over a year.',
  minutes: 11,
  outcomes: [
    'Compare saving by hand with saving automatically',
    'See how small "missed months" add up',
    'Set up long-term saving that runs on its own',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'A year of saving, two ways',
      before: {
        label: 'Old system: by hand',
        text: 'Plan: 13% (₦120,000) "when I remember"\nMonths she remembered: 8 of 12\nMonths she moved less "just this once": 3\nSaved in the year: about ₦850,000\nWhere: one savings account, mixed with emergency money\nLong-term investing: none',
      },
      after: {
        label: 'New system: automatic',
        text: 'Plan: 20% (₦180,000) on payday, every month\nMonths missed: 0\nSplit: ₦50,000 extra pension, ₦130,000 long-term pot\nSaved in the year: ₦2,160,000\nEmergency fund: separate, full at 3 months\nDecisions needed each month: none',
      },
      notes: [
        'The amount went up, but the bigger change is reliability: 12 months out of 12.',
        'By hand, every month is a vote that "now" can win. Automatic means no vote.',
        'Separate pots stop long-term money being used for emergencies.',
        'Over a year, the gap is more than ₦1.3 million, before any growth.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Automate long-term saving on payday into separate pots. Reliability beats good intentions.',
    },
  ],
  apply: {
    scenario: 'A year, two ways.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦180,000 a month for 12 months. How much saved?',
        answers: ['2160000', '2,160,000', '₦2,160,000', '₦2160000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Old system: about ₦850,000. New: ₦2,160,000. What\'s the gap?',
        options: [
          { text: 'About ₦1,310,000' },
          { text: 'About ₦850,000', why: 'That\'s the old total.' },
          { text: 'About ₦2,160,000', why: 'That\'s the new total.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Old system or new?',
        groups: ['Old', 'New'],
        items: [
          { text: 'Saves when she remembers', group: 0 },
          { text: 'Moves on payday automatically', group: 1 },
          { text: 'Long-term money mixed with emergency money', group: 0 },
          { text: 'Separate named pots', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the new ₦180,000 to its pot.',
        pairs: [
          ['₦50,000', 'Extra pension contribution'],
          ['₦130,000', 'Long-term pot'],
          ['₦0 a month (already full)', 'Emergency fund'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'I remember to save most months. Isn\'t that good enough?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Most months isn\'t every month. I missed four last year. Automatic doesn\'t forget, and you\'ll never notice it leaving.' },
          { text: 'Yes, that\'s fine.', why: 'Missed months add up.' },
          { text: 'Stop saving.', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: '[[1]] beats good [[2]].',
        blanks: [['Reliability'], ['intentions']],
        distractors: ['Luck', 'salaries'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this set-up weakens it?',
        lines: [
          'Transfer on payday.',
          'Separate long-term pot.',
          'I\'ll pause it whenever money feels tight.',
        ],
        bug: 2,
        fix: 'Pause only for a real emergency, and restart the next month.',
        explanation: '"Whenever money feels tight" brings back the monthly vote.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Old plan ₦120,000 × 12 would be ₦1,440,000. She actually saved about ₦850,000. How much did forgetting and "just this once" cost?',
        answers: ['590000', '590,000', '₦590,000', '₦590000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the emergency fund separate from long-term money?',
        options: [
          { text: 'So long-term money isn\'t used for emergencies or everyday shortfalls' },
          { text: 'Banks require it', why: 'It\'s for protection.' },
          { text: 'No reason', why: 'Mixing them is how long-term money disappears.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s payday.',
        lines: ['Salary arrives', 'Pension contributions taken by payroll', 'Extra pension transfer', 'Long-term pot transfer', 'Spend the rest'],
      },
    ],
  },
  reflect: {
    prompt: 'How many months last year did you save what you meant to? What would automatic saving change?',
    starters: ['I saved in... months', 'Automatic would...'],
  },
  deepen: {
    title: 'Set it and check it',
    summary: 'Automatic doesn\'t mean forgotten. Check twice a year that transfers are running and pots are where you expect. Miracle\'s pension shows why.',
  },
  notes: 'Running numbers: new system 180,000/month = 50,000 voluntary pension + 130,000 long-term pot. Old system (fictional) ~850,000/yr.',
};

export default lesson;
