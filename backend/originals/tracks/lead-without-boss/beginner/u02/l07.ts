import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Side by side: asking Pauline, "my project" vs "your goal" (framing around the other person's goals). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Your goal, not my project',
  summary: 'Pauline in Marketing owns everything customers are told. She hasn\'t replied to Remi in a week. Her goal this quarter: raise Synergix\'s customer satisfaction score. Remi writes his ask twice.',
  minutes: 11,
  outcomes: [
    'Connect your ask to the other person\'s goals',
    'Use their words, not yours',
    'Make helping you look like progress for them',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi\'s message to Pauline',
      before: { label: 'My project', text: 'Hi Pauline, I\'m leading the refund project for Kamau and I need Marketing to rewrite the refund emails by next week. Can you prioritise this? Thanks!' },
      after: { label: 'Your goal', text: 'Hi Pauline, I saw your quarter goal is customer satisfaction. Refund complaints are the number one reason business customers mark us down. If we fix the wait, the message customers get matters a lot, and that\'s your area. Could we spend 20 minutes on it Tuesday?' },
      notes: [
        '"My project" asks her to drop her goals for his.',
        '"Your goal" shows the refund fix moves HER number.',
        'It respects that the customer message is her expertise.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Everyone already has a full plate of goals they're judged on. An ask that competes with those goals loses. An ask that <strong>moves</strong> one of their goals wins. That's Chapter 2's currencies in action: Pauline's is the satisfaction score (a task currency) and being the expert on customer messages (a position currency).</p><p>Before you ask, find out what the other person is measured on. It's often in a team plan, a slide from the last all-hands, or one question: \"What's your big goal this quarter?\"</p>",
    },
    {
      kind: 'check',
      question: 'Why did "Your goal" work better?',
      options: ['It showed how helping moves Pauline\'s own number', 'It was longer', 'It mentioned Kamau'],
      answer: 0,
      explanation: 'Her goals, her expertise, her number. The ask became her progress.',
    },
  ],
  apply: {
    scenario: 'Remi, writing to Pauline.',
    items: [
      {
        kind: 'sortGroups',
        prompt: '"My project" or "your goal"?',
        groups: ['My project', 'Your goal'],
        items: [
          { text: '"I need Marketing to..."', group: 0 },
          { text: '"Your quarter goal is satisfaction."', group: 1 },
          { text: '"Can you prioritise this?"', group: 0 },
          { text: '"That\'s your area."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best way to find someone\'s goals?',
        options: [
          { text: 'Guess from their job title', why: 'Two marketers can have very different goals.' },
          { text: 'Ask "what\'s your big goal this quarter?", or check their team plan' },
          { text: 'Ask their rival', why: 'Ask them.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'pauline',
        message: 'Okay, you have my attention. What do you need from me?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Your view on what customers should hear while we fix the wait. You know our customers\' voice better than anyone.' },
          { text: 'Just rewrite the emails by Friday.', why: 'Back to "my project".' },
          { text: 'Whatever you think.', why: 'Too vague. Be specific.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An ask that ___ their goal wins; one that competes with it loses. (one word)',
        answers: ['moves', 'helps', 'advances', 'Moves'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to the goal Remi can connect to.',
        pairs: [
          ['Pauline', 'Customer satisfaction score'],
          ['Felix', 'Fewer IT tickets'],
          ['Wanjiku', 'A clean audit'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention that customer messages are "your area"?',
        options: [
          { text: 'To flatter her', why: 'It\'s true, so it\'s respect, not flattery.' },
          { text: 'It respects her expertise, a position currency' },
          { text: 'To give her all the work', why: 'It invites her in on what she knows best.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s draft. Which line slips back to "my project"?',
        lines: [
          'Refund complaints are the top reason customers mark us down.',
          'I really need this done for my review with Kamau.',
          'Could we spend 20 minutes on it Tuesday?',
        ],
        bug: 1,
        fix: 'Fixing it could move your satisfaction score this quarter.',
        explanation: 'His review is his currency, not hers.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the "your goal" ask in order.',
        lines: ['Name their goal', 'Show how the problem hurts it', 'Show how helping moves it', 'Ask for something small'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make helping you look like [[1]] for [[2]].',
        blanks: [['progress'], ['them']],
        distractors: ['work', 'me'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s question.',
        tiles: ['What\'s', 'your', 'big', 'goal', 'this', 'quarter?'],
        distractors: ['my'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone whose help you need. What are they measured on? How could your ask move their number?',
    starters: ['They\'re measured on...', 'My ask could help by...'],
  },
  deepen: {
    title: 'Learn one goal',
    summary: 'Ask one colleague or classmate: "What\'s your big goal this term or quarter?" Write it down. You\'ll use it.',
  },
  notes: 'Framing requests around the other party\'s goals: Cohen & Bradford (currencies, understanding the other\'s world); Fisher & Ury (interests). Fictional figures and goals.',
};

export default lesson;
