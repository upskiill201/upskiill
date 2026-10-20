import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: ward rules v5, the full page. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ward rules v5',
  summary: 'The finished page: Grace\'s ward rules for the office. Twenty-five lines, five chapters, one page she\'ll keep on her desk. Tap each section.',
  minutes: 11,
  outcomes: [
    'Read a complete set of conflict rules',
    'Link each section to a chapter of this course',
    'Finish your own one-page rules',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s ward rules v5',
      text: 'Conflict: silence is not peace; triage first; argue about the work. Heat: lower and slower; acknowledge before you solve; name it to tame it; twenty minutes, then come back. Meaning: writing has no voice; only the bottom rung is a fact; ask lightly. Criticism: name the trigger; ask what might be right; draft, then respond. Boundaries: about my actions; which should move; observation, feeling, need, request; same calm words.',
      hotspots: [
        { phrase: 'silence is not peace', note: 'Chapter 1: three days of avoiding Femi.' },
        { phrase: 'lower and slower', note: 'Chapter 2: the design review and the night-shift voice.' },
        { phrase: 'writing has no voice', note: 'Chapter 3: "Fine." from a hospital car park.' },
        { phrase: 'ask what might be right', note: 'Chapter 4: "just opinions" became a meeting with data.' },
        { phrase: 'which should move', note: 'Chapter 5: the survey moved to after launch.' },
        { phrase: 'same calm words', note: 'Chapter 5: the keys stayed with Grace that week.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Conflict, heat, meaning, criticism, boundaries. One page of short rules you can use under stress.',
    },
  ],
  apply: {
    scenario: 'Ward rules v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the section to the chapter.',
        pairs: [
          ['Conflict', 'The quiet war'],
          ['Heat', 'Cool it down'],
          ['Meaning', 'That\'s not what I meant'],
          ['Criticism', 'That\'s not fair'],
          ['Boundaries', 'Lines that hold'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section is this rule in?',
        groups: ['Heat', 'Meaning', 'Boundaries'],
        items: [
          { text: 'Name it to tame it', group: 0 },
          { text: 'Only the bottom rung is a fact', group: 1 },
          { text: 'Which should move', group: 2 },
          { text: 'Twenty minutes, then come back', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which rule would Grace use first when a colleague raises their voice?',
        options: [
          { text: 'Lower and slower' },
          { text: 'Draft, then respond', why: 'That\'s for written criticism.' },
          { text: 'Which should move', why: 'That\'s for workload.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many sections does ward rules v5 have?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Could we turn your page into a team agreement?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'I\'d love that. But let\'s write it together as a team, so everyone owns it, not just me.' },
          { text: 'No, they\'re my rules.', why: 'Sharing helps the team.' },
          { text: 'Yes, just send everyone mine.', why: 'A shared agreement works better.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The criticism section.',
        template: 'Name the [[1]]; ask what might be [[2]]; draft, then respond.',
        blanks: [['trigger'], ['right', 'true']],
        distractors: ['culprit', 'funny'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the rules to one page?',
        options: [
          { text: 'Short rules are usable under stress; long ones aren\'t' },
          { text: 'To save paper', why: 'It\'s about stress.' },
          { text: 'No reason', why: 'Short is usable.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of v5 is wrong?',
        lines: [
          'Conflict: silence is not peace.',
          'Heat: lower and slower.',
          'Meaning: assume the worst, to be safe.',
          'Boundaries: same calm words.',
        ],
        bug: 2,
        fix: 'Meaning: ask lightly.',
        explanation: 'Assuming the worst is climbing the ladder.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the sections as on the page.',
        lines: ['Conflict', 'Heat', 'Meaning', 'Criticism', 'Boundaries'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section is this rule in?',
        groups: ['Conflict', 'Criticism'],
        items: [
          { text: 'Triage first', group: 0 },
          { text: 'Draft, then respond', group: 1 },
          { text: 'Argue about the work', group: 0 },
          { text: 'Name the trigger', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Finish your own one-page rules, with a section for each chapter.',
    starters: ['Conflict:...', 'Heat:...', 'Boundaries:...'],
  },
  notes: 'Ward rules v5 (fictional) summarises the course.',
};

export default lesson;
