import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: handling a change request (change control, simplified). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Handling a change',
  summary: 'Day 21, 8 a.m. Arjun, Kavya and Joel have two hours before the 10 a.m. call. Full loyalty points: three weeks. Diwali: ten days. Tey walks them through turning "can you do it?" into a real choice.',
  minutes: 12,
  outcomes: [
    'Handle a change request in five steps',
    'Find the need behind the request',
    'Give options with clear trade-offs, and let the client choose',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A change request in five steps',
      steps: [
        { title: '1. Find the need behind it', body: 'Mr Rao didn\'t ask for points because he loves points. He wants customers to come back after Diwali. That\'s the need. There might be more than one way to meet it.' },
        { title: '2. Size it honestly', body: 'With the people doing the work: full points, gold levels and birthdays is about three weeks. A simple "₹100 off your next order" code for every Diwali buyer is about two days.' },
        { title: '3. Build two or three options', body: 'A: full loyalty in January, Diwali launch unchanged. B: the repeat-buyer code for Diwali, full loyalty in January. C: full loyalty for Diwali, and drop coupons and the shipping page polish.' },
        { title: '4. Show the trade-off for each', body: 'Every option says what it gives AND what it costs: date, quality, other features. No option is free. Saying so is what makes them real options.' },
        { title: '5. Let them choose, then write it down', body: 'The client chooses: it\'s their shop. Then a short written note of what changed, what moved and what stays. Everyone, including the team, sees it the same day.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Answering Mr Rao',
      before: { label: 'Yes or no', text: '"We can try, but it\'ll be very tight." (Mr Rao hears: yes.)' },
      after: { label: 'Options', text: '"Option A: points in January. Option B: a ₹100 comeback code for every Diwali buyer, points in January. Option C: points for Diwali, but coupons and shipping polish drop. I recommend B." (Mr Rao: "B. Good.")' },
      notes: ['"We can try" is heard as yes, every time.', 'Options show the trade-off, so the choice is real.', 'A recommendation helps a busy client decide fast.'],
    },
  ],
  apply: {
    scenario: 'Day 21, 8 a.m., two hours to the call.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Find the need behind it', 'Size it honestly', 'Build two or three options', 'Show the trade-off for each', 'Let them choose, then write it down'],
      },
      {
        kind: 'mcq',
        prompt: 'What was Mr Rao\'s real need?',
        options: [
          { text: 'Points, specifically', why: 'Points were one way to meet the need.' },
          { text: 'Customers coming back after Diwali' },
          { text: 'Beating his cousin', why: 'Maybe a little. The business need is repeat customers.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real option, or not really an option?',
        groups: ['Real option', 'Not really'],
        items: [
          { text: 'Points for Diwali, coupons drop', group: 0 },
          { text: '"We can try, but it\'ll be tight."', group: 1 },
          { text: 'Comeback code now, points in January', group: 0 },
          { text: '"Everything, by Diwali, somehow."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Full points in ten days? Honestly, no. Three weeks at least.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Thank you, that\'s exactly what I need to hear before 10. What could we build in two days that brings customers back?' },
          { text: 'Can you do it in ten if you work weekends?', why: 'A hidden trade-off with Joel\'s weekends.' },
          { text: 'I\'ll tell Mr Rao you said no.', why: 'Puts Joel between Arjun and the client.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"We can try" is heard as ___, every time. (one word)',
        answers: ['yes', 'Yes'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to its cost.',
        pairs: [
          ['A: points in January', 'Nothing new for Diwali'],
          ['B: comeback code now', 'Full points wait'],
          ['C: points for Diwali', 'Coupons and polish drop'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add a recommendation?',
        options: [
          { text: 'To force the client', why: 'They can still choose A or C.' },
          { text: 'It doesn\'t help', why: 'Busy people value a clear recommendation.' },
          { text: 'It helps a busy client decide fast, while the choice stays theirs' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s option list. Which option hides its cost?',
        lines: [
          'A: points in January, Diwali launch unchanged.',
          'B: a ₹100 comeback code now, points in January.',
          'C: everything by Diwali; we\'ll just work harder.',
        ],
        bug: 2,
        fix: 'C: points for Diwali; coupons and shipping polish drop.',
        explanation: '"We\'ll just work harder" hides the cost in the team\'s evenings and the quality.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Every option says what it [[1]] and what it [[2]].',
        blanks: [['gives'], ['costs']],
        distractors: ['hides', 'wants'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the need question.',
        tiles: ['What', 'do', 'the', 'points', 'need', 'to', 'achieve?'],
        distractors: ['cost'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a change someone asked of you. What was the need behind it? What two or three options could you have offered?',
    starters: ['The need was...', 'Option A: ...', 'Option B: ...'],
  },
  deepen: {
    title: 'Three options',
    summary: 'Next time you\'re asked for something that doesn\'t fit, write three options with what each gives and costs. Add your recommendation.',
  },
  notes: 'Change control / change-request handling: standard project-management practice (e.g. PMBOK integrated change control), simplified. Interests behind positions: Fisher & Ury. Fictional figures (₹100 code, three weeks).',
};

export default lesson;
