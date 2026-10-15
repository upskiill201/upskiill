import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 plus earlier. Story beat: Felix fixes Remi's ticket from his holiday, in pure acronym. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Felix\'s IT ticket',
  summary: 'Felix is on holiday. Felix fixes Remi\'s access anyway, from his phone, in four minutes. His ticket notes are a masterpiece of letters.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Decode document, project, customer and chat acronyms in a real message', 'Pick the right tone for the right reader'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 10:52 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Remi\'s helpdesk ticket updates. Status: RESOLVED. Resolved by: Felix (OOO).' },
        { speaker: 'felix', text: 'Ticket notes: Access granted per SOP. RCA: user not in finance group, PEBKAC on our side tbh, will fix the onboarding SOP. SLA met. MVP of new access form in progress, scope TBC. LMK if issues. BRB, on a beach.' },
        { speaker: 'remi', text: '(He fixed it from a beach. In four minutes. And used eleven acronyms doing it.)' },
        { speaker: 'tey', text: "Felix: the fastest fixer at Synergix, the slowest explainer. Let's decode his notes, then help Remi reply the right way." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3. Felix\'s ticket notes.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Access granted per SOP." What does that mean?',
        options: [
          { text: 'Access was given following the standard procedure' },
          { text: 'Access was given by a special person', why: 'SOP = standard operating procedure.' },
          { text: 'Access is still pending', why: 'It says granted.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Decode Felix\'s notes.',
        pairs: [
          ['RCA', 'Root cause analysis: why it happened'],
          ['SLA met', 'Fixed within the promised time'],
          ['LMK', 'Let me know'],
          ['tbh', 'To be honest'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"MVP of new access form in progress, scope TBC." What is Felix doing?',
        options: [
          { text: 'Finished a perfect new form', why: 'MVP = first simple version; and it\'s in progress.' },
          { text: 'Building a simple first version of a new form, and its exact contents aren\'t confirmed yet' },
          { text: 'Cancelling the form', why: 'It\'s in progress.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Sorted! LMK if any issues. BRB, beach.',
        prompt: 'Felix is a colleague who writes in shorthand. Best reply?',
        options: [
          { text: 'Dear Felix, I write to express my deepest gratitude for your assistance.', why: 'Much too formal for Felix on a beach.' },
          { text: 'Legend, ty! Works perfectly. Enjoy the beach!' },
          { text: 'k', why: 'Even for Felix, a bit cold after he fixed it on holiday.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which family is it from?',
        groups: ['Documents', 'Projects', 'Customers'],
        items: [
          { text: 'NDA', group: 0 },
          { text: 'MVP', group: 1 },
          { text: 'Churn', group: 2 },
          { text: 'SOW', group: 0 },
          { text: 'Scope creep', group: 1 },
          { text: 'Pipeline', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'SLA = service level ... (one word)',
        answers: ['agreement'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Mrs Achieng asked Remi to tell her when his access was fixed. Which line is wrong for her?',
        lines: [
          'Hi Mrs Achieng, my access to the invoice system is now working.',
          'Felix fixed it, tbh PEBKAC, LGTM, np.',
          'The KPI deck will be with Brian by 5 p.m. today.',
        ],
        bug: 1,
        fix: 'Felix sorted it this morning.',
        explanation: 'Mrs Achieng does not do shorthand. Neither, wisely, should Remi with her.',
      },
      {
        kind: 'mcq',
        prompt: 'Before Kestrel gets your customer data, what should be signed?',
        options: [
          { text: 'An SOP', why: 'That\'s an internal procedure.' },
          { text: 'An MoU', why: 'Possible for partnerships, but secrecy is an NDA\'s job.' },
          { text: 'An NDA' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['KPI', 'Key performance indicator'],
          ['P&L', 'Profit and loss'],
          ['CFO', 'Chief financial officer'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Felix\'s fix, in order.',
        lines: ['Remi raises a ticket', 'Felix finds the root cause (RCA)', 'Felix grants access per the SOP', 'SLA met, ticket resolved'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Translate Felix into plain English.',
        template: '"RCA: user not in finance group" = "The [[1]] was that Remi wasn\'t in the [[2]] group."',
        blanks: [['cause', 'reason', 'problem'], ['finance']],
        distractors: ['beach', 'scope'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s plain-words update to Brian.',
        tiles: ['Access', 'fixed,', 'KPI', 'deck', 'on', 'track', 'for', 'today.'],
        distractors: ['PEBKAC', 'tbh'],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life writes most like Felix? How do you reply to them, and does it change who else is reading?',
    starters: ['My Felix is...', 'I reply...'],
  },
  deepen: {
    title: 'Translate one message a day',
    summary: 'When you receive a message full of acronyms, translate it into plain words in your head before you reply. It\'s the fastest way to make the letters stick.',
  },
  notes: 'Review of lessons 11–14 plus earlier. RCA = root cause analysis; SLA = service level agreement; LMK = let me know; tbh = to be honest; PEBKAC (Chapter 1 lesson 17). SOP, MVP, scope, TBC from this chapter.',
};

export default lesson;
