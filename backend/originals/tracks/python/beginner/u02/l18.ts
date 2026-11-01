import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18 — Debugging a NameError: read the message, find the line, check spelling and order. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Debugging a NameError',
  summary: 'Sunday night. The tracker stops with NameError: name \'pay_dya\' is not defined. Ada used to panic at red text. Now she reads it, like Chapter 1 taught her.',
  minutes: 12,
  outcomes: [
    'Read a NameError message',
    'Find the line and the name it complains about',
    'Fix the two usual causes: spelling and order',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 9 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Ada adds a line to the welcome screen and runs it. Red text: NameError: name \'pay_dya\' is not defined.' },
        { speaker: 'ada', text: '(out loud, to nobody) Okay. It tells me the name. pay_dya. Where did I type pay_dya?' },
        { speaker: 'narrator', text: 'The error points at line 6. Her variable, at the top, is pay_day. Line 6 says pay_dya.' },
        { speaker: 'tey', text: 'A NameError always means one of two things: the name is spelled differently from where you stored it, or you used it before the line that stores it.' },
      ],
      choice: {
        prompt: 'What should Ada check first?',
        options: [
          {
            text: 'Compare the name in the error with the name where she stored it.',
            outcome: 'pay_dya vs pay_day. Two letters swapped. Fixed in five seconds.',
            best: true,
          },
          {
            text: 'Delete the line and start again.',
            outcome: 'It works, but she learns nothing, and next time the bug is in a line she needs.',
          },
          {
            text: 'Ask Arjun.',
            outcome: 'It\'s 9 p.m. in Lagos and 1:30 a.m. in Bengaluru. The error message already says everything.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Read the message',
      caption: 'Run it, read the error, and fix it.',
      code: 'GROUP_NAME = "OFFICE AJO"\npay_day = 25\n\nprint(GROUP_NAME)\nprint(f"Pay day: {pay_dya}")\n',
      expectError: true,
      challenge: 'Fix the spelling and run it again.',
    },
  ],
  apply: {
    scenario: 'Reading NameErrors calmly.',
    items: [
      {
        kind: 'mcq',
        prompt: 'NameError: name \'membrs\' is not defined. What\'s the most likely cause?',
        options: [
          { text: 'Python is broken', why: 'Python is telling you exactly which name it can\'t find.' },
          { text: 'A typo: the variable is probably members' },
          { text: 'members is too long', why: 'Names can be any length.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the NameError so it prints Pay day: 25',
        starter: 'pay_day = 25\nprint(f"Pay day: {pay_dya}")\n',
        solution: 'pay_day = 25\nprint(f"Pay day: {pay_day}")\n',
        hint: 'Match the spelling to the line that stores it.',
        checks: [{ message: 'Print Pay day: 25', outputEquals: 'Pay day: 25' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'What causes each NameError?',
        groups: ['Spelling', 'Order'],
        items: [
          { text: 'pay_day stored, pay_dya used', group: 0 },
          { text: 'print(pot) before pot = ...', group: 1 },
          { text: 'Members used, members stored', group: 0 },
          { text: 'total used on line 2, stored on line 5', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the order so it prints 275000',
        starter: 'print(pot)\nmembers = 11\nshare = 25000\npot = members * share\n',
        solution: 'members = 11\nshare = 25000\npot = members * share\nprint(pot)\n',
        hint: 'Move print(pot) to after pot is stored.',
        checks: [{ message: 'Print 275000', outputEquals: '275000' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for fixing a NameError.',
        lines: ['Read the name in the message', 'Go to the line it points at', 'Find where you stored that name', 'Compare spelling, then order', 'Fix and run again'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line causes the NameError?',
        language: 'python',
        lines: ['this_month = "Tunde"', 'next_month = "Bisi"', 'print(f"{this_month} then {nextmonth}")'],
        bug: 2,
        fix: 'print(f"{this_month} then {next_month}")',
        explanation: 'nextmonth is missing its underscore, so Python can\'t find it.',
      },
      {
        kind: 'mcq',
        prompt: 'Does a NameError inside an f-string\'s braces still name the variable?',
        options: [
          { text: 'Yes: it shows the name exactly as you typed it in the braces' },
          { text: 'No, f-strings hide errors', why: 'Errors inside braces are reported like any other.' },
          { text: 'It turns into a TypeError', why: 'A missing name is always a NameError.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(next morning) Saw your 9 p.m. message. Still need help?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, Python hates me.', why: 'She fixed it herself by reading the message.' },
          { text: 'I deleted the whole tracker.', why: 'No need: one typo.' },
          { text: 'No! I read the error: pay_dya instead of pay_day. Fixed it in five seconds.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the corrected line.',
        language: 'python',
        tiles: ['print(', 'f"Pay day: {pay_day}"', ')'],
        distractors: ['f"Pay day: {pay_dya}"', 'Print('],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A NameError means one of two things: spelling, or ___. (one word)',
        answers: ['order', 'ordering', 'sequence'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Ada stopped panicking at red text and started reading it. What else became less scary once you read it calmly?',
    starters: ['I used to panic at...', 'Now I...'],
  },
  deepen: {
    title: '"Did you mean?"',
    summary: 'Python 3.10 and later add hints to NameErrors: "Did you mean: \'pay_day\'?" Look for them in the error text.',
  },
  notes: 'NameError message format: name \'x\' is not defined (Built-in Exceptions). "Did you mean" suggestions for NameError were added in Python 3.10 (What\'s New in Python 3.10, "Better error messages"). Lagos (WAT, UTC+1) 9 p.m. = Bengaluru (IST, UTC+5:30) 1:30 a.m.',
};

export default lesson;
