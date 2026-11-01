import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: one hot stock. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Up 60%',
  summary: 'Vikram\'s one stock is up 60% and he won\'t stop sending screenshots. Arjun\'s long-term pot, ₹4.4 lakh, is ready to take risk. But which kind of risk: one company, or many?',
  minutes: 12,
  outcomes: [
    'Tell a concentrated bet from a spread',
    'See why a rising price isn\'t evidence of safety',
    'Choose to spread long-term money',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Screenshots',
      beats: [
        { speaker: 'narrator', text: 'Vikram, at 1 a.m.: "Up 60%. Told you. Put your ₹4.4 lakh in before it goes higher."' },
        { speaker: 'kavya', text: 'Even I think that\'s a lot in one place. And I\'m the crypto one.' },
        { speaker: 'grace', text: 'You\'re a developer. Would you run a whole system on one server with no backup?' },
        { speaker: 'arjun', text: 'Never. One failure and everything\'s down.' },
        { speaker: 'tey', text: 'Arjun\'s long-term pot can take ups and downs. The question is whether it takes them from one company or from hundreds. What should he do?' },
      ],
      choice: {
        prompt: 'What should Arjun do with his long-term pot?',
        options: [
          { text: 'Put it all in Vikram\'s stock; it\'s clearly a winner.', outcome: 'Up 60% this year says nothing about next year. One bad set of results, one scandal, and a single stock can halve. That\'s a bet, not a plan.' },
          { text: 'Spread it widely: many companies, different industries, some steadier assets, and add to it every month.', outcome: 'Yes. No single company can sink the pot. He gives up the chance of one stock making him rich overnight, and removes the chance of one stock ruining him.', best: true },
          { text: 'Pick five stocks he likes, all tech companies like Vikram\'s.', outcome: 'Five tech companies tend to rise and fall together. That\'s nearly one basket in five pieces.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One stock is a bet. A wide spread across many companies and kinds of asset is a plan. A rising price is not proof of safety.',
    },
  ],
  apply: {
    scenario: 'Vikram\'s screenshots.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "up 60% this year" tell Arjun about next year?',
        options: [
          { text: 'It will rise again', why: 'Past returns aren\'t promises.' },
          { text: 'Nothing reliable' },
          { text: 'It will fall', why: 'Nobody knows.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Bet, or spread?',
        groups: ['Bet', 'Spread'],
        items: [
          { text: 'All in one stock', group: 0 },
          { text: 'Many companies across industries', group: 1 },
          { text: 'Five tech stocks', group: 0 },
          { text: 'Shares plus some steadier assets', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Vikram says spreading out is for people who don\'t know how to pick.',
        prompt: 'What does Grace say?',
        options: [
          { text: 'He\'s right.', why: 'Even experts struggle to pick winners consistently.' },
          { text: 'Pick better than him.', why: 'The point is not to depend on picking.' },
          { text: 'Spreading is for people who know that nobody can reliably pick. Including professionals.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s comparison.',
        template: 'Don\'t run a whole system on one [[1]] with no [[2]].',
        blanks: [['server'], ['backup']],
        distractors: ['laptop', 'budget'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each option to its main risk.',
        pairs: [
          ['All in one stock', 'One company can sink it'],
          ['Five tech stocks', 'They fall together'],
          ['Wide spread', 'Market falls, but no single failure sinks it'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '₹4,40,000 in one stock that halves. Value after?',
        answers: ['220000', '2,20,000', '220,000', '₹2,20,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in a "spread" plan isn\'t really spreading?',
        lines: [
          'Many companies across different industries.',
          'Some steadier assets too.',
          'All of it in the same sector as my job.',
        ],
        bug: 2,
        fix: 'Spread across sectors, including ones unlike my job.',
        explanation: 'If his work and his money are in the same sector, a bad year hits both.',
      },
      {
        kind: 'mcq',
        prompt: 'What does spreading give up?',
        options: [
          { text: 'The chance of one stock making you rich overnight' },
          { text: 'All growth', why: 'A spread can still grow.' },
          { text: 'Safety', why: 'It adds safety.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why did Kavya, "the crypto one", think it was too much in one place?',
        options: [
          { text: 'She wanted him in crypto', why: 'She agreed it was too concentrated.' },
          { text: 'She dislikes Vikram', why: 'It was about concentration.' },
          { text: 'Even she could see one company was a single point of failure' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s thinking.',
        lines: ['This pot can take ups and downs', 'But not from one company', 'Spread across many', 'Add to it every month'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a "single point of failure" in your money, one thing that would hurt a lot if it failed?',
    starters: ['My single point of failure is...', 'A backup would be...'],
  },
  deepen: {
    title: 'Most single stocks underperform',
    summary: 'Research on long-run share returns (for example by finance professor Hendrik Bessembinder) has found that a small minority of companies produced most of the market\'s gains, while many individual stocks did worse than safe assets. Owning many means you\'re more likely to own the few big winners.',
  },
  notes: 'Bessembinder (2018), "Do stocks outperform Treasury bills?", Journal of Financial Economics. Vikram narrated. No stocks named.',
};

export default lesson;
