import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13 — connect it to real life: ask where the topic shows up in the world (and in your future). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Connect it to real life',
  summary: '"When will I ever use this?" is a great question. Ask the AI, and the topic stops being marks and starts being useful.',
  minutes: 12,
  outcomes: [
    'Ask where a topic is used in real life',
    'Link a topic to the career you want',
    'Check that real-life examples are actually true',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '"When will I ever use stoichiometry?" Clinton asked that on Thursday. Honestly? Great question.', replies: ['So when?'] },
        { tey: "Every time someone needs to know how much of something to make, without waste. Medicines are made in exact amounts. Fertiliser factories work out exactly how much of each ingredient to use. Even baking bread is a ratio problem." },
        { tey: "Kofi wants Biomedical Engineering. David wants Medicine. Both use ratio and quantity calculations all the time.", replies: ['How does that help me study?'] },
        { tey: "Because your brain holds on to things that matter to it. A topic linked to your goal is easier to remember than a topic that's just \"page 84\"." },
        { tey: 'So ask: "Where is [topic] used in real life? Give me 3 examples, one connected to [the career I want]."', replies: ['Can I trust its examples?'] },
        { tey: "Mostly, but check anything specific, like a number or a named company. Real-life examples are a place where AI sometimes invents details that sound right. General examples are safer than specific claims." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Link the topic to your goal. Then check any specific number or name before you believe it.',
    },
    {
      kind: 'check',
      question: 'Why does linking a topic to your goal help?',
      options: ['It makes the topic easier', 'Your brain holds on to what matters to it', 'Teachers give extra marks'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi finds out why stoichiometry matters.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question best links the topic to Kofi\'s goal?',
        options: [
          { text: 'Is stoichiometry useful?', why: 'A yes/no question. He wants examples.' },
          { text: 'Where is stoichiometry used in real life? Give me 3 examples, one connected to biomedical engineering.' },
          { text: 'Tell me a fun fact.', why: 'Fun, but not linked to the topic or his goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to accept, or check first?',
        groups: ['Safe, general', 'Check first'],
        items: [
          { text: 'Medicines are made in exact amounts', group: 0 },
          { text: 'A named factory makes exactly 2.4 million tonnes a year', group: 1 },
          { text: 'Baking uses ratios of ingredients', group: 0 },
          { text: 'A quote from a famous scientist', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'I want to be a doctor. Why do I need chemistry ratios?',
        prompt: 'What should Kofi suggest?',
        options: [
          { text: 'Ask the AI where ratio calculations come up in medicine. Linking it to your goal will help it stick.' },
          { text: "You don't, just pass the exam.", why: 'That makes it harder to remember, not easier.' },
          { text: 'Doctors never do maths.', why: 'Not true, and not helpful.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A bread recipe uses 500 g of flour for 1 loaf. How much flour for 3 loaves? (grams)',
        answers: ['1500', '1500g', '1500 g', '1.5kg', '1.5 kg'],
        placeholder: 'Number',
        explanation: 'Same ratio, scaled up: 3 × 500 = 1500 g. That is stoichiometry thinking.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the real-life question.',
        tiles: ['Where', 'is', 'this', 'used', 'in', 'real', 'life?'],
        distractors: ['never', 'boring'],
      },
      {
        kind: 'findBug',
        prompt: "Which line in the AI's answer should Kofi check before using it?",
        lines: ['Factories that make fertiliser use reaction ratios.', 'Getting the ratio right reduces waste.', 'In 2019 one factory in Tema saved exactly 41,000 cedis this way.'],
        bug: 2,
        fix: 'Leave it out, or find a real source for it.',
        explanation: 'Specific numbers, dates and places are where AI most often invents details.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the career to where ratios show up.',
        pairs: [
          ['Medicine', 'Doses and how drugs are made'],
          ['Biomedical engineering', 'Materials and medical devices'],
          ['Baking', 'Scaling recipes'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI gives a general real-life example. What is it usually safe to do?',
        options: [
          { text: 'Use it to understand why the topic matters' },
          { text: 'Quote it in an essay as a fact', why: 'Anything you quote needs a real source.' },
          { text: 'Ignore it', why: 'General examples help it stick.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's tip.",
        template: 'Link the topic to your [[1]]. Then [[2]] any specific number or name.',
        blanks: [['goal', 'career', 'future'], ['check']],
        distractors: ['friend', 'copy'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the real-life routine in order.',
        lines: ['Ask where the topic is used', 'Ask for one example linked to your goal', 'Check any specific numbers or names', 'Write one real-life line in your notes'],
      },
    ],
  },
  reflect: {
    prompt: 'What career or goal do you have in mind? Pick one topic you are studying and guess how it connects.',
    starters: ['My goal is...', 'This topic connects because...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Ask where your hardest topic is used in real life, with one example linked to your goal. Write that example at the top of your notes.',
  },
  notes: 'Tema is a real industrial port city in Ghana; the "41,000 cedis" claim is deliberately fictional as an example of an invented detail. Relevance/self-reference effects on memory stated generally.',
};

export default lesson;
