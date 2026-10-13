import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 8 — ask for options, then choose and combine. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Ask for three options, then choose',
  summary: 'One answer is a guess. Three answers are a choice, and choosing is where your judgement comes in.',
  minutes: 12,
  outcomes: [
    'Ask for several options instead of one answer',
    'Ask for options that are genuinely different',
    'Pick, combine and refine the best one',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The subject line',
      beats: [
        { speaker: 'narrator', text: 'Tuesday. Lucía needs a subject line for the email announcing the new sign-up flow to all her customers.' },
        { speaker: 'lucia', text: 'Ada, can your team suggest something? It goes out tomorrow and I want people to actually open it.' },
        { speaker: 'narrator', text: 'Ada asks the AI for "a subject line". It gives her one: "Introducing Our New Sign-Up Experience".' },
        { speaker: 'ada', text: 'It is... fine? I have no idea if there is something better.' },
        { speaker: 'tey', text: 'That is the problem with one answer. You can only say yes or no to it. Ask for options and you get to choose.' },
      ],
      choice: {
        prompt: 'What should Ada ask the AI next?',
        options: [
          {
            text: 'Give me 5 subject lines for this email, each in a different style: curious, benefit-first, short, playful, urgent. Under 8 words.',
            outcome: 'Five very different lines. Ada and Lucía pick the benefit-first one and tweak one word. Opened by far more people than usual.',
            best: true,
          },
          {
            text: 'Give me a better subject line.',
            outcome: 'Another single line, slightly different. Still nothing to compare it with.',
          },
          {
            text: 'Give me 20 subject lines.',
            outcome: 'Twenty lines, most of them variations of the same idea. Too many to choose from, not enough difference.',
          },
        ],
      },
    },
    {
      kind: 'steps',
      title: 'The options routine',
      steps: [
        { title: 'Ask for 3 to 5 options', body: 'Enough to compare, few enough to read. More than 5 usually means repeats.' },
        { title: 'Make them different', body: 'Name the styles or angles: "one formal, one friendly, one very short".' },
        { title: 'Ask which it would pick, and why', body: 'Its reasons help you think, even if you disagree with its pick.' },
        { title: 'Combine and refine', body: '"Take option 2, but use the ending from option 4, and make it shorter."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Options turn the AI from an author into an assistant. You stay the one who decides.',
    },
    {
      kind: 'check',
      question: 'How many options is usually a good number to ask for?',
      options: ['1', '3 to 5', '50'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is getting options and choosing well.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why ask for options instead of one answer?',
        options: [
          { text: 'You can compare and choose, instead of just accepting or rejecting one guess' },
          { text: 'The AI works harder', why: 'It is not about effort. It is about giving you a choice.' },
          { text: 'One answer is always wrong', why: 'Not always. But you cannot tell without something to compare.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a request for genuinely different options.',
        tiles: ['Give', 'me', '3', 'options,', 'each', 'in', 'a', 'different', 'style'],
        distractors: ['same', '100'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good options request, or not?',
        groups: ['Good', 'Not great'],
        items: [
          { text: '3 headlines: one curious, one benefit-first, one short', group: 0 },
          { text: '20 headlines', group: 1 },
          { text: 'A headline', group: 1 },
          { text: '4 openings for my talk, each with a different hook', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I like option 2, but the ending of option 4 is better. Can we have both?',
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'Take option 2, use the ending from option 4, and keep it under 8 words.' },
          { text: 'Start again with new options.', why: 'They already like parts of two. Combine them.' },
          { text: 'Pick one for us.', why: 'Lucía already chose. Combine her picks.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the options routine in order.',
        lines: ['Ask for 3 to 5 options', 'Make them different styles', 'Ask which it would pick and why', 'Combine and refine your favourite'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Options turn the AI from an author into an ... (one word)',
        answers: ['assistant', 'helper'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem with this options request.',
        lines: ['Give me 5 slogans for our sign-up page.', 'Make them all very similar.', 'Under 6 words each.'],
        bug: 1,
        fix: 'Make each one a different angle: speed, safety, simplicity, fun, savings.',
        explanation: 'Similar options give you nothing to choose between.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each style to an example subject line.',
        pairs: [
          ['Curious', '"The 30-second change you\'ll love"'],
          ['Benefit-first', '"Sign up in half the time"'],
          ['Short', '"It\'s here"'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada needs an opening line for her team presentation. Which request is best?',
        options: [
          { text: 'Write an opening line.', why: 'One guess, nothing to compare.' },
          {
            text: 'Give me 4 opening lines for a 5-minute talk to my team about our new sign-up flow: one with a question, one with a number, one with a short story, one very direct.',
          },
          { text: 'Write the perfect opening line.', why: '"Perfect" is not a style. Still one guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the refine request.',
        template: 'Take option [[1]], use the ending from option 3, and make it [[2]].',
        blanks: [['2', 'two'], ['shorter', 'short']],
        distractors: ['99', 'longer and vaguer'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who decides?',
        groups: ['Ada decides', 'The AI suggests'],
        items: [
          { text: 'Which option to send', group: 0 },
          { text: 'Five different subject lines', group: 1 },
          { text: 'Reasons each option might work', group: 1 },
          { text: 'Whether the reasons make sense', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your AI picked option 3 as "the best", but our customers hate urgency. What do we do?',
        prompt: 'What should Ada say?',
        options: [
          { text: 'Its pick is just an opinion. We know our customers, so we go with option 1.' },
          { text: 'The AI picked it, so we have to use it.', why: 'You decide. Its pick is a suggestion.' },
          { text: 'Ask it to pick again until it agrees with us.', why: 'Just choose. You know your customers.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many options is a good number to ask for? (a range, e.g. "2 to 4")',
        answers: ['3 to 5', '3-5', 'three to five', '3 5'],
        placeholder: 'e.g. 2 to 4',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Only one answer', 'Ask for 3 to 5 options'],
          ['Options all look alike', 'Name a different style for each'],
          ['Like parts of two', 'Combine them'],
          ['Too many to read', 'Ask for fewer'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After getting options, what is the most useful follow-up?',
        options: [
          { text: '"Which would you pick for this audience, and why?"' },
          { text: '"Are you sure?"', why: 'It will just say yes or reshuffle.' },
          { text: '"Write 50 more."', why: 'More options, not better ones.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What is one thing you write often (subject lines, openings, titles) where options would help you?',
    starters: ['I often write...', 'Next time I will ask for options in...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Ask for 3 different versions of your next important sentence. Pick one, then combine it with another.',
  },
  notes: 'The story outcome ("opened by far more people than usual") is fictional narrative, not a statistic.',
};

export default lesson;
