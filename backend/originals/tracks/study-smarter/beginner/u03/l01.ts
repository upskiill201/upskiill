import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1 — opens the chapter. Why copying notes doesn't stick; Kofi and Efua agree to swap methods. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: "Why copying notes doesn't stick",
  summary: "Kofi has 40 pages of copied notes and remembers almost none of it. Efua has 12 pages and remembers everything. The difference is what happens in your head while you write.",
  minutes: 12,
  outcomes: [
    'Explain why copying word for word is weak note-taking',
    'Name what good notes make your brain do',
    'Spot copied notes vs processed notes',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thirty-three weeks to go',
      beats: [
        { speaker: 'narrator', text: "Monday. Mrs Asante announces the first mock exams, five weeks away. Every subject. Kofi opens his Biology folder to start revising." },
        { speaker: 'narrator', text: "Forty pages. Neat. Every word of every slide, copied exactly. He reads page one. He doesn't remember writing it." },
        { speaker: 'narrator', text: "At lunch, Efua's Biology notes are going round the class like a famous album. Twelve pages, full of arrows, questions in the margins, and her own little diagrams." },
        { speaker: 'kofi', text: "How is yours a third of the length, and you remember more?" },
        { speaker: 'efua', text: "Because I don't write what the teacher says. I write what I understood. If I can't put it in my own words, I put a question mark and ask later." },
        { speaker: 'efua', text: "Deal: I'll show you my method. You show me how you made the AI quiz you on moles. Everyone's talking about your test score." },
        { speaker: 'tey', text: "Copying feels productive: your hand is busy, the page fills up. But your brain can copy without thinking. Notes only help when writing them makes you think." },
      ],
    },
    {
      kind: 'compare',
      title: 'Copied vs processed',
      before: { label: 'Copied', text: '"Osmosis is the net movement of water molecules from a region of higher water potential to a region of lower water potential through a partially permeable membrane."' },
      after: { label: "Efua's version", text: 'Osmosis = water moving across a membrane, from where there\'s more water (dilute) to less water (concentrated). Like water "evening things out". ? Why only water and not the sugar?' },
      notes: ['Her own words.', 'An image to remember it by.', 'A question for what she doesn\'t get yet.'],
    },
    {
      kind: 'check',
      question: 'Why do copied notes stick so poorly?',
      options: ['The handwriting is too neat', 'Your brain can copy without thinking about the meaning', 'They are too short'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi looks hard at his 40 pages.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Copied or processed?',
        groups: ['Copied', 'Processed'],
        items: [
          { text: 'Every word of the slide, exactly', group: 0 },
          { text: 'Her own words plus a question mark', group: 1 },
          { text: 'A little diagram she drew', group: 1 },
          { text: "The textbook paragraph, word for word", group: 0 },
          { text: 'An arrow linking two ideas', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Efua do when she can\'t put something in her own words?',
        options: [
          { text: 'Writes a question mark and asks later' },
          { text: 'Copies it exactly', why: 'That is what she avoids.' },
          { text: 'Skips it forever', why: 'She marks it to come back to.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: "Efua's rule: write what you ..., not what the teacher says (one word)",
        answers: ['understood', 'understand'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My notes are amazing, I copy every slide. 60 pages for Physics.',
        prompt: 'What should Kofi say?',
        options: [
          { text: "That was me last week. Test yourself on page 1 without looking. If you can't, the copying didn't stick." },
          { text: 'Wow, 60 pages, you must know everything.', why: 'Pages copied is not knowledge.' },
          { text: 'Copy the textbook too.', why: 'More copying.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Which of Kofi's habits makes his notes weak?",
        lines: ['He writes in class every lesson.', 'He copies the slides word for word.', 'He keeps notes in one folder per subject.'],
        bug: 1,
        fix: 'He writes what he understood, in his own words.',
        explanation: 'Writing every lesson and organising by subject are good. Copying exactly is the weak part.',
      },
      {
        kind: 'matchPairs',
        prompt: "Match each part of Efua's notes to what it does.",
        pairs: [
          ['Her own words', 'Makes her think about meaning'],
          ['A little diagram', 'A second way to remember'],
          ['A question mark', 'Marks what to ask later'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In osmosis, which way does water move?',
        options: [
          { text: 'From a dilute solution (more water) to a concentrated one (less water)' },
          { text: 'From concentrated to dilute', why: 'Backwards: water moves towards where there is less water.' },
          { text: 'It does not move', why: 'Osmosis is the movement of water.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's point.",
        template: 'Your brain can [[1]] without thinking. Notes only help when writing them makes you [[2]].',
        blanks: [['copy'], ['think']],
        distractors: ['sleep', 'faster'],
      },
      {
        kind: 'tapBuild',
        prompt: "Build Efua's line.",
        tiles: ['I', 'write', 'what', 'I', 'understood'],
        distractors: ['copied', 'heard'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s 40 pages: what should he do first?',
        options: [
          { text: 'Test himself on them to see what actually stuck' },
          { text: 'Copy them out again, neater', why: 'More copying.' },
          { text: 'Throw them away', why: 'They are a useful source. He just needs to process them.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Open your notes from last week. Are they copied or processed? Pick one paragraph and rewrite it in your own words.',
    starters: ['My notes are mostly...', 'Rewritten:'],
  },
  deepen: {
    title: 'Try it tomorrow',
    summary: 'In your next lesson, write only what you understood, in your own words. Put a question mark next to anything you could not.',
  },
  notes: 'Osmosis: net movement of water across a partially permeable membrane from higher to lower water potential (dilute → concentrated). Generative note-taking vs verbatim transcription: research generally favours processing in own words (e.g., Mueller & Oppenheimer 2014 on verbatim overlap), stated generally.',
};

export default lesson;
