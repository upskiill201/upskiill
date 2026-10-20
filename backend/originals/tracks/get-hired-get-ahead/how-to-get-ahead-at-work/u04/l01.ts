import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 1 — opens the chapter: "Where do you want to be in three years?" Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Three years from now?"',
  summary: 'Month nine. Over lunch, Paul asks Clinton a question nobody has asked him before: "Where do you want to be in three years?" Clinton opens his mouth. Nothing comes out.',
  minutes: 11,
  outcomes: ['Notice when you\'re drifting instead of choosing', 'Respond honestly to a big career question', 'Start exploring instead of guessing'],
  learn: [
    {
      kind: 'story',
      title: 'Lunch with Paul',
      beats: [
        { speaker: 'narrator', text: 'Month nine. Newly promoted. Lunch with Paul at the ndolé place downstairs.' },
        { speaker: 'paul', text: 'So, Developer. Where do you want to be in three years?' },
        { speaker: 'clinton', text: 'Er... Senior Developer? I guess? Or... I don\'t actually know.' },
        { speaker: 'paul', text: 'Most people don\'t. Most people just take the next thing that\'s offered. That\'s fine, until it isn\'t.' },
        { speaker: 'tey', text: 'Not knowing is normal. Drifting is optional. A career plan isn\'t a prediction; it\'s a set of choices you can update.' },
      ],
      choice: {
        prompt: 'What should Clinton do with Paul\'s question?',
        options: [
          {
            text: 'Admit he doesn\'t know yet, and spend a few weeks finding out what he actually enjoys and values.',
            outcome: 'Paul nods: "Good answer. Come back and tell me what you find." Clinton starts noticing what gives him energy at work.',
            best: true,
          },
          {
            text: 'Make up an impressive answer: "CTO by 25."',
            outcome: 'Paul raises an eyebrow. "Why?" Clinton has no answer, and the plan has nothing behind it.',
          },
          {
            text: 'Decide it doesn\'t matter and keep taking whatever comes next.',
            outcome: 'Comfortable for now. But in three years he may find himself somewhere he never chose.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not knowing is normal. Drifting is optional. A plan is a set of choices you can update.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> what a career plan is, noticing what gives you energy, your values, exploring options, choosing skills to build, handling family expectations, and reviewing your plan. Your kit piece: a one-page career plan.</p>',
    },
  ],
  apply: {
    scenario: 'Paul\'s question.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a career plan, according to Tey?',
        options: [
          { text: 'A set of choices you can update' },
          { text: 'A prediction you must follow exactly', why: 'It\'s updatable choices.' },
          { text: 'A list of job titles', why: 'Choices, not just titles.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Choosing, or drifting?',
        groups: ['Choosing', 'Drifting'],
        items: [
          { text: 'Noticing what gives him energy', group: 0 },
          { text: 'Taking whatever comes next, always', group: 1 },
          { text: 'Talking to people in other roles', group: 0 },
          { text: 'Making up an impressive title', group: 1 },
          { text: 'Writing down what he values', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best reply to Paul.',
        from: 'paul',
        message: 'Where do you want to be in three years?',
        options: [
          { text: '"Honestly, I don\'t know yet. I\'m going to spend a few weeks finding out what I enjoy most. Can I come back to you?"' },
          { text: '"CTO by 25."', why: 'Impressive, but nothing behind it.' },
          { text: '"Doesn\'t matter."', why: 'It does, eventually.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the plan with nothing behind it.',
        lines: ['Find out what gives me energy.', 'Become CTO by 25 because it sounds good.', 'Talk to three people in other roles.'],
        bug: 1,
        explanation: 'A goal chosen to impress, with no reason, rarely guides real choices.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Paul say most people do?',
        options: [
          { text: 'Take the next thing that\'s offered' },
          { text: 'Have a detailed ten-year plan', why: 'Most just take what\'s next.' },
          { text: 'Change careers every year', why: 'Most take what\'s offered.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Admit it and explore', 'Starts noticing what he enjoys'],
          ['Make up "CTO by 25"', 'No answer to "Why?"'],
          ['Keep drifting', 'Somewhere he never chose'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s line.',
        template: 'Not knowing is [[1]]. Drifting is [[2]].',
        blanks: [['normal'], ['optional']],
        distractors: ['failure', 'required', 'forever'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many years ahead did Paul ask about? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton notice first?',
        options: [
          { text: 'What gives him energy at work' },
          { text: 'Which title sounds best', why: 'Energy and values first.' },
          { text: 'What others want for him', why: 'Start with what he enjoys.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest answer, or performance?',
        groups: ['Honest', 'Performance'],
        items: [
          { text: 'I don\'t know yet', group: 0 },
          { text: 'CTO by 25', group: 1 },
          { text: 'I\'m going to find out', group: 0 },
          { text: 'Whatever sounds impressive', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where do you want to be in three years? If you don\'t know, what would help you find out?',
    starters: ['In three years...', 'To find out, I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For one week, write down at the end of each day: one task that gave you energy, one that drained you.',
  },
  notes: 'Opens L3 Ch4 (founder topic: How to Build a Career Development Plan). Outline: Paul asks "Where do you want to be in three years?" Ndolé is a Cameroonian dish.',
};

export default lesson;
