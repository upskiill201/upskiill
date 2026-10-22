import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 11 — 2.94 or 3.0? Honesty choice: rounding up a GPA; exact, honest numbers. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: '2.94 or 3.0?',
  summary: 'Njangi Pay\'s advert says "GPA 3.0 or above preferred". Clinton\'s is 2.94. It\'s so close. Everyone rounds, don\'t they? And who checks the second decimal?',
  minutes: 12,
  outcomes: ['Explain why exact numbers matter on a CV', 'Handle a "preferred" requirement you just miss', 'Decide when to show a grade and when to leave it out'],
  learn: [
    {
      kind: 'story',
      title: '0.06',
      beats: [
        { speaker: 'narrator', text: 'Tuesday night. Clinton reads the Njangi Pay advert again. New line he hadn\'t noticed: "GPA of 3.0 or above preferred." His transcript says 2.94.' },
        { speaker: 'clinton', text: '2.94 is basically 3.0. Rounding is just maths. I\'ll write "GPA: 3.0".' },
        { speaker: 'david', text: 'Don\'t they ask for your transcript at the offer stage?' },
        { speaker: 'clinton', text: '...Do they?' },
        { speaker: 'tey', text: 'Many employers check transcripts and certificates before or after an offer. A rounded-up grade looks small on a CV and enormous in a background check: it turns "slightly below preferred" into "lied on the application". And "preferred" isn\'t "required".' },
      ],
      choice: {
        prompt: 'What should Clinton do about his GPA?',
        options: [
          {
            text: 'Write the exact 2.94, or leave the GPA off, and let his projects do the work.',
            outcome: 'He leaves the GPA off his CV, puts the Njangi Tracker high up, and if asked, says "2.94, with my best results in my final-year modules." Brenda later tells him she cares more about the tracker than the decimal.',
            best: true,
          },
          {
            text: 'Write "3.0". It\'s only 0.06.',
            outcome: 'At the offer stage, Njangi Pay asks for his transcript. The 2.94 is right there. The offer is withdrawn, not for the grade, but for the 0.06 he invented.',
          },
          {
            text: 'Don\'t apply, because he misses the preference.',
            outcome: '"Preferred" isn\'t "required". He\'d be giving up on a role he\'s a strong fit for, over a wish-list line.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every number on your CV must match your documents exactly. You can leave a number out; you can\'t change it.',
    },
  ],
  apply: {
    scenario: 'Clinton decides about his GPA.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is rounding 2.94 up to 3.0 a problem?',
        options: [
          { text: 'It isn\'t, rounding is fine on CVs', why: 'Rounding up to cross a threshold changes the meaning. It must match the transcript.' },
          { text: 'It doesn\'t match his transcript, so it becomes a lie when checked' },
          { text: 'Because 3.0 looks too good', why: 'The issue isn\'t looks. It\'s accuracy.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: 'Writing "GPA: 2.94"', group: 0 },
          { text: 'Writing "GPA: 3.0" with a 2.94 transcript', group: 1 },
          { text: 'Leaving the GPA off and leading with projects', group: 0 },
          { text: 'Writing a graduation year that hasn\'t happened as "completed"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'brenda',
        message: 'I noticed there\'s no GPA on your CV. What is it?',
        options: [
          { text: 'About 3.0.', why: '"About" is a dodge. Give the exact number and your strengths.' },
          { text: 'I\'d rather not say.', why: 'She asked directly. Honest and confident beats evasive.' },
          { text: '2.94. My strongest results are in my final-year modules, and the tracker shows what I can build.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between "preferred" and "required" in an advert?',
        options: [
          { text: '"Preferred" is a wish; "required" is a must-have' },
          { text: 'They mean the same', why: 'Preferred is a nice-to-have. You can still apply.' },
          { text: '"Preferred" is stricter', why: 'The other way round.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the CV line that won\'t survive a background check.',
        lines: ['BSc Computer Science, University of Buea, expected June', 'GPA: 3.0 (transcript says 2.94)', 'Njangi Tracker: used by 42 members'],
        bug: 1,
        explanation: 'Numbers must match documents exactly. Leave it out or write 2.94.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the honest move.',
        pairs: [
          ['GPA just below "preferred"', 'Leave it off or write it exactly; lead with projects'],
          ['Not graduated yet', 'Write "expected June"'],
          ['Six weeks at a job', 'Give the real dates, not "a year"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When might Clinton choose to show his GPA?',
        options: [
          { text: 'Never', why: 'Some roles require it, and a strong GPA helps.' },
          { text: 'Only when he can round it up', why: 'Never round to cross a line.' },
          { text: 'When the advert requires it, or when it\'s a strength' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'You can leave a number [[1]]; you can\'t [[2]] it.',
        blanks: [['out', 'off'], ['change']],
        distractors: ['round', 'in', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Clinton\'s exact GPA? (number)',
        answers: ['2.94', '294'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Likely to be checked, or not?',
        groups: ['Often checked', 'Rarely checked'],
        items: [
          { text: 'Degree and grades', group: 0 },
          { text: 'Employment dates', group: 0 },
          { text: 'Your favourite colour', group: 1 },
          { text: 'Certificates you list', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a number on your CV (or one you\'d be tempted to write) that doesn\'t match your documents exactly? What will you do instead?',
    starters: ['The number is...', 'Instead I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check every date, grade and number on your CV against your documents: transcripts, certificates, contracts. Fix anything that doesn\'t match exactly.',
  },
  notes: 'Honesty choice per playbook §8a.7 (the outline\'s original "fluent in French" choice was already used in Ch1 l11, so this chapter uses GPA rounding). Many employers verify education and employment before or after offering (pre-employment screening); practices vary by country and employer, stated generally. University of Buea uses a GPA scale (4.0 max).',
};

export default lesson;
