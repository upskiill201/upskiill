import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Side by side: a vague task vs a clear one (Rafa, remote, in Guadalajara). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A vague task vs a clear one',
  summary: 'Rafa, the designer in Guadalajara, needs to make the launch banner. He can\'t lean over and ask Lucía what she meant. Whatever she writes in the message is all he gets. Two versions.',
  minutes: 11,
  outcomes: [
    'Spot what\'s missing from a vague request',
    'Write a request someone can act on without asking',
    'Know why clarity matters even more for remote people',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Lucía\'s message to Rafa',
      before: { label: 'Vague', text: 'Hey Rafa! Can you do a banner for the chili-lime thing? Something fun. Soon-ish? Thanks!!' },
      after: { label: 'Clear', text: 'Hi Rafa. Banner for the chili-lime launch (June 17), for the website homepage. Goal: get people to pre-order. Size 1920x600, brand colours, the green bag photo, button "Pre-order now". Fun is welcome. First draft Thursday; I\'ll reply within the hour. What will be hardest?' },
      notes: [
        'What, where, and why: Rafa knows what the banner is FOR.',
        'The fixed parts are listed. The fun part is his.',
        'A date, a promise to reply fast, and a real question.',
      ],
    },
    {
      kind: 'text',
      html: "<p>In an office, a vague request gets fixed by a quick chat. Remotely, it turns into a day lost, a wrong draft, and a frustrated designer. When people can't see you, <strong>your written words are the whole briefing</strong>. Rafa read the vague version three times and still had to guess: which \"thing\"? What size? How soon is \"soon-ish\"?</p><p>A good test before you hit send: <strong>could they do this without asking me a single question?</strong></p>",
    },
    {
      kind: 'check',
      question: 'What\'s the test for a clear request?',
      options: ['Could they do it without asking me anything?', 'Is it polite?', 'Is it short?'],
      answer: 0,
      explanation: 'Polite and short are nice. Clear is essential.',
    },
  ],
  apply: {
    scenario: 'Lucía, about to message Rafa.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Clear or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: '"Size 1920x600"', group: 0 },
          { text: '"Something fun"', group: 1 },
          { text: '"First draft Thursday"', group: 0 },
          { text: '"Soon-ish?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does clarity matter even more for Rafa?',
        options: [
          { text: 'He\'s remote, so the written message is the whole briefing' },
          { text: 'He\'s a designer', why: 'It\'s about distance, not job title.' },
          { text: 'He\'s new', why: 'It\'s that he can\'t lean over and ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Does the clear one sound bossy? It\'s much longer.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, go back to the short one.', why: 'Short and vague wastes his time.' },
          { text: 'Add more exclamation marks.', why: 'Tone isn\'t the problem.' },
          { text: 'It sounds respectful. You\'re saving him a day of guessing. And "fun is welcome" keeps it friendly.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before sending: could they do this without asking me a single ___? (one word)',
        answers: ['question', 'Question'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague line to its clear version.',
        pairs: [
          ['"The chili-lime thing"', '"Homepage banner, June 17 launch"'],
          ['"Soon-ish?"', '"First draft Thursday"'],
          ['"Something fun"', '"Fun is welcome; brand colours"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell Rafa what the banner is FOR (getting pre-orders)?',
        options: [
          { text: 'To fill space', why: 'The why changes the design.' },
          { text: 'He doesn\'t need to know', why: 'Purpose helps people decide well.' },
          { text: 'So he can make good design choices on his own' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s second draft. Which line is still vague?',
        lines: [
          'Banner for the homepage, June 17 launch.',
          'Make it pop, you know what I mean.',
          'First draft Thursday.',
        ],
        bug: 1,
        fix: 'Bright green bag photo, big "Pre-order now" button.',
        explanation: '"Make it pop" means something different to everyone.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a clear remote request in order.',
        lines: ['What and where', 'Why it matters', 'What\'s fixed, what\'s theirs', 'When, and how you\'ll help'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Remote people only get your [[1]] words. Make them [[2]].',
        blanks: [['written'], ['clear']],
        distractors: ['spoken', 'short'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the end of Lucía\'s message.',
        tiles: ['What', 'will', 'be', 'hardest?'],
        distractors: ['Thanks!!'],
      },
    ],
  },
  reflect: {
    prompt: 'Find a message you sent recently asking someone to do something. Could they have done it without asking you a question? Rewrite it.',
    starters: ['My original said...', 'Clearer: ...'],
  },
  deepen: {
    title: 'The no-questions test',
    summary: 'Before you send your next request, read it as if you know nothing. Add whatever you\'d have to ask about.',
  },
  notes: 'Remote clarity: written communication carries the full briefing when informal clarification is unavailable (standard remote-work guidance). Builds on lesson 3\'s five steps.',
};

export default lesson;
