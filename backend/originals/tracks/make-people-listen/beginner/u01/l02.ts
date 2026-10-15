import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. "Myth or Mic Drop": attention myths — the goldfish, the 7% rule, louder = heard. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Myth or Mic Drop: attention myths',
  summary: 'Clinton has a theory: "Humans have an attention span of eight seconds, shorter than a goldfish, so I have to message constantly." Time for Tey FM\'s favourite segment.',
  minutes: 11,
  outcomes: [
    'Bust the most famous myths about attention and communication',
    'Know what really makes people stop listening',
    'Stop blaming listeners for problems the message can fix',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Humans now have an 8-second attention span, shorter than a goldfish.', isFact: false, explain: 'Myth. The famous figure was traced to an unsupported statistic quoted in a 2015 marketing report. Psychologists don\'t measure "average attention span" like that, and there\'s no good test of a goldfish\'s either. People watch three-hour films. They stop listening when something stops being worth it.' },
        { text: 'Only 7% of communication is the words you use.', isFact: false, explain: 'Myth. The famous 7-38-55 numbers came from small experiments about feelings, where words and tone CONFLICTED. The researcher himself has said his findings are often misquoted. Words matter a lot.' },
        { text: 'People are more likely to tune out messages that don\'t seem relevant to them.', isFact: true, explain: 'Mic drop. Attention follows relevance. If a message doesn\'t say what\'s in it for the listener, or what they need to do, they move on.' },
        { text: 'If you say it louder or more often, people will eventually listen.', isFact: false, explain: 'Myth. Repeating a clear message once or twice can help. Flooding people teaches them to ignore you. Ask Clinton.' },
        { text: 'How you sound (tone, pace, pauses) affects how people hear your words.', isFact: true, explain: 'Mic drop. Words AND delivery both matter. Chapter 3 is all about voice.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'clinton', text: 'Wait. So the goldfish thing isn\'t real?' },
        { speaker: 'tey', text: "The goldfish has been slandered for years, Clinton. Your classmates can concentrate fine. They watched a whole football match on Saturday. They didn't come to your study session because sixty-three messages hid the one that mattered." },
        { speaker: 'clinton', text: 'So it\'s not that they can\'t listen. It\'s that I made it hard.' },
        { speaker: 'tey', text: "Mic. Drop." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before blaming short attention spans, ask: was my message clear, relevant and short enough to be worth attention?',
    },
  ],
  apply: {
    scenario: 'Tey FM, "Myth or Mic Drop".',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where did the "8-second goldfish" claim come from?',
        options: [
          { text: 'An unsupported statistic repeated in a 2015 marketing report' },
          { text: 'A major brain-scanning study', why: 'No such study. It traces back to an unsupported statistic.' },
          { text: 'Goldfish researchers', why: 'Nobody has a reliable test of goldfish attention.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or mic drop?',
        groups: ['Myth', 'Mic drop (true)'],
        items: [
          { text: 'Humans have an 8-second attention span', group: 0 },
          { text: 'People tune out messages that don\'t seem relevant', group: 1 },
          { text: 'Only 7% of meaning comes from words', group: 0 },
          { text: 'Delivery affects how words are heard', group: 1 },
          { text: 'Louder and more often always works', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What were Mehrabian\'s famous 7-38-55 numbers actually about?',
        options: [
          { text: 'All communication, everywhere', why: 'That\'s the misquote he objected to.' },
          { text: 'Email open rates', why: 'Not even close.' },
          { text: 'Feelings, in situations where the words and the tone didn\'t match' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Okay but my friends DO have short attention spans. They watch TikTok all day.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'True, give up on them.', why: 'The research says the message can do a lot of the work.' },
          { text: 'Send them TikToks instead.', why: 'Creative. Not the lesson.' },
          { text: 'They also watched a full football match. They can focus fine, on things worth it. Make your message worth it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Attention follows ... (one word: whether something matters to the listener)',
        answers: ['relevance', 'interest'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s theory board. Which line is a myth?',
        lines: [
          'People stop listening when they can\'t tell what I want.',
          'Humans can only concentrate for 8 seconds, so message constantly.',
          'Delivery matters as well as words.',
        ],
        bug: 1,
        fix: 'People concentrate on what seems worth it.',
        explanation: 'The goldfish statistic is a myth, and messaging constantly is how Clinton got muted.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['8-second attention span', 'People focus on what\'s worth it'],
          ['Words are only 7%', 'Words matter a lot'],
          ['Louder works', 'Clearer works'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the most useful question before blaming a short attention span?',
        options: [
          { text: 'Why is everyone so distracted these days?', why: 'Interesting, but you can\'t change that tonight.' },
          { text: 'Was my message clear, relevant and short enough?' },
          { text: 'How can I make it louder?', why: 'Louder isn\'t clearer.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s verdict.',
        template: 'They can [[1]] fine. My [[2]] made it hard to [[3]].',
        blanks: [['listen', 'focus', 'concentrate'], ['message', 'messages'], ['listen', 'hear']],
        distractors: ['goldfish', 'capitals'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the lesson in one line.',
        tiles: ['Don\'t', 'blame', 'the', 'goldfish.', 'Fix', 'the', 'message.'],
        distractors: ['louder'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever believed people "just don\'t listen" when the real problem was the message? What happened?',
    starters: ['I thought people weren\'t listening when...', 'Looking back, the message...'],
  },
  deepen: {
    title: 'Myth check',
    summary: 'Next time someone quotes the goldfish or the 7% rule (in a presentation, a training, a social post), you\'ll know the real story. Kindly tell them. It\'s a great conversation starter.',
  },
  notes: 'Goldfish myth: 2015 Microsoft Canada consumer-insights report cited "Statistic Brain"; investigated by BBC More or Less; University of Wisconsin myth-busting summary; psychologists do not measure a single average attention span. Mehrabian (1967 studies): weighting applies to feelings/attitudes when verbal and nonverbal cues conflict; Mehrabian has stated his findings are often misquoted.',
};

export default lesson;
