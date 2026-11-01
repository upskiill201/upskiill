import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story with a choice: the list on the fridge. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The list on the fridge',
  summary: "Sunday, 9:40 p.m. Lucía has thirty days, four big jobs and a new AI assistant. Her first question gets an answer that says absolutely nothing. What should she do next?",
  minutes: 12,
  outcomes: [
    'See why a vague question gets a vague answer',
    'Add the details an AI tool cannot guess',
    'Send your first useful prompt',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 9:40 p.m., Mexico City',
      beats: [
        { speaker: 'narrator', text: 'Lucía sticks a list on the fridge. 1. Mamá and Papá\'s 35th anniversary, Oaxaca, Day 30 (she volunteered). 2. Move out by Day 28 (the landlord is selling). 3. Portuguese for São Paulo. 4. Her actual job.' },
        { speaker: 'lucia', text: 'Thirty days. Four jobs. One of me.' },
        { speaker: 'narrator', text: 'A voice note from Ada in Lagos: "Use AI. Seriously. I use it every day at work. Treat it like a very fast assistant who just met you."' },
        { speaker: 'narrator', text: 'Lucía opens an AI chat tool for the first time and types: "help me plan a party".' },
        { speaker: 'narrator', text: 'The reply: "Of course! 1. Choose a theme. 2. Set a date. 3. Make a guest list. 4. Send invitations. 5. Have fun!"' },
        { speaker: 'lucia', text: 'Thank you. Very helpful. I would never have thought of "have fun".' },
        { speaker: 'tey', text: 'Her first answer is useless, and it isn\'t the tool\'s fault. It knows nothing about her parents, Oaxaca or her budget. What should she do?' },
      ],
      choice: {
        prompt: 'What should Lucía do next?',
        options: [
          { text: 'Close the app. AI is clearly overrated.', outcome: 'Most people stop here, after one vague answer. The tool never got a fair chance: it was asked a question any stranger would answer the same way.' },
          { text: 'Tell it what it can\'t know: whose party, where, when, how many guests, the budget.', outcome: 'Yes. Ten seconds of typing turns "have fun" into a plan for 60 guests in Oaxaca on MX$40,000. Lucía sits up straight.', best: true },
          { text: 'Ask the same question again, in capitals.', outcome: 'Same question, same kind of answer. Shouting adds no information. The tool needs details, not volume.' },
        ],
      },
    },
    {
      kind: 'promptLab',
      title: 'Lucía\'s second try',
      task: 'Get a party plan that fits Lucía\'s real party.',
      base: 'Help me plan a party',
      parts: [
        { label: 'Whose party', text: 'for my parents\' 35th wedding anniversary.' },
        { label: 'The details', text: 'It\'s in Oaxaca in four weeks, 60 guests, budget MX$40,000.' },
        { label: 'Make it amazing', text: 'Make it amazing!' },
      ],
      replies: [
        { uses: [], text: '1. Choose a theme. 2. Set a date. 3. Make a guest list. 4. Send invitations. 5. Have fun!', note: 'The bare prompt. Any party on Earth fits this answer, so it helps nobody.' },
        { uses: [2], text: 'Absolutely! Here\'s an AMAZING plan: 1. Choose a fun theme! 2. Set a date! 3. Invite everyone! 4. Have the best time!', note: 'More excitement, no more information. "Amazing" doesn\'t tell it anything it can use.' },
        { uses: [0], text: 'For a 35th (coral) anniversary: 1. Pick a coral colour theme. 2. Gather old family photos. 3. Plan a toast. 4. Choose a venue. 5. Send invitations.', note: 'Better: it knows the occasion. But it still has no idea where, when, how big, or how much.' },
        { uses: [1], text: 'For 60 guests in Oaxaca in four weeks on MX$40,000: book a venue this week, budget roughly half for food and drink, send invitations by the end of week 1...', note: 'Now the plan fits the size and budget, but it doesn\'t know it\'s an anniversary.' },
        { uses: [0, 1], text: 'A four-week plan for your parents\' 35th in Oaxaca (60 guests, MX$40,000):\nWeek 1: book the venue, send save-the-dates, collect old photos.\nWeek 2: choose food (a local caterer usually beats a hotel), plan music your parents danced to.\nWeek 3: confirm numbers, plan a short toast and a photo slideshow.\nWeek 4: final payments, decorations, a run-of-the-day.\nBudget guide: food and drink about MX$20,000, venue MX$10,000, music MX$5,000, extras MX$5,000.', note: 'That\'s a plan Lucía can actually use. Same tool, same minute. The difference is what she told it.' },
      ],
      goal: 4,
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'An AI tool only knows what you tell it. Before you send, ask yourself: could a stranger give me a good answer to this? If not, add the details.',
    },
  ],
  apply: {
    scenario: 'Lucía\'s first prompts.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why was the first answer so vague?',
        options: [
          { text: 'The AI tool was broken', why: 'It worked fine. It answered exactly what it was asked.' },
          { text: 'AI only works for work tasks', why: 'Parties are fine. It needed details.' },
          { text: 'The question had no details, so any party fitted the answer' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Detail that helps the AI, or noise?',
        groups: ['Helps', 'Noise'],
        items: [
          { text: '60 guests', group: 0 },
          { text: '"Make it amazing!"', group: 1 },
          { text: 'Budget MX$40,000', group: 0 },
          { text: 'It\'s a 35th anniversary', group: 0 },
          { text: '"PLEASE HELP"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt will get the most useful answer?',
        options: [
          { text: 'Party ideas?', why: 'No occasion, size or budget.' },
          { text: 'Ideas for my parents\' 35th anniversary party: 60 guests, Oaxaca, MX$40,000.' },
          { text: 'Give me the best party ideas ever!!!', why: 'Excited, but no details.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule from tonight.',
        template: 'An AI tool only knows what you [[1]] it. Vague question, [[2]] answer.',
        blanks: [['tell'], ['vague']],
        distractors: ['pay', 'perfect'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So? Did you try it?',
        prompt: 'Lucía\'s honest reply?',
        options: [
          { text: 'Yes. It\'s useless.', why: 'The second try worked. Her first prompt was the problem.' },
          { text: 'No, I\'m scared of it.', why: 'She tried twice.' },
          { text: 'First answer: "have fun". Then I told it about Mamá and Papá, 60 guests and the budget, and it gave me a real plan.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Lucía added to what it changed.',
        pairs: [
          ['"35th anniversary"', 'The theme and the toast'],
          ['"60 guests"', 'The size of the venue'],
          ['"MX$40,000"', 'The budget split'],
          ['"Oaxaca, four weeks"', 'The timeline and local food'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many guests are coming to the anniversary party? (A number.)',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which of Lucía\'s notes to herself is wrong?',
        lines: [
          'Tell it whose party it is.',
          'If the answer is vague, give up on AI.',
          'Give it the size, place and budget.',
        ],
        bug: 1,
        fix: 'If the answer is vague, add details and ask again.',
        explanation: 'A vague answer usually means a vague question. Add what it can\'t know.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s evening in order.',
        lines: ['Writes the list on the fridge', 'Gets Ada\'s voice note', 'Asks a vague question', 'Gets "have fun"', 'Adds the details and asks again'],
      },
      {
        kind: 'mcq',
        prompt: 'A friend says "I tried AI once, it was useless." What\'s the most likely reason?',
        options: [
          { text: 'They asked something vague and stopped after one answer' },
          { text: 'AI tools only work in English', why: 'Many work in lots of languages, including Spanish.' },
          { text: 'They needed a paid version', why: 'Free versions give useful answers to clear questions.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s on your own "fridge list" this month? Pick one job and write the details a stranger would need to help you with it.',
    starters: ['My job is...', 'A stranger would need to know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open any AI chat tool. Ask a one-line question about something you\'re planning ("help me plan my week"). Then ask again with three details: who, when, and your limits (time or money). Compare the two answers.',
  },
  notes: 'Cast: Lucía (Mexico City, Nopal), Ada (Lagos) per CAST; Lucía mentored Ada in Negotiation Skills, Ada returns the favour with AI. Coral as the traditional 35th anniversary theme is a common Western convention. Budget split is illustrative, not advice. No AI products named.',
};

export default lesson;
