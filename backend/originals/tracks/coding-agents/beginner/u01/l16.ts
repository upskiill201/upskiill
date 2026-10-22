import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16 — The weather dashboard: a post-mortem. */

const START = 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run("make the delivery thing", project)\n';

const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The weather dashboard',
  summary: 'Felix runs a five-minute post-mortem on Remi\'s first try. No blame, just facts: what was asked, what came back, and why. Fact or myth?',
  minutes: 12,
  outcomes: [
    'Explain exactly why the first try went wrong',
    'Run the agent\'s dashboard and see what it does',
    'Turn a failure into a rule for next time',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The agent ignored Remi\'s instructions.',
          isFact: false,
          explain: 'Myth. It followed them: "make the delivery thing". It built a thing about deliveries. The instructions were the gap.',
        },
        {
          text: 'The dashboard runs without errors.',
          isFact: true,
          explain: 'Fact. It prints a heading, five days of weather and "12 deliveries". Working code can still be the wrong code.',
        },
        {
          text: 'The weather in the dashboard is real.',
          isFact: false,
          explain: 'Myth. It\'s a hard-coded list the agent made up. Agents invent plausible details when they have none.',
        },
        {
          text: 'The 3 failing tests were a clue it built the wrong thing.',
          isFact: true,
          explain: 'Fact. After the session, the same 3 tests still failed. The real task, the at-risk rule, was never touched.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Run the dashboard',
      caption: 'It works. It\'s just not what anyone wanted.',
      code: START + '\ndashboard = project.load("board.dashboard")\nrows = project.load("board.data").load_deliveries()\ndashboard.dashboard(rows)\n',
      challenge: 'Read board/dashboard.py. Where does the weather come from?',
    },
  ],
  apply: {
    scenario: 'What went wrong, and why.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the dashboard with the sample deliveries',
        starter: START + 'dashboard = project.load("board.dashboard")\nrows = project.load("board.data").load_deliveries()\n',
        solution: START + 'dashboard = project.load("board.dashboard")\nrows = project.load("board.data").load_deliveries()\ndashboard.dashboard(rows)\n',
        hint: 'dashboard.dashboard(rows)',
        checks: [{ message: 'Print the dashboard', outputEquals: 'NAIROBI DELIVERY DASHBOARD\nMon: Sunny\nTue: Rain\nWed: Cloudy\nThu: Sunny\nFri: Rain\n12 deliveries' }],
      },
      {
        kind: 'mcq',
        prompt: 'Where did the dashboard\'s weather come from?',
        options: [
          { text: 'A live weather service', why: 'There\'s no internet call; it\'s a dictionary in the file.' },
          { text: 'The agent made up a fixed list' },
          { text: 'Zanele\'s data', why: 'The sample has no weather column.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the post-mortem: a fact or a blame?',
        groups: ['Fact', 'Blame'],
        items: [
          { text: 'The brief was four words', group: 0 },
          { text: 'Remi is careless', group: 1 },
          { text: 'The 3 rule tests still failed afterwards', group: 0 },
          { text: 'The agent is stupid', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether board/rules.py is unchanged after the session (compare it with a fresh project)',
        starter: START + 'fresh = Project()\n',
        solution: START + 'fresh = Project()\nprint(project.read("board/rules.py") == fresh.read("board/rules.py"))\n',
        hint: 'project.read("board/rules.py") == fresh.read("board/rules.py")',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what happened to the rule it teaches.',
        pairs: [
          ['Four-word brief', 'Say what, where and when done'],
          ['Made-up weather', 'Agents invent missing details'],
          ['"Done!" with failing tests', 'Run the tests yourself'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'This post-mortem is embarrassing. Can we skip it?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Yes, forget it happened.', why: 'Then the lesson is lost.' },
          { text: 'It\'s to decide who\'s at fault.', why: 'Good post-mortems are about causes, not blame.' },
          { text: 'Five minutes, no blame. We write one rule from it, and nobody makes this mistake twice.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'WEATHER = {"Mon": "Sunny", "Tue": "Rain", "Wed": "Cloudy"}\nprint(len(WEATHER), WEATHER["Tue"])',
        language: 'python',
        options: [
          { text: '3 Rain' },
          { text: '3 Tue', why: 'WEATHER["Tue"] is the value, "Rain".' },
          { text: 'Rain 3', why: 'len comes first in the print.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The post-mortem rule.',
        template: 'Working code can still be the [[1]] code. Check it against what was [[2]].',
        blanks: [['wrong'], ['needed', 'asked', 'wanted']],
        distractors: ['fastest', 'typed'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the post-mortem note is blame, not a cause?',
        lines: [
          'What we asked: "make the delivery thing".',
          'What we got: a weather dashboard.',
          'Why: Remi doesn\'t know how to use AI.',
          'Rule: every brief says what, where and when it\'s done.',
        ],
        bug: 2,
        fix: 'Why: the brief didn\'t say what to build, so the agent guessed.',
        explanation: 'Post-mortems name causes you can fix, not people.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many deliveries does the dashboard report?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something that went wrong recently. Write it as a no-blame post-mortem: asked, got, why, rule.',
    starters: ['We asked for...', 'The rule for next time is...'],
  },
  deepen: {
    title: 'Blameless post-mortems',
    summary: 'Many engineering teams write "blameless" post-mortems after incidents: what happened, why, and what changes, without blaming people. It makes people report mistakes early.',
  },
  notes: 'Practice agent dashboard: WEATHER dict Mon Sunny, Tue Rain, Wed Cloudy, Thu Sunny, Fri Rain; dashboard(rows) prints the heading, 5 days and "12 deliveries". board/rules.py unchanged by the session. Blameless post-mortems are a common practice (e.g. in site reliability engineering).',
};

export default lesson;
