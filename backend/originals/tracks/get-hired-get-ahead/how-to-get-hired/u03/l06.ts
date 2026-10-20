import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 6 — the top third of a CV. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The top third',
  summary: 'The first look lands on the top third of page one. Miracle zooms into Clinton\'s new version and taps every line: what it does, and why it\'s there.',
  minutes: 11,
  outcomes: ['Build a strong top third: name, contact, profile', 'Write a two-line profile with proof', 'Remove anything that wastes the best space'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Clinton\'s top third',
      text: 'CLINTON NDI\nBuea, Cameroon · clinton.ndi@email.com · +237 6XX XXX XXX · github.com/clintonndi\nFinal-year Computer Science student who builds tools people actually use. Built a savings-group tracker now used by 42 members, and grew a campus tech meet-up from 6 to 40 regulars.\nEDUCATION\nBSc Computer Science, University of Buea · expected June',
      hotspots: [
        { phrase: 'CLINTON NDI', note: 'Your name is the biggest thing on the page. No "Curriculum Vitae" title: everyone knows what it is.' },
        { phrase: 'clinton.ndi@email.com', note: 'A plain email with your name. It\'s free, and it\'s the first thing a recruiter copies.' },
        { phrase: 'github.com/clintonndi', note: 'One link to your proof. For non-developers, a portfolio folder or LinkedIn link does the same job.' },
        { phrase: 'who builds tools people actually use', note: 'The profile opens with who he is, in plain words. No adjectives like "dynamic" or "passionate".' },
        { phrase: 'now used by 42 members', note: 'Proof with a number in the first two lines. If the recruiter stops reading here, they still remember this.' },
        { phrase: 'EDUCATION', note: 'Plain headings in capitals or bold. The eye finds them instantly, exactly what the eye-tracking study found.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Top third: your name big, contact in one line, one link, and a two-line profile with your best proof.',
    },
  ],
  apply: {
    scenario: 'Clinton builds his top third.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t Clinton write "Curriculum Vitae" at the top?',
        options: [
          { text: 'Everyone knows what it is; his name should be the biggest thing' },
          { text: 'It\'s against the law', why: 'It\'s allowed, just wasted space.' },
          { text: 'It\'s too short', why: 'It\'s not about length. The space is better used for his name.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each top-third line to its job.',
        pairs: [
          ['CLINTON NDI', 'The biggest thing on the page'],
          ['github.com/clintonndi', 'One link to his proof'],
          ['Built a tracker used by 42 members', 'Proof in the first two lines'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the top third, or not?',
        groups: ['Top third', 'Not there'],
        items: [
          { text: 'Name', group: 0 },
          { text: 'Two-line profile with proof', group: 0 },
          { text: 'A list of hobbies', group: 1 },
          { text: 'One portfolio link', group: 0 },
          { text: 'Five different social media links', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the profile line that wastes space.',
        lines: ['Final-year CS student who builds tools people use.', 'I am a passionate, motivated and dynamic individual.', 'Built a savings tracker used by 42 members.'],
        bug: 1,
        explanation: 'Three adjectives, no proof. The other two lines show it without claiming it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your profile is five lines. Can you do it in two?',
        options: [
          { text: 'Yes: who I am in one line, my best proof in the second.' },
          { text: 'No, everything in it matters.', why: 'Two lines get read. Five often don\'t.' },
          { text: 'I\'ll cut it to one word.', why: 'Too short to prove anything. Two lines.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which two-line profile is best for Ngum (accounting)?',
        options: [
          { text: '"Final-year Accounting student. Ran the netball club\'s accounts for a season and closed with a 40,000-franc surplus."' },
          { text: '"Hardworking and detail-oriented accounting enthusiast."', why: 'Claims, no proof.' },
          { text: '"Seeking an accounting position."', why: 'An objective: what she wants, not what she offers.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the top-third rule.',
        template: 'Your name [[1]], contact in one line, and a [[2]]-line profile with proof.',
        blanks: [['big', 'biggest'], ['two']],
        distractors: ['small', 'five', 'ten'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines should the profile be? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why put a number in the profile?',
        options: [
          { text: 'If the recruiter stops reading there, they still remember a concrete result' },
          { text: 'Numbers look technical', why: 'It\'s about memory and proof, not looks.' },
          { text: 'It\'s required', why: 'Not required, just powerful.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good or bad contact detail?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'clinton.ndi@email.com', group: 0 },
          { text: 'coolboy_clint99@email.com', group: 1 },
          { text: 'City and country only', group: 0 },
          { text: 'Full home address and ID number', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own two-line profile: who you are, then your best proof with a number.',
    starters: ['Line 1: ...', 'Line 2: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write three versions of your two-line profile. Read each one in seven seconds. Keep the one that leaves you with a clear picture.',
  },
  notes: 'Top-of-CV guidance (name prominent, single contact line, short profile with evidence) follows careers-service templates and the Ladders 2018 finding that clear headings hold attention. The phone number is masked in the example.',
};

export default lesson;
