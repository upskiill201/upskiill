import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: Remi's Week 5 update, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the Week 5 update',
  summary: 'Friday, 4 p.m. Remi sends his weekly update to the team, Brian and the Finance Director. Mr Mutua replies with one word: "Good." Wanjiku says that\'s the most he\'s ever written. Tap through to see every Chapter 4 tool in it.',
  minutes: 11,
  outcomes: [
    'See every Chapter 4 tool in one weekly update',
    'Write an update that keeps momentum through a stall',
    'Be honest about what slipped without blaming anyone',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Refund project, Week 5 update',
      text: 'Goal: every business refund paid within 5 days, with no new audit errors. This week: 11 days, down from 21. The IT freeze blocked the new screen, so Felix and I asked for one exception, and got it: Saturday. The Lagos reference field slipped twice; it needed a sign-off, now done. A sales email promised 5 days too early; Pauline sent a correction the same day. Audit errors: zero. Next week: 9 days, if Saturday works.',
      hotspots: [
        { phrase: 'Goal: every business refund paid within 5 days, with no new audit errors.', note: 'Same goal, every time. Steady, not stubborn.' },
        { phrase: '11 days, down from 21', note: 'One number everyone watches: a small win, made visible.' },
        { phrase: 'Felix and I asked for one exception, and got it', note: 'A joint escalation, credited to both. Felix\'s name, upwards, to his peers.' },
        { phrase: 'it needed a sign-off, now done', note: 'The helpful follow-up found the real obstacle. Named honestly, no blame on Emeka.' },
        { phrase: 'Pauline sent a correction the same day', note: 'Peer feedback, resolved privately. The update shows the fix, not the drama.' },
        { phrase: 'Audit errors: zero.', note: 'Wanjiku\'s guardrail, reported every week. That\'s why Mr Mutua wrote "Good."' },
        { phrase: 'Next week: 9 days, if Saturday works.', note: 'The next small step, with an honest "if". Not declaring victory early.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good stall-week update: the goal, the number, what got unblocked and by whom, what slipped and why, the guardrail, the next step.',
    },
  ],
  apply: {
    scenario: 'Line check, Week 5.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Mr Mutua reply "Good."?',
        options: [
          { text: 'He was busy', why: 'He usually writes nothing at all.' },
          { text: 'Remi copied Kamau', why: 'He didn\'t.' },
          { text: 'The guardrail (zero audit errors) was reported, honestly, every week' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool is it?',
        groups: ['Small wins', 'Escalation', 'Steady'],
        items: [
          { text: '11 days, down from 21', group: 0 },
          { text: '"Felix and I asked together"', group: 1 },
          { text: 'The goal at the top again', group: 2 },
          { text: 'Next week: 9 days', group: 0 },
          { text: 'One exception, one Saturday', group: 1 },
          { text: 'Zero audit errors, every week', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'You didn\'t say the Lagos field was my fault. Thanks.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'It wasn\'t your fault. It needed a sign-off, and you sorted it. That\'s the story.' },
          { text: 'I could have, though.', why: 'Undoes the kindness.' },
          { text: 'Just get it done next time.', why: 'He did get it done.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The "no new audit errors" part is the ___. (one word)',
        answers: ['guardrail', 'Guardrail'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why mention the sales email at all?',
        options: [
          { text: 'To blame Pauline', why: 'It credits her quick fix.' },
          { text: 'Honesty: people will hear anyway, so show the fix' },
          { text: 'It wasn\'t needed', why: 'Hiding it would cost trust.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the update. Which line breaks Chapter 4?',
        lines: [
          'This week: 11 days, down from 21.',
          'Delays were caused by IT and Lagos not delivering.',
          'Next week: 9 days, if Saturday works.',
        ],
        bug: 1,
        fix: 'The freeze and a sign-off slowed us; both are now unblocked.',
        explanation: 'That\'s escalating people, in writing, to their peers.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the update in order.',
        lines: ['The goal', 'The number', 'What got unblocked, and by whom', 'What slipped, and why', 'The next step'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"11 days, down from 21"', 'Small wins (Weick)'],
          ['The same goal every week', 'Consistency (Moscovici)'],
          ['"If Saturday works"', 'No early victory (Kotter)'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Name what [[1]], not [[2]] slipped it.',
        blanks: [['slipped'], ['who']],
        distractors: ['won', 'why'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Mr Mutua\'s reply.',
        tiles: ['Good.', 'Keep', 'going.'],
        distractors: ['Stop.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-line update for something that stalled: the goal, the number, what unblocked it, what slipped and why, the next step.',
    starters: ['Goal: ...', 'Number: ...', 'Next: ...'],
  },
  deepen: {
    title: 'Friday at four',
    summary: 'Send a short update on something you\'re leading every Friday for three weeks, same shape each time. See who starts replying.',
  },
  notes: 'Synthesis of Chapter 4 tools: small wins and visible progress, joint escalation, helpful follow-up, peer feedback, guardrail reporting, consistency. Fictional update. Mr Mutua\'s two-word reply in the tapBuild is a light extension of his "Good."',
};

export default lesson;
