import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: hidden-risk myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Risks that don\'t look like risks',
  summary: '"It\'s on a big app, so it\'s safe." "Gold never loses." "I know my company, so its shares are safe." Five beliefs that hide risk in plain sight.',
  minutes: 10,
  outcomes: [
    'Spot risks hidden behind familiar or trusted things',
    'Question "safe" labels',
    'See how fees and taxes are risks to your return',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If an investment is available on a popular app, it must be safe.',
          isFact: false,
          explain: 'Myth. Apps can offer very risky things, like options and leveraged trading, right beside lower-risk ones. Easy to buy doesn\'t mean safe.',
        },
        {
          text: 'Gold never loses value.',
          isFact: false,
          explain: 'Myth. Gold prices can fall and have stayed flat for long periods in the past. It can play a role, but "never" is the warning word again.',
        },
        {
          text: 'Fees reduce your return every year, whatever happens.',
          isFact: true,
          explain: 'Fact. Fees are one of the few certain things: you pay them in good years and bad. Over decades they add up a lot.',
        },
        {
          text: 'Owning lots of shares in the company you work for is safe because you know it well.',
          isFact: false,
          explain: 'Myth. Knowing a company doesn\'t protect you. If it struggles, you could lose your job and your savings together.',
        },
        {
          text: 'Borrowing to invest makes both gains and losses bigger.',
          isFact: true,
          explain: 'Fact. With borrowed money, a fall can wipe out your own money and leave you owing more. That\'s why trading with leverage is so risky.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Joel\'s app',
      beats: [
        { speaker: 'joel', text: 'My app has a button that says "5x". What does that mean?' },
        { speaker: 'arjun', text: 'It means a 20% fall could take everything you put in.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Popular isn\'t safe. Familiar isn\'t safe. Fees are certain. Borrowing makes losses bigger. Look for the risk behind the friendly label.',
    },
  ],
  apply: {
    scenario: 'Hidden risks.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'On a big app, so it\'s safe', group: 0 },
          { text: 'Fees reduce returns every year', group: 1 },
          { text: 'Gold never loses value', group: 0 },
          { text: 'Borrowing to invest magnifies losses', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'With 5x leverage, a fall of what percent wipes out your own money? (A number.)',
        answers: ['20', '20%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Why is lots of your employer\'s shares risky?',
        options: [
          { text: 'Job and savings could fall together' },
          { text: 'Employers forbid it', why: 'It\'s allowed; it\'s concentrated.' },
          { text: 'It isn\'t', why: 'It\'s one basket.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'But the 5x button would make me rich five times faster!',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Use 10x then.', why: 'Even riskier.' },
          { text: 'And poor five times faster. A small fall can take everything. Leave that button alone.' },
          { text: 'Yes, press it.', why: 'Leverage magnifies losses too.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Leverage.',
        template: 'Borrowing to invest makes both [[1]] and [[2]] bigger.',
        blanks: [['gains'], ['losses']],
        distractors: ['fees', 'taxes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each label to its hidden risk.',
        pairs: [
          ['"On a popular app"', 'Risky products sit beside safe ones'],
          ['"Gold never falls"', 'It can fall or stay flat'],
          ['"I know my company"', 'Job and savings in one basket'],
          ['"5x"', 'A small fall can take everything'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought hides a risk?',
        lines: [
          'Fees come out every year, good or bad.',
          'Leverage magnifies losses.',
          'It\'s on the app store, so it\'s been checked for me.',
        ],
        bug: 2,
        fix: 'Being on an app says nothing about risk.',
        explanation: 'Apps list risky products too.',
      },
      {
        kind: 'mcq',
        prompt: 'Why are fees called "certain"?',
        options: [
          { text: 'They\'re always small', why: 'They can be large.' },
          { text: 'They\'re refunded', why: 'They aren\'t.' },
          { text: 'You pay them whether the investment goes up or down' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to look behind a friendly label.',
        lines: ['Notice the label ("safe", "popular", "familiar")', 'Ask what could go wrong', 'Check fees and leverage', 'Decide with the real risks in view'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Arjun say the "5x" button means?',
        options: [
          { text: 'Five times the safety', why: 'Five times the exposure.' },
          { text: 'A 20% fall could take everything Joel put in' },
          { text: 'Five free trades', why: 'It\'s leverage.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which "safe" label have you trusted without checking? What risk might be behind it?',
    starters: ['I trusted...', 'The risk might be...'],
  },
  deepen: {
    title: 'Leverage in plain words',
    summary: 'Leverage means using borrowed money to control a bigger amount. With 5x, ₹10,000 controls ₹50,000. A 20% fall on ₹50,000 is ₹10,000: your whole stake. Some products can lose even more than you put in.',
  },
  notes: '5x leverage: 1/5 = 20% fall wipes the margin. Gold: long flat periods historically (e.g. 1980s–2000s in USD). Joel per CAST.',
};

export default lesson;
