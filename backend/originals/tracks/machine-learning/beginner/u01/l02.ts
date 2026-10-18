import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — Where you already use ML: everyday examples, myth or fact. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Where you already use ML',
  summary: 'On the bus home, Halima counts the machine learning in her own day. Her phone finishes her words. Her bank texts her about a strange payment. Her maps app says 40 minutes. She\'s been using it for years.',
  minutes: 10,
  outcomes: [
    'Name everyday tools that use machine learning',
    'Say what each one learned from',
    'Separate ML myths from facts',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Your email spam filter is a kind of machine learning.',
          isFact: true,
          explain: 'Fact. Spam filters learn from huge numbers of emails people have marked as spam or not spam, then guess about new emails.',
        },
        {
          text: 'Machine learning is only used by giant tech companies.',
          isFact: false,
          explain: 'Myth. Banks, hospitals, shops and small startups use it. The tools are free, and you\'ll use the same ones in this course.',
        },
        {
          text: 'When your bank flags a "suspicious payment", a model may have spotted that it doesn\'t look like your usual spending.',
          isFact: true,
          explain: 'Fact. Fraud alerts are a classic use: learn what normal looks like, and flag what doesn\'t.',
        },
        {
          text: 'Machine learning needs a robot.',
          isFact: false,
          explain: 'Myth. Almost all machine learning is ordinary code running on ordinary computers and phones. No robot required.',
        },
        {
          text: 'Your phone keyboard suggesting the next word is learning from text.',
          isFact: true,
          explain: 'Fact. It learned which words usually follow which, and guesses the next one.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'For any ML tool, ask two questions: what examples did it learn from, and what does it guess? Spam filter: emails marked spam, then "is this new email spam?"',
    },
  ],
  apply: {
    scenario: 'Machine learning in an ordinary day.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it guesses.',
        pairs: [
          ['Spam filter', 'Is this email junk?'],
          ['Keyboard', 'Which word comes next?'],
          ['Fraud alert', 'Is this payment unusual?'],
          ['Maps app', 'How long will this trip take?'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Print the tool and its guess as \"Spam filter: Is this email junk?\"",
        starter: "tool = \"Spam filter\"\nguess = \"Is this email junk?\"\n",
        solution: "tool = \"Spam filter\"\nguess = \"Is this email junk?\"\nprint(f\"{tool}: {guess}\")\n",
        hint: "print(f\"{tool}: {guess}\")",
        checks: [
          { message: "Print Spam filter: Is this email junk?", outputEquals: "Spam filter: Is this email junk?" },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A spam filter learns from...',
        options: [
          { text: 'Emails people have already marked as spam or not' },
          { text: 'A list of banned words a person typed in', why: 'That would be rules written by hand, not learned.' },
          { text: 'Nothing; it guesses at random', why: 'It learns from labelled examples.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Probably uses machine learning, or probably not?',
        groups: ['Probably ML', 'Probably not'],
        items: [
          { text: 'Suggested videos on your feed', group: 0 },
          { text: 'A clock showing the time', group: 1 },
          { text: 'A translation app', group: 0 },
          { text: 'A calculator app', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'ML is hype. Name one thing it does that I actually use.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Your bank\'s fraud text last month. And your keyboard finishing "see you tom..." for you.' },
          { text: 'It drives all the cars in Lagos.', why: 'That\'s not true, and Chidi would know it.' },
          { text: 'Nothing yet. It\'s all in the future.', why: 'It\'s already in tools he uses every day.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two questions to ask about any ML tool.',
        template: 'What [[1]] did it learn from, and what does it [[2]]?',
        blanks: [['examples'], ['guess']],
        distractors: ['robots', 'know'],
      },
      {
        kind: 'mcq',
        prompt: 'Your maps app says 40 minutes. Where could that guess come from?',
        options: [
          { text: 'Many past trips on the same roads at similar times' },
          { text: 'The speed limit and nothing else', why: 'Then it would ignore traffic. Learning from past trips is what makes it useful.' },
          { text: 'It knows the future', why: 'It\'s a guess from patterns, and sometimes it\'s wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence.',
        lines: [
          'Fraud alerts learn what normal spending looks like.',
          'Keyboards learn which words often follow which.',
          'Spam filters understand what an email means, like a person does.',
          'All three make guesses from patterns.',
        ],
        bug: 2,
        fix: 'Spam filters spot patterns that spam emails share.',
        explanation: 'Models find patterns. They don\'t understand meaning the way a person does.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name one tool on your phone that probably uses machine learning.',
        answers: ['keyboard', 'maps', 'spam filter', 'translate', 'translation', 'camera', 'photos', 'face id', 'voice assistant', 'recommendations', 'feed'],
        placeholder: 'A tool',
      },
      {
        kind: 'mcq',
        prompt: 'What do all these tools have in common?',
        options: [
          { text: 'They learned from lots of examples and make guesses about new ones' },
          { text: 'They are all always right', why: 'Spam sometimes reaches your inbox. Guesses can be wrong.' },
          { text: 'They were all written as long lists of rules', why: 'The rules were learned, not typed.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'So what would OUR model learn from, and what would it guess?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'It learns from past appointments and whether the patient came. It guesses whether a new booking will be missed.' },
          { text: 'It learns from the internet and guesses everything.', why: 'Afiya\'s model learns from Afiya\'s own appointments.' },
          { text: 'It learns from the nurses\' names.', why: 'Names don\'t explain who misses. Waits, reminders and distance might.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which ML tool do you use most? Has it ever guessed wrong about you? What do you think it learned from?',
    starters: ['I use... every day', 'It got it wrong when...'],
  },
  deepen: {
    title: 'Learning from you',
    summary: 'Many apps keep learning from what you do: the videos you finish, the words you type. That\'s why two people\'s phones can suggest very different things.',
  },
  notes: 'Well-known applications of ML (spam filtering, fraud detection, next-word prediction, travel-time estimates). No usage statistics claimed.',
};

export default lesson;
