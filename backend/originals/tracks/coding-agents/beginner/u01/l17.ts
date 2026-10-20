import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17 — Common first-week mistakes. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';

const lesson: OriginalLesson = {
  key: 'l17',
  title: 'First-week mistakes',
  summary: 'Felix has watched a lot of people try agents for the first time. He writes Remi a list: what nearly everyone does in week one, and what to do instead.',
  minutes: 11,
  outcomes: [
    'Name the five most common first-week mistakes',
    'Know what to do instead of each',
    'Check a project\'s state before and after a session',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Week one vs what works',
      before: {
        label: 'Week one',
        text: 'One-line briefs.\nBelieving "Done!".\nNever reading the project first.\nRun mode from day one.\nNot knowing what failed BEFORE the agent started.',
      },
      after: {
        label: 'What works',
        text: 'A brief with what, where and when it\'s done.\nRunning the tests yourself.\nReading README and tests first.\nClimbing the trust ladder.\nRunning the tests before AND after.',
      },
      notes: [
        'The last one is sneaky. If 3 tests failed before the agent started, "3 tests fail" afterwards means nothing changed, not that it broke something.',
        'Knowing the starting point is called a baseline.',
        'Every one of these costs nothing but a minute, and saves an hour.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Before and after',
      caption: 'Run the tests at the start, let the agent work, run them again.',
      code: START + '\nbefore = run_tests(project)\nPracticeAgent().run("make the delivery thing", project)\nafter = run_tests(project)\nprint("Before:", before)\nprint("After: ", after)\nprint("Anything fixed?", len(after.failed) < len(before.failed))\n',
      challenge: 'Try it with a better brief from earlier lessons.',
    },
  ],
  apply: {
    scenario: 'Not making the usual mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the tests before the agent, then print how many failed',
        starter: START + 'before = run_tests(project)\n',
        solution: START + 'before = run_tests(project)\nprint(len(before.failed))\n',
        hint: 'len(before.failed)',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is a baseline?',
        options: [
          { text: 'What passes and fails before any change, so you can compare' },
          { text: 'The agent\'s first message', why: 'It\'s your own measurement of the starting point.' },
          { text: 'The cheapest agent plan', why: 'It\'s about the starting state of the project.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Week-one mistake, or what works?',
        groups: ['Mistake', 'What works'],
        items: [
          { text: 'Run mode from day one', group: 0 },
          { text: 'Read README and the tests first', group: 1 },
          { text: 'Believe "Done!"', group: 0 },
          { text: 'Run the tests before and after', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Record the failures before, run "make the delivery thing", then print whether the failures are the same afterwards',
        starter: START + 'before = run_tests(project)\nPracticeAgent().run("make the delivery thing", project)\n',
        solution: START + 'before = run_tests(project)\nPracticeAgent().run("make the delivery thing", project)\nafter = run_tests(project)\nprint(sorted(before.failed) == sorted(after.failed))\n',
        hint: 'sorted(before.failed) == sorted(after.failed)',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['One-line brief', 'What, where, when done'],
          ['Believing "Done!"', 'Run the tests yourself'],
          ['Run mode on day one', 'Climb the trust ladder'],
          ['No baseline', 'Run the tests before'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'After the agent, 3 tests fail. It broke 3 things!',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Did they fail before it started? Check your baseline. If it\'s the same 3, it broke nothing; it just fixed nothing.' },
          { text: 'Yes, revert everything now.', why: 'Compare with the baseline first.' },
          { text: 'Tests don\'t matter.', why: 'They matter; you need the before to read the after.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'before = {"a", "b", "c"}\nafter = {"a", "b", "c"}\nprint(after - before)',
        language: 'python',
        options: [
          { text: 'set()' },
          { text: "{'a', 'b', 'c'}", why: 'Subtracting equal sets leaves nothing.' },
          { text: '0', why: 'It prints an empty set.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Before and after.',
        template: 'Run the tests [[1]] the agent starts, and again [[2]] it finishes.',
        blanks: [['before'], ['after']],
        distractors: ['while', 'instead'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s routine skips the baseline?',
        lines: [
          'Read README and tests.',
          'Brief the agent.',
          'Run the tests after it finishes.',
          'Compare and report.',
        ],
        bug: 2,
        fix: 'Run the tests before briefing, and again after.',
        explanation: 'Without a "before", there\'s nothing to compare with.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the word for the state you measure before making a change?',
        answers: ['baseline', 'a baseline'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which week-one mistake do you think you\'d make? What will you do instead?',
    starters: ['I\'d probably...', 'Instead I\'ll...'],
  },
  deepen: {
    title: 'Clean starting point',
    summary: 'Professionals start every agent session from a clean, saved state, so the only changes are the agent\'s. In Chapter 3 that means a checkpoint; in Chapter 9, a fresh branch.',
  },
  notes: 'Practice project baseline: 3 failing tests (friday afternoon, saturday, long route). After "make the delivery thing" the same 3 fail.',
};

export default lesson;
