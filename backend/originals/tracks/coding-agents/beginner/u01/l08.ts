import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8 — Your job changes: from typing to judging. */

const START = 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n';
const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l08',
  title: 'From typing to judging',
  summary: 'Remi realises he\'s barely typed any code. Is he still a developer? Tey explains what his job is now: deciding what to build, and judging what comes back.',
  minutes: 11,
  outcomes: [
    'Describe the human\'s job when an agent writes the code',
    'Read a short change and say what it does',
    'Know which skills matter more with agents, not less',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'With an agent, typing gets cheap. What gets valuable is everything around it: knowing what to build, describing it exactly, and judging whether what came back is right.', replies: ['So I don\'t need to know Python?'] },
        { tey: 'You need it more. You can\'t judge code you can\'t read. You don\'t have to type every line, but you have to understand every line you approve.', replies: ['What does judging look like?'] },
        { tey: 'Four questions on every change. Is it what we asked for? Did it touch anything else? Does the evidence say it works? Could I explain it to Felix?', replies: ['That sounds slower than typing it myself.'] },
        { tey: 'Sometimes it is. For a two-line fix, just type it. For the dull, well-defined parts, the agent types and you judge. Knowing which is which is the skill.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Judge a change',
      caption: 'A good brief. Read what it changed and decide if you could explain it.',
      code: START + `\nchange = PracticeAgent().run(${JSON.stringify(GOOD)}, project)\nprint(change.diff)\nprint("Lines added:", change.lines_added, "removed:", change.lines_removed)\n`,
      challenge: 'Explain the line with "placed.hour >= 14" in your own words.',
    },
  ],
  apply: {
    scenario: 'The judge\'s questions.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the good brief and print how many lines the change added',
        starter: START + `brief = ${JSON.stringify(GOOD)}\n`,
        solution: START + `brief = ${JSON.stringify(GOOD)}\nchange = PracticeAgent().run(brief, project)\nprint(change.lines_added)\n`,
        hint: 'change.lines_added',
        checks: [{ message: 'Print 9', outputEquals: '9' }],
      },
      {
        kind: 'mcq',
        prompt: 'With an agent writing the code, which skill matters MORE?',
        options: [
          { text: 'Typing fast', why: 'The agent types; you judge.' },
          { text: 'Reading and judging code' },
          { text: 'Memorising syntax', why: 'Understanding beats memorising.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tey\'s four questions for every change.',
        lines: ['Is it what we asked for?', 'Did it touch anything else?', 'Does the evidence say it works?', 'Could I explain it to Felix?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Type it yourself, or give it to the agent?',
        groups: ['Type it yourself', 'Give it to the agent'],
        items: [
          { text: 'Fix a one-word typo', group: 0 },
          { text: 'Write a function to pass 6 clear tests', group: 1 },
          { text: 'Change one number in a setting', group: 0 },
          { text: 'Add the same check to 20 files', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'If the agent writes everything, am I still a developer?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'No, you\'re redundant now.', why: 'Someone has to know what to build and judge the result.' },
          { text: 'Only if you type every line.', why: 'Judgement, not typing, is the job.' },
          { text: 'You\'re the one deciding what\'s right. That was always the hard part. The typing was never the job.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print? (Friday is weekday 4.)',
        code: 'weekday, hour = 4, 15\nprint(weekday == 4 and hour >= 14)',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'Friday at 15:00 is after 14:00.' },
          { text: '15', why: 'It prints the result of the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the good brief and print how many lines it removed',
        starter: START + `brief = ${JSON.stringify(GOOD)}\nchange = PracticeAgent().run(brief, project)\n`,
        solution: START + `brief = ${JSON.stringify(GOOD)}\nchange = PracticeAgent().run(brief, project)\nprint(change.lines_removed)\n`,
        hint: 'change.lines_removed',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The new job.',
        template: 'The agent [[1]]; you [[2]].',
        blanks: [['types'], ['judge']],
        distractors: ['reviews', 'guess'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s plan skips the judging?',
        lines: [
          'Write a clear brief.',
          'Let the agent write the code.',
          'Approve it without reading, since the tests passed.',
          'Send it to Felix.',
        ],
        bug: 2,
        fix: 'Read the change and make sure you could explain it.',
        explanation: 'Tests can be wrong or weakened (Chapter 5). Read every change.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On a weekday number, which day is 4?',
        answers: ['Friday', 'friday'],
        placeholder: 'A day',
      },
    ],
  },
  reflect: {
    prompt: 'Which part of your work is "typing" and which is "judging"? Which would you want to keep?',
    starters: ['The typing part is...', 'The judging part is...'],
  },
  deepen: {
    title: 'Understanding debt',
    summary: 'Every line you approve without understanding is a loan. It gets paid back later, with interest, when something breaks and nobody knows how it works.',
  },
  notes: 'Practice agent with the good brief: change.lines_added 9, lines_removed 3 (board/rules.py only). Python datetime.weekday(): Monday 0 ... Friday 4, Saturday 5.',
};

export default lesson;
