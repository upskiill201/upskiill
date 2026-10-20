import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18 — Reading someone else's brief. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests, read_brief\n\n';
const BRIAN = 'Can the agent make the board flag the risky ones? Should be quick. Make it nice.';

const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading someone else\'s brief',
  summary: 'Brian wants to try the agent himself. He writes a brief and asks Remi to "just run it". Remi reads it first, the way Felix reads his.',
  minutes: 12,
  outcomes: [
    'Review a brief before running it',
    'Find every gap in someone else\'s brief',
    'Give kind, specific feedback on a brief',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Brian\'s brief',
      html: '<pre><code>Can the agent make the board flag the risky ones? Should be quick. Make it nice.</code></pre><p>Read it with the five parts in mind:</p><ul><li><strong>Goal</strong>: "flag the risky ones" is close. But "risky" isn\'t the word the project uses (at risk, is_at_risk), and the practice agent doesn\'t recognise it. It would build something else.</li><li><strong>Inputs and outputs</strong>: none.</li><li><strong>Example</strong>: none.</li><li><strong>Limits</strong>: none.</li><li><strong>Done when</strong>: "should be quick" and "make it nice" are wishes.</li></ul><p>How Remi replies matters. Brian is the boss and new to this. Good feedback is specific, and offers the fix:</p><pre><code>Nearly! The agent needs the exact rule (Friday from 2 p.m., Saturday,\nover 150 km), a sample date, which file to change, and "done when\nall tests pass". Want me to add those and run it with you?</code></pre><p>Never run a brief you haven\'t read. You\'re the one who has to check what comes back.</p>',
    },
    {
      kind: 'tryIt',
      title: 'What would happen?',
      caption: 'Check Brian\'s brief before running it, then run it on a throwaway project.',
      code: START + `brief = ${JSON.stringify(BRIAN)}\nprint("Task the agent sees:", read_brief(brief)["task"])\nchange = PracticeAgent().run(brief, Project())\nprint(change.files_touched, "|", change.message)\n`,
      challenge: 'Change "risky" to "at risk". What does the agent build now?',
    },
  ],
  apply: {
    scenario: 'Reviewing a brief.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the task read_brief finds in Brian\'s brief',
        starter: START + `brief = ${JSON.stringify(BRIAN)}\n`,
        solution: START + `brief = ${JSON.stringify(BRIAN)}\nprint(read_brief(brief)["task"])\n`,
        hint: 'read_brief(brief)["task"]',
        checks: [{ message: 'Print unknown', outputEquals: 'unknown' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t the practice agent recognise "flag the risky ones"?',
        options: [
          { text: '"Risky" isn\'t the project\'s word; the code and tests say "at risk"' },
          { text: 'Brian isn\'t allowed to use it', why: 'Anyone can; the words are the problem.' },
          { text: 'It\'s a question', why: 'Questions are fine; the key term doesn\'t match.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it in Brian\'s brief?',
        groups: ['In it', 'Missing'],
        items: [
          { text: 'Something about flagging', group: 0 },
          { text: 'The exact rule', group: 1 },
          { text: 'Which file to change', group: 1 },
          { text: 'A checkable finish line', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Run Brian\'s brief on a fresh project and print the files the agent touched',
        starter: START + `brief = ${JSON.stringify(BRIAN)}\nproject = Project()\n`,
        solution: START + `brief = ${JSON.stringify(BRIAN)}\nproject = Project()\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched)\n`,
        hint: 'change = PracticeAgent().run(brief, project); print(change.files_touched)',
        checks: [{ message: "Print ['board/dashboard.py']", outputEquals: "['board/dashboard.py']" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Brian\'s words to a better version.',
        pairs: [
          ['"the risky ones"', 'Deliveries at risk of arriving late'],
          ['"Should be quick"', 'Only change board/rules.py'],
          ['"Make it nice"', 'Done when all tests pass'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Here\'s my brief. Just run it, I\'m sure it\'s fine.',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Nearly! It needs the exact rule, a sample date, which file, and "done when tests pass". Want to add them together? Takes two minutes.' },
          { text: 'Sure, running it now.', why: 'It would build a weather dashboard.' },
          { text: 'This brief is terrible.', why: 'True-ish, but unkind and not helpful.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_agent import read_brief\nprint(read_brief("Flag the deliveries at risk.")["task"])',
        language: 'python',
        options: [
          { text: 'at_risk' },
          { text: 'unknown', why: '"at risk" is the project\'s own term.' },
          { text: 'True', why: 'task is a name.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Good feedback on a brief.',
        template: 'Be [[1]], and offer the [[2]].',
        blanks: [['specific'], ['fix']],
        distractors: ['vague', 'blame'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Remi\'s routine is risky?',
        lines: [
          'Someone sends a brief.',
          'Run it straight away to save time.',
          'Read what came back.',
          'Give feedback.',
        ],
        bug: 1,
        fix: 'Read the brief first; fix gaps before running it.',
        explanation: 'You check what comes back, so read what goes in.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word in Brian\'s brief doesn\'t match the project\'s term "at risk"?',
        answers: ['risky'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'How do you like to get feedback on your work? Use that to write one line of feedback on Brian\'s brief.',
    starters: ['I like feedback that...', 'To Brian I\'d say...'],
  },
  deepen: {
    title: 'Use the project\'s words',
    summary: 'Briefs work best in the project\'s own vocabulary: the names in the code, tests and README. "at risk" and is_at_risk, not "risky".',
  },
  notes: 'Practice agent: Brian\'s brief "Can the agent make the board flag the risky ones? Should be quick. Make it nice." -> task unknown -> creates board/dashboard.py (weather dashboard). "Flag the deliveries at risk." -> task at_risk.',
};

export default lesson;
