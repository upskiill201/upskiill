import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Step-by-step: go to the balcony. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Go to the balcony',
  summary: 'Grace calls it "stepping back from the bed". William Ury calls it going to the balcony: watching the negotiation from above before you act. Five steps Arjun can use in any heated moment.',
  minutes: 12,
  outcomes: [
    'Pause before reacting in a hard negotiation',
    'Name your feeling and the tactic',
    'Respond to your goal, not to the pressure',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to the balcony',
      steps: [
        { title: '1. Pause', body: 'Don\'t reply yet. "Let me think about this and come back to you" is always allowed. Wednesday is two days away.' },
        { title: '2. Name the feeling', body: 'Arjun: "I\'m angry, and a bit scared of losing them." Naming it helps it settle.' },
        { title: '3. Name what they\'re doing', body: 'A very low offer, a deadline, and a comparison. Each is a known move, not a verdict on his work.' },
        { title: '4. Remember your goal', body: 'A fair contract that pays the team, with a client he wants to keep. Not "winning the email".' },
        { title: '5. Respond, don\'t react', body: 'A calm reply that moves towards the goal: "Thanks. Could we have a call so I understand your needs and budget?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Pause, name the feeling, name the tactic, remember your goal, then respond.',
    },
  ],
  apply: {
    scenario: 'Up on the balcony.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five balcony steps.',
        lines: ['Pause', 'Name the feeling', 'Name what they\'re doing', 'Remember your goal', 'Respond, don\'t react'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Reacting or responding?',
        groups: ['Reacting', 'Responding'],
        items: [
          { text: 'Replying within two minutes in anger', group: 0 },
          { text: 'Asking for a call to understand their needs', group: 1 },
          { text: 'Accepting to avoid conflict', group: 0 },
          { text: 'Checking your walk-away first', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "go to the balcony" mean?',
        options: [
          { text: 'Leave the meeting', why: 'It\'s a mental step, not a physical one.' },
          { text: 'Shout louder', why: 'The opposite.' },
          { text: 'Step back mentally and watch the negotiation calmly before acting' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Arjun\'s version.',
        pairs: [
          ['Pause', '"Let me come back to you."'],
          ['Name the feeling', '"I\'m angry and a bit scared."'],
          ['Name the tactic', '"Low offer, deadline, comparison."'],
          ['Remember the goal', '"A fair contract and a client I keep."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Naming feelings is soft. We need to be tough.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'You\'re right, ignore feelings.', why: 'Ignored feelings leak out.' },
          { text: 'Naming it is what lets you stay tough. Unnamed anger makes you send the email you regret.' },
          { text: 'Then cry about it.', why: 'Name it, then move on.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The last step.',
        template: '[[1]], don\'t [[2]].',
        blanks: [['Respond'], ['react']],
        distractors: ['Shout', 'listen'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'It\'s Monday. The deadline is Wednesday. How many days does Arjun have?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why name the tactic as "a known move"?',
        options: [
          { text: 'It stops it feeling like a verdict on his work, so he can answer calmly' },
          { text: 'To accuse Mr Pryce', why: 'It\'s for Arjun\'s own head first.' },
          { text: 'It doesn\'t help', why: 'Recognising it takes away its sting.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Arjun\'s plan isn\'t a balcony move?',
        lines: [
          'Wait until tomorrow to reply.',
          'Write down what I\'m feeling.',
          'Send a sharp reply now so he knows I\'m serious.',
          'Ask for a call to understand their needs.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'That\'s reacting.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Feeling', 'Tactic', 'Goal'],
        items: [
          { text: '"I\'m scared of losing them."', group: 0 },
          { text: '"That\'s an extreme anchor."', group: 1 },
          { text: '"A fair contract and a client I keep."', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a tense moment coming up. Write what you\'ll do in each of the five balcony steps.',
    starters: ['Pause by...', 'My goal is...'],
  },
  deepen: {
    title: 'Don\'t react',
    summary: 'Ury describes three natural reactions to hardball: strike back, give in, or break off. All three hand control to the other side. The balcony gives it back to you.',
  },
  notes: 'Ury, Getting Past No (1991), step 1 "Don\'t react: go to the balcony"; three reactions (striking back, giving in, breaking off).',
};

export default lesson;
