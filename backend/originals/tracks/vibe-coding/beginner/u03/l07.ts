import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Myth or Fact: edge cases. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The weird cases',
  summary: 'A grandmother pledges $0.50 "for luck". A local bank pledges $25,000. Someone types a minus sign. Real users are weirder than you think, and most bugs live at the edges.',
  minutes: 11,
  outcomes: [
    'Explain what an edge case is',
    'Find edge cases for your own tool',
    'Decide what should happen, then test it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'An edge case is an unusual but real input, like a blank, a zero, a huge number or an exact limit.', isFact: true, explain: 'Edges are where code most often breaks: the first, the last, the empty, the biggest.' },
        { text: 'If the normal case works, the edge cases will work too.', isFact: false, explain: 'The car-wash bug only appeared with two pledges. Edges need their own tests.' },
        { text: 'You have to decide what the right behaviour is before you can test it.', isFact: true, explain: 'Should $0.50 be allowed? Should $25,000 finish the bar? Decide, write it down, then test.' },
        { text: 'The AI will always think of the edge cases for you.', isFact: false, explain: 'It often suggests good ones if you ask. If you don\'t ask, it usually builds for the normal case only.' },
        { text: 'Exactly at a limit ($18,000 on the dot) is one of the best places to test.', isFact: true, explain: 'Is it >= or >? A limit is where "off by one" bugs hide.' },
        { text: 'Edge cases only matter for big companies.', isFact: false, explain: 'A minus pledge on a small fundraiser page still makes the total wrong in front of everyone.' },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'List the edge cases for the pledge form: blanks, zero, minus, decimals, huge numbers, exactly $18,000.\nFor each, say what you think should happen. Don\'t change any code yet.',
      caption: 'Ask for edge cases, then decide.',
    },
  ],
  apply: {
    scenario: 'The weird pledges.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which of these is an edge case?',
        options: [
          { text: 'A $50 pledge', why: 'That\'s the normal case.' },
          { text: 'A pledge of exactly $0' },
          { text: 'A pledge from a parent', why: 'Normal: who it\'s from doesn\'t make it edgy.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Normal case or edge case?',
        groups: ['Normal', 'Edge'],
        items: [
          { text: '$75', group: 0 },
          { text: '-$20', group: 1 },
          { text: 'Exactly $18,000 total', group: 1 },
          { text: '$200 from the bakery', group: 0 },
          { text: 'A blank amount', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'What should happen if someone types -20?',
        prompt: 'Hazel\'s best answer?',
        options: [
          { text: 'Whatever the code does.', why: 'Decide first; then check the code does it.' },
          { text: 'Take $20 off the total.', why: 'Nobody pledges a negative amount. That\'s a typo or a prank.' },
          { text: 'Refuse it and say "Amounts must be more than $0."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'First [[1]] what should happen. Then [[2]] that it does.',
        blanks: [['decide'], ['test', 'check']],
        distractors: ['guess', 'hope'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Raised $17,999.50 plus a $0.50 pledge. What\'s the new total? (Number only.)',
        answers: ['18000', '18,000', '$18,000', '$18000'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        prompt: 'The code says if (total > GOAL). At exactly $18,000, what happens?',
        code: 'if (total > GOAL) {\n  message.textContent = "WE\'RE GOING TO D.C.!";\n}',
        language: 'javascript',
        options: [
          { text: 'The message shows', why: '> means "more than". $18,000 isn\'t more than $18,000.' },
          { text: 'It crashes', why: 'It just doesn\'t show the message.' },
          { text: 'The message doesn\'t show, until the total goes over $18,000' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line should be >= so exactly $18,000 counts?',
        lines: ['const GOAL = 18000;', 'if (total > GOAL) {', '  message.textContent = "WE\'RE GOING TO D.C.!";', '}'],
        bug: 1,
        fix: 'if (total >= GOAL) {',
        explanation: '>= means "at least". Reaching the goal exactly should count.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the edge case to a sensible decision.',
        pairs: [
          ['Blank amount', 'Ask for a number, add nothing'],
          ['$0.50', 'Allow it, show $0.50'],
          ['-$20', 'Refuse it'],
          ['$25,000', 'Allow it; the bar stops at full'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best prompt for handling edge cases?',
        options: [
          { text: 'Make it handle weird stuff', why: 'Which weird stuff? What should happen?' },
          { text: 'Refuse blank, zero or minus amounts with "Amounts must be more than $0". Allow decimals. Keep everything else the same.' },
          { text: 'Handle all edge cases in the universe', why: 'Name the ones you decided on.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review: the AI lists edge cases. What do you do with the list?',
        options: [
          { text: 'Decide what should happen for each, add them to tests.md, then test' },
          { text: 'Ignore it', why: 'It just found your next tests.' },
          { text: 'Let it change the code for all of them without asking', why: 'Decide first, then one change at a time.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of the weirdest real thing someone could type into your tool. What should happen?',
    starters: ['Someone might type...', 'It should...'],
  },
  deepen: {
    title: 'On your computer: edge cases',
    summary: 'Ask Claude Code to list the edge cases for your tool (without changing code). Decide what should happen for each, add them to tests.md, and test them. Fix the worst one with one precise request.',
  },
  notes: 'Boundary value testing; > vs >= off-by-one example.',
};

export default lesson;
