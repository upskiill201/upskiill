import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: spot all five. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: spot all five',
  summary: 'Thursday\'s follow-up call. Arjun sends options, and Mr Pryce runs the playbook again, faster. Your job: spot each tactic and choose Arjun\'s answer. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Spot several tactics in one conversation', 'Choose a calm answer for each'],
  learn: [
    {
      kind: 'reading',
      title: 'Thursday\'s call',
      html: '<p>Arjun sends two options: <strong>A</strong>, the full app for £48,000; <strong>B</strong>, a core app (points, scan in shop, rewards) for £40,000 in 12 weeks, with extras in phase two.</p><p>Mr Pryce: <em>"£40,000? Hmm."</em> (Long silence.)</p><p><em>"Our finance director still says £30,000. And honestly, the other agencies are hungrier."</em></p><p><em>"Look, £32,000 for option B, decide today, and we\'ll sign tomorrow."</em></p><p>Ms Okafor-Lane: <em>"I really hope we can make this happen, Arjun."</em></p><p>Pryce: <em>"Oh, and the in-shop staff training is included, right?"</em></p><p>Arjun takes a breath, and goes to the balcony.</p>',
    },
    {
      kind: 'story',
      title: 'After the call',
      beats: [
        { speaker: 'arjun', text: 'I said: "Thank you. I\'ll come back on Monday with what option B can include at a price that works."' },
        { speaker: 'grace', text: 'And you didn\'t accept training for free. Proud of you.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: name the tactic, don\'t reward it. Next: "just one more thing", unreasonable requests.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: spot all five.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line from Thursday\'s call to the tactic.',
        pairs: [
          ['"£40,000? Hmm." (silence)', 'The flinch'],
          ['"Finance still says £30,000."', 'Higher authority'],
          ['"Other agencies are hungrier."', 'Competition'],
          ['"Decide today."', 'Deadline'],
          ['"Training is included, right?"', 'Nibble'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After "£40,000? Hmm." and a long silence, what should Arjun do?',
        options: [
          { text: 'Stay calm; maybe say once what option B includes' },
          { text: 'Drop to £35,000 to fill the silence', why: 'That rewards the flinch.' },
          { text: 'Ask "Are you OK?"', why: 'Just let the silence sit.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Option B is £40,000. Pryce offers £32,000. How far apart, in pounds?',
        answers: ['8000', '8,000', '£8,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Is £32,000 for option B above Arjun\'s walk-away?',
        options: [
          { text: 'Not for the full scope (£36,000); he\'d have to check what option B really costs' },
          { text: 'Yes, clearly', why: 'His walk-away was for the full app; B needs costing.' },
          { text: 'It doesn\'t matter', why: 'Walk-aways always matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'He said "decide today". Why didn\'t you?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'We tested Friday last time; this is the same move. The real driver is spring. Monday is still fast.' },
          { text: 'I forgot.', why: 'It was deliberate.' },
          { text: 'To annoy him.', why: 'To decide calmly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Rewarding the tactic, or not?',
        groups: ['Rewards it', 'Doesn\'t'],
        items: [
          { text: '"Sure, training\'s included!"', group: 0 },
          { text: '"Let me check what training involves."', group: 1 },
          { text: '"OK, £32,000 today."', group: 0 },
          { text: '"I\'ll come back on Monday."', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 in one line.',
        template: 'Name the [[1]]. Don\'t [[2]] it.',
        blanks: [['tactic'], ['reward']],
        distractors: ['client', 'copy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Joel\'s suggested reply rewards a tactic?',
        lines: [
          'Thank you both.',
          'Since other agencies are hungrier, we\'ll drop to £30,000.',
          'Let me check what staff training involves.',
          'I\'ll come back on Monday.',
        ],
        bug: 1,
        fix: 'Delete it.',
        explanation: 'It rewards the competition tactic with £10,000.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Option B takes how many weeks?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s response on the call.',
        lines: ['Breathe and go to the balcony', 'Thank them', 'Accept nothing today', 'Say what he\'ll send and when'],
      },
    ],
  },
  reflect: {
    prompt: 'Replay a recent pressured conversation. Write down each tactic and the calm answer you\'d give now.',
    starters: ['Tactic:...', 'My answer:...'],
  },
  deepen: {
    title: 'Same playbook, faster',
    summary: 'Hard negotiators repeat tactics that worked before. A tactic log means each repeat gets a faster, calmer answer, until they stop using it.',
  },
  notes: 'Chapter 2 challenge (fictional): option A £48,000 full app; option B core app £40,000/12 weeks; Pryce counters £32,000 "decide today" plus free staff training (nibble). Arjun replies Monday.',
};

export default lesson;
