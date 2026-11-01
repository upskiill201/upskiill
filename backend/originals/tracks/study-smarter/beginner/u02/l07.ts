import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7 — common misconceptions: ask the AI what mistakes students usually make. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Common misconceptions',
  summary: 'Most mistakes in a topic are the same few mistakes, made by thousands of students. Learn them on purpose and you stop making them.',
  minutes: 12,
  outcomes: [
    'Ask the AI for the common mistakes in a topic',
    'Spot four classic stoichiometry misconceptions',
    'Turn each mistake into a check you do every time',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You can balance an equation by changing the small numbers in a formula.',
          isFact: false,
          explain: 'Changing H₂O to H₂O₂ makes hydrogen peroxide. Only the big numbers in front (coefficients) can change.',
        },
        {
          text: 'The numbers in a balanced equation are a ratio of moles, not of grams.',
          isFact: true,
          explain: '2H₂ + O₂ → 2H₂O means 2 moles to 1 mole, not 2 grams to 1 gram. That is why you convert grams to moles first.',
        },
        {
          text: 'In a reaction, the total mass of the products equals the total mass of the reactants.',
          isFact: true,
          explain: 'Mass is conserved: atoms are rearranged, not created or destroyed. 4 g of H₂ + 32 g of O₂ makes 36 g of water.',
        },
        {
          text: 'If you have more grams of one reactant, it can never be the limiting reagent.',
          isFact: false,
          explain: 'What matters is moles AND the ratio. A heavy reactant can still run out first.',
        },
        {
          text: 'A mole of oxygen gas (O₂) weighs 16 g.',
          isFact: false,
          explain: 'One oxygen atom is 16, but O₂ has two atoms: 32 g/mol. Count every atom in the formula.',
        },
      ],
    },
    {
      kind: 'text',
      html: '<p>Here\'s a powerful question almost nobody asks an AI:</p><p><em>"What are the most common mistakes students make on [topic]? For each one, give me a quick question that tests whether I make it."</em></p><p>Teachers see the same mistakes every year. The AI has read about them too. Learning them on purpose gives you a <strong>checklist</strong>: every time you finish a stoichiometry answer, you check it for the classic four.</p>',
    },
    {
      kind: 'check',
      question: 'What do the numbers in front of a balanced equation give you?',
      options: ['A ratio of grams', 'A ratio of moles', 'The mass of each substance'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi learns the classic mistakes on purpose.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question gets Kofi a useful mistake checklist?',
        options: [
          { text: 'What are the most common mistakes students make on stoichiometry? Give me a quick test question for each.' },
          { text: 'Am I making mistakes?', why: "It can't see your work unless you share it." },
          { text: 'Tell me everything about stoichiometry.', why: '"Everything" is not a checklist.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the molar mass of O₂ in g/mol? (O = 16)',
        answers: ['32', '32g/mol', '32 g/mol'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: "Which line in Clinton's working is a classic misconception?",
        lines: ['2H₂ + O₂ → 2H₂O.', 'So 2 g of H₂ reacts with 1 g of O₂.', 'Convert to moles to check.'],
        bug: 1,
        fix: 'So 2 moles of H₂ react with 1 mole of O₂.',
        explanation: 'The ratio is in moles, not grams.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mass is conserved. 24 g of carbon burns with 64 g of oxygen. What mass of CO₂ forms? (grams)',
        answers: ['88', '88g', '88 g'],
        placeholder: 'Number',
        explanation: '24 + 64 = 88 g. Atoms are rearranged, not lost.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Correct idea or misconception?',
        groups: ['Correct', 'Misconception'],
        items: [
          { text: 'Only change coefficients when balancing', group: 0 },
          { text: 'Equation numbers are grams', group: 1 },
          { text: 'Mass of products = mass of reactants', group: 0 },
          { text: 'O₂ weighs 16 g/mol', group: 1 },
          { text: 'The heavier reactant never runs out', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: "Mrs Asante says the same four mistakes come up every year. She has a list on her desk.",
        prompt: 'What should Kofi do with that?',
        options: [
          { text: 'Nothing, he already knows stoichiometry.', why: 'Knowing the topic and avoiding the traps are different.' },
          { text: 'Ask the AI to guess her list.', why: 'Her actual list beats a guess. Ask her first.' },
          { text: "Ask her for the list, then get the AI to make a test question on each one." },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['Changing subscripts', 'Only change the big numbers'],
          ['Ratio in grams', 'Convert to moles first'],
          ['O₂ as 16 g/mol', 'Count every atom'],
          ['Heavier means not limiting', 'Compare moles using the ratio'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why learn the common mistakes on purpose?',
        options: [
          { text: 'So you can copy them', why: 'You want to avoid them.' },
          { text: 'They become a checklist you run on every answer' },
          { text: 'They are all in the exam', why: 'Not necessarily, but they cost marks every year.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checklist question.',
        template: 'What are the most [[1]] mistakes students make on this? Give me a quick [[2]] question for each.',
        blanks: [['common'], ['test']],
        distractors: ['rare', 'easy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the mass rule.',
        tiles: ['Atoms', 'are', 'rearranged,', 'not', 'created', 'or', 'destroyed'],
        distractors: ['always', 'lost'],
      },
    ],
  },
  reflect: {
    prompt: 'What is one mistake you make again and again in any subject? Write it as a check you could run on every answer.',
    starters: ['The mistake I repeat is...', 'My check:'],
  },
  deepen: {
    title: 'Build your checklist',
    summary: 'Ask the AI for the five most common mistakes in your hardest topic, with a test question for each. Keep the list at the front of your notes.',
  },
  notes: 'Conservation of mass (Lavoisier). C 24 g = 2 mol, O2 64 g = 2 mol → 2 mol CO2 = 88 g ✓. Misconceptions listed are standard school-chemistry errors.',
};

export default lesson;
