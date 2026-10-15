import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat with Tey: tough questions (copycats, "why you", objections). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Tough questions',
  summary: 'Fifteen minutes to go. Tey plays Mrs Adeyemi and fires the toughest questions she can think of. Ada has to answer each in under 20 seconds.',
  minutes: 12,
  outcomes: [
    'Answer the classic tough questions calmly',
    'Turn an objection into proof',
    'Bridge from a question back to your main point',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "(as Mrs Adeyemi) \"What if a big bank copies your app next year?\"",
          replies: ['Um, they won\'t?', 'They might. But...'],
        },
        {
          tey: "\"They won't\" sounds naive. \"They might\" is honest. Finish it: what do you have that a bank doesn't?",
          replies: ['They might. But ajo groups don\'t trust banks with this, they trust each other. My app is built for the group, not the bank. And 110 people already use it.'],
        },
        {
          tey: "Strong. Honest, then your advantage, then proof. Next: \"You're a junior designer. Why should we believe you can grow this?\"",
          replies: ['I\'m just a...', 'Fair question.'],
        },
        {
          tey: "No \"just\"! Try: admit it, then show the proof.",
          replies: ['"Fair question. I\'m early in my career. But I built this alone, grew it from one group to three, and ten offices have signed up for next month. That\'s why I\'m asking for a mentor."'],
        },
        {
          tey: "Beautiful. You turned the weakness into a reason for your ask. Last one: \"Isn't this just a spreadsheet?\"",
          replies: ['"A spreadsheet doesn\'t remind Tunde to pay." (smile) "And a church treasurer can\'t check forty members in two seconds on one."'],
        },
        {
          tey: "Ha! A callback to your story, a vivid detail, and a smile. Notice the pattern? Acknowledge the question, answer honestly, then bridge back to your strongest point. That's how you handle almost anything.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Acknowledge. Answer honestly. Bridge back to your strongest proof. Under 20 seconds.',
    },
  ],
  apply: {
    scenario: 'Tey plays Mrs Adeyemi.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the tough-question pattern in order.',
        lines: ['Acknowledge the question', 'Answer honestly', 'Bridge back to your strongest proof'],
      },
      {
        kind: 'mcq',
        prompt: '"What if a big bank copies you?" Which answer is best?',
        options: [
          { text: '"They won\'t."', why: 'Sounds naive.' },
          { text: '"They might. But groups trust each other, not banks, with this. 110 people already use mine."' },
          { text: '"Then I\'ll quit."', why: 'Not the answer judges want.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'When they said "You\'re a junior designer", I wanted to say "I\'m just a..."',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Pretend you\'re senior.', why: 'Never lie.' },
          { text: 'Get defensive.', why: 'Calm wins.' },
          { text: 'Admit it without shrinking: "I\'m early in my career. But here\'s what I\'ve built." Then link it to your ask.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step of the pattern is it?',
        groups: ['Acknowledge', 'Answer', 'Bridge'],
        items: [
          { text: '"Fair question."', group: 0 },
          { text: '"I\'m early in my career."', group: 1 },
          { text: '"And ten offices have signed up for next month."', group: 2 },
          { text: '"They might."', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Aim to answer each tough question in under how many seconds? (a number)',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Ada do with the "junior designer" weakness?',
        options: [
          { text: 'Turned it into the reason for her ask: she needs a mentor' },
          { text: 'Denied it', why: 'She admitted it.' },
          { text: 'Ignored the question', why: 'She answered it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s answer to "Isn\'t this just a spreadsheet?" Which line hurts it?',
        lines: [
          'A spreadsheet doesn\'t remind Tunde to pay.',
          'Ugh, people always ask that, it\'s honestly such a silly question.',
          'And a treasurer can\'t check forty members in two seconds on one.',
        ],
        bug: 1,
        fix: '(smile)',
        explanation: 'Calling the question silly makes Ada look defensive. Smile and answer.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tough question to Ada\'s bridge.',
        pairs: [
          ['"A bank could copy you"', '110 people already trust it'],
          ['"You\'re only junior"', 'That\'s why I\'m asking for a mentor'],
          ['"Isn\'t it a spreadsheet?"', 'It reminds Tunde to pay'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s answer.',
        template: 'Fair [[1]]. I\'m early in my [[2]]. But ten offices have signed up for next [[3]].',
        blanks: [['question'], ['career'], ['month']],
        distractors: ['just', 'attack'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the opener for any tough question.',
        tiles: ['Fair', 'question.'],
        distractors: ['Ugh.', 'Sorry.'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the toughest question someone could ask about you or your idea? Answer it using acknowledge, answer, bridge.',
    starters: ['Question: ...', 'Acknowledge: ...', 'Answer: ...', 'Bridge: ...'],
  },
  deepen: {
    title: 'Find your weakness first',
    summary: 'Write down the biggest weakness in your pitch: the thing you hope nobody asks about. Prepare an honest answer that bridges to your strength. It stops being scary once you\'ve answered it.',
  },
  notes: 'Acknowledge–answer–bridge is a common media-training and pitch Q&A technique. Answers callback earlier chapters (Tunde, the treasurer, traction).',
};

export default lesson;
