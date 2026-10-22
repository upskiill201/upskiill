import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. What Python is used for, myths about learning it, and printing numbers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What Python is used for',
  summary: 'AI, websites, data, games, and boring jobs done in seconds. Plus the myths that stop people from starting.',
  minutes: 12,
  outcomes: [
    'Name real things people build with Python',
    'Spot the myths that stop beginners',
    'Print numbers and simple sums',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Python is named after the snake.',
          isFact: false,
          explain: "It's named after the comedy show Monty Python's Flying Circus. The two snakes in the logo came later.",
        },
        {
          text: 'Python is only a beginner language. Professionals use something else.',
          isFact: false,
          explain: 'Professional developers, scientists and big companies use Python every day. Easy to start is not the same as only for starters.',
        },
        {
          text: 'Much of the world\'s AI and data work is done in Python.',
          isFact: true,
          explain: 'Many of the most widely used AI and data tools, such as PyTorch and pandas, are used from Python.',
        },
        {
          text: 'You need to be good at maths to learn Python.',
          isFact: false,
          explain: 'Adding, subtracting, multiplying and dividing is plenty to start. Python does the hard sums for you.',
        },
        {
          text: 'Python is free for anyone to use.',
          isFact: true,
          explain: 'It is free and open source. You can use it for school, work or your own business without paying.',
        },
        {
          text: 'Python was designed to be easy to read.',
          isFact: true,
          explain: 'Readable code was one of Guido\'s goals from the start. Lesson 12 shows you Python\'s whole philosophy.',
        },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>What people build with Python</strong></p><ul><li><strong>Automation:</strong> renaming 500 files, filling in spreadsheets, sending reminders. The boring jobs, done in seconds.</li><li><strong>Data:</strong> reading a sales sheet and finding what changed.</li><li><strong>AI:</strong> training and using machine-learning models.</li><li><strong>Websites:</strong> the part that runs on the server, with tools like Django and Flask.</li><li><strong>Games and small tools:</strong> quizzes, calculators, and trackers, like Ada\'s.</li></ul><p>And it can do sums. Without quotes, Python treats a number as a number and works it out.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Python can do sums',
      caption: 'No quotes around the sum, so Python works it out. Press Run.',
      code: 'print("Hours in a year:")\nprint(365 * 24)\n',
      challenge: 'How many minutes are in a day? Change the sum to 24 * 60 and run it.',
    },
  ],
  apply: {
    scenario: 'Ada finds out what Python can do.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Python is free to use', group: 0 },
          { text: 'It is named after the snake', group: 1 },
          { text: 'It is used a lot for AI and data', group: 0 },
          { text: 'You must be great at maths to start', group: 1 },
          { text: 'Professionals never use it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(7 * 24)',
        language: 'python',
        options: [
          { text: '7 * 24', why: 'Without quotes, Python works the sum out.' },
          { text: '724', why: '* means multiply, not "join together".' },
          { text: '168' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many hours are in a week',
        starter: '# There are 7 days in a week and 24 hours in a day.\n',
        solution: 'print(7 * 24)\n',
        hint: 'Put the sum 7 * 24 inside print( ), with no quotes.',
        checks: [
          { message: 'Print 168', outputIncludes: '168' },
          { message: 'Let Python do the sum with *', codeIncludes: '*' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each job to what Python does there.',
        pairs: [
          ['Automation', 'Does boring tasks in seconds'],
          ['Data', 'Finds what changed in a spreadsheet'],
          ['Websites', 'Runs the server side'],
          ['AI', 'Trains and uses models'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does print(365 * 24) show a number, but print("365 * 24") shows the sum itself?',
        options: [
          { text: 'Quotes make Python do maths faster', why: 'Quotes turn it into text, so no maths happens.' },
          { text: 'Without quotes Python works it out; with quotes it is just text' },
          { text: 'It is random', why: 'Python is never random about this. Quotes mean text.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: "Arjun, I'm bad at maths. Can I still learn Python?",
        prompt: 'What is the most accurate reply from Arjun?',
        options: [
          { text: 'Yes. Basic sums are plenty to start, and Python does the hard maths for you.' },
          { text: 'No, programming is all maths.', why: 'Most everyday code needs very little maths.' },
          { text: 'Learn calculus first.', why: 'Not needed to start. Not even close.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(10 + 5) show?',
        answers: ['15'],
        placeholder: 'Output',
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants to see the answer 60, not the sum. Which line is wrong?',
        language: 'python',
        lines: ['print("Minutes in an hour:")', 'print("60 * 1")'],
        bug: 1,
        fix: 'print(60 * 1)',
        explanation: 'The quotes made the sum into text, so Python printed it as it is.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print minutes in a day',
        starter: 'print("Minutes in a day:")\n',
        solution: 'print("Minutes in a day:")\nprint(24 * 60)\n',
        hint: 'Add a second print( ) line with the sum 24 * 60 inside, no quotes.',
        checks: [{ message: 'Print 1440', outputIncludes: '1440' }],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints the answer to 12 times 3',
        language: 'python',
        tiles: ['print(', '12', '*', '3', ')'],
        distractors: ['"', 'x'],
      },
    ],
  },
  reflect: {
    prompt: 'Which kind of Python project (automation, data, AI, websites, games) excites you most, and why?',
    starters: ['The one that excites me most is...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Use print to work out how many days old you are, roughly: your age times 365.',
  },
  notes:
    'PyTorch and pandas are primarily used from Python (their docs). Django and Flask are Python web frameworks. Python logo with two snakes designed by Tim Parkin (2006); "came later" is accurate. 365 * 24 = 8760; 7 * 24 = 168; 24 * 60 = 1440.',
};

export default lesson;
