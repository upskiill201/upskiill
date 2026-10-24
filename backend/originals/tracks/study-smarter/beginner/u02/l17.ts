import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17 — understanding a past exam question: decode what it asks before answering. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Understanding a past exam question',
  summary: 'Many marks are lost because of how a question is read, not how much is known. Learn to decode a question before you answer it.',
  minutes: 13,
  outcomes: [
    'Break an exam question into what it gives you and what it wants',
    'Use the marks to judge how much to write',
    'Ask the AI to decode a question without answering it',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'A past-paper question. Tap each part.',
      text: '(a) Calculate the mass of water produced when 8.0 g of hydrogen reacts completely with oxygen. 2H₂ + O₂ → 2H₂O. [Relative atomic masses: H = 1, O = 16] Show your working. [3 marks]',
      hotspots: [
        { phrase: 'Calculate', note: 'A command word. "Calculate" means a number is expected, with working. "Explain" would want reasons.' },
        { phrase: 'mass of water produced', note: 'What they WANT: the mass of the product, in grams.' },
        { phrase: '8.0 g of hydrogen', note: 'What they GIVE you: the starting mass. That is where you start on the bridge.' },
        { phrase: 'reacts completely', note: 'All the hydrogen reacts, so you don\'t need to think about limiting reagents here.' },
        { phrase: '[Relative atomic masses: H = 1, O = 16]', note: 'Use exactly these values, not more precise ones. This is the precision lesson again.' },
        { phrase: '[3 marks]', note: 'Three marks usually means about three steps of working. Here: moles of H₂, moles of H₂O, mass of H₂O.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>Before answering any question, decode it: <strong>what does it give me, what does it want, and how much is it worth?</strong></p><p>The AI can help, as long as you stop it from simply answering. Ask: <em>"Don\'t answer this question. Tell me: the command word and what it means, what information is given, what is being asked, and what the marks suggest about the working."</em></p><p>Then answer it yourself and ask the AI to mark your working against those points.</p>',
    },
    {
      kind: 'check',
      question: 'What does "[3 marks]" usually suggest?',
      options: ['Write 3 pages', 'About three steps of working or three points', 'It is the third question'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi decodes past-paper questions.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Answer the question. 8.0 g of H₂ (H = 1, O = 16). What mass of water is produced? (grams)',
        answers: ['72', '72g', '72 g', '72.0', '72.0 g'],
        placeholder: 'Number',
        explanation: '8 ÷ 2 = 4 mol H₂ → 4 mol H₂O (1 : 1) → 4 × 18 = 72 g.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Kofi decode a question without skipping the work?',
        options: [
          { text: 'Answer this question with full working.', why: 'Then he only reads it.' },
          { text: 'Is this question hard?', why: 'Not a decoding question.' },
          { text: "Don't answer this. Tell me the command word, what's given, what's asked, and what the marks suggest." },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command word to what it wants.',
        pairs: [
          ['Calculate', 'A number, with working'],
          ['Explain', 'Reasons: why or how'],
          ['State', 'A short fact, no reasons needed'],
          ['Describe', 'What happens, in words'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Given or wanted?',
        groups: ['Given', 'Wanted'],
        items: [
          { text: '8.0 g of hydrogen', group: 0 },
          { text: 'Mass of water produced', group: 1 },
          { text: 'H = 1, O = 16', group: 0 },
          { text: 'The balanced equation', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which step of Clinton's answer loses a mark?",
        lines: ['Moles of H₂ = 8 ÷ 2 = 4.', 'Moles of H₂O = 4.', 'Mass of water = 72.'],
        bug: 2,
        fix: 'Mass of water = 4 × 18 = 72 g.',
        explanation: 'No working shown for the last step, and no unit. "Show your working" means every step.',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I knew all the Physics in the mock, but I wrote one line for a 6-mark question.",
        prompt: 'What should Kofi tell David?',
        options: [
          { text: 'One line is always enough.', why: 'Not for 6 marks.' },
          { text: 'Check the marks before you answer. 6 marks usually means about 6 points or steps.' },
          { text: 'Write as much as possible every time.', why: 'Match the marks, not the most possible.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'The question gives H = 1 and O = 16. Kofi knows H is really 1.008. What should he use?',
        options: [
          { text: 'The values the question gives: H = 1, O = 16' },
          { text: '1.008, because it is more accurate', why: 'Use what the question gives. That is what the mark scheme expects.' },
          { text: 'Whatever the AI says', why: 'The question already told you.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the decoding questions.',
        template: 'What does it [[1]] me? What does it [[2]]? How much is it [[3]]?',
        blanks: [['give'], ['want'], ['worth']],
        distractors: ['cost', 'hate'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the past-paper routine in order.',
        lines: ['Decode the question', 'Answer it yourself, showing working', 'Ask the AI to mark your working', 'Fix and redo what you lost marks on'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first line of the decoding request.',
        tiles: ["Don't", 'answer', 'this', 'question'],
        distractors: ['please', 'solve'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you lost marks on something you knew. Was it the command word, the marks, or not using what the question gave you?',
    starters: ['I lost marks when...', 'The cause was...'],
  },
  deepen: {
    title: 'Try one tonight',
    summary: 'Take one past-paper question. Decode it with the AI (no answer), answer it yourself, then ask it to mark your working.',
  },
  notes: 'Question is in the style of a school chemistry paper, not copied from any exam board. 8 g H2 = 4 mol → 72 g H2O. Command-word meanings are standard general definitions; boards publish their own lists.',
};

export default lesson;
