import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Unit Challenge. The whole chapter, harder. Climax: the revision sheet the class borrows. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the sheet everyone wants',
  summary: "Kofi and Efua build one revision sheet on cell transport together. By Friday, half the class has asked for it. Everything from Chapter 3, harder.",
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use every note-taking tool from Chapter 3 together', 'Build, check and share a revision sheet the right way'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, the library',
      beats: [
        { speaker: 'narrator', text: 'Two weeks to the mocks. Kofi and Efua each build a cell-transport sheet from a blank page, then swap and check each other\'s.' },
        { speaker: 'efua', text: "You missed active transport needing carrier proteins. I missed that osmosis happens in animal cells too. Merge?" },
        { speaker: 'narrator', text: 'They merge them, check every AI-marked line against the textbook, and ask the AI to compare it with the syllabus. One gap: they forgot to say what happens to an animal cell in pure water.' },
        { speaker: 'narrator', text: 'By Friday, eleven people have asked for a copy. Efua\'s condition: "Only if you build your own first and use ours to check it."' },
        { speaker: 'tey', text: "Forty copied pages, five weeks ago. Now his notes are the ones being borrowed. Let's see yours." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the sheet everyone wants.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the way Kofi and Efua built the sheet in order.',
        lines: ['Each builds one from a blank page', 'Swap and check each other\'s', 'Merge them', 'Check AI-marked lines against the textbook', 'Ask the AI to compare it with the syllabus'],
      },
      {
        kind: 'mcq',
        prompt: 'What happens to an animal cell put in pure water?',
        options: [
          { text: 'Nothing, osmosis only happens in plants', why: 'Osmosis happens in animal cells too.' },
          { text: 'Water enters by osmosis and it may swell and burst, because it has no cell wall' },
          { text: 'It shrinks', why: 'In pure water (dilute), water moves IN, so it swells.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Diffusion, osmosis or active transport?',
        groups: ['Diffusion', 'Osmosis', 'Active transport'],
        items: [
          { text: 'Oxygen into a cell, high to low', group: 0 },
          { text: 'Water across a membrane, dilute to concentrated', group: 1 },
          { text: 'Uses energy and carrier proteins', group: 2 },
          { text: 'Low to high concentration', group: 2 },
          { text: 'Water into plant root hair cells', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'A classmate sends their sheet to check. Which line is wrong?',
        lines: ['(T) Diffusion: no energy needed.', '(AI) Active transport always moves things from high to low concentration.', '(T) Osmosis: water only, across a partially permeable membrane.'],
        bug: 1,
        fix: 'Active transport moves things from low to high concentration, using energy.',
        explanation: 'An AI mark plus a warning word ("always"), and it is backwards.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the best final AI check on the merged sheet?',
        options: [
          { text: "Here is our revision sheet for these syllabus lines. What's missing that the syllabus expects? Is anything wrong? Don't rewrite it." },
          { text: 'Make our sheet better.', why: 'It may rewrite it instead of finding problems.' },
          { text: 'Is our sheet the best in the class?', why: 'It cannot know, and it is not useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "Can I just have your sheet? I'll print it and study from it.",
        prompt: "What is the reply that fits Efua's rule, and helps Clinton most?",
        options: [
          { text: 'Sure, here it is.', why: 'He would skip the part that actually teaches him.' },
          { text: "Build your own from a blank page first, then use ours to check it. That's where you'll find your gaps." },
          { text: 'No, never.', why: 'Sharing is fine once he has built his own.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the tool that fixes it.',
        pairs: [
          ['40 copied pages', 'Own words, question marks'],
          ['Notes you never test', 'Cornell cue column'],
          ['A missed lesson', 'Syllabus gap check'],
          ['A video marathon', 'Pause and write from memory'],
          ['Notes in four places', 'One home per subject, an index'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Active transport moves substances from a low to a high concentration and needs ... (one word)',
        answers: ['energy', 'atp'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good note habit, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Writing summaries from memory', group: 0 },
          { text: 'Saving AI-made notes as your own', group: 1 },
          { text: 'Checking before sharing', group: 0 },
          { text: 'Judging notes by how long they are', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which flashcard is built best?',
        options: [
          { text: 'Front: "Osmosis". Back: a full paragraph', why: 'Tells, does not test.' },
          { text: 'Front: "Biology". Back: "cells"', why: 'Says nothing.' },
          { text: 'Front: "In osmosis, water moves from a ___ to a ___ solution." Back: "dilute → concentrated"' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter in one sentence.',
        template: 'Write it in your own [[1]], turn it into [[2]], and check it before you [[3]].',
        blanks: [['words'], ['questions'], ['share']],
        distractors: ['handwriting', 'copies', 'sleep'],
      },
      {
        kind: 'orderLines',
        prompt: "Put Kofi's five-week change in order.",
        lines: ['Forty copied pages', 'Swaps methods with Efua', 'Cornell notes and cue questions', 'One home per subject, an index', 'Builds the sheet everyone wants'],
      },
      {
        kind: 'tapBuild',
        prompt: "Build Efua's condition.",
        tiles: ['Build', 'your', 'own', 'first,', 'then', 'check', 'with', 'ours'],
        distractors: ['copy', 'print'],
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 3 done. What is the one change to your notes that you will keep for the rest of the year?',
    starters: ['Before this chapter my notes...', 'The change I will keep is...'],
  },
  deepen: {
    title: 'Next: Chapter 4',
    summary: 'The mocks are coming. Kofi has good notes. Now he needs to remember them: Chapter 4 is all about testing yourself, the way the research says works.',
  },
  notes: 'Animal cells in pure water: water enters by osmosis; without a cell wall the cell may swell and burst (lysis). Active transport uses carrier proteins and energy (ATP).',
};

export default lesson;
