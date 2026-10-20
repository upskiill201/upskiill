import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: the covers and the page match. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: side by side',
  summary: 'Kofi puts his phone next to his laptop: the page on one screen, the Sunrise in Osu cover on the other. Same night blue. Same orange. Efua sends a single orange heart. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use hex codes for exact colours', 'Build a palette with jobs', 'Read a hex code'],
  learn: [
    {
      kind: 'story',
      title: 'They match',
      beats: [
        { speaker: 'narrator', text: 'Phone on the left: Mensah Beats. Laptop on the right: the Sunrise in Osu cover. Same night blue, same orange.' },
        { speaker: 'kofi', text: 'It looks like a brand. It looks like MY brand.' },
        { speaker: 'tey', text: 'It does. Let\'s lock it in before we get to the hard part: making sure everyone can read it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: colours.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Rebuild the palette: #14213D page, #FFF6E5 text, #FF9600 h1 and links',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<p><a href="#book">Book me</a></p>\n',
        solution: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  h1, a { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<p><a href="#book">Book me</a></p>\n',
        hint: 'A body rule and an h1, a rule.',
        checks: [
          { message: 'Night page', dom: { selector: 'body', style: 'background-color', styleValue: '#14213D' } },
          { message: 'Cream text', dom: { selector: 'body', style: 'color', styleValue: '#FFF6E5' } },
          { message: 'Orange h1', dom: { selector: 'h1', style: 'color', styleValue: '#FF9600' } },
          { message: 'Orange links', dom: { selector: 'a', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In #FF9600, which pair is green?',
        options: [
          { text: 'FF', why: 'That\'s red.' },
          { text: '96' },
          { text: '00', why: 'That\'s blue.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each colour to its job in Kofi\'s palette.',
        pairs: [
          ['Night #14213D', 'Background'],
          ['Cream #FFF6E5', 'Text'],
          ['Orange #FF9600', 'Accent'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken code.',
        language: 'css',
        lines: ['body { background-color: #14213D; }', 'h1 { color: FF9600; }', 'p { color: #FFF6E5; }'],
        bug: 1,
        explanation: 'Missing the #.',
        fix: 'h1 { color: #FF9600; }',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good brand colour source, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Your own cover art', group: 0 },
          { text: 'Someone else\'s website', group: 1 },
          { text: 'Your own photo of your city', group: 0 },
          { text: 'Random names from a list', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why not use pink for all the paragraphs? It\'s in the palette.',
        options: [
          { text: 'Pink\'s job is one or two big labels. Paragraphs are cream, so they\'re calm and readable.' },
          { text: 'Great idea.', why: 'Each colour has one job.' },
          { text: 'Pink is broken.', why: 'It\'s fine, for its job.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which colour is this?',
        code: 'h1 { color: rgb(255, 150, 0); }',
        language: 'css',
        options: [
          { text: 'The same orange as #FF9600' },
          { text: 'A blue', why: 'Blue is 0 here.' },
          { text: 'Grey', why: 'Grey has equal red, green and blue.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the code for pure white.',
        template: '#[[1]]',
        blanks: [['FFFFFF', 'ffffff', 'FFF']],
        distractors: ['000000', 'WHITE', 'FF9600'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which symbol starts every hex colour code? (type its name)',
        answers: ['hash', 'hashtag', 'pound', 'number sign', 'hash sign'],
        placeholder: 'A symbol name',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the palette steps in order.',
        lines: ['Pick a dark background', 'Pick a light text colour', 'Pick one bright accent', 'Write the codes at the top'],
      },
    ],
  },
  reflect: {
    prompt: 'Put your page next to the picture you took your colours from. Do they look like one brand?',
    starters: ['They match because...', 'I\'d change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your four palette codes into your own page\'s CSS and give each one its job.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
