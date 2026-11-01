import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: delegating to Tomás (match freedom to experience; situational leadership). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Delegating to Tomás',
  summary: 'Lucía wants Tomás to run the launch email, start to finish. Part of her wants to do it herself. Part of her wants to throw it at him and run. Tey: "Neither. Let\'s talk."',
  minutes: 11,
  outcomes: [
    'Delegate the result, not just the steps',
    'Match how much freedom you give to how experienced someone is',
    'Agree check-ins without micromanaging',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Why give Tomás the launch email?',
          replies: ['I don\'t have time to do it myself.', 'He wants to learn and grow.'],
        },
        {
          tey: "Both are good reasons. The second is the better one. Delegating isn't just getting work off your plate. It's how people grow. Remember Chapter 1: \"I'll just do it myself\" keeps your team small.",
          replies: ['So I just hand it over?'],
        },
        {
          tey: "Not quite. How much freedom to give depends on how experienced they are with THIS task. Researchers Paul Hersey and Ken Blanchard called this situational leadership: someone new to a task needs more direction; someone experienced needs room. Tomás has never done a launch email. Diego has done fifty.",
          replies: ['So with Tomás, more direction?'],
        },
        {
          tey: 'More direction at the start, and fewer check-ins over time. Use your five steps: what, why, what done looks like, by when, how much freedom. Then agree check-ins: "Show me the subject line by Tuesday, the draft by Thursday." That\'s support, not micromanaging.',
          replies: ['And if he gets it wrong?'],
        },
        {
          tey: "He might get part of it wrong. That's the learning. Your job is to make mistakes cheap: catch them at the check-ins, not after 12,000 people get the email. And give the credit to him when it works.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Delegate the result. New to the task: more direction and check-ins. Experienced: more room. Catch mistakes early. Give the credit away.',
    },
  ],
  apply: {
    scenario: 'Tey and Lucía, delegating the launch email.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the best reason to delegate the launch email to Tomás?',
        options: [
          { text: 'Lucía doesn\'t like emails', why: 'Not a leadership reason.' },
          { text: 'It helps him grow' },
          { text: 'To have someone to blame if it fails', why: 'Definitely not.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'More direction, or more room?',
        groups: ['More direction', 'More room'],
        items: [
          { text: 'Tomás, first launch email', group: 0 },
          { text: 'Diego, fiftieth launch email', group: 1 },
          { text: 'Sofía, first time using the new tool', group: 0 },
          { text: 'Marta, social calendar she\'s done for years', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Wait, I\'m doing the WHOLE launch email? What if I mess it up?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'We\'ll check the subject line Tuesday and the draft Thursday, so nothing goes out wrong. I think you\'ll be great.' },
          { text: 'Don\'t mess it up.', why: 'Pressure without support.' },
          { text: 'Okay, I\'ll do it then.', why: 'Takes away his chance to grow.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Matching how you lead to how experienced someone is: ___ leadership. (one word)',
        answers: ['situational', 'Situational'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What makes check-ins support rather than micromanaging?',
        options: [
          { text: 'They happen every hour', why: 'That\'s micromanaging.' },
          { text: 'They\'re agreed in advance and fit how new the person is to the task' },
          { text: 'They\'re a surprise', why: 'Surprises feel like inspections.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea.',
        pairs: [
          ['Hersey and Blanchard', 'Situational leadership'],
          ['Check-ins', 'Make mistakes cheap'],
          ['Credit', 'Give it away'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s delegation plan. Which line breaks it?',
        lines: [
          'Tomás owns the launch email, start to finish.',
          'I\'ll rewrite it myself the night before, just in case.',
          'Check-ins: subject Tuesday, draft Thursday.',
        ],
        bug: 1,
        fix: 'If it needs changes, I\'ll tell him at Thursday\'s check-in.',
        explanation: 'Secretly redoing delegated work takes the ownership, and the learning, away.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put delegating well in order.',
        lines: ['Pick the task and the person', 'Brief with the five steps', 'Agree check-ins', 'Give the credit when it works'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'New to it: more [[1]]. Experienced: more [[2]].',
        blanks: [['direction', 'support'], ['room', 'freedom']],
        distractors: ['rules', 'pressure'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Lucía says at launch.',
        tiles: ['Tomás', 'wrote', 'this', 'one.'],
        distractors: ['I'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you could hand to someone else (at work, school or home). How experienced are they with it? How much direction would they need?',
    starters: ['I could hand over...', 'They\'d need...'],
  },
  deepen: {
    title: 'Delegate one result',
    summary: 'This week, hand someone a whole result (not just a step). Agree two check-ins. Then give them the credit.',
  },
  notes: 'Paul Hersey & Ken Blanchard, Situational Leadership model (1969, "Life Cycle Theory of Leadership"; later SLII): adapt directive vs supportive behaviour to follower readiness for the specific task. Delegation as development: Project Oxygen coaching behaviour.',
};

export default lesson;
