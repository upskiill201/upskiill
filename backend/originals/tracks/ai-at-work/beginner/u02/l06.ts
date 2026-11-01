import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 6 — anatomy of an email that gets a reply: subject, ask first, one ask, easy to answer. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The email that gets a reply',
  summary: 'Emails get ignored when the reader has to work out what you want. Put the ask where it cannot be missed.',
  minutes: 14,
  outcomes: [
    'Write a subject line that says what you need',
    'Put the ask in the first line, then the context',
    'Make your email easy to answer in one reply',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Take apart an email that got a reply in 10 minutes',
      text:
        'Subject: Approval needed by Wed: new colour palette\n\nHi Lucía,\n\nCould you approve the new colour palette by Wednesday? A simple yes is perfect.\n\nWe need it to start building on Thursday. The palette is attached; it is the one we discussed on Monday, with the darker blue.\n\nIf Wednesday is tight, tell me and we will find another way.\n\nThanks!\nAda',
      hotspots: [
        { phrase: 'Approval needed by Wed: new colour palette', note: 'The subject says the ask and the deadline. Lucía knows what this is before she opens it.' },
        { phrase: 'Could you approve the new colour palette by Wednesday?', note: 'The ask comes FIRST. Not after three paragraphs of context.' },
        { phrase: 'A simple yes is perfect.', note: 'Makes it easy to answer. Busy people reply faster when the reply is small.' },
        { phrase: 'We need it to start building on Thursday.', note: 'The reason for the deadline. Deadlines with reasons get taken seriously.' },
        { phrase: 'If Wednesday is tight, tell me', note: 'An escape hatch. It turns silence into a reply.' },
      ],
    },
    {
      kind: 'reading',
      title: 'Five habits of emails that get replies',
      html:
        '<ol>' +
        '<li><strong>The subject says the ask.</strong> "Approval needed by Wed: colour palette" beats "Update" or "Quick question".</li>' +
        '<li><strong>The ask comes first.</strong> Put what you need in the first one or two lines. Context comes after. This is often called <em>bottom line up front</em>.</li>' +
        '<li><strong>One email, one ask.</strong> Three requests in one email usually get one answer.</li>' +
        '<li><strong>Deadlines come with reasons.</strong> "By Wednesday, because building starts Thursday" is taken more seriously than "ASAP".</li>' +
        '<li><strong>Make the reply small.</strong> A yes/no question, or two clear options, is easy to answer from a phone.</li>' +
        '</ol>' +
        '<p>All five fit in one line to the AI: <em>"Subject line states the ask; ask in the first line; one ask; deadline with reason; easy to answer with yes or no."</em></p>',
    },
    {
      kind: 'compare',
      title: 'Buried ask vs ask first',
      before: {
        label: 'Ask buried',
        text: 'Subject: Update\n\nHi Lucía, hope you had a good weekend! This week we finished sign-up, which went well, and the team is happy with the screens. We found a bug on Tuesday... [two more paragraphs] ...so anyway, could you look at the colours at some point?',
      },
      after: {
        label: 'Ask first',
        text: 'Subject: Approval needed by Wed: colour palette\n\nHi Lucía, could you approve the colour palette by Wednesday? We start building Thursday. A simple yes is perfect!',
      },
      notes: ['The subject now tells her what to do.', 'The ask moved from the end to the first line.', '"At some point" became a date with a reason.'],
    },
    {
      kind: 'check',
      question: 'Where should the ask go?',
      options: ['At the end, after the context', 'In the first line or two', 'In a P.S.'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is writing emails that get answered.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Useful subject line, or vague?',
        groups: ['Useful', 'Vague'],
        items: [
          { text: 'Approval needed by Wed: colour palette', group: 0 },
          { text: 'Update', group: 1 },
          { text: 'Quick question', group: 1 },
          { text: 'Can you join Thursday 2pm? Launch review', group: 0 },
          { text: 'Following up', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to the example.',
        pairs: [
          ['Subject says the ask', '"Approval needed by Wed"'],
          ['Ask first', '"Could you approve the palette by Wednesday?"'],
          ['Deadline with a reason', '"We start building Thursday"'],
          ['Make the reply small', '"A simple yes is perfect"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do emails with three requests often get only one answer?',
        options: [
          { text: 'Readers answer the easiest one and the rest get lost' },
          { text: 'Email apps only show one question', why: 'Not a tech limit. It is how busy people read.' },
          { text: 'Three is bad luck', why: 'No luck involved!' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a subject line that states the ask.',
        tiles: ['Approval', 'needed', 'by', 'Wed:', 'colour', 'palette'],
        distractors: ['Update', 'Hi'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that hides the ask.',
        lines: ['Subject: Update', 'Hi Lucía, could you approve the palette by Wednesday?', 'We start building Thursday.', 'Thanks!'],
        bug: 0,
        fix: 'Subject: Approval needed by Wed: colour palette',
        explanation: 'The body is great, but "Update" gives no reason to open it now.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I emailed our IT team three times about new laptops and got nothing. What am I doing wrong?",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Email more often.', why: 'A fourth unclear email gets the same result.' },
          { text: 'Write a longer email with more background.', why: 'More text buries the ask further.' },
          { text: "Put the ask and date in the subject, ask in the first line, give the reason, and make it a yes/no question." },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s email request for the AI.',
        template: 'Subject line states the [[1]]. Ask in the [[2]] line. One ask. Deadline with a [[3]]. Easy to answer with yes or no.',
        blanks: [['ask'], ['first'], ['reason']],
        distractors: ['weather', 'last', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Bottom line up front" means put the main point ... (one word)',
        answers: ['first'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request will get the AI to write an email that gets a fast reply?',
        options: [
          { text: 'Write an email to IT about laptops.', why: 'No ask, no date, no reason.' },
          {
            text: "Email to IT: subject states the ask and date. First line: can Grace's laptop be ready by Friday? Reason: she starts Monday. Make it answerable with yes or no.",
          },
          { text: 'Write a long, detailed email about our laptop situation.', why: 'Long buries the ask.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the parts of an email that gets a reply.',
        lines: ['Subject with the ask', 'The ask, in the first line', 'The reason and context', 'An easy way to say no or suggest another time', 'Thanks'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to answer, or hard to answer?',
        groups: ['Easy', 'Hard'],
        items: [
          { text: 'Can you approve by Wednesday? A yes is perfect.', group: 0 },
          { text: 'Thoughts?', group: 1 },
          { text: 'Thursday 2pm or Friday 10am: which works?', group: 0 },
          { text: 'Let me know what you think about everything.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Ada, your emails are the only ones I answer from my phone in the lift. How?",
        prompt: "What's Ada's honest answer?",
        options: [
          { text: 'I send them at the perfect time of day.', why: 'Timing helps a little; the structure does the work.' },
          { text: 'I put the ask first and make the reply small, so you can answer in one tap.' },
          { text: 'My emails are just shorter.', why: 'Short helps, but the ask-first structure is the real trick.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '"ASAP" is weak. A deadline is stronger with a ... (one word)',
        answers: ['reason', 'date', 'why'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the weak line to the strong one.',
        pairs: [
          ['"Thoughts?"', '"Can you approve by Wednesday?"'],
          ['"ASAP"', '"By Friday, so Grace has it Monday"'],
          ['"Subject: Quick question"', '"Subject: Can you join Thu 2pm?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add "If Wednesday is tight, tell me"?',
        options: [
          { text: 'It turns silence into a reply, even a "no"' },
          { text: 'It sounds polite', why: 'It is polite, but the real benefit is getting an answer.' },
          { text: 'It lets them ignore the email', why: 'The opposite: it invites a reply.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Find an email you sent that never got a reply. Rewrite its subject line and first line using this lesson.',
    starters: ['Old subject:', 'New subject:', 'New first line:'],
  },
  deepen: { title: 'Try it today', summary: 'For one week, put the ask in the subject and the first line of every email. Notice what changes.' },
  notes: '"Bottom line up front" is a widely used business-writing convention. No statistics; "replied in 10 minutes" is story detail.',
};

export default lesson;
