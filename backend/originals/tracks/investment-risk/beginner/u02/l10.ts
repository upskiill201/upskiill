import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: kinds of risk. Cliffhanger: the late payment and Appa's knee. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Kavya\'s all-in plan',
  summary: 'Kavya wants to put her whole ₹2 lakh share into one coin, using a "3x" button. Use everything from Chapter 2 to map her risks. Then two calls change Arjun\'s map: a client pays late, and Amma rings about Appa\'s knee.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Map all five kinds of risk for someone else', 'Spot leverage and concentration together'],
  learn: [
    {
      kind: 'story',
      title: 'Two calls',
      beats: [
        { speaker: 'kavya', text: 'Okay, okay. Score my plan. All ₹2 lakh, one coin, the 3x button.' },
        { speaker: 'arjun', text: 'Let\'s do all five columns.' },
        { speaker: 'narrator', text: 'Monday: Mr Rao\'s shop says the next invoice will be paid "after Diwali". Arjun\'s income this month: zero.' },
        { speaker: 'narrator', text: 'Wednesday: Amma calls from Mysuru. Appa needs a knee operation. About ₹2.5 lakh, in two months.' },
        { speaker: 'arjun', text: 'If I\'d locked the money in that scheme, or bought the plot, I couldn\'t touch any of it now.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: market, inflation, liquidity, concentration and fraud risk, plus leverage and hidden risks. Next, the question nobody asked: when will you need the money? First, Kavya.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: Kavya, 23, Pune. ₹2,00,000 from the contract. No other savings. Monthly costs ₹25,000. Plan: all of it into one coin, using 3x leverage on an app.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Score Kavya\'s plan on each kind of risk.',
        pairs: [
          ['Market risk', 'Very high'],
          ['Concentration risk', 'Everything in one coin'],
          ['Leverage', 'A third of a fall wipes her out'],
          ['Liquidity for emergencies', 'No savings outside the coin'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'With 3x leverage, roughly what percent fall wipes out her stake? (Round to the nearest whole number.)',
        answers: ['33', '33%', '33.3', '33.33'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s her biggest problem before any investing?',
        options: [
          { text: 'She has no emergency money outside the plan' },
          { text: 'The coin\'s colour', why: 'Not a risk factor.' },
          { text: 'Inflation on ₹2 lakh this week', why: 'Emergency money matters far more right now.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lowers her risk, or raises it?',
        groups: ['Lowers it', 'Raises it'],
        items: [
          { text: 'Keeping three months of costs in savings first', group: 0 },
          { text: 'The 3x button', group: 1 },
          { text: 'Putting only a small slice into crypto', group: 0 },
          { text: 'One coin only', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Fine. What would you do in my shoes?',
        prompt: 'Arjun\'s honest, non-advice reply?',
        options: [
          { text: 'Go all in, you\'re young.', why: 'Young doesn\'t make leverage safe.' },
          { text: 'I can\'t tell you what to buy. But I\'d want an emergency fund first, no leverage, and only money I could lose completely in anything that swings that much.' },
          { text: 'Buy what I buy.', why: 'Copying isn\'t a plan, and it\'s not advice he should give.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Three months of Kavya\'s costs (₹25,000 a month). How much?',
        answers: ['75000', '75,000', '₹75,000', '₹75000'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'What Arjun noticed this week.',
        template: 'Money locked in a scheme or a plot can\'t help in an [[1]]. That\'s [[2]] risk.',
        blanks: [['emergency'], ['liquidity']],
        distractors: ['investment', 'market'],
      },
      {
        kind: 'findBug',
        prompt: 'Kavya\'s revised plan. Which line still breaks Chapter 2?',
        lines: [
          'Keep ₹75,000 in savings for emergencies.',
          'No leverage.',
          'Put the rest into one coin.',
        ],
        bug: 2,
        fix: 'If at all, a small slice, and not in one coin.',
        explanation: 'One coin is still maximum concentration.',
      },
      {
        kind: 'mcq',
        prompt: 'Appa needs ₹2.5 lakh in two months. Which kind of risk matters most for that money?',
        options: [
          { text: 'Inflation over 30 years', why: 'Two months isn\'t long enough for that to matter much.' },
          { text: 'None', why: 'It must not fall or be locked.' },
          { text: 'Liquidity and market risk: it must be safe and reachable' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Arjun maps any plan.',
        lines: ['List the idea', 'Score market risk', 'Score inflation and liquidity', 'Score concentration and fraud', 'Check for leverage'],
      },
      {
        kind: 'mcq',
        prompt: 'What question does the week leave Arjun with?',
        options: [
          { text: 'Which coin is best?', why: 'The week was about timing.' },
          { text: 'When will I need each part of this money?' },
          { text: 'Should I buy the plot after all?', why: 'The plot was crossed out.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If you suddenly needed a large sum in two months, where would it come from?',
    starters: ['It would come from...', 'That makes me realise...'],
  },
  notes: 'Chapter 2 challenge. Kavya per CAST. 3x: 1/3 ≈ 33% fall wipes stake. Cliffhanger: Mr Rao (narrated) pays late; Appa\'s knee op ~₹2.5 lakh in two months → Ch3 time and goals.',
};

export default lesson;
