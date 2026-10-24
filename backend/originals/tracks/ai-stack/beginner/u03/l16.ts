import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16 — The made-up return policy: a post-mortem in myths and facts. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The made-up return policy',
  summary: 'Arjun asks for a post-mortem of Chapter 1\'s worst moment: the "60 days" return policy. With everything the team now knows about models, they can explain exactly why it happened.',
  minutes: 11,
  outcomes: [
    'Explain the 60-day answer with next-token prediction',
    'Separate the real causes from the myths',
    'Show the before and after in one program',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The model said 60 days because it read an old version of the shop\'s policy.',
          isFact: false,
          explain: 'Myth. It never read any version. "Within 60 days" is a common phrase in return policies it learned from, so it was a likely continuation.',
        },
        {
          text: 'The real cause was missing facts: the prompt had no policy in it.',
          isFact: true,
          explain: 'Fact. With the help page in the prompt, the same model says "within 7 days of delivery".',
        },
        {
          text: 'A higher temperature would have fixed it.',
          isFact: false,
          explain: 'Myth. It would only have varied the made-up answer: 60 days one time, 90 days another.',
        },
        {
          text: 'An instruction to say "I don\'t know" would have helped even without the policy.',
          isFact: true,
          explain: 'Fact. With that instruction and no facts, the practice model admits it doesn\'t know instead of inventing.',
        },
        {
          text: 'Testing with a question whose answer we knew would have caught it before customers did.',
          isFact: true,
          explain: 'Fact. "What is your return policy?" should say 7 days. One test, one catch.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Before and after',
      caption: 'The whole post-mortem in four lines.',
      code: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nq = "What is your return policy?"\nprint("Before:", m.reply(q))\nprint("Honest:", m.reply(q, system="If you don\'t know, say you don\'t know."))\nprint("After:", m.reply(q, context=open("rao_policies.md").read()))\n',
      challenge: 'Add a line that checks the "After" answer contains "7 days".',
    },
  ],
  apply: {
    scenario: 'The post-mortem.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the "before" answer (no context) and then the "after" answer (with the help page), on two lines',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nq = "What is your return policy?"\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nq = "What is your return policy?"\nprint(m.reply(q))\nprint(m.reply(q, context=open("rao_policies.md").read()))\n',
        hint: 'One reply without context, one with context=open("rao_policies.md").read()',
        checks: [
          { message: 'Show the made-up 60 days', outputIncludes: '60 days' },
          { message: 'Show the real 7 days', outputIncludes: '7 days' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why "60 days" in particular?',
        options: [
          { text: 'Mr Rao used to offer 60 days', why: 'The model never saw anything about Mr Rao\'s shop.' },
          { text: 'It\'s a common phrase in return policies, so it was a likely next token' },
          { text: 'It\'s random', why: 'Not random: likely, given what it learned.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Would it have prevented the 60-day answer?',
        groups: ['Would help', 'Wouldn\'t help'],
        items: [
          { text: 'The policy in the prompt', group: 0 },
          { text: 'A higher temperature', group: 1 },
          { text: 'An honest "I don\'t know" instruction', group: 0 },
          { text: 'A bigger model with no policy', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the set-up to the answer.',
        pairs: [
          ['No facts, no instruction', '60 days (made up)'],
          ['No facts, honest instruction', '"I don\'t know"'],
          ['The help page as context', '7 days (true)'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Write me the one-line lesson from this post-mortem.',
        prompt: "Joel's best reply?",
        options: [
          { text: '"The model is bad."', why: 'The model did what models do; the set-up was missing.' },
          { text: '"Kavya made a mistake."', why: 'Post-mortems fix systems, not blame people.' },
          { text: '"A model predicts likely text, not true text: give it the facts, let it say I don\'t know, and test with answers we know."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The one-line lesson.',
        template: 'A model predicts [[1]] text, not [[2]] text.',
        blanks: [['likely'], ['true']],
        distractors: ['short', 'long'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With the honest instruction and no facts, what does the practice model say to the return question?',
        code: 'print(m.reply(q, system="If you don\'t know, say you don\'t know."))',
        language: 'python',
        options: [
          { text: 'I don\'t know. That isn\'t in the information I was given.' },
          { text: 'You can return any item within 60 days...', why: 'The instruction lets it admit it doesn\'t know.' },
          { text: 'You can return or exchange an item within 7 days of delivery.', why: 'It hasn\'t been given the policy.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the post-mortem blames the wrong thing?',
        lines: [
          'Cause: no policy in the prompt.',
          'Cause: no instruction to admit not knowing.',
          'Cause: the model is untrustworthy, so we should stop.',
          'Missing check: no test with a known answer.',
        ],
        bug: 2,
        fix: 'The set-up was missing; fixing it fixes the answer.',
        explanation: 'Same model, right set-up: "7 days".',
      },
      {
        kind: 'writeCode',
        prompt: 'Print True if the grounded answer contains "7 days"',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nreply = m.reply("What is your return policy?", context=open("rao_policies.md").read())\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nreply = m.reply("What is your return policy?", context=open("rao_policies.md").read())\nprint("7 days" in reply.text)\n',
        hint: '"7 days" in reply.text',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days does the shop really allow for returns?',
        answers: ['7', 'seven', '7 days'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'A good post-mortem fixes the system, not the person. Think of a mistake at work or school: what system change would have prevented it?',
    starters: ['The mistake was...', 'The system fix would be...'],
  },
  deepen: {
    title: 'Blameless post-mortems',
    summary: 'Tech teams write "blameless" post-mortems: what happened, why, and what changes so it can\'t happen again. People speak up more when they won\'t be blamed.',
  },
  notes: 'teyro_ai practice model on "What is your return policy?": no context -> 60-day line; system with "don\'t know" -> "I don\'t know..."; with rao_policies.md -> "You can return or exchange an item within 7 days of delivery." Pinned in teyro-ai-selftest.',
};

export default lesson;
