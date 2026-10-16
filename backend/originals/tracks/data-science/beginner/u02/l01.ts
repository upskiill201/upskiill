import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: Felix's real export has 408 rows, not 400. Comparing two files. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '408, not 400',
  summary: '4 weeks to Kamau. Monday. Felix sends the real export, straight from the delivery system. March had 400 deliveries. The file has 408 rows. Zanele hasn\'t cleaned anything yet, and already something doesn\'t add up.',
  minutes: 11,
  outcomes: [
    'Load the raw file and compare it with what you expected',
    'Spot that a row count is wrong before analysing anything',
    'Know why analysts always keep the raw export',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9:05 a.m.',
      beats: [
        { speaker: 'felix', text: 'deliveries.csv. The real one, straight out of the system. No tidying. Promise.' },
        { speaker: 'zanele', text: '(running it) (408, 13). Felix, March had 400 deliveries. Where did eight extra ones come from?' },
        { speaker: 'felix', text: 'The depots type them in at the end of each day. Sometimes the system hiccups and saves twice. Sometimes people... improvise.' },
        { speaker: 'remi', text: 'So if we\'d used this straight away, we\'d have counted some deliveries twice?' },
      ],
      choice: {
        prompt: 'What should Zanele do now?',
        options: [
          {
            text: 'Look properly at what\'s wrong before changing anything.',
            outcome: 'She lists every problem first. This week, she finds five kinds of mess. Each one would have bent the answer.',
            best: true,
          },
          {
            text: 'Delete the last 8 rows so it says 400.',
            outcome: 'The extra rows aren\'t at the end. She\'d delete 8 real deliveries and keep the duplicates.',
          },
          {
            text: 'Go back to Felix\'s tidy file.',
            outcome: 'Easier, but she\'d never know what "tidy" changed, and Kamau will ask.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The real export',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw.shape)\nprint(raw.head(5))\n',
      caption: 'Press Run. 408 rows. Look at row 3 (the 4th row): its city is "kisumu", lower case. That\'s the first sign of mess.',
      challenge: 'Print raw.tail() for the last 5 rows. Anything odd?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Name the raw file something you\'ll never confuse: raw. Clean a copy. The raw data is your evidence.',
    },
  ],
  apply: {
    scenario: 'Felix\'s real export arrives.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load deliveries.csv into a variable called raw and print its shape.',
        starter: 'import pandas as pd\n\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw.shape)\n',
        hint: 'raw = pd.read_csv("deliveries.csv"), then print(raw.shape).',
        checks: [
          { message: 'Print (408, 13)', outputIncludes: '(408, 13)' },
          { message: 'Call it raw', expr: 'len(raw) == 408' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'March had 400 deliveries. The file has 408 rows. What\'s the most likely reason?',
        options: [
          { text: 'March had 408 deliveries', why: 'The delivery IDs only go up to D1400.' },
          { text: 'Some deliveries were saved twice' },
          { text: 'pandas added rows', why: 'pandas reads exactly what\'s in the file.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Load both files and print how many extra rows the raw one has: len(raw) - len(clean).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nclean = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nclean = pd.read_csv("deliveries_clean.csv")\nprint(len(raw) - len(clean))\n',
        hint: 'print(len(raw) - len(clean))',
        checks: [
          { message: 'Print 8', outputEquals: '8' },
          { message: 'Use len()', codeIncludes: 'len(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe first step, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'Count the rows', group: 0 },
          { text: 'Delete rows until it says 400', group: 1 },
          { text: 'Look at the first and last rows', group: 0 },
          { text: 'Edit the raw file by hand', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Sometimes the system saves twice. Sometimes people improvise. Is that a problem?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Huge. You\'ve ruined everything.', why: 'Every real dataset is like this. Felix is her best source.' },
          { text: 'Only a small one. I\'ll ignore it.', why: 'Eight duplicates could change the answer.' },
          { text: 'It\'s normal. Can you tell me how the depots enter data? It\'ll help me find what to fix.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep the raw data under a clear name.',
        template: '[[1]] = pd.read_csv("deliveries.csv")',
        blanks: [['raw']],
        distractors: ['clean', 'final'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s plan. Which step is a mistake?',
        lines: ['Load the raw export.', 'Count the rows and compare with 400.', 'Fix problems by typing over the raw file.', 'List every kind of mess before cleaning.'],
        bug: 2,
        fix: 'Fix problems in code, on a copy, so the raw file stays as evidence.',
        explanation: 'Edits by hand leave no record. Nobody, including Zanele, could check what changed.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the file to what it is.',
        pairs: [
          ['deliveries.csv', 'The real export: 408 rows'],
          ['deliveries_clean.csv', 'Felix\'s tidied version: 400 rows'],
          ['raw', 'Zanele\'s name for the untouched data'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'raw = pd.read_csv("deliveries.csv")\nprint(len(raw))',
        language: 'python',
        options: [
          { text: '408' },
          { text: '400', why: 'That\'s the true number of deliveries, not rows in this file.' },
          { text: '13', why: 'That\'s the number of columns.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many more rows does the raw file have than March had deliveries?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a list you rely on (a contact list, a stock sheet, a class register). How might it have duplicates or mistakes in it?',
    starters: ['It might have...', 'I\'d find out by...'],
  },
  deepen: {
    title: 'Check the count',
    summary: 'Next time you get a spreadsheet, check the number of rows against what you expected before doing anything else.',
  },
  notes: 'deliveries.csv (teyro_datasets.py __teyro_make_messy): 408 rows = 400 + 8 duplicates; row index 3 is D1004 with city "kisumu". IDs run D1001-D1400.',
};

export default lesson;
