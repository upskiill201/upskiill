import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: the spare room. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The spare room',
  summary: 'The flat\'s tiny spare room is suddenly free. Ada wants it as an office. Ngozi wants it for her fabric stock. "I want the room" against "I want the room". One of them has to lose... or do they?',
  minutes: 11,
  outcomes: [
    'See how two clashing demands can both be met',
    'Notice the interests hiding behind "I want it"',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Two claims, one room',
      beats: [
        { speaker: 'narrator', text: 'The cousin who used the spare room has moved out. Ada and Ngozi both claim it on the same evening.' },
        { speaker: 'ada', text: 'I need it as an office. I can\'t do Friday video calls in the living room.' },
        { speaker: 'narrator', text: 'Ngozi sells ankara fabric online. Her rolls are stacked in her bedroom and getting dusty. She wants the room too.' },
        { speaker: 'remi', text: 'So flip a coin? Or split the week?' },
        { speaker: 'ada', text: 'Wait. What do we each actually need from it? I need a quiet desk on Friday mornings.' },
        { speaker: 'narrator', text: 'Ngozi needs dry shelves for the fabric, and a place to pack orders, usually in the evenings.' },
        { speaker: 'tey', text: 'This chapter: stop splitting, start trading. Find what each side really needs, and build a deal bigger than either demand.' },
      ],
      choice: {
        prompt: 'What could work for both of them?',
        options: [
          { text: 'Shelves along one wall for Ngozi\'s fabric, a desk by the window for Ada, and Friday mornings kept quiet', outcome: 'Yes. Both needs fit in one room, because they need different things at different times.', best: true },
          { text: 'Flip a coin', outcome: 'Fair, but one of them loses completely, and both needs could have been met.' },
          { text: 'Ada gets it Monday to Wednesday, Ngozi Thursday to Sunday', outcome: 'A split. Ngozi\'s fabric still has nowhere to live, and Ada loses Fridays.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When two people want the same thing, ask what each needs it for. The answers often fit together.',
    },
  ],
  apply: {
    scenario: 'The spare room.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A position or an interest?',
        groups: ['Position', 'Interest'],
        items: [
          { text: '"I want the room."', group: 0 },
          { text: 'A quiet desk on Friday mornings', group: 1 },
          { text: 'Dry shelves for fabric', group: 1 },
          { text: '"It should be mine."', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why could both needs fit in one room?',
        options: [
          { text: 'They need different things at different times: shelves and evenings vs a desk and Friday mornings' },
          { text: 'The room is huge', why: 'It\'s tiny; the needs just don\'t clash.' },
          { text: 'They can\'t', why: 'They can, once you look at interests.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to the part of the deal.',
        pairs: [
          ['Ngozi\'s fabric', 'Shelves on one wall'],
          ['Ada\'s calls', 'Desk by the window'],
          ['Quiet for calls', 'Friday mornings kept quiet'],
          ['Packing orders', 'Evenings for Ngozi'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Just flip a coin. It\'s fair.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Fine, flip it.', why: 'That skips a better deal.' },
          { text: 'I\'m the leaseholder, so it\'s mine.', why: 'Pulling rank hurts the friendship.' },
          { text: 'Fair, but one of us loses everything. If we both say what we need it for, we might both win.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question that unlocked it.',
        template: '"What do we each [[1]] [[2]] from it?"',
        blanks: [['actually', 'really'], ['need']],
        distractors: ['secretly', 'hate'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "Ada Monday to Wednesday, Ngozi Thursday to Sunday"?',
        options: [
          { text: 'Nothing', why: 'Ngozi\'s fabric still has nowhere to live.' },
          { text: 'It splits the room without meeting either need' },
          { text: 'It\'s too generous', why: 'It\'s just a split, not a solution.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s first message to Ngozi starts a fight?',
        lines: [
          'About the spare room.',
          'I need a quiet place for Friday calls.',
          'Your fabric business isn\'t really a priority.',
          'What do you need the room for?',
        ],
        bug: 2,
        fix: 'Delete it, and ask about her needs.',
        explanation: 'It dismisses Ngozi\'s interest before hearing it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how they found the deal.',
        lines: ['Both claim the room', 'Ask what each needs it for', 'Notice the needs don\'t clash', 'Design a room that serves both'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day of the week does Ada need quiet mornings?',
        answers: ['Friday', 'friday', 'Fridays'],
        placeholder: 'A day',
      },
      {
        kind: 'sortGroups',
        prompt: 'Splitting or trading?',
        groups: ['Splitting', 'Trading'],
        items: [
          { text: 'Half the week each', group: 0 },
          { text: 'Shelves for her, desk for me', group: 1 },
          { text: 'Flip a coin', group: 0 },
          { text: 'Quiet Fridays for evenings packing', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you and someone else both want. What does each of you need it for?',
    starters: ['We both want...', 'I need it for... They might need it for...'],
  },
  deepen: {
    title: 'Integrative negotiation',
    summary: 'Researchers call deals that meet both sides\' interests "integrative", as opposed to "distributive" deals that just divide a fixed amount. Many negotiations that look fixed aren\'t.',
  },
  notes: 'Fictional: spare room; Ngozi sells ankara fabric online. Integrative vs distributive negotiation: Walton & McKersie (1965), A Behavioral Theory of Labor Negotiations; Pruitt (1981).',
};

export default lesson;
