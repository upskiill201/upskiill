import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16 — Reading the data like a nurse: sanity checks that only someone who knows the clinic would make. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Reading the data like a nurse',
  summary: 'Miracle can write the code; Halima knows the clinics. Together they go through the table asking one question: "Could this really happen?" Some odd values are mistakes. Some are the most important facts in the file.',
  minutes: 11,
  outcomes: [
    'Check values against what\'s possible in real life',
    'Tell a mistake from a rare but real value',
    'Filter out impossible rows, and note it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A wait of 400 days is a typo and should be removed.',
          isFact: true,
          explain: 'Fact. Afiya books at most a few weeks ahead; the longest real wait is 45 days. 400 can\'t be real. Remove it and log it.',
        },
        {
          text: 'Distances of 50 or 60 km are typos too, because most patients live within 18 km.',
          isFact: false,
          explain: 'Myth. They\'re all at Gumel, the rural clinic, where patients really do travel far. A nurse knows that. Removing them would erase Gumel\'s biggest problem.',
        },
        {
          text: 'If a value is rare, it must be wrong.',
          isFact: false,
          explain: 'Myth. Rare and impossible are different. Rare values are often the interesting ones. Ask "could this happen?", not "is this unusual?"',
        },
        {
          text: 'Someone who knows how the clinics work can catch errors that code alone would miss.',
          isFact: true,
          explain: 'Fact. Code finds unusual values. Knowing the clinics tells you which ones are impossible.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Could this happen?',
      caption: 'Look at the biggest values, then where they come from.',
      code: 'import pandas as pd\n\nraw = pd.read_csv("appointments_raw.csv")\nprint(raw["wait_days"].sort_values().tail(3))\n\ndf = pd.read_csv("appointments.csv")\nfar = df[df["distance_km"] > 18]\nprint(far["clinic"].unique())\n',
      challenge: 'Check the hour column: what are the earliest and latest appointment times?',
    },
  ],
  apply: {
    scenario: 'Sanity checks.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'In the raw export, count the bookings with a wait of more than 60 days',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nprint(len(df[df["wait_days"] > 60]))\n',
        hint: 'len(df[df["wait_days"] > 60])',
        checks: [{ message: 'Print 1', outputEquals: '1' }],
      },
      {
        kind: 'writeCode',
        prompt: 'In appointments.csv, print which clinics have patients living more than 18 km away',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nfar = df[df["distance_km"] > 18]\nprint(far["clinic"].unique())\n',
        hint: 'Filter distance_km > 18, then .unique() on clinic',
        checks: [{ message: 'Only Gumel', outputEquals: "['Gumel']" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A mistake to remove, or a real value to keep?',
        groups: ['Mistake', 'Real, keep it'],
        items: [
          { text: 'A 400-day wait', group: 0 },
          { text: 'A 60 km trip to Gumel', group: 1 },
          { text: 'An appointment at 3 a.m.', group: 0 },
          { text: 'A patient with 4 past no-shows', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'The distances over 18 km look like outliers. Remove them?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, outliers are always errors.', why: 'Unusual isn\'t the same as impossible.' },
          { text: 'No! They\'re all Gumel. Rural patients really travel that far, and it\'s probably why Gumel misses so much.' },
          { text: 'Remove all of Gumel.', why: 'Gumel is the clinic that needs the most help.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best question to ask about a strange value?',
        options: [
          { text: '"Could this really happen?"' },
          { text: '"Is it unusual?"', why: 'Real values can be unusual. Ask whether it\'s possible.' },
          { text: '"Will removing it improve the model?"', why: 'Removing real data to flatter a model hides problems.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Keep only the raw bookings with a wait of 60 days or less, then print the new largest wait',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df[df["wait_days"] <= 60]\nprint(df["wait_days"].max())\n',
        hint: 'df = df[df["wait_days"] <= 60]',
        checks: [{ message: 'Print 45', outputEquals: '45' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to what it found.',
        pairs: [
          ['Largest wait (raw)', '400: a typo'],
          ['Largest real wait', '45 days'],
          ['Distances over 18 km', 'All at Gumel'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Chidi\'s cleaning plan would hide a real problem?',
        lines: [
          'Remove the 400-day wait.',
          'Remove duplicate rows.',
          'Remove every distance over 18 km.',
          'Log every change.',
        ],
        bug: 2,
        fix: 'Keep the long distances: they\'re real Gumel patients.',
        explanation: 'Those distances are real, and they explain Gumel\'s high no-show rate.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep only possible waits.',
        language: 'python',
        template: 'df = df[df["wait_days"] [[1]] [[2]]]',
        blanks: [['<='], ['60']],
        distractors: ['>', '400'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which clinic do all the distances over 18 km belong to?',
        answers: ['Gumel'],
        placeholder: 'A clinic',
      },
    ],
  },
  reflect: {
    prompt: 'Halima saved Gumel\'s distances from being deleted. Where does your own knowledge of a place or job catch things a spreadsheet wouldn\'t?',
    starters: ['I know that...', 'A spreadsheet wouldn\'t know...'],
  },
  deepen: {
    title: 'Domain knowledge',
    summary: 'Data people call this domain knowledge: knowing how the real world behind the data works. It\'s one of the most valuable skills in ML, and nurses, drivers and shopkeepers have it in abundance.',
  },
  notes: 'appointments_raw.csv: one wait_days > 60 (the 400 typo); after removing it max 45. appointments.csv: urban distances 1-18 km, Gumel 5-60 km, so distance_km > 18 is Gumel only (generator rule).',
};

export default lesson;
