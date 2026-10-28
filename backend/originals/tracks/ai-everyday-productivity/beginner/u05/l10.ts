import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Unit Challenge (final): Day 30. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Day 30',
  summary: 'The anniversary. The new flat is full of boxes, São Paulo went well, the speech is in her pocket. At 4 p.m., the forecast says heavy rain at 7. One last problem, and everything from the course to solve it.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole kit on one real problem', 'Finish the month, and start your own'],
  learn: [
    {
      kind: 'story',
      title: 'Day 30, 4:00 p.m., the hacienda',
      beats: [
        { speaker: 'narrator', text: 'Tables for 60 under the trees. Mole from La Cocina de Inés arriving at 6. Mariachi at 8:45. And the forecast: heavy rain from 7.' },
        { speaker: 'lucia', text: 'Of course. Of course it rains.' },
        { speaker: 'narrator', text: 'She doesn\'t type "WHAT DO I DO". She opens card #8.' },
      ],
    },
    {
      kind: 'promptLab',
      title: 'Final boss: the rain plan',
      task: 'Get a rain plan Lucía can start in the next ten minutes, with the people she has.',
      base: 'It\'s going to rain at our party.',
      parts: [
        { label: 'One sentence + fixed', text: 'Heavy rain is forecast from 7 p.m. at our outdoor party for 60 at a hacienda. Fixed: tonight, these guests, food arrives at 6.' },
        { label: 'What we have', text: 'The hacienda has a covered terrace for about 40 and a big indoor hall. Helpers: me, Mateo, the hacienda staff.' },
        { label: 'Options', text: 'Give me 3 options with trade-offs, including mixing indoor and outdoor.' },
        { label: 'First step', text: 'Then tell me what to do in the next 10 minutes, and who does what.' },
        { label: 'My guest list', text: 'Here are all 60 guests\' phone numbers so you can text them.' },
      ],
      replies: [
        { uses: [], text: 'Oh no! Rain can be a real mood dampener. Consider renting a tent, or simply embracing the rain!', note: 'Renting a tent at 4 p.m. in Oaxaca on a Saturday? It has no idea what she has to work with.' },
        { uses: [4], text: 'I\'m not able to send texts, and please don\'t share other people\'s phone numbers here.', note: 'Exactly. Sixty people\'s numbers never go in the box, and it couldn\'t text them anyway.' },
        { uses: [0], text: 'Move everything indoors now, before the rain starts.', note: 'One option, no trade-offs. Is the hall even big enough? It doesn\'t know.' },
        { uses: [0, 1], text: 'Use the indoor hall for the meal and the covered terrace for the mariachi.', note: 'Better: it used what she has. But it\'s still one answer, not a choice.' },
        { uses: [0, 1, 2], text: '1) Everything in the hall: dry, but loses the garden feel. 2) Meal in the hall, mariachi and toast on the covered terrace: best of both, needs moving 10 tables. 3) Stay outside until 6:45 and move: most garden time, risky if rain comes early.', note: 'Real options with trade-offs. Option 2 looks right. Now: what happens in the next ten minutes?' },
        { uses: [0, 1, 2, 3], text: '1) Everything in the hall. 2) Meal in the hall, mariachi and toast on the covered terrace. 3) Outside until 6:45.\n\nIf you choose 2, next 10 minutes:\nYou: tell the hacienda manager, ask for 4 staff to move 10 tables by 5:30.\nMateo: text the mariachi the new spot (terrace), and move the slideshow to the hall screen.\nYou: tell Inés to deliver to the hall door at 6.\nPlan B: if rain starts before 5:30, everything goes in the hall.', note: 'Her situation, real options, a first step for each person, and a Plan B. The whole course in one prompt.' },
        { uses: [0, 1, 2, 3, 4], text: 'Please don\'t share guests\' phone numbers here. For the plan: 1) Everything in the hall...', note: 'The plan would be fine, but 60 people\'s numbers just went in the box. Remove "My guest list" and send again.' },
      ],
      goal: 5,
    },
    {
      kind: 'story',
      title: 'Day 30, 9:10 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The rain hammers the terrace roof. Nobody cares. The mariachi play Mamá and Papá\'s song at 8:45, and Abuela sings along before Mateo drives her home at 9.' },
        { speaker: 'narrator', text: 'Lucía gives the speech. The hospital car park. The yellow Volkswagen. The notes on the fridge. Papá cries first, then pretends he didn\'t.' },
        { speaker: 'narrator', text: 'Later, Mamá asks: "Who helped you with all of this, mija?"' },
        { speaker: 'lucia', text: 'A very fast assistant, Mamá. But I did the deciding.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final Challenge: AI for everyday productivity.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Day 1: "help me plan a party" got "have fun". What fixed it?',
        options: [
          { text: 'Telling it what it couldn\'t know: whose party, where, when, how many, the budget' },
          { text: 'Asking in capitals', why: 'Volume isn\'t information.' },
          { text: 'A different AI tool', why: 'The same tool worked with details.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the chapter to its skill.',
        pairs: [
          ['Thirty days', 'Useful first answers'],
          ['The flat hunt', 'Research and checking'],
          ['Words that work', 'Writing in your own voice'],
          ['Portuguese in two weeks', 'Learning with a tutor'],
          ['The week everything broke', 'Planning and problem-solving'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Check it, or fine as it is?',
        groups: ['Check it', 'Fine'],
        items: [
          { text: 'A rent figure', group: 0 },
          { text: 'Playlist ideas', group: 1 },
          { text: 'A budget total', group: 0 },
          { text: 'A law in a complaint', group: 0 },
          { text: 'Names for the slideshow', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Okay, I admit it. What\'s the one thing I should change?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Stop using AI.', why: 'He should use it better, not less.' },
          { text: 'Use a paid version.', why: 'Every card works with any tool.' },
          { text: 'Check before you trust. Numbers, names, laws, sources. And read everything before you send it.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The recipe.',
        template: 'Task, [[1]], limits, [[2]].',
        blanks: [['context'], ['format']],
        distractors: ['feelings', 'emojis'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the rain-plan prompt must go?',
        lines: [
          'Heavy rain from 7 p.m., outdoor party for 60.',
          'Here are all 60 guests\' phone numbers.',
          'Give me 3 options with trade-offs.',
          'What do I do in the next 10 minutes?',
        ],
        bug: 1,
        fix: 'Delete it.',
        explanation: 'Other people\'s private information never goes in the box.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt shows the most of what you learned?',
        options: [
          { text: 'Help me with my week.', why: 'No details at all.' },
          { text: 'Plan my week: 3 deadlines, a dentist on Thursday, 1 hour each evening. Ask me 2 questions first, then give me a day-by-day checklist. Mark anything you\'re unsure of.' },
          { text: 'Make my week amazing!', why: 'A wish, not a prompt.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What did the 2024 learning study warn about?',
        options: [
          { text: 'AI that gives answers can make practice look good and learning worse' },
          { text: 'AI tutors are always bad', why: 'The tutor version largely avoided the harm.' },
          { text: 'Students shouldn\'t study maths', why: 'It was about how they used AI.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What word did Lucía add to every comparison prompt so the AI wouldn\'t invent facts? ("Write ___, don\'t guess.")',
        answers: ['unknown', 'Unknown', 'write unknown'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the six problem-solving steps.',
        lines: ['One sentence', 'Fixed and flexible', 'Many options', 'Trade-offs', 'Decide and first step', 'Plan B'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Well?? How was it???',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Rain, mole, mariachi on the terrace, Papá crying. New flat, São Paulo said "parabéns". Your voice note on Day 1 started all of it. Thank you.' },
          { text: 'The AI threw a great party.', why: 'She threw it. AI helped.' },
          { text: 'It rained, so it was ruined.', why: 'The rain plan worked.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lucía\'s three rules or not?',
        groups: ['Her rules', 'Not her rules'],
        items: [
          { text: 'I\'m the editor', group: 0 },
          { text: 'The AI decides', group: 1 },
          { text: 'I check what matters', group: 0 },
          { text: 'I protect what\'s private', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which situation is NOT a job for AI first?',
        options: [
          { text: 'Ideas for thank-you gifts', why: 'Fine for AI.' },
          { text: 'A guest collapsing at the party' },
          { text: 'Quizzing yourself on Portuguese', why: 'A great use of AI.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the course in one line?',
        options: [
          { text: 'Let AI run your life', why: 'She did the deciding.' },
          { text: 'AI is too risky to use', why: 'It made a month possible.' },
          { text: 'AI makes you faster, checking makes you right, deciding makes it yours' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Lucía had four jobs on her fridge. What are yours for the next 30 days, and which prompt card will you use first?',
    starters: ['My four jobs:...', 'I\'ll start with card...'],
  },
  deepen: {
    title: 'Final project: your own impossible month',
    summary: 'Pick one real job from your life this month (a trip, a move, a skill, a problem). Use at least three of your prompt cards on it, check what matters, and keep your own deck. When it\'s done, write down the one prompt that saved you the most time and share it with a friend. That\'s how Lucía\'s deck reached Marta, Sofía and, eventually, Tomás.',
  },
  notes: 'Final Unit Challenge. "Parabéns" = congratulations (Portuguese). Closes all arcs: party (Day 30), flat (Day 27 move), São Paulo (Day 29 call), the job. Bastani et al. 2024 recalled.',
};

export default lesson;
