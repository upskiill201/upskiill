import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 4 — the STAR method for behavioural questions. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'STAR stories',
  summary: 'David asks, "Tell me about a time you solved a difficult problem." Clinton has the perfect story, the old phones at Kmer, and tells it backwards, sideways and with no ending. Miracle teaches him STAR.',
  minutes: 12,
  outcomes: ['Use STAR to tell a clear story', 'Spend most of the time on your actions', 'End with a result, ideally a number'],
  learn: [
    {
      kind: 'steps',
      title: 'Situation, Task, Action, Result',
      steps: [
        { title: 'S: Situation (one or two sentences)', body: '"At my internship, Kmer\'s drivers couldn\'t confirm deliveries in areas with no mobile data."' },
        { title: 'T: Task (one sentence)', body: '"My job was to make confirmations work offline, on basic phones."' },
        { title: 'A: Action (most of the answer)', body: '"I saved confirmations on the phone, synced them when data came back, and tested in airplane mode. When two drivers had very old phones, I flagged it early and we added a text-message fallback." Say "I", and be specific about what you did.' },
        { title: 'R: Result (with a number)', body: '"Eleven drivers now use it, with zero lost confirmations, and customers get updates by 2pm instead of evening."' },
        { title: 'Bonus: what you learned', body: 'One line if there\'s time: "I learned to test on the real phones, not just mine."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Short S and T, long A, a clear R with a number. Two minutes or less.',
    },
  ],
  apply: {
    scenario: 'Clinton practises STAR.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put STAR in order.',
        lines: ['Situation', 'Task', 'Action', 'Result'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of STAR?',
        groups: ['Action', 'Result'],
        items: [
          { text: 'I tested in airplane mode', group: 0 },
          { text: 'Zero lost confirmations', group: 1 },
          { text: 'I flagged the old-phones risk early', group: 0 },
          { text: 'Updates by 2pm instead of evening', group: 1 },
          { text: 'I saved confirmations on the phone', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which part should take the most time?',
        options: [
          { text: 'Situation', why: 'Keep the setup short.' },
          { text: 'Action' },
          { text: 'Task', why: 'One sentence is enough.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that hides Clinton\'s part.',
        lines: ['The drivers had no data in some areas.', 'We kind of sorted it out as a team.', 'Eleven drivers now use it.'],
        bug: 1,
        explanation: 'Say "I" and what you specifically did, even in team work.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Nadia built the text fallback with me. Can I still say "I"?',
        options: [
          { text: 'No, say "we" for everything.', why: 'Say what you did, credit others honestly.' },
          { text: 'Say I built all of it.', why: 'Never take her credit.' },
          { text: 'Yes, for my part: "I flagged the risk and built the sync; Nadia and I built the fallback together."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Clinton\'s line.',
        pairs: [
          ['Situation', 'Drivers couldn\'t confirm without data'],
          ['Task', 'Make confirmations work offline'],
          ['Result', 'Eleven drivers, zero lost'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which result is strongest?',
        options: [
          { text: '"Eleven drivers use it, with zero lost confirmations."' },
          { text: '"It went well."', why: 'Give a number.' },
          { text: '"Everyone was happy."', why: 'Give a measurable result.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Short S and T, long [[1]], a clear [[2]] with a number.',
        blanks: [['A', 'Action'], ['R', 'Result']],
        distractors: ['S', 'joke', 'excuse'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the R in STAR stand for? (one word)',
        answers: ['result'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good STAR habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Saying "I" for your actions', group: 0 },
          { text: 'A five-minute situation', group: 1 },
          { text: 'Ending with a number', group: 0 },
          { text: 'Forgetting the result', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one problem you\'ve solved (at work, school or home). Write it as S, T, A, R in one line each.',
    starters: ['S:', 'R:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Tell your STAR story out loud in under two minutes. Time it. If the Situation takes more than 20 seconds, cut it.',
  },
  notes: 'STAR (Situation, Task, Action, Result) is a widely used structure for behavioural interview answers.',
};

export default lesson;
