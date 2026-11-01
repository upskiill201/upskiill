import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 8 — why you: two short proofs matched to must-haves. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why you',
  summary: 'Paragraph three is where Clinton wants to list everything he\'s ever done. Miracle stops him: "Two things. The two they care about most. Prove each in two sentences."',
  minutes: 12,
  outcomes: ['Choose the two must-haves to prove', 'Prove each in two sentences with a mini-STAR', 'Link each proof back to their role'],
  learn: [
    {
      kind: 'steps',
      title: 'Why you, in four steps',
      steps: [
        { title: '1. Pick two must-haves', body: 'From the advert, choose the two requirements that matter most and where your proof is strongest. For Njangi Pay: "explain technical ideas to non-technical colleagues" and "stay calm when things break".' },
        { title: '2. Name the need', body: 'Start each proof by naming what they asked for, in their words. "You\'re looking for someone who can explain technical ideas to non-technical people."' },
        { title: '3. Prove it in two sentences', body: 'A mini-STAR: what happened and what you did, then the result. "Every Saturday I explain phone repairs to customers at my aunt\'s stall, in plain words and in pidgin when needed. Most come back for their next repair."' },
        { title: '4. Link it to them', body: 'One short phrase that shows how it helps in their job. "...which is what your customer-facing developers do every day." Then the second proof, the same way.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Two proofs, done well, beat six done badly. The CV holds the rest.',
    },
  ],
  apply: {
    scenario: 'Clinton writes "why you".',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['Pick two must-haves', 'Name the need in their words', 'Prove it in two sentences', 'Link it to their role'],
      },
      {
        kind: 'mcq',
        prompt: 'How many proofs should "why you" contain?',
        options: [
          { text: 'Everything you\'ve ever done', why: 'That\'s the CV\'s job.' },
          { text: 'Two, done well' },
          { text: 'None, just adjectives', why: 'Proof, not adjectives.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each must-have to Clinton\'s proof.',
        pairs: [
          ['Explain technical ideas simply', 'Explains repairs to customers every Saturday'],
          ['Stay calm when things break', 'Moved 40 people when the venue cancelled'],
          ['At least one real project', 'The Njangi Tracker, used by 42 people'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the sentence that doesn\'t prove anything.',
        lines: ['You need someone calm when things break.', 'I am extremely calm and great under pressure.', 'When our venue cancelled an hour before, I moved 40 people to the library; 38 came.'],
        bug: 1,
        explanation: 'A claim. The next sentence proves it, so the claim isn\'t needed.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your "why you" has six examples. Which two matter most to Njangi Pay?',
        options: [
          { text: 'All six are important!', why: 'Pick the two that match their must-haves best.' },
          { text: 'Football and music.', why: 'Not on their advert.' },
          { text: 'Explaining tech simply and staying calm when things break, because their advert stresses both.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a strong proof, or not?',
        groups: ['Part of it', 'Not needed'],
        items: [
          { text: 'Naming the need in their words', group: 0 },
          { text: 'A result', group: 0 },
          { text: 'A list of adjectives', group: 1 },
          { text: 'A link to their role', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which two-sentence proof is strongest?',
        options: [
          { text: '"Every Saturday I explain phone repairs to customers in plain words. Most come back, which is what your customer-facing developers need to do."' },
          { text: '"I am good at communication."', why: 'A claim, not proof.' },
          { text: '"I have many communication skills from many places."', why: 'Vague: which, where, what happened?' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s rule.',
        template: '[[1]] proofs, done well, beat six done [[2]].',
        blanks: [['Two'], ['badly']],
        distractors: ['Ten', 'well', 'quickly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each proof is a mini version of which four-letter method? (one word)',
        answers: ['star'],
        placeholder: 'Four letters',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the start of a proof.',
        tiles: ['You\'re looking for', 'someone who stays calm', 'when things break.'],
        distractors: ['I am amazing', 'and passionate'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick two must-haves from a real advert. Write a two-sentence proof for each.',
    starters: ['Must-have 1: ... Proof: ...', 'Must-have 2: ... Proof: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Use your evidence bank to find the best proof for each of your two must-haves. If one is weak, that\'s a gap plan (Chapter 1).',
  },
  notes: 'Requirement-matching in cover letters ("you need X; here is evidence of X") is standard careers-service guidance; reuses STAR (Ch1 l08). Pidgin (Cameroonian Pidgin English) is widely spoken in Buea.',
};

export default lesson;
