import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4 — worked examples, step by step: the full stoichiometry method. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Worked examples, step by step',
  summary: 'Every stoichiometry question uses the same four steps. Learn them from one worked example, then do the next one yourself.',
  minutes: 14,
  outcomes: [
    'Follow the four-step method for mass-to-mass questions',
    'Ask the AI to label each step with its reason',
    'Try a similar question yourself before checking',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How much water from 4 g of hydrogen? (2H₂ + O₂ → 2H₂O)',
      steps: [
        { title: 'Step 1: mass to moles', body: 'H₂ has a molar mass of 2 g/mol. 4 g ÷ 2 g/mol = 2 moles of H₂.' },
        { title: 'Step 2: read the ratio', body: 'The equation says 2H₂ makes 2H₂O. So the ratio is 2 : 2, which is 1 : 1.' },
        { title: 'Step 3: moles of product', body: '2 moles of H₂ make 2 moles of H₂O.' },
        { title: 'Step 4: moles to mass', body: 'H₂O is 18 g/mol. 2 moles × 18 g/mol = 36 g of water.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>That\'s the whole method: <strong>mass → moles → ratio → moles → mass</strong>. Nearly every stoichiometry question is a version of it.</p><p>When you ask the AI for a worked example, add: <em>"Label each step with WHY you do it."</em> A step with a reason is something you can rebuild. A step without one is just something to copy.</p><p>And then, as in Chapter 1: <strong>show me, now me</strong>. Ask for a similar question with different numbers and the answer hidden.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Mass, moles, ratio, moles, mass.',
    },
    {
      kind: 'check',
      question: 'What is Step 2 of the method?',
      options: ['Convert mass to moles', 'Read the mole ratio from the equation', 'Multiply by molar mass'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi practises the four steps.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the method in order.',
        lines: ['Mass to moles', 'Read the ratio', 'Moles of product', 'Moles to mass'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Your turn. Step 1: Mg has a molar mass of 24 g/mol. How many moles are in 48 g of Mg?',
        answers: ['2', 'two'],
        placeholder: 'Number',
      },
      {
        kind: 'typeAnswer',
        prompt: '2Mg + O₂ → 2MgO. MgO is 40 g/mol. What mass of MgO do 2 moles of Mg make? (grams)',
        answers: ['80', '80g', '80 g'],
        placeholder: 'Number',
        explanation: 'Ratio 2 : 2 is 1 : 1, so 2 moles of MgO. 2 × 40 = 80 g.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which worked-example request teaches Kofi most?',
        options: [
          { text: 'Solve this stoichiometry question.', why: 'An answer, not a method.' },
          { text: 'Give me a worked example of a mass-to-mass question. Label each step with why you do it. Then give me a similar one with the answer hidden.' },
          { text: 'Give me 10 worked examples.', why: 'Ten to watch, none to try.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: "Spot the wrong step in David's working: mass of CO₂ from 16 g of CH₄ (CH₄ + 2O₂ → CO₂ + 2H₂O).",
        lines: ['CH₄ is 16 g/mol, so 16 g = 1 mole.', 'Ratio CH₄ : CO₂ is 1 : 2.', 'So 2 moles of CO₂ = 88 g.'],
        bug: 1,
        fix: 'Ratio CH₄ : CO₂ is 1 : 1 (the 2 belongs to O₂ and H₂O). So 1 mole of CO₂ = 44 g.',
        explanation: 'Read the coefficient in front of the exact substance you need.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its reason.',
        pairs: [
          ['Mass to moles', 'Equations count in moles, not grams'],
          ['Read the ratio', 'The equation says how many of each'],
          ['Moles to mass', 'The question asks for grams'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I just copy the AI\'s worked examples into my notes. Is that OK?',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Yes, copying is learning.', why: 'Copying is reading. Doing is learning.' },
          { text: 'Ask it to label each step with WHY, then do a similar one yourself before you copy anything.' },
          { text: 'Never write anything down.', why: 'Notes are fine. Notes without trying is the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the method.',
        template: 'Mass, [[1]], ratio, moles, [[2]].',
        blanks: [['moles'], ['mass']],
        distractors: ['grams', 'atoms'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask the AI to label each step with a reason?',
        options: [
          { text: 'A step with a reason can be rebuilt; a step without one can only be copied' },
          { text: 'It makes the answer longer', why: 'Length is not the goal.' },
          { text: 'Teachers want reasons', why: 'Maybe, but the real benefit is for you.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Mass to moles', 'Ratio', 'Moles to mass'],
        items: [
          { text: '48 g ÷ 24 g/mol', group: 0 },
          { text: '2Mg makes 2MgO, so 1 : 1', group: 1 },
          { text: '2 mol × 40 g/mol', group: 2 },
          { text: '16 g ÷ 16 g/mol', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four steps do you find hardest? What would you ask the AI to practise just that step?',
    starters: ['The hardest step is...', 'I would ask...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Ask for one labelled worked example of a method in your hardest subject, then a similar question with the answer hidden.',
  },
  notes: 'H2 = 2 g/mol; 4/2 = 2 mol; H2O 18 → 36 g (mass conserved: 4 g H2 + 32 g O2 = 36 g). Mg 24, MgO 40: 48 g → 80 g. CH4 16, CO2 44: 1:1.',
};

export default lesson;
