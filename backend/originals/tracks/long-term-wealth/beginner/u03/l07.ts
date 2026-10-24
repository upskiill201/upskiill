import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: what long-term investing means. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'What "long-term investing" actually means',
  summary: 'Miracle hears "invest" and pictures traders shouting at screens. Folake\'s version is much quieter. Tey explains, in plain words, what long-term investing is, without telling you what to buy.',
  minutes: 12,
  outcomes: [
    'Explain the main kinds of long-term investments in plain words',
    'Understand why spreading money out matters',
    'Know the questions to ask before investing',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'When people say "long-term investing", they usually mean putting money into things that can grow over many years. Three main kinds. Want them?', replies: ['Yes, plainly please.'] },
        { tey: 'One: owning small pieces of businesses (shares or stocks). If businesses grow and make profits, your piece can grow. In some years they fall a lot. Two: lending money to governments or companies (bonds). Usually steadier, usually slower.', replies: ['And three?'] },
        { tey: 'Three: real things like property. Can grow, but costs a lot to start, is hard to sell quickly, and has running costs. Many people also use funds, which pool lots of people\'s money to buy many shares or bonds at once.', replies: ['Which is best?'] },
        { tey: 'There\'s no single best. What most long-term savers do is spread money across many things, so one bad result doesn\'t sink them. And they think in decades, not months.', replies: ['What should I ask before investing?'] },
        { tey: 'Five questions. What exactly am I buying? What are all the fees? How easily can I get my money out? What could go wrong, and how bad? Who is regulated to sell me this? If any answer is vague, stop.', replies: ['Where do I learn more?'] },
        { tey: 'The course How to Understand Investment Risk goes deeper. And for your own situation, an independent, qualified, regulated adviser. Not a cousin with a tip.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'General principles only, not advice on what to buy. Spread money out, think in decades, check fees, and only use regulated providers. If an answer is vague, stop.',
    },
  ],
  apply: {
    scenario: 'Investing, plainly.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of investment to what it is.',
        pairs: [
          ['Shares', 'Small pieces of businesses'],
          ['Bonds', 'Lending to governments or companies'],
          ['Property', 'Real buildings or land'],
          ['Funds', 'Pooled money buying many things at once'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do most long-term savers spread money across many things?',
        options: [
          { text: 'To pay more fees', why: 'Spreading isn\'t about fees.' },
          { text: 'So one bad result doesn\'t sink them' },
          { text: 'It\'s the law', why: 'It\'s wise, not required.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five questions before investing.',
        lines: ['What exactly am I buying?', 'What are all the fees?', 'How easily can I get my money out?', 'What could go wrong?', 'Is the seller regulated?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Usually steadier, or usually bumpier?',
        groups: ['Usually steadier', 'Usually bumpier'],
        items: [
          { text: 'Government bonds', group: 0 },
          { text: 'Shares in a single small company', group: 1 },
          { text: 'A savings account', group: 0 },
          { text: 'Crypto coins', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Which investment should I buy?',
        prompt: 'What\'s the honest answer in this course?',
        options: [
          { text: 'This course can\'t tell you that. It can teach you the questions. For your own plan, use a regulated, independent adviser.' },
          { text: 'Buy shares in one company.', why: 'No specific advice, and one company is a concentrated bet.' },
          { text: 'Ask your cousin.', why: 'A tip isn\'t advice.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule for vague answers.',
        template: 'If any answer is [[1]], [[2]].',
        blanks: [['vague'], ['stop']],
        distractors: ['clear', 'buy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sign should make Miracle stop?',
        lines: [
          'The fees are written clearly.',
          'The provider is regulated.',
          'The seller won\'t say what the money is actually invested in.',
        ],
        bug: 2,
        fix: 'Walk away until you know exactly what you\'re buying.',
        explanation: 'If you can\'t find out what you own, you can\'t judge the risk.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do property investments have extra risks?',
        options: [
          { text: 'They never grow', why: 'They can grow; the risks are cost and selling.' },
          { text: 'Big starting cost, hard to sell quickly, running costs' },
          { text: 'They have no risks', why: 'All investments have risks.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions should you ask before investing? (A number.)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How do long-term investors think about time?',
        options: [
          { text: 'In days', why: 'That\'s trading, not long-term investing.' },
          { text: 'It doesn\'t matter', why: 'Time is the key ingredient.' },
          { text: 'In decades, not months' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If someone offered you an investment tomorrow, which of the five questions would you ask first?',
    starters: ['I\'d ask...', 'Because...'],
  },
  deepen: {
    title: 'Check the regulator',
    summary: 'Most countries have a regulator for investment providers (for example a securities and exchange commission). Before investing, check the provider is registered with it. Unregistered "investment" schemes are a common route to scams. The Scams course covers this.',
  },
  notes: 'General descriptions of asset classes; no products, no personal advice (playbook §9). Nigeria: SEC Nigeria; Ghana: SEC Ghana; stated generally.',
};

export default lesson;
