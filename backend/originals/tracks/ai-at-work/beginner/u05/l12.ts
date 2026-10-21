import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 12 — research for a decision, and knowing when to stop. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Research for a decision',
  summary: 'Research isn\'t finished when you\'ve read everything. It\'s finished when you know enough to decide, or know exactly what you don\'t know.',
  minutes: 12,
  outcomes: [
    'Know when research is "enough"',
    'Separate known, unknown and unknowable',
    'Turn research into a recommendation with honest uncertainty',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Enough to decide',
      html:
        '<p>With one day left, Ada could keep reading forever. Instead she sorts what she has:</p>' +
        '<ul>' +
        '<li><strong>Known:</strong> checked in good sources. ("Partner bank operates in Accra.")</li>' +
        '<li><strong>Unknown but findable:</strong> could be answered with more time. ("Exact licence timeline.")</li>' +
        '<li><strong>Unknowable for now:</strong> only a pilot would tell us. ("Will shops actually switch?")</li>' +
        '</ul>' +
        '<p>Research is enough when <strong>more of it wouldn\'t change the decision</strong>. If the big remaining questions are unknowable, the honest recommendation is often <strong>a small test</strong>: "Run a 3-month pilot in one Accra market to find out."</p>' +
        '<p>Ask AI: <em>"Here is what I know and don\'t know. What decision options make sense given this uncertainty?"</em></p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Stop when more research wouldn\'t change the decision. When the key question is unknowable, recommend a small test.',
    },
  ],
  apply: {
    scenario: 'Thursday morning. Ada has to recommend something by tonight.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Known, findable, or unknowable for now?',
        groups: ['Known', 'Findable', 'Unknowable for now'],
        items: [
          { text: 'Partner bank operates in Accra (their site)', group: 0 },
          { text: 'The exact licence timeline', group: 1 },
          { text: 'Will shops actually switch?', group: 2 },
          { text: 'English is an official language', group: 0 },
          { text: 'How a competitor reacts next year', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When is research "enough"?',
        options: [
          { text: 'When more research wouldn\'t change the decision' },
          { text: 'When you\'ve read everything', why: 'That never happens.' },
          { text: 'When the AI says so', why: 'It\'s your judgement.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'The key question ("will shops switch?") is unknowable for now. What\'s the honest recommendation?',
        options: [
          { text: 'A small, time-limited pilot to find out' },
          { text: 'A full launch, to be bold', why: 'Big bet on an unknown.' },
          { text: 'Never launch', why: 'A test can answer it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Stop when more research wouldn\'t [[1]] the decision. If it\'s unknowable, recommend a small [[2]].',
        blanks: [['change'], ['test', 'pilot']],
        distractors: ['decorate', 'party'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you research for another week so we\'re 100% sure?',
        prompt: 'Best reply?',
        options: [
          { text: 'A week more won\'t tell us if shops will switch; only a pilot will. I can confirm the licence timeline by Monday, though.' },
          { text: 'Sure, a week will make us certain.', why: 'Some things only a test reveals.' },
          { text: 'We\'ll never know anything.', why: 'Some things are findable.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of gap to the action.',
        pairs: [
          ['Known', 'State it with its source'],
          ['Findable', 'Find it, or say when you will'],
          ['Unknowable for now', 'Design a test to learn it'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Ada decide?',
        options: [
          { text: 'Tell me what to decide.', why: 'Hands over the decision.' },
          { text: 'Here\'s what I know, what\'s still findable, and what only a pilot could show. What decision options make sense, and what would each cost?' },
          { text: 'Find me more articles.', why: 'More reading may not change the decision.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the recommendation hides uncertainty?',
        lines: [
          'Recommend a 3-month pilot in one Accra market.',
          'Licence timeline: confirming with the regulator by Monday.',
          'Shops will definitely switch to us.',
          'Decision point: review pilot results in month 3.',
        ],
        bug: 2,
        fix: 'The pilot will show whether shops switch.',
        explanation: 'That\'s unknowable for now; don\'t state it as certain.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s Thursday.',
        lines: ['Sort known, findable, unknowable', 'Check if more research would change the decision', 'Choose the option that fits the uncertainty', 'Write the recommendation'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s recommendation.',
        tiles: ['Run', 'a', '3-month', 'pilot', 'in', 'one', 'market'],
        distractors: ['huge'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long is Ada\'s proposed pilot, in months?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "we don\'t know yet, here\'s how we\'ll find out" a strong answer?',
        options: [
          { text: 'It\'s honest and gives a clear next step' },
          { text: 'It sounds unprepared', why: 'Done well, it sounds rigorous.' },
          { text: 'It avoids deciding', why: 'It decides on a test.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a decision at work you\'ve been "researching" for too long? What\'s unknowable, and what test would answer it?',
    starters: ['The decision:', 'The test:'],
  },
  deepen: { title: 'Try it today', summary: 'For your current research, sort what you have into known, findable and unknowable. Decide if you\'re done.' },
  notes: 'General decision-making practice. Scenario fictional.',
};

export default lesson;
