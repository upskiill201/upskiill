import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: fresh sessions, task lists, who does what, stopping halfway. */

const MESSAGE = 'Write morning_message in board/message.py: takes the list of order ids and returns one line for Brian. If none are at risk, say so. Only change board/message.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: keep your place',
  summary: 'Fresh sessions when they get tired, a task list in the project, people deciding and checking, and planned stops to show the work. Quick check before the post-mortem.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Keep a multi-step task on track without notes', 'Know when to stop and when to start fresh'],
  learn: [
    {
      kind: 'story',
      title: 'Three of five',
      beats: [
        { speaker: 'narrator', text: 'TASKS.md: three ticks. The message handles quiet days. Brian is happy with the wording.' },
        { speaker: 'felix', text: 'Before step 4, tell me what really went wrong with the six-file change. Properly.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: keep your place.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the message step (with the empty case) and print the message for ["D-1008"]',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(MESSAGE)}, project)\nmessage = project.load("board.message")\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(MESSAGE)}, project)\nmessage = project.load("board.message")\nprint(message.morning_message(["D-1008"]))\n`,
        hint: 'message.morning_message(["D-1008"])',
        checks: [{ message: 'Print the one-delivery message', outputEquals: 'Good morning! 1 deliveries at risk today: D-1008.' }],
      },
      {
        kind: 'mcq',
        prompt: '"Good morning! 1 deliveries at risk today" has a grammar slip. What\'s the best fix?',
        options: [
          { text: 'Ignore it', why: 'Brian reads it every day.' },
          { text: 'Add the one-delivery case to the brief ("1 delivery") and rerun the step' },
          { text: 'Delete the message feature', why: 'It\'s a one-line brief fix.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fresh session, or carry on?',
        groups: ['Fresh session', 'Carry on'],
        items: [
          { text: 'It forgot a limit from the morning', group: 0 },
          { text: 'Step 2 of 5 is going well', group: 1 },
          { text: 'You\'re starting a different task', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the number of unticked steps in the task list',
        starter: 'tasks = "- [x] 1. Rule\\n- [x] 2. Morning list\\n- [x] 3. Morning message\\n- [ ] 4. Show Zanele and Brian\\n- [ ] 5. Review with Felix"\n',
        solution: 'tasks = "- [x] 1. Rule\\n- [x] 2. Morning list\\n- [x] 3. Morning message\\n- [ ] 4. Show Zanele and Brian\\n- [ ] 5. Review with Felix"\nprint(tasks.count("- [ ]"))\n',
        hint: 'tasks.count("- [ ]")',
        checks: [{ message: 'Print 2', outputEquals: '2' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Context fills up', 'Start a fresh session'],
          ['- [x]', 'Done and checked'],
          ['People decide', 'The agent types'],
          ['Brian\'s quiet day', 'Stop and show'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s plan skips a planned stop?',
        lines: [
          'Step 3: write the message.',
          'Show Brian the message.',
          'Step 4: build the web page on top of the message, without showing anyone.',
          'Show Zanele and Brian.',
        ],
        bug: 2,
        fix: 'Show the step to the people who\'ll use it before building on it.',
        explanation: 'Building on unchecked work multiplies the cost of mistakes.',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The session has been open since 9 a.m. and it just suggested the weather dashboard again.',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Tell it off and keep going.', why: 'A tired session drifts; start fresh.' },
          { text: 'Build the dashboard then.', why: 'Nobody asked for it.' },
          { text: 'Time for a fresh session. Your brief, plan and code are saved; point it at TASKS.md and the next step.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'n = 1\nprint(f"{n} delivery" if n == 1 else f"{n} deliveries")',
        language: 'python',
        options: [
          { text: '1 delivery' },
          { text: '1 deliveries', why: 'n == 1, so the first form is used.' },
          { text: 'delivery', why: 'The number is included.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Starting fresh safely.',
        template: 'Keep the brief in [[1]] and the plan in [[2]].',
        blanks: [['BRIEF.md'], ['TASKS.md']],
        distractors: ['the chat', 'your head'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a fresh session that picks up where you left off.',
        lines: ['Save a checkpoint', 'Close the old session', 'Open a fresh one', 'Point it at BRIEF.md and the next step in TASKS.md'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file shows where the project is up to? (name and extension)',
        answers: ['TASKS.md', 'tasks.md'],
        placeholder: 'A file name',
      },
    ],
  },
  reflect: {
    prompt: 'Which habit from this part of the chapter would help you most outside of coding?',
    starters: ['The habit is...', 'It would help with...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 11-14. Message step with empty case: morning_message(["D-1008"]) -> "Good morning! 1 deliveries at risk today: D-1008." (singular not handled; a further brief case).',
};

export default lesson;
