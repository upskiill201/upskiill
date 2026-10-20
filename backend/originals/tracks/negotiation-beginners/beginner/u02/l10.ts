import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: prepare the salary talk (practice run). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: prepare the review',
  summary: 'The rent is ready. Lucía sets the harder test: prepare Ada\'s salary review the same way, with her goal, evidence, BATNA and Tobi\'s side. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Prepare a salary negotiation in five steps', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The review, on one page',
      html: '<p><strong>Now:</strong> ₦350,000 a month, plus the second project and the design system.</p><p><strong>Evidence:</strong> similar roles in Lagos pay about ₦400,000 to ₦550,000.</p><p><strong>BATNA:</strong> a recruiter has a junior role at another startup for ₦420,000, but it means starting again, with no design system to lead.</p><p><strong>Tobi\'s side:</strong> he needs the design system done before a big launch. Hiring and training someone new would take months. His budget is set every quarter.</p>',
    },
    {
      kind: 'story',
      title: 'Saturday morning',
      beats: [
        { speaker: 'ada', text: 'It\'s the same five steps. Goal, reasons, BATNA, walk-away, his side.' },
        { speaker: 'lucia', text: 'Now you\'re ready for the rent at noon. Next, you\'ll learn how to say your number.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: prepare goal and walk-away, find interests, cost your BATNA and theirs, and gather evidence.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: prepare the review.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which is the best goal for Ada\'s review?',
        options: [
          { text: '₦480,000: ambitious, inside the range, matching her bigger role' },
          { text: '₦360,000', why: 'Below the market range.' },
          { text: '₦900,000', why: 'Far outside the evidence; easy to dismiss.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is Ada\'s BATNA salary from the recruiter, in naira a month?',
        answers: ['420000', '420,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Evidence', 'BATNA', 'Their side'],
        items: [
          { text: 'Similar roles pay ₦400,000 to ₦550,000', group: 0 },
          { text: 'The ₦420,000 offer elsewhere', group: 1 },
          { text: 'Tobi needs the design system before launch', group: 2 },
          { text: 'Budgets are set every quarter', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why isn\'t her walk-away simply ₦420,000?',
        options: [
          { text: 'Leading the design system has value too, so she might accept a bit less to stay if the path is clear' },
          { text: 'It must be exactly the BATNA', why: 'Non-money parts of each option matter too.' },
          { text: 'Walk-aways don\'t matter', why: 'They stop bad yeses.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I tell Tobi about the ₦420,000 offer?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Only if it\'s real and you\'d take it. Say it calmly as context, not as a threat. Lead with your value and the market range.' },
          { text: 'Exaggerate it to ₦600,000.', why: 'Lies get found out.' },
          { text: 'Threaten to leave tomorrow.', why: 'Threats damage the relationship.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Tobi\'s interest to something Ada can offer.',
        pairs: [
          ['Design system before launch', 'A clear plan to deliver it'],
          ['Avoid months of hiring', 'Her staying and growing'],
          ['Quarterly budgets', 'A raise timed to the next quarter'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Goal ₦480,000, current pay ₦350,000. How much more a month is the goal, in naira?',
        answers: ['130000', '130,000'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 in one line.',
        template: 'Know your goal, your [[1]], your BATNA and their [[2]].',
        blanks: [['walk-away', 'walkaway', 'reasons'], ['side', 'interests']],
        distractors: ['mood', 'secrets'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s review preparation is wrong?',
        lines: [
          'Goal: ₦480,000.',
          'Evidence: ₦400,000 to ₦550,000.',
          'BATNA: no idea, I\'ll see.',
          'Tobi\'s side: needs the design system.',
        ],
        bug: 2,
        fix: 'BATNA: the ₦420,000 role elsewhere.',
        explanation: 'Without a BATNA, she has no walk-away.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s review preparation.',
        lines: ['Set the goal', 'Gather evidence', 'Cost the BATNA', 'Set a private walk-away', 'Think through Tobi\'s side'],
      },
    ],
  },
  reflect: {
    prompt: 'Prepare a pay or price conversation of your own using the five steps.',
    starters: ['My goal is...', 'Their side:...'],
  },
  deepen: {
    title: 'Non-money value',
    summary: 'A job, a deal or a flat isn\'t just a number. Learning, title, flexibility and location all count. Put them in your BATNA comparison, or you\'ll compare the wrong things.',
  },
  notes: 'Chapter 2 challenge (fictional): Ada ₦350,000; range ₦400,000–₦550,000; BATNA offer ₦420,000; goal ₦480,000 (+₦130,000).',
};

export default lesson;
