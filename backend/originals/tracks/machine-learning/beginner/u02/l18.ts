import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18 — Asking the data a question: do patients who missed before miss again? */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Asking the data a question',
  summary: 'Bisi has a theory from her calls: "The same people miss again and again." Halima turns it into a question the data can answer, and the answer is stronger than anyone expected.',
  minutes: 12,
  outcomes: [
    'Turn a hunch into a question the data can answer',
    'Answer it with groupby and a rate',
    'Report the answer honestly, with its limits',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Bisi\'s theory',
      beats: [
        { speaker: 'bisi', text: 'When I call people about a missed appointment, it\'s the same names every month.' },
        { speaker: 'halima', text: 'Then the question is: does the no-show rate go up with the number of past no-shows? That\'s one groupby.' },
        { speaker: 'narrator', text: 'df.groupby("previous_no_shows")["no_show"].mean(): never missed before, 12.1%. Missed once, 21.6%. Twice, 25.8%. Three times, 47.4%. Four times, 53.9%.' },
        { speaker: 'bisi', text: 'Four misses and they\'re more likely to miss than to come!' },
        { speaker: 'miracle', text: 'And only 76 people have four. So: strong pattern, smaller groups at the top. Say both.' },
      ],
      choice: {
        prompt: 'How should Halima report it?',
        options: [
          { text: '"No-shows rise with past no-shows: 12% for none, over 50% for four (76 patients). A strong clue for the model."', outcome: 'The pattern, the numbers, and the group size. That\'s an honest finding.', best: true },
          { text: '"People who missed before are unreliable."', outcome: 'That blames people. Past no-shows might mean distance, illness or cost. Report the pattern, not a judgement.' },
          { text: '"Past no-shows cause future no-shows."', outcome: 'It\'s a pattern, not proof of cause. Something else, like living far away, could drive both.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Bisi\'s theory, checked',
      caption: 'Rates and group sizes side by side.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("previous_no_shows")["no_show"].agg(["count", "mean"]).round(3))\n',
      challenge: 'Check another hunch: does the weekday matter?',
    },
  ],
  apply: {
    scenario: 'Checking a hunch.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for each number of previous no-shows, rounded to 3',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("previous_no_shows")["no_show"].mean().round(3))\n',
        hint: 'groupby("previous_no_shows")["no_show"].mean().round(3)',
        checks: [
          { message: 'Show 0.121 for none', outputIncludes: '0.121' },
          { message: 'Show 0.539 for four', outputIncludes: '0.539' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Bisi says "the same people miss again and again". Which question tests it?',
        options: [
          { text: 'Does the no-show rate rise with the number of past no-shows?' },
          { text: 'How many patients are there?', why: 'That doesn\'t test her theory.' },
          { text: 'Which clinic is busiest?', why: 'Unrelated to repeat misses.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Count the patients with 4 previous no-shows',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(len(df[df["previous_no_shows"] == 4]))\n',
        hint: 'len(df[df["previous_no_shows"] == 4])',
        checks: [{ message: 'Print 76', outputEquals: '76' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the past no-shows to the no-show rate.',
        pairs: [
          ['0 before', '12.1%'],
          ['1 before', '21.6%'],
          ['3 before', '47.4%'],
          ['4 before', '53.9%'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So we stop booking people with 4 no-shows?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'No: they\'re the people who most need help getting here. Call them first and offer a nearer slot. That\'s the kind action.' },
          { text: 'Yes, ban them.', why: 'Never less care because of a pattern. Offer help.' },
          { text: 'Ignore them.', why: 'They\'re where a reminder call helps most.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in the finding goes too far?',
        lines: [
          'No-show rates rise with past no-shows.',
          'Patients with 4 past no-shows missed 53.9% of the time.',
          'Only 76 patients have 4 past no-shows.',
          'Missing before causes people to miss again.',
        ],
        bug: 3,
        fix: 'Past no-shows are a strong clue for future ones.',
        explanation: 'It\'s a pattern. Distance, cost or illness could drive both.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of an honest finding, or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: 'The rates for each group', group: 0 },
          { text: 'How big each group is', group: 0 },
          { text: '"These patients are lazy"', group: 1 },
          { text: '"This proves the cause"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Rates and sizes together.',
        language: 'python',
        template: 'df.groupby("previous_no_shows")["no_show"].agg(["[[1]]", "[[2]]"])',
        blanks: [['count'], ['mean']],
        distractors: ['sum', 'max'],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention that only 76 patients have 4 past no-shows?',
        options: [
          { text: 'Small groups give less certain rates' },
          { text: 'To make the finding sound smaller', why: 'It\'s about how sure we can be.' },
          { text: 'It doesn\'t matter', why: 'A rate from 76 people wobbles more than one from 1,466.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'No-show rate for patients who never missed before, as a percentage with 1 decimal.',
        answers: ['12.1%', '12.1'],
        placeholder: 'A percentage',
      },
    ],
  },
  reflect: {
    prompt: 'Bisi\'s hunch was right, and the data made it precise. What hunch do you have that a groupby could make precise?',
    starters: ['My hunch is...', 'I\'d group by...'],
  },
  deepen: {
    title: 'A strong feature',
    summary: 'previous_no_shows is probably the strongest clue in the table. When the model arrives, it will lean on it heavily, which is useful, and worth checking for fairness in Chapter 12.',
  },
  notes: 'appointments.csv by previous_no_shows: 0: 1466 rows, 12.1%; 1: 536, 21.6%; 2: 225, 25.8%; 3: 97, 47.4%; 4: 76, 53.9%.',
};

export default lesson;
