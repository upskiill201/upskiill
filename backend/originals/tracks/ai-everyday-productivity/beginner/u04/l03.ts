import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Prompt Lab: quiz me. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Quiz me',
  summary: 'Lucía has her six-line opening. Now she needs it in her head, not on her screen. Build the prompt that turns AI into a patient quiz partner.',
  minutes: 13,
  outcomes: [
    'Turn any AI chat into a quiz that waits for you',
    'Get short explanations when you\'re wrong',
    'Make it get harder as you improve',
  ],
  learn: [
    {
      kind: 'promptLab',
      title: 'The opening, line by line',
      task: 'Get a quiz that makes Lucía recall each Portuguese line herself.',
      base: 'Help me learn my Portuguese opening [6 lines pasted].',
      parts: [
        { label: 'Quiz me', text: 'Quiz me one line at a time: you give the Spanish, I say the Portuguese.' },
        { label: 'Wait', text: 'Wait for my answer before showing the right one.' },
        { label: 'Explain', text: 'When I\'m wrong, explain why in one sentence.' },
        { label: 'Harder', text: 'After 3 right in a row, make it harder: mix the order or change a word.' },
        { label: 'Answers first', text: 'Show me all the answers first.' },
      ],
      replies: [
        { uses: [], text: 'Here\'s a full breakdown of your opening, with grammar notes: "Bom dia a todos" uses "bom" (masculine) because "dia" is masculine...', note: 'A lecture. Interesting, and she\'s doing none of the remembering.' },
        { uses: [4], text: '1. Buenos días a todos → Bom dia a todos\n2. Muchas gracias por estar aquí → Muito obrigada por estarem aqui\n3. ...', note: 'A list to reread. Rereading feels like learning and mostly isn\'t.' },
        { uses: [0], text: 'Line 1: "Buenos días a todos" → "Bom dia a todos". Line 2: "Muchas gracias por estar aquí" → "Muito obrigada..."', note: 'It\'s quizzing, but the answer comes in the same breath. No chance to try.' },
        { uses: [0, 1], text: 'Line 1 in Spanish: "Buenos días a todos." Your turn: how do you say it in Portuguese?\n\n(Lucía: "Bom dia a todos.")\n\nCorrect! Line 2: "Muchas gracias por estar aquí."\n\n(Lucía: "Muito obrigado por estar aqui.")\n\nNot quite. Correct: "Muito obrigada por estarem aqui." Line 3...', note: 'Real retrieval now. But she doesn\'t know why she was wrong, so she\'ll make the same mistake tomorrow.' },
        { uses: [0, 1, 2], text: '(Lucía: "Muito obrigado por estar aqui.")\n\nClose! Two things: you say "obrigada" because you\'re a woman (it agrees with the speaker), and "estarem" because you\'re thanking them, plural. Try line 2 again.', note: 'Retrieval plus a one-line why. One more part makes it grow with her.' },
        { uses: [0, 1, 2, 3], text: '(Lucía gets lines 1, 2 and 3 right.)\n\nThree in a row! Harder now: I\'ll mix the order and change one word. In Spanish: "Estamos muy contentos de empezar esta colaboración." In Portuguese?\n\n(Lucía: "Estamos muito felizes em começar essa parceria.")\n\nPerfect. You even used "parceria". Next: say lines 1 to 3 in one go.', note: 'A quiz that waits, explains and stretches her. Twenty minutes of this a day is how the opening gets into her head.' },
        { uses: [0, 1, 2, 3, 4], text: 'First, here are all six answers... Now, line 1 in Spanish?', note: 'She\'s just read every answer, so the quiz tests her short-term memory, not her learning. Drop "Answers first".' },
      ],
      goal: 5,
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The quiz prompt: "Quiz me one at a time. Wait for my answer. If I\'m wrong, explain in one sentence. After 3 right, make it harder." Works for anything: words, dates, formulas.',
    },
  ],
  apply: {
    scenario: 'Building the quiz.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Build the quiz prompt in order.',
        lines: ['Quiz me one at a time', 'Wait for my answer', 'Explain if I\'m wrong', 'Make it harder after 3 right'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "show me all the answers first" ruin the quiz?',
        options: [
          { text: 'It makes the chat too long', why: 'Length isn\'t the issue.' },
          { text: 'It\'s rude', why: 'It\'s about learning, not manners.' },
          { text: 'She\'s just read them, so she\'s not really recalling anything' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why it\'s "obrigada".',
        template: 'Lucía says "obrigada" because it agrees with the [[1]], and she is a [[2]].',
        blanks: [['speaker'], ['woman']],
        distractors: ['listener', 'manager'],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Does the quiz prompt work for my accounting exam too?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'No, only for languages.', why: 'It works for any facts or steps.' },
          { text: 'Yes. Paste your notes and ask it to quiz you one question at a time, wait, explain, then get harder.' },
          { text: 'Just ask it for the exam answers.', why: 'That\'s the crutch, not the coach.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good quiz behaviour, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Asks, then waits', group: 0 },
          { text: 'Gives the answer with the question', group: 1 },
          { text: 'Explains a mistake in one sentence', group: 0 },
          { text: 'Lectures for a whole page', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Lucía\'s answers has a mistake?',
        lines: [
          'Bom dia a todos.',
          'Muito obrigado por estarem aqui.',
          'Estamos muito felizes em começar essa parceria.',
        ],
        bug: 1,
        fix: 'Muito obrigada por estarem aqui.',
        explanation: 'Lucía is a woman, so she says "obrigada".',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Portuguese to the Spanish.',
        pairs: [
          ['Bom dia a todos', 'Buenos días a todos'],
          ['Muito obrigada', 'Muchas gracias'],
          ['Parceria', 'Colaboración'],
          ['Doze anos', 'Doce años'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Type the Portuguese for "Good morning, everyone."',
        answers: ['Bom dia a todos', 'bom dia a todos', 'Bom dia, a todos', 'bom dia todos'],
        placeholder: 'In Portuguese',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt quizzes Lucía on Nopal facts for the Q&A?',
        options: [
          { text: 'Ask me one simple question in Portuguese a distributor might ask about Nopal. Wait for my answer, correct one mistake in Spanish, then ask the next.' },
          { text: 'Write answers to all possible questions.', why: 'That\'s doing it for her.' },
          { text: 'Tell me what they\'ll ask.', why: 'Better to practise answering.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does "make it harder after 3 right" do for Lucía?',
        options: [
          { text: 'It makes her give up', why: 'It keeps her just at the edge of what she can do.' },
          { text: 'It keeps her stretched instead of repeating what she already knows' },
          { text: 'It saves time', why: 'It\'s about learning, not speed.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What could you get quizzed on this week (words, facts for work, a recipe, rules of a game)? Write the quiz prompt you\'ll use.',
    starters: ['I\'ll get quizzed on...', 'My prompt:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Paste five things you want to remember into an AI tool with the full quiz prompt. Do ten minutes. Tomorrow, start with "quiz me on yesterday\'s five first".',
  },
  notes: 'Portuguese checked: "Bom dia a todos"; "Muito obrigada por estarem aqui" (female speaker; plural "estarem"); "Estamos muito felizes em começar essa parceria"; "doze anos". Obrigado/obrigada agrees with the speaker\'s gender.',
};

export default lesson;
