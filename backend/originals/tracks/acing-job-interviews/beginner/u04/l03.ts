import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Chat with Tey: weaknesses and failures. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'A real weakness',
  summary: '"I\'m a perfectionist" got a polite smile. Tey helps Remi find a real weakness, one that\'s true, not fatal for the job, and getting better.',
  minutes: 12,
  outcomes: [
    'Choose an honest, safe weakness',
    'Show what you\'re doing about it',
    'Avoid fake and fatal weaknesses',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A good weakness answer has three parts: a real weakness, an example, and what you\'re doing about it.', replies: ['What\'s a real one for me?'] },
        { tey: 'You told me: you\'re too relaxed about deadlines. You start late and rush at the end. That\'s real, and it\'s fixable.', replies: ['Won\'t that scare them?'] },
        { tey: 'Not if you show the fix: "Since my exam-week scramble, I break projects into weekly goals and tell a friend my deadline. My last two projects were done early."', replies: ['What should I avoid?'] },
        { tey: 'Fake ones ("I work too hard"), and fatal ones for this job. For a developer role, "I don\'t like learning new tools" would be fatal. Pick something real that you\'re actively improving.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Weakness answer: a real weakness, a short example, what you\'re doing about it, and the improvement so far.',
    },
  ],
  apply: {
    scenario: 'A real weakness.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a strong weakness answer.',
        lines: ['Name a real weakness', 'Give a short example', 'Say what you\'re doing about it', 'Show the improvement so far'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real and safe, fake, or fatal for a developer role?',
        groups: ['Real and safe', 'Fake', 'Fatal'],
        items: [
          { text: '"I start projects late and rush"', group: 0 },
          { text: '"I care too much"', group: 1 },
          { text: '"I don\'t like learning new tools"', group: 2 },
          { text: '"I\'m not yet confident presenting"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a weakness answer convincing?',
        options: [
          { text: 'Evidence that you\'re actively improving it' },
          { text: 'Making the weakness sound like a strength', why: 'That\'s the fake version.' },
          { text: 'Saying you have none', why: 'Not believable.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Remi\'s line.',
        pairs: [
          ['Weakness', '"I\'m too relaxed about deadlines."'],
          ['Example', '"My exam-week scramble."'],
          ['Fix', '"Weekly goals and a friend who checks."'],
          ['Improvement', '"Last two projects done early."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'What about "tell me about a failure"? Same thing?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Similar shape: a real failure, your part in it, what you did, what you changed. Your hackathon story is ready.' },
          { text: 'Say you\'ve never failed.', why: 'Not believable.' },
          { text: 'Blame your team.', why: 'Ownership matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Avoid two kinds.',
        template: 'Avoid [[1]] weaknesses and ones that are [[2]] for the job.',
        blanks: [['fake'], ['fatal']],
        distractors: ['real', 'small'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of Remi\'s recent projects were done early?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'For a customer-service job, which weakness would be fatal?',
        options: [
          { text: '"I don\'t enjoy talking to people."' },
          { text: '"I\'m still learning spreadsheets."', why: 'Fixable and not central.' },
          { text: '"I over-prepare for presentations."', why: 'Not fatal for that job.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line spoils Remi\'s weakness answer?',
        lines: [
          'I can be too relaxed about deadlines.',
          'In exam week I left a fix to the last night.',
          'But honestly, it\'s not really a problem.',
          'Now I set weekly goals, and my last two projects were early.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It takes back the honesty.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a good answer, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'A specific example', group: 0 },
          { text: 'A long apology', group: 1 },
          { text: 'What you\'re doing about it', group: 0 },
          { text: 'A joke to dodge it', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own weakness answer: real, not fatal for the job, with an example and your fix.',
    starters: ['My weakness:...', 'What I\'m doing:...'],
  },
  deepen: {
    title: 'Self-awareness',
    summary: 'The weakness question is really about self-awareness: do you notice your own patterns and work on them? That\'s what predicts growth on the job.',
  },
  notes: 'Weakness-answer structure is common careers advice. Remi\'s trait (relaxed about deadlines) from CAST.md.',
};

export default lesson;
