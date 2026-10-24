import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8 — Order matters: rule, list, message. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const MORNING = 'Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Order matters',
  summary: 'To test the order idea, Felix starts a fresh project and asks for the morning list first. The agent writes it perfectly, and it returns an empty list. Every time.',
  minutes: 12,
  outcomes: [
    'See why steps depend on earlier steps',
    'Put steps in the order of their dependencies',
    'Spot a step that was done too early',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The morning list calls is_at_risk on every delivery. On a fresh project, is_at_risk isn\'t written yet: it always returns False.', replies: ['So the list is always empty?'] },
        { tey: 'Always. The list code is correct; it just depends on a rule that doesn\'t exist yet. The agent even reports that 3 rule tests fail, which is the clue.', replies: ['What\'s the right order?'] },
        { tey: 'Follow what depends on what. The data is there already. The rule needs the data. The list needs the rule. The message needs the list. Build from the bottom up.', replies: ['How do I spot dependencies?'] },
        { tey: 'Look at the imports. board/morning.py starts with "from board.rules import is_at_risk". Whatever a file imports must work before the file can.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Wrong order, right order',
      caption: 'Same two briefs, swapped.',
      code: 'from teyro_agent import Project, PracticeAgent\n\n' + `rule = ${JSON.stringify(V1)}\nmorning = ${JSON.stringify(MORNING)}\n` + 'for order in [[morning, rule], [rule, morning]]:\n    project = Project()\n    agent = PracticeAgent()\n    agent.run(order[0], project)\n    rows = project.load("board.data").load_deliveries()\n    morning_module = project.load("board.morning") if "board/morning.py" in project.ls() else None\n    print("List first" if order[0] is morning else "Rule first", "->", morning_module.morning_list(rows) if morning_module else "no list yet")\n',
      challenge: 'In the "List first" case, run the rule next. Does the list fill up?',
    },
  ],
  apply: {
    scenario: 'Bottom up.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'On a fresh project, run ONLY the morning-list brief, then print the morning list for the sample',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nmorning = ${JSON.stringify(MORNING)}\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nmorning = ${JSON.stringify(MORNING)}\nPracticeAgent().run(morning, project)\nprint(project.load("board.morning").morning_list(project.load("board.data").load_deliveries()))\n`,
        hint: 'Run the brief, then load board.morning and call morning_list(rows)',
        checks: [{ message: 'Print [] (the rule isn\'t written yet)', outputEquals: '[]' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the morning list empty when it\'s built first?',
        options: [
          { text: 'The list code is wrong', why: 'The code is fine; its dependency isn\'t built.' },
          { text: 'It uses is_at_risk, which still always returns False' },
          { text: 'The sample data is empty', why: 'It has 12 deliveries.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps by what depends on what.',
        lines: ['The data (already there)', 'The at-risk rule', 'The morning list', 'The morning message'],
      },
      {
        kind: 'writeCode',
        prompt: 'Find what board/morning.py imports: print the line that starts with "from"',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(MORNING)}, project)\ntext = project.read("board/morning.py")\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(MORNING)}, project)\ntext = project.read("board/morning.py")\nprint([line for line in text.splitlines() if line.startswith("from")][0])\n`,
        hint: 'Keep lines that start with "from" and print the first',
        checks: [{ message: 'Print the import line', outputEquals: 'from board.rules import is_at_risk' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to what it needs first.',
        pairs: [
          ['The rule', 'The data'],
          ['The morning list', 'The rule'],
          ['The morning message', 'The morning list'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The list came back empty but the agent said its code was fine. Who\'s right?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'The agent is lying.', why: 'Its report was honest; the order was wrong.' },
          { text: 'The data is broken.', why: 'The data is fine; the rule is missing.' },
          { text: 'Both. Its code is fine; it was built before the rule it depends on. Look: its own report says the 3 rule tests still fail.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'def is_at_risk(row):\n    return False\nrows = [{"id": 1}, {"id": 2}]\nprint([r["id"] for r in rows if is_at_risk(r)])',
        language: 'python',
        options: [
          { text: '[]' },
          { text: '[1, 2]', why: 'is_at_risk always says False.' },
          { text: 'False', why: 'It prints the (empty) list.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Spotting dependencies.',
        template: 'Whatever a file [[1]] must work before the file [[2]].',
        blanks: [['imports'], ['can']],
        distractors: ['prints', 'fails'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is in the wrong place?',
        lines: ['1. Write morning_message', '2. Write is_at_risk', '3. Write morning_list'],
        bug: 0,
        fix: 'Move it last: the message needs the list.',
        explanation: 'Order: rule, list, message.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function does morning_list depend on?',
        answers: ['is_at_risk', 'is_at_risk()'],
        placeholder: 'A function name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a task where doing the steps in the wrong order made it fail (cooking, building, studying). What depended on what?',
    starters: ['I did ... before ...', 'It needed...'],
  },
  deepen: {
    title: 'Dependency graphs',
    summary: 'Big projects draw "what depends on what" as a graph and build from the leaves up. For an agent plan, the same idea means: never brief a step before its foundations are checked.',
  },
  notes: 'Practice agent on a fresh project: morning-list brief first -> board/morning.py correct, morning_list(sample) == [] because is_at_risk returns False; agent message "4 of 7 tests pass. These still fail: ... I did not change the tests." Rule first, then list -> 6 ids.',
};

export default lesson;
