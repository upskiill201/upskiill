import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6 — pictures: img, src and alt. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Pictures',
  summary: 'Kofi\'s three beats have cover art, and his page shows none of it. One tag puts a picture on the page, and it needs two things: where the picture is, and what it shows.',
  minutes: 11,
  outcomes: ['Put a picture on a page with img', 'Use src for the file and alt for a description', 'Recognise img as an empty element'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Kofi made cover art for every beat. Sunrise in Osu is orange and pink, with a sun coming up over the sea. On his page? Just the words. Want to fix that?',
          replies: ['Yes!', 'How?'],
        },
        {
          tey: 'The img tag. It\'s empty, like br: no closing tag, because the picture IS the content. It needs a src, short for "source": the picture\'s file name. Here, cover-1.png.',
          replies: ['That\'s it?'],
        },
        {
          tey: 'Almost. It also needs alt: words that describe the picture. If the picture can\'t load, the alt shows instead. And people who can\'t see the screen hear the alt read out. No alt, and they hear the file name, or nothing.',
          replies: ['What do I write in alt?'],
        },
        {
          tey: 'What the picture shows, in a few words, as you\'d describe it to a friend on the phone. "Album cover for Sunrise in Osu: an orange sun rising over the sea." Next lesson is all about writing good alt text.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kofi\'s first cover',
      caption: 'src says which picture. alt says what it shows. No closing tag.',
      code: '<h2>Sunrise in Osu</h2>\n<img src="cover-1.png" alt="Album cover for Sunrise in Osu: an orange sun rising over the sea" width="300" height="300">\n',
      challenge: 'Change cover-1.png to cover-2.png and update the alt: Jollof Bounce, red with orange and yellow circles.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '<img src="file" alt="what it shows">. Every picture gets an alt. img is empty: no closing tag.',
    },
  ],
  apply: {
    scenario: 'Kofi puts his cover art on the page.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of an img to its job.',
        pairs: [
          ['img', 'The picture tag'],
          ['src', 'Which picture file'],
          ['alt', 'Words that describe the picture'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Show the cover-1.png picture, with the alt text Album cover for Sunrise in Osu',
        starter: '<h2>Sunrise in Osu</h2>\n',
        solution: '<h2>Sunrise in Osu</h2>\n<img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n',
        hint: '<img src="cover-1.png" alt="...">',
        checks: [
          { message: 'A picture of cover-1.png', dom: { selector: 'img', attr: 'src', attrValue: 'cover-1.png' } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does img have no closing tag?',
        options: [
          { text: 'The picture is the content, so there\'s nothing to wrap' },
          { text: 'Someone forgot it', why: 'It\'s on purpose. img is an empty element, like br and hr.' },
          { text: 'It does: </img>', why: 'There\'s no </img>. img is empty.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does src mean?',
        options: [
          { text: 'Secret', why: 'Nothing secret: src is short for "source", the picture\'s file.' },
          { text: 'Screen', why: 'src is short for "source".' },
          { text: 'Source: which file to show' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the picture with a mistake.',
        language: 'html',
        lines: ['<img src="cover-1.png" alt="Album cover for Sunrise in Osu">', '<img href="cover-2.png" alt="Album cover for Jollof Bounce">', '<img src="cover-3.png" alt="Album cover for Night Bus to Kumasi">'],
        bug: 1,
        fix: '<img src="cover-2.png" alt="Album cover for Jollof Bounce">',
        explanation: 'Pictures use src. href is for links.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Do I really need alt? The picture is right there.',
        options: [
          { text: 'Only on big pictures.', why: 'Every meaningful picture needs alt, big or small.' },
          { text: 'Yes. If it fails to load, or someone can\'t see it, the alt is all they get.' },
          { text: 'No, browsers describe pictures by themselves.', why: 'Some try, often badly. Your alt is the reliable description.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a picture of cover-3.png with alt text',
        language: 'html',
        tiles: ['<img', ' src="cover-3.png"', ' alt="Album cover for Night Bus to Kumasi"', '>'],
        distractors: ['</img>', ' href="cover-3.png"'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute describes a picture in words?',
        answers: ['alt'],
        placeholder: 'Three letters',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the picture.',
        language: 'html',
        template: '<img [[1]]="cover-2.png" [[2]]="Album cover for Jollof Bounce">',
        blanks: [['src'], ['alt']],
        distractors: ['href', 'title', 'img'],
      },
      {
        kind: 'writeCode',
        prompt: 'Show all three covers: cover-1.png, cover-2.png and cover-3.png, each with alt text',
        starter: '',
        solution: '<img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n<img src="cover-2.png" alt="Album cover for Jollof Bounce">\n<img src="cover-3.png" alt="Album cover for Night Bus to Kumasi">\n',
        hint: 'Three img tags, each with its own src and alt.',
        checks: [
          { message: 'Three pictures', dom: { selector: 'img', count: 3 } },
          { message: 'Every picture has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'One of them is cover-3.png', dom: { selector: 'img[src="cover-3.png"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which picture would go on your own page first? How would you describe it to a friend on the phone?',
    starters: ['My first picture would be...', 'I\'d describe it as...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, put phone-studio.png on a page with alt text. Then misspell the file name and see what shows instead: your alt.',
  },
  notes: 'HTML Living Standard §4.8.3 img (void element; src required; alt required except in narrow cases). Covers are Teyro-made (frontend/public/originals/html-css/cover-1..3.png). width/height in the tryIt previews lesson 9.',
};

export default lesson;
