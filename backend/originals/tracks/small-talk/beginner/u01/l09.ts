import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Before/After: closed doors, open doors — openers and questions that invite a real answer. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Closed doors, open doors',
  summary: 'Grace tries three openers on Friday morning. All three get a one-word answer. Femi listens and points out the problem: every question she asked could be answered with "yes".',
  minutes: 11,
  outcomes: [
    'Turn closed questions into open ones',
    'Add a little of yourself so the other person has something to grab',
    'Avoid the "interview" feel',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Grace\'s three openers, before and after',
      before: {
        label: 'Closed doors',
        text: '"Nice weather?" ("Yeah.") "Busy week?" ("Yep.") "Do you like working here?" ("Yes.")',
      },
      after: {
        label: 'Open doors',
        text: '"I\'m still getting used to Manchester rain after the hospital. What\'s the best way to get here without drowning?" "What\'s been keeping you busy this week?" "What made you choose Kinwell?"',
      },
      notes: [
        'Yes/no questions became how/what questions, which invite a story.',
        'The first one adds something about Grace (the hospital), which gives the other person a hook to ask about.',
        '"Do you like working here?" can feel like a test. "What made you choose Kinwell?" feels like interest.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Two upgrades make almost any opener better:</strong></p><ol><li><strong>Open it:</strong> start with <em>what, how, why,</em> or <em>tell me about</em>. \"Busy week?\" becomes \"What's kept you busy this week?\"</li><li><strong>Add a little of you:</strong> one small detail about yourself. \"I'm new, so I'm still finding the good lunch spots. Where do you go?\" Now they know something about you, and they have something to ask back.</li></ol><p><strong>One warning:</strong> three open questions in a row with nothing from you feels like an interview. Chapter 2 is all about the balance.</p>",
    },
  ],
  apply: {
    scenario: 'Friday morning. Three openers, round two.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Open each closed door.',
        pairs: [
          ['Busy week?', 'What\'s kept you busy this week?'],
          ['Good weekend?', 'What did you get up to at the weekend?'],
          ['Like it here?', 'What made you choose Kinwell?'],
          ['Been here long?', 'How did you end up at Kinwell?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Closed door, or open door?',
        groups: ['Closed (yes/no)', 'Open (invites a story)'],
        items: [
          { text: 'Is this your desk?', group: 0 },
          { text: 'How did you get into design?', group: 1 },
          { text: 'Are you from Manchester?', group: 0 },
          { text: 'What\'s the best thing about this job?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which opener gives the other person the most to work with?',
        options: [
          { text: '"Nice weather?"', why: 'A yes/no, and about the weather.' },
          { text: '"I\'m new, so I\'m still finding the good lunch spots. Where do you go?"' },
          { text: '"Do you eat lunch?"', why: 'Technically a question. Not a great one.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'You asked her three questions in a row and said nothing about yourself. She looked like she was at a job interview.',
        prompt: 'What should Grace try next time?',
        options: [
          { text: 'Ask four questions instead.', why: 'That makes the interview longer.' },
          { text: 'Stop asking questions.', why: 'Questions are great. Balance is the fix.' },
          { text: 'Mix in a little about myself, so it\'s a swap, not an interview.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Open questions often start with "what", "how" or "___". (one word)',
        answers: ['why', 'where', 'tell'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s opener plan. Which one will probably get a one-word answer?',
        lines: [
          'What made you choose Kinwell?',
          'Do you like the coffee?',
          'How did you get into design?',
        ],
        bug: 1,
        fix: 'What\'s the secret to good coffee here?',
        explanation: '"Do you like...?" invites a yes or no. Open it up.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can "Do you like working here?" feel awkward?',
        options: [
          { text: 'It can feel like a test with a right answer, especially from a new colleague' },
          { text: 'It\'s rude to mention work', why: 'Work is a safe topic.' },
          { text: 'Nobody likes working', why: 'Plenty do. The issue is the yes/no test feel.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from this chapter.',
        pairs: [
          ['Notice + ask', 'The all-purpose opener'],
          ['Next-in-line effect', 'Why names vanish'],
          ['Liking gap', 'People like you more than you think'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Upgrade an opener with a little of you.',
        template: 'I\'m [[1]] here, so I\'m still finding the good [[2]] spots. [[3]] do you go?',
        blanks: [['new'], ['lunch'], ['Where']],
        distractors: ['Do', 'old'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Open up "Busy week?"',
        tiles: ['What\'s', 'kept', 'you', 'busy', 'this', 'week?'],
        distractors: ['Yes', 'Do'],
      },
    ],
  },
  reflect: {
    prompt: 'What closed question do you ask most often ("Good weekend?", "You okay?")? Write an open version you\'ll use instead.',
    starters: ['I usually ask...', 'Instead I\'ll ask...'],
  },
  deepen: {
    title: 'Count your doors',
    summary: 'Tomorrow, notice your questions. Each time you ask a yes/no question, try reopening it: "What was the best bit?" or "How did that go?"',
  },
  notes: 'Open vs closed questions and reciprocal self-disclosure are standard communication-skills teaching; self-disclosure and question-asking research developed further in Chapter 2 (Huang et al. 2017).',
};

export default lesson;
