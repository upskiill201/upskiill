import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 18 — your weekly AI review. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your weekly AI review',
  summary: 'Ada adds two minutes to her Friday review: what AI helped with, what it didn\'t, and one change. Small, but it keeps her playbook improving.',
  minutes: 12,
  outcomes: [
    'Run a two-minute weekly AI review',
    'Turn what you notice into one change',
    'Keep the playbook improving',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Friday, two ways',
      before: {
        label: 'No review',
        text: 'Ada closes her laptop. The summary template that rambled on Tuesday rambles again next week. The great prompt she wrote on Wednesday is lost in a chat.',
      },
      after: {
        label: 'Two-minute AI review',
        text: 'Helped: follow-ups (saved about an hour). Didn\'t help: the contract question; I ended up asking legal. Saved: Wednesday\'s research prompt, now in the library. Change: add "exactly 5 bullets" to the summary template.',
      },
      notes: [
        'What helped and what didn\'t, in a line each.',
        'Great new prompts get saved before they\'re lost.',
        'One change a week keeps the playbook getting better.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Every Friday: what helped, what didn\'t, what to save, one change. Two minutes.',
    },
  ],
  apply: {
    scenario: 'Ada\'s Friday AI review.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the review.',
        lines: ['What helped', 'What didn\'t', 'What to save', 'One change'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helped, or didn\'t?',
        groups: ['Helped', 'Didn\'t'],
        items: [
          { text: 'Follow-ups saved an hour', group: 0 },
          { text: 'Contract question: had to ask legal', group: 1 },
          { text: 'Report chain worked first time', group: 0 },
          { text: 'Regenerated an email five times', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happens without a review?',
        options: [
          { text: 'Nothing changes; that\'s fine', why: 'Good prompts get lost.' },
          { text: 'Problems repeat and good prompts get lost in chats' },
          { text: 'AI improves itself', why: 'Your playbook doesn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps the review?',
        options: [
          { text: 'Was my week good?', why: 'Vague.' },
          { text: 'Here are my notes on this week\'s AI use. List what clearly helped, what didn\'t, and suggest one change for next week.' },
          { text: 'Write my review for me without notes.', why: 'It needs your notes.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'How does your playbook keep getting better?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The AI improves it.', why: 'Ada\'s review does.' },
          { text: 'It doesn\'t.', why: 'It does, weekly.' },
          { text: 'Two minutes every Friday: what helped, what didn\'t, what to save, and one change.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'What helped, what [[1]], what to save, one [[2]].',
        blanks: [['didn\'t', "didn't"], ['change']],
        distractors: ['cost', 'excuse'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s review isn\'t useful?',
        lines: [
          'Helped: follow-ups, about an hour saved',
          'Didn\'t: the contract question',
          'Save: Wednesday\'s research prompt',
          'Change: try harder next week',
        ],
        bug: 3,
        fix: 'Change: add "exactly 5 bullets" to the summary template',
        explanation: 'A change should be specific.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the review line to its action.',
        pairs: [
          ['Didn\'t help', 'Note where not to use AI'],
          ['Great new prompt', 'Save it to the library'],
          ['Recurring problem', 'One specific change'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a specific change.',
        tiles: ['Add', '"exactly', '5', 'bullets"', 'to', 'the', 'template'],
        distractors: ['harder'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does the AI review take?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific change, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'Add length rule to summary template', group: 0 },
          { text: 'Be better at AI', group: 1 },
          { text: 'Type one-line replies myself', group: 0 },
          { text: 'Use AI more wisely', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why only one change a week?',
        options: [
          { text: 'One change actually gets done, and you can see if it worked' },
          { text: 'More is forbidden', why: 'It\'s practical.' },
          { text: 'No reason', why: 'Small steps stick.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do a two-minute AI review of your week now. What\'s your one change?',
    starters: ['Helped:', 'One change:'],
  },
  deepen: { title: 'Try it today', summary: 'Add "AI review" to your Friday calendar: two minutes, four questions.' },
  notes: 'Extends the weekly review habit from Unit 6.',
};

export default lesson;
