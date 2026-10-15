import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Chat with Tey: speak early, speak once, speak clearly (speaking-time research, "babble hypothesis", hedged). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Speak early, speak once, speak clearly',
  summary: 'David reports back: the meeting went... okay? He waited 40 minutes for the "perfect moment" to share a second idea. By then, the group had decided everything. Tey: "Let\'s talk about timing."',
  minutes: 11,
  outcomes: [
    'Speak in the first few minutes of a meeting',
    'Say your idea once, clearly, instead of hinting',
    'Claim your idea politely when it\'s repeated',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "David! How did the meeting go?",
          replies: ['Donor buddies went great. They said "nice one, David"!', 'But my second idea... I never said it.'],
        },
        {
          tey: "First: congratulations. Second: what happened to idea number two?",
          replies: ['I waited for the perfect moment.', 'It never came. They decided without it.'],
        },
        {
          tey: "Ah, the perfect moment. It almost never arrives. In groups, the longer you wait, the harder it gets to start, and the more is already decided. Studies of groups even suggest people who speak up early and often tend to be seen as leaders, sometimes more than the quality of their ideas would justify. Unfair? A bit. But it means quiet people should speak EARLY.",
          replies: ['How early?'],
        },
        {
          tey: "Within the first five minutes, say something. Anything useful: a question, agreeing with a point, a small idea. Once you've spoken once, speaking again is much easier. Then, when your big idea comes, say it once, clearly. Not three hints.",
          replies: ['What do you mean, hints?'],
        },
        {
          tey: "Hints are \"I wonder if maybe there\'s another way, possibly...\" Then nobody knows if you said an idea or a feeling. Say it clearly once: \"I suggest we hold the drive in the cafeteria at lunch, when it\'s busiest.\" Then stop. And if someone repeats it later?",
          replies: ['I... sit there quietly?'],
        },
        {
          tey: "Nope. You say, kindly: \"Yes, that builds on what I suggested earlier: the cafeteria at lunch.\" Calm, friendly, and now everyone remembers whose idea it was.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Speak in the first five minutes. Say your idea once, clearly. If it\'s repeated, connect it back to you, kindly.',
    },
  ],
  apply: {
    scenario: 'Tey FM. The timing lesson.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why should quiet people speak early in a meeting?',
        options: [
          { text: 'The longer you wait, the harder it is to start, and the more is already decided' },
          { text: 'To interrupt everyone', why: 'Early, not rude.' },
          { text: 'So you can leave early', why: 'Tempting. No.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A hint, or a clear idea?',
        groups: ['Hint', 'Clear idea'],
        items: [
          { text: 'I wonder if maybe there\'s another way, possibly...', group: 0 },
          { text: 'I suggest the cafeteria at lunch.', group: 1 },
          { text: 'Has anyone thought about, like, places?', group: 0 },
          { text: 'Let\'s run the drive on Wednesday, when classes finish early.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Junior just said "What about the cafeteria at lunch?" That was MY idea, ten minutes ago!',
        prompt: 'What should David say?',
        options: [
          { text: '"Junior, you ALWAYS steal my ideas!"', why: 'True, maybe, but it starts a fight.' },
          { text: 'Nothing, and stay quiet.', why: 'That\'s how the credit disappeared last time.' },
          { text: '"Yes! That builds on what I suggested earlier: the cafeteria at lunch, when it\'s busiest."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Try to say something in the first ___ minutes. (a number, in words or digits)',
        answers: ['five', '5'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s meeting plan in order.',
        lines: ['Ask a useful question in the first five minutes.', 'Listen to others.', 'Say the big idea once, clearly.', 'Pause and stop.', 'If it\'s repeated later, connect it back, kindly.'],
      },
      {
        kind: 'mcq',
        prompt: 'What do some studies of groups suggest about who gets seen as a leader?',
        options: [
          { text: 'Always the person with the best ideas', why: 'Unfortunately not always.' },
          { text: 'The quietest person', why: 'Usually the opposite.' },
          { text: 'People who speak up early and often, sometimes more than the quality of their ideas justifies' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'David\'s contribution. Which line is a hint, not an idea?',
        lines: [
          'I have a suggestion.',
          'Maybe, possibly, there\'s some other way we could think about timing, perhaps?',
          'Let\'s hold the drive on Wednesday afternoon.',
        ],
        bug: 1,
        fix: 'Wednesday afternoon is when most students are free.',
        explanation: 'Stacked softeners turn an idea into a fog. Say it once, clearly.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Illusion of transparency', 'Nerves less visible than they feel'],
          ['Pause after your idea', 'Thinking time'],
          ['Speak in the first five minutes', 'Speaking again gets easier'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s timing rules.',
        template: 'Speak [[1]]. Speak [[2]]. Speak [[3]].',
        blanks: [['early'], ['once'], ['clearly']],
        distractors: ['quietly', 'last'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build David\'s polite reclaim.',
        tiles: ['That', 'builds', 'on', 'what', 'I', 'suggested', 'earlier.'],
        distractors: ['stole', 'sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'In meetings or group chats, do you wait for the "perfect moment"? What\'s one thing you could say in the first five minutes next time?',
    starters: ['I usually wait until...', 'Next time, early on, I\'ll say...'],
  },
  deepen: {
    title: 'The five-minute rule',
    summary: 'In your next three meetings or group discussions, say something useful in the first five minutes: a question, a summary or a small idea. Notice whether speaking later gets easier.',
  },
  notes: 'Leader emergence and speaking time ("babble hypothesis"): e.g. MacLaren et al. (2020), The Leadership Quarterly — speaking time predicted leader emergence beyond other traits; stated with "suggest" and "sometimes". The reclaim phrasing ("that builds on what I suggested") is common workplace advice.',
};

export default lesson;
