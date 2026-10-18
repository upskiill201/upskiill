import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12 — ML, AI and chatbots: the umbrella, and where chat AI fits. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'ML, AI and chatbots',
  summary: 'Folake keeps saying "AI". Chidi keeps saying "it\'s just statistics". Emmanuel asks if they\'re building a chatbot. Halima needs to sort out the words before the board meeting.',
  minutes: 10,
  outcomes: [
    'Explain how AI, machine learning and chatbots relate',
    'Know what makes Halima\'s model different from a chatbot',
    'Use the words correctly with a non-technical boss',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two kinds of ML model',
      before: {
        label: 'A chat AI',
        text: 'Learned from: a huge amount of text.\nGuesses: the next words of a reply.\nSize: enormous; nobody can read its patterns.\nKnows about Afiya\'s patients: nothing, unless you tell it.',
      },
      after: {
        label: 'Halima\'s no-show model',
        text: 'Learned from: Afiya\'s past appointments.\nGuesses: will this booking be missed?\nSize: small; you can see what drives it.\nKnows about Afiya\'s patients: only the patterns in their bookings.',
      },
      notes: [
        'AI (artificial intelligence) is the big umbrella: computers doing tasks that seem to need intelligence.',
        'Machine learning is one way to build AI: learn from examples. Most AI you meet today is built this way.',
        'Chat AIs are very large ML models trained on text. Halima\'s model is a small ML model trained on bookings. Same family, very different jobs.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'With a boss, say what it predicts, not what it\'s called: "a model that flags bookings likely to be missed" beats "AI" every time.',
    },
  ],
  apply: {
    scenario: 'Getting the words right.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which is the biggest umbrella?',
        options: [
          { text: 'AI' },
          { text: 'Machine learning', why: 'ML is one way of building AI, so it sits inside it.' },
          { text: 'Chatbots', why: 'Chatbots are one kind of ML model.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Print \"Our no-show model learns from bookings\" using the variables",
        starter: "model = \"no-show model\"\nlearns_from = \"bookings\"\n",
        solution: "model = \"no-show model\"\nlearns_from = \"bookings\"\nprint(f\"Our {model} learns from {learns_from}\")\n",
        hint: "print(f\"Our {model} learns from {learns_from}\")",
        checks: [
          { message: "Print the sentence", outputEquals: "Our no-show model learns from bookings" },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'From the biggest idea to the most specific.',
        lines: ['AI', 'Machine learning', 'A chat AI'],
      },
      {
        kind: 'sortGroups',
        prompt: 'True of Halima\'s model, or of a chat AI?',
        groups: ['Halima\'s model', 'A chat AI'],
        items: [
          { text: 'Learned from Afiya\'s bookings', group: 0 },
          { text: 'Learned from huge amounts of text', group: 1 },
          { text: 'Guesses "will this booking be missed?"', group: 0 },
          { text: 'Guesses the next words of a reply', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'So we\'re building a chatbot?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'No. A small model that looks at a booking and guesses if it\'ll be missed. No chatting.' },
          { text: 'Yes, like the famous ones.', why: 'Different job, different data, much smaller.' },
          { text: 'We\'re building a robot.', why: 'Just a few lines of code that make predictions.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t a chat AI tell Afiya which patients will miss tomorrow?',
        options: [
          { text: 'It hasn\'t learned from Afiya\'s appointments' },
          { text: 'It can, perfectly', why: 'It has never seen Afiya\'s bookings. It can only talk in general.' },
          { text: 'It doesn\'t use machine learning', why: 'It does. It just learned from different data for a different job.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning.',
        pairs: [
          ['AI', 'Computers doing tasks that seem to need intelligence'],
          ['Machine learning', 'Building AI by learning from examples'],
          ['Chat AI', 'A very large ML model trained on text'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'It\'s just statistics with a fancy name.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'It shares a lot with statistics. The difference is the goal: we care most about good predictions for new cases.' },
          { text: 'It has nothing to do with statistics.', why: 'It borrows heavily from statistics.' },
          { text: 'You\'re right, let\'s stop.', why: 'Shared roots don\'t make it less useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in Folake\'s board draft is wrong?',
        lines: [
          'We are building a machine learning model.',
          'It learns from our past appointments.',
          'It is a chatbot that talks to patients.',
          'It flags bookings likely to be missed.',
        ],
        bug: 2,
        fix: 'It is a small prediction model, not a chatbot.',
        explanation: 'It doesn\'t talk to anyone. It gives each booking a likely-to-miss score.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Halima\'s board sentence.',
        template: 'We built a [[1]] that flags bookings [[2]] to be missed.',
        blanks: [['model'], ['likely']],
        distractors: ['robot', 'certain'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Machine learning is one way of building... (two letters)',
        answers: ['AI', 'ai'],
        placeholder: 'Two letters',
      },
    ],
  },
  reflect: {
    prompt: 'How would you explain the difference between a chat AI and Halima\'s model to someone in your family, in one sentence?',
    starters: ['A chat AI...', 'Halima\'s model...'],
  },
  deepen: {
    title: 'Not all AI learns',
    summary: 'Older AI, like early chess programs, used rules and search written by people. Today most AI learns from data, which is why "AI" and "ML" often get mixed up.',
  },
  notes: 'AI as the umbrella field; ML as the data-driven approach within it; large language models (chat AIs) are ML models trained on text. No product or company claims.',
};

export default lesson;
