import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3 — Memory is the limit: parameters × bytes per parameter. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Memory is the limit',
  summary: 'Before choosing any chip, Joel needs one number: how much memory does the model need just to sit on the chip? It turns out to be the simplest sum in the whole course.',
  minutes: 12,
  outcomes: [
    'Work out a model\'s memory: parameters × bytes per parameter',
    'Know what "16-bit", "8-bit" and "4-bit" mean for size',
    'Check whether a model fits on a chip',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Joel\'s sum',
      text: 'A 7B model has 7 billion parameters. Stored at 16 bits, each takes 2 bytes. So it needs 14 GB just to hold its numbers. A gaming GPU with 24 GB holds it. A 70B model needs 140 GB, so it needs several big chips, or shrinking.',
      hotspots: [
        { phrase: '7 billion parameters', note: 'The "7B" in a model\'s name. Each parameter is one number.' },
        { phrase: 'Stored at 16 bits, each takes 2 bytes', note: 'A byte is 8 bits. 32-bit numbers take 4 bytes, 16-bit 2 bytes, 8-bit 1 byte, 4-bit half a byte.' },
        { phrase: 'it needs 14 GB', note: '7,000,000,000 x 2 bytes = 14,000,000,000 bytes = 14 GB. Running it needs a bit more on top for working memory.' },
        { phrase: 'A gaming GPU with 24 GB holds it', note: 'Memory, not speed, is usually the first limit: if the model doesn\'t fit, it doesn\'t run.' },
        { phrase: 'or shrinking', note: 'Storing each number in fewer bits (quantisation) shrinks the model: 70B at 4 bits is 35 GB. Lesson 9.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Will it fit?',
      caption: 'Change the model size and the bytes per parameter.',
      code: 'parameters = 7_000_000_000\nbytes_each = 2          # 16-bit\ngpu_gb = 24\n\nneeded_gb = parameters * bytes_each / 1_000_000_000\nprint(f"Needs {needed_gb} GB")\nprint("Fits" if needed_gb < gpu_gb else "Too big")\n',
      challenge: 'Try a 70B model. Then try it at 4 bits (bytes_each = 0.5).',
    },
  ],
  apply: {
    scenario: 'Will the model fit?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the GB needed for an 8-billion-parameter model at 16 bits (2 bytes each)',
        starter: 'parameters = 8_000_000_000\nbytes_each = 2\n',
        solution: 'parameters = 8_000_000_000\nbytes_each = 2\nprint(parameters * bytes_each / 1_000_000_000)\n',
        hint: 'parameters * bytes_each / 1_000_000_000',
        checks: [{ message: 'Print 16.0', outputEquals: '16.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number format to bytes per parameter.',
        pairs: [
          ['32-bit', '4 bytes'],
          ['16-bit', '2 bytes'],
          ['8-bit', '1 byte'],
          ['4-bit', 'Half a byte'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A 70B model at 16 bits needs about how much memory just for its numbers?',
        options: [
          { text: '70 GB', why: 'That\'s at 8 bits (1 byte each). 16 bits is 2 bytes.' },
          { text: '140 GB' },
          { text: '14 GB', why: 'That\'s a 7B model.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'A 70B model at 4 bits (0.5 bytes each). Print the GB it needs',
        starter: 'parameters = 70_000_000_000\nbytes_each = 0.5\n',
        solution: 'parameters = 70_000_000_000\nbytes_each = 0.5\nprint(parameters * bytes_each / 1_000_000_000)\n',
        hint: 'Same formula with 0.5',
        checks: [{ message: 'Print 35.0', outputEquals: '35.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it fit on a 24 GB gaming GPU (just the weights)?',
        groups: ['Fits', 'Too big'],
        items: [
          { text: '7B at 16-bit (14 GB)', group: 0 },
          { text: '70B at 16-bit (140 GB)', group: 1 },
          { text: '8B at 8-bit (8 GB)', group: 0 },
          { text: '70B at 4-bit (35 GB)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The biggest model we found is 405B. Can we run it?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, on the laptop.', why: '810 GB is far beyond any laptop.' },
          { text: 'Size doesn\'t matter for memory.', why: 'Memory grows directly with the number of parameters.' },
          { text: 'At 16 bits that\'s 810 GB just for its numbers: a rack of big chips. For shop questions, a much smaller model is the sensible place to start.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The memory formula.',
        template: 'memory = [[1]] x bytes per [[2]]',
        blanks: [['parameters'], ['parameter']],
        distractors: ['tokens', 'users'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'needed_gb = 14\ngpu_gb = 24\nprint("Fits" if needed_gb < gpu_gb else "Too big")',
        language: 'python',
        options: [
          { text: 'Fits' },
          { text: 'Too big', why: '14 is less than 24.' },
          { text: '14', why: 'It prints one of the two words.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This prints 28.0 GB for a 7B model at 16 bits. Which line?',
        language: 'python',
        lines: ['parameters = 7_000_000_000', 'bytes_each = 4', 'print(parameters * bytes_each / 1_000_000_000)'],
        bug: 1,
        fix: 'bytes_each = 2',
        explanation: '16 bits is 2 bytes. 4 bytes is 32-bit.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many GB does a 7B model need at 16 bits, just for its numbers?',
        answers: ['14', '14 GB', '14gb'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Memory decides what fits before speed even matters. Where else is "will it fit?" the first question (a car, a suitcase, a room)?',
    starters: ['Before anything else, I check...', 'Like a model, it...'],
  },
  deepen: {
    title: 'Working memory',
    summary: 'The weights are only part of it. Running a model also needs room for the conversation so far (the "KV cache"), which grows with long chats. A safe rule: plan for about 20% more than the weights.',
  },
  notes: 'Memory for weights = parameters x bytes per parameter (fp32 4 B, fp16/bf16 2 B, int8 1 B, 4-bit 0.5 B). 7B fp16 = 14 GB; 8B fp16 = 16 GB; 70B fp16 = 140 GB; 70B 4-bit = 35 GB; 405B fp16 = 810 GB. GB = 10^9 bytes here. 24 GB is a common high-end consumer GPU memory size (e.g. Nvidia RTX 4090). KV cache and activations add more at run time.',
};

export default lesson;
