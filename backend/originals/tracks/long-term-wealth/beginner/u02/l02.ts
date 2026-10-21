import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Card deck: how workplace pensions work. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How workplace pensions work',
  summary: 'Miracle\'s had a pension for three years and couldn\'t have explained it. Four cards on what a workplace pension is, who pays in, and why it\'s one of the most powerful habits you\'ll ever have, without lifting a finger.',
  minutes: 10,
  outcomes: [
    'Explain what a workplace pension is',
    'Know who pays in and why it matters',
    'Know what to check and when',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>A workplace pension</strong> is a long-term savings pot that you and your employer pay into from your salary, usually every month, for when you stop working.</p><p>In Nigeria, under the Contributory Pension Scheme, employees pay at least 8% of their monthly pay and employers at least 10%. Other countries have different rules, and some have none; check yours.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Why it\'s powerful:</strong></p><ul><li><strong>It\'s automatic.</strong> It leaves your pay before you see it. No "next year".</li><li><strong>Your employer adds money.</strong> Miracle\'s 8% comes with Afiya\'s 10%: more than doubling what she puts in.</li><li><strong>It\'s invested for the long term</strong>, so it can grow over decades.</li><li><strong>It\'s hard to touch early</strong>, which protects it from your Thursday self.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>What to check:</strong> that contributions are arriving (twice a year), who manages your pot, roughly how it\'s invested, and whether you can add voluntary contributions. Many schemes let you pay in extra, sometimes with tax benefits.</p>',
    },
    {
      kind: 'check',
      question: 'Miracle pays 8% and Afiya pays 10%. What total percentage of her pay goes into her pension?',
      options: ['18%', '8%', '10%'],
      answer: 0,
      explanation: '8 + 10 = 18% of her pay, every month.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A workplace pension is automatic, includes your employer\'s money, grows for decades and is hard to raid. Check it twice a year, and add extra if you can.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s pension.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '18% of ₦900,000. How much goes into Miracle\'s pension each month?',
        answers: ['162000', '162,000', '₦162,000', '₦162000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each feature to why it helps.',
        pairs: [
          ['Automatic', 'No "next year"'],
          ['Employer adds money', 'More than doubles what you put in'],
          ['Invested long term', 'Can grow over decades'],
          ['Hard to touch early', 'Protected from impulses'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In Nigeria\'s Contributory Pension Scheme, what are the minimum contributions?',
        options: [
          { text: '8% from the employee, 10% from the employer' },
          { text: '10% from the employee, 8% from the employer', why: 'The other way round.' },
          { text: 'Nothing; it\'s optional', why: 'It applies to many employers by law.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth checking on your pension, or not?',
        groups: ['Worth checking', 'Not needed'],
        items: [
          { text: 'Contributions arriving', group: 0 },
          { text: 'Who manages the pot', group: 0 },
          { text: 'The colour of the website', group: 1 },
          { text: 'Whether you can add extra', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Should I pay in extra on top of the 8%?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Once your emergency fund is solid and you have no expensive debt, extra contributions are a strong habit. Check the rules and any tax benefits.' },
          { text: 'Never, 8% is plenty.', why: 'For many people, 8% plus 10% isn\'t enough on its own.' },
          { text: 'Put all your money in, even emergency money.', why: 'Emergency money must be reachable.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why it\'s powerful.',
        template: 'Automatic, includes your [[1]]\'s money, grows for [[2]], hard to raid.',
        blanks: [['employer'], ['decades', 'years']],
        distractors: ['friend', 'days'],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief about pensions is wrong?',
        lines: [
          'My employer adds money.',
          'It\'s invested for the long term.',
          'I never need to check it.',
        ],
        bug: 2,
        fix: 'Check it at least twice a year.',
        explanation: 'Miracle\'s four missing months show why.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "hard to touch early" a good thing?',
        options: [
          { text: 'It protects long-term money from short-term impulses' },
          { text: 'It\'s annoying', why: 'It\'s protective.' },
          { text: 'It isn\'t', why: 'It keeps the money growing.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Afiya\'s 10% of ₦900,000 for 12 months. How much does Afiya add in a year?',
        answers: ['1080000', '1,080,000', '₦1,080,000', '₦1080000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a pension check.',
        lines: ['Log in or request a statement', 'Check contributions are arriving', 'Note who manages it', 'Ask about extra contributions'],
      },
    ],
  },
  reflect: {
    prompt: 'Does your job have a pension? Who pays in, and how much? If you\'re self-employed, what\'s your equivalent?',
    starters: ['My pension:...', 'Who pays:...', 'My equivalent:...'],
  },
  deepen: {
    title: 'Self-employed?',
    summary: 'If you work for yourself, nobody pays into a pension for you. Many countries let self-employed people open personal pension accounts. The habit is the same: automatic, regular, untouched, for decades.',
  },
  notes: 'Nigeria Contributory Pension Scheme: Pension Reform Act 2014 minimum 18% (employer 10%, employee 8%); Retirement Savings Accounts managed by licensed Pension Fund Administrators (no PFA named, playbook §9). Voluntary contributions and tax treatment exist; stated generally. 18% × 900,000 = 162,000.',
};

export default lesson;
