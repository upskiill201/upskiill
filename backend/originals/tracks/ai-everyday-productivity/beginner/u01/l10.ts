import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: the Sunday night plan. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Sunday night plan',
  summary: 'One week in. Lucía sits down to plan the whole month with AI: four jobs, thirty days, one prompt. Use everything from Chapter 1 to get her a plan she can live with.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Combine the recipe, follow-ups, examples, the interview and privacy', 'Turn a messy month into a plan'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 8 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The fridge list hasn\'t changed. Lucía has. She opens her prompt cards and a new chat.' },
        { speaker: 'lucia', text: 'Party, flat, Portuguese, job. One plan. Let\'s go.' },
      ],
    },
    {
      kind: 'promptLab',
      title: 'Boss level: the whole month',
      task: 'Get a week-by-week plan for all four of Lucía\'s jobs that she can actually follow.',
      base: 'Help me plan my month.',
      parts: [
        { label: 'Context', text: 'In 30 days I have: my parents\' anniversary party in Oaxaca (Day 30), moving flat (by Day 28), learning basic Portuguese for a work meeting, and a full-time job.' },
        { label: 'Limits', text: 'I have about 1 hour on weekday evenings and Saturday mornings. Sundays are for rest.' },
        { label: 'Interview me', text: 'Ask me up to 3 questions first, one at a time.' },
        { label: 'Format', text: 'Then give me a week-by-week table: week, party, flat, Portuguese.' },
        { label: 'My salary and ID', text: 'My salary is MX$38,000 and my ID number is HEGL900312.' },
      ],
      replies: [
        { uses: [], text: 'Here are some tips: set goals, use a calendar, prioritise, and take breaks!', note: 'The bare prompt gets bare advice. It knows nothing about her month.' },
        { uses: [4], text: 'Thanks for sharing! With a salary of MX$38,000, you could set a monthly budget...', note: 'Stop. Her ID number and salary don\'t help this plan at all. Never paste ID numbers.' },
        { uses: [0], text: 'That\'s a big month! Prioritise the move first since it has a hard deadline, then the party, then Portuguese...', note: 'Context helps. But how much time does she have? It doesn\'t know.' },
        { uses: [0, 1], text: 'With an hour on weeknights and Saturday mornings: weeks 1–2 on flats, week 3 on packing, Portuguese 15 minutes a night...', note: 'Realistic now. Still a paragraph, and it guessed things it could have asked.' },
        { uses: [0, 1, 3], text: 'Week 1 | Party: book venue | Flat: shortlist 5 | Portuguese: greetings\nWeek 2 | Party: invitations | Flat: viewings | Portuguese: numbers\nWeek 3 | Party: food, music | Flat: sign, pack | Portuguese: your opening line\nWeek 4 | Party: final details | Flat: move | Portuguese: rehearse', note: 'A real plan. One more part could make it fit her even better: let it ask first.' },
        { uses: [0, 1, 2, 3], text: 'Question 1: Is the venue booked yet? (Lucía: no.)\nQuestion 2: Can anyone help with the party? (Lucía: my brother Mateo, in theory.)\nQuestion 3: When is the São Paulo meeting? (Lucía: in about 6 weeks.)\n\nWeek 1 | Party: book venue this week, give Mateo the music | Flat: shortlist 5 | Portuguese: 15 min/night, greetings\nWeek 2 | Party: invitations | Flat: viewings Sat | Portuguese: numbers, your name, your company\nWeek 3 | Party: food, transport for older guests | Flat: sign, pack | Portuguese: your opening line\nWeek 4 | Party: final checks | Flat: move Day 27 | Portuguese: rehearse twice', note: 'Context, limits, the interview and a format, and nothing private. That\'s Chapter 1 in one prompt.' },
        { uses: [0, 1, 2, 3, 4], text: 'Before I start: please don\'t share ID numbers here. Question 1: Is the venue booked yet?...', note: 'The plan would be fine, but her ID number went in the box. Take that part out and send again.' },
      ],
      goal: 5,
    },
  ],
  apply: {
    scenario: 'Unit Challenge: your first useful answers.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Lucía\'s first-ever prompt was "help me plan a party". What was wrong with it?',
        options: [
          { text: 'It had no details, so any party fitted the answer' },
          { text: 'It was too polite', why: 'Politeness isn\'t the problem.' },
          { text: 'Parties are too hard for AI', why: 'With details, it made a great plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to its fix.',
        pairs: [
          ['Wrong kind of answer', 'Add context'],
          ['Unrealistic answer', 'Add limits'],
          ['Right answer, awkward shape', 'Add a format'],
          ['Don\'t know what matters', 'Let it interview you'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'It can be confidently wrong', group: 0 },
          { text: 'It knows your family already', group: 1 },
          { text: 'Answers vary a little each time', group: 0 },
          { text: 'It checks each answer in a fact database', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I pasted my passport number so it could "personalise" my travel plan.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Good idea, more personal.', why: 'ID numbers never go in.' },
          { text: 'It doesn\'t need your passport number to plan a trip. Never paste ID numbers. Use your dates and city instead.' },
          { text: 'Just paste half of it.', why: 'Half an ID number is still private.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The recipe.',
        template: '[[1]], context, limits, [[2]].',
        blanks: [['Task', 'task'], ['format', 'Format']],
        distractors: ['Feelings', 'emojis'],
      },
      {
        kind: 'mcq',
        prompt: 'The plan is good but 40 lines long. What\'s the best next message?',
        options: [
          { text: 'Start again in a new chat', why: 'The chat has all her context; steer it.' },
          { text: 'Copy it as it is', why: 'One follow-up makes it usable.' },
          { text: '"Shorter: one line per week."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s final prompt should go?',
        lines: [
          'Help me plan my month.',
          'Party Day 30, move by Day 28, Portuguese, full-time job.',
          'My ID number is HEGL900312.',
          'Give me a week-by-week table.',
        ],
        bug: 2,
        fix: 'Delete it. The plan doesn\'t need it.',
        explanation: 'ID numbers are on the never-paste list.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a great AI session.',
        lines: ['Write the recipe prompt', 'Let it ask questions first', 'Answer honestly', 'Steer with follow-ups', 'Save the prompt as a card'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day must Lucía move out? (A number.)',
        answers: ['28', 'day 28', 'twenty-eight'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Marta wants help planning her mum\'s 70th dinner. Which prompt would you give her?',
        options: [
          { text: 'Dinner ideas for a 70th?', why: 'No details.' },
          { text: 'Plan a 70th birthday dinner for my mum: 15 people, Puebla, a Saturday, about MX$8,000. Ask me 3 questions first, then give me a checklist.' },
          { text: 'Plan the best 70th ever, make it amazing!', why: 'Excitement isn\'t information.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep in this chat, or start a new one?',
        groups: ['Same chat', 'New chat'],
        items: [
          { text: 'Make the plan shorter', group: 0 },
          { text: 'Switch to the flat search', group: 1 },
          { text: 'Ask why the move is in week 4', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Okay. I\'ll admit it. That\'s a good plan. Who taught you?',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Ada, a recipe, and a lot of follow-ups. Want my prompt card?' },
          { text: 'It did it all by itself.', why: 'She told it what it needed to know.' },
          { text: 'I got lucky.', why: 'It was method, not luck.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which part of Chapter 1 stopped Lucía pasting private details?',
        options: [
          { text: 'The interview trick', why: 'That helps with missing details, not privacy.' },
          { text: 'Asking "would I be fine if a stranger read this?" and using placeholders' },
          { text: 'Using a new chat', why: 'A new chat doesn\'t protect what you paste.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Plan your next 30 days the way Lucía did. What are your four big jobs? Write the prompt you\'ll use.',
    starters: ['My four jobs are...', 'My prompt:...'],
  },
  deepen: {
    title: 'Chapter 1 challenge: try it on your own month',
    summary: 'Paste your prompt from the Reflect step into any AI tool. Let it ask you 3 questions, ask for a week-by-week table, and steer it until you\'d actually follow it. Save it as a prompt card. Next chapter: twelve flats, and an AI that sounds very sure about rents.',
  },
  notes: 'Unit Challenge for Chapter 1. Cliffhanger into Chapter 2: Monday morning, twelve flat listings in her inbox and seven days to choose. HEGL900312 is a made-up partial ID-style string, not a real number.',
};

export default lesson;
