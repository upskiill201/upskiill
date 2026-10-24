import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: "Checkpoint: Sofía's quiz",
  summary: 'Day 19. Sofía, who never says much, offers to quiz Lucía at lunch. Then quizzes her on how she\'s learning, not just on Portuguese. Check what you know about AI as a tutor.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use AI as a coach, not a crutch', 'Quiz, explain and check understanding'],
  learn: [
    {
      kind: 'story',
      title: 'Lunch, Day 19',
      beats: [
        { speaker: 'sofia', text: 'Line 2?' },
        { speaker: 'lucia', text: 'Muito obrigada por estarem aqui.' },
        { speaker: 'sofia', text: 'Good. Now tell me how you learned it. That\'s the part I want to copy.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: studying with AI.',
    items: [
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'So how did you learn it?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'AI translated it and I read it a lot.', why: 'That\'s rereading, the weak method.' },
          { text: 'AI quizzed me one line at a time and waited for my answer. When I was wrong, it told me why in one sentence.' },
          { text: 'I just remembered it.', why: 'She had a method.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Coach or crutch?',
        groups: ['Coach', 'Crutch'],
        items: [
          { text: 'Wait for my answer', group: 0 },
          { text: 'Show me all the answers first', group: 1 },
          { text: 'Explain it like I\'m 12', group: 0 },
          { text: 'Do my homework', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did the 2024 study find about students using a regular chatbot?',
        options: [
          { text: 'Better practice scores, worse exam scores without it' },
          { text: 'Better at everything', why: 'Their exam scores dropped.' },
          { text: 'No difference at all', why: 'About 17% lower in the exam.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two habits.',
        template: 'Retrieval: pull it out of your [[1]]. Spacing: a little, [[2]].',
        blanks: [['head', 'memory'], ['often']],
        distractors: ['notes', 'once'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tomás\'s study plan is the crutch?',
        lines: [
          'Quiz me one line at a time.',
          'Explain my mistakes in one sentence.',
          'Then give me all the answers to read before bed.',
        ],
        bug: 2,
        fix: '"Quiz me again tomorrow on today\'s lines."',
        explanation: 'Rereading answers feels like learning; retrieval tomorrow actually is.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Portuguese to its meaning.',
        pairs: [
          ['Bom dia a todos', 'Good morning, everyone'],
          ['Muito obrigada', 'Thank you very much'],
          ['Parceria', 'Partnership'],
          ['Não', 'No'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt explains something so it clicks?',
        options: [
          { text: 'Define "nasal vowel".', why: 'Likely more jargon.' },
          { text: 'Tell me everything about Portuguese sounds.', why: 'Far too much.' },
          { text: 'Explain the ão sound like I\'m 12, with an example from Spanish, then let me explain it back.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía is a woman. Is it "obrigado" or "obrigada" for her?',
        answers: ['obrigada', 'Obrigada'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the quiz prompt.',
        lines: ['Quiz me one at a time', 'Wait for my answer', 'Explain if wrong', 'Harder after 3 right'],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Last question. Why not just cram it all on Day 28?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Because twenty minutes a day sticks. A cram fades by the call.' },
          { text: 'Good idea, I will.', why: 'That\'s the opposite of spacing.' },
          { text: 'Because I\'m moving on Day 27.', why: 'True, but spacing is the real reason.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually study or learn something new? Which one habit from this chapter would change it most?',
    starters: ['I usually...', 'I\'ll change...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4.',
};

export default lesson;
