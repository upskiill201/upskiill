import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: "make it do everything", and the 14-file mess. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Make it do everything',
  summary: 'Seven weeks to go. Fired up after her first page, Hazel types: "Build an app that does everything for the band." It makes 14 files, a shop, a calendar and a chat. None of it is what the band needs.',
  minutes: 12,
  outcomes: [
    'Explain why "do everything" prompts fail',
    'Start from the one problem that matters most',
    'Ask Ruth\'s three questions before building',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 10 p.m.',
      beats: [
        { speaker: 'hazel', text: 'Build an app that does everything for the band.' },
        { speaker: 'narrator', text: 'It works for six minutes. Fourteen files appear: a merch shop, a rehearsal calendar, a chat room, a login page, a "fan wall". Hazel opens one. She can\'t follow any of it.' },
        { speaker: 'narrator', text: 'At practice on Monday, she shows Ruth.' },
        { speaker: 'ruth', text: 'Three questions. What\'s it for? Who uses it? And how will you know it\'s done?' },
        { speaker: 'hazel', text: 'It\'s for... the band. Everyone uses it. It\'s done when it does everything?' },
        { speaker: 'ruth', text: 'That\'s not an app. That\'s a wish.' },
        { speaker: 'tey', text: 'Ouch, but fair. The AI did exactly what she asked: everything, badly. The fix isn\'t a better AI. It\'s a smaller, clearer ask.' },
      ],
      choice: {
        prompt: 'What should Hazel build first?',
        options: [
          { text: 'The whole thing again, but "properly" this time.', outcome: 'Another 14 files. "Properly" isn\'t a plan.' },
          { text: 'The one thing hurting most right now: knowing how much money the band has raised.', outcome: 'Ruth nods. "Pledges are the thing we lost in the rain. Start there."', best: true },
          { text: 'The fan wall, because Benny wants it.', outcome: 'Benny is thrilled. The bus is still unpaid.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ruth\'s three questions, before every build: What\'s it for? Who uses it? How will I know it\'s done?',
    },
  ],
  apply: {
    scenario: 'Monday practice: Ruth\'s three questions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "build an app that does everything" go wrong?',
        options: [
          { text: 'The AI is broken', why: 'It did exactly what it was told.' },
          { text: 'The ask had no clear purpose, user or finish line, so it guessed everything' },
          { text: 'Hazel\'s laptop is too old', why: 'The laptop was fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Ruth\'s question to Hazel\'s better answer.',
        pairs: [
          ['What\'s it for?', 'Tracking pledges toward $18,000'],
          ['Who uses it?', 'Ruth, entering each pledge'],
          ['How will I know it\'s done?', 'The total is right and shows on one page'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Build now, or later?',
        groups: ['Now', 'Later'],
        items: [
          { text: 'A pledge total toward $18,000', group: 0 },
          { text: 'A merch shop', group: 1 },
          { text: 'A fan wall', group: 1 },
          { text: 'Showing how far there is to go', group: 0 },
          { text: 'A chat room', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'But the fan wall would be SO cool.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'You\'re right, fan wall first.', why: 'Cool doesn\'t pay for the bus.' },
          { text: 'It would. It goes on the "later" list. Pledges first, because that\'s what gets us to D.C.' },
          { text: 'No more ideas, Benny.', why: 'Ideas are good. They go on a list.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s rule.',
        template: '"Does everything" isn\'t an app, it\'s a [[1]]. Start with the one [[2]] that hurts most.',
        blanks: [['wish'], ['problem', 'thing']],
        distractors: ['plan', 'feature'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Hazel\'s new plan is still too big?',
        lines: [
          'Goal: show how much we\'ve raised toward $18,000.',
          'User: Ruth enters each pledge.',
          'Also add a shop, a calendar and a chat.',
          'Done when the total is right.',
        ],
        bug: 2,
        fix: 'Move those to a "later" list.',
        explanation: 'Each extra feature is its own project. Adding them now brings back the 14-file mess.',
      },
      {
        kind: 'mcq',
        prompt: 'Hazel opens one of the 14 files and can\'t follow it. What does that tell her?',
        options: [
          { text: 'She\'s not smart enough', why: 'Nobody could check 14 surprise files at once.' },
          { text: 'Code is impossible to read', why: 'Small pieces are readable. Huge surprises aren\'t.' },
          { text: 'The change was too big to check, so it should be smaller' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ruth\'s first question, in three words: "What\'s it...?"',
        answers: ['for', 'what\'s it for', 'whats it for', 'what is it for'],
        placeholder: 'What\'s it ...',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Hazel\'s one-line goal.',
        tiles: ['A page that shows', 'how much we\'ve raised', 'toward $18,000'],
        distractors: ['and everything else', 'for everyone'],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'So what are you building this week?',
        prompt: 'Hazel\'s best answer?',
        options: [
          { text: 'One page where you type each pledge and see the total toward $18,000. That\'s it.' },
          { text: 'The whole band app.', why: 'That\'s the wish again.' },
          { text: 'Whatever the AI thinks is best.', why: 'Hazel decides what to build.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your "real" project idea from Chapter 1. Answer Ruth\'s three questions for it. What\'s the one smallest piece you\'d build first?',
    starters: ['It\'s for...', 'Who uses it:', 'It\'s done when...', 'First piece:'],
  },
  deepen: {
    title: 'Your later list',
    summary: 'Make a file or note called later.md. Put every "cool idea" for your project there. Building only the first piece is easier when the rest is safely written down.',
  },
  notes: 'Story only; no tool facts.',
};

export default lesson;
