import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16 — think like a programmer: break problems down and plan in plain words (pseudocode). */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Think like a programmer',
  summary: 'Before writing code, programmers write the plan in plain words. Big problems become tiny steps, and tiny steps become lines of Python.',
  minutes: 12,
  outcomes: [
    'Break a problem into small, exact steps',
    'Write a plan in plain words (pseudocode) as comments',
    'Turn each planned step into a line of code',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada wants her program to "sort out the ajo". Can a computer do that?', replies: ['Sounds hard', 'Maybe?'] },
        { tey: "Not as it's written. \"Sort out the ajo\" is too big and too vague. Computers need tiny, exact steps." },
        { tey: 'So programmers break it down. What does "sort out the ajo" actually mean each month?', replies: ['Collect money', 'Say who gets paid'] },
        { tey: 'Yes! Keep going smaller: show the members, show what each pays, work out the pot, say whose turn it is. Each of those is small enough to code.' },
        { tey: 'Writing the plan in plain words like this is called pseudocode ("fake code"). Put it in comments, then fill in a line of Python under each one.', replies: ['Show me'] },
        { tey: '# 1. Show the title\n# 2. Show how many members\n# 3. Work out the pot\n# 4. Say whose turn it is\n\nNow each comment gets one line of code. The plan becomes the program.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Plan first, then code',
      caption: 'The comments are the plan. Each one has its line of code. Press Run.',
      code: '# 1. Show the title\nprint("OFFICE AJO")\n# 2. Show how many members\nprint("Members:", 10)\n# 3. Work out the pot\nprint("Pot:", 10 * 20000)\n# 4. Say whose turn it is\nprint("This month: Tunde")\n',
      challenge: 'Add step 5 to the plan, "Say who is next", with its own line of code.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If a step feels hard to code, it is still too big. Break it down again.',
    },
  ],
  apply: {
    scenario: 'Ada plans before she codes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which step is small enough to turn straight into code?',
        options: [
          { text: 'Print how many members there are' },
          { text: 'Sort out the ajo', why: 'Too big and too vague. Break it down.' },
          { text: 'Make everyone happy', why: 'Not something a program can do in one step.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the plan for the monthly report in a sensible order.',
        lines: ['# Show the title', '# Show how many members', '# Work out the pot', '# Say whose turn it is'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fill in a line of code under each step of the plan',
        starter: '# 1. Show the title: PAY DAY\n\n# 2. Show the pot for 10 members paying 20000\n\n',
        solution: '# 1. Show the title: PAY DAY\nprint("PAY DAY")\n# 2. Show the pot for 10 members paying 20000\nprint("Pot:", 10 * 20000)\n',
        hint: 'One print( ) under each comment.',
        checks: [
          { message: 'Print PAY DAY first', outputIncludes: 'PAY DAY' },
          { message: 'Then print the pot: 200000', outputIncludes: '200000' },
          { message: 'Keep the plan as comments', codeIncludes: '# 1.' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A plan written in plain words before coding is called... (one word)',
        answers: ['pseudocode', 'pseudo code'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Small enough to code, or break it down more?',
        groups: ['Small enough', 'Break it down'],
        items: [
          { text: 'Print the title', group: 0 },
          { text: 'Run the whole ajo', group: 1 },
          { text: 'Multiply members by the share', group: 0 },
          { text: 'Fix all the money problems', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: "I stared at an empty editor for 20 minutes. I didn't know where to start.",
        prompt: "What's Arjun's best advice?",
        options: [
          { text: 'Just type anything and hope.', why: 'A plan makes the first line obvious.' },
          { text: 'Write the plan in comments first, in plain words. Then turn one comment at a time into code.' },
          { text: 'Programmers always know where to start.', why: 'They don\'t. They plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Plan and code: a two-line goodbye',
        starter: '# Plan: (write two steps as comments)\n',
        solution: '# 1. Thank everyone\nprint("Thanks for paying in!")\n# 2. Say when the next pay day is\nprint("Next pay day: the 25th")\n',
        hint: 'Write two comment steps, then a print( ) under each. Mention the 25th in the second one.',
        checks: [
          { message: 'Print a thank-you line', outputIncludes: 'thank' },
          { message: 'Print a line mentioning the 25th', outputIncludes: '25th' },
          { message: 'Plan with at least one comment', codeIncludes: '#' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each plan step to its code.',
        pairs: [
          ['# Show the title', 'print("OFFICE AJO")'],
          ['# Work out the pot', 'print(10 * 20000)'],
          ['# Leave a blank line', 'print()'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan step is still too big to code in one line?',
        lines: ['# Print the title', '# Manage all the money forever', '# Print the pot'],
        bug: 1,
        fix: '# Print what each member pays this month',
        explanation: 'If you can\'t picture the one line of code for a step, break it down again.',
      },
      {
        kind: 'mcq',
        prompt: 'Why write the plan as comments?',
        options: [
          { text: 'Comments make code run faster', why: 'Python ignores comments completely.' },
          { text: 'Python reads the plan and writes the code', why: 'You write the code. The plan just guides you.' },
          { text: 'Python ignores them, so the plan can live right next to the code it describes' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Pick a small real problem (splitting a bill, a shopping list). Write the plan for it as 3 or 4 tiny steps.',
    starters: ['The problem:', '1.', '2.', '3.'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Before your next coding exercise, write the plan as comments first. Notice how much faster the code comes.',
  },
  notes: 'Decomposition and pseudocode are standard computational-thinking practices; no claims.',
};

export default lesson;
