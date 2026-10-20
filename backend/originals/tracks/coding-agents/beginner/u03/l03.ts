import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3 — Reading and fixing a plan. */

const PLAN = '["Write is_at_risk in board/rules.py",\n        "Write morning_list in board/morning.py",\n        "Write morning_message in board/message.py",\n        "Add a weather dashboard in board/dashboard.py",\n        "Add settings in board/config.py",\n        "Tidy up board/report.py"]';

const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Fixing a plan',
  summary: 'Remi has the agent\'s six-step plan. He crosses out three, notices step 1 is already done, and ends up with a plan he can actually check.',
  minutes: 12,
  outcomes: [
    'Cross out steps that weren\'t asked for',
    'Notice steps that are already done',
    'Edit a plan in Python',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Six steps become two',
      text: 'The agent\'s plan: write is_at_risk, write morning_list, write morning_message, add a weather dashboard, add settings, tidy up the report. Step 1 is already done with Brief v1. The dashboard and settings weren\'t asked for. The report belongs to Zanele. Two steps are left, and their order matters.',
      hotspots: [
        { phrase: 'Step 1 is already done', note: 'Agents don\'t always know what you\'ve already finished. Redoing done work risks breaking it.' },
        { phrase: 'weren\'t asked for', note: 'Extra steps are extra code to review. If nobody needs it today, cross it out.' },
        { phrase: 'belongs to Zanele', note: 'Not Remi\'s to change. If it needs work, that\'s a conversation with her, not a step.' },
        { phrase: 'Two steps are left', note: 'Morning list, then morning message. Each is one file and a few lines.' },
        { phrase: 'their order matters', note: 'The message needs the list, and the list needs the rule. Lesson 8.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Edit the plan',
      caption: 'Keep only the steps you want, in order.',
      code: `plan = ${PLAN}\ncross_out = ["dashboard", "config", "report", "is_at_risk"]\nkept = [step for step in plan if not any(word in step for word in cross_out)]\nfor number, step in enumerate(kept, start=1):\n    print(number, step)\n`,
      challenge: 'Why is "is_at_risk" in cross_out?',
    },
  ],
  apply: {
    scenario: 'A plan you can check.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Cross out the dashboard, config, report and is_at_risk steps, and print how many steps are left',
        starter: `plan = ${PLAN}\ncross_out = ["dashboard", "config", "report", "is_at_risk"]\n`,
        solution: `plan = ${PLAN}\ncross_out = ["dashboard", "config", "report", "is_at_risk"]\nkept = [step for step in plan if not any(word in step for word in cross_out)]\nprint(len(kept))\n`,
        hint: '[step for step in plan if not any(word in step for word in cross_out)]',
        checks: [{ message: 'Print 2', outputEquals: '2' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why cross out "Write is_at_risk in board/rules.py"?',
        options: [
          { text: 'Brief v1 already did it; redoing it could break working code' },
          { text: 'The rule isn\'t needed', why: 'It\'s needed, and already done.' },
          { text: 'Zanele owns rules.py', why: 'She owns report.py.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Why cross it out?',
        groups: ['Already done', 'Not asked for', 'Not ours'],
        items: [
          { text: 'Write is_at_risk', group: 0 },
          { text: 'Add a weather dashboard', group: 1 },
          { text: 'Tidy up board/report.py', group: 2 },
          { text: 'Add settings in board/config.py', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kept step to its file.',
        pairs: [
          ['Morning list', 'board/morning.py'],
          ['Morning message', 'board/message.py'],
          ['The rule (done)', 'board/rules.py'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The settings file might be useful later. Keep it just in case?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Later, when something needs it. Code nobody uses still has to be read, reviewed and kept up to date.' },
          { text: 'Yes, keep everything.', why: 'Unused code is a cost, not a gift.' },
          { text: 'Add even more settings.', why: 'Build what\'s needed now.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'step = "Add a weather dashboard in board/dashboard.py"\nprint(any(w in step for w in ["config", "dashboard"]))',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: '"dashboard" is in the step.' },
          { text: 'dashboard', why: 'any() returns True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first step left after crossing out',
        starter: `plan = ${PLAN}\ncross_out = ["dashboard", "config", "report", "is_at_risk"]\nkept = [step for step in plan if not any(word in step for word in cross_out)]\n`,
        solution: `plan = ${PLAN}\ncross_out = ["dashboard", "config", "report", "is_at_risk"]\nkept = [step for step in plan if not any(word in step for word in cross_out)]\nprint(kept[0])\n`,
        hint: 'kept[0]',
        checks: [{ message: 'Print the morning list step', outputEquals: 'Write morning_list in board/morning.py' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Three reasons to cross out a step.',
        template: 'Already [[1]], not asked [[2]], or not ours.',
        blanks: [['done'], ['for']],
        distractors: ['hard', 'yet'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s fixed plan shouldn\'t be there?',
        lines: [
          '1. Write morning_list in board/morning.py',
          '2. Write morning_message in board/message.py',
          '3. Rename deliveries_by_city to something clearer',
        ],
        bug: 2,
        fix: 'Remove it: that\'s Zanele\'s report.',
        explanation: 'It breaks her report, and it wasn\'t asked for.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are left in Remi\'s fixed plan?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Look at your to-do list. Which items are already done, not needed, or not yours?',
    starters: ['Already done:...', 'Not mine:...'],
  },
  deepen: {
    title: 'YAGNI',
    summary: '"You aren\'t gonna need it" (YAGNI) is an old programming rule: don\'t build things until they\'re needed. Agents break it constantly; plans are where you enforce it.',
  },
  notes: 'Agent whole-board plan (6 steps) minus already-done (is_at_risk), not asked for (dashboard, config) and not ours (report) = 2 steps: morning_list, morning_message. YAGNI comes from Extreme Programming.',
};

export default lesson;
