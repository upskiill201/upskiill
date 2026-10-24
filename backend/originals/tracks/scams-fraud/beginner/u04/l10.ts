import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: scams aimed at young people. Cliffhanger: Jayden's account hacked. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Femi\'s little brother',
  summary: 'Femi\'s brother Tobi, 19, has a "remote finance assistant" job offer and a cheap phone deal on a marketplace. Use everything from Chapter 4. Then Jayden\'s Instagram is hacked, and it\'s messaging all his followers about crypto.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Protect someone else from youth-targeted scams', 'Spot muling disguised as a job'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday',
      beats: [
        { speaker: 'femi', text: 'Tobi\'s got a "remote finance assistant" job. He receives client payments and forwards them, keeps 10%. And he\'s buying a phone off a marketplace for half price.' },
        { speaker: 'grace', text: 'Get him on a video call. Now.' },
        { speaker: 'narrator', text: 'That evening, Jayden\'s phone pings non-stop. His friends: "Bro why are you posting crypto stuff?" "Did you DM me about an investment??"' },
        { speaker: 'jayden', text: 'Mum. I can\'t log in. Someone\'s in my account and they\'re messaging everyone.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: muling, fake jobs, task scams, shopping and ticket scams, fake credit alerts, and talking to young people. The final chapter: protect, report and recover. First, Tobi.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: Tobi, 19, Manchester. Job: "remote finance assistant" — receive "client payments" into his own account, forward them, keep 10%. Also: a new phone for £350 (normally £800) from a marketplace seller, "bank transfer only".',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the "remote finance assistant" job really?',
        options: [
          { text: 'A finance internship', why: 'Real jobs don\'t move money through your account.' },
          { text: 'Money muling' },
          { text: 'A task scam', why: 'It\'s muling: money passes through.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Red flags in Tobi\'s two offers.',
        groups: ['Red flag', 'Not a red flag'],
        items: [
          { text: 'Forward payments, keep 10%', group: 0 },
          { text: '£350 for an £800 phone', group: 0 },
          { text: '"Bank transfer only"', group: 0 },
          { text: 'A job with an interview at a real office', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Tobi forwarded £2,000 and kept 10%, how much would he keep?',
        answers: ['200', '£200'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Tobi says the company has a website and a LinkedIn page.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Then it\'s legit.', why: 'Websites can be faked.' },
          { text: 'He should do one payment and see.', why: 'One payment is muling.' },
          { text: 'Both are easy to fake. Any job that moves money through his personal account is muling, whatever the website says.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each offer to the Chapter 4 scam.',
        pairs: [
          ['"Finance assistant"', 'Money mule recruitment'],
          ['Half-price phone, transfer only', 'Shopping scam'],
          ['Keep 10%', 'The bait'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Grace tells Tobi.',
        template: 'Real jobs don\'t move money through your [[1]] account. Real sellers don\'t insist on bank [[2]].',
        blanks: [['personal', 'own'], ['transfer']],
        distractors: ['savings', 'cards'],
      },
      {
        kind: 'findBug',
        prompt: 'Tobi\'s plan. Which line is still dangerous?',
        lines: [
          'Turn down the "finance assistant" job.',
          'Don\'t buy the phone by bank transfer.',
          'Keep the job contact "just in case" and do one payment if I\'m short of money.',
        ],
        bug: 2,
        fix: 'Block and report the recruiter.',
        explanation: 'One payment is enough to become a mule.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tobi\'s steps.',
        lines: ['Turn down the job', 'Screenshot the messages', 'Block and report the recruiter', 'Buy phones only from protected sellers'],
      },
      {
        kind: 'mcq',
        prompt: 'Jayden\'s hacked account is messaging his friends about crypto. What kind of scam is that?',
        options: [
          { text: 'A real investment tip', why: 'It\'s a hacked account.' },
          { text: 'Using a trusted, hacked account to spread an investment scam' },
          { text: 'Phishing by post', why: 'It\'s a hacked social account.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The phone is normally £800 and offered at £350. How much "discount" is that, in pounds?',
        answers: ['450', '£450'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do scammers hack young people\'s social accounts?',
        options: [
          { text: 'For fun', why: 'To exploit trust.' },
          { text: 'To delete photos', why: 'To exploit trust.' },
          { text: 'Friends trust messages from them' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If one of your accounts was hacked tonight, do you know the first three things you\'d do?',
    starters: ['First...', 'Then...', 'Then...'],
  },
  notes: 'Chapter 4 challenge. Femi per CAST; Tobi narrated. 10% of 2,000 = 200. Cliffhanger: Jayden\'s Instagram hacked → Ch5 protect, report, recover.',
};

export default lesson;
