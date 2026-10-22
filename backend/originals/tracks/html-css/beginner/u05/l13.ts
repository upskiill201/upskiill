import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 13 — what "going live" means: files, a host, a web address, index.html. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'What does "going live" mean?',
  summary: 'The page looks right. Now Kofi needs the web address for the poster, and he has no idea how a file on his phone becomes something anyone can open. Tey explains it in four messages.',
  minutes: 11,
  outcomes: ['Explain what a web host does', 'Explain why the main page is called index.html', 'Describe how a web address points to your files'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Right now Mensah Beats is a file only your phone can open. Going live means copying your files to a computer that\'s always on and always connected, so anyone can ask for them. That computer is a web host.',
          replies: ['Do I need my own computer for that?'],
        },
        {
          tey: 'No. Hosting companies run those computers for you, and several have free plans for simple sites like yours: just HTML, CSS and images. You upload your folder, they give you a web address.',
          replies: ['What\'s in the folder?'],
        },
        {
          tey: 'Your page, renamed index.html, plus your style.css and your images and music. When someone opens your address without a file name, the host sends index.html by default. That\'s why the main page always has that name.',
          replies: ['And then it\'s on the internet?'],
        },
        {
          tey: 'Then the address works on any phone, anywhere. Change a file, upload it again, and the live page updates. Nothing is permanent: going live is just copying files.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The page the host will send',
      caption: 'This will be index.html. The title in the head is what shows in the browser tab and in search results.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra.</p>\n</body>\n</html>\n',
      challenge: 'Change the title to "Mensah Beats | Producer from Accra".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Going live = copying your folder to a web host. The main page is index.html. Upload again to update.',
    },
  ],
  apply: {
    scenario: 'Kofi learns what going live means.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a web host do?',
        options: [
          { text: 'Designs your page for you', why: 'You design it. The host stores and sends it.' },
          { text: 'Keeps your files on an always-on computer and sends them to anyone who asks' },
          { text: 'Turns off your page at night', why: 'Hosts are always on.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What must the main page file be called? (file name)',
        answers: ['index.html'],
        placeholder: 'A file name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes in the folder Kofi uploads, or not?',
        groups: ['Upload it', 'Not needed'],
        items: [
          { text: 'index.html', group: 0 },
          { text: 'page-old-version-2.html', group: 1 },
          { text: 'His cover images', group: 0 },
          { text: 'A screenshot of his chat with Efua', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'If I put it online and find a typo, is it stuck forever?',
        options: [
          { text: 'Yes, so check it twenty times.', why: 'You can update it any time.' },
          { text: 'You need a new web address.', why: 'Same address, new files.' },
          { text: 'No. Fix the file, upload it again, and the live page updates.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the page the title Mensah Beats',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: '<title>Mensah Beats</title> inside the head.',
        checks: [
          { message: 'The page has a title', dom: { selector: 'title', text: 'Mensah Beats' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to its meaning.',
        pairs: [
          ['Web host', 'Always-on computer that stores your site'],
          ['index.html', 'The page sent by default'],
          ['Web address', 'What people type to reach your site'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A fan opens Kofi\'s address with no file name after it. Which file does the host send?',
        code: 'mensah-beats/\n  index.html\n  style.css\n  sunrise.jpg',
        options: [
          { text: 'style.css', why: 'The stylesheet is loaded by the page, not sent first.' },
          { text: 'index.html' },
          { text: 'All three at once as a list', why: 'It sends index.html by default.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the file name that will cause trouble.',
        lines: ['index.html', 'style.css', 'My Page FINAL (2).html'],
        bug: 2,
        explanation: 'The main page must be index.html. Spaces and brackets in names also make links messy: use lowercase and hyphens.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s summary.',
        template: 'Going live means copying your [[1]] to a web [[2]].',
        blanks: [['files', 'folder'], ['host']],
        distractors: ['phone', 'colours', 'app'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Kofi need to pay for a simple site like his?',
        options: [
          { text: 'A server in his bedroom', why: 'Hosts run the computers for you.' },
          { text: 'A designer', why: 'He built it himself.' },
          { text: 'Nothing, several hosts have free plans for simple sites' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who\'s the first person you\'d send your live link to? What would you want them to see?',
    starters: ['I\'d send it to...', 'I want them to...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "how does a website work" on MDN Learn and read the short article on what happens when you type a web address.',
  },
  notes: 'Default document index.html is standard across static hosts. Free static hosting plans exist (Netlify, GitHub Pages and others); terms change, so the course says "check current terms" when naming them.',
};

export default lesson;
