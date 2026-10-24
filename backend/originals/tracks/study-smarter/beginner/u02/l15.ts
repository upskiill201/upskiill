import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 with earlier material. Story beat: Efua asks for help. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Efua asks for help',
  summary: 'For the first time ever, Efua is stuck and Kofi isn\'t. Photos, key words, real life and disagreements, all mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can use photos, key words, real-life links and disagreements well', 'Mix them with the whole chapter so far'],
  learn: [
    {
      kind: 'story',
      title: 'The tables turn',
      beats: [
        { speaker: 'efua', text: "Kofi. Don't laugh. I don't get limiting reagents with real numbers. The jollof version, yes. The grams version, no." },
        { speaker: 'kofi', text: "I won't laugh. ...OK, I'll laugh a little. Then I'll help." },
        { speaker: 'tey', text: "Remember: everyone is stuck on something. Efua was never \"the clever one who doesn't need help\". She just got stuck later. Let's make sure you're ready to help her." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: Kofi gets ready to help Efua.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Kofi photographs a textbook question for Efua. What should he ask the AI first?',
        options: [
          { text: 'To solve it', why: 'Read back first, or it may solve a misread question.' },
          { text: 'To write the question out exactly as it sees it, so he can check it' },
          { text: 'Whether the question is hard', why: 'Not a useful first step.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each key word to its meaning.',
        pairs: [
          ['Limiting reagent', 'Runs out first'],
          ['Excess reagent', 'Left over'],
          ['Mole ratio', 'Coefficients read as a ratio'],
          ['Molar mass', 'Grams per mole'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: "Efua's question. 2H₂ + O₂ → 2H₂O. You have 2 moles of H₂ and 2 moles of O₂. How many moles of O₂ are actually used?",
        answers: ['1', 'one'],
        placeholder: 'Number',
        explanation: '2 moles of H₂ need only 1 mole of O₂ (ratio 2 : 1). H₂ is limiting; 1 mole of O₂ is left over.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In that same question, which reactant is the limiting reagent? (write the formula, e.g. H2)',
        answers: ['H2', 'H₂', 'hydrogen'],
        placeholder: 'Formula',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to accept, or check first?',
        groups: ['Safe, general', 'Check first'],
        items: [
          { text: 'Fertiliser factories use reaction ratios', group: 0 },
          { text: 'A named company saved an exact amount', group: 1 },
          { text: 'A number read from a blurry photo', group: 1 },
          { text: 'Baking uses ratios', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'The AI says the answer is 18 g. My textbook says 17.9 g. Which do I write?',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Look for the difference first. Probably different molar mass precision. Check which values your notes say to use.' },
          { text: 'Write the AI one, it is rounder.', why: 'Rounder is not the reason to pick one.' },
          { text: 'Average them.', why: 'That is neither method.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Efua wants to start limiting reagents properly. Which first request is best?',
        options: [
          { text: 'Solve 10 limiting reagent questions.', why: 'Answers, not understanding.' },
          { text: 'What are the key words for limiting reagent questions? One-line plain definition and tiny example for each.' },
          { text: 'Is chemistry worth it?', why: 'Not a study question.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: "Which line in Efua's glossary is mixed up?",
        lines: ['Limiting reagent: runs out first.', 'Excess reagent: decides how much product you get.', 'Product: what comes out.'],
        bug: 1,
        fix: 'Excess reagent: the one left over at the end.',
        explanation: 'It is the LIMITING reagent that decides how much product you get.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the disagreement routine in order.',
        lines: ['Look for the difference', 'Ask what could explain it', 'Check the source', 'Ask your teacher if still unsure'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the photo routine.',
        template: 'Read [[1]], point at the [[2]], then ask what and why.',
        blanks: [['back'], ['part']],
        distractors: ['aloud', 'teacher'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the explain-it-back line Kofi will use with Efua.',
        tiles: ['Explain', 'it', 'to', 'me', 'in', 'your', 'own', 'words'],
        distractors: ['copy', 'mine'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi wants to help Efua without doing it for her. What fits the think-first rule?',
        options: [
          { text: 'Do her homework so she has the answers', why: 'Then she learns nothing.' },
          { text: 'Send her his answers', why: 'Same problem.' },
          { text: 'Ask her to try one, then explain her working back to him' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who could you help with a topic you now understand? How would you help without doing it for them?',
    starters: ['I could help...', 'I would...'],
  },
  deepen: { title: 'Keep going', summary: 'Help one friend with one topic this week. Make them do the explaining.' },
  notes: '2 mol H2 needs 1 mol O2 (2:1). H2 limiting; 1 mol O2 excess.',
};

export default lesson;
