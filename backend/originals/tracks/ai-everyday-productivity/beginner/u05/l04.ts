import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Before/After: deciding with AI. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Which one?',
  summary: 'The old caterer can\'t deliver to the hacienda. Two new ones, one evening. Lucía asks AI "which is better?" and gets a confident pick. Then she asks a different way, and it argues with her. See what changed.',
  minutes: 12,
  outcomes: [
    'Decide with your own criteria and weights',
    'Ask AI to argue against your favourite',
    'Keep the final decision yours',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two caterers',
      before: {
        label: 'Prompt: "Which caterer is better, Sabores de Oaxaca or La Cocina de Inés?"',
        text: 'Sabores de Oaxaca is the better choice. It has a more extensive menu and a professional reputation, making it ideal for events.',
      },
      after: {
        label: 'Prompt: her criteria with weights, both quotes pasted, then "argue against my favourite"',
        text: 'Prompt: "Compare these two quotes [pasted]. What matters most: Mamá loves traditional mole (very important), delivery to the hacienda (must have), total under MX$19,500 (important), vegetarian options for 6 guests (nice to have). Score each, show your reasoning. I\'m leaning towards Sabores: argue against it."\n\nReply: Both deliver. Inés: mole negro is her speciality; MX$18,200; 3 vegetarian dishes. Sabores: wider menu, mole is one of many; MX$19,400; 1 vegetarian dish. Against Sabores: it\'s MX$1,200 more, and its strengths (variety, polish) aren\'t on your list. Your top criterion is the mole. Check: ask Inés for references from an event of 60.',
      },
      notes: [
        '"Better" with no criteria gets a confident verdict based on nothing she cares about.',
        'Weights (must have, very important, nice to have) let the comparison reflect what matters to her.',
        '"Argue against my favourite" fights the pull to agree with her, and shows what she\'d lose.',
        'It still ends with a check (references). The decision, and the call to Inés, are hers.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Decision prompt: options + your criteria with weights + "show your reasoning" + "argue against my favourite" + "what should I check?" Then you decide.',
    },
  ],
  apply: {
    scenario: 'Choosing a caterer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why was the first answer useless to Lucía?',
        options: [
          { text: 'It judged by things she doesn\'t care about, because she never said what she cares about' },
          { text: 'It picked the wrong caterer', why: 'It might be fine for someone; it wasn\'t based on her needs.' },
          { text: 'It was too short', why: 'Length wasn\'t the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lucía\'s weights: must have, or nice to have?',
        groups: ['Must have', 'Nice to have'],
        items: [
          { text: 'Delivers to the hacienda', group: 0 },
          { text: 'Vegetarian options for 6', group: 1 },
          { text: 'Food on the 30th', group: 0 },
          { text: 'Fancy plates', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Why ask it to argue against the one you like?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'To make the AI angry.', why: 'It\'s to hear the other side.' },
          { text: 'Because AI tends to agree with me. Asking for the other side shows what I\'d lose.' },
          { text: 'I don\'t really like Sabores.', why: 'She did, at first.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The devil\'s advocate line.',
        template: 'I\'m leaning towards [[1]]. Argue [[2]] it.',
        blanks: [['Sabores', 'Sabores de Oaxaca'], ['against']],
        distractors: ['Inés', 'for'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the prompt to what it does.',
        pairs: [
          ['Criteria with weights', 'Reflects what matters to her'],
          ['"Show your reasoning"', 'She can check the logic'],
          ['"Argue against my favourite"', 'Shows what she\'d lose'],
          ['"What should I check?"', 'References from a 60-guest event'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much cheaper is La Cocina de Inés, in pesos? (A number.)',
        answers: ['1200', '1,200', 'MX$1,200', 'MX$1200'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tomás\'s decision prompt is the problem?',
        lines: [
          'Sabores is obviously better, right?',
          'Here are both quotes.',
          'What matters: price and delivery.',
        ],
        bug: 0,
        fix: '"I\'m leaning towards Sabores. Argue against it."',
        explanation: 'A leading question gets agreement. Asking for the opposite gets information.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Remi is choosing between two internship offers. Which prompt helps him decide?',
        options: [
          { text: 'Which internship is better?', why: 'Better by what?' },
          { text: 'Tell me to take the first one.', why: 'That\'s asking for agreement.' },
          { text: 'Compare these two offers. Must have: in Nairobi. Very important: real projects. Nice to have: higher pay. Show your reasoning. I\'m leaning to the first: argue against it.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s decision.',
        lines: ['Paste both quotes', 'Give criteria with weights', 'Ask for reasoning', 'Ask it to argue against her favourite', 'Check references and decide'],
      },
      {
        kind: 'mcq',
        prompt: 'Who chose La Cocina de Inés?',
        options: [
          { text: 'Lucía, after seeing the trade-offs and checking references' },
          { text: 'The AI', why: 'It compared; she chose.' },
          { text: 'Mamá', why: 'Mamá gets the mole; Lucía made the call.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What are you leaning towards in a current decision? What would the strongest argument against it be?',
    starters: ['I\'m leaning towards...', 'The case against it:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For a real choice, give an AI tool your criteria with weights and ask it to argue against the option you prefer. Did it change your mind, or make you surer?',
  },
  notes: 'Caterers fictional. Weighted criteria and devil\'s-advocate prompting are general decision techniques; prompting for counter-arguments helps counter model sycophancy. Remi per CAST (exercise only).',
};

export default lesson;
