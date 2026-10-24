import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 16 — publishing myths: cost, servers, permanence, perfection. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Publishing: myth or fact?',
  summary: 'Clinton has heard a lot about putting websites online. Most of it is wrong. Sort myth from fact before Kofi clicks upload.',
  minutes: 11,
  outcomes: ['Separate publishing myths from facts', 'Explain what free hosting covers', 'Know that a live site can always be changed'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Putting a website online always costs money.', isFact: false, explain: 'Several hosts have free plans for simple sites made of HTML, CSS and images. A custom name like mensahbeats.com usually costs a yearly fee, but it\'s optional.' },
        { text: 'You need to run your own server.', isFact: false, explain: 'Hosting companies run the servers. You upload a folder.' },
        { text: 'Once it\'s live, you can\'t change it.', isFact: false, explain: 'Upload new files and the live site updates. Sites change all the time.' },
        { text: 'A free host gives you a web address you can share.', isFact: true, explain: 'Usually something like your-name.a-host-name.app. It works on any phone.' },
        { text: 'Your site has to be perfect before you publish.', isFact: false, explain: 'Version 1.0 just has to be useful. Real sites ship, then improve.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Version 1.0, not version perfect',
      caption: 'Kofi\'s footer says which version is live. Changing it later is one edit and one upload.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  small { font-size: 0.875rem; }\n</style>\n<h1>Mensah Beats</h1>\n<footer><p><small>Mensah Beats v1.0 &copy; 2026</small></p></footer>\n',
      challenge: 'Change v1.0 to v1.1. That\'s what an update looks like.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s publishing myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Publishing always costs money', group: 0 },
          { text: 'Free hosts give you a shareable address', group: 1 },
          { text: 'Live sites can never change', group: 0 },
          { text: 'You can update by uploading again', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What usually costs money when you publish?',
        options: [
          { text: 'Uploading every file', why: 'Free plans cover simple sites.' },
          { text: 'A custom name like mensahbeats.com, and it\'s optional' },
          { text: 'Every visitor', why: 'Free plans have limits, but simple sites rarely hit them.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a footer with the small print "Mensah Beats v1.0"',
        starter: '<h1>Mensah Beats</h1>\n\n',
        solution: '<h1>Mensah Beats</h1>\n<footer><p><small>Mensah Beats v1.0</small></p></footer>\n',
        hint: '<footer><p><small>Mensah Beats v1.0</small></p></footer>',
        checks: [
          { message: 'A footer', dom: { selector: 'footer', count: 1 } },
          { message: 'Version in small print', dom: { selector: 'footer small', text: 'v1.0' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I want to add a bookings page and a gallery before I publish anything.',
        options: [
          { text: 'Yes, wait until it\'s perfect.', why: 'The poster goes to print Friday.' },
          { text: 'Never add pages after publishing.', why: 'You can add pages any time.' },
          { text: 'Ship v1.0 now for the poster. Add those as v1.1 and v1.2 later.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"It always costs money"', 'Free plans exist for simple sites'],
          ['"You need your own server"', 'Hosts run the servers'],
          ['"It can\'t change"', 'Upload again to update'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['Free hosts give you a web address.', 'You must buy a server to publish a page.', 'You can update a live site.'],
        bug: 1,
        explanation: 'Hosting companies run the servers for you.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is ready to publish as v1.0?',
        options: [
          { text: 'A readable page with his name, beats and a way to book him' },
          { text: 'A page with only "coming soon"', why: 'Nothing for the organiser to see yet.' },
          { text: 'Nothing until it has ten pages', why: 'Ship the useful version first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the footer.',
        language: 'html',
        template: '<footer><p><small>Mensah Beats v1.0 [[1]] 2026</small></p></footer>',
        blanks: [['&copy;']],
        distractors: ['&amp;', '&lt;', '&nbsp;'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What file name does the host send by default? (file name)',
        answers: ['index.html'],
        placeholder: 'A file name',
      },
      {
        kind: 'mcq',
        prompt: 'Why say "check the current terms" about free hosts?',
        options: [
          { text: 'Free hosts are illegal', why: 'They\'re normal services. Their terms just change.' },
          { text: 'It doesn\'t matter', why: 'Limits and rules do change.' },
          { text: 'Plans and limits change over time' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s stopping you from publishing your own page? Is it a real reason or one of these myths?',
    starters: ['I\'ve been waiting because...', 'Actually...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "free static site hosting" and look at two hosts\' free plans. Check their current terms and what they include.',
  },
  notes: 'Free static hosting plans (Netlify, GitHub Pages, Cloudflare Pages and others) exist at time of writing; terms change. Custom domains usually cost a yearly registration fee.',
};

export default lesson;
