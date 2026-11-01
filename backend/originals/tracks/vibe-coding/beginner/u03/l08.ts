import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Card deck: automated tests, written by the AI, judged by you. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Tests that run themselves',
  summary: 'Ruth\'s seven checks take four minutes. Hazel changes something ten times a night. "Make the computer do the checks," says Ruth. "That\'s what tests are."',
  minutes: 12,
  outcomes: [
    'Explain what an automated test is',
    'Ask the AI to write tests from your checklist',
    'Run them and read PASS and FAIL',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>An <strong>automated test</strong> is a tiny piece of code that checks one thing and says PASS or FAIL. Instead of you typing $1,200 and $600 and squinting, the test does it in a millisecond.</p><p>You don\'t have to write them. You already wrote the hard part: the checklist. The AI turns it into code.</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Move the adding-up into a function called totalOf(pledges).\nThen make tests.html: it runs these checks on totalOf and shows PASS or FAIL for each:\n- [] gives 0\n- [1200, 600] gives 1800\n- ["1200", "600"] gives 1800 (amounts typed as text)\nDon\'t change how the page looks.',
      caption: 'Hazel\'s test request. No installs needed: tests.html opens in the browser.',
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'check("two pledges add up", totalOf([1200, 600]) === 1800);\ncheck("text amounts add up", totalOf(["1200", "600"]) === 1800);',
      caption: 'Two of the tests it wrote. Each line: a name, then what must be true.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A test is only useful if it can fail. Before trusting a new test, break the code on purpose (or ask the AI to) and watch the test turn FAIL.',
    },
  ],
  apply: {
    scenario: 'Turning Ruth\'s sheet into tests.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an automated test?',
        options: [
          { text: 'A test the AI takes to get smarter', why: 'It\'s about checking your code.' },
          { text: 'A small piece of code that checks one thing and says pass or fail' },
          { text: 'A survey for users', why: 'Users don\'t run it; the computer does.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each checklist line to its test.',
        pairs: [
          ['No pledges yet', 'totalOf([]) === 0'],
          ['Two pledges add up', 'totalOf([1200, 600]) === 1800'],
          ['Typed amounts add up', 'totalOf(["50", "25"]) === 75'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the test.',
        template: 'check("two pledges add up", totalOf([50, 25]) === [[1]]);',
        blanks: [['75']],
        distractors: ['5025', '50'],
        language: 'javascript',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Why test text amounts like "1200"? Nobody types quotes.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'You\'re right, delete it.', why: 'That test is the car-wash bug.' },
          { text: 'Forms always give the code text, even when you type a number. That\'s exactly the car-wash bug.' },
          { text: 'Because Ruth likes quotes.', why: 'It tests what forms really send.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'tests.html shows these results. Which one tells Hazel the bug is still there?',
        lines: [
          'PASS  no pledges gives 0',
          'PASS  two pledges add up',
          'FAIL  text amounts add up (got 1200600)',
        ],
        bug: 2,
        fix: 'Ask: "The text-amounts test fails. Fix totalOf so it turns amounts into numbers. Don\'t change the tests."',
        explanation: 'FAIL with "got 1200600" is the glued-text bug, caught by a machine.',
      },
      {
        kind: 'mcq',
        prompt: 'Hazel\'s new test passes the first time. What should she do to trust it?',
        options: [
          { text: 'Nothing, passing is good', why: 'A test that can\'t fail proves nothing.' },
          { text: 'Break the code on purpose and check the test turns FAIL' },
          { text: 'Delete it', why: 'Keep it. Just prove it can fail.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The two words a test shows: PASS or ...?',
        answers: ['fail'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good test, or useless test?',
        groups: ['Good', 'Useless'],
        items: [
          { text: 'totalOf([10, 20]) === 30', group: 0 },
          { text: 'true === true', group: 1 },
          { text: 'totalOf(["5", "5"]) === 10', group: 0 },
          { text: 'A test that passes even when the code is broken', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'From checklist to tests, in order.',
        lines: [
          'Write the checklist in tests.md',
          'Ask the AI to turn it into tests.html',
          'Open tests.html and read PASS and FAIL',
          'Break the code on purpose: does a test fail?',
          'Run tests.html after every change',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review: why did Hazel include an exact example in her brief\'s "done when"?',
        options: [
          { text: 'An exact example can become a test' },
          { text: 'To make the brief longer', why: 'It\'s about being checkable.' },
          { text: 'The AI needs numbers to start', why: 'It needs them to know when it\'s right.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which line in your tests.md would hurt most if it broke without you noticing? That\'s your first automated test.',
  },
  deepen: {
    title: 'On your computer: tests.html',
    summary: 'Ask Claude Code to turn three lines of your tests.md into a tests.html page that shows PASS or FAIL. Open it. Then ask it to break the code on purpose for a moment: does a test turn FAIL? Ask it to undo the break.',
  },
  notes: 'In-browser test page avoids installing a test runner for beginners; Node-based runners (e.g. node --test) are an alternative mentioned in Chapter 5. HTML input .value is always a string.',
};

export default lesson;
