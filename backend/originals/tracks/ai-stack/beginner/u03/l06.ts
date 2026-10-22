import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6 — Parameters: what "7B" means. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Parameters: what "7B" means',
  summary: 'Model names are full of numbers: 7B, 70B, 405B. Kavya assumes bigger is always better. Joel works out what the number actually measures, and what it costs.',
  minutes: 11,
  outcomes: [
    'Explain what a model\'s parameter count measures',
    'Know the trade-offs of bigger models',
    'Turn "7B" into a number in Python',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A <strong>parameter</strong> is one of the numbers the model learned in training. "7B" means about 7 billion of them.</p><p>More parameters means more room to store patterns: more facts, more languages, better reasoning, up to a point. But every parameter also has a price:</p><ul><li><strong>Memory:</strong> 2 bytes each at 16-bit (Chapter 2). 70B is 140 GB.</li><li><strong>Speed:</strong> more numbers to multiply for every token, so slower replies.</li><li><strong>Cost:</strong> bigger models cost more per token to run.</li></ul><p>And bigger isn\'t automatically better for <strong>your</strong> job. For "Is delivery free?", with the answer given in the prompt, a small model and a huge one give the same answer, at very different prices. Newer small models are also often better than older big ones, because training methods keep improving.</p><p>So the useful question is never "how big?" but "<strong>what\'s the smallest model that does this job well?</strong>" Chapter 4 answers it for Ask Rao.</p>',
    },
    {
      kind: 'tryIt',
      title: 'From name to number',
      caption: 'Turn "7B" into a real number, then into memory.',
      code: 'name = "7B"\nbillions = int(name[:-1])\nparameters = billions * 1_000_000_000\nprint(f"{parameters:,} parameters")\nprint(f"{parameters * 2 / 1e9} GB at 16-bit")\n',
      challenge: 'Try "70B" and "405B".',
    },
  ],
  apply: {
    scenario: 'What the B means.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "70B" in a model\'s name mean?',
        options: [
          { text: '70 billion users', why: 'It counts the model\'s numbers, not people.' },
          { text: 'About 70 billion parameters (learned numbers)' },
          { text: '70 GB of memory', why: 'At 16-bit it needs 140 GB. The B is billions of parameters.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Turn "13B" into a whole number of parameters and print it with commas',
        starter: 'name = "13B"\n',
        solution: 'name = "13B"\nbillions = int(name[:-1])\nprint(f"{billions * 1_000_000_000:,}")\n',
        hint: 'int(name[:-1]) removes the B; multiply by 1_000_000_000',
        checks: [{ message: 'Print 13,000,000,000', outputEquals: '13,000,000,000' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A cost of bigger models, or a benefit?',
        groups: ['Benefit', 'Cost'],
        items: [
          { text: 'More room for patterns and facts', group: 0 },
          { text: 'More memory needed', group: 1 },
          { text: 'Often better at hard reasoning', group: 0 },
          { text: 'Slower and pricier per token', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: '405B beats 7B. Obviously we use the 405B.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, always the biggest.', why: 'Bigger is slower and pricier, often for no gain on simple jobs.' },
          { text: 'Small models can\'t answer anything.', why: 'Small models handle simple, well-supported questions well.' },
          { text: 'For "Is delivery free?" with the answer in the prompt, both say the same thing. One costs far more and replies slower. Smallest that does the job well wins.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the size to its 16-bit memory.',
        pairs: [
          ['7B', '14 GB'],
          ['70B', '140 GB'],
          ['405B', '810 GB'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = "70B"\nprint(int(name[:-1]))',
        language: 'python',
        options: [
          { text: '70' },
          { text: '70B', why: 'name[:-1] drops the last character, the B.' },
          { text: '7', why: 'It keeps everything except the last character.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The useful question.',
        template: 'What\'s the [[1]] model that does this [[2]] well?',
        blanks: [['smallest'], ['job']],
        distractors: ['biggest', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: [
          'A parameter is one learned number.',
          'Bigger models need more memory.',
          'A bigger model is always better for every job.',
          'Newer small models can beat older big ones.',
        ],
        bug: 2,
        fix: 'Bigger helps some jobs, and costs more on all of them.',
        explanation: 'For simple, well-supported questions, size often adds cost without adding quality.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can a newer small model beat an older big one?',
        options: [
          { text: 'Small models cheat', why: 'They\'re just trained better.' },
          { text: 'They can\'t', why: 'It happens often as methods improve.' },
          { text: 'Training methods and data keep improving' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many GB does a 70B model need at 16 bits?',
        answers: ['140', '140 GB'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Is "bigger is better" true for the tools you use (phones, cars, teams)? When is a smaller one the smarter choice?',
    starters: ['Bigger is better when...', 'Smaller wins when...'],
  },
  deepen: {
    title: 'Mixture of experts',
    summary: 'Some large models only use part of their parameters for each token (a "mixture of experts"). Their total size and their per-token cost can be very different numbers.',
  },
  notes: 'Parameters = learned weights. 13B -> 13,000,000,000. Memory at 2 bytes: 7B 14 GB, 70B 140 GB, 405B 810 GB. Smaller recent models often outperform older larger ones on benchmarks (general trend). Mixture-of-experts models activate a subset of parameters per token.',
};

export default lesson;
