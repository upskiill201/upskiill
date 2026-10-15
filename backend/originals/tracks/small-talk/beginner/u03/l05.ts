import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus earlier. Story beat: Grace's first one-to-one with Priya. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first one-to-one',
  summary: 'Friday, 3 p.m. Grace\'s first one-to-one with Priya. The first five minutes are small talk, and with Priya, who hates small talk, that\'s the hard part.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Open a one-to-one warmly with your manager', 'Use work small talk: weekends, callbacks, reading signals'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:00 p.m., the small meeting room',
      beats: [
        { speaker: 'narrator', text: 'Priya sits down with her notebook and a cup of mint tea. She looks at Grace. Grace looks at Priya. Priya does not do small talk. Grace knows this.' },
        { speaker: 'grace', text: '(But Priya loved talking about her grandmother at lunch. And she reads books about octopuses. There are hooks.)' },
        { speaker: 'tey', text: "Even people who hate small talk usually like a SPECIFIC, interested question. Generic chat drains them; real curiosity doesn't. Let's see." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint. The first one-to-one with Priya.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Best opener for Priya, who dislikes generic small talk?',
        options: [
          { text: '"So... weather, eh?"', why: 'Generic. Exactly what drains Priya.' },
          { text: '"Let\'s skip the chat and do my review."', why: 'A little warmth first helps, even with Priya.' },
          { text: '"Did you finish the octopus book? I\'ve been wondering about the three hearts thing."' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'I did! The three hearts thing is true. How was your week, actually?',
        prompt: 'Grace\'s answer, using "a word, a detail, a question"?',
        options: [
          { text: 'Good! My first call with Arjun went well; we bonded over his guitar. How was the launch?' },
          { text: 'Fine.', why: 'The dead end, again.' },
          { text: 'Let me tell you about every day this week.', why: 'Keep it short.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill from this chapter is it?',
        groups: ['Better weekend answer', 'Pre-meeting talk', 'Video-call opener'],
        items: [
          { text: '"Good! I climbed two metres and was lowered like potatoes."', group: 0 },
          { text: '"Is this room always freezing?"', group: 1 },
          { text: '"Thanks for staying late! Is this your evening?"', group: 2 },
          { text: '"Has anyone seen the new designs?"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Remembering something someone told you before and asking about it is a ___. (one word)',
        answers: ['callback', 'call-back'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Priya opens her notebook and looks at the agenda. What\'s the signal?',
        options: [
          { text: 'She wants to talk about notebooks', why: 'She wants to start.' },
          { text: 'Time to move from small talk to the meeting' },
          { text: 'She\'s bored of Grace', why: 'She\'s just ready to begin.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each senior-person tip.',
        pairs: [
          ['Curiosity', 'Beats flattery'],
          ['"What did you do before?"', 'A great question up the ladder'],
          ['Glancing at the stage', 'Let them go'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s one-to-one opener. Which line is a mistake?',
        lines: [
          'Thanks for making time, Priya.',
          'Did you finish the octopus book?',
          'So, between us, what do you really think of Femi?',
        ],
        bug: 2,
        fix: 'How did the launch go in the end?',
        explanation: 'Asking your manager to gossip about a colleague is a trap for both of you.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does a specific question work even with people who hate small talk?',
        options: [
          { text: 'Generic chat drains them, but real interest in them doesn\'t' },
          { text: 'They secretly love the weather', why: 'Unlikely, for Priya.' },
          { text: 'Specific questions are shorter', why: 'Not always. They\'re just more personal.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Liking gap', 'People like you more than you think'],
          ['Answer, add, ask', 'The conversation rhythm'],
          ['Steer kindly', 'Brief answer, then move on'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s callback to Priya.',
        template: 'Did you [[1]] the octopus book? I\'ve been wondering about the three [[2]] thing.',
        blanks: [['finish'], ['hearts']],
        distractors: ['weather', 'legs'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a warm start to a one-to-one.',
        tiles: ['Thanks', 'for', 'making', 'time.', 'How', 'was', 'the', 'launch?'],
        distractors: ['gossip', 'weather'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone who seems to dislike small talk. What specific thing could you ask them about, based on something they\'ve told you?',
    starters: ['The person is...', 'They once mentioned...', 'I could ask...'],
  },
  deepen: {
    title: 'Keep a callback list',
    summary: 'Write down one thing each colleague mentions: a trip, a pet, a book. Next time you see them, ask about it. Callbacks make people feel remembered.',
  },
  notes: 'Review of lessons 1–4 plus earlier chapters. Octopus: three hearts (common octopus has three hearts — standard zoology). Callback to Chapter 1 lesson 4 and Chapter 2 lesson 3.',
};

export default lesson;
