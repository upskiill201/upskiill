import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Kofi's call. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Kofi\'s call',
  summary: 'Kofi, now at university in Accra, video-calls Clinton. The summer before university, he built a website for his beats from nothing, and a gig organiser booked him from it. He has questions for Clinton, and a few tests.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain why proof beats claims', 'Tell a tutorial project from a real one', 'Pick and shrink a problem worth solving'],
  learn: [
    {
      kind: 'story',
      title: 'The beat maker',
      beats: [
        { speaker: 'narrator', text: 'Saturday. Kofi calls from Accra, headphones round his neck. He\'s in his third year of Biomedical Engineering now.' },
        { speaker: 'kofi', text: 'Bro, I heard you\'re building a portfolio! I did that by accident. I built a website for my beats, Mensah Beats, because a gig organiser asked for one. She booked me from it.' },
        { speaker: 'clinton', text: 'You had no experience either?' },
        { speaker: 'kofi', text: 'Zero. I had a phone and a problem. That\'s literally it. Okay, quiz time. Miracle told me to test you.' },
        { speaker: 'tey', text: 'Kofi knows exactly how this works. Let\'s see if the first week of this chapter stuck.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: Kofi\'s quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Kofi\'s website work better than saying "I make beats"?',
        options: [
          { text: 'It was proof: the organiser could see and hear his work' },
          { text: 'It was expensive', why: 'He built it himself, for free. It worked because it was proof.' },
          { text: 'It had lots of adjectives', why: 'The opposite. It showed, it didn\'t claim.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Tutorial practice or real project?',
        groups: ['Tutorial practice', 'Real project'],
        items: [
          { text: 'Kofi\'s Mensah Beats website', group: 1 },
          { text: 'A to-do app from a video', group: 0 },
          { text: 'Clinton\'s njangi tracker', group: 1 },
          { text: 'A calculator copied step by step', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s problem-finding steps in order.',
        lines: ['Listen for complaints', 'Check it happens again and again', 'Check you can help', 'Shrink it'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'What three things make a project "real"?',
        options: [
          { text: 'A real problem, real users, and a result.' },
          { text: 'Lots of code, lots of features, lots of time.', why: 'Size isn\'t what makes it real.' },
          { text: 'A famous client.', why: 'No famous client needed. Mum\'s njangi counts.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each career to a portfolio piece.',
        pairs: [
          ['Music', 'A website where people hear your beats'],
          ['Marketing', 'A social plan for a local shop'],
          ['Writing', 'Three short articles'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the idea that still needs shrinking.',
        lines: ['A page that shows who paid this month.', 'A platform for every savings group in Africa.', 'A monthly reminder for the treasurer.'],
        bug: 1,
        explanation: 'Too big to finish as a first project. Start with one group.',
      },
      {
        kind: 'mcq',
        prompt: 'Which is true about portfolios?',
        options: [
          { text: 'Only artists need them', why: 'Almost every career has a version.' },
          { text: 'Twenty weak pieces beat three good ones', why: 'The opposite. Recruiters look at one or two.' },
          { text: 'Three good pieces beat twenty weak ones' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Brenda\'s line.',
        template: 'Don\'t tell me you can build things. [[1]] me something you [[2]].',
        blanks: [['Show'], ['built']],
        distractors: ['Tell', 'bought', 'want'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi built a website for his beats. What was his music name? (two words)',
        answers: ['mensah beats', 'mensahbeats'],
        placeholder: 'Two words',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first problem or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Happens every week and annoys several people', group: 0 },
          { text: 'Happened once, two years ago', group: 1 },
          { text: 'People you can ask will use the fix', group: 0 },
          { text: 'Needs a million users before it works', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Last one. When will your njangi tracker be "done"?',
        options: [
          { text: 'When it does one job well: Mum\'s twelve members can see who paid and who\'s next.' },
          { text: 'When it has every feature I can think of.', why: 'Then it\'s never done. Finish the smallest useful version.' },
          { text: 'Never, I\'ll keep adding things forever.', why: 'Ship the small version first, then grow it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Kofi had "a phone and a problem". What do you have, right now, that you could start a portfolio piece with?',
    starters: ['I have...', 'I could start with...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your project idea in Kofi\'s words: "I had ___ and a problem: ___." If you can fill both blanks, you\'re ready to start.',
  },
  notes: 'Checkpoint 1 of Chapter 2 = reviews l01–l04. Kofi (shared cast) built Mensah Beats in HTML & CSS for Beginners ("Kofi Goes Live"), the summer before university; here he\'s in his third year (Biomedical Engineering, Accra), consistent with lives moving forward. If HTML & CSS is not yet published when this course launches, the reference still stands alone.',
};

export default lesson;
