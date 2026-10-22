import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 6 — writing for people: the words they search, natural headings, one topic per page. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Write for people, not robots',
  summary: 'Kofi\'s About section says "Kofi is a creative sonic architect crafting vibes." Beautiful, maybe. But nobody searches for "sonic architect". Tey explains how to use the words real people use.',
  minutes: 11,
  outcomes: ['Use the plain words people actually search for', 'Put them naturally in headings and text', 'Give each page one clear topic'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Think about what the wedding planner typed: "beat producer Accra", maybe "DJ for wedding Accra". If those plain words never appear on your page, it\'s hard for a search engine to know you match.',
          replies: ['So I should repeat them?'],
        },
        {
          tey: 'Use them naturally, where a person would. "Kofi Mensah is a beat producer in Accra. Book him for weddings, parties and club nights." That reads well and says exactly what you do.',
          replies: ['What about headings?'],
        },
        {
          tey: 'Headings are strong clues. "Book a beat producer for your wedding" tells everyone, people and search engines, what that section is about. "Let\'s vibe!" doesn\'t.',
          replies: ['Anything else?'],
        },
        {
          tey: 'One clear topic per page. The gigs page is about gigs; the booking page is about booking. And write for the person reading: search engines are built to reward pages people find useful, not pages stuffed with words.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Plain words, natural',
      caption: 'The words people search for are here, in sentences and headings a person would actually write.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n</style>\n<main>\n  <h1>Mensah Beats: beat producer in Accra</h1>\n  <p>Kofi Mensah makes highlife-inspired beats in Accra, Ghana.</p>\n  <h2>Book a producer for your wedding or party</h2>\n  <p>Kofi plays weddings, parties and club nights across Ghana.</p>\n</main>\n',
      challenge: 'Rewrite the second heading as something vague, like "Let\'s vibe!". What would a stranger think the section is about?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Use the plain words people search for, naturally, in headings and text. One topic per page.',
    },
  ],
  apply: {
    scenario: 'Write for people.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why won\'t "creative sonic architect" help the wedding planner find Kofi?',
        options: [
          { text: 'Nobody searches those words; she searched "beat producer Accra"' },
          { text: 'It\'s too short', why: 'It\'s the wrong words, not the length.' },
          { text: 'Search engines can\'t read adjectives', why: 'They can. People don\'t search for it.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the heading say what the section is: change "Let\'s vibe!" to "Book a producer for your wedding or party"',
        starter: '<main>\n  <h1>Mensah Beats: beat producer in Accra</h1>\n  <h2>Let\'s vibe!</h2>\n</main>\n',
        solution: '<main>\n  <h1>Mensah Beats: beat producer in Accra</h1>\n  <h2>Book a producer for your wedding or party</h2>\n</main>\n',
        hint: '<h2>Book a producer for your wedding or party</h2>',
        checks: [
          { message: 'A clear section heading', dom: { selector: 'h2', text: 'wedding' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Plain words people search for, or not?',
        groups: ['Plain search words', 'Not what people type'],
        items: [
          { text: 'beat producer Accra', group: 0 },
          { text: 'sonic architect crafting vibes', group: 1 },
          { text: 'DJ for wedding Ghana', group: 0 },
          { text: 'Let\'s vibe!', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each page to its one topic.',
        pairs: [
          ['gigs.html', 'Upcoming gigs'],
          ['book.html', 'Booking Kofi'],
          ['beats.html', 'All the beats'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I write "beat producer Accra" in every paragraph?',
        options: [
          { text: 'Yes, every paragraph.', why: 'That\'s keyword stuffing.' },
          { text: 'Once or twice where it fits naturally is enough. Repeating it everywhere reads badly and can count as spam.' },
          { text: 'Never use it.', why: 'Use it naturally where it fits.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the stuffed sentence.',
        lines: ['Kofi Mensah is a beat producer in Accra.', 'Beat producer Accra beats Accra producer beats Accra best beat producer.', 'Book Kofi for weddings and parties.'],
        bug: 1,
        explanation: 'It\'s keywords piled up, not a sentence. It reads badly and search engines treat it as spam.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which page is more likely to match "book DJ for wedding Accra"?',
        code: 'A: <h2>Let\'s vibe!</h2>\nB: <h2>Book a producer for your wedding or party</h2> <p>...weddings in Accra...</p>',
        language: 'html',
        options: [
          { text: 'A', why: 'A says nothing about weddings.' },
          { text: 'They\'re equal', why: 'B is much clearer.' },
          { text: 'B: it uses the words people search, naturally' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'A natural first sentence.',
        template: 'Kofi Mensah is a beat [[1]] in [[2]].',
        blanks: [['producer'], ['Accra']],
        distractors: ['architect', 'vibe', 'everywhere'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is it called when a page is crammed with repeated search words? (two words: keyword ___)',
        answers: ['stuffing', 'keyword stuffing'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Who should you write for first?',
        options: [
          { text: 'The search engine only', why: 'Search engines reward pages people find useful.' },
          { text: 'The person reading' },
          { text: 'Other producers', why: 'Write for your visitors.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What plain words would someone search to find what your site offers?',
    starters: ['They\'d search...', 'My page should say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Read your page\'s headings. Rewrite any vague ones so they say plainly what the section is about.',
  },
  notes: 'Google Search Central "Creating helpful, reliable, people-first content"; keyword stuffing is listed in spam policies.',
};

export default lesson;
