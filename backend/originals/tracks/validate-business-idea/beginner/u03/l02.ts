import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Before/After: top-down vs bottom-up sizing. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Top-down vs bottom-up',
  summary: 'Clinton\'s slide starts from a huge number and shrinks it with a guess. David\'s notebook starts from hostels they counted and grows it with evidence. Same question, very different answers.',
  minutes: 11,
  outcomes: [
    'Tell top-down sizing from bottom-up sizing',
    'Know why bottom-up is more believable',
    'Spot the guess hiding in a top-down number',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to size the market',
      before: {
        label: 'Top-down',
        text: 'Start big: "20,000 students."\nApply a percentage: "If 10% use it..."\nResult: 2,000 customers.\nQuick, impressive, and the key number (10%) is made up.',
      },
      after: {
        label: 'Bottom-up',
        text: 'Start small: 40 hostels × about 50 rooms = 2,000 students we can reach.\n60% have the laundry problem (9 of 15 interviews).\n40% already pay for help sometimes (6 of 15).\nResult: about 800 likely customers, every number traceable.',
      },
      notes: [
        'Top-down tells you the sky is big. Bottom-up tells you how many people you can actually serve.',
        'In bottom-up sizing, every number comes from something you counted or heard.',
        'Investors and banks trust bottom-up numbers far more, because they can check them.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'For every number in your estimate, ask: "Where did this come from?" If the answer is "it sounded right", it\'s a guess.',
    },
  ],
  apply: {
    scenario: 'Two estimates.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Top-down or bottom-up?',
        groups: ['Top-down', 'Bottom-up'],
        items: [
          { text: '"10% of all students"', group: 0 },
          { text: '"40 hostels × 50 rooms"', group: 1 },
          { text: '"1% of Cameroon\'s laundry market"', group: 0 },
          { text: '"6 of 15 interviewees already pay"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '40 hostels with about 50 rooms each. How many students can Clinton reach?',
        answers: ['2000', '2,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is bottom-up sizing more believable?',
        options: [
          { text: 'Every number comes from something counted or heard, so it can be checked' },
          { text: 'It always gives a bigger number', why: 'It usually gives a smaller, truer one.' },
          { text: 'It uses more maths', why: 'It\'s about where the numbers come from.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each number to where it came from.',
        pairs: [
          ['40 hostels', 'Walking and counting'],
          ['About 50 rooms each', 'Asking caretakers'],
          ['60% have the problem', 'Interviews: 9 of 15'],
          ['40% pay sometimes', 'Interviews: 6 of 15'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My top-down number is 2,000 and the bottom-up one is 800. I\'ll use 2,000; it looks better.',
        prompt: "David's best reply?",
        options: [
          { text: 'Use the biggest number; that\'s business.', why: 'An inflated number misleads you most of all.' },
          { text: 'Average them: 1,400.', why: 'Averaging a guess with evidence just hides the guess.' },
          { text: 'The 800 is the one you can defend. If someone asks where 2,000 came from, the answer is "a guess".' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '2,000 reachable students, and 40% already pay for laundry help sometimes. How many is that?',
        answers: ['800'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The difference.',
        template: 'Top-down starts [[1]] and shrinks with a guess; bottom-up starts [[2]] and grows with evidence.',
        blanks: [['big'], ['small']],
        distractors: ['late', 'loud'],
      },
      {
        kind: 'findBug',
        prompt: 'Which number in this "bottom-up" estimate is really top-down?',
        lines: [
          '40 hostels counted near campus.',
          'About 50 rooms each, from caretakers.',
          '25% will choose WashDay, because that sounds fair.',
          '9 of 15 interviewees raised laundry.',
        ],
        bug: 2,
        fix: 'Use a share measured from interviews or a test.',
        explanation: '"Sounds fair" isn\'t a source.',
      },
      {
        kind: 'mcq',
        prompt: 'What is 60% of 2,000?',
        options: [
          { text: '600', why: '60% of 1,000 is 600; of 2,000 it\'s 1,200.' },
          { text: '1,200' },
          { text: '1,600', why: 'That would be 80%.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton and David\'s bottom-up steps.',
        lines: ['Count hostels near campus', 'Multiply by rooms per hostel', 'Apply the share with the problem', 'Apply the share that already pays'],
      },
    ],
  },
  reflect: {
    prompt: 'Write one top-down and one bottom-up estimate for your idea. Where does each number come from?',
    starters: ['Top-down:...', 'Bottom-up:...'],
  },
  deepen: {
    title: 'Use both, trust one',
    summary: 'A top-down number can be a sanity check: if your bottom-up count is bigger than the whole market, something\'s wrong. But plan with the bottom-up number.',
  },
  notes: 'Fictional bottom-up estimate: 40 hostels × ~50 rooms = 2,000 reachable students; 60% (9/15) have the problem = 1,200; 40% (6/15) already pay sometimes = 800. Top-down (20,000 × 10%) is Clinton\'s guess.',
};

export default lesson;
