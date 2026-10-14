import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4; ends the free stretch on a win. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: your first useful answers',
  summary: 'No new ideas. Prove you can turn a vague request into a useful one.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: [
    'Show you can spot what a request is missing',
    'Use Who, What, Why, How and role, goal, format together',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Checkpoint time. No new ideas today, just everything from the last four lessons, mixed up and a little harder.",
          replies: ["Let's go", 'How hard?'],
        },
        {
          tey: "Hard enough that passing means something. Quick warm-up: when an AI answer comes out generic, what's usually the real problem?",
          replies: ['The request', 'The AI tool'],
        },
        {
          tey: "The request. Every gap is a guess. Remember that and you'll be fine. Ready when you are.",
        },
      ],
    },
  ],
  apply: {
    scenario: "Checkpoint: Ada's busiest morning yet.",
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do vague requests get generic answers?',
        options: [
          { text: 'The AI fills every gap with the most likely, average guess' },
          { text: 'The AI is lazy with short requests', why: 'It is not lazy. It is guessing what you left out.' },
          { text: 'Short requests are blocked', why: 'They work, they are just vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what it covers.',
        pairs: [
          ['Who', 'The reader'],
          ['What', 'The facts'],
          ['Why', 'The goal'],
          ['How', 'Length, tone and format'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An AI tool writes the words most likely to come ... (one word)',
        answers: ['next'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the AI know this, or must Ada tell it?',
        groups: ['It knows', 'Ada must tell it'],
        items: [
          { text: 'How a thank-you note usually sounds', group: 0 },
          { text: 'Which design Lucía chose yesterday', group: 1 },
          { text: 'That the budget was cut this morning', group: 1 },
          { text: 'What bullet points are', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request will get Ada the best update for Lucía?',
        options: [
          { text: 'Write an update.', why: 'No reader, no facts, no goal, no format.' },
          { text: 'Write a professional and amazing update for a client.', why: 'Adjectives, but still no facts or goal.' },
          {
            text: 'Write a 5-line update to Lucía, our client. Sign-up screens are done; testing moved to Friday. She needs to approve the palette by Wednesday. Friendly.',
          },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem in this request.',
        lines: [
          'You are an editor who writes for busy clients.',
          'Goal: get Lucía to approve the palette.',
          'Format: whatever you think is best.',
          'Facts: testing moved to Friday.',
        ],
        bug: 2,
        fix: 'Format: five lines, one question at the end.',
        explanation: '"Whatever you think" hands the format back to a guess.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Morning! Quick: what's the status, and do you need anything from me?",
        prompt: 'Which reply should Ada send?',
        options: [
          { text: 'Sign-up is done; testing is Friday. I need one thing: your OK on the palette by Wednesday.' },
          { text: 'All good, nothing needed!', why: 'She does need the palette approved.' },
          { text: 'Lots happening, will update soon.', why: 'Lucía asked for status. This gives none.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the rule from lesson 2.',
        tiles: ['It', 'brings', 'the', 'writing,', 'you', 'bring', 'the', 'situation'],
        distractors: ['luck'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the request.',
        template: 'You are a patient [[1]]. Explain an API to a designer in [[2]] sentences with one [[3]].',
        blanks: [['teacher'], ['3', 'three'], ['example']],
        distractors: ['villain', '300', 'password'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for any AI request.',
        lines: [
          'Decide what you need the answer for',
          'Give the role and the goal',
          'Add the facts only you know',
          'Set the format and length',
          'Check the answer before you use it',
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You just passed your first Checkpoint. What will you do differently the next time you ask an AI tool for something at work?',
    starters: ['Next time I will...', 'The biggest change for me is...'],
  },
  deepen: {
    title: 'Keep going',
    summary: 'Use Who, What, Why, How plus role, goal, format on three real requests before your next lesson.',
  },
  notes: 'Review of lessons 1–4 only. No new claims.',
};

export default lesson;
