import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Walkthrough: let it interview you. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Let it interview you',
  summary: 'Lucía doesn\'t know what she doesn\'t know about the budget. Ada\'s trick: don\'t write the perfect prompt. Ask the AI to ask you questions first.',
  minutes: 12,
  outcomes: [
    'Ask the AI to interview you before it answers',
    'Get questions one at a time, not twenty at once',
    'Use the interview when you don\'t know what details matter',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The interview trick, step by step',
      steps: [
        { title: '1. Say the goal, then ask for questions', body: 'Lucía types: "I need a budget for my parents\' anniversary party. Before you suggest anything, ask me the questions you need answered."' },
        { title: '2. Ask for one at a time', body: 'She adds: "One question at a time, and wait for my answer." Otherwise she gets a wall of 15 questions and answers none of them properly.' },
        { title: '3. Answer honestly, even "I don\'t know"', body: 'Q: "Is food included at the venue?" A: "I don\'t know yet." The AI notes it as something to find out instead of guessing.' },
        { title: '4. Let it surprise you', body: 'Q: "Will older relatives need transport from the hotel?" Lucía hadn\'t thought of that. Tía Carmela is 84. That question alone was worth the chat.' },
        { title: '5. Ask for the result', body: 'After six questions: "Now give me the budget as a table, with a column for things I still need to find out."' },
      ],
    },
    {
      kind: 'story',
      title: 'Voice note from Lagos',
      beats: [
        { speaker: 'ada', text: 'This is my favourite trick. When I don\'t know what matters, I let it interview me. It\'s like a good assistant who asks before guessing.' },
        { speaker: 'lucia', text: 'It asked about transport for Tía Carmela. I would have forgotten her at the hotel.' },
      ],
    },
  ],
  apply: {
    scenario: 'The interview trick.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When is the interview trick most useful?',
        options: [
          { text: 'When you don\'t know which details matter yet' },
          { text: 'When you need an answer in two seconds', why: 'The interview takes a few minutes.' },
          { text: 'Never: you should always write the perfect prompt', why: 'You often can\'t, because you don\'t know what matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the trick in order.',
        lines: ['Say the goal', 'Ask it to ask you questions first', 'Ask for one at a time', 'Answer each one', 'Ask for the result in a format'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s magic line.',
        template: 'Before you suggest anything, ask me the [[1]] you need answered. One at a [[2]].',
        blanks: [['questions'], ['time']],
        distractors: ['answers', 'go'],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'It asked me 15 questions at once and I gave up.',
        prompt: 'Lucía\'s tip?',
        options: [
          { text: 'Answer all 15, it\'s worth it.', why: 'You\'ll answer them badly. Ask for one at a time.' },
          { text: 'That\'s why AI is useless.', why: 'One small instruction fixes it.' },
          { text: 'Add "one question at a time, and wait for my answer."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good answer to the AI\'s question, or a problem?',
        groups: ['Good answer', 'Problem'],
        items: [
          { text: '"I don\'t know yet, I\'ll ask the venue."', group: 0 },
          { text: 'Making up a number to sound sure', group: 1 },
          { text: '"About 60, maybe 65."', group: 0 },
          { text: 'Skipping questions you find boring', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did the transport question show Lucía?',
        options: [
          { text: 'That AI knows her family', why: 'It knew nothing about Tía Carmela; it asked a common-sense question.' },
          { text: 'The interview can surface things you hadn\'t thought of' },
          { text: 'That the party is too expensive', why: 'It was about a missing detail.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the AI\'s question to the detail it uncovers.',
        pairs: [
          ['"Is food included at the venue?"', 'Catering cost'],
          ['"Will older guests need transport?"', 'Tía Carmela\'s taxi'],
          ['"Is there a backup if it rains?"', 'A covered space'],
          ['"Who pays for what?"', 'Mateo\'s share'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions should it ask at a time? (A number.)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Tomás\'s version breaks the trick?',
        lines: [
          'Tell it the goal.',
          'Ask it to ask me questions first.',
          'Ignore the questions and say "just give me the plan".',
        ],
        bug: 2,
        fix: 'Answer the questions, even with "I don\'t know".',
        explanation: 'The questions are the point. Skipping them brings back the guessing.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Lucía wants help choosing a gift for her parents but has no ideas. Best prompt?',
        options: [
          { text: 'Best anniversary gift?', why: 'It has to guess everything about them.' },
          { text: 'I need an anniversary gift for my parents (35 years). Ask me questions about them first, one at a time, then suggest 3 ideas.' },
          { text: 'Give me 50 gift ideas.', why: '50 guesses, none about them.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you\'ve been putting off because you don\'t know where to start? What might an AI ask you about it?',
    starters: ['I\'ve been putting off...', 'It might ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick a decision you\'re stuck on. Tell an AI tool: "Ask me questions one at a time to help me think this through, then summarise what I said." Answer at least five.',
  },
  notes: 'Asking the model to ask clarifying questions first is common prompting advice. Tía Carmela is narrated (Lucía\'s great-aunt).',
};

export default lesson;
