import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 18 — Clinton's "what I learned" note after the no. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'What the no taught me',
  summary: 'A week after the email, Miracle asks Clinton to write one short note to himself about the Njangi Pay process. Not about the result. About what he learned. Tap each line.',
  minutes: 11,
  outcomes: ['Write a short review of a process, not just a result', 'Keep what worked', 'Choose what to change next time'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Clinton\'s note',
      text: 'Njangi Pay, what I learned.\nWorked: my opener, the STAR stories, the thank-you email, calling Brenda early when the bus broke.\nDidn\'t: my testing answers were thin.\nChanging: tests on every project from now; practise one technical question a week with Kofi.\nKeeping: several doors open. Kmer\'s offer exists because I didn\'t stop.\nNext: decide on Kmer by Friday; check Njangi Pay roles in two months.',
      hotspots: [
        { phrase: 'Worked: my opener, the STAR stories', note: 'Start with what worked. A no doesn\'t erase what you did well, and you\'ll want to repeat it.' },
        { phrase: 'Didn\'t: my testing answers were thin.', note: 'One specific thing, without drama. "Thin", not "terrible".' },
        { phrase: 'tests on every project from now', note: 'A change that\'s small and specific enough to actually happen.' },
        { phrase: 'Kmer\'s offer exists because I didn\'t stop.', note: 'The evidence that momentum works. Worth writing down so he believes it next time.' },
        { phrase: 'check Njangi Pay roles in two months', note: 'The open door, with a date. Without a date, it never happens.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Worked, didn\'t, changing, keeping, next. Five lines about the process, not a verdict on you.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his note.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the note in order.',
        lines: ['What worked', 'What didn\'t', 'What I\'m changing', 'What I\'m keeping', 'What\'s next'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with what worked?',
        options: [
          { text: 'To avoid the bad parts', why: 'The bad parts come next, calmly.' },
          { text: 'So you repeat it, and remember a no doesn\'t erase it' },
          { text: 'It doesn\'t matter', why: 'You\'ll want to repeat what worked.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worked or didn\'t?',
        groups: ['Worked', 'Didn\'t'],
        items: [
          { text: 'The 55-second opener', group: 0 },
          { text: 'Thin testing answers', group: 1 },
          { text: 'Calling Brenda early', group: 0 },
          { text: 'The thank-you email', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns the note into a verdict.',
        lines: ['Worked: my STAR stories.', 'Didn\'t: I\'m just not smart enough.', 'Changing: tests on every project.'],
        bug: 1,
        explanation: 'Name the specific thing (testing), not a judgement about yourself.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I write a note like this after every interview, even good ones?',
        options: [
          { text: 'Only after rejections.', why: 'Good ones teach you too.' },
          { text: 'Never, it\'s depressing.', why: 'It\'s about the process, not a verdict.' },
          { text: 'Yes: five lines after every process. Good ones teach me what to repeat.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Clinton\'s line.',
        pairs: [
          ['Changing', 'Tests on every project'],
          ['Keeping', 'Several doors open'],
          ['Next', 'Decide on Kmer by Friday'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why add a date to "check Njangi Pay roles"?',
        options: [
          { text: 'Without a date, it never happens' },
          { text: 'To annoy them', why: 'It\'s for him, not them.' },
          { text: 'Dates are required', why: 'Dates make it real.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the five parts.',
        template: 'Worked, didn\'t, [[1]], keeping, [[2]].',
        blanks: [['changing'], ['next']],
        distractors: ['blaming', 'crying', 'quitting'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines is the note? (a number)',
        answers: ['5', 'five', '6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'About the process, or a verdict on himself?',
        groups: ['Process', 'Verdict'],
        items: [
          { text: 'Testing answers were thin', group: 0 },
          { text: 'I\'m a failure', group: 1 },
          { text: 'Practise one technical question a week', group: 0 },
          { text: 'I\'ll never be good enough', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-line note about a recent process (an application, exam, project): worked, didn\'t, changing, keeping, next.',
    starters: ['Worked:', 'Next:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write the five-line note today, for anything recent. Keep it in the same place as your tracker.',
  },
  notes: 'A simple after-action review, adapted for job searches.',
};

export default lesson;
