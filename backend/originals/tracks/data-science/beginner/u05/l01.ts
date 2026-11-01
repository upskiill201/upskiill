import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: Emeka wants new trucks. Trucks are the long routes. Correlation isn't causation. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The truck theory',
  summary: 'Kamau week. Monday. Emeka has a quote for six new trucks: "Trucks are late 57% of the time. New trucks, problem solved." Zanele checks one thing first: which deliveries go by truck?',
  minutes: 12,
  outcomes: [
    'Explain why correlation isn\'t causation',
    'Find a confounder: a third thing behind both',
    'Check whether two columns are really the same thing',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9:00 a.m.',
      beats: [
        { speaker: 'emeka', text: 'I\'ve got a quote for six new trucks. Trucks are late 57% of the time, vans 26%. New trucks, problem solved.' },
        { speaker: 'zanele', text: 'Which deliveries go by truck?' },
        { speaker: 'emeka', text: 'The long ones. Anything over 250 km. Vans can\'t do those.' },
        { speaker: 'zanele', text: 'So "truck" and "long route" are the same 108 deliveries. A brand-new truck still has to drive 488 km to Nairobi.' },
      ],
      choice: {
        prompt: 'How should Zanele test the truck theory?',
        options: [
          {
            text: 'Check whether trucks and long routes are exactly the same deliveries.',
            outcome: 'They are: every truck trip is over 250 km, and every trip over 250 km is a truck. The data can\'t tell truck from distance. New trucks would be a 6-truck guess.',
            best: true,
          },
          {
            text: 'Accept it: 57% vs 26% is a big gap.',
            outcome: 'A big gap with the wrong cause still buys six trucks that don\'t fix anything.',
          },
          {
            text: 'Say vehicles never matter.',
            outcome: 'Maybe they do. But this data can\'t show it, because trucks only ever do long routes.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Correlation isn\'t causation.</strong> Two things can move together because a <strong>third thing</strong> drives both. Here, distance decides the vehicle (trucks for long routes) <em>and</em> makes deliveries slower. That third thing is called a <strong>confounder</strong>. The classic example: ice cream sales and drownings rise together. Ice cream doesn\'t cause drowning; hot weather drives both.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Are trucks just long routes?',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ntruck = df["vehicle"] == "Truck"\nlong = df["distance_km"] > 250\nprint("same rows?", (truck == long).all())\nprint(pd.crosstab(df["vehicle"], long))\n',
      caption: 'Press Run. .all() asks "is every row True?". crosstab counts every combination: no truck ever does a short route.',
      challenge: 'On short routes only, compare Van and Motorbike late rates. Does the vehicle matter there?',
    },
  ],
  apply: {
    scenario: 'Testing the truck theory.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Trucks are late 57% of the time. Why doesn\'t that prove trucks cause lateness?',
        options: [
          { text: 'Because 57% is too small', why: 'It\'s a big rate. The question is what causes it.' },
          { text: 'Trucks only do long routes, and long routes are late whatever drives them' },
          { text: 'Because trucks are new', why: 'Nothing in the data says that.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Check whether truck trips and trips over 250 km are exactly the same rows: print (truck == long).all().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ntruck = df["vehicle"] == "Truck"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ntruck = df["vehicle"] == "Truck"\nlong = df["distance_km"] > 250\nprint((truck == long).all())\n',
        hint: 'long = df["distance_km"] > 250, then print((truck == long).all()).',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Use .all()', codeIncludes: '.all()' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pattern to its confounder.',
        pairs: [
          ['Ice cream and drownings', 'Hot weather'],
          ['Trucks and late deliveries', 'Distance'],
          ['Baraka and late deliveries', 'Long routes'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'On short routes (250 km or less), print the late rate per vehicle, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nshort = df[df["distance_km"] <= 250]\nprint(short.groupby("vehicle")["is_late"].mean().round(2))\n',
        hint: 'Filter to short routes, then groupby("vehicle").',
        checks: [
          { message: 'Show Van 0.26', outputIncludes: 'Van 0.26' },
          { message: 'Show Motorbike 0.24', outputIncludes: 'Motorbike 0.24' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] isn\'t [[2]].',
        blanks: [['Correlation', 'correlation'], ['causation']],
        distractors: ['Coincidence', 'evidence'],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'So the trucks are fine?',
        prompt: 'Zanele\'s most honest reply?',
        options: [
          { text: 'They\'re perfect.', why: 'The data can\'t say that either.' },
          { text: 'They\'re the worst vehicle.', why: 'That\'s the correlation talking, not the cause.' },
          { text: 'The data can\'t tell. Trucks only do long routes, so truck and distance are tangled together. New trucks would be a guess. A very expensive one.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Causation shown, or only correlation?',
        groups: ['Only correlation', 'Tested cause'],
        items: [
          { text: 'Trucks are late more often', group: 0 },
          { text: 'Same day, before vs after the 2 p.m. truck', group: 1 },
          { text: 'Ice cream sales rise with drownings', group: 0 },
          { text: 'Friday mornings fine, Friday afternoons late', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Emeka\'s reasoning is wrong?',
        lines: ['Trucks are late 57% of the time.', 'Vans are late 26% of the time.', 'So trucks cause late deliveries.'],
        bug: 2,
        fix: 'Trucks do the long routes, and long routes are late more often.',
        explanation: 'The gap is real; the cause is a guess. Distance drives both.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\nprint(pd.Series([True, True, False]).all())',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '.all() is True only if every value is True.' },
          { text: '2', why: 'That\'s .sum().' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hidden third thing that drives two others is called a... (one word, starts with c)',
        answers: ['confounder', 'confounding', 'confounder variable', 'confound'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a claim like "people who do X are healthier/richer/happier". What third thing might drive both?',
    starters: ['The claim was...', 'A third thing could be...'],
  },
  deepen: {
    title: 'Crosstab',
    summary: 'pd.crosstab(a, b) counts every combination of two columns. Try pd.crosstab(df["depot"], df["day"]) in the Try it card.',
  },
  notes: 'deliveries_clean.csv: Truck 108 trips, late 0.565; vehicle == Truck exactly when distance_km > 250 (teyro_datasets.py rule), so (truck == long).all() is True. Short routes: Van 0.26 (213), Motorbike 0.24 (79). Ice cream and drownings: standard confounding example (hot weather). Emeka\'s quote is a story beat.',
};

export default lesson;
