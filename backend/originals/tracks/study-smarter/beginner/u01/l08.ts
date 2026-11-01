import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8 — ask for a worked example, then a similar one to try yourself. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Ask for an example',
  summary: 'A worked example shows every step. A similar one you try yourself shows whether you can actually do it.',
  minutes: 12,
  outcomes: [
    'Ask for a worked example with every step explained',
    'Ask for a similar question to try on your own',
    'Use the example to find the exact step you get wrong',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'A worked example. Tap each step.',
      text: 'Question: how many moles are in 88 g of carbon dioxide (CO₂)? Step 1: find the molar mass of CO₂. Step 2: C is 12, O is 16, so 12 + 16 + 16 = 44 g/mol. Step 3: moles = mass ÷ molar mass. Step 4: 88 ÷ 44 = 2 moles.',
      hotspots: [
        { phrase: 'find the molar mass of CO₂', note: 'You always need the molar mass first. Everything else depends on it.' },
        { phrase: '12 + 16 + 16 = 44 g/mol', note: 'CO₂ has one carbon and TWO oxygens, so oxygen is counted twice. This is the step most people get wrong.' },
        { phrase: 'moles = mass ÷ molar mass', note: 'The "sharing" idea: how many 44s fit into 88?' },
        { phrase: '88 ÷ 44 = 2 moles', note: 'Check it makes sense: 2 moles × 44 g = 88 g. It does.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>Worked examples are one of the fastest ways to learn a method. But watching someone do it isn\'t the same as doing it. So use AI in two moves:</p><ol><li><strong>Show me:</strong> "Give me one worked example of finding moles from a mass. Explain each step in one line."</li><li><strong>Now me:</strong> "Give me a similar question with different numbers. Don\'t show the answer until I\'ve tried."</li></ol><p>If you get the "now me" question wrong, compare your working with the example, step by step. The step where they differ is exactly what you need to fix.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Show me, then now me. Always ask it to hide the answer until you have tried.',
    },
    {
      kind: 'check',
      question: 'In the example, why is oxygen counted twice?',
      options: ['Oxygen is heavier', 'CO₂ has two oxygen atoms', 'It is a typing mistake'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi learns the method by example.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Your turn. C = 12, O = 16. What is the molar mass of CO₂ in g/mol?',
        answers: ['44', '44g/mol', '44 g/mol'],
        placeholder: 'Number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps of the worked example in order.',
        lines: ['Find the molar mass', 'Add up the atoms: 12 + 16 + 16 = 44', 'Use moles = mass ÷ molar mass', 'Work it out: 88 ÷ 44 = 2'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi wants to practise after the example. Which request is best?',
        options: [
          { text: 'Give me 10 questions with answers.', why: 'With the answers right there, he will peek.' },
          { text: "Give me one similar question with different numbers. Don't show the answer until I've tried." },
          { text: 'Do another example for me.', why: "Watching another isn't the same as trying one." },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: "Spot the wrong step in Clinton's working for 32 g of oxygen gas (O₂).",
        lines: ['Molar mass of O₂: one O is 16.', 'So O₂ is 16 g/mol.', 'Moles = 32 ÷ 16 = 2.'],
        bug: 1,
        fix: 'O₂ has two oxygen atoms: 16 + 16 = 32 g/mol, so 32 ÷ 32 = 1 mole.',
        explanation: 'The same trap as CO₂: count every atom in the formula.',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I got 2 moles for the O₂ one. The AI says 1. The AI is wrong, right?',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Yes, the AI is always wrong.', why: 'Not this time. And the step-by-step compare would show it.' },
          { text: 'Compare your working with the worked example, step by step. Check how many O atoms are in O₂.' },
          { text: 'Just copy the AI\'s answer.', why: 'He would still not know why he went wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to what it does.',
        pairs: [
          ['Show me', 'A worked example with every step'],
          ['Now me', 'A similar question you try yourself'],
          ['Compare', 'Finds the step you got wrong'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many moles are in 44 g of CO₂?',
        answers: ['1', 'one', '1 mol', '1 mole'],
        placeholder: 'Number',
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Kofi's request.",
        template: "Give me a [[1]] question with different numbers. Don't show the [[2]] until I've [[3]].",
        blanks: [['similar'], ['answer'], ['tried']],
        distractors: ['harder', 'copied', 'slept'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Show me, or now me?',
        groups: ['Show me', 'Now me'],
        items: [
          { text: 'Walk me through one example', group: 0 },
          { text: 'Give me one to try, answer hidden', group: 1 },
          { text: 'Explain each step in one line', group: 0 },
          { text: 'Check my working when I send it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: "Kofi gets the 'now me' question wrong. What's the fastest way to find his mistake?",
        options: [
          { text: 'Ask for the answer and move on', why: 'He would make the same mistake in the test.' },
          { text: 'Start the topic again from scratch', why: 'He only needs to find one step.' },
          { text: 'Compare his working with the example, step by step' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a method you need for an exam (a calculation, an essay plan, a grammar rule). How would you use "show me, then now me" on it?',
    starters: ['The method is...', 'My "now me" question would be...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Ask for one worked example in your hardest subject, then a similar question with the answer hidden. Compare your working step by step.',
  },
  notes: 'CO2 = 12 + 2(16) = 44 g/mol; O2 = 32 g/mol. Worked-example effect is well documented (Sweller & Cooper 1985; Renkl), stated generally.',
};

export default lesson;
