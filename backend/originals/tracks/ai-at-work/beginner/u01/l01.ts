import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 1 — free. The hook for the whole course: the problem is the request, not the AI. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why your AI answers feel generic',
  summary: 'The AI did not fail you. It filled the gaps you left with the most average answer it knows.',
  minutes: 12,
  outcomes: [
    'Spot why an AI answer came out generic',
    'Add the missing details that fix it',
    'Tell a vague request from a useful one',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If the answer is bad, you need a smarter AI tool.',
          isFact: false,
          explain: 'A smarter tool writes a more fluent guess. If the request is vague, it is still a guess.',
        },
        {
          text: 'AI tools only know what you tell them, plus what they learned before you arrived.',
          isFact: true,
          explain: "Unless you connect it to your files or paste them in, it can't see your inbox, your client or your deadline.",
        },
        {
          text: 'Polite words like "please" are what make AI answers better.',
          isFact: false,
          explain: 'Manners are fine. Details are what change the answer.',
        },
      ],
    },
    {
      kind: 'story',
      title: "Ada's first AI email",
      beats: [
        { speaker: 'narrator', text: 'Monday, 9:12, Lagos. Ada started her first job as a junior product designer three weeks ago.' },
        { speaker: 'narrator', text: 'Her manager pings her: "Can you send Lucía the project update before ten?" Lucía runs marketing at their biggest client.' },
        { speaker: 'ada', text: 'Easy. I will ask the AI to "write a project update email".' },
        { speaker: 'narrator', text: 'Four seconds later: 300 polite words about "exciting progress across key workstreams". Nothing about her actual project.' },
        { speaker: 'tey', text: "Oh, Ada. The AI didn't fail. You gave it five words, so it wrote the most average project update in the world." },
      ],
      choice: {
        prompt: 'It is 9:20. What should Ada do?',
        options: [
          {
            text: 'Ask again, and add what changed this week and what Lucía needs to decide.',
            outcome: 'The new email is five lines, specific, and ends with the one question Lucía needs to answer. Sent at 9:31.',
            best: true,
          },
          {
            text: 'Try a different AI tool with the same request.',
            outcome: 'Different tool, same five words, same average email. The gap was in the request.',
          },
          {
            text: 'Send it. It sounds professional.',
            outcome: 'Lucía replies at 10:05: "Thanks! So... where are we exactly?" Now Ada has two emails to write.',
          },
        ],
      },
    },
    {
      kind: 'compare',
      title: 'Same request, two versions',
      before: { label: 'What Ada asked', text: 'Write a project update email.' },
      after: {
        label: 'What she should ask',
        text:
          'Write a 5-line update to Lucía, our client contact. This week we finished the sign-up screens and moved testing to Friday. She needs to approve the new colour palette by Wednesday. Friendly, no jargon.',
      },
      notes: [
        'Who it is for: Lucía, a client. The tone follows.',
        'What actually happened: real facts, so nothing gets invented.',
        'What she needs to do: one clear ask.',
        'How long: five lines, so it stays readable.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every gap in your request is something the AI has to guess. Fewer gaps, better answers.',
    },
    {
      kind: 'check',
      question: 'Why did the second version work better?',
      options: ['It was longer', 'It gave facts and a clear goal', 'It was more polite'],
      answer: 1,
      explanation: 'Length on its own does nothing. Facts and a goal leave the AI less to guess.',
    },
  ],
  apply: {
    scenario: "You're helping Ada get useful answers from AI at work.",
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request will get Ada a better meeting summary?',
        options: [
          { text: 'Summarise this meeting.', why: 'For whom? How long? What matters? The AI has to guess all three.' },
          { text: 'Summarise this meeting in 5 bullets for my manager: decisions, who owns what, deadlines.' },
        ],
        answer: 1,
        explanation: 'It says who will read it, what to include, and the shape of the answer.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Hi Ada! Quick one: where is the project at? I have a call with my boss in an hour.',
        prompt: 'Which reply should Ada send?',
        options: [
          { text: 'Sign-up screens are done and testing moves to Friday. I just need your OK on the colours by Wednesday.' },
          { text: 'Great question! We are making exciting progress across many areas.', why: 'Lucía now has nothing to tell her boss.' },
          { text: "Let me check and I'll get back to you next week.", why: 'Her call is in an hour.' },
        ],
        answer: 0,
        explanation: 'Status, what changed, and the one thing she needs to do. Ready for her call.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does each part of a request help the AI, or leave it guessing?',
        groups: ['Helps', 'Leaves it guessing'],
        items: [
          { text: 'Who the answer is for', group: 0 },
          { text: '"Make it good"', group: 1 },
          { text: 'The facts it needs', group: 0 },
          { text: 'The length you want', group: 0 },
          { text: '"Something professional"', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the instruction that tells the AI how long to make it.',
        tiles: ['Keep', 'it', 'under', '5', 'lines'],
        distractors: ['maybe', 'essay'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fill in one word: a vague request makes the AI ...',
        answers: ['guess', 'guessing'],
        placeholder: 'One word',
        explanation: 'Every gap in your request is something it has to guess.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the better request.',
        template: 'Write a [[1]] update to Lucía, our client. She needs to [[2]] the colours by [[3]].',
        blanks: [['short'], ['approve'], ['Wednesday']],
        distractors: ['long', 'ignore', 'someday'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem: which line makes this request weak?',
        lines: [
          'Write an update for our client, Lucía.',
          'Make it really good and professional.',
          'Mention that testing moved to Friday.',
          'Keep it under 100 words.',
        ],
        bug: 1,
        fix: 'End with the one question she needs to answer.',
        explanation: '"Really good" gives the AI nothing it can act on.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a request to what it controls.',
        pairs: [
          ['"For my manager"', 'Who it is for'],
          ['"In 3 bullets"', 'The format'],
          ['"Testing moved to Friday"', 'The facts'],
          ['"Friendly, no jargon"', 'The tone'],
        ],
      },
      {
        kind: 'mcq',
        prompt: "Ada's first email was 300 words of \"exciting progress\". What went wrong?",
        options: [
          { text: 'The AI tool was broken', why: 'It did exactly what it was asked. The request was the problem.' },
          { text: 'She gave it no facts, so it invented a generic update' },
          { text: 'She forgot to say please', why: 'Politeness does not add facts.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put these steps in a sensible order for any AI request.',
        lines: [
          'Decide what you need the answer for',
          'Give the facts and who it is for',
          'Say the format and length',
          'Read the answer before you use it',
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last thing you asked an AI tool, or a colleague. What did you leave them to guess?',
    starters: ['I asked for...', 'I left out...', 'Next time I will add...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Take one real request you made this week and rewrite it with who it is for, the facts, and the length.',
  },
  notes: 'No statistics or product claims. Story is fictional (cast: Ada, Lucía).',
};

export default lesson;
