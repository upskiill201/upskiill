import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2 — The goal in one sentence. */

const START = 'from teyro_agent import read_brief\n';

const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The goal in one sentence',
  summary: 'Felix asks Remi to say what the Delivery Board does in one sentence. It takes him four tries. Then he checks what the agent understood from each one.',
  minutes: 11,
  outcomes: [
    'Write a one-sentence goal that names the thing to build',
    'Use read_brief() to see what the agent picked up',
    'Tell a goal from a wish',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four tries',
      steps: [
        { title: '1. "Make the delivery thing"', body: 'Names nothing. The agent can\'t tell what "thing" means, so it invents one.' },
        { title: '2. "Improve the board"', body: 'A wish, not a goal. Improve how? Faster? Prettier? The practice agent still doesn\'t know what to build.' },
        { title: '3. "Flag deliveries at risk of arriving late"', body: 'Now it knows the task. It still has to guess where, how and what "at risk" means, but it\'s aiming at the right thing.' },
        { title: '4. "Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late"', body: 'The task, the function, the file and the output, in one sentence. The rest of the brief adds details to this.' },
        { title: '5. Check what it understood', body: 'read_brief() shows what the practice agent picked up. "task" is "at_risk" when it recognises the job, "unknown" when it doesn\'t.', code: 'from teyro_agent import read_brief\nprint(read_brief("improve the board")["task"])   # unknown', language: 'python' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'What did it understand?',
      caption: 'The four tries, through read_brief().',
      code: START + '\ntries = [\n    "make the delivery thing",\n    "improve the board",\n    "Flag deliveries at risk of arriving late.",\n    "Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late.",\n]\nfor goal in tries:\n    print(read_brief(goal)["task"], "<-", goal)\n',
      challenge: 'Write your own one-sentence goal for the board and check it.',
    },
  ],
  apply: {
    scenario: 'Saying what you want.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the task the agent picks up from "improve the board"',
        starter: START,
        solution: START + 'print(read_brief("improve the board")["task"])\n',
        hint: 'read_brief("...")["task"]',
        checks: [{ message: 'Print unknown', outputEquals: 'unknown' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does a good one-sentence goal name?',
        options: [
          { text: 'How excited you are about it', why: 'Enthusiasm doesn\'t tell it what to build.' },
          { text: 'What to build, where, and what it gives back' },
          { text: 'Every detail of the rule', why: 'Details come after the goal, in the rest of the brief.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A goal or a wish?',
        groups: ['Goal', 'Wish'],
        items: [
          { text: 'Write is_at_risk in board/rules.py', group: 0 },
          { text: 'Make it better', group: 1 },
          { text: 'Flag deliveries at risk of arriving late', group: 0 },
          { text: 'Sort out the delivery stuff', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write a goal sentence the agent recognises as the at-risk task, and print the task it reads',
        starter: START + 'goal = "Make the board good."\n',
        solution: START + 'goal = "Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late."\nprint(read_brief(goal)["task"])\n',
        hint: 'Mention at-risk deliveries or is_at_risk',
        checks: [{ message: 'Print at_risk', outputEquals: 'at_risk' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the try to what\'s still missing.',
        pairs: [
          ['"make the delivery thing"', 'What to build at all'],
          ['"Flag deliveries at risk"', 'Where and which function'],
          ['"Write is_at_risk in board/rules.py"', 'What "at risk" means'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'One sentence is too short to explain everything.',
        prompt: "Felix's best reply?",
        options: [
          { text: 'True, skip the goal.', why: 'Without it, the details have nothing to hang on.' },
          { text: 'Put everything in one long sentence.', why: 'Goal first, details after.' },
          { text: 'It\'s not meant to. The sentence says WHAT. The rest of the brief says how, with examples, limits and a finish line.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_agent import read_brief\nprint(read_brief("Flag deliveries at risk of arriving late.")["task"])',
        language: 'python',
        options: [
          { text: 'at_risk' },
          { text: 'unknown', why: '"at risk" is in the sentence.' },
          { text: 'True', why: 'task holds a name, not True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A goal sentence.',
        template: 'Write [[1]] in board/rules.py: [[2]] when a delivery is likely to arrive late.',
        blanks: [['is_at_risk'], ['True']],
        distractors: ['dashboard', 'Maybe'],
      },
      {
        kind: 'findBug',
        prompt: 'Which goal sentence will the agent misread?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'Flag deliveries at risk of arriving late.',
          'Improve the delivery board.',
          'Return True when a delivery is at risk.',
        ],
        bug: 2,
        fix: 'Say what to build: "Write is_at_risk in board/rules.py."',
        explanation: '"Improve" names no task, so the agent builds what it imagines.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does read_brief() say the task is when it doesn\'t recognise the job?',
        answers: ['unknown'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Write one sentence that says what you\'re working on this week, so a stranger could start on it.',
    starters: ['This week I\'m...', 'It gives back...'],
  },
  deepen: {
    title: 'Real agents read goals better',
    summary: 'Real agents understand far more phrasings than the practice one. But a vague goal still gets a guess, just a more convincing one.',
  },
  notes: 'teyro_agent.read_brief: task "unknown" for "make the delivery thing" and "improve the board"; "at_risk" when the brief mentions at risk / at-risk / is_at_risk / late.',
};

export default lesson;
