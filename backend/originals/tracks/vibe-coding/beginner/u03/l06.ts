import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Walkthrough: test it like a user (a manual checklist). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Test it like a user',
  summary: 'Ruth hands Hazel a printed sheet: TEST PLAN, THERMOMETER. Seven lines. "Run these every time you change something. Takes four minutes. Saves a car wash."',
  minutes: 12,
  outcomes: [
    'Write a short manual test checklist',
    'Include the normal case, mistakes and odd cases',
    'Run it after every change',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Ruth\'s test plan',
      steps: [
        { title: '1. The normal case', body: 'Add one pledge: $50. Total shows $50, to go shows $17,950.' },
        { title: '2. More than one', body: 'Add $1,200 and $600. Total shows $1,800. (This one would have saved the car wash.)' },
        { title: '3. Survives a refresh', body: 'Refresh the page. The pledges are still there.' },
        { title: '4. A typo', body: 'Type "fifty" or leave the amount blank. It should refuse politely, not add $0 or crash.' },
        { title: '5. Odd but real', body: 'Add $0.50 and a huge $25,000 pledge. Decide what should happen, then check it does.' },
        { title: '6. Reaching the goal', body: 'Pledges totalling exactly $18,000 show the D.C. message; $17,999 doesn\'t.' },
        { title: '7. On a phone', body: 'Open it on a phone-width window. Can you read it and press Add?' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Save the checklist as tests.md in your project folder. Then you can ask Claude Code: "Run through tests.md in your head and tell me which ones my last change might break."',
    },
  ],
  apply: {
    scenario: 'Ruth\'s printed test plan.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which kind of test is each one?',
        groups: ['Normal case', 'Mistake or odd case'],
        items: [
          { text: 'Add $50', group: 0 },
          { text: 'Leave the amount blank', group: 1 },
          { text: 'Type "fifty"', group: 1 },
          { text: 'Add $100 and $200', group: 0 },
          { text: 'A $25,000 pledge', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which test would have caught the car-wash bug?',
        options: [
          { text: 'Add one pledge', why: 'One pledge can\'t show an adding bug.' },
          { text: 'Open it on a phone', why: 'The bug was in the maths.' },
          { text: 'Add two pledges and check the total' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete test 6.',
        template: 'Exactly $[[1]] shows the D.C. message. $17,999 does [[2]].',
        blanks: [['18,000', '18000'], ['not']],
        distractors: ['17,000', 'too'],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Seven tests every time?! That\'s forever.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Four minutes. The car wash bug cost us an afternoon and some trust.' },
          { text: 'Fine, just test one.', why: 'One test is how we got $1,200,600.' },
          { text: 'Only Ruth tests.', why: 'Whoever changes it, tests it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Someone types "fifty". What should a well-built page do?',
        options: [
          { text: 'Add $0 quietly', why: 'Then the total is wrong and nobody knows why.' },
          { text: 'Show a short message like "Please type a number" and add nothing' },
          { text: 'Crash', why: 'A typo shouldn\'t break the page.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'After every change, in order.',
        lines: ['Make one small change', 'Read the diff', 'Run the test checklist', 'Note anything that failed', 'Report failures clearly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pledges: $50. How much to go toward $18,000? (Number only.)',
        answers: ['17950', '17,950', '$17,950', '$17950'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Benny\'s test plan isn\'t a real test?',
        lines: [
          'Add $20 and $30: total shows $50.',
          'Refresh: pledges still there.',
          'Check it vibes.',
          'Blank amount: shows a message.',
        ],
        bug: 2,
        fix: 'Every test needs an action and an expected result.',
        explanation: '"Vibes" has no expected result, so it can\'t pass or fail.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the test to what it protects.',
        pairs: [
          ['Survives a refresh', 'Pledges aren\'t lost'],
          ['Two pledges add up', 'The maths'],
          ['Phone-width window', 'Parents on phones'],
          ['Blank amount', 'Typos'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review: a test fails. What goes in the report?',
        options: [
          { text: 'What I did, what I expected, what happened' },
          { text: '"It failed"', why: 'Which test? What happened?' },
          { text: 'Nothing, just try again', why: 'Report it so it gets fixed.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who would use your tool? Write one test from their point of view ("As a parent on a phone, I...").',
  },
  deepen: {
    title: 'On your computer: tests.md',
    summary: 'Write tests.md for your tool: the normal case, two or more entries, a refresh, a typo, an odd case, the goal or limit, and a phone-width window. Run all of them now.',
  },
  notes: 'Manual test plan covering happy path, boundary, invalid input, persistence and responsive layout. Browser dev tools can simulate phone widths (Chapter 6 covers dev tools).',
};

export default lesson;
