import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat with Tey: humour that works, and humour that doesn't. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Humour that works, and humour that doesn\'t',
  summary: 'Grace makes Femi laugh every day. Then she tries the same joke on Arjun, over video, in Bengaluru. Silence. Not all humour travels, and some of it bites.',
  minutes: 12,
  outcomes: [
    'Know which kinds of humour are safest in small talk',
    'Avoid the jokes that hurt or don\'t travel',
    'Recover when a joke falls flat',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Thursday. On a video call, Arjun says the deadline moved. Grace, deadpan: \"Oh brilliant, my favourite thing.\" Femi would have laughed. Arjun says, \"I am glad you are happy about it.\" Silence. What happened?",
          replies: ['Sarcasm.', 'He didn\'t get the joke.'],
        },
        {
          tey: "Sarcasm saying the opposite of what you mean, with a flat voice, is very British, and it often doesn't travel. Over video, in a second language, with a slight lag, it can sound like you mean it. Arjun took her literally, which is completely fair.",
          replies: ['So what humour does work?'],
        },
        {
          tey: "The safest kinds in small talk: laughing at yourself a little (\"I got lowered off a climbing wall like a sack of potatoes\"), laughing at the shared situation (\"this lift is slower than the NHS waiting list\"), and enjoying THEIR jokes, which is underrated. Laughing at someone's joke is a lovely bit of small talk all by itself.",
          replies: ['What should I avoid?'],
        },
        {
          tey: "Jokes about someone's looks, accent, age, religion, nationality or job. Teasing someone you've just met: it's how friends show love, but with a stranger it just stings. And going too dark too early. Rule of thumb: punch up at situations, never down at people.",
          replies: ['What if a joke falls flat?'],
        },
        {
          tey: "Don't explain it for three minutes. Just own it lightly and move on: \"That sounded better in my head. What I meant was: deadline moved, slightly annoying, totally fine.\" Arjun will smile. Clarity rescues a flat joke; explaining it buries it.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Safest humour: laugh at yourself, laugh at the situation, enjoy their jokes. Avoid teasing strangers, and jokes about who people are. Flat joke? Own it and move on.',
    },
  ],
  apply: {
    scenario: 'Thursday. The joke that didn\'t travel.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Safe small-talk humour, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'Laughing at your own climbing-wall disaster', group: 0 },
          { text: 'A joke about someone\'s accent', group: 1 },
          { text: '"This lift is slower than my old hospital\'s."', group: 0 },
          { text: 'Teasing someone you met five minutes ago', group: 1 },
          { text: 'Laughing at their joke', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Grace\'s sarcasm fall flat with Arjun?',
        options: [
          { text: 'Arjun has no sense of humour', why: 'He just took her literally, which is fair.' },
          { text: 'Sarcasm often doesn\'t travel, especially over video and across cultures' },
          { text: 'The joke was too long', why: 'It was short. It was the type of joke.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'I am glad you are happy about the deadline moving.',
        prompt: 'Grace\'s recovery?',
        options: [
          { text: 'It was SARCASM, Arjun. Let me explain how British sarcasm works...', why: 'Explaining buries it.' },
          { text: 'Say nothing and hope', why: 'He\'ll think she\'s genuinely happy, or strange.' },
          { text: 'Ha, that sounded better in my head! I meant: slightly annoying, totally fine. What\'s the new date?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rule of thumb: punch up at situations, never ___ at people. (one word)',
        answers: ['down'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is laughing at someone else\'s joke good small talk?',
        options: [
          { text: 'It makes them feel heard and liked, and costs you nothing' },
          { text: 'It\'s polite to lie', why: 'Only laugh if it\'s funny! But enjoy it openly.' },
          { text: 'It ends the conversation', why: 'It usually warms it up.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s joke plan for the conference. Which joke should go?',
        lines: [
          'Laugh at how lost I got finding the venue.',
          'Joke about the speaker\'s accent.',
          'Say the coffee queue is longer than an NHS waiting list.',
        ],
        bug: 1,
        fix: 'Laugh about the free pens everyone is hoarding.',
        explanation: 'Jokes about who people are (accent, looks, origin) hurt. Situations are fair game.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the humour to the verdict.',
        pairs: [
          ['Self-deprecating, lightly', 'Usually safe'],
          ['Sarcasm with strangers abroad', 'Often doesn\'t travel'],
          ['Teasing someone new', 'Stings'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Moment, problem, turn, point', 'A 30-second story'],
          ['Bridge question', 'From small to real'],
          ['Watch and match', 'Follow their style'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s rescue line.',
        template: 'That sounded [[1]] in my head. What I [[2]] was: slightly annoying, totally [[3]].',
        blanks: [['better'], ['meant'], ['fine']],
        distractors: ['worse', 'said'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a safe, situational joke.',
        tiles: ['This', 'lift', 'is', 'slower', 'than', 'my', 'old', 'hospital\'s.'],
        distractors: ['accent'],
      },
    ],
  },
  reflect: {
    prompt: 'What kind of humour do you use most: sarcasm, self-deprecation, teasing, observation? Would it travel to someone from a different background?',
    starters: ['My humour is mostly...', 'With a stranger, I\'d...'],
  },
  deepen: {
    title: 'Laugh at the situation',
    summary: 'Next time you\'re in a queue, a lift or a long meeting, try one light joke about the shared situation. If it lands, lovely. If not, smile and move on.',
  },
  notes: 'Humour guidance is practical; sarcasm comprehension varies across cultures and second-language contexts (widely noted in intercultural communication). "Punch up, not down" is a common comedy maxim.',
};

export default lesson;
