import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 13 — why speed matters; images are usually the biggest cause; what to do about them. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Why is it so slow?',
  summary: 'On Ama\'s old phone, on mobile data, the gallery takes ages to appear. Kofi checks: his twelve covers are huge photos straight from Efua\'s design files. Tey explains why speed matters and where it usually goes.',
  minutes: 11,
  outcomes: ['Explain why page speed matters to visitors and search', 'Identify images as the usual cause of slow pages', 'Choose fixes: resize, compress, modern formats, lazy loading'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Slow pages lose people. Many visitors give up if a page takes more than a few seconds, especially on mobile data, which also costs them money. Search engines also consider how well pages perform for real visitors.',
          replies: ['What makes my page slow?'],
        },
        {
          tey: 'Usually images. Each of Efua\'s covers is about 4,000 pixels wide and several megabytes. On a phone they\'re shown about 300 pixels wide. The phone downloads ten times more than it shows.',
          replies: ['How do I fix that?'],
        },
        {
          tey: 'Resize each image to about the biggest size it\'s ever shown, maybe twice that for sharp phone screens. Then compress it. Modern formats like WebP are usually much smaller than JPEG or PNG for the same quality.',
          replies: ['And the ones further down the page?'],
        },
        {
          tey: 'Add loading="lazy" to images below the first screen. The browser waits until someone scrolls near them. Keep width and height on every image too, so the page doesn\'t jump while they load.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Lazy images',
      caption: 'The first cover loads straight away. The ones lower down wait until you scroll near them.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  img { max-width: 100%; height: auto; border-radius: 8px; display: block; margin-bottom: 24px; }\n</style>\n<h1>Mensah Beats</h1>\n<img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea" width="400" height="400">\n<p>Scroll down for more covers.</p>\n<img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400" loading="lazy">\n<img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400" loading="lazy">\n',
      challenge: 'Which image should NOT be lazy? Why?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Resize, compress, use modern formats, lazy-load images below the first screen, and keep width and height.',
    },
  ],
  apply: {
    scenario: 'Why is it so slow?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the gallery slow on Ama\'s phone?',
        options: [
          { text: 'The images are far bigger than they\'re ever shown, so the phone downloads too much' },
          { text: 'Her phone can\'t show images', why: 'It can; there\'s just too much to download.' },
          { text: 'The CSS is too long', why: 'Images are usually the biggest cost.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Lazy-load the lower cover: add loading="lazy" to the second image only',
        starter: '<img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400">\n<p>More covers below.</p>\n<img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400">\n',
        solution: '<img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400">\n<p>More covers below.</p>\n<img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400" loading="lazy">\n',
        hint: 'loading="lazy" on the second img.',
        checks: [
          { message: 'The lower cover is lazy', dom: { selector: 'img[src="cover-2.png"][loading="lazy"]', count: 1 } },
          { message: 'The first one loads straight away', dom: { selector: 'img[src="cover-1.png"][loading="lazy"]', count: 0 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fix to what it does.',
        pairs: [
          ['Resize', 'No bigger than it\'s shown'],
          ['Compress', 'Smaller file, same look'],
          ['WebP', 'A modern, smaller format'],
          ['loading="lazy"', 'Wait until it\'s nearly needed'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Lazy-load it, or load it straight away?',
        groups: ['Load straight away', 'Lazy-load'],
        items: [
          { text: 'The big cover at the top', group: 0 },
          { text: 'The tenth cover, far down the page', group: 1 },
          { text: 'The logo in the header', group: 0 },
          { text: 'Photos in the footer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Can\'t we just keep my full-size files? They look so sharp.',
        options: [
          { text: 'Resized to about twice the shown size they\'ll still look sharp on phones, and load in a fraction of the time.' },
          { text: 'Yes, quality first.', why: 'Visitors leave before they see it.' },
          { text: 'Make them even bigger.', why: 'Slower still.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the image that shouldn\'t be lazy.',
        language: 'html',
        lines: ['<img src="hero.webp" alt="Mensah Beats on stage" width="1200" height="630" loading="lazy">', '<img src="cover-9.webp" alt="Rain on Zinc cover" width="400" height="400" loading="lazy">', '<img src="footer-photo.webp" alt="The crowd at Sound Up Saturdays" width="800" height="450" loading="lazy">'],
        bug: 0,
        explanation: 'The big image at the very top is needed first. Making it lazy can slow down what people see first.',
        fix: '<img src="hero.webp" alt="Mensah Beats on stage" width="1200" height="630">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 4,000-pixel-wide photo is shown 300 pixels wide. Roughly how much of the download is wasted?',
        code: '<img src="cover-full.jpg" width="300"> <!-- file is 4000 px wide -->',
        language: 'html',
        options: [
          { text: 'Most of it: the phone downloads far more than it shows' },
          { text: 'None', why: 'The full file is downloaded either way.' },
          { text: 'Exactly half', why: 'It\'s far more than half.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lazy-load a lower image.',
        language: 'html',
        template: '<img src="cover-9.webp" alt="Rain on Zinc cover" width="400" height="400" [[1]]="[[2]]">',
        blanks: [['loading'], ['lazy']],
        distractors: ['load', 'later', 'async'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name a modern image format that\'s usually smaller than JPEG or PNG. (one word)',
        answers: ['webp', 'avif'],
        placeholder: 'A format',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep width and height on images even when they\'re lazy?',
        options: [
          { text: 'So the page saves space for them and doesn\'t jump when they load' },
          { text: 'They make the file smaller', why: 'They reserve space; they don\'t shrink files.' },
          { text: 'They don\'t matter for lazy images', why: 'They stop the jump.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'How big are the image files on your own site? How big are they shown?',
    starters: ['My images are...', 'They\'re shown at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check the size of every image on your site. Resize and compress the big ones (many free tools can save as WebP; check locally), and add loading="lazy" to images below the first screen.',
  },
  notes: 'Images are typically the largest share of page weight (HTTP Archive). Google considers page experience signals including Core Web Vitals. Native lazy loading via loading="lazy" (HTML spec). Avoid lazy-loading above-the-fold images (LCP guidance). WebP and AVIF are widely supported modern formats.',
};

export default lesson;
