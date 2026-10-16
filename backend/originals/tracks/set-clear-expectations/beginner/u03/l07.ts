import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Reading: realistic deadlines (planning fallacy; Buehler, Griffin & Ross 1994). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Deadlines people can hit',
  summary: 'Kavya says the payment-success page will take "a couple of hours". Arjun has heard "a couple of hours" before. It usually means two days. On the metro, Tey sends him something about why estimates are almost always too short.',
  minutes: 12,
  outcomes: [
    'Know what the planning fallacy is',
    'Set deadlines that are realistic, not hopeful',
    'Use past work to estimate future work',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why "a couple of hours" is never a couple of hours',
      html: "<p>Psychologists <strong>Daniel Kahneman</strong> and <strong>Amos Tversky</strong> named the <strong>planning fallacy</strong> (1979): our tendency to underestimate how long our own tasks will take, even when we know similar tasks took longer before.</p><p>In a well-known study by <strong>Roger Buehler, Dale Griffin and Michael Ross</strong> (1994), students estimated how long their final-year thesis would take. On average they predicted about 34 days. The average actually taken was about 55 days. Even their \"worst case\" estimates were too optimistic for most students.</p><h3>Why it happens</h3><p>When we plan, we imagine the task going smoothly. We forget the meetings, the bugs, the bad Wi-Fi day and the question we'll have to wait for. That's not laziness. It's how human imagination works.</p><h3>What helps</h3><ul><li><strong>Look at past work, not your plan.</strong> \"How long did the last similar page take?\" Kahneman called this taking the outside view.</li><li><strong>Break it into pieces.</strong> Small pieces are easier to estimate than one big blob.</li><li><strong>Ask the person doing it.</strong> Their estimate, adjusted by history, beats yours.</li><li><strong>Add buffer, out loud.</strong> \"Estimate: one day. Plan: two. Deadline: Thursday.\"</li></ul><h3>Why it matters for expectations</h3><p>An impossible deadline isn't a clear expectation. It's a failure scheduled in advance. People stop trusting deadlines that are always wrong.</p>",
    },
    {
      kind: 'check',
      question: 'What did students in Buehler\'s study predict, and what actually happened?',
      options: ['About 34 days predicted; about 55 taken', 'About 55 predicted; 34 taken', 'Spot on'],
      answer: 0,
      explanation: 'Even their worst-case guesses were too optimistic for most.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'We underestimate our own tasks. Look at past work. Break it into pieces. Ask the person doing it. Add buffer, out loud.',
    },
  ],
  apply: {
    scenario: 'The metro, reading about estimates.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the planning fallacy?',
        options: [
          { text: 'Planning too much', why: 'It\'s about time estimates.' },
          { text: 'Underestimating how long our own tasks will take' },
          { text: 'Not planning at all', why: 'Even careful planners fall for it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the researchers.',
        pairs: [
          ['Planning fallacy named', 'Kahneman and Tversky'],
          ['The thesis study', 'Buehler, Griffin and Ross'],
          ['The outside view', 'Kahneman'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps estimates, or not?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'How long did the last page take?', group: 0 },
          { text: 'Imagining it going smoothly', group: 1 },
          { text: 'Breaking it into pieces', group: 0 },
          { text: 'Picking the deadline you wish for', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The payment-success page? A couple of hours.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'How long did the order-email page take you? About a day? Let\'s plan a day and a half, and say Thursday.' },
          { text: 'Great, so done by 6 p.m.', why: 'Planning fallacy, accepted.' },
          { text: 'That\'s way too optimistic.', why: 'True, but ask about past work instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Looking at how long similar past work took is taking the ___ view. (one word)',
        answers: ['outside', 'Outside'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is an impossible deadline not a clear expectation?',
        options: [
          { text: 'It is clear', why: 'Clear and impossible isn\'t helpful.' },
          { text: 'It\'s a failure scheduled in advance, and people stop trusting deadlines' },
          { text: 'It makes people work faster', why: 'For a while, then trust drops.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for the last 15 days. Which line ignores the reading?',
        lines: [
          'Estimate each piece with the person doing it.',
          'Assume nothing goes wrong, so we finish on Day 26.',
          'Add a two-day buffer before Diwali.',
        ],
        bug: 1,
        fix: 'Compare each estimate with how long similar work took.',
        explanation: '"Assume nothing goes wrong" is exactly what the planning fallacy looks like.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a realistic estimate in order.',
        lines: ['Break it into pieces', 'Ask the person doing it', 'Compare with past work', 'Add buffer, out loud'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Look at past [[1]], not your [[2]].',
        blanks: [['work'], ['plan', 'hopes']],
        distractors: ['mistakes', 'boss'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s plan line.',
        tiles: ['Estimate', 'one', 'day,', 'plan', 'two.'],
        distractors: ['hope'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a task you estimated recently. How long did you think it would take, and how long did it take? What did you forget to imagine?',
    starters: ['I thought...', 'It took...', 'I forgot...'],
  },
  deepen: {
    title: 'Keep an estimate log',
    summary: 'For one week, write down how long you think each task will take, then how long it actually took. Your real ratio is your best estimating tool.',
  },
  notes: 'Daniel Kahneman & Amos Tversky (1979), "Intuitive prediction: Biases and corrective procedures", TIMS Studies in Management Science 12. Roger Buehler, Dale Griffin & Michael Ross (1994), "Exploring the planning fallacy", J. Personality & Social Psychology 67(3): thesis predictions averaged 33.9 days vs 55.5 actual. Outside view / reference class forecasting: Kahneman & Lovallo (1993).',
};

export default lesson;
