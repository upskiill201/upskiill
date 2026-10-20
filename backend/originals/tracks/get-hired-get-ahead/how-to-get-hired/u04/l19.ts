import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 19 — the learner's resilience plan (kit piece 4). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your resilience plan',
  summary: 'Your turn. A one-page plan for the next time you hear "no", written while you\'re calm, so you don\'t have to think straight when you\'re not.',
  minutes: 12,
  outcomes: ['Write a one-page plan for handling rejection', 'Prepare your replies in advance', 'Set up habits that keep you moving'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 4: your resilience plan',
      steps: [
        { title: '1. My 48 hours', body: 'My "no reply for 24 hours" rule. My one person to call. My one normal thing (a walk, football, cooking).' },
        { title: '2. My gracious reply', body: 'A four-line template: thank, accept, ask for feedback, keep the door open.' },
        { title: '3. My facts list', body: 'Three facts about my proof, to read when the harsh voice is loud. "Eleven drivers use my tool."' },
        { title: '4. My momentum habits', body: 'Several doors open at once. A weekly routine. An actions list I tick off.' },
        { title: '5. My review and my help line', body: 'The five-line "what I learned" note after every process. And: if low feelings last for weeks, who I\'ll talk to.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write it while you\'re calm. Read it when you\'re not.',
    },
  ],
  apply: {
    scenario: 'You write your resilience plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the plan in order.',
        lines: ['My 48 hours', 'My gracious reply', 'My facts list', 'My momentum habits', 'My review and my help line'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the plan while you\'re calm?',
        options: [
          { text: 'So you don\'t have to think straight when you\'re upset' },
          { text: 'Calm people write longer plans', why: 'It\'s for the moment you\'re not calm.' },
          { text: 'No reason', why: 'You won\'t think clearly while hurting.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the plan?',
        groups: ['48 hours', 'Momentum habits'],
        items: [
          { text: 'One person to call', group: 0 },
          { text: 'A weekly routine', group: 1 },
          { text: 'No reply for 24 hours', group: 0 },
          { text: 'Several doors open', group: 1 },
          { text: 'One normal thing', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner says they don\'t need a plan because they never get upset. What do you say?',
        options: [
          { text: 'Great, but write it anyway. It takes ten minutes, and it\'s there if you ever need it.' },
          { text: 'Then skip it.', why: 'It\'s cheap insurance.' },
          { text: 'Everyone cries, admit it.', why: 'No need. Just write it anyway.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak facts-list entry.',
        lines: ['Eleven drivers use my tool.', 'I\'m amazing.', 'Mr Tamba will be my reference.'],
        bug: 1,
        explanation: 'Facts beat compliments. Use evidence.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to an example.',
        pairs: [
          ['Gracious reply', 'Thank, accept, ask, keep the door open'],
          ['Facts list', 'Eleven drivers use my tool'],
          ['Review', 'Worked, didn\'t, changing, keeping, next'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What goes in the "help line" part?',
        options: [
          { text: 'Who you\'ll talk to if low feelings last for weeks' },
          { text: 'A job hotline', why: 'It\'s about support for you.' },
          { text: 'Nothing', why: 'Include who you\'d talk to.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Write it while you\'re [[1]]. Read it when you\'re [[2]].',
        blanks: [['calm'], ['not']],
        distractors: ['angry', 'asleep', 'busy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines is the gracious-reply template? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the plan, or not?',
        groups: ['In the plan', 'Not in it'],
        items: [
          { text: 'My one person to call', group: 0 },
          { text: 'An angry reply template', group: 1 },
          { text: 'An actions list', group: 0 },
          { text: 'A list of people to blame', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the first part of your plan now: your rule, your one person, your one normal thing.',
    starters: ['My rule:', 'My one person:'],
  },
  deepen: {
    title: 'Your kit, piece 4',
    summary: 'Finish your one-page resilience plan. Save it on your phone where you\'ll find it on a bad day.',
  },
  notes: 'Kit piece 4 of How to Get Hired. Keep the help-line part in any revision.',
};

export default lesson;
