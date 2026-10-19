import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9 — Running models on your own machine: local runtimes and shrinking models. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Running models on your own machine',
  summary: 'Kavya isn\'t giving up on her laptop. She finds a local runtime that downloads smaller, "shrunk" versions of open models. This time the reply takes four seconds, not forty.',
  minutes: 12,
  outcomes: [
    'Know what a local runtime does',
    'Explain shrinking a model (quantisation) and its trade-off',
    'Work out a shrunk model\'s size',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Kavya\'s second try',
      steps: [
        { title: '1. A local runtime', body: 'Tools such as Ollama download open-weight models and run them on your own computer, with no cloud and no per-answer bill.' },
        { title: '2. Shrink the numbers', body: 'Instead of 16 bits per parameter, store 4. The model gets four times smaller. This is called quantisation.', code: 'parameters = 7_000_000_000\nprint(parameters * 2 / 1e9)     # 16-bit: 14.0 GB\nprint(parameters * 0.5 / 1e9)   # 4-bit: 3.5 GB', language: 'python' },
        { title: '3. Now it fits', body: 'At 3.5 GB, a 7B model fits comfortably in a laptop\'s memory, and runs much faster than the full-size version did.' },
        { title: '4. The trade-off', body: 'Rounding every number to fewer bits loses a little accuracy. For simple shop questions, often not enough to notice. For hard reasoning, sometimes it is. Test it.' },
        { title: '5. Good for', body: 'Private experiments, working offline, and development. For customers at scale, the team still needs something steadier than one laptop.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Shrink it',
      caption: 'Bytes per parameter: 2 (16-bit), 1 (8-bit), 0.5 (4-bit).',
      code: 'parameters = 7_000_000_000\nfor bits, bytes_each in [(16, 2), (8, 1), (4, 0.5)]:\n    gb = parameters * bytes_each / 1_000_000_000\n    print(f"{bits}-bit: {gb} GB")\n',
      challenge: 'Do the same for a 70B model. Which version fits in 48 GB?',
    },
  ],
  apply: {
    scenario: 'Shrinking a model to fit.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the size in GB of a 7B model at 4 bits (0.5 bytes each)',
        starter: 'parameters = 7_000_000_000\nbytes_each = 0.5\n',
        solution: 'parameters = 7_000_000_000\nbytes_each = 0.5\nprint(parameters * bytes_each / 1_000_000_000)\n',
        hint: 'parameters * bytes_each / 1_000_000_000',
        checks: [{ message: 'Print 3.5', outputEquals: '3.5' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is quantisation?',
        options: [
          { text: 'Storing each parameter in fewer bits, so the model is smaller' },
          { text: 'Training a model on more data', why: 'It shrinks an existing model; no new training.' },
          { text: 'Splitting a model across many GPUs', why: 'That\'s a different way to fit big models.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'A 7B model. Match the format to its size.',
        pairs: [
          ['16-bit', '14 GB'],
          ['8-bit', '7 GB'],
          ['4-bit', '3.5 GB'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good use for a local runtime, or not?',
        groups: ['Good use', 'Not ideal'],
        items: [
          { text: 'Trying models privately on your laptop', group: 0 },
          { text: 'Serving thousands of customers from one laptop', group: 1 },
          { text: 'Working on a plane, offline', group: 0 },
          { text: 'A shop assistant that must never go down', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: '4-bit is four times smaller. Why not shrink everything to 1 bit?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Every bit you remove rounds the numbers more. Go too far and answers get noticeably worse. 4 or 8 bits is a common balance; test on your own questions.' },
          { text: 'Yes, 1 bit is always fine.', why: 'Quality drops as precision drops.' },
          { text: 'Models can\'t be shrunk.', why: 'They can; that\'s quantisation.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The trade-off.',
        template: 'Fewer bits means a [[1]] model, but slightly lower [[2]].',
        blanks: [['smaller'], ['quality', 'accuracy']],
        distractors: ['louder', 'price'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(70_000_000_000 * 0.5 / 1_000_000_000)',
        language: 'python',
        options: [
          { text: '35.0' },
          { text: '140.0', why: 'That\'s 16-bit. 0.5 bytes is 4-bit.' },
          { text: '70.0', why: 'That\'s 8-bit.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s launch plan is the problem?',
        lines: [
          'Test a 4-bit model locally with the shop\'s questions.',
          'Compare its answers with model-b.',
          'Serve every customer from my laptop at home.',
          'Keep the laptop version for private experiments.',
        ],
        bug: 2,
        fix: 'Serve customers from a steady provider; keep local for testing.',
        explanation: 'One laptop can go offline, get slow, or run out of battery.',
      },
      {
        kind: 'mcq',
        prompt: 'Which can a local runtime run?',
        options: [
          { text: 'Open-weight models you can download' },
          { text: 'Closed models that are only available through an API', why: 'Closed models can\'t be downloaded.' },
          { text: 'Any model at all', why: 'Only models whose weights you can get.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the word for shrinking a model by using fewer bits per number? (UK spelling or US spelling)',
        answers: ['quantisation', 'quantization'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Shrinking a model is like compressing a photo: smaller, and a little less sharp. When is "good enough" better than "perfect" in your work?',
    starters: ['Good enough is better when...', 'Perfect matters when...'],
  },
  deepen: {
    title: 'Model files',
    summary: 'Local runtimes download models as files in formats like GGUF, often with the bit size in the name ("Q4"). The name tells you roughly how big it is and how much quality was traded away.',
  },
  notes: 'Ollama: a local runtime for open-weight models (checked 2026-10). Quantisation stores weights at lower precision (8-bit, 4-bit); quality loss is usually small at 8-bit and modest at 4-bit, task-dependent. 7B: 14 / 7 / 3.5 GB; 70B 4-bit 35 GB. GGUF is a common local model file format. Laptop timings in the story are illustrative.',
};

export default lesson;
