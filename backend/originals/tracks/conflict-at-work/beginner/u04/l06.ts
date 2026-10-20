import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Step-by-step: disagreeing calmly. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Disagreeing calmly',
  summary: 'Thursday at 2, Grace will sit across from Callum. She still disagrees with "just opinions". Five steps for saying "I see it differently" without a fight.',
  minutes: 12,
  outcomes: [
    'Disagree with someone senior or new, calmly',
    'Agree with what\'s true before you disagree',
    'End a disagreement with a next step',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to disagree calmly',
      steps: [
        { title: '1. Thank and clarify', body: '"Thanks for making time. Can I check I understood your concern? You\'re worried we\'d delay launch on too little evidence?"' },
        { title: '2. Agree with what\'s true', body: '"You\'re right that six sessions can\'t tell us how many patients are affected."' },
        { title: '3. Say where you see it differently', body: '"Where I see it differently is "just opinions". These are recordings of what patients did, not what they said."' },
        { title: '4. Show the evidence', body: '"And the pilot data shows the scale: 38% of over-65s drop out at step 3."' },
        { title: '5. Propose a next step', body: '"Could we test a fixed step 3 with the pilot surgery next week, and decide on the 14th with real numbers?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Thank and clarify, agree with what\'s true, say "where I see it differently", show evidence, propose a next step.',
    },
  ],
  apply: {
    scenario: 'Thursday at 2.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Thank and clarify', 'Agree with what\'s true', 'Say where you see it differently', 'Show the evidence', 'Propose a next step'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start by checking you understood their concern?',
        options: [
          { text: 'You may find the real worry is different from what you thought' },
          { text: 'To waste time', why: 'It aims your answer correctly.' },
          { text: 'To agree with them', why: 'It\'s to understand first.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Grace\'s line.',
        pairs: [
          ['Agree with what\'s true', '"Six can\'t show how many."'],
          ['See it differently', '"Where I see it differently is..."'],
          ['Evidence', '"38% of over-65s drop out."'],
          ['Next step', '"Test with the pilot surgery next week?"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm disagreement, or a fight?',
        groups: ['Calm', 'Fight'],
        items: [
          { text: '"Where I see it differently is..."', group: 0 },
          { text: '"You\'re completely wrong."', group: 1 },
          { text: '"Here\'s what the data shows."', group: 0 },
          { text: '"With all due respect..." (then an insult)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'He\'s my senior. Can I really disagree with him?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Yes. You\'re the research expert. Calm disagreement with evidence is part of your job. You\'re not challenging him; you\'re informing the decision.' },
          { text: 'No, seniors are always right.', why: 'Evidence matters more than rank.' },
          { text: 'Only if you\'re rude.', why: 'Calm and clear.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key phrase.',
        template: '"Where I see it [[1]] is..."',
        blanks: [['differently']],
        distractors: ['wrongly', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'Why end with a next step?',
        options: [
          { text: 'It turns a disagreement into a shared plan' },
          { text: 'To win the argument', why: 'It moves forward together.' },
          { text: 'It\'s optional', why: 'Without it, the disagreement just hangs.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Grace\'s plan is missing?',
        lines: [
          'Thank and clarify his concern.',
          'Say where I see it differently.',
          'Show the 38% data.',
          'Propose a test next week.',
        ],
        bug: 1,
        fix: 'Agree with what\'s true first, then say where I differ.',
        explanation: 'Agreeing first lowers his defences.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are there to disagree calmly?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Recordings of what people did, or opinions?',
        groups: ['What they did', 'Opinions'],
        items: [
          { text: 'Mrs Ahmed tapped the wrong button four times', group: 0 },
          { text: '"I think older people hate apps"', group: 1 },
          { text: '5 of 6 couldn\'t finish booking', group: 0 },
          { text: '"Step 3 feels ugly"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write how you\'d disagree with someone senior using the five steps.',
    starters: ['You\'re right that...', 'Where I see it differently is...'],
  },
  deepen: {
    title: 'Disagree and commit',
    summary: 'Many teams use "disagree and commit": say your view clearly with evidence, and once a decision is made, support it. It lets people disagree without blocking.',
  },
  notes: 'Calm-disagreement steps: synthesis from Stone & Heen (Thanks for the Feedback) and Difficult Conversations. "Disagree and commit": attributed to Intel/Andy Grove, popularised by Amazon. Fictional data.',
};

export default lesson;
