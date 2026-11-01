import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: prompt cards v5, the full kit. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Prompt cards v5',
  summary: 'Day 29, the hotel in Oaxaca. Lucía prints her whole deck on one page for Marta. Eight cards, one month. Tap through the finished kit.',
  minutes: 11,
  outcomes: [
    'Know which card to reach for in any everyday task',
    'Remember the one line that makes each card work',
    'Finish your own kit',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s deck, v5',
      text: 'MY AI DECK (v5, Day 29). #1 Plan it: what, who, when, budget; "ask me questions first". #2 Compare it: my criteria, a table, "unknown, don\'t guess". #3 Read it: "every fee, deadline and penalty, with the section number". #4 Write it with me: my draft first, "edit, don\'t rewrite". #5 Polish it: "list problems, don\'t rewrite, don\'t change names". #6 Teach me: "be my tutor, don\'t give me answers". #7 Practise with me: "you\'re [ROLE], one question at a time". #8 Untangle it: one sentence, fixed and flexible, five options, "argue against my favourite", first step, Plan B. Always: I\'m the editor. I check what matters. I protect what\'s private.',
      hotspots: [
        { phrase: '"ask me questions first"', note: 'Day 1\'s discovery: let it interview you when you don\'t know what matters.' },
        { phrase: '"unknown, don\'t guess"', note: 'The line that exposed the fake "Quiet: Yes" on Flat 2.' },
        { phrase: '"edit, don\'t rewrite"', note: 'Why the family group chat still sounds like Lucía.' },
        { phrase: '"be my tutor, don\'t give me answers"', note: 'Why she understood the distributor\'s question on Day 29.' },
        { phrase: '#8 Untangle it', note: 'The newest card: born from a double-booked venue.' },
        { phrase: '"argue against my favourite"', note: 'How La Cocina de Inés, and Mamá\'s mole, won.' },
        { phrase: 'I check what matters', note: 'From the made-up rent to the MX$400 the calculator found.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Eight cards cover almost everything in everyday life: plan, compare, read, write, polish, learn, practise, untangle.',
    },
  ],
  apply: {
    scenario: 'The finished deck.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the task to the card.',
        pairs: [
          ['Choosing between two flats', '#2 Compare it'],
          ['A long contract', '#3 Read it'],
          ['A cancelled venue', '#8 Untangle it'],
          ['Learning Portuguese', '#6 Teach me'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which card would Lucía use to rehearse asking Carmen for a day off after the party?',
        options: [
          { text: '#3 Read it', why: 'Nothing to read.' },
          { text: '#7 Practise with me' },
          { text: '#2 Compare it', why: 'Nothing to compare.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Card #4 "Write it with me", or #5 "Polish it"?',
        groups: ['#4 Write it with me', '#5 Polish it'],
        items: [
          { text: 'Turning notes into the speech', group: 0 },
          { text: 'A last typo check on the speech', group: 1 },
          { text: 'A thank-you message from rough notes', group: 0 },
          { text: 'Checking a letter without changing names', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'If I could only keep one card, which one?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'None. Just ask it things.', why: 'That\'s how she got "have fun".' },
          { text: '#1 Plan it, because it has the recipe and the interview trick, and almost everything starts with a plan.' },
          { text: 'The one with the most brackets.', why: 'Brackets aren\'t the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three "always" lines.',
        template: 'I\'m the [[1]]. I check what [[2]]. I protect what\'s private.',
        blanks: [['editor'], ['matters']],
        distractors: ['boss', 'rhymes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Tomás\'s copy of the deck is wrong?',
        lines: [
          '#6 Teach me: "just give me the answers, faster".',
          '#2 Compare it: my criteria, a table.',
          '#8 Untangle it: one sentence, fixed and flexible.',
        ],
        bug: 0,
        fix: '"Be my tutor, don\'t give me answers."',
        explanation: 'Answers-first is the crutch from the 2024 study.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many cards are in Lucía\'s deck? (A number.)',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt uses card #8 well for a cancelled flight?',
        options: [
          { text: 'My flight home is cancelled. Fixed: I must be at work Monday 9 a.m., budget about MX$3,000. Flexible: route, airport, bus or plane. Give me 5 options, then my first step in the next hour and a Plan B.' },
          { text: 'Flight cancelled!!!', why: 'Panic gets stress tips.' },
          { text: 'Which airline is best?', why: 'Not the problem she has.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the cards as Lucía earned them.',
        lines: ['#1 Plan it', '#2 Compare it', '#4 Write it with me', '#6 Teach me', '#8 Untangle it'],
      },
      {
        kind: 'mcq',
        prompt: 'What turned Lucía\'s month from a disaster into a deck?',
        options: [
          { text: 'A paid AI subscription', why: 'Every card works with any tool.' },
          { text: 'Luck', why: 'It was a method.' },
          { text: 'Saving every prompt that worked, and the checks that kept it right' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own prompt cards from this course. Which one will you use this week, and for what?',
    starters: ['This week I\'ll use... for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Put your whole deck on one page in your notes app: eight cards, with your own brackets, banned words and checks. Pin it where you\'ll see it.',
  },
  notes: 'Prompt cards v5 (fictional). Final state of the running device.',
};

export default lesson;
