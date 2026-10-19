import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11 — the shape of every page: DOCTYPE, html, head, body, title. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The shape of every page',
  summary: 'Ama opens Kofi\'s page and the browser tab just says the file name. Every real page has the same skeleton, with a head for information about the page and a body for what you see.',
  minutes: 12,
  outcomes: ['Name the five parts of every page', 'Say what goes in the head and what goes in the body', 'Give a page a title for its tab'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of the skeleton',
      text: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra.</p>\n</body>\n</html>',
      hotspots: [
        { phrase: '<!DOCTYPE html>', note: 'The very first line. It tells the browser "this is a modern HTML page". It isn\'t a tag and has no closing tag.' },
        { phrase: '<html>', note: 'The box around everything else. It closes on the very last line with </html>.' },
        { phrase: '<head>', note: 'Information ABOUT the page, which isn\'t shown on the page itself. Like the label on the outside of a box.' },
        { phrase: '<title>Mensah Beats</title>', note: 'The name on the browser tab, on bookmarks and in search results. It goes in the head.' },
        { phrase: '<body>', note: 'Everything you can see on the page: headings, paragraphs, pictures. All of Kofi\'s content goes here.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A complete page',
      caption: 'This is a complete page. The title doesn\'t show on the page, because it belongs on the tab. Everything inside body shows.',
      code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra.</p>\n</body>\n</html>\n',
      challenge: 'Add a second paragraph inside the body. Then try putting it inside the head and see what changes.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'head is about the page (the title, for the tab). body is the page (everything people see). Lessons so far have skipped the skeleton; browsers add it for you, but real pages always write it.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s page gets a proper skeleton.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the skeleton in order.',
        language: 'html',
        lines: ['<!DOCTYPE html>', '<html>', '<head>', '<title>Mensah Beats</title>', '</head>', '<body>', '</body>', '</html>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Give Kofi\'s page the title Mensah Beats, so it shows on the tab',
        starter: '<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'Type Mensah Beats between <title> and </title>.',
        checks: [
          { message: 'The page\'s title is Mensah Beats', dom: { selector: 'head title', text: 'Mensah Beats' } },
          { message: 'The heading is still in the body', dom: { selector: 'body h1', text: 'Mensah Beats' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Head or body?',
        groups: ['head', 'body'],
        items: [
          { text: 'The title for the tab', group: 0 },
          { text: 'Kofi\'s main heading', group: 1 },
          { text: 'A paragraph about his beats', group: 1 },
          { text: 'Information about the page, not shown on it', group: 0 },
          { text: 'His gig dates', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does the text inside title show up?',
        options: [
          { text: 'At the top of the page, in big letters', why: 'That\'s what h1 does. The title goes on the tab.' },
          { text: 'On the browser tab, bookmarks and search results' },
          { text: 'Nowhere, it\'s hidden', why: 'You won\'t see it on the page, but it shows on the tab and in search results.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Your tab just says "index.html". That\'s a boring name. My tab for cartoons has a real name.',
        options: [
          { text: 'Tabs always say the file name.', why: 'Only when the page has no title. Add one in the head and the tab uses it.' },
          { text: 'Good catch. I\'ll add a title in the head, and the tab will say Mensah Beats.' },
          { text: 'Change your phone\'s language.', why: 'The phone isn\'t the problem. The page needs a title.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s in the wrong place.',
        language: 'html',
        lines: ['<head>', '  <title>Mensah Beats</title>', '  <h1>Mensah Beats</h1>', '</head>', '<body>', '</body>'],
        bug: 2,
        fix: 'Move <h1>Mensah Beats</h1> into the body.',
        explanation: 'The heading is something people see, so it belongs in the body, not the head.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['<!DOCTYPE html>', 'Says this is a modern HTML page'],
          ['<head>', 'Holds information about the page'],
          ['<body>', 'Holds everything people see'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag holds the name shown on the browser tab?',
        answers: ['title', '<title>'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What do you see on the page itself?',
        code: '<head>\n  <title>Gig night</title>\n</head>\n<body>\n  <p>Saturday, 8pm</p>\n</body>',
        language: 'html',
        options: [
          { text: 'Gig night, then Saturday, 8pm', why: 'The title goes on the tab, not the page.' },
          { text: 'Nothing', why: 'The paragraph is in the body, so it shows.' },
          { text: 'Just Saturday, 8pm' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Put Kofi\'s heading and paragraph in the body, where they belong',
        starter: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra.</p>\n</body>\n</html>\n',
        hint: 'Between <body> and </body>, add an h1 Mensah Beats and a p with any sentence.',
        checks: [
          { message: 'A main heading in the body that says Mensah Beats', dom: { selector: 'body h1', text: 'Mensah Beats' } },
          { message: 'A paragraph in the body', dom: { selector: 'body p', min: 1 } },
          { message: 'The title is still Mensah Beats', dom: { selector: 'head title', text: 'Mensah Beats' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the tabs open on your phone right now. Which tab titles are clear, and which ones are confusing?',
    starters: ['A clear tab title I have open is...', 'A confusing one is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write a complete page from the skeleton, with your name as both the title and the h1.',
  },
  notes: 'HTML Living Standard §13.1.1 (DOCTYPE), §4.1.1 html, §4.2.1 head, §4.2.2 title (required in most documents; used for tabs, history, bookmarks, search results), §4.3.1 body. The parser creates html/head/body if omitted (§13.2), which is why earlier lessons worked without them. A title tag written inside body stays in body, so "head title" catches misplaced titles.',
};

export default lesson;
