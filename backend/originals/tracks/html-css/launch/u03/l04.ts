import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 4 — what a screen reader announces for landmarks, headings, links, images, lists. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'What Kwesi hears',
  summary: 'Kwesi records a minute of his screen reader going through the new page and sends it to Kofi. Every element announces itself. Tap each part of the code to hear, roughly, what he hears.',
  minutes: 11,
  outcomes: ['Predict roughly what a screen reader announces', 'Explain why the right element matters more than the look', 'Spot elements that announce nothing useful'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<nav>\n  <ul>\n    <li><a href="#gigs">Gigs</a></li>\n  </ul>\n</nav>\n<main>\n  <h2>Gigs</h2>\n  <img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea">\n  <button type="submit">Send booking request</button>\n</main>',
      hotspots: [
        { phrase: '<nav>', note: '"Navigation, landmark." Kwesi can jump here directly.' },
        { phrase: '<ul>', note: '"List, 1 item." He knows how many links there are before he starts.' },
        { phrase: '<a href="#gigs">Gigs</a>', note: '"Gigs, link." The link text is all he hears, which is why "click here" fails.' },
        { phrase: '<h2>Gigs</h2>', note: '"Heading level 2, Gigs." He can jump between headings.' },
        { phrase: 'alt="Sunrise in Osu cover: an orange sun rising over the sea"', note: '"Image, Sunrise in Osu cover: an orange sun rising over the sea." Without alt, he might hear the file name.' },
        { phrase: '<button type="submit">', note: '"Send booking request, button." A real button is announced as one and works with the keyboard.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Read it like a screen reader',
      caption: 'Go through the page top to bottom and say out loud what each element would announce.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  a { color: #FF9600; }\n  img { max-width: 200px; height: auto; border-radius: 8px; }\n</style>\n<nav><ul><li><a href="#gigs">Gigs</a></li><li><a href="#book">Book me</a></li></ul></nav>\n<main>\n  <h2 id="gigs">Gigs</h2>\n  <img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea" width="400" height="400">\n  <p>End-of-year show, 20 December.</p>\n</main>\n',
      challenge: 'Delete the alt. What would Kwesi hear instead? (Often the file name: "cover-1 dot png".)',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The element decides what\'s announced: nav = navigation, h2 = heading level 2, a = link, button = button.',
    },
  ],
  apply: {
    scenario: 'What Kwesi hears.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each element to what it announces.',
        pairs: [
          ['<nav>', 'Navigation landmark'],
          ['<h2>', 'Heading level 2'],
          ['<ul> with 3 li', 'List, 3 items'],
          ['<button>', 'Button'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the cover image alt text that describes it: "Sunrise in Osu cover: an orange sun rising over the sea"',
        starter: '<img src="cover-1.png" width="400" height="400">\n',
        solution: '<img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea" width="400" height="400">\n',
        hint: 'alt="Sunrise in Osu cover: an orange sun rising over the sea"',
        checks: [
          { message: 'The image has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'Naming the beat', dom: { selector: 'img[alt*="Sunrise in Osu"]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a real button matter more than something styled to look like one?',
        options: [
          { text: 'It\'s announced as a button and works with the keyboard; a styled box isn\'t and doesn\'t' },
          { text: 'It looks nicer', why: 'They can look identical.' },
          { text: 'It doesn\'t matter', why: 'Screen readers read the element, not the look.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Announces something useful, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: '<a href="#gigs">Gigs</a>', group: 0 },
          { text: '<a href="#gigs">Click here</a>', group: 1 },
          { text: '<img alt="Kofi at Sound Up Saturdays">', group: 0 },
          { text: '<img src="IMG_2041.jpg"> with no alt', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Kwesi says my footer links all just say "here". What do I change?',
        options: [
          { text: 'Rewrite each link to say where it goes: "Email bookings", "Instagram", "Download press photo".' },
          { text: 'Add more "here" links.', why: 'He still can\'t tell them apart.' },
          { text: 'Make them bold.', why: 'He hears the words, not the style.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will sound confusing.',
        language: 'html',
        lines: ['<a href="#gigs">See upcoming gigs</a>', '<a href="#book">Click here</a>', '<h2>Book me</h2>'],
        bug: 1,
        explanation: '"Click here, link" says nothing about where it goes.',
        fix: '<a href="#book">Book Kofi for your event</a>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Roughly what does a screen reader say for this?',
        code: '<nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul></nav>',
        language: 'html',
        options: [
          { text: '"Navigation. List, 2 items. Beats, link. Gigs, link."' },
          { text: '"Beats Gigs"', why: 'It also announces the landmark, list and links.' },
          { text: 'Nothing', why: 'It reads every part.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the link announce something useful.',
        language: 'html',
        template: '<a href="#book">[[1]] Kofi for your [[2]]</a>',
        blanks: [['Book'], ['event']],
        distractors: ['Click', 'here', 'more'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute gives an image words for screen readers? (one word)',
        answers: ['alt'],
        placeholder: 'An attribute',
      },
      {
        kind: 'mcq',
        prompt: 'Why does wrapping links in a ul help?',
        options: [
          { text: 'The screen reader says how many links there are before you start' },
          { text: 'It makes them bigger', why: 'It adds structure, not size.' },
          { text: 'It doesn\'t', why: 'Lists announce their size.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Read your own page aloud as a screen reader would. Which part sounds confusing?',
    starters: ['It sounds confusing at...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Turn on your phone\'s screen reader (check locally how to turn it off again first) and listen to your own page for one minute.',
  },
  notes: 'Announcements vary by screen reader and browser; examples are approximate. Course 1 Chapter 3 covered alt text and link text; this lesson revisits them from a listener\'s point of view.',
};

export default lesson;
