import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (and earlier). Story beat: David's turn. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: David\'s turn',
  summary: 'David, Clinton\'s best friend, is in medical school with perfect grades and a CV that says "hardworking, passionate, team player". Clinton offers to help. Now he has to teach what he\'s learned.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Find skills hiding in hobbies and everyday life', 'Rewrite weak lines with strong verbs and proof', 'Build a STAR story'],
  learn: [
    {
      kind: 'story',
      title: 'The teacher becomes the student',
      beats: [
        { speaker: 'narrator', text: 'Saturday. David sends Clinton his CV for a hospital volunteering programme. It says "hardworking, passionate, team player" in the first line.' },
        { speaker: 'david', text: 'I don\'t get it. My grades are perfect. They still haven\'t replied.' },
        { speaker: 'clinton', text: 'Bro. You run the anatomy study group. You tutor two first-years. You organised the blood drive. None of it is on here.' },
        { speaker: 'david', text: 'Those are just things I do.' },
        { speaker: 'tey', text: 'The best way to know you\'ve learned something is to teach it. Let\'s get David\'s CV out of the adjective swamp.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: Clinton coaches David.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Tap the line in David\'s CV that\'s all claim and no proof.',
        lines: ['Medical student, University of Buea, year 3.', 'Hardworking, passionate team player.', 'Tutor two first-year students in anatomy every week.'],
        bug: 1,
        explanation: 'Three claims, zero proof. The tutoring line shows all three without saying them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of David\'s activities to the skill it shows.',
        pairs: [
          ['Organising the blood drive', 'Planning and organising'],
          ['Tutoring first-years', 'Explaining clearly'],
          ['Running the study group', 'Leading a team'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'David writes "helped with a blood drive". What\'s the stronger, true version?',
        options: [
          { text: '"Organised a campus blood drive: 60 donors in one day."' },
          { text: '"Led the national blood service."', why: 'Way beyond the truth. Stronger words, same truth.' },
          { text: '"Was part of a blood thing."', why: 'Weaker, not stronger.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s blood drive story in STAR order.',
        lines: ['The hospital was short of blood before the holidays.', 'I offered to get students to donate.', 'I booked the hall, made a sign-up sheet and messaged every class rep.', '60 students donated in one day.'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth putting on David\'s CV, or not?',
        groups: ['Worth it', 'Leave it'],
        items: [
          { text: 'Runs the anatomy study group (12 students)', group: 0 },
          { text: 'Likes medical dramas on TV', group: 1 },
          { text: 'Organised a blood drive with 60 donors', group: 0 },
          { text: 'Enjoys reading', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'But my grades are perfect. Shouldn\'t that be enough?',
        options: [
          { text: 'Grades open the door. Proof of what you\'ve done is what gets you through it.' },
          { text: 'Yes, delete everything else.', why: 'Most employers care more about proof of skills than grades alone.' },
          { text: 'Grades don\'t matter at all.', why: 'They matter, especially in medicine. They\'re just not the whole story.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'In STAR, what goes in the Action?',
        options: [
          { text: 'What the whole team did', why: 'Say what YOU did, with "I".' },
          { text: 'How you felt', why: 'Feelings can help, but Action is what you did.' },
          { text: 'What you did, step by step, saying "I"' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s advice to David.',
        template: 'Don\'t [[1]] you\'re a leader. [[2]] them the study group.',
        blanks: [['claim', 'say'], ['Show']],
        distractors: ['Hide', 'Tell', 'promise'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a strong line for David\'s CV.',
        tiles: ['Tutor', 'two', 'first-year', 'students', 'in', 'anatomy', 'every', 'week'],
        distractors: ['passionate', 'helped'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In STAR, the S stands for ___.',
        answers: ['situation'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first line should David\'s CV open with?',
        options: [
          { text: '"Hardworking, passionate team player."', why: 'Adjectives nobody remembers.' },
          { text: '"Third-year medical student who tutors first-years and organised a 60-donor blood drive."' },
          { text: '"I am applying for this programme."', why: 'They know. Tell them something worth reading.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a friend who undersells themselves. What\'s one thing they do that they\'ve never counted as a skill?',
    starters: ['My friend ___ always...', 'That shows they can...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do for a friend what Clinton did for David: ask what they do each week and point out three skills they\'ve never written down.',
  },
  notes: 'Checkpoint 2 reviews l06–l09: hobbies, skill language, STAR, show-don\'t-claim. David (shared cast) is a medical student in Buea (CAST.md; Tey FM had him in first-year Medicine).',
};

export default lesson;
