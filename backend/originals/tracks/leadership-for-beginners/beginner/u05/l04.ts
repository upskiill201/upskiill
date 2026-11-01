import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Step-by-step: when a crisis hits (stabilise, facts, roles, communicate, rhythm). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'When a crisis hits',
  summary: 'Carmen approved the stickers. Now 20,000 bags need re-labelling by Monday. That\'s a weekend, five people, and a warehouse in Iztapalapa. Tey: "Crises go better with a simple plan. Five steps."',
  minutes: 12,
  outcomes: [
    'Run a crisis in five simple steps',
    'Give everyone one clear job',
    'Keep people informed on a steady rhythm',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A crisis in five steps',
      steps: [
        { title: '1. Stop it getting worse', body: 'First, contain it. Lucía asks the supplier to hold every bag that hasn\'t shipped. Fixing comes after stopping.' },
        { title: '2. Get the facts', body: 'What do we know? What don\'t we know? When will we know? Write them in two columns. Guesses go in the second one.' },
        { title: '3. One person, one job', body: 'Marta: the sticker schedule. Diego: shops and stock. Tomás: customer emails. Sofía: the pre-order tracker. Rafa: the "slight delay" banner, just in case. Overlapping jobs cause dropped balls.' },
        { title: '4. Tell people early, and plainly', body: 'Customers, shops, Carmen. Short and honest: what happened, what you\'re doing, when they\'ll hear next. Silence lets rumours fill the gap.' },
        { title: '5. Set a rhythm', body: 'A 10-minute check-in at 9 a.m. and 4 p.m., same time every day. Everyone knows when they\'ll get news, so nobody chases.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Saturday, two ways',
      before: { label: 'No plan', text: 'Everyone in the warehouse, all doing everything. Two people label the same box. Nobody emails the shops. Lucía\'s phone rings 41 times.' },
      after: { label: 'Five steps', text: 'One job each. Check-ins at 9 and 4. Shops told on Friday. By 4 p.m. Saturday, 14,000 bags done. Lucía\'s phone rings twice.' },
      notes: ['One job each means nothing gets done twice, or missed.', 'Telling people early stops the phone ringing.', 'A rhythm replaces chasing.'],
    },
  ],
  apply: {
    scenario: 'The re-labelling weekend.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five crisis steps in order.',
        lines: ['Stop it getting worse', 'Get the facts', 'One person, one job', 'Tell people early', 'Set a rhythm'],
      },
      {
        kind: 'mcq',
        prompt: 'Why stop it getting worse before fixing it?',
        options: [
          { text: 'It\'s faster to fix everything at once', why: 'Not while more broken bags keep shipping.' },
          { text: 'Every bag that ships wrong is one more to fix later' },
          { text: 'It doesn\'t matter which comes first', why: 'It matters a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact, or guess?',
        groups: ['We know', 'We don\'t know yet'],
        items: [
          { text: 'About 20,000 bags are affected', group: 0 },
          { text: 'Whether shops will accept stickers', group: 1 },
          { text: 'The supplier can print stickers', group: 0 },
          { text: 'Whether launch day will slip', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Should I also call the shops? And help Tomás with emails?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes, do everything you can!', why: 'Overlapping jobs cause dropped balls, and Marta burns out.' },
          { text: 'Whatever you think.', why: 'In a crisis, clear roles beat vague ones.' },
          { text: 'Thank you, but no: your one job is the sticker schedule. Diego has shops, Tomás has emails.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a crisis: one person, one ___. (one word)',
        answers: ['job', 'Job', 'role', 'task'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why check-ins at 9 and 4, every day?',
        options: [
          { text: 'Everyone knows when news comes, so nobody chases' },
          { text: 'To check up on people', why: 'It\'s to share news, not to inspect.' },
          { text: 'Because meetings are fun', why: 'They\'re short on purpose.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s message to the shops. Which line breaks step 4?',
        lines: [
          'Some chili-lime bags have a wrong barcode. Stickers are being added.',
          'We\'d rather not say more until it\'s fully sorted.',
          'You\'ll hear from Diego by Monday 10 a.m.',
        ],
        bug: 1,
        fix: 'All bags will be relabelled before they reach you.',
        explanation: 'Silence lets rumours fill the gap. Say what you know.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Lucía\'s move.',
        pairs: [
          ['Stop it getting worse', 'Hold unshipped bags'],
          ['Tell people early', 'Email the shops Friday'],
          ['Set a rhythm', 'Check-ins at 9 and 4'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Stop it, get the [[1]], one [[2]] each, tell people [[3]].',
        blanks: [['facts'], ['job', 'role'], ['early']],
        distractors: ['blame', 'later'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first crisis question.',
        tiles: ['What', 'do', 'we', 'know?'],
        distractors: ['fear?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a crisis you went through (big or small). Which of the five steps happened? Which was missing?',
    starters: ['The crisis was...', 'The missing step was...'],
  },
  deepen: {
    title: 'Two columns',
    summary: 'Next time something goes wrong, draw two columns: "We know" and "We don\'t know yet". It stops guesses from becoming facts.',
  },
  notes: 'Crisis leadership steps (contain, establish facts, assign clear roles, communicate early and honestly, set a communication cadence) reflect standard incident-management practice (e.g. incident command roles, regular status updates). Fictional figures.',
};

export default lesson;
