import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 with earlier material. Story beat: Mrs Asante's pop question. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the pop question',
  summary: 'Mrs Asante points at Kofi: "Explain the mole ratio to the class." Explaining back, misconceptions, diagrams and look-alikes, all mixed.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can explain, avoid the classic mistakes and use the bridge', 'Tell look-alike ideas apart under pressure'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, period 3',
      beats: [
        { speaker: 'asante', text: 'Kofi. You looked confident last week. Explain the mole ratio to the class.' },
        { speaker: 'narrator', text: 'A week ago this would have been a disaster. Kofi stands up, draws two boxes and three arrows on the board.' },
        { speaker: 'kofi', text: 'Down, across, up. You can only cross between substances in moles, and the coefficients tell you the ratio...' },
        { speaker: 'asante', text: '...Good. Sit down before I faint.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the pop question.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which explain-it-back set-up is best?',
        options: [
          { text: 'Do I understand the mole ratio?', why: 'It will probably just say yes.' },
          { text: "Pretend you missed the lesson. I'll explain the mole ratio. Ask where I'm vague. Don't explain it yourself." },
          { text: 'Explain the mole ratio so I can repeat it.', why: 'Repeating is not explaining.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Use the bridge. CH₄ + 2O₂ → CO₂ + 2H₂O. CH₄ = 16, CO₂ = 44. What mass of CO₂ comes from 32 g of CH₄? (grams)',
        answers: ['88', '88g', '88 g'],
        placeholder: 'Number',
        explanation: 'Down: 32 ÷ 16 = 2 mol. Across: 1 : 1, 2 mol. Up: 2 × 44 = 88 g.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Correct idea or misconception?',
        groups: ['Correct', 'Misconception'],
        items: [
          { text: 'The equation ratio is in moles', group: 0 },
          { text: 'Balance by changing subscripts', group: 1 },
          { text: 'Mass is conserved in a reaction', group: 0 },
          { text: 'O₂ is 16 g/mol', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each look-alike pair to its difference.',
        pairs: [
          ['Mass vs molar mass', 'What you have vs per mole'],
          ['Limiting vs excess', 'Runs out vs left over'],
          ['Coefficient vs subscript', 'How many vs what it is'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step of the bridge is wrong?',
        lines: ['Start: 64 g of O₂ (32 g/mol).', 'Down: 64 ÷ 32 = 2 mol.', 'Across: 2H₂ + O₂ → 2H₂O, so 2 mol O₂ makes 2 mol H₂O.'],
        bug: 2,
        fix: 'Ratio O₂ : H₂O is 1 : 2, so 2 mol of O₂ makes 4 mol of H₂O.',
        explanation: 'Read the coefficient in front of each substance.',
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Kofi, what did the AI ask you last night that you couldn\'t answer?',
        prompt: 'Why does Miracle ask this?',
        options: [
          { text: 'She wants to check the AI is working', why: "It's about Kofi's understanding, not the AI." },
          { text: 'To make him feel bad', why: 'Mentors ask this to help, not to embarrass.' },
          { text: "Those questions are exactly where Kofi's holes are, so they are what he should study next" },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rice is limiting and tomatoes are left over. What do we call the tomatoes? (one word)',
        answers: ['excess'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the bridge.',
        lines: ['Grams of A', 'Moles of A', 'Moles of B', 'Grams of B'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi finds stoichiometry confusing again after a week off. What is his best first move?',
        options: [
          { text: 'Explain it back to the AI as a classmate, and see where he gets stuck' },
          { text: 'Reread the whole chapter', why: 'Rereading, again.' },
          { text: 'Ask the AI to do his homework', why: 'Skips the learning.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the misconception question.',
        template: 'What are the most common [[1]] students make here? Give me a test [[2]] for each.',
        blanks: [['mistakes', 'misconceptions'], ['question']],
        distractors: ['jokes', 'answer'],
      },
      {
        kind: 'tapBuild',
        prompt: "Build Kofi's line from the board.",
        tiles: ['You', 'can', 'only', 'cross', 'between', 'substances', 'in', 'moles'],
        distractors: ['grams', 'never'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which lesson would you use?',
        groups: ['Explain it back', 'Diagram in words', 'Compare side by side'],
        items: [
          { text: 'You think you get it but are not sure', group: 0 },
          { text: 'A process has too many steps to hold', group: 1 },
          { text: 'You mix up two ideas', group: 2 },
          { text: 'Speed vs velocity', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If a teacher asked you to explain your hardest topic to the class tomorrow, which lesson from this chapter would you use tonight?',
    starters: ['I would use...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Explain one topic to the AI as a classmate, then draw its diagram in words from memory.' },
  notes: 'CH4 32 g = 2 mol → 2 mol CO2 = 88 g. O2 64 g = 2 mol → 4 mol H2O.',
};

export default lesson;
