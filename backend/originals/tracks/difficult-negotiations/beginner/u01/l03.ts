import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Before/After: hard on purpose vs hard by accident. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Hard on purpose, or by accident?',
  summary: 'Kavya is sure Mr Pryce is a villain. Grace asks a different question: what is his job, and how is he measured? Some negotiations are hard by design. Others are just hard.',
  minutes: 12,
  outcomes: [
    'Tell deliberate tactics from real constraints',
    'Understand what the other side is measured on',
    'Choose a different response for each',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to read Mr Pryce',
      before: {
        label: '"He\'s a villain"',
        text: 'He\'s trying to rob us.\n£28,000 is an insult.\nHe doesn\'t care about the app.\nSo we fight him, or we give in.',
      },
      after: {
        label: '"He\'s doing his job"',
        text: 'Procurement managers are often measured on savings: how far below the first quote they land.\nThe low offer and the deadline are part of that job.\nMs Okafor-Lane, the digital director, wants the app live before the spring sale.\nSo: answer the tactics calmly, and talk to the person who needs the app.',
      },
      notes: [
        'Hard on purpose: tactics like extreme offers and deadlines, used to move you.',
        'Hard by accident: real limits like a fixed budget, a boss, or a launch date.',
        'Usually both. Answer tactics calmly; solve constraints together.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask how the other side is measured. It explains most hard behaviour, and shows you how to help them say yes.',
    },
  ],
  apply: {
    scenario: 'Reading Mr Pryce.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Hard on purpose (a tactic) or a real constraint?',
        groups: ['Tactic', 'Real constraint'],
        items: [
          { text: 'An extreme first offer', group: 0 },
          { text: 'A launch before the spring sale', group: 1 },
          { text: '"Answer by Wednesday" with no reason', group: 0 },
          { text: 'A budget set by the board', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What are procurement managers often measured on?',
        options: [
          { text: 'Savings: how far below the first quote they land' },
          { text: 'How happy suppliers are', why: 'Usually it\'s savings.' },
          { text: 'How fast the app ships', why: 'That\'s more the digital director\'s concern.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to what they care about.',
        pairs: [
          ['Mr Pryce', 'Savings against the quote'],
          ['Ms Okafor-Lane', 'The app live before the sale'],
          ['Arjun', 'A fair contract that pays the team'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'He\'s clearly a villain. Why be nice to him?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'He\'s doing the job he\'s paid for. Be polite to him, firm on the numbers, and find the person who needs the app.' },
          { text: 'You\'re right, attack him.', why: 'Attacking his character gets you nowhere.' },
          { text: 'Be nice and accept his price.', why: 'Polite and firm, not polite and giving in.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question to ask.',
        template: 'How is the other side [[1]]? It explains most [[2]] behaviour.',
        blanks: [['measured'], ['hard']],
        distractors: ['dressed', 'kind'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Ms Okafor-Lane be a key person to talk to?',
        options: [
          { text: 'She needs the app to work and to launch on time, not just to be cheap' },
          { text: 'She\'s nicer', why: 'Her interests differ, which helps the deal.' },
          { text: 'She isn\'t key', why: 'Her launch date is a real constraint.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s notes is the villain story?',
        lines: [
          'Pryce is measured on savings.',
          'The spring sale is a real deadline.',
          'Pryce wants to destroy small agencies.',
          'Ms Okafor-Lane owns the app.',
        ],
        bug: 2,
        fix: 'Pryce is pushing for a low price; that\'s his job.',
        explanation: 'Villain stories make you react, not think.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun\'s quote was for how many weeks of work?',
        answers: ['16', 'sixteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to read a hard negotiator.',
        lines: ['Notice the hard behaviour', 'Ask how they\'re measured', 'Separate tactics from real limits', 'Answer tactics calmly; solve limits together'],
      },
      {
        kind: 'sortGroups',
        prompt: 'How should Arjun answer this?',
        groups: ['Answer calmly', 'Solve together'],
        items: [
          { text: 'A fake deadline', group: 0 },
          { text: 'A fixed launch date', group: 1 },
          { text: '"Our last supplier did it for less"', group: 0 },
          { text: 'A budget limit for this year', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone who negotiates hard with you. How are they measured? Does that change how you see them?',
    starters: ['They\'re measured on...', 'That means...'],
  },
  deepen: {
    title: 'Incentives',
    summary: 'People often behave the way they\'re rewarded. Procurement teams, sales teams and landlords all have targets. Knowing the target shows you which deals they can say yes to.',
  },
  notes: 'Procurement often measured on savings vs initial quote (common practice in purchasing). Fictional: Ms Okafor-Lane, digital director, needs launch before the spring sale.',
};

export default lesson;
