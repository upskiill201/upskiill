import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Kofi's first stoichiometry homework. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first homework',
  summary: 'Five stoichiometry questions, due Friday. Gaps, old knowledge, analogies and the four steps, all mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can find a gap, link to what you know, and use an analogy safely', 'Use the four-step method on your own'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Friday homework: five stoichiometry questions. Last week Kofi was completely lost. This week he has a method.', replies: ['Mass, moles, ratio, moles, mass'] },
        { tey: "Ha, exactly. Today mixes the gap hunt, recipes, analogies and the four steps. Some numbers to crunch too. Ready?" },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the first stoichiometry homework.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A new topic makes no sense at all. What is the most likely cause?',
        options: [
          { text: 'A gap in an older topic it is built on' },
          { text: 'You are bad at the subject', why: 'Usually it is one missing building block.' },
          { text: 'The textbook is wrong', why: 'Possible, but rarely the reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Homework 1. N₂ + 3H₂ → 2NH₃. How many moles of H₂ react with 2 moles of N₂?',
        answers: ['6', 'six'],
        placeholder: 'Number',
        explanation: 'Ratio N₂ : H₂ is 1 : 3, so 2 moles of N₂ need 6 moles of H₂.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Coefficient or subscript?',
        groups: ['Coefficient', 'Subscript'],
        items: [
          { text: 'The 3 in 3H₂', group: 0 },
          { text: 'The 3 in NH₃', group: 1 },
          { text: 'The 2 in 2NH₃', group: 0 },
          { text: 'The 2 in N₂', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['Mass to moles', 'Read the ratio', 'Moles of product', 'Moles to mass'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Homework 2. N₂ + 3H₂ → 2NH₃. NH₃ is 17 g/mol. What mass of NH₃ comes from 1 mole of N₂? (grams)',
        answers: ['34', '34g', '34 g'],
        placeholder: 'Number',
        explanation: '1 mole of N₂ makes 2 moles of NH₃. 2 × 17 = 34 g.',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "The AI said reactions are like a football team. So the atoms in water are still hydrogen gas and oxygen gas, just standing together?",
        prompt: 'What should Kofi say?',
        options: [
          { text: "That's where the analogy breaks. The atoms rearrange into a new substance. Water isn't a mix of the two gases." },
          { text: 'Yes, exactly.', why: 'That is the analogy taken too far.' },
          { text: 'Analogies are useless.', why: 'It helped. It just has a limit.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi still mixes up coefficients and subscripts. Which request is best?',
        options: [
          { text: 'Explain coefficients again, formally.', why: 'The same angle that did not stick.' },
          { text: 'I know cooking recipes well. Explain coefficients vs subscripts using a recipe, then quiz me with 4 questions, one at a time.' },
          { text: 'Tell me the answers to my homework.', why: 'That skips the practice he needs.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: "Spot the mistake in Clinton's balancing of Mg + O₂ → MgO.",
        lines: ['Oxygen: 2 on the left, 1 on the right.', 'Change MgO to MgO₂.', 'Done.'],
        bug: 1,
        fix: 'Put a 2 in front: 2MgO. Then 2Mg on the left.',
        explanation: 'Never change the subscripts. Only the big numbers.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Find the gap', 'Look at what the topic is built on'],
          ['Start from what you know', 'Hook new ideas onto old ones'],
          ['Analogies', 'Use it to get in, ask where it breaks'],
          ['Worked examples', 'Label each step with why'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Homework 3. 2H₂ + O₂ → 2H₂O. How many moles of water do 3 moles of O₂ make?',
        answers: ['6', 'six'],
        placeholder: 'Number',
        explanation: 'Ratio O₂ : H₂O is 1 : 2. 3 × 2 = 6.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the gap-finding question.',
        template: 'What do I need to understand [[1]] this topic? [[2]] me with one question on each.',
        blanks: [['before'], ['Quiz', 'Test']],
        distractors: ['after', 'Tell'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the worked-example request.',
        tiles: ['Label', 'each', 'step', 'with', 'why'],
        distractors: ['skip', 'the'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of this week\'s ideas would have helped you most with a topic you once found impossible?',
    starters: ['The topic was...', 'This would have helped because...'],
  },
  deepen: { title: 'Keep going', summary: 'Do three stoichiometry-style questions in any subject that uses ratios, and label each step with why.' },
  notes: 'Haber: N2 + 3H2 → 2NH3; NH3 = 14 + 3 = 17 g/mol; 2 × 17 = 34 g.',
};

export default lesson;
