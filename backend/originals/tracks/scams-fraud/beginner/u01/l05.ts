import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Jayden\'s test',
  summary: 'Jayden decides to test his mum. He sends her three made-up messages from his own phone to see if she spots the recipe. Check what you know about impersonation, the four ingredients, hot thinking and the pause.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot the scam recipe', 'Use the pause'],
  learn: [
    {
      kind: 'story',
      title: 'The test',
      beats: [
        { speaker: 'jayden', text: 'Three messages. One\'s fine. Two are scams. Go.' },
        { speaker: 'grace', text: 'Urgency, authority, emotion, secrecy. You\'re going to regret this, love.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: how scams work.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Jayden\'s three messages: scam or fine?',
        groups: ['Scam', 'Fine'],
        items: [
          { text: '"Parcel held. Pay £1.99 within 2 hours: [link]"', group: 0 },
          { text: '"Dinner at 7? I\'ll bring pudding x" from Nan\'s saved number', group: 1 },
          { text: '"Your account is frozen. Don\'t tell staff. Call this number"', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ingredient to an example.',
        pairs: [
          ['Urgency', '"Within 2 hours"'],
          ['Authority', '"This is your bank"'],
          ['Emotion', '"Your son needs help"'],
          ['Secrecy', '"Don\'t tell staff"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the right way to check a "Hi Mum" text from a new number?',
        options: [
          { text: 'Call the person on the number you already have' },
          { text: 'Reply to the new number', why: 'That\'s the scammer\'s channel.' },
          { text: 'Pay a small amount to test', why: 'Never test with money.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Okay, you got all three. But what if you\'re really tired?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'I\'d still spot it.', why: 'Tiredness is when hot thinking wins.' },
          { text: 'Then I\'d just pay.', why: 'The pause is for those moments.' },
          { text: 'That\'s exactly when the sticky note matters. Stop, challenge, protect, every time.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pause.',
        template: 'Stop, [[1]], [[2]].',
        blanks: [['challenge'], ['protect']],
        distractors: ['pay', 'reply'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the UK, which number can you call to reach many banks safely?',
        answers: ['159'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Scams push people into fast, emotional thinking.',
          'Real organisations will wait while you check.',
          'If a message knows your name, it must be genuine.',
        ],
        bug: 2,
        fix: 'Names are easy to find; they prove nothing.',
        explanation: 'Scammers often have your name from leaks or social media.',
      },
      {
        kind: 'mcq',
        prompt: 'A message has urgency and secrecy. What\'s the right reaction?',
        options: [
          { text: 'Do what it says quickly', why: 'Two ingredients: slow down.' },
          { text: 'Slow down and check through a trusted channel' },
          { text: 'Reply asking if it\'s real', why: 'Check through your own channel.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to cool down hot thinking.',
        lines: ['Notice the feeling', 'Stop', 'Read it again slowly', 'Check through a trusted channel'],
      },
      {
        kind: 'mcq',
        prompt: 'Which message was fine, and why?',
        options: [
          { text: 'Nan\'s dinner text: saved number, no money, no pressure' },
          { text: 'The parcel text, because it\'s cheap', why: 'Small amounts are still scams.' },
          { text: 'The bank text, because banks are official', why: 'It said "don\'t tell staff".' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Could you test someone in your family the way Jayden tested Grace (kindly)? What would you send?',
    starters: ['I\'d send...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4. Nan narrated.',
};

export default lesson;
