import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: the dress rehearsal. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'The dress rehearsal',
  summary: 'Day 22. One week to the São Paulo call. Before Sofía plays the distributor at lunch, Lucía sets up one last practice with AI. Use everything from Chapter 4 to make it count.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Combine the tutor setup, role-play and feedback', 'Practise a real conversation before it happens'],
  learn: [
    {
      kind: 'story',
      title: 'Day 22, 8:10 a.m., the metro',
      beats: [
        { speaker: 'narrator', text: 'Six lines, mostly solid. "Obrigada", every time now. "Deliciosos", never "esquisitos". But nobody has talked back to her yet.' },
        { speaker: 'lucia', text: 'Today it talks back.' },
      ],
    },
    {
      kind: 'promptLab',
      title: 'Boss level: the practice call',
      task: 'Set up a role-play that prepares Lucía for the real call: her level, real questions, useful feedback.',
      base: 'Let\'s practise Portuguese.',
      parts: [
        { label: 'Role', text: 'You\'re a snack distributor from São Paulo on a video call with me, Lucía from Nopal.' },
        { label: 'My level', text: 'I\'m a beginner. Use short, simple sentences and ask one question at a time.' },
        { label: 'Feedback', text: 'After each of my answers, correct one mistake, in Spanish.' },
        { label: 'Wrap-up', text: 'After 6 questions, tell me the 3 things to practise most.' },
        { label: 'Speak English', text: 'Actually, just speak English to make it easier.' },
      ],
      replies: [
        { uses: [], text: 'Ótimo! O português brasileiro tem uma história fascinante, que começa em 1500 com a chegada dos portugueses...', note: 'A lecture on history, in fast Portuguese. Nothing to do with her call.' },
        { uses: [4], text: 'Sure! Hi Lucía, tell me about Nopal.', note: 'Comfortable, and no practice at all. The call won\'t be in English.' },
        { uses: [0], text: 'Bom dia, Lucía! Que prazer conhecê-la. Antes de começarmos, gostaria de entender melhor a estratégia de distribuição que vocês têm em mente para o mercado brasileiro, considerando a logística...', note: 'A realistic distributor, at full speed. She understands four words.' },
        { uses: [0, 1], text: 'Bom dia, Lucía! Tudo bem?\n\n(Lucía: "Tudo bem, obrigado!")\n\nQue bom! Há quanto tempo a Nopal existe?', note: 'Her level now. But she said "obrigado" and nobody told her.' },
        { uses: [0, 1, 2], text: '(Lucía: "Tudo bem, obrigado!")\n\nCorrección: di "obrigada", porque eres mujer.\n\nHá quanto tempo a Nopal existe?\n\n(Lucía: "Doze anos!")\n\n¡Perfecto! Quais snacks são os mais populares?', note: 'Real practice with feedback. Last part: something to take away.' },
        { uses: [0, 1, 2, 3], text: '...(6 questions later)\n\nMuito bem, Lucía! Para practicar más:\n1. "Obrigada" (lo dijiste "obrigado" dos veces).\n2. Los números: "doze", "quinze".\n3. Responder "Quais são os mais populares?" con una frase completa.', note: 'A role-play at her level, feedback after every answer, and a short list to practise before Day 29. That\'s a tutor.' },
        { uses: [0, 1, 2, 3, 4], text: 'Sure! Hi Lucía, how long has Nopal existed?...', note: 'Everything was set up, and then "speak English" undid it. Remove it and send again.' },
      ],
      goal: 5,
    },
  ],
  apply: {
    scenario: 'Unit Challenge: studying with AI.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "speak English" ruin the practice?',
        options: [
          { text: 'English is harder', why: 'It\'s easier. That\'s the problem.' },
          { text: 'The AI can\'t speak English', why: 'It can.' },
          { text: 'The call will be in Portuguese, so practising in English prepares her for nothing' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the prompt to what it fixed.',
        pairs: [
          ['Role', 'A realistic distributor'],
          ['My level', 'Short, simple sentences'],
          ['Feedback', '"Di obrigada"'],
          ['Wrap-up', '3 things to practise'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Bom dia! Quais snacks são os mais populares?',
        prompt: 'Lucía\'s best answer, in simple Portuguese?',
        options: [
          { text: 'Obrigado!', why: 'Wrong answer, and wrong ending: obrigada.' },
          { text: 'Os nossos chips de nopal são os mais populares!' },
          { text: 'Os nossos snacks são esquisitos!', why: 'Esquisito means strange.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Coach or crutch?',
        groups: ['Coach', 'Crutch'],
        items: [
          { text: 'Role-play the call', group: 0 },
          { text: 'Translate my answers live', group: 1 },
          { text: 'Correct one mistake each time', group: 0 },
          { text: 'Show me all the answers first', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The learning rules.',
        template: 'Retrieval: [[1]] yourself. Spacing: a little, [[2]].',
        blanks: [['quiz', 'test'], ['often']],
        distractors: ['read', 'once'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How do you say "twelve years" in Portuguese?',
        answers: ['doze anos', 'Doze anos'],
        placeholder: 'In Portuguese',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the opening still needs fixing?',
        lines: [
          'Bom dia a todos.',
          'Muito obrigada por estarem aqui.',
          'Meu nome é Lucía e eu sou esquisita da Nopal.',
        ],
        bug: 2,
        fix: 'Meu nome é Lucía e sou responsável pelo marketing da Nopal.',
        explanation: 'She just called herself "the strange one from Nopal". A false friend sneaked back in.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Grace has a job interview in English next week. Which prompt is the best practice?',
        options: [
          { text: 'You\'re interviewing me for a UX researcher role. Ask one common question at a time, wait for my answer, give one piece of feedback, and after 5 questions tell me my 3 weakest points.' },
          { text: 'Write me perfect interview answers.', why: 'Doing it for her.' },
          { text: 'What do interviewers ask?', why: 'A list, not practice.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s ten days.',
        lines: ['Set a small, clear goal', 'Understand each line', 'Get quizzed daily', 'Make flashcards from mistakes', 'Role-play the call'],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'Sofía says your Portuguese is good. Ready for Day 29?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'I\'m fluent now.', why: 'She has an opening and a few answers. Honest is better.' },
          { text: 'No, cancel it.', why: 'She\'s ready for what she set out to do.' },
          { text: 'For a 60-second opening and simple questions, yes. Then we switch to Spanish, like we planned.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the Chapter 4 lesson in one line?',
        options: [
          { text: 'Make AI do your homework', why: 'That\'s the crutch.' },
          { text: 'Make AI make you think: quiz, explain, practise, a little every day' },
          { text: 'Don\'t use AI for learning', why: 'Used as a tutor, it helped a lot.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What conversation could you rehearse with AI before it happens (an interview, a hard talk, a call in another language)? What role would you give it?',
    starters: ['I\'d rehearse...', 'The AI\'s role:...'],
  },
  deepen: {
    title: 'Chapter 4 challenge: rehearse something real',
    summary: 'Use "Practise with me" for a real conversation coming up: give it a role, your level, feedback after each answer, and a 3-point wrap-up. Next chapter: Doña Lupe calls from Oaxaca. The venue has been double-booked. The party is in seven days.',
  },
  notes: 'Portuguese checked: "Tudo bem?", "Há quanto tempo a Nopal existe?", "Quais snacks são os mais populares?", "Os nossos chips de nopal são os mais populares", "sou responsável pelo marketing da Nopal". Spanish feedback lines intentional (her native language). Grace appears only in an exercise, per CAST (UX researcher at Kinwell).',
};

export default lesson;
