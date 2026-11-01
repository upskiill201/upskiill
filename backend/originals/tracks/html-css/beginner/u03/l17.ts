import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17 — jump links inside a long page: id and #. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Jump to the gigs',
  summary: 'Kofi\'s page is long now: about, beats, gigs, quotes, book me. Ama scrolls and scrolls on her old phone and gives up before the gigs. A menu at the top that jumps straight to each section would fix it.',
  minutes: 12,
  outcomes: ['Give a section an id', 'Link to it with #', 'Build a "jump to" menu for a long page'],
  learn: [
    {
      kind: 'story',
      title: 'Ama gives up',
      beats: [
        { speaker: 'narrator', text: 'Friday. Ama is testing the page on Mum\'s old phone, the one with the cracked screen. She scrolls. And scrolls.' },
        { speaker: 'ama', text: 'Where are the gigs? I\'m bored. I\'m going to watch cartoons.' },
        { speaker: 'kofi', text: 'They\'re right... there. Four screens down.' },
        { speaker: 'miracle', text: 'Long pages are fine, if people can jump. Give each section a name, and put links to them at the top.' },
        { speaker: 'tey', text: 'Two pieces. An id gives an element a name nobody else on the page has: id="gigs". A link with # and that name jumps straight to it: href="#gigs".' },
      ],
      choice: {
        prompt: 'How should Kofi fix the long page?',
        options: [
          {
            text: 'Add a small menu at the top with jump links to each section.',
            outcome: 'Ama taps "Gigs" and lands right on them. "Oh. That\'s easy." Highest praise.',
            best: true,
          },
          {
            text: 'Delete sections until it fits on one screen.',
            outcome: 'Every section is useful. The problem is getting to them, not having them.',
          },
          {
            text: 'Move the gigs to the very bottom so it feels like a reward.',
            outcome: 'Ama is already at the cartoons. People who came for the gigs leave first.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Jump links',
      caption: 'Tap "Gigs" in the page: it jumps down to the section with id="gigs". The # means "on this page".',
      code: '<p><a href="#beats">Beats</a> · <a href="#gigs">Gigs</a> · <a href="#book">Book me</a></p>\n<h2 id="beats">Beats</h2>\n<p>Three beats, all made on a phone.</p>\n<p>(Imagine a lot more here.)</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<h2 id="gigs">Gigs</h2>\n<p>Sound Up Saturdays, the 14th.</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<p>...</p>\n<h2 id="book">Book me</h2>\n<p><a href="mailto:book@mensahbeats.com">Email book@mensahbeats.com</a></p>\n',
      challenge: 'Add a "Back to top" link at the bottom: give the first p an id="top" and link to #top.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'id="gigs" names a spot. href="#gigs" jumps to it. Each id must be used only once on a page.',
    },
  ],
  apply: {
    scenario: 'Kofi adds a jump menu.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['id="gigs"', 'Names a spot on the page'],
          ['href="#gigs"', 'Jumps to that spot'],
          ['#', 'Means "on this page"'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the Gigs heading the id gigs, and add a link at the top that jumps to it, with the text Gigs',
        starter: '<p>Jump to:</p>\n<h2>Gigs</h2>\n<p>Sound Up Saturdays, the 14th.</p>\n',
        solution: '<p>Jump to: <a href="#gigs">Gigs</a></p>\n<h2 id="gigs">Gigs</h2>\n<p>Sound Up Saturdays, the 14th.</p>\n',
        hint: 'Add id="gigs" to the h2, and <a href="#gigs">Gigs</a> in the first paragraph.',
        checks: [
          { message: 'The heading has the id gigs', dom: { selector: 'h2#gigs', count: 1 } },
          { message: 'A link that jumps to it', dom: { selector: 'a[href="#gigs"]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the # in href="#book" mean?',
        options: [
          { text: 'A hashtag, like on Instagram', why: 'In a link, # means a spot on this page.' },
          { text: 'Jump to the element with id="book" on this page' },
          { text: 'A number', why: '# here marks a spot on the page, not a number.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the jump link that goes nowhere.',
        language: 'html',
        lines: ['<a href="#beats">Beats</a>', '<a href="#gig">Gigs</a>', '<h2 id="beats">Beats</h2>', '<h2 id="gigs">Gigs</h2>'],
        bug: 1,
        fix: '<a href="#gigs">Gigs</a>',
        explanation: 'The id is gigs, with an s. The link must match it exactly.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good id, or a problem?',
        groups: ['Good id', 'Problem'],
        items: [
          { text: 'id="gigs" used once', group: 0 },
          { text: 'id="gigs" on two different headings', group: 1 },
          { text: 'id="book-me"', group: 0 },
          { text: 'id="book me" (with a space)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Can I have a button that takes me back to the top? My thumb is tired.',
        options: [
          { text: 'Yes: a link to #top at the bottom, and id="top" at the start of the page.' },
          { text: 'Scroll faster.', why: 'Ama\'s thumb has spoken. A Back to top link is easy.' },
          { text: 'Only apps can do that.', why: 'One jump link does it on any page.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does tapping this link take you?',
        code: '<a href="#book">Book me</a>\n...\n<h2 id="book">Book me</h2>',
        language: 'html',
        options: [
          { text: 'To another website', why: 'A # link stays on the same page.' },
          { text: 'Nowhere', why: 'There\'s an element with id="book", so it jumps there.' },
          { text: 'Down to the Book me heading' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the jump link and its target.',
        language: 'html',
        template: '<a href="[[1]]beats">Beats</a>\n<h2 [[2]]="beats">Beats</h2>',
        blanks: [['#'], ['id']],
        distractors: ['@', 'name', 'href'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute gives an element a unique name on the page?',
        answers: ['id'],
        placeholder: 'Two letters',
      },
      {
        kind: 'writeCode',
        prompt: 'A jump menu: a nav paragraph with links to #beats, #gigs and #book, and three h2 sections with those ids',
        starter: '',
        solution: '<p><a href="#beats">Beats</a> <a href="#gigs">Gigs</a> <a href="#book">Book me</a></p>\n<h2 id="beats">Beats</h2>\n<h2 id="gigs">Gigs</h2>\n<h2 id="book">Book me</h2>\n',
        hint: 'One p with three # links, then three h2 with matching ids.',
        checks: [
          { message: 'Three jump links', dom: { selector: 'a[href^="#"]', count: 3 } },
          { message: 'A section with id beats', dom: { selector: '#beats', count: 1 } },
          { message: 'A section with id gigs', dom: { selector: '#gigs', count: 1 } },
          { message: 'A section with id book', dom: { selector: '#book', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Would your own page need a jump menu? Which sections would be in it?',
    starters: ['My jump menu would have...', 'I don\'t need one because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open a long Wikipedia article and tap a heading in its contents list. Look at the address bar: a # and the section name appear. Those are jump links.',
  },
  notes: 'HTML Living Standard §3.2.6 id (unique in the tree, no ASCII whitespace); §7.4.6.4 scrolling to a fragment. In the preview, catchLinks scrolls # links in place (the asset <base> would otherwise send them to the asset folder).',
};

export default lesson;
