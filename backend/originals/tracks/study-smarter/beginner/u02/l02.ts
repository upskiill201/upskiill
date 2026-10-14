import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2 — start from what you already know: link the new idea to an old one. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Start from what you already know',
  summary: "Balanced equations look new. They're actually a recipe, and Kofi already knows recipes. New ideas stick when you hang them on old ones.",
  minutes: 12,
  outcomes: [
    'Ask the AI to connect a new idea to one you know',
    'Read a balanced equation as a recipe',
    'Tell coefficients from the small numbers in formulas',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "You found the gap: the big numbers in front of balanced equations. Let's fix it by starting from something you already know.", replies: ['Like what?'] },
        { tey: 'Recipes. "2 cups of rice + 1 tin of tomatoes makes 2 plates of jollof." You can read that, right?', replies: ['Obviously'] },
        { tey: 'Now read this: 2H₂ + O₂ → 2H₂O. It says: 2 hydrogen molecules plus 1 oxygen molecule make 2 water molecules. Same shape. Ingredients, arrow, what you get.' },
        { tey: "The big numbers in front are called coefficients. They're the \"2 cups\" in the recipe: HOW MANY of each thing.", replies: ['And the small numbers?'] },
        { tey: "The small ones, like the 2 in H₂, are part of the thing's name. H₂ is hydrogen gas. Changing it makes a different substance, like changing jollof into fried rice." },
        { tey: "That's the trick of this lesson. Your brain learns new ideas fastest when they're hooked onto something already there. So ask the AI: connect this to something I know." },
      ],
    },
    {
      kind: 'compare',
      title: 'Big number or small number?',
      before: { label: '2H₂O', text: 'The big 2 in front is a coefficient: TWO water molecules. You can change it to balance an equation.' },
      after: { label: 'H₂O', text: 'The small ₂ is part of the formula: each water has two hydrogen atoms. Never change it, or it is not water any more.' },
      notes: ['Coefficient = how many.', 'Subscript = what it is.', 'Balancing only ever changes coefficients.'],
    },
    {
      kind: 'check',
      question: 'In 3O₂, how many oxygen molecules are there?',
      options: ['2', '3', '6'],
      answer: 1,
      explanation: '3 is the coefficient: three O₂ molecules (which is 6 oxygen atoms in total).',
    },
  ],
  apply: {
    scenario: 'Kofi hooks equations onto recipes.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request uses what Kofi already knows?',
        options: [
          { text: 'Explain balanced equations formally.', why: 'Nothing for the new idea to hook onto.' },
          { text: 'I understand recipes and moles. Explain balanced equations by connecting them to a cooking recipe.' },
          { text: 'Explain balanced equations to a professor.', why: 'Wrong level entirely.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the recipe to the equation.',
        pairs: [
          ['Ingredients', 'Reactants (left side)'],
          ['What you cook', 'Products (right side)'],
          ['"2 cups"', 'Coefficient'],
          ['"Makes"', 'The arrow'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In 2H₂ + O₂ → 2H₂O, how many molecules of oxygen (O₂) are used?',
        answers: ['1', 'one'],
        placeholder: 'Number',
        explanation: 'No number in front means 1.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Coefficient or subscript?',
        groups: ['Coefficient (how many)', 'Subscript (what it is)'],
        items: [
          { text: 'The 2 in 2H₂O', group: 0 },
          { text: 'The 2 in H₂O', group: 1 },
          { text: 'The 3 in 3O₂', group: 0 },
          { text: 'The 4 in CH₄', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Spot Clinton's mistake when balancing H₂ + O₂ → H₂O.",
        lines: ['Count oxygen: 2 on the left, 1 on the right.', 'Change H₂O to H₂O₂ so oxygen matches.', 'Now check hydrogen.'],
        bug: 1,
        fix: 'Put a 2 in front: 2H₂O. Then 2H₂ on the left balances hydrogen.',
        explanation: 'H₂O₂ is hydrogen peroxide, a different substance. Only change the big numbers.',
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Why are you talking about jollof in Chemistry?',
        prompt: 'What should Kofi say?',
        options: [
          { text: "It's how I finally got equations. I hooked them onto recipes. You did the same thing with Makola rice!" },
          { text: 'Because I am hungry.', why: 'Also true, but not the real reason.' },
          { text: 'No reason.', why: 'There is a reason: new ideas stick to old ones.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Balancing only ever changes the [[1]]. Never change the [[2]].',
        blanks: [['coefficients', 'big numbers'], ['subscripts', 'small numbers', 'formula']],
        distractors: ['arrow', 'elements'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do new ideas stick better when linked to old ones?',
        options: [
          { text: 'Your brain hooks the new idea onto something it already holds' },
          { text: 'Old ideas are always right', why: 'Not always, but they give the new idea a place to attach.' },
          { text: 'It makes lessons longer', why: 'It usually makes them faster.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the request.',
        tiles: ['Connect', 'this', 'to', 'something', 'I', 'already', 'know'],
        distractors: ['forget', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In 3O₂, how many oxygen ATOMS are there in total?',
        answers: ['6', 'six'],
        placeholder: 'Number',
        explanation: '3 molecules × 2 atoms each = 6.',
      },
    ],
  },
  reflect: {
    prompt: 'What do you already know really well? Name one school topic you could hook onto it.',
    starters: ['I know a lot about...', 'I could connect it to...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Ask the AI to explain your newest topic by connecting it to something you told it you already know.',
  },
  notes: 'Coefficients vs subscripts: standard. H2O2 is hydrogen peroxide. Prior-knowledge effect on learning is well established (schema theory), stated generally.',
};

export default lesson;
