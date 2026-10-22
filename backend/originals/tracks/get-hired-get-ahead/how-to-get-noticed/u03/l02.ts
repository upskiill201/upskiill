import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 2 — what a recruiter's eyes do: Ladders 2018 eye-tracking study. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a recruiter\'s eyes do',
  summary: 'Seven seconds isn\'t just Miracle\'s habit. A study tracked recruiters\' eyes as they read real CVs, and found the same thing: a quick first look, and simple layouts holding attention far better than clever ones.',
  minutes: 11,
  outcomes: ['Describe what the eye-tracking study found', 'Explain why simple layouts are read more easily', 'Use the first look to earn a full read'],
  learn: [
    {
      kind: 'reading',
      title: 'The eye-tracking study',
      html:
        '<p>In 2018, the US job site <strong>Ladders</strong> used <strong>eye-tracking</strong> equipment to follow exactly where recruiters looked as they reviewed real CVs. The average first screen of a CV lasted about <strong>7.4 seconds</strong>, a little longer than the roughly 6 seconds Ladders measured in 2012.</p>' +
        '<p>That first look isn\'t the whole decision. It\'s the moment a recruiter decides whether to read properly. Some CVs earned that full read far more often, and they had things in common:</p>' +
        '<ul><li><strong>Simple layouts</strong> with clear sections and headings.</li>' +
        '<li><strong>Short lines and bullet points</strong>, not long paragraphs.</li>' +
        '<li><strong>Job titles, places and dates easy to find</strong>, so the reader could follow the story.</li></ul>' +
        '<p>CVs that did badly were cluttered: multiple columns, lots of graphics, and long sentences that hid the important words.</p>' +
        '<p>It\'s one study, of one country\'s recruiters, so treat the exact number lightly. But anyone who has hired people will tell you the same: you earn a careful read by making the first look easy.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Design your CV for the first look: headings that jump out, bullets that start with results, nothing the eye has to fight through.',
    },
  ],
  apply: {
    scenario: 'Clinton reads about the eye-tracking study.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In Ladders\' 2018 study, about how long did the first screen of a CV last?',
        options: [
          { text: 'About 7 minutes', why: 'Much shorter: about 7.4 seconds for the first look.' },
          { text: 'About 7.4 seconds' },
          { text: 'About 1 second', why: 'A little longer than that: about 7.4 seconds.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What is the first look really deciding?',
        options: [
          { text: 'Whether to hire you on the spot', why: 'It\'s much earlier than that.' },
          { text: 'Whether the CV is worth reading properly' },
          { text: 'Your salary', why: 'Way too early for that.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Held attention in the study, or did badly?',
        groups: ['Held attention', 'Did badly'],
        items: [
          { text: 'Clear headings', group: 0 },
          { text: 'Several columns of text', group: 1 },
          { text: 'Short bullet points', group: 0 },
          { text: 'Lots of graphics', group: 1 },
          { text: 'Dates easy to find', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So I should make my CV more creative so it stands out?',
        options: [
          { text: 'Yes, add more colours and icons.', why: 'Clutter did worse in the study.' },
          { text: 'Make it a video.', why: 'Some creative jobs accept that, but for most roles a clear page wins.' },
          { text: 'Make it stand out with proof, not decoration. Simple layouts were read more easily.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that misreads the study.',
        lines: ['The first look is short, so make it easy.', 'Recruiters decide everything in 7 seconds and never read more.', 'Clear headings help the eye find things.'],
        bug: 1,
        explanation: 'The first look decides whether to read properly. A good first look earns a careful read.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each finding to what Clinton should do.',
        pairs: [
          ['Clear sections held attention', 'Use plain headings: Education, Projects'],
          ['Long sentences did badly', 'Short bullets starting with results'],
          ['Dates and titles easy to find', 'Put them in the same place every time'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the lesson.',
        template: 'You earn a careful [[1]] by making the first [[2]] easy.',
        blanks: [['read'], ['look']],
        distractors: ['photo', 'page', 'salary'],
      },
      {
        kind: 'mcq',
        prompt: 'Why should we "treat the exact number lightly"?',
        options: [
          { text: 'It\'s one study of one country\'s recruiters' },
          { text: 'Because it\'s fake', why: 'It\'s a real study, just a limited one.' },
          { text: 'Because recruiters lie', why: 'The equipment tracked their eyes. It\'s just one study.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The study used equipment that follows people\'s eyes. What is it called? (eye-___)',
        answers: ['tracking', 'eye-tracking', 'eyetracking'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which layout would do best on the first look?',
        options: [
          { text: 'Three columns, icons, a photo and a skills wheel', why: 'Cluttered layouts did worse.' },
          { text: 'One long paragraph in small font', why: 'Long text hides the important words.' },
          { text: 'One column, clear headings, short bullets, dates on the right' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a menu, poster or website you understood in seconds. What made it so easy to read?',
    starters: ['I understood ___ in seconds because...', 'My CV could do the same by...'],
  },
  deepen: {
    title: 'Read the source',
    summary: 'Search "Ladders eye tracking study 2018" and look at the heat maps. Notice where the red (most looked-at) areas are.',
  },
  notes: 'Ladders, Inc. Eye-Tracking Study (2018): initial resume screen averaged 7.4 seconds (about 6 seconds in 2012); simple layouts with clear sections and headings held attention; cluttered, multi-column layouts and long sentences performed poorly. Reported by HR Dive and others. Small industry study; framed as "one study" per the outline. Checked 2026-10-20.',
};

export default lesson;
