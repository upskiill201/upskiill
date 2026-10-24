import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: say the number',
  summary: 'Buying time, anchors, the five-step ask, and when to go first. Quick check before Ada learns about ranges, reasons and silence.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Make a clear ask with a number and a reason', 'Respond well to an anchor'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday',
      beats: [
        { speaker: 'ada', text: 'I said my rent ask to Remi ten times. I can say ₦1,300,000 now without blinking.' },
        { speaker: 'remi', text: 'And you didn\'t fill the silence once. Big progress.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: say the number.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps of an ask.',
        lines: ['Start on the same side', 'One specific number', 'One clear reason', 'Stop talking', 'Listen, then respond'],
      },
      {
        kind: 'mcq',
        prompt: 'The other side anchors first with a high number. What\'s your best move?',
        options: [
          { text: 'Argue about their number', why: 'That keeps their anchor in focus.' },
          { text: 'State your own number with evidence soon' },
          { text: 'Split the difference straight away', why: 'That lets the anchor decide.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good ask or weak ask?',
        groups: ['Good', 'Weak'],
        items: [
          { text: '"I\'d like to propose ₦150,000, which includes two revisions."', group: 0 },
          { text: '"Whatever you think."', group: 1 },
          { text: '"Similar roles pay ₦480,000."', group: 0 },
          { text: '"Maybe a bit more, if possible?"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'A client asks my price but I have no idea what this kind of job is worth.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Say ₦5,000 to be safe.', why: 'A guess too low is hard to raise.' },
          { text: 'Say ₦5,000,000 to be safe.', why: 'An extreme guess damages trust.' },
          { text: 'Ask questions first: what they need, by when, their budget. Then send a quote by a set time.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A first offer of ₦100,000 and a counter of ₦60,000. What\'s the midpoint, in naira?',
        answers: ['80000', '80,000'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The warning.',
        template: 'Don\'t fill the [[1]] with a [[2]] offer.',
        blanks: [['silence'], ['lower', 'smaller']],
        distractors: ['room', 'better'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to when it fits.',
        pairs: [
          ['Go first', 'You know the range'],
          ['Ask questions first', 'You don\'t know the value'],
          ['Buy time', 'You\'re not prepared yet'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this ask is the mistake?',
        lines: [
          'I\'d like this to work for both of us.',
          'I\'d like to propose ₦480,000 a month.',
          'Similar roles in Lagos pay ₦400,000 to ₦550,000.',
          'Sorry, I know that\'s probably too much.',
        ],
        bug: 3,
        fix: 'Delete it, and wait.',
        explanation: 'Apologising undoes the ask.',
      },
      {
        kind: 'mcq',
        prompt: 'What does anchoring mean?',
        options: [
          { text: 'The first number shown pulls later judgements towards it' },
          { text: 'Staying calm in a negotiation', why: 'Anchoring is about numbers.' },
          { text: 'Refusing to move', why: 'That\'s stubbornness.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times did Ada practise her rent ask with Remi?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Say your own ask out loud now: number, reason, silence. How did the silence feel?',
    starters: ['My ask:...', 'The silence felt...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. Midpoint of 100,000 and 60,000 = 80,000.',
};

export default lesson;
