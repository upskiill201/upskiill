import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19 — One line for Mr Rao: explaining a stack to a busy, non-technical person. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'One line for Mr Rao',
  summary: 'Mr Rao reads only the first line of every message. Arjun asks Kavya and Joel to answer "Add AI. How much?" in one line he\'ll actually read. They write five versions before one works.',
  minutes: 11,
  outcomes: [
    'Put the most useful fact in the first line',
    'Explain an AI product without jargon',
    'Build a clear summary line in Python',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Five first lines',
      beats: [
        { speaker: 'kavya', text: 'Draft 1: "We are architecting a RAG pipeline with tool-calling and guardrails across a six-layer stack."' },
        { speaker: 'joel', text: 'He\'ll stop at "architecting".' },
        { speaker: 'kavya', text: 'Draft 2: "AI is complicated, there are many layers, let me explain..."' },
        { speaker: 'arjun', text: 'He\'ll stop at "complicated". What does HE want to know?' },
        { speaker: 'joel', text: 'Whether it answers customers correctly, and what it costs. So: "Ask Rao already answers delivery, returns and sizes from your help page, for about $0.04 per 1,000 chats; order tracking is next."' },
        { speaker: 'narrator', text: 'Mr Rao replies in four minutes: "Good. Do orders."' },
      ],
      choice: {
        prompt: 'Which first line would Mr Rao read and act on?',
        options: [
          { text: '"Ask Rao answers delivery, returns and sizes from your help page, for about $0.04 per 1,000 chats; order tracking is next."', outcome: 'What it does, what it costs, what\'s next: all in the first line, no jargon.', best: true },
          { text: '"We are architecting a RAG pipeline with tool-calling and guardrails."', outcome: 'Accurate, and unreadable for him. Jargon hides the answer.' },
          { text: '"AI is complicated. Let me explain the six layers."', outcome: 'He wanted an answer, not a lecture. The layers are for the team.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Build the line',
      caption: 'Facts in variables, one clear sentence out.',
      code: 'answers = "delivery, returns and sizes"\nper_1000 = 0.04\nnext_step = "order tracking"\n\nprint(f"Ask Rao answers {answers} from your help page, for about ${per_1000:.2f} per 1,000 chats; {next_step} is next.")\n',
      challenge: 'Rewrite it for next week, when order tracking works.',
    },
  ],
  apply: {
    scenario: 'The first line.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print "About $0.04 per 1,000 chats" using the variable and a 2-decimal format',
        starter: 'per_1000 = 0.0415\n',
        solution: 'per_1000 = 0.0415\nprint(f"About ${per_1000:.2f} per 1,000 chats")\n',
        hint: 'f"About ${per_1000:.2f} per 1,000 chats"',
        checks: [{ message: 'Print About $0.04 per 1,000 chats', outputEquals: 'About $0.04 per 1,000 chats' }],
      },
      {
        kind: 'mcq',
        prompt: 'What two things does Mr Rao most want to know?',
        options: [
          { text: 'Which vector database and which framework?', why: 'That\'s for the team, not the client.' },
          { text: 'How many layers there are', why: 'He wants outcomes, not architecture.' },
          { text: 'Does it answer customers correctly, and what does it cost?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in Mr Rao\'s first line, or in the team\'s notes?',
        groups: ['First line', 'Team notes'],
        items: [
          { text: 'What it answers today', group: 0 },
          { text: 'Which embedding method we used', group: 1 },
          { text: 'Cost per 1,000 chats', group: 0 },
          { text: 'The vector store\'s settings', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Isn\'t it dumbing it down to leave out RAG and guardrails?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, always include every technical word.', why: 'Jargon stops him reading before the answer.' },
          { text: 'It\'s translating, not dumbing down. "Answers from your help page" IS RAG, in his words. Details are ready if he asks.' },
          { text: 'Never tell clients anything technical.', why: 'Share the details when they ask; lead with the outcome.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the jargon to Mr Rao\'s words.',
        pairs: [
          ['RAG', 'Answers from your help page'],
          ['Tool calling', 'Looks up your orders'],
          ['Guardrails', 'Won\'t share private codes'],
          ['Evaluation', 'We test it on real questions'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A first-line formula.',
        template: 'What it [[1]] today, what it [[2]], what\'s next.',
        blanks: [['does', 'answers'], ['costs']],
        distractors: ['is', 'weighs'],
      },
      {
        kind: 'findBug',
        prompt: 'Which draft sentence would lose Mr Rao?',
        lines: [
          'Ask Rao answers delivery, returns and sizes correctly.',
          'It costs about $0.04 per 1,000 chats at today\'s practice prices.',
          'Our embedding cosine threshold is 0.35 across 24 dimensions.',
          'Order tracking comes next week.',
        ],
        bug: 2,
        fix: 'Leave settings for the team notes.',
        explanation: 'Accurate, and meaningless to him. It belongs in the team\'s notes.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'per_1000 = 0.18\nprint(f"${per_1000:.2f}")',
        language: 'python',
        options: [
          { text: '$0.18' },
          { text: '$0.2', why: ':.2f keeps two decimal places.' },
          { text: '0.18', why: 'The $ is in the f-string, so it prints too.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the parts of Joel\'s line.',
        lines: ['What Ask Rao answers today', 'Where the answers come from', 'What it costs', 'What comes next'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mr Rao\'s two-word reply began with "Good." What did he ask for next? (two words)',
        answers: ['Do orders', 'do orders', 'orders'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Write the first line you\'d send a busy boss about a project you\'re on. Does it say what it does, what it costs and what\'s next?',
    starters: ['My first line:', 'It\'s missing...'],
  },
  deepen: {
    title: 'Two audiences, two documents',
    summary: 'Mr Rao gets one line. The team gets the diagram and the notes. Writing both is part of building AI products: Chapter 11 ends with both.',
  },
  notes: 'Practice cost with 2 retrieved lines on model-b: $0.0000415 per answer = $0.0415 per 1,000 -> "$0.04". Mr Rao reads only the first line (CAST.md, How to Make People Listen to You).',
};

export default lesson;
