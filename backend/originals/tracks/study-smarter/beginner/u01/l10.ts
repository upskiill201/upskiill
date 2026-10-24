import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9, with 1–4 mixed in. Story beat: halfway to the test. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: halfway to the test',
  summary: 'Why questions, your own material, worked examples and new angles. One week to the test, and everything gets mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can ask why, use your material, learn from examples and change the angle', 'Combine it with the study recipe'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'One week to Mrs Asante\'s test. Since the last checkpoint, Kofi learned four new moves. Name one?', replies: ['Ask why', 'Textbook first', 'Show me, now me'] },
        { tey: 'Yes! And the fourth: when it doesn\'t click, change the angle, not the volume.' },
        { tey: "Some of these questions have two answers that look right. Read carefully. Let's go." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2. One week to the test.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which move is this?',
        groups: ['Ask why', 'Textbook first', 'New angle'],
        items: [
          { text: 'Why do we divide by molar mass?', group: 0 },
          { text: '[paragraph] Explain this using the same method', group: 1 },
          { text: 'Explain it with a football analogy', group: 2 },
          { text: 'Here is my syllabus line. What do I need to know?', group: 1 },
          { text: 'Why this formula and not that one?', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Na = 23, Cl = 35.5. What is the molar mass of NaCl (table salt) in g/mol?',
        answers: ['58.5', '58.5g/mol', '58.5 g/mol'],
        placeholder: 'Number',
        explanation: '23 + 35.5 = 58.5 g/mol.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi wants to practise after a worked example. Which request is best?',
        options: [
          { text: 'Give me 5 questions and their answers.', why: 'Answers visible means he will peek.' },
          { text: 'One similar question with different numbers, answer hidden until I try.' },
          { text: 'Do three more examples for me.', why: 'Watching is not doing.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I asked about electrolysis three times, each time "in more detail". Now it\'s 2 pages and I understand nothing.',
        prompt: 'What should Kofi tell Clinton?',
        options: [
          { text: "Change the angle, not the volume. Ask for an analogy, or say what you think it means and ask where you're wrong." },
          { text: 'Ask for 3 pages.', why: 'More volume. Same problem.' },
          { text: 'Electrolysis is too hard.', why: 'It needs a new angle, not giving up.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the AI\'s answer should Kofi question first?',
        lines: [
          'Your textbook says moles = mass ÷ molar mass.',
          'Molar mass of water is 18 g/mol.',
          'Your teacher will ask about this in Question 3.',
        ],
        bug: 2,
        fix: "Ignore it. The AI can't know what Mrs Asante will ask.",
        explanation: 'It has no way of knowing his teacher or his test.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Ask "why"', 'Understand it so you can rebuild it'],
          ['Textbook first', 'Explain my material, my method'],
          ['Ask for an example', 'Show me, then now me'],
          ['Ask differently', 'Change the angle, not the volume'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the "why" routine.',
        template: 'Write your own [[1]] first, then ask the AI to [[2]] it.',
        blanks: [['guess', 'answer'], ['check']],
        distractors: ['copy', 'delete'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many moles are in 117 g of NaCl (58.5 g/mol)?',
        answers: ['2', 'two', '2 mol', '2 moles'],
        placeholder: 'Number',
        explanation: '117 ÷ 58.5 = 2.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Kofi\'s full study routine in order.',
        lines: [
          'Paste the part of the textbook he is stuck on',
          'Ask for a simpler explanation using the same method',
          'Ask "why does this work?" and guess first',
          'Try a similar question with the answer hidden',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After three different angles, Kofi still doesn\'t get it. Best next move?',
        options: [
          { text: 'Ask the same question again', why: 'Same angle, same result.' },
          { text: 'Skip the topic', why: 'It is in the test.' },
          { text: 'Ask a person: Efua, Mrs Asante, or Miracle on Thursday' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "start from my mistake" question.',
        tiles: ['Here', 'is', 'my', 'idea.', 'Where', 'does', 'it', 'go', 'wrong?'],
        distractors: ['perfect', 'copy'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Recipe part: which is which?',
        groups: ['Who or what', 'Need', 'How'],
        items: [
          { text: 'Final year, I know moles', group: 0 },
          { text: 'Check my working', group: 1 },
          { text: 'One step at a time', group: 2 },
          { text: 'Explain it', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four new moves (why, textbook first, show me then now me, new angle) will you use most? On which subject?',
    starters: ['The move I will use most is...', 'For...'],
  },
  deepen: { title: 'Keep going', summary: 'Use all four moves on one topic you have a test on soon.' },
  notes: 'Review only. NaCl = 23 + 35.5 = 58.5 g/mol (Cl commonly given as 35.5 at school level). 117 ÷ 58.5 = 2.',
};

export default lesson;
