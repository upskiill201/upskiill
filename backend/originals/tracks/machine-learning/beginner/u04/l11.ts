import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 11 — The same booking twice: duplicates across a split. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The same booking twice',
  summary: 'Emmanuel\'s raw export has 12 bookings that appear twice. Split it at random and 6 of them land on both sides: the predictor gets to see the exact answer to some of its test questions. Three cards on why, and the fix.',
  minutes: 11,
  outcomes: [
    'Find duplicate rows in a table',
    'Explain how duplicates leak across a split',
    'Remove duplicates before splitting',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: duplicates happen.</strong> Exports glitch, a booking gets saved twice, a file gets appended to itself. Emmanuel\'s raw export, appointments_raw.csv, has 2,412 rows, and 12 of them are exact copies of other rows.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: a split can cut a pair in half.</strong> Shuffle the raw file and keep 75% for training, and 6 of the 12 duplicated bookings end up with one copy in training and one in the test set. For those 6, the test is a lookup: the predictor has already seen the exact booking and its answer.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: clean first, then split.</strong> Remove duplicates with drop_duplicates() before you split. In real health data the same idea applies to patients: if one patient has many visits, keep all of a patient\'s visits on the same side of the split, or the model can learn the person instead of the pattern.</p>',
    },
    {
      kind: 'check',
      question: 'When should you remove duplicates?',
      options: ['After testing', 'Only from the test set', 'Before splitting into train and test'],
      answer: 2,
      explanation: 'Clean first, so no booking can appear on both sides.',
    },
    {
      kind: 'tryIt',
      title: 'Copies across the split',
      caption: 'Raw file vs cleaned file.',
      code: 'import pandas as pd\n\nraw = pd.read_csv("appointments_raw.csv")\nprint(raw.duplicated().sum(), "duplicate rows")\n\ntrain = raw.sample(frac=0.75, random_state=42)\ntest = raw.drop(train.index)\nboth = set(train["appointment_id"]) & set(test["appointment_id"])\nprint(len(both), "bookings on both sides")\n\nclean = raw.drop_duplicates()\ntrain = clean.sample(frac=0.75, random_state=42)\ntest = clean.drop(train.index)\nprint(len(set(train["appointment_id"]) & set(test["appointment_id"])), "after cleaning")\n',
      challenge: 'Try random_state=7 on the raw file. Does the number on both sides change?',
    },
  ],
  apply: {
    scenario: 'The same booking twice.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load appointments_raw.csv and print how many duplicate rows it has',
        starter: 'import pandas as pd\nraw = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\nraw = pd.read_csv("appointments_raw.csv")\nprint(raw.duplicated().sum())\n',
        hint: 'raw.duplicated().sum()',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a duplicate on both sides of a split a problem?',
        options: [
          { text: 'It makes the file bigger', why: 'Size isn\'t the issue. Seeing the answer is.' },
          { text: 'The predictor has already seen that exact booking and its answer, so the test is a lookup' },
          { text: 'pandas will crash', why: 'Nothing crashes. That\'s why it\'s sneaky.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Split the raw file at random (frac=0.75, random_state=42) and print how many appointment IDs are in both parts',
        starter: 'import pandas as pd\nraw = pd.read_csv("appointments_raw.csv")\ntrain = raw.sample(frac=0.75, random_state=42)\ntest = raw.drop(train.index)\n',
        solution: 'import pandas as pd\nraw = pd.read_csv("appointments_raw.csv")\ntrain = raw.sample(frac=0.75, random_state=42)\ntest = raw.drop(train.index)\nprint(len(set(train["appointment_id"]) & set(test["appointment_id"])))\n',
        hint: 'set(train["appointment_id"]) & set(test["appointment_id"]), then len()',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the safe way.',
        lines: ['Load the raw export', 'Remove duplicate rows', 'Split into train and test', 'Learn and score'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix.',
        language: 'python',
        template: 'clean = raw.[[1]]()\ntrain = clean.[[2]](frac=0.75, random_state=42)',
        blanks: [['drop_duplicates'], ['sample']],
        distractors: ['dropna', 'head'],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'It\'s only 6 bookings out of 600. Does it matter?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No, ignore it.', why: 'It\'s a habit. Small now, big in real data.' },
          { text: 'Delete the test set instead.', why: 'Delete the duplicates, not the test.' },
          { text: 'Here it\'s small, but it\'s free marks the predictor didn\'t earn. In real data with many visits per patient it can be huge. Clean first, every time.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe or leaky?',
        groups: ['Safe', 'Leaky'],
        items: [
          { text: 'drop_duplicates() before splitting', group: 0 },
          { text: 'One patient\'s visits on both sides', group: 1 },
          { text: 'All of a patient\'s visits on one side', group: 0 },
          { text: 'Removing duplicates only from training', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is in the wrong place?',
        language: 'python',
        lines: ['train = raw.sample(frac=0.75, random_state=42)', 'test = raw.drop(train.index)', 'train = train.drop_duplicates()'],
        bug: 2,
        fix: 'Run drop_duplicates() on raw before splitting',
        explanation: 'Cleaning after the split can\'t stop a pair being cut in half.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The raw file has 2,412 rows and 12 duplicates. How many rows are left after drop_duplicates()?',
        answers: ['2400', '2,400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A hospital has 5 visits for the same patient. How should they be split?',
        options: [
          { text: 'All 5 on the same side, train or test' },
          { text: 'Spread across both sides', why: 'Then the model can recognise the person from training.' },
          { text: 'Delete 4 of them', why: 'They\'re real visits. Just keep them together.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where in your own data, like contacts, receipts or playlists, would you expect duplicates? How would they mislead you?',
    starters: ['I\'d expect duplicates in...', 'They\'d mislead me by...'],
  },
  deepen: {
    title: 'Group splits',
    summary: 'When rows belong to groups (patients, customers, schools), split by group, not by row. scikit-learn has a tool for this, GroupShuffleSplit, for when you meet it.',
  },
  notes: 'appointments_raw.csv: 2,412 rows, 12 exact duplicates (12 IDs appear twice). frac=0.75 random_state=42 on raw: 6 IDs in both parts. After drop_duplicates (2,400 rows): 0. appointments.csv has no patient ID, so the patient-level point is made in words.',
};

export default lesson;
