import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 9 — AI agents: what they can and can't do. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'AI agents: what they can and can\'t do',
  summary: 'One tool pitched to Carmen is an "AI agent" that can book, buy and send things on its own. Ada works out where agents help, and where a human must stay in charge.',
  minutes: 13,
  outcomes: [
    'Know what an AI agent is',
    'Know where agents help and where they\'re risky',
    'Keep human approval for actions that matter',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'A chat assistant vs an agent',
      before: {
        label: 'Chat assistant',
        text: 'Ada asks: "Draft an email inviting shops to the launch." It writes a draft. Ada reads it, edits it, and sends it herself.',
      },
      after: {
        label: 'AI agent',
        text: 'Ada asks: "Invite the 20 shops to the launch." The agent finds the list, writes the email, and sends it to all 20, possibly in one go, without Ada seeing it first.',
      },
      notes: [
        'An agent takes actions: browsing, filling forms, sending, booking, buying.',
        'That saves steps, but a mistake also goes out for real, at scale.',
        'Keep "approve before acting" on for anything that sends, spends, deletes or reaches customers.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Agents act, not just draft. Give them only the access they need, and require your approval before they send, spend, delete or contact anyone.',
    },
  ],
  apply: {
    scenario: 'Ada evaluates the "AI agent" pitch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes an AI agent different from a chat assistant?',
        options: [
          { text: 'It can take actions, like sending, booking or filling forms' },
          { text: 'It writes better', why: 'It acts.' },
          { text: 'It\'s always free', why: 'It acts.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine for an agent alone, or needs your approval?',
        groups: ['Agent alone', 'Needs approval'],
        items: [
          { text: 'Research three venues and list prices', group: 0 },
          { text: 'Pay a venue deposit', group: 1 },
          { text: 'Draft invitations', group: 0 },
          { text: 'Email 20 shops', group: 1 },
          { text: 'Delete old files', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The agent tool says it can run our whole campaign by itself. Exciting?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Let it run everything.', why: 'Mistakes go out for real.' },
          { text: 'Agents are useless.', why: 'They help with steps.' },
          { text: 'Useful for research and drafts. But anything that spends money or messages customers should wait for our approval.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: 'Agents [[1]], not just draft. Require approval before they send, [[2]] or delete.',
        blanks: [['act'], ['spend']],
        distractors: ['sleep', 'smile'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the agent risk to the safeguard.',
        pairs: [
          ['Sends wrong emails', 'Approve before sending'],
          ['Too much access', 'Only the access it needs'],
          ['Spends money', 'Approval for payments'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which agent setting is risky?',
        lines: [
          'Access: the launch folder only',
          'Approval required before sending emails',
          'Access to the company bank account, no approval needed',
          'Log of every action',
        ],
        bug: 2,
        fix: 'No bank access, or approval required for every payment.',
        explanation: 'Money actions need a human.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which agent instruction is safest?',
        options: [
          { text: 'Handle the launch invites.', why: 'Too open.' },
          { text: 'Find the 20 pilot shops in this sheet, draft an invite to each, and show me all drafts before sending anything.' },
          { text: 'Do whatever it takes.', why: 'No limits.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s agent rule.',
        tiles: ['Show', 'me', 'before', 'you', 'send'],
        distractors: ['after'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shops would the agent email at once?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good agent design, or risky?',
        groups: ['Good', 'Risky'],
        items: [
          { text: 'A log of every action', group: 0 },
          { text: 'Full access to everything', group: 1 },
          { text: 'Approval before customer contact', group: 0 },
          { text: 'Runs overnight with no checks', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a safe agent task.',
        lines: ['Give a clear, limited task', 'Give only needed access', 'Agent prepares drafts', 'You approve', 'Agent acts'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a mistake by an agent worse than by a chat tool?',
        options: [
          { text: 'Agents make more mistakes', why: 'It\'s about consequences.' },
          { text: 'It can go out for real, at scale, before anyone checks' },
          { text: 'It isn\'t worse', why: 'Actions are real.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which task could an agent help you with? What would you require approval for?',
    starters: ['The task:', 'I\'d approve:'],
  },
  deepen: { title: 'Try it today', summary: 'If you try an agent, start with a research-only task and approval required for every action.' },
  notes: 'Agent capabilities vary by product. Principle of least privilege and human-in-the-loop approval are standard safety practice.',
};

export default lesson;
