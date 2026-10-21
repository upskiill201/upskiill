import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 10 — Checkpoint 2. Visuals, diagrams, image tools, image prompts. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: visuals that help',
  summary: 'Simple visuals, editable diagrams, the right image for the job and good image prompts. Show you can make slides people understand at a glance.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can choose and build clear visuals', 'Show you can prompt image tools well'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. A week to the founders.', replies: ['Ready'] },
        { tey: 'Warm-up: payment growth. AI image or real chart?', replies: ['Real chart'] },
        { tey: 'Real data, real chart. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the deck\'s visuals.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the visual form.',
        pairs: [
          ['How a payment moves', 'Steps with arrows'],
          ['Old vs new way', 'Side-by-side'],
          ['Where the shops are', 'A map'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'AI image, real chart or real photo?',
        groups: ['AI image', 'Real chart', 'Real photo'],
        items: [
          { text: 'Cover mood', group: 0 },
          { text: 'Failure rate by week', group: 1 },
          { text: 'Launch morning', group: 2 },
          { text: 'Weekly growth', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the image prompt parts.',
        lines: ['Subject', 'Style', 'Mood and light', 'Composition', 'What to leave out'],
      },
      {
        kind: 'findBug',
        prompt: 'Which flowchart label is too long?',
        lines: ['Payment fails', 'Show "try again"', 'In the event of a subsequent failure the system recommends cash', 'Log error'],
        bug: 2,
        fix: 'Failed twice? Suggest cash',
        explanation: 'Keep labels under five words.',
      },
      {
        kind: 'mcq',
        prompt: 'What do image tools often garble?',
        options: [
          { text: 'Text and logos' },
          { text: 'Sky colour', why: 'Text and logos.' },
          { text: 'Shadows', why: 'Text and logos.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can we use an AI picture of "our real shops" on slide 4?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Let\'s use real photos taken with permission. An AI image labelled as our shops would be misleading.' },
          { text: 'Sure, nobody will know.', why: 'Misleading.' },
          { text: 'No images ever.', why: 'Real photos work well.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which diagram request is best?',
        options: [
          { text: 'Draw payments.', why: 'Too vague.' },
          { text: 'Turn these 5 steps into a simple flowchart with one decision, in a format I can paste into a diagram tool. Labels under five words.' },
          { text: 'Make a pretty picture.', why: 'Not a diagram.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Keep visuals to 3-5 [[1]]. Change [[2]] thing at a time.',
        blanks: [['parts'], ['one']],
        distractors: ['colours', 'every'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Steer or start over?',
        groups: ['Steer', 'Start over'],
        items: [
          { text: 'Same, warmer colours', group: 0 },
          { text: 'Something else entirely', group: 1 },
          { text: 'Same, stall on the right', group: 0 },
          { text: 'Throw it away', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the leave-out instruction.',
        tiles: ['No', 'text,', 'no', 'logos'],
        distractors: ['please'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the flowchart shape.',
        pairs: [
          ['Rectangle', 'Step'],
          ['Diamond', 'Decision'],
          ['Arrow', 'What happens next'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which visual habit is a mistake?',
        lines: ['Highlight the step being discussed', 'Arrows show order', 'Highlight every box in a different colour', 'Short labels'],
        bug: 2,
        fix: 'Highlight one step only.',
        explanation: 'Everything highlighted means nothing stands out.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who should check a process diagram? (the people who ... the work)',
        answers: ['do', 'do the work'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep a detailed diagram as a backup slide?',
        options: [
          { text: 'To answer technical questions without cluttering the main slide' },
          { text: 'To show off', why: 'For questions.' },
          { text: 'Backups are pointless', why: 'They help in Q&A.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which visual skill would make your slides clearest?',
    starters: ['The skill:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 8 lessons 6-9.',
};

export default lesson;
