import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: the four-minute update. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The four-minute update',
  summary: 'Lucía has led her team at Nopal for 90 days. Every Monday she gets two minutes to update Carmen and the leadership team. Today she takes four, and nobody remembers the good news.',
  minutes: 11,
  outcomes: [
    'See why rambling hides good news',
    'Know what leaders want from an update',
    'Know what this course covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9:05 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Lucía starts with the agency meeting, then the photo shoot, then the new packaging. Two minutes pass. Then three.' },
        { speaker: 'narrator', text: 'At minute four she reaches it: chili-lime chips sold 38% above target in the first eight weeks.' },
        { speaker: 'carmen', text: 'Lucía, what\'s the headline? I lost you at the photo shoot.' },
        { speaker: 'diego', text: 'After the meeting: you buried the best news of the quarter under a photo shoot. Lead with it.' },
        { speaker: 'carmen', text: 'And in five weeks you present the launch results at the Encuentro. 300 people.' },
        { speaker: 'tey', text: 'This course: headline first, leaders, building a talk, voice and presence, and questions on the big day.' },
      ],
      choice: {
        prompt: 'How should Lucía start next Monday\'s update?',
        options: [
          { text: '"Chili-lime chips are 38% above target."', outcome: 'Yes. The headline first. Everything after it is detail.', best: true },
          { text: '"So, a lot happened this week..."', outcome: 'That\'s how this Monday started.' },
          { text: '"Sorry, I\'ll be quick..."', outcome: 'An apology isn\'t a headline. Then she wasn\'t quick.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start with the headline: the one thing you want them to remember. Detail comes after.',
    },
  ],
  apply: {
    scenario: 'The four-minute update.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'By what percentage were chili-lime sales above target?',
        answers: ['38', '38%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How long is Lucía\'s update meant to be?',
        options: [
          { text: 'Two minutes' },
          { text: 'Four minutes', why: 'That\'s how long it took.' },
          { text: 'Ten minutes', why: 'Two minutes.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Headline or detail?',
        groups: ['Headline', 'Detail'],
        items: [
          { text: 'Sales are 38% above target', group: 0 },
          { text: 'The photo shoot ran late', group: 1 },
          { text: 'The agency meeting was on Tuesday', group: 1 },
          { text: 'We need a reorder decision this week', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But if I start with the result, they won\'t know how we got there.',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'They\'ll ask if they want to know. Start with the result, give one line of why, and stop.' },
          { text: 'Tell the whole story in order.', why: 'That buried the news.' },
          { text: 'Skip the update.', why: 'Lead with the headline.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their role.',
        pairs: [
          ['Carmen', 'Lucía\'s boss'],
          ['Diego', 'Gives blunt notes'],
          ['Lucía', 'Leads the team, gives the update'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Start with the [[1]]. [[2]] comes after.',
        blanks: [['headline'], ['Detail']],
        distractors: ['apology', 'Nothing'],
      },
      {
        kind: 'mcq',
        prompt: 'What is the Encuentro?',
        options: [
          { text: 'Nopal\'s all-hands meeting, with 300 people' },
          { text: 'A team lunch', why: 'It\'s the all-hands.' },
          { text: 'A product launch', why: 'It\'s where she presents the results.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which opening line buries the news?',
        lines: [
          'Chili-lime is 38% above target.',
          'We need a reorder decision this week.',
          'So, first, let me tell you about the agency meeting...',
          'One risk: stock in Guadalajara.',
        ],
        bug: 2,
        fix: 'Start with the 38%.',
        explanation: 'The agency meeting is detail, not a headline.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this course covers.',
        lines: ['Headline first', 'In the room with leaders', 'Build the talk', 'Voice and presence', 'Questions and the big day'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks until the Encuentro?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last update at work. What was the headline, and when did you say it?',
    starters: ['The headline was...', 'I said it...'],
  },
  deepen: {
    title: 'Technique, not talent',
    summary: 'Confident speakers aren\'t born that way. Most of what they do can be learned and practised: what to say first, how to structure it, and how to handle nerves.',
  },
  notes: 'Fictional: chili-lime chips (launched June 17 in Leadership for Beginners) 38% above target in the first eight weeks; Encuentro all-hands of 300 in five weeks.',
};

export default lesson;
