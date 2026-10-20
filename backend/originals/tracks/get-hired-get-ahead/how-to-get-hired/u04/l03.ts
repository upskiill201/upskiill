import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 3 — replying to a rejection: bitter vs. gracious. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The reply that keeps the door open',
  summary: 'The morning after his birthday, Clinton writes two replies to Brenda. One is what he feels. The other is what he sends. Here are both.',
  minutes: 11,
  outcomes: ['Write a gracious reply to a rejection', 'Ask for feedback politely', 'Keep the relationship open'],
  learn: [
    {
      kind: 'compare',
      title: 'Two replies to Brenda',
      before: { label: 'What he feels', text: '"I don\'t understand. I did everything right. I had a story for every question. Who did you hire? Can you reconsider? I really think you\'ve made a mistake."\n\nHonest feelings, but it argues, asks her to reverse a decision she can\'t reverse, and puts her on the defensive.' },
      after: { label: 'What he sends', text: '"Hi Brenda, thank you for letting me know, and for your time throughout. I\'m disappointed, but I really enjoyed meeting the team. If you have a moment, I\'d be grateful for any feedback on what I could do better. I\'d love to stay in touch, and I\'d be glad to be considered for future roles."\n\nThanks, honest disappointment, a feedback request, an open door. Four lines.' },
      notes: [
        'Thank them and accept the decision. Don\'t argue.',
        'It\'s fine to say you\'re disappointed, briefly.',
        'Ask for feedback without pressure, and say you\'d like to stay in touch.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Thank, accept, ask for feedback, keep the door open. Four lines.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his reply.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the reply in order.',
        lines: ['Thank them', 'Accept, with honest disappointment', 'Ask for feedback', 'Keep the door open'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest problem with "Can you reconsider?"',
        options: [
          { text: 'It argues with a decision she usually can\'t reverse' },
          { text: 'It\'s too short', why: 'Length isn\'t the issue.' },
          { text: 'Nothing', why: 'It puts her on the defensive.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it in the reply, or cut it?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Thank you for letting me know', group: 0 },
          { text: 'Who did you hire?', group: 1 },
          { text: 'I\'d be grateful for any feedback', group: 0 },
          { text: 'You\'ve made a mistake', group: 1 },
          { text: 'I\'d love to stay in touch', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would close the door.',
        lines: ['Thank you for your time.', 'I think your interviewers were unfair.', 'I\'d be glad to be considered for future roles.'],
        bug: 1,
        explanation: 'Blame closes doors. Thanks and a feedback request keep them open.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Is it OK to say I\'m disappointed?',
        options: [
          { text: 'Yes, briefly. "I\'m disappointed, but I enjoyed meeting the team" is honest and gracious.' },
          { text: 'No, pretend you don\'t care.', why: 'Brief honesty is fine.' },
          { text: 'Yes, a full paragraph about it.', why: 'One short phrase.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each bitter line to a gracious one.',
        pairs: [
          ['I did everything right', 'Thank you for your time throughout'],
          ['You\'ve made a mistake', 'I\'d be grateful for any feedback'],
          ['Who did you hire?', 'I\'d love to stay in touch'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Where should the "what he feels" version go?',
        options: [
          { text: 'In his notes, or to a friend, not to Brenda' },
          { text: 'To Brenda, honestly', why: 'Feelings go to friends; the gracious one goes to Brenda.' },
          { text: 'On social media', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Thank, [[1]], ask for feedback, keep the [[2]] open.',
        blanks: [['accept'], ['door']],
        distractors: ['argue', 'window', 'case'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines is Clinton\'s gracious reply? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Gracious or bitter?',
        groups: ['Gracious', 'Bitter'],
        items: [
          { text: 'I enjoyed meeting the team', group: 0 },
          { text: 'Your loss', group: 1 },
          { text: 'Thank you for letting me know', group: 0 },
          { text: 'I can\'t believe this', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a four-line gracious reply to a no you\'ve had (or might get).',
    starters: ['Thank you for...', 'I\'d be grateful for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Save a gracious-reply template on your phone, so the next time a no arrives, you don\'t have to write it while upset.',
  },
  notes: 'Gracious rejection replies are common careers advice. Feedback isn\'t always given; some employers have policies against it.',
};

export default lesson;
