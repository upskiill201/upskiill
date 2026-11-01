import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Errors are normal: Arjun's rule (read the message, find the line, fix one thing, run again). Syntax vs type errors. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Errors are normal',
  summary: 'Grace\'s screen fills with red. Arjun, on a video call from Bengaluru, has one rule for moments like this, and it works every time.',
  minutes: 13,
  outcomes: ['Follow a calm four-step routine for any error', 'Tell a syntax error from a type error', 'Fix a misspelled name using the message\'s suggestion'],
  learn: [
    {
      kind: 'story',
      title: 'Three red lines',
      beats: [
        { speaker: 'narrator', text: 'Thursday evening. Grace has written six lines for the booker. Three of them are underlined in red.' },
        { speaker: 'grace', text: 'Arjun, I think I\'ve broken it. All of it.' },
        { speaker: 'arjun', text: 'You haven\'t broken anything. You\'ve found three problems before a single patient saw them. That\'s the job working.' },
        { speaker: 'arjun', text: 'My rule. Read the message. Find the line. Fix one thing. Run again. Never three at once.' },
        { speaker: 'narrator', text: 'The first message says: Cannot find name \'consol\'. Did you mean \'console\'?' },
        { speaker: 'grace', text: 'It... tells me the answer?' },
        { speaker: 'arjun', text: 'Often, yes. The people who made TypeScript wanted the messages to help. Most developers just never read them.' },
      ],
      choice: {
        prompt: 'Three errors on screen. What should Grace do first?',
        options: [
          { text: 'Read the first message and fix just that line, then run again', outcome: 'One fix, one run. Often fixing the first error makes the others disappear too.', best: true },
          { text: 'Rewrite all six lines from scratch', outcome: 'That throws away five good lines and probably adds new mistakes. Fix what the messages point at.' },
          { text: 'Close the laptop and try again tomorrow', outcome: 'A break is fine, but the messages already say what to do. Two minutes of reading usually fixes it.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Two kinds of error. A syntax error means TypeScript can\'t even read the line (a missing bracket or quote). A type error means it can read it, but a value doesn\'t match.',
    },
    {
      kind: 'tryIt',
      title: 'Let the message help',
      caption: 'This has a misspelled name. Run it and read the suggestion.',
      code: 'consol.log("Room 2 is free");\n',
      challenge: 'Fix it using the suggestion in the message, then run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'The video call with Arjun.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s rule in order.',
        lines: ['Read the message', 'Find the line', 'Fix one thing', 'Run again'],
      },
      {
        kind: 'mcq',
        prompt: 'Cannot find name \'consol\'. Did you mean \'console\'? What should you do?',
        options: [
          { text: 'Rename everything to consol', why: 'consol isn\'t a real name. The message suggests console.' },
          { text: 'Fix the spelling to console' },
          { text: 'Add quotes around consol', why: 'Then it\'d be text, not the instruction. It just needs the right spelling.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the misspelling so it shows Room 2 is free',
        starter: 'consol.log("Room 2 is free");\n',
        solution: 'console.log("Room 2 is free");\n',
        hint: 'The message says what it should be: console.',
        checks: [
          { message: 'No errors', noTypeErrors: true },
          { message: 'Show Room 2 is free', outputIncludes: 'Room 2 is free' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Syntax error or type error?',
        groups: ['Syntax error (can\'t read it)', 'Type error (doesn\'t match)'],
        items: [
          { text: 'console.log("Hi";', group: 0 },
          { text: 'let rooms: number = "two";', group: 1 },
          { text: 'console.log("Hi);', group: 0 },
          { text: 'let name: string = 44;', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line with the syntax error.',
        language: 'typescript',
        lines: ['console.log("Thursday");', 'console.log("Room 2 is free";', 'console.log("Room 3 is free");'],
        bug: 1,
        fix: 'console.log("Room 2 is free");',
        explanation: 'The closing bracket is missing, so TypeScript says \')\' expected.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'arjun',
        message: 'Quick test. Your screen shows three errors. How many do you fix before running again?',
        options: [
          { text: 'All three, as fast as possible.', why: 'Fixing several at once makes it hard to know which fix worked, and sometimes one fix clears the others.' },
          { text: 'None: I wait for you to fix them.', why: 'Arjun won\'t always be on a call. Reading and fixing errors is the skill.' },
          { text: 'One. Then I run again and see what\'s left.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does TypeScript say about this line?',
        code: 'console.log("Room 2";',
        language: 'typescript',
        options: [
          { text: '\')\' expected' },
          { text: 'Type \'string\' is not assignable to type \'number\'', why: 'Nothing has a number label here. The line is missing its closing bracket.' },
          { text: 'Nothing: it works', why: 'The bracket that closes console.log( is missing.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix both mistakes so the code shows two lines: Thursday, then 3 sessions',
        starter: 'console.log("Thursday";\nconsol.log("3 sessions");\n',
        solution: 'console.log("Thursday");\nconsole.log("3 sessions");\n',
        hint: 'Line 1 is missing a bracket. Line 2 has a spelling mistake. Fix one, run, then the other.',
        checks: [
          { message: 'No errors', noTypeErrors: true },
          { message: 'Thursday, then 3 sessions', outputEquals: 'Thursday\n3 sessions' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A missing bracket or quote is called a ... error (one word).',
        answers: ['syntax'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each message to its fix.',
        pairs: [
          ['\')\' expected', 'Add the closing bracket'],
          ['Unterminated string literal', 'Add the closing quote'],
          ['Cannot find name \'consol\'', 'Fix the spelling'],
          ['Type \'string\' is not assignable to type \'number\'', 'Give it a number'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Arjun says errors found early are the job working. Where in your life is it better to find a mistake early, even if it feels bad in the moment?',
    starters: ['It\'s better to find mistakes early when...', 'Finding it late would mean...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Make a list of every error message you meet this week and what fixed it. Programmers keep notes like this for years.',
  },
  notes: 'consol.log → TS2552 "Cannot find name \'consol\'. Did you mean \'console\'?" console.log("x"; → TS1005 "\')\' expected." (syntax). Arjun works on video calls from Bengaluru (CAST: Grace and Arjun work together on calls for Kinwell).',
};

export default lesson;
