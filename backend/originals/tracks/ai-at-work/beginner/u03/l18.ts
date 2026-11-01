import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 18 — catching up after time off: triage, decisions made without you, and not re-opening settled things. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Catch up after time off',
  summary: '140 emails and five busy channels. Find what needs you, learn what changed, and leave the rest.',
  minutes: 13,
  outcomes: [
    'Triage a backlog into: needs me, changed, FYI',
    'Catch up on decisions made while you were away',
    'Avoid re-opening things that are already settled',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday after the holiday',
      beats: [
        { speaker: 'narrator', text: 'Ada is back from a week in Accra with her family. 140 unread emails. Five chat channels full of red dots.' },
        { speaker: 'ada', text: "Do I just... start at the top? That's my whole morning gone." },
        { speaker: 'tey', text: "Don't read 140 messages in order. Triage first: what needs you, what changed, and what is just FYI." },
        { speaker: 'narrator', text: 'Ada pastes the email subjects and senders (no bodies yet) and asks the AI to sort them into those three groups, flagging anything with a deadline this week.' },
        { speaker: 'narrator', text: 'Twelve need her. Four decisions changed while she was away. The other 124 are FYI.' },
      ],
      choice: {
        prompt: "One thread: the team chose a new icon style while she was away. Ada preferred the old one. What should she do?",
        options: [
          {
            text: 'Read why they decided, accept it, and only raise it if something important was missed.',
            outcome: 'The reasoning was solid: the new icons test better on small screens. Ada adapts in ten minutes and the team is glad she is back.',
            best: true,
          },
          {
            text: 'Reply-all to re-open the decision.',
            outcome: 'A settled discussion restarts. The team loses a day, and Ada starts her first week back on the wrong foot.',
          },
          {
            text: 'Ignore it and keep using the old icons.',
            outcome: 'Her designs no longer match everyone else\'s. Someone has to redo them on Thursday.',
          },
        ],
      },
    },
    {
      kind: 'reading',
      title: 'The catch-up routine',
      html:
        '<ol>' +
        '<li><strong>Triage the list, not the messages.</strong> Paste subjects and senders. Ask the AI to sort them into <em>needs me</em> (with deadlines), <em>decisions or changes</em>, and <em>FYI</em>.</li>' +
        '<li><strong>Read "needs me" properly.</strong> These are the only ones you must answer today.</li>' +
        '<li><strong>Summarise the changes.</strong> For each long thread about a decision: <em>"What was decided, why, and does it affect my work?"</em></li>' +
        '<li><strong>Ask a human for 10 minutes.</strong> "What happened while I was away that I should know?" catches what never made it into writing.</li>' +
        '<li><strong>Don\'t re-open settled decisions</strong> unless something important was missed. Ask why before you disagree.</li>' +
        '</ol>' +
        '<p>Check your company rules before pasting full emails into an AI tool. Subjects and senders are often enough for triage.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before you leave: an out-of-office that says who to contact saves you half the backlog.',
    },
    {
      kind: 'check',
      question: 'What should Ada paste into the AI for the first triage?',
      options: ['All 140 full emails', 'Subjects and senders', 'Nothing; read in order'],
      answer: 1,
    },
  ],
  apply: {
    scenario: "It's Ada's first morning back.",
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the catch-up routine.',
        lines: ['Triage subjects into needs me / changed / FYI', 'Read the "needs me" ones properly', 'Summarise the decisions made', 'Ask a colleague for 10 minutes'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs Ada, changed, or FYI?',
        groups: ['Needs me', 'Changed', 'FYI'],
        items: [
          { text: 'Lucía: approve the banner by Wednesday', group: 0 },
          { text: 'Team picked a new icon style', group: 1 },
          { text: 'Company newsletter', group: 2 },
          { text: 'Launch moved to the 18th', group: 1 },
          { text: 'Grace: can you review my file before Tuesday?', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why triage the list instead of reading in order?',
        options: [
          { text: 'Most messages are FYI; triage finds the few that need you fast' },
          { text: 'Reading in order is rude', why: 'It is about time, not manners.' },
          { text: 'AI tools require it', why: 'It is a habit, not a rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the decision catch-up question.',
        tiles: ['What', 'was', 'decided,', 'why,', 'and', 'does', 'it', 'affect', 'me?'],
        distractors: ['who', 'cares'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Welcome back! While you were away we went with the bolder banner. Hope that's OK!",
        prompt: 'Which reply is best?',
        options: [
          { text: 'I would have chosen the other one.', why: 'Re-opens a settled decision with no new reason.' },
          { text: '(No reply)', why: 'A short acknowledgement keeps things smooth.' },
          { text: "Thanks! I've read why, and it makes sense on small screens. I'll build on it from today." },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s triage request.',
        template: 'Sort these email subjects into: needs [[1]] (with deadlines), decisions or [[2]], and [[3]].',
        blanks: [['me'], ['changes'], ['FYI']],
        distractors: ['nobody', 'jokes', 'spam'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the habit that will slow the team down.',
        lines: ['Triage before reading.', 'Answer the "needs me" items first.', 'Reply-all to every decision made while away to share my opinion.', 'Ask a colleague what I missed.'],
        bug: 2,
        fix: 'Ask why first; raise it only if something important was missed.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before leaving, set an out-of-... message (one word)',
        answers: ['office'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request summarises a long decision thread best?',
        options: [
          { text: 'Summarise this thread.', why: 'A gist, not what matters to Ada.' },
          { text: 'From this thread: what was decided, why, who decided, and does it affect a designer working on sign-up?' },
          { text: 'Who was wrong in this thread?', why: 'Not useful, and not kind.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what it catches.',
        pairs: [
          ['Triage', 'The few that need you'],
          ['Decision summaries', 'What changed'],
          ['Ask a colleague', 'What never got written down'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Re-open the decision, or accept it?',
        groups: ['Raise it', 'Accept it'],
        items: [
          { text: 'They missed a legal requirement you know about', group: 0 },
          { text: 'You just preferred the old option', group: 1 },
          { text: 'It breaks something only you know about', group: 0 },
          { text: 'You would have worded it differently', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I'm off next week. Any tips so I don't drown when I'm back?",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Check email every day on holiday.', why: 'Not much of a holiday.' },
          { text: "Set an out-of-office that names who to contact, and when you're back, triage subjects first instead of reading in order." },
          { text: 'Delete everything when you return.', why: 'You would miss what needs you.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Messages that only inform you are ... (three letters)',
        answers: ['fyi'],
        placeholder: 'Three letters',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the backlog item to the first move.',
        pairs: [
          ['Deadline this week', 'Read and answer today'],
          ['Decision made without you', 'Read why, then adapt'],
          ['Newsletter', 'Skim later or skip'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why paste only subjects and senders for the first triage?',
        options: [
          { text: 'It is usually enough to sort them, and shares less private content' },
          { text: 'AI cannot read email bodies', why: 'It can; you just need less for triage.' },
          { text: 'To make it slower', why: 'It is faster and safer.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually catch up after time away? What would you change using this routine?',
    starters: ['Usually I...', 'Next time I will...'],
  },
  deepen: { title: 'Before your next time off', summary: 'Write your out-of-office now: who to contact for what, and when you are back.' },
  notes: 'Message counts are story details. Privacy caution consistent with Unit 10.',
};

export default lesson;
