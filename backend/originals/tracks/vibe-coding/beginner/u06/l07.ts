import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 7. Myth or Fact: ask why, not "fix it". */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Ask why, not "fix it"',
  summary: 'The gig list shows Saturday\'s brunch on Friday. "Fix the date" gets a patch that adds a day. Then Sunday shows on Monday. "Why is it a day early?" gets the real cause in one answer.',
  minutes: 11,
  outcomes: [
    'Ask for the cause before the fix',
    'Spot a patch that hides a bug instead of fixing it',
    'Ask for options, then choose',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: '"Fix it" can get you a patch that makes the symptom go away and leaves the cause.', isFact: true, explain: 'Adding a day to every date hides the problem for one gig and breaks others.' },
        { text: 'If the symptom is gone, the bug is fixed.', isFact: false, explain: 'Only if the cause is gone. The date bug came back the next day, one day later.' },
        { text: 'Asking "why is this happening?" first usually leads to a smaller, better fix.', isFact: true, explain: 'The real cause: dates were saved in a different time zone and shown in New Orleans time. One line, fixed properly.' },
        { text: 'You should accept the first fix it suggests.', isFact: false, explain: 'Ask for two or three options with pros and cons. You choose. You\'re still the director.' },
        { text: 'Time zones, blanks and money with decimals are classic sources of real bugs.', isFact: true, explain: 'They\'re classic edge cases. When something is "off by one" day or cent, suspect them.' },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'The Nov 7 gig shows as Nov 6. Every gig is one day early.\nWhy is this happening? Explain the cause. Then give me 2 options to fix it, with pros and cons. Don\'t change code yet.',
      caption: 'Ask why, then ask for options.',
    },
  ],
  apply: {
    scenario: 'The day-early gigs.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which message gets to the real cause?',
        options: [
          { text: 'Fix the dates', why: 'Invites a patch, like "add one day".' },
          { text: 'Every gig shows one day early. Why? Explain the cause, then give me 2 fix options. Don\'t change code yet.' },
          { text: 'Add one day to all dates', why: 'That\'s a patch that hides the cause.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real fix, or a patch that hides the bug?',
        groups: ['Real fix', 'Hiding patch'],
        items: [
          { text: 'Show dates in New Orleans time', group: 0 },
          { text: 'Add one day to every date', group: 1 },
          { text: 'Hide the date column', group: 1 },
          { text: 'Save dates with their time zone', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'It said "Fixed by adding 1 day!" and Saturday shows right now. Done?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Done!', why: 'Check other days: the cause is still there.' },
          { text: 'Ship it.', why: 'Patches come back.' },
          { text: 'That hides the symptom. Let\'s ask why it was early in the first place.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order.',
        template: 'Ask [[1]] first. Then ask for [[2]]. Then choose.',
        blanks: [['why'], ['options']],
        distractors: ['nothing', 'one fix'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the AI\'s "fix" is the hiding patch?',
        lines: [
          'const d = new Date(gig.date);',
          'd.setDate(d.getDate() + 1);  // make it show the right day',
          'show(d.toLocaleDateString("en-US", { timeZone: "America/Chicago" }));',
        ],
        bug: 1,
        fix: 'Remove it, and show dates in the gig\'s own time zone.',
        explanation: 'Adding a day doesn\'t fix the time zone; it moves the error around.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for two or three options instead of one fix?',
        options: [
          { text: 'You see the trade-offs and choose; you stay the director' },
          { text: 'More code is better', why: 'Options are ideas, not more code.' },
          { text: 'The AI requires it', why: 'It\'s your choice to ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two words: the setting that decides what "Saturday" means around the world.',
        answers: ['time zone', 'timezone', 'time zones'],
        placeholder: '.... ....',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symptom to the classic suspect.',
        pairs: [
          ['A day early or late', 'Time zones'],
          ['A few cents off', 'Decimals in money'],
          ['Crash on an empty field', 'Blanks'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI gives two options: "store dates with time zone" (bigger change, fixes it for good) and "always show New Orleans time" (small, fine for one city). Hazel\'s band only plays in New Orleans. Which?',
        options: [
          { text: 'Neither, add a day', why: 'That\'s the hiding patch.' },
          { text: 'Ask for a third option', why: 'Both are good; pick by your situation.' },
          { text: 'The small one fits her situation, written down in CLAUDE.md as a house rule' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from lesson 4: how does Hazel prove the date fix?',
        options: [
          { text: 'Check that several gigs on different days all show the right date' },
          { text: 'Trust the explanation', why: 'Explanations are claims.' },
          { text: 'Check one gig', why: 'The patch also made one gig right.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where do people treat symptoms instead of causes (at work, at home, in health)? What\'s the "why" question there?',
  },
  deepen: {
    title: 'On your computer: why first',
    summary: 'For your next bug, ask "Why is this happening? Explain the cause, then give me 2 options with pros and cons. Don\'t change code yet." Pick one, and write the decision in CLAUDE.md if it\'s a house rule.',
  },
  notes: 'Time-zone off-by-one: a date-only string parsed as UTC midnight shows as the previous day in US time zones (New Orleans is America/Chicago, Central Time). Tey\'s "huge share" claim is phrased qualitatively; no statistic.',
};

export default lesson;
