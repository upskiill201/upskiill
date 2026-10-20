import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: the riskiest guess. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the riskiest guess',
  summary: 'Friday. Clinton asks ten hostel students to pay 500 FCFA for a dinner delivery. Two say yes, one actually pays, seven say the food stalls are right there. Everything from Chapter 1, put to work.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use every Chapter 1 idea on a real result', 'Decide what an early test means'],
  learn: [
    {
      kind: 'story',
      title: 'Friday night',
      beats: [
        { speaker: 'narrator', text: 'Clinton knocks on ten hostel doors in Molyko: "I\'ll bring your dinner from any stall tonight. 500 FCFA delivery, pay now on Mobile Money."' },
        { speaker: 'narrator', text: 'Two say "yes, maybe later". One pays. Seven laugh: "The stalls are two minutes away, Clinton." One adds, "Now if you could do my laundry..."' },
        { speaker: 'clinton', text: 'One out of ten. That\'s... bad, isn\'t it?' },
        { speaker: 'david', text: 'It\'s cheap. You found out in one evening, not after spending your savings.' },
        { speaker: 'miracle', text: 'And did you hear what that last student said? Write it down. That might be the most important thing you heard all week.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: excitement isn\'t evidence, the riskiest guess goes first, and doubts are information. Chapter 2: how to talk to customers so they tell you what they really need.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: the riskiest guess.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Of the ten students asked, how many actually paid?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does one paid order out of ten suggest about "students will pay 500 FCFA for delivery"?',
        options: [
          { text: 'It looks weak; most won\'t pay when the stalls are close' },
          { text: 'It\'s strongly supported', why: 'Nine of ten didn\'t pay.' },
          { text: 'Nothing at all', why: 'Real money from real students is strong evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Compliment, commitment, or doubt?',
        groups: ['Compliment', 'Commitment', 'Doubt'],
        items: [
          { text: 'Paid 500 FCFA on Mobile Money', group: 1 },
          { text: '"The stalls are two minutes away"', group: 2 },
          { text: '"Cool idea, bro"', group: 0 },
          { text: '"Yes, maybe later"', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 1 lesson to what happened on Friday.',
        pairs: [
          ['Compliments vs commitments', '"Maybe later" vs paying now'],
          ['Riskiest assumption', 'Tested first, in one evening'],
          ['Hunt for the doubters', '"The stalls are two minutes away"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Maybe I just knocked on the wrong doors. I\'ll try 100 more before I decide.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Maybe. But seven gave the same reason: the stalls are close. Listen to that, and to the laundry comment, before knocking on 100 more doors.' },
          { text: 'Yes, keep going until the numbers look good.', why: 'That\'s confirmation bias with more steps.' },
          { text: 'Quit business forever.', why: 'One test killed one assumption, not every idea.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The riskiest-assumption rule.',
        template: 'Test the guess that is worst if [[1]] and that you are least [[2]] about.',
        blanks: [['wrong'], ['sure']],
        distractors: ['right', 'excited'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Clinton write on his evidence board for "students will pay 500 FCFA for delivery"?',
        options: [
          { text: 'Killed (for now): 1 of 10 paid; 7 said the stalls are too close' },
          { text: 'Supported: someone paid', why: 'One in ten isn\'t support.' },
          { text: 'Untested', why: 'It was tested on Friday.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s Friday report is confirmation bias?',
        lines: [
          'Asked 10 hostel students; 1 paid, 2 said maybe, 7 said no.',
          'Most common reason: the stalls are two minutes away.',
          'One student asked about laundry.',
          'Conclusion: the idea works, I just need more marketing.',
        ],
        bug: 3,
        fix: 'Conclusion: paying for food delivery looks weak; explore the laundry problem.',
        explanation: 'He\'s explaining away the evidence instead of reading it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton\'s week, the way it should go.',
        lines: ['Write the idea and its assumptions', 'Score each assumption\'s risk', 'Test the riskiest one cheaply', 'Update the evidence board', 'Follow the most surprising lead'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did this cost Clinton a lot, or a little?',
        groups: ['A little', 'A lot'],
        items: [
          { text: 'Knocking on ten doors', group: 0 },
          { text: 'Hiring a developer before testing', group: 1 },
          { text: 'One evening of his time', group: 0 },
          { text: 'Spending all his savings on an app', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did the last student ask Clinton to do instead?',
        answers: ['laundry', 'do my laundry', 'their laundry', 'wash clothes'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What is the most valuable thing Clinton learned on Friday?',
        options: [
          { text: 'His riskiest guess looks wrong, cheaply, and a different problem came up' },
          { text: 'That ten doors is too few', why: 'Seven gave the same clear reason.' },
          { text: 'That he should build the app anyway', why: 'The evidence points the other way.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What is the cheapest test you could run this week on your riskiest assumption? What result would make you change your idea?',
    starters: ['My test is...', 'I\'d change my idea if...'],
  },
  notes: 'Chapter 1 challenge. Fictional Friday test: 10 hostel students asked to pre-pay 500 FCFA delivery; 1 paid, 2 "maybe later", 7 declined (stalls are close); one mentioned laundry, setting up Chapter 2.',
};

export default lesson;
