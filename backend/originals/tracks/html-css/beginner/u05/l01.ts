import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1 — opens the chapter: the poster needs a real link by Friday; colours from the album art. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The poster goes to print Friday',
  summary: 'The organiser is printing posters for Sound Up Saturdays, with every act\'s web address on them. Kofi\'s page only exists on his phone. He has one week to make it look like his brand and put it on the internet.',
  minutes: 11,
  outcomes: ['Explain why a page needs to be published to be shared', 'Choose colours from something that already belongs to you', 'Use exact colours instead of rough names'],
  learn: [
    {
      kind: 'story',
      title: 'Friday',
      beats: [
        { speaker: 'narrator', text: 'Eight weeks to uni. A message from the organiser: "Posters go to print Friday. Every act gets their web address on it. What\'s yours?"' },
        { speaker: 'kofi', text: 'My web address. My page is... a file on my phone.' },
        { speaker: 'efua', text: 'And if it\'s going on a poster, it needs to look like your album covers. Right now it\'s "midnightblue" and "orange" from a list.' },
        { speaker: 'tey', text: 'Two jobs this week. First, exact colours that belong to Kofi\'s brand, readable by everyone. Then the big one: putting the site on the internet so anyone can open it.' },
      ],
      choice: {
        prompt: 'Where should Kofi\'s colours come from?',
        options: [
          {
            text: 'His own album art: pick the exact sunset orange, pink and night blue from his covers.',
            outcome: 'The page and the covers look like one brand. On the poster, his link sits next to his cover art and they match.',
            best: true,
          },
          {
            text: 'Whatever colour names sound cool from the list of 140.',
            outcome: '"Papayawhip" and "darkorchid" sound fun, but they look nothing like his music.',
          },
          {
            text: 'Copy the colours from a famous DJ\'s website.',
            outcome: 'His page now looks like someone else\'s brand. Efua notices in one second.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Exact colours',
      caption: 'These codes come straight from Kofi\'s album art. Run it and compare it with "midnightblue" and "orange".',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  h1 { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra, made late at night.</p>\n',
      challenge: 'Change the h1 to #F0438A, the pink from Jollof Bounce\'s cover.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Brand colours come from something that\'s already yours. Colour codes give you the exact shade.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> colour codes, a palette from your own art, contrast everyone can read, text sizes that respect readers, fonts, and then publishing: moving your CSS into style.css, putting your site on a free host, and sharing a real link. The climax: Mensah Beats v1.0, live on the internet.</p>',
    },
  ],
  apply: {
    scenario: 'The poster deadline.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can\'t the organiser open Kofi\'s page yet?',
        options: [
          { text: 'It\'s only a file on his phone, not on the internet' },
          { text: 'It has too many colours', why: 'Colours don\'t stop a page opening. It isn\'t published.' },
          { text: 'Pages can\'t be shared', why: 'They can, once they\'re published.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Use Kofi\'s exact orange #FF9600 for the h1',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'h1 { color: #FF9600; }',
        checks: [
          { message: 'The heading is Kofi\'s orange', dom: { selector: 'h1', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good source for brand colours?',
        groups: ['Good source', 'Poor source'],
        items: [
          { text: 'Your own album art', group: 0 },
          { text: 'A famous DJ\'s website', group: 1 },
          { text: 'A photo you took of your city', group: 0 },
          { text: 'Random names that sound cool', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'midnightblue is close enough to my cover, isn\'t it?',
        options: [
          { text: 'Close, but not the same. The exact code makes the page and covers match on the poster.' },
          { text: 'Yes, nobody can tell.', why: 'Efua can. Exact codes match exactly.' },
          { text: 'Use black instead.', why: 'Use the exact night blue.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Colours from his album art', 'Page and covers match'],
          ['Cool-sounding names', 'Looks nothing like his music'],
          ['A famous DJ\'s colours', 'Looks like someone else\'s brand'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that isn\'t a colour code.',
        language: 'css',
        lines: ['body { background-color: #14213D; }', 'h1 { color: #FF9600; }', 'p { color: FFF6E5; }'],
        bug: 2,
        explanation: 'A colour code needs the # at the start: #FFF6E5.',
        fix: 'p { color: #FFF6E5; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What changes on the page?',
        code: 'body { background-color: #14213D; }',
        language: 'css',
        options: [
          { text: 'The page turns Kofi\'s night blue' },
          { text: 'The text turns night blue', why: 'background-color is behind the text.' },
          { text: 'Nothing, codes don\'t work in CSS', why: 'They\'re the most common way to write colours.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule with Kofi\'s cream text colour.',
        language: 'css',
        template: 'body { color: [[1]]FFF6E5; }',
        blanks: [['#']],
        distractors: ['$', '@', '%'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day must Kofi\'s web address be ready for the poster? (one word)',
        answers: ['friday'],
        placeholder: 'A day',
      },
      {
        kind: 'sortGroups',
        prompt: 'This week\'s two jobs: which one?',
        groups: ['Look like his brand', 'Go live'],
        items: [
          { text: 'Pick colours from the covers', group: 0 },
          { text: 'Put the files on a free host', group: 1 },
          { text: 'Choose readable text sizes', group: 0 },
          { text: 'Get a web address for the poster', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you already own (art, photos, a place, clothes) whose colours could become your page\'s colours?',
    starters: ['I could use...', 'Its colours are...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one photo or picture that feels like you. Write down three colours you see in it: a dark one, a light one and a bright one.',
  },
  notes: 'Opens Course 1, Chapter 5 (Colour, type and go live), per the 2026-10-20 restructure. Kofi\'s palette: night #14213D, sunset orange #FF9600, pink #F0438A, cream #FFF6E5 (Teyro-made covers).',
};

export default lesson;
