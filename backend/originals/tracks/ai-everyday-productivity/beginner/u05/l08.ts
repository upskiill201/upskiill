import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Reading: your everyday AI routine. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Your everyday AI routine',
  summary: 'Day 29, the night before the party. The São Paulo call went well. Lucía writes Marta a note: how to actually use AI every day, after one impossible month. Read it.',
  minutes: 13,
  outcomes: [
    'Build a simple daily AI routine',
    'Remember the three rules: you edit, you check, you protect',
    'Know which prompt card to reach for',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Lucía\'s note to Marta',
      html: '<p>Marta, you asked how I\'d use AI if I were starting again. Here\'s everything I learned this month, on one page.</p><h3>Three rules</h3><ol><li><strong>I\'m the editor.</strong> AI drafts, compares, quizzes and plans. I decide what\'s true, what sounds like me and what happens.</li><li><strong>I check what matters.</strong> Numbers, dates, names, rules, prices: source, date, second source, calculator. Ideas and drafts need no checking; decisions do.</li><li><strong>I protect what\'s private.</strong> No passwords, ID numbers, bank details or other people\'s information. Placeholders instead.</li></ol><h3>My everyday routine</h3><ul><li><strong>Morning (5 minutes):</strong> "Here\'s my day [tasks, meetings]. What should I do first, and what can wait?" Then I decide.</li><li><strong>Writing:</strong> my messy draft first, then "edit, don\'t rewrite, keep my words".</li><li><strong>Research and choices:</strong> my criteria, a table, "unknown, don\'t guess", then I check the unknowns.</li><li><strong>Learning:</strong> "Be my tutor, don\'t give me answers", 20 minutes on the metro.</li><li><strong>Problems:</strong> one sentence, fixed and flexible, five options, a first step, a Plan B.</li></ul><h3>When I don\'t use it</h3><p>Emergencies. My health and medicine. Big legal or money calls without a professional. Decisions about people I love. And anything I can\'t check that really matters.</p><blockquote>AI made me faster. Checking made me right. Deciding made it mine.</blockquote><h3>Start small</h3><p>Pick one thing you do every week and use AI on it for a month. Save the prompt that works as a card. Then add another. That\'s how I ended up with a deck instead of a disaster.</p><p>See you in Oaxaca. Bring tissues for the speech. L.</p>',
    },
    {
      kind: 'check',
      question: 'Which of Lucía\'s three rules is about passwords and ID numbers?',
      options: ['I\'m the editor', 'I check what matters', 'I protect what\'s private'],
      answer: 2,
      explanation: 'Placeholders instead of private details, every time.',
    },
  ],
  apply: {
    scenario: 'Lucía\'s routine.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to what it means.',
        pairs: [
          ['I\'m the editor', 'I decide what\'s true and what gets used'],
          ['I check what matters', 'Source, date, second source, calculator'],
          ['I protect what\'s private', 'Placeholders, not passwords'],
          ['Start small', 'One weekly task, one card'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Lucía\'s 5-minute morning prompt for?',
        options: [
          { text: 'Deciding what to do first and what can wait' },
          { text: 'Writing all her emails', why: 'That\'s later, with her own drafts.' },
          { text: 'Checking the news', why: 'It\'s about her own day.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the routine fits?',
        groups: ['Writing', 'Problems'],
        items: [
          { text: 'My messy draft first', group: 0 },
          { text: 'Fixed and flexible', group: 1 },
          { text: 'Edit, don\'t rewrite', group: 0 },
          { text: 'A first step and a Plan B', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Where do I start? It\'s a lot.',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Use AI for everything from tomorrow.', why: 'Too much at once.' },
          { text: 'One thing you do every week. Use AI on it for a month and save the prompt that works.' },
          { text: 'Read the whole internet about prompting first.', why: 'Doing beats reading.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s line.',
        template: 'AI made me [[1]]. Checking made me [[2]]. Deciding made it mine.',
        blanks: [['faster'], ['right']],
        distractors: ['lazier', 'famous'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong in Lucía\'s routine?',
        lines: [
          'Learning: "be my tutor, don\'t give me answers".',
          'Research: paste friends\' phone numbers for better results.',
          'Problems: one sentence, fixed and flexible.',
        ],
        bug: 1,
        fix: 'Use placeholders, never other people\'s details.',
        explanation: 'It breaks rule 3, and better results never need private details.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which morning prompt fits the routine?',
        options: [
          { text: 'Plan my life.', why: 'Too big, no details.' },
          { text: 'Here\'s today: a 10 a.m. call, 3 emails to answer, pack for Oaxaca, buy a gift. What should I do first, and what can wait?' },
          { text: 'Do my tasks for me.', why: 'It can\'t, and she decides.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Lucía\'s morning AI routine? (A number.)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to start your own routine.',
        lines: ['Pick one weekly task', 'Use AI on it for a month', 'Save the prompt that works', 'Add a second task', 'Keep checking what matters'],
      },
      {
        kind: 'mcq',
        prompt: 'Which one does NOT go on Lucía\'s "don\'t use it" list?',
        options: [
          { text: 'Emergencies', why: 'That\'s on the list.' },
          { text: 'Her grandmother\'s medicine', why: 'That\'s on the list.' },
          { text: 'Drafting a thank-you message from her own notes' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own three rules and one weekly task you\'ll start with.',
    starters: ['My rules:...', 'I\'ll start with...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Tomorrow morning, try the 5-minute prompt: "Here\'s my day [tasks]. What should I do first, and what can wait?" Then decide yourself.',
  },
  notes: 'Summary lesson; no new facts.',
};

export default lesson;
