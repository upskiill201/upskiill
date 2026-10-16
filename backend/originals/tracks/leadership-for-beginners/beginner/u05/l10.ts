import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Final Challenge: launch day and the 90-day review with Carmen. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: the 90-day review',
  summary: 'Day 90. Carmen\'s office. The printed note is on her desk. "Before we start," she says, "Marta came to see me yesterday." Lucía\'s stomach drops. Ninety days of leading, in one last conversation.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every tool from the course in one final conversation',
    'Look back on 90 days honestly',
    'Leave with a plan for the next 90',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 90, Carmen\'s office',
      beats: [
        { speaker: 'carmen', text: 'Before we start: Marta came to see me yesterday.' },
        { speaker: 'narrator', text: 'Lucía\'s mind races. The promotion. The coffee on Day 1. The 9 p.m. nights. Did Marta ask to move teams?' },
        { speaker: 'carmen', text: 'She said, and I wrote it down: "I was angry for a week. Now I wouldn\'t want anyone else leading us." So. Let\'s talk about the next 90 days.' },
        { speaker: 'narrator', text: 'Lucía sits very still for a second. Then she opens her notebook. One last time, you\'re with Lucía.' },
      ],
    },
  ],
  apply: {
    scenario: 'Day 90, Carmen\'s office.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Carmen asks: "What are you proudest of?" Lucía\'s best answer?',
        options: [
          { text: '"That the team speaks up now. Sofía\'s map, Tomás\'s test sends, Diego\'s shop idea. They all came from them."' },
          { text: '"Saving the launch."', why: 'The hero story. The team saved it.' },
          { text: '"Honestly, nothing. I made loads of mistakes."', why: 'Owning mistakes is good. Hiding real wins isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter taught it?',
        groups: ['Chapters 1 and 2', 'Chapter 3', 'Chapters 4 and 5'],
        items: [
          { text: 'Leading your friend', group: 0 },
          { text: 'Clear goals beat "do your best"', group: 1 },
          { text: 'SBI feedback', group: 2 },
          { text: 'Psychological safety', group: 0 },
          { text: 'Two-way doors', group: 1 },
          { text: 'Managing up', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'What\'s one thing you\'d do differently if you started again?',
        prompt: 'Lucía\'s best answer?',
        options: [
          { text: 'Nothing, it went perfectly.', why: 'Nobody believes that, and it closes the conversation.' },
          { text: 'Not take the job.', why: 'Way too far, and not true.' },
          { text: 'Start one-on-ones in week 1, not week 3. Tomás\'s newsletter mistake would have reached me days sooner.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía\'s biggest early trap: "I\'ll just do it ___." (one word)',
        answers: ['myself', 'Myself'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s 90 days in order.',
        lines: ['Day 1: leading her friend', 'Week 3: one-on-ones and safety', 'Day 45: one clear direction', 'Day 70: the hard conversation', 'Day 90: launch and review'],
      },
      {
        kind: 'mcq',
        prompt: 'Carmen offers Lucía a bigger budget for a sixth person. What\'s Lucía\'s best response?',
        options: [
          { text: '"Yes! I\'ll pick someone tomorrow."', why: 'Hiring is a one-way door. Take your time.' },
          { text: '"No, we\'re fine."', why: 'A flat no to real help, without checking.' },
          { text: '"Thank you. Can I come back to you Friday, after I\'ve asked the team where we need help most?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan for the next 90 days. Which line forgets the course?',
        lines: [
          'One-on-ones every week, same time, their agenda.',
          'Now that the team trusts me, I can stop asking for feedback.',
          'One top priority per quarter, written on one page.',
        ],
        bug: 1,
        fix: 'Ask one person a month: "What\'s one thing I could do better?"',
        explanation: 'Trust is kept the way it was built: by asking, listening and changing.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their 90-day story.',
        pairs: [
          ['Marta', 'From angry to "nobody else"'],
          ['Tomás', 'From hiding mistakes to catching them'],
          ['Sofía', 'From silent to the map'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What turned Diego from sceptic to contributor?',
        options: [
          { text: 'She pulled rank', why: 'That never worked on Diego.' },
          { text: 'Lucía listened to him, used his experience, and was honest with him' },
          { text: 'He was replaced', why: 'He stayed, and helped.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course, in one line.',
        template: 'Lead the [[1]], not the work. [[2]] first. Be kind and [[3]].',
        blanks: [['people', 'team'], ['Listen', 'listen'], ['clear', 'honest']],
        distractors: ['tasks', 'Talk'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Lucía writes at the top of her notebook.',
        tiles: ['Leading', 'is', 'helping', 'others', 'do', 'their', 'best', 'work.'],
        distractors: ['alone'],
      },
    ],
  },
  reflect: {
    prompt: 'Look back at the whole course. Which one idea will you actually use this month, and with whom?',
    starters: ['The idea I\'ll use is...', 'With...'],
  },
  deepen: {
    title: 'Your next 90 days',
    summary: 'You\'ve finished Leadership for Beginners. Write your own first-90-days plan: one person to have a one-on-one with, one clear goal, one thing to stop, and one person to ask for feedback.',
  },
  notes: 'Final challenge: synthesis of the whole course. Hiring as a one-way door (Bezos). Feedback-seeking as an ongoing habit. Fictional events.',
};

export default lesson;
