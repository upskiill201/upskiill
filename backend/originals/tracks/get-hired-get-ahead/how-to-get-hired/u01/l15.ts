import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Miracle's desk. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Miracle\'s desk',
  summary: 'Miracle shares her screen: three real-looking (made-up) applications for an Afiya graduate role. She gives Clinton two minutes per application. "Tell me who you\'d call, and why." Honest levels, lasting skills, gaps and evidence, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot overclaiming and honest skill levels', 'Judge whether an applicant has proof', 'Turn gaps into plans and wins into evidence'],
  learn: [
    {
      kind: 'story',
      title: 'Two minutes each',
      beats: [
        { speaker: 'narrator', text: 'Wednesday night. Miracle shares her screen. Three applications for a graduate role at Afiya, with names changed and details invented so nobody real is shown.' },
        { speaker: 'miracle', text: 'This is my desk every week. Two minutes each. Tell me who I call for an interview, and why.' },
        { speaker: 'clinton', text: 'Applicant A says "fluent in 5 languages, expert in AI". Applicant B has "intermediate French" and three projects. Applicant C has lots of adjectives.' },
        { speaker: 'miracle', text: 'And which one do you believe?' },
        { speaker: 'tey', text: 'You\'re on the hiring side now. Let\'s see everything you\'ve learned from Miracle\'s chair.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: you choose who Miracle calls.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Applicant A: "Fluent in 5 languages, expert in AI, results-driven." What does Miracle think?',
        options: [
          { text: 'Impressive, call immediately', why: 'Big claims, no proof. Miracle\'s first thought is "what\'s stretched?"' },
          { text: 'Lots of claims, no proof. She\'d test it hard, or skip.' },
          { text: 'Nothing, she doesn\'t read that part', why: 'She reads it, and it makes her suspicious.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Applicant B: "French: intermediate. Built 3 small projects. Currently learning testing (writing tests for my budget app)." Who\'s B?',
        options: [
          { text: 'The most believable applicant, with honest levels, proof and a plan for the gap' },
          { text: 'Weak, because "intermediate" isn\'t fluent', why: 'Honest and improving beats an overclaim.' },
          { text: 'Lying about the projects', why: 'Nothing suggests that. They\'re specific and checkable.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Applicant C\'s profile. Tap the line that\'s pure adjectives.',
        lines: ['Final-year Economics student.', 'Dynamic, passionate, hardworking go-getter.', 'Treasurer of the student union: managed a budget of 2 million francs.'],
        bug: 1,
        explanation: 'Four claims, no proof. The treasurer line shows more than all four adjectives.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it make Miracle trust the applicant more, or less?',
        groups: ['More trust', 'Less trust'],
        items: [
          { text: 'An honest skill level with a plan to improve', group: 0 },
          { text: '"Expert" in something with no proof', group: 1 },
          { text: 'A result with a number', group: 0 },
          { text: 'A list of adjectives', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'B has a gap: no work testing experience. Do I reject them?',
        options: [
          { text: 'No. They\'re already writing tests for their app. That\'s a gap with a plan.' },
          { text: 'Yes, any gap means reject.', why: 'Every graduate has gaps. A plan shows they learn.' },
          { text: 'Only if A has no gaps.', why: 'A claims no gaps, which is exactly why Miracle doubts A.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to the lesson where you learned it.',
        pairs: [
          ['Honest skill levels', '"Fluent in French"?'],
          ['Growing skills worldwide', 'Skills that last'],
          ['Gap + plan + deadline', 'Your gaps are a plan'],
          ['A weekly wins note', 'Your evidence bank'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which skill did employers rate most essential in the WEF Future of Jobs Report 2025?',
        options: [
          { text: 'Analytical thinking' },
          { text: 'Speed reading', why: 'Not on the list. Analytical thinking was first.' },
          { text: 'Handwriting', why: 'Not on the list.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete an evidence-bank entry for Applicant C.',
        template: 'Managed a student union [[1]] of 2 million francs; ended the year with no [[2]].',
        blanks: [['budget'], ['debt', 'overspend']],
        distractors: ['party', 'friends', 'grades'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which applicant does Miracle call first: A, B or C? (one letter)',
        answers: ['b'],
        placeholder: 'One letter',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Last question. What would you tell Applicant C to fix?',
        options: [
          { text: 'Cut the adjectives and lead with the treasurer story: it shows everything the adjectives claim.' },
          { text: 'Add more adjectives.', why: 'More of what isn\'t working.' },
          { text: 'Nothing, C is perfect.', why: 'C\'s best proof is buried under four empty words.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who\'s showing, and who\'s claiming?',
        groups: ['Showing', 'Claiming'],
        items: [
          { text: 'Built 3 small projects', group: 0 },
          { text: 'Expert in AI', group: 1 },
          { text: 'Managed a 2 million franc budget', group: 0 },
          { text: 'Results-driven', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If Miracle had two minutes with your application today, would she believe it? What would make her call you?',
    starters: ['She\'d believe...', 'She\'d call me if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Read your own skills list as if you were Miracle. Circle every claim without proof. Replace one with an evidence-bank line.',
  },
  notes: 'Checkpoint 3 reviews l11–l14 (honest levels, WEF lasting skills, gaps, evidence bank). The three applications are invented; Miracle says so in the story (privacy). These exercises double as Jump ahead / placement questions.',
};

export default lesson;
