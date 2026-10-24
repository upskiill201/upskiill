import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 7 — the bullet formula: strong verb + what you did + result. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The bullet formula',
  summary: 'Every CV bullet has about two seconds to earn its place. Tey gives Clinton a three-part formula he can use for every single line, from his meet-up to his aunt\'s phone stall.',
  minutes: 11,
  outcomes: ['Write CV bullets with the verb + action + result formula', 'Start every bullet with a strong verb', 'Keep bullets to one or two lines'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'A CV bullet gets about two seconds. It needs to say what you did and why it mattered, fast. Here\'s a formula that does both: strong verb, plus what you did, plus the result.',
          replies: ['Show me'],
        },
        {
          tey: 'Clinton\'s phone stall, before: "Helped customers with phone problems." After: "Diagnosed faults and quoted repairs for about 15 customers every Saturday, with most returning for later repairs."',
          replies: ['Verb, what, result!', 'Why start with the verb?'],
        },
        {
          tey: 'Because the eye reads the first word of each bullet. "Diagnosed", "Grew", "Built", "Cut": the reader knows what kind of person you are before they finish the line. Starting with "I" or "Was responsible for" wastes that first word.',
          replies: ['What if there\'s no number?'],
        },
        {
          tey: 'Use a real change instead: "so captains stopped double-booking pitches", "adopted by a second group". And keep each bullet to one or two lines. If it needs three, it\'s probably two bullets.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Strong verb + what you did + result. One or two lines. The first word does the most work.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites every bullet.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the bullet formula in order.',
        lines: ['Strong verb', 'What you did', 'The result'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a bullet for the meet-up.',
        tiles: ['Grew', 'weekly', 'attendance', 'from', '6', 'to', '40', 'in', 'one', 'year'],
        distractors: ['responsible', 'helped'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong first word or weak first word?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Built', group: 0 },
          { text: 'Was responsible for', group: 1 },
          { text: 'Cut', group: 0 },
          { text: 'Helped with', group: 1 },
          { text: 'Trained', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the bullet missing a result.',
        lines: ['Built a fixtures sheet so captains stopped double-booking pitches.', 'Built a website for the meet-up.', 'Cut daily group messages from 200 to one update.'],
        bug: 1,
        fix: 'Built a sign-up page for the meet-up; 25 people signed up in the first week.',
        explanation: 'Verb and action, but no result. What changed because the site existed?',
      },
      {
        kind: 'mcq',
        prompt: 'Why should each bullet start with a strong verb?',
        options: [
          { text: 'Grammar rules require it', why: 'It\'s about attention, not grammar.' },
          { text: 'The eye reads the first word, so it should say what you did' },
          { text: 'Verbs are shorter', why: 'Some are long. It\'s about what the first word tells the reader.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My Njangi Tracker bullet is four lines long. Too much?',
        options: [
          { text: 'Four lines is perfect.', why: 'Long bullets get skimmed. One or two lines.' },
          { text: 'Cut it to "Built an app".', why: 'Too short: no what, no result.' },
          { text: 'Probably two bullets: one for what I built, one for the result and second group.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of this bullet to its role: "Built a payment tracker for a 12-member savings group, ending monthly disputes."',
        pairs: [
          ['Built', 'Strong verb'],
          ['a payment tracker for a 12-member savings group', 'What you did'],
          ['ending monthly disputes', 'The result'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the bullet.',
        template: '[[1]] faults and quoted repairs for about 15 customers each Saturday, with most [[2]] for later repairs.',
        blanks: [['Diagnosed'], ['returning']],
        distractors: ['Helped', 'complaining', 'Responsible'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A bullet that needs three lines is probably how many bullets? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which bullet follows the formula best?',
        options: [
          { text: '"Trained 12 new meet-up members in Git; 9 pushed their first project within a month."' },
          { text: '"I was involved in training people."', why: 'Weak start, vague action, no result.' },
          { text: '"Git training."', why: 'No verb, no result.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write two CV bullets for yourself using the formula. Check: does each start with a strong verb and end with a result?',
    starters: ['Bullet 1: ...', 'Bullet 2: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take your evidence bank and turn your best four entries into formula bullets. Read just the first word of each: do they show what kind of person you are?',
  },
  notes: 'Action verb + task + result bullet structure is standard CV guidance (careers services; similar to the "XYZ" formula: accomplished X as measured by Y by doing Z). "About 15 customers" and "most returning" are kept modest and checkable.',
};

export default lesson;
