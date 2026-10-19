import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Chapter Challenge. Climax: Ask Rao v0.3, set up like someone who knows what a model is. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ask Rao v0.3',
  summary: 'Arjun\'s challenge: "Set Ask Rao up like someone who knows what\'s inside the model: tokens counted, window checked, temperature chosen, rules written, and no made-up answers." Everything from Chapter 3, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Configure a model call with every Chapter 3 idea', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'story',
      title: 'Version 0.3',
      beats: [
        { speaker: 'narrator', text: 'Joel\'s v0.3 call: model-b, temperature 0, a four-line system prompt, the help page as context, and a check that it all fits.' },
        { speaker: 'arjun', text: 'Every setting explained. That\'s v0.3. Next: choosing the model itself.' },
        { speaker: 'tey', text: 'Your turn: set up Ask Rao v0.3.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ask Rao v0.3.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the v0.3 call: "Is delivery free?", with the help page as context, a system prompt, and temperature 0. Print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel("model-b")\npolicies = open("rao_policies.md").read()\nsystem = "You are Ask Rao. Answer only from the shop information. If it isn\'t there, say you don\'t know."\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel("model-b")\npolicies = open("rao_policies.md").read()\nsystem = "You are Ask Rao. Answer only from the shop information. If it isn\'t there, say you don\'t know."\nprint(m.reply("Is delivery free?", system=system, context=policies, temperature=0))\n',
        hint: 'm.reply("...", system=system, context=policies, temperature=0)',
        checks: [
          { message: 'Print the delivery answer', outputEquals: 'Delivery is free on orders over ₹999.' },
          { message: 'Set temperature 0', codeIncludes: 'temperature=0' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print True if the system prompt, help page, question and a 50-token reply all fit model-c\'s window',
        starter: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\nsystem = "You are Ask Rao. Answer only from the shop information."\nquestion = "Is delivery free?"\n',
        solution: 'from teyro_ai import MODELS, count_tokens\n\npolicies = open("rao_policies.md").read()\nsystem = "You are Ask Rao. Answer only from the shop information."\nquestion = "Is delivery free?"\ntotal = count_tokens(system) + count_tokens(policies) + count_tokens(question) + 50\nprint(total <= MODELS["model-c"]["context"])\n',
        hint: 'Add up count_tokens() of each part, plus 50',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to the Chapter 3 idea behind it.',
        pairs: [
          ['temperature=0', 'Same right answer every time'],
          ['context=policies', 'Facts beat likely guesses'],
          ['"say you don\'t know"', 'No made-up answers'],
          ['Window check', 'Prompt and reply must fit'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Do you sell shoes for men?" with the v0.3 set-up (help page as context) and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel("model-b")\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel("model-b")\npolicies = open("rao_policies.md").read()\nprint(m.reply("Do you sell shoes for men?", context=policies, temperature=0))\n',
        hint: 'context=policies, temperature=0',
        checks: [{ message: 'Print an honest "I don\'t know"', outputIncludes: "I don't know" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the model say "60 days" back in Chapter 1?',
        options: [
          { text: 'It predicted a likely continuation, with no shop policy to go on' },
          { text: 'It had an old policy', why: 'It never saw any shop policy.' },
          { text: 'The temperature was too low', why: 'Low temperature doesn\'t cause made-up facts; missing facts do.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Knows it by itself, or must be given it?',
        groups: ['Knows by itself', 'Must be given'],
        items: [
          { text: 'How to write a polite reply', group: 0 },
          { text: 'Mr Rao\'s delivery fee', group: 1 },
          { text: 'Today\'s date', group: 1 },
          { text: 'General advice on washing cotton', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Kavya\'s v0.3 is a mistake?',
        language: 'python',
        lines: [
          'm = PracticeModel("model-b")',
          'policies = open("rao_policies.md").read()',
          'reply = m.reply(question, context=policies, temperature=1.5)',
          'print(reply)',
        ],
        bug: 2,
        fix: 'reply = m.reply(question, context=policies, temperature=0)',
        explanation: 'For facts, keep temperature at 0.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'One line for Mr Rao about what changed in v0.3?',
        prompt: "Joel's best reply?",
        options: [
          { text: '"Ask Rao now answers only from your help page, says when it doesn\'t know, and gives the same answer every time."' },
          { text: '"We set temperature to 0 and checked the context window."', why: 'True, and meaningless to him.' },
          { text: '"Nothing changed."', why: 'A lot changed, in ways he\'ll notice.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'A model predicts the next [[1]] from what it learned and what it\'s [[2]].',
        blanks: [['token'], ['given', 'sent']],
        distractors: ['page', 'paid'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import count_tokens\nprint(count_tokens("क्या डिलीवरी मुफ्त है?") - count_tokens("Is delivery free?"))',
        language: 'python',
        options: [
          { text: '14' },
          { text: '24', why: '19 - 5 = 14.' },
          { text: '0', why: 'The Hindi version uses many more practice tokens.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the most text a model can handle at once called? (two words)',
        answers: ['context window', 'Context window'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'You can now explain what a model really does. Which idea from this chapter would you most like to explain to someone else, and to whom?',
    starters: ['I\'d explain...', 'To...'],
  },
  notes: 'Chapter 3 challenge. v0.3 call with system + rao_policies.md + temperature 0 -> "Delivery is free on orders over ₹999."; men\'s shoes with page -> "I don\'t know..."; full prompt fits model-c (32,000); Hindi 19 - English 5 = 14 tokens.',
};

export default lesson;
