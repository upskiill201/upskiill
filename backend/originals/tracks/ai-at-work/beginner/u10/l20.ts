import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 20 — Unit Challenge. The agency deadline. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the agency deadline',
  summary: 'The agency wants data tomorrow, Tolu\'s earlier paste comes to light, and a fake "Carmen" voice note arrives. Every Unit 10 skill, under pressure.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 10 skill in one risky week', 'Prove you can use AI safely, legally and honestly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 10\'s final challenge. The agency deadline week.', replies: ['Let\'s go'] },
        { tey: 'The theme: whose data, which tool, what\'s allowed. Pause before every paste. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Monday. The agency wants shop owners\' details by Tuesday.',
    items: [
      {
        kind: 'tapBuild',
        prompt: 'Monday 9:00. Build Ada\'s first question.',
        tiles: ['Whose', 'data', 'is', 'this?'],
        distractors: ['Whatever'],
      },
      {
        kind: 'mcq',
        prompt: 'Monday 9:10. The owners joined a payments pilot. Can Ada send their details to the agency?',
        options: [
          { text: 'Yes, they\'re our customers', why: 'New purpose.' },
          { text: 'Not without checking they agreed to marketing, and asking the data protection contact' },
          { text: 'Yes, if the agency is careful', why: 'Purpose first.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Monday 9:30. Which AI request is safe?',
        options: [
          { text: 'Here\'s the list with phones; tidy it.', why: 'Personal data.' },
          { text: 'Draft a short, friendly opt-in text asking pilot shop owners if they\'d like marketing updates from our partner.' },
          { text: 'Write a message saying they already agreed.', why: 'Dishonest.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Monday 10:00. Never paste, or fine?',
        groups: ['Never paste', 'Fine'],
        items: [
          { text: 'Owner ID numbers', group: 0 },
          { text: 'A public article', group: 1 },
          { text: 'The bank API key', group: 0 },
          { text: 'A formula question', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Monday 11:00. Can I send you the confidential campaign budget to run through your AI?',
        prompt: 'Their contract bans AI on client data. Best reply?',
        options: [
          { text: 'Sure.', why: 'Breaks the client rule.' },
          { text: 'Only part of it.', why: 'Still breaks it.' },
          { text: 'Your contract says no AI on your data, so I won\'t. I\'m happy to review it with you on a call instead.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tuesday 9:00. Which log line must be redacted before asking AI?',
        lines: ['Error 401', 'Endpoint /settle', 'key=sk_live_Q8z7Lm2', 'Time 09:02'],
        bug: 2,
        fix: 'key=[REDACTED]',
        explanation: 'Secrets never go in.',
      },
      {
        kind: 'orderLines',
        prompt: 'Tuesday 10:00. Tolu admits an earlier paste. Order Ada\'s response.',
        lines: ['Thank Tolu', 'Tell Tobi', 'Tell the data protection contact', 'Gather the facts', 'Follow their advice'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tuesday. Serious breaches often must be reported within how many hours?',
        answers: ['72'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Tuesday 3pm. I got a voice note from "Carmen" asking me to send the agency\'s bank details right now. Sounds exactly like her.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Call Carmen on her usual number before doing anything, and tell IT. Voices can be cloned.' },
          { text: 'Send them, it\'s her voice.', why: 'Voices can be faked.' },
          { text: 'Reply to the voice note.', why: 'Use a known channel.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Wednesday. Match the scam sign to why it\'s used.',
        pairs: [
          ['Urgency', 'Stops you thinking'],
          ['Secrecy', 'Stops you checking'],
          ['Gift cards', 'Hard to trace'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Wednesday. Order Ada\'s settings check.',
        lines: ['Training', 'History', 'Memory', 'Connected apps', 'Account security'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Thursday. The team wants a new note-taking AI. Which IT request?',
        options: [
          { text: 'Is this OK?', why: 'Vague.' },
          { text: 'Can we use [tool] for internal meetings only? Is data used for training, where is it stored and for how long, is there a business plan, who has access?' },
          { text: 'We\'ve started using it.', why: 'Ask first.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Thursday. Which step in sending the new fee notice is wrong?',
        lines: ['AI drafts the notice', 'Ada checks the figures', 'Send to all shops at once', 'Keep a record'],
        bug: 2,
        fix: 'Compliance reviews it first.',
        explanation: 'Regulated customer messages need review.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Friday. Legal asks: did you use AI on our campaign work?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No.', why: 'Never pretend.' },
          { text: 'Why?', why: 'Answer plainly.' },
          { text: 'Yes, for drafts and summaries in our approved tool, with no client data entered. I checked every figure.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Friday. Complete Ada\'s week in one rule.',
        template: 'Pause before every [[1]]: whose data, which [[2]], what\'s allowed.',
        blanks: [['paste'], ['tool']],
        distractors: ['lunch', 'colour'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Month 9. Your team keeps asking for your prompts and checklists. Carmen wants them for our team too. Can you share your "AI playbook"?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Just copy my chat history.', why: 'Next unit: a real playbook.' },
          { text: 'I don\'t have a proper one yet, just notes. Give me a couple of weeks to turn my habits into a playbook people can actually use.' },
          { text: 'No, they\'re secret.', why: 'Sharing helps everyone.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 10?',
        options: [
          { text: 'Pause before you paste: protect people\'s data, follow the rules, verify the unusual, and be honest' },
          { text: 'Never use AI at work', why: 'Use it safely.' },
          { text: 'Paid tools make everything safe', why: 'Still check.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 10! What\'s one safety habit you\'ll keep forever?',
    starters: ['The habit:', 'Because...'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 11: Ada\'s playbook. The team wants her prompts. Time to turn habits into a system.' },
  notes: 'Review of the whole unit. Key and scenarios fictional.',
};

export default lesson;
