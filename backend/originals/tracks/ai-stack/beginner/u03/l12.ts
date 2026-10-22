import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12 — Why models make things up (hallucination), and three defences. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Why models make things up',
  summary: 'A customer asks Ask Rao: "Do you sell shoes for men?" The shop doesn\'t. Kavya\'s test version says "probably yes". Joel\'s version says "I don\'t know". Same model, different set-up.',
  minutes: 12,
  outcomes: [
    'Explain why models hallucinate',
    'Use three defences: facts, an honest instruction, and testing',
    'Compare a made-up answer with a grounded one',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Shoes for men',
      beats: [
        { speaker: 'narrator', text: 'Kavya\'s version, no help page: "Great question! Most shops do, so the answer is probably yes."' },
        { speaker: 'joel', text: 'We don\'t sell men\'s shoes at all. The customer will order, and then what?' },
        { speaker: 'tey', text: 'It predicted the most likely kind of reply. Most shop answers to "do you sell X?" are yes. Without your facts, likely wins over true.' },
        { speaker: 'narrator', text: 'Joel\'s version, with the help page as context: "I don\'t know. That isn\'t in the information I was given."' },
        { speaker: 'arjun', text: 'Three defences, then: give it the facts, tell it to admit when it doesn\'t know, and test it with questions you know the answers to, including ones it shouldn\'t answer.' },
      ],
      choice: {
        prompt: 'Which defence matters most for Ask Rao?',
        options: [
          { text: 'All three together: facts in the prompt, an honest instruction, and testing.', outcome: 'Each one catches what the others miss. That\'s the Ask Rao rule from here on.', best: true },
          { text: 'A bigger model: it won\'t make things up.', outcome: 'Bigger models hallucinate too, just more fluently.' },
          { text: 'Tell customers to double-check everything.', outcome: 'That pushes the work onto them. Fix it in the stack.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Made up vs grounded',
      caption: 'Same question, two set-ups.',
      code: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\npolicies = open("rao_policies.md").read()\nq = "Do you sell shoes for men?"\nprint("No facts:", m.reply(q))\nprint("With facts:", m.reply(q, context=policies))\n',
      challenge: 'Try "Can you deliver to Dubai?" both ways.',
    },
  ],
  apply: {
    scenario: 'Stopping made-up answers.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "Do you sell shoes for men?" with the help page as context and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\npolicies = open("rao_policies.md").read()\nprint(m.reply("Do you sell shoes for men?", context=policies))\n',
        hint: 'context=policies',
        checks: [{ message: 'Print an honest "I don\'t know"', outputIncludes: "I don't know" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the model say "probably yes"?',
        options: [
          { text: 'It looked up the shop\'s products', why: 'It looked nothing up.' },
          { text: 'Without the shop\'s facts, a likely-sounding reply won over a true one' },
          { text: 'It was being rude', why: 'It was predicting, not choosing to mislead.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the defence to how it helps.',
        pairs: [
          ['Facts in the prompt', 'Gives it the true answer to use'],
          ['An honest instruction', 'Lets it say "I don\'t know"'],
          ['Testing with known answers', 'Finds the gaps before customers do'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Made up, or grounded in the shop\'s facts?',
        groups: ['Made up', 'Grounded'],
        items: [
          { text: '"Returns within 60 days"', group: 0 },
          { text: '"Return or exchange within 7 days of delivery"', group: 1 },
          { text: '"Probably yes" to men\'s shoes', group: 0 },
          { text: '"Delivery is free on orders over ₹999"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Bigger models don\'t hallucinate, right?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Right, never.', why: 'All current models can make things up.' },
          { text: 'Only small ones are useful.', why: 'Size isn\'t the cure; the set-up is.' },
          { text: 'They do, just more fluently, which makes it harder to spot. The defences are the same at any size.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With no context and no instruction, what does the practice model say to "Do you sell shoes for men?"',
        code: 'print(m.reply("Do you sell shoes for men?"))',
        language: 'python',
        options: [
          { text: 'Great question! Most shops do, so the answer is probably yes.' },
          { text: 'I don\'t know. That isn\'t in the information I was given.', why: 'That needs the facts or an honest instruction.' },
          { text: 'No.', why: 'Without the facts it can\'t know that.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three defences.',
        template: 'Give it the [[1]], tell it to admit when it doesn\'t [[2]], and [[3]] it.',
        blanks: [['facts'], ['know'], ['test']],
        distractors: ['logo', 'trust'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s launch plan lets made-up answers through?',
        lines: [
          'Put the relevant help-page lines in the prompt.',
          'Tell it to say "I don\'t know" when the answer is missing.',
          'Skip testing: the demo looked fine.',
          'Offer WhatsApp help when it doesn\'t know.',
        ],
        bug: 2,
        fix: 'Test with questions we know the answers to, including impossible ones.',
        explanation: 'A good demo uses friendly questions. Testing finds the gaps.',
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Can you deliver to Dubai?" with the help page as context and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\npolicies = open("rao_policies.md").read()\nprint(m.reply("Can you deliver to Dubai?", context=policies))\n',
        hint: 'context=policies',
        checks: [{ message: 'Print the reply', outputIncludes: 'Pune' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the word for a confident, made-up answer from a model?',
        answers: ['hallucination', 'hallucinations'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'The Dubai question got a Pune delivery line: related, but not an answer. Why is "close but wrong" harder to catch than "obviously wrong"?',
    starters: ['It\'s harder because...', 'To catch it, I\'d...'],
  },
  deepen: {
    title: 'Close but wrong',
    summary: 'With the help page, the practice model answered the Dubai question with "Orders in Pune arrive in 1 to 2 days." It grabbed the closest sentence, not an answer. Chapter 6 tightens retrieval; Chapter 10 tests for it.',
  },
  notes: 'teyro_ai: "Do you sell shoes for men?" no context -> generic "probably yes" line; with rao_policies.md -> "I don\'t know..." (eval Q29). "Can you deliver to Dubai?" with the page -> "Orders in Pune arrive in 1 to 2 days." (a known miss, eval Q30). Hallucination occurs at all model sizes.',
};

export default lesson;
