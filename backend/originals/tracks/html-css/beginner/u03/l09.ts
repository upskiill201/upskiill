import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9 — width and height attributes so the page doesn't jump while pictures load. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Pictures that don\'t jump',
  summary: 'Ama goes to tap "Book me" on a slow connection and the page jumps: a picture loads late and shoves everything down, so she taps the wrong thing. Telling the browser a picture\'s size up front stops the jump.',
  minutes: 11,
  outcomes: ['Give a picture width and height', 'Explain why size attributes stop the page jumping', 'Show a picture smaller than its file'],
  learn: [
    {
      kind: 'compare',
      title: 'The jumping page',
      before: { label: 'No size given', text: '<img src="cover-1.png" alt="Sunrise in Osu cover">\n<a href="mailto:book@mensahbeats.com">Book me</a>\n\nThe browser doesn\'t know how big the picture is until it arrives. It shows the link first, then the picture loads and pushes the link down, just as Ama taps.' },
      after: { label: 'Size given', text: '<img src="cover-1.png" alt="Sunrise in Osu cover" width="300" height="300">\n<a href="mailto:book@mensahbeats.com">Book me</a>\n\nThe browser saves a 300 by 300 space straight away. The picture fills it when it arrives, and nothing moves.' },
      notes: [
        'width and height are in pixels, written as plain numbers: width="300", not "300px".',
        'Use the picture\'s real shape: Kofi\'s covers are square, so width and height are equal.',
        'They also let you show a big file smaller: a 400 by 400 cover at width="200" height="200".',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Same file, two sizes',
      caption: 'The cover file is 400 by 400. The first one shows at 200, the second at 100. Same file, same shape.',
      code: '<img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n<img src="cover-2.png" alt="Album cover for Jollof Bounce" width="100" height="100">\n',
      challenge: 'Make the second one 150 by 150. Then try width="300" height="100" and see what happens to the shape.',
    },
  ],
  apply: {
    scenario: 'Kofi stops his page from jumping.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does a page jump while pictures load?',
        options: [
          { text: 'The browser doesn\'t know a picture\'s size until it arrives, so it moves things when it does' },
          { text: 'Pictures are too colourful', why: 'Colour has nothing to do with it. Unknown size does.' },
          { text: 'The phone is shaking', why: 'Ama\'s phone is fine. The layout shifts when sizes arrive late.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Stop the jump: give the cover a width of 300 and a height of 300',
        starter: '<img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n',
        solution: '<img src="cover-1.png" alt="Album cover for Sunrise in Osu" width="300" height="300">\n',
        hint: 'Add width="300" height="300" inside the img tag.',
        checks: [
          { message: 'Width 300', dom: { selector: 'img', attr: 'width', attrValue: '300' } },
          { message: 'Height 300', dom: { selector: 'img', attr: 'height', attrValue: '300' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the size that\'s written wrong.',
        language: 'html',
        lines: ['<img src="cover-1.png" alt="Sunrise in Osu cover" width="200" height="200">', '<img src="cover-2.png" alt="Jollof Bounce cover" width="200px" height="200px">'],
        bug: 1,
        fix: '<img src="cover-2.png" alt="Jollof Bounce cover" width="200" height="200">',
        explanation: 'The width and height attributes take plain numbers, no "px".',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the cover square, or squashes it?',
        groups: ['Square', 'Squashed'],
        items: [
          { text: 'width="200" height="200"', group: 0 },
          { text: 'width="300" height="100"', group: 1 },
          { text: 'width="120" height="120"', group: 0 },
          { text: 'width="100" height="250"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'I tapped Book me and it turned into a picture! The page moved!',
        options: [
          { text: 'Sorry! I\'ll give the pictures a width and height so nothing moves while they load.' },
          { text: 'Tap faster next time.', why: 'Ama shouldn\'t have to race the page. Size attributes fix it.' },
          { text: 'Pictures always do that.', why: 'Not when they have width and height.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The file is 400 by 400. How big does it show?',
        code: '<img src="cover-3.png" alt="Night Bus to Kumasi cover" width="150" height="150">',
        language: 'html',
        options: [
          { text: '400 by 400', why: 'width and height set the size it shows at.' },
          { text: '150 by 150' },
          { text: 'It doesn\'t show', why: 'It shows, just smaller.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the picture.',
        language: 'html',
        template: '<img src="kofi.png" alt="Kofi" [[1]]="200" [[2]]="200">',
        blanks: [['width'], ['height']],
        distractors: ['size', 'px', 'length'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to its job.',
        pairs: [
          ['width', 'How wide, in pixels'],
          ['height', 'How tall, in pixels'],
          ['alt', 'What it shows, in words'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'width="300px" is wrong. What should it be? (just the value)',
        answers: ['300'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Show all three covers at 150 by 150, each with alt text',
        starter: '',
        solution: '<img src="cover-1.png" alt="Sunrise in Osu cover" width="150" height="150">\n<img src="cover-2.png" alt="Jollof Bounce cover" width="150" height="150">\n<img src="cover-3.png" alt="Night Bus to Kumasi cover" width="150" height="150">\n',
        hint: 'Three img tags, each with src, alt, width="150" and height="150".',
        checks: [
          { message: 'Three covers', dom: { selector: 'img', count: 3 } },
          { message: 'Every cover has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'Every cover is 150 wide', dom: { selector: 'img[width="150"]', count: 3 } },
          { message: 'Every cover is 150 tall', dom: { selector: 'img[height="150"]', count: 3 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever tapped the wrong thing because a page jumped? What were you trying to tap?',
    starters: ['I once tapped...', 'It was annoying because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, show kofi.png at three sizes: 100, 200 and 300, all square.',
  },
  notes: 'HTML Living Standard §4.8.4.1 width/height (valid non-negative integers, CSS pixels). Browsers use them for the aspect-ratio before load, preventing Cumulative Layout Shift (web.dev, "Optimize Cumulative Layout Shift"). Covers and kofi.png are 400x400.',
};

export default lesson;
