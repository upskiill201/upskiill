import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 14 — a master letter: reusable paragraphs and 15-minute tailoring. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'A master letter',
  summary: 'Clinton has five applications this week. Writing five letters from scratch would take all week. Miracle shows him how she does it: a master letter of reusable paragraphs, and fifteen minutes of tailoring per role.',
  minutes: 12,
  outcomes: ['Build a master letter of reusable paragraphs', 'Tailor a letter in about 15 minutes', 'Know which parts must always be rewritten'],
  learn: [
    {
      kind: 'steps',
      title: 'Tailor fast, still specific',
      steps: [
        { title: '1. Build your proof bank', body: 'Write four to six strong two-sentence proofs, one for each of your main skills: explaining tech simply, staying calm, building real projects, organising people. Each one ready to drop into "why you".' },
        { title: '2. Keep a few openings', body: 'Two or three story openings you can adapt: the njangi book, the phone stall, the library move. Pick the one that best bridges to each company.' },
        { title: '3. Always write "why them" fresh', body: 'This paragraph is never reused. Twenty minutes of research, one or two real details, written new for every company. It\'s what makes the letter pass the swap-the-name test.' },
        { title: '4. Assemble, then check', body: 'Opening (adapted) + why them (new) + two proofs (chosen for their must-haves) + close (adapted). Then check every company name, every role title, and read it aloud.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'The danger of reusing paragraphs: leaving another company\'s name in. Search the letter for every company name before you send it.',
    },
  ],
  apply: {
    scenario: 'Clinton builds his master letter.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the master-letter steps in order.',
        lines: ['Build your proof bank', 'Keep a few openings', 'Write "why them" fresh', 'Assemble, then check'],
      },
      {
        kind: 'mcq',
        prompt: 'Which paragraph must always be written fresh?',
        options: [
          { text: 'The close', why: 'The close can be adapted. "Why them" must be new.' },
          { text: '"Why them"' },
          { text: 'None', why: 'Without a fresh "why them", the letter fails the swap-the-name test.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reusable (with small edits), or always new?',
        groups: ['Reusable', 'Always new'],
        items: [
          { text: 'Proof: explaining repairs at the phone stall', group: 0 },
          { text: 'What you admire about this company', group: 1 },
          { text: 'The close', group: 0 },
          { text: 'A detail from their recent news', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reuse mistake.',
        lines: ['Dear Njangi Pay team,', 'I\'d love to help Afiya bring care to more clinics.', 'Every Saturday I explain repairs to customers.'],
        bug: 1,
        explanation: 'Afiya\'s name left over from another letter. Search for every company name before sending.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Five letters this week. How long will each one take you now?',
        options: [
          { text: 'Five minutes, I\'ll just change the name.', why: 'That\'s the generic letter again.' },
          { text: 'A whole day each.', why: 'With a master letter, much less.' },
          { text: 'About 15 minutes for assembly, plus 20 minutes of research for a fresh "why them".' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each master-letter piece to how you use it.',
        pairs: [
          ['Proof bank', 'Pick two that match their must-haves'],
          ['Openings', 'Adapt the one that bridges best'],
          ['Why them', 'Write new every time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many proofs should Clinton\'s proof bank hold?',
        options: [
          { text: 'Four to six, one per main skill' },
          { text: 'One', why: 'Too few to choose from.' },
          { text: 'Fifty', why: 'Too many to keep sharp. Four to six.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: '[[1]] the letter for every company [[2]] before you send it.',
        blanks: [['Search', 'Check'], ['name']],
        distractors: ['Print', 'photo', 'salary'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The private document of reusable paragraphs is called a ___ letter. (one word)',
        answers: ['master', 'base', 'template'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Clinton applies to a telecom support role. Which proofs does he pick?',
        options: [
          { text: 'His football captaincy and GPA', why: 'Not what a support role needs most.' },
          { text: 'All six', why: 'Two, matched to their must-haves.' },
          { text: 'Explaining repairs to customers, and staying calm when things break' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write two proofs for your own proof bank: the two skills you\'ll mention most often.',
    starters: ['Proof 1: ...', 'Proof 2: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start your master letter: four proofs, two openings, one close. Save it next to your master CV.',
  },
  notes: 'Reusable "paragraph bank" approach to cover letters is common careers-service advice; the fresh "why them" keeps each letter specific. Wrong-company-name errors set up l17.',
};

export default lesson;
