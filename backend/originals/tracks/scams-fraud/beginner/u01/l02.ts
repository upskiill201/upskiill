import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Step-by-step: the scam recipe. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The scam recipe',
  summary: 'That evening Grace takes the "Hi Mum" text apart like a case history. Almost every scam uses the same four ingredients. Step by step, here they are.',
  minutes: 11,
  outcomes: [
    'Name the four ingredients of most scams',
    'Spot each one in a real message',
    'See why they work together',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four ingredients',
      steps: [
        { title: '1. Urgency', body: '"Before 12." "Your account will be closed today." "Only 5 places left." Time pressure stops you thinking and checking. In the "Hi Mum" text: "before 12 or they cut me off".' },
        { title: '2. Authority or familiarity', body: 'Pretending to be someone you trust: family, your bank, the police, the tax office, your boss, a delivery company. In the text: "Mum", from "Jayden".' },
        { title: '3. Emotion', body: 'Fear, love, excitement, guilt or shame. A strong feeling switches off careful thinking. In the text: worry for her son.' },
        { title: '4. Secrecy or isolation', body: '"Can\'t call." "Don\'t tell the bank staff, they may be involved." "Keep this between us." Anything that stops you talking to someone who could warn you. In the text: "mic\'s broken".' },
        { title: 'How they work together', body: 'Urgency gives you no time. Authority gives you a reason to trust. Emotion pushes you. Secrecy stops anyone stopping you. Spot even one, and you should slow down.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Urgency, authority, emotion, secrecy. If a message has even one, slow down. If it has all four, it\'s almost certainly a scam.',
    },
  ],
  apply: {
    scenario: 'The recipe.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each ingredient to its line in the "Hi Mum" text.',
        pairs: [
          ['Urgency', '"Before 12 or they cut me off"'],
          ['Authority or familiarity', '"Hi Mum"'],
          ['Emotion', 'Worry for her son'],
          ['Secrecy', '"Can\'t call, mic\'s broken"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which ingredient is this?',
        groups: ['Urgency', 'Secrecy'],
        items: [
          { text: '"Your account closes in 1 hour"', group: 0 },
          { text: '"Don\'t tell anyone at the branch"', group: 1 },
          { text: '"Only 3 left at this price"', group: 0 },
          { text: '"Keep this between us"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does secrecy matter so much to a scammer?',
        options: [
          { text: 'It\'s polite', why: 'It isolates you.' },
          { text: 'It stops you talking to someone who could warn you' },
          { text: 'It saves time', why: 'It isolates you.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Surely only old people fall for this stuff?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'I nearly did, this morning. It doesn\'t target age, it targets feelings and time pressure.' },
          { text: 'Yes, only old people.', why: 'Scams target everyone.' },
          { text: 'Only careless people.', why: 'She\'s careful and nearly paid.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four ingredients.',
        template: 'Urgency, [[1]], emotion, [[2]].',
        blanks: [['authority', 'familiarity'], ['secrecy', 'isolation']],
        distractors: ['honesty', 'patience'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this "bank" email has NO scam ingredient?',
        lines: [
          '"Your account is locked. Act within 2 hours."',
          '"Do not discuss this with branch staff."',
          '"You can call the number on the back of your card."',
        ],
        bug: 2,
        fix: 'That\'s the one safe instruction.',
        explanation: 'Calling the number on your card uses a channel you already trust.',
      },
      {
        kind: 'mcq',
        prompt: 'A message has just one ingredient: urgency. What should you do?',
        options: [
          { text: 'Act fast, there\'s only one sign', why: 'One sign is enough to slow down.' },
          { text: 'Slow down and check before acting' },
          { text: 'Ignore all urgent messages forever', why: 'Slow down and check; some are real.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how the ingredients work together.',
        lines: ['Urgency: no time', 'Authority: a reason to trust', 'Emotion: a push', 'Secrecy: nobody to stop you'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many ingredients are in the scam recipe?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which feeling does a fake "parcel held, pay £1.99" text mainly use?',
        options: [
          { text: 'Love', why: 'It uses worry and a small amount.' },
          { text: 'Guilt', why: 'It\'s about a parcel and a small fee.' },
          { text: 'Mild worry, and the small amount feels harmless' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a pushy message you\'ve received. Which of the four ingredients did it use?',
    starters: ['The message...', 'It used...'],
  },
  deepen: {
    title: 'Social engineering',
    summary: 'Security experts call manipulating people, rather than hacking computers, "social engineering". Most fraud starts this way: it\'s usually easier to trick a person than to break a system.',
  },
  notes: 'Four-ingredient framing consistent with UK Finance / Take Five guidance and common fraud-prevention teaching. Femi per CAST.',
};

export default lesson;
