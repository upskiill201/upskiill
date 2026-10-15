import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: volume, pace and the power of the pause (Van Zant & Berger 2020, hedged). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Volume, pace and the power of the pause',
  summary: 'Tey asks David to read one line on air: "Donor buddies: sign up with a friend." First try: a whisper, at top speed. By the third try, the producer has goosebumps. Same words. Different voice.',
  minutes: 12,
  outcomes: [
    'Speak loud enough to reach the back, without shouting',
    'Slow down on the words that matter',
    'Use a pause before and after your key idea',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Tune your voice in four steps',
      steps: [
        {
          title: '1. Aim for the back of the room',
          body: 'Not louder than everyone: just loud enough for the person furthest away. Breathe in before you start; a full breath makes your voice steadier. Research on persuasive speakers suggests people sound more confident when they speak a little louder and vary their volume.',
        },
        {
          title: '2. Slow down on the important part',
          body: 'Nervous speakers rush. Rush the small talk if you must, but slow down for the idea itself: "Donor... buddies." Slower words sound more deliberate.',
        },
        {
          title: '3. Pause before your key idea',
          body: 'A short pause before the big line tells listeners "something matters now". Heads turn up from phones.',
        },
        {
          title: '4. Pause after it, and don\'t fill the silence',
          body: 'After your idea, stop for a second or two. It feels like forever to you. To listeners, it\'s thinking time. Don\'t fill it with "um, or whatever, it\'s probably stupid".',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'David\'s line, take 1 vs take 3',
      before: {
        label: 'Take 1',
        text: '(fast, quiet, looking down) "maybe-people-could-sign-up-with-a-friend-like-donor-buddies-or-whatever-it\'s-probably-stupid"',
      },
      after: {
        label: 'Take 3',
        text: '(breath, looking up) "I have an idea. (pause) Donor... buddies. (pause) Everyone signs up with a friend." (stops)',
      },
      notes: [
        'A breath and a full voice.',
        'A pause before and after the idea.',
        'The key words slowed down.',
        'No "or whatever, it\'s probably stupid" at the end.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Breathe. Aim for the back. Slow the key words. Pause before, pause after.',
    },
  ],
  apply: {
    scenario: 'Tey FM. Voice tuning, take 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How loud should David speak?',
        options: [
          { text: 'As loud as possible', why: 'Shouting isn\'t the goal.' },
          { text: 'Softly, so nobody feels interrupted', why: 'That\'s how the idea vanished.' },
          { text: 'Loud enough for the person furthest away to hear easily' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the voice steps in order.',
        lines: ['Take a breath', 'Pause before the key idea', 'Say the key words slowly', 'Pause after, and don\'t fill the silence'],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'The pause after feels SO awkward. Like everyone is staring at me.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Fill it with "um, or whatever".', why: 'That shrinks your idea.' },
          { text: 'To you it feels like forever. To them it\'s a second of thinking time. Let it sit.' },
          { text: 'Then skip the idea.', why: 'Never.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before your key idea, use a short ___. (one word)',
        answers: ['pause', 'breath'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps David be heard, or hides his idea?',
        groups: ['Helps', 'Hides'],
        items: [
          { text: 'A breath before speaking', group: 0 },
          { text: '"...or whatever, it\'s probably stupid"', group: 1 },
          { text: 'Slowing down on "donor buddies"', group: 0 },
          { text: 'Rushing the whole sentence', group: 1 },
          { text: 'A pause after the idea', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does research on persuasive speakers suggest?',
        options: [
          { text: 'Speaking a little louder and varying volume can make people sound more confident' },
          { text: 'Monotone voices persuade best', why: 'Variation helps.' },
          { text: 'Volume never matters', why: 'It does, a bit.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'David\'s take 2. Which part undoes the good work?',
        lines: [
          '(breath) "I have an idea."',
          '(pause) "Donor... buddies."',
          '"...but yeah, probably stupid, never mind, sorry."',
        ],
        bug: 2,
        fix: '"Everyone signs up with a friend." (stops)',
        explanation: 'Apologising straight after cancels the pause and the confidence. Say it, then stop.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it does.',
        pairs: [
          ['Pause before', '"Something matters now"'],
          ['Slow key words', 'Sounds deliberate'],
          ['Pause after', 'Thinking time for listeners'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s voice tips.',
        template: '[[1]]. Aim for the [[2]]. Slow the key [[3]].',
        blanks: [['Breathe'], ['back'], ['words']],
        distractors: ['Shout', 'front'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build David\'s take 3 opening.',
        tiles: ['I', 'have', 'an', 'idea.'],
        distractors: ['maybe', 'sorry,'],
      },
    ],
  },
  reflect: {
    prompt: 'Record yourself saying one idea you care about, twice: once at your normal speed, once with a breath, a slow key phrase and pauses. Which sounds more like someone worth listening to?',
    starters: ['Take 1 sounded...', 'Take 2 sounded...'],
  },
  deepen: {
    title: 'The two-second rule',
    summary: 'In your next conversation, after you make your main point, count two seconds silently before saying anything else. Notice who fills the silence, and how often it\'s someone responding to YOUR idea.',
  },
  notes: 'Van Zant & Berger (2020), Journal of Personality and Social Psychology 118(4): "How the voice persuades" — speakers trying to persuade raised volume and varied it, which listeners read as confidence, increasing persuasion (stated with "suggests"). Pausing and pace are standard public-speaking advice.',
};

export default lesson;
