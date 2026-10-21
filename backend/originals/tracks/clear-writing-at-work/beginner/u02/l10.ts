import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: the notice goes out. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the notice goes out',
  summary: 'Brian approves the plain notice, with one condition: "Add something about strategy." Zanele finds a way to keep it plain and keep Brian happy. Then the drivers reply. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Keep a message plain under pressure to add jargon', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'reading',
      title: 'One condition',
      html: '<p>Brian: <em>"I like it. But add something strategic, so they understand the big picture."</em></p><p>Zanele adds one plain line at the end: <em>"Why: Saturday deliveries mean customers wait less. So far in April, late deliveries at Nairobi fell from 34% to 21%. Thank you for making that happen."</em></p><p>Brian reads it. <em>"That\'s... actually the strategy. Send it."</em></p><p><strong>Results:</strong> 31 of 40 drivers sign up for May Saturdays within two days. Mrs Mwangi gets three questions, not the usual thirty. Baraka replies to the group: <em>"First notice I understood without asking my cousin."</em></p>',
    },
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'brian', text: 'Thirty-one sign-ups. Maybe plain is the new strategic.' },
        { speaker: 'achieng', text: 'It always was. Next: you need two answers by Friday, and both asks are buried in your drafts.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: know the reader, plain words, active voice, short sentences, no idioms. Next: the point first.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: the notice.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many of the 40 drivers signed up within two days?',
        answers: ['31', 'thirty-one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How did Zanele add "strategy" without jargon?',
        options: [
          { text: 'One plain line on why: customers wait less, late deliveries fell from 34% to 21%' },
          { text: 'She added "synergies"', why: 'She kept it plain.' },
          { text: 'She refused', why: 'She found a plain way.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 skill is this?',
        groups: ['Plain words', 'Know the reader'],
        items: [
          { text: '"Opens 7 a.m. to 3 p.m."', group: 0 },
          { text: 'Written for phones', group: 1 },
          { text: '"Customers wait less"', group: 0 },
          { text: 'No idioms for second-language readers', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result to what it shows.',
        pairs: [
          ['31 of 40 signed up', 'Drivers understood and acted'],
          ['3 questions, not 30', 'The notice answered them'],
          ['Baraka\'s message', 'It was readable first time'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Next time, can you check my emails to the board too?',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Happily. I\'ll send you my checklist too; it takes thirty seconds.' },
          { text: 'No, write them yourself.', why: 'Helping and teaching is better.' },
          { text: 'Only if you stop saying synergies.', why: 'Kind, not cutting.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The "why" line.',
        template: 'Saturday deliveries mean [[1]] wait [[2]].',
        blanks: [['customers'], ['less']],
        distractors: ['drivers', 'more'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions did Mrs Mwangi get after the notice?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this version of the "why" would undo the notice?',
        lines: [
          'Why: Saturday deliveries mean customers wait less.',
          'Late deliveries at Nairobi fell from 34% to 21%.',
          'This synergises our omnichannel value proposition.',
          'Thank you for making that happen.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Jargon creeps back in.',
      },
      {
        kind: 'mcq',
        prompt: 'What percentage of the drivers signed up? (31 of 40)',
        options: [
          { text: 'About 78%' },
          { text: 'About 31%', why: '31 of 40, not 31 of 100.' },
          { text: '100%', why: '9 didn\'t sign up.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Zanele handled Brian\'s condition.',
        lines: ['Hear the request', 'Find what he really wants', 'Write it in one plain line', 'Show him', 'Send'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone who wants more jargon in your writing. How could you give them what they really want, plainly?',
    starters: ['They want...', 'Plainly:...'],
  },
  deepen: {
    title: 'Plain is persuasive',
    summary: 'When people see the results of plain writing (sign-ups, fewer questions, faster replies) the argument usually ends. Track what changes when you write plainly.',
  },
  notes: 'Chapter 2 challenge (fictional): 31 of 40 drivers (~78%) sign up; 3 questions vs ~30 usual; April-to-date late deliveries 34% → 21%.',
};

export default lesson;
