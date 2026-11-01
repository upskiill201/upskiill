import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2 — CPU vs GPU: a few fast workers vs thousands of small ones. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'CPU vs GPU',
  summary: 'Joel asks why the chip in a gaming computer, a GPU, is better at AI than the main chip in his laptop. Tey explains it with a shop: one brilliant cashier, or a thousand helpers who can each do one small sum.',
  minutes: 11,
  outcomes: [
    'Explain the difference between a CPU and a GPU',
    'Know why "many small workers" suits AI',
    'Work out how long a job takes with more workers',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'One cashier, or a thousand helpers',
      steps: [
        { title: '1. The CPU: a few brilliant workers', body: 'The main chip in every computer has a handful of very fast, very clever cores. Great at doing different, complicated things one after another: running your apps, your browser, your files.' },
        { title: '2. The GPU: thousands of small workers', body: 'A graphics chip has thousands of simpler cores. Each can only do small sums, but they all work at the same time. It was built to colour millions of screen pixels at once.' },
        { title: '3. AI is the GPU\'s kind of job', body: 'A model\'s work is millions of separate multiplications that don\'t depend on each other. Thousands of workers finish them far faster than a few.', code: 'sums = 1_000_000\nprint(sums / 8)      # 8 workers: 125000.0 rounds each\nprint(sums / 8000)   # 8,000 workers: 125.0 rounds each', language: 'python' },
        { title: '4. Not every job splits', body: 'If step 2 needs the answer from step 1, extra workers can\'t help. AI\'s multiplications mostly split well, which is why GPUs fit it so well.' },
        { title: '5. Other AI chips', body: 'GPUs aren\'t the only option. Some companies design chips just for AI, like Google\'s TPUs. Same idea: lots of multiplications at once.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'More workers',
      caption: 'Each worker does one sum per round.',
      code: 'sums = 1_000_000\nfor workers in [8, 80, 8000]:\n    rounds = sums / workers\n    print(f"{workers} workers: {rounds:,.0f} rounds")\n',
      challenge: 'Add 80,000 workers. How many rounds?',
    },
  ],
  apply: {
    scenario: 'CPUs and GPUs.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why are GPUs good at AI?',
        options: [
          { text: 'They are the smartest chips', why: 'Each core is simple. Their strength is numbers, all working at once.' },
          { text: 'They have thousands of small cores that do many multiplications at the same time' },
          { text: 'They were invented for AI', why: 'They were built for graphics; AI happens to need the same kind of work.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: '1,000,000 sums, 8,000 workers, one sum each per round. Print how many rounds it takes',
        starter: 'sums = 1_000_000\nworkers = 8000\n',
        solution: 'sums = 1_000_000\nworkers = 8000\nprint(sums / workers)\n',
        hint: 'sums / workers',
        checks: [{ message: 'Print 125.0', outputEquals: '125.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Better on a CPU, or on a GPU?',
        groups: ['CPU', 'GPU'],
        items: [
          { text: 'Running a web browser', group: 0 },
          { text: 'Millions of multiplications at once', group: 1 },
          { text: 'A step-by-step task where each step needs the last', group: 0 },
          { text: 'Colouring millions of pixels', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the chip to its description.',
        pairs: [
          ['CPU', 'A few fast, clever cores'],
          ['GPU', 'Thousands of simple cores'],
          ['TPU', 'Google\'s chip designed for AI'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'If GPUs are so good, why does my laptop have a CPU?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'CPUs are outdated.', why: 'They\'re still the best at general, step-by-step work.' },
          { text: 'Laptops don\'t have CPUs.', why: 'Every computer has one. Many also have a small GPU.' },
          { text: 'Most of what a laptop does is varied and step-by-step: apps, files, browsing. That\'s CPU work. AI is the unusual job that wants thousands of workers.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(1_000_000 / 80)',
        language: 'python',
        options: [
          { text: '12500.0' },
          { text: '1250.0', why: '1,000,000 / 80 is 12,500.' },
          { text: '80000000', why: 'That\'s multiplying, not dividing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea in one line.',
        template: 'A CPU has a [[1]] brilliant workers; a GPU has [[2]] of small ones.',
        blanks: [['few'], ['thousands']],
        distractors: ['million', 'none'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: [
          'GPUs were first built for graphics.',
          'AI needs many multiplications that can happen at once.',
          'Extra workers always speed up any job.',
          'Some companies design chips only for AI.',
        ],
        bug: 2,
        fix: 'Extra workers only help when the job can be split up.',
        explanation: 'If each step needs the previous answer, the extra workers just wait.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order from fewest workers to most.',
        lines: ['A CPU core', 'A laptop CPU (a handful of cores)', 'A gaming GPU (thousands of cores)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do the letters GPU stand for? (graphics processing ...)',
        answers: ['unit', 'graphics processing unit'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a job at home or work that goes faster with many people (folding clothes) and one that doesn\'t (writing a speech). Why the difference?',
    starters: ['Many hands help with...', 'They don\'t help with...'],
  },
  deepen: {
    title: 'Parallel work',
    summary: 'Doing many pieces of work at the same time is called parallel computing. AI is "embarrassingly parallel" in places: so much of the work splits up that more chips keep helping.',
  },
  notes: 'CPU: few general-purpose cores; GPU: thousands of simpler cores for parallel work (originally graphics); Google TPU: AI accelerator. 1,000,000 / 8000 = 125.0; / 80 = 12500.0. Worker counts are illustrative.',
};

export default lesson;
