import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Chat with Tey: the voice in your head — common fears vs what the research says (liking gap; Sandstrom & Boothby). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The voice in your head',
  summary: 'Friday, 4 p.m. Grace replays every chat from her first week and decides each one went badly. Tey has some news about how people actually saw her.',
  minutes: 12,
  outcomes: [
    'Name the most common small-talk fears',
    'Know what the "liking gap" is',
    'Answer the voice in your head with evidence',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Friday afternoon. Grace is replaying her week like a crime documentary. \"The coffee machine: disaster. The lift: I said 'dry off' to the CEO. Lunch: I talked too much about wound dressings.\" Sound familiar?",
          replies: ['Very.', 'I do this every night.'],
        },
        {
          tey: "Almost everyone does. Researchers have studied the worries people have before talking to strangers. The big ones: they won't enjoy it, I'll be boring, I won't know what to say, it'll be awkward. And the biggest of all: the other person won't enjoy talking to ME.",
          replies: ['And are we right?'],
        },
        {
          tey: "Mostly no. Across seven studies with over 2,300 people, conversations with strangers generally went better than people expected. Here's the part I love: there's something called the liking gap.",
          replies: ['What\'s the liking gap?'],
        },
        {
          tey: "After a conversation, people consistently underestimate how much the other person liked them. In one study, strangers chatted for five minutes, then rated each other. On average, people liked their partner more than their partner thought. The gap was even bigger for shy people.",
          replies: ['So people liked Grace more than she thinks?'],
        },
        {
          tey: "Very probably. While Grace was busy judging her own words, other people were noticing her warmth. Femi, for example, has already told two people the nurse is \"brilliant\". She doesn't know yet.",
          replies: ['How do I quiet the voice?'],
        },
        {
          tey: "Answer it with evidence. When it says \"that went badly\", reply: \"People usually like me more than I think.\" Then ask: what's one thing that went well? There's always one.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The liking gap: after a chat, people like you more than you think they do. The voice in your head is a bad judge of how you come across.',
    },
  ],
  apply: {
    scenario: 'Friday, 4 p.m. Grace\'s replay.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the "liking gap"?',
        options: [
          { text: 'People like you less than you think', why: 'The opposite.' },
          { text: 'The time between meeting someone and liking them', why: 'It\'s about a gap in our estimates.' },
          { text: 'After a conversation, people underestimate how much the other person liked them' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'A common fear, or what usually happens?',
        groups: ['Common fear', 'What usually happens'],
        items: [
          { text: 'They\'ll find me boring', group: 0 },
          { text: 'They like me more than I think', group: 1 },
          { text: 'I won\'t know what to say', group: 0 },
          { text: 'It goes better than I expected', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(inner voice) The lift with the CEO was a disaster. He thinks I\'m odd.',
        prompt: 'What evidence-based answer can Grace give her inner voice?',
        options: [
          { text: 'You\'re right, quit tomorrow.', why: 'The research says the voice is usually too harsh.' },
          { text: 'Never get in a lift again.', why: 'Stairs are good exercise. Not a strategy.' },
          { text: 'People usually like me more than I think. And he laughed at "dry off".' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'People\'s biggest worry: that the OTHER person won\'t ___ talking to them. (one word)',
        answers: ['enjoy', 'like'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'For which people was the liking gap even bigger?',
        options: [
          { text: 'Very confident people', why: 'The gap tended to be larger for shy people.' },
          { text: 'Shy people' },
          { text: 'Nurses', why: 'Not studied. Though Grace would like to know.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s Friday replay, rewritten. Which line is still the old voice?',
        lines: [
          'The coffee machine started badly, but Femi laughed and we\'re friends now.',
          'The CEO smiled when I said "dry off".',
          'Everyone definitely thinks I\'m a strange old nurse.',
        ],
        bug: 2,
        fix: 'People probably liked me more than I think.',
        explanation: '"Everyone definitely thinks" is the voice guessing, and the research says it guesses too harshly.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the voice to the evidence-based answer.',
        pairs: [
          ['"That went badly."', 'What\'s one thing that went well?'],
          ['"They found me boring."', 'People like me more than I think.'],
          ['"I won\'t know what to say."', 'Notice something, then ask.'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do people misjudge how they came across?',
        options: [
          { text: 'They\'re busy judging their own words instead of noticing the other person\'s warmth' },
          { text: 'Other people lie about liking them', why: 'Observers watching the same chats could see the liking.' },
          { text: 'They can\'t hear well', why: 'It\'s about attention, not hearing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s two-step answer to the voice.',
        template: 'Say: "People usually [[1]] me more than I think." Then ask: what\'s one thing that went [[2]]?',
        blanks: [['like'], ['well']],
        distractors: ['hate', 'badly'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the answer to the voice in your head.',
        tiles: ['People', 'like', 'me', 'more', 'than', 'I', 'think.'],
        distractors: ['less', 'never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a recent conversation you think went badly. Write one thing that actually went well in it.',
    starters: ['I think ... went badly.', 'But one thing that went well was...'],
  },
  deepen: {
    title: 'The one-good-thing habit',
    summary: 'After any conversation you\'re worried about, write down one thing that went well. Over a week, you\'ll have proof against the voice. (If fear of social situations is seriously affecting your life, talking to a doctor or counsellor can really help.)',
  },
  notes: 'Boothby, Cooney, Clark & Sandstrom (2018), "The liking gap in conversations", Psychological Science 29(11): 1742–1756 — five studies; people underestimate how much partners liked them; observers could detect liking; gap larger for shy people (per secondary coverage). Sandstrom & Boothby (2021), Self and Identity 20(1): 47–71 — 7 studies, >2,300 people; conversations go better than expected; biggest worry is partner not enjoying it. Non-clinical; Deepen signposts professional help.',
};

export default lesson;
