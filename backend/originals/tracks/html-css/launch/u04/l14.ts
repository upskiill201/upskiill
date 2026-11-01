import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 14 — making the gallery fast, step by step. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Make the gallery fast',
  summary: 'Miracle\'s four-step routine for any page with lots of pictures. Kofi runs it on the gallery, and on Ama\'s phone it appears almost instantly.',
  minutes: 12,
  outcomes: ['Resize and compress images before uploading', 'Save images in a modern format', 'Lazy-load below-the-fold images and keep their sizes'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a fast gallery',
      steps: [
        { title: '1. Find the biggest shown size', body: 'The gallery shows covers at most about 300 pixels wide. For sharp phone screens, aim for about twice that: 600 pixels.' },
        { title: '2. Resize and compress', body: 'Resize each cover to 600 by 600 and save it compressed. Free image tools can do this; check locally which you have. Each file drops from several megabytes to well under one.' },
        { title: '3. Use a modern format', body: 'Save as WebP, which is usually much smaller than JPEG or PNG for the same look. Name files clearly.', code: '<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover" width="600" height="600">', language: 'html' },
        { title: '4. Lazy-load the lower ones', body: 'The first row loads straight away. Everything further down gets loading="lazy". Every image keeps its width and height.', code: '<img src="covers/kente-code.webp" alt="Kente Code cover" width="600" height="600" loading="lazy">', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A fast gallery',
      caption: 'The first two covers load straight away; the rest wait. All keep their sizes, so nothing jumps.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }\n  .gallery img { width: 100%; height: auto; border-radius: 6px; }\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400">\n  <img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400">\n  <img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400" loading="lazy">\n  <img src="cover-1.png" alt="Accra Sunrise Mix cover" width="400" height="400" loading="lazy">\n  <img src="cover-2.png" alt="Harmattan Morning cover" width="400" height="400" loading="lazy">\n</section>\n',
      challenge: 'Check every img: does each have alt, width and height?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Biggest shown size times two, compressed, WebP, lazy below the fold, width and height always.',
    },
  ],
  apply: {
    scenario: 'Making the gallery fast.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Find the biggest size it\'s shown at', 'Resize and compress', 'Save in a modern format like WebP', 'Lazy-load the lower images'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the third cover lazy and give it its size: loading="lazy", width="400" and height="400"',
        starter: '<section class="gallery">\n  <img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400">\n  <img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400">\n  <img src="cover-3.png" alt="Night Bus to Kumasi cover">\n</section>\n',
        solution: '<section class="gallery">\n  <img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400">\n  <img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400">\n  <img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400" loading="lazy">\n</section>\n',
        hint: 'Add width="400" height="400" loading="lazy" to the third img.',
        checks: [
          { message: 'The third cover is lazy', dom: { selector: 'img[src="cover-3.png"][loading="lazy"]', count: 1 } },
          { message: 'Every image has a size', dom: { selector: 'img[width][height]', count: 3 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A cover is shown at most 300 pixels wide. What size should the file be?',
        options: [
          { text: '4,000 pixels, to be safe', why: 'Far more than needed.' },
          { text: '100 pixels', why: 'Too small: it would look blurry.' },
          { text: 'About 600 pixels: twice the shown size for sharp screens' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes the page faster, or slower?',
        groups: ['Faster', 'Slower'],
        items: [
          { text: 'Resizing to 600 pixels', group: 0 },
          { text: 'Uploading 4,000-pixel originals', group: 1 },
          { text: 'loading="lazy" on lower images', group: 0 },
          { text: 'Lazy-loading the top image', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the image that will make the page jump.',
        language: 'html',
        lines: ['<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover" width="600" height="600">', '<img src="covers/kente-code.webp" alt="Kente Code cover" loading="lazy">', '<img src="covers/labadi-waves.webp" alt="Labadi Waves cover" width="600" height="600" loading="lazy">'],
        bug: 1,
        explanation: 'No width or height, so the page doesn\'t know how much space to save.',
        fix: '<img src="covers/kente-code.webp" alt="Kente Code cover" width="600" height="600" loading="lazy">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'The covers appear really fast now! What did you do?',
        options: [
          { text: 'Bought you a faster phone.', why: 'The page got lighter.' },
          { text: 'Made the files smaller, saved them as WebP, and the ones lower down only load when you scroll to them.' },
          { text: 'Deleted half of them.', why: 'They\'re all there, just smaller files.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to its job.',
        pairs: [
          ['width and height', 'Save space, no jumping'],
          ['loading="lazy"', 'Load when nearly needed'],
          ['alt', 'Describe the picture'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which images load as soon as the page opens?',
        code: '<img src="a.webp" width="600" height="600">\n<img src="b.webp" width="600" height="600">\n<img src="c.webp" width="600" height="600" loading="lazy">',
        language: 'html',
        options: [
          { text: 'a and b; c waits until you scroll near it' },
          { text: 'All three', why: 'c is lazy.' },
          { text: 'Only c', why: 'c is the lazy one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A fast, accessible gallery image.',
        language: 'html',
        template: '<img src="covers/kente-code.[[1]]" alt="Kente Code cover" width="600" height="600" loading="[[2]]">',
        blanks: [['webp'], ['lazy']],
        distractors: ['bmp', 'later', 'eager'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many times the shown width should an image file be, for sharp phone screens? (a number)',
        answers: ['2', 'two', '2x'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of your images would benefit most from resizing?',
    starters: ['My biggest image is...', 'I\'ll resize it to...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Run the four steps on every image on your site, upload the new files, and test the page on a phone using mobile data.',
  },
  notes: 'About 2x the displayed size covers most high-density phone screens; srcset/sizes for multiple resolutions is beyond this course. The gallery demo uses the course\'s 400x400 PNGs; real sites would use the resized WebP files described.',
};

export default lesson;
