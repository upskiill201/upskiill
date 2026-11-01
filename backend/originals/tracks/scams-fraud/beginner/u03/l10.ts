import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: impersonation. Cliffhanger: Jayden's "easy £500". */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the "police" call to Nan',
  summary: 'Nan gets a call from a "detective": her bank card has been used by criminals, and a courier will collect it "for evidence". Use everything from Chapter 3. Then Jayden gets a message: "Easy £500. Just let some money pass through your account."',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Stop an impersonation scam for someone else', 'Apply the own-channel rule'],
  learn: [
    {
      kind: 'story',
      title: 'Nan, then Jayden',
      beats: [
        { speaker: 'narrator', text: 'Nan, on the phone to Grace, worried: "A detective rang. Someone\'s using my card. A courier\'s coming at four to collect it for evidence. He told me my PIN would help them too."' },
        { speaker: 'grace', text: 'Mum. Don\'t open the door. I\'m on my way.' },
        { speaker: 'narrator', text: 'That night, Jayden shows his mum a message from someone he half-knows: "Easy £500 bro. Just let some money go through your account for a day. No risk."' },
        { speaker: 'jayden', text: 'It\'s not a scam on ME though. I\'d be getting paid.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: fraud-team calls, safe accounts, phishing, codes, fake vs real messages and invoice fraud. Next: scams aimed at young people, where the victim can end up being treated as a criminal. First, Nan.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: Nan, 72. A "detective" says her card was used by criminals. A courier will collect the card "for evidence" at 4 p.m. He asks for her PIN "to help the investigation".',
    items: [
      {
        kind: 'mcq',
        prompt: 'Would real police ever collect your bank card or ask for your PIN?',
        options: [
          { text: 'Yes, for evidence', why: 'Real police never do this.' },
          { text: 'No, never' },
          { text: 'Only if they phone first', why: 'Never.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Find the recipe in the call.',
        pairs: [
          ['Authority', '"A detective"'],
          ['Fear', '"Criminals are using your card"'],
          ['Urgency', '"Courier at four"'],
          ['Secrecy', '"Don\'t tell your bank, they may be involved"'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Nan and Grace do.',
        lines: ['Don\'t open the door to the courier', 'Don\'t share the PIN', 'Call the bank on the card number from another phone', 'Report the call to the police on their official number'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real police, or fake?',
        groups: ['Real police might', 'Real police never'],
        items: [
          { text: 'Ask you to report a crime', group: 0 },
          { text: 'Send a courier for your card', group: 1 },
          { text: 'Ask for your PIN', group: 1 },
          { text: 'Ask you to move money', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Mum, the "detective" might ring back. What will you do?',
        prompt: 'Nan\'s best answer, after today?',
        options: [
          { text: 'Give him the card this time.', why: 'Never.' },
          { text: 'Ask him for his badge number.', why: 'Fake badge numbers are easy; hang up.' },
          { text: 'Hang up. Ring you or the bank on numbers I already have. Never give my card or PIN to anyone.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Nan\'s new note by the phone.',
        template: 'Police and banks never collect your [[1]] or ask for your [[2]].',
        blanks: [['card'], ['PIN']],
        distractors: ['post', 'name'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would put Nan at risk?',
        lines: [
          'Hang up and wait a few minutes.',
          'Call the bank on the number on her card.',
          'Call back the number the "detective" gave, to check.',
        ],
        bug: 2,
        fix: 'Use the official police number or the card number.',
        explanation: 'The detective\'s number goes to the scammers.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What time was the "courier" due, in 24-hour time? (e.g. 16:00)',
        answers: ['16:00', '1600', '16', '4pm', '4 p.m.'],
        placeholder: 'A time',
      },
      {
        kind: 'mcq',
        prompt: 'What kind of scam is "a courier will collect your card"?',
        options: [
          { text: 'A delivery service', why: 'It\'s fraud.' },
          { text: 'Courier fraud, a form of police or bank impersonation' },
          { text: 'Phishing by email', why: 'It\'s by phone and in person.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'It\'s not a scam on ME though. I\'d be getting paid.',
        prompt: 'What\'s worrying about Jayden\'s offer?',
        options: [
          { text: 'Nothing; free money', why: 'It\'s likely money laundering.' },
          { text: 'That £500 is too little', why: 'The amount isn\'t the problem.' },
          { text: 'Letting money pass through your account can make you part of a crime' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which rule from this chapter protected Nan?',
        options: [
          { text: 'Use your own channel, never theirs' },
          { text: 'Trust anyone with a title', why: 'Titles can be faked.' },
          { text: 'Check the caller ID', why: 'Caller ID can be faked.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What note would you put by an older relative\'s phone?',
    starters: ['My note would say...'],
  },
  notes: 'Chapter 3 challenge. Courier fraud: UK police/Take Five warnings. Nan narrated. Cliffhanger: money-mule recruitment message to Jayden → Ch4.',
};

export default lesson;
