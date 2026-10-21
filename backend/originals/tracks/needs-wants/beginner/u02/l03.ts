import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Reading: the big three (housing, transport, food). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The big three',
  summary: 'For most people, three costs decide whether money lasts: housing, transport and food. Small decisions in these three often matter more than every small want put together.',
  minutes: 12,
  outcomes: [
    'Explain why housing, transport and food matter most',
    'Find the biggest lever in your own big three',
    'Make one big-three change instead of ten small ones',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Where most money goes',
      html: '<p>Household spending surveys in many countries find the same pattern: <strong>housing, transport and food</strong> make up the biggest share of what people spend, often well over half.</p><p>That means the biggest savings usually come from small changes to these three, not from giving up chocolate.</p><p><strong>Housing.</strong> Ada\'s rent is paid up for now. But when it\'s next due, the choice of where to live will matter more than any month of rides. A flatmate, a slightly smaller place, or a different neighbourhood can change the next two years. Housing decisions are rare, so they deserve real thought.</p><p><strong>Transport.</strong> Lagos traffic makes transport a huge cost in time and money. Ada\'s choice between rides and the bus is worth ₦20,000 to ₦35,000 a month. For people with cars, fuel, parking and repairs often cost far more than they realise.</p><p><strong>Food.</strong> The difference between cooking and eating out is one of the most reliable savings anywhere. Ada and Ngozi\'s shared Sunday cooking, with leftovers for lunch, beats ordering most days by about ₦25,000 a month.</p><p><strong>The lesson:</strong> before you cut a small joy, check whether one change to a big-three line would do the same job. Usually it would, with far less pain.</p>',
    },
    {
      kind: 'check',
      question: 'Which change probably saves Ada more each month?',
      options: ['Rides only on late nights and in rain', 'No more ₦500 sweets', 'Skipping one coffee a week'],
      answer: 0,
      explanation: 'Transport is a big-three line: about ₦20,000 a month, far more than small treats.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Housing, transport and food usually decide whether money lasts. Look for one big-three change before cutting small joys.',
    },
  ],
  apply: {
    scenario: 'Ada\'s big three.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each big-three line to a big lever.',
        pairs: [
          ['Housing', 'A flatmate or a different neighbourhood'],
          ['Transport', 'Rides only when needed'],
          ['Food', 'Shared cooking with leftovers'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do the big three matter so much?',
        options: [
          { text: 'They make up the biggest share of most people\'s spending' },
          { text: 'They\'re the most fun', why: 'They\'re the biggest, not the most fun.' },
          { text: 'They\'re easy to cut to zero', why: 'You can\'t cut them to zero; you can change them.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Big-three change, or small change?',
        groups: ['Big three', 'Small'],
        items: [
          { text: 'Cooking most nights instead of delivery', group: 0 },
          { text: 'One fewer chocolate bar a week', group: 1 },
          { text: 'Bus on dry mornings', group: 0 },
          { text: 'Cheaper toothpaste', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Transport saving ₦20,000 + food saving ₦25,000. Together?',
        answers: ['45000', '45,000', '₦45,000', '₦45000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'ll give up chocolate and coffee to find the money.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Keep the chocolate. Cooking with Ngozi and bussing on dry mornings saves about ₦45,000. Chocolate saves maybe ₦3,000.' },
          { text: 'Good start.', why: 'Small joys aren\'t where the money is.' },
          { text: 'Give up food.', why: 'A joke, but no.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The big three.',
        template: '[[1]], transport and [[2]].',
        blanks: [['Housing'], ['food']],
        distractors: ['Clothes', 'phones'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan ignores the big three?',
        lines: [
          'Cook with Ngozi on Sundays, leftovers for lunch.',
          'Rides on late nights and rainy days only.',
          'Stop buying gum to save money.',
        ],
        bug: 2,
        fix: 'Keep the gum; the big-three changes do the work.',
        explanation: 'Gum barely moves the total. The other two lines do.',
      },
      {
        kind: 'mcq',
        prompt: 'Ada\'s rent is paid up for now. Why still think about housing?',
        options: [
          { text: 'The next housing choice will shape the next two years of spending' },
          { text: 'To move tomorrow', why: 'Not needed now; plan for next time.' },
          { text: 'It doesn\'t matter', why: 'It\'s usually the biggest line of all.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Ada saves ₦45,000 a month for 6 months, how much is that?',
        answers: ['270000', '270,000', '₦270,000', '₦270000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to look for savings.',
        lines: ['Check the big three first', 'Find one change in each', 'Then look at small wants', 'Protect the joys you love'],
      },
    ],
  },
  reflect: {
    prompt: 'What are your big three costs? What one change in the biggest would save the most?',
    starters: ['My big three:...', 'The biggest is...', 'One change:...'],
  },
  deepen: {
    title: 'Rare decisions, big effects',
    summary: 'Where you live, how you get to work, and whether you cook are decided rarely but cost you every day. Ten minutes spent on one of these is often worth more than a month of cutting small treats.',
  },
  notes: 'Household expenditure surveys (e.g. national statistics offices; US BLS Consumer Expenditure Survey) show housing, transport and food as largest shares; stated qualitatively. Ada savings Ch2: transport −20,000, food −25,000 (running numbers in progress toward Ch5).',
};

export default lesson;
