import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: build the month. Cliffhanger: Cape Coast. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: build the month',
  summary: 'Efua\'s cousin Abena starts at KNUST next semester and begs Kofi for "the sheet". Build her budget from scratch with everything from Chapter 3. Meanwhile, Kofi\'s week 1 goes perfectly. Until Yaw makes an announcement.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a full zero-based budget for someone else', 'Use 50/30/20, weekly money and a cushion together'],
  learn: [
    {
      kind: 'story',
      title: 'Week 1',
      beats: [
        { speaker: 'narrator', text: 'Sunday night, end of week 1. Kofi checks: GH₵14 of his GH₵205 left. Savings untouched. Surprises untouched.' },
        { speaker: 'kofi', text: 'It worked. A whole week. It actually worked.' },
        { speaker: 'efua', text: 'Good. My cousin Abena is starting here next semester. Her mum sends GH₵1,200. She wants "Kofi\'s sheet". Help me build hers?' },
        { speaker: 'narrator', text: 'Then the door bangs open. Yaw, grinning, holding up his phone.' },
        { speaker: 'yaw', text: 'Gentlemen! And Efua. My birthday is next Saturday. We\'re going to CAPE COAST. Beach, castle, the works. Only GH₵250 each. Who\'s in?' },
        { speaker: 'kofi', text: '...GH₵250.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: every cedi gets a job, savings first, spend weekly, plan honestly. But plans meet life. Chapter 4: when life happens. First, help Abena.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: Abena\'s first budget (GH₵1,200 a month).',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps for Abena\'s budget.',
        lines: ['Write her income: GH₵1,200', 'List fixed costs', 'Set savings and surprises', 'Plan weekly and monthly lines', 'Check it equals zero'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Abena\'s fixed costs: data GH₵70, dues GH₵20, toiletries GH₵40. Total?',
        answers: ['130', 'GH₵130', '130 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should Abena\'s savings be?',
        options: [
          { text: 'Whatever is left at the end of the month', why: 'Leftovers rarely survive. Decide it first.' },
          { text: 'A set amount decided first, even if it\'s small, like GH₵100' },
          { text: 'Nothing until she earns more', why: 'The habit matters more than the size.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵1,200 − fixed GH₵130 − savings GH₵100 − surprises GH₵120. What\'s left for weekly and monthly lines?',
        answers: ['850', 'GH₵850', '850 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Abena plans GH₵700 of weekly money for 4 weeks. Per week?',
        options: [
          { text: 'GH₵175' },
          { text: 'GH₵170', why: '700 ÷ 4 = 175.' },
          { text: 'GH₵200', why: 'That would be GH₵800.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵850 − GH₵700 weekly. How much is left for monthly lines (school, haircut)?',
        answers: ['150', 'GH₵150', '150 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Abena\'s draft. Which line will cause trouble?',
        lines: [
          'Income: GH₵1,200.',
          'Fixed: GH₵130. Savings: GH₵100. Surprises: GH₵120.',
          'Weekly: GH₵175 x 4. Fun included: GH₵0.',
          'Monthly: GH₵150. Left: GH₵0.',
        ],
        bug: 2,
        fix: 'Weekly: GH₵175 x 4, including GH₵20 fun.',
        explanation: 'Zero fun is the classic too-tight budget. A small fun line protects the rest.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 idea is each?',
        groups: ['Zero-based', 'Planning fallacy fix', 'Weekly money'],
        items: [
          { text: 'Left without a job: GH₵0', group: 0 },
          { text: 'Surprises line', group: 1 },
          { text: 'Move GH₵175 every Sunday', group: 2 },
          { text: 'Use last month\'s real numbers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Abena\'s needs come to about 60% of her money. Is that a problem?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes, she has to get it to 50%.', why: 'On a small income, needs are often over half. That\'s normal.' },
          { text: 'Normal on a small income. Needs first at their real size, keep some savings, keep wants small.' },
          { text: 'She should skip savings then.', why: 'Keep some savings. The habit counts.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 3 idea to its one-liner.',
        pairs: [
          ['Zero-based budget', 'Every cedi gets a job'],
          ['50/30/20', 'A health check, not a law'],
          ['Weekly money', 'Monthly in, weekly out'],
          ['Too-tight plan', 'Cut what you\'d bet on'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Yaw\'s Cape Coast trip costs GH₵250. Kofi\'s fun line is GH₵30 a week. What does that tell him?',
        options: [
          { text: 'It fits easily', why: 'GH₵250 is more than eight weeks of fun money.' },
          { text: 'He can never go', why: 'Not necessarily. Chapter 4 looks at ways to make it work, or not.' },
          { text: 'It doesn\'t fit his fun line, so going would mean changing the plan on purpose' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 in one line.',
        template: 'Every cedi gets a [[1]], savings come [[2]], and you spend [[3]].',
        blanks: [['job'], ['first'], ['weekly']],
        distractors: ['last', 'daily'],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life could use "the sheet"? What would you tell them first?',
    starters: ['I\'d help...', 'The first thing I\'d tell them is...'],
  },
  notes: 'Chapter 3 challenge. Abena (Efua\'s cousin, narrated; mentioned only). Her budget (fictional): 1,200 = fixed 130 + savings 100 + surprises 120 + weekly 700 (175/wk incl. fun) + monthly 150. Cliffhanger: Yaw\'s birthday trip to Cape Coast, GH₵250 each (Chapter 4 L1).',
};

export default lesson;
