import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19 — read a finished page with links, pictures and sound. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Read a finished page',
  summary: 'Miracle sends Kofi a page from Afiya\'s office party DJ, a friend of hers in Lagos. Links, pictures, sound, captions and a jump menu, all in one. Can you name every piece?',
  minutes: 12,
  outcomes: ['Read a page with links, pictures and sound and name every element', 'Explain why each attribute is there', 'Improve a page that\'s already good'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap every part of DJ Tolu\'s page',
      text: '<p><a href="#mixes">Mixes</a> · <a href="#book">Book</a></p>\n<h1>DJ Tolu</h1>\n<img src="images/kofi.png" alt="DJ Tolu at the decks" width="200" height="200">\n<p><small>Photo by Bisi, used with permission</small></p>\n<h2 id="mixes">Mixes</h2>\n<figure>\n  <img src="cover-3.png" alt="Cover for Lagos Late Night: a lit road" width="150" height="150">\n  <figcaption>Lagos Late Night (2026)</figcaption>\n  <audio controls src="beat-3.mp3">Your browser can\'t play this mix.</audio>\n</figure>\n<h2 id="book">Book</h2>\n<p><a href="mailto:tolu@example.com">Email tolu@example.com</a></p>',
      hotspots: [
        { phrase: '<a href="#mixes">Mixes</a>', note: 'A jump link to the section with id="mixes". The menu at the top saves scrolling.' },
        { phrase: 'alt="DJ Tolu at the decks"', note: 'Short, meaningful alt: who and what. Not "image of".' },
        { phrase: 'Photo by Bisi, used with permission', note: 'A credit, in small print. Bisi took the photo and said yes.' },
        { phrase: '<figure>', note: 'The cover, caption and player grouped as one release.' },
        { phrase: 'width="150" height="150"', note: 'The size up front, so the page doesn\'t jump while the cover loads.' },
        { phrase: '<audio controls src="beat-3.mp3">', note: 'A player with controls and no autoplay. The text inside is the fallback.' },
        { phrase: 'mailto:tolu@example.com', note: 'One tap to email. The link text shows the address too.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'DJ Tolu\'s page, live',
      caption: 'The same page, rendered. Tap "Book" in the menu to jump down. Press play.',
      code: '<p><a href="#mixes">Mixes</a> · <a href="#book">Book</a></p>\n<h1>DJ Tolu</h1>\n<img src="images/kofi.png" alt="DJ Tolu at the decks" width="200" height="200">\n<p><small>Photo by Bisi, used with permission</small></p>\n<h2 id="mixes">Mixes</h2>\n<figure>\n  <img src="cover-3.png" alt="Cover for Lagos Late Night: a lit road" width="150" height="150">\n  <figcaption>Lagos Late Night (2026)</figcaption>\n  <audio controls src="beat-3.mp3">Your browser can\'t play this mix.</audio>\n</figure>\n<h2 id="book">Book</h2>\n<p><a href="mailto:tolu@example.com">Email tolu@example.com</a></p>\n',
      challenge: 'Add a third link to the menu that jumps back to the h1. Give the h1 an id first.',
    },
  ],
  apply: {
    scenario: 'Kofi studies a page that works.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of DJ Tolu\'s page to its tag.',
        pairs: [
          ['Jump to Mixes', 'a with href="#mixes"'],
          ['The mix with its cover and caption', 'figure'],
          ['Photo by Bisi', 'small'],
          ['The play button', 'audio with controls'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the cover have width and height?',
        options: [
          { text: 'So the page doesn\'t jump while it loads' },
          { text: 'To make the file smaller', why: 'They change the display size only. The file stays the same.' },
          { text: 'Covers need them to show', why: 'They\'d show without them, but the page would jump.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a third mix to DJ Tolu\'s page: a figure with cover-1.png (with alt), a figcaption Accra Sunrise Mix, and a player for beat-1.mp3',
        starter: '<h2 id="mixes">Mixes</h2>\n',
        solution: '<h2 id="mixes">Mixes</h2>\n<figure>\n  <img src="cover-1.png" alt="Cover for Accra Sunrise Mix: an orange sun over the sea" width="150" height="150">\n  <figcaption>Accra Sunrise Mix</figcaption>\n  <audio controls src="beat-1.mp3"></audio>\n</figure>\n',
        hint: 'figure > img (with alt, width, height), figcaption, audio controls.',
        checks: [
          { message: 'A figure with cover-1.png', dom: { selector: 'figure img[src="cover-1.png"]', count: 1 } },
          { message: 'The cover has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'A caption', dom: { selector: 'figcaption', text: 'Accra Sunrise Mix' } },
          { message: 'A player for beat-1.mp3', dom: { selector: 'figure audio[controls][src="beat-1.mp3"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Something DJ Tolu got right, or a mistake?',
        groups: ['Got it right', 'Mistake'],
        items: [
          { text: 'Credited Bisi\'s photo', group: 0 },
          { text: 'No autoplay', group: 0 },
          { text: 'Link text that says where it goes', group: 0 },
          { text: 'A "click here" link', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'So what are you borrowing from Tolu for v0.3?',
        options: [
          { text: 'The jump menu, and packaging each beat as a figure with its cover and player.' },
          { text: 'His whole page.', why: 'Ideas, not the page. Kofi\'s site has to be his.' },
          { text: 'His photo.', why: 'That\'s Bisi\'s photo of Tolu. Kofi has David\'s.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tolu\'s first draft had one slip. Tap it.',
        language: 'html',
        lines: ['<a href="#mixes">Mixes</a>', '<h2 id="mix">Mixes</h2>', '<figure>', '<audio controls src="beat-3.mp3"></audio>', '</figure>'],
        bug: 1,
        fix: '<h2 id="mixes">Mixes</h2>',
        explanation: 'The link jumps to #mixes, but the id is "mix". They must match exactly.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens when you tap this?',
        code: '<a href="mailto:tolu@example.com">Email tolu@example.com</a>',
        language: 'html',
        options: [
          { text: 'It opens a web page', why: 'mailto: opens an email, not a page.' },
          { text: 'It opens an email to tolu@example.com' },
          { text: 'It copies the address', why: 'It opens the email app with the address filled in.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tolu\'s menu link.',
        language: 'html',
        template: '<a href="[[1]]book">Book</a>',
        blanks: [['#']],
        distractors: ['@', 'mailto:', 'tel:'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tolu\'s player has no autoplay. Which attribute shows its play button?',
        answers: ['controls'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Give Tolu a Back to top link: put id="top" on the h1, and a link to #top at the bottom that says Back to top',
        starter: '<h1>DJ Tolu</h1>\n<h2 id="book">Book</h2>\n',
        solution: '<h1 id="top">DJ Tolu</h1>\n<h2 id="book">Book</h2>\n<p><a href="#top">Back to top</a></p>\n',
        hint: 'id="top" on the h1, then <a href="#top">Back to top</a> at the end.',
        checks: [
          { message: 'The h1 has id top', dom: { selector: 'h1#top', count: 1 } },
          { message: 'A Back to top link', dom: { selector: 'a[href="#top"]', text: 'Back to top' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from DJ Tolu\'s page would help your own page most?',
    starters: ['I\'d borrow...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find a real musician\'s website and look for these pieces: a jump menu, credited photos, players, email links. Which ones are missing?',
  },
  notes: 'DJ Tolu (named in u02 l19 as playing at The Yard, Lagos) and Bisi\'s credit are fictional uses; Bisi is shared cast (Afiya). example.com is reserved for documentation (RFC 2606). The DJ\'s photo reuses images/kofi.png in the tryIt only as a placeholder illustration.',
};

export default lesson;
