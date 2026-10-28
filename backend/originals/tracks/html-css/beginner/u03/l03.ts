import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3 — full web addresses vs links to your own pages (relative links). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Other pages, other sites',
  summary: 'Kofi\'s page is getting long, so Miracle suggests a second page just for gigs. Linking to Instagram needs the whole address. Linking to your own gigs page needs just its file name.',
  minutes: 12,
  outcomes: ['Link to another website with a full address', 'Link to your own page with its file name', 'Choose which kind of link you need'],
  learn: [
    {
      kind: 'steps',
      title: 'Two kinds of address',
      steps: [
        { title: '1. Another website: the full address', body: 'To leave your site, give the whole address, starting with https://. That\'s an absolute address: it works from anywhere.', code: '<a href="https://instagram.com/mensahbeats">Instagram</a>', language: 'html' },
        { title: '2. Your own site: a file name', body: 'A website is a folder of files. Kofi\'s site will have index.html (the home page) and gigs.html. To link between them, just use the file name. That\'s a relative address: relative to where you are.', code: '<a href="gigs.html">All my gigs</a>', language: 'html' },
        { title: '3. Back home', body: 'Every site has a home page, usually called index.html. From gigs.html, link back with its name.', code: '<a href="index.html">Back to Mensah Beats</a>', language: 'html' },
        { title: '4. Why not the full address for your own pages?', body: 'Relative links keep working when the site moves: on your computer, on a test address, and on the real internet in Chapter 13. A full address to your own site breaks the moment the address changes.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One of each',
      caption: 'One link leaves the site, one stays in it. Tap each in the page and see where they say they go.',
      code: '<h2>Find me</h2>\n<p><a href="https://instagram.com/mensahbeats">Mensah Beats on Instagram</a></p>\n<p><a href="gigs.html">All my gigs</a></p>\n',
      challenge: 'Add a third link to a page called beats.html with the text All my beats.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Leaving your site? Full address with https://. Staying on your site? Just the file name, like gigs.html.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s site gets a second page.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Full address, or just a file name?',
        groups: ['Full address', 'File name'],
        items: [
          { text: 'Kofi\'s Instagram', group: 0 },
          { text: 'His gigs page on his own site', group: 1 },
          { text: 'The Sound Up Saturdays website', group: 0 },
          { text: 'His home page, index.html', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Link to Kofi\'s gigs page: a link to gigs.html that says All my gigs',
        starter: '<h2>Next gig</h2>\n<p>Saturday the 14th.</p>\n',
        solution: '<h2>Next gig</h2>\n<p>Saturday the 14th.</p>\n<p><a href="gigs.html">All my gigs</a></p>\n',
        hint: '<a href="gigs.html">All my gigs</a>, inside a new p.',
        checks: [
          { message: 'A link to gigs.html', dom: { selector: 'a', attr: 'href', attrValue: 'gigs.html' } },
          { message: 'It says All my gigs', dom: { selector: 'a', text: 'All my gigs' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is index.html usually?',
        options: [
          { text: 'A list of every page', why: 'Despite the name, it\'s the home page: the one that opens first.' },
          { text: 'The site\'s home page' },
          { text: 'A page about indexes', why: 'It\'s the home page of a site or folder.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the link to another website that won\'t work.',
        language: 'html',
        lines: ['<a href="https://instagram.com/mensahbeats">Instagram</a>', '<a href="soundupsaturdays.com">Sound Up Saturdays</a>', '<a href="gigs.html">All my gigs</a>'],
        bug: 1,
        fix: '<a href="https://soundupsaturdays.com">Sound Up Saturdays</a>',
        explanation: 'Without https://, the browser looks for a file called soundupsaturdays.com on Kofi\'s own site.',
      },
      {
        kind: 'mcq',
        prompt: 'Why use gigs.html instead of the full address for your own pages?',
        options: [
          { text: 'It loads faster', why: 'Not really. It\'s about the link still working when the site moves.' },
          { text: 'Full addresses are banned', why: 'They\'re fine for other sites. For your own pages, file names keep working when your address changes.' },
          { text: 'It keeps working when the site moves to a new address' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your gigs link says href="https://mensahbeats.com/gigs.html". You don\'t own that address yet. What happens?',
        options: [
          { text: 'It breaks. I\'ll use just gigs.html, so it works wherever the site lives.' },
          { text: 'It\'ll work once I buy it.', why: 'Maybe, but only then. A relative link works everywhere now.' },
          { text: 'Nothing, addresses don\'t matter.', why: 'They really do: a wrong address is a broken link.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each link to where it goes.',
        pairs: [
          ['https://instagram.com/mensahbeats', 'Another website'],
          ['gigs.html', 'A page on Kofi\'s own site'],
          ['index.html', 'Kofi\'s home page'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the link to another website.',
        language: 'html',
        template: '<a href="[[1]]instagram.com/mensahbeats">Instagram</a>',
        blanks: [['https://']],
        distractors: ['www', 'http:', 'href='],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the usual file name of a site\'s home page?',
        answers: ['index.html', 'index'],
        placeholder: 'something.html',
      },
      {
        kind: 'writeCode',
        prompt: 'A small menu: three links in a list: index.html (Home), gigs.html (Gigs) and https://instagram.com/mensahbeats (Instagram)',
        starter: '<ul>\n</ul>\n',
        solution: '<ul>\n  <li><a href="index.html">Home</a></li>\n  <li><a href="gigs.html">Gigs</a></li>\n  <li><a href="https://instagram.com/mensahbeats">Instagram</a></li>\n</ul>\n',
        hint: 'Three li, each with an a inside.',
        checks: [
          { message: 'Three links in the list', dom: { selector: 'ul li a', count: 3 } },
          { message: 'A link home to index.html', dom: { selector: 'a[href="index.html"]', text: 'Home' } },
          { message: 'A link to gigs.html', dom: { selector: 'a[href="gigs.html"]', count: 1 } },
          { message: 'A full address for Instagram', dom: { selector: 'a[href^="https://"]', min: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If your own site had more than one page, what would the second page be?',
    starters: ['My second page would be...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look at the address bar as you click around any small website. Notice how the file names change at the end of the address.',
  },
  notes: 'URL Standard: absolute-URL vs relative-URL strings. index.html is the conventional default document served for a directory (Apache DirectoryIndex, nginx index, GitHub Pages). In the preview, relative links resolve against the asset base, but catchLinks shows the href as written.',
};

export default lesson;
