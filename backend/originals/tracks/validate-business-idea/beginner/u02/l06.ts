import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Reading: what they already spend. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What they already spend',
  summary: 'David\'s question changes everything: "If laundry hurts, what do they spend on it already?" Clinton goes back through his notes and adds up time, money and workarounds.',
  minutes: 12,
  outcomes: [
    'Measure a problem by what people already spend on it',
    'Count time, money and workarounds',
    'Work out monthly totals from interview answers',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Three kinds of spending',
      html: '<p>The best sign that a problem is real: people already spend something on it. Clinton\'s notes show three kinds.</p><p><strong>1. Time.</strong> Students who wash by hand spend about <strong>3 hours</strong> every Saturday: fetching water, washing, wringing, then moving clothes around trying to dry them. Four Saturdays a month is <strong>12 hours</strong>.</p><p><strong>2. Money.</strong> Six of the fifteen had paid <strong>Mama Rose</strong>, who runs the wash-and-iron stand at the campus gate, at least once this semester. A week\'s basket costs them about <strong>2,400 FCFA</strong>. Most can\'t afford that every week, so they pay when exams are on or it hasn\'t stopped raining.</p><p><strong>3. Workarounds.</strong> When people can\'t solve a problem, they patch it: drying shirts with a hot iron, hanging jeans by the hostel kitchen, buying extra underwear so they can wash less often, wearing damp clothes to class.</p><p>Every one of these is evidence. Workarounds show the problem is real; spending shows it\'s worth money; and the gap (most can\'t afford Mama Rose every week) shows where a new service might fit.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Time, money, workarounds: if people spend none of them on a problem, it probably doesn\'t hurt enough to pay for.',
    },
  ],
  apply: {
    scenario: 'Adding up the cost.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Hand-washing takes 3 hours every Saturday. How many hours is that in a 4-week month?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "already spends money on it" strong evidence?',
        options: [
          { text: 'It shows the problem hurts enough that people pay to fix it today' },
          { text: 'It means they\'re rich', why: 'It means they value a fix, not that they\'re rich.' },
          { text: 'It\'s weak evidence', why: 'Past spending is some of the strongest evidence there is.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Time, money or workaround?',
        groups: ['Time', 'Money', 'Workaround'],
        items: [
          { text: 'Three hours every Saturday', group: 0 },
          { text: '2,400 FCFA to Mama Rose', group: 1 },
          { text: 'Drying shirts with a hot iron', group: 2 },
          { text: 'Buying extra underwear', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A student pays Mama Rose 2,400 FCFA twice a month. What is that per month?',
        options: [
          { text: '4,800 FCFA' },
          { text: '2,400 FCFA', why: 'Twice a month doubles it.' },
          { text: '9,600 FCFA', why: 'That would be four times a month.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Only six of fifteen pay Mama Rose. Isn\'t that bad news?',
        prompt: "David's best reply?",
        options: [
          { text: 'Six already pay, and the others spend hours or patch it badly. The ones who can\'t afford her every week might be your customers.' },
          { text: 'Yes, give up.', why: 'Paying customers plus a big gap is good news.' },
          { text: 'It means everyone pays.', why: 'Six of fifteen, not all.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the evidence to what it shows.',
        pairs: [
          ['Workarounds', 'The problem is real'],
          ['Paying Mama Rose', 'It\'s worth money'],
          ['Can\'t afford her weekly', 'A gap a new service could fill'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Three kinds of spending.',
        template: 'Time, [[1]] and [[2]].',
        blanks: [['money'], ['workarounds']],
        distractors: ['likes', 'opinions'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s summary isn\'t backed by his notes?',
        lines: [
          'Hand-washers spend about 3 hours every Saturday.',
          '6 of 15 have paid Mama Rose this semester.',
          'Everyone would pay 3,000 FCFA a week for pickup.',
          'Common workarounds: ironing to dry, damp clothes.',
        ],
        bug: 2,
        fix: 'Delete it: nobody has been asked to pay for pickup yet.',
        explanation: 'It\'s a guess about the future, not something they did.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of the 15 students, 6 have paid Mama Rose. What percentage is that?',
        answers: ['40', '40%'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this show the problem hurts?',
        groups: ['Shows it hurts', 'Doesn\'t'],
        items: [
          { text: 'Wears damp jeans to class', group: 0 },
          { text: 'Says "laundry is boring"', group: 1 },
          { text: 'Paid for help during exams', group: 0 },
          { text: 'Has never thought about it', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For your idea\'s problem: what do people already spend on it in time, money and workarounds?',
    starters: ['They spend...', 'Their workaround is...'],
  },
  deepen: {
    title: 'Workarounds are gold',
    summary: 'When people build their own clumsy fix (a spreadsheet, a WhatsApp group, a hot iron) they\'re telling you the problem is real and nobody has solved it well yet.',
  },
  notes: 'Fictional interview data: hand-washing about 3 hours each Saturday (12 hours/month); 6 of 15 (40%) paid Mama Rose this semester; a week\'s basket about 2,400 FCFA. Mama Rose (course-only, narrated) runs the wash-and-iron stand at the campus gate.',
};

export default lesson;
