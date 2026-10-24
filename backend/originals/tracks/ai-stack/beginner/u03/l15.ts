import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: system prompts, hallucination, languages, images. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: rules, truth, languages',
  summary: 'Ask Rao now has a system prompt, three defences against made-up answers, a plan for Hindi customers and a careful idea for photos. Quick check before the made-up return policy gets its full post-mortem.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Set rules and stop made-up answers without notes', 'Count tokens across languages and images'],
  learn: [
    {
      kind: 'story',
      title: 'The new system prompt',
      beats: [
        { speaker: 'narrator', text: 'Ask Rao\'s system prompt, four lines: who it is, answer only from the shop information, say you don\'t know when it isn\'t there, keep it short.' },
        { speaker: 'arjun', text: 'Short, specific, no secrets. Ship it to the test version.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: rules and truth.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "What is your return policy?" with the help page as context, and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\npolicies = open("rao_policies.md").read()\nprint(m.reply("What is your return policy?", context=policies))\n',
        hint: 'context=policies',
        checks: [{ message: 'Print the 7-day policy', outputIncludes: '7 days' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the role to its message.',
        pairs: [
          ['system', '"You are Ask Rao. Answer only from the shop information."'],
          ['user', '"Is delivery free?"'],
          ['assistant', '"Delivery is free on orders over ₹999."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which set-up best prevents made-up answers?',
        options: [
          { text: 'A bigger model alone', why: 'Big models make things up too.' },
          { text: 'Facts in the prompt, an honest instruction, and testing' },
          { text: 'A higher temperature', why: 'That makes answers vary more, not less.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the practice token count of "Delivery free hai kya?"',
        starter: 'from teyro_ai import count_tokens\n',
        solution: 'from teyro_ai import count_tokens\nprint(count_tokens("Delivery free hai kya?"))\n',
        hint: 'count_tokens("...")',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good system-prompt content, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'Answer only from the shop information', group: 0 },
          { text: 'The staff discount code', group: 1 },
          { text: 'Say you don\'t know when it\'s missing', group: 0 },
          { text: '2,000 words about the company history', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        language: 'python',
        lines: ['width, height = 512, 512', 'patch = 32', 'print(width // patch + height // patch)'],
        bug: 2,
        fix: 'print((width // patch) * (height // patch))',
        explanation: 'A grid of 16 by 16 is 16 x 16 = 256 patches, not 16 + 16.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'A customer sent a photo and asked for a refund. Can Ask Rao approve it?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, approve everything.', why: 'Money decisions need a person.' },
          { text: 'Ignore the photo.', why: 'The policy asks for photos; acknowledging them helps.' },
          { text: 'It can say thanks, describe the photo and pass it to the team. A person approves refunds.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The honest instruction.',
        language: 'python',
        template: 'reply = m.reply(question, system="If you don\'t [[1]], say you don\'t [[2]].")',
        blanks: [['know'], ['know']],
        distractors: ['care', 'answer'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import count_tokens\nprint(count_tokens("Is delivery free?") < count_tokens("क्या डिलीवरी मुफ्त है?"))',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: '5 is less than 19.' },
          { text: '14', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines of Ask Rao\'s system prompt as written.',
        lines: ['You are Ask Rao, the assistant for Mr Rao\'s clothing shop.', 'Answer only from the shop information provided.', 'If the answer isn\'t there, say you don\'t know.', 'Keep replies to two short sentences.'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is a model that handles text and images called? (one word)',
        answers: ['multimodal', 'multi-modal'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three defences against made-up answers would you find easiest to forget? Why?',
    starters: ['I\'d forget...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 11-14. Return policy with page -> 7-day line; "Delivery free hai kya?" = 6 tokens; 512/32 grid = 256 patches.',
};

export default lesson;
