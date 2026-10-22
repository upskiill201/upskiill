import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 12 — Routing: send easy questions to a cheap model, hard ones to a big one. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Routing',
  summary: 'Kavya still wants model-a "for the hard ones". Joel has an idea: why not both? A tiny rule sends most questions to model-c and the hard 10% to model-a. Arjun checks the bill.',
  minutes: 12,
  outcomes: [
    'Explain what a model router does',
    'Write a simple routing rule',
    'Work out the cost of a blend of models',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Why not both?',
      beats: [
        { speaker: 'kavya', text: 'Most questions are "is delivery free?". Fine, model-c. But a long, angry complaint? I want the clever one.' },
        { speaker: 'joel', text: 'Then we route. A few lines of code look at each message first. Short and simple goes to model-c. Long, or says "complaint", goes to model-a.' },
        { speaker: 'arjun', text: 'And the bill?' },
        { speaker: 'joel', text: 'If 1 in 10 goes to model-a: 90% of $1.08 plus 10% of $54. About $6.37 a month.' },
        { speaker: 'arjun', text: 'Against $54 for model-a on everything. I can live with $6.37.' },
        { speaker: 'tey', text: 'That\'s a router: one small decision before the model call. Big products do this all the time, sometimes with a small model making the decision.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A tiny router',
      caption: 'Change the rule and see which model each message gets.',
      code: 'def pick_model(message):\n    if len(message) > 80 or "complaint" in message.lower():\n        return "model-a"\n    return "model-c"\n\nfor m in ["Is delivery free?",\n          "I want to make a complaint about my order",\n          "Do you have kurtas in size M?"]:\n    print(pick_model(m), "<-", m)\n',
      challenge: 'Send anything with the word "refund" to model-a too.',
    },
  ],
  apply: {
    scenario: 'Sending each message to the right model.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the monthly cost of a blend: 90% of model-c\'s $1.08 plus 10% of model-a\'s $54, rounded to 2 places',
        starter: 'model_c_month = 1.08\nmodel_a_month = 54.0\n',
        solution: 'model_c_month = 1.08\nmodel_a_month = 54.0\nprint(round(0.9 * model_c_month + 0.1 * model_a_month, 2))\n',
        hint: '0.9 * model_c_month + 0.1 * model_a_month',
        checks: [{ message: 'Print 6.37', outputEquals: '6.37' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does a router do?',
        options: [
          { text: 'Connects your Wi-Fi to the internet', why: 'Same word, different job here.' },
          { text: 'Decides which model each request goes to, before calling it' },
          { text: 'Trains a new model', why: 'It only chooses between existing ones.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'With Joel\'s rule (over 80 characters, or says "complaint"), which model?',
        groups: ['model-c', 'model-a'],
        items: [
          { text: 'Is delivery free?', group: 0 },
          { text: 'I have a complaint', group: 1 },
          { text: 'Do you have size M?', group: 0 },
          { text: 'A 200-character message about a wrong colour, a late parcel and a broken zip', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Complete pick_model so messages containing "complaint" go to "model-a" and everything else to "model-c"',
        starter: 'def pick_model(message):\n    return "model-c"\n\nprint(pick_model("I have a complaint"))\n',
        solution: 'def pick_model(message):\n    if "complaint" in message.lower():\n        return "model-a"\n    return "model-c"\n\nprint(pick_model("I have a complaint"))\n',
        hint: 'if "complaint" in message.lower(): return "model-a"',
        checks: [
          { message: 'Print model-a', outputEquals: 'model-a' },
          { message: 'Simple questions still go to model-c', expr: 'pick_model("Is delivery free?") == "model-c"' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'What if half the messages turn out to be "hard"?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'It can\'t happen.', why: 'It can; measure it.' },
          { text: 'Then routing is pointless.', why: 'Even 50/50 is half the cost of model-a on everything.' },
          { text: 'Then the bill rises towards $27. We\'ll log how many go to model-a each week and tune the rule.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'def pick_model(m):\n    return "model-a" if len(m) > 80 else "model-c"\nprint(pick_model("Is delivery free?"))',
        language: 'python',
        options: [
          { text: 'model-c' },
          { text: 'model-a', why: 'The message is far shorter than 80 characters.' },
          { text: '17', why: 'It returns a model name.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the plan to its monthly practice cost.',
        pairs: [
          ['model-a on everything', '$54.00'],
          ['90% model-c, 10% model-a', '$6.37'],
          ['model-c on everything', '$1.08'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A blended bill.',
        template: 'monthly = 0.9 * [[1]] + 0.1 * [[2]]',
        blanks: [['1.08'], ['54']],
        distractors: ['5.4', '0.36'],
      },
      {
        kind: 'findBug',
        prompt: 'This sends complaints to the cheap model. Which line?',
        language: 'python',
        lines: ['def pick_model(message):', '    if "complaint" in message.lower():', '        return "model-c"', '    return "model-c"'],
        bug: 2,
        fix: '        return "model-a"',
        explanation: 'Complaints should go to the bigger model.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the code that chooses a model for each message called?',
        answers: ['router', 'a router', 'model router'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Hospitals send minor cuts to a nurse and serious cases to a specialist. Where else do you see "routing" in everyday life?',
    starters: ['I see routing when...', 'It saves...'],
  },
  deepen: {
    title: 'Fallbacks',
    summary: 'A router can also send traffic to a backup model when the main one is down or slow. That\'s how Ask Rao will use model-b.',
  },
  notes: 'Monthly practice costs at 30,000 chats of 321 in / 13 out: model-a 54.0, model-c 1.08. Blend 0.9*1.08 + 0.1*54 = 6.372 -> 6.37 (measured with teyro_ai cost()). 50/50 = 27.54. Routing / model cascades are a common production pattern.',
};

export default lesson;
