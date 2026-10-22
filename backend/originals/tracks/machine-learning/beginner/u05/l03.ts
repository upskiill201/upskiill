import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE } from './code';

/** Chapter 5 · Lesson 3 — Slope and starting point. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Slope and starting point',
  summary: 'Every straight line is just two numbers: how steeply it rises, and where it starts. Once you can read them, a line stops being a drawing and becomes a sentence Folake can use: "each extra hour brings about 0.7 bookings".',
  minutes: 11,
  outcomes: [
    'Name the slope and the starting point (intercept) of a line',
    'Turn a slope into a plain-English sentence',
    'Add a prediction column with one line of pandas',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: the slope.</strong> In bookings = 0.7 x hours - 3, the <strong>0.7</strong> is the slope: how much the prediction changes for one more hour. Open 10 hours longer, and the line predicts 7 more bookings.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: the starting point.</strong> The <strong>-3</strong> is where the line starts at 0 hours, called the <strong>intercept</strong>. Nobody opens a clinic for 0 hours, so -3 bookings isn\'t a real prediction. It just sets the line at the right height where the data actually is, between 22 and 60 hours.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: a whole column at once.</strong> pandas can apply the line to every week in one go: <code>train["pred"] = 0.7 * train["open_hours"] - 3</code>. Every row gets its own prediction, ready to compare with what really happened.</p>',
    },
    {
      kind: 'check',
      question: 'In bookings = 0.7 x hours - 3, what does 0.7 mean?',
      options: ['A clinic open 0 hours gets 0.7 bookings', 'Each extra hour adds about 0.7 bookings', '70% of patients come'],
      answer: 1,
      explanation: 'The slope is the change in the prediction for one more hour.',
    },
    {
      kind: 'tryIt',
      title: 'A prediction for every week',
      caption: 'One line of pandas.',
      code: BASE + '\ntrain = train.assign(pred=0.7 * train["open_hours"] - 3)\nprint(train[["clinic", "week", "open_hours", "bookings", "pred"]].head())\n',
      challenge: 'Change the slope to 0.5. What happens to the predictions for long weeks?',
    },
  ],
  apply: {
    scenario: 'Slope and starting point.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a pred column (0.7 x open_hours - 3) to train and print the first prediction, rounded to 1 place',
        starter: BASE,
        solution: BASE + 'train = train.assign(pred=0.7 * train["open_hours"] - 3)\nprint(round(train["pred"].iloc[0], 1))\n',
        hint: 'train.assign(pred=0.7 * train["open_hours"] - 3), then train["pred"].iloc[0]',
        checks: [{ message: 'Print 32.0', outputEquals: '32.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the line to its meaning.',
        pairs: [
          ['Slope (0.7)', 'Change per extra hour'],
          ['Intercept (-3)', 'Where the line starts at 0 hours'],
          ['hours', 'The input'],
          ['bookings', 'The prediction'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The line says -3 bookings at 0 hours. Is that a problem?',
        options: [
          { text: 'Yes: the line is broken', why: 'Only predictions inside the data\'s range matter.' },
          { text: 'Yes: bookings can\'t be negative, so the slope is wrong', why: 'The slope is fine. 0 hours is just outside the data.' },
          { text: 'No: no clinic opens 0 hours. The intercept just sets the line\'s height where the real data is' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Using the slope 0.7, print how many extra bookings 10 more opening hours would bring',
        starter: 'slope = 0.7\n',
        solution: 'slope = 0.7\nprint(slope * 10)\n',
        hint: 'slope * 10',
        checks: [{ message: 'Print 7.0', outputEquals: '7.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Slope or intercept?',
        groups: ['Slope', 'Intercept'],
        items: [
          { text: 'How steeply the line rises', group: 0 },
          { text: 'The prediction at 0 hours', group: 1 },
          { text: '"Each extra hour adds..."', group: 0 },
          { text: 'Sets the line\'s height', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'If Yaba opens 10 more hours a week, what do we get?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: '10 more.', why: 'The slope is 0.7 per hour, so about 7.' },
          { text: 'About 7 more bookings a week, if the pattern from last year holds.' },
          { text: 'It\'s -3.', why: 'That\'s the intercept, not the effect of 10 hours.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two numbers.',
        template: 'A straight line is a [[1]] and an [[2]].',
        blanks: [['slope'], ['intercept']],
        distractors: ['average', 'error'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line swaps the slope and the intercept?',
        language: 'python',
        lines: ['slope = 0.7', 'intercept = -3', 'pred = intercept * hours + slope'],
        bug: 2,
        fix: 'pred = slope * hours + intercept',
        explanation: 'The slope multiplies the input; the intercept is added.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'With slope 0.7, how many extra bookings would 5 more hours bring?',
        answers: ['3.5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which sentence would help Folake most?',
        options: [
          { text: '"The intercept is -3."', why: 'True, but not useful for a decision.' },
          { text: '"The line is straight."', why: 'True, and tells her nothing.' },
          { text: '"Each extra opening hour brings about 0.7 bookings."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write the slope of something in your life as a sentence: "each extra ___ brings about ___".',
    starters: ['Each extra...', 'brings about...'],
  },
  deepen: {
    title: 'y = mx + c',
    summary: 'School maths often writes a line as y = mx + c (or y = mx + b): m is the slope, c is the intercept. Same idea, different letters. Machine learning calls the slope a "coefficient" and the intercept... the intercept.',
  },
  notes: 'Yaba week 1: 50 hours -> 0.7 x 50 - 3 = 32.0. 0.7 x 10 = 7.0; 0.7 x 5 = 3.5. Training open_hours range 22-60.',
};

export default lesson;
