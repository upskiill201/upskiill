import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 4 — custom instructions: set it once. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Custom instructions: set it once',
  summary: 'Ada types "I\'m a product designer at a Lagos fintech, write in plain British English" at the start of nearly every chat. Most tools let you set that once.',
  minutes: 12,
  outcomes: [
    'Know what custom instructions are',
    'Write useful standing instructions',
    'Keep sensitive details out of them',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Every chat, before and after',
      before: {
        label: 'Without custom instructions',
        text: 'Every chat starts with Ada retyping: "I work at a fintech in Lagos. Our client is in Mexico City. Write in plain British English. Keep it short. No jargon."',
      },
      after: {
        label: 'With custom instructions',
        text: 'Set once in the tool\'s settings: "I\'m a product designer at a payments startup in Lagos. Write in plain British English, short sentences, no jargon. Ask me questions if something is unclear. Never invent facts or figures; say when you\'re unsure." Every new chat starts with this.',
      },
      notes: [
        'Who you are and how you like answers, set once.',
        'Quality rules ("never invent figures") apply to every chat.',
        'No passwords, client names or confidential details: these instructions are stored.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Set your role, style and quality rules once in custom instructions. Keep names, numbers and secrets out.',
    },
  ],
  apply: {
    scenario: 'Ada sets up custom instructions.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good for custom instructions, or keep out?',
        groups: ['Good', 'Keep out'],
        items: [
          { text: '"Write in plain British English"', group: 0 },
          { text: 'The bank API key', group: 1 },
          { text: '"Say when you\'re unsure"', group: 0 },
          { text: 'Shop owners\' phone numbers', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What are custom instructions?',
        options: [
          { text: 'Standing instructions the tool applies to every new chat' },
          { text: 'A one-off prompt', why: 'They apply every time.' },
          { text: 'IT rules', why: 'They\'re your own settings.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which custom instruction is best?',
        options: [
          { text: 'Be good.', why: 'Too vague.' },
          { text: 'I\'m a product designer at a payments startup. Write in plain British English, short sentences, no jargon. Ask questions if unclear. Never invent facts; say when unsure.' },
          { text: 'My client is Lucía at Nopal and our budget is 40,000 dollars.', why: 'Confidential details.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I always have to tell the AI to stop using American spelling. Annoying!',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Put it in your custom instructions once: "Use Mexican Spanish" or "British English", and it applies to every chat.' },
          { text: 'Just keep telling it.', why: 'Set it once.' },
          { text: 'Switch tools.', why: 'Use the setting.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Set your role, [[1]] and quality rules once. Keep [[2]] out.',
        blanks: [['style'], ['secrets']],
        distractors: ['password', 'rules'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line should not be in Ada\'s custom instructions?',
        lines: [
          'I work at a payments startup in Lagos.',
          'Write in plain British English.',
          'Our partner bank login is ada.okafor / Pilot2024!',
          'Never invent figures; say when unsure.',
        ],
        bug: 2,
        fix: 'Delete it, and change that password.',
        explanation: 'Credentials never go into AI tools.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the instruction to what it does.',
        pairs: [
          ['Your role', 'Sets the context'],
          ['Style', 'Sets how answers sound'],
          ['Quality rules', 'Reduces made-up content'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s quality rule.',
        tiles: ['Never', 'invent', 'figures;', 'say', 'when', 'unsure'],
        distractors: ['always'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How often does Ada need to set custom instructions? (one word)',
        answers: ['once'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps every chat, or only one task?',
        groups: ['Every chat', 'One task'],
        items: [
          { text: 'Plain British English', group: 0 },
          { text: 'Summarise this specific report', group: 1 },
          { text: 'Ask questions if unclear', group: 0 },
          { text: 'Draft Tuesday\'s follow-up', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s custom instruction.',
        lines: ['Who I am', 'How I like answers', 'Quality rules'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep confidential details out of custom instructions?',
        options: [
          { text: 'They\'re stored and sent with every chat' },
          { text: 'They\'re too long', why: 'They\'re stored.' },
          { text: 'No reason', why: 'They\'re stored.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own custom instructions: who you are, how you like answers, and one quality rule.',
    starters: ['I am...', 'Quality rule:'],
  },
  deepen: { title: 'Try it today', summary: 'Find the custom instructions (or personalisation) setting in your AI tool and fill it in.' },
  notes: 'Most major assistants offer custom instructions or similar personalisation; names vary by tool. Login shown is fictional.',
};

export default lesson;
