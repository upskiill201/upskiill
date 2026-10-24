import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: the scam text vs a real text from Jayden. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Spot the real Jayden',
  summary: 'Grace lays the scam text beside a real message Jayden sent last month asking for money. Side by side, the differences jump out.',
  minutes: 11,
  outcomes: [
    'Compare a scam message with a genuine one',
    'Use the differences as quick checks',
    'Agree a family safe word',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two requests for money',
      before: {
        label: 'The scam text',
        text: 'From: an unknown number\n"Hi Mum, dropped my phone, new number"\n"Can\'t call, mic\'s broken"\n"£480 before 12 or they cut me off"\nPay to: an account in a stranger\'s name\nTone: rushed, a bit generic',
      },
      after: {
        label: 'Jayden\'s real text last month',
        text: 'From: his saved number\n"Mum can I borrow £20 for the cinema, I\'ll do the bins all week"\nHappy to call: he rang ten minutes later anyway\nNo deadline\nPay to: his own account, which she knows\nTone: very him, including the bins bribe',
      },
      notes: [
        'New number + can\'t call + deadline + stranger\'s account = four red flags in one text.',
        'Real family requests come from known numbers, allow a call, and pay into accounts you recognise.',
        'Scammers often say the account is "a friend\'s" or "my new bank". That\'s a strong sign.',
        'Grace and Jayden agree a family safe word. Anyone asking for money by message has to use it.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Known number, happy to talk, no deadline, a familiar account: that\'s what real looks like. A family safe word adds one more check scammers can\'t pass.',
    },
  ],
  apply: {
    scenario: 'Two requests.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Scam text, or real text?',
        groups: ['Scam text', 'Real text'],
        items: [
          { text: 'Unknown number', group: 0 },
          { text: 'Happy to call', group: 1 },
          { text: 'Pay into a stranger\'s account', group: 0 },
          { text: 'No deadline', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "pay into a friend\'s account" a strong warning sign?',
        options: [
          { text: 'Friends are untrustworthy', why: 'It\'s about an unknown account.' },
          { text: 'The money goes to someone you can\'t check' },
          { text: 'It isn\'t a sign', why: 'It\'s a classic scam line.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each red flag to its real-text opposite.',
        pairs: [
          ['Unknown number', 'Saved number'],
          ['"Can\'t call"', 'Happy to call'],
          ['"Before 12"', 'No deadline'],
          ['Stranger\'s account', 'His own account'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'What should our safe word be?',
        prompt: 'Grace\'s best answer?',
        options: [
          { text: 'Your birthday.', why: 'Easy to find online.' },
          { text: 'Let\'s post it in the family group.', why: 'Then it\'s not safe.' },
          { text: 'Something we\'d never post online. Not the dog\'s name, not your birthday. Let\'s pick it offline.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'What real looks like.',
        template: 'Known [[1]], happy to [[2]], no deadline, a familiar account.',
        blanks: [['number'], ['talk', 'call']],
        distractors: ['link', 'pay'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much did the real Jayden ask to borrow, in pounds?',
        answers: ['20', '£20'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which safe word choice is weak?',
        lines: [
          'A random phrase agreed in person.',
          'Never written in any message.',
          'The name of the family dog, which is all over Instagram.',
        ],
        bug: 2,
        fix: 'Pick something nobody could find online.',
        explanation: 'Anything on social media can be found by scammers.',
      },
      {
        kind: 'mcq',
        prompt: 'How many red flags were in the scam text?',
        options: [
          { text: 'None', why: 'Several.' },
          { text: 'At least four' },
          { text: 'One', why: 'At least four.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Grace\'s check when any family member asks for money by message.',
        lines: ['Is it from their saved number?', 'Call them', 'Ask for the safe word', 'Pay only to an account you recognise'],
      },
      {
        kind: 'mcq',
        prompt: 'What made the real text feel "very him"?',
        options: [
          { text: 'The deadline', why: 'There wasn\'t one.' },
          { text: 'A new number', why: 'It was his saved number.' },
          { text: 'The bins bribe: a detail only Jayden would offer' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Would a family safe word work in your family? Who would you agree it with?',
    starters: ['It would / wouldn\'t work because...', 'I\'d agree it with...'],
  },
  deepen: {
    title: 'Voice cloning',
    summary: 'Some scammers now use AI to imitate voices from short clips online. A safe word helps here too: a cloned voice can sound right, but it won\'t know the word.',
  },
  notes: 'Safe word advice: widely given by UK police and consumer groups. AI voice cloning scams reported by multiple agencies.',
};

export default lesson;
