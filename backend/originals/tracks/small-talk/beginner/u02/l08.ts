import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: silence, oversharing and talking about yourself. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Silence, oversharing and talking about yourself',
  summary: 'Jayden has rules for conversation: never pause, never talk about yourself, and always have something funny ready. Grace tests his rules against what\'s actually true.',
  minutes: 11,
  outcomes: [
    'Know that short pauses are normal, not a sign of failure',
    'Know what to share, and what\'s too much, too soon',
    'Get comfortable talking about yourself a little',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'A pause in a conversation means it\'s going badly.', isFact: false, explain: 'Short pauses are normal. People think, sip, look at the view. A second or two of silence is breathing room, not failure.' },
        { text: 'How comfortable people are with silence varies between people and cultures.', isFact: true, explain: 'In some places and families, comfortable silence is a sign of ease. In others, people fill every gap. Watch the other person and match.' },
        { text: 'You should never talk about yourself in small talk.', isFact: false, explain: 'Sharing a little is how people get to know you. The balance matters, not zero.' },
        { text: 'Telling someone your health problems or money worries in a first chat can make them uncomfortable.', isFact: true, explain: 'Heavy personal details are usually for when you know someone better. Light, easy details are perfect for small talk.' },
        { text: 'You need a funny story ready for every conversation.', isFact: false, explain: 'Warmth beats wit. Most good conversations are made of ordinary questions and real interest.' },
        { text: 'Most people enjoy talking about themselves.', isFact: true, explain: 'Brain research suggests that talking about ourselves is genuinely rewarding, which is one reason a good question is such a gift.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'jayden', text: 'Mum. Rule one: NEVER let there be a silence. Silence equals death.' },
        { speaker: 'grace', text: 'Funny. Your grandad and I used to sit for an hour without talking. Best conversations we ever had.' },
        { speaker: 'jayden', text: '...That\'s not a conversation, that\'s just sitting.' },
        { speaker: 'tey', text: "Jayden's half right: a LONG awkward silence with a stranger does feel heavy. But a short pause isn't a crisis. Count to two before you rush in, and you'll often find the other person fills it." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pause? Count to two. Still quiet? Use a hook from earlier ("You mentioned your bees...") or the setting ("This queue is moving!").',
    },
  ],
  apply: {
    scenario: 'Thursday evening. Testing Jayden\'s rules.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A two-second pause happens in a chat. What does it usually mean?',
        options: [
          { text: 'The conversation has failed', why: 'Short pauses are completely normal.' },
          { text: 'Nothing bad: people are thinking, sipping or taking a breath' },
          { text: 'They hate you', why: 'Very unlikely.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good to share in small talk, or too much, too soon?',
        groups: ['Good to share', 'Too much, too soon'],
        items: [
          { text: 'I\'m learning to cook Polish food.', group: 0 },
          { text: 'My debt is out of control.', group: 1 },
          { text: 'I used to be a nurse.', group: 0 },
          { text: 'Let me tell you about my surgery in detail.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Okay but what do you DO when there\'s a silence?',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'Panic and talk about the weather in Peru.', why: 'Random topic jumps feel jumpy.' },
          { text: 'Leave immediately.', why: 'A bit much for a pause.' },
          { text: 'Count to two. If it\'s still quiet, go back to something they said earlier.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Short pause? Count to ... (a number)',
        answers: ['two', '2'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is asking someone a good question "a gift"?',
        options: [
          { text: 'People tend to find talking about themselves genuinely rewarding' },
          { text: 'It saves you from talking', why: 'Not the main reason.' },
          { text: 'It\'s polite to give gifts', why: 'Metaphor, not manners.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Jayden\'s conversation rules. Tap the one that causes the most trouble.',
        lines: [
          'Never, ever let there be a pause.',
          'Never talk about yourself at all.',
          'Keep heavy personal stuff for people you know well.',
        ],
        bug: 0,
        fix: 'Short pauses are fine. Count to two.',
        explanation: '"Never pause" makes people rush and ramble. (The third rule is actually good advice.)',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['Silence means it\'s failing', 'Short pauses are normal'],
          ['Never talk about yourself', 'Share a little, keep balance'],
          ['Always have a funny story', 'Warmth beats wit'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone is comfortable with longer silences than Grace is used to. What should she do?',
        options: [
          { text: 'Fill every gap with chatter', why: 'Watch and match their pace instead.' },
          { text: 'Relax into a slower pace and match theirs' },
          { text: 'Assume they\'re bored', why: 'Silence norms vary between people and cultures.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Listen to understand', 'Not just to reply'],
          ['Reflecting back', '"So she\'s nervous about it?"'],
          ['FORD', 'Four safe topic areas'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line to pick up after a pause.',
        tiles: ['You', 'mentioned', 'your', 'bees.', 'How', 'many', 'do', 'you', 'have?'],
        distractors: ['Peru'],
      },
    ],
  },
  reflect: {
    prompt: 'How do you feel about silence in conversations? Do you rush to fill it? What would counting to two change?',
    starters: ['When there\'s a pause, I...', 'Counting to two would...'],
  },
  deepen: {
    title: 'The two-second experiment',
    summary: 'In your next three conversations, when a pause comes, silently count to two before speaking. Notice how often the other person speaks first.',
  },
  notes: 'Pause tolerance varies across individuals and cultures (hedged; avoid national stereotypes). Tamir & Mitchell (2012), "Disclosing information about the self is intrinsically rewarding", PNAS 109(21) — self-disclosure engages reward-related brain regions (worded as "brain research suggests"). Note: lesson findBug item asks for the WORST rule; explanation clarifies.',
};

export default lesson;
