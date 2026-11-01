import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Before/After: the buried ask vs the ask first. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Buried ask vs ask first',
  summary: 'Zanele\'s email to Mr Kamau, before and after BLUF. Same facts, same length. One ends in "?"; the other ends in "Yes."',
  minutes: 11,
  outcomes: [
    'Rewrite a message to lead with the ask',
    'Keep the same facts in a better order',
    'Make the decision obvious',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The June decision email',
      before: {
        label: 'Ask buried',
        text: 'Subject: Pilot update\n"Dear Mr Kamau, the Saturday pilot has now run for three weeks. Late deliveries have fallen from 34% to 21%, and refunds have fallen too. The two Saturday drivers are on contracts ending 31 May. The Saturday crew costs KES 120,000 a month. Would it be possible to consider continuing into June?"',
      },
      after: {
        label: 'Ask first',
        text: 'Subject: Decision needed by Friday: keep the Saturday pilot in June?\n"Dear Mr Kamau, please could you approve keeping the Saturday pilot running in June, including two driver contracts to 30 June?\nWhy: late deliveries are down from 34% to 21%.\nCost: KES 120,000 a month.\nIf you reply yes by Friday, June rotas go out on Monday.\nZanele"',
      },
      notes: [
        'The subject line says it\'s a decision, and when.',
        '"Would it be possible to consider..." becomes "please could you approve...". Clear, still polite.',
        'Same facts. Better order.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Same facts, better order: the ask in the subject and first line, then why, cost and next.',
    },
  ],
  apply: {
    scenario: 'The June decision.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'From the buried version or the ask-first version?',
        groups: ['Buried', 'Ask first'],
        items: [
          { text: 'Subject: "Pilot update"', group: 0 },
          { text: 'Subject: "Decision needed by Friday"', group: 1 },
          { text: '"Would it be possible to consider..."', group: 0 },
          { text: '"Please could you approve..."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the new subject line tell Mr Kamau before he opens it?',
        options: [
          { text: 'Nothing new', why: 'It carries the decision.' },
          { text: 'That the pilot failed', why: 'It asks for a decision.' },
          { text: 'That a decision is needed, what it is, and by when' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague ask to the clear one.',
        pairs: [
          ['"Would it be possible to consider..."', '"Please could you approve..."'],
          ['"At some point"', '"By Friday"'],
          ['"Any thoughts?"', '"Yes or no?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: '"Please could you approve" feels bossy to my boss\'s boss.',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'It\'s polite and clear. "Would it be possible to consider" makes him do the work of finding out what you want.' },
          { text: 'Yes, make it vaguer.', why: 'Vague asks get vague replies.' },
          { text: 'Write "Approve this."', why: 'Clear and polite together.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'Same [[1]], better [[2]].',
        blanks: [['facts'], ['order']],
        distractors: ['fonts', 'words'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the buried version, which line number (out of six sentences) holds the ask?',
        answers: ['6', 'six', 'last'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the buried version risk a "?" reply?',
        options: [
          { text: 'It had wrong numbers', why: 'The numbers were the same.' },
          { text: 'It was rude', why: 'It was polite but unclear.' },
          { text: 'He might stop reading before the ask' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens the ask-first email?',
        lines: [
          'Please could you approve keeping the pilot in June?',
          'Why: late deliveries are down from 34% to 21%.',
          'But no pressure, whenever you have a moment, if you agree.',
          'If yes by Friday, rotas go out Monday.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It undoes the deadline and the clarity.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the ask-first email.',
        lines: ['Subject with the decision and date', 'The ask', 'Why', 'Cost', 'What happens next'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear ask, or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: '"Please approve by Friday."', group: 0 },
          { text: '"Let me know your thoughts."', group: 1 },
          { text: '"Reply yes or no."', group: 0 },
          { text: '"Happy to discuss sometime."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Find a vague ask in your sent emails ("any thoughts?"). Rewrite it as a clear one.',
    starters: ['Vague:...', 'Clear:...'],
  },
  deepen: {
    title: 'Polite and clear',
    summary: '"Please could you..." is polite in most cultures. Politeness lives in tone and thanks, not in hiding what you want.',
  },
  notes: 'Fictional email; figures from earlier lessons.',
};

export default lesson;
