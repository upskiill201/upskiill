import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: writing a shared goal people can repeat (Kouzes & Posner, inspire a shared vision). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'A goal anyone can repeat',
  summary: 'The whiteboard goal took three drafts. Remi wants to know why the third one worked and the first two didn\'t, so he can do it faster next time. Tey breaks it into five steps.',
  minutes: 12,
  outcomes: [
    'Write a shared goal in five steps',
    'Make it short enough to repeat from memory',
    'Make sure every person can see their part in it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A shared goal in five steps',
      steps: [
        { title: '1. Start from the problem people feel', body: 'Not "optimise refunds". Instead: "Mama Mboga waits three weeks to get its money back." A real problem gets people moving.' },
        { title: '2. Make it one sentence, with a number', body: '"Every business refund paid within 5 days." Short enough to repeat in a lift. A number means everyone knows when you\'ve won.' },
        { title: '3. Add the guardrail', body: 'What must NOT get worse? "...with no new audit errors." That\'s Wanjiku\'s interest, written into the goal, so she can say yes.' },
        { title: '4. Check everyone can see their part', body: 'Go round the room: "Felix, where are you in this?" If someone can\'t see themselves in it, the goal isn\'t shared yet. Njeri\'s "the warehouse gets told" made it hers.' },
        { title: '5. Say it out loud, every time', body: 'Open every meeting and update with the goal. Leadership researchers Jim Kouzes and Barry Posner call this inspiring a shared vision: people repeat what they hear repeated.' },
      ],
    },
    {
      kind: 'compare',
      title: 'The three drafts',
      before: { label: 'Draft 1', text: 'Optimise the end-to-end refund process to deliver best-in-class customer outcomes.' },
      after: { label: 'Draft 3', text: 'Every business refund paid within 5 days, with no new audit errors.' },
      notes: ['Draft 1 is jargon: nobody can repeat it or tell if it\'s done.', 'Draft 3 has a number, a deadline and a guardrail.', 'Draft 2 ("Faster refunds!") had energy but no number.'],
    },
  ],
  apply: {
    scenario: 'Remi, studying the whiteboard photo.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Start from the problem people feel', 'One sentence, with a number', 'Add the guardrail', 'Check everyone sees their part', 'Say it every time'],
      },
      {
        kind: 'mcq',
        prompt: 'What is a guardrail in a goal?',
        options: [
          { text: 'A deadline', why: 'That\'s the "by when".' },
          { text: 'What must not get worse while you chase the goal' },
          { text: 'A rule for meetings', why: 'It\'s part of the goal itself.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shared goal, or not yet?',
        groups: ['Shared goal', 'Not yet'],
        items: [
          { text: '"Every refund paid within 5 days."', group: 0 },
          { text: '"Optimise the refund journey."', group: 1 },
          { text: '"...with no new audit errors."', group: 0 },
          { text: '"Faster refunds!"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Where\'s Lagos in this goal? It says business refunds, but I only see Nairobi.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Good catch. Lagos returns are in it: six of the days are the reference numbers. Shall we say "Nairobi and Lagos" so it\'s clear?' },
          { text: 'It\'s mostly a Nairobi thing.', why: 'Then Emeka isn\'t in it, and he\'ll act like it.' },
          { text: 'Don\'t worry about it.', why: 'Step 4 says: worry about exactly that.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A goal is short enough when you can ___ it from memory. (one word)',
        answers: ['repeat', 'Repeat', 'say', 'recite'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why add "with no new audit errors"?',
        options: [
          { text: 'To make it longer', why: 'Every word earns its place.' },
          { text: 'Audit asked for it', why: 'It came from Wanjiku\'s worry.' },
          { text: 'It writes Wanjiku\'s interest into the goal, so she can say yes' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s Monday update. Which line breaks step 5?',
        lines: [
          'Goal: every business refund paid within 5 days, no new audit errors.',
          'Progress: 21 days down to 17.',
          'Next week I\'ll skip the goal, everyone knows it by now.',
        ],
        bug: 2,
        fix: 'Next update: same goal at the top, new number.',
        explanation: 'People repeat what they hear repeated. Say it every time.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the goal to its job.',
        pairs: [
          ['"Every business refund"', 'What'],
          ['"Within 5 days"', 'The number'],
          ['"No new audit errors"', 'The guardrail'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'One [[1]], a [[2]], a [[3]].',
        blanks: [['sentence'], ['number'], ['guardrail']],
        distractors: ['slogan', 'logo'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the goal.',
        tiles: ['Every', 'refund', 'paid', 'within', '5', 'days.'],
        distractors: ['optimised'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a shared goal for a group you\'re in: one sentence, a number and a guardrail. Can every member see their part in it?',
    starters: ['Goal: ...', 'Guardrail: ...'],
  },
  deepen: {
    title: 'Open with the goal',
    summary: 'For your next three group meetings or messages, open with the goal in one sentence. Notice when other people start saying it too.',
  },
  notes: 'Kouzes & Posner, The Leadership Challenge: "Inspire a Shared Vision" (envision the future, enlist others). Specific, measurable goals: Locke & Latham (2002). Guardrail metrics (counter-metrics): common goal-setting practice.',
};

export default lesson;
