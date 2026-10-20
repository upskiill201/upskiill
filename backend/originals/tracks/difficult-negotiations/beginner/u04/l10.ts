import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: walk or stay? */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: walk or stay?',
  summary: 'Friday. Mr Pryce: "£35,000. Final." Arjun asks about the other quotes, gets vague answers, and declines, politely. Then, on Monday, his phone rings. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Decide to walk away using your BATNA', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Friday and Monday',
      html: '<p><strong>Friday.</strong> Arjun asks: <em>"Happy to compare like for like. Do the other quotes include till integration and a 12-week launch?"</em> Pryce: <em>"Er, roughly. It varies."</em></p><p>Arjun sends his walk-away email: thanks, a clear decline at £35,000, the honest reason, an open door at around £40,000, and good luck with spring. He doesn\'t sign the Kinwell extension yet: Priya said Monday was fine for an answer.</p><p><strong>Monday, 9:15 a.m. UK.</strong> Ms Okafor-Lane calls. <em>"Honestly, there was one other quote, not three, and they need 20 weeks. That misses spring. Can we meet on Wednesday, with Mr Pryce, and find a way?"</em></p>',
    },
    {
      kind: 'story',
      title: 'After the call',
      beats: [
        { speaker: 'kavya', text: 'One quote. Twenty weeks. "Three agencies around £30,000."' },
        { speaker: 'grace', text: 'You walked away calmly, and you left the door open. That\'s why she called.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: power, BATNA, their alternatives, walking away well. Next: closing a hard deal fairly.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: walk or stay?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Arjun decline £35,000?',
        options: [
          { text: 'It didn\'t beat his BATNA: he\'d keep £10,000 vs £12,000 at Kinwell' },
          { text: 'Pryce was rude', why: 'He decided on the numbers.' },
          { text: 'To bluff', why: 'He was ready to take Kinwell.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks did the one other agency need?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks longer is that than Arjun\'s 12?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'What did "three quotes around £30,000" turn out to be?',
        groups: ['Claimed', 'Real'],
        items: [
          { text: 'Three agencies', group: 0 },
          { text: 'One agency', group: 1 },
          { text: 'Around £30,000 like for like', group: 0 },
          { text: 'Twenty weeks, missing spring', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'We nearly lost them by walking away!',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'We had Kinwell either way. Walking away at our limit, politely, is what brought them back.' },
          { text: 'You\'re right, never walk again.', why: 'The walk-away worked because it was real.' },
          { text: 'We should have been ruder.', why: 'The politeness kept the door open.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 4 lesson to what Arjun did.',
        pairs: [
          ['Three other quotes', 'Felt the squeeze, asked about BATNA'],
          ['Make your alternative stronger', 'Called Kinwell'],
          ['Their alternatives', 'Asked about like for like'],
          ['When to walk away', 'Compared £10,000 with £12,000'],
          ['Walk away well', 'Thanks, reason, open door'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Why she called.',
        template: 'He walked away [[1]], and left the door [[2]].',
        blanks: [['calmly', 'politely'], ['open']],
        distractors: ['angrily', 'locked'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Pryce\'s vague answer about the quotes suggest?',
        options: [
          { text: 'The quotes weren\'t really like for like' },
          { text: 'They were exactly the same', why: 'He couldn\'t say what they included.' },
          { text: 'Nothing', why: 'Vague answers are information.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s Friday plan would have hurt him?',
        lines: [
          'Ask what the other quotes include.',
          'Decline politely at £35,000.',
          'Tell Kinwell no, to stay available for Harlow & Finch.',
          'Leave the door open at around £40,000.',
        ],
        bug: 2,
        fix: 'Keep Kinwell open until Monday.',
        explanation: 'Turning down your BATNA throws away your power.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s Chapter 4 moves.',
        lines: ['Ask about his BATNA', 'Make Kinwell real', 'Set the walk-away', 'Test the quotes', 'Decline politely', 'Get the call back'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a deal or request in your life you should walk away from? Check it against your BATNA, and write your five-part walk-away.',
    starters: ['The deal:...', 'My BATNA:...'],
  },
  deepen: {
    title: 'The callback',
    summary: 'When you walk away calmly at a real limit and leave the door open, the other side often comes back, because they\'ve tested their own alternatives and found them worse.',
  },
  notes: 'Chapter 4 challenge (fictional): Pryce\'s "three quotes around £30,000" was one quote needing 20 weeks; Arjun declines £35,000 Friday, keeps Kinwell open; Ms Okafor-Lane calls Monday 9:15 a.m. to meet Wednesday.',
};

export default lesson;
