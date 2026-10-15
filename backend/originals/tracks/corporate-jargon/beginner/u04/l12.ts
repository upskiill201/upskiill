import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 12. Chat with Tey: small talk at work — Mr Kamau sits at Remi's lunch table. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Small talk at work',
  summary: 'Thursday, 1:00. The canteen is full. Mr Kamau, the CEO, sits down at the only free seat: opposite Remi. The last time they were alone, Remi said "Yo."',
  minutes: 12,
  outcomes: [
    'Start and keep up small talk with anyone, including senior people',
    'Know the safe topics and the ones to avoid',
    'End small talk politely',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "1:02 p.m. Mr Kamau puts down a plate of pilau. \"Mind if I join you?\" Remi's brain offers him two options: \"Yo\" and silence. Neither is great. What do you think he should say first?",
          replies: ['"Of course, please."', '"Yo, sure."'],
        },
        {
          tey: "\"Of course, please.\" Good. Now the scary part: talking. Small talk is just a short, friendly conversation about easy things. It isn't about being interesting. It's about being friendly. Safe topics: the weekend, traffic, the weather, food, sport, travel, something happening in the office.",
          replies: ['What should I avoid?'],
        },
        {
          tey: "Salary, politics, religion, gossip about colleagues, and complaining about your manager to their boss. Here's a trick: ask an open question, one that can't be answered with yes or no. \"How was your weekend?\" works better than \"Good weekend?\"",
          replies: ['And if he asks ME something?'],
        },
        {
          tey: "Give a bit more than one word, then pass it back. If he says \"How's the internship?\", don't just say \"Fine.\" Try: \"Really good, thanks. I've learned a lot of new words. How long have you been at Synergix?\" Answer, add a little, ask back. That's the rhythm.",
          replies: ['How do I end it?'],
        },
        {
          tey: "When it's time to go: \"It was great to chat. Enjoy the rest of your lunch.\" Short, warm, done. And notice what just happened: he spoke to you like a person. He remembers the lift too. This was his way of resetting it.",
        },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'kamau', text: 'How\'s the internship going?' },
        { speaker: 'remi', text: 'Really well, thank you. I\'ve learned about two hundred new acronyms. How long have you been at Synergix?' },
        { speaker: 'kamau', text: 'Twenty-two years. I started in the warehouse. I didn\'t understand a word anyone said either.' },
        { speaker: 'tey', text: "Interesting. Keep that in your notebook." },
      ],
    },
  ],
  apply: {
    scenario: 'Thursday, 1:02 p.m. Lunch with the CEO.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Safe small-talk topic, or avoid?',
        groups: ['Safe', 'Avoid'],
        items: [
          { text: 'The weekend', group: 0 },
          { text: 'How much people earn', group: 1 },
          { text: 'The football on Saturday', group: 0 },
          { text: 'Gossip about a colleague', group: 1 },
          { text: 'The traffic this morning', group: 0 },
          { text: 'Politics', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which question keeps the conversation going best?',
        options: [
          { text: '"Good weekend?"', why: 'Easy to answer with one word, then silence.' },
          { text: '"How was your weekend?"' },
          { text: '"Weekend."', why: 'That\'s not a question.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kamau',
        message: 'How\'s the internship going?',
        prompt: 'Remi\'s answer?',
        options: [
          { text: 'Fine.', why: 'A one-word answer stops the conversation.' },
          { text: 'Yo, it\'s lit.', why: 'Remember the lift.' },
          { text: 'Really well, thank you. I\'ve learned a lot. How long have you been at Synergix?' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the small-talk rhythm in order.',
        lines: ['Answer the question', 'Add a little detail', 'Ask something back'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A question that can\'t be answered with yes or no is an ___ question. (one word)',
        answers: ['open'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Mr Kamau asks, "What do you think of Brian?" What\'s the safe, honest answer?',
        options: [
          { text: '"He\'s a great teacher. Though I needed a dictionary for the first week!"' },
          { text: '"He talks in jargon all day, it\'s exhausting."', why: 'Complaining about your manager to his boss, at lunch. No.' },
          { text: '"No comment."', why: 'Sounds like there IS a comment.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s small talk with Mr Kamau. Which line was a mistake?',
        lines: [
          'Did you have a good weekend, Mr Kamau?',
          'How much does a CEO earn, actually?',
          'I went to Naivasha. It was beautiful.',
        ],
        bug: 1,
        fix: 'Have you been to Naivasha?',
        explanation: 'Salary is off the small-talk menu, especially with the CEO.',
      },
      {
        kind: 'mcq',
        prompt: 'Lunch is over. How does Remi leave?',
        options: [
          { text: 'Gets up without a word', why: 'Abrupt.' },
          { text: '"It was great to chat. Enjoy the rest of your lunch."' },
          { text: '"Ok bye."', why: 'Short is fine; this is too short for the CEO.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['My pleasure', 'Warm answer to thanks'],
          ['Let me find out', 'Upgrade of "I don\'t know"'],
          ['Good morning, Mr Kamau', 'Formal greeting'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a polite way to end small talk.',
        tiles: ['It', 'was', 'great', 'to', 'chat.', 'Enjoy', 'your', 'lunch.'],
        distractors: ['Yo', 'bye'],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you find hardest to make small talk with? Write one open question you could ask them next time.',
    starters: ['The person is...', 'My open question: ...'],
  },
  deepen: {
    title: 'Three open questions',
    summary: 'Keep three open questions ready for any small talk: "How was your weekend?", "What are you working on at the moment?", "How did you get into this job?" They work with almost anyone.',
  },
  notes: 'Small-talk guidance (safe vs sensitive topics, open questions) is general workplace etiquette; sensitive topics vary by culture but salary, politics, religion and gossip are widely advised against with senior colleagues. Mr Kamau\'s warehouse backstory feeds Chapter 12.',
};

export default lesson;
