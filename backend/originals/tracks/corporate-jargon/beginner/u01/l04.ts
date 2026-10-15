import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. Chat with Tey: the first "Translate Brian" — decode a jargon message line by line, then reply. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Translate Brian',
  summary: 'Brian sends Remi his first real task. It is 41 words long and has six pieces of jargon in it. Tey and Remi translate it, one line at a time.',
  minutes: 12,
  outcomes: [
    'Decode a jargon-heavy message one line at a time',
    'Pull out the actual task, the deadline and who it\'s for',
    'Reply in clear, plain words',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Tuesday, 8:47 a.m. Remi's phone buzzes. It's Brian: \"Morning! Quick one. Can you touch base with Felix in IT, get the supplier list in good shape, and ping me a status update by EOD? Low priority, but it's a quick win. Keep me in the loop!\"",
          replies: ['Help.', 'That\'s a lot of words.'],
        },
        {
          tey: "Ha. It looks scary, but there's a trick. Every work message has the same three things hidden inside: the TASK, the DEADLINE and WHO it involves. Let's dig them out. First: \"touch base with Felix in IT\". Guess?",
          replies: ['Play baseball with Felix?', 'Have a quick chat with Felix?'],
        },
        {
          tey: "A quick chat. \"Touch base\" means make brief contact, check in. So: talk to Felix. Next: \"get the supplier list in good shape\". That's almost plain English. Clean up the list. That's the TASK.",
          replies: ['And "ping me a status update"?'],
        },
        {
          tey: "\"Ping\" means send a quick message. A \"status update\" means: where are you with the task? So, send Brian a short message saying how far you got. When? \"By EOD\": by the end of the day.",
          replies: ['Got it. And "keep me in the loop"?'],
        },
        {
          tey: "\"Keep me in the loop\" means keep me informed. Copy me in, tell me what happens. And \"low priority, but a quick win\" tells you how much to worry: not urgent, but easy and useful. So the whole message is...",
          replies: ['Talk to Felix, clean the supplier list, tell Brian how it went before I leave.'],
        },
        {
          tey: "Exactly. Forty-one words, one simple job. That's the translation habit: find the task, the deadline and the people. Everything else is decoration.",
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Same message, two languages',
      before: {
        label: 'Brian',
        text: 'Can you touch base with Felix in IT, get the supplier list in good shape, and ping me a status update by EOD? Low priority, but it\'s a quick win. Keep me in the loop!',
      },
      after: {
        label: 'Plain English',
        text: 'Please talk to Felix in IT and clean up the supplier list. Send me a short update before the end of today. It\'s not urgent, but it\'s easy and useful. Let me know how it goes.',
      },
      notes: [
        '"Touch base with" became "talk to".',
        '"Ping me a status update by EOD" became "send me a short update before the end of today".',
        '"Low priority, but a quick win" became "not urgent, but easy and useful".',
        '"Keep me in the loop" became "let me know how it goes".',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The translation habit: for any confusing message, find three things. The TASK (what), the DEADLINE (when) and the PEOPLE (who).',
    },
  ],
  apply: {
    scenario: 'Tuesday. Brian\'s message is open on Remi\'s screen.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Touch base with Felix." What does Brian want?',
        options: [
          { text: 'Give Felix a high five', why: 'No touching required. It means making brief contact.' },
          { text: 'Have a short chat with Felix' },
          { text: 'Report Felix to his manager', why: 'Touching base is friendly and quick, nothing serious.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the jargon to plain English.',
        pairs: [
          ['Touch base', 'Check in briefly'],
          ['Ping me', 'Send me a quick message'],
          ['Status update', 'Where things are up to'],
          ['Keep me in the loop', 'Keep me informed'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sort the pieces of Brian\'s message.',
        groups: ['The task', 'The deadline', 'The people'],
        items: [
          { text: 'Get the supplier list in good shape', group: 0 },
          { text: 'By EOD', group: 1 },
          { text: 'Felix in IT', group: 2 },
          { text: 'Ping me a status update', group: 0 },
          { text: 'Keep me in the loop', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brian wants the update by EOD. When is that? By the end of the ... (one word)',
        answers: ['day'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Morning! Quick one. Can you touch base with Felix in IT, get the supplier list in good shape, and ping me a status update by EOD?',
        prompt: 'Pick Remi\'s reply.',
        options: [
          { text: 'What?', why: 'Remi can decode this now. A clear reply shows he understood.' },
          { text: 'Touching base. Pinging. Looping. Circling.', why: 'Funny in Remi\'s head. Less funny to his new manager.' },
          { text: 'Morning! On it. I\'ll talk to Felix this morning and send you an update before 5.' },
        ],
        answer: 2,
        explanation: 'A great reply repeats the task and the deadline in plain words, so Brian knows Remi understood.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the translation habit.',
        template: 'Find the [[1]], the [[2]] and the [[3]]. Everything else is decoration.',
        blanks: [['task'], ['deadline'], ['people']],
        distractors: ['jargon', 'fruit'],
      },
      {
        kind: 'mcq',
        prompt: '"Low priority, but it\'s a quick win." How should Remi plan his day?',
        options: [
          { text: 'Do it today, but it can wait behind anything urgent' },
          { text: 'Drop everything and do it first', why: '"Low priority" means it\'s not urgent.' },
          { text: 'Ignore it; low priority means optional', why: 'Low priority still means do it, just not before urgent work. And Brian wants an update today.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi writes his translation. Which line is wrong?',
        lines: [
          'Task: talk to Felix and clean up the supplier list.',
          'Deadline: by the end of the week.',
          'Update: send Brian a short message saying how it went.',
        ],
        bug: 1,
        fix: 'Deadline: by the end of today (EOD).',
        explanation: 'EOD is end of DAY. End of week has its own letters: EOW.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Translate "Keep me in the loop" into plain English.',
        tiles: ['Let', 'me', 'know', 'how', 'it', 'goes.'],
        distractors: ['loop', 'ping'],
      },
      {
        kind: 'mcq',
        prompt: 'At 4:55 p.m., what should Remi send Brian?',
        options: [
          { text: 'Nothing; Brian will ask if he wants it.', why: 'Brian asked for an update by EOD. Silence looks like nothing happened.' },
          { text: '"Hi Brian, talked to Felix and cleaned up the supplier list: 12 old suppliers removed, 3 need checking tomorrow."' },
          { text: '"Pinging you re: touching base on the loop."', why: 'Plain words are clearer. Say what was done and what\'s left.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Find a message you got recently at work, school or in a group chat that was confusing. What was the task, the deadline and who was involved?',
    starters: ['The task was...', 'The deadline was...', 'The people were...'],
  },
  deepen: {
    title: 'Translate your own inbox',
    summary: 'Pick three messages from your inbox or chats. For each one, write one line: task, deadline, people. Notice how much shorter they get.',
  },
  notes:
    '"Touch base" (make brief contact), "ping" (send a short message), "keep someone in the loop" (keep informed), "status update", EOD/EOW — Cambridge, Merriam-Webster.',
};

export default lesson;
