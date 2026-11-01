import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Before / After: examples beat adjectives. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Examples beat adjectives',
  summary: 'Hazel asks for "a nice, clear pledge list". It shows the newest pledge at the bottom, the dates as 10/12, and no names. One real example would have saved three rounds.',
  minutes: 11,
  outcomes: [
    'Swap vague adjectives for one real example',
    'Give an example of the input and the output',
    'Use real-looking data in examples',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Describing vs showing',
      before: { label: 'Adjectives', text: 'Show the pledges in a nice, clear list with the total.' },
      after: {
        label: 'An example',
        text: 'Show the pledges newest first, one per line, like this:\n\nOct 12 · Ms Thibodeaux · $50\nOct 11 · Crescent Bakery · $200\n\nTotal: $250 of $18,000 · $17,750 to go',
      },
      notes: [
        '"Nice" and "clear" mean something different to everyone. An example means one thing.',
        'The example settles four questions at once: order (newest first), date style (Oct 12), what to show (name and amount), and how the total reads.',
        'It also shows the maths: $250 raised, $17,750 to go. The AI can copy that exactly.',
      ],
    },
    {
      kind: 'text',
      html: '<p>A good example shows <strong>what goes in</strong> and <strong>what should come out</strong>:</p><p><em>If Ruth types "Crescent Bakery" and "200", the line shows "Oct 11 · Crescent Bakery · $200".</em></p><p>Use made-up but realistic data. Never paste real people\'s private details into a prompt.</p>',
    },
  ],
  apply: {
    scenario: 'Fixing the pledge list.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request will get the date style Hazel wants?',
        options: [
          { text: 'Show dates nicely', why: '"Nicely" could be 10/12, 2026-10-12, or Oct 12.' },
          { text: 'Show dates like "Oct 12"' },
          { text: 'Show dates in a good format', why: 'Which format is "good"? It will guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Adjective (vague) or example (clear)?',
        groups: ['Vague', 'Clear'],
        items: [
          { text: 'Make the total stand out', group: 0 },
          { text: 'Total: $250 of $18,000 · $17,750 to go', group: 1 },
          { text: 'Clean, modern list', group: 0 },
          { text: 'Oct 12 · Ms Thibodeaux · $50', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the example. Ruth types "Marcus\'s grandma" and "75".',
        template: 'The line shows: Oct 13 · [[1]] · $[[2]]',
        blanks: [['Marcus\'s grandma'], ['75']],
        distractors: ['Ruth', '7500'],
      },
      {
        kind: 'mcq',
        prompt: 'Raised $250 toward $18,000. What should "to go" say?',
        options: [
          { text: '$17,750' },
          { text: '$18,250', why: 'That\'s adding. "To go" is the goal minus what\'s raised.' },
          { text: '$250', why: 'That\'s what\'s raised, not what\'s left.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which example line is a privacy problem?',
        lines: [
          'Oct 12 · Ms Thibodeaux · $50',
          'Oct 11 · Crescent Bakery · $200',
          'Oct 10 · J. Murphy · card 4111 2222 3333 4444 · $40',
        ],
        bug: 2,
        fix: 'Never put card numbers (real or realistic) in examples.',
        explanation: 'The page only needs a name and amount. Payment details don\'t belong in the app or the prompt.',
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'Can I just paste the real list of parents\' names and phone numbers as the example?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Sure, the AI forgets.', why: 'Treat anything you type as shared. Use made-up data.' },
          { text: 'Use two or three made-up lines that look real. Keep real people\'s details out of prompts.' },
          { text: 'Only the phone numbers.', why: 'Phone numbers are exactly what to keep out.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an input → output example.',
        tiles: ['If Ruth types', '"Crescent Bakery" and "200",', 'the line shows', '"Oct 11 · Crescent Bakery · $200".'],
        distractors: ['make it nice', 'somehow'],
      },
      {
        kind: 'matchPairs',
        prompt: 'What does each part of the example settle?',
        pairs: [
          ['Newest at the top', 'Order'],
          ['"Oct 12"', 'Date style'],
          ['"$17,750 to go"', 'The maths'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel\'s list now looks exactly like her example. What\'s the best reason?',
        options: [
          { text: 'The AI got smarter overnight', why: 'Same tool. Better instructions.' },
          { text: 'Luck', why: 'It copied a clear example.' },
          { text: 'An example leaves nothing to guess' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Raised $1,200 toward $18,000. How much to go? (Number only.)',
        answers: ['16800', '16,800', '$16,800', '$16800'],
        placeholder: 'Number',
      },
    ],
  },
  reflect: {
    prompt: 'Pick one vague word from your brief ("nice", "simple", "clean"). Replace it with an example of what you actually want to see.',
    starters: ['Vague word:', 'Example instead:'],
  },
  deepen: {
    title: 'Add an example to your brief',
    summary: 'Open your brief.md. Under the four lines, add one example: what goes in, and exactly what should come out. Use made-up data.',
  },
  notes: 'Example-driven prompting; privacy guidance: avoid real personal data and card numbers in prompts. 4111... is a well-known test-card pattern shown only as something not to include.',
};

export default lesson;
