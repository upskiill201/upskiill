import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Reading: topics to avoid, and how to steer away kindly. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Topics to avoid, and how to steer away kindly',
  summary: 'At the coffee machine, someone asks Grace how much nurses earn, then what she thinks about the election. Grace has strong opinions on both. This is not the place for them.',
  minutes: 12,
  outcomes: [
    'Know which topics usually don\'t belong in small talk',
    'Steer away from an awkward topic without being rude',
    'Rescue a conversation someone else has steered into trouble',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The danger list, and the escape routes',
      html: "<p>Friday morning. A man from the floor below, at the coffee machine: \"Ex-nurse, eh? What were you on, thirty grand? And who are you voting for?\"</p><p>Grace has opinions on both. Strong ones. She takes a breath.</p><h3>Topics that usually don't belong in small talk</h3><p>These aren't banned subjects. They're topics that need trust first, because they can divide people or make them uncomfortable:</p><ul><li><strong>Money:</strong> salaries, how much things cost someone, debts.</li><li><strong>Politics and religion:</strong> fine with friends who enjoy debating, risky with someone you met two minutes ago.</li><li><strong>Bodies and looks:</strong> weight, age, \"you look tired\".</li><li><strong>Relationships and children:</strong> \"Are you married?\" \"When are you having kids?\" Many people have painful answers they didn't plan to share by the kettle.</li><li><strong>Health details:</strong> theirs or yours. (Grace has had to unlearn this one fast.)</li><li><strong>Gossip about colleagues:</strong> it always gets back to them.</li></ul><p>Note that what counts as personal varies between cultures and families. In some places, asking about someone's family early is warm and normal. When in doubt, let the other person lead.</p><h3>Steering away kindly</h3><p>You don't need to lecture anyone. Just steer:</p><ul><li><strong>Deflect lightly, then pivot:</strong> \"Ha, not enough! Speaking of the NHS, have you used the Kinwell app yet?\"</li><li><strong>Gently decline:</strong> \"I try to keep politics for the pub with my oldest friends. Did you have a good weekend?\"</li><li><strong>Turn it to something safe nearby:</strong> \"Big week for news. Have you got any time off coming up?\"</li></ul><p>The trick is to <strong>answer briefly and warmly, then move</strong>, with a question so the other person has somewhere to go.</p>",
    },
    {
      kind: 'check',
      question: 'Someone asks Grace her old salary. What\'s the smoothest move?',
      options: ['Tell them the exact figure', '"Ha, not enough! Have you tried the Kinwell app yet?"', 'Walk off in silence'],
      answer: 1,
      explanation: 'Answer lightly, then pivot to something safe with a question.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Answer briefly and warmly, then move, with a question. No lecture needed.',
    },
  ],
  apply: {
    scenario: 'Friday morning. The man from the floor below.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Safe for small talk, or needs trust first?',
        groups: ['Safe', 'Needs trust first'],
        items: [
          { text: 'Any plans for the weekend?', group: 0 },
          { text: 'How much do you earn?', group: 1 },
          { text: 'Who did you vote for?', group: 1 },
          { text: 'Seen any good films lately?', group: 0 },
          { text: 'Why don\'t you have kids?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(The man) "So who are you voting for, then?"',
        prompt: 'Grace\'s best steer?',
        options: [
          { text: 'I keep politics for the pub with my oldest friends! Got anything nice planned this weekend?' },
          { text: 'A ten-minute speech about her views', why: 'Not by the coffee machine with a stranger.' },
          { text: 'That\'s a rude question.', why: 'True-ish, but a lecture. A light steer works better.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why are questions like "When are you having kids?" risky?',
        options: [
          { text: 'Children are boring', why: 'Not the reason.' },
          { text: 'It\'s illegal to ask', why: 'It\'s about kindness, not law.' },
          { text: 'Many people have painful answers they didn\'t plan to share' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey\'s rule: answer briefly and warmly, then ... (one word)',
        answers: ['move', 'pivot', 'steer'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s steer. Which line is a lecture, not a steer?',
        lines: [
          'Ha, nurses never earn enough!',
          'Actually, it\'s very inappropriate to ask people about money and you should know that.',
          'Have you had a chance to try the Kinwell app yet?',
        ],
        bug: 1,
        fix: 'Delete it: the light answer and the question are enough.',
        explanation: 'A lecture embarrasses people. A steer lets everyone move on smoothly.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the steering move to an example.',
        pairs: [
          ['Deflect, then pivot', '"Ha, not enough! Tried the app yet?"'],
          ['Gently decline', '"I keep politics for my oldest friends."'],
          ['Turn to something nearby', '"Big week. Any time off coming up?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A colleague starts gossiping about Priya. What does Grace do?',
        options: [
          { text: 'Join in to fit in', why: 'Gossip always gets back to people.' },
          { text: 'Report them immediately', why: 'A kind steer is usually enough.' },
          { text: '"Priya\'s been really kind to me, honestly. Are you going to the social on Friday?"' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'In some cultures, asking about family early is warm and normal. What should Grace do?',
        options: [
          { text: 'Never ask about family anywhere', why: 'Too rigid. Let the other person lead.' },
          { text: 'Let the other person lead: if they bring up family, follow' },
          { text: 'Always ask about marriage first', why: 'Still risky with someone new.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Count to two', 'What to do in a pause'],
          ['Answer, add, ask', 'The conversation rhythm'],
          ['Warmth beats wit', 'No need for funny stories'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a light deflect-and-pivot.',
        tiles: ['Ha,', 'not', 'enough!', 'Have', 'you', 'tried', 'the', 'app', 'yet?'],
        distractors: ['rude', 'salary'],
      },
    ],
  },
  reflect: {
    prompt: 'Which topic do you get asked about that you\'d rather not discuss with new people? Write your steer: a brief, warm answer, then a question.',
    starters: ['People often ask me about...', 'My steer: "..."'],
  },
  deepen: {
    title: 'Your steer, ready',
    summary: 'Prepare one light steer for the question you dread most (salary, relationship status, why you changed career). Having it ready takes the sting out.',
  },
  notes: 'Sensitive-topic guidance is general etiquette; lesson notes cultural variation (e.g. family questions are warm openers in many cultures) and recommends letting the other person lead. NHS reference consistent with Kinwell building an NHS appointment app (fictional).',
};

export default lesson;
