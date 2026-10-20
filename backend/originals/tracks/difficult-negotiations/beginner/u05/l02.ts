import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: package the deal. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Package the deal',
  summary: 'Arjun stops negotiating one number at a time and puts everything on one screen: scope, price, support, payment, changes and a review. Five steps to a package both sides can sign.',
  minutes: 12,
  outcomes: [
    'Negotiate all the issues together, not one at a time',
    'Build a package that beats both sides\' alternatives',
    'Use "nothing is agreed until everything is agreed"',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to a package',
      steps: [
        { title: '1. Put every issue on the table', body: 'Scope, price, support, payment, change rate, review. Agreeing them one at a time invites nibbles at the end.' },
        { title: '2. Say "nothing is agreed until everything is agreed"', body: 'So nobody pockets one concession and reopens another.' },
        { title: '3. Add value they need', body: 'Three months of launch support through the spring sale. Normally £4,000; it costs Arjun\'s team about £2,000.' },
        { title: '4. Price the whole package', body: 'Phase one (£40,000) plus support (£4,000) is £44,000. Package price: £42,000. Pryce can report £6,000 below the first quote, with support included.' },
        { title: '5. Check it beats both BATNAs', body: 'Arjun keeps £42,000 − £25,000 − £2,000 = £15,000, more than Kinwell\'s £12,000. They get the app by spring, with help.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Package every issue together. Nothing is agreed until everything is agreed. Check the package beats both sides\' alternatives.',
    },
  ],
  apply: {
    scenario: 'The package.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Put every issue on the table', 'Nothing agreed until everything agreed', 'Add value they need', 'Price the whole package', 'Check it beats both BATNAs'],
      },
      {
        kind: 'typeAnswer',
        prompt: '£42,000 minus £25,000 costs minus £2,000 support costs. What does Arjun keep, in pounds?',
        answers: ['15000', '15,000', '£15,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why say "nothing is agreed until everything is agreed"?',
        options: [
          { text: 'So nobody pockets one concession and then reopens another' },
          { text: 'To slow things down', why: 'It protects the package.' },
          { text: 'It\'s a legal phrase only', why: 'It\'s practical in any negotiation.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first quote was £48,000 and the package is £42,000. What saving can Pryce report, in pounds?',
        answers: ['6000', '6,000', '£6,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the package, or not?',
        groups: ['In the package', 'Not in it'],
        items: [
          { text: 'Phase one in 12 weeks', group: 0 },
          { text: 'Three months of launch support', group: 0 },
          { text: '120-day payment terms', group: 1 },
          { text: 'Gift cards in phase one', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Support costs us £2,000. Why include it?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It\'s worth £4,000 to them, costs us £2,000, and lifts the deal from £37,000 to £42,000. We keep £15,000, not £12,000.' },
          { text: 'You\'re right, remove it.', why: 'It\'s what makes the package better for both.' },
          { text: 'Give it free.', why: 'Price it into the package.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to what the package gives them.',
        pairs: [
          ['Ms Okafor-Lane', 'App and support through spring'],
          ['Mr Pryce', '£6,000 below the first quote'],
          ['Arjun', '£15,000, beating Kinwell'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The package test.',
        template: 'It must beat [[1]] sides\' [[2]].',
        blanks: [['both'], ['BATNAs', 'alternatives']],
        distractors: ['neither', 'logos'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Arjun\'s package plan undoes the approach?',
        lines: [
          'Put scope, price, support and payment on one page.',
          'Nothing agreed until everything is agreed.',
          'Agree the price first, then discuss support.',
          'Check it beats both alternatives.',
        ],
        bug: 2,
        fix: 'Price the whole package together.',
        explanation: 'One issue at a time invites nibbles.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is support "worth £4,000 to them but costs £2,000"?',
        options: [
          { text: 'The team already knows the app, so supporting it is cheap for them and valuable for the client' },
          { text: 'Arjun is hiding the cost', why: 'It\'s honestly cheaper for the team that built it.' },
          { text: 'It isn\'t', why: 'Different costs and values are what make trades work.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'List every issue in a negotiation you\'re in. What could you add that\'s cheap for you and valuable to them?',
    starters: ['The issues:...', 'I could add...'],
  },
  deepen: {
    title: 'Package deals',
    summary: 'Negotiators who discuss several issues together reach better joint deals than those who settle issues one by one, because packages make trades possible.',
  },
  notes: 'Package (multi-issue) negotiation and "nothing is agreed until everything is agreed": standard practice (e.g. Thompson; diplomatic negotiations). Fictional: phase one £40,000 + support £4,000 (costs £2,000) → package £42,000; Arjun keeps £15,000 vs BATNA £12,000.',
};

export default lesson;
