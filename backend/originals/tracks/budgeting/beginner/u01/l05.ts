import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the case so far',
  summary: 'Midnight in Room 214. Yaw wakes up to find Kofi surrounded by numbers. Before the case goes further, check what you know: the missing money, the myths, in-out-left, and reading the evidence.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use in − out = left on real numbers', 'Read and sort a money history'],
  learn: [
    {
      kind: 'story',
      title: 'Midnight',
      beats: [
        { speaker: 'yaw', text: 'Chale, why is the light on? Are you writing an exam?' },
        { speaker: 'kofi', text: 'Worse. I\'m finding out where my money went.' },
        { speaker: 'yaw', text: '...Eh. Don\'t show me mine.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the case so far.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a budget?',
        options: [
          { text: 'A list of things you\'re banned from buying', why: 'It plans spending, including fun. It isn\'t a ban list.' },
          { text: 'A plan for your money, made before you spend it' },
          { text: 'Something only useful on a big income', why: 'A small income has less room for leaks, so a plan matters more.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Income GH₵1,580, spending GH₵1,517. What\'s left?',
        answers: ['63', 'GH₵63', '63 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Money in or money out?',
        groups: ['In', 'Out'],
        items: [
          { text: 'Allowance', group: 0 },
          { text: 'Money lent to a friend', group: 1 },
          { text: 'A refund', group: 0 },
          { text: 'A transfer fee', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to what it means.',
        pairs: [
          ['Tracking', 'Writing down what you spend'],
          ['Budget', 'A plan made before spending'],
          ['Category', 'A group like food or data'],
          ['Unknown', 'Cash you can\'t account for'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The sum.',
        template: 'In [[1]] Out = [[2]]',
        blanks: [['−', '-', 'minus'], ['Left']],
        distractors: ['+', 'Saved'],
      },
      {
        kind: 'mcq',
        prompt: 'Which myth is Kofi believing when he says "I\'ll budget once I earn more"?',
        options: [
          { text: 'You need an app to budget', why: 'He didn\'t mention tools.' },
          { text: 'Budgets mean no fun', why: 'He didn\'t mention fun.' },
          { text: 'Budgets are only for people with money' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the detective steps.',
        lines: ['Get the history', 'Mark in or out', 'Decode each line', 'Give it a category', 'Fill the cash gaps', 'Add up the categories'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Why do you need the history? Just remember what you bought.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'My memory said I spent "not much". The history says 94 payments.' },
          { text: 'Because the bank told me to.', why: 'Nobody told him. He\'s doing it for himself.' },
          { text: 'You\'re right, I\'ll guess.', why: 'Guessing is how the money went missing.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kofi\'s notes is a mistake?',
        lines: [
          'Income: GH₵1,500 allowance + GH₵80 beat.',
          'Lent Yaw GH₵200: not spending, so I\'ll leave it out.',
          'Cash out GH₵100: GH₵60 food, GH₵40 unknown.',
        ],
        bug: 1,
        fix: 'Lent Yaw GH₵200: counts as money out until he pays it back.',
        explanation: 'Money you\'ve lent isn\'t in your pocket. Leaving it out makes the case impossible to solve.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Writing spending down tends to change it', group: 1 },
          { text: 'You need a special app to budget', group: 0 },
          { text: 'Most people know where their money went without checking', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'If "left" is below zero at the end of the month, what does it mean?',
        options: [
          { text: 'Good news: you saved', why: 'Saving shows as money left over, above zero.' },
          { text: 'Nothing; it resets next month', why: 'The gap was paid with borrowed or owed money, and that doesn\'t reset.' },
          { text: 'You spent more than came in, so the gap was borrowed or is owed' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi has GH₵63 for 18 days. About how much is that per day, in cedis?',
        answers: ['3.5', '3.50', 'GH₵3.50', '3,50', '3 and a half'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What surprised you most about your own seven-day history so far?',
    starters: ['I didn\'t expect...', 'The biggest group was...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4. Numbers as L01–L04.',
};

export default lesson;
