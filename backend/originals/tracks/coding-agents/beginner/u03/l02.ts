import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2 — Plan first, code second. */

const START = 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n';
const WHOLE = 'Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian.';

const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Plan first, code second',
  summary: 'Felix\'s fix is one sentence: "Ask for the plan before the code." The same whole-board request, with "Plan first, don\'t write code yet." This time nothing changes, and Remi can see what it was about to do.',
  minutes: 11,
  outcomes: [
    'Ask an agent for a plan before it changes anything',
    'Read a plan as a list of steps',
    'Spot bad steps before they become code',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Plan before code',
      steps: [
        { title: '1. Ask for the plan', body: 'Add "Plan first, don\'t write code yet." The agent reads the project and returns a list of steps. No files change.', code: 'change = agent.run(brief + " Plan first, don\'t write code yet.", project)\nprint(change.plan)', language: 'python' },
        { title: '2. Read every step', body: 'The whole-board plan has six steps: the rule, the morning list, the message, a weather dashboard, a settings file, and tidying the report.' },
        { title: '3. Spot the surprises', body: 'Three of the six weren\'t asked for. In code they\'d be 20 lines to dig through. In a plan they\'re three lines you can cross out.' },
        { title: '4. Fix the plan, then go', body: 'Agree the steps first. Then ask for one step at a time.' },
        { title: '5. Why it works', body: 'Changing a plan costs seconds. Changing code costs a review. Catch mistakes where they\'re cheapest.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask for the plan',
      caption: 'Nothing changes in the project.',
      code: START + `\nchange = PracticeAgent().run(${JSON.stringify(WHOLE)} + " Plan first, don't write code yet.", project)\nfor number, step in enumerate(change.plan, start=1):\n    print(number, step)\nprint(change.message, "| files changed:", change.files_touched)\n`,
      challenge: 'Add "Only change files in board/." to the brief. Does the plan change?',
    },
  ],
  apply: {
    scenario: 'See it before it happens.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask for the whole-board plan (no code yet) and print how many steps it has',
        starter: START + `brief = ${JSON.stringify(WHOLE)}\n`,
        solution: START + `brief = ${JSON.stringify(WHOLE)}\nchange = PracticeAgent().run(brief + " Plan first, don't write code yet.", project)\nprint(len(change.plan))\n`,
        hint: 'Add " Plan first, don\'t write code yet." and print len(change.plan)',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for a plan before the code?',
        options: [
          { text: 'Fixing a plan costs seconds; fixing code costs a review' },
          { text: 'Agents can\'t code without a plan', why: 'They can; that\'s the problem.' },
          { text: 'Plans use more tokens', why: 'They use fewer, and save work.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask for the plan and print the files changed (should be none)',
        starter: START + `brief = ${JSON.stringify(WHOLE)} + " Plan first, don't write code yet."\n`,
        solution: START + `brief = ${JSON.stringify(WHOLE)} + " Plan first, don't write code yet."\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched)\n`,
        hint: 'print(change.files_touched)',
        checks: [{ message: 'Print []', outputEquals: '[]' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A step to keep, or cross out?',
        groups: ['Keep', 'Cross out'],
        items: [
          { text: 'Write morning_list in board/morning.py', group: 0 },
          { text: 'Add a weather dashboard', group: 1 },
          { text: 'Write morning_message in board/message.py', group: 0 },
          { text: 'Tidy up board/report.py', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match where you catch a mistake to what it costs.',
        pairs: [
          ['In the plan', 'Seconds'],
          ['In the code', 'A careful review'],
          ['In production', 'An angry Brian'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Asking for a plan first doubles the work. Why not just let it code?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'It\'s one extra message. You just saw three bad steps in a list you read in ten seconds. In code they\'d have taken a review.' },
          { text: 'You\'re right, skip plans.', why: 'Plans are the cheapest place to catch mistakes.' },
          { text: 'Plans are only for big projects.', why: 'Even a 3-step job benefits.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'plan = ["Write the rule", "Write the morning list", "Add a dashboard"]\nprint(plan[-1])',
        language: 'python',
        options: [
          { text: 'Add a dashboard' },
          { text: 'Write the rule', why: 'plan[-1] is the last step.' },
          { text: '3', why: 'It prints a step, not the count.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The magic sentence.',
        template: '[[1]] first, don\'t write [[2]] yet.',
        blanks: [['Plan'], ['code']],
        distractors: ['Test', 'tests'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in the agent\'s plan wasn\'t asked for?',
        lines: [
          'Write is_at_risk in board/rules.py',
          'Write morning_list in board/morning.py',
          'Add settings in board/config.py',
          'Write morning_message in board/message.py',
        ],
        bug: 2,
        fix: 'Cross it out: nothing uses a settings file yet.',
        explanation: 'Unasked-for steps become unreviewed code.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps did the whole-board plan have?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Where in your life do you "plan first"? Where do you jump straight in, and regret it?',
    starters: ['I plan first when...', 'I jump in when...'],
  },
  deepen: {
    title: 'Plan modes',
    summary: 'Many real agents have a plan mode: they explore and propose, and only edit after you approve. If yours doesn\'t, the sentence "plan first, don\'t write code yet" does the same job.',
  },
  notes: 'Practice agent, whole-board brief + "Plan first, don\'t write code yet.": plan of 6 steps (rule, morning list, message, weather dashboard, settings, tidy report), files_touched [], message "Here is my plan. Say go and I will start." Several real agents offer a plan mode (2026).',
};

export default lesson;
