import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Prompt Lab: the four-part recipe. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The recipe',
  summary: 'Lucía has one Saturday in Oaxaca to see three venues. "Plan my Saturday" gets her a brunch and a gym session. Build the prompt that gets her a real day, part by part.',
  minutes: 13,
  outcomes: [
    'Use the four-part recipe: task, context, limits, format',
    'Know which part fixes which kind of bad answer',
    'Write a complete prompt in under a minute',
  ],
  learn: [
    {
      kind: 'promptLab',
      title: 'One Saturday in Oaxaca',
      task: 'Get Lucía a timed plan for seeing three venues in one day.',
      base: 'Plan my Saturday.',
      parts: [
        { label: 'Context', text: 'I\'m flying into Oaxaca for one day to see 3 venues for my parents\' anniversary party.' },
        { label: 'Limits', text: 'I land at 9 a.m., my flight home is at 7 p.m., and I don\'t drive.' },
        { label: 'Format', text: 'Give it as a timed schedule, one line per stop.' },
        { label: 'Be creative', text: 'Be creative.' },
      ],
      replies: [
        { uses: [], text: 'Here\'s a relaxing Saturday: sleep in, brunch with friends, a gym session, then a movie night!', note: 'A lovely Saturday for someone else. With no context it guessed a normal weekend.' },
        { uses: [3], text: 'How about a sunrise hot-air balloon ride, a pottery class and a rooftop dinner?', note: '"Be creative" made it more fun and no more useful. It still doesn\'t know what the day is for.' },
        { uses: [2], text: '9:00 Brunch\n11:00 Gym\n13:00 Shopping\n16:00 Coffee\n20:00 Movie', note: 'Nice format, wrong day. Format controls the shape, not the content.' },
        { uses: [0], text: 'Visit each venue, ask about price and capacity, take photos, and try the local food while you\'re there!', note: 'Now it knows the job. But it can\'t plan times it doesn\'t know about.' },
        { uses: [0, 1], text: 'Since you land at 9 and fly at 7 without a car, book taxis between venues, see two in the morning and one after lunch, and leave for the airport by 5.', note: 'Close. The plan respects her limits, but it\'s a paragraph she\'ll have to rewrite on her phone.' },
        { uses: [0, 1, 2], text: '9:00 Land, taxi to the city centre\n10:00 Venue 1 (ask: capacity, price, food rules)\n11:30 Venue 2\n13:00 Lunch near Venue 3\n14:30 Venue 3\n16:00 Compare notes, call Mamá\n17:00 Taxi to the airport\n19:00 Flight home', note: 'Task, context, limits, format. A day she can follow from her phone. That\'s the recipe.' },
      ],
      goal: 5,
    },
    {
      kind: 'text',
      html: '<p><strong>The recipe</strong> has four parts. You won\'t always need all four, but checking them takes ten seconds.</p><ul><li><strong>Task</strong>: what you want (plan, write, explain, compare).</li><li><strong>Context</strong>: who it\'s for, what it\'s about, why.</li><li><strong>Limits</strong>: time, money, length, must-haves, must-nots.</li><li><strong>Format</strong>: a list, a table, a timed schedule, three options, a short message.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Wrong kind of answer? Add context. Unrealistic answer? Add limits. Right answer, awkward shape? Add a format.',
    },
  ],
  apply: {
    scenario: 'Writing complete prompts.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the recipe to an example.',
        pairs: [
          ['Task', 'Plan my Saturday'],
          ['Context', 'Seeing 3 venues for a party'],
          ['Limits', 'Land at 9, fly at 7, no car'],
          ['Format', 'A timed schedule'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The answer was a nice schedule for the wrong kind of day. Which part was missing?',
        options: [
          { text: 'Format', why: 'The shape was fine; the content was wrong.' },
          { text: 'Context' },
          { text: 'A polite greeting', why: 'Politeness doesn\'t tell it what the day is for.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is each line context or a limit?',
        groups: ['Context', 'Limit'],
        items: [
          { text: 'It\'s for my parents\' anniversary', group: 0 },
          { text: 'Under MX$10,000', group: 1 },
          { text: 'I don\'t drive', group: 1 },
          { text: 'I\'m seeing venues', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s prompt in recipe order: task, context, limits, format.',
        tiles: ['Plan my Saturday.', 'I\'m seeing 3 venues in Oaxaca.', 'I land at 9 and fly at 7.', 'Give it as a timed schedule.'],
        distractors: ['Be creative!'],
      },
      {
        kind: 'mcq',
        prompt: 'The plan has her taking the bus to a venue two hours away and back before lunch. What should she add?',
        options: [
          { text: 'A format', why: 'The shape isn\'t the problem; the plan is unrealistic.' },
          { text: 'A compliment', why: 'It needs facts, not praise.' },
          { text: 'Limits, like her time and how she\'ll travel' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this prompt adds nothing useful?',
        lines: [
          'Write a message inviting my aunts to the party.',
          'Make it super good please.',
          'It\'s my parents\' 35th, in Oaxaca on the 30th.',
          'Under 50 words, warm and simple.',
        ],
        bug: 1,
        fix: 'Delete it, or say what "good" means: warm, short, includes the date.',
        explanation: '"Super good" is a wish, not a detail. The other lines are task, context and limits.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The four parts.',
        template: 'Task, [[1]], limits, [[2]].',
        blanks: [['context'], ['format']],
        distractors: ['emotion', 'length'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt uses the whole recipe?',
        options: [
          { text: 'Ideas for dinner.', why: 'Task only.' },
          { text: 'I\'m cooking for my parents tonight. Ideas please, be creative!', why: 'Task and context, no limits or format.' },
          { text: 'Give me 3 dinner ideas for my parents tonight. Papá can\'t eat spicy food, I have 40 minutes, list the ingredients for each.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which part of the recipe decides the shape of the answer: a list, a table, a short message?',
        answers: ['format', 'the format'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Send me the prompt that finally worked. I want to see if you used the recipe.',
        prompt: 'Which one should Lucía send?',
        options: [
          { text: 'Plan my Saturday in Oaxaca, make it perfect.', why: 'No limits or format.' },
          { text: 'Plan my Saturday. I\'m seeing 3 venues in Oaxaca, I land at 9, fly at 7, no car. Timed schedule please.' },
          { text: 'Saturday?', why: 'Not even a task.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of one thing you have to plan this week. Write a prompt for it with all four parts: task, context, limits, format.',
    starters: ['Task:... Context:... Limits:... Format:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Paste your recipe prompt from the Reflect step into any AI tool. Then remove one part (say, the limits) and ask again in a new chat. What changed?',
  },
  notes: 'Task/context/limits/format is a simplified version of common prompting guidance (be specific, give context, state constraints, specify output format) found in AI providers\' public prompting guides. Fictional schedule.',
};

export default lesson;
