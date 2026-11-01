import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: prompt cards v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Prompt cards v4',
  summary: 'Studying gave Lucía her favourite card yet. Sofía has already copied it for her accounting exam. Tap through card #6, "Teach me".',
  minutes: 11,
  outcomes: [
    'Save a tutor prompt you can use for anything you learn',
    'Build retrieval, spacing and explaining back into it',
    'Add study cards to your own kit',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s prompt card #6: "Teach me"',
      text: 'TEACH ME. Use for: anything I want in my head, not just on my screen. Setup: "Be my tutor. Don\'t give me answers. I\'m learning [TOPIC] for [GOAL] by [DATE]." Quiz: "One question at a time. Wait for my answer. If I\'m wrong, explain why in one sentence. After 3 right, make it harder." Stuck? "Explain it like I\'m 12, with an example from my life." Then I explain it back. Every session: start with yesterday\'s mistakes. Card #7, "Practise with me": "You\'re [ROLE]. Ask me simple questions one at a time. Correct one mistake after each answer." Plan: 20 minutes a day, review days, adjust don\'t quit. Version: v4, Day 22.',
      hotspots: [
        { phrase: 'not just on my screen', note: 'The whole point of the chapter: learning, not getting the answer.' },
        { phrase: 'Don\'t give me answers', note: 'The tutor setup from the 2024 study: hints, not answers.' },
        { phrase: 'Wait for my answer', note: 'Without this line, the answer arrives with the question and she recalls nothing.' },
        { phrase: 'After 3 right, make it harder', note: 'Keeps her stretched, not repeating what she already knows.' },
        { phrase: 'Then I explain it back', note: 'The step most people skip, and the best check of understanding.' },
        { phrase: 'start with yesterday\'s mistakes', note: 'Spacing and retrieval in one line.' },
        { phrase: 'You\'re [ROLE]', note: 'Role-play: the distributor, an interviewer, a doctor. Practise the conversation before it\'s real.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Card #6 works for languages, exams, driving theory, a new job\'s jargon, a recipe you want to know by heart. Swap the brackets and go.',
    },
  ],
  apply: {
    scenario: 'Reading prompt cards #6 and #7.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to the lesson behind it.',
        pairs: [
          ['"Don\'t give me answers"', 'How learning actually sticks'],
          ['"Wait for my answer"', 'Quiz me'],
          ['"Like I\'m 12"', 'Explain it three ways'],
          ['"Adjust, don\'t quit"', 'Ten days, twenty minutes'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does every session start with yesterday\'s mistakes?',
        options: [
          { text: 'To make her feel bad', why: 'It\'s practice, not punishment.' },
          { text: 'It\'s retrieval and spacing: the weak spots come back while they\'re still fixable' },
          { text: 'Because the AI forgets', why: 'It\'s for her memory, not the AI\'s.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'I used "Teach me" for my accounting exam. I got a B+. My last one was a C.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'The AI must have known the questions.', why: 'It quizzed her; she did the remembering.' },
          { text: 'Lucky.', why: 'It was the method.' },
          { text: 'That\'s you doing the remembering every day. The card just made you.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Card #7, "Practise with me".',
        template: 'You\'re [[1]]. Ask me simple questions one at a [[2]]. Correct one mistake after each answer.',
        blanks: [['[ROLE]', 'a distributor', 'ROLE'], ['time']],
        distractors: ['my boss', 'go'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Card #6 "Teach me" or card #7 "Practise with me"?',
        groups: ['Teach me', 'Practise with me'],
        items: [
          { text: 'Learning road signs', group: 0 },
          { text: 'Rehearsing a job interview', group: 1 },
          { text: 'Memorising a recipe', group: 0 },
          { text: 'Practising a call in Portuguese', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Tomás\'s copy turns the tutor back into a crutch?',
        lines: [
          'Be my tutor.',
          'Quiz me one question at a time.',
          'Show me the answer straight away so I don\'t waste time.',
        ],
        bug: 2,
        fix: '"Wait for my answer."',
        explanation: 'The waiting is where the learning happens.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s card #6 called? (Two words.)',
        answers: ['Teach me', 'teach me'],
        placeholder: 'Card name',
      },
      {
        kind: 'mcq',
        prompt: 'Which would make the best card #7 role for a job interview?',
        options: [
          { text: '"You\'re a hiring manager for a junior designer role. Ask me one common question at a time."' },
          { text: '"You\'re my mum."', why: 'Supportive, but not interview practice.' },
          { text: '"Write my interview answers."', why: 'That\'s doing it for you.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a "Teach me" session.',
        lines: ['Start with yesterday\'s mistakes', 'Learn something new', 'Get quizzed, one at a time', 'Explain it back', 'Note today\'s mistakes'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the big difference between cards v3 and v4?',
        options: [
          { text: 'v4 is shorter', why: 'Length isn\'t the change.' },
          { text: 'v4 is in Portuguese', why: 'It works for anything.' },
          { text: 'v3 helps her produce work; v4 helps her learn and keep it' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own card #6 for something you want to learn this month. What\'s the goal and the date?',
    starters: ['I\'m learning... for... by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add "Teach me" and "Practise with me" to your prompt-cards note. Use "Teach me" for 10 minutes today on anything, starting with "Be my tutor. Don\'t give me answers."',
  },
  notes: 'Prompt cards v4 (fictional). Running device.',
};

export default lesson;
