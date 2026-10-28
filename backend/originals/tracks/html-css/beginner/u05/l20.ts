import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 20 — Chapter Challenge: Mensah Beats v1.0, live. Climax of Course 1: the poster prints with his link. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.0',
  summary: 'Friday morning. The organiser sends a photo: the Sound Up Saturdays poster, fresh off the printer, and under Kofi\'s name, his own web address. Build v1.0, the version that\'s live.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Style a page with exact, readable colours', 'Size text so it follows the reader', 'Prepare a page for publishing, safely'],
  learn: [
    {
      kind: 'story',
      title: 'On the poster',
      beats: [
        { speaker: 'narrator', text: 'Friday. Eight weeks to uni. A photo from the organiser: the poster. Under "Mensah Beats", a web address.' },
        { speaker: 'kofi', text: 'That\'s mine. I made that. From a blank file.' },
        { speaker: 'efua', text: 'I opened it on the bus. It looks like your covers. I could read every word.' },
        { speaker: 'narrator', text: 'Grandma calls. She found it too, with her big text. She has already sent it to the family group chat.' },
        { speaker: 'tey', text: 'Five chapters ago it was one line of HTML. Now it\'s live. Let\'s build v1.0 one last time, from memory.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v0.1 to v0.3', body: 'A skeleton, words people read, links, pictures and beats you can play.', code: '<h1>Mensah Beats</h1>\n<audio controls src="beat-1.mp3"></audio>', language: 'html' },
        { title: 'v0.4', body: 'A stylesheet: one accent, two fonts, room to breathe.', code: 'p { line-height: 1.6; }', language: 'css' },
        { title: 'v1.0 (tonight)', body: 'Exact colours from his covers, contrast everyone can read, rem sizes, a separate style.css, a safe contact link, and a real web address.', code: '<link rel="stylesheet" href="style.css">', language: 'html' },
        { title: 'Next course', body: 'Responsive Web Design with CSS: layouts that rearrange themselves for phones, tablets and laptops.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.0.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the palette. Night #14213D page, cream #FFF6E5 text, orange #FF9600 h1',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        solution: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  h1 { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        hint: 'A body rule with two colours, and an h1 rule.',
        checks: [
          { message: 'Night blue page', dom: { selector: 'body', style: 'background-color', styleValue: '#14213D' } },
          { message: 'Cream text', dom: { selector: 'body', style: 'color', styleValue: '#FFF6E5' } },
          { message: 'Orange name', dom: { selector: 'h1', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: sizes that follow the reader. Body 1rem, h1 2.5rem',
        starter: '<style>\n  body { font-size: 15px; }\n  h1 { font-size: 38px; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        solution: '<style>\n  body { font-size: 1rem; }\n  h1 { font-size: 2.5rem; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        hint: 'Swap 15px for 1rem and 38px for 2.5rem.',
        checks: [
          { message: 'Body at 1rem', dom: { selector: 'body', style: 'font-size', styleValue: '1rem' } },
          { message: 'Name at 2.5rem', dom: { selector: 'h1', style: 'font-size', styleValue: '2.5rem' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Readable for small text (4.5 to 1), or not?',
        groups: ['Readable', 'Too faint'],
        items: [
          { text: 'Cream on night blue', group: 0 },
          { text: 'White on orange', group: 1 },
          { text: 'Night blue on orange', group: 0 },
          { text: 'Pink on night blue', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that shouldn\'t go live.',
        language: 'html',
        lines: ['<p>Based in Accra.</p>', '<p><a href="tel:+233000000000">Call my mobile</a></p>', '<p><a href="mailto:bookings@example.com">Book me</a></p>'],
        bug: 1,
        explanation: 'His personal number would be on a public poster link. The booking email is enough.',
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: ready to publish. Add a title "Mensah Beats" and link style.css in the head',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: '<title>Mensah Beats</title> and <link rel="stylesheet" href="style.css">',
        checks: [
          { message: 'Page title', dom: { selector: 'title', text: 'Mensah Beats' } },
          { message: 'Stylesheet linked', dom: { selector: 'link', attr: 'href', attrValue: 'style.css' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Grandma\'s big-text setting makes the page grow. Why?',
        options: [
          { text: 'The sizes are in rem, which follow the reader\'s setting' },
          { text: 'The colours are hex codes', why: 'Colours don\'t change size.' },
          { text: 'The page is live', why: 'It\'s the rem sizes.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'There\'s a typo in your bio on the live site.',
        options: [
          { text: 'It\'s live now, it\'s stuck.', why: 'Re-upload and it updates.' },
          { text: 'Thanks! I\'ll fix it in index.html and upload the folder again.' },
          { text: 'I\'ll make a whole new site.', why: 'One fix, one upload.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each version to what it added.',
        pairs: [
          ['v0.1', 'A skeleton page'],
          ['v0.4', 'A first stylesheet'],
          ['v1.0', 'Exact colours, rem sizes, live online'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the font plan.',
        language: 'css',
        template: 'body { font-family: Verdana, [[1]]; }\nh1 { font-family: Georgia, [[2]]; }',
        blanks: [['sans-serif'], ['serif']],
        distractors: ['cursive', 'bold', 'italic'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A fan opens Kofi\'s web address. Which file does the host send?',
        code: 'mensah-beats/\n  index.html\n  style.css\n  sunrise-in-osu.jpg',
        options: [
          { text: 'style.css first', why: 'index.html comes first and loads it.' },
          { text: 'The image', why: 'The page loads the image.' },
          { text: 'index.html, which then loads style.css and the image' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: the footer. Small print "Mensah Beats v1.0"',
        starter: '<h1>Mensah Beats</h1>\n\n',
        solution: '<h1>Mensah Beats</h1>\n<footer><small>Mensah Beats v1.0</small></footer>\n',
        hint: '<footer><small>Mensah Beats v1.0</small></footer>',
        checks: [
          { message: 'A footer', dom: { selector: 'footer', count: 1 } },
          { message: 'v1.0 in small print', dom: { selector: 'footer small', text: 'v1.0' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats is live on the poster? (e.g. v0.4)',
        answers: ['v1.0', '1.0', 'v1'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'You started this course with one line of HTML. What are you proudest of on your own page?',
    starters: ['I\'m proudest of...', 'Next I want to...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'If you haven\'t yet, put your own site live (check the host\'s current terms), run the phone test, and send the link to one person. Then start Responsive Web Design with CSS.',
  },
  notes: 'Course 1 finale (HTML & CSS for Beginners). Next course title matches the cover responsive-web-design-css.',
};

export default lesson;
