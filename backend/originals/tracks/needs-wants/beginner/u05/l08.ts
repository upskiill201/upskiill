import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Reading: the next raise, and the one after. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Planning the next raise',
  summary: 'Ada\'s next salary review is in six months. Last time, the raise vanished. This time, she\'s planning it now. Here\'s how to make sure income growth turns into a better life, not just a more expensive one.',
  minutes: 12,
  outcomes: [
    'Plan where a future raise will go before it arrives',
    'Upgrade your life on purpose, one step at a time',
    'Turn raises into progress on your goals',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Raises, on purpose',
      html: '<p>Ada\'s first raise taught her a hard lesson: without a plan, extra income turns into "normal life" within weeks. Her next review could add ₦80,000 a month. Here\'s her plan, written six months early:</p><p><strong>1. Split the increase now.</strong> Half to goals (car fund, emergency fund, laptop fund). A quarter to her values (a second course, a bigger family line). A quarter to upgrades she chooses.</p><p><strong>2. Pick upgrades in advance.</strong> She writes them down now, while she\'s calm: rides on Fridays, a better drawing tablet, a monthly dinner with her siblings. Upgrades chosen ahead of time feel like gifts. Upgrades that creep in feel like nothing.</p><p><strong>3. One upgrade at a time.</strong> She adds one, waits a month, and asks: did that make life better? (The treadmill lesson from Chapter 1.)</p><p><strong>4. Move savings the day the raise lands.</strong> The automatic transfer goes up the same week the new salary arrives, before she gets used to seeing the bigger number.</p><p><strong>5. Keep the line.</strong> Her basic versions don\'t change because she earns more. The bus is still fine on a dry morning.</p><p>This is how income growth becomes progress: each raise moves her closer to the car, the home, the career, not just to more expensive Tuesdays.</p>',
    },
    {
      kind: 'check',
      question: 'When should Ada raise her automatic savings transfer?',
      options: ['The same week the new salary arrives', 'After a few months, once she\'s used to it', 'Never'],
      answer: 0,
      explanation: 'Before she gets used to the bigger number. That\'s when creep starts.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Plan the next raise before it comes: split it, pick upgrades in advance, add one at a time, and move savings the day it lands.',
    },
  ],
  apply: {
    scenario: 'Ada\'s next raise.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'A ₦80,000 raise. Half to goals is how much?',
        answers: ['40000', '40,000', '₦40,000', '₦40000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the ₦80,000 split to its job.',
        pairs: [
          ['Half: ₦40,000', 'Goals: car, emergency, laptop'],
          ['A quarter for values: ₦20,000', 'Course and family line'],
          ['A quarter for upgrades: ₦20,000', 'Chosen in advance'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s raise plan.',
        lines: ['Split the increase now', 'Pick upgrades in advance', 'Move savings the day it lands', 'Add one upgrade at a time', 'Keep the basic versions'],
      },
      {
        kind: 'mcq',
        prompt: 'Why pick upgrades six months early?',
        options: [
          { text: 'Chosen calmly, they feel like gifts; crept-in ones feel like nothing' },
          { text: 'Shops need notice', why: 'It\'s about how upgrades feel.' },
          { text: 'No reason', why: 'Choosing ahead stops creep.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Planned upgrade, or creep?',
        groups: ['Planned upgrade', 'Creep'],
        items: [
          { text: 'Rides on Fridays, written down in advance', group: 0 },
          { text: 'Rides every day "because I earn more now"', group: 1 },
          { text: 'A better drawing tablet, chosen calmly', group: 0 },
          { text: 'Delivery most nights again', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I just save the whole raise?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'You could, but enjoying part of it on purpose makes the plan last. Half to goals, the rest split between values and chosen upgrades.' },
          { text: 'Yes, never enjoy anything.', why: 'Zero enjoyment makes plans break.' },
          { text: 'Spend it all.', why: 'That\'s last time.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Each raise moves you closer to your [[1]], not just to more expensive [[2]].',
        blanks: [['goals'], ['Tuesdays', 'habits']],
        distractors: ['friends', 'loans'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step lets the raise creep away?',
        lines: [
          'Split the increase six months early.',
          'Pick upgrades in advance.',
          'Raise savings once I\'ve "settled into" the new salary.',
        ],
        bug: 2,
        fix: 'Raise savings the same week the salary lands.',
        explanation: 'By the time you\'ve "settled in", the money has settled into spending.',
      },
      {
        kind: 'mcq',
        prompt: 'Why add upgrades one at a time?',
        options: [
          { text: 'So you can tell whether each one really makes life better' },
          { text: 'Shops limit you', why: 'It\'s about noticing value.' },
          { text: 'It\'s cheaper', why: 'It\'s about noticing.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If ₦40,000 a month goes to the car fund for 12 months, how much?',
        answers: ['480000', '480,000', '₦480,000', '₦480000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write your plan for your next income increase, however small: the split, and one upgrade you\'d choose on purpose.',
    starters: ['Split:...', 'My chosen upgrade:...'],
  },
  deepen: {
    title: 'Progress you can feel',
    summary: 'Research on happiness suggests people feel good about progress toward goals, not just the goals themselves. Turning each raise into visible progress (a fund that grows, a goal that gets closer) gives you that feeling every month.',
  },
  notes: 'Raise plan split 50/25/25 is a teaching device. Progress and wellbeing: goal-progress theory (e.g. Carver & Scheier); stated generally.',
};

export default lesson;
