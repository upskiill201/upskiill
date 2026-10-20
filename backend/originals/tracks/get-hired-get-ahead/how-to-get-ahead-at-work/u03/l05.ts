import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: the plan on paper. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the plan on paper',
  summary: 'A week after "not yet", Clinton and Ngozi sit down with the career ladder and a blank page. Before they start, Miracle sends a quick quiz. "Not yet", how promotions work, evidence over effort, and finding the criteria.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Respond well to "not yet"', 'Explain how promotions work', 'Ask with evidence against criteria'],
  learn: [
    {
      kind: 'story',
      title: 'A blank page',
      beats: [
        { speaker: 'narrator', text: 'One week later. Ngozi, Clinton, the career ladder and a blank page titled "Path to Developer".' },
        { speaker: 'miracle', text: '(by message, before the meeting) Quick quiz. Then go and build that plan.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: before the plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the best reply to "not yet"?',
        options: [
          { text: '"What would you need to see from me to say yes?"' },
          { text: '"That\'s unfair."', why: 'Ask what they\'d need to see.' },
          { text: 'Silence', why: 'Ask, then plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each criterion to its meaning.',
        pairs: [
          ['Scope', 'How big a problem you handle'],
          ['Independence', 'How much guidance you need'],
          ['Impact', 'Who your work affects'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence or effort?',
        groups: ['Evidence', 'Effort'],
        items: [
          { text: 'Owned the payout fix', group: 0 },
          { text: 'Worked really hard', group: 1 },
          { text: 'Crashes down about 90%', group: 0 },
          { text: 'Six months here', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the evidence-based ask in order.',
        lines: ['Name the level', 'Name its criteria', 'Give your evidence', 'Admit a gap', 'Ask what they\'d need to see'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the promotion myth.',
        lines: ['Promotions often happen in cycles.', 'You get promoted for time served.', 'Managers argue for you with evidence.'],
        bug: 1,
        explanation: 'Evidence at the next level, not time.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'What did Ngozi say the biggest difference was?',
        options: [
          { text: 'Developers don\'t wait to be told what to do next.' },
          { text: 'Developers work later.', why: 'Independence.' },
          { text: 'Developers have better laptops.', why: 'Independence.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When are people often promoted?',
        options: [
          { text: 'When they\'re already working at the next level' },
          { text: 'After exactly one year', why: 'Evidence, not time.' },
          { text: 'When they threaten to leave', why: 'Evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s summary.',
        template: 'Find the [[1]]. Bring [[2]], not effort.',
        blanks: [['criteria'], ['evidence']],
        distractors: ['gossip', 'hours', 'threats'],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Not yet" is not "___". (one word)',
        answers: ['never'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good criteria source, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'The career ladder', group: 0 },
          { text: 'Lunch-queue rumours', group: 1 },
          { text: 'People at the next level', group: 0 },
          { text: 'Guessing', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What two gaps did Ngozi name?',
        options: [
          { text: 'Leading work with others, and independent design decisions' },
          { text: 'Typing speed and punctuality', why: 'Leading others and independent design.' },
          { text: 'None', why: 'She named two.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What would the first line of your own "Path to..." page say?',
    starters: ['Path to...', 'The first gap is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start a "Path to [next role]" page: the criteria in your words, and your evidence so far.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
