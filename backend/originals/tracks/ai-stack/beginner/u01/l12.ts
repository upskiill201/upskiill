import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12 — Kavya's Friday demo: it works, until Mr Rao asks about an order. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Kavya\'s Friday demo',
  summary: 'Friday, video call with Mr Rao. Kavya types "Is delivery free?" and the answer is perfect. Mr Rao, delighted, types his own question: "Where is my order R-1042?"',
  minutes: 11,
  outcomes: [
    'See why documents can\'t answer every question',
    'Tell a policy question from a live-data question',
    'Explain a gap honestly in a demo',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The demo',
      beats: [
        { speaker: 'narrator', text: 'Kavya shares her screen. "Is delivery free?" Ask Rao: "Delivery is free on orders over ₹999." Mr Rao nods.' },
        { speaker: 'narrator', text: 'Mr Rao types: "Where is my order R-1042?" Ask Rao: "I don\'t know. That isn\'t in the information I was given."' },
        { speaker: 'kavya', text: '(quietly, to Joel in the team chat) Why?! It worked all week!' },
        { speaker: 'joel', text: 'It only reads the help page. Order R-1042 isn\'t on the help page. It\'s in the order records, and those change every minute.' },
        { speaker: 'arjun', text: 'And notice: it said "I don\'t know" instead of inventing a delivery date. That\'s the right failure.' },
      ],
      choice: {
        prompt: 'What should Kavya say to Mr Rao?',
        options: [
          { text: '"Right now it answers from your help page. Next, we connect it to your orders so it can look one up."', outcome: 'Honest and specific. Mr Rao hears progress and a plan, not an excuse.', best: true },
          { text: '"It\'s a small bug, ignore it."', outcome: 'It isn\'t a bug: a whole layer is missing. Mr Rao will ask again tomorrow.' },
          { text: '"AI can\'t do orders."', outcome: 'It can, with a tool that looks orders up. That\'s Chapter 7.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The demo, again',
      caption: 'One question works; one can\'t, yet.',
      code: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\n\nprint(model.reply("Is delivery free?", context=policies))\nprint(model.reply("Where is my order R-1042?", context=policies))\n',
      challenge: 'Ask the order question with NO context. Is a made-up answer better or worse than "I don\'t know"?',
    },
  ],
  apply: {
    scenario: 'The Friday demo.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "Where is my order R-1042?" with the policies as context and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\nprint(model.reply("Where is my order R-1042?", context=policies))\n',
        hint: 'context=policies',
        checks: [{ message: 'Print the "I don\'t know" reply', outputIncludes: "I don't know" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why couldn\'t Ask Rao answer the order question?',
        options: [
          { text: 'The model is too small', why: 'No model knows a live order unless it can look it up.' },
          { text: 'Mr Rao typed it wrong', why: 'The question was fine. The data wasn\'t there.' },
          { text: 'Order details aren\'t in the help page; they\'re in order records that change all the time' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Can the help page answer it, or does it need live data?',
        groups: ['Help page', 'Live data'],
        items: [
          { text: 'Is delivery free?', group: 0 },
          { text: 'Where is my order R-1042?', group: 1 },
          { text: 'What sizes do kurtas come in?', group: 0 },
          { text: 'Has my refund been sent?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Saying "I don\'t know" in front of the client was so embarrassing.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, make it always give an answer.', why: 'Then it would invent order statuses.' },
          { text: 'It was the best thing it did all demo. A made-up delivery date would have been far worse, for him and his customers.' },
          { text: 'Hide that question next time.', why: 'Customers will ask it. Build the tool instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what Ask Rao needs to answer it.',
        pairs: [
          ['Is delivery free?', 'The help page'],
          ['Where is my order R-1042?', 'A tool that reads the order records'],
          ['Do you have red kurtas in L?', 'The product list'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The right failure.',
        template: 'Saying "I don\'t [[1]]" is better than a confident [[2]] answer.',
        blanks: [['know'], ['made-up', 'wrong']],
        distractors: ['care', 'short'],
      },
      {
        kind: 'mcq',
        prompt: 'Which layer will fix the order question?',
        options: [
          { text: 'Orchestration: a tool the assistant can call to look orders up' },
          { text: 'Compute: faster chips', why: 'Speed doesn\'t give it the order data.' },
          { text: 'Application: a bigger chat box', why: 'The box isn\'t the problem; the data is.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in Kavya\'s follow-up email to Mr Rao is a problem?',
        lines: [
          'Thank you for joining the demo.',
          'Ask Rao answers questions from your help page.',
          'It already knows every order, it was just shy today.',
          'Next week we connect it to your order records.',
        ],
        bug: 2,
        fix: 'It can\'t look up orders yet; that\'s next week\'s work.',
        explanation: 'Don\'t cover a missing layer with a joke that sounds like a promise.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With the policies as context, what does the practice model say to "Is delivery free?"',
        code: 'print(model.reply("Is delivery free?", context=policies))',
        language: 'python',
        options: [
          { text: 'Delivery is free and takes 1 day anywhere in India.', why: 'That\'s its made-up answer WITHOUT context.' },
          { text: 'Delivery is free on orders over ₹999.' },
          { text: 'I don\'t know.', why: 'The help page answers this one.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which order did Mr Rao ask about? (the order number)',
        answers: ['R-1042', 'R1042', '1042'],
        placeholder: 'Order number',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya felt embarrassed by "I don\'t know". When have you seen a person or a system that was better for admitting it didn\'t know?',
    starters: ['I saw...', 'It was better because...'],
  },
  deepen: {
    title: 'Two kinds of knowledge',
    summary: 'Documents (policies, guides) change rarely and suit retrieval. Live records (orders, stock, payments) change constantly and need a tool that asks the system directly. Most assistants need both.',
  },
  notes: 'With rao_policies.md as context: "Is delivery free?" -> "Delivery is free on orders over ₹999."; "Where is my order R-1042?" -> "I don\'t know. That isn\'t in the information I was given." Without context the order question gets the made-up "Your order has been delivered."',
};

export default lesson;
