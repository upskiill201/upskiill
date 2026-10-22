import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Step-by-step: pick the right mode. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Pick the right mode',
  summary: 'Grace turns the five modes into a quick routine she can run in her head in under a minute, like the triage she did on the ward.',
  minutes: 12,
  outcomes: [
    'Choose a conflict mode in a few seconds',
    'Use issue, relationship and time to decide',
    'Know when to switch modes',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Conflict triage',
      steps: [
        { title: '1. Is anyone at risk?', body: 'Safety, a legal issue, a patient harmed: compete. Be clear and firm now; talk feelings later.' },
        { title: '2. How important is the issue?', body: 'Trivial (which mugs, which café)? Avoid or accommodate, and let it go properly.' },
        { title: '3. How important is the relationship?', body: 'High, and the issue matters too? Collaborate: find a solution that works for both.' },
        { title: '4. How much time is there?', body: 'If you must decide in ten minutes and you\'re equals, compromise for now, and collaborate later.' },
        { title: '5. Check, and switch if needed', body: 'If collaborating stalls, it\'s fine to compromise. If avoiding is making things worse, switch to addressing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Risk? Compete. Trivial? Let it go. Important issue and relationship? Collaborate. No time? Compromise for now.',
    },
  ],
  apply: {
    scenario: 'Conflict triage.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five triage steps.',
        lines: ['Is anyone at risk?', 'How important is the issue?', 'How important is the relationship?', 'How much time is there?', 'Check, and switch if needed'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mode fits?',
        groups: ['Compete', 'Collaborate', 'Let it go'],
        items: [
          { text: 'A bug that books patients at the wrong surgery', group: 0 },
          { text: 'Step 3 with Femi', group: 1 },
          { text: 'Who sits by the window', group: 2 },
          { text: 'A new team process with Priya', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The team must pick a launch date in ten minutes and opinions are split. What fits?',
        options: [
          { text: 'Compromise for now, then review together later' },
          { text: 'Avoid it', why: 'A decision is needed now.' },
          { text: 'Compete and overrule everyone', why: 'They\'re equals; no safety issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the mode.',
        pairs: [
          ['Patient safety risk', 'Compete'],
          ['Important to both, time to talk', 'Collaborate'],
          ['Ten minutes to decide', 'Compromise for now'],
          ['Trivial preference', 'Avoid or accommodate'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Collaborating with Femi has stalled for an hour. Is it OK to compromise?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'No, keep going for five more hours.', why: 'Stalling has a cost too.' },
          { text: 'Yes. Switching is part of it. Agree a compromise for launch, and note what you\'ll revisit after.' },
          { text: 'Give up and let him decide.', why: 'A compromise respects both views.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The triage rule.',
        template: 'Risk? [[1]]. Trivial? Let it [[2]].',
        blanks: [['Compete'], ['go']],
        distractors: ['Avoid', 'grow'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "let it go properly" mean?',
        options: [
          { text: 'Pretend to drop it but keep score', why: 'That\'s avoiding, not letting go.' },
          { text: 'Mention it again next week', why: 'That\'s not letting go.' },
          { text: 'Actually drop it, without holding a grudge' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s triage is wrong?',
        lines: [
          'Wrong-surgery bug: compete, fix it now.',
          'Step 3 with Femi: collaborate.',
          'Café choice: let it go.',
          'Jayden and the car: avoid, it\'s awkward.',
        ],
        bug: 3,
        fix: 'Jayden and the car: collaborate.',
        explanation: 'Important issue and relationship: collaborate.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many triage steps does Grace use?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Stay in the mode, or switch?',
        groups: ['Stay', 'Switch'],
        items: [
          { text: 'Collaborating is working well', group: 0 },
          { text: 'Avoiding is making it worse', group: 1 },
          { text: 'Collaborating has stalled and time\'s up', group: 1 },
          { text: 'Letting go of the café choice', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Run conflict triage on a disagreement you\'re in right now. Which mode fits?',
    starters: ['Risk:...', 'The mode that fits is...'],
  },
  deepen: {
    title: 'Triage',
    summary: 'Triage means sorting by urgency. Applied to conflict, it stops you from treating every disagreement the same, and from using your default when it doesn\'t fit.',
  },
  notes: 'Mode choice synthesised from Thomas-Kilmann guidance on when each mode is appropriate. Fictional examples.',
};

export default lesson;
