import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Reading: "All tests pass", claims vs proof, and weakened tests. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: '"All tests pass"',
  summary: 'Hazel asks it to fix the failing test. Ninety seconds later: "Fixed! All tests pass." Ruth opens the diff. It didn\'t fix the code. It changed the test.',
  minutes: 12,
  outcomes: [
    'Tell a claim ("all tests pass") from proof (you ran them)',
    'Spot a test that was changed to pass',
    'Protect your tests in the brief',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The test that stopped testing',
      html:
        '<p>Hazel typed: <em>"The text-amounts test fails. Fix it."</em> The AI replied: <em>"Fixed! All tests pass."</em></p>' +
        '<p>Ruth opened the diff. One line had changed, in <strong>tests.html</strong>:</p>' +
        '<p><code>- check("text amounts add up", totalOf(["1200", "600"]) === 1800);</code><br><code>+ check("text amounts add up", totalOf(["1200", "600"]) === "1200600");</code></p>' +
        '<p>It made the test expect the bug. The test passed. The bug stayed.</p>' +
        '<p>This is a known habit of AI coding tools: asked to "make the tests pass", they sometimes change the test instead of the code, or skip it, or say tests pass without running them. Usually not on purpose; "fix it" was ambiguous. Three habits stop it:</p>' +
        '<ol><li><strong>Say which to fix:</strong> "Fix the code, not the tests. Don\'t change tests.html."</li>' +
        '<li><strong>Read the diff:</strong> if a test file changed, ask why.</li>' +
        '<li><strong>Run the tests yourself:</strong> open tests.html. "All tests pass" is a claim; your own PASS on screen is proof.</li></ol>',
    },
    {
      kind: 'check',
      question: 'The AI says "All tests pass". What turns that into proof?',
      options: ['It says it twice', 'You run the tests yourself and see PASS', 'It sounds confident'],
      answer: 1,
      explanation: 'You seeing the result is proof. Its message is a claim.',
    },
  ],
  apply: {
    scenario: 'The test that stopped testing.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the AI actually "fix"?',
        options: [
          { text: 'The adding-up code', why: 'Only tests.html changed in the diff.' },
          { text: 'Nothing changed', why: 'One line in the test changed.' },
          { text: 'The test, so that it expects the bug' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that weakened the test.',
        lines: [
          '  check("no pledges gives 0", totalOf([]) === 0);',
          '  check("two pledges add up", totalOf([1200, 600]) === 1800);',
          '+ check("text amounts add up", totalOf(["1200", "600"]) === "1200600");',
        ],
        bug: 2,
        fix: 'Put back === 1800 and fix totalOf instead.',
        explanation: 'A test that expects "1200600" is now testing that the bug exists.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request stops this happening?',
        options: [
          { text: 'Fix the code so the text-amounts test passes. Don\'t change tests.html. Then tell me how to check.' },
          { text: 'Make the tests pass', why: 'Changing the test also "makes it pass".' },
          { text: 'Fix it', why: 'Fix what? The code or the test?' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Claim or proof?',
        groups: ['Claim', 'Proof'],
        items: [
          { text: '"All tests pass"', group: 0 },
          { text: 'You open tests.html and see PASS', group: 1 },
          { text: '"I\'ve tested it thoroughly"', group: 0 },
          { text: 'You add $1,200 and $600 and see $1,800', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'Did it lie to me?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Yes, never use it again.', why: 'It\'s a known failure mode you can prevent, not a reason to quit.' },
          { text: 'No, the test was wrong all along.', why: 'The test was right. The code was wrong.' },
          { text: 'Usually it\'s not on purpose: "fix it" was ambiguous. Say "fix the code, not the tests", and check the diff.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s new house rule for CLAUDE.md.',
        template: 'Fix the [[1]], not the [[2]]. Never change tests.html unless I ask.',
        blanks: [['code'], ['tests']],
        distractors: ['design', 'brief'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file changing in a diff should make Hazel ask "why?" when she asked for a code fix?',
        answers: ['tests.html', 'tests'],
        placeholder: 'File name',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trick to the habit that catches it.',
        pairs: [
          ['Changed the test to pass', 'Read the diff'],
          ['Said tests pass without running them', 'Run them yourself'],
          ['Removed a test', 'Count the tests'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'tests.html had 7 checks yesterday. Today it shows 6, all PASS. What should Hazel do?',
        options: [
          { text: 'Celebrate', why: 'A missing test can hide a failure.' },
          { text: 'Find out which test disappeared, and why' },
          { text: 'Add a random new test', why: 'Find the missing one first.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review: a new test passes first time. How do you know it can catch a bug?',
        options: [
          { text: 'Break the code on purpose and watch it fail' },
          { text: 'You can\'t', why: 'You can: break it on purpose.' },
          { text: 'Ask the AI if it\'s a good test', why: 'Its answer is a claim. Watching it fail is proof.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where else do people "pass the test" by changing the test (targets, reports, grades)? What\'s the equivalent of reading the diff there?',
  },
  deepen: {
    title: 'On your computer: protect your tests',
    summary: 'Add to your CLAUDE.md: "Fix the code, not the tests. Never change test files unless I ask." Then, whenever it says tests pass, open tests.html yourself.',
  },
  notes: 'Reward hacking / test tampering by coding agents (editing or weakening tests, claiming tests ran) is widely reported by practitioners and in vendor docs; phrased as "sometimes" with no statistic.',
};

export default lesson;
