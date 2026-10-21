import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: values and spending. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Spending on yourself is selfish"',
  summary: 'Ada feels guilty about her art class while her mum works so hard. Is spending on yourself selfish? Is values-based spending only for the rich? Five beliefs, tested.',
  minutes: 10,
  outcomes: [
    'Spend on yourself without guilt when it matches your values',
    'See that values-based spending works on any income',
    'Balance looking after others and yourself',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Spending on yourself is always selfish.',
          isFact: false,
          explain: 'Myth. Spending on your growth, health and rest is how you keep being able to help others. Ada\'s art class makes her a better designer, which pays for family support.',
        },
        {
          text: 'Values-based spending only works for people with lots of money.',
          isFact: false,
          explain: 'Myth. It matters more on a small income: every naira counts, so putting it where it matters counts even more.',
        },
        {
          text: 'Looking after others and yourself can both be values.',
          isFact: true,
          explain: 'Fact. Ada values family and growth. Both get money. Neither has to win completely.',
        },
        {
          text: 'Guilt about spending on yourself can lead to hiding purchases.',
          isFact: true,
          explain: 'Fact. Guilt tends to push spending underground rather than stopping it. A planned, guilt-free line is easier to manage.',
        },
        {
          text: 'If you love something, you should spend unlimited money on it.',
          isFact: false,
          explain: 'Myth. "Generous" still has a size. Ada\'s art class is ₦15,000, not ₦150,000. Values guide where money goes, not whether limits exist.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Guilt',
      beats: [
        { speaker: 'ada', text: 'Mum sells provisions twelve hours a day. And I spend ₦15,000 on a painting class.' },
        { speaker: 'narrator', text: 'On a call, her mum laughs. "Ada, I worked twelve hours so that you could take painting classes. Don\'t you dare stop."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Spending on what helps you grow isn\'t selfish; it\'s often how you keep helping others. Give it a size, and drop the guilt.',
    },
  ],
  apply: {
    scenario: 'Guilt and values.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Spending on yourself is always selfish', group: 0 },
          { text: 'Looking after others and yourself can both be values', group: 1 },
          { text: 'Values-based spending is only for the rich', group: 0 },
          { text: 'Guilt can push spending underground', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Ada\'s mum say about the art class?',
        options: [
          { text: 'She worked hard so Ada could do things like this: don\'t stop' },
          { text: 'Stop wasting money', why: 'The opposite.' },
          { text: 'Pay her back', why: 'She was proud.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I still feel guilty about the class.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'It\'s sized, it\'s planned, it helps you grow, and your mum wants it. Guilt isn\'t helping anyone here.' },
          { text: 'Then quit.', why: 'It\'s her top-scoring line.' },
          { text: 'Spend more to feel better.', why: 'Not the fix.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Generous still has...',
        template: '"Generous" still has a [[1]].',
        blanks: [['size', 'limit']],
        distractors: ['price', 'name'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each value to how Ada funds it.',
        pairs: [
          ['Family', '₦40,000 support'],
          ['Growth', '₦15,000 art class'],
          ['Connection', '₦32,000 Friday dinners'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief will make Ada\'s plan fall apart?',
        lines: [
          'My art class is sized and planned.',
          'Family support is protected.',
          'Every naira spent on me is stolen from my family.',
        ],
        bug: 2,
        fix: 'Money for my growth helps me keep supporting my family.',
        explanation: 'That belief leads to guilt, hiding, and giving up the plan.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does values-based spending matter more on a small income?',
        options: [
          { text: 'Every naira counts, so where it goes matters more' },
          { text: 'It doesn\'t', why: 'It matters more when there\'s less.' },
          { text: 'Because small incomes have no needs', why: 'Small incomes have the same needs.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s growth spending is ₦15,000 a month. How much over a year?',
        answers: ['180000', '180,000', '₦180,000', '₦180000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to spend on yourself without guilt.',
        lines: ['Check it matches a value', 'Give it a size', 'Plan it', 'Enjoy it'],
      },
      {
        kind: 'mcq',
        prompt: 'If Ada loves design, should she spend ₦150,000 a month on courses?',
        options: [
          { text: 'No: generous still has a size that fits the whole plan' },
          { text: 'Yes, unlimited', why: 'That would break her plan.' },
          { text: 'Nothing at all', why: 'Growth is a top value.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What do you feel guilty spending on? Does it match your values? What size would make it guilt-free?',
    starters: ['I feel guilty about...', 'It matches...', 'A guilt-free size:...'],
  },
  deepen: {
    title: 'Put on your own oxygen mask',
    summary: 'Airlines tell passengers to put on their own oxygen mask before helping others. Money works similarly: looking after your health, skills and savings is how you stay able to support the people you love.',
  },
  notes: 'Ada\'s mum sells provisions (narrated, new detail; Ada\'s family not previously fixed in CAST beyond Lagos). Guilt → concealment pattern; stated qualitatively.',
};

export default lesson;
