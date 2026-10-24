import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Chat with Tey: trade-offs, "what should we drop?" */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Trade-offs: "what should we drop?"',
  summary: 'The 20-minute sorting call with Ms Okafor-Lane. Tey explains the triangle every project lives in, and the question that turns an argument into a planning session.',
  minutes: 12,
  outcomes: [
    'Explain the scope, time and cost triangle',
    'Prioritise with must-have, should-have and later',
    'Ask "what should we drop?" instead of arguing',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every project is a triangle: scope, time and cost. Fix two, and the third has to move. Harlow & Finch fixed time (spring) and cost (around £40,000).', replies: ['So scope has to move.'] },
        { tey: 'Exactly. Don\'t argue about it. Sort it together. Put every feature into one of three boxes: must-have for spring, should-have, and later.', replies: ['And if she says they\'re all must-haves?'] },
        { tey: 'Ask: "If we could only launch with four, which four would you choose?" People prioritise honestly when the choice is real.', replies: ['What did she pick?'] },
        { tey: 'Points, scan in shop, a welcome reward, and the app itself. Gift cards and referrals moved to phase two. She chose. You didn\'t refuse anything.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When time and money are fixed, ask "If we could only launch with four, which four?" Let them choose what moves.',
    },
  ],
  apply: {
    scenario: 'The sorting call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are the three sides of the project triangle?',
        options: [
          { text: 'Scope, time and cost' },
          { text: 'Price, people and power', why: 'The triangle is scope, time and cost.' },
          { text: 'Design, code and testing', why: 'Those are tasks, not the triangle.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Phase one or phase two, after the call?',
        groups: ['Phase one', 'Phase two'],
        items: [
          { text: 'Points', group: 0 },
          { text: 'Gift cards', group: 1 },
          { text: 'Scan in shop', group: 0 },
          { text: 'Referral scheme', group: 1 },
          { text: 'Welcome reward', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'She says all 14 are must-haves.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Then build all 14 in 12 weeks.', why: 'Impossible without more time or money.' },
          { text: 'Ask: "If we could only launch with four, which four would you pick?" A real choice gets a real answer.' },
          { text: 'Tell her she\'s wrong.', why: 'Let her choose instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the fixed sides to what must move.',
        pairs: [
          ['Time and cost fixed', 'Scope moves'],
          ['Scope and time fixed', 'Cost moves'],
          ['Scope and cost fixed', 'Time moves'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The triangle rule.',
        template: 'Fix [[1]], and the third has to [[2]].',
        blanks: [['two'], ['move']],
        distractors: ['all', 'vanish'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many features went into phase one, counting the app itself?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "what should we drop?" better than "we can\'t do that"?',
        options: [
          { text: 'It sounds nicer but changes nothing', why: 'It changes who decides.' },
          { text: 'It isn\'t better', why: 'It turns an argument into planning.' },
          { text: 'It makes the trade-off a shared decision, not a refusal' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s sorting plan breaks the triangle?',
        lines: [
          'Time is fixed: spring launch.',
          'Cost is fixed: around £40,000.',
          'So we\'ll add all 14 and keep both fixed.',
          'Sort features into must, should, later.',
        ],
        bug: 2,
        fix: 'So scope has to move: sort the 14.',
        explanation: 'With time and cost fixed, scope must move.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Must-have, should-have, or later?',
        groups: ['Must-have', 'Should-have', 'Later'],
        items: [
          { text: 'Earning points', group: 0 },
          { text: 'Push notifications', group: 1 },
          { text: 'Birthday rewards', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the sorting call.',
        lines: ['Name what\'s fixed', 'Sort into three boxes', 'Ask "which four?"', 'Agree phase one and phase two'],
      },
    ],
  },
  reflect: {
    prompt: 'In a project you\'re on, which side of the triangle is fixed? What would you ask the other side to choose?',
    starters: ['Fixed:...', 'I\'d ask them to choose...'],
  },
  deepen: {
    title: 'MoSCoW',
    summary: 'Project teams often sort requirements with MoSCoW: Must have, Should have, Could have, Won\'t have (this time). It\'s a simple way to make trade-offs visible.',
  },
  notes: 'Project-management triangle (scope, time, cost) and MoSCoW prioritisation (Dai Clegg, 1994; DSDM). Fictional phase-one scope: app, points, scan in shop, welcome reward.',
};

export default lesson;
