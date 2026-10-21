import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Unit Challenge: the Lagos memo. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the Lagos memo',
  summary: 'Week 10 is back to 21%. Now Zanele writes the hardest ask yet: a one-page memo asking Mr Kamau to fund a Saturday pilot in Lagos. Everything from the course.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Write a one-page memo that gets a decision', 'Use the whole plain checklist together'],
  learn: [
    {
      kind: 'reading',
      title: 'The memo',
      html: '<p><strong>Subject:</strong> <em>Decision needed by 30 July: a 3-month Saturday pilot in Lagos?</em></p><p><strong>First line:</strong> I\'m asking you to approve a 3-month Saturday dispatch pilot in Lagos, starting 2 September.</p><p><strong>Why:</strong> Lagos holds 140 weekend orders a month until Monday. In Nairobi, Saturdays cut late deliveries from 34% to 21%.</p><p><strong>Cost:</strong> about the same as one Kenyan depot\'s Saturday crew, in local currency (Emeka\'s estimate attached).</p><p><strong>Main risk, and the plan:</strong> drivers. Week 9 showed what happens when two leave. Emeka will recruit two reserve drivers before we start.</p><p><strong>Next:</strong> If you say yes, Emeka and I will send a start plan by 15 August.</p><p>Zanele runs all 25 checks, reads it out loud, and sends it at 9 a.m., not 10 p.m.</p>',
    },
    {
      kind: 'story',
      title: 'The reply',
      beats: [
        { speaker: 'narrator', text: 'Mr Kamau replies at 9:20 a.m.: "Yes. Present it at the all-staff meeting next month. Five minutes."' },
        { speaker: 'zanele', text: 'Writing it was the easy part. Now I have to say it out loud.' },
        { speaker: 'tey', text: 'That\'s the course: write for the reader, plain words, point first, docs people skim, hard messages. Speaking is next.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the Lagos memo.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the memo\'s first line do?',
        options: [
          { text: 'States the ask: approve a 3-month Lagos pilot' },
          { text: 'Describes the history of Lagos', why: 'The ask comes first.' },
          { text: 'Thanks Mr Kamau for his time', why: 'The ask comes first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter does this part of the memo come from?',
        groups: ['Point first', 'Hard messages'],
        items: [
          { text: 'Decision and date in the subject', group: 0 },
          { text: 'Owning the week 9 risk honestly', group: 1 },
          { text: 'The ask in the first line', group: 0 },
          { text: 'Sent at 9 a.m., calm and checked', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Lagos weekend orders a month are held until Monday?',
        answers: ['140'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the memo part to its content.',
        pairs: [
          ['Why', '140 orders held; Nairobi fell to 21%'],
          ['Main risk', 'Drivers, with two reserves'],
          ['Next', 'A start plan by 15 August'],
          ['Subject', 'Decision needed by 30 July'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Why mention week 9 at all? It makes the pilot look shaky.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'He already knows about week 9, because I told him early. Naming the risk with a plan shows we learned from it.' },
          { text: 'You\'re right, delete it.', why: 'Hiding a known risk costs trust.' },
          { text: 'Add three paragraphs about it.', why: 'One line with the plan is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The course in one line.',
        template: 'Write for the [[1]], in plain words, with the [[2]] first.',
        blanks: [['reader'], ['point', 'ask']],
        distractors: ['writer', 'history'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line would fail the plain checklist?',
        lines: [
          'I\'m asking you to approve a 3-month Lagos pilot.',
          'Lagos holds 140 weekend orders a month until Monday.',
          'Going forward, we hope to leverage weekend synergies across geographies.',
          'Emeka will recruit two reserve drivers before we start.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Jargon that says nothing: fails the plain-words checks.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Mr Kamau ask Zanele to do next?',
        options: [
          { text: 'Present it at the all-staff meeting for five minutes' },
          { text: 'Write twelve more pages', why: 'He said yes and asked for a talk.' },
          { text: 'Wait until next year', why: 'He said yes.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time did Mr Kamau reply? (e.g. 8:15)',
        answers: ['9:20', '9.20', '920', '9:20 am', '9:20 a.m.'],
        placeholder: 'A time',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the course\'s five chapters.',
        lines: ['Nobody reads it', 'Plain words', 'Point first', 'Docs people skim', 'Hard messages'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a one-page memo asking for something you really need at work. Run the 25 checks. What did they catch?',
    starters: ['I asked for...', 'The checks caught...'],
  },
  deepen: {
    title: 'From writing to speaking',
    summary: 'Most of the plain checklist works out loud too: know your listener, point first, plain words, one ask. Speak Like a CEO picks up from here.',
  },
  notes: 'Course finale (fictional): Lagos pilot memo; week 10 back to 21%; Kamau approves at 9:20 a.m. and asks for a 5-minute all-staff talk. Lagos cost left as "Emeka\'s estimate" to avoid inventing a NGN figure.',
};

export default lesson;
