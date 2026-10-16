import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Story: sharpening "why are deliveries late?". Good questions; value_counts(normalize=True). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'A better question',
  summary: '5 weeks to Kamau. Brian reads Zanele\'s question and asks: "Late compared to what? Late for whom? How would you know you\'d answered it?" Zanele rewrites it three times. Then she turns counts into shares.',
  minutes: 12,
  outcomes: [
    'Turn a vague question into one data can answer',
    'Get shares instead of counts with normalize=True',
    'Know what "answered" would look like before you start',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The right question',
      html: "<p>The statistician John Tukey argued, back in 1962, that a rough answer to the <em>right</em> question beats a precise answer to the <em>wrong</em> one. Most failed data projects don't fail at the maths. They fail at the question.</p><p>A good data question is:</p><ul><li><strong>Specific</strong>: which deliveries, which month? \"Deliveries from our three depots in March 2026.\"</li><li><strong>Measurable</strong>: what counts as late? \"Arrived after the promised number of days.\" The <code>late</code> column already does this.</li><li><strong>Useful</strong>: what will someone do with the answer? Kamau wants to know what to <em>change</em>.</li></ul><p>Zanele's question, version 3: <strong>\"In March, which kinds of deliveries were late most often, and what do they have in common?\"</strong> Now she knows what an answer looks like: a group of deliveries with a much higher late rate than the rest.</p>",
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'brian', text: 'Version 1 was "why are deliveries late?". Lovely. Now: late compared to what? And what will Kamau do with the answer?' },
        { speaker: 'zanele', text: 'Fix whatever kind of delivery is late most often. So I compare groups. Shares, not just counts.' },
        { speaker: 'brian', text: 'Now that is a question with legs.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Shares instead of counts',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["late"].value_counts(normalize=True))\n',
      caption: 'Press Run. normalize=True turns counts into shares that add up to 1: 0.3375 of deliveries were late.',
      challenge: 'Try it on the depot column. What share of deliveries came from Nairobi?',
    },
  ],
  apply: {
    scenario: 'Sharpening the question.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Vague question, or one data can answer?',
        groups: ['Vague', 'Answerable'],
        items: [
          { text: 'Why is everything so slow?', group: 0 },
          { text: 'Which depot had the highest share of late deliveries in March?', group: 1 },
          { text: 'Are our drivers bad?', group: 0 },
          { text: 'Were Saturday orders late more often than weekday orders?', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the share of late and on-time deliveries with normalize=True.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["late"].value_counts())\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["late"].value_counts(normalize=True))\n',
        hint: 'Put normalize=True inside the brackets of value_counts().',
        checks: [
          { message: 'Show yes 0.3375', outputIncludes: 'yes 0.3375' },
          { message: 'Use normalize=True', codeIncludes: 'normalize=True' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "late compared to what?" a good challenge?',
        options: [
          { text: 'A late rate only means something next to another group\'s rate' },
          { text: 'Because 135 is wrong', why: 'The count is right. It just needs context.' },
          { text: 'It\'s just Brian being difficult', why: 'It\'s the question Kamau will ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Get shares instead of counts.',
        template: 'df["depot"].value_counts([[1]]=True)',
        blanks: [['normalize']],
        distractors: ['percent', 'share'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'What share of deliveries came from each depot? Use normalize=True and round the result to 2 decimal places with .round(2).',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["depot"].value_counts(normalize=True).round(2))\n',
        hint: 'print(df["depot"].value_counts(normalize=True).round(2))',
        checks: [
          { message: 'Show Mombasa 0.33', outputIncludes: 'Mombasa 0.33' },
          { message: 'Use normalize=True', codeIncludes: 'normalize=True' },
          { message: 'Round with .round(2)', codeIncludes: '.round(2)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Zanele\'s question versions in order, vaguest first.',
        lines: [
          'Why are deliveries late?',
          'Which deliveries are late?',
          'In March, which kinds of deliveries were late most often, and what do they have in common?',
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Kamau will ask: "How will you know you\'ve answered it?"',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'When the data runs out.', why: 'That\'s when you stop, not when you\'ve answered.' },
          { text: 'When the chart looks good.', why: 'A pretty chart isn\'t an answer.' },
          { text: 'When I find a group of deliveries that\'s late much more often than the rest, and can say what they share.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the test to Zanele\'s version 3.',
        pairs: [
          ['Specific', 'March, three depots'],
          ['Measurable', 'Late means after the promised days'],
          ['Useful', 'Kamau knows what to change'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this question is too vague?',
        lines: ['In March,', 'which drivers are bad,', 'measured by the share of their deliveries that were late?'],
        bug: 1,
        fix: 'which drivers had the highest share of late deliveries,',
        explanation: '"Bad" isn\'t measurable, and it assumes the answer. The late share is.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does value_counts(normalize=True) give you instead of counts?',
        answers: ['shares', 'proportions', 'percentages', 'share', 'proportion', 'fractions', 'rates'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Take the question you wrote in lesson 1. Make it specific, measurable and useful.',
    starters: ['Version 2:', 'I\'ll know I\'ve answered it when...'],
  },
  deepen: {
    title: 'Tukey on questions',
    summary: 'Look up John Tukey\'s 1962 paper "The Future of Data Analysis". His line about the right question is still quoted in every data team.',
  },
  notes: 'Tukey, J. W. (1962). The Future of Data Analysis. Annals of Mathematical Statistics 33(1), 1-67 (the "approximate answer to the right question" passage, paraphrased). Shares from deliveries_clean.csv: late yes 0.3375; depots Nairobi 0.495 (198/400; float rounding makes its 2 dp value unsafe to check), Mombasa 0.3275 (prints 0.33), Kisumu 0.1775.',
};

export default lesson;
