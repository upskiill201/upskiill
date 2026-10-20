import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Miracle's online check. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Miracle\'s online check',
  summary: 'Miracle does to Clinton what she does to every candidate: she looks him up, reads his titles, checks his posts and messages him as a stranger. Honest titles, scam safety, posting and connecting, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Keep titles honest', 'Spot scams and protect your details', 'Post and connect professionally'],
  learn: [
    {
      kind: 'story',
      title: 'The stranger test',
      beats: [
        { speaker: 'narrator', text: 'Thursday. Miracle messages Clinton: "I\'m going to check you like I\'d check a stranger. Titles, posts, safety, how you reply to people. Ready?"' },
        { speaker: 'clinton', text: 'Ready. I think. Is this going to hurt?' },
        { speaker: 'miracle', text: 'Only if you wrote "CEO" anywhere.' },
        { speaker: 'tey', text: 'Let\'s see if Clinton passes the stranger test.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: the stranger test.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Miracle finds one title Clinton missed. Tap it.',
        lines: ['Founder and organiser, CS Tech Meet-up (40 members)', 'Weekend assistant, phone-repair stall', 'Chief Technology Officer, Mum\'s Njangi'],
        bug: 2,
        fix: 'Volunteer developer, savings-group tracker',
        explanation: 'A 12-member family savings group doesn\'t have a CTO. Say what he did.',
      },
      {
        kind: 'mcq',
        prompt: 'A message offers "a remote job, no interview, just pay a registration fee". What is it?',
        options: [
          { text: 'Almost certainly a scam' },
          { text: 'A lucky break', why: 'Paying to work and no interview are red flags.' },
          { text: 'Normal for remote jobs', why: 'Real employers don\'t charge you.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good post or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'What he built, what he learned, a question', group: 0 },
          { text: '"Hire me, I\'m the best"', group: 1 },
          { text: 'Thanks to meet-up speakers, with a photo', group: 0 },
          { text: 'A rant about a company that rejected him', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: '(as a stranger) Hi! I saw your tracker post. Could you send me your bank details so I can pay you to build one?',
        options: [
          { text: 'Thanks for your interest! I\'d be happy to talk about it on a call first. I don\'t share bank details over messages.' },
          { text: 'Sure, here are my bank details and a one-time code.', why: 'Never share these with someone unverified.' },
          { text: 'Go away.', why: 'Polite and safe beats rude, in case it\'s real.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the post formula in order.',
        lines: ['The problem', 'What you did', 'What you learned', 'A question or thanks'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the right move.',
        pairs: [
          ['Asked to pay a fee', 'Walk away and report'],
          ['Want to connect with a speaker', 'Send a request with a short note'],
          ['Inflated title', 'Rewrite it as what you really did'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which connection note would Miracle accept from a stranger?',
        options: [
          { text: '"Hi Miracle, I read your post on hiring graduates at Afiya. I\'m a CS student in Buea and found it really useful. I\'d love to stay in touch."' },
          { text: '"Add me."', why: 'No reason given.' },
          { text: '"Get me a job at Afiya."', why: 'Too big an ask in a first message.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to share with a new online contact, or not?',
        groups: ['Safe', 'Not safe'],
        items: [
          { text: 'Portfolio link', group: 0 },
          { text: 'One-time code', group: 1 },
          { text: 'Professional email', group: 0 },
          { text: 'ID card photo', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s honest title.',
        template: '[[1]] and organiser, CS Tech Meet-up ([[2]] members)',
        blanks: [['Founder'], ['40', 'forty']],
        distractors: ['CEO', '4,000', 'Chief'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A connection request is a ___, not an application. (one word)',
        answers: ['hello', 'greeting'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Result: passed. Except one thing: you posted a joke about your lecturer last year. Thoughts?',
        options: [
          { text: 'I\'ll delete it. If I\'d be embarrassed for Brenda to read it, it shouldn\'t be there.' },
          { text: 'It was funny, it stays.', why: 'Funny to friends, risky to recruiters.' },
          { text: 'Nobody looks that far back.', why: 'Miracle just did.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If a recruiter checked you like a stranger today, what would they find? Is there anything you\'d remove?',
    starters: ['They\'d find...', 'I\'d remove...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Scroll back through your public posts and comments for the last two years. Remove anything you\'d be embarrassed for a recruiter to read.',
  },
  notes: 'Checkpoint 3 of Chapter 5 reviews l11–l14. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
