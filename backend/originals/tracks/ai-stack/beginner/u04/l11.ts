import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 11 — Small models for small jobs: practice-tiny and its 300-token window. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Small models for small jobs',
  summary: 'Joel finds a fourth card: practice-tiny. Free, very fast, and it can only read 300 tokens. The whole help page won\'t fit. Three well-chosen lines will.',
  minutes: 12,
  outcomes: [
    'Know what a small model is good and bad at',
    'Explain a context window limit',
    'Make a small model work by sending only what it needs',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The small end of the shelf',
      html: '<p>Not every model is a giant. Small models have far fewer parameters, so they:</p><ul><li><strong>Run cheaply</strong>, even on a laptop or a phone.</li><li><strong>Answer fast</strong>: practice-tiny writes 200 tokens a second.</li><li><strong>Know less</strong> and reason less well on hard, open-ended questions.</li><li>Often have a <strong>small context window</strong>: the most tokens they can read at once.</li></ul><p>practice-tiny can read <strong>300 tokens</strong>. Ask Rao\'s full prompt is 321, so it refuses:</p><pre><code>The prompt is 321 tokens, but practice-tiny can only read 300.</code></pre><p>The fix isn\'t a bigger model. It\'s a smaller prompt: send only the three help-page lines closest to the question (the vector store from Chapter 1). That\'s about 56 to 79 tokens, and practice-tiny scores <strong>20 of 30</strong>, the same as the big models.</p><p>Small models shine at narrow jobs: sorting messages, pulling out an order number, short answers from given text. Give them the right few lines and they punch above their size.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Too long, then just right',
      caption: 'The full page fails; three retrieved lines work.',
      code: 'from teyro_ai import PracticeModel, VectorStore\n\npolicies = open("rao_policies.md").read()\ntiny = PracticeModel("practice-tiny")\nquestion = "Is delivery free?"\n\ntry:\n    tiny.reply(question, context=policies)\nexcept ValueError as e:\n    print(e)\n\nstore = VectorStore()\nfor line in policies.splitlines():\n    if line.startswith("- "):\n        store.add(len(store) + 1, line[2:])\nlines = "\\n".join(h["text"] for h in store.search(question, k=3))\nreply = tiny.reply(question, context=lines)\nprint(reply.text, reply.tokens_in, "tokens")\n',
      challenge: 'Try k=2. Does it still answer?',
    },
  ],
  apply: {
    scenario: 'Small and quick.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the context window of practice-tiny from the price cards',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(MODELS["practice-tiny"]["context"])\n',
        hint: 'MODELS["practice-tiny"]["context"]',
        checks: [{ message: 'Print 300', outputEquals: '300' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is a context window?',
        options: [
          { text: 'The most tokens a model can read in one request' },
          { text: 'The browser window the chat appears in', why: 'It\'s a limit on input size, not a screen.' },
          { text: 'How long the model remembers you', why: 'Models don\'t remember between requests by themselves.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good job for a small model, or one for a bigger one?',
        groups: ['Small model', 'Bigger model'],
        items: [
          { text: 'Pull the order number out of a message', group: 0 },
          { text: 'Sort messages into "delivery" or "returns"', group: 0 },
          { text: 'Write a careful reply to an angry, complicated complaint', group: 1 },
          { text: 'Plan a whole new returns policy', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the practice-tiny fact to its value.',
        pairs: [
          ['Context window', '300 tokens'],
          ['Speed', '200 tokens a second'],
          ['Price', '$0'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'practice-tiny can\'t even read the help page. Useless.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'It can\'t read the WHOLE page. Send it the three lines that matter and it gets 20 of 30, same as the big ones.' },
          { text: 'Agreed, bin it.', why: 'With a smaller prompt it does the job.' },
          { text: 'Cut the help page in half at random.', why: 'Send the lines that match the question, not a random half.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'practice-tiny reads up to 300 tokens. What does this print?',
        code: 'prompt_tokens = 321\nprint(prompt_tokens <= 300)',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '321 is more than 300.' },
          { text: '21', why: 'It compares; it doesn\'t subtract.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many tokens over practice-tiny\'s limit the full 321-token prompt is',
        starter: 'from teyro_ai import MODELS\n\nprompt_tokens = 321\n',
        solution: 'from teyro_ai import MODELS\n\nprompt_tokens = 321\nprint(prompt_tokens - MODELS["practice-tiny"]["context"])\n',
        hint: 'prompt_tokens - MODELS["practice-tiny"]["context"]',
        checks: [{ message: 'Print 21', outputEquals: '21' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The small-model fix.',
        template: 'Don\'t pick a bigger [[1]]; send a smaller [[2]].',
        blanks: [['model'], ['prompt']],
        distractors: ['bill', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line will make practice-tiny refuse?',
        language: 'python',
        lines: ['tiny = PracticeModel("practice-tiny")', 'policies = open("rao_policies.md").read()', 'tiny.reply("Is delivery free?", context=policies)', 'print("done")'],
        bug: 2,
        fix: 'tiny.reply("Is delivery free?", context=lines)  # only the top 3 lines',
        explanation: 'The full page plus question is 321 tokens, over the 300 limit.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many help-page lines did practice-tiny need to score 20 of 30?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'A small tool that does one job well, or a big one that does everything? Think of an example from your own life.',
    starters: ['I\'d pick the small one when...', 'The big one is worth it when...'],
  },
  deepen: {
    title: 'Models on your phone',
    summary: 'Phone makers now ship small models that run on the device itself, so some features work offline and the text never leaves the phone. Small models are a growing part of the stack.',
  },
  notes: 'Measured with teyro_ai: practice-tiny context 300, speed 200, $0. Full prompt (policies 316 + "Is delivery free?") = 321 tokens -> ValueError. VectorStore over the 15 policy bullets: k=2 -> 17/30 (max 54 tokens in), k=3 -> 20/30 (max 79 tokens in). "Is delivery free?" with k=3: "Delivery is free on orders over ₹999.", 56 tokens in.',
};

export default lesson;
