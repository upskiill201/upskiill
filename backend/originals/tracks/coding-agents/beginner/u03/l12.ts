import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12 — Keeping a task list. */

const TASKS = '# Delivery Board tasks\\n- [x] 1. Rule: is_at_risk in board/rules.py\\n- [x] 2. Morning list: morning_list in board/morning.py\\n- [ ] 3. Morning message: morning_message in board/message.py\\n- [ ] 4. Show Zanele and Brian\\n- [ ] 5. Review with Felix\\n';
const START = `from teyro_agent import Project\n\nproject = Project()\nproject.write("TASKS.md", "${TASKS}")\n`;

const lesson: OriginalLesson = {
  key: 'l12',
  title: 'A task list',
  summary: 'Remi\'s plan lives in a whiteboard photo and three chat windows. Felix asks him to put it in one file in the project, with a tick for each step that\'s done and checked.',
  minutes: 11,
  outcomes: [
    'Keep the plan as a task list in the project',
    'Tick steps only when they\'re checked',
    'Read the list in Python to find the next step',
  ],
  learn: [
    {
      kind: 'story',
      title: 'TASKS.md',
      beats: [
        { speaker: 'felix', text: 'Where\'s your plan?' },
        { speaker: 'remi', text: 'Bits of it are on the whiteboard. Some are in the chat with the agent. And one in my head.' },
        { speaker: 'felix', text: 'Put it in the project: TASKS.md. One line per step. Tick it when it\'s done AND checked, not when the agent says done.' },
        { speaker: 'narrator', text: 'Remi writes five lines. Two ticks. Next up: step 3, the morning message.' },
        { speaker: 'felix', text: 'Now any session, any person, can see where you are in five seconds. Including the agent: you can tell it "do the next unticked step in TASKS.md".' },
      ],
      choice: {
        prompt: 'The agent says step 3 is "Done!". When should Remi tick it?',
        options: [
          { text: 'After he\'s read the change and run the tests himself.', outcome: 'Right. A tick means checked, not claimed.', best: true },
          { text: 'Straight away: the agent said done.', outcome: 'Then the list tells lies, and the next session builds on them.' },
          { text: 'At the end of the week.', outcome: 'Then nobody can see where things are in the meantime.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Read the list',
      caption: 'Find what\'s done and what\'s next.',
      code: START + '\nlines = [line for line in project.read("TASKS.md").splitlines() if line.startswith("- [")]\ndone = [line for line in lines if line.startswith("- [x]")]\nnext_step = [line for line in lines if line.startswith("- [ ]")][0]\nprint(len(done), "of", len(lines), "done")\nprint("Next:", next_step)\n',
      challenge: 'Tick step 3 in the text and print the next step again.',
    },
  ],
  apply: {
    scenario: 'One list, in the project.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many steps in TASKS.md are ticked',
        starter: START,
        solution: START + 'print(len([line for line in project.read("TASKS.md").splitlines() if line.startswith("- [x]")]))\n',
        hint: 'Count lines that start with "- [x]"',
        checks: [{ message: 'Print 2', outputEquals: '2' }],
      },
      {
        kind: 'mcq',
        prompt: 'When does a step get its tick?',
        options: [
          { text: 'When it\'s done and you\'ve checked it' },
          { text: 'When the agent says "Done!"', why: 'That\'s a claim.' },
          { text: 'When you start it', why: 'Ticks mean finished.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first unticked step',
        starter: START,
        solution: START + 'print([line for line in project.read("TASKS.md").splitlines() if line.startswith("- [ ]")][0])\n',
        hint: 'The first line that starts with "- [ ]"',
        checks: [{ message: 'Print step 3', outputEquals: '- [ ] 3. Morning message: morning_message in board/message.py' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good place for the plan, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'TASKS.md in the project', group: 0 },
          { text: 'A photo of a whiteboard', group: 1 },
          { text: 'An old agent chat', group: 1 },
          { text: 'A shared task tracker the team uses', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mark to its meaning.',
        pairs: [
          ['- [x]', 'Done and checked'],
          ['- [ ]', 'Still to do'],
          ['The first "- [ ]"', 'The next step'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Where are we with the board?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Two of five steps done and checked: the rule and the morning list. Next is the message for you. It\'s all in TASKS.md.' },
          { text: 'Nearly done, I think.', why: 'The list gives an exact answer.' },
          { text: 'Ask the agent.', why: 'The list is the source of truth.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'text = "- [x] a\\n- [ ] b\\n- [ ] c"\nprint(text.count("- [ ]"))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: 'One of the three is ticked.' },
          { text: '1', why: 'Two lines are unticked.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A task line.',
        template: 'A step that is done and checked is [[1]]; the next step is the first one still [[2]].',
        blanks: [['ticked'], ['unticked']],
        distractors: ['claimed', 'deleted'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of TASKS.md is ticked too early?',
        lines: [
          '- [x] 1. Rule (tests pass, Zanele checked)',
          '- [x] 2. Morning list (checked on the sample)',
          '- [x] 3. Morning message (the agent said done)',
          '- [ ] 4. Show Zanele and Brian',
        ],
        bug: 2,
        fix: '- [ ] 3. Morning message (until you\'ve checked it)',
        explanation: '"The agent said done" isn\'t a check.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What file did Felix ask Remi to keep the plan in?',
        answers: ['TASKS.md', 'tasks.md', 'TASKS'],
        placeholder: 'A file name',
      },
    ],
  },
  reflect: {
    prompt: 'Where does your to-do list live right now? Could a colleague see where you are in five seconds?',
    starters: ['My list lives...', 'A colleague would...'],
  },
  deepen: {
    title: 'Agents keep lists too',
    summary: 'Many real agents keep their own task list during a session and tick items off. Useful to watch, but your list is the one that counts: it survives the session.',
  },
  notes: 'TASKS.md in the lesson: 5 steps, 2 ticked (rule, morning list); first unticked is step 3 morning message. Markdown task-list syntax "- [ ]" / "- [x]".',
};

export default lesson;
