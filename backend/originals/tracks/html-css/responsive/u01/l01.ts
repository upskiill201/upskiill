import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 1 — opens the course: the site is live, the beat list needs cards; every element is a box. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Everything is a box',
  summary: 'Mensah Beats is live and people keep opening it. But the beats are one long list, and Efua has sketched something better: a card for every beat. Kofi tries it, and the text is jammed against the edges. Time to learn the secret of every layout: boxes.',
  minutes: 11,
  outcomes: ['Explain that every element on a page is a box', 'Make a box visible with a border', 'Group a beat\'s details inside one article'],
  learn: [
    {
      kind: 'story',
      title: 'Seven weeks to uni',
      beats: [
        { speaker: 'narrator', text: 'Seven weeks to uni. The poster worked: people at Sound Up Saturdays opened Kofi\'s link all night. Now the organiser wants him back every month.' },
        { speaker: 'efua', text: 'Your site works. But the beats are a plain list. I drew you something: one card per beat. Cover, name, play button.' },
        { speaker: 'kofi', text: 'I tried it. The words are squashed against the border, and the cards touch each other.' },
        { speaker: 'miracle', text: 'That\'s the moment every web developer meets the box model. On a call tonight?' },
      ],
      choice: {
        prompt: 'How should Kofi give the text some room?',
        options: [
          {
            text: 'Learn how boxes work: space inside the border, space outside it, and the border itself.',
            outcome: 'Every card gets the same neat room, and he can change all of it with one number.',
            best: true,
          },
          {
            text: 'Type spaces and empty lines around the words.',
            outcome: 'The browser squashes the extra spaces into one, and the empty lines look different on every phone.',
          },
          {
            text: 'Make the text tiny so it doesn\'t reach the edges.',
            outcome: 'Grandma can\'t read it any more, and the text still touches the border.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Every element is a box.</strong> Headings, paragraphs, images, links: the browser draws each one as a rectangle, even when you can\'t see its edges. Layout is just deciding how big those boxes are and how far apart they sit.</p>',
    },
    {
      kind: 'tryIt',
      title: 'See the boxes',
      caption: 'A border makes a box visible. Each beat sits in its own article: one self-contained card.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<article>\n  <h2>Sunrise in Osu</h2>\n  <p>Slow, warm, made at 5am.</p>\n</article>\n<article>\n  <h2>Jollof Bounce</h2>\n  <p>Fast, loud, for dancing.</p>\n</article>\n',
      challenge: 'Add h1 { border: 2px solid #F0438A; }. The heading is a box too, as wide as the page.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every element is a box. An article groups one self-contained piece, like a beat card.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this course:</strong> boxes, classes, Flexbox, Grid and phones first. By the end, Mensah Beats rearranges itself for every screen in the house. <strong>This chapter:</strong> padding, borders, margins and widths, until the beat cards finally have room to breathe.</p>',
    },
  ],
  apply: {
    scenario: 'Efua\'s card sketch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the browser draw every element as?',
        options: [
          { text: 'A circle', why: 'Even round-looking things are boxes underneath.' },
          { text: 'Nothing, only text has a shape', why: 'Every element gets a box, visible or not.' },
          { text: 'A rectangle: a box' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make each beat card visible: give every article a 2px solid #FF9600 border',
        starter: '<style>\n\n</style>\n<article>\n  <h2>Sunrise in Osu</h2>\n</article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; }\n</style>\n<article>\n  <h2>Sunrise in Osu</h2>\n</article>\n',
        hint: 'article { border: 2px solid #FF9600; }',
        checks: [
          { message: 'The card has a border', dom: { selector: 'article', style: 'border-style', styleValue: 'solid' } },
          { message: 'In Kofi\'s orange', dom: { selector: 'article', style: 'border-color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Learn how boxes work', 'Neat room, set with one number'],
          ['Type extra spaces', 'The browser squashes them'],
          ['Make the text tiny', 'Grandma can\'t read it'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it a box?',
        groups: ['A box', 'Not a box'],
        items: [
          { text: 'An h1', group: 0 },
          { text: 'An image', group: 0 },
          { text: 'A CSS comment', group: 1 },
          { text: 'A paragraph', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why put each beat in an article? Can\'t I just use headings and paragraphs?',
        options: [
          { text: 'The article wraps one beat\'s name, cover and text together, so the whole card can get one border.' },
          { text: 'Articles are only for news.', why: 'An article is any self-contained piece, like one card.' },
          { text: 'Because it makes the text bigger.', why: 'It groups things. It doesn\'t change size.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t give the text room.',
        language: 'html',
        lines: ['<article>', '<p>&nbsp;&nbsp;&nbsp;Slow, warm, made at 5am.</p>', '</article>'],
        bug: 1,
        explanation: 'Spaces typed into text are a hack: they look different everywhere. Room comes from CSS, as you\'ll see next lesson.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How wide is the h1\'s box?',
        code: 'h1 { border: 2px solid #F0438A; }\n\n<h1>Mensah Beats</h1>',
        language: 'html',
        options: [
          { text: 'Exactly as wide as the words', why: 'Headings and paragraphs stretch across the page.' },
          { text: '2px wide', why: '2px is the border\'s thickness.' },
          { text: 'As wide as the page' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the card.',
        language: 'html',
        template: '<[[1]]>\n  <h2>Jollof Bounce</h2>\n  <p>Fast, loud, for dancing.</p>\n</[[2]]>',
        blanks: [['article'], ['article']],
        distractors: ['card', 'box', 'beat'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every element on a page is drawn as a ___. (one word)',
        answers: ['box', 'rectangle'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Wrap the beat in an article so it can become a card',
        starter: '<h2>Jollof Bounce</h2>\n<p>Fast, loud, for dancing.</p>\n',
        solution: '<article>\n  <h2>Jollof Bounce</h2>\n  <p>Fast, loud, for dancing.</p>\n</article>\n',
        hint: '<article> before the h2, </article> after the p.',
        checks: [
          { message: 'One card', dom: { selector: 'article', count: 1 } },
          { message: 'The name is inside it', dom: { selector: 'article h2', text: 'Jollof Bounce' } },
          { message: 'So is the text', dom: { selector: 'article p', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at an app you use every day. Can you spot the boxes: cards, buttons, rows?',
    starters: ['I can see boxes for...', 'The cards are...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'On your own page, wrap one section in an article and give it a border. Notice where its edges really are.',
  },
  notes: 'Opens Course 2 (Responsive Web Design with CSS), Chapter 1 (Boxes everywhere), per the 2026-10-20 restructure. The CSS box model: content, padding, border, margin (MDN, "The box model"). article = self-contained composition (HTML spec). Whitespace collapsing in HTML is standard.',
};

export default lesson;
