import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Chapter Challenge: Zanele snaps (the giver who burnt out; boundaries and repair). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Zanele snaps',
  summary: 'Saturday, 7 p.m. The IT change works: 11 days becomes 9. In the warehouse, Remi says, "Zanele, could you just update the chart tonight?" Zanele puts down her laptop. "Remi. I\'ve built every spreadsheet for five weeks. Nobody asked me if I had time. Including you."',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 4 tool, and earlier ones, in one hard moment',
    'Notice when an ally is burning out',
    'Repair it honestly and change how the work is shared',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 5, Saturday, 7:04 p.m.',
      beats: [
        { speaker: 'zanele', text: 'I\'ve built every spreadsheet for five weeks. Cleaned Felix\'s records. Tracked Wanjiku\'s test. Nobody asked me if I had time. Including you. My own work is two weeks behind.' },
        { speaker: 'narrator', text: 'Felix suddenly finds something very interesting on his screen. Remi\'s face goes hot. He wants to say, "But you offered!" She did. In Week 1. That was five weeks and about forty favours ago.' },
        { speaker: 'narrator', text: 'Remi has been crediting everyone, upwards, by name. Everyone except the person who did the most. You\'re with Remi.' },
      ],
    },
  ],
  apply: {
    scenario: 'The warehouse, Saturday night.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Remi say first?',
        options: [
          { text: '"You\'re right. I\'ve been taking your help for granted. I\'m sorry."' },
          { text: '"But you offered!"', why: 'True, and it tells her she\'s wrong to feel this.' },
          { text: '"Let\'s talk about it after the review."', why: 'Two more weeks of the same.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Repairs it, or makes it worse?',
        groups: ['Repairs it', 'Makes it worse'],
        items: [
          { text: '"You\'re right. I\'m sorry."', group: 0 },
          { text: '"Everyone\'s tired, not just you."', group: 1 },
          { text: '"What would help your own work catch up?"', group: 0 },
          { text: 'Asking Felix to do the chart instead, without telling her', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I don\'t want an apology. I want my own work back.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Okay, so you won\'t help anymore?', why: 'Turns her boundary into a threat to the project.' },
          { text: 'Just this one last chart, then.', why: 'Ignores what she just said.' },
          { text: 'Fair. From Monday, I\'ll do the chart myself. And I\'ll ask Brian to tell your manager what you built. Which of your deadlines is most urgent?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Adam Grant: successful givers protect their own work with ___. (one word)',
        answers: ['boundaries', 'Boundaries', 'limits'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s repair in order.',
        lines: ['Admit it, no excuses', 'Ask what she needs', 'Take work off her plate', 'Credit her, upwards'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Remi miss for five weeks?',
        options: [
          { text: 'Zanele didn\'t like the project', why: 'She loved it. She was just overloaded.' },
          { text: 'Nothing; she should have said', why: 'She should have, maybe. He should have asked.' },
          { text: 'His most generous ally was becoming a burnt-out giver' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message to Brian on Monday. Which line undoes the repair?',
        lines: [
          'Zanele built every tracker and spreadsheet on the refund project.',
          'She did it all because she\'s happy to help.',
          'Could you let her manager know? Her own work slipped because of it.',
        ],
        bug: 1,
        fix: 'She did it on top of her own job, and it\'s cost her two weeks.',
        explanation: '"Happy to help" makes her generosity sound free. It wasn\'t.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the earlier tool to tonight.',
        pairs: [
          ['Givers and takers', 'Zanele burnt out from giving'],
          ['Credit upwards', 'Tell her manager'],
          ['Ask what\'s in the way', '"Which deadline is most urgent?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'On Monday, how should the work be shared now?',
        options: [
          { text: 'Zanele keeps doing it, but Remi says thanks more', why: 'Thanks doesn\'t give her time back.' },
          { text: 'Each owner updates their own part of the chart; Remi pulls it together' },
          { text: 'Stop tracking progress', why: 'Small wins need the chart.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4, in one line.',
        template: 'When it [[1]], follow up, escalate the problem, keep [[2]], and look after your [[3]].',
        blanks: [['stalls'], ['steady', 'going', 'consistent'], ['allies', 'people', 'team']],
        distractors: ['boss', 'nagging'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s first words.',
        tiles: ['You\'re', 'right.', 'I\'m', 'sorry.'],
        distractors: ['But'],
      },
    ],
  },
  reflect: {
    prompt: 'Who is the "Zanele" in your life: the person who quietly helps with everything? When did you last ask if they had time?',
    starters: ['My Zanele is...', 'I could...'],
  },
  deepen: {
    title: 'Next: Week 6',
    summary: 'Monday, Week 6: the chart says 4 days. Below the goal. Then Brian says: "Kamau wants you to present on Friday. Just you." Remi looks at the five names on the chart. Chapter 5: Show, don\'t tell.',
  },
  notes: 'Chapter 4 challenge. Giver burnout and boundaries (Adam Grant, Give and Take, 2013); repair without excuses; credit upwards; redistributing work. Fictional events.',
};

export default lesson;
