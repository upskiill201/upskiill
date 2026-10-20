import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: better conversations',
  summary: 'Ask about their life, ask about the past, follow the Mom Test, and don\'t pitch. Quick check before Clinton finds out what students already spend on laundry.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write good interview questions without notes', 'Spot a conversation that went wrong'],
  learn: [
    {
      kind: 'story',
      title: 'Nine of fifteen',
      beats: [
        { speaker: 'narrator', text: 'Clinton\'s notebook: fifteen conversations, nine about laundry, zero pitches.' },
        { speaker: 'david', text: 'Now ask what it costs them. If nobody spends anything on it, it might not hurt enough.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: better conversations.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good question or bad question?',
        groups: ['Good', 'Bad'],
        items: [
          { text: '"Walk me through last Saturday."', group: 0 },
          { text: '"Would you pay for this?"', group: 1 },
          { text: '"What did you pay last time?"', group: 0 },
          { text: '"Isn\'t laundry awful?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is one of the three Mom Test rules?',
        options: [
          { text: 'Ask about specifics in the past, not opinions about the future' },
          { text: 'Always describe your idea first', why: 'Rule 1 says the opposite.' },
          { text: 'Only interview strangers online', why: 'Not a rule; talk to people with the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bad question to a good one.',
        pairs: [
          ['"Would you use it?"', '"When did you last do it?"'],
          ['"Is it a good idea?"', '"What did you try last time?"'],
          ['"How much would you pay?"', '"What did you pay before?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'She said laundry is a nightmare, so I told her about WashDay. She loved it!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'You pitched too early, so "loved it" is a compliment. What did she do about it last week, and what did it cost?' },
          { text: 'Great, she\'s a customer.', why: 'Loving it isn\'t paying for it.' },
          { text: 'Never talk about laundry again.', why: 'The topic is right; the order was wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The swap.',
        template: 'Not "would you", but "[[1]] did you [[2]]".',
        blanks: [['when'], ['last']],
        distractors: ['how', 'first'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the conversation.',
        lines: ['Open with their world', 'Find a real moment', 'Dig for cost', 'Ask what matters', 'Ask who else to talk to'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the interview plan is a mistake?',
        lines: [
          'Ask about hostel life in rainy season.',
          'Ask about the last laundry day.',
          'Ask if they think WashDay is a good idea.',
          'Ask who else I should speak to.',
        ],
        bug: 2,
        fix: 'Ask what they\'ve tried or paid to make laundry easier.',
        explanation: 'An opinion question about the idea gets a polite answer.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of 15 students, 9 raised laundry unprompted. What percentage is that?',
        answers: ['60', '60%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A student talked for 9 minutes and Clinton for 6. Was that a good balance?',
        options: [
          { text: 'Not great: Clinton talked 40% of the time; aim for much less' },
          { text: 'Perfect balance', why: 'In discovery, the customer should do most of the talking.' },
          { text: 'Clinton should talk more', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Follow-up or pitch?',
        groups: ['Follow-up', 'Pitch'],
        items: [
          { text: '"Why was that hard?"', group: 0 },
          { text: '"WashDay could fix that!"', group: 1 },
          { text: '"What did you do next?"', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Run one practice conversation this week with someone who has your idea\'s problem. What surprised you?',
    starters: ['I talked to...', 'What surprised me was...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4.',
};

export default lesson;
