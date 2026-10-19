import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 20 — Chapter challenge: choose a model like an engineer. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter challenge: choose with evidence',
  summary: 'Arjun\'s challenge: "Prove the choice. Cost every option, time it, test it on our questions, route the hard ones, and keep the customers\' details out of it." Everything from Chapter 4, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Choose a model with cost, speed, quality and privacy evidence', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'story',
      title: 'Prove it',
      beats: [
        { speaker: 'arjun', text: 'Mr Rao\'s cousin runs a shoe shop. She\'ll ask why we chose what we chose. I want every number ready.' },
        { speaker: 'joel', text: 'Cost, speed, test score, routing, privacy. All of it in code, so she can run it herself.' },
        { speaker: 'tey', text: 'Then this is the chapter in one go. No hints you haven\'t already used.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: choose with evidence.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print each model\'s monthly cost at 30,000 chats of 321 tokens in and 13 out, as "name: cost" rounded to 2 places, for model-a, model-b and model-c',
        starter: 'from teyro_ai import cost\n',
        solution: 'from teyro_ai import cost\nfor name in ["model-a", "model-b", "model-c"]:\n    print(f"{name}: {round(cost(name, 321, 13) * 30000, 2)}")\n',
        hint: 'for name in [...]: print(f"{name}: {round(cost(name, 321, 13) * 30000, 2)}")',
        checks: [{ message: 'Print all three monthly costs', outputEquals: 'model-a: 54.0\nmodel-b: 5.4\nmodel-c: 1.08' }],
      },
      {
        kind: 'mcq',
        prompt: 'Three models score the same on your questions. What decides?',
        options: [
          { text: 'Cost, speed, licence and privacy' },
          { text: 'Leaderboard rank', why: 'Your own test already beats it.' },
          { text: 'Which lab is most famous', why: 'Fame isn\'t evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Score model-c on the 30 questions with the help page and print how many are right',
        starter: 'import csv\nfrom teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nquestions = list(csv.DictReader(open("rao_questions.csv")))\nmodel = PracticeModel("model-c")\n',
        solution: 'import csv\nfrom teyro_ai import PracticeModel\n\npolicies = open("rao_policies.md").read()\nquestions = list(csv.DictReader(open("rao_questions.csv")))\nmodel = PracticeModel("model-c")\nright = 0\nfor row in questions:\n    text = model.reply(row["question"], context=policies).text.lower()\n    want = row["answer_must_include"]\n    if want == "NOT IN POLICY":\n        right += "don\'t know" in text\n    else:\n        right += want.lower() in text\nprint(right)\n',
        hint: 'Mark "NOT IN POLICY" rows right when the reply says "don\'t know"',
        checks: [{ message: 'Print 20', outputEquals: '20' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which lever fixes it: prompt, RAG or fine-tuning?',
        groups: ['Prompt', 'RAG', 'Fine-tuning'],
        items: [
          { text: 'Replies are five sentences long', group: 0 },
          { text: 'Doesn\'t know the new exchange rule', group: 1 },
          { text: 'Must match a very particular house style, every reply', group: 2 },
          { text: 'Gives answers without saying "I don\'t know"', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write pick_model: messages over 80 characters or containing "complaint" go to "model-a", others to "model-c". Then print pick_model("Is delivery free?")',
        starter: 'def pick_model(message):\n    return "model-a"\n\nprint(pick_model("Is delivery free?"))\n',
        solution: 'def pick_model(message):\n    if len(message) > 80 or "complaint" in message.lower():\n        return "model-a"\n    return "model-c"\n\nprint(pick_model("Is delivery free?"))\n',
        hint: 'if len(message) > 80 or "complaint" in message.lower(): return "model-a"',
        checks: [
          { message: 'Print model-c', outputEquals: 'model-c' },
          { message: 'Complaints go to model-a', expr: 'pick_model("I have a Complaint") == "model-a"' },
          { message: 'Long messages go to model-a', expr: 'pick_model("x" * 81) == "model-a"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it measures.',
        pairs: [
          ['20 of 30', 'Every model\'s score on our questions'],
          ['$6.37', 'The routed monthly bill'],
          ['300 tokens', 'practice-tiny\'s context window'],
          ['6,686 tokens', 'The full product list'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The shoe shop gets 3,000 chats a month, not 30,000. Does our answer change?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'The bills are a tenth: about $5.40 on model-a, $0.11 on model-c. Still test on her questions; the cheapest that passes wins.' },
          { text: 'Then use model-a; it\'s cheap now.', why: 'Still 50 times model-c, for the same score on our test.' },
          { text: 'Small shops can\'t use AI.', why: 'At 3,000 chats the cost is tiny.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Redact the phone number and email in the message (as "[phone]" and "[email]") and print it',
        starter: 'import re\n\nmessage = "Call 98765 43210 or mail priya@example.com"\n',
        solution: 'import re\n\nmessage = "Call 98765 43210 or mail priya@example.com"\nclean = re.sub(r"\\S+@\\S+\\.com", "[email]", message)\nclean = re.sub(r"\\d{5} \\d{5}", "[phone]", clean)\nprint(clean)\n',
        hint: 'Two re.sub calls, one for each pattern',
        checks: [{ message: 'Print Call [phone] or mail [email]', outputEquals: 'Call [phone] or mail [email]' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the shoe-shop plan will cause a surprise bill?',
        lines: [
          'Default model-c, backup model-b.',
          'Send the full 6,686-token shoe list with every message.',
          'Spending limit and an 80% alert.',
          'Re-test on every new model version.',
        ],
        bug: 1,
        fix: 'Send only the shoes that match the question.',
        explanation: 'Thousands of extra input tokens on every chat multiply the bill.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import MODELS\nprint(round(0.3 + 60 / MODELS["model-c"]["speed"], 2))',
        language: 'python',
        options: [
          { text: '0.97' },
          { text: '0.67', why: 'Add the 0.3 s first-token wait.' },
          { text: '60.3', why: 'Division comes first: 60 / 90.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Test on your own [[1]], then pick the [[2]] model that passes.',
        blanks: [['questions'], ['cheapest']],
        distractors: ['benchmark', 'biggest'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the model-choice process.',
        lines: ['Shortlist models with benchmarks', 'Set a pass mark', 'Test on your own questions', 'Compare cost, speed and licence', 'Write the decision record'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the most tokens a model can read in one request called? (context ...)',
        answers: ['window', 'context window'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve now chosen a model like an engineer. What will you ask the next time someone says "just use the best model"?',
    starters: ['I\'ll ask...', 'Then I\'ll check...'],
  },
  notes: 'Chapter 4 challenge. Measured with teyro_ai: monthly 54.0 / 5.4 / 1.08 at 30,000 chats; at 3,000: 5.4 / 0.54 / 0.108. model-c 20/30 with full help page. model-c 0.3 + 60/90 = 0.9667 -> 0.97.',
};

export default lesson;
