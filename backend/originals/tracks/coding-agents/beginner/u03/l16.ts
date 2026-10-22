import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16 — The change nobody could review: a post-mortem. */

const WHOLE = 'Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian.';
const START = `from teyro_agent import Project, PracticeAgent, read_brief\n\nproject = Project()\nbrief = ${JSON.stringify(WHOLE)}\nchange = PracticeAgent().run(brief, project)\n`;

const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The change nobody could review',
  summary: 'Felix asked for a proper post-mortem of the six-file change. Remi writes it: what was asked, what came back, and the four causes. Fact or myth?',
  minutes: 12,
  outcomes: [
    'Name every cause of the six-file change',
    'Measure what made it unreviewable',
    'Turn each cause into a habit',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The agent was the problem.',
          isFact: false,
          explain: 'Myth. It did what one huge brief invited: everything at once, plus extras. The process was the problem.',
        },
        {
          text: 'One brief held three separate jobs.',
          isFact: true,
          explain: 'Fact. Rule, list and message: three ideas, so one change that couldn\'t be checked piece by piece.',
        },
        {
          text: 'Remi\'s Chapter 2 lessons didn\'t apply here.',
          isFact: false,
          explain: 'Myth. The brief had no example, no limits and no finish line, so the agent guessed the date format, renamed the report and claimed success.',
        },
        {
          text: 'A plan first would have shown the extras before any code existed.',
          isFact: true,
          explain: 'Fact. The plan listed the dashboard, settings and the report tidy-up: three lines to cross out.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The evidence',
      caption: 'What the brief was missing, and what came back.',
      code: START + '\nfound = read_brief(brief)\nprint("Missing:", [p for p in ["example_date", "scope", "done_when", "plan_only"] if not found[p]])\nprint(len(change.files_touched), "files,", change.lines_added, "lines, ran tests:", change.ran_tests)\n',
      challenge: 'Which missing part caused the 0 of 7?',
    },
  ],
  apply: {
    scenario: 'The post-mortem.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the parts (example_date, scope, done_when, plan_only) missing from the whole-board brief, as a list',
        starter: START + 'found = read_brief(brief)\n',
        solution: START + 'found = read_brief(brief)\nprint([p for p in ["example_date", "scope", "done_when", "plan_only"] if not found[p]])\n',
        hint: '[p for p in [...] if not found[p]]',
        checks: [{ message: 'Print all four', outputEquals: "['example_date', 'scope', 'done_when', 'plan_only']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did all 7 tests fail?',
        options: [
          { text: 'The tests were broken', why: 'They pass with Brief v1.' },
          { text: 'No example date (guessed format) and no limits (renamed the report)' },
          { text: 'The morning list was wrong', why: 'No test checks the list yet.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cause to the habit that prevents it.',
        pairs: [
          ['Three jobs in one brief', 'One step at a time'],
          ['Extras nobody asked for', 'Plan first'],
          ['Renamed the report', 'Limits'],
          ['"All tests pass" untrue', 'A finish line'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Cause or blame?',
        groups: ['Cause', 'Blame'],
        items: [
          { text: 'The brief asked for three jobs at once', group: 0 },
          { text: 'Remi was lazy', group: 1 },
          { text: 'There was no plan step', group: 0 },
          { text: 'AI can\'t be trusted', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'So what\'s the one-line lesson?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Don\'t use agents for big things.', why: 'Big things work fine in small steps.' },
          { text: 'Write longer briefs.', why: 'Not longer: smaller and complete.' },
          { text: 'Plan first, then one small step at a time, each with a full brief and a checkpoint.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'causes = ["three jobs", "no plan", "no limits", "no finish line"]\nhabits = {"three jobs": "small steps", "no plan": "plan first"}\nprint([c for c in causes if c not in habits])',
        language: 'python',
        options: [
          { text: "['no limits', 'no finish line']" },
          { text: "['three jobs', 'no plan']", why: 'Those two have habits already.' },
          { text: '[]', why: 'Two causes have no habit in the dict.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many files the whole-board change touched that are not rules.py, morning.py or message.py',
        starter: START + 'asked = ["board/rules.py", "board/morning.py", "board/message.py"]\n',
        solution: START + 'asked = ["board/rules.py", "board/morning.py", "board/message.py"]\nprint(len([f for f in change.files_touched if f not in asked]))\n',
        hint: 'Count files_touched not in asked',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The one-line lesson.',
        template: '[[1]] first, then one small [[2]] at a time.',
        blanks: [['Plan'], ['step']],
        distractors: ['Code', 'file'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the post-mortem is not a cause?',
        lines: [
          'One brief asked for three jobs.',
          'There was no plan step.',
          'The agent is unreliable.',
          'The brief had no limits or finish line.',
        ],
        bug: 2,
        fix: 'Remove it, or name what in the process let it go wrong.',
        explanation: 'Labels don\'t tell you what to change.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many unasked-for files did the six-file change touch?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a big task that went wrong. Write its post-mortem in four lines: asked, got, causes, habit.',
    starters: ['Asked:...', 'Habit:...'],
  },
  deepen: {
    title: 'Process over people',
    summary: 'When something goes wrong, good teams ask "what in our process allowed this?" Fixing the process prevents the next one; blaming a person (or an agent) doesn\'t.',
  },
  notes: 'Whole-board brief: read_brief finds no example_date, scope, done_when or plan_only. Change: 6 files, 3 not asked for (config, dashboard, report), 42 lines, ran_tests False, real tests 0 of 7.',
};

export default lesson;
