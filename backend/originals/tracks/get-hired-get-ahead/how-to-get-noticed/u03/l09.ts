import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 9 — simple beats fancy: layout. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Simple beats fancy',
  summary: 'Clinton downloads a stunning CV template: two columns, icons, a skills wheel, a timeline graphic. It looks like a magazine. Then Mrs Ewane uploads it to a job site, and half the text comes out scrambled.',
  minutes: 11,
  outcomes: ['Choose a layout that\'s easy to read and easy for software to read', 'Avoid graphics that hide information', 'Format a CV cleanly in any free tool'],
  learn: [
    {
      kind: 'compare',
      title: 'Magazine CV vs. clean CV',
      before: { label: 'Fancy template', text: 'Two columns, a skills wheel, icons for phone and email, a timeline graphic for experience, text inside shapes.\n\nIt looks impressive for one second. But the eye has to hunt for dates and titles, and when job sites copy the text out, columns and shapes can come out jumbled or missing. In the eye-tracking study, cluttered, multi-column layouts did worse.' },
      after: { label: 'Clean layout', text: 'One column. Plain headings (PROFILE, PROJECTS, EDUCATION, EXPERIENCE, SKILLS). Bullets. Dates lined up on the right. One readable font, 10 to 12 point. Saved as a PDF unless the advert asks for Word.\n\nIt looks less exciting, and it gets read: by people in seconds, and by software without scrambling.' },
      notes: [
        'One column, plain headings, bullets, consistent dates.',
        'Information inside images or text boxes may not be read by software. Keep everything as plain text.',
        'Design jobs are different: there, your portfolio shows creativity. Keep the CV itself clear.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Paste your CV into a plain text note. If it still makes sense in order, software can read it too.',
    },
  ],
  apply: {
    scenario: 'Clinton swaps his template.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Easy to read, or a problem?',
        groups: ['Easy to read', 'A problem'],
        items: [
          { text: 'One column with plain headings', group: 0 },
          { text: 'A skills wheel graphic', group: 1 },
          { text: 'Dates lined up on the right', group: 0 },
          { text: 'Text inside shapes and icons', group: 1 },
          { text: 'One readable font, 10 to 12 point', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did half of the fancy CV come out scrambled on the job site?',
        options: [
          { text: 'The job site was broken', why: 'The site worked. The layout was hard for it to read.' },
          { text: 'Columns, shapes and images can confuse software that copies the text' },
          { text: 'The font was too pretty', why: 'The structure, not the font, caused the scramble.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But the fancy template shows I\'m creative!',
        options: [
          { text: 'True, keep it.', why: 'If it gets scrambled or skimmed, the creativity is wasted.' },
          { text: 'Add even more icons.', why: 'More clutter, more problems.' },
          { text: 'My portfolio shows creativity. The CV\'s job is to be read quickly and correctly.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the formatting choice that could hide information.',
        lines: ['Headings in bold capitals.', 'Contact details inside an image banner.', 'Bullets for each achievement.'],
        bug: 1,
        explanation: 'Software may not read text inside images. Recruiters might never get his email.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fancy feature to a clean replacement.',
        pairs: [
          ['Skills wheel', 'A short skills list with honest levels'],
          ['Timeline graphic', 'Roles with dates on the right'],
          ['Icons for phone and email', 'Plain text contact line'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Tey\'s quick test for whether software can read a CV?',
        options: [
          { text: 'Paste it into a plain text note and check it still makes sense in order' },
          { text: 'Print it in colour', why: 'Colour doesn\'t test readability by software.' },
          { text: 'Ask the software', why: 'You can\'t. But a plain-text paste shows what it sees.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the layout rule.',
        template: 'One [[1]], plain headings, bullets, and consistent [[2]].',
        blanks: [['column'], ['dates']],
        distractors: ['photo', 'icons', 'colours'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file format should Clinton usually save his CV as? (unless the advert asks for Word)',
        answers: ['pdf', 'a pdf'],
        placeholder: 'Three letters',
      },
      {
        kind: 'mcq',
        prompt: 'Ngum is applying for graphic design. Should her CV be fancy?',
        options: [
          { text: 'Yes, as fancy as possible', why: 'Designers can add a little style, but clarity still wins. The portfolio shows the rest.' },
          { text: 'No CV at all', why: 'Most applications still need one.' },
          { text: 'Keep the CV clean; show creativity in her portfolio link' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe or risky for software?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'Plain text headings', group: 0 },
          { text: 'Text in a header image', group: 1 },
          { text: 'Standard bullets', group: 0 },
          { text: 'Two columns of tables', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever chosen something because it looked impressive, and it turned out to be hard to use? What did you learn?',
    starters: ['I once chose...', 'I learned...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open your CV (or a template) and paste it into a plain text note. Does it still read in the right order? Fix anything that came out scrambled.',
  },
  notes: 'Ladders 2018: cluttered, multi-column layouts performed poorly. Text in images/text boxes and complex tables can parse badly in applicant tracking systems (common vendor and careers-service guidance); simple one-column layouts are the safe default. PDF vs Word: follow the advert.',
};

export default lesson;
