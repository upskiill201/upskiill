import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 11 — don't hide content on phones: display: none and its cost. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Hide it on phones?',
  summary: 'The phone page is long: header, twelve covers, the gig table, the About section. Clinton has an idea: "Just hide the gigs and About on phones with display: none. Shorter page!" Choose what Kofi does.',
  minutes: 11,
  outcomes: ['Explain what display: none does', 'Explain why hiding content from phone users is a bad trade', 'Make a long phone page easier to get around instead'],
  learn: [
    {
      kind: 'story',
      title: 'A very long page',
      beats: [
        { speaker: 'narrator', text: 'On Ama\'s phone, the page goes on and on. Covers, then gigs, then About, then the booking email.' },
        { speaker: 'clinton', text: 'Easy. @media (max-width: 699px) { .gigs, .about { display: none; } }. Gone.' },
        { speaker: 'efua', text: 'Gone for most of his visitors, you mean.' },
        { speaker: 'tey', text: 'What do people on phones actually want from Mensah Beats?' },
      ],
      choice: {
        prompt: 'How should Kofi handle the long phone page?',
        options: [
          {
            text: 'Keep everything, and add jump links at the top: Beats, Gigs, Book me, so phone users can skip straight there.',
            outcome: 'Phone visitors get the whole site, and one tap takes them to gigs or booking. The organiser books him from her phone.',
            best: true,
          },
          {
            text: 'Hide the gigs and About on phones with display: none.',
            outcome: 'The page is shorter, but most visitors can no longer see when he\'s playing or how to book him.',
          },
          {
            text: 'Shrink everything so more fits on the screen.',
            outcome: 'More fits, but nothing is readable and nothing is easy to tap.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>display: none</strong> removes an element completely: it isn\'t shown, takes no space, and screen readers skip it too. Useful for things that truly shouldn\'t be there, like a "Menu" label meant only for wide screens. Hiding real content from phone users means hiding it from most of your visitors.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Jump links, not hiding',
      caption: 'Every section is still there. The jump links at the top let phone users skip to what they want.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .jump { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; }\n  .jump a { display: inline-block; padding: 12px; background-color: #1F2E52; color: #FF9600; border-radius: 8px; }\n</style>\n<nav><ul class="jump"><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li><li><a href="#book">Book me</a></li></ul></nav>\n<section id="beats"><h2>Beats</h2><p>Twelve beats.</p></section>\n<section id="gigs"><h2>Gigs</h2><p>Sound Up Saturdays, 25 Oct.</p></section>\n<section id="book"><h2>Book me</h2><p>bookings@example.com</p></section>\n',
      challenge: 'Tap "Book me". The page jumps straight to it.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Phone users want the same things. Don\'t hide content; make it easy to reach.',
    },
  ],
  apply: {
    scenario: 'Hide it on phones?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does display: none do?',
        options: [
          { text: 'Makes it see-through but still there', why: 'It\'s removed completely.' },
          { text: 'Removes the element: not shown, no space, and screen readers skip it' },
          { text: 'Shrinks it', why: 'It disappears entirely.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add jump links instead of hiding: a nav with links to #gigs and #book',
        starter: '<section id="gigs"><h2>Gigs</h2></section>\n<section id="book"><h2>Book me</h2></section>\n',
        solution: '<nav><a href="#gigs">Gigs</a> <a href="#book">Book me</a></nav>\n<section id="gigs"><h2>Gigs</h2></section>\n<section id="book"><h2>Book me</h2></section>\n',
        hint: '<nav><a href="#gigs">Gigs</a> <a href="#book">Book me</a></nav>',
        checks: [
          { message: 'A jump to gigs', dom: { selector: 'nav a[href="#gigs"]', count: 1 } },
          { message: 'A jump to booking', dom: { selector: 'nav a[href="#book"]', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Jump links, everything kept', 'Booked from her phone'],
          ['display: none on phones', 'Most visitors miss the gigs'],
          ['Shrink everything', 'Unreadable, untappable'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Reasonable to hide on phones, or real content to keep?',
        groups: ['Fine to hide', 'Keep it'],
        items: [
          { text: 'A decorative background shape', group: 0 },
          { text: 'The gig dates', group: 1 },
          { text: 'A "hover for details" hint that only makes sense with a mouse', group: 0 },
          { text: 'The booking email', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But phone users don\'t want to read all that!',
        options: [
          { text: 'They might, they\'re most of the visitors. Jump links let them skip, without losing anything.' },
          { text: 'True, hide most of it.', why: 'Then they can\'t book or find gigs.' },
          { text: 'Make a shorter phone site.', why: 'Two sites drift apart.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that hides real content from most visitors.',
        language: 'css',
        lines: ['.decoration { display: none; }', '@media (max-width: 699px) { .gigs { display: none; } }', '.jump { display: flex; }'],
        bug: 1,
        explanation: 'It hides the gig list on phones, where most visitors are.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A screen reader user on a phone. Do they hear the gigs?',
        code: '@media (max-width: 699px) { .gigs { display: none; } }',
        language: 'css',
        options: [
          { text: 'Yes, screen readers ignore CSS', why: 'They respect display: none.' },
          { text: 'No: display: none hides it from screen readers too' },
          { text: 'Only the first gig', why: 'The whole section is removed.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A jump link to the booking section.',
        language: 'html',
        template: '<a href="[[1]]book">Book me</a>\n<section [[2]]="book">...</section>',
        blanks: [['#'], ['id']],
        distractors: ['.', 'class', 'name'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which display value removes an element completely? (one word)',
        answers: ['none'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a better fix for a very long phone page than hiding things?',
        options: [
          { text: 'Tiny text', why: 'Unreadable.' },
          { text: 'Removing the footer', why: 'Make content easy to reach instead.' },
          { text: 'Jump links at the top, so people can skip to what they want' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What are the two things a visitor to your page most wants? Can they reach them in one tap on a phone?',
    starters: ['They want...', 'One tap would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add jump links at the top of your page to its most important sections, and check nothing is hidden on phones.',
  },
  notes: 'display: none removes elements from the accessibility tree. Jump links (id targets) were taught in Course 1 Chapter 3.',
};

export default lesson;
