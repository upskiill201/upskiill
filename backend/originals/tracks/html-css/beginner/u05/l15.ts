import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (fonts, the full look, going live, packing the folder). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the folder is packed',
  summary: 'One folder. index.html, style.css, six cover images, all lowercase with hyphens. Kofi opens index.html on his laptop and every colour and font loads from the new file. Quick checkpoint before it goes online.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use fonts with a clear plan', 'Link a stylesheet', 'Explain what going live means'],
  learn: [
    {
      kind: 'story',
      title: 'Ready to upload',
      beats: [
        { speaker: 'narrator', text: 'Kofi double-clicks index.html. Night blue, cream text, the orange name in Georgia. All loaded from style.css.' },
        { speaker: 'kofi', text: 'It looks exactly the same. But now it\'s two files.' },
        { speaker: 'tey', text: 'Which is exactly what a host wants. Next: one quick check of what\'s true about publishing, then it goes live.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: ready to go live.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Finish the head: a title "Mensah Beats" and a link to style.css',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'A <title> and a <link rel="stylesheet" href="style.css">.',
        checks: [
          { message: 'Page title', dom: { selector: 'title', text: 'Mensah Beats' } },
          { message: 'Stylesheet linked', dom: { selector: 'link', attr: 'href', attrValue: 'style.css' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best font plan?',
        options: [
          { text: 'A plain font for reading, one special font for the name' },
          { text: 'A script font everywhere', why: 'Long text in script is hard to read.' },
          { text: 'A different font for every section', why: 'It wobbles.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['index.html', 'Sent first by the host'],
          ['style.css', 'Holds every CSS rule'],
          ['<link>', 'Connects the two'],
          ['Web host', 'Keeps the folder online'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will leave the live page unstyled.',
        language: 'html',
        lines: ['<title>Mensah Beats</title>', '<link rel="stylesheet" href="styles.css">', '<h1>Mensah Beats</h1>'],
        bug: 1,
        explanation: 'The file is style.css, not styles.css. The names must match.',
        fix: '<link rel="stylesheet" href="style.css">',
      },
      {
        kind: 'sortGroups',
        prompt: 'A good file name, or a messy one?',
        groups: ['Good', 'Messy'],
        items: [
          { text: 'jollof-bounce.jpg', group: 0 },
          { text: 'Jollof Bounce (1).JPG', group: 1 },
          { text: 'index.html', group: 0 },
          { text: 'Home Page.html', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Does line-height actually matter? It\'s just spacing.',
        options: [
          { text: 'No, delete it.', why: 'Squashed lines are harder to read.' },
          { text: 'Lines that aren\'t squashed are much easier to follow on a phone. 1.6 is comfortable.' },
          { text: 'Set it to 5.', why: 'Too far apart to follow.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The device has no Georgia. What does the name look like?',
        code: 'h1 { font-family: Georgia, serif; }',
        language: 'css',
        options: [
          { text: 'Invisible', why: 'It falls back to serif.' },
          { text: 'A script font', why: 'The fallback is serif.' },
          { text: 'The device\'s own serif font' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the body rule.',
        language: 'css',
        template: 'body { font-family: Verdana, [[1]]; line-height: [[2]]; }',
        blanks: [['sans-serif'], ['1.6']],
        distractors: ['serifs', '16px', 'bold'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you do to update a live page after fixing a typo? (one word: ___ it again)',
        answers: ['upload', 'reupload', 'publish'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put going live in order.',
        lines: ['Pack one folder', 'Rename the page to index.html', 'Upload the folder to a host', 'Open the web address on a phone'],
      },
    ],
  },
  reflect: {
    prompt: 'Is your own folder packed? What\'s still missing before it could go online?',
    starters: ['I still need...', 'My folder has...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open your index.html from your packed folder and check that every style still loads from style.css.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
