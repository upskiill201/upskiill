import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Before/After: keep your voice. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Sounds like a robot',
  summary: 'Lucía asks AI to write the party message for the family group chat. Mateo replies in seconds: "Who hacked your phone?" See what changed when she started from her own words.',
  minutes: 12,
  outcomes: [
    'Start from your own rough draft, not a blank prompt',
    'Ask AI to edit, not rewrite',
    'Ban the words that make writing sound like AI',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The family group chat',
      before: {
        label: 'Prompt: "Write a message to my family about the anniversary party."',
        text: 'Dear family, I am thrilled to announce that we will be embarking on a joyous celebration of Mamá and Papá\'s 35th anniversary! This momentous occasion promises to be an unforgettable journey of love and laughter. Your presence would be truly delightful.',
      },
      after: {
        label: 'Prompt: "Here\'s my rough message. Fix the spelling and make it clearer. Keep my words and my jokes. Don\'t add anything."',
        text: 'Familia! The party for Mamá and Papá\'s 35th is on the 30th in Oaxaca. Food, music, and Papá dancing like it\'s 1989. Can you tell me by Sunday if you\'re coming? And Tía Luz, yes, you can bring the dog.',
      },
      notes: [
        'She started from her own messy draft, so the voice was already hers.',
        '"Edit, don\'t rewrite. Keep my words." The AI fixed typos and order, nothing else.',
        'The "before" has the classic robot words: thrilled, embarking, joyous, momentous, journey, delightful. Nobody\'s family talks like that.',
        'The "after" asks for something (reply by Sunday). The robot version forgot to.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write it badly yourself first. Then: "Fix it, keep my words, don\'t add anything." Your voice stays; the typos go.',
    },
  ],
  apply: {
    scenario: 'Keeping Lucía\'s voice.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Mateo ask "Who hacked your phone?"',
        options: [
          { text: 'The message had a typo', why: 'It was perfectly spelled; it just wasn\'t her.' },
          { text: 'It sounded nothing like Lucía: formal, gushing and full of robot words' },
          { text: 'Mateo is always suspicious', why: 'This time he had a point.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Robot word, or normal word?',
        groups: ['Robot word', 'Normal'],
        items: [
          { text: 'Embarking', group: 0 },
          { text: 'Party', group: 1 },
          { text: 'Momentous', group: 0 },
          { text: 'Tell me by Sunday', group: 1 },
          { text: 'Delightful', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s editing line.',
        template: '[[1]], don\'t rewrite. Keep my [[2]] and don\'t add anything.',
        blanks: [['Edit', 'edit'], ['words']],
        distractors: ['Delete', 'secrets'],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'I hate writing. Can\'t I just let it write everything?',
        prompt: 'Lucía\'s advice?',
        options: [
          { text: 'Write three messy lines first. It\'ll fix them, and it\'ll still sound like you.' },
          { text: 'Yes, nobody will notice.', why: 'Mateo noticed in seconds.' },
          { text: 'Never use AI for writing.', why: 'It\'s a great editor.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line did the AI add that Lucía never wrote?',
        lines: [
          'Familia! The party is on the 30th in Oaxaca.',
          'Food, music, and Papá dancing like it\'s 1989.',
          'This momentous occasion will be an unforgettable journey.',
          'Can you tell me by Sunday if you\'re coming?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Robot words, and not hers. That\'s why she says "don\'t add anything".',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the instruction to what it protects.',
        pairs: [
          ['"Keep my words"', 'Her voice'],
          ['"Keep my jokes"', 'Papá dancing like it\'s 1989'],
          ['"Don\'t add anything"', 'No made-up details'],
          ['"Don\'t use: thrilled, embark, journey"', 'No robot words'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Tomás wants to text his flatmate about splitting bills. Which prompt keeps his voice?',
        options: [
          { text: 'Write a message about splitting bills.', why: 'It\'ll invent his voice.' },
          { text: 'Write a professional message about bills.', why: 'Too stiff for a flatmate.' },
          { text: 'Here\'s my text: "hey so the lights bill came, 900 pesos, half each? send by friday x". Fix anything unclear, keep it casual, don\'t add anything.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day does Lucía want replies from the family? (A day of the week.)',
        answers: ['Sunday', 'sunday'],
        placeholder: 'A day',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s writing method.',
        lines: ['Write a messy draft herself', 'Paste it into AI', 'Ask: edit, don\'t rewrite', 'Check nothing was added', 'Send'],
      },
      {
        kind: 'mcq',
        prompt: 'What else did the robot version forget?',
        options: [
          { text: 'To ask for anything: no "reply by Sunday"' },
          { text: 'To mention the dog', why: 'Nice, but not the real gap.' },
          { text: 'To be longer', why: 'It was already too long.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which words would never appear in your own messages? Write your personal "banned words" list for AI.',
    starters: ['I\'d never say...', 'My banned words:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a messy three-line message you actually need to send. Paste it into an AI tool with "Edit, don\'t rewrite. Keep my words. Don\'t add anything." Compare it with what you get from a blank "write a message about..." prompt.',
  },
  notes: 'Words like "delve", "embark", "journey" and "thrilled" are widely noted as overused in AI-generated text; presented as style advice, not a detector.',
};

export default lesson;
