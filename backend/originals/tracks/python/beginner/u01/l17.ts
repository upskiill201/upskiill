import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17 — learning to code with AI, honestly: explain my error, don't write my code. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Learning to code with AI, honestly',
  summary: 'AI can write Python in seconds. If it writes all of yours, you learn nothing. Used the right way, it is the most patient coding tutor you\'ll ever have.',
  minutes: 12,
  outcomes: [
    'Ask AI to explain an error instead of fixing it for you',
    'Use the "try first, ask second" rule',
    'Check AI code before you trust it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The shortcut',
      beats: [
        { speaker: 'narrator', text: "Thursday night. Ada's exercise won't pass. It's late. She opens an AI chat." },
        { speaker: 'narrator', text: 'She could paste the task and ask for the answer. Ten seconds, done, and on to bed.' },
        { speaker: 'arjun', text: "You could. Then next week you'll meet the same problem and still not know how to solve it. That's how people end up able to copy code but not write it." },
        { speaker: 'ada', text: 'So no AI at all?' },
        { speaker: 'arjun', text: 'Use it like a tutor, not a ghostwriter. Paste your code and the error, and ask it to explain what went wrong, without fixing it.' },
        { speaker: 'tey', text: 'Same rule as in our Study Smarter course: you think first, AI second. And here, the run button is the judge. AI code still has to pass.' },
      ],
      choice: {
        prompt: 'What should Ada ask the AI?',
        options: [
          {
            text: '"Here is my code and the error. Explain what the error means and which line causes it. Don\'t give me the fixed code."',
            outcome: 'It explains that her quote never closes. She fixes it herself in ten seconds, and now she knows that error for life.',
            best: true,
          },
          {
            text: '"Write the code for this exercise."',
            outcome: "It works. She can't explain a line of it, and the next exercise is just as hard.",
          },
          {
            text: '"Is my code good?"',
            outcome: 'A vague "looks great, but..." and a rewrite she didn\'t ask for.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'What you would paste',
      caption: "Run this broken code and look at the error. That error, plus the code, is what you'd give an AI to explain.",
      code: 'print("OFFICE AJO")\nprint("Members:" 10)\n',
      challenge: 'Fix it yourself first: what is missing between "Members:" and 10?',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Ada uses AI the honest way.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Ada learn most?',
        options: [
          { text: 'Write my homework code.', why: 'She gets an answer, not the skill.' },
          { text: "Here's my code and the error. Explain what it means and which line causes it. Don't fix it for me." },
          { text: 'Fix this.', why: 'Fixed code without understanding is copying.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the missing comma yourself',
        starter: 'print("Members:" 10)\n',
        solution: 'print("Members:", 10)\n',
        hint: 'Items in print( ) are separated by commas.',
        checks: [{ message: 'Print Members: 10', outputIncludes: 'Members: 10' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the honest-AI routine in order.',
        lines: ['Try the exercise yourself', 'Read the error message', 'Ask the AI to explain the error, not fix it', 'Fix it yourself and run it'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tutor (learning) or ghostwriter (skipping it)?',
        groups: ['Tutor', 'Ghostwriter'],
        items: [
          { text: 'Explain this error message', group: 0 },
          { text: 'Write the whole exercise for me', group: 1 },
          { text: 'Why does / give a decimal?', group: 0 },
          { text: 'Do my homework', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The AI gave me code. Should I just paste it in?',
        prompt: "What's Arjun's best advice?",
        options: [
          { text: 'Yes, AI code is always right.', why: 'AI can be wrong, and pasting teaches you nothing.' },
          { text: 'Read it line by line until you could explain each line. Then type it yourself and run it.' },
          { text: 'Never look at AI code.', why: 'Reading and understanding it is fine. Blind pasting is the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The rule: you try first, AI ... (one word)',
        answers: ['second'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'An AI suggested this code, but it has a bug. Fix it.',
        starter: '# AI: "This prints the pot for 10 members paying 20000"\nprint("Pot:", 10 + 20000)\n',
        solution: '# AI: "This prints the pot for 10 members paying 20000"\nprint("Pot:", 10 * 20000)\n',
        hint: 'A pot is everyone paying in. Should that be + or *?',
        checks: [{ message: 'Print the correct pot: 200000', outputIncludes: 'Pot: 200000' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the Run button "the judge" when you use AI?',
        options: [
          { text: 'Because AI never makes mistakes', why: 'It does make mistakes, which is why you run it.' },
          { text: 'It is not; AI is the judge', why: 'The code\'s real output is what counts.' },
          { text: 'AI can sound sure and still be wrong; running the code shows what it really does' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to what it gets you.',
        pairs: [
          ['Explain this error', 'Understanding'],
          ['Give me a hint', 'A nudge, you still solve it'],
          ['Write the code', 'An answer you can\'t explain'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the honest request.',
        template: "Explain what this error [[1]] and which [[2]] causes it. Don't [[3]] it for me.",
        blanks: [['means'], ['line'], ['fix']],
        distractors: ['hides', 'write'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the exact sentence you will use next time you ask an AI for help with code.',
    starters: ['Next time I will ask:'],
  },
  deepen: {
    title: 'Go further',
    summary: "Teyro's Study Smarter with AI course goes deep on using AI to learn without skipping the learning.",
  },
  notes: 'Missing comma inside print args: "SyntaxError: invalid syntax. Perhaps you forgot a comma?" (3.10+). The Try it live card is expectError.',
};

export default lesson;
