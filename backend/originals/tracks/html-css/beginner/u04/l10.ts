import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Clinton's colour test. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Clinton\'s colour test',
  summary: 'Clinton bets Kofi he can\'t restyle the whole page in under a minute. Kofi changes one word in a grouped rule and every heading and link switches colour. Clinton pays up (one meat pie). Now: the checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Put CSS in the right place', 'Use colour properties and link rules', 'Group and target selectors'],
  learn: [
    {
      kind: 'story',
      title: 'One minute',
      beats: [
        { speaker: 'clinton', text: 'Bet you a meat pie you can\'t make everything pink in under a minute.' },
        { speaker: 'narrator', text: 'Kofi changes one word: h1, h2, a { color: hotpink; }. Every heading and link turns pink. Eleven seconds.' },
        { speaker: 'clinton', text: '...I\'ll get you the pie.' },
        { speaker: 'tey', text: 'That\'s the power of grouping. Quick check before the next part.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: Clinton\'s colour test.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Win the bet: make h1, h2 and every link hotpink with one rule',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<h2>Gigs</h2>\n<p><a href="#">Book me</a></p>\n',
        solution: '<style>\n  h1, h2, a { color: hotpink; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>Gigs</h2>\n<p><a href="#">Book me</a></p>\n',
        hint: 'h1, h2, a { color: hotpink; }',
        checks: [
          { message: 'Pink h1', dom: { selector: 'h1', style: 'color', styleValue: 'hotpink' } },
          { message: 'Pink h2', dom: { selector: 'h2', style: 'color', styleValue: 'hotpink' } },
          { message: 'Pink link', dom: { selector: 'a', style: 'color', styleValue: 'hotpink' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each place CSS can live to when it fits.',
        pairs: [
          ['style attribute', 'A rare one-off'],
          ['style tag in the head', 'One page'],
          ['style.css', 'The whole site'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which property sets the colour behind the text?',
        options: [
          { text: 'color', why: 'That\'s the text itself.' },
          { text: 'background-color' },
          { text: 'back-colour', why: 'Not a CSS property.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the selector that\'s wrong.',
        language: 'css',
        lines: ['body { background-color: black; color: white; }', 'h1 h2 { color: orange; }', 'li a { color: gold; }'],
        bug: 1,
        explanation: 'Missing comma: it means "h2 inside h1". Write h1, h2.',
        fix: 'h1, h2 { color: orange; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the Book me link?',
        code: '<style>\n  body { color: white; }\n  li a { color: gold; }\n</style>\n<p><a href="#">Book me</a></p>',
        language: 'html',
        options: [
          { text: 'Gold', why: 'It isn\'t inside an li.' },
          { text: 'White', why: 'Links don\'t take body\'s colour.' },
          { text: 'The browser\'s default link blue' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Grouping or "inside"?',
        groups: ['Grouping (comma)', 'Inside (space)'],
        items: [
          { text: 'h1, h2', group: 0 },
          { text: 'li a', group: 1 },
          { text: 'h2, h3, a', group: 0 },
          { text: 'figure img', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Where do I put the style tag on a full page?',
        options: [
          { text: 'At the end, after html.', why: 'That\'s outside the page. Put it in the head.' },
          { text: 'In the head, so the browser has the looks before it shows the body.' },
          { text: 'In every paragraph.', why: 'That\'s the style attribute.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the link to a stylesheet.',
        language: 'html',
        template: '<link [[1]]="stylesheet" href="style.css">',
        blanks: [['rel']],
        distractors: ['src', 'type', 'class'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who proposed CSS in 1994? (his first name)',
        answers: ['hakon', 'håkon', 'haakon'],
        placeholder: 'A first name',
      },
      {
        kind: 'mcq',
        prompt: 'How many colours does a good beginner palette usually start with?',
        options: [
          { text: 'About three: background, text and an accent' },
          { text: 'At least fifteen', why: 'That\'s a sweet shop.' },
          { text: 'Exactly one', why: 'You need at least a background and text.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from the last four lessons will save you the most time?',
    starters: ['The one that saves time is...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take Clinton\'s bet yourself: restyle your own page\'s headings and links by changing one word.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
