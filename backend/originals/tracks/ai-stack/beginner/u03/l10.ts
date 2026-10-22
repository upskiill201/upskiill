import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: parameters, context window, history, temperature. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: size, window, temperature',
  summary: 'The team knows what "7B" means, why a prompt must fit the window, why long chats forget, and how to keep answers steady. Quick check before they set the model\'s instructions.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Check fit and trim history without notes', 'Choose a temperature for facts'],
  learn: [
    {
      kind: 'story',
      title: 'Settings',
      beats: [
        { speaker: 'narrator', text: 'Ask Rao\'s settings so far: model-b, temperature 0, the relevant help-page lines, the last few messages, and a short summary of key facts.' },
        { speaker: 'joel', text: 'Every setting has a reason now. That feels different.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the model\'s settings.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print True if a 200-token prompt plus a 150-token reply fits a 300-token window',
        starter: 'prompt_tokens = 200\nreply_tokens = 150\nwindow = 300\n',
        solution: 'prompt_tokens = 200\nreply_tokens = 150\nwindow = 300\nprint(prompt_tokens + reply_tokens <= window)\n',
        hint: 'prompt_tokens + reply_tokens <= window',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a long chat forget what the customer said at the start?',
        options: [
          { text: 'The model got tired', why: 'It only sees what\'s sent.' },
          { text: 'The oldest messages were trimmed to fit the budget, so the model never saw them again' },
          { text: 'The model deletes them', why: 'The app decides what to resend.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Keep the newest messages that fit a 150-token budget, and print how many are kept',
        starter: 'history = [70, 40, 90, 50]\nbudget = 150\nkept = []\nused = 0\n',
        solution: 'history = [70, 40, 90, 50]\nbudget = 150\nkept = []\nused = 0\nfor tokens in reversed(history):\n    if used + tokens > budget:\n        break\n    kept.append(tokens)\n    used += tokens\nprint(len(kept))\n',
        hint: 'Newest first with reversed(); stop when the next won\'t fit',
        checks: [{ message: 'Print 2', outputEquals: '2' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to its reason.',
        pairs: [
          ['temperature 0', 'The same right answer every time'],
          ['Relevant lines only', 'Fewer tokens, less confusion'],
          ['A summary of key facts', 'Survives trimming'],
          ['A smaller model', 'Cheaper and faster for simple jobs'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'The reply uses the context window too', group: 0 },
          { text: 'Models remember chats by themselves', group: 1 },
          { text: '"7B" means about 7 billion parameters', group: 0 },
          { text: 'Higher temperature makes facts steadier', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        language: 'python',
        lines: ['name = "70B"', 'billions = int(name)', 'print(billions * 1_000_000_000)'],
        bug: 1,
        fix: 'billions = int(name[:-1])',
        explanation: 'int("70B") fails: remove the B first.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Why not just use the biggest window and send everything?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, always fill it.', why: 'Fitting isn\'t free or helpful.' },
          { text: 'Windows are too small for anything.', why: 'Big ones hold a lot; the issue is cost and focus.' },
          { text: 'Every token costs money and time, and the right fact gets lost among the rest. Send what\'s relevant.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'From name to parameters.',
        language: 'python',
        template: 'billions = int(name[[[1]]])\nparameters = billions * [[2]]',
        blanks: [[':-1'], ['1_000_000_000', '1000000000']],
        distractors: ['-1:', '1000'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import PracticeModel\nm = PracticeModel()\nprint(m.reply("hello", temperature=1.0, seed=1))',
        language: 'python',
        options: [
          { text: 'Hello! What can I help you find?' },
          { text: 'Namaste! How can I help you today?', why: 'That\'s seed 2, or temperature 0.' },
          { text: 'hello', why: 'It prints the reply, not the question.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what the app sends for message 20.',
        lines: ['The system instructions', 'A short summary of key facts', 'The relevant help-page lines', 'The most recent messages', 'The new message'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which setting controls how random the next-token choice is?',
        answers: ['temperature'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Joel says every setting now has a reason. Which setting would you most want to test before launch, and how?',
    starters: ['I\'d test...', 'By...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 6-9. 200 + 150 > 300 -> False. Trim [70, 40, 90, 50] budget 150 newest first: 50 + 90 = 140, + 40 = 180 > 150 -> 2 kept. Practice model temp 1.0 seed 1 hello -> "Hello! What can I help you find?".',
};

export default lesson;
