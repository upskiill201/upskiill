import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: what motivates people at work (pay, praise, laziness myths). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Motivation myths',
  summary: 'Folake isn\'t joking about the pizza. "And if pizza doesn\'t work, a bonus will. People work for money, Miracle." Miracle isn\'t sure. Tey: "Let\'s look at what the research actually says."',
  minutes: 11,
  outcomes: [
    'Know what research says about money and motivation',
    'Tell motivation myths from facts',
    'Know why people differ in what motivates them',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Pay is the main thing that keeps people motivated at work.', isFact: false, explain: 'Myth, mostly. Pay matters a lot, especially when it feels unfair or too low. But a review of 92 studies by Timothy Judge and colleagues (2010) found that how much people earned was only weakly related to how satisfied they were with their job. Above "fair", more money buys less motivation than you\'d think.' },
        { text: 'Unfair or too-low pay can seriously demotivate people.', isFact: true, explain: 'Fact. Pay that feels unfair, compared with others or with the work, is a classic demotivator. Fix that first. Just don\'t expect money alone to make people care.' },
        { text: 'Most people are naturally lazy and need pressure to work.', isFact: false, explain: 'Myth. Douglas McGregor (1960) called this assumption "Theory X". The research since then suggests most people want to do good work when it\'s meaningful and they have what they need. What looks like laziness is often a broken system.' },
        { text: 'Different people are motivated by different things.', isFact: true, explain: 'Fact. Chidi wants a challenge. Halima wants to feel she belongs. Bisi wants her four years to count. The same speech lands three different ways.' },
        { text: 'Motivation is a fixed personality trait: you either have it or you don\'t.', isFact: false, explain: 'Myth. Motivation changes with the situation. The same person can be bored in one team and brilliant in another. That\'s good news: the situation is something a leader can change.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fair pay matters, but more pay buys less than you\'d think. Most people want to do good work. People differ. Motivation depends on the situation, which you can change.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, after Folake\'s bonus idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Judge and colleagues find about pay?',
        options: [
          { text: 'Pay is the only thing that matters', why: 'The link was weak.' },
          { text: 'How much people earned was only weakly related to job satisfaction' },
          { text: 'Pay doesn\'t matter at all', why: 'Unfair pay matters a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Pay is the main motivator', group: 0 },
          { text: 'Unfair pay demotivates', group: 1 },
          { text: 'Most people are naturally lazy', group: 0 },
          { text: 'People differ in what motivates them', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'People work for money, Miracle. If pizza fails, a bonus will work.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'I\'ll check pay is fair, because unfair pay really hurts. But the research says money alone won\'t make them care. Can I try a few things first?' },
          { text: 'You\'re wrong about that.', why: 'To your new boss? Try evidence and a plan.' },
          { text: 'Okay, bonuses then.', why: 'A bonus can\'t fix broken headsets.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'McGregor called the "people are lazy" assumption Theory ___. (one letter)',
        answers: ['X', 'x'],
        placeholder: 'One letter',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to what likely motivates them.',
        pairs: [
          ['Chidi', 'A real challenge'],
          ['Halima', 'Feeling she belongs'],
          ['Bisi', 'Her four years counting'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is it good news that motivation depends on the situation?',
        options: [
          { text: 'It means nobody is responsible', why: 'The leader is responsible for the situation.' },
          { text: 'It isn\'t good news', why: 'It means things can improve.' },
          { text: 'The situation is something a leader can change' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s notes. Which line is a myth?',
        lines: [
          'Check pay is fair across the team.',
          'Emmanuel is just a lazy person; nothing will change him.',
          'Ask each person what a good day looks like.',
        ],
        bug: 1,
        fix: 'Find out what bores or blocks Emmanuel.',
        explanation: 'That\'s Theory X. The same person can be bored in one team and brilliant in another.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s approach in order.',
        lines: ['Check pay is fair', 'Ask what demotivates each person', 'Fix what\'s in the way', 'Add what makes the work worth caring about'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Fair pay [[1]]. More pay buys [[2]] than you\'d think.',
        blanks: [['matters'], ['less']],
        distractors: ['nothing', 'more'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s belief.',
        tiles: ['Most', 'people', 'want', 'to', 'do', 'good', 'work.'],
        distractors: ['lazy'],
      },
    ],
  },
  reflect: {
    prompt: 'What motivates you most at work or school? Is it the same thing that motivates the people around you?',
    starters: ['What motivates me is...', 'For them it might be...'],
  },
  deepen: {
    title: 'Ask, don\'t assume',
    summary: 'Pick one person you work with whose motivation you\'ve guessed. Ask them what makes a good day at work for them. Compare it with your guess.',
  },
  notes: 'Timothy A. Judge, Ronald F. Piccolo, Nathan P. Podsakoff, John C. Shaw & Bruce L. Rich (2010), "The relationship between pay and job satisfaction: A meta-analysis", J. Vocational Behavior 77(2): r ≈ .15 between pay level and job satisfaction. Douglas McGregor, The Human Side of Enterprise (1960): Theory X and Theory Y. Situational nature of motivation: broad organisational behaviour consensus.',
};

export default lesson;
