import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 3 — asking for a promotion: entitlement vs. evidence. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Deserve vs. evidence',
  summary: 'Clinton replays his ask in his head. "I\'d like to be promoted" was honest, but it gave Ngozi nothing to say yes to. Miracle shows him how the same ask sounds with evidence.',
  minutes: 11,
  outcomes: ['Ask for a promotion with evidence', 'Tie your ask to the criteria', 'Invite your manager to help'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to ask',
      before: { label: '"I deserve it"', text: '"I\'ve been here six months and I\'ve worked really hard. I think I deserve to be promoted."\n\nTime and effort, but no link to what the next level needs. Ngozi can only say yes or no, and "no" is easier.' },
      after: { label: 'Evidence and criteria', text: '"I\'d like to talk about moving to Developer. Looking at the ladder, the next level means owning features end to end and working across teams. I\'ve done that with sync status and the payout fix. The gap I see is leading work that needs other people. What would you need to see from me?"\n\nCriteria, evidence, an honest gap, and an invitation to plan together.' },
      notes: [
        'Name the level you want and its criteria.',
        'Give evidence against each criterion.',
        'Admit a gap and ask what she\'d need to see.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The level, its criteria, your evidence, your honest gap, and "What would you need to see?"',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his ask.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the evidence-based ask in order.',
        lines: ['Name the level you want', 'Name its criteria', 'Give your evidence', 'Admit a gap', 'Ask what they\'d need to see'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I deserve it" weak?',
        options: [
          { text: 'It\'s too polite', why: 'It lacks evidence.' },
          { text: 'It gives time and effort, not evidence against criteria' },
          { text: 'It\'s too long', why: 'It lacks evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence, or just effort?',
        groups: ['Evidence', 'Effort'],
        items: [
          { text: 'Owned sync status end to end', group: 0 },
          { text: 'I\'ve worked really hard', group: 1 },
          { text: 'Fixed the payout report with finance', group: 0 },
          { text: 'I\'ve been here six months', group: 1 },
          { text: 'Crashes on old phones down about 90%', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak line in the ask.',
        lines: ['The ladder says end-to-end ownership.', 'Everyone knows I\'m the best on the team.', 'The gap I see is leading others.'],
        bug: 1,
        explanation: 'A boast, not evidence. Stick to the criteria.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I admit a gap? Won\'t that weaken my case?',
        options: [
          { text: 'Never admit gaps.', why: 'An honest gap builds trust.' },
          { text: 'Admit five gaps.', why: 'One honest gap is enough.' },
          { text: 'It strengthens it. It shows I know the criteria, and invites Ngozi to help me close it.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each criterion to Clinton\'s evidence.',
        pairs: [
          ['End-to-end ownership', 'Sync status'],
          ['Cross-team work', 'The payout fix with finance'],
          ['Rare skill', 'Old-phone performance'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should the ask end?',
        options: [
          { text: '"What would you need to see from me?"' },
          { text: '"So, yes or no?"', why: 'Invite her to plan with you.' },
          { text: '"Or I\'ll leave."', why: 'Never an ultimatum.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Criteria, [[1]], an honest [[2]].',
        blanks: [['evidence'], ['gap']],
        distractors: ['effort', 'boast', 'threat'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which level does Clinton want? (one word)',
        answers: ['developer'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the ask, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Linking work to the ladder', group: 0 },
          { text: 'Comparing himself to Kemi', group: 1 },
          { text: 'Naming a real gap', group: 0 },
          { text: 'An ultimatum', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you asked for a promotion (or a bigger role) tomorrow, what evidence would you give? What\'s your honest gap?',
    starters: ['My evidence:', 'My gap:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own five-part ask: level, criteria, evidence, gap, "What would you need to see?"',
  },
  notes: 'Evidence-based promotion conversations are common management advice.',
};

export default lesson;
