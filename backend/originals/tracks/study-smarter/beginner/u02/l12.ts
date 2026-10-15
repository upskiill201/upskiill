import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12 — key words first: build a mini glossary in your own words. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Key words first',
  summary: 'Half of "I don\'t understand" is really "I don\'t know what these five words mean". Learn the words, and the topic opens up.',
  minutes: 12,
  outcomes: [
    'Ask the AI for the key words of a topic first',
    'Write each definition in your own words',
    'Quiz yourself on the words before the topic',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Why words first?</strong></p><p>Every topic has its own vocabulary. If a sentence has two words you don\'t know, you can\'t follow it, however simply it is written. Stoichiometry has about eight key words. Learn those, and every explanation suddenly makes sense.</p><p>Ask: <em>"What are the 8 key words I need for [topic]? For each: a one-line plain definition and a tiny example."</em></p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The stoichiometry eight</strong></p><ul><li><strong>Reactant:</strong> what goes in. (H₂ and O₂)</li><li><strong>Product:</strong> what comes out. (H₂O)</li><li><strong>Coefficient:</strong> the big number: how many. (the 2 in 2H₂O)</li><li><strong>Subscript:</strong> the small number: part of the formula. (the 2 in H₂O)</li><li><strong>Mole ratio:</strong> the coefficients, read as a ratio. (2 : 1 : 2)</li><li><strong>Molar mass:</strong> grams per mole. (H₂O = 18 g/mol)</li><li><strong>Limiting reagent:</strong> runs out first.</li><li><strong>Excess reagent:</strong> left over.</li></ul>',
    },
    {
      kind: 'text',
      html: "<p><strong>Your words, not the AI's</strong></p><p>Don't copy the AI's definitions. Read one, close the chat, and write it <strong>in your own words</strong>. Then ask: <em>\"Here's my definition of limiting reagent: [yours]. Is anything wrong or missing?\"</em></p><p>Writing it yourself is what makes the word yours. Then put the words in your quiz: <em>\"Quiz me on these 8 words, one at a time: give me the definition, I'll name the word.\"</em></p>",
    },
    {
      kind: 'check',
      question: 'What should you do with the AI\'s definitions?',
      options: ['Copy them exactly', 'Rewrite them in your own words, then ask it to check', 'Ignore them'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi builds his stoichiometry glossary.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its plain definition.',
        pairs: [
          ['Reactant', 'What goes in'],
          ['Product', 'What comes out'],
          ['Coefficient', 'How many'],
          ['Molar mass', 'Grams per mole'],
          ['Limiting reagent', 'Runs out first'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request starts a new topic best?',
        options: [
          { text: 'What are the 8 key words for this topic? For each: a one-line plain definition and a tiny example.' },
          { text: 'Explain the whole topic.', why: 'Without the words, the explanation is hard to follow.' },
          { text: 'Give me a dictionary.', why: 'Too much. You need the key words for this topic.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The quiz says: "What comes out of a reaction." Name the word. (one word)',
        answers: ['product', 'products'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: "Which of Clinton's glossary entries is wrong?",
        lines: ['Reactant: what goes in.', 'Subscript: how many molecules there are.', 'Excess reagent: left over at the end.'],
        bug: 1,
        fix: 'Subscript: the small number that is part of the formula.',
        explanation: '"How many" is the coefficient. That is the classic mix-up.',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "I copied all 8 AI definitions into my notes. Done!",
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Now close the chat and rewrite each one in your own words. Then ask it to check yours.' },
          { text: 'Perfect, you are done.', why: 'Copying is not the same as knowing.' },
          { text: 'Copy 8 more.', why: 'More copying, same problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which word?',
        groups: ['Reactant', 'Product'],
        items: [
          { text: 'H₂ in 2H₂ + O₂ → 2H₂O', group: 0 },
          { text: 'H₂O in 2H₂ + O₂ → 2H₂O', group: 1 },
          { text: 'O₂ in 2H₂ + O₂ → 2H₂O', group: 0 },
          { text: 'CO₂ in CH₄ + 2O₂ → CO₂ + 2H₂O', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the check request.',
        template: "Here's my [[1]] of limiting reagent. Is anything wrong or [[2]]?",
        blanks: [['definition'], ['missing']],
        distractors: ['opinion', 'funny'],
      },
      {
        kind: 'mcq',
        prompt: 'Why learn the key words before the topic?',
        options: [
          { text: "You can't follow explanations full of words you don't know" },
          { text: 'Teachers test words more than ideas', why: 'Not usually. The words unlock the ideas.' },
          { text: 'It makes notes longer', why: 'Length is not the goal.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the word-quiz set-up.',
        tiles: ['Give', 'me', 'the', 'definition,', "I'll", 'name', 'the', 'word'],
        distractors: ['copy', 'skip'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The quiz says: "The reactant left over when the reaction stops." Name it. (one word, then reagent)',
        answers: ['excess', 'excess reagent'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Pick a topic you are starting soon. Write three key words from it, each in your own words.',
    starters: ['Topic:', 'Word 1:', 'Word 2:', 'Word 3:'],
  },
  deepen: {
    title: 'Build your glossary',
    summary: 'Ask for the 8 key words of your next topic, rewrite each in your own words, and add them to your quiz.',
  },
  notes: 'Vocabulary as a barrier to comprehension: well established in reading research; stated generally.',
};

export default lesson;
