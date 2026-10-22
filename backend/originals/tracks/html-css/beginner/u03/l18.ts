import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18 — the learner's own page gets links, jump links and a picture. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page gets links',
  summary: 'Your page has your name, an About and the things you love. Now it connects to the rest of the web: links to the things you love, a picture, and a jump menu so people find their way.',
  minutes: 12,
  outcomes: ['Link your favourite things from your page', 'Add a picture with good alt text', 'Add a jump link to a section'],
  learn: [
    {
      kind: 'steps',
      title: 'Your page, chapter 3',
      steps: [
        { title: '1. Where you are', body: 'Your name, an About, and a list of things you love.', code: '<h1>Your name</h1>\n<h2>Things I love</h2>\n<ul>\n  <li>Football</li>\n</ul>', language: 'html' },
        { title: '2. Make the list go somewhere', body: 'Turn list items into links: your favourite team, a song, a recipe. Link text says where it goes.', code: '<li><a href="https://en.wikipedia.org/wiki/Accra_Hearts_of_Oak_S.C.">Hearts of Oak on Wikipedia</a></li>', language: 'html' },
        { title: '3. Add a picture', body: 'Use a picture you made or have permission for. In this course, phone-studio.png and the covers are free for you to use. Alt says what it shows; width and height stop the jump.', code: '<img src="phone-studio.png" alt="A phone recording a song" width="300" height="200">', language: 'html' },
        { title: '4. A jump link', body: 'Give your Things I love heading an id, and add a jump link to it near the top.', code: '<p><a href="#love">Things I love</a></p>\n<h2 id="love">Things I love</h2>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Make it yours',
      caption: 'A starting point for your page. Swap in your own name, links and words.',
      code: '<h1>Your name</h1>\n<p><a href="#love">Things I love</a></p>\n<img src="phone-studio.png" alt="A phone recording a song" width="300" height="200">\n<h2 id="love">Things I love</h2>\n<ul>\n  <li><a href="https://en.wikipedia.org/wiki/Jollof_rice">Jollof rice on Wikipedia</a></li>\n</ul>\n',
      challenge: 'Add two more links to things you love, each with link text that says where it goes.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Only link to pages you\'d be happy for anyone to see you share. And still: no personal phone number or home address on your page.',
    },
  ],
  apply: {
    scenario: 'You connect your page to the web.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Turn one of your loves into a link: a list item with a link to any https:// address, with clear link text',
        starter: '<h2>Things I love</h2>\n<ul>\n  <li>Jollof rice</li>\n</ul>\n',
        solution: '<h2>Things I love</h2>\n<ul>\n  <li><a href="https://en.wikipedia.org/wiki/Jollof_rice">Jollof rice on Wikipedia</a></li>\n</ul>\n',
        hint: 'Wrap the words in <a href="https://...">...</a>.',
        checks: [
          { message: 'A link in your list', dom: { selector: 'li a[href^="https://"]', min: 1 } },
          { message: 'The link has text', dom: { selector: 'li a:not(:empty)', min: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which picture can you use on your public page?',
        options: [
          { text: 'A celebrity photo from an image search', why: 'Someone owns it. Use your own, or one you have permission for.' },
          { text: 'A photo you took yourself, or a course picture you\'re allowed to use' },
          { text: 'Any picture, if you add a credit', why: 'A credit isn\'t permission.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a picture to your page: phone-studio.png, with alt text, a width and a height',
        starter: '<h1>Your name</h1>\n',
        solution: '<h1>Your name</h1>\n<img src="phone-studio.png" alt="A phone recording a song" width="300" height="200">\n',
        hint: '<img src="phone-studio.png" alt="..." width="300" height="200">',
        checks: [
          { message: 'The picture is on your page', dom: { selector: 'img[src="phone-studio.png"]', count: 1 } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'It has a width and height', dom: { selector: 'img[width][height]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good link for your public page, or keep it off?',
        groups: ['Good', 'Keep it off'],
        items: [
          { text: 'Your favourite team\'s page', group: 0 },
          { text: 'A map pin to your house', group: 1 },
          { text: 'A song you love', group: 0 },
          { text: 'Your school\'s class group chat', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a jump link: give the Things I love heading id="love", and put a link to #love above it',
        starter: '<h1>Your name</h1>\n<h2>Things I love</h2>\n',
        solution: '<h1>Your name</h1>\n<p><a href="#love">Things I love</a></p>\n<h2 id="love">Things I love</h2>\n',
        hint: 'id="love" on the h2, and <a href="#love">...</a> in a p above it.',
        checks: [
          { message: 'A section with id love', dom: { selector: '#love', count: 1 } },
          { message: 'A link that jumps to it', dom: { selector: 'a[href="#love"]', count: 1 } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your links all say "link 1, link 2, link 3". What would Ama\'s phone read out?',
        options: [
          { text: 'It would be fine.', why: 'Three identical, meaningless links: Ama would give up.' },
          { text: '"Link 1, link 2, link 3". I\'ll make each one say where it goes.' },
          { text: 'Phones skip links.', why: 'They read them out, which is why link text matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens when someone taps this on your page?',
        code: '<a href="#love">Things I love</a>\n...\n<h2 id="love">Things I love</h2>',
        language: 'html',
        options: [
          { text: 'It opens a new website', why: '# links stay on the page.' },
          { text: 'Nothing', why: 'There\'s a matching id, so it jumps.' },
          { text: 'It jumps down to your Things I love section' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete your picture.',
        language: 'html',
        template: '<img [[1]]="phone-studio.png" [[2]]="A phone recording a song" width="300" height="200">',
        blanks: [['src'], ['alt']],
        distractors: ['href', 'id', 'title'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of your page to its tag or attribute.',
        pairs: [
          ['A link to a song you love', 'a with href'],
          ['A picture', 'img with src and alt'],
          ['A spot to jump to', 'id'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A jump link\'s href starts with #. What is that character called?',
        answers: ['hash', 'hashtag', 'hash sign', 'pound', 'number sign'],
        placeholder: 'Its name',
      },
    ],
  },
  reflect: {
    prompt: 'If someone followed every link on your page, what would they learn about you?',
    starters: ['They\'d learn that...', 'The link that says most about me is...'],
  },
  deepen: {
    title: 'Your page, v0.3',
    summary: 'In the Code playground, add links to three things you love, a picture with good alt, and a jump link. Chapter 4 finally adds colour.',
  },
  notes: 'Learner\'s own page, chapter 3 step. Wikipedia links are examples; learners use any https:// address. phone-studio.png and covers are Teyro-made and free for learners to use in the course.',
};

export default lesson;
