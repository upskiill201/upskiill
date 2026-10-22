import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: the vague brief, kinds of help, the loop, strengths and weaknesses. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: what an agent is',
  summary: 'One-line briefs get guesses, agents act where chat only suggests, the loop is read-plan-act-check, and clear checkable jobs suit agents best. Quick check before Remi opens the toolbox.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Run the practice agent and read its work without notes', 'Explain what makes an agent an agent'],
  learn: [
    {
      kind: 'story',
      title: 'Sticky note',
      beats: [
        { speaker: 'narrator', text: 'Remi sticks a note on his laptop: "Read. Plan. Act. CHECK."' },
        { speaker: 'felix', text: 'Good. Now learn what it\'s actually allowed to touch.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what an agent is.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run "make the delivery thing" and print the agent\'s message',
        starter: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n',
        solution: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nchange = PracticeAgent().run("make the delivery thing", project)\nprint(change.message)\n',
        hint: 'print(change.message)',
        checks: [{ message: 'Print the "Done!" message', outputIncludes: 'Done! I built a delivery dashboard' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the difference between an agent and autocomplete?',
        options: [
          { text: 'Autocomplete is smarter', why: 'They may use the same model; the tools differ.' },
          { text: 'An agent edits files and runs commands on its own; autocomplete suggests lines you accept' },
          { text: 'There is none', why: 'An agent acts; autocomplete suggests.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the agent loop.',
        lines: ['Read', 'Plan', 'Act', 'Check'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many tests fail in a fresh project',
        starter: 'from teyro_agent import Project, run_tests\n\nproject = Project()\n',
        solution: 'from teyro_agent import Project, run_tests\n\nproject = Project()\nprint(len(run_tests(project).failed))\n',
        hint: 'len(run_tests(project).failed)',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A fact or a claim?',
        groups: ['Fact', 'Claim'],
        items: [
          { text: 'run_tests says 7 passed', group: 0 },
          { text: '"Done!"', group: 1 },
          { text: 'files_touched lists board/rules.py', group: 0 },
          { text: '"This will work great"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['One-line brief', 'The agent guesses'],
          ['Agent', 'Acts on your files'],
          ['Check', 'The step agents skip'],
          ['Clear, checkable job', 'Where agents shine'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Felix says you have an AI that writes code now. So the board is basically done?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Yes, it said done!', why: 'It built a weather dashboard.' },
          { text: 'The AI is useless.', why: 'It\'s useful once the job is clear.' },
          { text: 'Not yet. It writes fast, but I have to tell it exactly what we need and check everything. I\'ll show you something tested.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s summary is wrong?',
        lines: [
          'Agents read, plan, act and check.',
          'They\'re best at clear, checkable jobs.',
          'They know our team\'s unwritten rules.',
          'I check their work before Felix sees it.',
        ],
        bug: 2,
        fix: 'They only know what we write in the brief and the files.',
        explanation: 'Unwritten rules have to be written down.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'failed = ["test_friday_afternoon_is_at_risk", "test_saturday_is_at_risk", "test_long_route_is_at_risk"]\nprint(failed[0])',
        language: 'python',
        options: [
          { text: 'test_friday_afternoon_is_at_risk' },
          { text: 'test_long_route_is_at_risk', why: 'Index 0 is the first item.' },
          { text: '3', why: 'It prints the first item, not the count.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s sticky note.',
        template: 'Read. Plan. [[1]]. [[2]].',
        blanks: [['Act'], ['Check']],
        distractors: ['Ship', 'Guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who reviews every change to the Delivery Board?',
        answers: ['Felix'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'In one sentence, how would you explain a coding agent to Brian, who doesn\'t code?',
    starters: ['A coding agent is...', 'But you still have to...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. Fresh project: 3 failing tests.',
};

export default lesson;
