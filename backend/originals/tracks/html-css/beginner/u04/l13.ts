import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 13 — which rule wins: later rules, more specific rules, and inheritance. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Which rule wins?',
  summary: 'Kofi has two rules for the same heading: one says orange, one says white. The heading is white, and he has no idea why. Tey explains the "cascade" in CSS\'s name, in three simple rules.',
  minutes: 11,
  outcomes: ['Predict which of two rules wins', 'Explain why a more specific rule beats a general one', 'Explain inheritance from body'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'When two rules disagree about the same thing, CSS needs a way to pick. Rule one: if they\'re equally specific, the later one wins. Kofi has h1 { color: orange; } at the top and h1 { color: white; } further down. Which wins?',
          replies: ['The white one', 'The orange one'],
        },
        {
          tey: 'White: it comes later. Rule two: a more specific selector beats a general one, wherever it is. li a { color: gold; } beats a { color: orange; } for links in lists, because it describes them more precisely.',
          replies: ['And rule three?'],
        },
        {
          tey: 'Inheritance. Some properties, like color and font-family, flow down from parent to child. Set color on body and every paragraph inside gets it, unless a rule for that element says otherwise. Links are the exception: the browser gives them their own colour.',
          replies: ['How do I debug it?'],
        },
        {
          tey: 'Ask three questions: Is another rule more specific? Is another rule later? Is the colour coming from a parent? Usually the answer jumps out. And keep your stylesheet short, so there\'s less to fight.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The later rule wins',
      caption: 'Two rules for h1. Run it, then swap their order and run again.',
      code: '<style>\n  h1 { color: orange; }\n  h1 { color: white; background-color: black; }\n</style>\n<h1>Mensah Beats</h1>\n',
      challenge: 'Move the orange rule below the white one. What colour is the heading now?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Equally specific? Later wins. More specific? It wins. Not set at all? It may inherit from the parent.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s heading won\'t turn orange.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the heading?',
        code: 'h1 { color: orange; }\nh1 { color: teal; }',
        language: 'css',
        options: [
          { text: 'Orange', why: 'Same selector, so the later rule wins.' },
          { text: 'Teal' },
          { text: 'A mix of both', why: 'CSS picks one winner.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix Kofi\'s heading: it should be orange. Move or remove the rule that wins',
        starter: '<style>\n  h1 { color: orange; }\n  h1 { color: white; }\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'The later white rule wins. Delete it, or move the orange rule below it.',
        checks: [
          { message: 'The heading is orange', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the gig link inside the list?',
        code: 'li a { color: gold; }\na { color: orange; }\n\n<li><a href="#">Sound Up Saturdays</a></li>',
        language: 'html',
        options: [
          { text: 'Orange, because it comes later', why: 'Order only decides between equally specific rules.' },
          { text: 'Gold, because li a is more specific' },
          { text: 'Blue', why: 'Both rules apply; the more specific one wins.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the winner.',
        pairs: [
          ['Same selector, two rules', 'The later rule'],
          ['a vs li a, for a link in a list', 'li a'],
          ['Nothing set on p, color on body', 'p inherits body\'s colour'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it usually inherit from the parent?',
        groups: ['Inherits', 'Doesn\'t inherit'],
        items: [
          { text: 'color', group: 0 },
          { text: 'background-color', group: 1 },
          { text: 'font-family', group: 0 },
          { text: 'line-height', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My heading won\'t turn orange no matter what I type!',
        options: [
          { text: 'Check for a later h1 rule, a more specific rule, or a typo in color.' },
          { text: 'Type orange louder.', why: 'Check order, specificity and typos.' },
          { text: 'CSS is broken.', why: 'Usually another rule is winning.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that\'s overriding the orange heading.',
        language: 'css',
        lines: ['h1 { color: orange; }', 'body { color: white; }', 'h1 { color: white; }'],
        bug: 2,
        explanation: 'Same selector, later in the file: it wins. body\'s white doesn\'t matter because h1 sets its own colour.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rules.',
        template: 'Equally specific? [[1]] wins. More [[2]]? It wins.',
        blanks: [['Later', 'The later one'], ['specific']],
        distractors: ['Earlier', 'colourful', 'Bigger'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the word for properties flowing from a parent to the elements inside it? (one word)',
        answers: ['inheritance', 'inherit', 'inherited'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep a stylesheet short?',
        options: [
          { text: 'Browsers have a rule limit of ten', why: 'No such limit. Short is just easier to reason about.' },
          { text: 'Short CSS makes beats louder', why: 'It\'s about fewer conflicts.' },
          { text: 'Fewer rules means fewer rules fighting each other' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever had a "why won\'t it change?" moment? Which of the three questions would have helped?',
    starters: ['It happened when...', 'The question that would help is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write two rules that disagree. Predict the winner, then run it. Swap them and predict again.',
  },
  notes: 'Cascade, specificity and inheritance simplified for beginners (MDN "Cascade, specificity, and inheritance"). Classes and IDs, and specificity in full, come in Course 2, Chapter 2.',
};

export default lesson;
