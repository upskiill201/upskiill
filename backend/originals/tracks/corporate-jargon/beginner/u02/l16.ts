import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16. Reading: minutes people can actually use — what goes in formal minutes, and what doesn't. Brian is off sick. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Minutes people can actually use',
  summary: 'Thursday, 9:47 p.m. Brian texts: flu. Tomorrow\'s supplier review with Mr Kamau goes ahead without him, and Remi has to take the minutes. Mrs Achieng sends him one page of rules.',
  minutes: 13,
  outcomes: [
    'Know what goes in formal meeting minutes, and what stays out',
    'Decode "apologies", "attendees", "it was agreed" and "matters arising"',
    'Write minutes in neutral, factual language',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Mrs Achieng\'s rules for minutes',
      html: "<p><em>A note from Mrs Achieng to Remi, Thursday, 10:02 p.m.:</em></p><p>Remi. Brian tells me you are taking the minutes tomorrow. Good. Here is what Mr Kamau expects. Read it twice.</p><h3>1. Minutes are not a transcript</h3><p>Do not write down everything everyone says. Nobody will read it. Minutes record <strong>decisions</strong>, <strong>actions</strong> and <strong>the key points</strong> that led to them.</p><h3>2. The top of the page</h3><ul><li><strong>Meeting name, date, time.</strong></li><li><strong>Attendees:</strong> who was there.</li><li><strong>Apologies:</strong> who was invited but couldn't come and told us. Tomorrow: Brian Otieno.</li><li><strong>Minute-taker:</strong> you.</li></ul><h3>3. One section per agenda item</h3><p>For each item: one or two sentences on the discussion, then the decision, then the actions with an owner and a date. Use the agenda's numbers.</p><h3>4. Neutral words only</h3><p>Write what happened, not what you thought of it. <strong>\"It was agreed that...\"</strong>, <strong>\"Wanjiku reported that...\"</strong>, <strong>\"Mr Kamau asked whether...\"</strong>. Never \"Emeka rudely said\" or \"a great idea from Zanele\". Minutes are a record, not a review.</p><h3>5. Matters arising</h3><p>At the next meeting, the first item is often <strong>\"matters arising\"</strong>: updates on the actions from these minutes. So write actions clearly. You will be asked about them.</p><h3>6. Send them within a day</h3><p>Minutes that arrive a week later are history, not help. Send them to the organiser (me) first to check, then to everyone.</p><p>Good night. Mrs A.</p>",
    },
    {
      kind: 'check',
      question: 'Brian is invited but off sick, and he told Mrs Achieng. Where does his name go?',
      options: ['Attendees', 'Nowhere', 'Apologies'],
      answer: 2,
      explanation: 'Apologies: invited, couldn\'t come, and let the organiser know.',
    },
    {
      kind: 'compare',
      title: 'One agenda item, two ways',
      before: {
        label: 'Transcript',
        text: 'Emeka said the courier was late again and he was annoyed, then Zanele said something about drones, then Mr Kamau laughed, then Wanjiku talked about refunds for a long time, then they kind of agreed maybe.',
      },
      after: {
        label: 'Minutes',
        text: '2. Courier test. Emeka reported 3 late deliveries in the first week of the test. Wanjiku noted 2 refunds. It was agreed to continue the test for two more weeks. Action: Emeka to report results by 3 November.',
      },
      notes: [
        'Feelings and jokes are gone. Facts and numbers stay.',
        '"Kind of agreed maybe" became "It was agreed".',
        'The action has an owner and a date.',
      ],
    },
  ],
  apply: {
    scenario: 'Thursday night. Remi reads Mrs Achieng\'s note twice.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do minutes mainly record?',
        options: [
          { text: 'Everything everyone said', why: 'That\'s a transcript. Nobody reads it.' },
          { text: 'Decisions, actions and the key points behind them' },
          { text: 'Who was funniest', why: 'Zanele would win. It doesn\'t go in the minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Put each name in the right list.',
        groups: ['Attendees', 'Apologies'],
        items: [
          { text: 'Mr Kamau, who chaired the meeting', group: 0 },
          { text: 'Brian, off sick, told Mrs Achieng', group: 1 },
          { text: 'Wanjiku from Finance, who came', group: 0 },
          { text: 'Felix, invited, emailed to say he couldn\'t make it', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s practice minutes. Which line isn\'t neutral?',
        lines: [
          'Wanjiku reported 2 refunds in October.',
          'Emeka rudely interrupted Wanjiku.',
          'It was agreed to continue the courier test.',
        ],
        bug: 1,
        fix: 'Emeka noted that one refund was caused by the warehouse.',
        explanation: 'Minutes record what was said and decided, not how the minute-taker felt about it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the minutes words.',
        pairs: [
          ['Attendees', 'Who was there'],
          ['Apologies', 'Invited, couldn\'t come, said so'],
          ['Matters arising', 'Updates on last time\'s actions'],
          ['Minute-taker', 'Who wrote the minutes'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Neutral minutes say: "It was ___ that the test would continue." (one word)',
        answers: ['agreed', 'decided'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When should Remi send the minutes?',
        options: [
          { text: 'Within a day, to Mrs Achieng to check first' },
          { text: 'Next month, when he has time', why: 'By then they\'re history, not help.' },
          { text: 'Straight to the whole company', why: 'The organiser checks them first.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Can you put in the minutes that my drone idea was "visionary"?',
        prompt: 'What does Remi reply?',
        options: [
          { text: 'Done! Visionary it is.', why: 'Minutes stay neutral. Mrs Achieng would cross it out in red.' },
          { text: 'Minutes have to be neutral, sorry. But I\'ll note that you raised it, if it comes up.' },
          { text: 'No. It was a terrible idea.', why: 'Not neutral either, and not kind.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put one minutes section in order.',
        lines: ['2. Courier test', 'Emeka reported 3 late deliveries in week one.', 'It was agreed to continue the test for two weeks.', 'Action: Emeka to report results by 3 November.'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['To recap', 'Repeat the decisions'],
          ['Next steps', 'Who does what next'],
          ['Owner', 'The one person responsible'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a neutral minutes line.',
        tiles: ['Mr', 'Kamau', 'asked', 'whether', 'the', 'test', 'could', 'finish', 'sooner.'],
        distractors: ['angrily', 'brilliantly'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a meeting, class or group discussion you were in recently. Write one agenda item from it as minutes: discussion in one sentence, the decision, the action.',
    starters: ['Discussion: ...', 'Decision: ...', 'Action: ...'],
  },
  deepen: {
    title: 'A minutes template',
    summary: 'Save a simple template: meeting name, date, attendees, apologies, then one block per agenda item (discussion, decision, actions). Next time you\'re asked to take minutes, you\'re ready in seconds.',
  },
  notes: '"Apologies (for absence)" (Cambridge; standard in UK/Commonwealth minutes incl. Kenya, Nigeria), "matters arising" (standard agenda item), neutral reported speech in minutes (standard minute-taking guidance, e.g. governance/secretariat guides). Dates fictional; Chapter 2 is late October in story time.',
};

export default lesson;
