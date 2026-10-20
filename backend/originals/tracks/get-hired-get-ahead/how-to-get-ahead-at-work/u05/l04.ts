import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 4 — mapping transferable skills to a target role. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Map the bridge',
  summary: 'Clinton has done this before: in his very first course, he mapped skills from the meet-up and the phone stall to a developer job. Now he does it again, from developer to associate product manager.',
  minutes: 12,
  outcomes: ['Map current skills to a target role', 'Find the real gaps', 'Plan experiments to close them'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to map the bridge',
      steps: [
        { title: '1. List what the target role needs', body: 'From Aïcha\'s advert and conversations: user research, prioritising, writing specs, working across teams, understanding the business, technical judgement.' },
        { title: '2. Match your evidence', body: 'User research: Bafoussam, support interviews. Specs: two written. Cross-team: payout fix. Business: Q3 goals. Technical judgement: a year of engineering.' },
        { title: '3. Mark the gaps honestly', body: 'Prioritising a roadmap: never done it. Saying no to stakeholders: only once, with the dashboard request.' },
        { title: '4. Plan one experiment per gap', body: 'Ask Aïcha to let him draft next quarter\'s priority list for offline. Run the next feature-request review with support.' },
        { title: '5. Turn it into a story', body: 'Strengths first, gaps honestly, experiments under way. That\'s his application, and his interview answer.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'What it needs, your evidence, your gaps, one experiment per gap, then the story.',
    },
  ],
  apply: {
    scenario: 'Clinton maps the bridge to product.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['List what the role needs', 'Match your evidence', 'Mark the gaps honestly', 'Plan one experiment per gap', 'Turn it into a story'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence Clinton has, or a gap?',
        groups: ['Has evidence', 'Gap'],
        items: [
          { text: 'User research', group: 0 },
          { text: 'Prioritising a roadmap', group: 1 },
          { text: 'Writing specs', group: 0 },
          { text: 'Cross-team work', group: 0 },
          { text: 'Saying no to stakeholders often', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where did Clinton first learn to map skills?',
        options: [
          { text: 'In his very first course, from the meet-up and phone stall to developer' },
          { text: 'At a bootcamp', why: 'In How to Get Noticed, Chapter 1.' },
          { text: 'Never', why: 'In his first course.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the dishonest gap entry.',
        lines: ['Roadmaps: never done one.', 'Stakeholders: expert at saying no. (he\'s done it once)', 'Specs: two written.'],
        bug: 1,
        explanation: 'Overclaiming. Mark gaps honestly.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s experiment request.',
        from: 'clinton',
        message: 'How do I ask Aïcha to help close my roadmap gap?',
        options: [
          { text: '"Could I draft next quarter\'s offline priority list, and you review it?"' },
          { text: '"Give me the whole roadmap."', why: 'A small, reviewable experiment.' },
          { text: 'Don\'t ask; hope.', why: 'Ask for an experiment.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each requirement to Clinton\'s evidence.',
        pairs: [
          ['User research', 'Bafoussam and support interviews'],
          ['Cross-team work', 'The payout fix'],
          ['Technical judgement', 'A year of engineering'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should the story order things?',
        options: [
          { text: 'Strengths first, gaps honestly, experiments under way' },
          { text: 'Gaps only', why: 'Strengths first.' },
          { text: 'Hide the gaps', why: 'Be honest; show experiments.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'One [[1]] per gap. Then tell the [[2]].',
        blanks: [['experiment'], ['story']],
        distractors: ['excuse', 'lie', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times has Clinton said no to a stakeholder request so far? (a number)',
        answers: ['1', 'one', 'once'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good bridge experiment, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Draft a priority list for review', group: 0 },
          { text: 'Read about roadmaps but never try', group: 1 },
          { text: 'Run a feature-request review', group: 0 },
          { text: 'Pretend he\'s done it', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a role you\'re curious about, list three things it needs. Which do you have evidence for? Which are gaps?',
    starters: ['It needs...', 'My gap:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make a two-column table for a target role: what it needs, and your evidence or gap for each. Plan one experiment.',
  },
  notes: 'Echoes How to Get Noticed, Ch1 (transferable skills inventory).',
};

export default lesson;
