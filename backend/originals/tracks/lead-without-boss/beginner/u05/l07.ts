import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Reading: making it last after you move on (Kotter: anchor the change; owners, routines, measures). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Make it last without you',
  summary: 'Mrs Achieng\'s warning, over tea: "I\'ve seen five projects fix something for a month, and then it went back. The day the project person left." Remi has one week left on this project. He reads how to make the change stick.',
  minutes: 12,
  outcomes: [
    'Know why fixes slide back after a project ends',
    'Give every fix a permanent owner, routine and measure',
    'Hand over so the change no longer depends on you',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'After the project',
      html: "<p>Many changes fade after the project ends. People slip back to old habits, the new form gets lost, and the person who kept chasing has moved on. John Kotter's last stage of change is about this: <strong>anchoring</strong> the new way in how the organisation normally works, so it no longer needs a project to keep it alive.</p><h3>1. A permanent owner for every fix</h3><p>Not \"the project\". A role: the warehouse supervisor owns the signature form; Finance owns the sample-check; Lagos logistics owns the reference field. If nobody owns it, it slowly stops happening.</p><h3>2. Put it in the routine</h3><p>Fixes last when they're part of what people already do: the sample-check in Finance's weekly checklist, the new form in warehouse training for every new starter.</p><h3>3. Keep one measure visible</h3><p>Average refund days, on the monthly operations report Kamau already reads. If it starts creeping up, someone notices before customers do.</p><h3>4. Write the \"why\" down</h3><p>A one-page note: what the problem was, what we changed, and why. When a new manager asks \"why do we sample-check?\", the answer is there, so the fix isn't undone by someone who never knew the reason.</p><h3>5. Step back on purpose</h3><p>The test of leading without authority: does it keep working when you stop showing up? Hand over the chart, stop chasing, and check in once after a month.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the test that a change has really landed?',
      options: ['It keeps working when the project person stops showing up', 'The CEO liked the presentation', 'There was a celebration'],
      answer: 0,
      explanation: 'If it depends on you, it isn\'t anchored yet.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Anchor it: a permanent owner, part of the routine, one visible measure, the why written down. Then step back on purpose.',
    },
  ],
  apply: {
    scenario: 'Tea with Mrs Achieng, then reading.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do fixes often slide back after a project?',
        options: [
          { text: 'The fix was wrong', why: 'Even good fixes fade without owners.' },
          { text: 'Nobody owns them, and the person chasing has moved on' },
          { text: 'People are lazy', why: 'People are busy. Routines win.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the fix to its permanent owner.',
        pairs: [
          ['Signature form', 'Warehouse supervisor'],
          ['Sample-check', 'Finance'],
          ['Reference field', 'Lagos logistics'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Anchors it, or leaves it fragile?',
        groups: ['Anchors it', 'Fragile'],
        items: [
          { text: 'Sample-check in Finance\'s weekly checklist', group: 0 },
          { text: '"Remi will keep an eye on it."', group: 1 },
          { text: 'Refund days on Kamau\'s monthly report', group: 0 },
          { text: 'The chart on Remi\'s laptop only', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'And when you\'re gone, who remembers why we do it this way?',
        prompt: 'Remi\'s best answer?',
        options: [
          { text: 'A one-page note in the operations folder: the problem, the fix, and why. And each owner has it in their routine.' },
          { text: 'I\'ll always be around.', why: 'He won\'t. That\'s the point.' },
          { text: 'Everyone will remember.', why: 'New people won\'t know.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kotter calls the last stage ___ the change in the culture. (one word)',
        answers: ['anchoring', 'Anchoring', 'embedding', 'institutionalising'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why write down the "why"?',
        options: [
          { text: 'For audit only', why: 'It\'s for everyone after you.' },
          { text: 'So a new manager doesn\'t undo a fix they never understood' },
          { text: 'To make Remi look good', why: 'It\'s about the fix surviving.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s handover plan. Which line keeps it dependent on him?',
        lines: [
          'Each fix has a named permanent owner.',
          'I\'ll keep chasing everyone every Friday after I move on.',
          'Refund days go on the monthly operations report.',
        ],
        bug: 1,
        fix: 'I\'ll check in once, after a month, and then step back.',
        explanation: 'If he keeps chasing forever, it never becomes theirs.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put anchoring a change in order.',
        lines: ['Name a permanent owner', 'Put it in the routine', 'Keep one measure visible', 'Write down the why', 'Step back'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If it depends on [[1]], it isn\'t [[2]] yet.',
        blanks: [['you'], ['anchored']],
        distractors: ['them', 'finished'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the handover test.',
        tiles: ['Does', 'it', 'work', 'without', 'me?'],
        distractors: ['us?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you helped change. Would it still work if you left tomorrow? What would anchor it?',
    starters: ['If I left, it would...', 'To anchor it, I\'d...'],
  },
  deepen: {
    title: 'The one-page why',
    summary: 'For one thing you\'ve changed, write a one-page note: the problem, the fix, and why. Put it where the next person will find it.',
  },
  notes: 'John P. Kotter, Leading Change (1996), stage 8: anchoring new approaches in the culture. Sustaining change through ownership, routines and measures reflects standard change-management and process-ownership practice. Fictional details.',
};

export default lesson;
