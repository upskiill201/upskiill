import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9 — selectors: one element, several elements (grouping), elements inside elements. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Picking what to style',
  summary: 'Kofi\'s stylesheet has five rules that all say color: orange. Tey shows him how one selector can pick several kinds of element at once, and how to pick only the links inside his gig list.',
  minutes: 11,
  outcomes: ['Group selectors with a comma', 'Pick elements inside other elements', 'Write shorter, clearer stylesheets'],
  learn: [
    {
      kind: 'compare',
      title: 'Five rules vs two',
      before: { label: 'Repeated rules', text: 'h1 { color: orange; }\nh2 { color: orange; }\nh3 { color: orange; }\na { color: orange; }\nfigcaption { color: orange; }\n\nFive rules, one idea. Change the accent and you edit five lines.' },
      after: { label: 'Grouped and targeted', text: 'h1, h2, h3, a { color: orange; }\nfigure figcaption { color: gold; }\n\nA comma groups selectors: one rule for all four. A space means "inside": only figcaptions that sit inside a figure.' },
      notes: [
        'A comma means "and": h1, h2 picks both.',
        'A space means "inside": li a picks links inside list items.',
        'Fewer rules, fewer places for mistakes.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Group and target',
      caption: 'The comma groups the headings and links. The space picks only links inside the list.',
      code: '<style>\n  h1, h2 { color: orange; }\n  li a { color: gold; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>Gigs</h2>\n<ul>\n  <li><a href="#">Sound Up Saturdays</a></li>\n</ul>\n<p><a href="#">Book me</a></p>\n',
      challenge: 'Notice the Book me link stays blue: it isn\'t inside an li. Add a rule for p a too.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Comma = and (h1, h2). Space = inside (li a). Group what\'s the same; target what\'s special.',
    },
  ],
  apply: {
    scenario: 'Kofi tidies his stylesheet.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make h1 and h2 both orange with one grouped rule',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n',
        solution: '<style>\n  h1, h2 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n',
        hint: 'h1, h2 { color: orange; }',
        checks: [
          { message: 'The h1 is orange', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
          { message: 'The h2 is orange', dom: { selector: 'h2', style: 'color', styleValue: 'orange' } },
          { message: 'One style tag', dom: { selector: 'style', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the comma in h1, h2 mean?',
        options: [
          { text: 'Style h1 and h2' },
          { text: 'Style h2s inside h1s', why: 'That would be a space: h1 h2.' },
          { text: 'Nothing, it\'s a typo', why: 'The comma groups selectors.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which link turns gold?',
        code: '<style>\n  li a { color: gold; }\n</style>\n<ul><li><a href="#">Gig list link</a></li></ul>\n<p><a href="#">Book me</a></p>',
        language: 'html',
        options: [
          { text: 'Both links', why: 'Only links inside an li.' },
          { text: 'Only the gig list link' },
          { text: 'Only Book me', why: 'Book me is inside a p, not an li.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make only the links inside the gig list gold',
        starter: '<style>\n\n</style>\n<ul>\n  <li><a href="#">Sound Up Saturdays</a></li>\n</ul>\n<p><a href="#">Book me</a></p>\n',
        solution: '<style>\n  li a { color: gold; }\n</style>\n<ul>\n  <li><a href="#">Sound Up Saturdays</a></li>\n</ul>\n<p><a href="#">Book me</a></p>\n',
        hint: 'A space means inside: li a { color: gold; }',
        checks: [
          { message: 'The gig link is gold', dom: { selector: 'li a', style: 'color', styleValue: 'gold' } },
          { message: 'Both links are still there', dom: { selector: 'a', count: 2 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to what it picks.',
        pairs: [
          ['h1, h2', 'Every h1 and every h2'],
          ['li a', 'Links inside list items'],
          ['figure figcaption', 'Captions inside figures'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the selector that doesn\'t do what Kofi wanted (both headings orange).',
        language: 'css',
        lines: ['body { color: white; }', 'h1 h2 { color: orange; }', 'a { color: orange; }'],
        bug: 1,
        explanation: 'Without a comma it means "h2 inside h1", which never happens. Write h1, h2.',
        fix: 'h1, h2 { color: orange; }',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a rule that makes h2 and h3 teal.',
        language: 'css',
        tiles: ['h2,', 'h3', '{', 'color: teal;', '}'],
        distractors: ['h2 h3', '(', ';;'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My stylesheet has twelve rules that all say orange. Is that bad?',
        options: [
          { text: 'Yes, delete them all.', why: 'Group them instead.' },
          { text: 'Make it twenty.', why: 'Shorter is easier to change.' },
          { text: 'Not wrong, just long. Group them with commas into one rule and it\'s one edit to change.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule for links inside the gig list.',
        language: 'css',
        template: 'ul [[1]] { color: gold; }',
        blanks: [['a']],
        distractors: [',', 'p', 'h1'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which character groups selectors so one rule styles several? (type the character name)',
        answers: ['comma', 'a comma'],
        placeholder: 'A character name',
      },
    ],
  },
  reflect: {
    prompt: 'Look at a stylesheet you\'ve written. Which rules could be grouped into one?',
    starters: ['These could be grouped...', 'It would save...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write one grouped rule for all your headings, and one "inside" rule for links in a list.',
  },
  notes: 'Selector list (comma) and descendant combinator (space) per MDN.',
};

export default lesson;
