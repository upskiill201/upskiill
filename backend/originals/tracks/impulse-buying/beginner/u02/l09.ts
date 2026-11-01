import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: the pause list v2, the trigger map. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The pause list v2: the trigger map',
  summary: 'Kofi\'s pause list grows up: from a log of urges to a map of his triggers, each with its swap. Tap through it.',
  minutes: 11,
  outcomes: [
    'Read a trigger map',
    'See each trigger paired with a swap',
    'Build your own trigger map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s pause list v2 (week 3)',
      text: 'TRIGGER 1: in bed after 10, bored or stressed. SWAP: phone by the door; if bored, make a beat for 20 minutes; if stressed, 10 minutes of the task, then sleep. TRIGGER 2: after a football loss. SWAP: penalty practice Monday, voice note to Efua that night. TRIGGER 3: Kejetia with Yaw. SWAP: go with a list and a cash limit. CHECK: HALT + BS before any buy. RESULT SO FAR: late-night urges 7 a week down to 2. Bought on impulse this week: GH₵40.',
      hotspots: [
        { phrase: 'TRIGGER 1: in bed after 10, bored or stressed', note: 'The biggest one: about half of all his urges came from this combination.' },
        { phrase: 'phone by the door', note: 'Changes the moment itself. The old routine now takes effort.' },
        { phrase: 'make a beat for 20 minutes', note: 'Same reward (stimulation, a small lift), new routine. Easy to start: speaker on the pillow.' },
        { phrase: 'TRIGGER 2: after a football loss', note: 'The boots. Buying to be someone after feeling small. The swap builds the real thing: practice.' },
        { phrase: 'TRIGGER 3: Kejetia with Yaw', note: 'A social trigger. A list and a cash limit protect him without missing Saturdays with his friend.' },
        { phrase: 'CHECK: HALT + BS before any buy', note: 'One question before any purchase: am I hungry, angry, lonely, tired, bored or stressed?' },
        { phrase: 'Bought on impulse this week: GH₵40', note: 'Down from GH₵310 in week 1. Not zero, and it doesn\'t need to be.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A trigger map pairs every trigger with a swap. Two or three triggers is enough. Keep it where you\'ll see it.',
    },
  ],
  apply: {
    scenario: 'Reading the trigger map.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each trigger to its swap.',
        pairs: [
          ['In bed after 10, bored', 'Make a beat for 20 minutes'],
          ['After a football loss', 'Penalty practice and a voice note'],
          ['Kejetia with Yaw', 'A list and a cash limit'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Impulse spending: GH₵310 in week 1, GH₵40 this week. How much less?',
        answers: ['270', 'GH₵270', '270 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does trigger 3 use a list and a cash limit instead of "stop going to Kejetia"?',
        options: [
          { text: 'Kejetia is free', why: 'It\'s about keeping the friendship and the fun.' },
          { text: 'Lists don\'t work', why: 'They\'re one of the best tools there is.' },
          { text: 'It protects his money without losing Saturdays with his friend' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes the moment, or swaps the routine?',
        groups: ['Changes the moment', 'Swaps the routine'],
        items: [
          { text: 'Phone by the door after 10', group: 0 },
          { text: 'Make a beat instead of scrolling', group: 1 },
          { text: 'Voice note instead of buying', group: 1 },
          { text: 'Go to Kejetia with a cash limit', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'GH₵40 on impulse this week. Shouldn\'t it be zero?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Zero isn\'t the goal. GH₵40 of small things I\'m fine with, down from GH₵310. That\'s the map working.' },
          { text: 'Yes, I failed.', why: 'An 87% drop isn\'t failure.' },
          { text: 'It should be GH₵500.', why: 'Down is the direction he wants.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A trigger map.',
        template: 'Every [[1]] paired with a [[2]].',
        blanks: [['trigger'], ['swap']],
        distractors: ['shop', 'price'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Yaw\'s first trigger map has no swap?',
        lines: [
          'After a bad exam: call my brother.',
          'Sunday nights alone: cook with Kofi.',
          'When I see a sneaker drop: (nothing yet)',
        ],
        bug: 2,
        fix: 'When I see a sneaker drop: screenshot it, decide in 24 hours.',
        explanation: 'A trigger without a swap leaves the old routine in charge.',
      },
      {
        kind: 'mcq',
        prompt: 'How many triggers should a map have to start with?',
        options: [
          { text: 'Twenty', why: 'Too many to remember in the moment.' },
          { text: 'One only, forever', why: 'Start small; add as you learn.' },
          { text: 'Two or three, the biggest ones' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵270 less impulse spending per week. Over 10 weeks, how much is that?',
        answers: ['2700', '2,700', 'GH₵2,700', 'GH₵2700'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pause list, so far and next.',
        lines: ['v1: count the urges', 'v2: map the triggers and swaps', 'Next: learn the tricks behind the ads'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own trigger map: two or three triggers, each with a swap. Where will you keep it?',
    starters: ['Trigger 1:... Swap:...', 'Trigger 2:... Swap:...', 'I\'ll keep it...'],
  },
  deepen: {
    title: 'Share the map',
    summary: 'Kofi showed his map to Efua and Yaw. Now when Yaw sees him reaching for his phone at 11 p.m., he says "door". Friends who know your triggers can be the gentlest reminder there is.',
  },
  notes: 'Pause list v2 (fictional): week 3; late-night urges 7 → 2; impulse spend 310 → 40.',
};

export default lesson;
