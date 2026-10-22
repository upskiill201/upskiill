import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2 — meaning in HTML, looks in CSS: the same page styled two ways. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Two jobs, two languages',
  summary: 'Clinton has an old trick from a tutorial he found: put the colour right inside the tag. Tey shows him why keeping looks in CSS is cleaner, and how one rule can change every heading at once.',
  minutes: 11,
  outcomes: ['Explain why looks belong in CSS, not HTML', 'Style many elements with one rule', 'Keep HTML easy to read'],
  learn: [
    {
      kind: 'compare',
      title: 'Clinton\'s way vs Tey\'s way',
      before: { label: 'Looks mixed into the HTML', text: '<h2 style="color: orange">My beats</h2>\n<h2 style="color: orange">Gigs</h2>\n<h2 style="color: orange">Book me</h2>\n\nIt works, but the colour is repeated three times. Changing orange to pink means editing every heading, and the HTML gets hard to read.' },
      after: { label: 'Looks in one CSS rule', text: '<style>\n  h2 { color: orange; }\n</style>\n<h2>My beats</h2>\n<h2>Gigs</h2>\n<h2>Book me</h2>\n\nOne rule styles every h2. Changing the colour means changing one word. The HTML stays clean: just what things are.' },
      notes: [
        'One rule can style every matching element.',
        'Change one line, and the whole page changes.',
        'The style attribute works, but save it for rare one-offs.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'One rule, three headings',
      caption: 'Change orange to teal and watch all three headings change together.',
      code: '<style>\n  h2 { color: orange; }\n</style>\n<h2>My beats</h2>\n<h2>Gigs</h2>\n<h2>Book me</h2>\n',
      challenge: 'Add a rule so every p is grey: p { color: grey; } and add a paragraph to see it.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write the style once, in CSS. Let it apply everywhere it matches.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s inline styles.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is one h2 rule better than a style attribute on every h2?',
        options: [
          { text: 'Change it once and every heading updates' },
          { text: 'It makes the page load more beats', why: 'It\'s about changing looks in one place.' },
          { text: 'Style attributes don\'t work', why: 'They work. They\'re just repetitive.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the repeated colours: delete the style attributes and add one rule that makes every h2 orange',
        starter: '<style>\n\n</style>\n<h2 style="color: orange">My beats</h2>\n<h2 style="color: orange">Gigs</h2>\n',
        solution: '<style>\n  h2 { color: orange; }\n</style>\n<h2>My beats</h2>\n<h2>Gigs</h2>\n',
        hint: 'Inside style: h2 { color: orange; }. Then remove style="..." from both headings.',
        checks: [
          { message: 'Both headings are orange', dom: { selector: 'h2', style: 'color', styleValue: 'orange' } },
          { message: 'No style attributes left', dom: { selector: '[style]', count: 0 } },
          { message: 'Two headings', dom: { selector: 'h2', count: 2 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clean or messy?',
        groups: ['Clean', 'Messy'],
        items: [
          { text: 'h2 { color: orange; } in the style tag', group: 0 },
          { text: 'style="color: orange" on every heading', group: 1 },
          { text: '<h2>Gigs</h2>', group: 0 },
          { text: 'An h1 used to make text big', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My way works too. Why change it?',
        options: [
          { text: 'Your way is broken.', why: 'It works. It\'s just harder to change.' },
          { text: 'No reason, just style.', why: 'There\'s a real reason: one place to change.' },
          { text: 'It works, but if Kofi wants pink tomorrow, my way means editing every heading. One rule is one edit.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kofi changes the rule to teal. What happens?',
        code: '<style>\n  h2 { color: teal; }\n</style>\n<h2>My beats</h2>\n<h2>Gigs</h2>\n<h2>Book me</h2>',
        language: 'html',
        options: [
          { text: 'Only the first heading turns teal', why: 'The rule matches every h2.' },
          { text: 'Nothing changes until he edits each heading', why: 'That\'s the point: no editing needed.' },
          { text: 'All three headings turn teal' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the "looks in CSS" rule.',
        language: 'html',
        lines: ['<style>', '  h2 { color: orange; }', '</style>', '<h2 style="color: blue">Gigs</h2>'],
        bug: 3,
        explanation: 'A one-off colour mixed into the HTML. It also fights the rule above.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['<style>', 'Starts the CSS'],
          ['h2 { color: orange; }', 'Makes every h2 orange'],
          ['<h2>Gigs</h2>', 'Says this is a heading'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule that makes every paragraph grey.',
        language: 'css',
        template: '[[1]] { color: [[2]]; }',
        blanks: [['p'], ['grey', 'gray']],
        distractors: ['h1', 'pink', 'style'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the rule h2 { color: orange; }, which word picks the elements? (one word)',
        answers: ['h2'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When is the style attribute okay?',
        options: [
          { text: 'On every element, always', why: 'That\'s Clinton\'s repetition problem.' },
          { text: 'For a rare one-off, but even then CSS is usually better' },
          { text: 'Never, it\'s forbidden', why: 'It works; save it for rare cases.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Why might it matter to keep "what things are" and "how they look" in different places, as your site grows?',
    starters: ['As the site grows...', 'It helps because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write three h2 headings and one rule that colours them all. Change the colour twice.',
  },
  notes: 'Separation of content (HTML) and presentation (CSS) was a founding aim of CSS (lesson 7).',
};

export default lesson;
