import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 7 — preparing for an informational interview. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The 15-minute call',
  summary: 'Saturday, 9:40am. Twenty minutes until Clinton\'s call with Tchami, and he has no idea what to say. Tey walks him through an informational interview: what it is, what to ask, and what never to ask.',
  minutes: 11,
  outcomes: ['Explain what an informational interview is', 'Prepare four good questions', 'Respect the other person\'s time'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'An informational interview is a short conversation where you ask someone about their work. You\'re not applying for anything. You\'re learning. What do you think Tchami expects from the call?',
          replies: ['Questions about fintech', 'Me asking for a job'],
        },
        {
          tey: 'Questions. He agreed to advice, so give him a good conversation. Prepare four questions, and start with the ones only he can answer: "How did you get into fintech?" "What does a normal week look like?" "What skills matter most on your team?" "What would you do in my position?"',
          replies: ['What shouldn\'t I ask?'],
        },
        {
          tey: 'Anything you could find on Google, like "What does your company do?". And don\'t ask for a job, or for his salary. If he mentions an opening, you can say you\'d love to hear more.',
          replies: ['How do I end it?'],
        },
        {
          tey: 'Watch the clock. At 15 minutes, say "I promised 15 minutes, so I\'ll let you go." Then ask the best question of all: "Is there anyone else you think I should talk to?" That\'s how one conversation becomes three.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Four prepared questions. Nothing you could Google. Keep to the time. End with "Who else should I talk to?"',
    },
  ],
  apply: {
    scenario: 'Clinton prepares for his call with Tchami.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an informational interview?',
        options: [
          { text: 'A short conversation to learn about someone\'s work, not a job application' },
          { text: 'A secret job interview', why: 'It\'s for learning, not applying.' },
          { text: 'A test the company sets', why: 'It\'s informal: you set it up.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good question for Tchami, or not?',
        groups: ['Good', 'Avoid'],
        items: [
          { text: 'How did you get into fintech?', group: 0 },
          { text: 'What does your company do?', group: 1 },
          { text: 'What skills matter most on your team?', group: 0 },
          { text: 'How much do you earn?', group: 1 },
          { text: 'What would you do in my position?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best line.',
        from: 'clinton',
        message: 'Tchami just said "Anyway, that\'s how I ended up in payments!" and it\'s minute 15. What do I say?',
        options: [
          { text: 'That\'s really helpful. I promised 15 minutes, so I\'ll let you go. Is there anyone else you think I should talk to?' },
          { text: 'Great. So, can you get me a job?', why: 'He agreed to advice. Ask for a name instead.' },
          { text: 'Cool, I have 20 more questions.', why: 'Keep to the time you promised.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the question Clinton should have Googled instead.',
        lines: ['What does a normal week look like for you?', 'When was your company founded?', 'What would you do in my position?'],
        bug: 1,
        explanation: 'Facts on the company website waste his time. Ask what only he knows.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the call in order.',
        lines: ['Thank him for his time', 'Ask your prepared questions and listen', 'Keep to the 15 minutes', 'Ask who else you should talk to'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s the best last question?',
        options: [
          { text: '"Is there anyone else you think I should talk to?"' },
          { text: '"Will you hire me?"', why: 'Too big. Ask for a name.' },
          { text: '"Did you like my questions?"', why: 'Not useful. Ask for a name.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what Clinton learns.',
        pairs: [
          ['How did you get into fintech?', 'A real route into the field'],
          ['What skills matter most on your team?', 'What to learn next'],
          ['Who else should I talk to?', 'His next conversation'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s line.',
        template: 'I promised [[1]] minutes, so I\'ll let you [[2]].',
        blanks: [['15', 'fifteen'], ['go']],
        distractors: ['60', 'stay', 'pay'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions should Clinton prepare? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Tchami says, "Actually, a friend of mine needs a part-time developer. Interested?" What do I say?',
        options: [
          { text: 'Yes, I\'d love to hear more. Could you tell me a bit about the role?' },
          { text: 'Finally! Send me the contract.', why: 'Stay calm and curious. Learn about it first.' },
          { text: 'No, I only want Njangi Pay.', why: 'A second door is worth opening.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If you had 15 minutes with someone doing the job you want, what four questions would you ask?',
    starters: ['1. ...', '2. ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your four questions for an informational interview, plus the closing question. Keep them on your phone for when someone says yes.',
  },
  notes: 'Informational interviews are standard careers-service guidance. Tchami is a named extra (not a CastId), so Clinton relays his lines in the chatReply exercises. Salary questions are avoided in first conversations; norms vary by country.',
};

export default lesson;
