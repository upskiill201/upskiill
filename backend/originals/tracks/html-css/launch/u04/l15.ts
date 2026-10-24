import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (share image, favicon and full OG set, speed, fast gallery). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: sharp, small, fast',
  summary: 'The tab has an orange sun. The share card has Efua\'s wide image. The gallery appears almost instantly on Ama\'s phone. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Add a favicon and a share image', 'Keep sharing tags right for each page', 'Make images fast'],
  learn: [
    {
      kind: 'story',
      title: 'Sharp, small, fast',
      beats: [
        { speaker: 'ama', text: 'The pictures came before I finished blinking.' },
        { speaker: 'kofi', text: 'Same covers, a fraction of the size.' },
        { speaker: 'tey', text: 'Check the whole set: icon, previews, speed.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: icon, previews, speed.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Finish the head: a favicon (link rel="icon" href="favicon.png") and og:image:alt "Mensah Beats in orange letters over an orange sun"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:image:alt" content="Mensah Beats in orange letters over an orange sun">\n  <link rel="icon" href="favicon.png" type="image/png">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<link rel="icon" href="favicon.png" type="image/png"> and <meta property="og:image:alt" content="...">',
        checks: [
          { message: 'A favicon', dom: { selector: 'link[rel="icon"]', attr: 'href', attrValue: 'favicon.png' } },
          { message: 'The share image is described', dom: { selector: 'meta[property="og:image:alt"]', attr: 'content' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Faster, or slower?',
        groups: ['Faster', 'Slower'],
        items: [
          { text: 'WebP covers resized to 600 pixels', group: 0 },
          { text: '4,000-pixel originals', group: 1 },
          { text: 'loading="lazy" further down', group: 0 },
          { text: 'A lazy hero image at the top', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone shares the gigs page. Where does the preview link to?',
        code: '<meta property="og:url" content="https://mensahbeats.example.app/gigs.html">',
        language: 'html',
        options: [
          { text: 'The home page', why: 'og:url is the gigs page.' },
          { text: 'The gigs page' },
          { text: 'Nowhere', why: 'It links to og:url.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the share image choice that\'s a problem.',
        lines: ['A wide 1200 by 630 image Efua made', 'A famous rapper\'s photo from the internet', 'Kofi\'s own logo on night blue'],
        bug: 1,
        explanation: 'It isn\'t his to use, and it misleads people about who he is.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['link rel="icon"', 'The tab icon'],
          ['og:image', 'The preview picture'],
          ['og:image:alt', 'Describes the preview picture'],
          ['loading="lazy"', 'Load when nearly needed'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I make every image lazy, to be extra fast?',
        options: [
          { text: 'Yes, all of them.', why: 'Lazy top images can slow what people see first.' },
          { text: 'None of them.', why: 'Lower images benefit.' },
          { text: 'Not the ones at the top: they\'re needed straight away. Only the ones further down.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What usually makes a page slow?',
        options: [
          { text: 'Too many headings', why: 'Text is tiny compared with images.' },
          { text: 'Images that are much bigger than they need to be' },
          { text: 'The favicon', why: 'It\'s tiny.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A good share image size.',
        template: '[[1]] wide by [[2]] tall, in pixels.',
        blanks: [['1200'], ['630']],
        distractors: ['100', '4000', '50'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute value delays loading an image until it\'s nearly needed? (one word)',
        answers: ['lazy'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Speed up the gallery: add loading="lazy" to the third image (it\'s below the first screen)',
        starter: '<img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400">\n<img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400">\n<img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400">\n',
        solution: '<img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400">\n<img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400">\n<img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400" loading="lazy">\n',
        hint: 'loading="lazy" on the third img.',
        checks: [
          { message: 'The third is lazy', dom: { selector: 'img[src="cover-3.png"][loading="lazy"]', count: 1 } },
          { message: 'Only one lazy image', dom: { selector: 'img[loading="lazy"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Share your own link and time how long your page takes on mobile data. What did you notice?',
    starters: ['It took...', 'I\'ll fix...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a favicon and a described share image to your site, and lazy-load every image below the first screen.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
