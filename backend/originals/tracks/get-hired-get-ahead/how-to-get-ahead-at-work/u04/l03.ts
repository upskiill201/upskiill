import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 3 — a vague goal vs. a direction with skills and steps. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Vague goal, real direction',
  summary: 'Clinton\'s first attempt at a plan says: "Be successful in tech." Miracle asks three questions, and the second version tells him exactly what to do on Monday.',
  minutes: 11,
  outcomes: ['Turn a vague career goal into a direction', 'Name the skills that move you there', 'End with a three-month step'],
  learn: [
    {
      kind: 'compare',
      title: 'Two versions of the plan',
      before: { label: 'Vague goal', text: '"In three years: be successful in tech, earn more, maybe be a senior or a lead."\n\nNothing wrong with it, but it doesn\'t help him choose between two projects tomorrow.' },
      after: { label: 'Direction', text: '"Direction: closer to deciding what we build for drivers, not only building it.\nSkills: talking to users; writing clear product specs.\nExperiences: join a product discovery workshop; lead the sync-service split.\nNext three months: talk to two product managers; sit in on five support calls."\n\nNow when he has to choose, the plan answers.' },
      notes: [
        'Name a direction and the reason behind it.',
        'Pick two or three skills, not ten.',
        'End with something you\'ll do in the next three months.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Direction with a reason, two or three skills, experiences that build them, a three-month next step.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "be successful in tech"?',
        options: [
          { text: 'It doesn\'t help him choose what to do next' },
          { text: 'It\'s too ambitious', why: 'It\'s too vague to guide choices.' },
          { text: 'Nothing', why: 'It\'s too vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the direction plan in order.',
        lines: ['Direction', 'Skills', 'Experiences', 'Next three months'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Vague or directional?',
        groups: ['Vague', 'Directional'],
        items: [
          { text: 'Earn more', group: 0 },
          { text: 'Closer to deciding what we build', group: 1 },
          { text: 'Be successful', group: 0 },
          { text: 'Sit in on five support calls', group: 1 },
          { text: 'Maybe a lead or something', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s too broad.',
        lines: ['Skills: talking to users; writing specs.', 'Skills: everything about business, design, data and code.', 'Next: talk to two product managers.'],
        bug: 1,
        explanation: 'Too many to work on. Pick two or three.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Miracle asks: "Which parts of your job do you look forward to?" What do I say?',
        options: [
          { text: 'Talking to support about what drivers need, and deciding what to build. More than the coding, honestly.' },
          { text: 'Lunch.', why: 'Ha. Think about the work.' },
          { text: 'Nothing.', why: 'Notice what gives energy.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Clinton\'s line.',
        pairs: [
          ['Direction', 'Closer to deciding what we build'],
          ['Skill', 'Writing clear product specs'],
          ['Next step', 'Sit in on five support calls'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How does the plan help with a choice tomorrow?',
        options: [
          { text: 'He can pick the option that builds his skills and direction' },
          { text: 'It doesn\'t', why: 'Direction answers the choice.' },
          { text: 'It tells him to work harder', why: 'It points to the right option.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'A direction with a [[1]], two or three [[2]].',
        blanks: [['reason'], ['skills']],
        distractors: ['title', 'hobbies', 'excuses'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many support calls will Clinton sit in on? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds his direction, or not?',
        groups: ['Builds it', 'Doesn\'t'],
        items: [
          { text: 'Product discovery workshop', group: 0 },
          { text: 'A random certification nobody needs', group: 1 },
          { text: 'Conversations with product managers', group: 0 },
          { text: 'Avoiding support entirely', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Turn your own vague career goal into a direction: where, why, two skills, one three-month step.',
    starters: ['Direction:', 'Next three months:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write the four-line version of your plan. Then ask: does it tell me what to do next week?',
  },
  notes: 'Foreshadows Ch5 (Clinton\'s move towards product).',
};

export default lesson;
