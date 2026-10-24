import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: questions to ask them. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Questions to ask them',
  summary: 'At the end of every interview: "Do you have any questions for us?" Remi\'s plan is "No, I\'m good." Tey explains why that\'s a missed chance, and which questions work.',
  minutes: 12,
  outcomes: [
    'Prepare good questions to ask an interviewer',
    'Avoid questions that send the wrong message',
    'Use questions to learn if you want the job',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '"No, I\'m good" ends the interview flat. A good question shows interest, and helps you decide if you want the job.', replies: ['What makes a good question?'] },
        { tey: 'It\'s about the work or the team, and you couldn\'t answer it from the website. "What would a great first month look like for an intern?" is a classic.', replies: ['More?'] },
        { tey: '"What\'s the biggest challenge for the team right now?" And one from your research: "Have you thought about a Swahili option for shop owners?"', replies: ['Any to avoid?'] },
        { tey: 'Anything you could have Googled, and, early on, "How much holiday do I get?" Ask about pay and conditions at the offer stage instead.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Bring two or three questions about the work or the team that you couldn\'t answer from the website.',
    },
  ],
  apply: {
    scenario: 'Any questions for us?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good question to ask, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: '"What would a great first month look like?"', group: 0 },
          { text: '"What does your company do?"', group: 1 },
          { text: '"What\'s the team\'s biggest challenge now?"', group: 0 },
          { text: '"How many days off do I get?" (first interview)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "No, I\'m good" a missed chance?',
        options: [
          { text: 'It\'s rude', why: 'Polite, but a wasted opportunity.' },
          { text: 'It ends flat and misses a chance to show interest and learn about the job' },
          { text: 'It isn\'t', why: 'Questions help both sides.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it tells Remi.',
        pairs: [
          ['"A great first month?"', 'What success looks like'],
          ['"Biggest challenge now?"', 'What the team is struggling with'],
          ['"Swahili for shop owners?"', 'How they think about users'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'When can I ask about pay?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'First thing in the screen.', why: 'Usually better later, unless they raise it.' },
          { text: 'Never.', why: 'You should ask before accepting.' },
          { text: 'If they raise it, answer. Otherwise, the offer stage is the natural time to ask about pay and conditions.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test for a good question.',
        template: 'It\'s about the work or the [[1]], and you couldn\'t answer it from the [[2]].',
        blanks: [['team'], ['website']],
        distractors: ['salary', 'interviewer'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions should Remi bring? (Type the smaller number of the range.)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do good questions help Remi too, not just the interviewer?',
        options: [
          { text: 'They help him decide if he actually wants the job' },
          { text: 'They don\'t', why: 'Interviews go both ways.' },
          { text: 'They let him leave early', why: 'They give him information.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Remi\'s planned questions should he drop?',
        lines: [
          'What would a great first month look like?',
          'What\'s the team\'s biggest challenge right now?',
          'So what exactly does Mtaa Labs do?',
          'Have you thought about Swahili for shop owners?',
        ],
        bug: 2,
        fix: 'How do you test features with shop owners?',
        explanation: 'He should already know what they do.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to end an interview well.',
        lines: ['Ask your two or three questions', 'Listen to the answers', 'Thank them', 'Ask about next steps'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask now, or at the offer stage?',
        groups: ['Now', 'Offer stage'],
        items: [
          { text: 'What the team works on', group: 0 },
          { text: 'Pay details', group: 1 },
          { text: 'How success is measured', group: 0 },
          { text: 'Holiday allowance', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write three questions you\'d ask at the end of an interview for a job you want.',
    starters: ['1.', '2.', '3.'],
  },
  deepen: {
    title: 'Interviews go both ways',
    summary: 'You\'re also deciding whether you want to work there. Answers about challenges, first months and how success is measured tell you a lot about the team.',
  },
  notes: 'Common career guidance on candidate questions; timing of pay questions varies by country and employer.',
};

export default lesson;
