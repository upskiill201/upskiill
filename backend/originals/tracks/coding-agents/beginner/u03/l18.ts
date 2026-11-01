import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18 — Reading a plan like a reviewer. */

const BRIEF = 'Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian. Only change files in board/. Done when all tests pass. Plan first, don\'t write code yet.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nplan = PracticeAgent().run(${JSON.stringify(BRIEF)}, project).plan\n`;

const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a plan like a reviewer',
  summary: 'Felix hands Remi a plan the agent wrote for someone else\'s brief and asks him to review it in two minutes. Four questions, every step.',
  minutes: 12,
  outcomes: [
    'Review any plan with four questions',
    'Classify each step: keep, cross out, reorder',
    'Write a short plan review',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Four questions per step',
      html: '<p>The brief: "Build the whole Delivery Board... Only change files in board/. Done when all tests pass. Plan first." The agent\'s plan:</p><pre><code>1 Write is_at_risk in board/rules.py\n2 Write morning_list in board/morning.py\n3 Write morning_message in board/message.py\n4 Add a weather dashboard in board/dashboard.py\n5 Add settings in board/config.py\n6 Run the tests</code></pre><p>The limit worked: no report tidy-up. Now ask four questions of every step:</p><ol><li><strong>Was it asked for?</strong> 4 and 5 weren\'t.</li><li><strong>Is it already done?</strong> In Remi\'s project, step 1 is.</li><li><strong>Is it in the right order?</strong> 1, 2, 3 are: rule, list, message.</li><li><strong>Can it be checked?</strong> Step 6 makes the others checkable. Keep it.</li></ol><p>A good plan review is short:</p><pre><code>Keep 1–3 and 6. Drop 4 and 5 (not asked for).\nIn our project 1 is done. Do 2, then 3, one at a time.</code></pre>',
    },
    {
      kind: 'tryIt',
      title: 'Review the plan',
      caption: 'The agent\'s plan, with a decision for each step.',
      code: START + '\nnot_asked = ["dashboard", "config"]\nfor number, step in enumerate(plan, start=1):\n    decision = "drop" if any(word in step for word in not_asked) else "keep"\n    print(number, decision, "-", step)\n',
      challenge: 'Remove "Only change files in board/." from the brief. What new step appears?',
    },
  ],
  apply: {
    scenario: 'Two-minute plan review.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many steps the agent\'s plan has',
        starter: START,
        solution: START + 'print(len(plan))\n',
        hint: 'len(plan)',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is there no "Tidy up board/report.py" step this time?',
        options: [
          { text: 'The agent forgot', why: 'The limit removed it.' },
          { text: 'The brief set a limit ("Only change files in board/")' },
          { text: 'The report was deleted', why: 'It\'s still there.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Keep only the steps that don\'t mention "dashboard" or "config", and print them as a list',
        starter: START + 'not_asked = ["dashboard", "config"]\n',
        solution: START + 'not_asked = ["dashboard", "config"]\nprint([step for step in plan if not any(word in step for word in not_asked)])\n',
        hint: '[step for step in plan if not any(word in step for word in not_asked)]',
        checks: [{ message: 'Print the four kept steps', outputEquals: "['Write is_at_risk in board/rules.py', 'Write morning_list in board/morning.py', 'Write morning_message in board/message.py', 'Run the tests']" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or drop?',
        groups: ['Keep', 'Drop'],
        items: [
          { text: 'Write morning_list in board/morning.py', group: 0 },
          { text: 'Add settings in board/config.py', group: 1 },
          { text: 'Run the tests', group: 0 },
          { text: 'Add a weather dashboard', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the step it catches.',
        pairs: [
          ['Was it asked for?', 'Add a weather dashboard'],
          ['Is it already done?', 'Write is_at_risk'],
          ['Can it be checked?', 'Run the tests'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Here\'s my review of the plan: "Looks fine!"',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Perfect, ship it.', why: '"Looks fine" doesn\'t catch the extras.' },
          { text: 'Rewrite the whole plan yourself.', why: 'Reviewing is quicker; most steps are good.' },
          { text: 'Fine how? Say which steps to keep, which to drop and why, and what order. Two lines is enough.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'plan = ["Write is_at_risk", "Add settings in board/config.py", "Run the tests"]\nprint(plan.index("Run the tests") + 1)',
        language: 'python',
        options: [
          { text: '3' },
          { text: '2', why: 'Index 2 plus 1 is step 3.' },
          { text: 'Run the tests', why: 'It prints the step number.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two of the four questions.',
        template: 'Was it [[1]] for? Can it be [[2]]?',
        blanks: [['asked'], ['checked']],
        distractors: ['paid', 'skipped'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s plan review is wrong?',
        lines: [
          'Keep 1–3: rule, list, message, in that order.',
          'Drop 4 and 5: not asked for.',
          'Drop 6: running the tests slows us down.',
          'In our project 1 is done; do 2, then 3.',
        ],
        bug: 2,
        fix: 'Keep 6: running the tests is what makes the steps checkable.',
        explanation: 'The test step is the check.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does Felix ask of every step?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Use the four questions on a plan you have right now (a trip, a project, an assignment). What would you drop?',
    starters: ['I\'d drop...', 'Because it...'],
  },
  deepen: {
    title: 'Reviewing is a skill',
    summary: 'Reading someone else\'s plan or code and saying exactly what to change is one of the most valued skills in a team. With agents, you do it many times a day.',
  },
  notes: 'Practice agent, whole-board brief with "Only change files in board/." (scope) + done-when + plan first: plan has 6 steps (rule, list, message, dashboard, settings, run tests), no report tidy step.',
};

export default lesson;
