import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Story: Remi finds a "perfect" correlation with tea. Spurious correlations; small samples; Vigen. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Tea and late deliveries',
  summary: 'Kamau week. As a joke, Remi logs how many cups of tea Zanele drank each day last week, and the late deliveries on the same days. The correlation: 0.99. "Zanele, your tea habit is destroying our logistics."',
  minutes: 11,
  outcomes: [
    'Know that unrelated things can correlate by chance',
    'Be extra wary of correlations from a few data points',
    'Ask "is there a believable way one causes the other?"',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A correlation of 0.99 must mean something.',
          isFact: false,
          explain: 'Myth. With five data points, two unrelated lists can easily line up. Tyler Vigen\'s Spurious Correlations collects hundreds of these, like US cheese eaten per person moving with deaths from tangled bedsheets.',
        },
        {
          text: 'The fewer points, the easier it is to get a big correlation by luck.',
          isFact: true,
          explain: 'Fact. Five points can fall into a line by chance. Four hundred points almost never do.',
        },
        {
          text: 'If you test enough pairs of columns, some will correlate by pure chance.',
          isFact: true,
          explain: 'Fact. Test 100 unrelated pairs and a few will look strong. That\'s how spurious correlations get found: by searching.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Zanele\'s tea, Remi\'s joke',
      code: 'import pandas as pd\n\ntea = pd.Series([3, 5, 4, 6, 8])\nlate = pd.Series([10, 14, 13, 15, 19])\nprint(round(tea.corr(late), 2))\n',
      caption: 'Press Run. pd.Series makes a single column from a list. Five days, correlation 0.99, zero causation.',
      challenge: 'Change one number in late to 5. How much does the correlation drop?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: '0.99, Zanele. Your tea habit is destroying our logistics.' },
        { speaker: 'zanele', text: 'Five days. And no way for my tea to reach a truck in Mombasa. Now ask the weekend hold the same question: is there a believable way it causes lateness?' },
        { speaker: 'remi', text: 'The order sits in a closed depot on Sunday. Yes. Very believable.' },
      ],
    },
  ],
  apply: {
    scenario: 'Correlations that mean nothing.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make tea = pd.Series([3, 5, 4, 6, 8]) and late = pd.Series([10, 14, 13, 15, 19]). Print their correlation, rounded to 2.',
        starter: 'import pandas as pd\n\n',
        solution: 'import pandas as pd\n\ntea = pd.Series([3, 5, 4, 6, 8])\nlate = pd.Series([10, 14, 13, 15, 19])\nprint(round(tea.corr(late), 2))\n',
        hint: 'tea.corr(late)',
        checks: [
          { message: 'Print 0.99', outputIncludes: '0.99' },
          { message: 'Use pd.Series', codeIncludes: 'pd.Series(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why should Zanele ignore the 0.99?',
        options: [
          { text: 'Correlations over 0.9 are always fake', why: 'Distance and promised days is 0.93, and real.' },
          { text: 'Only five points, and no believable way tea causes late trucks' },
          { text: 'Tea is healthy', why: 'Irrelevant, and delicious.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Believable cause, or probably chance?',
        groups: ['Believable cause', 'Probably chance'],
        items: [
          { text: 'Orders wait in a closed depot on Sunday', group: 0 },
          { text: 'Zanele\'s tea and late trucks', group: 1 },
          { text: 'Longer trips take more days', group: 0 },
          { text: 'Cheese eaten and bedsheet accidents', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make one column from a list.',
        template: 'tea = pd.[[1]]([3, 5, 4, 6, 8])',
        blanks: [['Series']],
        distractors: ['List', 'Column'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Change the last late value from 19 to 5 and print the new correlation, rounded to 2.',
        starter: 'import pandas as pd\n\ntea = pd.Series([3, 5, 4, 6, 8])\nlate = pd.Series([10, 14, 13, 15, 19])\nprint(round(tea.corr(late), 2))\n',
        solution: 'import pandas as pd\n\ntea = pd.Series([3, 5, 4, 6, 8])\nlate = pd.Series([10, 14, 13, 15, 5])\nprint(round(tea.corr(late), 2))\n',
        hint: 'Edit the list: [10, 14, 13, 15, 5].',
        checks: [
          { message: 'Change the last value to 5', expr: 'list(late) == [10, 14, 13, 15, 5]' },
          { message: 'Print the new correlation', expr: 'round(tea.corr(late), 2) < 0' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Your tea habit is destroying our logistics.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Five days, no mechanism. Ask the weekend hold the same question and it passes.' },
          { text: 'I\'ll stop drinking tea.', why: 'Please don\'t. It\'s chance.' },
          { text: 'Correlations are always nonsense.', why: 'Some are real. Test the mechanism.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which reasoning is the weakest?',
        lines: ['Orders after 2 p.m. on Friday miss the last truck, so they wait.', 'Long routes take more days, so they miss tight promises.', 'Late deliveries rose on days Zanele drank more tea.'],
        bug: 2,
        explanation: 'No believable mechanism, and only five days. The other two have a clear way one causes the other.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the warning sign to the example.',
        pairs: [
          ['Too few points', 'Five days of tea'],
          ['No mechanism', 'Cheese and bedsheets'],
          ['Confounder', 'Trucks and distance'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a "mechanism"?',
        options: [
          { text: 'A machine', why: 'Here it means the how.' },
          { text: 'A strong correlation', why: 'A correlation can exist with no mechanism at all.' },
          { text: 'A believable chain of how one thing leads to the other' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A correlation that happens by chance, with no real link, is called... (one word, starts with s)',
        answers: ['spurious'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever believed a "pattern" that turned out to be chance (a lucky shirt, a "jinx")? What would have tested it?',
    starters: ['I believed...', 'To test it I could...'],
  },
  deepen: {
    title: 'Spurious Correlations',
    summary: 'Browse Tyler Vigen\'s Spurious Correlations website. Pick your favourite, and explain to someone why it\'s chance.',
  },
  notes: 'Example series: tea [3,5,4,6,8], late [10,14,13,15,19], Pearson r = 0.99; changing the last late value to 5 makes r negative. Vigen, T. (2015). Spurious Correlations (book and website); the cheese / bedsheet-tangling deaths chart is from it. Multiple comparisons: test many pairs and some correlate by chance.',
};

export default lesson;
