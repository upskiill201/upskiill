import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17 — Joel's notebook: reading (and drawing) an architecture diagram. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Joel\'s notebook',
  summary: 'Kavya\'s diagram of Ask Rao has two boxes: "Customer" and "AI". Joel\'s has nine. Arjun pins both on the wall and asks the team which one could actually be built.',
  minutes: 12,
  outcomes: [
    'Read an AI architecture diagram box by box',
    'See where the order tool fits',
    'Watch the practice model ask for a tool',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two diagrams of the same product',
      before: {
        label: 'Kavya\'s diagram',
        text: 'Customer -> AI -> answer\n\nNo facts, no tools, no checks.\nYou can\'t build it, test it or price it from this.',
      },
      after: {
        label: 'Joel\'s diagram',
        text: 'Customer -> Chat box -> Ask Rao server\n  -> needs facts?  -> search the help page\n  -> needs an order? -> order_status tool\n  -> Model (rented, model-b)\n  -> Checks: guardrails, logs, cost\n-> answer back to the chat box',
      },
      notes: [
        'A good diagram shows where facts come from, what decisions the code makes, and what is checked on the way out.',
        'Arrows matter: they show what talks to what, and in which order.',
        'Every box should map to a layer. If a box has no layer, ask what it really does.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The order_status box',
      caption: 'Offer the model a tool, and it asks for it instead of guessing.',
      code: 'from teyro_ai import PracticeModel\n\ntools = [{"name": "order_status"}]\nreply = PracticeModel().reply("Where is my order R-1042?", tools=tools)\nprint(reply.tool_call)\n',
      challenge: 'Ask about order R-1001 instead.',
    },
  ],
  apply: {
    scenario: 'Reading the diagram.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Offer the order_status tool, ask about order R-1042, and print the tool call the model asks for',
        starter: 'from teyro_ai import PracticeModel\n\ntools = [{"name": "order_status"}]\n',
        solution: 'from teyro_ai import PracticeModel\n\ntools = [{"name": "order_status"}]\nreply = PracticeModel().reply("Where is my order R-1042?", tools=tools)\nprint(reply.tool_call)\n',
        hint: 'reply = PracticeModel().reply("...", tools=tools), then print(reply.tool_call)',
        checks: [{ message: 'Print the tool call', outputEquals: "{'name': 'order_status', 'arguments': {'order_id': 'R-1042'}}" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t you build Ask Rao from Kavya\'s two-box diagram?',
        options: [
          { text: 'It doesn\'t show where facts come from, what the code decides, or what\'s checked' },
          { text: 'It has too few colours', why: 'It\'s missing the layers, not decoration.' },
          { text: 'Two boxes is always wrong', why: 'Simple is fine, if it shows what matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Joel\'s box to its layer.',
        pairs: [
          ['Chat box', 'Application'],
          ['Search the help page', 'Data and retrieval'],
          ['order_status tool', 'Orchestration'],
          ['Checks: logs and cost', 'Evaluation and governance'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Follow the arrows in Joel\'s diagram for an order question.',
        lines: ['Customer types in the chat box', 'The server sees it needs an order', 'The model asks for order_status', 'The tool looks up R-1042', 'Checks run, then the answer goes back'],
      },
      {
        kind: 'mcq',
        prompt: 'When the model is offered a tool and asked about an order, what does it do?',
        options: [
          { text: 'Asks for the tool with the order number, instead of answering itself' },
          { text: 'Makes up a status', why: 'With a tool available, it asks for the tool.' },
          { text: 'Looks the order up itself', why: 'The model asks; your code does the lookup.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'My diagram is simpler. Isn\'t simpler better?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Simple is great when nothing important is hidden. Yours hides the facts, the tool and the checks: the parts that make it work.' },
          { text: 'Yes, two boxes is always best.', why: 'Too simple hides what you need to build and test.' },
          { text: 'No, more boxes is always better.', why: 'Every box should earn its place.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Offer a tool.',
        language: 'python',
        template: 'tools = [{"name": "[[1]]"}]\nreply = PracticeModel().reply(question, [[2]]=tools)',
        blanks: [['order_status'], ['tools']],
        distractors: ['context', 'search'],
      },
      {
        kind: 'findBug',
        prompt: 'This prints None. Which line?',
        language: 'python',
        lines: ['from teyro_ai import PracticeModel', 'reply = PracticeModel().reply("Where is my order R-1042?")', 'print(reply.tool_call)'],
        bug: 1,
        fix: 'reply = PracticeModel().reply("Where is my order R-1042?", tools=[{"name": "order_status"}])',
        explanation: 'No tools were offered, so there\'s no tool call (and it made up an answer instead).',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it belong in an architecture diagram?',
        groups: ['Yes', 'Not really'],
        items: [
          { text: 'Where the facts come from', group: 0 },
          { text: 'Which tools exist', group: 0 },
          { text: 'The team\'s lunch order', group: 1 },
          { text: 'What\'s checked before replying', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the name of the tool in Joel\'s diagram that looks orders up?',
        answers: ['order_status'],
        placeholder: 'Tool name',
      },
    ],
  },
  reflect: {
    prompt: 'Draw (on paper) a diagram of an app you use daily. Which boxes did you have to guess?',
    starters: ['I drew...', 'I had to guess...'],
  },
  deepen: {
    title: 'The model asks, your code acts',
    summary: 'A model never touches the order system itself. It asks for a tool; your code decides whether to run it and what to send back. That separation is what makes tools safe. Chapter 7.',
  },
  notes: 'teyro_ai PracticeModel.reply("Where is my order R-1042?", tools=[{"name": "order_status"}]).tool_call == {"name": "order_status", "arguments": {"order_id": "R-1042"}}. Without tools, tool_call is None and the practice model makes up "Your order has been delivered."',
};

export default lesson;
