import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Chat with Tey: say it so a 12-year-old gets it — plain words and comparisons. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Say it so a 12-year-old gets it',
  summary: 'Tey challenges Arjun: "Explain the bug to my nephew. He\'s twelve and he\'s on the line." Arjun has explained it to engineers a hundred times. Never to a twelve-year-old.',
  minutes: 12,
  outcomes: [
    'Explain an expert idea in plain words',
    'Use a comparison to something people already know',
    'Keep the accuracy while dropping the jargon',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Arjun, a twelve-year-old is listening. Go: what's wrong with Mr Rao's shop?",
          replies: ['There is a race condition in the checkout queue...', 'Can I use a diagram?'],
        },
        {
          tey: "No diagrams on the radio, my friend. And the twelve-year-old has gone to make toast. Try this: what's it LIKE? What does the bug remind you of in everyday life?",
          replies: ['Hmm. Like... a shop with one till?'],
        },
        {
          tey: "Now we're talking. Keep going. What happens at a shop with one till when a thousand people arrive at once?",
          replies: ['The queue gets so long the till breaks and nobody can pay.'],
        },
        {
          tey: "That's it! \"Mr Rao's website is like a shop with one till. On a normal day, fine. On sale day, a thousand people arrive at once, the till jams and nobody can pay. I need two days to add more tills.\" Is that perfectly accurate?",
          replies: ['Not perfectly... but close enough.', 'It\'s actually a good description.'],
        },
        {
          tey: "Close enough to make a good decision, and that's the point. You can always add detail for people who want it. You can't take back a decision made because nobody understood you. Simple is not dumbing down. It's translating.",
        },
      ],
    },
    {
      kind: 'compare',
      title: 'The same bug, two languages',
      before: {
        label: 'Engineer to engineer',
        text: 'Concurrent checkout requests contend for row-level locks, causing deadlocks and failed transactions under peak load.',
      },
      after: {
        label: 'Arjun to Mr Rao',
        text: 'Your website is like a shop with one till. On sale day, too many people try to pay at once, the till jams, and nobody can pay. I need two days to add more tills.',
      },
      notes: [
        'A comparison to something everyone knows: a shop till.',
        'Cause and effect in plain words: too many people → the till jams → no sales.',
        'The fix in the same picture: "add more tills".',
      ],
    },
  ],
  apply: {
    scenario: 'Tey FM. The twelve-year-old test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes "a shop with one till" a good comparison?',
        options: [
          { text: 'It\'s technically perfect', why: 'Not perfect, but close enough to decide well.' },
          { text: 'It\'s funny', why: 'Bonus. Not the reason.' },
          { text: 'Everyone already understands tills and queues, so the problem is instantly clear' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the technical idea to an everyday comparison.',
        pairs: [
          ['A server overloaded on sale day', 'A shop with one till and a huge queue'],
          ['A backup', 'A spare key with a neighbour'],
          ['A password manager', 'A safe that holds all your keys'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Isn\'t simplifying it dishonest? It\'s not exactly how it works.',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Simple isn\'t dishonest if it leads to the right decision. Offer more detail to anyone who wants it.' },
          { text: 'Yes, always give the full technical version.', why: 'That\'s how the shop crashed.' },
          { text: 'Make up something easier.', why: 'Simple, yes. Inaccurate, no.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey: "Simple is not dumbing down. It\'s ___." (one word)',
        answers: ['translating', 'translation'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Plain words, or jargon?',
        groups: ['Plain words', 'Jargon'],
        items: [
          { text: 'Too many people try to pay at once', group: 0 },
          { text: 'Concurrent requests contend for locks', group: 1 },
          { text: 'The till jams', group: 0 },
          { text: 'Failed transactions under peak load', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best way to find a good comparison?',
        options: [
          { text: 'Use the most technical term you know', why: 'That\'s the curse of knowledge.' },
          { text: 'Ask "what is this LIKE in everyday life?"' },
          { text: 'Draw a complex diagram', why: 'Not on the radio, and often not in a message either.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s new explanation. Which line slips back into jargon?',
        lines: [
          'Your website is like a shop with one till.',
          'On sale day, too many people try to pay at once.',
          'This causes contention on the row-level locks in the database.',
          'I need two days to add more tills.',
        ],
        bug: 2,
        fix: 'So the till jams and nobody can pay.',
        explanation: 'Stay inside the comparison. Jumping back to jargon loses the listener.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['BLUF', 'Bottom line up front'],
          ['Curse of knowledge', 'Experts hear the melody'],
          ['Details', 'Go last, for those who want them'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s explanation.',
        template: 'Your website is like a shop with one [[1]]. On sale day, the till [[2]] and nobody can [[3]].',
        blanks: [['till'], ['jams', 'breaks'], ['pay']],
        distractors: ['lock', 'deadlock'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question that finds a comparison.',
        tiles: ['What', 'is', 'this', 'like', 'in', 'everyday', 'life?'],
        distractors: ['jargon'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick something from your work, studies or hobbies that\'s hard to explain. Write a "it\'s like..." comparison a twelve-year-old would understand.',
    starters: ['The thing is...', 'It\'s like...'],
  },
  deepen: {
    title: 'Explain it to a child',
    summary: 'Explain one thing from your work or studies to a child, or someone from a totally different field. Their questions will show you exactly where your explanation was "knocking".',
  },
  notes: 'Analogies and plain-language explanation are standard science-communication advice (cf. Feynman-style explanation); the "translation, not dumbing down" framing is a teaching device.',
};

export default lesson;
