import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Chat with Tey: what's right in it? */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What\'s right in it?',
  summary: 'Grace\'s first instinct is to prove Callum completely wrong. Tey suggests a harder, smarter question: what part of this might be right? The answer makes her case stronger.',
  minutes: 12,
  outcomes: [
    'Find the useful part in unfair criticism',
    'Use research to answer a fair question',
    'Strengthen your case by taking criticism seriously',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ignore the "just opinions" bit for a moment. What\'s the real question inside Callum\'s comment?', replies: ['Whether six people is enough?'] },
        { tey: 'Right. And that has an answer. Jakob Nielsen and Tom Landauer\'s research suggested that small usability tests, around five users, find most of the problems. Six is a normal number for this kind of study.', replies: ['So he\'s wrong?'] },
        { tey: 'About "just opinions", yes. But he\'s right that six people can\'t tell you how many patients are affected. For that you need usage data.', replies: ['Do we have that?'] },
        { tey: 'The pilot surgery data: 38% of patients over 65 drop out at step 3, against 12% of younger patients. Six sessions showed why; the data shows how many. Together, it\'s far stronger than either alone.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask "what might be right in this?" Answering the fair part often makes your case stronger, not weaker.',
    },
  ],
  apply: {
    scenario: 'The fair part.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was the fair question inside Callum\'s comment?',
        options: [
          { text: 'Whether Grace is qualified', why: 'That\'s not a fair question here.' },
          { text: 'Whether research matters', why: 'He asked about sample size.' },
          { text: 'Whether six people can show how big the problem is' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Nielsen and Landauer\'s research suggested small usability tests of about how many users find most problems?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What percentage of patients over 65 drop out at step 3 in the pilot data?',
        answers: ['38', '38%'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the evidence to what it shows.',
        pairs: [
          ['Six usability sessions', 'Why patients get stuck'],
          ['Pilot usage data', 'How many patients are affected'],
          ['Both together', 'A strong case to fix step 3'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'If I admit he has a point, won\'t I look weak?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'You\'ll look like a researcher. Admitting six can\'t show scale, then adding data that does, makes you look stronger.' },
          { text: 'Yes, never admit anything.', why: 'Taking the fair part seriously builds credibility.' },
          { text: 'Agree with everything he said.', why: 'Only the fair part.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: '"What might be [[1]] in this?"',
        blanks: [['right', 'true', 'useful']],
        distractors: ['wrong', 'rude'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Right or wrong in Callum\'s comment?',
        groups: ['Right', 'Wrong'],
        items: [
          { text: 'Six can\'t show how many are affected', group: 0 },
          { text: 'It\'s "just opinions"', group: 1 },
          { text: 'We need data before delaying a launch', group: 0 },
          { text: 'Small tests are useless', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What percentage of younger patients drop out at step 3?',
        answers: ['12', '12%'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s draft reply ignores the fair part?',
        lines: [
          'You\'re right that six sessions can\'t show scale.',
          'The pilot data shows 38% of over-65s drop out at step 3.',
          'So your concern about sample size was completely baseless.',
          'Together, they make a strong case to fix it.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'She just agreed it wasn\'t baseless.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to use the fair part of criticism.',
        lines: ['Set aside the sting', 'Find the real question', 'Answer it with evidence', 'Show how it strengthens the case'],
      },
    ],
  },
  reflect: {
    prompt: 'For criticism you\'ve had, what might be right in it? How could answering that part help you?',
    starters: ['What might be right is...', 'Answering it would...'],
  },
  deepen: {
    title: 'Why five users?',
    summary: 'Nielsen and Landauer modelled how many usability problems each extra tester reveals. Most problems show up with the first few users; later testers mostly repeat them. Large surveys answer different questions.',
  },
  notes: 'Nielsen & Landauer (1993), "A mathematical model of the finding of usability problems", Proceedings of INTERCHI \'93; Nielsen (2000), "Why you only need to test with 5 users". Fictional pilot data: 38% of over-65s vs 12% of under-65s drop out at step 3.',
};

export default lesson;
