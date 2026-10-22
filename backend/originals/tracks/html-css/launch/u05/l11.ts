import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 11 — the launch post: honest, specific, one clear link and action. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The launch post',
  summary: 'Kofi drafts the post he\'ll share at midnight. Clinton wants "THE BEST MUSIC SITE IN AFRICA!!!". Efua wants something true. Choose the launch post.',
  minutes: 11,
  outcomes: ['Write an honest, specific launch message', 'Give one clear link and one clear action', 'Avoid claims you can\'t back up'],
  learn: [
    {
      kind: 'story',
      title: 'What to say at midnight',
      beats: [
        { speaker: 'clinton', text: 'Go big! "The best music site in Africa! Life-changing beats!"' },
        { speaker: 'efua', text: 'People who know you will laugh. Say what\'s actually new.' },
        { speaker: 'kofi', text: 'And I want people to actually click it.' },
        { speaker: 'tey', text: 'Say what\'s new, why it matters to them, and give one link.' },
      ],
      choice: {
        prompt: 'Which launch post should Kofi share?',
        options: [
          {
            text: '"Mensah Beats v2.0 is live. Every beat free to stream, works on any phone, and you can book me for your event in one form. mensahbeats.example.app"',
            outcome: 'Specific, true and easy to act on. People click, stream, and three bookings arrive that week.',
            best: true,
          },
          {
            text: '"THE BEST MUSIC SITE IN AFRICA!!! LIFE-CHANGING!!!"',
            outcome: 'People scroll past. A few laugh. Nobody knows what\'s actually new, and there\'s no link.',
          },
          {
            text: '"New site. Link in bio somewhere."',
            outcome: 'Nobody knows what\'s new or where to find it.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>A good launch post</strong> says what\'s new, why it matters to the reader, and gives one link to one action. Every claim should be true and checkable: "works on any phone" because you tested it, "free to stream" because it is. Hype you can\'t back up makes people trust you less.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A launch note on the site',
      caption: 'The same message as a small "What\'s new" box on the home page.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; padding: 16px; }\n  .news { background-color: #1F2E52; padding: 16px; border-radius: 12px; border-left: 4px solid #FFC83D; }\n  a { color: #FFC83D; }\n</style>\n<aside class="news" aria-label="What\'s new">\n  <h2>New: Mensah Beats v2.0</h2>\n  <p>Every beat free to stream, a site that works on any phone, and booking in one form.</p>\n  <p><a href="book.html">Book Kofi for your event</a></p>\n</aside>\n',
      challenge: 'Rewrite the paragraph with one more true, specific thing that\'s new.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'What\'s new, why it matters, one link. True claims only.',
    },
  ],
  apply: {
    scenario: 'The launch post.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes a launch post work?',
        options: [
          { text: 'It says what\'s new, why it matters, and gives one clear link' },
          { text: 'Lots of capital letters', why: 'Specific beats loud.' },
          { text: 'Big claims nobody can check', why: 'They lose trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a link to book.html with the text "Book Kofi for your event" to the news box',
        starter: '<aside class="news" aria-label="What\'s new">\n  <h2>New: Mensah Beats v2.0</h2>\n  <p>Every beat free to stream.</p>\n\n</aside>\n',
        solution: '<aside class="news" aria-label="What\'s new">\n  <h2>New: Mensah Beats v2.0</h2>\n  <p>Every beat free to stream.</p>\n  <p><a href="book.html">Book Kofi for your event</a></p>\n</aside>\n',
        hint: '<a href="book.html">Book Kofi for your event</a>',
        checks: [
          { message: 'A link to booking', dom: { selector: 'aside a[href="book.html"]', count: 1 } },
          { message: 'With clear text', dom: { selector: 'aside a', text: 'Book Kofi' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True and checkable, or hype?',
        groups: ['True and checkable', 'Hype'],
        items: [
          { text: 'Works on any phone (tested)', group: 0 },
          { text: 'The best site in Africa', group: 1 },
          { text: 'Every beat free to stream', group: 0 },
          { text: 'Life-changing beats', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the post to its job.',
        pairs: [
          ['"v2.0 is live"', 'Says what\'s new'],
          ['"Works on any phone"', 'Why it matters to you'],
          ['mensahbeats.example.app', 'Where to go'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Just say it\'s the best. Everyone says that.',
        options: [
          { text: 'Fine, the best in the world.', why: 'Even harder to believe.' },
          { text: 'I won\'t post anything.', why: 'Post, honestly.' },
          { text: 'That\'s why nobody believes it. I\'ll say what\'s true and new, and let people decide.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the claim Kofi can\'t back up.',
        lines: ['Every beat is free to stream.', 'Guaranteed to make your party go viral.', 'Book me for your event in one form.'],
        bug: 1,
        explanation: 'Nobody can guarantee that. Keep to what\'s true.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How does a screen reader announce this box?',
        code: '<aside class="news" aria-label="What\'s new">\n  <h2>New: Mensah Beats v2.0</h2>\n</aside>',
        language: 'html',
        options: [
          { text: 'It skips it', why: 'aside with a label is announced.' },
          { text: 'As a "What\'s new" section, with its heading' },
          { text: 'As a button', why: 'It\'s a section, not a button.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Say what\'s [[1]], why it matters, and give one [[2]].',
        blanks: [['new'], ['link']],
        distractors: ['loud', 'hashtag', 'guarantee'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many links should a launch post focus on? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does hype hurt a launch?',
        options: [
          { text: 'People can tell it isn\'t true, and trust you less' },
          { text: 'It makes the site slower', why: 'It\'s about trust.' },
          { text: 'It doesn\'t hurt', why: 'It loses trust.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write the one-sentence launch post for your own site. What\'s true and new?',
    starters: ['My site is live...', 'You can now...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your launch post: what\'s new, why it matters to the reader, and one link. Read it out loud. Is every claim true?',
  },
  notes: 'No reach or booking statistics claimed beyond the story. aside with aria-label exposes a complementary landmark with that name.',
};

export default lesson;
