import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Reading: joy per naira. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Joy per naira',
  summary: 'Some spending makes Ada genuinely happier. Some barely registers. Research on money and happiness suggests a few kinds of spending reliably give more joy per naira. Here\'s what they are.',
  minutes: 12,
  outcomes: [
    'Name the kinds of spending that tend to bring more happiness',
    'Measure your own "joy per naira"',
    'Move money towards spending that lasts',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What research says about happy spending',
      html: '<p>Psychologists Elizabeth Dunn and Michael Norton, in their book <em>Happy Money</em> (2013), gathered research on which kinds of spending tend to make people happier. A few patterns stand out:</p><ul><li><strong>Experiences over things.</strong> Trips, classes, meals with people. They become stories, and they\'re harder to compare. (Ada\'s art class and Mexico City.)</li><li><strong>Spending on others.</strong> In several studies, people who spent money on someone else felt happier than those who spent the same amount on themselves. (Ada\'s family support, and the aso-ebi.)</li><li><strong>Buying time.</strong> Paying to avoid tasks you hate can increase happiness, if it frees time for things you value. (Some delivery on deadline nights.)</li><li><strong>Making it a treat.</strong> Things you have occasionally stay pleasurable; things you have every day stop being special. (Friday dinners, not daily delivery.)</li></ul><p><strong>Joy per naira.</strong> A useful habit: for each spending line, ask "how much does this actually add to my life?" and compare it with the cost. Ada scores her lines out of 10:</p><ul><li>Art class (₦15,000): 10.</li><li>Friday dinners (₦32,000): 9.</li><li>Family support (₦40,000): 10.</li><li>Random online shopping (₦35,000): 2.</li><li>Daily delivery when not tired: 3.</li></ul><p>The lines with low joy per naira are where the next savings come from, and they hurt the least to cut.</p>',
    },
    {
      kind: 'check',
      question: 'Which of Ada\'s lines has the lowest joy per naira?',
      options: ['Random online shopping: ₦35,000 for a 2 out of 10', 'Art class: ₦15,000 for a 10', 'Family support: ₦40,000 for a 10'],
      answer: 0,
      explanation: 'High cost, low joy. That\'s where to cut.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Score each spending line out of 10 for how much it adds to your life. Cut the low scores; protect the high ones.',
    },
  ],
  apply: {
    scenario: 'Ada\'s joy scores.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of happy spending to Ada\'s example.',
        pairs: [
          ['Experiences', 'Art class, Mexico City'],
          ['Spending on others', 'Family support'],
          ['Buying time', 'Delivery on deadline nights'],
          ['Making it a treat', 'Friday dinners, not daily'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'High joy per naira, or low?',
        groups: ['High', 'Low'],
        items: [
          { text: 'Art class: ₦15,000, scored 10', group: 0 },
          { text: 'Online shopping: ₦35,000, scored 2', group: 1 },
          { text: 'Friday dinners: ₦32,000, scored 9', group: 0 },
          { text: 'Unused gym: ₦12,000, scored 1', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In several studies, what happened when people spent money on others?',
        options: [
          { text: 'They felt happier than when spending the same on themselves' },
          { text: 'They felt poorer', why: 'The studies found a happiness boost.' },
          { text: 'No difference', why: 'There was a difference in several studies.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So delivery is "buying time" and that\'s good?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'On deadline nights, when it frees time you value, yes. On a relaxed Tuesday, it\'s just habit. Keep the first, cut the second.' },
          { text: 'Yes, order every day.', why: 'Only when it truly frees valuable time.' },
          { text: 'Never order.', why: 'Sometimes it\'s a good trade.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The habit.',
        template: 'Score each line out of [[1]]. Cut the [[2]] scores; protect the high ones.',
        blanks: [['10', 'ten'], ['low']],
        distractors: ['100', 'high'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Online shopping ₦35,000 for a score of 2. Naira per joy point?',
        answers: ['17500', '17,500', '₦17,500', '₦17500'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Art class ₦15,000 for a score of 10. Naira per joy point?',
        answers: ['1500', '1,500', '₦1,500', '₦1500'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion goes against joy per naira?',
        lines: [
          'Keep the art class: high joy, low cost.',
          'Cut most online shopping: high cost, low joy.',
          'Cut Friday dinners first because they\'re ₦32,000.',
        ],
        bug: 2,
        fix: 'Keep Friday dinners: they score 9.',
        explanation: 'Cost alone isn\'t the test. Joy per naira is.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do daily treats score lower than occasional ones?',
        options: [
          { text: 'Things you have every day stop feeling special' },
          { text: 'They cost less', why: 'They usually cost more in total.' },
          { text: 'They don\'t', why: 'Occasional treats tend to stay special.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to use joy per naira.',
        lines: ['List each spending line', 'Score its joy out of 10', 'Compare with the cost', 'Cut low scores', 'Protect high scores'],
      },
    ],
  },
  reflect: {
    prompt: 'Score five of your spending lines out of 10. Which has the lowest joy per naira (or per cedi, shilling or pound)?',
    starters: ['Highest:...', 'Lowest:...', 'I\'ll cut...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Dunn and Norton\'s Happy Money (2013) is short and readable. The key study on spending on others: Dunn, Aknin and Norton (2008), "Spending money on others promotes happiness", Science.',
  },
  notes: 'Dunn, E. W., Aknin, L. B., & Norton, M. I. (2008). Science, 319(5870), 1687–1688. Whillans et al. (2017) on buying time (PNAS). Dunn & Norton (2013). Joy scores fictional. Friday dinners 8,000 × 4 = 32,000.',
};

export default lesson;
