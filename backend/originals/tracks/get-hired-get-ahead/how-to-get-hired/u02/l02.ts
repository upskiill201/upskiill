import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 2 — kinds of internships, and the rules that differ by country. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What counts as an internship',
  summary: 'David\'s hospital "internship" is a year of required training. Kofi\'s was a summer building websites. Clinton\'s is part-time at a start-up. All three are called internships. Here\'s what the word can mean, and what to check wherever you live.',
  minutes: 12,
  outcomes: ['Describe the main kinds of internship', 'Know which questions to check locally', 'Recognise an internship that\'s really unpaid work'],
  learn: [
    {
      kind: 'reading',
      title: 'Many kinds, one idea',
      html:
        '<p>An <strong>internship</strong> is a short, structured period of work where the main point is learning. It usually lasts from a few weeks to a year. You\'ll meet a few common kinds:</p>' +
        '<ul><li><strong>Formal schemes</strong> at larger companies: advertised, with application windows (often many months before they start), interviews and a group of interns.</li>' +
        '<li><strong>Informal or start-up internships</strong>: found through people, like Clinton\'s. Flexible, often part-time, sometimes created for one person.</li>' +
        '<li><strong>Required placements</strong>: part of a degree, like teaching practice, nursing placements or David\'s medical training.</li>' +
        '<li><strong>Remote internships</strong>: work done online, sometimes for a company in another country.</li></ul>' +
        '<p><strong>The rules differ a lot by country.</strong> Whether interns must be paid, what contract you need, how many hours students may work, and whether a placement counts towards your degree all depend on where you live, and sometimes on whether you\'re a student. Always check your country\'s rules, or ask your careers office.</p>' +
        '<p><strong>One warning sign anywhere:</strong> an "internship" where you do a full employee\'s job, with no training or supervisor, for months, unpaid. That\'s not learning; that\'s free labour. And never pay a company to give you an internship.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Internship rules (pay, contracts, hours) depend on your country. Check locally. Never pay to get one.',
    },
  ],
  apply: {
    scenario: 'Clinton compares internships with friends.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the main point of an internship?',
        options: [
          { text: 'Learning, through short, structured work' },
          { text: 'Free labour for the company', why: 'That\'s the warning sign, not the point.' },
          { text: 'Making coffee', why: 'A real internship has real learning.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their kind of internship.',
        pairs: [
          ['Clinton at Kmer', 'Informal, part-time, found through people'],
          ['David at the hospital', 'Required placement for his degree'],
          ['A big bank\'s summer programme', 'Formal scheme with an application window'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Check locally, or true everywhere?',
        groups: ['Check locally', 'True everywhere'],
        items: [
          { text: 'Whether interns must be paid', group: 0 },
          { text: 'Never pay to get an internship', group: 1 },
          { text: 'How many hours students may work', group: 0 },
          { text: 'What contract you need', group: 0 },
          { text: 'Learning should be the main point', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the warning sign.',
        lines: ['A supervisor checks in every week.', 'Six months doing a full job, unpaid, with no training.', 'A clear project with dates.'],
        bug: 1,
        explanation: 'No learning, no support, no pay: that\'s free labour, not an internship.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'A company says I can intern if I pay them 50,000 francs for "placement". Good deal?',
        options: [
          { text: 'No: never pay to get an internship. Ask Mrs Ewane about real placements.' },
          { text: 'Yes, it\'s an investment.', why: 'Paying for an internship is a red flag.' },
          { text: 'Pay half.', why: 'Don\'t pay at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'When do big formal schemes often take applications?',
        options: [
          { text: 'Many months before they start' },
          { text: 'The day before', why: 'Deadlines are usually much earlier. Check early.' },
          { text: 'Never, they only hire friends', why: 'Formal schemes are advertised with deadlines.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: 'Internship rules depend on your [[1]]. Never [[2]] to get one.',
        blanks: [['country'], ['pay']],
        distractors: ['age', 'beg', 'wait'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who can tell you your country\'s internship rules at university? The careers ___. (one word)',
        answers: ['office', 'service', 'centre', 'center'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton check about Kmer\'s internship first?',
        options: [
          { text: 'The dates, hours, pay (if any), tasks and who supervises him, in writing' },
          { text: 'The office wallpaper', why: 'Check the real terms.' },
          { text: 'Nothing, just start', why: 'Always get the basics in writing.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Internship or warning sign?',
        groups: ['Real internship', 'Warning sign'],
        items: [
          { text: 'A remote project with a weekly mentor call', group: 0 },
          { text: 'Pay us to join', group: 1 },
          { text: 'A teaching placement for your degree', group: 0 },
          { text: 'No supervisor, no end date, no training', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What kind of internship would suit you best right now: formal, informal, required or remote? Why?',
    starters: ['The best kind for me is...', 'Because...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Search your country\'s rules on internships: pay, contracts, student work hours. Or ask your careers office. Write down the three facts that matter to you.',
  },
  notes: 'Kept general on purpose (playbook §9): internship pay and contract law varies widely by country and by student status. No statistics used.',
};

export default lesson;
