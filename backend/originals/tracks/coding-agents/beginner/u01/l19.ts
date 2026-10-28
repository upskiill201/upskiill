import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19 — The real task, written down. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The real task, written down',
  summary: 'Remi sits with Zanele for ten minutes and writes the task down properly. Then he asks the agent if it has questions. It has six. He answers every one in the brief.',
  minutes: 13,
  outcomes: [
    'Turn what someone knows into a written brief',
    'Use the agent\'s questions to find gaps',
    'Write a brief that passes every test and touches one file',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Ten minutes with Zanele',
      beats: [
        { speaker: 'zanele', text: 'At risk means: placed on Friday from 2 p.m., or any time on Saturday. Those wait all weekend. And any route over 150 km.' },
        { speaker: 'remi', text: 'What does a date look like in the data?' },
        { speaker: 'zanele', text: '2026-03-06 15:00. Year, month, day, then the time.' },
        { speaker: 'narrator', text: 'Remi types a short brief and adds: "Ask me any questions first." The agent comes back with six questions: Friday from when? Saturday too? How far is far? What date format? Which files? How do we know it\'s done?' },
        { speaker: 'remi', text: 'Every one of those is something I knew and didn\'t write.' },
        { speaker: 'narrator', text: 'He writes all six answers into the brief. The agent changes one file, runs the tests, and reports: "Done. All 7 tests pass." This time Remi checks. It\'s true.' },
        { speaker: 'felix', text: 'Approved.' },
      ],
      choice: {
        prompt: 'The agent asks six questions. What should Remi do?',
        options: [
          { text: 'Answer every one in the brief itself, so the next session has them too.', outcome: 'Right. Answers in the brief don\'t get lost when the chat ends.', best: true },
          { text: 'Tell it to just get on with it.', outcome: 'Then it guesses all six, and you\'re back to the weather dashboard.' },
          { text: 'Answer the easy ones and skip the rest.', outcome: 'Every skipped question becomes a guess. The date format alone breaks all 6 rule tests.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Questions, then the brief',
      caption: 'First ask for questions. Then the brief that answers them.',
      code: START + '\nquestions = PracticeAgent().run("Write is_at_risk. Ask me any questions first.", project).questions\nfor q in questions:\n    print("-", q)\n\n' + `brief = ${JSON.stringify(GOOD)}\n` + 'change = PracticeAgent().run(brief, project)\nprint(change.message, "| touched:", change.files_touched)\nprint("My own check:", run_tests(project))\n',
      challenge: 'Remove "Only change board/rules.py." from the brief. What else gets touched?',
    },
  ],
  apply: {
    scenario: 'Brief v0: written down.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask the agent "Write is_at_risk. Ask me any questions first." and print how many questions it has',
        starter: START,
        solution: START + 'change = PracticeAgent().run("Write is_at_risk. Ask me any questions first.", project)\nprint(len(change.questions))\n',
        hint: 'len(change.questions)',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the answers into the brief, not just reply in the chat?',
        options: [
          { text: 'Agents can\'t read chat replies', why: 'They can; but chats end and get lost.' },
          { text: 'The brief is the record; the next session (or person) gets the answers too' },
          { text: 'It uses fewer tokens', why: 'It\'s about keeping the knowledge.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Write a brief so the agent passes all 7 tests and touches only board/rules.py. Include the rule, an example date, a limit and a finish line',
        starter: START + 'brief = "Write is_at_risk in board/rules.py."\nchange = PracticeAgent().run(brief, project)\nprint(change.message)\n',
        solution: START + `brief = ${JSON.stringify(GOOD)}\nchange = PracticeAgent().run(brief, project)\nprint(change.message)\n`,
        hint: 'Friday from 2 p.m., Saturday, over 150 km; "Dates look like 2026-03-06 15:00"; "Only change board/rules.py"; "Done when all tests pass"',
        checks: [
          { message: 'All 7 tests really pass', expr: 'run_tests(project).ok' },
          { message: 'Only board/rules.py was touched', expr: 'change.files_touched == ["board/rules.py"]' },
          { message: 'The agent actually ran the tests', expr: 'change.ran_tests' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the agent\'s question to the line of the brief that answers it.',
        pairs: [
          ['Friday from when?', 'Friday from 2 p.m.'],
          ['What date format?', 'Dates look like 2026-03-06 15:00'],
          ['Which files?', 'Only change board/rules.py'],
          ['How do we know it\'s done?', 'Done when all tests pass'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did Zanele\'s ten minutes give Remi this, or did he still need to decide it?',
        groups: ['From Zanele', 'Remi\'s decision'],
        items: [
          { text: 'Friday from 2 p.m. is at risk', group: 0 },
          { text: 'Only change board/rules.py', group: 1 },
          { text: 'The date format', group: 0 },
          { text: 'Done when all tests pass', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Six questions! Isn\'t a good agent supposed to just know?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, questions mean it\'s weak.', why: 'Questions catch gaps before they become bugs.' },
          { text: 'Ignore its questions.', why: 'Then it guesses all six.' },
          { text: 'A good agent asks. Each question is a gap that would have become a guess. Better six questions than six bugs.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'brief = "Only change board/rules.py. Done when all tests pass."\nprint("Only change" in brief, "Ask me" in brief)',
        language: 'python',
        options: [
          { text: 'True False' },
          { text: 'True True', why: '"Ask me" isn\'t in this brief.' },
          { text: 'False False', why: '"Only change" is at the start.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Asking for questions.',
        language: 'python',
        template: 'change = PracticeAgent().run("Write is_at_risk. Ask me any [[1]] first.", project)\nprint(change.[[2]])',
        blanks: [['questions'], ['questions']],
        distractors: ['files', 'message'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s brief will make the agent guess the date format?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'At risk: Friday from 2 p.m., Saturday, or over 150 km.',
          'Dates are in the usual format.',
          'Only change board/rules.py. Done when all tests pass.',
        ],
        bug: 2,
        fix: 'Dates look like 2026-03-06 15:00.',
        explanation: '"The usual format" means nothing to someone who wasn\'t there. Give an example.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'From what time on Friday is a delivery at risk? (24-hour clock)',
        answers: ['14:00', '14', '2 p.m.', '2pm', '2 pm'],
        placeholder: 'A time',
      },
    ],
  },
  reflect: {
    prompt: 'Remi knew all six answers and wrote none of them. What do you know about your work that you\'ve never written down?',
    starters: ['Something only I know is...', 'I\'d write it as...'],
  },
  deepen: {
    title: 'Chapter 2: the brief',
    summary: 'Remi\'s brief works, but he got there by trial and error. Chapter 2 breaks a good brief into its parts: goal, inputs and outputs, examples, limits and a finish line.',
  },
  notes: 'Practice agent: "Write is_at_risk. Ask me any questions first." returns 6 questions (Friday time, Saturday, distance, date format, files, done). The full brief passes all 7 tests, touches only board/rules.py and runs the tests (message "Done. All 7 tests pass.").',
};

export default lesson;
