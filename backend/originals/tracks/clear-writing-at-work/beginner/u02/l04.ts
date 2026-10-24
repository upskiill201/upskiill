import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Step-by-step: active voice and short sentences. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Active voice, short sentences',
  summary: '"It has been decided that Saturday shifts will be allocated by the depot management team." Who decided? Who allocates? Mrs Achieng shows Zanele two habits that fix sentences like this.',
  minutes: 12,
  outcomes: [
    'Write in the active voice',
    'Keep sentences short',
    'Know when the passive voice is fine',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to clear sentences',
      steps: [
        { title: '1. Find who does what', body: '"It has been decided that shifts will be allocated..." Who decided? Mr Kamau. Who allocates? Mrs Mwangi, the depot manager.' },
        { title: '2. Put the doer first', body: '"Mrs Mwangi will give out Saturday shifts." Active voice: doer, action, thing.' },
        { title: '3. One idea per sentence', body: 'Split sentences that do two or three jobs. "...and drivers will be paid time and a half, which will be reflected in May payslips" becomes two sentences.' },
        { title: '4. Aim for 15 to 20 words on average', body: 'Plain-language guides often suggest this average. Mix short and medium; avoid 40-word monsters.' },
        { title: '5. Use the passive on purpose', body: 'It\'s fine when the doer doesn\'t matter or is unknown: "The depot was built in 1998."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Doer first, one idea per sentence, about 15 to 20 words on average, and the passive only when the doer doesn\'t matter.',
    },
  ],
  apply: {
    scenario: 'Clear sentences.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Find who does what', 'Put the doer first', 'One idea per sentence', 'Aim for 15 to 20 words on average', 'Use the passive on purpose'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Active or passive?',
        groups: ['Active', 'Passive'],
        items: [
          { text: '"Mrs Mwangi will give out shifts."', group: 0 },
          { text: '"Shifts will be allocated."', group: 1 },
          { text: '"Mr Kamau approved the pilot."', group: 0 },
          { text: '"It has been decided."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "It has been decided that..."?',
        options: [
          { text: 'It\'s too short', why: 'It hides the doer.' },
          { text: 'It hides who decided' },
          { text: 'Nothing', why: 'Readers want to know who.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the passive to its active version.',
        pairs: [
          ['"Shifts will be allocated by Mrs Mwangi."', '"Mrs Mwangi will give out shifts."'],
          ['"The pilot was approved by Mr Kamau."', '"Mr Kamau approved the pilot."'],
          ['"Data will be sent by Emeka."', '"Emeka will send the data."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Is the passive voice always wrong?',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Always wrong.', why: 'It has uses.' },
          { text: 'Always better.', why: 'It often hides the doer.' },
          { text: 'No. Use it when the doer doesn\'t matter or is unknown. Use active when readers need to know who does what.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Active voice.',
        template: 'Put the [[1]] first: doer, [[2]], thing.',
        blanks: [['doer'], ['action']],
        distractors: ['date', 'adjective'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the top of the suggested average sentence length, in words?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which passive sentence is fine as it is?',
        options: [
          { text: '"It has been decided that you will work Saturdays."', why: 'Readers need to know who decided.' },
          { text: '"The depot was built in 1998."' },
          { text: '"Mistakes were made."', why: 'Hides who; often a dodge.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in the notice does too many jobs?',
        lines: [
          'The depot opens on Saturdays from 6 May.',
          'Mrs Mwangi will send rotas by Wednesday.',
          'Saturday work, which will be voluntary in May and paid at time and a half, which will show on May payslips, starts at 7 a.m.',
          'Questions? Call Mrs Mwangi.',
        ],
        bug: 2,
        fix: 'Saturday work starts at 7 a.m. It\'s voluntary in May. It pays time and a half, on May payslips.',
        explanation: 'Three ideas in one sentence.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Doer clear, or hidden?',
        groups: ['Doer clear', 'Doer hidden'],
        items: [
          { text: '"Felix fixed the export."', group: 0 },
          { text: '"The export was fixed."', group: 1 },
          { text: '"Zanele will run April\'s numbers."', group: 0 },
          { text: '"Numbers will be run."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Find three passive sentences in something you wrote. Rewrite them with the doer first.',
    starters: ['Before:...', 'After:...'],
  },
  deepen: {
    title: 'Why the passive hides things',
    summary: '"Mistakes were made" is famous because it avoids saying who made them. When responsibility matters, active voice is clearer and more honest.',
  },
  notes: 'Average sentence length 15–20 words: Plain English Campaign guidance (How to Write in Plain English). Active vs passive: standard plain-language guidance. Fictional: Mrs Mwangi, depot manager (narrated); depot built 1998.',
};

export default lesson;
