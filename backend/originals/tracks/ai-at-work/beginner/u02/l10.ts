import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 10 — Checkpoint 2. Reviews emails that get replies, threads, saying no, chat. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: emails, threads, no, and chat',
  summary: 'Asks that get answered, threads you can escape, a kind no, and chat people love.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can write messages that get replies', 'Show you can say no and use chat well'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint two of Unit 2. This one is all about other people: getting replies, answering well, and saying no.', replies: ['Bring it'] },
        { tey: 'Warm-up: where does the ask go in an email?', replies: ['First line', 'At the end'] },
        { tey: 'First line. Bottom line up front. You know this. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the day before launch.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Strong subject line, or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Can you join Thu 2pm? Launch review', group: 0 },
          { text: 'Update', group: 1 },
          { text: 'Approval needed by Wed: banner', group: 0 },
          { text: 'Quick question', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "bottom line up front" mean?',
        options: [{ text: 'Put the main point or ask first' }, { text: 'Put the signature at the top', why: 'No: the point goes first.' }, { text: 'Write the budget first', why: 'Not about budgets.' }],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five parts of a good no.',
        lines: ['Appreciation', 'A clear no', 'A short, true reason', 'An alternative', 'A warm close'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Three questions: can you attend Friday's call, is the banner on track, and who's the contact for the launch day?",
        prompt: 'Which reply is best?',
        options: [
          { text: '1. Yes, Friday works. 2. Banner is on track for Monday. 3. Grace is your contact on launch day.' },
          { text: 'All good!', why: 'Three questions, no answers.' },
          { text: 'Yes!', why: 'Yes to which one?' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the thread question Ada asks the AI.',
        tiles: ['What', 'is', 'being', 'asked', 'of', 'me?'],
        distractors: ['everyone'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of no to its example.',
        pairs: [
          ['No, but', '"Not the banner, but here\'s a template"'],
          ['Not now', '"Not this week; next week works"'],
          ['Yes, if', '"Yes, if launch email moves to Monday"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that buries the ask.',
        lines: [
          'Subject: Catching up',
          'Hi Lucía, hope your week is going well!',
          'Lots happened: sign-up done, testing Friday, Grace joined...',
          '...and could you approve the banner by Wednesday?',
        ],
        bug: 0,
        fix: 'Subject: Approval needed by Wed: banner',
        explanation: 'The subject gives no reason to open it. Move the ask into the subject and first line.',
      },
      {
        kind: 'typeAnswer',
        prompt: '"Maybe" is usually heard as ... (one word)',
        answers: ['yes'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Reply, or reply-all?',
        groups: ['Reply', 'Reply-all'],
        items: [
          { text: '"Thanks!"', group: 0 },
          { text: 'The new launch time everyone needs', group: 1 },
          { text: 'An answer only Lucía asked for', group: 0 },
          { text: 'Fixing a wrong date everyone saw', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the AI write an email that gets a fast reply?',
        options: [
          { text: 'Email IT about the laptop.', why: 'No ask, no date, no reason.' },
          {
            text: "Email IT: subject with the ask and date. First line: can Grace's laptop be ready by Friday? Reason: she starts Monday. Yes/no answerable.",
          },
          { text: 'Write IT a long email explaining everything.', why: 'Buries the ask.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'hi',
        prompt: 'Best reply to a bare "hi"?',
        options: [
          { text: 'Hi Lucía! What can I help with?' },
          { text: '(say nothing until she asks)', why: 'Keeps you both waiting.' },
          { text: 'hi', why: 'Now you are both waiting.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the email recipe.',
        template: 'Subject states the [[1]]. Ask in the first [[2]]. Deadline with a [[3]].',
        blanks: [['ask'], ['line'], ['reason']],
        distractors: ['weather', 'page', 'joke'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the chat habit to the fix.',
        pairs: [
          ['Bare "hi"', 'Greeting plus the ask'],
          ['Five messages in a row', 'One complete message'],
          ['11pm request', 'Schedule send'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear no, or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: "We can't do it by Friday.", group: 0 },
          { text: "We'll try our best!", group: 1 },
          { text: 'Not this week; Monday works.', group: 0 },
          { text: 'Possibly, maybe, we will see.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Could your team also make 10 social posts for launch day? Tomorrow?',
        prompt: "Ada's team can do 3 by tomorrow. Which reply?",
        options: [
          { text: "Thanks for asking! 10 isn't possible by tomorrow, but we can do the 3 most important ones. Which 3 matter most?" },
          { text: "So sorry, so sorry, we're too busy, sorry!", why: 'Over-apology, and no alternative.' },
          { text: 'Sure, all 10!', why: 'A yes they cannot deliver.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a long thread, read the ... message first (one word)',
        answers: ['latest', 'last', 'newest'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the over-apology.',
        lines: ['Thanks for thinking of us!', "I'm so incredibly sorry, I feel terrible, forgive me.", "We can't do Friday because of the launch.", 'Next week works?'],
        bug: 1,
      },
      {
        kind: 'mcq',
        prompt: 'The AI thread summary said nothing was asked of Ada, but Lucía asked in message 14. What is the lesson?',
        options: [
          { text: 'Check summaries against the thread; passing questions get missed' },
          { text: 'Never use summaries', why: 'They help. Just check them.' },
          { text: 'Ignore message 14', why: 'It had a real question.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a good chat message.',
        tiles: ['Hi', 'Grace!', 'Final', 'logo', 'file?', 'No', 'rush'],
        distractors: ['URGENT'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order an email that gets a reply.',
        lines: ['Subject with the ask', 'The ask in the first line', 'The reason', 'An easy way out', 'Thanks'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Make the reply small, like a yes or ... question (one word)',
        answers: ['no'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Emails that get replies', 'Ask first, easy to answer'],
          ['Long threads', 'What is asked of me?'],
          ['Saying no', 'Clear, kind, an alternative'],
          ['Chat apps', 'One complete message'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'One email, one ask works best', group: 0 },
          { text: 'ASAP is a strong deadline', group: 1 },
          { text: 'A clear no can build trust', group: 0 },
          { text: 'Chat does not need clear writing', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request writes the best "no"?',
        options: [
          { text: 'Say no.', why: 'No reason or alternative.' },
          { text: "Say no to Grace's portfolio review today. Reason: launch day. Offer: Thursday 3pm. Friendly, 3 lines." },
          { text: 'Say yes but make it sound like no.', why: 'Confusing for everyone.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "It's 3am here and your team just pinged me again!",
        prompt: 'What should Ada say?',
        options: [
          { text: "Sorry about that! We'll schedule messages for your working hours." },
          { text: 'Turn off notifications.', why: 'Puts the fix on her.' },
          { text: 'It was urgent.', why: 'It was not; and scheduling fixes it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the thread request.',
        template: 'What is [[1]] of me? What has been [[2]]? What is still [[3]]?',
        blanks: [['asked'], ['decided'], ['open']],
        distractors: ['eaten', 'closed'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four skills would make the biggest difference to how people respond to you?',
    starters: ['The skill is...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Write one email this week using every habit from Lesson 6.' },
  notes: 'Review only. No new claims.',
};

export default lesson;
