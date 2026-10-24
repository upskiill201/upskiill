import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: how a fake trading platform works. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Anatomy of a fake platform',
  summary: 'Femi walks Grace through exactly what happened, from the first Instagram post to the fee. It turns out every step was planned. Step by step, the fake trading platform playbook.',
  minutes: 11,
  outcomes: [
    'Explain each stage of a fake trading platform scam',
    'Spot the stage you\'re at',
    'Know when to get out',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The playbook',
      steps: [
        { title: '1. The lifestyle bait', body: 'Social media posts: cars, holidays, "I quit my job at 24". A "mentor" offering free tips. Femi followed him for weeks before messaging.' },
        { title: '2. The friendly chat', body: 'The mentor replies personally. Kind, encouraging, a bit flattering: "You\'ve got good instincts."' },
        { title: '3. The small start', body: '"Start small, just £250 to £500." He\'s sent a link to a professional-looking platform and helped to sign up.' },
        { title: '4. The fake gains', body: 'The dashboard shows big profits fast. Sometimes a small early withdrawal is allowed, to build trust.' },
        { title: '5. The push for more', body: '"This is the moment. Put in more before the next big move." Some victims are encouraged to borrow or use savings.' },
        { title: '6. The wall', body: 'Withdrawal blocked: a fee, a tax, a "verification". Pay it, and there\'s another.' },
        { title: '7. The vanishing', body: 'The mentor goes quiet or turns nasty. The platform disappears or changes name. Then, often, a "recovery service" gets in touch.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Lifestyle bait, friendly chat, small start, fake gains, push for more, the wall, the vanishing. The best moment to get out is before step 3.',
    },
  ],
  apply: {
    scenario: 'The playbook.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the playbook.',
        lines: ['Lifestyle bait', 'Friendly chat', 'Small start', 'Fake gains', 'Push for more', 'The wall', 'The vanishing'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each stage to Femi\'s experience.',
        pairs: [
          ['Lifestyle bait', 'Posts of cars and holidays'],
          ['Friendly chat', '"You\'ve got good instincts"'],
          ['Fake gains', '£500 shown as £2,600'],
          ['The wall', '£400 "tax release fee"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do some fake platforms allow a small early withdrawal?',
        options: [
          { text: 'Because they\'re real', why: 'It\'s bait.' },
          { text: 'To build trust so you put in much more' },
          { text: 'By mistake', why: 'It\'s deliberate.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Early stage, or late stage?',
        groups: ['Early', 'Late'],
        items: [
          { text: 'Free tips from a "mentor"', group: 0 },
          { text: 'Withdrawal blocked by a fee', group: 1 },
          { text: '"Start small"', group: 0 },
          { text: 'Mentor goes quiet', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'He seemed so genuine. He asked about my mum.',
        prompt: 'Grace\'s kindest reply?',
        options: [
          { text: 'That\'s his job. Being warm is part of the script. It doesn\'t mean you were daft; it means he\'s practised.' },
          { text: 'You should have known.', why: 'Blame doesn\'t help.' },
          { text: 'Maybe he is genuine.', why: 'The fee wall says otherwise.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The best exit point.',
        template: 'The best moment to get out is before the [[1]] [[2]].',
        blanks: [['small'], ['start']],
        distractors: ['big', 'wall'],
      },
      {
        kind: 'findBug',
        prompt: 'Which "mentor" message is the push for more?',
        lines: [
          '"Here\'s a free tip for today."',
          '"Great start, you\'re a natural."',
          '"Borrow if you need to, this move won\'t come again."',
        ],
        bug: 2,
        fix: 'Never borrow to invest on someone\'s urging.',
        explanation: 'Pushing you to borrow or use savings is stage 5.',
      },
      {
        kind: 'mcq',
        prompt: 'What often happens after the vanishing?',
        options: [
          { text: 'A full refund arrives', why: 'Usually not; beware recovery scams.' },
          { text: 'A "recovery service" gets in touch, offering help for a fee' },
          { text: 'The mentor apologises', why: 'They vanish or rebrand.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many stages are in the playbook?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Where did Femi first meet the "mentor"?',
        options: [
          { text: 'At a bank', why: 'Social media.' },
          { text: 'Through Kinwell', why: 'Social media.' },
          { text: 'On social media' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen "mentor" or "lifestyle" posts selling trading or crypto? Which stage were they at?',
    starters: ['I\'ve seen...', 'It looked like stage...'],
  },
  deepen: {
    title: 'Platforms that rebrand',
    summary: 'Fake platforms often reappear under new names and web addresses after complaints. Searching the name plus "scam" or "review" can help, but the strongest check is the regulator\'s register and warning list.',
  },
  notes: 'Playbook consistent with FCA and Action Fraud descriptions of fake investment platforms and social-media "finfluencer" scams. Femi per CAST.',
};

export default lesson;
