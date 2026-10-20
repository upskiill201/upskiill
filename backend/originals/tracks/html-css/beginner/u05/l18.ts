import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 18 — publishing for real: free host, upload the folder, test on a phone, share. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Upload, open, share',
  summary: 'Thursday night, the day before the posters print. The folder is packed and private details are gone. Kofi follows four steps, and Mensah Beats has a real web address.',
  minutes: 12,
  outcomes: ['Publish a folder on a free static host', 'Test a live page on a phone', 'Fix and re-upload when something is wrong'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to live',
      steps: [
        { title: '1. Pick a free static host', body: 'Search "free static site hosting". Netlify and GitHub Pages are two that have had free plans for simple sites. Check their current terms. Make an account (with a parent or guardian if the host asks).' },
        { title: '2. Upload the folder', body: 'Most hosts let you drag your whole folder onto their page, or connect it from GitHub. The folder, not just index.html, so style.css and the images come too.', code: 'mensah-beats/\n  index.html\n  style.css\n  sunrise-in-osu.jpg' },
        { title: '3. Open the address on a phone', body: 'The host gives you a web address. Open it on your phone, with Wi-Fi off. Check the colours, the images, every link, and the Book me email.' },
        { title: '4. Fix, re-upload, share', body: 'Something broken? Fix the file on your computer and upload again. When it all works, send the link: the organiser, Efua, Grandma.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The test list',
      caption: 'Kofi\'s phone test, written as a page. Make a list like this for your own site.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n</style>\n<h2>Phone test</h2>\n<ol>\n  <li>Colours and fonts load</li>\n  <li>Every image shows</li>\n  <li>Every link works</li>\n  <li>The Book me email opens</li>\n</ol>\n',
      challenge: 'Add a fifth item: "Text grows with Grandma\'s setting".',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Always test the live address on a real phone. "Works on my laptop" is not the same as "works".',
    },
  ],
  apply: {
    scenario: 'Thursday night upload.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put going live in order.',
        lines: ['Pick a free static host', 'Upload the whole folder', 'Open the address on a phone', 'Fix, re-upload and share'],
      },
      {
        kind: 'mcq',
        prompt: 'The live page has text but no images. What\'s the likely cause?',
        options: [
          { text: 'Only index.html was uploaded, not the whole folder' },
          { text: 'Hosts don\'t show images', why: 'They do, if the image files are uploaded.' },
          { text: 'Phones can\'t show jpg', why: 'They can. The files are missing.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the fifth test item "Text grows with Grandma\'s setting" to the list',
        starter: '<ol>\n  <li>Colours and fonts load</li>\n  <li>Every image shows</li>\n  <li>Every link works</li>\n  <li>The Book me email opens</li>\n\n</ol>\n',
        solution: '<ol>\n  <li>Colours and fonts load</li>\n  <li>Every image shows</li>\n  <li>Every link works</li>\n  <li>The Book me email opens</li>\n  <li>Text grows with Grandma\'s setting</li>\n</ol>\n',
        hint: 'One more <li> before </ol>.',
        checks: [
          { message: 'Five test items', dom: { selector: 'ol li', count: 5 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the phone test, or not?',
        groups: ['Test it', 'Not needed'],
        items: [
          { text: 'Every link works', group: 0 },
          { text: 'The page looks right on my laptop only', group: 1 },
          { text: 'The images all show', group: 0 },
          { text: 'How many fonts my laptop has', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'The Sunrise cover is missing on my phone!',
        options: [
          { text: 'I\'ll check the file name matches the src exactly, fix it, and upload again.' },
          { text: 'It shows on my laptop, so it\'s fine.', why: 'Efua\'s phone is the real test.' },
          { text: 'Delete the whole site.', why: 'Fix one file and re-upload.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the image that won\'t load live. The file is sunrise-in-osu.jpg.',
        language: 'html',
        lines: ['<img src="sunrise-in-osu.jpg" alt="Sunrise in Osu cover">', '<img src="Sunrise-In-Osu.JPG" alt="Sunrise in Osu cover">', '<img src="jollof-bounce.jpg" alt="Jollof Bounce cover">'],
        bug: 1,
        explanation: 'Many hosts treat capital letters as different. The src must match the file name exactly.',
        fix: '<img src="sunrise-in-osu.jpg" alt="Sunrise in Osu cover">',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the fix.',
        pairs: [
          ['No images live', 'Upload the whole folder'],
          ['No colours live', 'Check the link\'s href matches style.css'],
          ['A typo on the page', 'Fix the file and re-upload'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why test with Wi-Fi off?',
        options: [
          { text: 'It\'s how many fans will open it: on mobile data, away from home' },
          { text: 'Pages only work offline', why: 'They need a connection. Mobile data is the real-world test.' },
          { text: 'It deletes old versions', why: 'It just tests like a fan would.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s advice.',
        template: 'Upload the whole [[1]], then test the address on a real [[2]].',
        blanks: [['folder'], ['phone']],
        distractors: ['file', 'laptop', 'printer'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What kind of hosting is for plain HTML, CSS and image files? (one word: ___ hosting)',
        answers: ['static'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'If your site went live tonight, who would you send the link to first, and what would you ask them to test?',
    starters: ['I\'d send it to...', 'I\'d ask them to check...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Outside the app: put your packed folder on a free static host (check the current terms, and ask a parent or guardian if you\'re under the host\'s age limit). Then run the phone test.',
  },
  notes: 'Netlify (drag-and-drop deploy) and GitHub Pages have offered free static hosting; names given as examples with "check their current terms". Hosts set minimum ages in their terms, hence the guardian note. Case-sensitive file paths are common on Linux-based hosts.',
};

export default lesson;
