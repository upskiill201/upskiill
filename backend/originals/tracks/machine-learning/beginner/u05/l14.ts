import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, SK_BASE } from './code';

/** Chapter 5 · Lesson 14 — When a line is the wrong shape: nurses level off. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'When a line is the wrong shape',
  summary: 'Bisi, who knows every clinic, says: "Going from 2 nurses to 3 changes everything. Going from 5 to 6? Nothing." The averages agree with her. A straight line can\'t bend, so it gets both ends wrong. Tey explains what to do about it.',
  minutes: 12,
  outcomes: [
    'Spot a pattern that curves or levels off',
    'See where a straight line goes wrong on it',
    'Know the options when a line is the wrong shape',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Bisi\'s right. Average bookings by number of nurses, training weeks: 2 nurses: 22.9. 3: 28.0. 4: 30.7. Then 5: 28.4 and 6: 29.5. Rising, then flat.', replies: ['And the line?'] },
        { tey: 'A line on nurses alone says 25.1, 26.4, 27.8, 29.2, 30.5. It rises the same amount every time, because that\'s all a line can do.', replies: ['Where does it go wrong?'] },
        { tey: 'Too high at 2 nurses (25.1 vs 22.9), too low at 3 and 4, then too high again at 6. It averages the steep start and the flat end into one slope.', replies: ['What can we do?'] },
        { tey: 'Three options. Use the numbers as groups instead of a line ("2 nurses", "3 or more"). Make a new feature that captures the bend, like "nurses, capped at 4". Or use a model that can bend, like the decision trees in Chapter 6.', replies: ['How do I spot this?'] },
        { tey: 'Average the target for each value of the feature, the way you just did, and look at the shape. If it bends, a line will miss at the ends.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Real averages vs the line',
      caption: 'Nurses: the shape a line can\'t follow.',
      code: SK_BASE + '\nmodel = LinearRegression().fit(train[["nurses"]], train["bookings"])\nreal = train.groupby("nurses")["bookings"].mean()\nfor n in [2, 3, 4, 5, 6]:\n    line = model.predict(pd.DataFrame({"nurses": [n]}))[0]\n    print(n, "nurses: real", round(real[n], 1), " line", round(line, 1))\n',
      challenge: 'Where is the gap between real and line biggest?',
    },
  ],
  apply: {
    scenario: 'The wrong shape.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the average training bookings for each number of nurses, rounded to 1 place, as a list',
        starter: BASE,
        solution: BASE + 'print(train.groupby("nurses")["bookings"].mean().round(1).tolist())\n',
        hint: 'train.groupby("nurses")["bookings"].mean().round(1).tolist()',
        checks: [{ message: 'Print [22.9, 28.0, 30.7, 28.4, 29.5]', outputEquals: '[22.9, 28.0, 30.7, 28.4, 29.5]' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a straight line struggle with nurses?',
        options: [
          { text: 'Nurses don\'t affect bookings', why: 'They do, a lot at first.' },
          { text: 'There aren\'t enough rows', why: 'There are plenty. The shape is the problem.' },
          { text: 'The real effect rises steeply then levels off, but a line rises the same amount every step' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit a line on nurses alone and print its slope, rounded to 2 places',
        starter: SK_BASE + 'model = LinearRegression()\n',
        solution: SK_BASE + 'model = LinearRegression()\nmodel.fit(train[["nurses"]], train["bookings"])\nprint(round(model.coef_[0], 2))\n',
        hint: 'model.fit(train[["nurses"]], train["bookings"])',
        checks: [{ message: 'Print 1.37', outputEquals: '1.37' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the nurses to the real training average.',
        pairs: [
          ['2 nurses', '22.9'],
          ['3 nurses', '28.0'],
          ['4 nurses', '30.7'],
          ['6 nurses', '29.5'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is the line too high or too low here?',
        groups: ['Line too high', 'Line too low'],
        items: [
          { text: '2 nurses: line 25.1, real 22.9', group: 0 },
          { text: '3 nurses: line 26.4, real 28.0', group: 1 },
          { text: '4 nurses: line 27.8, real 30.7', group: 1 },
          { text: '6 nurses: line 30.5, real 29.5', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So should every clinic hire a sixth nurse?',
        prompt: 'Bisi\'s best reply?',
        options: [
          { text: 'Not for bookings. Going from 2 to 3 nurses helps a lot; after 4, last year\'s numbers barely move.' },
          { text: 'Yes, the line says +1.37 each.', why: 'The line hides the levelling off.' },
          { text: 'Nurses make no difference.', why: 'The first extra nurse makes a big one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'How to spot it.',
        template: 'Average the [[1]] for each value of the feature. If the shape [[2]], a line will miss at the ends.',
        blanks: [['target', 'bookings'], ['bends', 'curves']],
        distractors: ['week', 'grows'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion goes wrong?',
        lines: ['Real averages: 22.9, 28.0, 30.7, 28.4, 29.5.', 'The line\'s slope is 1.37 per nurse.', 'So every extra nurse adds 1.37 bookings, from 2 to 6.'],
        bug: 2,
        fix: 'The first extra nurses add a lot; after about 4, almost nothing.',
        explanation: 'The slope averages a steep start and a flat end.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'From 2 to 3 nurses, real bookings rise from 22.9 to 28.0. By how much?',
        answers: ['5.1'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which model in the next chapter can bend to fit shapes like this?',
        options: [
          { text: 'A longer line', why: 'Any straight line rises evenly.' },
          { text: 'The average baseline', why: 'It doesn\'t use nurses at all.' },
          { text: 'A decision tree' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Name something where "more" helps at first and then stops helping, like sleep, coffee or study hours.',
    starters: ['For me...', 'It levels off when...'],
  },
  deepen: {
    title: 'Diminishing returns',
    summary: 'Effects that level off are everywhere: the first fertiliser helps a crop, the tenth doesn\'t. Spotting them early stops a line from promising gains that never come.',
  },
  notes: 'Train weeks 1-40. Mean bookings by nurses: 2 22.9, 3 28.0, 4 30.7, 5 28.4, 6 29.5. Line on nurses alone: coef 1.37, intercept 22.31 -> 25.1, 26.4, 27.8, 29.2, 30.5. Planted effect: 18 x (1 - exp(-1.1 x (nurses - 1))).',
};

export default lesson;
