import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18 — Ada's plan for the Ajo Tracker: features, versions, and the road map for the course. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: "Ada's plan for the Ajo Tracker",
  summary: "Ada turns the battered notebook into a feature list, and each feature into a version. It's also the map of everything you'll learn in this course.",
  minutes: 12,
  outcomes: [
    'Turn a real problem into a list of features',
    'Plan a program in versions, small to big',
    'See which Python skill each feature needs',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From notebook to program',
      steps: [
        {
          title: 'Write down the real problems',
          body: '"Nobody agrees who paid." "We lose track of whose turn it is." "The sums are done by hand." Problems first, code later.',
        },
        {
          title: 'Turn each problem into a feature',
          body: 'Who paid? → a payment checker. Whose turn? → a turn list. Sums by hand → a calculator. Each feature fixes one problem.',
        },
        {
          title: 'Plan small versions',
          body: 'Nobody builds the whole thing at once. v0.1 is a welcome screen. Each version adds one feature and still works.',
        },
        {
          title: 'Match each version to a skill',
          body: 'v0.1 needs print. Names need variables (Chapter 2). Who paid needs if (Chapter 5). The member list needs lists (Chapter 6). And so on, to v1.0.',
        },
        {
          title: 'Ship v0.1 this week',
          body: "The first version is tiny on purpose. A program that works and shows people beats a perfect plan that doesn't exist yet.",
        },
      ],
    },
    {
      kind: 'tryIt',
      title: "Ada's road map, printed",
      caption: 'The plan for the whole course, as a program. Press Run.',
      code: 'print("AJO TRACKER ROAD MAP")\nprint("v0.1  Welcome screen")\nprint("v0.2  Money maths")\nprint("v0.4  Who has paid?")\nprint("v0.5  The member list")\nprint("v1.0  The whole office uses it")\n',
      challenge: 'Add one feature you would want in your own version, with a version number.',
    },
  ],
  apply: {
    scenario: 'Ada plans the Ajo Tracker.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the feature that fixes it.',
        pairs: [
          ['Nobody agrees who paid', 'Payment checker'],
          ["We forget whose turn it is", 'Turn list'],
          ['The sums are done by hand', 'Pot calculator'],
          ['The data gets lost', 'Saving to a file'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why build in small versions instead of all at once?',
        options: [
          { text: 'Each version works on its own, so you always have something to show and test' },
          { text: 'Small programs run faster', why: 'Speed is not the reason.' },
          { text: "You're not allowed to build big programs", why: 'You are. You just build them in steps.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first three versions of the road map',
        starter: '# v0.1 Welcome screen\n# v0.2 Money maths\n# v0.3 Clean names\n',
        solution: 'print("v0.1 Welcome screen")\nprint("v0.2 Money maths")\nprint("v0.3 Clean names")\n',
        hint: 'One print( ) per version, in order.',
        checks: [{ message: 'Print the three versions in order', outputEquals: 'v0.1 Welcome screen\nv0.2 Money maths\nv0.3 Clean names' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the planning steps in order.',
        lines: ['Write down the real problems', 'Turn each problem into a feature', 'Plan small versions', 'Ship the first version'],
      },
      {
        kind: 'sortGroups',
        prompt: 'A problem, or a feature?',
        groups: ['Problem', 'Feature'],
        items: [
          { text: 'Nobody agrees who paid', group: 0 },
          { text: 'A payment checker', group: 1 },
          { text: 'The notebook got wet', group: 0 },
          { text: 'Save the data to a file', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the very first version number of the Ajo Tracker that Ada ships?',
        answers: ['0.1', 'v0.1'],
        placeholder: 'Version',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Your v0.1 only prints a welcome screen. Is that really worth showing people?',
        prompt: "What's Ada's best reply?",
        options: [
          { text: "No, I'll wait until it is perfect.", why: 'Perfect never ships. Small working versions do.' },
          { text: "No, I'll build everything at once.", why: 'That is how projects stall.' },
          { text: "Yes. It works, they can see progress, and v0.2 adds the money maths." },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print your own feature idea as a road-map line',
        starter: '# Format: v1.1  <your feature>\n',
        solution: 'print("v1.1  Remind people before pay day")\n',
        hint: 'One print( ) that starts with v1.1 and then your feature.',
        checks: [{ message: 'Print a line that starts with v1.1', outputIncludes: 'v1.1' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which skill does "Who has paid?" need?',
        options: [
          { text: 'Only print', why: 'It needs to check something and choose what to say.' },
          { text: 'Making decisions with if' },
          { text: 'Comments', why: 'Comments explain code; they don\'t make decisions.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which road-map line is a problem, not a feature?',
        lines: ['v0.1 Welcome screen', 'v0.2 Money maths', 'v0.3 Everyone argues about money'],
        bug: 2,
        fix: 'v0.3 Clean up members\' names',
        explanation: 'Arguing is the problem. A feature is something the program does.',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something in your life tracked on paper or in your head. What would v0.1 of a program for it do?',
    starters: ['I track...', 'v0.1 would...'],
  },
  deepen: {
    title: 'Plan your own',
    summary: 'Write a 3-version road map for your own small program idea. You\'ll build it in the Final Project.',
  },
  notes: 'Version map mirrors the approved outline (docs/originals/python-beginner-outline.md): v0.1 Ch1 … v1.0 Ch13.',
};

export default lesson;
