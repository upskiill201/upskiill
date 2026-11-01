import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Reading: small talk for introverts — Priya's way. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Small talk for introverts: Priya\'s way',
  summary: 'After the one-to-one, Priya admits something: "I find all this exhausting. I do it anyway. Want to know how?" Small talk isn\'t only for extroverts. Introverts just do it differently.',
  minutes: 12,
  outcomes: [
    'Know that introverts can be excellent at small talk, in their own way',
    'Use strategies that save energy: fewer, deeper chats, a role, a plan',
    'Recharge without feeling guilty',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Priya\'s rules',
      html: "<p>Friday, 3:40. The one-to-one is finished. Priya closes her notebook, then opens it again.</p><p>\"Can I tell you something? I find small talk draining. Not scary, just tiring. Like running uphill. I'm an introvert: I recharge alone. But I lead a team, so I've had to find my own way. Here it is.\"</p><h3>1. Fewer, longer conversations</h3><p>\"Femi talks to twenty people at a party. I talk to three, properly. Both work. People remember a real conversation more than a hello.\"</p><h3>2. Arrive early</h3><p>\"The first ten minutes of any event are quiet. Fewer people, smaller groups, easier to talk. By the time it's loud, I've already had my good conversations.\"</p><h3>3. Give yourself a job</h3><p>\"At events, I help: hand out name badges, show people where the coffee is. A job gives me a reason to talk to people, and something to do with my hands.\"</p><h3>4. Prepare three questions</h3><p>\"Not scripts. Questions. 'What are you working on at the moment?' 'What brought you here?' 'What's been the best part of your week?' I never go blank, because I don't have to think of them on the spot.\"</p><h3>5. Plan the exit, and the recharge</h3><p>\"I decide in advance: I'll stay an hour, talk to three people, then leave. And I book quiet time afterwards. No guilt.\"</p><h3>6. Use your strengths</h3><p>\"Introverts are often good listeners. In small talk, that's a superpower. People remember the person who really listened.\"</p><p>Grace thinks about this. She is an extrovert who froze in rooms. Priya is an introvert who plans. Neither is the \"right\" personality for small talk. The skill is learnable either way.</p>",
    },
    {
      kind: 'check',
      question: 'Which of these is one of Priya\'s strategies?',
      options: ['Talk to as many people as possible', 'Give yourself a job at events', 'Stay until the very end'],
      answer: 1,
      explanation: 'A role (badges, coffee, welcoming people) gives you a reason to talk.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Introverts aren\'t bad at small talk. They pay for it in energy. So: fewer, deeper chats, arrive early, have a job, prepare questions, plan the exit and the recharge.',
    },
  ],
  apply: {
    scenario: 'Friday, 3:40. Priya\'s rules.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Priya says small talk is "like running uphill". What does she mean?',
        options: [
          { text: 'She\'s afraid of it', why: 'She said draining, not scary.' },
          { text: 'She enjoys exercise', why: 'A metaphor, not a hobby.' },
          { text: 'It\'s tiring for her, though she can do it' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Priya\'s rule to why it helps.',
        pairs: [
          ['Arrive early', 'Quieter, smaller groups'],
          ['Give yourself a job', 'A reason to talk to people'],
          ['Prepare three questions', 'You never go blank'],
          ['Plan the recharge', 'No guilt about needing quiet'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Introvert-friendly strategy, or energy drain?',
        groups: ['Introvert-friendly', 'Energy drain'],
        items: [
          { text: 'Three real conversations, then home', group: 0 },
          { text: 'Talking to everyone at the party', group: 1 },
          { text: 'Helping with name badges', group: 0 },
          { text: 'Arriving at the loudest moment', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'So, do you think introverts are just bad at small talk?',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'Yes, that\'s why you don\'t like it.', why: 'Draining isn\'t the same as bad.' },
          { text: 'Only extroverts can do it.', why: 'Priya proves otherwise.' },
          { text: 'No. You just pay for it in energy. And you\'re the best listener I\'ve met here.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An introvert\'s small-talk superpower: being a good ... (one word)',
        answers: ['listener'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why arrive early to an event?',
        options: [
          { text: 'To get the best food', why: 'A bonus. Not the reason.' },
          { text: 'The first minutes are quieter, with smaller groups that are easier to join' },
          { text: 'To leave before anyone notices', why: 'You can plan your exit anyway.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s advice to Leo, the quiet designer. Which line is wrong?',
        lines: [
          'Try having three real conversations instead of twenty quick ones.',
          'You need to become an extrovert to be good at this.',
          'Prepare a couple of questions before you go.',
        ],
        bug: 1,
        fix: 'You can be good at this as you are.',
        explanation: 'Small talk is a skill, not a personality. Introverts just use different strategies.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Curiosity, not flattery', 'Small talk with seniors'],
          ['Callback', 'Asking about something they mentioned'],
          ['Shall we jump in?', 'Moving from small talk to work'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Priya\'s three prepared questions (one of them).',
        template: 'What are you [[1]] on at the moment? What [[2]] you here?',
        blanks: [['working'], ['brought']],
        distractors: ['earning', 'scared'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Priya\'s plan for an event.',
        tiles: ['Stay', 'an', 'hour,', 'talk', 'to', 'three', 'people,', 'go', 'home.'],
        distractors: ['everyone'],
      },
    ],
  },
  reflect: {
    prompt: 'Do social events energise you or drain you? Which of Priya\'s rules would help you most?',
    starters: ['Events usually leave me feeling...', 'The rule I\'ll try is...'],
  },
  deepen: {
    title: 'Plan your next event',
    summary: 'Before your next event, decide: when you\'ll arrive, how many real conversations you want, what job you could take, your three questions, and when you\'ll leave.',
  },
  notes: 'Introversion as preference for lower stimulation/recharge alone (general personality psychology; not a diagnosis). Strategies are practical advice. Lesson avoids claiming introverts are worse at conversation.',
};

export default lesson;
