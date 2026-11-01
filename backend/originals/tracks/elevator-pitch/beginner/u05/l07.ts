import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Reading: one pitch, three lengths (10 seconds, 30 seconds, 2 minutes). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'One pitch, three lengths',
  summary: 'A stagehand rushes over: "Timing\'s off. Speaker 7, can you do 45 seconds instead of 60?" Ada panics. Then she remembers Arjun\'s accordion.',
  minutes: 12,
  outcomes: [
    'Stretch or shrink a pitch on the spot',
    'Know your 10-second, 30-second and 2-minute versions',
    'Decide what to drop first',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The accordion pitch',
      html: "<p>Two weeks ago, Arjun gave Ada a strange instruction: \"Make your pitch like an accordion. It should squeeze and stretch without breaking.\" Now she knows why.</p><h3>The 10-second version</h3><p>Your one sentence and your ask. For a lift, a queue, or \"we're out of time\".</p><p><em>\"I help savings groups track who's paid, so nobody argues about money. Could I send you a demo?\"</em></p><h3>The 30-second version</h3><p>Hook, the core of the story, one number, the ask.</p><p><em>\"Ten colleagues, one notebook, what could go wrong? Every month, someone swore they'd paid. So I built an app that ended the arguments. 110 people use it now. I'm looking for a mentor to reach a hundred offices.\"</em></p><h3>The 60-second version</h3><p>The full pitch: hook, story, app, vivid example, numbers, ask, closing line.</p><h3>The 2-minute version</h3><p>For a meeting or a follow-up call: the 60-second pitch, plus how you make money, what's next, and a second example. Then stop and ask what they'd like to know.</p><h3>What to drop first</h3><p>When you need to shrink, drop in this order: second examples → extra numbers → the vivid example → the story details. <strong>Never drop</strong> the one sentence or the ask.</p><p>For 45 seconds, Ada drops the treasurer example and keeps everything else.</p>",
    },
    {
      kind: 'check',
      question: 'When shrinking a pitch, what should you NEVER drop?',
      options: ['The one sentence and the ask', 'The second example', 'The extra numbers'],
      answer: 0,
      explanation: 'The one sentence and the ask are the core. Everything else can be squeezed.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '10 seconds: sentence and ask. 30: plus hook, story, one number. 60: the full pitch. 2 minutes: plus money and next steps. Never drop the sentence or the ask.',
    },
  ],
  apply: {
    scenario: '"Can you do 45 seconds?"',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the length to what it includes.',
        pairs: [
          ['10 seconds', 'One sentence and the ask'],
          ['30 seconds', 'Hook, story core, one number, ask'],
          ['2 minutes', 'Full pitch plus money and next steps'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put what to drop first in order (first to drop at the top).',
        lines: ['Second examples', 'Extra numbers', 'The vivid example', 'Story details'],
      },
      {
        kind: 'mcq',
        prompt: 'For 45 seconds, what does Ada drop?',
        options: [
          { text: 'The ask', why: 'Never the ask.' },
          { text: 'The treasurer example' },
          { text: 'The hook', why: 'The hook earns the first ten seconds.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What if they suddenly say "You have 10 seconds"?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'One sentence and the ask: "I help savings groups track who\'s paid. Could I send you a demo?"' },
          { text: 'Talk twice as fast.', why: 'Squeeze the content, not the speed.' },
          { text: 'Refuse.', why: 'You always have a 10-second version.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun\'s name for a pitch that squeezes and stretches: the ___ pitch. (one word)',
        answers: ['accordion'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the 10-second version, or not?',
        groups: ['In it', 'Not in it'],
        items: [
          { text: 'The one sentence', group: 0 },
          { text: 'The Tunde story', group: 1 },
          { text: 'The ask', group: 0 },
          { text: 'The growth numbers', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s 30-second version. Which line should she drop?',
        lines: [
          'Ten colleagues, one notebook, what could go wrong?',
          'So I built an app that ended the arguments.',
          'Let me also tell you about our second example, a youth group in Ikeja...',
          'I\'m looking for a mentor to reach a hundred offices.',
        ],
        bug: 2,
        fix: '110 people use it now.',
        explanation: 'Second examples are the first thing to drop when time is short.',
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do at the end of a 2-minute version?',
        options: [
          { text: 'Keep talking until they leave', why: 'Hand it back.' },
          { text: 'Stop and ask what they\'d like to know' },
          { text: 'Repeat the 60-second version', why: 'They\'ve heard it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The 10-second version.',
        template: 'I [[1]] savings groups track who\'s [[2]]. Could I send you a [[3]]?',
        blanks: [['help'], ['paid'], ['demo']],
        distractors: ['story', 'database'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the never-drop rule.',
        tiles: ['Never', 'drop', 'the', 'sentence', 'or', 'the', 'ask.'],
        distractors: ['hook'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your pitch in three lengths: 10 seconds, 30 seconds and 60 seconds. Which parts did you drop for the shorter ones?',
    starters: ['10 seconds: ...', '30 seconds: ...', 'I dropped...'],
  },
  deepen: {
    title: 'The squeeze drill',
    summary: 'Ask a friend to call out a random length (10, 30, 45, 60 seconds) and give that version immediately. Practise until switching feels easy.',
  },
  notes: 'Modular, length-flexible pitches are standard networking and pitch-coaching advice. Ikeja is a district of Lagos.',
};

export default lesson;
