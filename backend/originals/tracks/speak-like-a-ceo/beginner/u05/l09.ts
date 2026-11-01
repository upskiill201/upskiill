import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: talk card v5. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Talk card v5',
  summary: 'The last five checks, for questions and the big day. Lucía\'s talk card is complete: 25 checks. Tap each new one.',
  minutes: 11,
  outcomes: [
    'Add Q&A and big-day checks to your card',
    'Link each check to a lesson',
    'Use the full card for your next talk',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s talk card v5',
      text: 'Checks 1 to 20, plus: 21. Ten dreaded questions, each practised out loud? 22. Listen, repeat, answer first, short, check? 23. Tough question: acknowledge, one fact, bridge? 24. Don\'t know: say so, share what I know, follow up? 25. Slides frozen, room checked, and "they can\'t see it as much as I feel it"?',
      hotspots: [
        { phrase: 'Ten dreaded questions', note: 'Lesson 1: Carmen\'s list.' },
        { phrase: 'repeat, answer first', note: 'Lesson 2: answering a question.' },
        { phrase: 'acknowledge, one fact, bridge', note: 'Lesson 3: the tough question.' },
        { phrase: 'Don\'t know', note: 'Lesson 4: "I don\'t know".' },
        { phrase: 'they can\'t see it', note: 'Lessons 6 and 7: the illusion of transparency and the last week.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v5 adds: dreaded questions, five-step answers, tough questions, honest "don\'t know", and big-day prep.',
    },
  ],
  apply: {
    scenario: 'Talk card v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Ten dreaded questions', 'Carmen\'s list'],
          ['Acknowledge, fact, bridge', 'The tough question'],
          ['Say so, follow up', '"I don\'t know"'],
          ['They can\'t see it', 'The illusion of transparency'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on the finished talk card?',
        answers: ['25', 'twenty-five', 'twenty five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['Dreaded questions', 'Five-step answers', 'Tough questions', 'Don\'t know', 'Big-day prep'],
      },
      {
        kind: 'mcq',
        prompt: 'Which check is new on v5?',
        options: [
          { text: '"I am excited", then my first line?', why: 'That was v4.' },
          { text: 'Tough question: acknowledge, one fact, bridge?' },
          { text: 'One message, short enough to repeat?', why: 'That was v3.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes v5 or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: '"Fair question. Same method as our last three launches."', group: 0 },
          { text: '"That\'s really unfair!"', group: 1 },
          { text: '"I don\'t know yet; forecast by end of October."', group: 0 },
          { text: 'A made-up number', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: '25 checks? I can\'t remember 25 things on stage.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Read them all on stage.', why: 'They\'re for preparing.' },
          { text: 'Skip the card.', why: 'Use it to prepare.' },
          { text: 'You don\'t, on stage. You use them while preparing. On stage you just need your first line and your message.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 24.',
        template: 'Say so, share what I [[1]], [[2]] up.',
        blanks: [['know'], ['follow']],
        distractors: ['guess', 'give'],
      },
      {
        kind: 'findBug',
        prompt: 'Sofía\'s Q&A prep fails which check?',
        lines: [
          'Practised ten dreaded questions out loud.',
          'Repeat each question before answering.',
          'If attacked, attack back.',
          'Slides frozen on Monday.',
        ],
        bug: 2,
        fix: 'Acknowledge, one fact, bridge.',
        explanation: 'Check 23: stay calm with tough questions.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check number covers "I don\'t know"?',
        answers: ['24', 'twenty-four', 'twenty four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What do you need on stage, if not all 25 checks?',
        options: [
          { text: 'Your first line and your message' },
          { text: 'A full script', why: 'First line and message.' },
          { text: 'Nothing at all', why: 'First line and message.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Save your full talk card. Which five checks matter most for you?',
    starters: ['My five are...'],
  },
  deepen: {
    title: 'A card for every talk',
    summary: 'A two-minute update needs checks 1 to 5. A leadership meeting adds 6 to 10. A big talk uses all 25. Pick what fits the moment.',
  },
  notes: 'Talk card v5 (checks 21 to 25), complete card of 25.',
};

export default lesson;
