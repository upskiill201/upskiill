import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 3 — the viewport meta tag: why phones zoom out without it. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The line every phone needs',
  summary: 'Kofi\'s media query works in the preview, but on his real phone the live site looks tiny, like a laptop page shrunk down, and the query never kicks in. Miracle spots it in two seconds: one missing line in the head.',
  minutes: 12,
  outcomes: ['Explain what the viewport meta tag does', 'Add it to the head of a page', 'Recognise the "tiny zoomed-out page" symptom'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a phone-ready head',
      steps: [
        { title: '1. The symptom', body: 'Without help, most phone browsers pretend the screen is about 980px wide, draw the page at that size, then shrink it to fit. Text is tiny, and min-width: 700px is true even on a phone.' },
        { title: '2. The fix', body: 'One meta tag in the head tells the browser: use the real width of the device, at normal zoom.', code: '<meta name="viewport" content="width=device-width, initial-scale=1">', language: 'html' },
        { title: '3. Where it goes', body: 'In the head, next to the charset and the title.', code: '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats</title>\n  <link rel="stylesheet" href="style.css">\n</head>', language: 'html' },
        { title: '4. Test on a real phone', body: 'Upload, then open the live site on a phone. The text should be a normal size, and your phone layout should appear.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A phone-ready head',
      caption: 'The full head of Kofi\'s page, with the viewport line. Every page you publish should have it.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra.</p>\n</body>\n</html>\n',
      challenge: 'Find the viewport line and read it out: "width equals device width, initial scale one".',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never add maximum-scale=1 or user-scalable=no. People with low vision need to pinch to zoom.',
    },
  ],
  apply: {
    scenario: 'The tiny live site.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Notice the page looks tiny on a phone', 'Add the viewport meta tag', 'Put it in the head with charset and title', 'Test the live site on a real phone'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the viewport tag to the head: name viewport, content width=device-width, initial-scale=1',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n\n  <title>Mensah Beats</title>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats</title>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<meta name="viewport" content="width=device-width, initial-scale=1">',
        checks: [
          { message: 'A viewport tag', dom: { selector: 'meta[name="viewport"]', count: 1 } },
          { message: 'Using the device width', dom: { selector: 'meta[name="viewport"][content*="width=device-width"]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Without the viewport tag, how wide do most phone browsers pretend the screen is?',
        options: [
          { text: 'Exactly the phone\'s width', why: 'That\'s what the tag asks for.' },
          { text: '100px', why: 'They pretend it\'s a laptop-sized 980px.' },
          { text: 'About 980px, then they shrink the page to fit' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Symptom of a missing viewport tag, or not?',
        groups: ['Missing viewport tag', 'Something else'],
        items: [
          { text: 'The whole page looks shrunk on a phone', group: 0 },
          { text: 'A single image is broken', group: 1 },
          { text: 'The phone layout never appears', group: 0 },
          { text: 'A link goes to the wrong page', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I add user-scalable=no so the layout can\'t be messed up by zooming?',
        options: [
          { text: 'Yes, zooming is bad.', why: 'Blocking zoom shuts people out.' },
          { text: 'No: people with low vision need to zoom. Keep it to width=device-width, initial-scale=1.' },
          { text: 'Add maximum-scale=1 too.', why: 'That also blocks zoom.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that hurts people with low vision.',
        language: 'html',
        lines: ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">', '<title>Mensah Beats</title>'],
        bug: 1,
        explanation: 'user-scalable=no stops people zooming in. Remove it.',
        fix: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the tag to what it means.',
        pairs: [
          ['name="viewport"', 'This tag is about the screen area'],
          ['width=device-width', 'Use the phone\'s real width'],
          ['initial-scale=1', 'Start at normal zoom'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'No viewport tag. On a 390px phone, does @media (min-width: 700px) apply?',
        code: '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }',
        language: 'css',
        options: [
          { text: 'Yes: the browser pretends it\'s about 980px wide' },
          { text: 'No, 390px is less than 700px', why: 'Without the tag, the browser uses its pretend width.' },
          { text: 'Only in landscape', why: 'It applies because of the pretend width.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tag.',
        language: 'html',
        template: '<meta name="[[1]]" content="width=[[2]], initial-scale=1">',
        blanks: [['viewport'], ['device-width']],
        distractors: ['screen', '980px', 'mobile'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which part of the page does the viewport tag go? (one word)',
        answers: ['head', 'the head', '<head>'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Does your live page have the viewport line? How did it look on your phone before?',
    starters: ['It did/didn\'t have it...', 'On my phone...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open your own index.html, check the head has the viewport tag (without user-scalable=no), upload, and test on a phone.',
  },
  notes: 'Mobile browsers default to a ~980px layout viewport without a viewport meta (MDN "Viewport meta tag"). WCAG 1.4.4 Resize Text: don\'t disable zoom. The tag\'s effect is clearest on the published site, opened on a real phone.',
};

export default lesson;
