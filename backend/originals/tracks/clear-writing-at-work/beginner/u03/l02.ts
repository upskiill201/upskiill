import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: BLUF. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Bottom line up front',
  summary: 'Mrs Achieng learned it from a retired army officer who once ran the CEO\'s office: BLUF, bottom line up front. Four steps for any message that needs a decision or action.',
  minutes: 12,
  outcomes: [
    'Structure a message with BLUF',
    'Put the decision or answer first',
    'Add only the context the reader needs',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'BLUF in four steps',
      steps: [
        { title: '1. Bottom line', body: 'The decision, answer or ask, in one sentence. "Please approve keeping the Saturday pilot running in June, plus two driver contracts."' },
        { title: '2. Why', body: 'One or two sentences of reason. "Late deliveries are down from 34% to 21%, and refunds have fallen with them."' },
        { title: '3. What it costs or changes', body: '"It costs KES 120,000 a month for the Saturday crew. Contracts would run to 30 June."' },
        { title: '4. What happens next', body: '"If you reply yes by Friday, Mrs Mwangi will send June rotas on Monday."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'BLUF: bottom line, why, cost or change, what happens next.',
    },
  ],
  apply: {
    scenario: 'BLUF.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the BLUF steps.',
        lines: ['Bottom line', 'Why', 'What it costs or changes', 'What happens next'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its BLUF step.',
        pairs: [
          ['"Please approve keeping the pilot in June."', 'Bottom line'],
          ['"Late deliveries down from 34% to 21%."', 'Why'],
          ['"KES 120,000 a month."', 'Cost'],
          ['"Rotas go out Monday."', 'Next'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does BLUF stand for?',
        options: [
          { text: 'Brief letters use few words', why: 'Bottom line up front.' },
          { text: 'Bottom line up front' },
          { text: 'Big lists up front', why: 'Bottom line up front.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much does the Saturday crew cost each month, in KES?',
        answers: ['120000', '120,000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'What if he needs more background to decide?',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'Put all the background first.', why: 'Then the ask gets buried.' },
          { text: 'Never give background.', why: 'Give it second.' },
          { text: 'Give the background after the bottom line, or attach it. He\'ll read on if he needs to; he\'ll stop if he doesn\'t.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four steps.',
        template: 'Bottom line, [[1]], cost or change, what happens [[2]].',
        blanks: [['why'], ['next']],
        distractors: ['who', 'before'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Bottom line or background?',
        groups: ['Bottom line', 'Background'],
        items: [
          { text: '"Please approve June."', group: 0 },
          { text: '"The pilot began in April."', group: 1 },
          { text: '"Yes or no by Friday."', group: 0 },
          { text: '"Data cleaning took three days."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include "what happens next"?',
        options: [
          { text: 'To fill space', why: 'It closes the loop.' },
          { text: 'It shows the reader the effect of their decision' },
          { text: 'To threaten them', why: 'It\'s information.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line is in the wrong place in this BLUF email?',
        lines: [
          'The pilot started on 1 April after the March analysis.',
          'Please approve keeping it running in June.',
          'Late deliveries are down from 34% to 21%.',
          'If yes by Friday, rotas go out Monday.',
        ],
        bug: 0,
        fix: 'Delete it, or move it to the end.',
        explanation: 'Background before the bottom line.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Until what date would the contracts run? (day and month, e.g. 15 July)',
        answers: ['30 June', '30 june', 'June 30', '30'],
        placeholder: 'A date',
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite a recent request using BLUF: bottom line, why, cost, next.',
    starters: ['Bottom line:...', 'Why:...'],
  },
  deepen: {
    title: 'Where BLUF comes from',
    summary: 'BLUF is used in military writing, where a busy commander must act on a message fast. Many companies now teach it for the same reason.',
  },
  notes: 'BLUF (bottom line up front): US military writing guidance (e.g. US Army Regulation 25-50, Preparing and Managing Correspondence). Fictional figures: KES 120,000/month Saturday crew; contracts to 30 June.',
};

export default lesson;
