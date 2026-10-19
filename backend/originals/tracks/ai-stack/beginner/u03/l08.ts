import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8 — Why models forget the start of long chats. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why long chats forget',
  summary: 'A customer chats with Ask Rao for twenty minutes, then asks "so what size did I say?" Ask Rao has no idea. Kavya thinks it\'s broken. Tey explains that models don\'t remember at all: apps resend the chat, and old parts get trimmed.',
  minutes: 11,
  outcomes: [
    'Know that models don\'t remember between messages',
    'Explain how apps resend the chat history',
    'Trim a history to fit a token budget',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A model has no memory. Every time the customer sends a message, the app sends the WHOLE conversation so far, plus the new message. That\'s how it seems to remember.', replies: ['So long chats get expensive?'] },
        { tey: 'Yes: message 20 resends messages 1 to 19. And eventually the history won\'t fit the window, or the budget. So the app drops the oldest messages.', replies: ['Which is when it forgets the size'] },
        { tey: 'Exactly. The customer said "XL" in message 2, and message 2 was trimmed. The model never saw it again.', replies: ['How do apps avoid that?'] },
        { tey: 'Keep a short summary of key facts (size: XL, order: R-1042) and send that with the recent messages. Small, cheap, and the important bits survive.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Trimming the history',
      caption: 'Keep the newest messages that fit the budget.',
      code: 'history = [120, 90, 80, 60]   # tokens per message, oldest first\nbudget = 200\n\nkept = []\nused = 0\nfor tokens in reversed(history):   # newest first\n    if used + tokens > budget:\n        break\n    kept.append(tokens)\n    used += tokens\nprint("Kept:", len(kept), "messages,", used, "tokens")\n',
      challenge: 'Raise the budget to 300. How many messages are kept?',
    },
  ],
  apply: {
    scenario: 'Long chats.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How does a chat app make a model seem to remember?',
        options: [
          { text: 'It resends the conversation so far with every new message' },
          { text: 'The model stores each customer\'s chat', why: 'Models don\'t keep memory between calls.' },
          { text: 'It doesn\'t', why: 'It does, by resending the history.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the trimming loop with a budget of 300 and print how many messages are kept',
        starter: 'history = [120, 90, 80, 60]\nbudget = 300\nkept = []\nused = 0\n',
        solution: 'history = [120, 90, 80, 60]\nbudget = 300\nkept = []\nused = 0\nfor tokens in reversed(history):\n    if used + tokens > budget:\n        break\n    kept.append(tokens)\n    used += tokens\nprint(len(kept))\n',
        hint: 'Loop over reversed(history); stop when the next one won\'t fit',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Use 230 tokens', expr: 'used == 230' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps long chats, or hurts them?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'A short summary of key facts', group: 0 },
          { text: 'Dropping the message where the size was said', group: 1 },
          { text: 'Keeping recent messages', group: 0 },
          { text: 'Resending 50 old messages every time', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its meaning.',
        pairs: [
          ['History', 'The chat so far, resent each time'],
          ['Trimming', 'Dropping the oldest messages'],
          ['Summary', 'Key facts kept in a few tokens'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Ask Rao forgot the customer\'s size. Is the model broken?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'No: the message with the size was trimmed from the history. We\'ll keep a summary like "size: XL" in every prompt.' },
          { text: 'Yes, get a new model.', why: 'Any model forgets what it isn\'t sent.' },
          { text: 'Customers should repeat themselves.', why: 'Annoying for them. Keep a summary instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(list(reversed([1, 2, 3])))',
        language: 'python',
        options: [
          { text: '[3, 2, 1]' },
          { text: '[1, 2, 3]', why: 'reversed() goes from the end.' },
          { text: '3', why: 'It gives every item, newest first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Newest first.',
        language: 'python',
        template: 'for tokens in [[1]](history):\n    if used + tokens > budget:\n        [[2]]',
        blanks: [['reversed'], ['break']],
        distractors: ['sorted', 'continue'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: [
          'The app resends the history each time.',
          'Long histories cost more tokens.',
          'The model remembers every customer forever.',
          'Old messages can be trimmed to fit.',
        ],
        bug: 2,
        fix: 'The model only sees what\'s sent in each prompt.',
        explanation: 'There is no memory inside the model between calls.',
      },
      {
        kind: 'mcq',
        prompt: 'Message 20 of a chat. Roughly what does the app send?',
        options: [
          { text: 'Messages 1 to 19 (or what\'s left after trimming) plus message 20' },
          { text: 'Only message 20', why: 'Then the model couldn\'t follow the conversation.' },
          { text: 'The help page only', why: 'The chat history goes too.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'history = [120, 90, 80, 60], budget 200, newest first. How many messages are kept?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When you re-read the last few messages of a long group chat before replying, what do you forget from the start? How do people deal with that?',
    starters: ['I forget...', 'People deal with it by...'],
  },
  deepen: {
    title: 'Memory features',
    summary: 'Some apps store facts about users between chats ("memory"). That\'s the app, not the model, saving notes and adding them to future prompts. It raises privacy questions: Chapter 8.',
  },
  notes: 'LLM APIs are stateless: chat apps resend history each turn and trim or summarise when over budget. Trim example: [120, 90, 80, 60], newest first: budget 200 keeps 60 + 80 = 140 (2 messages); budget 300 keeps 60 + 80 + 90 = 230 (3).',
};

export default lesson;
