import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7 — The context window: how much a model can read at once. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The context window',
  summary: 'In Chapter 2, practice-tiny refused the help page. Joel now learns the name for its limit: the context window. Everything the model reads and writes has to fit inside it.',
  minutes: 11,
  outcomes: [
    'Explain what a context window is',
    'Know that the prompt and the reply share it',
    'Check whether a prompt fits before sending it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Small window, big window',
      before: {
        label: 'practice-tiny (300 tokens)',
        text: 'Help page: 316 tokens. Question: 5. Reply: about 15.\nTotal: about 336, more than 300.\nIt refuses: the prompt doesn\'t fit.',
      },
      after: {
        label: 'model-b (128,000 tokens)',
        text: 'Same help page, question and reply: about 336 tokens.\nFits easily, with room for hundreds of pages more.\nBut every token still costs money and time.',
      },
      notes: [
        'The context window is the most text a model can handle at once: your prompt AND its reply together.',
        'It\'s measured in tokens, not words or pages.',
        'A huge window doesn\'t mean you should fill it: more tokens means more cost, more wait, and more for the model to get lost in.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Will it fit?',
      caption: 'Prompt plus a reply allowance must fit the window.',
      code: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\nprompt_tokens = count_tokens(policies) + count_tokens("Is delivery free?")\nreply_allowance = 50\n\nfor name in ["practice-tiny", "model-c"]:\n    window = MODELS[name]["context"]\n    fits = prompt_tokens + reply_allowance <= window\n    print(f"{name}: needs {prompt_tokens + reply_allowance}, window {window}, fits: {fits}")\n',
      challenge: 'Send only the first 5 bullet lines instead. Does it fit practice-tiny now?',
    },
  ],
  apply: {
    scenario: 'Fitting the window.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print True if the help page plus a 50-token reply fits practice-tiny\'s window, otherwise False',
        starter: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\nprint(count_tokens(policies) + 50 <= MODELS["practice-tiny"]["context"])\n',
        hint: 'count_tokens(policies) + 50 <= MODELS["practice-tiny"]["context"]',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'mcq',
        prompt: 'What has to fit inside the context window?',
        options: [
          { text: 'Only the question', why: 'Everything in the prompt counts, plus the reply.' },
          { text: 'The whole prompt and the reply together' },
          { text: 'Only the reply', why: 'The prompt counts too.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The first 5 bullet lines are 93 tokens. Print True if they plus a 50-token reply fit 300 tokens',
        starter: 'lines_tokens = 93\nreply_allowance = 50\nwindow = 300\n',
        solution: 'lines_tokens = 93\nreply_allowance = 50\nwindow = 300\nprint(lines_tokens + reply_allowance <= window)\n',
        hint: 'lines_tokens + reply_allowance <= window',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the practice model to its window.',
        pairs: [
          ['practice-tiny', '300 tokens'],
          ['model-c', '32,000 tokens'],
          ['model-a', '128,000 tokens'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fits practice-tiny\'s 300-token window, or not?',
        groups: ['Fits', 'Too big'],
        items: [
          { text: '5 bullet lines + reply (about 143)', group: 0 },
          { text: 'Whole help page + reply (about 366)', group: 1 },
          { text: '"Is delivery free?" + reply (about 55)', group: 0 },
          { text: 'Two copies of the help page', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'model-b reads 128,000 tokens. Let\'s send it the whole product list every time!',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Great idea, fill the window.', why: 'Fitting isn\'t free: more tokens, more cost and more confusion.' },
          { text: 'It won\'t fit.', why: 'It fits; that\'s not the problem.' },
          { text: 'It would fit, but we\'d pay for every token on every message, wait longer, and make it harder for the model to find the one product that matters.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fit check.',
        language: 'python',
        template: 'fits = prompt_tokens + reply_allowance [[1]] MODELS[name]["[[2]]"]',
        blanks: [['<='], ['context']],
        distractors: ['>=', 'speed'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(316 + 50 <= 300)',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '366 is more than 300.' },
          { text: '366', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This says the help page fits practice-tiny. Which line is wrong?',
        language: 'python',
        lines: ['prompt_tokens = 316', 'reply_allowance = 50', 'fits = prompt_tokens <= 300 + reply_allowance', 'print(fits)'],
        bug: 2,
        fix: 'fits = prompt_tokens + reply_allowance <= 300',
        explanation: 'The reply uses the window too, so add it to the prompt, not to the limit.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the most text a model can handle at once called? (context ...)',
        answers: ['window', 'context window'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'You can only keep so much in your head at once. When did you lose track of something because there was too much in front of you?',
    starters: ['I lost track when...', 'It helped to...'],
  },
  deepen: {
    title: 'Lost in the middle',
    summary: 'Even when everything fits, models often use facts at the start and end of a long prompt better than ones buried in the middle. Short, relevant context usually beats long context.',
  },
  notes: 'Context window = max tokens of input + output. teyro_ai: practice-tiny 300, model-c 32,000, model-a/b 128,000; help page 316 tokens; first 5 bullet lines 93 tokens. "Lost in the middle" effect: Liu et al. 2023 (arXiv 2307.03172).',
};

export default lesson;
