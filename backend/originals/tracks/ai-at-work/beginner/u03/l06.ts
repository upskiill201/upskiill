import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 6 — decisions vs discussion, decision logs, and confirming in writing. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Meeting notes into decisions',
  summary: 'Half the arguments at work are about what was "decided". Separate decisions from discussion, and write them down.',
  minutes: 13,
  outcomes: [
    'Tell a decision apart from a discussion or an idea',
    'Keep a simple decision log',
    'Get the AI to separate decisions from talk, and flag the unclear ones',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If something was discussed at length, it was probably decided.',
          isFact: false,
          explain: 'Long discussion often ends without a decision. Only explicit agreement counts.',
        },
        {
          text: 'People often leave the same meeting remembering different decisions.',
          isFact: true,
          explain: 'Which is exactly why decisions should be confirmed in writing, the same day.',
        },
        {
          text: 'A decision is clearer when it records why, and what was rejected.',
          isFact: true,
          explain: 'Months later, "why did we choose this?" is the question everyone asks.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Decision, discussion, or idea?',
      html:
        '<ul>' +
        '<li><strong>Decision:</strong> explicitly agreed by the person who can decide. "We\'re launching on the 16th." </li>' +
        '<li><strong>Discussion:</strong> options were talked about, nothing settled. "We talked about a launch party."</li>' +
        '<li><strong>Idea:</strong> someone suggested it. "Grace suggested dark mode for V2."</li>' +
        '</ul>' +
        '<h3>A simple decision log</h3>' +
        '<p>One line per decision: <strong>what</strong> was decided, <strong>when</strong>, <strong>who</strong> decided, <strong>why</strong>, and what was <strong>rejected</strong>. It takes a minute and saves hours of "I thought we agreed...".</p>' +
        '<p>Ask the AI: <em>"From these notes, list (1) decisions that were explicitly agreed, (2) things discussed but not decided, (3) ideas. Mark anything where it is unclear whether it was decided. Only use the notes."</em> Then send the decisions to everyone the same day: "Confirming what we decided today: ..."</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Send "Confirming what we decided today" the same day. Silence after that is agreement; objections surface early.',
    },
    {
      kind: 'check',
      question: '"We talked about a launch party" is a...',
      options: ['Decision', 'Discussion', 'Action'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is untangling what was actually decided.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Decision, discussion or idea?',
        groups: ['Decision', 'Discussion', 'Idea'],
        items: [
          { text: "We're launching on the 16th (agreed by the director)", group: 0 },
          { text: 'We talked about a launch party', group: 1 },
          { text: 'Grace suggested dark mode for V2', group: 2 },
          { text: 'The palette is final (Lucía approved)', group: 0 },
          { text: 'There were different views on pricing', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a decision log entry.',
        lines: ['What was decided', 'When', 'Who decided', 'Why', 'What was rejected'],
      },
      {
        kind: 'mcq',
        prompt: 'Why record what was rejected?',
        options: [
          { text: 'So nobody re-opens the same option months later without knowing why it was dropped' },
          { text: 'To blame people', why: 'It is about memory, not blame.' },
          { text: 'It is legally required', why: 'Usually not; it is just useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s same-day confirmation opener.',
        tiles: ['Confirming', 'what', 'we', 'decided', 'today:'],
        distractors: ['maybe', 'discussed'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I thought we agreed the launch was the 14th? My notes say we 'discussed' the 16th.",
        prompt: 'What should Ada do?',
        options: [
          { text: "Check the notes; if it's unclear, ask the director to confirm in writing and send everyone the confirmed date." },
          { text: 'Tell Lucía she is wrong.', why: 'It was unclear; confirm instead of arguing.' },
          { text: 'Pick the date she prefers.', why: 'The decider decides; confirm with them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: 'List (1) [[1]] that were explicitly agreed, (2) things [[2]] but not decided, (3) ideas. Mark anything [[3]].',
        blanks: [['decisions'], ['discussed'], ['unclear']],
        distractors: ['jokes', 'eaten', 'perfect'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the item the AI wrongly listed as a decision.',
        lines: ['Decided: launch on the 16th (director).', 'Decided: palette final (Lucía approved).', 'Decided: we will throw a launch party.'],
        bug: 2,
        fix: 'Discussed (not decided): a launch party.',
        explanation: 'The notes only say it was talked about.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Only explicit ... counts as a decision (one word)',
        answers: ['agreement', 'approval'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best untangles messy meeting notes?',
        options: [
          { text: 'Summarise the meeting.', why: 'Mixes decisions and discussion together.' },
          { text: 'Separate explicit decisions from discussion and ideas. Mark anything unclear. Only use the notes.' },
          { text: 'List everything as decided.', why: 'Turns talk into false decisions.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase in the notes to what it probably is.',
        pairs: [
          ['"Agreed: launch on the 16th"', 'Decision'],
          ['"We went back and forth on pricing"', 'Discussion'],
          ['"What if we tried dark mode?"', 'Idea'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good decision log entry, or missing something important?',
        groups: ['Good', 'Missing something'],
        items: [
          { text: 'Launch 16th. Tue 3 Jun. Director. Testing slip. Rejected: 14th.', group: 0 },
          { text: 'Launch date changed.', group: 1 },
          { text: 'Palette final. Mon. Lucía. Brand fit. Rejected: lighter blue.', group: 0 },
          { text: 'Something about pricing.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Six months ago we chose the darker blue. Now my new boss asks why. Nobody remembers!",
        prompt: 'What would have prevented this?',
        options: [
          { text: 'A decision log line: what, when, who, why, and what was rejected.' },
          { text: 'A longer meeting.', why: 'The problem is memory, not meeting length.' },
          { text: 'Nothing could help.', why: 'A one-line log would.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Confirm decisions in writing the same ... (one word)',
        answers: ['day'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the log field to Ada\'s entry.',
        pairs: [
          ['What', 'Launch on the 16th'],
          ['Who', 'The director'],
          ['Why', 'Testing slipped two days'],
          ['Rejected', 'Launching on the 14th'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happens after Ada sends "Confirming what we decided today"?',
        options: [
          { text: 'Any disagreement comes out now, not three weeks later' },
          { text: 'Nothing changes', why: 'Misunderstandings surface early.' },
          { text: 'Everyone is annoyed', why: 'Most people are grateful for clarity.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "but I thought we agreed..." moment at work. Which decision log field would have prevented it?',
    starters: ['The moment was...', 'The field that would have helped:'],
  },
  deepen: { title: 'Try it today', summary: 'Start a simple decision log for your current project: one line per decision.' },
  notes: 'Decision logs are standard project practice. "People leave meetings remembering different decisions" is a general observation, not a statistic.',
};

export default lesson;
