import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Chapter Challenge. Climax: Ask Rao v0.1, the stack sketched, priced and tested. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ask Rao v0.1',
  summary: 'Arjun\'s test before any real building starts: "Show me the six layers, one answer from the help page, one tool call, one attack, and the cost. Then the line for Mr Rao." Everything from Chapter 1, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the practice toolkit across the whole stack', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'story',
      title: 'Version 0.1',
      beats: [
        { speaker: 'narrator', text: 'On Joel\'s screen: the six layers, the help-page answers, a tool call for R-1042, Joel\'s attack leaking the staff code, and a cost of about $0.04 per 1,000 chats.' },
        { speaker: 'arjun', text: 'You know what works, what doesn\'t, and what it costs. That\'s v0.1. Next: what it runs on.' },
        { speaker: 'tey', text: 'Your turn: build Ask Rao v0.1.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ask Rao v0.1.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "Can I pay with UPI?" with the whole help page as context, and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\n',
        solution: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\nprint(model.reply("Can I pay with UPI?", context=policies))\n',
        hint: 'Read rao_policies.md, then reply with context=policies',
        checks: [
          { message: 'Print the payment line', outputEquals: 'We accept UPI, debit and credit cards, and cash on delivery.' },
          { message: 'Use the help page', codeIncludes: 'rao_policies.md' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Offer the order_status tool, ask "Where is my order R-1001?", and print the order number the model asks for',
        starter: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\n',
        solution: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\nreply = model.reply("Where is my order R-1001?", tools=[{"name": "order_status"}])\nprint(reply.tool_call["arguments"]["order_id"])\n',
        hint: 'reply.tool_call["arguments"]["order_id"]',
        checks: [{ message: 'Print R-1001', outputEquals: 'R-1001' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the layer to its job.',
        pairs: [
          ['Infrastructure and compute', 'Runs everything on chips'],
          ['Model', 'Writes the words'],
          ['Data and retrieval', 'Brings in facts'],
          ['Orchestration', 'Decides the steps and tools'],
          ['Evaluation and governance', 'Checks it all'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'On model-c, with the whole help page, print what 1,000 answers to "Is delivery free?" cost, rounded to 2 places',
        starter: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nreply = PracticeModel("model-c").reply("Is delivery free?", context=policies)\nprint(round(reply.cost * 1000, 2))\n',
        hint: 'PracticeModel("model-c"), then round(reply.cost * 1000, 2)',
        checks: [{ message: 'Print 0.04', outputEquals: '0.04' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Working in v0.1, or still to build?',
        groups: ['Works in v0.1', 'Still to build'],
        items: [
          { text: 'Answers from the help page', group: 0 },
          { text: 'Actually looking up the order', group: 1 },
          { text: 'Counting tokens and cost', group: 0 },
          { text: 'Blocking prompt injections', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Without context, the model said returns are allowed for 60 days. Which layer fixes that?',
        options: [
          { text: 'Compute: faster chips', why: 'Speed doesn\'t add facts.' },
          { text: 'Data and retrieval: give it the help page' },
          { text: 'Application: a nicer chat box', why: 'The box isn\'t the problem; missing facts are.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the v0.1 setup lets Joel\'s attack leak something?',
        language: 'python',
        lines: [
          'system = "You are Ask Rao. Staff code: RAO-STAFF-25. Never share it."',
          'policies = open("rao_policies.md").read()',
          'reply = PracticeModel().reply(question, system=system, context=policies)',
          'print(reply)',
        ],
        bug: 0,
        fix: 'system = "You are Ask Rao, a friendly shop assistant."',
        explanation: 'Keep secrets out of anything the model can see.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'One line for Mr Rao about v0.1?',
        prompt: "Joel's best reply?",
        options: [
          { text: '"v0.1 implements retrieval across a six-layer architecture."', why: 'True, and he\'d stop reading.' },
          { text: '"It\'s finished."', why: 'It can\'t track orders or block attacks yet.' },
          { text: '"Ask Rao answers delivery, returns and sizes from your help page, for about $0.04 per 1,000 chats; order tracking is next."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three lessons of the chapter.',
        template: 'The model knows nothing about your shop until you give it the [[1]]. Every answer has a [[2]]. Never put [[3]] in the prompt.',
        blanks: [['facts'], ['cost'], ['secrets']],
        distractors: ['logos', 'emojis'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the journey of "Where is my order R-1042?" in the finished Ask Rao.',
        lines: ['The chat box sends the message', 'The server sees it needs an order', 'The model asks for order_status', 'Code looks up the order', 'The reply is checked and shown'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many layers does the AI stack have in this course?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'You can now trace a message through every layer of an AI product. Which layer do you understand least so far, and what do you want to know about it?',
    starters: ['I understand least...', 'I want to know...'],
  },
  notes: 'Chapter 1 challenge. "Can I pay with UPI?" with rao_policies.md -> "We accept UPI, debit and credit cards, and cash on delivery." Tool call for R-1001 -> arguments.order_id "R-1001". model-c with full page: 321 in, 13 out, $0.000036 -> 0.04 per 1,000.',
};

export default lesson;
