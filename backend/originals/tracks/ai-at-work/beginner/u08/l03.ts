import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 3 — telling a story with slides. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Telling a story with slides',
  summary: 'Seven good slides in the wrong order is still a confusing talk. Ada uses a simple story shape that works for almost any business presentation.',
  minutes: 12,
  outcomes: [
    'Use situation, problem, answer, ask',
    'Order slides so each leads to the next',
    'Ask AI to check the story flows',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Situation, problem, answer, ask',
      steps: [
        { title: '1. Situation', body: 'What everyone agrees on. "Small shops in Accra take payments in cash and three different apps."' },
        { title: '2. Problem', body: 'Why that\'s a problem, or an opportunity. "Shops told us it\'s slow and fees are confusing."' },
        { title: '3. Answer', body: 'What you did and what happened. "We piloted with 50 shops. Payments grew by half in four weeks."' },
        { title: '4. Ask', body: 'What you want them to decide. "Approve a second market in month 2."' },
        { title: '5. Check the flow', body: 'Ask AI: "Read just my slide titles in order. Does each one lead to the next? Where would a founder get lost?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Situation, problem, answer, ask. Read only the titles in order: if they tell the story, the talk works.',
    },
  ],
  apply: {
    scenario: 'Ada orders her founders\' slides.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the story shape.',
        lines: ['Situation', 'Problem', 'Answer', 'Ask'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the story is this?',
        groups: ['Situation or problem', 'Answer or ask'],
        items: [
          { text: 'Shops use cash and three apps', group: 0 },
          { text: 'Payments grew by half in four weeks', group: 1 },
          { text: 'Fees confuse shop owners', group: 0 },
          { text: 'Approve a second market', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best checks the story?',
        options: [
          { text: 'Is my deck good?', why: 'Invites "yes".' },
          { text: 'Here are my 7 slide titles in order. Does each lead to the next? Where would a busy founder get lost?' },
          { text: 'Add more slides.', why: 'Not a story check.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which slide is in the wrong place?',
        lines: [
          '1. Shops juggle cash and three apps',
          '2. Approve a second market',
          '3. Shops say fees are confusing',
          '4. Payments grew by half in four weeks',
        ],
        bug: 1,
        fix: 'Move it to the end.',
        explanation: 'The ask comes after the answer.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Shouldn\'t you start with the results? They\'re impressive.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I\'ll put the headline on slide 1, then a quick situation and problem, so the results land harder. The ask is last.' },
          { text: 'No, results always go last.', why: 'A headline up front helps busy founders.' },
          { text: 'Results don\'t matter.', why: 'They\'re the heart of it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the shape.',
        template: 'Situation, [[1]], answer, [[2]].',
        blanks: [['problem'], ['ask']],
        distractors: ['lunch', 'goodbye'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Ada\'s slide.',
        pairs: [
          ['Situation', 'Shops juggle cash and three apps'],
          ['Problem', 'Fees are confusing and slow'],
          ['Answer', 'Payments grew by half'],
          ['Ask', 'Approve a second market'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s ask slide title.',
        tiles: ['Approve', 'a', 'second', 'market', 'in', 'month', '2'],
        distractors: ['maybe'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does the story shape have?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good flow test, or not?',
        groups: ['Good test', 'Not a test'],
        items: [
          { text: 'Read only the titles in order', group: 0 },
          { text: 'Check the colours match', group: 1 },
          { text: 'Ask where a founder would get lost', group: 0 },
          { text: 'Count the slides', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why read only the titles?',
        options: [
          { text: 'If the titles alone tell the story, the talk will be easy to follow' },
          { text: 'To save time', why: 'It tests the structure.' },
          { text: 'Founders only read titles', why: 'It\'s a test of flow.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Where should the ask go?',
        options: [
          { text: 'At the end, after the evidence' },
          { text: 'On slide 2', why: 'Too early; they need the evidence first.' },
          { text: 'Nowhere', why: 'Without an ask, nothing gets decided.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write the four parts for your next presentation in one sentence each.',
    starters: ['Situation:', 'Ask:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste your slide titles into AI and ask where a busy listener would get lost.' },
  notes: 'Situation-complication-resolution is from Barbara Minto\'s Pyramid Principle; "ask" added for decision meetings.',
};

export default lesson;
