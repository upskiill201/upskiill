import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19 — The hosting decision, and the one line for Mr Rao. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The hosting decision',
  summary: 'Arjun asks for the decision in writing: where Ask Rao runs, why, what it costs and how fast it is. Then, as always, one line for Mr Rao.',
  minutes: 12,
  outcomes: [
    'Write a hosting decision with its reasons and numbers',
    'Turn it into one line for a busy client',
    'Build the line from variables in Python',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The decision',
      beats: [
        { speaker: 'joel', text: 'Decision: a model API, paid per answer. Reasons: about 30,000 chats a month, no rule that data must stay inside, and nobody to look after servers.' },
        { speaker: 'joel', text: 'Numbers: about $5 a month in practice prices; about half a second per 60-token reply on model-b. Backup: a second model on another provider. Local 4-bit model for experiments.' },
        { speaker: 'arjun', text: 'And when do we look at this again?' },
        { speaker: 'kavya', text: 'If chats pass a million a month, or if Mr Rao says data must stay in-house.' },
        { speaker: 'arjun', text: 'Perfect. Now the line for Mr Rao.' },
        { speaker: 'narrator', text: 'Joel\'s line: "Ask Rao will run on a rented AI service: about $5 a month at today\'s chat volume, replies in about a second."' },
      ],
      choice: {
        prompt: 'What makes Joel\'s decision note good?',
        options: [
          { text: 'It says what, why, how much, how fast, the backup, and when to decide again.', outcome: 'Anyone can check it, and everyone knows when it might change.', best: true },
          { text: 'It uses the newest technology.', outcome: 'New isn\'t a reason. The reasons and the numbers are what make it good.' },
          { text: 'It\'s long.', outcome: 'It\'s short. What matters is that every claim has a number behind it.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The line for Mr Rao',
      caption: 'Facts in variables, one sentence out.',
      code: 'monthly = 5.40\nreply_seconds = 0.5\n\nprint(f"Ask Rao will run on a rented AI service: about ${monthly:.0f} a month, replies in under {reply_seconds + 0.5:.0f} second.")\n',
      challenge: 'Rewrite it for 100,000 chats a month.',
    },
  ],
  apply: {
    scenario: 'Writing the decision.',
    items: [
      {
        kind: 'writeCode',
        prompt: '30,000 chats a month at $0.00018 each. Print "About $5 a month" using a whole-number format',
        starter: 'chats = 30000\nper_chat = 0.00018\n',
        solution: 'chats = 30000\nper_chat = 0.00018\nprint(f"About ${chats * per_chat:.0f} a month")\n',
        hint: 'f"About ${chats * per_chat:.0f} a month"',
        checks: [{ message: 'Print About $5 a month', outputEquals: 'About $5 a month' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the parts of Joel\'s decision note.',
        lines: ['The decision', 'The reasons', 'The numbers', 'The backup', 'When to decide again'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write down when to decide again?',
        options: [
          { text: 'To look busy', why: 'It\'s a real trigger for a real change.' },
          { text: 'The right choice changes with volume, prices and rules, so the team knows when to revisit' },
          { text: 'Decisions never change', why: 'They do, as traffic and prices change.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in Mr Rao\'s line, or in the team\'s note?',
        groups: ['Mr Rao\'s line', 'Team note'],
        items: [
          { text: 'About $5 a month', group: 0 },
          { text: 'The backup provider\'s name', group: 1 },
          { text: 'Replies in about a second', group: 0 },
          { text: 'Revisit at a million chats', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Mr Rao will ask: "Why not our own computer, like Kavya said?"',
        prompt: "Joel's best reply?",
        options: [
          { text: '"Because Kavya was wrong."', why: 'Blame doesn\'t help. Share what the test showed.' },
          { text: '"Computers are bad."', why: 'Give the real reasons and numbers.' },
          { text: '"We tried it: too slow for customers and it can\'t read the help page. Renting a service costs about $5 a month."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The decision in one line.',
        template: 'A model [[1]], paid per [[2]], with a backup ready.',
        blanks: [['API', 'service'], ['answer']],
        distractors: ['laptop', 'hour'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'monthly = 5.4\nprint(f"${monthly:.0f}")',
        language: 'python',
        options: [
          { text: '$5' },
          { text: '$5.4', why: ':.0f rounds to a whole number.' },
          { text: '$6', why: '5.4 rounds down to 5.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in the decision note has no evidence behind it?',
        lines: [
          'About 30,000 chats a month (from the shop\'s inbox).',
          'About $5 a month at practice prices.',
          'It will never go down.',
          'Replies in about half a second for 60 tokens.',
        ],
        bug: 2,
        fix: 'If it goes down, we switch to the backup model.',
        explanation: 'Every service has outages. Plan for them instead of promising.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print True if chats have passed the review trigger of 1,000,000 a month, otherwise False',
        starter: 'chats_per_month = 30000\ntrigger = 1_000_000\n',
        solution: 'chats_per_month = 30000\ntrigger = 1_000_000\nprint(chats_per_month > trigger)\n',
        hint: 'chats_per_month > trigger',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At how many chats a month will the team look at the decision again? (a number)',
        answers: ['1000000', '1,000,000', 'a million', 'one million', '1 million'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write a two-line decision note for something you decided recently: what, why, and when you\'d decide again.',
    starters: ['I decided...', 'I\'d look again if...'],
  },
  deepen: {
    title: 'Decision records',
    summary: 'Software teams keep short "decision records" like Joel\'s note. Months later, when someone asks "why did we do this?", the answer is written down, with the numbers.',
  },
  notes: '30,000 x 0.00018 = 5.4 -> "$5". 60 tokens / 120 tok/s = 0.5 s (model-b practice). Decision triggers are the team\'s own choice in the story.',
};

export default lesson;
