import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Chat with Tey: holding the line. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Holding the line',
  summary: 'Saturday. Jayden takes the car without asking, again. Grace\'s boundary is about to be tested. Tey helps her hold it without a fight.',
  minutes: 12,
  outcomes: [
    'Hold a boundary when it\'s tested',
    'Repeat calmly instead of re-arguing',
    'Follow through on the consequence you set',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Boundaries usually get tested once or twice. That\'s normal. It isn\'t failure.', replies: ['He knew the rule!'] },
        { tey: 'Yes. So you don\'t need a new speech. Calm, short, the same words: "You took the car without asking, so I\'ll keep the keys this week, like I said."', replies: ['He\'ll argue.'] },
        { tey: 'Then repeat it, kindly, without adding new reasons: "I hear you. The keys stay with me this week." New reasons give him new things to argue with.', replies: ['And next week?'] },
        { tey: 'Next week, the car is his again when he asks the day before. The consequence ends. That shows it was never a punishment, just a boundary.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When a boundary is tested: same calm words, follow through, don\'t add new reasons, and end the consequence when you said you would.',
    },
  ],
  apply: {
    scenario: 'The test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Is it normal for a new boundary to be tested?',
        options: [
          { text: 'Yes. Boundaries usually get tested once or twice' },
          { text: 'No, it means it failed', why: 'Testing is normal.' },
          { text: 'Only with teenagers', why: 'Colleagues test them too.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Holding the line, or giving in?',
        groups: ['Holding', 'Giving in'],
        items: [
          { text: '"The keys stay with me this week."', group: 0 },
          { text: '"OK, just this once."', group: 1 },
          { text: 'Repeating the same calm words', group: 0 },
          { text: 'A new 20-minute lecture', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'You\'re being so dramatic. It was one time!',
        prompt: "Grace's best reply?",
        options: [
          { text: '"Dramatic? Let me tell you about dramatic..."', why: 'That starts a new argument.' },
          { text: '"I hear you. The keys stay with me this week, like I said. Next week, just ask the day before."' },
          { text: '"Fine, have them."', why: 'The boundary disappears.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to why it works.',
        pairs: [
          ['Same calm words', 'Nothing new to argue with'],
          ['Follow through', 'Shows the boundary is real'],
          ['End the consequence on time', 'Shows it\'s not a punishment'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Holding the line.',
        template: 'Same calm [[1]]. Don\'t add new [[2]].',
        blanks: [['words'], ['reasons']],
        distractors: ['threats', 'rules'],
      },
      {
        kind: 'mcq',
        prompt: 'Why not add new reasons when someone pushes back?',
        options: [
          { text: 'Reasons are rude', why: 'One clear reason is fine; more invite debate.' },
          { text: 'You should add many', why: 'That reopens the argument.' },
          { text: 'Each new reason is something new to argue about' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day of the week is the boundary tested?',
        answers: ['Saturday', 'saturday'],
        placeholder: 'A day',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s plan weakens the boundary?',
        lines: [
          'Say calmly: the keys stay with me this week.',
          'Repeat it if he argues.',
          'Keep the keys for a month, to be sure.',
          'Next week, lend it if he asks the day before.',
        ],
        bug: 2,
        fix: 'Keep the keys for the week, as she said.',
        explanation: 'Changing the consequence makes it a punishment, not a boundary.',
      },
      {
        kind: 'sortGroups',
        prompt: 'At work: holding a boundary, or dropping it?',
        groups: ['Holding', 'Dropping'],
        items: [
          { text: '"As we agreed, the survey starts on the 24th."', group: 0 },
          { text: 'Doing it tonight because they asked again', group: 1 },
          { text: '"I\'ll reply first thing tomorrow."', group: 0 },
          { text: 'Answering at 11 p.m. to be helpful', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to hold a tested boundary.',
        lines: ['Stay calm', 'Name what happened', 'Follow through', 'Repeat if they push', 'End the consequence on time'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of your boundaries gets tested most? Write the calm sentence you\'ll repeat.',
    starters: ['It gets tested when...', 'I\'ll say...'],
  },
  deepen: {
    title: 'The broken record',
    summary: 'Assertiveness trainers call calm repetition "the broken record": saying the same short sentence, kindly, until the other person accepts it. It works because it gives them nothing new to fight.',
  },
  notes: 'Broken-record technique: assertiveness training (e.g. Manuel J. Smith, When I Say No, I Feel Guilty, 1975). Fictional dialogue.',
};

export default lesson;
