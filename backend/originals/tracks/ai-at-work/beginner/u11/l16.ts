import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 16 — simple automations (no code). */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Simple automations (no code)',
  summary: 'Every Friday, Ada copies the same numbers into the same status prompt. Some of that can run itself. Tap her first automation to see how it works, and where a human stays in.',
  minutes: 12,
  outcomes: [
    'Spot repeat tasks worth automating',
    'Design a simple automation with a human check',
    'Know the limits of automations',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s Friday automation',
      text: 'Trigger: every Friday at 3pm. Step 1: the payments dashboard exports this week\'s numbers. Step 2: an approved AI tool drafts the five-line status update from them. Step 3: the draft lands in Ada\'s inbox. Step 4: Ada checks and sends it.',
      hotspots: [
        { phrase: 'every Friday at 3pm', note: 'A trigger: a time or an event that starts it. No one has to remember.' },
        { phrase: 'exports this week\'s numbers', note: 'The data comes straight from the source, so nothing is retyped wrongly.' },
        { phrase: 'an approved AI tool', note: 'Automations still follow the safety rules from Unit 10.' },
        { phrase: 'lands in Ada\'s inbox', note: 'A draft, not a sent email. The automation prepares; it doesn\'t decide.' },
        { phrase: 'Ada checks and sends it', note: 'The human check stays. Anything going to a client gets a person\'s eyes.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Automate the repetitive parts: a trigger, the data, an AI draft. Keep a human check before anything goes to other people.',
    },
  ],
  apply: {
    scenario: 'Ada automates her Friday status.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the automation.',
        lines: ['Trigger: Friday 3pm', 'Export the numbers', 'AI drafts the update', 'Draft lands in inbox', 'Ada checks and sends'],
      },
      {
        kind: 'mcq',
        prompt: 'What is a trigger?',
        options: [
          { text: 'A type of AI', why: 'It starts the steps.' },
          { text: 'The time or event that starts the automation' },
          { text: 'The final email', why: 'It\'s the start.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good to automate, or keep manual?',
        groups: ['Automate', 'Keep manual'],
        items: [
          { text: 'Pulling weekly numbers into a draft', group: 0 },
          { text: 'Deciding what to offer an angry client', group: 1 },
          { text: 'Sorting incoming support emails by topic', group: 0 },
          { text: 'Condolences to a colleague', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Could the automation just send the status update to me directly?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Sure, no need to check.', why: 'Keep the human check.' },
          { text: 'Automations can\'t send emails.', why: 'They can; a check is safer.' },
          { text: 'I\'d rather keep a quick check: it drafts, I read and send. Two minutes, and nothing wrong reaches you.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Automate the [[1]] parts. Keep a [[2]] check.',
        blanks: [['repetitive'], ['human']],
        distractors: ['important', 'robot'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Tolu\'s automation is risky?',
        lines: [
          'Trigger: new support email arrives',
          'AI sorts it by topic',
          'AI sends the customer a refund decision automatically',
          'Tolu reviews refund requests daily',
        ],
        bug: 2,
        fix: 'AI drafts a reply; Tolu decides refunds.',
        explanation: 'Decisions about customers need a person.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the automation part to its job.',
        pairs: [
          ['Trigger', 'Starts it'],
          ['Data step', 'Gets the real numbers'],
          ['AI step', 'Drafts the text'],
          ['Human check', 'Catches mistakes before sending'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why pull numbers straight from the dashboard?',
        options: [
          { text: 'No retyping, so fewer mistakes' },
          { text: 'It looks techy', why: 'Accuracy.' },
          { text: 'No reason', why: 'Fewer errors.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the automation\'s rule.',
        tiles: ['It', 'drafts;', 'Ada', 'decides'],
        distractors: ['sends'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time does Ada\'s automation run on Fridays? (e.g. 2pm)',
        answers: ['3pm', '3 pm', '15:00', '3'],
        placeholder: 'A time',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe automation design, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'Draft lands in inbox for review', group: 0 },
          { text: 'Customer data sent to an unapproved tool', group: 1 },
          { text: 'Approved tool only', group: 0 },
          { text: 'Auto-sends to clients unread', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do if the automation breaks?',
        options: [
          { text: 'Nothing; it runs itself', why: 'Automations break.' },
          { text: 'Delete all automations', why: 'Fix that one.' },
          { text: 'Notice it (because she checks drafts) and fix or pause it' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which repeat task of yours could have a trigger, data step and AI draft? Where would your check go?',
    starters: ['The task:', 'My check:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask IT which automation tools your company approves, and list one task you\'d automate.' },
  notes: 'Many email, spreadsheet and workflow tools offer no-code automations; availability depends on approved tools.',
};

export default lesson;
