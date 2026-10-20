import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: sizing in four steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Sizing in four steps',
  summary: 'David turns their Saturday notebook into a market size in four steps. The answer is smaller than Clinton\'s slide, and much more useful: it tells him what WashDay could earn in a month.',
  minutes: 12,
  outcomes: [
    'Size a market in four bottom-up steps',
    'Turn customers into money per month',
    'Show every step so others can check it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From hostels to francs',
      steps: [
        { title: '1. Who can you reach?', body: '40 hostels × about 50 rooms = 2,000 students within 15 minutes of campus.' },
        { title: '2. Who has the problem?', body: '9 of 15 interviewees raised laundry: 60%. 60% of 2,000 = 1,200 students.' },
        { title: '3. Who already pays for help?', body: '6 of 15 had paid Mama Rose this semester: 40% of everyone. 40% of 2,000 = 800 likely customers.' },
        { title: '4. How often, and for how much?', body: 'Those who pay do it about twice a month in rainy season. At a guessed 1,500 FCFA a bag: 800 × 2 × 1,500 = 2,400,000 FCFA a month.' },
        { title: 'Show your working', body: 'Write every step and its source. If David doubts the 40%, he can see where it came from and challenge it. That\'s the point.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Customers × times per month × price = money per month. Each number needs a source.',
    },
  ],
  apply: {
    scenario: 'Doing the sums.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four steps.',
        lines: ['Who can you reach?', 'Who has the problem?', 'Who already pays for help?', 'How often, and for how much?'],
      },
      {
        kind: 'typeAnswer',
        prompt: '60% of the 2,000 reachable students have the problem. How many students?',
        answers: ['1200', '1,200'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '800 customers, twice a month, 1,500 FCFA a bag. How much a month?',
        options: [
          { text: '2,400,000 FCFA' },
          { text: '1,200,000 FCFA', why: 'Twice a month doubles it: 800 × 2 × 1,500.' },
          { text: '24,000 FCFA', why: '800 × 2 × 1,500 = 2,400,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its number.',
        pairs: [
          ['Reachable students', '2,000'],
          ['With the problem', '1,200'],
          ['Already pay sometimes', '800'],
          ['Bags per customer each month', '2'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: '2.4 million a month! I\'m rich!',
        prompt: "David's best reply?",
        options: [
          { text: 'That\'s if every one of the 800 used WashDay. You can\'t carry 1,600 bags a month on one bicycle. Next lesson: what you can actually win.' },
          { text: 'Yes, start spending it.', why: 'It\'s the whole reachable market, not his share.' },
          { text: 'The sums are wrong.', why: 'The sums are right; the meaning is what matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The formula.',
        template: 'Customers × times per [[1]] × [[2]] = money per month.',
        blanks: [['month'], ['price']],
        distractors: ['year', 'likes'],
      },
      {
        kind: 'typeAnswer',
        prompt: '800 customers each send 2 bags a month. How many bags is that in a month?',
        answers: ['1600', '1,600'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step has no source?',
        lines: [
          'Reachable: 2,000 (40 hostels counted × 50 rooms from caretakers).',
          'Problem: 60% (9 of 15 interviews).',
          'Pay: 40% (6 of 15 paid Mama Rose).',
          'Frequency: 5 times a month (seems likely).',
        ],
        bug: 3,
        fix: 'Frequency: about twice a month (what payers told him).',
        explanation: '"Seems likely" isn\'t a source; the interviews said twice a month.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step does this number belong to?',
        groups: ['Reach', 'Problem', 'Pay'],
        items: [
          { text: '40 hostels × 50 rooms', group: 0 },
          { text: '9 of 15 raised laundry', group: 1 },
          { text: '6 of 15 paid Mama Rose', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write down the source of every number?',
        options: [
          { text: 'So anyone can check it, challenge it and improve it' },
          { text: 'To make the slide longer', why: 'It\'s about trust, not length.' },
          { text: 'Sources don\'t matter if the maths is right', why: 'Right maths on a made-up number is still made up.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Size your own market in the four steps. Which of your numbers is weakest?',
    starters: ['Reach:...', 'My weakest number is...'],
  },
  deepen: {
    title: 'Ranges, not single numbers',
    summary: 'Good estimates often show a low and a high: if 30% to 40% pay, the market is 1.8 to 2.4 million FCFA a month. A range is more honest than one precise-looking number.',
  },
  notes: 'Fictional sizing: 2,000 reachable × 60% = 1,200 with the problem; 40% of 2,000 = 800 already pay sometimes; 800 × 2 bags/month × 1,500 FCFA (guessed price) = 2,400,000 FCFA/month; 1,600 bags/month.',
};

export default lesson;
