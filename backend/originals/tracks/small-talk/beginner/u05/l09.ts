import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Card deck: your small-talk toolkit — the whole course on five cards, before the Final Challenge. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Your small-talk toolkit',
  summary: 'The night before the conference, Grace writes the whole course on five index cards and props them against the kettle. Jayden reads them. "These are... actually good, Mum."',
  minutes: 11,
  outcomes: [
    'Recall the key tool from every chapter',
    'Pick the right tool for the moment',
    'Feel ready for any room',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Wednesday night. Tomorrow is the Manchester tech conference: two thousand people. Grace writes five cards, one per chapter, and props them against the kettle.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Start</h3><p>Warm, not clever. <strong>Notice + ask</strong>: something you share, then an open question. Read the signals. Say their name back. And remember: people like you more than you think.</p><h3>Card 2: Keep it going</h3><p><strong>Ask, listen, share.</strong> Follow up before you switch. Catch the hooks. Answer, add, ask. FORD when your mind goes blank. Count to two in a pause.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 3: At work</h3><p>Better than \"Fine\": a word, a detail, a question. Talk to the room before meetings. Curious, not flattering, with senior people. <strong>Watch and match.</strong> Kind exits: warm words, a reason, a later time.</p><h3>Card 4: Rooms full of strangers</h3><p>Pause, scan, start with someone alone. Join open groups at a pause. <strong>What you do + who it helps</strong>, no \"just\". Introduce people with a connection. Leave on a high. Follow up within two days.</p>",
    },
    {
      kind: 'check',
      question: 'Your mind goes blank mid-chat. Which card helps?',
      options: ['Card 2: FORD', 'Card 4: the exit', 'Card 3: kind exits'],
      answer: 0,
      explanation: 'FORD (family, occupation, recreation, dreams) gives you somewhere to go.',
    },
    {
      kind: 'text',
      html: "<h3>Card 5: Real talk</h3><p>Deeper goes better than you expect. <strong>Bridge questions.</strong> 30-second stories: moment, problem, turn, point. Laugh at yourself and the situation, never at people. 5-second recovery. Callbacks. And send the thank-you.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Start warm. Keep it going. Fit the setting. Work the room kindly. Go a little deeper. You\'re better at this than you think.',
    },
  ],
  apply: {
    scenario: 'Wednesday night. Five cards by the kettle.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the tool.',
        pairs: [
          ['Starting with a stranger', 'Notice + ask'],
          ['Mind gone blank', 'FORD'],
          ['Joining a group', 'Wait for a pause'],
          ['Leaving a chat', 'Warm words, then go'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which card is it on?',
        groups: ['Start / keep going', 'Work and events', 'Real talk'],
        items: [
          { text: 'Follow up before you switch', group: 0 },
          { text: 'Pause, scan, start with someone alone', group: 1 },
          { text: 'Bridge questions', group: 2 },
          { text: 'Talk to the room before meetings', group: 1 },
          { text: 'The 5-second recovery', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone tells you their mum is in hospital. Which tool?',
        options: [
          { text: 'Listen, don\'t fix: "I\'m sorry. How are you doing?"' },
          { text: 'FORD', why: 'Not the moment to change topic.' },
          { text: 'A 30-second story about your own mum', why: 'A switch to yourself.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Okay, test. Someone says "So what do you do?" GO.',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'Just a junior, sorry.', why: 'Card 4: no "just".' },
          { text: 'I make sure our hospital app works for patients. I was a nurse for eighteen years. What about you?' },
          { text: 'And how are we feeling today?', why: 'Jayden is unimpressed.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The finding behind the whole course: people like you ___ than you think. (one word)',
        answers: ['more'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the five chapters in order.',
        lines: ['The first hello', 'Keep it going', 'Small talk at work', 'A room full of strangers', 'From small talk to real talk'],
      },
      {
        kind: 'findBug',
        prompt: 'Jayden "improves" Card 2. Which line is wrong?',
        lines: [
          'Follow up before you switch.',
          'Never let there be a single second of silence.',
          'Answer, add, ask.',
        ],
        bug: 1,
        fix: 'Count to two in a pause.',
        explanation: 'Jayden\'s old rule. Short pauses are normal.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "watch and match" mean?',
        options: [
          { text: 'Follow the other person\'s style: pace, greetings, depth' },
          { text: 'Wear the same clothes as them', why: 'Not that kind of match.' },
          { text: 'Copy their exact words', why: 'Style, not words.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The course in one line.',
        template: 'Start [[1]]. Keep it [[2]]. Go a little [[3]].',
        blanks: [['warm'], ['going'], ['deeper']],
        distractors: ['clever', 'shorter'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Jayden\'s verdict.',
        tiles: ['These', 'are', 'actually', 'good,', 'Mum.'],
        distractors: ['cringe', 'weird'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own five-card toolkit: the one tool from each chapter you\'ll actually use.',
    starters: ['Card 1: ...', 'Card 2: ...', 'Card 3: ...', 'Card 4: ...', 'Card 5: ...'],
  },
  deepen: {
    title: 'Five cards by your kettle',
    summary: 'Write your five cards on paper or in your phone. Read them before your next event, first day or big conversation. It takes a minute and it\'s everything Grace learned.',
  },
  notes: 'Synthesis lesson; all research cited in earlier lessons.',
};

export default lesson;
