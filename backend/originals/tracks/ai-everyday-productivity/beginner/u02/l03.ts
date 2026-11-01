import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Prompt Lab: compare options against your criteria. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Twelve listings, one table',
  summary: 'Twelve tabs open, every flat "bright and spacious". Lucía pastes the listings into AI and asks which is best. It picks one because it\'s "modern". Build a comparison that uses her criteria, not its taste.',
  minutes: 13,
  outcomes: [
    'Give AI your own criteria before it compares anything',
    'Get a comparison table you can scan in seconds',
    'Make it mark what it doesn\'t know instead of guessing',
  ],
  learn: [
    {
      kind: 'promptLab',
      title: 'Twelve flats',
      task: 'Get a comparison of the 12 listings that uses Lucía\'s criteria and doesn\'t invent anything.',
      base: 'Here are 12 flat listings [pasted]. Which one is best?',
      parts: [
        { label: 'My criteria', text: 'What matters to me: rent under MX$15,000, under 30 minutes to Colonia Juárez, and quiet at night.' },
        { label: 'Table', text: 'Compare them in a table: one row per flat, one column per criterion.' },
        { label: 'No guessing', text: 'If a listing doesn\'t say something, write "unknown". Don\'t guess.' },
        { label: 'Just pick', text: 'Just pick one for me.' },
      ],
      replies: [
        { uses: [], text: 'Flat 3 looks best: it\'s modern, spacious and has a lovely balcony!', note: 'Best for whom? With no criteria, it judged by its own taste. Flat 3 is MX$19,500.' },
        { uses: [3], text: 'Flat 7. Definitely flat 7.', note: 'A decision with no reasons. Lucía can\'t check it, so she can\'t trust it.' },
        { uses: [1], text: 'Flat | Size | Style | Balcony\n1 | 55 m² | Classic | No\n2 | 48 m² | Modern | Yes\n...', note: 'A neat table of the wrong things. The columns came from the AI, not from Lucía.' },
        { uses: [0], text: 'Flats 2, 5 and 9 fit your budget and commute. Flat 5 seems quieter as it\'s on a side street, while 2 is on a main road...', note: 'Now it uses her criteria. But twelve flats in a paragraph is hard to scan.' },
        { uses: [0, 1], text: 'Flat | Rent | Commute | Quiet\n2 | 14,200 | 20 min | Yes\n5 | 14,800 | 25 min | Yes\n9 | 13,900 | 35 min | Yes\n...', note: 'Looks perfect. But Flat 2 is on a main road and no listing mentions noise. Where did all those "Yes"es come from? It guessed.' },
        { uses: [0, 1, 2], text: 'Flat | Rent | Commute | Quiet\n2 | 14,200 | 20 min | unknown (main road)\n5 | 14,800 | 25 min | unknown (side street)\n9 | 13,900 | 35 min | unknown\n11 | 16,500 | 15 min | "very quiet" (listing)\n...\nOnly 2 and 5 meet rent and commute. Noise is unknown for both: worth a night-time visit.', note: 'Her criteria, scannable, and honest about gaps. Now she knows exactly what to check on Saturday.' },
      ],
      goal: 5,
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Comparing anything (flats, phones, courses): give your criteria, ask for a table, and say "write unknown, don\'t guess". Then go and check the unknowns.',
    },
  ],
  apply: {
    scenario: 'Comparing the twelve flats.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the AI first pick Flat 3?',
        options: [
          { text: 'It knew Lucía would love the balcony', why: 'It knew nothing about what she wants.' },
          { text: 'Flat 3 was the cheapest', why: 'It was MX$19,500, over her limit.' },
          { text: 'Without her criteria, it judged by its own idea of "best"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lucía\'s criterion, or the AI\'s taste?',
        groups: ['Lucía\'s criterion', 'AI\'s taste'],
        items: [
          { text: 'Under MX$15,000', group: 0 },
          { text: '"Modern style"', group: 1 },
          { text: 'Quiet at night', group: 0 },
          { text: '"A lovely balcony"', group: 1 },
          { text: 'Under 30 minutes to work', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The anti-guessing line.',
        template: 'If a listing doesn\'t say something, write "[[1]]". Don\'t [[2]].',
        blanks: [['unknown'], ['guess']],
        distractors: ['yes', 'ask'],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Easy. Just ask it "which flat is best" and take its answer.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Sure, it knows flats.', why: 'It doesn\'t know what she needs.' },
          { text: 'Best for whom? I give it my criteria and ask for a table. Then I decide.' },
          { text: 'I\'ll ask it five times and pick the most common.', why: 'Still its taste, not her criteria.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which row in the AI\'s table should Lucía distrust most?',
        lines: [
          'Flat 2 | 14,200 | 20 min | Quiet: Yes (not in listing)',
          'Flat 5 | 14,800 | 25 min | Quiet: unknown',
          'Flat 11 | 16,500 | 15 min | Quiet: "very quiet" (listing)',
        ],
        bug: 0,
        fix: 'Change it to "unknown" and check with a night-time visit.',
        explanation: 'The listing says nothing about noise, and it\'s on a main road. That "Yes" was a guess.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the prompt to what it fixed.',
        pairs: [
          ['My criteria', 'Stops it judging by its own taste'],
          ['Table', 'Makes 12 flats scannable'],
          ['No guessing', 'Shows what still needs checking'],
          ['Checking unknowns', 'Turns gaps into a viewing plan'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which two flats met both rent and commute? (Type the two numbers.)',
        answers: ['2 and 5', '2, 5', '2 5', '5 and 2', '2,5', 'flats 2 and 5'],
        placeholder: 'Two numbers',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Sofía is choosing a laptop. Which prompt is the best comparison prompt?',
        options: [
          { text: 'Compare these 4 laptops [pasted] for me: under MX$20,000, light enough to carry daily, good battery. Table, one row each. Write "unknown" if a spec is missing.' },
          { text: 'Which laptop is best?', why: 'Best for whom?' },
          { text: 'Pick the coolest laptop.', why: 'Cool isn\'t a criterion she can check.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s comparison.',
        lines: ['Paste the listings', 'Give her criteria', 'Ask for a table', 'Say "unknown, don\'t guess"', 'Plan visits to check the unknowns'],
      },
      {
        kind: 'mcq',
        prompt: 'The table says noise is "unknown" for Flats 2 and 5. What\'s the smartest next step?',
        options: [
          { text: 'Ask the AI to guess', why: 'A guess is how the false "Yes" got there.' },
          { text: 'Visit both streets one evening and listen' },
          { text: 'Pick the cheaper one and hope', why: 'She\'d be signing for a year on a hope.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What are you choosing between at the moment (a phone, a course, a route, a supplier)? Write your three criteria.',
    starters: ['I\'m choosing between...', 'My criteria are...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Paste 3 to 5 options you\'re choosing between into an AI tool, with your criteria. Ask for a table and "unknown, don\'t guess". Count the unknowns: that\'s your checking list.',
  },
  notes: 'Fictional listings. Asking a model to mark missing information as unknown is a common technique to reduce fabricated details; it reduces, not eliminates, guessing.',
};

export default lesson;
