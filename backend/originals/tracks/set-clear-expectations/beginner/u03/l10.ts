import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Chapter Challenge: the quiet trade-off (Kavya skipped two musts to hit a date). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the quiet trade-off',
  summary: 'Day 18. Kavya delivers the payment-success page on time, Thursday, exactly as planned. Arjun runs the checklist: two must-haves are missing. The cheap-Android test and the Hindi error messages. Kavya: "I knew. I didn\'t want to miss another date."',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 3 tool in one live moment',
    'Make trade-offs visible instead of quiet',
    'Fix the system that made the trade-off feel necessary',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 18, Thursday, 5:55 p.m.',
      beats: [
        { speaker: 'kavya', text: 'I knew they were missing. But I said Thursday, and last time I was late, and I didn\'t want to be the late one again.' },
        { speaker: 'narrator', text: 'Arjun realises something uncomfortable. He made dates feel more important than the checklist. Every time someone missed a date, he noticed. Every time someone quietly dropped a must-have, nobody did.' },
        { speaker: 'narrator', text: 'Twelve days to Diwali. Kavya is waiting to see if being honest was a mistake. You\'re with Arjun.' },
      ],
    },
  ],
  apply: {
    scenario: 'Day 18, 5:55 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Arjun say first?',
        options: [
          { text: '"Thank you for telling me straight away. That\'s exactly what I need. Let\'s look at why the date felt more important than the musts."' },
          { text: '"You skipped two musts? That\'s not okay."', why: 'She told the truth. Punish that and she\'ll hide it next time.' },
          { text: '"Don\'t worry, I\'ll add them tonight."', why: 'Rescuing hides the real problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool fixes it?',
        groups: ['Quality bar', 'Priorities', 'Estimates'],
        items: [
          { text: 'Musts are never traded silently', group: 0 },
          { text: 'If time is short, move a should, not a must', group: 1 },
          { text: 'Plan a day and a half, not "a couple of hours"', group: 2 },
          { text: 'Check the list before saying "done"', group: 0 },
          { text: 'Ask Arjun which piece gives', group: 1 },
          { text: 'Buffer before Diwali', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So next time I should just be late?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, quality first, always.', why: 'Too simple: sometimes the date matters more, but decide it openly.' },
          { text: 'No, never be late.', why: 'That\'s exactly what caused this.' },
          { text: 'Next time, tell me on Wednesday: "I can do the musts by Friday, or skip two by Thursday." Then we choose together. No quiet trade-offs.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The problem wasn\'t the trade-off. It was that it was ___. (one word)',
        answers: ['quiet', 'Quiet', 'hidden', 'silent'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s fix in order.',
        lines: ['Thank her for being honest', 'Own that dates felt more important', 'Add the "say it early" rule to the page', 'Re-plan the two musts together'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Arjun accidentally teach the team?',
        options: [
          { text: 'That quality doesn\'t matter', why: 'He never said that. His reactions taught it.' },
          { text: 'Nothing', why: 'Reactions teach more than rules.' },
          { text: 'That missed dates get noticed, and missed must-haves don\'t' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s new team-page line. Which version breaks Chapter 3?',
        lines: [
          'Musts are never dropped quietly.',
          'If a date is at risk, just work later to hit it.',
          'If a date is at risk, say so the day before, with options.',
        ],
        bug: 1,
        fix: 'If a date is at risk, we choose together which should moves.',
        explanation: '"Just work later" is a hidden trade-off with people\'s evenings.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the tool.',
        pairs: [
          ['"Thank you for telling me."', 'Safe to be honest'],
          ['"Move a should, not a must."', 'MoSCoW'],
          ['"Tell me Wednesday, with options."', 'Trade-offs made visible'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which should move so Kavya can finish the two musts by Saturday?',
        options: [
          { text: 'Skip the Hindi errors for good', why: 'That\'s a must.' },
          { text: 'Coupon codes slip to Day 22' },
          { text: 'Checkout testing', why: 'Checkout is the polished piece.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3, in one line.',
        template: 'Show what good looks like, see it [[1]], and never trade a must [[2]].',
        blanks: [['early'], ['quietly', 'silently']],
        distractors: ['late', 'loudly'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s new rule.',
        tiles: ['No', 'quiet', 'trade-offs.'],
        distractors: ['loud'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever quietly dropped part of a task to hit a deadline? What would saying it early, with options, have sounded like?',
    starters: ['I dropped...', 'I could have said: "..."'],
  },
  deepen: {
    title: 'Next: Day 20',
    summary: 'The team is in a rhythm. Then Mr Rao calls, which he never does: "My cousin\'s shop has a loyalty programme. We need one for Diwali." Ten days left. Chapter 4: The client changes everything.',
  },
  notes: 'Chapter 3 challenge. Making scope/quality/time trade-offs explicit; leader reactions shaping norms (psychological safety); MoSCoW re-planning. Fictional events.',
};

export default lesson;
