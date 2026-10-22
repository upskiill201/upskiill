import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Chat with Tey: why asking feels awkward, and what helps. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Why it feels awkward',
  summary: 'Ada\'s heart races at the thought of asking Mr Adeyemi about the rent. Tey explains where the awkwardness comes from, and three things that make it smaller.',
  minutes: 11,
  outcomes: [
    'Name the fears that make asking feel awkward',
    'Use "I\'m excited" instead of "calm down"',
    'Make an ask feel smaller with a script and practice',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Most awkwardness comes from three fears: "they\'ll say no", "they\'ll think I\'m greedy", and "it\'ll hurt the relationship". Which is yours?', replies: ['All three, honestly.'] },
        { tey: 'Normal. Here\'s the surprise: research finds people say yes to direct requests more often than askers expect. Your brain is guessing too low.', replies: ['But my heart still races.'] },
        { tey: 'Then don\'t fight it. In one study, people who told themselves "I\'m excited" before a stressful task did better than people who said "I\'m calm". Same racing heart, a better label.', replies: ['What else helps?'] },
        { tey: 'Write the first sentence down, and say it out loud twice. "Mr Adeyemi, I\'d like to stay. Can we talk about the new rent?" Once it\'s rehearsed, it\'s just a sentence.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Feeling nervous? Say "I\'m excited", write your first sentence down, and practise it out loud.',
    },
  ],
  apply: {
    scenario: 'The racing heart.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the fear to a better way to see it.',
        pairs: [
          ['"They\'ll say no"', 'People say yes more than we expect'],
          ['"They\'ll think I\'m greedy"', 'A polite reason isn\'t greedy'],
          ['"It\'ll hurt the relationship"', 'Fair asks rarely do'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the study, which label helped people perform better under stress?',
        options: [
          { text: '"I\'m calm"', why: 'Trying to calm down worked less well.' },
          { text: '"I\'m anxious"', why: 'That made it worse.' },
          { text: '"I\'m excited"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps with the awkwardness, or makes it worse?',
        groups: ['Helps', 'Worse'],
        items: [
          { text: 'Writing the first sentence down', group: 0 },
          { text: 'Waiting until you feel no fear at all', group: 1 },
          { text: 'Practising out loud', group: 0 },
          { text: 'Imagining the worst every night', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'ll ask when I stop feeling nervous.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'That might be never. Ask while nervous. Call it excitement, and use your rehearsed first line.' },
          { text: 'Good idea, wait.', why: 'The rent deadline won\'t wait.' },
          { text: 'Nervous people shouldn\'t negotiate.', why: 'Everyone gets nervous.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s first line.',
        template: '"Mr Adeyemi, I\'d like to [[1]]. Can we [[2]] about the new rent?"',
        blanks: [['stay'], ['talk']],
        distractors: ['leave', 'fight'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times does Tey suggest saying the first line out loud?',
        answers: ['2', 'two', 'twice'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Tey suggest relabelling, not calming down?',
        options: [
          { text: 'Calm people never succeed', why: 'Calm is fine; it\'s just hard to force.' },
          { text: 'It sounds nicer', why: 'There\'s a research reason.' },
          { text: 'Nerves and excitement feel similar in the body, so relabelling is easier than switching off' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s plan won\'t help?',
        lines: [
          'Write my first sentence.',
          'Say it out loud twice.',
          'Apologise three times before asking.',
          'Say "I\'m excited" before I call.',
        ],
        bug: 2,
        fix: 'One polite opener, no apologies.',
        explanation: 'Apologising signals she thinks the ask is wrong.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s routine before the call.',
        lines: ['Name the fear', 'Write the first sentence', 'Practise it out loud', 'Say "I\'m excited"', 'Make the call'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which fear is this?',
        groups: ['No', 'Greedy', 'Relationship'],
        items: [
          { text: '"He\'ll refuse"', group: 0 },
          { text: '"He\'ll think I only care about money"', group: 1 },
          { text: '"He\'ll be cold to me after"', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three fears is strongest for you? Write the first sentence of an ask you\'ve been avoiding.',
    starters: ['My biggest fear is...', 'My first sentence:...'],
  },
  deepen: {
    title: 'Anxiety reappraisal',
    summary: 'Alison Wood Brooks found that saying "I am excited" before singing, speaking or a maths test improved performance compared with "I am calm". You don\'t have to believe it at first.',
  },
  notes: 'Brooks (2014), "Get Excited: Reappraising Pre-Performance Anxiety as Excitement", Journal of Experimental Psychology: General 143(3). Underestimating compliance with direct requests: Flynn & Lake (2008), JPSP.',
};

export default lesson;
