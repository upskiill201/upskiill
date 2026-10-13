import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4; ends the free stretch on a win. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: your first useful answers',
  summary: 'No new ideas. Prove you can turn a vague request into a useful one.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: [
    'Show you can spot what a request is missing',
    'Use Who, What, Why, How and role, goal, format together',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Checkpoint time. No new ideas today, just everything from the last four lessons, mixed up and a little harder.",
          replies: ["Let's go", 'How hard?'],
        },
        {
          tey: "Hard enough that passing means something. Quick warm-up: when an AI answer comes out generic, what's usually the real problem?",
          replies: ['The request', 'The AI tool'],
        },
        {
          tey: "The request. Every gap is a guess. Remember that and you'll be fine. Ready when you are.",
        },
      ],
    },
  ],
  apply: {
    scenario: "Checkpoint: Ada's busiest morning yet.",
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do vague requests get generic answers?',
        options: [
          { text: 'The AI fills every gap with the most likely, average guess' },
          { text: 'The AI is lazy with short requests', why: 'It is not lazy. It is guessing what you left out.' },
          { text: 'Short requests are blocked', why: 'They work, they are just vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what it covers.',
        pairs: [
          ['Who', 'The reader'],
          ['What', 'The facts'],
          ['Why', 'The goal'],
          ['How', 'Length, tone and format'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An AI tool writes the words most likely to come ... (one word)',
        answers: ['next'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the AI know this, or must Ada tell it?',
        groups: ['It knows', 'Ada must tell it'],
        items: [
          { text: 'How a thank-you note usually sounds', group: 0 },
          { text: 'Which design Lucía chose yesterday', group: 1 },
          { text: 'That the budget was cut this morning', group: 1 },
          { text: 'What bullet points are', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request will get Ada the best update for Lucía?',
        options: [
          { text: 'Write an update.', why: 'No reader, no facts, no goal, no format.' },
          { text: 'Write a professional and amazing update for a client.', why: 'Adjectives, but still no facts or goal.' },
          {
            text: 'Write a 5-line update to Lucía, our client. Sign-up screens are done; testing moved to Friday. She needs to approve the palette by Wednesday. Friendly.',
          },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem in this request.',
        lines: [
          'You are an editor who writes for busy clients.',
          'Goal: get Lucía to approve the palette.',
          'Format: whatever you think is best.',
          'Facts: testing moved to Friday.',
        ],
        bug: 2,
        fix: 'Format: five lines, one question at the end.',
        explanation: '"Whatever you think" hands the format back to a guess.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Morning! Quick: what's the status, and do you need anything from me?",
        prompt: 'Which reply should Ada send?',
        options: [
          { text: 'Sign-up is done; testing is Friday. I need one thing: your OK on the palette by Wednesday.' },
          { text: 'All good, nothing needed!', why: 'She does need the palette approved.' },
          { text: 'Lots happening, will update soon.', why: 'Lucía asked for status. This gives none.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the rule from lesson 2.',
        tiles: ['It', 'brings', 'the', 'writing,', 'you', 'bring', 'the', 'situation'],
        distractors: ['luck'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the request.',
        template: 'You are a patient [[1]]. Explain an API to a designer in [[2]] sentences with one [[3]].',
        blanks: [['teacher'], ['3', 'three'], ['example']],
        distractors: ['villain', '300', 'password'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Role, goal or format?',
        groups: ['Role', 'Goal', 'Format'],
        items: [
          { text: 'You are a hiring manager', group: 0 },
          { text: 'Help me choose one supplier today', group: 1 },
          { text: 'A table with price and speed', group: 2 },
          { text: 'One paragraph, under 60 words', group: 2 },
          { text: 'Get a yes on the budget', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: "The AI's summary said the launch is in May. Nobody said May. What happened?",
        options: [
          { text: 'The launch date was missing, so it guessed a likely one' },
          { text: 'It found the date online', why: 'Your launch date is not online.' },
          { text: 'May must be correct', why: 'Confident is not the same as correct.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía needs to compare 3 options quickly. Best format? (one word)',
        answers: ['table', 'a table'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Far too long', 'Set the length'],
          ['Invented a fact', 'Give the facts'],
          ['Wrong tone for a client', 'Say who it is for'],
          ['No clear point', 'State the goal'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can I get a version of the update my boss can read in ten seconds?',
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'Rewrite this update for a senior manager: 2 lines, status first, then the one decision needed.' },
          { text: 'Make this update better.', why: 'Better how? Ten seconds means very short.' },
          { text: 'Add more detail to this update.', why: 'More detail takes longer to read.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for any AI request.',
        lines: [
          'Decide what you need the answer for',
          'Give the role and the goal',
          'Add the facts only you know',
          'Set the format and length',
          'Check the answer before you use it',
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the false belief.',
        lines: [
          'The AI learned how things are usually written.',
          'It sounds confident, so I can skip checking.',
          'It cannot see my meeting notes unless I share them.',
        ],
        bug: 1,
        fix: 'It always sounds confident. Check the facts.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Ready to send to the AI, or still missing something?',
        groups: ['Ready', 'Missing something'],
        items: [
          { text: 'Write something for our website.', group: 1 },
          { text: 'You are a copywriter. Write 3 headline options for our homepage about saving time on invoices, under 8 words each.', group: 0 },
          { text: 'Summarise the meeting.', group: 1 },
          { text: 'Here are my notes: [notes]. Summarise in 4 bullets for my manager: decisions, owners, deadlines, risks.', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checklist.',
        template: 'Who is it [[1]]? What [[2]]? Why am I writing? How should it [[3]]?',
        blanks: [['for'], ['happened'], ['look']],
        distractors: ['cost', 'sleep'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada needs to say no to a meeting politely. Which request is best?',
        options: [
          { text: 'Write a no.', why: 'No reader, no reason, no tone.' },
          {
            text: "Write a warm 3-line reply to Lucía declining Thursday's 4pm meeting because I'm presenting then, and offer Friday at 10 instead.",
          },
          { text: 'Write the politest no in history.', why: 'A wish, not a detail.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a format instruction for a busy reader.',
        tiles: ['3', 'bullets,', 'decision', 'first'],
        distractors: ['essay', 'maybe'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I asked an AI for our competitor\'s prices and it gave me exact numbers. Should I put them in the deck?',
        prompt: 'What should Ada say?',
        options: [
          { text: "Let's check them first. It may have guessed or used old information." },
          { text: 'Yes, it sounded sure.', why: 'It always sounds sure.' },
          { text: 'Only if the numbers look round.', why: 'Round or not, they need checking.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"You are an editor for busy clients" is the ... (one word)',
        answers: ['role', 'the role'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each lesson idea to its rule.',
        pairs: [
          ['Generic answers', 'Come from vague requests'],
          ['What AI knows', 'How things are usually written'],
          ['Who, What, Why, How', 'The context checklist'],
          ['Role, goal, format', 'The request recipe'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the strongest request?',
        options: [
          { text: 'Help me with my email.', why: 'Help how? No facts, no goal.' },
          {
            text: "You are an editor. Goal: get Lucía's OK by Wednesday. Format: 4 lines. Facts: testing moved to Friday because of a sign-up bug.",
          },
          { text: 'Please please write a great email.', why: 'Politeness is fine, but it adds no detail.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Final one. Which line should Ada remove?',
        lines: [
          'Write to Lucía, our client contact.',
          'Testing moved to Friday because of a sign-up bug.',
          'She needs to approve the palette by Wednesday.',
          'Make it the best email ever.',
          '4 lines, friendly, ask in the last line.',
        ],
        bug: 3,
        explanation: '"Best ever" adds nothing. The other lines already do the work.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which belief is true?',
        groups: ['True', 'False'],
        items: [
          { text: 'A clear request beats a fancier AI tool', group: 0 },
          { text: 'Confident answers are always correct', group: 1 },
          { text: 'One or two clear sentences of context is often enough', group: 0 },
          { text: 'The AI knows what happened in my meeting', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You just passed your first Checkpoint. What will you do differently the next time you ask an AI tool for something at work?',
    starters: ['Next time I will...', 'The biggest change for me is...'],
  },
  deepen: {
    title: 'Keep going',
    summary: 'Use Who, What, Why, How plus role, goal, format on three real requests before your next lesson.',
  },
  notes: 'Review of lessons 1–4 only. No new claims.',
};

export default lesson;
