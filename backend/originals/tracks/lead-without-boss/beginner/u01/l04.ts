import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Step-by-step: the listening tour. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The listening tour',
  summary: 'Tuesday. Remi decides to visit all five teams before he proposes anything. He\'s nervous. Njeri in the warehouse is famous for eating head-office people alive. Tey gives him a plan for each visit.',
  minutes: 12,
  outcomes: [
    'Run a listening tour in five steps',
    'Ask questions that show you respect their expertise',
    'Leave each conversation with trust, not just notes',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A listening tour in five steps',
      steps: [
        { title: '1. Go to them', body: 'Their desk, their warehouse, their call time. Not your meeting room. Going to people says "your work matters", before you\'ve said a word.' },
        { title: '2. Say why, in one sentence', body: '"Refunds take 21 days and I\'ve been asked to help fix it. You know this better than me, so I wanted to start with you."' },
        { title: '3. Ask, then really listen', body: '"Walk me through what happens when a refund reaches you." "What slows it down?" "What have people tried before?" Take notes. Don\'t defend, don\'t pitch.' },
        { title: '4. Ask what they need', body: '"If this worked better, what would it change for you?" Now you know what\'s in it for them. You\'ll need that in Chapter 2.' },
        { title: '5. Close the loop', body: 'A short thank-you the same day, with one thing you learned from them. Later, show them where their idea ended up.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Remi in the warehouse, two ways',
      before: { label: 'Pitch first', text: '"Hi Njeri! I\'m Remi from Strategy. We\'re going to make returns faster with a new digital form." (Njeri: "Ah. Another one.")' },
      after: { label: 'Listen first', text: '"Hi Njeri. Refunds take 21 days and you see returns every day. What actually happens when a box comes back?" (Forty minutes later: "Nobody has ever asked me that.")' },
      notes: ['Pitch first tells her she\'s about to be changed.', 'Listen first tells her she\'s the expert.', 'Njeri knew the biggest delay: returned boxes wait a week for a signature.'],
    },
  ],
  apply: {
    scenario: 'Tuesday, the listening tour.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Go to them', 'Say why, in one sentence', 'Ask, then listen', 'Ask what they need', 'Close the loop'],
      },
      {
        kind: 'mcq',
        prompt: 'Why go to their desk instead of booking your meeting room?',
        options: [
          { text: 'It\'s faster', why: 'It\'s about respect, not speed.' },
          { text: 'It shows their work matters, before you say anything' },
          { text: 'Your meeting room is taken', why: 'Not the reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Listening tour or sales pitch?',
        groups: ['Listening', 'Pitching'],
        items: [
          { text: '"What slows it down?"', group: 0 },
          { text: '"We\'re going to fix it with a new form."', group: 1 },
          { text: '"What have people tried before?"', group: 0 },
          { text: '"Trust me, this will work."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'njeri',
        message: 'Ah. Another head-office project. I\'ve seen five.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'This one is different, I promise.', why: 'Everyone said that. Show, don\'t promise.' },
          { text: 'Okay, sorry to bother you.', why: 'Folding before you\'ve learned anything.' },
          { text: 'Then you know what went wrong with them better than anyone. What would you do differently?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Step 4 finds out what\'s in it for ___. (one word)',
        answers: ['them', 'Them'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What did Njeri know that the folder didn\'t say?',
        options: [
          { text: 'Returned boxes wait a week for a signature' },
          { text: 'Nothing useful', why: 'She knew the biggest delay.' },
          { text: 'That Remi was wrong about everything', why: 'She just knew the floor.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s visit plan. Which line breaks the tour?',
        lines: [
          'Ask Wanjiku to walk me through refund approvals.',
          'If she mentions a problem, explain why my idea fixes it.',
          'Ask what a better process would change for her.',
        ],
        bug: 1,
        fix: 'If she mentions a problem, ask "tell me more".',
        explanation: 'Pitching mid-listen turns a tour into a sales call.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Say why', '"I\'ve been asked to help fix refunds."'],
          ['Ask what they need', '"What would it change for you?"'],
          ['Close the loop', '"Thanks. I learned about the signatures."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] before you [[2]].',
        blanks: [['Listen', 'listen'], ['propose', 'pitch']],
        distractors: ['Talk', 'wait'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s best question.',
        tiles: ['What', 'slows', 'it', 'down?'],
        distractors: ['fixes'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one person whose help you\'ll need soon. Write the three questions you\'d ask them on a listening tour.',
    starters: ['1. ...', '2. ...', '3. ...'],
  },
  deepen: {
    title: 'Go to their desk',
    summary: 'This week, instead of messaging someone you need, go to where they work (or call at their time). Ask one question about their work, and listen.',
  },
  notes: 'Listening tours as a first step in a new role or initiative: e.g. Michael Watkins, The First 90 Days (2003), learning conversations; listening and respect as the basis of referent power and credibility (Kouzes & Posner). Fictional details.',
};

export default lesson;
