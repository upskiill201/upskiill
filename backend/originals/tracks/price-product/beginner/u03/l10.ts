import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: every option must earn. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: every option must earn',
  summary: 'David plays the sceptical reviewer. For a sample Saturday of 22 orders across the new options, he wants every margin checked and one total. Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Check margins across a full menu', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'reading',
      title: 'A sample Saturday on price card v3',
      html: '<table><tr><th>Option</th><th>Orders</th><th>Margin each</th></tr><tr><td>Saver (1,400)</td><td>5</td><td>275</td></tr><tr><td>Standard, nearby (1,800)</td><td>10</td><td>675</td></tr><tr><td>Standard, hill (2,300)</td><td>3</td><td>775</td></tr><tr><td>Express, nearby (2,500)</td><td>2</td><td>1,075</td></tr><tr><td>Ironing extra (+200)</td><td>2</td><td>100</td></tr></table><p>Plus 4 Saturday Plan members, who each use one bag this weekend (margin 475 each).</p><p>On price card v1, the same 22 bags at 1,500 would have earned 375 each, and the hill bags would have lost money.</p>',
    },
    {
      kind: 'story',
      title: 'David\'s red pen',
      beats: [
        { speaker: 'david', text: 'Check every row, then give me one total. If any row is negative, it goes.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: different needs, different options, each priced to earn. Chapter 4: raising prices for real, without losing the regulars.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: every option must earn.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '5 Saver bags at 275 margin. Total, in FCFA?',
        answers: ['1375', '1,375'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '10 nearby Standard bags at 675. Total, in FCFA?',
        answers: ['6750', '6,750'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '3 hill Standard bags at 775 margin. Total?',
        options: [
          { text: '2,025 FCFA', why: '3 × 775 = 2,325.' },
          { text: '2,325 FCFA' },
          { text: '775 FCFA', why: 'That\'s one bag.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '2 Express bags at 1,075. Total, in FCFA?',
        answers: ['2150', '2,150'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Ironing on 2 bags (100 each) plus 4 plan bags (475 each). How much do these add?',
        options: [
          { text: '575 FCFA', why: 'Multiply by the number of each.' },
          { text: '1,900 FCFA', why: 'Add the ironing too.' },
          { text: '2,100 FCFA (200 + 1,900)' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Add it all up: 1,375 + 6,750 + 2,325 + 2,150 + 2,100. Total margin for the Saturday, in FCFA?',
        answers: ['14700', '14,700'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'On v1, 24 bags (20 regular + 4 plan) at 375 each would have earned 9,000, minus hill losses. How does v3 compare?',
        options: [
          { text: 'v3 earns about 5,700 FCFA more, with no losing orders' },
          { text: 'v3 earns less', why: '14,700 is more than 9,000.' },
          { text: 'The same', why: 'Options changed the margins.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this row earn its place?',
        groups: ['Earns', 'Doesn\'t'],
        items: [
          { text: 'Saver: 275 a bag', group: 0 },
          { text: 'Hill Standard: 775 a bag', group: 0 },
          { text: 'A hill pickup at the old 1,500: minus 825', group: 1 },
          { text: 'Ironing: 100 a bag', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Saver only earns 275. Should I drop it?',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, drop anything under 500.', why: 'Per minute, Saver is excellent.' },
          { text: 'Make Saver free.', why: 'It must stay above cost.' },
          { text: 'It earns 275 for about 10 minutes, the best rate per minute on the card, and keeps budget students. Keep it.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 3 idea to the card.',
        pairs: [
          ['Good, better, best', 'Saver, Standard, Express'],
          ['Zone fee', 'Hill +500'],
          ['Extra', 'Ironing +200'],
          ['Plan', '6,400 a month'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Different [[1]], different options, each priced to [[2]].',
        blanks: [['needs'], ['earn']],
        distractors: ['logos', 'lose'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order David\'s review.',
        lines: ['List every option sold', 'Multiply orders by margin for each', 'Add up the total', 'Remove any row that loses money'],
      },
    ],
  },
  reflect: {
    prompt: 'Take a typical week of your own sales across your options. Which option earns most in total? Which earns most per hour?',
    starters: ['Most in total:...', 'Most per hour:...'],
  },
  notes: 'Chapter 3 challenge (fictional sample Saturday on v3): Saver 5 × 275 = 1,375; Standard nearby 10 × 675 = 6,750; Standard hill 3 × 775 = 2,325; Express 2 × 1,075 = 2,150; ironing 2 × 100 = 200; plan bags 4 × 475 = 1,900. Total 14,700 vs ~9,000 on v1 (24 × 375) before hill losses.',
};

export default lesson;
