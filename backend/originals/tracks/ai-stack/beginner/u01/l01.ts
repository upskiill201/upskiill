import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — "Add AI. How much?": the brief, the team, and why "add AI" isn't a plan. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Add AI. How much?"',
  summary: 'Three weeks after the Diwali sale, Mr Rao\'s shop inbox is full of the same questions. He sends Arjun one line: "Add AI. Like ChatGPT. For my shop. How much?" Arjun forwards it to Kavya and Joel.',
  minutes: 10,
  outcomes: [
    'Meet the team building Ask Rao',
    'See why "add AI" is a wish, not a plan',
    'Run your first line of AI code with the practice model',
  ],
  learn: [
    {
      kind: 'story',
      title: 'One line from Mr Rao',
      beats: [
        { speaker: 'narrator', text: 'Mr Rao\'s message, in full: "Add AI. Like ChatGPT. For my shop. How much?"' },
        { speaker: 'kavya', text: 'Easy. I\'ll connect the biggest model to the website and we\'re done by Friday.' },
        { speaker: 'joel', text: '(after a long pause) How will it know our return policy? Or where an order is? And what does each answer cost?' },
        { speaker: 'arjun', text: 'Joel just asked the three questions that matter. "AI" in a product isn\'t one thing. It\'s a stack of layers, from chips at the bottom to the chat box at the top. You\'re going to learn every one by building Ask Rao.' },
        { speaker: 'tey', text: 'And you\'ll build it here, with a practice model that runs in your browser. It behaves like a real one in the ways that matter, mistakes included.' },
      ],
      choice: {
        prompt: 'What should the team do first?',
        options: [
          {
            text: 'Work out what the assistant must do, what it needs to know, and what it may cost.',
            outcome: 'Right. Those questions decide every layer of the stack. Chapter 1 is about asking them.',
            best: true,
          },
          {
            text: 'Connect the biggest model and see what happens.',
            outcome: 'It will answer confidently, about a shop it has never seen. You\'ll watch that go wrong in lesson 4.',
          },
          {
            text: 'Tell Mr Rao AI is too expensive.',
            outcome: 'You don\'t know that yet. A careful answer can cost very little. Lesson 13 does the maths.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Your first AI reply',
      caption: 'The practice model, built into this course. Change the message.',
      code: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\nprint(model.reply("Hi!"))\n',
      challenge: 'Ask it "What is your return policy?" Remember the answer for lesson 4.',
    },
  ],
  apply: {
    scenario: 'The brief.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "Add AI" not a plan?',
        options: [
          { text: 'It doesn\'t say what the AI must do, what it needs to know, or what it may cost' },
          { text: 'Because AI can\'t help shops', why: 'It can. The brief just doesn\'t say how.' },
          { text: 'Because it\'s too short', why: 'Short is fine. It\'s missing the what, the knowledge and the cost.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask the practice model "Hi!" and print its reply',
        starter: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\n',
        solution: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\nprint(model.reply("Hi!"))\n',
        hint: 'print(model.reply("Hi!"))',
        checks: [
          { message: 'Print the greeting', outputEquals: 'Namaste! How can I help you today?' },
          { message: 'Use model.reply', codeIncludes: '.reply(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their role.',
        pairs: [
          ['Mr Rao', 'The client with one line'],
          ['Kavya', 'Builds fast, ships Friday'],
          ['Joel', 'Asks how every layer works'],
          ['Arjun', 'Leads the team'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A question the team must answer before building, or not?',
        groups: ['Must answer first', 'Can wait'],
        items: [
          { text: 'What questions must it answer?', group: 0 },
          { text: 'What colour is the chat button?', group: 1 },
          { text: 'Where will it get the shop\'s facts?', group: 0 },
          { text: 'What will each answer cost?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The biggest model knows everything. Why would it get our shop wrong?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'It knows a lot in general, but nothing about OUR shop: not our prices, our return policy or anyone\'s order.' },
          { text: 'It wouldn\'t. Big models are always right.', why: 'They\'re often wrong about things they were never shown.' },
          { text: 'Because it\'s broken.', why: 'It isn\'t broken. It just hasn\'t seen the shop\'s data.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s idea.',
        template: 'AI in a product isn\'t one thing. It\'s a [[1]] of [[2]].',
        blanks: [['stack'], ['layers']],
        distractors: ['robot', 'buttons'],
      },
      {
        kind: 'mcq',
        prompt: 'What is the practice model in this course?',
        options: [
          { text: 'A built-in stand-in that behaves like a real model, mistakes included, without calling one' },
          { text: 'ChatGPT', why: 'No real AI service is called. It runs inside your browser.' },
          { text: 'A person typing replies', why: 'It\'s a small program in the course.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This crashes. Which line?',
        language: 'python',
        lines: ['from teyro_ai import PracticeModel', 'model = PracticeModel()', 'print(model.reply(Hi!))'],
        bug: 2,
        fix: 'print(model.reply("Hi!"))',
        explanation: 'The message is text, so it needs quotes.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the name of the assistant the team will build? (two words)',
        answers: ['Ask Rao'],
        placeholder: 'Two words',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Mr Rao wants a price. What do we tell him today?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'That we\'ll come back this week with a cost per chat, once we know what it has to do.' },
          { text: 'It\'s free.', why: 'Nothing that runs on a computer is free. Give a real estimate later.' },
          { text: 'A million rupees.', why: 'Guessing before you\'ve worked it out helps nobody.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been asked to "add AI" or "just use ChatGPT" for something? What would you have needed to know first?',
    starters: ['I was asked to...', 'I\'d have needed to know...'],
  },
  deepen: {
    title: 'Why a practice model?',
    summary: 'Real AI services need accounts and keys, and charge per word. The practice model costs nothing and gives everyone the same answers, so you can see exactly how each layer changes the result.',
  },
  notes: 'teyro_ai.PracticeModel("model-b").reply("Hi!") -> "Namaste! How can I help you today?". Story continues How to Set Clear Expectations (Mr Rao\'s shop, Arjun, Kavya, Joel). The practice model is deterministic and rule-based; no real AI service is called.',
};

export default lesson;
