import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: the Friday-night request. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the Friday-night request',
  summary: 'Friday, 9 p.m. UK, 1:30 a.m. in Bengaluru. Ms Okafor-Lane: "The board meets Monday at 9. Can we show them a working app with our branding?" Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Answer an urgent, unreasonable request well', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The message',
      html: '<p><em>"Arjun, so sorry for the late message. Our board meets Monday at 9 a.m. and the CEO wants to see the app working, with our branding, before approving the budget. Is that possible?"</em></p><p>A working, branded app by Monday morning is about two weeks of work. And it isn\'t signed yet.</p><p>Arjun goes to the balcony, then replies on Saturday morning:</p><p><em>"Thanks for the heads-up, and good luck with the board. A working app by Monday isn\'t possible; it\'s two weeks of work. What I can do: a clickable demo of the core flow (points, scan, reward) in Harlow &amp; Finch colours, ready by Sunday evening. It\'s a day and a half of work, £675 at our change rate, credited against phase one if you go ahead. Would that help the board?"</em></p><p>She replies in ten minutes: <em>"Perfect. Yes please."</em></p>',
    },
    {
      kind: 'story',
      title: 'Monday, 10 a.m. UK',
      beats: [
        { speaker: 'narrator', text: 'A message from Ms Okafor-Lane: "The board loved it. Budget approved. Pryce will call you about the price."' },
        { speaker: 'kavya', text: 'We said no, and they said yes.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: yes-if, the positive no, trade-offs, change control. Next: power, alternatives and walking away.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: the Friday-night request.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Arjun say no to?',
        options: [
          { text: 'Helping with the board meeting', why: 'He offered a demo to help.' },
          { text: 'The whole project', why: 'He offered a path.' },
          { text: 'A full working app by Monday' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A day and a half at £450 a day. Cost, in pounds?',
        answers: ['675', '£675'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of Arjun\'s reply to the positive no.',
        pairs: [
          ['"Good luck with the board"', 'Yes to her interest'],
          ['"A working app by Monday isn\'t possible"', 'Clear no'],
          ['"A clickable demo by Sunday"', 'Yes? An offer'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Arjun\'s reply, or not?',
        groups: ['In the reply', 'Not in it'],
        items: [
          { text: 'A priced alternative', group: 0 },
          { text: 'An all-night free build', group: 1 },
          { text: 'Credit against phase one', group: 0 },
          { text: 'A complaint about the late message', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Why charge £675? She\'s about to sign. Do it free.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'You\'re right, free.', why: 'Unsigned work for free is a risk.' },
          { text: 'It\'s real work, and it\'s credited against phase one if they sign. If they don\'t, we\'re still paid.' },
          { text: 'Charge £5,000.', why: 'Use the agreed rate.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 in one line.',
        template: 'Yes, [[1]]: show the cost, offer a [[2]].',
        blanks: [['if'], ['path', 'choice', 'option']],
        distractors: ['never', 'threat'],
      },
      {
        kind: 'mcq',
        prompt: 'Why wait until Saturday morning to reply?',
        options: [
          { text: 'To punish her', why: 'It was about replying well.' },
          { text: 'He forgot', why: 'It was a balcony move.' },
          { text: 'It was 1:30 a.m. for him; a rested reply was better than a panicked one' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line would have broken Arjun\'s change process?',
        lines: [
          'A clickable demo by Sunday evening.',
          '£675 at our change rate.',
          'We\'ll start now and sort out approval later.',
          'Credited against phase one if you go ahead.',
        ],
        bug: 2,
        fix: 'We\'ll start as soon as you confirm.',
        explanation: 'Nothing starts before approval.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A full working app would take how many weeks?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s reply.',
        lines: ['Thank her and wish her luck', 'Say what isn\'t possible and why', 'Offer what is', 'Price it and credit it', 'Ask if it helps'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of an urgent request you got late at night. Write a positive no with a priced alternative.',
    starters: ['Thanks for...', 'What I can do is...'],
  },
  deepen: {
    title: 'Urgent isn\'t the same as important',
    summary: 'Late-night urgency is a pressure in itself. A rested, structured reply a few hours later usually serves both sides better than an instant yes at 1:30 a.m.',
  },
  notes: 'Chapter 3 challenge (fictional): board demo request Friday 9 p.m. UK; reply Saturday; clickable demo 1.5 days × £450 = £675, credited against phase one; board approves budget Monday.',
};

export default lesson;
