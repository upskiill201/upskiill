import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: the email from Savanna Bank. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the rejection email',
  summary: 'Savanna Bank writes back: "We won\'t be moving forward." Remi is gutted. Then he does something smart: he asks for feedback, and rebuilds his answer for Mtaa Labs. Everything from Chapter 1.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Learn from a rejection', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The email, and the reply',
      html: '<p><strong>Savanna Bank:</strong> <em>"Thank you for your time. We won\'t be moving forward with your application on this occasion."</em></p><p><strong>Remi\'s reply</strong> (after Ada\'s advice): <em>"Thank you for letting me know, and for the call. If you have a moment, I\'d be grateful for one thing I could improve in future interviews."</em></p><p><strong>Two days later:</strong> <em>"Your experience was relevant, but your opening answer was long and we didn\'t get to your examples. Shorter answers would help."</em></p><p>Remi rebuilds his card for Mtaa Labs: a 60-second answer that ends on their product, a delivery-tracking app for small shops.</p>',
    },
    {
      kind: 'story',
      title: 'Friday',
      beats: [
        { speaker: 'remi', text: 'They said my experience was relevant! I just buried it.' },
        { speaker: 'ada', text: 'That\'s the best rejection you could get. Fixable. Mtaa Labs is Tuesday.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: stages, what they check, present-past-future, relevance. Next: research.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: the rejection.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Savanna Bank\'s feedback say?',
        options: [
          { text: 'He wasn\'t qualified', why: 'They said his experience was relevant.' },
          { text: 'Nothing useful', why: 'It was very useful.' },
          { text: 'His experience was relevant, but his opening answer was too long' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good reply to a rejection, or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: 'Thank them and ask for one improvement', group: 0 },
          { text: '"Your loss."', group: 1 },
          { text: 'A polite, short message', group: 0 },
          { text: 'Asking them to reconsider three times', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Should I even bother asking for feedback? It\'s embarrassing.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No, never ask.', why: 'One polite ask can be very useful.' },
          { text: 'Ask politely for one thing. Many won\'t answer, but when they do, it\'s gold. Savanna Bank\'s answer just fixed your next interview.' },
          { text: 'Demand a full report.', why: 'One thing, politely.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 1 lesson to the idea.',
        pairs: [
          ['Four minutes', 'Tell me about yourself = fit'],
          ['How interviews work', 'Each stage checks something'],
          ['What interviewers look for', 'Five questions in disguise'],
          ['Present, past, future', 'About a minute'],
          ['Structured interviews', 'Give evidence they can score'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s feedback request.',
        template: '"I\'d be grateful for [[1]] thing I could [[2]] in future interviews."',
        blanks: [['one'], ['improve']],
        distractors: ['ten', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days later did Savanna Bank reply with feedback?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'For Mtaa Labs, what should Remi\'s answer end on?',
        options: [
          { text: 'Why their delivery-tracking app interests him' },
          { text: 'Why he wanted the bank job', why: 'Tailor it to Mtaa Labs.' },
          { text: 'His childhood', why: 'End on this employer.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s new answer for Mtaa Labs is wrong?',
        lines: [
          'I\'m a final-year computer science student.',
          'I built a booking app 120 people use weekly.',
          'I really wanted Savanna Bank, but this is fine too.',
          'Your delivery-tracking app for small shops is exactly what I want to build.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Never tell an employer they\'re your second choice.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of his new answer?',
        groups: ['Present', 'Past', 'Future'],
        items: [
          { text: 'Final-year student', group: 0 },
          { text: 'Booking app', group: 1 },
          { text: 'Mtaa Labs\' delivery app', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Remi\'s steps after the rejection.',
        lines: ['Feel gutted (briefly)', 'Thank them', 'Ask for one improvement', 'Read the feedback', 'Rebuild the card'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a rejection you\'ve had. What could you have asked to learn from it?',
    starters: ['I was turned down for...', 'I could have asked...'],
  },
  deepen: {
    title: 'Rejection is data',
    summary: 'Most people need several interviews before an offer. Each rejection, especially with feedback, is a chance to improve one thing before the next.',
  },
  notes: 'Chapter 1 challenge (fictional): Savanna Bank rejection; feedback: opening answer too long. Mtaa Labs builds a delivery-tracking app for small shops; interview on Tuesday.',
};

export default lesson;
