import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13 — flip it: let the AI ask you questions (quiz mode and tutor mode). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Let the AI ask you questions',
  summary: 'Flip the chat around. Instead of the AI lecturing you, it asks and you answer. Your brain does the work, and that is the point.',
  minutes: 12,
  outcomes: [
    'Set up a quiz that asks one question at a time',
    'Use tutor mode: hints instead of answers',
    'Make the questions harder as you get them right',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Most people use AI like a textbook: they ask, it talks. Today we flip it. It asks, you talk.", replies: ['Why flip it?'] },
        { tey: "Because answering is retrieval practice, the strongest habit we know. Listening to it explain is closer to rereading." },
        { tey: 'Two modes. Quiz mode: "Ask me 5 questions on molar mass, one at a time. Wait for my answer. Tell me if I\'m right, and explain if I\'m wrong."', replies: ['And the other?'] },
        { tey: 'Tutor mode: "Don\'t tell me the answer. Ask me questions that lead me to work it out myself. Give a hint only if I\'m stuck twice."' },
        { tey: "The magic words are ONE AT A TIME and WAIT FOR MY ANSWER. Without them, it'll dump all five questions and their answers in one go.", replies: ['Ha, it did that to me'] },
        { tey: 'Happens to everyone. Last trick: "If I get two right in a row, make the next one harder." Now it adjusts to you, like a good tutor would.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Quiz set-up',
      before: { label: 'Weak', text: 'Quiz me on molar mass.\n\nAI: 5 questions, and all 5 answers underneath.' },
      after: {
        label: 'Strong',
        text: "Quiz me on molar mass. Final-year level. Ask ONE question at a time and WAIT for my answer. Tell me if I'm right; if I'm wrong, explain why. If I get two right in a row, make the next one harder.",
      },
      notes: ['One at a time: you answer before you see anything.', 'Wait: no answers given away.', 'Gets harder as you improve.'],
    },
    {
      kind: 'check',
      question: 'Which words stop the AI dumping all the answers at once?',
      options: ['"Please be quick"', '"One at a time, wait for my answer"', '"Make it fun"'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi lets the AI do the asking.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is answering questions better than reading the AI\'s explanation again?',
        options: [
          { text: 'Pulling the answer from memory makes it stronger' },
          { text: 'It is faster', why: 'Not always. It is better because your brain does the work.' },
          { text: 'The AI prefers it', why: 'The AI has no preference. Your memory does.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Quiz mode or tutor mode?',
        groups: ['Quiz mode', 'Tutor mode'],
        items: [
          { text: 'Ask me 5 questions, one at a time', group: 0 },
          { text: "Don't tell me. Lead me there with questions", group: 1 },
          { text: 'Tell me if I am right, explain if wrong', group: 0 },
          { text: 'Give a hint only if I am stuck twice', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the magic words.',
        tiles: ['One', 'question', 'at', 'a', 'time.', 'Wait', 'for', 'my', 'answer.'],
        distractors: ['all', 'answers'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I asked it to quiz me and it gave me 10 questions WITH the answers. I just read them. Easy 10/10.',
        prompt: 'What should Kofi tell Clinton?',
        options: [
          { text: 'Nice, 10/10!', why: 'He read the answers. That is not a score.' },
          { text: 'Ask for 20 next time.', why: 'Same problem, twice as long.' },
          { text: 'That was reading, not a quiz. Add "one at a time, wait for my answer" and try again.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the quiz set-up will ruin it?',
        lines: ['Quiz me on moles, final-year level.', 'Ask one question at a time.', 'Put all the answers at the bottom so I can check.'],
        bug: 2,
        fix: 'Wait for my answer, then tell me if I am right.',
        explanation: 'Answers on screen mean you will glance at them before you think.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: "Kofi keeps getting a limiting reagent question wrong. He wants to work it out, not be told. Which set-up?",
        options: [
          { text: 'Tell me the answer to this question.', why: 'He said he wants to work it out.' },
          { text: "Don't give me the answer. Ask me questions that lead me to it. Hint only if I'm stuck twice." },
          { text: 'Quiz me on 20 random chemistry topics.', why: 'Not what he is stuck on.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line that makes the quiz adapt.',
        template: 'If I get two [[1]] in a row, make the next one [[2]].',
        blanks: [['right', 'correct'], ['harder']],
        distractors: ['wrong', 'easier'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the instruction to what it prevents.',
        pairs: [
          ['"One at a time"', 'All the questions at once'],
          ['"Wait for my answer"', 'Seeing the answer before you think'],
          ['"Explain if I\'m wrong"', 'Making the same mistake again'],
          ['"Make the next one harder"', 'Questions that are too easy'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The mode where the AI leads you with questions instead of giving answers is ... mode (one word)',
        answers: ['tutor'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good quiz in order.',
        lines: ['Say the topic and your level', 'Ask for one question at a time', 'Answer it yourself', 'Read the feedback, then the next question'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the quiz set-up you will use tonight, with all four instructions.',
    starters: ['Quiz me on...', 'One at a time...'],
  },
  deepen: {
    title: 'Save it',
    summary: 'Save your quiz set-up in your phone notes. You will use it in almost every chapter of this course.',
  },
  notes: 'Retrieval practice framing as in l11. Socratic/tutor prompting described generally; behaviour of specific tools varies.',
};

export default lesson;
