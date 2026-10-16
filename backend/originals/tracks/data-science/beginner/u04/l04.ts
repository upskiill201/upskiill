import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Story: Baraka only drives long routes. Comparing like with like. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Like with like',
  summary: '2 weeks to Kamau. Zanele checks Baraka\'s trips. His average distance is 381 km. Everyone else\'s is between 102 and 139. Every one of his 73 trips is a long route. Comparing him with drivers doing city runs isn\'t fair. So she compares long routes with long routes.',
  minutes: 12,
  outcomes: [
    'Spot when two groups aren\'t comparable',
    'Compare like with like by filtering first',
    'Report a smaller, honest gap instead of a dramatic one',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Baraka, two ways',
      before: {
        label: 'All trips',
        text: 'Baraka: 60% late. Juma: 20%. "Baraka is three times worse than Juma."',
      },
      after: {
        label: 'Long routes only (over 250 km)',
        text: 'Baraka: 60% late (73 trips). Everyone else on long routes: 49% (35 trips). Short routes: 25%, whoever drives. The gap between drivers is much smaller than it looked.',
      },
      notes: [
        'Baraka gets most of the long routes (73 of 108): Mombasa to Nairobi, Nairobi to Eldoret and Kisumu. Long routes are late far more often, whoever drives them.',
        'When two groups differ in something else that matters (here, distance), compare inside matching slices.',
        'Honest finding: Baraka may be a bit slower on long routes, and 35 trips for everyone else is not much. That\'s a conversation about long routes, not an HR email.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Compare long with long',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("driver")["distance_km"].mean().round(0))\n\nlong = df[df["distance_km"] > 250]\nbaraka = long[long["driver"] == "Baraka"]\nothers = long[long["driver"] != "Baraka"]\nprint("Baraka", len(baraka), round(baraka["is_late"].mean(), 2))\nprint("Others", len(others), round(others["is_late"].mean(), 2))\n',
      caption: 'Press Run. First each driver\'s average distance, then long routes only.',
      challenge: 'Compare short routes (distance_km <= 250): what\'s the late rate for everyone? (Baraka has none.)',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'emeka', text: '(long silence, then unmuting) I gave Baraka the long routes. He\'s the only one who doesn\'t complain about them.' },
        { speaker: 'zanele', text: 'So the driver who takes the hardest trips without complaining was about to be reported to HR.' },
        { speaker: 'emeka', text: 'I\'m deleting the email.' },
      ],
    },
  ],
  apply: {
    scenario: 'Is it Baraka, or his routes?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print each driver\'s mean distance, rounded to the nearest km.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.groupby("driver")["distance_km"].mean().round(0))\n',
        hint: 'df.groupby("driver")["distance_km"].mean().round(0)',
        checks: [
          { message: 'Show Baraka 381', outputIncludes: 'Baraka 381' },
          { message: 'Group by driver', codeIncludes: 'groupby("driver")' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Baraka 60% vs Juma 20%" an unfair comparison?',
        options: [
          { text: 'Juma is more experienced', why: 'Nothing in the data says that.' },
          { text: 'The numbers are wrong', why: 'They\'re right. They\'re just not comparable.' },
          { text: 'Baraka drives long routes, which are late more often whoever drives' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'On long routes (over 250 km), print the late rate of everyone except Baraka, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nlong = df[df["distance_km"] > 250]\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nlong = df[df["distance_km"] > 250]\nothers = long[long["driver"] != "Baraka"]\nprint(round(others["is_late"].mean(), 2))\n',
        hint: 'others = long[long["driver"] != "Baraka"]',
        checks: [
          { message: 'Print 0.49', outputIncludes: '0.49' },
          { message: 'Use !=', codeIncludes: '!=' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A fair comparison, or not?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Baraka\'s long trips vs others\' long trips', group: 0 },
          { text: 'Baraka\'s long trips vs Juma\'s city runs', group: 1 },
          { text: 'Saturday vs Wednesday, all depots', group: 0 },
          { text: 'A big depot\'s count vs a small depot\'s count', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Long routes only.',
        template: 'long = df[df["distance_km"] [[1]] 250]',
        blanks: [['>']],
        distractors: ['<', '=='],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'So Baraka\'s fine?',
        prompt: 'Zanele\'s most honest reply?',
        options: [
          { text: 'He\'s perfect.', why: 'On long routes he\'s still a bit higher: 60% vs 49%.' },
          { text: 'Mostly it\'s the routes. On long trips he\'s a bit higher than the others, but they\'ve only done 35. Worth a chat about long routes, not an HR case.' },
          { text: 'He\'s still the worst.', why: 'The fair gap is small, and the others\' sample is small.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Short routes (250 km or less): print the late rate for everyone, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nshort = df[df["distance_km"] <= 250]\nprint(round(short["is_late"].mean(), 2))\n',
        hint: 'short = df[df["distance_km"] <= 250]',
        checks: [
          { message: 'Print 0.25', outputIncludes: '0.25' },
          { message: 'Use <= 250', codeIncludes: '<= 250' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion goes too far?',
        lines: ['Baraka drives most of the long routes.', 'Long routes are late more often.', 'So long routes are late because Baraka drives them.'],
        bug: 2,
        fix: 'Other drivers\' long routes are late often too: 49%.',
        explanation: 'The others are late on long routes too. The route length matters whoever drives.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the group to its late rate.',
        pairs: [
          ['Baraka, long routes', '60%'],
          ['Others, long routes', '49%'],
          ['Everyone, short routes', '25%'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Compare like with ___. (one word)',
        answers: ['like'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a comparison that\'s unfair because the groups face different conditions (schools, hospitals, teams). How would you make it fair?',
    starters: ['It\'s unfair to compare...', 'To be fair I\'d compare...'],
  },
  deepen: {
    title: 'Hospital league tables',
    summary: 'Hospitals that take the sickest patients can look worst on death rates. Look up "case-mix adjustment": the grown-up name for comparing like with like.',
  },
  notes: 'deliveries_clean.csv mean distance: Baraka 380.6 (all 73 trips > 250 km), Wanjiru 138.6, Kiprop 126.3, Mwangi 108.7, Auma 106.0, Juma 101.8. Long routes (> 250 km): Baraka 0.603 (73), others 0.486 (35). Short routes (<= 250): 0.253 (292). Weekday long routes: Baraka 0.53 (59) vs others 0.36 (28), still small. Case-mix adjustment is standard in hospital outcome reporting (e.g. NHS SHMI).',
};

export default lesson;
