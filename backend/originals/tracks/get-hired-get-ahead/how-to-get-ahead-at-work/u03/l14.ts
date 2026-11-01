import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 14 — building a promotion case document. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'The promotion case',
  summary: 'Two weeks before 1 March, Clinton writes his promotion case. Ngozi says it\'s the document she\'ll take into the promotion meeting, so he should make it easy for her to argue for him.',
  minutes: 12,
  outcomes: ['Write a one-page promotion case', 'Map evidence to each criterion', 'Make your manager\'s job easy'],
  learn: [
    {
      kind: 'steps',
      title: 'One page, five parts',
      steps: [
        { title: '1. The ask', body: 'One line: "I\'m asking to move from Graduate Developer to Developer."' },
        { title: '2. Criteria and evidence, side by side', body: 'A short table: each ladder line, then one or two pieces of evidence with numbers and links. "Leads work with others: led the retry-service rebuild with Kemi; shipped on time."' },
        { title: '3. The gaps you closed', body: '"In December we agreed two gaps. Both are closed: design doc reviewed by Paul; retry project led and shipped."' },
        { title: '4. What others say', body: 'Two short quotes: Paul on the design doc, the support lead on sync status.' },
        { title: '5. What you\'ll do next', body: 'One or two lines on how you\'d grow at the new level. It shows you\'re thinking ahead, not just collecting a title.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The ask, criteria with evidence, gaps closed, what others say, what\'s next. One page your manager can carry into the room.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his promotion case.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the case in order.',
        lines: ['The ask', 'Criteria and evidence', 'The gaps you closed', 'What others say', 'What you\'ll do next'],
      },
      {
        kind: 'mcq',
        prompt: 'Who is the promotion case mainly for?',
        options: [
          { text: 'Only Clinton', why: 'It\'s Ngozi\'s tool in the meeting.' },
          { text: 'His manager, to argue for him in the promotion meeting' },
          { text: 'HR\'s filing cabinet', why: 'It\'s for Ngozi to argue with.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong case content, or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Led the retry rebuild with Kemi; shipped on time', group: 0 },
          { text: 'I\'ve worked really hard', group: 1 },
          { text: 'Paul: "Clear trade-offs, well argued."', group: 0 },
          { text: 'I\'ve been here nine months', group: 1 },
          { text: 'Both agreed gaps closed', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that weakens the case.',
        lines: ['Design doc reviewed by Paul.', 'Kemi is promoted next, so I should be first.', 'Retry project shipped on time.'],
        bug: 1,
        explanation: 'Comparisons with others weaken it. Stick to criteria and evidence.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best "what\'s next" line.',
        from: 'clinton',
        message: 'What do I write for "what I\'ll do next"?',
        options: [
          { text: '"Get promoted again."', why: 'Show how you\'d grow and help.' },
          { text: 'Leave it blank.', why: 'It shows you\'re thinking ahead.' },
          { text: '"Next, I\'d like to lead the sync-service split and mentor the next graduate hire."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each criterion to its evidence.',
        pairs: [
          ['Leads work with others', 'Retry rebuild with Kemi'],
          ['Explains trade-offs', 'Design doc reviewed by Paul'],
          ['Raises standards', 'Onboarding doc and mentoring'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How long should the case be?',
        options: [
          { text: 'One page' },
          { text: 'Twenty pages', why: 'One page she can carry.' },
          { text: 'One sentence', why: 'One page with evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Criteria with [[1]]. Gaps [[2]].',
        blanks: [['evidence'], ['closed']],
        distractors: ['excuses', 'hidden', 'opened'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many quotes from others should the case include? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes Ngozi\'s job easier, or harder?',
        groups: ['Easier', 'Harder'],
        items: [
          { text: 'Evidence with links', group: 0 },
          { text: 'No numbers', group: 1 },
          { text: 'Mapped to the ladder', group: 0 },
          { text: 'A long, unstructured essay', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you wrote a one-page case for your next step today, what would the strongest line be?',
    starters: ['The ask:', 'My strongest evidence:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Draft your own one-page case with the five parts, even if you\'re not ready to ask yet. It shows you what\'s missing.',
  },
  notes: 'Promotion "packets" or cases are common at larger companies; smaller ones may just discuss in a 1:1.',
};

export default lesson;
