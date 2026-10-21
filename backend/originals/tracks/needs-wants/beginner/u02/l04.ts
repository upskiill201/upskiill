import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Chat with Tey: need it, or need it now? */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Need it, or need it now?',
  summary: 'Ada\'s laptop is three years old and getting slow. A designer needs a good laptop. But does she need a new one this month, or in a year? Tey explains the difference between a need and a need now.',
  minutes: 11,
  outcomes: [
    'Separate "need" from "need now"',
    'Plan for future needs instead of buying early',
    'Spot when "need now" is really impatience',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada: "My laptop is slow. I\'m a designer. I need a new one." Is that a need?', replies: ['Yes, for her job.'] },
        { tey: 'A working laptop is a must-have for a designer. But is it a need now? Her laptop still runs her design software. It takes 20 seconds longer to export. Annoying, not broken.', replies: ['So it\'s a later need?'] },
        { tey: 'Exactly. A "later need". It\'s real, it\'s coming, but not this month. Buying it now would cost about ₦900,000: the whole Mexico City fund.', replies: ['What should she do instead?'] },
        { tey: 'Two things. First, a cheap fix now: Ngozi\'s cousin can clean it and add memory for about ₦40,000. That might buy her a year. Second, a sinking fund for the next laptop, starting after Mexico.', replies: ['How do you know if it\'s "now"?'] },
        { tey: 'Ask: is it broken, or just old? Is something going wrong right now because of it, or am I tired of waiting for it? If it still does the job, it\'s probably "later".', replies: ['What if she just really wants a new one?'] },
        { tey: 'That\'s honest, and fine. Then it\'s a want that also happens to be a later need. Plan it, save for it, enjoy it when it comes. Just don\'t call impatience a need.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Need now: it\'s broken and something is going wrong. Need later: it\'s old but still works, so plan and save. Don\'t call impatience a need.',
    },
  ],
  apply: {
    scenario: 'Ada\'s slow laptop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Ada\'s laptop exports 20 seconds slower but runs her software. Is it a need now?',
        options: [
          { text: 'No: a later need. It still does the job' },
          { text: 'Yes, buy today', why: 'It\'s slow, not broken.' },
          { text: 'It\'s never a need', why: 'A working laptop is a must-have for her job.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Need now, or need later?',
        groups: ['Need now', 'Need later'],
        items: [
          { text: 'A laptop that won\'t switch on before a deadline', group: 0 },
          { text: 'A slow laptop that still works', group: 1 },
          { text: 'Shoes with a hole in the sole', group: 0 },
          { text: 'A phone with an old camera', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A cheap fix costs ₦40,000; a new laptop ₦900,000. How much does the fix save, for now?',
        answers: ['860000', '860,000', '₦860,000', '₦860000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'But I\'m a professional. I deserve a fast laptop.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'You do, and you\'ll have one. Fix this one for ₦40,000, go to Mexico, then start a laptop fund. A professional plans her tools.' },
          { text: 'Buy it now, deserve it.', why: 'That empties the Mexico fund.' },
          { text: 'Professionals use old laptops forever.', why: 'Not true. It\'s about timing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'Is it [[1]], or just [[2]]?',
        blanks: [['broken'], ['old']],
        distractors: ['new', 'cheap'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the right move.',
        pairs: [
          ['Broken, needed for work today', 'Replace or repair now'],
          ['Old, still works', 'Cheap fix and a sinking fund'],
          ['Works fine, just want a new one', 'Plan it as a want'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is impatience calling itself a need?',
        lines: [
          'My laptop is three years old.',
          'It still runs my design software.',
          'I can\'t wait another day; I need a new one now.',
        ],
        bug: 2,
        fix: 'I\'ll fix it cheaply and plan the next one.',
        explanation: 'Nothing is going wrong right now. That\'s impatience, which is human, but not a need now.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a "later need"?',
        options: [
          { text: 'A real need that\'s coming, but not urgent yet' },
          { text: 'A want', why: 'It\'s a real need, just not urgent.' },
          { text: 'Something you never need', why: 'It will be needed, later.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A laptop fund of ₦900,000 over 18 months. How much a month?',
        answers: ['50000', '50,000', '₦50,000', '₦50000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s laptop plan.',
        lines: ['Check: broken or old?', 'Cheap fix now', 'Go to Mexico City', 'Start a laptop sinking fund', 'Buy when it\'s truly needed'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you feel you "need now" that\'s really a "need later"? What would a cheap fix and a plan look like?',
    starters: ['I feel I need...', 'A cheap fix:...', 'A plan:...'],
  },
  deepen: {
    title: 'Repair first',
    summary: 'For electronics and clothes, a repair or upgrade (cleaning, more memory, a new battery, a cobbler) often adds a year or more of life for a small fraction of the price. It\'s also better for the planet.',
  },
  notes: 'Fictional: laptop fix ₦40,000 (cleaning + memory upgrade) by Ngozi\'s cousin (narrated); new laptop ~₦900,000. The fix cost is paid from flexible lines in Ch2, not the Mexico fund.',
};

export default lesson;
