import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1 — Why AI needs special chips: Kavya's plan to run a model on the office laptop. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why AI needs special chips',
  summary: 'Kavya has a plan to make Ask Rao free: "We download an open model and run it on the office laptop." Arjun doesn\'t say no. He says: "Try it, and time it." The laptop fan starts screaming.',
  minutes: 10,
  outcomes: [
    'Explain why AI models need so much computing',
    'Know that a model is mostly numbers to multiply',
    'Work out how many multiplications a reply needs',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The screaming laptop',
      beats: [
        { speaker: 'kavya', text: 'Open-weight model, downloaded. Running on the office laptop. No bills, ever.' },
        { speaker: 'narrator', text: 'Kavya types "Is delivery free?". The fan roars. Forty seconds later the first words appear, one at a time.' },
        { speaker: 'joel', text: 'Why is it so slow? The laptop opens spreadsheets instantly.' },
        { speaker: 'arjun', text: 'A model is billions of numbers. To write each token, the computer multiplies your text by almost all of them. A spreadsheet does a few thousand sums. This does billions, for every single token.' },
        { speaker: 'tey', text: 'That\'s why AI runs on chips built to do enormous numbers of multiplications at the same time. This chapter is about those chips, where they come from, and how you rent them.' },
      ],
      choice: {
        prompt: 'What should Kavya conclude from the experiment?',
        options: [
          { text: 'The laptop works for testing, but not for customers. The real question is which chips, where, and at what cost.', outcome: 'Exactly the question this chapter answers, with numbers.', best: true },
          { text: 'AI is too slow to be useful.', outcome: 'On the right chips, the same model replies in about a second.' },
          { text: 'Buy a faster laptop.', outcome: 'Laptops aren\'t built for this kind of work. There are better, cheaper options.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Billions of multiplications',
      caption: 'A rough rule: about 2 multiply-and-add steps per parameter, per token.',
      code: 'parameters = 7_000_000_000   # a "7B" model\ntokens = 13                  # a short reply\nsteps = 2 * parameters * tokens\nprint(f"{steps:,} steps")\n',
      challenge: 'How many steps for a 300-token reply?',
    },
  ],
  apply: {
    scenario: 'Why chips matter.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why was the laptop so slow?',
        options: [
          { text: 'Each token needs billions of multiplications, and laptops aren\'t built for that' },
          { text: 'The question was too long', why: '"Is delivery free?" is 5 tokens. The model is the heavy part.' },
          { text: 'The internet was slow', why: 'It ran on the laptop itself, with no internet needed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'About 2 steps per parameter per token. Print the steps for a 7-billion-parameter model writing 1 token, with commas',
        starter: 'parameters = 7_000_000_000\ntokens = 1\n',
        solution: 'parameters = 7_000_000_000\ntokens = 1\nprint(f"{2 * parameters * tokens:,}")\n',
        hint: 'f"{2 * parameters * tokens:,}"',
        checks: [{ message: 'Print 14,000,000,000', outputEquals: '14,000,000,000' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Light work for a laptop, or heavy work for special chips?',
        groups: ['Light', 'Heavy'],
        items: [
          { text: 'Adding up a spreadsheet', group: 0 },
          { text: 'Writing a reply with a 7B model', group: 1 },
          { text: 'Opening an email', group: 0 },
          { text: 'Training a model', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So my free plan doesn\'t work?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It works for experiments. For customers you need the right chips. The question is whether to rent them or pay someone who already has them.' },
          { text: 'Running models yourself is always wrong.', why: 'It can be right, on the right hardware and at the right scale.' },
          { text: 'Yes, it\'s free forever.', why: 'The laptop took 40 seconds for one reply. Customers won\'t wait.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What is a model, at the level of the chip?',
        options: [
          { text: 'Billions of numbers that get multiplied with your text' },
          { text: 'A big list of answers', why: 'It stores numbers, not answers. Answers are computed.' },
          { text: 'A tiny program a few lines long', why: 'The code is small; the numbers are enormous.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s explanation.',
        template: 'A model is billions of [[1]]. Each token needs billions of [[2]].',
        blanks: [['numbers', 'parameters'], ['multiplications', 'calculations']],
        distractors: ['words', 'emails'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{2 * 1_000_000_000 * 10:,}")',
        language: 'python',
        options: [
          { text: '20,000,000,000' },
          { text: '2,000,000,000', why: 'The 10 tokens multiply it by 10.' },
          { text: '20000000000', why: 'The :, adds commas.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in Kavya\'s notes is wrong?',
        lines: [
          'The model ran on the laptop.',
          'The first reply took about 40 seconds.',
          'Longer replies will be just as fast as short ones.',
          'Customers won\'t wait that long.',
        ],
        bug: 2,
        fix: 'Longer replies take longer: the work happens for every token.',
        explanation: 'The work is repeated for each token, so a reply 20 times longer takes about 20 times as long.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning.',
        pairs: [
          ['Parameter', 'One of the model\'s numbers'],
          ['7B', 'About 7 billion parameters'],
          ['Token', 'A small piece of text'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parameters does a "7B" model have, roughly? (in words: 7 ...)',
        answers: ['7 billion', 'seven billion', 'billion'],
        placeholder: '7 ...',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya\'s experiment "failed", but she learned the most important fact of the chapter. When did a failed experiment teach you something useful?',
    starters: ['I tried...', 'It taught me...'],
  },
  deepen: {
    title: 'A rule of thumb',
    summary: 'Running a model takes roughly 2 calculation steps per parameter for each token it reads or writes. It\'s rough, but good enough to see why a 70B model needs ten times the hardware of a 7B one.',
  },
  notes: 'Rule of thumb: a forward pass costs roughly 2 x parameters FLOPs per token (multiply + add). 7e9 x 2 = 1.4e10. Laptop timing in the story is illustrative, not a benchmark.',
};

export default lesson;
