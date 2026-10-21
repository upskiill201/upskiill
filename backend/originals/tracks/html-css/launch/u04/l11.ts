import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 11 — choosing the share image: wide, clear, your own; og:image:alt. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Which picture shows up?',
  summary: 'The preview card needs a picture. Kofi\'s choices: a crisp wide image made for sharing, a tiny square cover that gets cropped oddly, or a photo of a famous rapper "because it gets attention". Choose the share image.',
  minutes: 11,
  outcomes: ['Choose a share image that works in previews', 'Use a wide image of about 1200 by 630 pixels', 'Describe the share image with og:image:alt'],
  learn: [
    {
      kind: 'story',
      title: 'The picture on the card',
      beats: [
        { speaker: 'narrator', text: 'Kofi tests three pictures in the preview card.' },
        { speaker: 'clinton', text: 'Use a photo of a famous rapper. Everyone will tap it!' },
        { speaker: 'efua', text: 'I\'ll make you a wide one: your name, the orange sun, night blue. Big enough to look sharp.' },
        { speaker: 'tey', text: 'The share image is often the first thing a stranger ever sees of Mensah Beats.' },
      ],
      choice: {
        prompt: 'Which share image should Kofi use?',
        options: [
          {
            text: 'Efua\'s wide 1200 by 630 image with his name and colours, described with og:image:alt.',
            outcome: 'It looks sharp in every chat and feed, and it\'s clearly Mensah Beats. People know what they\'re tapping.',
            best: true,
          },
          {
            text: 'The small square cover.',
            outcome: 'Many apps show wide cards, so it gets cropped or blurry, cutting off half the sun.',
          },
          {
            text: 'A photo of a famous rapper.',
            outcome: 'It isn\'t his photo to use, it misleads people about who he is, and it could get the post or page reported.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Share images:</strong> many apps show a wide card, so a wide image works best. <strong>1200 by 630 pixels</strong> is a common size that stays sharp. Use your own picture, keep important words away from the edges, and describe it with <strong>og:image:alt</strong> for people who can\'t see it.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The share image tags',
      caption: 'The image, its size, and a description.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">\n  <meta property="og:image:alt" content="Mensah Beats in orange letters over an orange sun on a night-blue background">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
      challenge: 'Write your own og:image:alt for a picture that represents you.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Your own wide image, about 1200 by 630, with og:image:alt. Never someone else\'s photo.',
    },
  ],
  apply: {
    scenario: 'Which picture shows up?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the small square cover a weak share image?',
        options: [
          { text: 'Many apps show wide cards, so it gets cropped or blurry' },
          { text: 'Squares aren\'t allowed', why: 'They\'re allowed but often cropped.' },
          { text: 'It\'s too colourful', why: 'It\'s the shape and size.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Describe the share image: add og:image:alt "Mensah Beats in orange letters over an orange sun"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:image:alt" content="Mensah Beats in orange letters over an orange sun">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<meta property="og:image:alt" content="...">',
        checks: [
          { message: 'The image is described', dom: { selector: 'meta[property="og:image:alt"]', attr: 'content' } },
          { message: 'Saying what\'s in it', dom: { selector: 'meta[property="og:image:alt"][content*="Mensah Beats"]', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Efua\'s wide image', 'Sharp, and clearly him'],
          ['The square cover', 'Cropped or blurry'],
          ['A famous rapper\'s photo', 'Misleading and not his to use'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good share image, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Your own 1200 by 630 image', group: 0 },
          { text: 'A celebrity photo from the internet', group: 1 },
          { text: 'Your logo and colours, words away from the edges', group: 0 },
          { text: 'A tiny 100 by 100 icon', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But the rapper photo would get way more taps!',
        options: [
          { text: 'It\'s not Kofi\'s photo to use, and it tricks people. The taps would come from people expecting someone else.' },
          { text: 'True, use it.', why: 'It\'s misleading and not his to use.' },
          { text: 'Use it but make it small.', why: 'Still misleading.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the tag with a problem.',
        language: 'html',
        lines: ['<meta property="og:image" content="https://mensahbeats.example.app/share.jpg">', '<meta property="og:image:alt" content="image">', '<meta property="og:image:width" content="1200">'],
        bug: 1,
        explanation: '"image" describes nothing. Say what\'s in the picture.',
        fix: '<meta property="og:image:alt" content="Mensah Beats in orange letters over an orange sun">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Roughly what shape is a 1200 by 630 image?',
        code: '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">',
        language: 'html',
        options: [
          { text: 'Wide: about twice as wide as it is tall' },
          { text: 'Square', why: '1200 is almost double 630.' },
          { text: 'Tall', why: 'It\'s wider than tall.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A common share image size.',
        template: '[[1]] by [[2]] pixels',
        blanks: [['1200'], ['630']],
        distractors: ['100', '400', '50'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which og: tag describes the share image for people who can\'t see it? (e.g. og:image:something)',
        answers: ['og:image:alt', 'image:alt', 'alt'],
        placeholder: 'A tag',
      },
      {
        kind: 'mcq',
        prompt: 'Where should important words go on a share image?',
        options: [
          { text: 'Away from the edges, so cropping doesn\'t cut them off' },
          { text: 'Right at the edges', why: 'They may be cropped.' },
          { text: 'It doesn\'t matter', why: 'Different apps crop differently.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What picture would represent your site in a share card? Is it yours to use?',
    starters: ['I\'d use...', 'It\'s mine because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make a 1200 by 630 share image for your site from your own photo or design, upload it, and add og:image with a full address plus og:image:alt.',
  },
  notes: '1200x630 (about 1.91:1) is a widely recommended Open Graph image size; platforms vary and change, so kept as "common". og:image:alt per ogp.me. Using others\' photos raises copyright and impersonation issues (Course 1, Chapter 3).',
};

export default lesson;
