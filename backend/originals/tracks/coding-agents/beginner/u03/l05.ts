import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: big changes, plans first, fixing plans, one change at a time. */

const WHOLE = 'Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian.';

const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: plan, then one step',
  summary: 'Big changes hide bugs, plans come before code, plans get fixed, and each step is one change. Quick check before Remi learns to save his place.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Plan and size a change without notes', 'Fix an agent\'s plan'],
  learn: [
    {
      kind: 'story',
      title: 'Two steps left',
      beats: [
        { speaker: 'narrator', text: 'On Remi\'s whiteboard: "1. Rule (done). 2. Morning list (done). 3. Morning message."' },
        { speaker: 'felix', text: 'Better. Now, what happens if step 3 breaks step 2?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: plan, then one step.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask for the whole-board plan without code and print its last step',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nbrief = ${JSON.stringify(WHOLE)} + " Plan first, don't write code yet."\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nbrief = ${JSON.stringify(WHOLE)} + " Plan first, don't write code yet."\nprint(PracticeAgent().run(brief, project).plan[-1])\n`,
        hint: 'PracticeAgent().run(brief, project).plan[-1]',
        checks: [{ message: 'Print Tidy up board/report.py', outputEquals: 'Tidy up board/report.py' }],
      },
      {
        kind: 'mcq',
        prompt: 'Where is a mistake cheapest to fix?',
        options: [
          { text: 'In the plan' },
          { text: 'In the code', why: 'That needs a review.' },
          { text: 'After it\'s live', why: 'That\'s the most expensive.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or cross out from the agent\'s plan?',
        groups: ['Keep', 'Cross out'],
        items: [
          { text: 'Write morning_message in board/message.py', group: 0 },
          { text: 'Add settings in board/config.py', group: 1 },
          { text: 'Tidy up board/report.py', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Keep only plan steps that mention "morning", and print them as a list',
        starter: 'plan = ["Write is_at_risk in board/rules.py", "Write morning_list in board/morning.py", "Write morning_message in board/message.py", "Add a weather dashboard in board/dashboard.py"]\n',
        solution: 'plan = ["Write is_at_risk in board/rules.py", "Write morning_list in board/morning.py", "Write morning_message in board/message.py", "Add a weather dashboard in board/dashboard.py"]\nprint([step for step in plan if "morning" in step])\n',
        hint: '[step for step in plan if "morning" in step]',
        checks: [{ message: 'Print the two morning steps', outputEquals: "['Write morning_list in board/morning.py', 'Write morning_message in board/message.py']" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Six files at once', 'Can\'t tell what broke'],
          ['Plan first', 'Nothing changes yet'],
          ['Cross out', 'Done, unasked, not ours'],
          ['One change', 'One reason'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which brief asks for more than one change?',
        lines: [
          'Write morning_list in board/morning.py.',
          'Write morning_message in board/message.py.',
          'Build the whole Delivery Board.',
        ],
        bug: 2,
        fix: 'Ask for a plan, then one step at a time.',
        explanation: '"The whole board" is many changes in one.',
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'What happens if step 3 breaks step 2?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'I\'d want to go straight back to how it was after step 2. I need a way to save my place.' },
          { text: 'I\'d fix it by hand somehow.', why: 'Without a saved point that\'s a guess.' },
          { text: 'It won\'t happen.', why: 'It happens all the time.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'plan = ["rule", "morning list", "message"]\ndone = ["rule", "morning list"]\nprint([s for s in plan if s not in done])',
        language: 'python',
        options: [
          { text: "['message']" },
          { text: "['rule', 'morning list']", why: 'Those are done, so they\'re left out.' },
          { text: '[]', why: '"message" isn\'t done yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order of work.',
        template: 'Ask for the [[1]], fix it, then do one [[2]] at a time.',
        blanks: [['plan'], ['step']],
        distractors: ['code', 'week'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Remi\'s new way of working.',
        lines: ['Ask for a plan, no code yet', 'Cross out what isn\'t needed', 'Brief one step', 'Check that step completely', 'Brief the next step'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines did the morning-list step add?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Felix asked what happens if step 3 breaks step 2. What\'s your way of "saving your place" in your own work?',
    starters: ['I save my place by...', 'If something breaks, I...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. Whole-board plan last step "Tidy up board/report.py"; morning-list step 9 lines.',
};

export default lesson;
