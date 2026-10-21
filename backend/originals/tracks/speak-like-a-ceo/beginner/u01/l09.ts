import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: talk card v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Talk card v1',
  summary: 'Lucía writes a small card she checks before she speaks. Five lines so far. Tap each one.',
  minutes: 11,
  outcomes: [
    'Make your own talk card',
    'Link each check to a lesson',
    'Use it before your next update',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s talk card v1',
      text: '1. Headline in one sentence, said first. 2. Why it matters, and what I need. 3. Three points at most, numbered out loud. 4. Answer first, then the reason. 5. Pause instead of um, then stop.',
      hotspots: [
        { phrase: 'Headline in one sentence', note: 'Lesson 1: the four-minute update.' },
        { phrase: 'what I need', note: 'Lesson 2: your point in 30 seconds.' },
        { phrase: 'Three points at most', note: 'Lesson 4: the rule of three.' },
        { phrase: 'Answer first', note: 'Lessons 6 and 7: answer first, and PREP.' },
        { phrase: 'Pause instead of um', note: 'Lesson 3: what "um" really does.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Talk card v1: headline first, why and what I need, three points, answer first, pause and stop.',
    },
  ],
  apply: {
    scenario: 'Talk card v1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Headline first', 'The four-minute update'],
          ['Three points at most', 'The rule of three'],
          ['Pause instead of um', 'What "um" really does'],
          ['Answer first', 'Answer first'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on talk card v1?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the checks as written.',
        lines: ['Headline first', 'Why and what I need', 'Three points', 'Answer first', 'Pause, then stop'],
      },
      {
        kind: 'mcq',
        prompt: 'When should Lucía use the card?',
        options: [
          { text: 'Just before she speaks, and after, with a recording' },
          { text: 'Only once a year', why: 'Before each update.' },
          { text: 'Never: memorise it and forget it', why: 'Use it every time for now.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes talk card v1, or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: '"Three things. First..."', group: 0 },
          { text: 'Seven points, unnumbered', group: 1 },
          { text: '"Probably not. Four weeks of stock."', group: 0 },
          { text: '"So, background first..."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Could I use your card? I freeze in meetings too.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Yes. Start with check 1: write your headline before the meeting. Knowing your first line helps the most.' },
          { text: 'No, it\'s just for me.', why: 'It works for anyone.' },
          { text: 'Only if you memorise all five first.', why: 'Start with one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 5.',
        template: '[[1]] instead of um, then [[2]].',
        blanks: [['Pause'], ['stop']],
        distractors: ['Shout', 'apologise'],
      },
      {
        kind: 'findBug',
        prompt: 'Tomás\'s update fails which check?',
        lines: [
          'Headline: the email beat its target.',
          'I need two more days for the report.',
          'Points one to eight are as follows...',
          'That\'s it.',
        ],
        bug: 2,
        fix: 'Three things. First...',
        explanation: 'Eight points fails check 3.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check number is "answer first"?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does check 2 add to the headline?',
        options: [
          { text: 'Why it matters, and what I need' },
          { text: 'A joke', why: 'Why and what I need.' },
          { text: 'All the background', why: 'Why and what I need.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own talk card v1 on paper or your phone. Use it before your next meeting.',
    starters: ['My card says...'],
  },
  deepen: {
    title: 'A card, not a script',
    summary: 'A talk card holds reminders, not words. Scripts make you read; cards keep you talking to people.',
  },
  notes: 'Talk card v1 (checks 1 to 5).',
};

export default lesson;
