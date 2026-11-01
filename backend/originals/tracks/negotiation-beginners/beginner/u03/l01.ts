import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: "So what's your number?" */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"So what\'s your number?"',
  summary: 'The rent meeting starts well. Then Mr Adeyemi asks for her number, and Ada freezes. Two hours later Mrs Okon asks the same thing about the logo. This time Ada is ready to try.',
  minutes: 11,
  outcomes: [
    'See what happens when you can\'t say your number',
    'Know why the first number matters',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The freeze',
      beats: [
        { speaker: 'narrator', text: 'Saturday, noon. Ada opens well: she wants to stay, she\'s always paid on time. Mr Adeyemi nods. Then he asks.' },
        { speaker: 'narrator', text: '"So, what\'s your number?" Ada\'s mind goes blank. She says: "Um... whatever is fair?"' },
        { speaker: 'narrator', text: '"₦1,450,000 then," he says. "Final." Ada says she\'ll think about it. They agree to talk again next Saturday.' },
        { speaker: 'ada', text: 'I had ₦1,300,000 written on my card! I just couldn\'t say it.' },
        { speaker: 'narrator', text: 'Two hours later, Mrs Okon texts: "Ada, so what do you charge for the logo?"' },
        { speaker: 'tey', text: 'This chapter: why the first number matters, how to say it with a reason, ranges, silence, and scripts that don\'t feel awkward.' },
      ],
      choice: {
        prompt: 'How should Ada reply to Mrs Okon?',
        options: [
          { text: '"Thanks for asking! I\'ll send you a proper quote with options by tomorrow evening."', outcome: 'Good. She buys time to prepare, and promises something concrete.', best: true },
          { text: '"Whatever you think is fair."', outcome: 'The same freeze again, and it hands the first number to Mrs Okon.' },
          { text: '"₦20,000?"', outcome: 'A panicked number, far below what logos cost. It\'s hard to go up from there.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If you\'re not ready to name a number, say when you will: "I\'ll send you a quote by tomorrow."',
    },
  ],
  apply: {
    scenario: 'Two "what\'s your number?" moments.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened when Ada said "whatever is fair"?',
        options: [
          { text: 'He offered ₦1,300,000', why: 'He picked a number that suits him.' },
          { text: 'Mr Adeyemi named his own number: ₦1,450,000' },
          { text: 'Nothing changed', why: 'He took the chance to set the number.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s card said ₦1,300,000. He said ₦1,450,000. What\'s the gap, in naira?',
        answers: ['150000', '150,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good reply to "What\'s your number?", or a freeze?',
        groups: ['Good reply', 'Freeze'],
        items: [
          { text: '"₦1,300,000, because similar flats rent for that."', group: 0 },
          { text: '"Um... whatever is fair?"', group: 1 },
          { text: '"I\'ll send a quote by tomorrow."', group: 0 },
          { text: '"I don\'t know, you tell me."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I froze. I\'m just bad at this.',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'You\'re not bad, you\'re new. You prepared the number; you just haven\'t practised saying it. That\'s this chapter.' },
          { text: 'Yes, give up on the rent.', why: 'They meet again next Saturday.' },
          { text: 'Just accept ₦1,450,000.', why: 'That\'s her walk-away, not a good deal.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to what Ada should do.',
        pairs: [
          ['"What\'s your number?" (prepared)', 'Say it, with the reason'],
          ['"What do you charge?" (not prepared)', 'Say when you\'ll send a quote'],
          ['"₦1,450,000, final."', 'Say you\'ll think about it'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Buying time.',
        template: '"I\'ll send you a proper [[1]] by [[2]] evening."',
        blanks: [['quote'], ['tomorrow']],
        distractors: ['apology', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'Why was "I\'ll think about it" a good move after "₦1,450,000, final"?',
        options: [
          { text: 'It was rude', why: 'It was calm and honest.' },
          { text: 'It avoided a rushed yes and kept the talk open for next week' },
          { text: 'It accepted the deal', why: 'It didn\'t accept anything.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s reply to Mrs Okon is a mistake?',
        lines: [
          'Thanks for thinking of me!',
          'I\'ll send a quote with options.',
          'But honestly, pay whatever you like.',
          'You\'ll have it by tomorrow evening.',
        ],
        bug: 2,
        fix: 'Delete it: the quote will have her price.',
        explanation: 'It undoes the promise of a real quote.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter teaches.',
        lines: ['Why the first number matters', 'How to make an ask', 'Ranges', 'Reasons and silence', 'Scripts'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In how many days will Ada and Mr Adeyemi talk again?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When have you frozen when asked for a number? What could you have said instead?',
    starters: ['I froze when...', 'I could have said...'],
  },
  deepen: {
    title: '"Whatever is fair"',
    summary: 'Leaving the number to the other side feels polite, but it hands them the most powerful move in the negotiation: the first number. Lesson 2 shows why.',
  },
  notes: 'Fictional: Ada\'s goal ₦1,300,000; landlord anchors ₦1,450,000 "final"; second meeting next Saturday. Mrs Okon asks for a logo quote.',
};

export default lesson;
