import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. "Pitch check" (Tap to explore): Pitch v5, the final script. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Pitch check: v5, the final script',
  summary: 'Two minutes to go. Ada reads Pitch v5 one last time, then puts the card in her pocket. Five weeks ago it was thirty floors of databases. Tap through it to see everything she\'s learned.',
  minutes: 11,
  outcomes: [
    'See the whole course in one final pitch',
    'Explain why every line is there',
    'Finish your own final version',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Pitch v5 (about 130 words)',
      text: 'Ten colleagues. Two hundred thousand naira a month. One notebook. What could possibly go wrong? One day, Tunde swore he\'d paid in March. The notebook said he hadn\'t. The office split into two teams. So I learned Python and built Ajo Tracker. It records every payment and reminds everyone before payday. Now a church treasurer in Surulere checks forty members in two seconds. One group in June, three groups and 110 members today, and ten more offices start next month. And Tunde has paid on time ever since. I\'m looking for a mentor who has grown a product from one office to many, to help me reach a hundred by next year. If that\'s you, find me after the show. No more fights about who\'s paid.',
      hotspots: [
        { phrase: 'Ten colleagues. Two hundred thousand naira a month. One notebook. What could possibly go wrong?', note: 'Chapter 3\'s hook, memorised word for word (Chapter 4). It wins the first ten seconds (Chapter 1).' },
        { phrase: 'One day, Tunde swore he\'d paid in March.', note: 'The Pixar story: a real person and a real moment. The line everyone remembers.' },
        { phrase: 'It records every payment and reminds everyone before payday.', note: 'Chapter 1: benefits, with features only as the reason they work. No databases.' },
        { phrase: 'checks forty members in two seconds', note: 'Vivid, not vague. You could photograph it.' },
        { phrase: 'One group in June, three groups and 110 members today, and ten more offices start next month.', note: 'Honest numbers that show growth, including the CEO\'s sponsorship from the dress rehearsal.' },
        { phrase: 'I\'m looking for a mentor who has grown a product from one office to many, to help me reach a hundred by next year.', note: 'The sharpened ask: specific, the right size, with a deadline. It comes before the closing line, so the microphone can\'t cut it off.' },
        { phrase: 'If that\'s you, find me after the show.', note: 'An easy next step. Nobody has to wonder what to do.' },
        { phrase: 'No more fights about who\'s paid.', note: 'The rhyming close. Then she stops, smiles and waits.' },
      ],
    },
    {
      kind: 'compare',
      title: 'v1 vs v5',
      before: {
        label: 'v1: the lift (5 weeks ago)',
        text: 'Oh! Um. Hi. So, it\'s built in Python, and there\'s a SQLite database now, with a members table... So yeah. That\'s it.',
      },
      after: {
        label: 'v5: pitch night',
        text: 'Ten colleagues. One notebook. What could possibly go wrong? ...If that\'s you, find me after the show. No more fights about who\'s paid.',
      },
      notes: [
        'Same person. Same app. Same facts.',
        'Different order, different words, different delivery.',
        'That\'s what a pitch is: making what you already have land.',
      ],
    },
  ],
  apply: {
    scenario: 'Two minutes to go.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the v5 line to the chapter that built it.',
        pairs: [
          ['"What could possibly go wrong?"', 'Chapter 3: Make it stick'],
          ['"It reminds everyone before payday"', 'Chapter 1: Benefits, not features'],
          ['"Find me after the show"', 'Chapter 5: A clear ask'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the same between v1 and v5?',
        options: [
          { text: 'The words', why: 'Almost every word changed.' },
          { text: 'The delivery', why: 'Completely different.' },
          { text: 'The person, the app and the facts' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Pitch v5 in order.',
        lines: ['Hook', 'Tunde\'s story', 'What the app does', 'The Surulere treasurer', 'Growth numbers', 'The ask', 'The easy next step', 'The rhyme'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I add one more feature at the last minute? Just to be safe?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'No. It\'s tested, timed and it sticks. Put the card in your pocket and trust it.' },
          { text: 'Yes, add the export button.', why: 'Five weeks of work says no.' },
          { text: 'Add three features.', why: 'Definitely not.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'v5 is about 130 words. A 60-second pitch fits roughly how many words? (a number)',
        answers: ['140', '130', '150'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In v1 or v5?',
        groups: ['v1 (the lift)', 'v5 (pitch night)'],
        items: [
          { text: 'A members table', group: 0 },
          { text: 'Ten more offices start next month', group: 1 },
          { text: 'So yeah. That\'s it.', group: 0 },
          { text: 'Find me after the show', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'If Ada had added a last-minute line, which would hurt v5 most?',
        lines: [
          'One group in June, three groups and 110 members today.',
          'It uses a normalised relational schema with two tables.',
          'And Tunde has paid on time ever since.',
        ],
        bug: 1,
        fix: 'Delete it: v5 is already complete.',
        explanation: 'It\'s v1 sneaking back in. Five weeks of work, undone in one line.',
      },
      {
        kind: 'mcq',
        prompt: 'What does Ada do right after "No more fights about who\'s paid"?',
        options: [
          { text: 'Says "So yeah, that\'s it"', why: 'Never again.' },
          { text: 'Stops, smiles and waits' },
          { text: 'Starts explaining the database', why: 'NEVER again.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one line.',
        template: 'Same person, same [[1]]. Different [[2]], different words, different [[3]].',
        blanks: [['facts', 'app'], ['order'], ['delivery']],
        distractors: ['database', 'features'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s easy next step.',
        tiles: ['If', 'that\'s', 'you,', 'find', 'me', 'after', 'the', 'show.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your final pitch (your v5). Then compare it with what you wrote in Chapter 1. What changed most?',
    starters: ['My v5: ...', 'The biggest change: ...'],
  },
  deepen: {
    title: 'Keep a pitch file',
    summary: 'Save every version of your pitch in one note: v1, v2, v3. Looking back shows you how far you\'ve come, and reminds you what works.',
  },
  notes: 'Synthesis of the whole course on Ada\'s final pitch. Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;
