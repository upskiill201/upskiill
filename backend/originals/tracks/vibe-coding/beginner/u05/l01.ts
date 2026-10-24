import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: a page can't remember. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'A page can\'t remember',
  summary: 'Four weeks to go, eleven gigs booked. Thirty parents need to sign up to drive, carry drums and sell pralines, from their phones. Hazel sends the thermometer link. Every parent sees an empty list.',
  minutes: 12,
  outcomes: [
    'Explain why a page saved "in the browser" can\'t be shared',
    'Know what a database and a login add',
    'Decide what the real app must do first',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, the parents\' group chat',
      beats: [
        { speaker: 'narrator', text: 'Hazel adds a gig sign-up list to her site, saved in the browser like the pledges, and sends the link to the parents\' group chat.' },
        { speaker: 'narrator', text: 'Mrs Castillo signs up to drive on Saturday. So does Mr Nguyen. So does Marcus\'s grandma, Ruth. Each one sees only their own name.' },
        { speaker: 'benny', text: 'Miss B, my mom says she\'s the only driver. Ruth says she is too. And Mr Nguyen.' },
        { speaker: 'tey', text: '"Saved in the browser" means saved on that one phone or laptop. Mrs Castillo\'s sign-up lives on Mrs Castillo\'s phone. Nobody else can see it.' },
        { speaker: 'hazel', text: 'So I need... one list, somewhere, that everyone shares.' },
        { speaker: 'tey', text: 'That\'s a database. And if anyone can write to it, you\'ll want to know who\'s who: that\'s a login. Welcome to building a real app.' },
      ],
      choice: {
        prompt: 'What should the real app do first?',
        options: [
          { text: 'Everything: sign-ups, pledges, chat, photos, a shop.', outcome: 'Ruth just holds up a sticky note: "Too Many Ideas, Chapter 2."' },
          { text: 'One shared list of gigs that parents can sign up for, from any phone.', outcome: 'Ruth nods. "That\'s the problem on fire. Pledges can move over after."', best: true },
          { text: 'A login page, and nothing else yet.', outcome: 'A login to... an empty app. Parents log in and see nothing to do.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Thirty parents, thirty separate lists.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did every parent see only their own name?',
        options: [
          { text: 'Their phones are broken', why: 'The phones were fine.' },
          { text: 'Sign-ups were saved on each phone, not in one shared place' },
          { text: 'Hazel typed the link wrong', why: 'The link worked. The saving didn\'t share.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the piece to what it does.',
        pairs: [
          ['Database', 'One shared list everyone reads and writes'],
          ['Login', 'Knows who each person is'],
          ['Saved in the browser', 'Lives on one device only'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a shared database, or fine in the browser?',
        groups: ['Shared database', 'Browser is fine'],
        items: [
          { text: 'Gig sign-ups from thirty parents', group: 0 },
          { text: 'Remembering dark mode on your own phone', group: 1 },
          { text: 'Pledges entered by Ruth and Hazel on different laptops', group: 0 },
          { text: 'A personal to-do list on one laptop', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Can\'t we just put all the sign-ups in the group chat?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Sure, chats are perfect lists.', why: 'That\'s the clipboard problem, with emojis.' },
          { text: 'No more group chats ever.', why: 'Chats are fine for talking, not for lists.' },
          { text: 'That\'s the clipboard again: lost, messy, double-booked. One shared list is the whole point.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s summary.',
        template: 'One shared list is a [[1]]. Knowing who\'s who is a [[2]].',
        blanks: [['database'], ['login']],
        distractors: ['browser', 'clipboard'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Hazel\'s plan is in the wrong order?',
        lines: [
          'First: one shared list of gigs and sign-ups.',
          'Then: logins, so we know who signed up.',
          'First of all: a merch shop.',
        ],
        bug: 2,
        fix: 'Move the shop to the later list.',
        explanation: 'The problem on fire is sign-ups. The shop can wait.',
      },
      {
        kind: 'mcq',
        prompt: 'Three people signed up to drive the same Saturday. What does the real app need to show?',
        options: [
          { text: 'Everyone\'s sign-ups, so parents see the car seats are already covered' },
          { text: 'Nothing, just a thank-you', why: 'Then double-bookings carry on.' },
          { text: 'Only your own sign-up', why: 'That\'s the bug.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word: the place an app keeps shared data.',
        answers: ['database', 'a database'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: before starting the real app, what should Hazel do with her current site?',
        options: [
          { text: 'Delete it to start fresh', why: 'Keep it, safely.' },
          { text: 'Commit and push it, so the working version is safe' },
          { text: 'Nothing', why: 'A big new build is exactly when to commit first.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Real apps have real people\'s phone numbers in them. You understand what that means?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'It means I have to keep them safe. We\'ll check who can see what before anyone uses it.' },
          { text: 'It means nothing, it\'s just a band.', why: 'Parents\' details matter whatever the size.' },
          { text: 'I\'ll let the AI worry about that.', why: 'Hazel is responsible. Chapter 7 is all about it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your "real" project idea from Chapter 1. What data has to be shared between people? Does it need a login?',
    starters: ['Shared data:', 'Login needed because...'],
  },
  deepen: {
    title: 'Brief your real app',
    summary: 'Write a brief.md for your real app\'s FIRST piece only: what shared list it keeps, who uses it, limits, and a done-when like "two people on different phones see each other\'s entry".',
  },
  notes: 'localStorage is per browser/device. Story only.',
};

export default lesson;
