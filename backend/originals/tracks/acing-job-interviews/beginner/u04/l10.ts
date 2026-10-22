import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: second place. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: second place',
  summary: 'Mtaa Labs calls: "You were very close. We chose someone with React Native." Remi asks for feedback, handles it well, and leaves the door open. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use hard-question skills and handle a near miss', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The call',
      html: '<p>Wanjiru: <em>"You were our second choice, and it was close. The other candidate had shipped a React Native app. Your coding approach in round two was really good: you thought out loud and got to a good solution."</em></p><p>Remi: <em>"Thank you, that\'s really helpful. Could I ask what I could have done better?"</em></p><p>Wanjiru: <em>"Two things. Your weakness answer was a bit rehearsed at first; the deadline story was much better. And when Mr Njoroge asked personal questions, you handled it well. He shouldn\'t have asked."</em></p><p>Remi: <em>"Thanks. If anything opens up later, I\'d love to be considered. I\'m going to build something in React Native this month anyway."</em></p><p>Wanjiru: <em>"Send it to me when you do."</em></p>',
    },
    {
      kind: 'story',
      title: 'That evening',
      beats: [
        { speaker: 'remi', text: 'Second place. And she wants to see my React Native app.' },
        { speaker: 'ada', text: 'That\'s a door, not a wall. And Synergix assessment day is Monday.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: thinking out loud, weaknesses, salary, crossed lines, tricky questions. Next: the final round.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: second place.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Mtaa Labs choose the other candidate?',
        options: [
          { text: 'They had shipped a React Native app' },
          { text: 'Remi\'s coding was poor', why: 'Wanjiru said it was really good.' },
          { text: 'Remi was rude', why: 'He handled it well.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feedback to the Chapter 4 lesson.',
        pairs: [
          ['"You thought out loud"', 'Thinking out loud'],
          ['"Weakness answer was rehearsed at first"', 'A real weakness'],
          ['"You handled the personal questions well"', 'Questions that shouldn\'t be asked'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to a near miss, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'Thank them and ask what to improve', group: 0 },
          { text: '"React Native is overrated anyway."', group: 1 },
          { text: 'Ask to be considered for future roles', group: 0 },
          { text: 'Go silent and never reply', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Second place feels worse than a clear no.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, give up on startups.', why: 'He was close.' },
          { text: 'It hurts, but it means you\'re nearly there, and you know exactly what to work on. That\'s a gift before Synergix.' },
          { text: 'Argue with their choice.', why: 'Accept it gracefully.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Leaving the door open.',
        template: '"If anything opens up [[1]], I\'d love to be [[2]]."',
        blanks: [['later'], ['considered']],
        distractors: ['never', 'ignored'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day is the Synergix assessment day?',
        answers: ['Monday', 'monday'],
        placeholder: 'A day',
      },
      {
        kind: 'mcq',
        prompt: 'What made Remi\'s weakness answer better in the end?',
        options: [
          { text: 'Saying he was a perfectionist', why: 'That sounded rehearsed.' },
          { text: 'Skipping it', why: 'The real story worked.' },
          { text: 'The real deadline story with what he changed' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s reply to Wanjiru would close the door?',
        lines: [
          'Thank you, that\'s really helpful.',
          'Could I ask what I could have done better?',
          'Honestly, I think you made the wrong choice.',
          'I\'d love to be considered if anything opens up.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Arguing with a decision burns the bridge.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill is this?',
        groups: ['Hard questions', 'After the interview'],
        items: [
          { text: 'Thinking out loud on duplicates', group: 0 },
          { text: 'Asking for feedback', group: 1 },
          { text: 'A researched salary range', group: 0 },
          { text: 'Offering to share his new app', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Remi\'s response to the call.',
        lines: ['Thank her', 'Ask what to improve', 'Accept the decision', 'Leave the door open', 'Plan the React Native app'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a near miss you\'ve had. What could you have asked, and how could you have left the door open?',
    starters: ['I nearly got...', 'I could have asked...'],
  },
  deepen: {
    title: 'Near misses become offers',
    summary: 'Companies often go back to strong runners-up when roles open again. A gracious response to a near miss is one of the smartest things you can do.',
  },
  notes: 'Chapter 4 challenge (fictional): Mtaa Labs chooses a candidate with React Native; feedback on think-aloud and weakness answer; Wanjiru invites Remi to share his app.',
};

export default lesson;
