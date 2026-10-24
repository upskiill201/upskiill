import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8 — file paths and folders; why the picture is broken. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why is the picture broken?',
  summary: 'Kofi tidies his files into folders, and every picture on his page turns into a broken icon. The pictures are fine. The paths aren\'t. Here\'s how the browser finds a file, and the four reasons it can\'t.',
  minutes: 12,
  outcomes: ['Write a path to a file in a folder', 'Find why a picture is broken', 'Name files so they never break'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>A website is a folder of files.</strong> Kofi\'s site has <code>index.html</code>, and next to it a folder called <code>images</code> with his covers inside. The <code>src</code> is a <strong>path</strong>: directions from the page to the file.</p>',
    },
    {
      kind: 'code',
      language: 'html',
      code: '<img src="images/cover-1.png" alt="Album cover for Sunrise in Osu">',
      caption: '"Go into the images folder, then find cover-1.png." The slash separates folder from file.',
    },
    {
      kind: 'text',
      html: '<p><strong>Four reasons a picture breaks.</strong></p><ul><li><strong>Wrong folder:</strong> the file is in <code>images</code> but the src says <code>cover-1.png</code>, or <code>image/cover-1.png</code>.</li><li><strong>Spelling:</strong> <code>cover1.png</code> instead of <code>cover-1.png</code>.</li><li><strong>Capitals:</strong> <code>Cover-1.PNG</code>. Your computer may not care, but most web servers do: to them it\'s a different file.</li><li><strong>Wrong ending:</strong> the file is <code>.png</code> but the src says <code>.jpg</code>.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Name every file in lowercase, with dashes, no spaces: cover-1.png. Then half of these bugs can never happen.',
    },
    {
      kind: 'tryIt',
      title: 'Spot the broken picture',
      caption: 'Kofi\'s pictures live in an images folder. One path is right. One is missing the folder, so the browser shows a broken picture and the alt text instead.',
      code: '<img src="images/cover-1.png" alt="Album cover for Sunrise in Osu" width="150" height="150">\n<img src="images/cover2.png" alt="Album cover for Jollof Bounce" width="150" height="150">\n',
      challenge: 'Fix the second path: the file is called cover-2.png.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s pictures moved into an images folder.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The cover is in a folder called images. Which src finds it?',
        options: [
          { text: 'cover-1.png', why: 'That looks next to the page, not inside the images folder.' },
          { text: 'images/cover-1.png' },
          { text: 'images.cover-1.png', why: 'Folders and files are separated by a slash, not a dot.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The cover moved into the images folder. Fix the path to images/cover-1.png',
        starter: '<img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n',
        solution: '<img src="images/cover-1.png" alt="Album cover for Sunrise in Osu">\n',
        hint: 'Put images/ in front of the file name.',
        checks: [{ message: 'The path goes into the images folder', dom: { selector: 'img', attr: 'src', attrValue: 'images/cover-1.png' } }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each broken src to its problem.',
        pairs: [
          ['image/cover-1.png', 'Wrong folder name'],
          ['images/cover1.png', 'Spelling (missing dash)'],
          ['images/Cover-1.PNG', 'Capitals'],
          ['images/cover-1.jpg', 'Wrong file ending'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The files are images/cover-1.png, images/cover-2.png and images/cover-3.png. Tap the broken one.',
        language: 'html',
        lines: ['<img src="images/cover-1.png" alt="Sunrise in Osu cover">', '<img src="images/cover-2.png" alt="Jollof Bounce cover">', '<img src="images/cover-3.jpg" alt="Night Bus to Kumasi cover">'],
        bug: 2,
        fix: '<img src="images/cover-3.png" alt="Night Bus to Kumasi cover">',
        explanation: 'The file is a .png, but the src asks for a .jpg.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe file name, or trouble?',
        groups: ['Safe', 'Trouble'],
        items: [
          { text: 'cover-1.png', group: 0 },
          { text: 'My Cover (final).PNG', group: 1 },
          { text: 'kofi.png', group: 0 },
          { text: 'Gig Flyer 2.png', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'It works on my laptop but the picture is broken on the real site! The file is called Cover-1.png and my code says cover-1.png.',
        options: [
          { text: 'Web servers are fussy about capitals. Rename the file to all lowercase.' },
          { text: 'The internet must be down.', why: 'The rest of the site loads. It\'s the capital C.' },
          { text: 'Laptops are always right.', why: 'Your laptop may ignore capitals. Most web servers don\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The file doesn\'t exist. What does the visitor see?',
        code: '<img src="images/missing.png" alt="Album cover for Jollof Bounce">',
        language: 'html',
        options: [
          { text: 'Nothing at all', why: 'The browser shows a broken-picture space, and the alt text.' },
          { text: 'An error page', why: 'The page still loads. Only the picture is broken.' },
          { text: 'A broken picture with the alt text: Album cover for Jollof Bounce' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the path into the music folder.',
        language: 'html',
        template: '<audio controls src="[[1]]/beat-1.mp3"></audio>',
        blanks: [['music']],
        distractors: ['images', 'Music', 'music.'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which character separates a folder from a file in a path?',
        answers: ['slash', 'a slash', 'forward slash', '/ slash'],
        placeholder: 'Its name',
      },
      {
        kind: 'writeCode',
        prompt: 'Show Kofi\'s photo from the images folder: images/kofi.png, with alt text Kofi (Mensah Beats) wearing headphones',
        starter: '',
        solution: '<img src="images/kofi.png" alt="Kofi (Mensah Beats) wearing headphones">\n',
        hint: '<img src="images/kofi.png" alt="...">',
        checks: [
          { message: 'Kofi\'s photo from the images folder', dom: { selector: 'img', attr: 'src', attrValue: 'images/kofi.png' } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the file names on your phone or computer. Would any of them break on a website? What would you rename them to?',
    starters: ['A file that would break is...', 'I\'d rename it...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, show images/cover-2.png. Then break the path four ways (folder, spelling, capitals, ending) and watch the alt appear each time.',
  },
  notes: 'URL paths are case-sensitive on most web servers (Linux file systems); Windows and macOS file systems usually aren\'t, which causes "works on my laptop" bugs. In the preview, files resolve against the asset base, which has images/ and music/ copies of the course assets; whether a mis-cased name loads depends on the dev server, so checks look at the src value, not whether it loaded.',
};

export default lesson;
