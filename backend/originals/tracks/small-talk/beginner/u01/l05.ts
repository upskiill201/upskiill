import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: twelve floors in the lift with Kinwell's CEO. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the lift',
  summary: 'Thursday, 8:30. The lift doors close. Inside: Grace and Kinwell\'s CEO, Sam. Twelve floors. Grace has never spoken to a CEO in her life, unless you count patients.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Open a conversation with someone senior using what you\'ve learned', 'Remember what small talk is for, and why it usually goes better than expected'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 8:30 a.m., the lift',
      beats: [
        { speaker: 'narrator', text: 'The lift doors start to close. A hand stops them. In steps Sam Whitfield, Kinwell\'s chief executive, with a bike helmet under one arm and rain dripping off his jacket.' },
        { speaker: 'narrator', text: 'Twelve floors. Grace feels Nurse Mode rising: "And how are we feeling today?" is right there on her tongue.' },
        { speaker: 'grace', text: '(Notice. Ask. Warm, not clever. Do NOT ask about his pain levels.)' },
        { speaker: 'tey', text: "Everything from this week, in a lift, with the boss of the boss. Let's see how Grace does, with your help." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1. Twelve floors with the CEO.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Sam is dripping wet with a bike helmet. Best "notice + ask" opener?',
        options: [
          { text: '"Did you cycle in this? How far do you come from?"' },
          { text: '"And how are we feeling today?"', why: 'Nurse Mode. Resist.' },
          { text: '"Hi." (then silence for eleven floors)', why: 'A start, but give him something to answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Grace\'s inner voice) He\'s the CEO. He won\'t want to chat to a new junior researcher.',
        prompt: 'What does the research say to Grace\'s inner voice?',
        options: [
          { text: 'Correct: senior people never talk in lifts.', why: 'That\'s the prediction the research says is usually wrong.' },
          { text: 'Pretend to look at your phone.', why: 'That guarantees the silent version.' },
          { text: 'People usually underestimate how open others are to a chat. Try it.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good lift opener, or not?',
        groups: ['Good opener', 'Not great'],
        items: [
          { text: 'How far do you cycle in?', group: 0 },
          { text: 'You look soaked and exhausted.', group: 1 },
          { text: 'I\'m Grace, I started on Monday in UX research.', group: 0 },
          { text: 'How much do CEOs earn?', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Malinowski\'s name for talk that bonds rather than informs: phatic ... (one word)',
        answers: ['communion'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Grace\'s voice comes out wobbly and she says "how are we feeling" by accident. Best recovery?',
        options: [
          { text: 'Pretend it didn\'t happen', why: 'It happened. He heard.' },
          { text: 'Get out at the next floor', why: 'It\'s not her floor.' },
          { text: 'Laugh: "Sorry, eighteen years of nursing. I\'m Grace, I started Monday."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea from this week.',
        pairs: [
          ['Nurse Mode', 'What you do when nervous'],
          ['Notice + ask', 'The all-purpose opener'],
          ['Weak ties', 'Acquaintances who brighten your day'],
          ['The bridge', 'Small talk leads to bigger talk'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s lift plan. Which line will backfire?',
        lines: [
          'Smile and say good morning.',
          'Notice the rain and the helmet; ask about the cycle.',
          'Ask him if the company is in financial trouble.',
        ],
        bug: 2,
        fix: 'Mention I started on Monday and I\'m enjoying it.',
        explanation: 'A lift chat with the CEO is for warmth, not for difficult questions.',
      },
      {
        kind: 'mcq',
        prompt: 'Which question keeps the lift conversation going best?',
        options: [
          { text: '"Do you cycle?"', why: 'He\'s holding a helmet. A yes/no about the obvious.' },
          { text: '"What made you start cycling to work?"' },
          { text: '"Cycling is dangerous, isn\'t it?"', why: 'Leads him to agree or argue. An open question invites a story.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s lift line.',
        template: 'Morning! Did you [[1]] in this rain? How [[2]] do you come from?',
        blanks: [['cycle', 'bike', 'ride'], ['far']],
        distractors: ['feel', 'old'],
      },
      {
        kind: 'mcq',
        prompt: 'Floor 12. The doors open. How does Grace leave?',
        options: [
          { text: '"Lovely to meet you. Dry off!"' },
          { text: 'Walk out without a word', why: 'A short goodbye is warmer.' },
          { text: '"Any pain at all before you go?"', why: 'So close.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s introduction in the lift.',
        tiles: ['I\'m', 'Grace,', 'I', 'started', 'Monday', 'in', 'UX', 'research.'],
        distractors: ['pain', 'feeling'],
      },
    ],
  },
  reflect: {
    prompt: 'Who is the most senior person you might find yourself next to in a lift, queue or corridor? Write the "notice + ask" opener you\'d use.',
    starters: ['The person is...', 'I\'d say...'],
  },
  deepen: {
    title: 'The lift rule',
    summary: 'For one week, whenever you share a lift, queue or waiting room with someone, try one friendly line. Most people are glad you did, and the ones who aren\'t will simply smile and look away.',
  },
  notes: 'Review of lessons 1–4. Sam Whitfield (Kinwell CEO) is a named extra, narrated only.',
};

export default lesson;
