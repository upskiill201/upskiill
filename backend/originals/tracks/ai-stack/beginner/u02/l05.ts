import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: why chips, CPU vs GPU, memory, the supply chain. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the chip layer',
  summary: 'Kavya\'s laptop experiment is over. The team knows why AI needs GPUs, how to tell if a model fits, and where the chips come from. Quick check before they look at renting them.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Do the memory and workers maths without notes', 'Explain the chip supply chain'],
  learn: [
    {
      kind: 'story',
      title: 'The whiteboard',
      beats: [
        { speaker: 'narrator', text: 'On the whiteboard, in Joel\'s writing: "memory = parameters x bytes. 7B at 16-bit = 14 GB. Laptop = no. Rent = maybe."' },
        { speaker: 'kavya', text: 'Fine. My laptop retires from AI.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the chip layer.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the GB needed for a 13-billion-parameter model at 8 bits (1 byte each)',
        starter: 'parameters = 13_000_000_000\nbytes_each = 1\n',
        solution: 'parameters = 13_000_000_000\nbytes_each = 1\nprint(parameters * bytes_each / 1_000_000_000)\n',
        hint: 'parameters * bytes_each / 1_000_000_000',
        checks: [{ message: 'Print 13.0', outputEquals: '13.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why do GPUs suit AI better than CPUs?',
        options: [
          { text: 'GPUs are newer', why: 'It\'s about how many small workers they have.' },
          { text: 'AI is millions of independent multiplications, and GPUs do thousands at once' },
          { text: 'CPUs can\'t multiply', why: 'They can; they just have far fewer workers.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the size to the memory needed (weights only).',
        pairs: [
          ['7B at 16-bit', '14 GB'],
          ['70B at 16-bit', '140 GB'],
          ['70B at 4-bit', '35 GB'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Designs chips, or manufactures them?',
        groups: ['Designs', 'Manufactures'],
        items: [
          { text: 'Nvidia', group: 0 },
          { text: 'TSMC', group: 1 },
          { text: 'Google (TPUs)', group: 0 },
          { text: 'A foundry', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print "Fits" if the model fits on the GPU, otherwise "Too big"',
        starter: 'needed_gb = 35\ngpu_gb = 24\n',
        solution: 'needed_gb = 35\ngpu_gb = 24\nif needed_gb < gpu_gb:\n    print("Fits")\nelse:\n    print("Too big")\n',
        hint: 'if needed_gb < gpu_gb:',
        checks: [{ message: 'Print Too big', outputEquals: 'Too big' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gets the memory wrong?',
        language: 'python',
        lines: ['parameters = 70_000_000_000', 'bytes_each = 2', 'needed_gb = parameters + bytes_each', 'print(needed_gb)'],
        bug: 2,
        fix: 'needed_gb = parameters * bytes_each / 1_000_000_000',
        explanation: 'Multiply parameters by bytes, then divide by a billion for GB.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Next idea: we buy the biggest GPU and keep it under my desk.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, buy three.', why: 'At Mr Rao\'s volume, owning hardware wastes money.' },
          { text: 'GPUs can\'t be bought.', why: 'They can. The question is whether it\'s worth it.' },
          { text: 'Let\'s first compare renting by the hour and paying per answer. Owning hardware only pays off at a scale we don\'t have.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Bits to bytes.',
        template: '16-bit is [[1]] bytes per parameter; 4-bit is [[2]] a byte.',
        blanks: [['2', 'two'], ['half']],
        distractors: ['16', 'four'],
      },
      {
        kind: 'mcq',
        prompt: 'Which company makes the machines that print the most advanced chips?',
        options: [
          { text: 'ASML' },
          { text: 'TSMC', why: 'TSMC uses the machines to make chips; ASML makes the machines.' },
          { text: 'Nvidia', why: 'Nvidia designs chips.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(2 * 1_000_000 * 3)',
        language: 'python',
        options: [
          { text: '2000003', why: 'All three are multiplied.' },
          { text: '6,000,000', why: 'Without :, there are no commas.' },
          { text: '6000000' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 24 GB GPU. Does a 14 GB model fit? (yes or no)',
        answers: ['yes'],
        placeholder: 'yes or no',
      },
    ],
  },
  reflect: {
    prompt: 'Which surprised you more: how much memory models need, or how few places can make the chips?',
    starters: ['I was more surprised by...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. 13B at 1 byte = 13.0 GB; 35 > 24 -> Too big.',
};

export default lesson;
