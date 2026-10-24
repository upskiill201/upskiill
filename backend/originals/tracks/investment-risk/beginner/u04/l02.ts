import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: layers of diversification. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Layers of spreading',
  summary: 'Diversification isn\'t one step; it\'s layers, like redundancy in a system. Step by step, from one company to a properly spread pot.',
  minutes: 11,
  outcomes: [
    'Explain the layers of diversification',
    'See which risks each layer reduces',
    'Know what diversification can\'t remove',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From one basket to many',
      steps: [
        { title: 'Layer 0: one company', body: 'Everything depends on one business. A scandal or bad results can halve it, or wipe it out.' },
        { title: 'Layer 1: many companies', body: 'Dozens or hundreds of companies. One failing barely matters. Company risk falls sharply.' },
        { title: 'Layer 2: many industries', body: 'Not just tech: banks, food, health, energy, manufacturing. A bad year for one industry is softened by others.' },
        { title: 'Layer 3: different kinds of asset', body: 'Some shares, some bonds, some cash. Bonds often (not always) fall less than shares in a bad year.' },
        { title: 'Layer 4: different countries', body: 'Some money linked to economies beyond India. A bad year at home may be a better year elsewhere, though big crises often hit everywhere.' },
        { title: 'Layer 5: over time', body: 'Adding a set amount every month means buying at many different prices, not betting on one day.' },
        { title: 'What\'s left', body: 'Market risk remains: in a global crisis, most things fall together. Diversification makes falls smaller and failures survivable. It doesn\'t make falls impossible.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Spread across companies, industries, kinds of asset, countries and time. Each layer removes a different single point of failure. Market risk remains.',
    },
  ],
  apply: {
    scenario: 'Layers of spreading.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the layers.',
        lines: ['One company', 'Many companies', 'Many industries', 'Different kinds of asset', 'Different countries'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each layer to the risk it reduces.',
        pairs: [
          ['Many companies', 'One company failing'],
          ['Many industries', 'One industry having a bad year'],
          ['Different countries', 'One economy struggling'],
          ['Adding monthly', 'Bad timing on one day'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What risk can diversification NOT remove?',
        options: [
          { text: 'One company failing', why: 'Diversification greatly reduces that.' },
          { text: 'Market risk in a global crisis' },
          { text: 'One industry slumping', why: 'Spreading across industries helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which layer is this?',
        groups: ['Across companies or industries', 'Across assets, countries or time'],
        items: [
          { text: 'Owning banks, food and health companies', group: 0 },
          { text: 'Some bonds as well as shares', group: 1 },
          { text: 'Adding a set amount monthly', group: 1 },
          { text: 'Owning hundreds of companies', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'This sounds like redundancy in a system.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Exactly. Each layer removes a single point of failure. You still can\'t stop a power cut across the whole city.' },
          { text: 'Not at all.', why: 'It\'s a good analogy.' },
          { text: 'Redundancy means no failures ever.', why: 'Market-wide falls still happen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What\'s left.',
        template: 'Diversification makes falls [[1]] and failures [[2]].',
        blanks: [['smaller'], ['survivable']],
        distractors: ['impossible', 'bigger'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement overclaims?',
        lines: [
          'Many companies reduce one-company risk.',
          'Bonds often fall less than shares in a bad year.',
          'A well-spread pot never falls.',
        ],
        bug: 2,
        fix: 'A well-spread pot can still fall in a crisis.',
        explanation: 'Market risk remains.',
      },
      {
        kind: 'mcq',
        prompt: 'Why add money monthly rather than all at once?',
        options: [
          { text: 'It guarantees profit', why: 'Nothing guarantees profit.' },
          { text: 'It spreads your buying over many prices instead of one day' },
          { text: 'It avoids fees', why: 'It\'s about timing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many layers above "one company" are in the lesson (not counting "what\'s left")?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Do bonds always fall less than shares in a bad year?',
        options: [
          { text: 'Always', why: 'Sometimes both fall together.' },
          { text: 'Never', why: 'They often fall less.' },
          { text: 'Often, but not always' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'How many of these layers does your money have today?',
    starters: ['My money has...', 'The layer I\'m missing is...'],
  },
  deepen: {
    title: 'Home bias',
    summary: 'People everywhere tend to invest mostly in their own country, often more than makes sense for spreading risk. It\'s called home bias. Some money linked to other economies can reduce dependence on one.',
  },
  notes: 'Standard diversification layers. Bonds/shares correlation varies over time (e.g. 2022 both fell); hedged.',
};

export default lesson;
