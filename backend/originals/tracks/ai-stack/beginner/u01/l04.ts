import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — Myths about AI apps: one model, knows your shop, free. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Myths about AI apps',
  summary: 'Kavya asks the practice model about the shop\'s return policy. It answers instantly and confidently: 60 days, full refund, no questions asked. The real policy is 7 days, unworn, tags on.',
  minutes: 11,
  outcomes: [
    'Spot four common myths about AI apps',
    'See a model answer confidently about a shop it has never seen',
    'Fix the answer by giving it the shop\'s facts',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A model knows the facts about your own business.',
          isFact: false,
          explain: 'Myth. It has never seen your policies, prices or orders. Ask anyway and it often invents a confident, plausible answer. That\'s called a hallucination.',
        },
        {
          text: 'An AI app is just one model.',
          isFact: false,
          explain: 'Myth. The model is one layer. Getting the right facts in, the right steps, the checks and the app around it are the other five.',
        },
        {
          text: 'Every AI answer costs money to produce.',
          isFact: true,
          explain: 'Fact. Every token is computed on real chips. One answer can cost a fraction of a rupee, but thousands a day add up.',
        },
        {
          text: 'Giving the model the right document in the prompt can fix many wrong answers.',
          isFact: true,
          explain: 'Fact. With the shop\'s help page in front of it, the practice model answers "7 days". That idea, retrieval, is Chapter 6.',
        },
        {
          text: 'If an answer sounds confident, it is probably right.',
          isFact: false,
          explain: 'Myth. Models sound just as sure when they\'re wrong. Confidence is a writing style, not evidence.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'With and without the facts',
      caption: 'Same question, twice.',
      code: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\nquestion = "What is your return policy?"\n\nprint(model.reply(question))\n\npolicies = open("rao_policies.md").read()\nprint(model.reply(question, context=policies))\n',
      challenge: 'Try "How long does delivery to Pune take?" with and without the policies.',
    },
  ],
  apply: {
    scenario: 'Myths, and the made-up return policy.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "What is your return policy?" WITHOUT any context and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\n',
        solution: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\nprint(model.reply("What is your return policy?"))\n',
        hint: 'print(model.reply("What is your return policy?"))',
        checks: [{ message: 'Print the made-up 60-day answer', outputIncludes: '60 days' }],
      },
      {
        kind: 'mcq',
        prompt: 'The model said 60 days. The shop\'s policy is 7. What happened?',
        options: [
          { text: 'It made up a plausible answer about a shop it has never seen: a hallucination' },
          { text: 'The shop changed its policy', why: 'The policy is 7 days. The model was never shown it.' },
          { text: 'It looked it up on the shop\'s website', why: 'It looked nothing up. It guessed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Now give it the shop\'s policies as context and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\nmodel = PracticeModel()\npolicies = open("rao_policies.md").read()\nprint(model.reply("What is your return policy?", context=policies))\n',
        hint: 'model.reply("...", context=policies)',
        checks: [
          { message: 'Print the real 7-day policy', outputIncludes: '7 days' },
          { message: 'Pass the policies as context', codeIncludes: 'context=' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'The model knows our prices', group: 0 },
          { text: 'Every answer has a cost', group: 1 },
          { text: 'Confident means correct', group: 0 },
          { text: 'The right document can fix a wrong answer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'It said 60 days so confidently. How was I meant to know?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'We can\'t tell from how it sounds. We have to give it our facts, and test it against answers we know.' },
          { text: 'Confident answers are always right.', why: 'It was confident and wrong.' },
          { text: 'Never use AI.', why: 'With the right facts in the prompt, it got it right.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"It knows our shop"', 'It has never seen the shop\'s data'],
          ['"It\'s just one model"', 'It\'s six layers working together'],
          ['"Confident means right"', 'Confidence is a style, not evidence'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Name the problem.',
        template: 'A confident, made-up answer is called a [[1]]. Giving the model the right [[2]] helps prevent it.',
        blanks: [['hallucination'], ['document', 'documents', 'facts']],
        distractors: ['feature', 'emoji'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the risky line in Kavya\'s launch plan.',
        lines: [
          'Connect the model to the chat box.',
          'Let it answer return questions from what it already knows.',
          'Show answers to customers straight away.',
          'Check the logs next month.',
        ],
        bug: 1,
        fix: 'Give it the shop\'s policies with every policy question.',
        explanation: 'Without the facts, it makes up policies, like 60 days.',
      },
      {
        kind: 'mcq',
        prompt: 'What does context= do in model.reply(question, context=policies)?',
        options: [
          { text: 'Puts the shop\'s facts into the prompt so the model can answer from them' },
          { text: 'Trains the model permanently', why: 'It only adds facts to this one prompt.' },
          { text: 'Makes the answer longer', why: 'It changes what the answer is based on.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days does Mr Rao\'s shop really allow for returns?',
        answers: ['7', 'seven', '7 days'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The made-up 60-day policy sounded believable. Where could a confident wrong answer from an AI cause real harm at work or at home?',
    starters: ['It could cause harm when...', 'To prevent it, I\'d...'],
  },
  deepen: {
    title: 'Why models make things up',
    summary: 'A model is trained to write likely-sounding text, not to check facts. When it lacks the facts, a likely-sounding answer comes out anyway. Chapter 3 shows how.',
  },
  notes: 'teyro_ai practice model without context answers "What is your return policy?" with the made-up 60-day line; with rao_policies.md as context it answers "You can return or exchange an item within 7 days of delivery." The shop\'s real policy (made-up shop) is in rao_policies.md.',
};

export default lesson;
