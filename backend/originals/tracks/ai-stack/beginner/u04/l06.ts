import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6 — Input vs output tokens: why long replies cost more. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Input vs output tokens',
  summary: 'Kavya notices the price cards list two prices for every model. Output tokens cost three times as much as input. Joel works out what that means for Ask Rao\'s long, chatty replies.',
  minutes: 11,
  outcomes: [
    'Know that input and output tokens are priced separately',
    'See why output usually costs more',
    'Compare a "reads a lot" chat with a "writes a lot" chat',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Every price card has two numbers:</p><ul><li><strong>Input</strong>: everything you send (system prompt, help-page lines, history, the question).</li><li><strong>Output</strong>: everything the model writes back.</li></ul><p>On the practice cards, output costs <strong>three times</strong> input, a common pattern on real price lists. Writing is harder work than reading: each output token is a fresh prediction made one after another, while input can be processed together.</p><p>For model-b, compare two chats with the same 550 tokens:</p><ul><li><strong>Reads a lot</strong> (500 in, 50 out): $0.000325</li><li><strong>Writes a lot</strong> (50 in, 500 out): $0.000775</li></ul><p>More than double, for the same number of tokens. So for Ask Rao, <strong>short replies</strong> save twice: less waiting and a lower bill. And the help page? Big, but it\'s input: cheaper per token, and you can trim it too.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Reads a lot vs writes a lot',
      caption: 'Same total tokens, different bills.',
      code: 'from teyro_ai import cost\n\nreads = cost("model-b", 500, 50)\nwrites = cost("model-b", 50, 500)\nprint(f"Reads a lot: ${reads:.6f}")\nprint(f"Writes a lot: ${writes:.6f}")\nprint(f"Writing costs {writes / reads:.1f}x more")\n',
      challenge: 'Try model-a. Is the ratio the same?',
    },
  ],
  apply: {
    scenario: 'What you pay for.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the cost on model-b of a chat that reads 50 tokens and writes 500',
        starter: 'from teyro_ai import cost\n',
        solution: 'from teyro_ai import cost\nprint(cost("model-b", 50, 500))\n',
        hint: 'cost("model-b", 50, 500)',
        checks: [{ message: 'Print 0.000775', outputEquals: '0.000775' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does output often cost more than input?',
        options: [
          { text: 'Each output token is a separate prediction made one after another, which is more work' },
          { text: 'Output tokens are longer', why: 'Same kind of tokens; more work to produce.' },
          { text: 'It doesn\'t', why: 'On most price lists, output is the pricier one.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Input tokens or output tokens?',
        groups: ['Input', 'Output'],
        items: [
          { text: 'The system prompt', group: 0 },
          { text: 'Ask Rao\'s reply', group: 1 },
          { text: 'The help-page lines', group: 0 },
          { text: 'A 300-token thank-you message', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its practice OUTPUT price per million.',
        pairs: [
          ['model-a', '$15.00'],
          ['model-b', '$1.50'],
          ['model-c', '$0.30'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Long replies feel more helpful. Is the cost difference really that big?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'A 300-token reply costs 20 times a 15-token one, output is priced at 3x input, and it takes longer to arrive. Short and clear is the helpful version.' },
          { text: 'No difference at all.', why: 'Output tokens cost the most.' },
          { text: 'Make them even longer.', why: 'Slower and pricier, and harder to read on a phone.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import cost\nprint(cost("model-b", 500, 50))',
        language: 'python',
        options: [
          { text: '0.000325' },
          { text: '0.000775', why: 'That\'s the "writes a lot" chat.' },
          { text: '550', why: 'It returns dollars.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two prices.',
        template: '[[1]] tokens are what you send; [[2]] tokens are what it writes.',
        blanks: [['Input'], ['output']],
        distractors: ['Output', 'secret'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s cost estimate is wrong?',
        lines: [
          'Input: 321 tokens at $0.50 per million.',
          'Output: 13 tokens.',
          'Output is priced the same as input.',
          'Total: input cost plus output cost.',
        ],
        bug: 2,
        fix: 'Output is priced at $1.50 per million on model-b.',
        explanation: 'Input and output have separate prices; output is usually higher.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many times more the "writes a lot" chat costs than the "reads a lot" chat on model-b, rounded to 1 place',
        starter: 'from teyro_ai import cost\n\nreads = cost("model-b", 500, 50)\nwrites = cost("model-b", 50, 500)\n',
        solution: 'from teyro_ai import cost\n\nreads = cost("model-b", 500, 50)\nwrites = cost("model-b", 50, 500)\nprint(round(writes / reads, 1))\n',
        hint: 'round(writes / reads, 1)',
        checks: [{ message: 'Print 2.4', outputEquals: '2.4' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On the practice cards, output costs how many times the input price?',
        answers: ['3', 'three', '3x'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If you paid three times more for every word you wrote than every word you read, how would your messages change?',
    starters: ['I\'d write...', 'I\'d read...'],
  },
  deepen: {
    title: 'Cached input',
    summary: 'Some providers charge less for input they\'ve seen recently, like a system prompt and help page sent on every chat. It\'s called prompt caching, and it can cut the input bill a lot.',
  },
  notes: 'teyro_ai model-b: $0.50 in / $1.50 out per million. cost(model-b, 500, 50) = 0.000325; (50, 500) = 0.000775; ratio 2.38 -> 2.4. Output priced higher than input is common on real price lists (check current prices). Prompt caching discounts are offered by several providers.',
};

export default lesson;
