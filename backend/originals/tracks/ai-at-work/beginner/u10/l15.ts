import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 15 — Checkpoint 3. Scams, deepfakes, settings, IT questions. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: scams, settings and IT',
  summary: 'AI scams, fake messages, safe settings and the right questions for IT. Show you can protect yourself and your team.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can spot AI scams and fakes', 'Show you can set up and approve tools safely'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. A voice note, a new tool, and a settings check.', replies: ['Ready'] },
        { tey: 'Warm-up: an urgent money request that sounds exactly like Tobi?', replies: ['Call him on his known number'] },
        { tey: 'Second channel, always. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: staying safe.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Warning sign, or no longer reliable?',
        groups: ['Warning sign', 'Not reliable anymore'],
        items: [
          { text: 'Urgency and secrecy', group: 0 },
          { text: 'Bad spelling', group: 1 },
          { text: '"New number, can\'t talk"', group: 0 },
          { text: '"It sounded just like her"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did the Arup deepfake case involve?',
        options: [
          { text: 'A fake video call that led to about US$25 million being paid' },
          { text: 'A typo in an email', why: 'A deepfake call.' },
          { text: 'A stolen laptop', why: 'A deepfake call.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which verification step is wrong?',
        lines: ['Pause', 'Don\'t reply to the message', 'Call the number in the message', 'Call the known number'],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Scammers control that number.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '"Carmen" just voice-noted me for the agency\'s bank details. Sounds just like her.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Call Carmen on her usual number first. Voices can be cloned.' },
          { text: 'Send them.', why: 'Verify first.' },
          { text: 'Reply to the note.', why: 'Use a known channel.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the settings check.',
        lines: ['Training', 'History', 'Memory', 'Connected apps', 'Account security'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safer or riskier setting?',
        groups: ['Safer', 'Riskier'],
        items: [
          { text: 'Training on chats off', group: 0 },
          { text: 'Unused access to all email', group: 1 },
          { text: 'Two-step login on', group: 0 },
          { text: 'A password saved in memory', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which IT request is best?',
        options: [
          { text: 'Is this tool OK?', why: 'Vague.' },
          { text: 'Can we use [tool] for internal meetings? No customer data. Is data used for training, where is it stored, is there a business plan, who has access?' },
          { text: 'FYI, we started using it.', why: 'Ask first.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the scam sign to why it\'s used.',
        pairs: [
          ['New number', 'Avoids your saved contact'],
          ['Gift cards', 'Hard to trace'],
          ['Secrecy', 'Stops you checking'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Verify on a [[1]] channel. Recheck settings after [[2]].',
        blanks: [['second', 'known'], ['updates']],
        distractors: ['new', 'lunch'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the scam rule.',
        tiles: ['Stop,', 'verify,', 'report'],
        distractors: ['pay'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions should Ada ask IT about a new tool?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask IT first, or fine to try?',
        groups: ['Ask first', 'Fine'],
        items: [
          { text: 'Recording client calls', group: 0 },
          { text: 'A general question, no data', group: 1 },
          { text: 'Connecting to the company drive', group: 0 },
          { text: 'Using an already-approved tool', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why report a fake message even if you didn\'t fall for it?',
        options: [
          { text: 'IT can warn others who got the same message' },
          { text: 'For credit', why: 'To protect others.' },
          { text: 'No need', why: 'Others may fall for it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which setting needs fixing?',
        lines: ['Training: off', 'Temporary chat for sensitive questions', 'Memory: client ID numbers saved', 'Two-step login: on'],
        bug: 2,
        fix: 'Delete those memories.',
        explanation: 'Personal data shouldn\'t sit in AI memory.',
      },
    ],
  },
  reflect: {
    prompt: 'Which of these protections will you set up this week?',
    starters: ['This week I\'ll...', 'Because...'],
  },
  notes: 'Checkpoint for Unit 10 lessons 11-14.',
};

export default lesson;
