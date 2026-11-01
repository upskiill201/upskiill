import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first entry',
  summary: 'Wednesday, 11:40 p.m. Kofi wants a jersey. Instead of buying, he opens the log and writes one line. Check what you know: what impulse buys are, wanting vs liking, and the urge log.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Recognise an impulse buy', 'Log an urge with the right details'],
  learn: [
    {
      kind: 'story',
      title: 'One line',
      beats: [
        { speaker: 'narrator', text: '"Wed 11:40 p.m. · scrolling in bed · jersey GH₵250 · bored · alone · waited."' },
        { speaker: 'kofi', text: 'By morning, I didn\'t even want it. Weird.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: add to cart.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Planned, unplanned but fine, or impulse?',
        groups: ['Planned', 'Unplanned but fine', 'Impulse'],
        items: [
          { text: 'A charger bought on Saturday as planned', group: 0 },
          { text: 'Soap when it ran out', group: 1 },
          { text: 'A jersey at 1 a.m. from an ad', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Kofi not want the jersey by morning?',
        options: [
          { text: 'The "want" signal faded with time' },
          { text: 'The price went up', why: 'Same price. The want dropped.' },
          { text: 'Someone else bought it', why: 'He just stopped wanting it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its meaning.',
        pairs: [
          ['Wanting', 'The pull towards something'],
          ['Liking', 'The pleasure of having it'],
          ['"Ouch" signal', 'Discomfort at the price'],
          ['Urge log', 'One line per urge'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'An impulse buy is...',
        template: 'Sudden, [[1]], and driven by a [[2]] or a trick.',
        blanks: [['urgent', 'strong'], ['feeling']],
        distractors: ['planned', 'list'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Logging urges? Why not just not buy stuff?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You\'re right, logging is pointless.', why: 'It already stopped one buy.' },
          { text: 'Because I didn\'t know why I was buying. The log shows me. Then I can change it.' },
          { text: 'Because I like writing.', why: 'Not the reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which log line is missing the feeling?',
        lines: [
          'Mon 10 p.m. · in bed · headphones GH₵300 · stressed · alone · waited.',
          'Tue 3 p.m. · Kejetia · cap GH₵40 · with Yaw · bought.',
          'Thu 1 a.m. · scrolling · shirt GH₵120 · lonely · alone · let it go.',
        ],
        bug: 1,
        fix: 'Tue 3 p.m. · Kejetia · cap GH₵40 · happy · with Yaw · bought.',
        explanation: 'The feeling is often the most revealing detail.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Boots GH₵480, sold for GH₵300. How much was lost?',
        answers: ['180', 'GH₵180', '180 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "70% off" mainly do in the brain?',
        options: [
          { text: 'Makes you like the product more after buying', why: 'It affects the moment of buying, not later liking.' },
          { text: 'Nothing', why: 'Discounts are designed to reduce the pain of paying.' },
          { text: 'Turns down the "ouch" of the price' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the urge log steps.',
        lines: ['Notice the pull', 'Open the log', 'Write five details', 'Write what you did', 'Read it on Sunday'],
      },
      {
        kind: 'mcq',
        prompt: 'Which impulse buys does this course focus on?',
        options: [
          { text: 'All small treats', why: 'Small planned treats are fine.' },
          { text: 'Big, frequent, unaffordable or regretted ones' },
          { text: 'Only expensive ones', why: 'Frequent small ones add up too.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Budgeting: why do phone payments feel easier than cash?',
        options: [
          { text: 'They\'re cheaper', why: 'Same money.' },
          { text: 'They take longer', why: 'They\'re faster.' },
          { text: 'The pain of paying is weaker' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you logged your first urge yet? What did it say?',
    starters: ['My first log line:...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4 with one Budgeting review item.',
};

export default lesson;
