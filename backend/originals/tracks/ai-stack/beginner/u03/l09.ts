import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9 — Temperature: same question, different answers. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Temperature',
  summary: 'Kavya asks the same question twice and gets two different greetings. Joel asks it ten times at temperature 0 and gets the same answer every time. The setting is called temperature.',
  minutes: 12,
  outcomes: [
    'Explain what temperature does',
    'Choose a temperature for a shop assistant',
    'Compare replies at temperature 0 and higher',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Picking the next token',
      steps: [
        { title: '1. Several likely tokens', body: 'At each step the model doesn\'t have one answer. It has a list of likely next tokens, each with a chance.' },
        { title: '2. Temperature 0: always the top one', body: 'Pick the most likely token every time. Same prompt, same answer.', code: 'from teyro_ai import PracticeModel\nm = PracticeModel()\nprint(m.reply("hello", temperature=0))\n# Namaste! How can I help you today?', language: 'python' },
        { title: '3. Higher temperature: sometimes a less likely one', body: 'The pick becomes more random, so answers vary. The practice model uses a "seed" so a lesson can show the same variation every time.', code: 'print(m.reply("hello", temperature=1.0, seed=1))\n# Hello! What can I help you find?', language: 'python' },
        { title: '4. Good for creativity', body: 'Varied wording suits slogans, stories and brainstorming.' },
        { title: '5. Bad for facts', body: 'For a shop assistant you want the same, correct answer every time. Use a low temperature, and give it the facts.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Turn it up',
      caption: 'Without the help page, higher temperature also varies the made-up answers.',
      code: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nfor seed in [0, 1, 2]:\n    print(m.reply("What is your return policy?", temperature=1.0, seed=seed))\nprint(m.reply("What is your return policy?", temperature=0))\n',
      challenge: 'Add the help page as context. Does temperature still change the answer?',
    },
  ],
  apply: {
    scenario: 'Choosing a temperature.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "hello" at temperature 1.0 with seed 2 and print the reply',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\nprint(m.reply("hello", temperature=1.0, seed=2))\n',
        hint: 'm.reply("hello", temperature=1.0, seed=2)',
        checks: [{ message: 'Print the Namaste greeting', outputEquals: 'Namaste! How can I help you today?' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does temperature 0 do?',
        options: [
          { text: 'Freezes the model', why: 'It just removes randomness from the choice.' },
          { text: 'Always picks the most likely next token, so the same prompt gives the same answer' },
          { text: 'Makes answers more creative', why: 'Higher temperature does that.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Low temperature or higher temperature?',
        groups: ['Low (steady)', 'Higher (varied)'],
        items: [
          { text: 'Answering return-policy questions', group: 0 },
          { text: 'Brainstorming Diwali sale slogans', group: 1 },
          { text: 'Reading out an order status', group: 0 },
          { text: 'Writing five different product descriptions', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Higher temperature makes Ask Rao sound more human. Let\'s turn it up!',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, maximum temperature.', why: 'Facts would start to vary, and more made-up answers would slip in.' },
          { text: 'Temperature does nothing.', why: 'It changes how the next token is picked.' },
          { text: 'For facts we want the same right answer every time. Keep it low, and make the wording friendly in the instructions instead.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to the behaviour.',
        pairs: [
          ['temperature=0', 'Same answer every time'],
          ['temperature=1.0', 'Answers vary'],
          ['A fixed seed', 'The same "random" choice, for testing'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import PracticeModel\nm = PracticeModel()\nprint(m.reply("hello", temperature=0) == m.reply("hello", temperature=0).text)',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: 'It compares a Reply object with a string, which are different things. Compare .text with .text.' },
          { text: 'Namaste! How can I help you today?', why: 'It prints the result of a comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A steady shop assistant.',
        language: 'python',
        template: 'reply = m.reply(question, context=policies, [[1]]=[[2]])',
        blanks: [['temperature'], ['0']],
        distractors: ['seed', '2'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the Ask Rao settings is risky?',
        lines: [
          'context: the relevant help-page lines',
          'model: model-b',
          'temperature: 1.5 for every answer',
          'replies: short',
        ],
        bug: 2,
        fix: 'temperature: 0 for factual answers',
        explanation: 'High temperature makes factual answers vary.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print True if two replies at temperature 0 have the same text',
        starter: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\n',
        solution: 'from teyro_ai import PracticeModel\n\nm = PracticeModel()\na = m.reply("hello", temperature=0)\nb = m.reply("hello", temperature=0)\nprint(a.text == b.text)\n',
        hint: 'Compare a.text with b.text',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For a shop assistant answering facts, which temperature: 0 or 1?',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When do you want people (or tools) to be predictable, and when do you want surprise?',
    starters: ['I want predictable when...', 'I want surprise when...'],
  },
  deepen: {
    title: 'Not perfectly repeatable',
    summary: 'With real models, even temperature 0 isn\'t always perfectly repeatable, because of how big systems run. For checking, test many times; don\'t assume one run tells you everything.',
  },
  notes: 'Temperature scales the next-token distribution: 0 = greedy (most likely), higher = more random. teyro_ai practice model: hello temp 0 -> "Namaste! How can I help you today?"; temp 1.0 seed 1 -> "Hello! What can I help you find?"; seed 2 -> Namaste. Returns without context: seed 0 -> 90-day line, seed 1 -> 60-day line, temp 0 -> 60-day line. A Reply compared with a str is False.',
};

export default lesson;
