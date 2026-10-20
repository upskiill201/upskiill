import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Mrs Ewane's red pen. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mrs Ewane\'s red pen',
  summary: 'Clinton brings his half-rewritten CV to the careers office. Mrs Ewane uncaps her red pen. "I\'ll circle everything a recruiter would skip. Then you tell me why." The first look, achievements and sections, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain how the first look works', 'Turn duties into achievements', 'Put CV sections in a strong order'],
  learn: [
    {
      kind: 'story',
      title: 'Circles',
      beats: [
        { speaker: 'narrator', text: 'Thursday, 11am. Mrs Ewane reads Clinton\'s CV at a speed he didn\'t know was possible. The red pen moves four times.' },
        { speaker: 'ewane', text: 'Four circles. "Career Objective". "Responsible for". A skill bar. And your projects are at the bottom of page two. Explain each one, and fix them, and we\'re done.' },
        { speaker: 'clinton', text: 'Only four? That\'s practically a compliment.' },
        { speaker: 'ewane', text: 'Last month\'s record was nineteen. Begin.' },
        { speaker: 'tey', text: 'Four circles, four lessons. Let\'s clear the red ink.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: clear the red pen.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Circle 1: tap the line that wastes the top of the CV.',
        lines: ['Clinton Ndi · Buea · clinton.ndi@email.com', 'Career Objective: to obtain a challenging position in a dynamic company.', 'BSc Computer Science, University of Buea, expected June'],
        bug: 1,
        fix: 'Final-year CS student who built a savings tracker used by 42 people.',
        explanation: 'An objective says what he wants. A profile says what he offers.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Circle 2: duty or achievement?',
        groups: ['Duty', 'Achievement'],
        items: [
          { text: 'Responsible for event logistics', group: 0 },
          { text: 'Grew attendance from 6 to 40 in a year', group: 1 },
          { text: 'Handled communications', group: 0 },
          { text: 'Booked 10 speakers from local companies', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Circle 3: why does a "Python: 85%" bar get circled?',
        options: [
          { text: 'It\'s a made-up measure that proves nothing; a project proves the skill' },
          { text: '85% is too low', why: 'Any number would be circled. There\'s no scale behind it.' },
          { text: 'Bars are the wrong colour', why: 'Colour isn\'t the problem. Made-up numbers are.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Circle 4: put the sections in a stronger order for Clinton.',
        lines: ['Name and contact', 'Profile', 'Projects', 'Education', 'Experience', 'Skills'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the first look at a CV decide?',
        options: [
          { text: 'Whether to read it properly' },
          { text: 'Whether you get the job', why: 'That comes much later.' },
          { text: 'Nothing', why: 'It decides whether the CV gets a proper read.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'Why is page one so important?',
        options: [
          { text: 'Because the first look is a few seconds. If my best proof isn\'t there, nobody finds it.' },
          { text: 'Because page two is unlucky.', why: 'Ha. It\'s about where the first look lands.' },
          { text: 'It isn\'t, page three is.', why: 'Very few people reach page three.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to its section.',
        pairs: [
          ['Two lines of who you are', 'Profile'],
          ['Fixtures sheet the faculty uses', 'Projects'],
          ['Captain, CS football team', 'Extras'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s rule.',
        template: 'Say what [[1]] because you were there, not what you were "[[2]] for".',
        blanks: [['changed'], ['responsible']],
        distractors: ['stayed', 'paid', 'thankful'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Ladders\' 2018 study, the first CV screen lasted about how many seconds? (a number)',
        answers: ['7.4', '7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Njangi Tracker with a link', group: 0 },
          { text: 'Hobbies: music, films, travel', group: 1 },
          { text: 'French (intermediate)', group: 0 },
          { text: 'Date of birth and ID number', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which profile would get no red circle?',
        options: [
          { text: '"Dynamic, motivated graduate seeking a challenging role."', why: 'Circle. Adjectives and wishes.' },
          { text: '"Final-year CS student. Built a savings tracker used by 42 people; grew a campus meet-up from 6 to 40."' },
          { text: '"I am applying for any job."', why: 'Circle. Says nothing about him.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If Mrs Ewane read your CV or profile, what would her red pen circle first?',
    starters: ['She\'d circle...', 'I\'d fix it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Print or open any CV (yours, or a template). Circle every objective, "responsible for", skill bar and hobby list. Count your circles.',
  },
  notes: 'Checkpoint 1 of Chapter 3 = reviews l01–l04. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
