import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: change, the demo, cost, failures. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: cost and failure',
  summary: 'The team knows why tools keep changing, why the demo failed on an order, what an answer costs, and how a single sentence leaked a discount code. Quick check before they write a review checklist.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Price an answer and spot failures without notes', 'Tell documents from live data'],
  learn: [
    {
      kind: 'story',
      title: 'The week so far',
      beats: [
        { speaker: 'narrator', text: 'Joel\'s Friday note: "Help page: works. Orders: needs a tool. Cost: tiny per answer, watch tokens. Secrets: never in the prompt."' },
        { speaker: 'arjun', text: 'Four lines. That\'s a better design document than most.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: cost and failure.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the input tokens of a model-b reply to "Is delivery free?" with the whole help page as context',
        starter: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nreply = PracticeModel("model-b").reply("Is delivery free?", context=policies)\nprint(reply.tokens_in)\n',
        hint: 'reply.tokens_in',
        checks: [{ message: 'Print 321', outputEquals: '321' }],
      },
      {
        kind: 'mcq',
        prompt: '"Where is my order R-1042?" With only the help page, what should a good assistant say?',
        options: [
          { text: 'A likely delivery date', why: 'That would be made up.' },
          { text: 'That it doesn\'t know, because orders aren\'t in the help page' },
          { text: '"Delivered"', why: 'It has no way to know that.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Help page, or live data?',
        groups: ['Help page', 'Live data'],
        items: [
          { text: 'Return rules', group: 0 },
          { text: 'An order\'s status', group: 1 },
          { text: 'Payment methods accepted', group: 0 },
          { text: 'Whether a red kurta in L is in stock', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the date to the event.',
        pairs: [
          ['2017', 'The transformer paper'],
          ['2022', 'ChatGPT released to the public'],
          ['2023 onwards', 'Open-weight models widely used'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the cost, in dollars, of 1,000,000 output tokens on model-b with cost()',
        starter: 'from teyro_ai import cost\n',
        solution: 'from teyro_ai import cost\nprint(cost("model-b", 0, 1000000))\n',
        hint: 'cost("model-b", 0, 1000000): no input tokens, a million output tokens',
        checks: [{ message: 'Print 1.5', outputEquals: '1.5' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the bill much bigger than it needs to be?',
        lines: [
          'Search for the 2 most relevant help-page lines.',
          'Also paste the whole help page into every prompt.',
          'Ask model-b to reply in one sentence.',
          'Log the cost of each reply.',
        ],
        bug: 1,
        fix: 'Send only the relevant lines.',
        explanation: 'The whole page multiplies the input tokens on every single message.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'A new orchestration framework launched today. Rewrite Ask Rao in it?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, newest is best.', why: 'New isn\'t a reason. Ask the three questions.' },
          { text: 'Frameworks are banned.', why: 'They can help later. Decide by the job, not the hype.' },
          { text: 'Which job would it do better, and what would switching cost us? Our 12 lines don\'t need a framework yet.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Joel\'s note.',
        template: 'Orders need a [[1]]. Secrets never go in the [[2]].',
        blanks: [['tool'], ['prompt']],
        distractors: ['bigger model', 'logs'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I don\'t know" a good failure?',
        options: [
          { text: 'It\'s shorter', why: 'Length isn\'t the point. Honesty is.' },
          { text: 'It doesn\'t mislead the customer with a made-up fact' },
          { text: 'Customers love it', why: 'They\'d prefer an answer, but a wrong one is worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to price Ask Rao for Mr Rao.',
        lines: ['Measure tokens in and out for a typical question', 'Multiply by the model\'s prices', 'Multiply by chats per month', 'Give a range, with the date the prices were checked'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the name of an attack that tries to override an assistant\'s instructions? (prompt ...)',
        answers: ['injection', 'prompt injection'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Joel\'s four-line note became the design document. What\'s the shortest useful summary you could write of a project you\'re working on?',
    starters: ['My four lines would be...', 'The hardest line to write is...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 11-14. tokens_in with full help page 321; cost("model-b", 0, 1000000) = 1.5.',
};

export default lesson;
