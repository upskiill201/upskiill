import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9 — telling similar ideas apart: ask for a side-by-side comparison. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Telling similar ideas apart',
  summary: 'Mass and molar mass. Reactant and product. Limiting and excess. Half the marks you lose come from mixing up two ideas that look alike.',
  minutes: 12,
  outcomes: [
    'Ask for a side-by-side comparison of two similar ideas',
    'Tell mass from molar mass, limiting from excess',
    'Make a "do not confuse" list for any subject',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Mass vs molar mass',
      before: { label: 'Mass', text: 'How much of something you HAVE. Measured in grams. "I have 36 g of water." It changes with how much you scoop out.' },
      after: { label: 'Molar mass', text: 'How much ONE MOLE of a substance weighs. Measured in g/mol. "Water is 18 g/mol." It never changes for that substance.' },
      notes: ['Mass depends on the sample.', 'Molar mass depends only on the substance.', 'You divide one by the other to get moles.'],
    },
    {
      kind: 'compare',
      title: 'Limiting vs excess reagent',
      before: { label: 'Limiting', text: 'The reactant that runs out first. It decides how much product you can make.' },
      after: { label: 'Excess', text: 'The reactant left over when the reaction stops. Having more of it changes nothing.' },
      notes: ['In the jollof recipe, tomatoes were limiting.', 'The extra rice was in excess.'],
    },
    {
      kind: 'text',
      html: '<p>When two ideas look alike, studying them one at a time often makes the confusion worse. Ask for them <strong>side by side</strong>:</p><p><em>"Compare [idea A] and [idea B] in a table: what each one means, its unit, an example, and the most common way students mix them up."</em></p><p>Then keep a <strong>"do not confuse" list</strong> at the back of your notes for each subject. Every pair that trips you up goes on it.</p>',
    },
    {
      kind: 'check',
      question: 'Which never changes for water, however much you have?',
      options: ['Its mass', 'Its molar mass', 'Its number of moles'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi stops mixing up look-alike ideas.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Mass or molar mass?',
        groups: ['Mass', 'Molar mass'],
        items: [
          { text: '36 g of water in a beaker', group: 0 },
          { text: 'Water is 18 g/mol', group: 1 },
          { text: 'Changes if you pour some out', group: 0 },
          { text: 'Measured in g/mol', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi keeps confusing limiting and excess. Which request is best?',
        options: [
          { text: 'Explain limiting reagents.', why: 'One idea alone keeps the confusion.' },
          { text: 'Compare limiting and excess reagents in a table: meaning, an example, and the most common mix-up.' },
          { text: 'Are limiting and excess the same?', why: 'A yes/no question, not a comparison.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each pot needs 1 cup of rice and 2 tomatoes. You have 3 cups of rice and 10 tomatoes. Which runs out first? (one word)',
        answers: ['rice'],
        placeholder: 'One word',
        explanation: 'Rice allows 3 pots; tomatoes allow 5. Rice is limiting, tomatoes are in excess.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pair to the difference.',
        pairs: [
          ['Reactant vs product', 'Goes in vs comes out'],
          ['Coefficient vs subscript', 'How many vs what it is'],
          ['Limiting vs excess', 'Runs out vs left over'],
          ['Mass vs molar mass', 'What you have vs per mole'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'In Physics I always mix up speed and velocity. They mean the same thing, right?',
        prompt: 'What should Kofi suggest?',
        options: [
          { text: 'Yes, same thing.', why: 'In Physics, velocity includes direction. Speed does not.' },
          { text: 'Just memorise both definitions separately.', why: 'Side by side is what fixes a mix-up.' },
          { text: "Not quite. Ask the AI to compare them in a table: meaning, example, and the common mix-up. Then add them to a do-not-confuse list." },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: "Which line in Clinton's notes mixes two ideas up?",
        lines: ['Molar mass of CO₂: 44 g/mol.', 'I have 88 g of CO₂.', 'So the molar mass of my sample is 88 g/mol.'],
        bug: 2,
        fix: 'So my sample is 88 ÷ 44 = 2 moles.',
        explanation: 'Molar mass belongs to the substance. 88 g is the sample\'s mass.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the comparison request.',
        template: 'Compare A and B in a [[1]]: what each means, an example, and the most common [[2]].',
        blanks: [['table'], ['mix-up', 'mistake', 'confusion']],
        distractors: ['song', 'answer'],
      },
      {
        kind: 'mcq',
        prompt: 'Why learn two similar ideas side by side instead of one at a time?',
        options: [
          { text: 'It is quicker to read', why: 'Maybe, but the real gain is telling them apart.' },
          { text: 'Seeing the differences together is what stops you mixing them up' },
          { text: 'They are always tested together', why: 'Not always. They are confused together.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Name the list at the back of your notes.',
        tiles: ['Do', 'not', 'confuse'],
        distractors: ['always', 'forget'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Limiting or excess?',
        groups: ['Limiting', 'Excess'],
        items: [
          { text: 'Runs out first', group: 0 },
          { text: 'Left over at the end', group: 1 },
          { text: 'Decides how much product you get', group: 0 },
          { text: 'Adding more changes nothing', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Start your "do not confuse" list. Write two pairs of ideas from any subject that you mix up.',
    starters: ['Pair 1:', 'Pair 2:'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Ask the AI to compare one pair from your list in a table. Add the table to the back of your notes.',
  },
  notes: 'Speed (scalar) vs velocity (vector, includes direction): standard physics. Rice 3 pots vs tomatoes 5 pots → rice limiting.',
};

export default lesson;
