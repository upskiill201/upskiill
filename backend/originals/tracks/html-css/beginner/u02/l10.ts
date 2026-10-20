import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (and earlier). Story beat: Miracle's call. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Miracle\'s call',
  summary: 'Miracle video-calls from Lagos, eating suya at her desk at Afiya, and asks Kofi to walk her through his page line by line. Line breaks, writing for scanners, special characters and nested lists, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Use br and p in the right places', 'Write headings and sentences for scanners', 'Use special characters and nested lists correctly'],
  learn: [
    {
      kind: 'story',
      title: 'Line by line',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, 7pm. Miracle calls from Afiya\'s office in Lagos. There\'s suya on her desk and a bug tracker on her second screen.' },
        { speaker: 'miracle', text: 'Share your screen. Walk me through it, line by line. If you can explain every tag, you understand it.' },
        { speaker: 'kofi', text: 'Line by line? That\'s like an exam.' },
        { speaker: 'miracle', text: 'It IS an exam. I do this with the developers here every week. Start from the top.' },
        { speaker: 'tey', text: 'Let\'s get Kofi through Miracle\'s walkthrough.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: explain every line to Miracle.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'The address is three separate paragraphs. Make it one paragraph with line breaks: Sound Up Saturdays, Osu, Accra',
        starter: '<p>Sound Up Saturdays</p>\n<p>Osu</p>\n<p>Accra</p>\n',
        solution: '<p>Sound Up Saturdays<br>\nOsu<br>\nAccra</p>\n',
        hint: 'One p, with <br> after the first two lines.',
        checks: [
          { message: 'One paragraph', dom: { selector: 'p', count: 1 } },
          { message: 'Two line breaks', dom: { selector: 'p br', count: 2 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Miracle points at five br tags stacked in a row. "What are these for?" What\'s the honest answer?',
        options: [
          { text: 'They make the page faster', why: 'They don\'t. And spacing like that is CSS\'s job.' },
          { text: 'They\'re a line break each, for lyrics', why: 'Five in a row with nothing between them is spacing, not lyrics.' },
          { text: 'Spacing, which should really be done with CSS' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which heading would Miracle approve?',
        options: [
          { text: 'Book me: weddings, parties, events' },
          { text: 'Contact', why: 'Vague. Front-load what the visitor can actually do.' },
          { text: 'Here is how you can get in touch with me if you want', why: 'The useful words are buried at the end.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the page say Tip: every page needs one <h1>, without starting a heading',
        starter: '<p>Tip: every page needs one <h1>.</p>\n',
        solution: '<p>Tip: every page needs one &lt;h1&gt;.</p>\n',
        hint: '&lt; for < and &gt; for >.',
        checks: [
          { message: 'The page shows <h1> as text', outputIncludes: 'every page needs one <h1>' },
          { message: 'No real heading starts', dom: { selector: 'h1', count: 0 } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line where the nested list is in the wrong place.',
        language: 'html',
        lines: ['<ul>', '  <li>Afrobeats</li>', '  <ul><li>Jollof Bounce</li></ul>', '  <li>Drill</li>', '</ul>'],
        bug: 2,
        fix: 'Move it inside the Afrobeats li, before </li>.',
        explanation: 'An inner list must sit inside an li, not between items.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each code to what it shows.',
        pairs: [
          ['&copy;', 'The copyright sign (a C in a circle)'],
          ['&amp;', '&'],
          ['&lt;', '<'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'br or p?',
        groups: ['br', 'p'],
        items: [
          { text: 'The next line of the Jollof Bounce hook', group: 0 },
          { text: 'A new idea in Kofi\'s story', group: 1 },
          { text: 'The next line of an address', group: 0 },
          { text: 'A separate thank-you to fans', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the copyright line show?',
        code: '<p>&copy; 2026 Mensah Beats &amp; friends</p>',
        language: 'html',
        options: [
          { text: '&copy; 2026 Mensah Beats &amp; friends', why: 'The browser turns each code into its symbol.' },
          { text: 'The copyright sign, then 2026 Mensah Beats & friends' },
          { text: '2026 Mensah Beats friends', why: 'The codes become symbols; they don\'t vanish.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Last one. Why is your genre list inside your genre list?',
        options: [
          { text: 'It just happened.', why: 'Miracle wants a reason. Nesting should be on purpose.' },
          { text: 'Each genre has its beats inside it, so the inner list sits inside each genre\'s li.' },
          { text: 'To make it look longer.', why: 'Nesting is for structure, not length.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Build a Gigs section: an h2 Gigs by city, a list with Accra and Kumasi, and inside Accra a list with Sound Up Saturdays',
        starter: '',
        solution: '<h2>Gigs by city</h2>\n<ul>\n  <li>Accra\n    <ul><li>Sound Up Saturdays</li></ul>\n  </li>\n  <li>Kumasi</li>\n</ul>\n',
        hint: 'h2, then a ul with two li. Inside the Accra li, a small ul.',
        checks: [
          { message: 'A heading Gigs by city', dom: { selector: 'h2', text: 'Gigs by city' } },
          { message: 'Two cities on the outside', dom: { selector: 'body > ul > li', count: 2 } },
          { message: 'Sound Up Saturdays is nested inside a city', dom: { selector: 'li li', text: 'Sound Up Saturdays' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which special code shows the copyright sign? (the word between & and ;)',
        answers: ['copy', '&copy;'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Miracle\'s trick: if you can explain every line, you understand it. Which line of your page would be hardest to explain?',
    starters: ['The hardest line to explain is...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Explain your own playground page to someone, line by line, out loud. Notice the lines where you hesitate.',
  },
  notes: 'Checkpoint 2 of Chapter 2: reviews br (l06), writing for the web (l07), character references (l08), nested lists (l09). Miracle at Afiya per CAST.md.',
};

export default lesson;
