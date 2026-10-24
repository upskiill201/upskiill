import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { IMPORTS, PIPE_IMPORTS, RAW } from './code';

const BASE = IMPORTS + PIPE_IMPORTS + RAW + 'train = raw[raw["week"] <= 11]\n';

/** Chapter 8 · Lesson 6 — Filling missing values. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Filling missing values',
  summary: 'Emmanuel\'s raw export has 10 bookings with no distance. In Chapter 2 Halima deleted them. But next Monday, a patient with no distance still needs a prediction. Tey explains filling gaps instead.',
  minutes: 12,
  outcomes: [
    'Explain why deleting rows doesn\'t work at prediction time',
    'Fill gaps with SimpleImputer',
    'Learn the fill value from training data only',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'appointments_raw.csv has 10 bookings with a blank distance. What did you do in Chapter 2?', replies: ['Dropped them.'] },
        { tey: 'Fine for cleaning old data. But on Monday morning, a patient with no distance is still booked. You can\'t drop her from the call list; you still need a guess.', replies: ['So what do we put there?'] },
        { tey: 'A sensible stand-in. The usual choice is the median: the middle value. In the training weeks, the median distance is 10 km.', replies: ['Why not the average?'] },
        { tey: 'The average is pulled up by Gumel\'s 60 km patients. The median isn\'t. Here they\'re close (10.69 vs 10), but the median is the safer habit.', replies: ['Is there a tool for it?'] },
        { tey: 'SimpleImputer(strategy="median"). It learns the median when you fit it and fills blanks when you transform. Learn it from the training weeks only: Chapter 4\'s rule.', replies: ['Does filling hide anything?'] },
        { tey: 'It can. A blank might itself be a clue: maybe walk-ins never give a distance. Some people add a "was missing" yes/no column too. With 10 blanks out of 2,412, Halima keeps it simple.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Filling the gaps',
      caption: 'Learn the median on the training weeks, fill everywhere.',
      code: BASE + '\nprint("Blank distances:", raw["distance_km"].isna().sum())\nimputer = SimpleImputer(strategy="median").fit(train[["distance_km"]])\nprint("Fill value:", imputer.statistics_[0])\nfilled = imputer.transform(raw[["distance_km"]])\nprint("Blanks after:", pd.isna(filled).sum())\n',
      challenge: 'Try strategy="mean". What fill value do you get?',
    },
  ],
  apply: {
    scenario: 'Filling missing values.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many bookings in the raw export have a blank distance',
        starter: BASE,
        solution: BASE + 'print(raw["distance_km"].isna().sum())\n',
        hint: 'raw["distance_km"].isna().sum()',
        checks: [{ message: 'Print 10', outputEquals: '10' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why not just delete bookings with a blank distance?',
        options: [
          { text: 'Deleting is illegal', why: 'It\'s about needing a prediction.' },
          { text: 'At prediction time those patients still need a prediction' },
          { text: 'There are too many', why: 'There are only 10; the problem is next week\'s.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit SimpleImputer(strategy="median") on the training weeks\' distance and print its fill value',
        starter: BASE + 'imputer = SimpleImputer(strategy="median")\n',
        solution: BASE + 'imputer = SimpleImputer(strategy="median")\nimputer.fit(train[["distance_km"]])\nprint(imputer.statistics_[0])\n',
        hint: 'imputer.statistics_[0]',
        checks: [{ message: 'Print 10.0', outputEquals: '10.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good gap-filling habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Learn the median from training weeks', group: 0 },
          { text: 'Use the median when values are skewed', group: 0 },
          { text: 'Learn the fill value from week 12', group: 1 },
          { text: 'Fill blanks with 0 km', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Why not fill blanks with 0?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Zero is fine.', why: 'It\'s a strong, wrong claim.' },
          { text: 'Fill with 60, to be safe.', why: 'That\'s the opposite wrong claim.' },
          { text: 'Zero says "lives next door", which makes the patient look safer than she is. The median is a neutral guess.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the strategy to what it fills with.',
        pairs: [
          ['median', 'The middle value'],
          ['mean', 'The average'],
          ['most_frequent', 'The commonest value'],
          ['constant', 'A value you choose'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Filling gaps.',
        language: 'python',
        template: 'imputer = [[1]](strategy="[[2]]")',
        blanks: [['SimpleImputer'], ['median']],
        distractors: ['StandardScaler', 'zero'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line learns from the wrong rows?',
        language: 'python',
        lines: ['imputer = SimpleImputer(strategy="median")', 'imputer.fit(raw[["distance_km"]])', 'train_filled = imputer.transform(train[["distance_km"]])'],
        bug: 1,
        fix: 'imputer.fit(train[["distance_km"]])',
        explanation: 'Fitting on all rows includes week 12. Learn fill values from training weeks only.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rows would be left if you dropped the blanks from the 2,412-row raw export?',
        answers: ['2402', '2,402'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why might "was the distance missing?" be a useful extra column?',
        options: [
          { text: 'The blank itself might be a clue, like a walk-in who never gave an address' },
          { text: 'It makes the file bigger', why: 'Size isn\'t the point.' },
          { text: 'It replaces the imputer', why: 'It works alongside it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A form you filled in had an optional field you skipped. What might your blank tell someone?',
    starters: ['My blank might say...'],
  },
  deepen: {
    title: 'Smarter filling',
    summary: 'KNNImputer fills a blank from similar rows, like Chapter 3\'s neighbours. It\'s cleverer but slower, and easier to get wrong. Start with the median.',
  },
  notes: 'appointments_raw.csv after fixing " km" text: 10 blank distances (9 in weeks 1-11, 1 in week 12). Training median 10.0, mean 10.69. Dropping blanks leaves 2,402 rows.',
};

export default lesson;
