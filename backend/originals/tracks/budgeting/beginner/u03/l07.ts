import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Reading: the planning fallacy. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Why plans always run short',
  summary: 'Every plan Kofi has ever made, for revision, for football training, for money, has run short. That\'s not bad luck. It\'s one of the most reliable findings in psychology, and there\'s a simple fix.',
  minutes: 12,
  outcomes: [
    'Explain the planning fallacy',
    'Use last month\'s numbers instead of hopes',
    'Add a cushion to every plan',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The planning fallacy',
      html: '<p>In a classic study, psychology students were asked when they\'d finish their final-year thesis. They gave a realistic guess and a worst-case guess. On average they took much longer than their realistic guess, and <strong>most didn\'t even finish by their worst-case date</strong> (Buehler, Griffin and Ross, 1994).</p><p>This is the <strong>planning fallacy</strong>: we underestimate how long things take and how much they cost, even when we\'ve been wrong before.</p><p>Why? When we plan, we picture the task going smoothly: the best-case story. We forget the interruptions, the surprises and the ordinary chaos of life, because they haven\'t happened <em>yet</em>.</p><p><strong>Money plans fall into it too.</strong> Kofi\'s first idea was GH₵300 for a month of food. It sounded fine in his head, where there are no lab days, no late nights and no friend\'s birthday.</p><p><strong>Three fixes:</strong></p><ol><li><strong>Use the outside view.</strong> Don\'t ask "what should this cost?" Ask "what did it cost last time?" Kofi\'s case file says food bought out was GH₵55 a day. That\'s his starting point, not a hope.</li><li><strong>Add a cushion.</strong> A surprises line (Kofi\'s GH₵150) exists because <em>something</em> always comes up, even if we can\'t say what.</li><li><strong>Check early.</strong> A weekly check catches a plan running short in week 1, not week 4.</li></ol>',
    },
    {
      kind: 'check',
      question: 'What\'s the "outside view"?',
      options: ['Using what it actually cost last time, not what you hope', 'Asking a friend what they think', 'Looking at prices in other countries'],
      answer: 0,
      explanation: 'Your own past numbers are the best guide to what things really cost you.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Plans picture the best case. Fix it with the outside view (last month\'s real numbers), a cushion, and an early check.',
    },
  ],
  apply: {
    scenario: 'Planning, honestly.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the thesis study, what happened to most students\' worst-case guesses?',
        options: [
          { text: 'They finished well before them', why: 'The opposite. Even worst cases were too hopeful.' },
          { text: 'They didn\'t even finish by their worst-case date' },
          { text: 'They finished exactly on time', why: 'Very few did.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fix to what it does.',
        pairs: [
          ['Outside view', 'Use last month\'s real numbers'],
          ['Cushion', 'Room for the unknown'],
          ['Early check', 'Catch problems in week 1'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside view (hope) or outside view (evidence)?',
        groups: ['Inside view', 'Outside view'],
        items: [
          { text: '"Food should only cost GH₵300."', group: 0 },
          { text: '"Food cost GH₵55 a day last month."', group: 1 },
          { text: '"Nothing unexpected will happen."', group: 0 },
          { text: '"Something came up three times last month."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Why do I need a GH₵150 surprises line if I don\'t know what the surprise is?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'You don\'t. Spend it on fun.', why: 'Then the first surprise comes out of food money.' },
          { text: 'You\'re right, delete it.', why: 'Not knowing WHAT is exactly why you plan for SOMETHING.' },
          { text: 'You don\'t know what, but last month had three. Something always comes up. The line is for that.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fallacy.',
        template: 'We plan for the [[1]] case and forget the [[2]] of real life.',
        blanks: [['best'], ['chaos', 'surprises', 'interruptions']],
        distractors: ['worst', 'calm'],
      },
      {
        kind: 'findBug',
        prompt: 'Which planning thought is the fallacy at work?',
        lines: [
          'Transport last month: GH₵80.',
          'This month it\'ll be GH₵20; I\'ll just walk everywhere.',
          'I\'ll check after week 1.',
        ],
        bug: 1,
        fix: 'Plan GH₵60, a believable cut from GH₵80, and check after week 1.',
        explanation: 'A 75% drop based on a hope. The outside view says GH₵80; cut from there.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Food out last month was GH₵55 a day. Over 30 days that\'s GH₵1,650. Kofi plans GH₵400. How big is the cut?',
        answers: ['1250', '1,250', 'GH₵1,250', 'GH₵1250'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'That\'s a big cut. What makes it believable this time?',
        options: [
          { text: 'He\'s replacing most food out with shared cooking, which already worked in Chapter 2' },
          { text: 'He promised really hard', why: 'Promises are the inside view. Evidence is the outside view.' },
          { text: 'Food prices will fall', why: 'Hoping prices fall is the planning fallacy again.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order an honest plan.',
        lines: ['Check last month\'s real numbers', 'Set believable targets', 'Add a cushion', 'Check after week 1'],
      },
      {
        kind: 'mcq',
        prompt: 'Who falls for the planning fallacy?',
        options: [
          { text: 'Only careless people', why: 'Careful people do too. It\'s how human planning works.' },
          { text: 'Almost everyone, including experts' },
          { text: 'Only students', why: 'Governments and companies do it on huge projects.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a plan that ran short for you, money or otherwise. What did you leave out when you made it?',
    starters: ['I planned...', 'I forgot about...'],
  },
  deepen: {
    title: 'It happens to giant projects too',
    summary: 'The Sydney Opera House was planned to cost about 7 million Australian dollars and take four years. It cost over 100 million and took about fourteen. Big projects and small budgets fall into the same trap.',
  },
  notes: 'Buehler, R., Griffin, D., & Ross, M. (1994). Exploring the "planning fallacy". JPSP, 67(3), 366–381: thesis predictions; mean completion 55.5 days vs predicted 33.9; only ~30% finished by predicted time; fewer than half by their worst-case estimate. "Planning fallacy": Kahneman & Tversky (1979). Outside view: Kahneman & Lovallo (1993). Sydney Opera House: estimated AU$7m, final ~AU$102m, 1959–1973 (widely cited). Kofi food out 1,650/month → 400 planned (shared cooking replaces most).',
};

export default lesson;
