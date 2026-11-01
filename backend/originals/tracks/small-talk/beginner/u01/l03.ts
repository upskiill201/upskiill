import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. Reading: what small talk is really for — phatic communion (Malinowski), the barista study and weak ties (Sandstrom & Dunn). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What small talk is really for',
  summary: 'Why do humans talk about the weather when everyone can see the weather? An anthropologist had a word for it a hundred years ago, and a coffee-shop experiment shows why it still matters.',
  minutes: 12,
  outcomes: [
    'Explain the real job small talk does: bonding, not information',
    'Know what the barista study and "weak ties" research found',
    'See small talk as a bridge to bigger conversations',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The weather is not the point',
      html: "<p>Tuesday lunchtime. Femi, leaning on the kitchen counter: \"Grim out there.\" Grace: \"Grim.\" Femi: \"Again.\" Grace: \"Again.\" They both smile. Nothing has been said. Something has happened.</p><h3>A word from 1923</h3><p>The anthropologist Bronisław Malinowski noticed that a lot of human talk carries almost no information. Greetings, comments on the weather, \"how are you?\" He called it <strong>phatic communion</strong>: talk whose job is to <em>bond</em> people, not to inform them. He argued it eases the tension people feel when they face each other in silence.</p><p>So when Femi says \"Grim out there,\" he isn't giving a weather report. He's saying: <em>we're on the same side, and I'm friendly.</em></p><h3>The barista experiment</h3><p>In a study in Vancouver, researchers gave people a gift card for a coffee shop. Half were told to be as efficient as possible at the counter. The other half were asked to have a genuine little chat with the barista: a smile, a comment, a question.</p><p>The chatters came away in a better mood and with a stronger sense of belonging. Thirty seconds of small talk with a stranger made a measurable difference.</p><h3>Weak ties</h3><p>The same researchers asked people to count their daily conversations with close friends AND with \"weak ties\": acquaintances like the receptionist, the neighbour, the regular on the bus. On days when people had more chats with weak ties, they tended to be happier and feel they belonged more.</p><h3>The bridge</h3><p>Small talk is also how bigger conversations start. Almost every friendship, job lead and good working relationship began with someone saying something unimportant. Small talk is the doorway, not the room.</p>",
    },
    {
      kind: 'check',
      question: 'What did people who chatted with the barista report?',
      options: ['Feeling more awkward', 'A better mood and a stronger sense of belonging', 'Getting their coffee faster'],
      answer: 1,
      explanation: 'Being social rather than purely efficient lifted mood and belonging.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Small talk is the doorway, not the room. Its job is to say "I\'m friendly", and it quietly makes everyone\'s day a little better.',
    },
  ],
  apply: {
    scenario: 'Tuesday lunchtime. "Grim out there."',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Malinowski mean by "phatic communion"?',
        options: [
          { text: 'Talk whose main job is to bond people, not inform them' },
          { text: 'Talk that shares important facts', why: 'The opposite: it carries very little information.' },
          { text: 'A religious ceremony', why: 'Different kind of communion.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to what it means.',
        pairs: [
          ['Phatic communion', 'Talk that bonds, not informs'],
          ['Weak ties', 'Acquaintances, like a neighbour'],
          ['The barista study', 'A short chat lifts mood'],
          ['The bridge', 'Small talk leads to bigger talk'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Grim out there.',
        prompt: 'Grace understands the real message now. Best reply?',
        options: [
          { text: 'Actually, it\'s 14 degrees with 80% humidity.', why: 'Accurate. Missing the point entirely.' },
          { text: 'Grim. Again. Did you get soaked on the way in?' },
          { text: 'I don\'t talk about weather.', why: 'Femi was being friendly. Meet him halfway.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Weak tie, or close tie?',
        groups: ['Weak tie', 'Close tie'],
        items: [
          { text: 'The building\'s security guard', group: 0 },
          { text: 'Your best friend', group: 1 },
          { text: 'The barista you see most mornings', group: 0 },
          { text: 'Your partner or parent', group: 1 },
          { text: 'A colleague from another team', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Small talk is the doorway, not the ... (one word)',
        answers: ['room'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'On days with more weak-tie chats, people in the study tended to...',
        options: [
          { text: 'Feel more tired', why: 'They tended to feel better.' },
          { text: 'Get more work done', why: 'The study measured mood and belonging.' },
          { text: 'Feel happier and more like they belonged' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Jayden\'s summary of the lesson. Which line is wrong?',
        lines: [
          'Small talk is mostly about bonding.',
          'Chatting to a barista lifted people\'s mood.',
          'Only conversations with close friends affect how happy you feel.',
        ],
        bug: 2,
        fix: 'Chats with acquaintances (weak ties) matter too.',
        explanation: 'The weak-ties research found that everyday chats with acquaintances went with happier days.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is small talk called a "bridge"?',
        options: [
          { text: 'It connects strangers to bigger conversations, friendships and opportunities' },
          { text: 'Because people do it on bridges', why: 'Sometimes. Not the reason.' },
          { text: 'Because it\'s boring to cross', why: 'Not the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What Femi\'s "Grim out there" really says.',
        template: 'We\'re on the same [[1]], and I\'m [[2]].',
        blanks: [['side', 'team'], ['friendly']],
        distractors: ['wet', 'busy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a small-talk line for the barista.',
        tiles: ['Busy', 'morning?', 'You\'ve', 'been', 'flat', 'out.'],
        distractors: ['efficient', 'order'],
      },
    ],
  },
  reflect: {
    prompt: 'Who are the "weak ties" in your week: the people you see often but barely know? Pick one you could say a few friendly words to tomorrow.',
    starters: ['My weak ties are...', 'Tomorrow I could say to...'],
  },
  deepen: {
    title: 'The barista test',
    summary: 'Next time you buy something, try a ten-second chat instead of a silent transaction: a smile, a comment, a thank-you with eye contact. Notice how you feel afterwards.',
  },
  notes: 'Malinowski (1923), "The Problem of Meaning in Primitive Languages", supplement to Ogden & Richards, The Meaning of Meaning — coined "phatic communion"; argued it overcomes the tension of silence. Sandstrom & Dunn (2014), "Is efficiency overrated?", Social Psychological and Personality Science — Vancouver coffee-shop study, 60 participants, social vs efficient: more positive affect and belonging. Sandstrom & Dunn (2014), Personality and Social Psychology Bulletin — clicker diary of weak vs strong tie interactions; more weak-tie interactions associated with greater happiness and belonging (correlational).',
};

export default lesson;
