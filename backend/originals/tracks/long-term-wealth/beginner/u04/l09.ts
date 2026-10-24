import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: the 40-year map v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The 40-year map v4: the gap grows',
  summary: 'Three months after the raise, Miracle updates her map. Her income is higher, her life is better, and her gap is bigger than ever. Tap through version 4.',
  minutes: 11,
  outcomes: [
    'Read a map that tracks income, spending and the gap together',
    'See how a raise plan changes the long-term picture',
    'Add your gap to your own map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle\'s 40-year map v4',
      text: 'INCOME: ₦1,250,000 take-home. MUST-HAVES: ₦530,000 (new Yaba flat). WANTS: ₦365,000, more than ever, all planned. TO FUTURE ME: ₦355,000 (28%), automatic on payday. Split: pension extra, long-term pot, home deposit. SKILLS: data course, two evenings a week. DEBT: staff loan finished. No car loan. RULE: half of every raise or bonus to future me. NET WORTH: ₦5,600,000. DAD: not on the map yet.',
      hotspots: [
        { phrase: 'MUST-HAVES: ₦530,000', note: 'Up ₦50,000 for the bigger flat, chosen from the "now" half.' },
        { phrase: 'WANTS: ₦365,000, more than ever, all planned', note: 'She\'s not living smaller. She\'s living better, on purpose.' },
        { phrase: 'TO FUTURE ME: ₦355,000 (28%)', note: 'Up from 13% at the start of the course. Each raise pushed it up without a single cut.' },
        { phrase: 'SKILLS: data course', note: 'The investment in her own earning power.' },
        { phrase: 'staff loan finished', note: 'Its old ₦25,000 repayment now goes half to saving, half to life.' },
        { phrase: 'NET WORTH: ₦5,600,000', note: 'From ₦2,250,000 at the start. More than doubled in under a year, mostly from the gap.' },
        { phrase: 'DAD: not on the map yet', note: 'The piece she\'s been avoiding. He retires in a few months.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Track income, spending and the gap side by side. If income rises and the gap doesn\'t, creep is happening.',
    },
  ],
  apply: {
    scenario: 'Reading map v4.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Income ₦1,250,000 − must-haves ₦530,000 − to future me ₦355,000. How much for wants?',
        answers: ['365000', '365,000', '₦365,000', '₦365000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each map line to its amount.',
        pairs: [
          ['Must-haves', '₦530,000'],
          ['Wants', '₦365,000'],
          ['To future me', '₦355,000'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Her savings rate went from 13% to 28%. Did she cut her lifestyle?',
        options: [
          { text: 'Yes, drastically', why: 'Her wants budget is higher than ever.' },
          { text: 'No: she saved part of each raise, so her life got better too' },
          { text: 'She stopped eating out', why: 'She spends more on wants now.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'On the map: growing the gap, or a cost?',
        groups: ['Growing the gap', 'A cost'],
        items: [
          { text: 'Automatic ₦355,000 on payday', group: 0 },
          { text: 'The bigger flat', group: 1 },
          { text: 'Finished staff loan', group: 0 },
          { text: 'Planned wants', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Your net worth has more than doubled. What did most of the work?',
        prompt: 'Miracle\'s best answer?',
        options: [
          { text: 'Luck.', why: 'It was habits.' },
          { text: 'A hot stock.', why: 'She didn\'t chase tips.' },
          { text: 'The gap. Saving automatically, and saving half of each raise. Not some clever investment.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The warning sign.',
        template: 'If income rises and the [[1]] doesn\'t, [[2]] is happening.',
        blanks: [['gap'], ['creep', 'lifestyle creep']],
        distractors: ['rent', 'saving'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v4 is out of date?',
        lines: [
          'Staff loan: finished.',
          'Car loan: none.',
          'Saving: 13% of take-home.',
        ],
        bug: 2,
        fix: 'Saving: 28% of take-home.',
        explanation: '13% was her rate at the start of the course.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Net worth went from ₦2,250,000 to ₦5,600,000. How much did it grow?',
        answers: ['3350000', '3,350,000', '₦3,350,000', '₦3350000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "DAD: not on the map yet" tell us?',
        options: [
          { text: 'He doesn\'t need help', why: 'He retires with little saved.' },
          { text: 'She hasn\'t yet planned how to help him, and he retires soon' },
          { text: 'He\'s already sorted', why: 'It\'s the piece she\'s been avoiding.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s map versions.',
        lines: ['v1: where I stand', 'v2: on autopilot', 'v3: time working', 'v4: the gap grows'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own income, must-haves, wants and gap. Which one would you most like to change?',
    starters: ['Income:... Must-haves:... Wants:... Gap:...', 'I\'d change...'],
  },
  deepen: {
    title: 'Your old repayments are a raise',
    summary: 'When a loan ends, its repayment frees up money you were already living without. Treat it like a raise: split it before it drifts into spending.',
  },
  notes: 'Map v4 (fictional): 1,250,000 − 530,000 − 355,000 = 365,000. 355,000/1,250,000 = 28.4%; starting rate 120,000/900,000 ≈ 13%. Net worth 5,600,000 − 2,250,000 = 3,350,000.',
};

export default lesson;
