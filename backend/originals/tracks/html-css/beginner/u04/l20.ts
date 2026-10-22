import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 20 — Chapter Challenge: Mensah Beats v0.4. Climax: the page stops looking like 1996. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v0.4',
  summary: 'The organiser wants to share Kofi\'s page with her followers before the gig. Kofi gives it a full stylesheet: night-blue page, one orange accent, two fonts, room to breathe. Then he sends it to Efua.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Style a whole page with a small, clear stylesheet', 'Use one accent and two fonts', 'Fix a broken rule before anyone sees it'],
  learn: [
    {
      kind: 'story',
      title: 'Send it to Efua',
      beats: [
        { speaker: 'narrator', text: 'Friday. Nine weeks to uni. The organiser: "I want to share your page with my followers before Saturday. Make it look like the music?"' },
        { speaker: 'kofi', text: 'Night blue, orange accent, Georgia for the name, Verdana for the rest, line-height 1.6. And no rainbow.' },
        { speaker: 'narrator', text: 'He sends it to Efua. Three dots appear. Disappear. Appear.' },
        { speaker: 'efua', text: 'Okay. This looks like your music. I\'d share this.' },
        { speaker: 'tey', text: 'From Efua, that\'s a standing ovation. Let\'s build v0.4.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v0.1 to v0.3', body: 'A skeleton, words people read, links, pictures and beats you can play.', code: '<h1>Mensah Beats</h1>\n<audio controls src="beat-1.mp3"></audio>', language: 'html' },
        { title: 'v0.4 (tonight)', body: 'A stylesheet: the page, one accent, two fonts, room to breathe.', code: 'body { ... }\nh1, h2, a { color: orange; }\np { line-height: 1.6; }', language: 'css' },
        { title: 'Next chapter', body: 'Exact colours from his album art, readable contrast, sizes that respect readers, and then: the site goes live on the internet.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v0.4.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the page. midnightblue background, white text, and Verdana with a sans-serif fallback',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  body { background-color: midnightblue; color: white; font-family: Verdana, sans-serif; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'One body rule, three properties.',
        checks: [
          { message: 'A midnightblue page', dom: { selector: 'body', style: 'background-color', styleValue: 'midnightblue' } },
          { message: 'White text', dom: { selector: 'body', style: 'color', styleValue: 'white' } },
          { message: 'Verdana with a fallback', dom: { selector: 'body', style: 'font-family', styleValue: 'Verdana, sans-serif' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the accent. One rule that makes h1, h2 and links orange',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<p><a href="#book">Book me</a></p>\n',
        solution: '<style>\n  h1, h2, a { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<p><a href="#book">Book me</a></p>\n',
        hint: 'h1, h2, a { color: orange; }',
        checks: [
          { message: 'Orange h1', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
          { message: 'Orange h2', dom: { selector: 'h2', style: 'color', styleValue: 'orange' } },
          { message: 'Orange links', dom: { selector: 'a', style: 'color', styleValue: 'orange' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 3: in v0.4, or leave it out?',
        groups: ['In v0.4', 'Leave it out'],
        items: [
          { text: 'One orange accent', group: 0 },
          { text: 'A different colour per section', group: 1 },
          { text: 'Georgia for the name only', group: 0 },
          { text: 'Everything in bold', group: 1 },
          { text: 'line-height: 1.6 on paragraphs', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ama notices the paragraphs look cramped again. Tap the cause.',
        language: 'css',
        lines: ['body { background-color: midnightblue; color: white; }', 'h1, h2, a { color: orange;', 'p { line-height: 1.6; }'],
        bug: 1,
        explanation: 'The missing } swallows the p rule after it.',
        fix: 'h1, h2, a { color: orange; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the heading?',
        code: 'h1, h2, a { color: orange; }\nh1 { color: white; }',
        language: 'css',
        options: [
          { text: 'Orange', why: 'The later h1 rule is just as specific, so it wins.' },
          { text: 'White' },
          { text: 'Both', why: 'One rule wins: the later one.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Add a lime footer and a purple gig section. More energy!',
        options: [
          { text: 'Okay, lime and purple.', why: 'Remember the rainbow page.' },
          { text: 'Remove all colour.', why: 'Keep the night blue and orange.' },
          { text: 'One accent keeps the play buttons and Book me easy to find. Energy comes from the music.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v0.4 to where you learned it.',
        pairs: [
          ['The body rule', 'Style the whole page'],
          ['h1, h2, a', 'Picking what to style'],
          ['line-height: 1.6', 'Shaping the words'],
          ['Georgia, serif', 'Choosing a font'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the heading rule.',
        language: 'css',
        template: 'h1 { font-family: [[1]], serif; font-size: [[2]]; }',
        blanks: [['Georgia'], ['48px']],
        distractors: ['Verdana', '48', 'big'],
      },
      {
        kind: 'mcq',
        prompt: 'Where should the style tag go when this becomes a full page?',
        options: [
          { text: 'In the head' },
          { text: 'After the closing html tag', why: 'Inside the head.' },
          { text: 'In every heading', why: 'That\'s the style attribute.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'The whole thing: Mensah Beats v0.4. Add the stylesheet: the page, the accent, Georgia for the h1, and breathing room for paragraphs',
        starter: '<style>\n  /* the page: midnightblue, white text, Verdana with a fallback */\n\n  /* the accent: h1, h2 and links orange */\n\n  /* the name: Georgia with a serif fallback */\n\n  /* paragraphs: line-height 1.6 */\n\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra, made late at night.</p>\n<h2>My beats</h2>\n<audio controls src="beat-2.mp3"></audio>\n<p><a href="#book">Book me</a></p>\n',
        solution:
          '<style>\n  body { background-color: midnightblue; color: white; font-family: Verdana, sans-serif; }\n  h1, h2, a { color: orange; }\n  h1 { font-family: Georgia, serif; }\n  p { line-height: 1.6; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra, made late at night.</p>\n<h2>My beats</h2>\n<audio controls src="beat-2.mp3"></audio>\n<p><a href="#book">Book me</a></p>\n',
        hint: 'Under each comment, add its rule. Four rules in total.',
        checks: [
          { message: 'A midnightblue page', dom: { selector: 'body', style: 'background-color', styleValue: 'midnightblue' } },
          { message: 'White text', dom: { selector: 'body', style: 'color', styleValue: 'white' } },
          { message: 'Orange accent on headings', dom: { selector: 'h2', style: 'color', styleValue: 'orange' } },
          { message: 'Orange links', dom: { selector: 'a', style: 'color', styleValue: 'orange' } },
          { message: 'Georgia for the name', dom: { selector: 'h1', style: 'font-family', styleValue: 'Georgia, serif' } },
          { message: 'Room between the lines', dom: { selector: 'p', style: 'line-height', styleValue: '1.6' } },
          { message: 'The beat still plays', dom: { selector: 'audio[controls]', count: 1 } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many accent colours does v0.4 use? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Efua said "I\'d share this." What would make someone want to share your page?',
    starters: ['They\'d share it because...', 'My page needs...'],
  },
  deepen: {
    title: 'Your page, v0.4',
    summary: 'Give your own page the full v0.4 treatment: a body rule, one accent, two fonts and line-height 1.6. Chapter 5 publishes it.',
  },
  notes: 'Unit Challenge. Climax per the outline: the page stops looking like 1996 (Efua: "I\'d share this"). "Site so far" uses a neutral steps card.',
};

export default lesson;
