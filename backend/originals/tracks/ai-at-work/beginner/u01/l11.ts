import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 11 — length in numbers, tone in words that mean something. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Set the length and the tone',
  summary: '"Short" means nothing to an AI. "Under 50 words" means exactly one thing.',
  minutes: 12,
  outcomes: [
    'Set length with a number or a shape, not an adjective',
    'Choose tone words that actually change the answer',
    'Match length and tone to the reader and the channel',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Writing "be concise" is the best way to get a short answer.',
          isFact: false,
          explain: '"Concise" is a feeling. "Under 50 words" or "3 bullets" is a number it can hit.',
        },
        {
          text: 'AI tools often write more than you need unless you set a length.',
          isFact: true,
          explain: 'Left alone, they tend to cover everything. A length forces them to choose what matters.',
        },
        {
          text: '"Make it sound good" is a useful tone instruction.',
          isFact: false,
          explain: '"Good" is not a tone. Friendly, direct, formal, warm, playful: those are tones.',
        },
        {
          text: 'The right tone depends on the reader and where they will read it.',
          isFact: true,
          explain: 'A chat message to a teammate and an email to a client can carry the same news in very different tones.',
        },
      ],
    },
    {
      kind: 'steps',
      title: 'Three ways to set length',
      steps: [
        { title: 'A number', body: '"Under 60 words." "Exactly 3 sentences." The most reliable.' },
        { title: 'A shape', body: '"3 bullets." "A subject line plus 4 lines." Great for scanning.' },
        { title: 'A place', body: '"Short enough for a phone notification." "Fits on one slide." Ties length to where it will be read.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Same news, two tones',
      before: { label: 'Formal (for a client contract email)', text: 'Please be advised that testing has been rescheduled to Friday. We will confirm completion upon conclusion.' },
      after: { label: 'Friendly (for a teammate chat)', text: 'Heads up: testing moved to Friday. I\'ll shout when it\'s done!' },
      notes: ['Same fact.', 'Different reader and channel.', 'Different words, length and warmth.'],
    },
    {
      kind: 'check',
      question: 'Which length instruction is most reliable?',
      options: ['"Keep it short"', '"Under 50 words"', '"Not too long"'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is tuning length and tone.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Reliable length instruction, or vague?',
        groups: ['Reliable', 'Vague'],
        items: [
          { text: 'Under 60 words', group: 0 },
          { text: 'Keep it short', group: 1 },
          { text: '3 bullet points', group: 0 },
          { text: 'Not too long', group: 1 },
          { text: 'Fits on one slide', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a real tone word?',
        options: [{ text: 'Good', why: 'Good is a judgement, not a tone.' }, { text: 'Direct' }, { text: 'Nice-ish', why: 'Too vague to act on.' }],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a reliable length instruction.',
        tiles: ['Under', '60', 'words,', 'in', '3', 'bullets'],
        distractors: ['shortish', 'maybe'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your AI-written update was lovely but way too long for a Slack message.',
        prompt: 'What should Ada add to her request next time?',
        options: [
          { text: '"Make it lovely but less."', why: 'Less how much? Give a number or a shape.' },
          { text: '"For Slack: 2 short lines, friendly."' },
          { text: '"Be concise please."', why: '"Concise" still guesses the length.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the channel to a sensible length.',
        pairs: [
          ['Chat message', '1 to 2 lines'],
          ['Client email', '4 to 6 lines'],
          ['Slide', '3 bullets'],
          ['Push notification', 'Under 10 words'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The most reliable way to set length is with a ... (one word)',
        answers: ['number', 'word count', 'count'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: 'Write this for a teammate in our chat: [[1]] lines, [[2]] tone.',
        blanks: [['2', 'two'], ['friendly', 'casual']],
        distractors: ['200', 'legal'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the useless instruction.',
        lines: ['Write a reply to Lucía.', 'Make it sound good.', 'Under 5 lines, warm and direct.'],
        bug: 1,
        explanation: '"Sound good" is not a tone. Line 3 already does the job.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Formal or friendly?',
        groups: ['Formal', 'Friendly'],
        items: [
          { text: 'Please be advised that...', group: 0 },
          { text: 'Heads up!', group: 1 },
          { text: 'We kindly request your approval.', group: 0 },
          { text: 'Could you give the colours a quick thumbs-up?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada must tell her manager about a delay, briefly and calmly. Which request is best?',
        options: [
          { text: 'Tell my manager about the delay nicely.', why: '"Nicely" is vague and no length is set.' },
          { text: 'Write a 3-line message to my manager about the 2-day testing delay. Calm and direct: cause, new date, no risk to launch.' },
          { text: 'Write a long, detailed apology.', why: 'A calm, brief message was the goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the decisions Ada makes about length and tone.',
        lines: ['Who is reading it?', 'Where will they read it?', 'Pick the length (number or shape)', 'Pick the tone (one or two real tone words)'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'This is for our legal team, so please keep the jokes out of it!',
        prompt: 'Which tone instruction should Ada give the AI?',
        options: [
          { text: '"Fun but serious."', why: 'Contradictory, and legal asked for no jokes.' },
          { text: '"Normal."', why: 'Normal for whom?' },
          { text: '"Formal and precise, no humour."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fill in: "Fits on one ..." (a length tied to a place)',
        answers: ['slide', 'screen', 'page'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague word to a precise version.',
        pairs: [
          ['"Short"', '"Under 50 words"'],
          ['"Professional"', '"Formal, no slang"'],
          ['"Casual"', '"Friendly, like a chat message"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do AI tools often write long answers?',
        options: [
          { text: 'They are paid per word', why: 'Not the reason.' },
          { text: 'Without a length, they try to cover everything that might be relevant' },
          { text: 'Long answers are always better', why: 'Not for busy readers.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Where do you read and send most of your work messages? Write the length and tone instruction you would use for each.',
    starters: ['For chat: ...', 'For email: ...'],
  },
  deepen: { title: 'Try it today', summary: 'Add a number to your next request ("under 60 words") and compare it with "keep it short".' },
  notes: 'General behaviour of chat assistants (tending to verbosity without constraints) stated softly ("often"). No statistics.',
};

export default lesson;
