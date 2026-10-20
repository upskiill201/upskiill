import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3 — building a palette from album art, with a job for each colour. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'A palette with jobs',
  summary: 'Kofi\'s three covers have dozens of colours. He needs four. Miracle shows him how to pick them, and how to give each colour one job so the page stays calm and consistent.',
  minutes: 12,
  outcomes: ['Build a four-colour palette from your own art', 'Give each colour one job', 'Write the palette into your CSS'],
  learn: [
    {
      kind: 'steps',
      title: 'Four colours, four jobs',
      steps: [
        { title: '1. A dark colour: the background', body: 'The night sky behind the sun on Sunrise in Osu: #14213D. Most of the page is this colour.' },
        { title: '2. A light colour: the text', body: 'A warm cream instead of pure white, from the sun itself: #FFF6E5. It\'s gentler on eyes at night.' },
        { title: '3. A bright colour: the accent', body: 'Sunset orange, #FF9600, only for headings, links and anything you can tap.' },
        { title: '4. A second bright colour, used rarely', body: 'Jollof pink, #F0438A, for one or two big things, like the "New beat" label. Never for small text (you\'ll see why in lesson 6).' },
        { title: 'Write it down', body: 'Put the palette in a comment at the top of your CSS, so you always copy the same codes.', code: '/* Palette: night #14213D, cream #FFF6E5,\n   orange #FF9600, pink #F0438A */', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kofi\'s palette at work',
      caption: 'Night, cream, orange for headings and links, pink once, for the big label.',
      code: '<style>\n  /* Palette: night #14213D, cream #FFF6E5, orange #FF9600, pink #F0438A */\n  body { background-color: #14213D; color: #FFF6E5; }\n  h1, a { color: #FF9600; }\n  h2 { color: #F0438A; }\n</style>\n<h2>New beat</h2>\n<h1>Mensah Beats</h1>\n<p>Fresh every Friday. <a href="#beats">Listen now</a></p>\n',
      challenge: 'Swap the jobs: make links pink and h2 orange. Which version looks clearer?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Dark for the background, light for text, one bright accent, one rare extra. Write the codes at the top.',
    },
  ],
  apply: {
    scenario: 'Kofi builds his palette.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each colour to its job.',
        pairs: [
          ['#14213D (night)', 'The background'],
          ['#FFF6E5 (cream)', 'The text'],
          ['#FF9600 (orange)', 'Headings and links'],
          ['#F0438A (pink)', 'One or two big labels'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write Kofi\'s palette into the page: night background, cream text, orange h1 and links',
        starter: '<style>\n  /* Palette: night #14213D, cream #FFF6E5, orange #FF9600 */\n\n</style>\n<h1>Mensah Beats</h1>\n<p><a href="#beats">Listen now</a></p>\n',
        solution: '<style>\n  /* Palette: night #14213D, cream #FFF6E5, orange #FF9600 */\n  body { background-color: #14213D; color: #FFF6E5; }\n  h1, a { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<p><a href="#beats">Listen now</a></p>\n',
        hint: 'A body rule and a grouped h1, a rule.',
        checks: [
          { message: 'Night blue page', dom: { selector: 'body', style: 'background-color', styleValue: '#14213D' } },
          { message: 'Cream text', dom: { selector: 'body', style: 'color', styleValue: '#FFF6E5' } },
          { message: 'Orange heading', dom: { selector: 'h1', style: 'color', styleValue: '#FF9600' } },
          { message: 'Orange links', dom: { selector: 'a', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the palette in a comment at the top of the CSS?',
        options: [
          { text: 'So you copy exactly the same codes every time' },
          { text: 'Browsers need it to show colours', why: 'Comments are ignored by browsers. It\'s for you.' },
          { text: 'To make the file longer', why: 'It keeps the codes consistent.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which colour should do this job?',
        groups: ['Orange accent', 'Cream text'],
        items: [
          { text: 'The Book me link', group: 0 },
          { text: 'The story paragraph', group: 1 },
          { text: 'The main heading', group: 0 },
          { text: 'The gig details', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the palette\'s jobs.',
        language: 'css',
        lines: ['body { background-color: #14213D; color: #FFF6E5; }', 'h1, a { color: #FF9600; }', 'p { color: #F0438A; }'],
        bug: 2,
        explanation: 'Pink is for one or two big labels, not every paragraph.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why cream text instead of pure white?',
        options: [
          { text: 'It\'s from my cover, and it\'s a little gentler on eyes at night, while still easy to read.' },
          { text: 'White isn\'t allowed.', why: 'It is. Cream is a softer choice.' },
          { text: 'No reason.', why: 'There is: it matches the art and is gentler.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s palette steps in order.',
        lines: ['Pick a dark background colour', 'Pick a light text colour', 'Pick one bright accent', 'Pick a rare extra colour', 'Write the codes at the top of the CSS'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the palette comment.',
        language: 'css',
        template: '[[1]] Palette: night #14213D, orange #FF9600 [[2]]',
        blanks: [['/*'], ['*/']],
        distractors: ['<!--', '-->', '//'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many colours are in Kofi\'s palette? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which element is pink?',
        code: 'h1, a { color: #FF9600; }\nh2 { color: #F0438A; }\n\n<h2>New beat</h2>\n<h1>Mensah Beats</h1>',
        language: 'html',
        options: [
          { text: 'The New beat label (h2)' },
          { text: 'Mensah Beats (h1)', why: 'h1 is orange.' },
          { text: 'Both', why: 'Only h2 is pink.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Build your own four-colour palette from your picture. What job will each colour do?',
    starters: ['Background:', 'Accent:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Use a colour picker on your own photo or art to get four hex codes. Write them as a comment in your page\'s CSS.',
  },
  notes: 'Background/text/accent palettes with clear roles are common UI practice. CSS comments use /* */, unlike HTML\'s <!-- -->.',
};

export default lesson;
