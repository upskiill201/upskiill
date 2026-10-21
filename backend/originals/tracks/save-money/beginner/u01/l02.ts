import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: "you can't save on a small income". */
const lesson: OriginalLesson = {
  key: 'l02',
  title: '"You can\'t save on a small income"',
  summary: 'Kofi\'s first thought: "Saving is for people with money." Then Miracle reminds him she saved her first laptop on a student stipend. Five myths about saving with little, tested.',
  minutes: 10,
  outcomes: [
    'Bust five myths about saving on a low income',
    'See why small amounts matter',
    'Know what actually makes saving work',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You can\'t save anything on a small income.',
          isFact: false,
          explain: 'Myth. It\'s harder, and the amounts are smaller. But people on low incomes around the world save all the time, through savings groups, susu, piggy banks and accounts. The habit matters more than the size.',
        },
        {
          text: 'Small amounts saved regularly add up to large amounts.',
          isFact: true,
          explain: 'Fact. GH₵20 a week is GH₵1,040 a year. Most of Kofi\'s savings in Budgeting for Beginners came from steady GH₵200 months.',
        },
        {
          text: 'You should only start saving once your income goes up.',
          isFact: false,
          explain: 'Myth. When income rises, spending usually rises too. People who already have the habit are the ones who save the raise.',
        },
        {
          text: 'Having even a small amount of savings can reduce money stress.',
          isFact: true,
          explain: 'Fact. Surveys in many countries link having a cushion, even a small one, to lower financial stress. A little slack makes the tunnel wider.',
        },
        {
          text: 'Saving means never enjoying anything.',
          isFact: false,
          explain: 'Myth. Kofi still has a fun line. Saving is choosing what matters most, not giving up everything.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Miracle\'s first laptop',
      beats: [
        { speaker: 'kofi', text: 'Saving GH₵3,500 on an allowance? That\'s for people with money.' },
        { speaker: 'miracle', text: 'My first laptop: GH₵3,000 equivalent, saved over five months from a GH₵900 stipend. I was not "people with money". I was people with a jar.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'On a small income, the habit is the hard part, and the important part. Start with any amount; you can raise it later.',
    },
  ],
  apply: {
    scenario: 'Myths about saving.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You can\'t save on a small income', group: 0 },
          { text: 'Small amounts add up', group: 1 },
          { text: 'Start once income rises', group: 0 },
          { text: 'A small cushion can cut money stress', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵20 a week for 52 weeks. How much is that?',
        answers: ['1040', '1,040', 'GH₵1,040', 'GH₵1040'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why wait-until-I-earn-more rarely works:',
        options: [
          { text: 'Because spending usually rises with income' },
          { text: 'Because banks won\'t open accounts', why: 'Nothing to do with banks.' },
          { text: 'Because income never rises', why: 'It often does. Spending tends to follow it.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'GH₵3,500 on an allowance is impossible.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You\'re right, take the payment plan.', why: 'That costs GH₵2,260 more.' },
          { text: 'Hard isn\'t impossible. Let\'s find out exactly how short you are, then close the gap piece by piece.' },
          { text: 'Ask your mum for it.', why: 'She\'s already stretching. And he can do more than he thinks.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The point.',
        template: 'On a small income, the [[1]] matters more than the [[2]].',
        blanks: [['habit'], ['size', 'amount']],
        distractors: ['bank', 'loan'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each weekly amount to its yearly total.',
        pairs: [
          ['GH₵10 a week', 'GH₵520 a year'],
          ['GH₵20 a week', 'GH₵1,040 a year'],
          ['GH₵50 a week', 'GH₵2,600 a year'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief will stop Kofi before he starts?',
        lines: [
          'I already save GH₵200 a month.',
          'Saving is only for people with money.',
          'Miracle saved on a stipend.',
        ],
        bug: 1,
        fix: 'Saving is for people with a plan.',
        explanation: 'He\'s been saving for two months. The belief is out of date.',
      },
      {
        kind: 'mcq',
        prompt: 'Which statement about saving is true?',
        options: [
          { text: 'It means no fun', why: 'Kofi still has a fun line.' },
          { text: 'It\'s choosing what matters most' },
          { text: 'It only works with big amounts', why: 'Small amounts add up fast.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a saving habit grows.',
        lines: ['Start with a small amount', 'Make it regular', 'Watch it add up', 'Raise it when you can'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle saved GH₵3,000 over 5 months. How much per month?',
        answers: ['600', 'GH₵600', '600 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which myth about saving have you believed? What did it stop you from doing?',
    starters: ['I believed...', 'It stopped me from...'],
  },
  deepen: {
    title: 'Saving around the world',
    summary: 'Savings groups, from susu in Ghana and tontines in Cameroon to chamas in Kenya and committees in South Asia, let people with small incomes save together. The World Bank\'s Global Findex surveys show that many adults in lower-income countries save, even without bank accounts. Chapter 3 looks at savings groups.',
  },
  notes: 'Miracle\'s first laptop: figures given in cedi equivalent for consistency (she\'s Cameroonian; stated as "equivalent"). Financial stress and emergency savings: e.g. CFPB, Vanguard and FINRA surveys link liquid savings with lower financial stress; kept qualitative. Global Findex (World Bank, 2021/2025 editions) on saving behaviour; kept qualitative.',
};

export default lesson;
