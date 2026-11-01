import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 14 — getting ready to publish: one folder, CSS moved into style.css with <link>, relative paths. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Pack the folder',
  summary: 'Before anything goes online, Kofi\'s files need to live in one tidy folder, and his CSS needs to move out of the page into its own file. Four steps, then the folder is ready to upload.',
  minutes: 12,
  outcomes: ['Put a site\'s files in one folder', 'Move CSS into style.css', 'Connect a stylesheet with <link>'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a ready folder',
      steps: [
        { title: '1. One folder for everything', body: 'Make a folder called mensah-beats. Inside: the page, the images and the music. Lowercase names, hyphens instead of spaces.', code: 'mensah-beats/\n  index.html\n  style.css\n  sunrise-in-osu.jpg' },
        { title: '2. Rename the page', body: 'The main page becomes index.html, so the host sends it by default.', code: 'mensah-beats.html  ->  index.html' },
        { title: '3. Move the CSS into style.css', body: 'Cut everything between <style> and </style> and paste it into a new file called style.css. No <style> tags in that file, just the rules.', code: 'body { background-color: #14213D; color: #FFF6E5; }\nh1 { color: #FF9600; }', language: 'css' },
        { title: '4. Link it from the head', body: 'In index.html, where the <style> block was, add one line. The browser now fetches style.css and uses it.', code: '<link rel="stylesheet" href="style.css">', language: 'html' },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>Why a separate file?</strong> When Kofi adds a second page, like a bookings page, both pages can link the same style.css. Change the orange once, and every page updates.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The head, after the move',
      caption: 'In a real folder this line loads style.css. Here there\'s no style.css next to the page, so nothing is styled: exactly what you\'d see if the file name were wrong.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
      challenge: 'Find the one line that connects the stylesheet. What would happen if it said styles.css?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If your live page shows no styling, check the link: the href must match the file name exactly.',
    },
  ],
  apply: {
    scenario: 'Packing the folder.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Make one folder for the site', 'Rename the page to index.html', 'Move the CSS into style.css', 'Add a <link> to style.css in the head'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the line that connects style.css to the page',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: '<link rel="stylesheet" href="style.css">',
        checks: [
          { message: 'A stylesheet link', dom: { selector: 'link[rel="stylesheet"]', count: 1 } },
          { message: 'It points to style.css', dom: { selector: 'link', attr: 'href', attrValue: 'style.css' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes in style.css, or in index.html?',
        groups: ['style.css', 'index.html'],
        items: [
          { text: 'h1 { color: #FF9600; }', group: 0 },
          { text: '<h1>Mensah Beats</h1>', group: 1 },
          { text: 'body { font-size: 1rem; }', group: 0 },
          { text: '<link rel="stylesheet" href="style.css">', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s live page has no colours at all. His file is called Style.css. What\'s wrong?',
        options: [
          { text: 'The link says style.css, but the file is Style.css. Names must match exactly.' },
          { text: 'Hosts don\'t allow CSS', why: 'They do. The name doesn\'t match.' },
          { text: 'CSS only works offline', why: 'It works online once the link matches.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that shouldn\'t be in style.css.',
        language: 'css',
        lines: ['<style>', 'body { background-color: #14213D; }', 'h1 { color: #FF9600; }'],
        bug: 0,
        explanation: 'style.css holds only the rules. The <style> tag belongs in HTML, and you\'ve removed that block now.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each file to what\'s inside.',
        pairs: [
          ['index.html', 'The content and the <link>'],
          ['style.css', 'The CSS rules'],
          ['sunrise-in-osu.jpg', 'A cover image'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why bother with a separate file? The <style> block worked fine.',
        options: [
          { text: 'Hosts reject <style> blocks.', why: 'They don\'t. It\'s about sharing styles across pages.' },
          { text: 'It makes the page load colours faster for sure.', why: 'The real win is one file for every page.' },
          { text: 'When I add a bookings page, both pages share one style.css. Change it once, both update.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the link.',
        language: 'html',
        template: '<link rel="[[1]]" href="[[2]]">',
        blanks: [['stylesheet'], ['style.css']],
        distractors: ['style', 'css', 'index.html'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element connects a stylesheet file to a page? (tag name)',
        answers: ['link', '<link>'],
        placeholder: 'A tag',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which file name is best for a cover image?',
        options: [
          { text: 'Sunrise In Osu FINAL.jpg', why: 'Spaces and capitals make links fiddly.' },
          { text: 'sunrise-in-osu.jpg' },
          { text: 'IMG_20261003_2214.jpg', why: 'Works, but tells you nothing.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Look at where your own page files are right now. What would you need to move or rename?',
    starters: ['My files are...', 'I need to rename...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'On your computer, make one folder for your site. Rename your page to index.html, move your CSS into style.css, and add the <link>. Open index.html to check the styles still load.',
  },
  notes: '<link rel="stylesheet" href> loads an external stylesheet (MDN). Many hosts are case-sensitive for file names, hence the Style.css example.',
};

export default lesson;
