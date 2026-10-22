import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 20 — Chapter Challenge: the Njangi Tracker case study. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the Njangi Tracker',
  summary: 'The tracker works for two groups now: 12 women in his mum\'s njangi and 30 at church. Tonight Clinton writes the case study that goes at the top of his portfolio, the one Brenda will see. Everything from this chapter, in one piece.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Write a complete, honest case study', 'Lead with the problem and a measurable result', 'Protect people\'s privacy and credit help honestly'],
  learn: [
    {
      kind: 'story',
      title: 'Top of the portfolio',
      beats: [
        { speaker: 'narrator', text: 'Friday night. Six months to graduation next week. The Njangi Tracker is used by two groups: his mum\'s njangi (12 members) and the church women\'s group (30).' },
        { speaker: 'narrator', text: 'His mum walks past his desk. "Do you know, now even Mama Bih pays on time?"' },
        { speaker: 'miracle', text: 'That\'s your result. Now write it like a professional. Problem first, numbers, no names, what you learned. One minute to read.' },
        { speaker: 'tey', text: 'Everything from this chapter in one write-up. Let\'s build the case study.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The kit so far',
      steps: [
        { title: 'Piece 1 (Chapter 1)', body: 'A skills inventory: every skill with proof, and a two-sentence answer to "What can you do?"' },
        { title: 'Piece 2 (tonight)', body: 'The Njangi Tracker case study: proof you can see, with real users and a result.' },
        { title: 'Next chapter', body: 'The CV that gets read. Miracle gives Clinton\'s first CV seven seconds, and he learns why that\'s all it gets.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: write the Njangi Tracker case study.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Step 1: pick the title.',
        options: [
          { text: '"Project 1"', why: 'Says nothing.' },
          { text: '"Njangi Tracker: no more \'I already paid\'"' },
          { text: '"React and PostgreSQL App"', why: 'Tools, not the benefit.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Step 2: put the case study in order.',
        lines: ['Title: Njangi Tracker: no more "I already paid"', 'Problem: a 12-member savings group argued monthly about payments', 'What I did: asked three members, built a one-page tracker', 'Result: zero disputes at the first meeting; now used by a second group of 30', 'What I learned: build the useful part first; ask users sooner', 'Built with: React, a simple database'],
      },
      {
        kind: 'findBug',
        prompt: 'Step 3: tap the line that breaks privacy.',
        lines: ['A 12-member savings group in Buea.', 'Screenshot: Members 1 to 12, amounts changed.', 'Mama Bih (677 123 456) was always late.'],
        bug: 2,
        explanation: 'A real person\'s name, phone number and a judgement about her. Keep members anonymous.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 4: proof or claim?',
        groups: ['Proof', 'Claim'],
        items: [
          { text: 'Zero disputes at the first meeting', group: 0 },
          { text: 'Used by a second group of 30', group: 0 },
          { text: 'I\'m a passionate builder', group: 1 },
          { text: 'The treasurer: "Best meeting in two years"', group: 0 },
          { text: 'An amazing app', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Step 5: the honesty check.',
        from: 'miracle',
        message: 'Did you build every part yourself?',
        options: [
          { text: 'Every single line, from scratch.', why: 'Not true, and an interviewer could check. Credit what you used.' },
          { text: 'Yes, the tracker is mine. The date picker is an open-source component, and I credit it in the README.' },
          { text: 'Does it matter?', why: 'It matters a lot. Only claim what you can explain.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Step 6: match each lesson from this chapter to where it shows in the case study.',
        pairs: [
          ['Start small, finish', 'A one-page tracker, not a banking app'],
          ['Feedback makes it real', 'Sorted names after members got lost'],
          ['Where to put it', 'Pinned at the top of his GitHub'],
          ['Can you build ours too?', 'A second group of 30, scoped in two weeks'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Step 7: where do the tools go?',
        options: [
          { text: 'In the title', why: 'The title says the benefit. Tools go last.' },
          { text: 'Nowhere', why: 'Technical readers want them. One line at the end.' },
          { text: 'One line at the bottom' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 8: complete the result line.',
        template: 'Zero [[1]] at the first meeting; now used by a second group of [[2]].',
        blanks: [['disputes', 'arguments'], ['30', 'thirty']],
        distractors: ['logos', '300', 'charts'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 9: in version 2, or later list?',
        groups: ['Version 2', 'Later list'],
        items: [
          { text: 'Monthly reminder for the treasurer', group: 0 },
          { text: 'An animated logo', group: 1 },
          { text: 'Whose turn it is to collect, at the top', group: 0 },
          { text: 'A choir rota', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long should it take to read the case study? (one minute, one hour or one day)',
        answers: ['one minute', 'a minute', 'minute', '1 minute'],
        placeholder: 'One minute / hour / day',
      },
      {
        kind: 'chatReply',
        prompt: 'Step 10: Brenda sees it.',
        from: 'brenda',
        message: 'I saw your Njangi Tracker on LinkedIn. Our whole company exists because njangi books get lost. Applications open in three months. Please apply.',
        options: [
          { text: 'Thank you! I will. Could I ask what you\'d want to see on a graduate CV?' },
          { text: 'Can I skip the application?', why: 'Everyone applies. Ask what helps instead.' },
          { text: 'I already know everything about CVs.', why: 'He doesn\'t, yet. Chapter 3 is next.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Clinton went from three tutorial projects to a case study with 42 real users in one chapter. What will your piece 2 be, and who will use it?',
    starters: ['My piece will be...', 'The people who\'ll use it are...'],
  },
  deepen: {
    title: 'Your career kit, piece 2',
    summary: 'Build the smallest version of your piece, measure the result, and write the case study: title, problem, what you did, result, what you learned, tools. Chapter 3 turns your inventory and this piece into a CV.',
  },
  notes: 'Unit Challenge (playbook §8a.3). Climax per the outline: the Njangi Tracker case study; "now even Mama Bih pays on time". The LinkedIn mention is a forward hook to Chapter 5 (posting work on LinkedIn); Brenda\'s line is the fictional company\'s story. 42 users = 12 + 30. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
