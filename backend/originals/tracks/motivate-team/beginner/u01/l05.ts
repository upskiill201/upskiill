import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: six headsets',
  summary: 'Week 1, Friday. Six new headsets arrive at 10 a.m. IT promises a fix for the crashing ticket system by Wednesday. Emmanuel tests his headset and says, genuinely surprised, "Oh. It works." Quick check before Week 2.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use myth-busting, hygiene and stay-interview tools without notes', 'Spot the quick fixes that won\'t work'],
  learn: [
    {
      kind: 'story',
      title: 'Week 1, Friday, 10:15 a.m.',
      beats: [
        { speaker: 'bisi', text: 'New headsets. In week one. The last manager promised headsets in January.' },
        { speaker: 'narrator', text: 'Emmanuel puts his on, calls a clinic in Ibadan, and doesn\'t get cut off for the first time in a month. He says, surprised: "Oh. It works."' },
        { speaker: 'folake', text: '(to Miracle, later) I heard about the headsets. Still think you should buy pizza.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 1.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the headsets matter so much in Week 1?',
        options: [
          { text: 'Headsets are motivating', why: 'They\'re hygiene: they stop the anger.' },
          { text: 'They fixed a real frustration, fast, and showed Miracle listened' },
          { text: 'They were expensive', why: 'Speed and listening mattered more.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a stay interview in order.',
        lines: ['Say why you\'re asking', 'Ask why they stay', 'Ask what might make them leave', 'Ask what they\'d change', 'Agree one action, and do it'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Hygiene factor or motivator?',
        groups: ['Hygiene', 'Motivator'],
        items: [
          { text: 'Working headsets', group: 0 },
          { text: 'Growth and responsibility', group: 1 },
          { text: 'No 11 p.m. calls', group: 0 },
          { text: 'Seeing your impact', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Still think you should buy pizza.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Pizza is pointless.', why: 'Pizza is fine. It just isn\'t the fix.' },
          { text: 'Okay, pizza it is.', why: 'Agreeing without sharing what you learned.' },
          { text: 'Happy to, as a thank-you! But the headsets did more for morale than pizza will. Next I\'d love to try clinic visits.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Assuming people are naturally lazy is McGregor\'s Theory ___. (one letter)',
        answers: ['X', 'x'],
        placeholder: 'One letter',
      },
      {
        kind: 'mcq',
        prompt: 'What did Judge and colleagues find about pay and satisfaction?',
        options: [
          { text: 'Only a weak link: fair pay matters, more pay buys less than expected' },
          { text: 'A very strong link', why: 'It was weak.' },
          { text: 'No link at all', why: 'Weak, not zero.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan for Week 2. Which line forgets Chapter 1?',
        lines: [
          'Ask IT for the ticket-system fix by Wednesday.',
          'Hold a motivational speech to launch Week 2.',
          'Ask Folake about clinic visits.',
        ],
        bug: 1,
        fix: 'Tell the team what\'s been fixed and what\'s next.',
        explanation: 'They\'ve heard two speeches. Actions are what they believe.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to what it means.',
        pairs: [
          ['Hygiene factor', 'Stops unhappiness'],
          ['Motivator', 'Builds caring'],
          ['Stay interview', 'Ask why they stay'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Emmanuel say "Oh. It works"?',
        options: [
          { text: 'He was being sarcastic', why: 'He was genuinely surprised.' },
          { text: 'For the first time in a month, a basic tool did its job' },
          { text: 'He likes gadgets', why: 'It\'s about a frustration going away.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 so far.',
        template: 'Ask, don\'t [[1]]. Fix the [[2]] first. Ask why they [[3]].',
        blanks: [['assume', 'guess'], ['basics', 'hygiene', 'frustrations'], ['stay']],
        distractors: ['pay', 'leave'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Emmanuel\'s surprise.',
        tiles: ['Oh.', 'It', 'works.'],
        distractors: ['breaks.'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the "broken headset" in your work or studies: the small thing that frustrates you every day? What would fixing it change?',
    starters: ['My broken headset is...', 'Fixing it would...'],
  },
  deepen: {
    title: 'Tell them what you fixed',
    summary: 'If you fix something for a team, tell them in one line: "You said X. We fixed it." It\'s how trust starts.',
  },
  notes: 'Checkpoint: reviews lessons 1–4.',
};

export default lesson;
