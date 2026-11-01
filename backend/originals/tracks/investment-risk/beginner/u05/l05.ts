import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the report',
  summary: 'Joel\'s aunt files her report. Police say several accounts linked to the scheme have been frozen; nobody can promise what she\'ll get back. Check what you know about scams, Ponzi maths, trading numbers and mind bugs.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain Ponzi schemes and recovery scams', 'Name the mind bugs'],
  learn: [
    {
      kind: 'story',
      title: 'Filed',
      beats: [
        { speaker: 'joel', text: 'She reported it. She told my uncle. She cried, and then she said she felt lighter.' },
        { speaker: 'arjun', text: 'And she didn\'t pay the recovery people. That alone saved ₹25,000.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: too good to be true.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does a Ponzi scheme\'s money for payouts come from?',
        options: [
          { text: 'New members' },
          { text: 'Real profits', why: 'Few or none.' },
          { text: 'Insurance', why: 'New members.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'After a fraud: do, or don\'t?',
        groups: ['Do', 'Don\'t'],
        items: [
          { text: 'Report to the official helpline', group: 0 },
          { text: 'Pay a recovery fee', group: 1 },
          { text: 'Keep all messages', group: 0 },
          { text: 'Stay silent out of shame', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each bug to an example.',
        pairs: [
          ['FOMO', '"Everyone made money on this today!"'],
          ['Loss aversion', 'Trading harder to win it back'],
          ['Overconfidence', '"I\'ll be in the winning 10%"'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In SEBI\'s 2021–22 study, about what percent of individual F&O traders lost money?',
        answers: ['89', '89%'],
        placeholder: 'A percent',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Will my aunt definitely get her money back?',
        prompt: 'Arjun\'s honest reply?',
        options: [
          { text: 'Definitely, all of it.', why: 'Recovery isn\'t guaranteed.' },
          { text: 'Never, forget it.', why: 'Frozen accounts give some chance.' },
          { text: 'Nobody can promise that. Reporting gave her a chance, and stopped her losing more. That matters.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Early payouts.',
        template: 'Early payouts are [[1]], not [[2]].',
        blanks: [['bait'], ['proof']],
        distractors: ['profit', 'tax'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Ponzi schemes collapse because the maths can\'t last.',
          'Recovery scams target victims.',
          'Joining a Ponzi scheme early makes it safe.',
        ],
        bug: 2,
        fix: 'Nobody knows when it will collapse.',
        explanation: 'Early members often reinvest and lose too.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: why is one stock a bet?',
        options: [
          { text: 'Stocks are illegal', why: 'They\'re not.' },
          { text: 'One bad result can sink the whole pot' },
          { text: 'It\'s not', why: 'It\'s concentrated.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 4: a 2% fee on ₹3,00,000. First year\'s fee?',
        answers: ['6000', '6,000', '₹6,000', '₹6000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what\'s the first question for anything?',
        options: [
          { text: 'How far could it fall?' },
          { text: 'How rich will I get?', why: 'Start with the downside.' },
          { text: 'Who else bought it?', why: 'Start with the downside.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which warning from this chapter would you most want your family to hear?',
    starters: ['I\'d want them to know...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4 with earlier review. Recovery outcomes stated as uncertain.',
};

export default lesson;
