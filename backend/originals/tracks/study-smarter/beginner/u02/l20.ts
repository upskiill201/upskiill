import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Unit Challenge. The whole chapter, harder. Climax: Kofi explains it on the board. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: at the board',
  summary: "Mrs Asante hands Kofi the chalk. Teach the class the hardest question in the topic. Everything from Chapter 2, harder.",
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use every understanding tool from Chapter 2 together', 'Explain, solve and debug a full stoichiometry problem'],
  learn: [
    {
      kind: 'story',
      title: 'The chalk',
      beats: [
        { speaker: 'asante', text: 'Four weeks ago you were lost five minutes into this topic. Today you teach it. The hardest question on the sheet, Kofi.' },
        { speaker: 'narrator', text: 'A limiting reagent question with masses. The kind that made Efua stop and ask for help.' },
        { speaker: 'narrator', text: 'Kofi draws the bridge. He starts with what the question gives, decodes what it wants, and asks the class "why?" at every step instead of just telling them.' },
        { speaker: 'efua', text: '(whispering) He\'s doing the Miracle thing. He\'s making US do the thinking.' },
        { speaker: 'tey', text: 'The topic that wouldn\'t click. Now it\'s his to teach. Your turn at the board.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: at the board.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'The board question, part 1. 2H₂ + O₂ → 2H₂O. You have 8 g of H₂ (2 g/mol). How many moles of H₂ is that?',
        answers: ['4', 'four'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        prompt: 'Part 2. You also have 96 g of O₂ (32 g/mol), which is 3 moles. Which reactant is limiting?',
        options: [
          { text: 'O₂, because there is more of it in grams', why: 'Grams don\'t decide it. Moles and the ratio do.' },
          { text: 'Neither', why: '4 mol H₂ needs only 2 mol O₂; 1 mol O₂ is left over.' },
          { text: 'H₂: 4 moles of H₂ only needs 2 moles of O₂, so H₂ runs out first' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Part 3. What mass of water forms? (H₂O = 18 g/mol, grams)',
        answers: ['72', '72g', '72 g'],
        placeholder: 'Number',
        explanation: '4 mol H₂ → 4 mol H₂O → 4 × 18 = 72 g.',
      },
      {
        kind: 'findBug',
        prompt: 'A classmate answers at the board. Spot the step that goes wrong.',
        lines: ['O₂: 96 ÷ 32 = 3 mol. H₂: 8 ÷ 2 = 4 mol.', 'O₂ has more moles, so it makes more water.', 'Water = 3 × 2 × 18 = 108 g.'],
        bug: 1,
        fix: 'Compare using the ratio: 4 mol H₂ needs only 2 mol O₂, so H₂ is limiting.',
        explanation: 'More moles does not mean limiting or not. Use the ratio to see which runs out first.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi prepares the night before. Which request fits the chapter best?',
        options: [
          { text: 'Write a perfect explanation I can read out.', why: 'Then the AI is teaching, not Kofi.' },
          { text: 'Pretend you are a classmate who finds limiting reagents hard. I will explain the board question. Ask me where I am vague. Do not explain it yourself.' },
          { text: 'Give me the answer to the board question.', why: 'He needs to be able to teach it, not just know it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the tool that fixes it.',
        pairs: [
          ['Lost from minute one', 'Find the gap underneath'],
          ['Two ideas keep mixing', 'Compare side by side'],
          ['AI and notes disagree', 'Look for the difference'],
          ['Too many steps to hold', 'A diagram in words'],
          ['Not sure you really get it', 'The five checks'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Coefficient, subscript or molar mass?',
        groups: ['Coefficient', 'Subscript', 'Molar mass'],
        items: [
          { text: 'The 2 in 2H₂O', group: 0 },
          { text: 'The 2 in O₂', group: 1 },
          { text: '18 g/mol for water', group: 2 },
          { text: 'The 2 in front of H₂', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'I heard you taught the class today. What did you do differently from how you were taught?',
        prompt: 'What is the best answer?',
        options: [
          { text: 'I asked them "why?" at every step and let them do the thinking, like you do with me.' },
          { text: 'I read out the AI explanation.', why: 'He did the opposite: he made the class think.' },
          { text: 'I talked the whole time so nobody got confused.', why: 'Talking less, asking more, is what worked.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the 10-minute understanding routine in order.',
        lines: ['Gap', 'Words', 'Idea', 'Example', 'Explain back'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the board question, how many moles of O₂ are left over?',
        answers: ['1', 'one'],
        placeholder: 'Number',
        explanation: '3 mol O₂ minus the 2 mol used = 1 mol in excess.',
      },
      {
        kind: 'mcq',
        prompt: 'Decoding: the question says "[Relative atomic masses: H = 1, O = 16] [4 marks]". What does that tell Kofi?',
        options: [
          { text: 'Use the most precise values he knows', why: 'Use what the question gives.' },
          { text: 'Use exactly those values, and show about four steps of working' },
          { text: 'Write four sentences of explanation', why: 'It is a calculation. Four marks means about four steps.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter in one sentence.',
        template: 'Find the [[1]], learn the [[2]], link it to what you [[3]], then explain it back.',
        blanks: [['gap'], ['words'], ['know']],
        distractors: ['answer', 'copy'],
      },
      {
        kind: 'tapBuild',
        prompt: "Build Kofi's board line.",
        tiles: ['Down,', 'across,', 'up'],
        distractors: ['left,', 'sideways,'],
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 2 done. Which topic, in any subject, will you use the 10-minute routine on first?',
    starters: ['The topic is...', 'I will start with...'],
  },
  deepen: {
    title: 'Next: Chapter 3',
    summary: "Kofi's notes are a mess and Efua's are famous. Next chapter, they swap methods, and build a revision sheet the whole class wants to borrow.",
  },
  notes: '8 g H2 = 4 mol; 96 g O2 = 3 mol; 4 mol H2 needs 2 mol O2 → H2 limiting, 1 mol O2 excess; 4 mol H2O = 72 g. Wrong-answer line: 3 mol O2 → 6 mol H2O → 108 g (the error).',
};

export default lesson;
