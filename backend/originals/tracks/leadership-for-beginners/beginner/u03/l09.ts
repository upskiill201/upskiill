import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the campaign one-pager, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the campaign one-pager',
  summary: 'Lucía wrote the whole chili-lime plan on one page and pinned it in the team chat. Rafa, 500 km away, replied: "First time I\'ve known exactly what to do." Tap through.',
  minutes: 11,
  outcomes: [
    'See every Chapter 3 tool on one page',
    'Write a one-page plan for a team or project',
    'Spot what makes a plan easy to act on',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Chili-lime launch: the one-pager',
      text: 'Goal: 5,000 pre-orders by July 1. Why: it decides whether chili-lime stays in shops. Launch: June 17. Owners: Tomás runs the launch email. Marta runs social. Rafa designs the banner. Diego reviews every discount code. Sofía tracks pre-orders every Monday. Paused until July: the autumn ideas and the old blog. Decided: green bags. Decisions on anything else: ask me by Thursday, I\'ll answer by Friday.',
      hotspots: [
        { phrase: 'Goal: 5,000 pre-orders by July 1.', note: 'Specific and challenging, but achievable. Not "do our best".' },
        { phrase: 'Why: it decides whether chili-lime stays in shops.', note: 'The reason why. People commit more when they know what\'s at stake.' },
        { phrase: 'Tomás runs the launch email.', note: 'A whole result delegated, not a step. One owner per piece.' },
        { phrase: 'Diego reviews every discount code.', note: 'The blameless-review fix from Chapter 2, and Diego\'s experience put to use.' },
        { phrase: 'Sofía tracks pre-orders every Monday.', note: 'Regular feedback on progress, which makes goals work better.' },
        { phrase: 'Paused until July: the autumn ideas and the old blog.', note: 'The stop-doing list, written down so nobody feels guilty about it.' },
        { phrase: 'Decided: green bags.', note: 'A two-way door, decided and closed. No tenth day of debate.' },
        { phrase: 'ask me by Thursday, I\'ll answer by Friday', note: 'Who decides, and by when. Nobody waits around wondering.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good one-pager: goal, why, date, one owner per piece, how you\'ll track it, what\'s paused, what\'s decided.',
    },
  ],
  apply: {
    scenario: 'Line check, the one-pager.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did remote Rafa find the one-pager so useful?',
        options: [
          { text: 'It was very long', why: 'It\'s one page.' },
          { text: 'It had pictures', why: 'It\'s the clarity, not the design.' },
          { text: 'Everything he needed was written down in one place' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool is it?',
        groups: ['Clear goal', 'Priorities', 'Decisions'],
        items: [
          { text: '5,000 pre-orders by July 1', group: 0 },
          { text: 'Paused until July', group: 1 },
          { text: 'Decided: green bags', group: 2 },
          { text: 'Why: it decides if it stays in shops', group: 0 },
          { text: 'One top priority: the launch', group: 1 },
          { text: 'Ask by Thursday, answer by Friday', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'I feel bad pausing the blog. Carmen liked it.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'I\'ll tell Carmen it\'s paused until July and why. You don\'t need to feel bad. That\'s my call.' },
          { text: 'Then do the blog too.', why: 'Undoes the stop-doing list.' },
          { text: 'Carmen won\'t notice.', why: 'Hiding it isn\'t the answer. Tell her.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each piece of the plan has exactly one ___. (one word)',
        answers: ['owner', 'Owner', 'person'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why write down what\'s paused?',
        options: [
          { text: 'To embarrass whoever proposed it', why: 'No.' },
          { text: 'So nobody feels guilty, and nobody quietly starts it again' },
          { text: 'It doesn\'t matter', why: 'Unwritten pauses get forgotten.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'An earlier draft. Which line breaks the one-pager?',
        lines: [
          'Goal: 5,000 pre-orders by July 1.',
          'Owners: everyone helps with everything.',
          'Paused until July: the old blog.',
        ],
        bug: 1,
        fix: 'Owners: Tomás email, Marta social, Rafa banner.',
        explanation: 'When everyone owns it, nobody does.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put writing a one-pager in order.',
        lines: ['The goal and why', 'The date', 'One owner per piece', 'What\'s paused and what\'s decided'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"5,000 by July 1"', 'Goal-setting theory'],
          ['"Every Monday"', 'Feedback on progress'],
          ['"Decided: green"', 'Two-way door'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'When [[1]] owns it, [[2]] does.',
        blanks: [['everyone', 'everybody'], ['nobody', 'no one']],
        distractors: ['someone', 'Lucía'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Rafa\'s reply.',
        tiles: ['I', 'know', 'exactly', 'what', 'to', 'do.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a one-pager for something you\'re working on: goal, why, date, owners, what\'s paused, what\'s decided. Which part was hardest to write?',
    starters: ['Goal: ...', 'The hardest part was...'],
  },
  deepen: {
    title: 'Pin it',
    summary: 'Put your one-pager where everyone can see it. Ask one person: "Is anything unclear?"',
  },
  notes: 'Synthesis of Chapter 3 tools: goal-setting (Locke & Latham), priorities and stop-doing, single ownership, delegation, decision rights, two-way doors.',
};

export default lesson;
