import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16 — Kavya's laptop experiment: myths about running AI locally. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Kavya\'s laptop experiment',
  summary: 'Kavya gives the laptop one last test: the tiny practice model, with the whole help page in the prompt. It refuses outright. The page is too long for it to read. Time to sort what local models can and can\'t do.',
  minutes: 11,
  outcomes: [
    'Separate myths from facts about running models locally',
    'Know that small models have small context windows',
    'Check whether a prompt fits a model\'s window',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A model you run yourself is completely free.',
          isFact: false,
          explain: 'Myth. You pay in hardware, electricity, your time and the speed customers get. "No bill" isn\'t "no cost".',
        },
        {
          text: 'Small local models can usually read less text at once than big hosted ones.',
          isFact: true,
          explain: 'Fact. The practice-tiny model reads 300 tokens; the help page alone is 316. Lesson 7 of Chapter 3 explains context windows.',
        },
        {
          text: 'Running a model locally keeps your data on your own machine.',
          isFact: true,
          explain: 'Fact, and it\'s one of the best reasons to do it.',
        },
        {
          text: 'A local model is just as good as the biggest hosted model.',
          isFact: false,
          explain: 'Myth. The small models that fit on a laptop usually know less and reason less well. For simple jobs, that may be fine. Test it.',
        },
        {
          text: 'Local models are great for trying ideas quickly and privately.',
          isFact: true,
          explain: 'Fact. Which is exactly how the team will keep using Kavya\'s laptop.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Too long to read',
      caption: 'The practice-tiny model can read 300 tokens.',
      code: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\nprint("Help page:", count_tokens(policies), "tokens")\nprint("practice-tiny can read:", MODELS["practice-tiny"]["context"])\nprint("model-b can read:", MODELS["model-b"]["context"])\n',
      challenge: 'Ask PracticeModel("practice-tiny") a question with the help page as context. Read the error.',
    },
  ],
  apply: {
    scenario: 'What local models can do.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print True if the help page is longer than practice-tiny\'s context window, otherwise False',
        starter: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\nprint(count_tokens(policies) > MODELS["practice-tiny"]["context"])\n',
        hint: 'count_tokens(policies) > MODELS["practice-tiny"]["context"]',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact about local models?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Completely free', group: 0 },
          { text: 'Keeps data on your machine', group: 1 },
          { text: 'As good as the biggest models', group: 0 },
          { text: 'Good for quick, private experiments', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did practice-tiny refuse the help page?',
        options: [
          { text: 'It doesn\'t like shops', why: 'It\'s about length, not content.' },
          { text: 'The page (316 tokens) is longer than it can read at once (300)' },
          { text: 'The laptop was off', why: 'The model itself refused: the prompt was too long.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to how many tokens it can read at once (practice cards).',
        pairs: [
          ['practice-tiny', '300'],
          ['model-c', '32,000'],
          ['model-b', '128,000'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Fine, the laptop loses. Was the whole experiment a waste?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, a total waste.', why: 'It taught the team the key limits quickly.' },
          { text: 'Ship it anyway.', why: 'It can\'t even read the help page.' },
          { text: 'No: you found the limits of memory, speed and context in a day, for free. And it stays our private test bench.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two costs of "free".',
        template: 'A local model has no bill, but you still pay in [[1]] and in customers\' [[2]].',
        blanks: [['hardware', 'electricity', 'time'], ['waiting', 'time', 'patience']],
        distractors: ['coins', 'logos'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import MODELS\nprint(MODELS["model-c"]["kind"])',
        language: 'python',
        options: [
          { text: 'open-weight' },
          { text: 'closed', why: 'model-c is the open-weight one on the practice cards.' },
          { text: 'model-c', why: 'It prints the value stored under "kind".' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s notes is a myth?',
        lines: [
          'Local models keep data private.',
          'They work offline.',
          'They cost nothing at all to run.',
          'Small ones read less text at once.',
        ],
        bug: 2,
        fix: 'They have no bill, but cost hardware, power and time.',
        explanation: '"No bill" isn\'t "no cost".',
      },
      {
        kind: 'mcq',
        prompt: 'How will the team use the laptop from now on?',
        options: [
          { text: 'To serve every customer', why: 'Too slow, too small and not reliable enough.' },
          { text: 'Not at all', why: 'It\'s still useful for experiments.' },
          { text: 'As a private test bench for trying models and prompts' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tokens is the shop\'s help page?',
        answers: ['316'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya\'s "free" idea had hidden costs. What "free" thing have you used that turned out to cost time, data or attention?',
    starters: ['I used a free...', 'It cost me...'],
  },
  deepen: {
    title: 'Context windows',
    summary: 'How much text a model can read at once is its context window. Big hosted models read whole books; small local ones much less. Chapter 3 explains why it matters even when it fits.',
  },
  notes: 'teyro_ai: count_tokens(rao_policies.md) = 316; MODELS context: practice-tiny 300, model-c 32,000, model-b and model-a 128,000 (practice cards). PracticeModel("practice-tiny") raises ValueError on the full page (pinned in teyro-ai-selftest).',
};

export default lesson;
