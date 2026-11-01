import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or Fact: scam myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Who falls for scams?',
  summary: '"Only greedy or stupid people fall for scams." "Scams look amateur." "If lots of people are in it, it must be fine." Five beliefs that make smart people easier targets.',
  minutes: 10,
  outcomes: [
    'See that scams target everyone, including clever people',
    'Spot professional-looking scams',
    'Stop using popularity as proof',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Only greedy or stupid people fall for investment scams.',
          isFact: false,
          explain: 'Myth. Scams target emotions like trust, fear and hope, not intelligence. Doctors, engineers and teachers lose money to them. Believing "I\'d never fall for it" makes people less careful.',
        },
        {
          text: 'Scams always look amateur, with bad spelling and cheap websites.',
          isFact: false,
          explain: 'Myth. Many have polished apps, professional websites, fake dashboards showing your "profits", and well-dressed presenters.',
        },
        {
          text: 'A fake app can show your balance growing even though no money is invested.',
          isFact: true,
          explain: 'Fact. The numbers on a scam\'s dashboard are just numbers they type. They mean nothing until you try to withdraw.',
        },
        {
          text: 'If many people have joined, it\'s probably safe.',
          isFact: false,
          explain: 'Myth. Big Ponzi schemes have taken money from thousands, sometimes millions, of people. Popularity is how they grow, not proof they\'re real.',
        },
        {
          text: 'Regulated providers don\'t guarantee high returns.',
          isFact: true,
          explain: 'Fact. Real, regulated investments explain that values can fall. A "guarantee" of high returns is one of the clearest warning signs there is.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Joel\'s aunt',
      beats: [
        { speaker: 'joel', text: 'My aunt is a retired chemistry teacher. She\'s the cleverest person in our family.' },
        { speaker: 'arjun', text: 'That\'s the point. They didn\'t fool her brain. They used her trust.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Scams target trust and emotion, not intelligence. They can look professional. Dashboards can show fake profits. Popularity isn\'t proof. "Guaranteed high returns" is the warning.',
    },
  ],
  apply: {
    scenario: 'Scam myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Only stupid people fall for scams', group: 0 },
          { text: 'Fake apps can show fake profits', group: 1 },
          { text: 'Popular means safe', group: 0 },
          { text: 'Regulated providers don\'t guarantee high returns', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I\'d never fall for it" risky?',
        options: [
          { text: 'It\'s rude', why: 'It lowers your guard.' },
          { text: 'It makes people less careful' },
          { text: 'It isn\'t', why: 'Overconfidence helps scammers.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Their app looks amazing and shows I\'m up 40%!',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Then add more money.', why: 'Classic trap.' },
          { text: 'Amazing apps are always real.', why: 'Polish proves nothing.' },
          { text: 'Try withdrawing a small amount. The numbers on their screen are whatever they type.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'What scams target.',
        template: 'Scams target [[1]] and emotion, not [[2]].',
        blanks: [['trust'], ['intelligence']],
        distractors: ['fees', 'luck'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Scams look amateur"', 'Many look very professional'],
          ['"Lots of people joined"', 'Popularity is how they grow'],
          ['"My dashboard shows profit"', 'Only withdrawals are real'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought makes Kavya a target?',
        lines: [
          'Is it on the regulator\'s list?',
          'Can I withdraw anytime?',
          'Thousands of people use it, so it\'s fine.',
        ],
        bug: 2,
        fix: 'Popularity is not proof.',
        explanation: 'Huge schemes have had huge numbers of members.',
      },
      {
        kind: 'mcq',
        prompt: 'What did the scammers use against Joel\'s aunt?',
        options: [
          { text: 'Her lack of education', why: 'She\'s a retired chemistry teacher.' },
          { text: 'Her trust in her community' },
          { text: 'Her greed', why: 'Trust, not greed.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kavya\'s app shows ₹1,00,000 "up 40%". What does it claim the balance is?',
        answers: ['140000', '1,40,000', '140,000', '₹1,40,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a reality check on a too-good app.',
        lines: ['Ignore the dashboard', 'Check the regulator\'s list', 'Try a small withdrawal', 'If anything fails, stop and report'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the clearest single warning sign?',
        options: [
          { text: 'A modern app', why: 'Polish proves nothing either way.' },
          { text: 'Lots of users', why: 'That\'s not a warning or proof.' },
          { text: 'A guarantee of high returns' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life might be most at risk from scams? What would help them?',
    starters: ['The person is...', 'It would help to...'],
  },
  deepen: {
    title: 'Withdrawal "fees"',
    summary: 'A common trick: when you try to withdraw, you\'re told to pay a "tax", "unlock fee" or "verification charge" first. Paying it never releases the money. It\'s just more loss.',
  },
  notes: 'Fake dashboards, withdrawal fees: standard regulator warnings. Kavya, Joel per CAST.',
};

export default lesson;
