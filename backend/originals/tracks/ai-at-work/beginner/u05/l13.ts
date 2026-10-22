import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 13 — turning research into a one-page brief. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Turning research into a one-page brief',
  summary: 'Two days of notes, one page for Lucía. Use AI to draft the structure, then make sure every line is yours and every fact is sourced.',
  minutes: 13,
  outcomes: [
    'Structure a one-page research brief',
    'Use AI to draft it from your checked notes',
    'Keep sources and uncertainty visible',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Ada\'s one-page brief has six parts:</p>' +
        '<table><tr><th>Part</th><th>Ada\'s version</th></tr>' +
        '<tr><td><strong>The question</strong></td><td>Should we launch in Ghana next?</td></tr>' +
        '<tr><td><strong>The answer</strong></td><td>Yes, as a 3-month pilot in one Accra market, not a full launch.</td></tr>' +
        '<tr><td><strong>Why (3 reasons)</strong></td><td>Partner bank ready; English-speaking; strong mobile money use (sourced).</td></tr>' +
        '<tr><td><strong>Biggest risk</strong></td><td>Shops may not switch from apps they already use.</td></tr>' +
        '<tr><td><strong>What we don\'t know</strong></td><td>Licence timeline (confirming by Monday); switching (pilot will show).</td></tr>' +
        '<tr><td><strong>Sources</strong></td><td>Numbered list at the bottom.</td></tr></table>' +
        '<p>Ask AI: <em>"Using only my checked notes below, draft a one-page brief with these six parts. Keep the source numbers next to each fact. Don\'t add anything that isn\'t in the notes."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Question, answer, three reasons, biggest risk, unknowns, sources. Draft it with AI from your checked notes only.',
    },
  ],
  apply: {
    scenario: 'Thursday evening. Ada is writing the brief.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the six parts of the brief.',
        lines: ['The question', 'The answer', 'Why', 'Biggest risk', 'What we don\'t know', 'Sources'],
      },
      {
        kind: 'mcq',
        prompt: 'Why put the answer second, right after the question?',
        options: [
          { text: 'It\'s the shortest part', why: 'It\'s about what she needs first.' },
          { text: 'Lucía sees the recommendation immediately' },
          { text: 'Tradition', why: 'Busy readers need the answer first.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which drafting request keeps the brief honest?',
        options: [
          { text: 'Write a brief about launching in Ghana.', why: 'The AI would fill gaps from memory.' },
          { text: 'Using only my checked notes, draft a one-page brief in these six parts. Keep source numbers next to facts. Add nothing new.' },
          { text: 'Make the brief exciting.', why: 'Style before substance.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part does this line belong in?',
        groups: ['Why', 'What we don\'t know'],
        items: [
          { text: 'Partner bank ready [2]', group: 0 },
          { text: 'Licence timeline (confirming Monday)', group: 1 },
          { text: 'Strong mobile money use [1]', group: 0 },
          { text: 'Whether shops will switch', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line did the AI add that wasn\'t in Ada\'s notes?',
        lines: [
          'Answer: a 3-month pilot in one Accra market.',
          'Why: partner bank ready [2].',
          'Why: Ghana is Africa\'s fastest-growing fintech market.',
          'Risk: shops may not switch.',
        ],
        bug: 2,
        fix: 'Delete it, or add it only with a checked source.',
        explanation: 'It isn\'t in her notes and has no source.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the request.',
        template: 'Using only my [[1]] notes, keep source [[2]] next to each fact.',
        blanks: [['checked'], ['numbers']],
        distractors: ['rough', 'emojis'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why is there a "What we don\'t know" section? It makes us look unsure.',
        prompt: 'Best reply?',
        options: [
          { text: 'I\'ll delete it.', why: 'It\'s what makes the brief trustworthy.' },
          { text: 'Because the AI added it.', why: 'It\'s Ada\'s choice and a good one.' },
          { text: 'It shows we checked properly. Carmen can see exactly what\'s solid and what the pilot is for.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to its job.',
        pairs: [
          ['The answer', 'Tells Lucía what to do'],
          ['Biggest risk', 'Shows what could go wrong'],
          ['Unknowns', 'Shows what\'s still open'],
          ['Sources', 'Lets anyone check'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many reasons go in the "Why" part?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep on the one page, or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'The recommendation', group: 0 },
          { text: 'A history of mobile money since 2007', group: 1 },
          { text: 'The biggest risk', group: 0 },
          { text: 'Every article Ada read', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the brief\'s answer line.',
        tiles: ['Yes,', 'as', 'a', '3-month', 'pilot'],
        distractors: ['maybe'],
      },
      {
        kind: 'mcq',
        prompt: 'Who should do the final read of the brief?',
        options: [
          { text: 'Ada, checking every line against her notes' },
          { text: 'Nobody; the AI wrote it', why: 'Ada owns it.' },
          { text: 'Only Lucía', why: 'Ada checks before sending.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time you shared research. Did it say what you didn\'t know?',
    starters: ['I shared...', 'Next time I\'ll add...'],
  },
  deepen: { title: 'Try it today', summary: 'Turn your notes on any topic into the six-part one-page brief. Keep source numbers next to facts.' },
  notes: 'Brief structure is a common format for decision memos. Content fictional.',
};

export default lesson;
