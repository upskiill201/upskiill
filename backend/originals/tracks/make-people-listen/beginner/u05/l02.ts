import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. "Myth or Mic Drop": why pushing makes people push back (psychological reactance). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Myth or Mic Drop: why pushing makes people push back',
  summary: 'Miracle has a new plan: a PowerPoint for her parents. Twenty slides. Slide one: "Why You Should Let Me Go to Lagos". Tey: "Producer... we need to talk about reactance."',
  minutes: 11,
  outcomes: [
    'Know what psychological reactance is',
    'Spot controlling language that triggers it',
    'Leave people room to decide for themselves',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'The harder you push, the more likely people are to agree.', isFact: false, explain: 'Myth. Psychologists call the pushback "reactance": when people feel their freedom to choose is under threat, they often resist, sometimes moving further the other way.' },
        { text: 'Words like "you must", "you should" and "you have to" can make people resist.', isFact: true, explain: 'Mic drop. Research on reactance suggests controlling, demanding language tends to make people resist messages more, even good messages.' },
        { text: 'Reminding people they\'re free to decide can make them more open.', isFact: true, explain: 'Mic drop. Some studies suggest adding something like "but it\'s your choice" can make people more willing to agree, because their freedom isn\'t threatened.' },
        { text: 'Parents push back because they don\'t respect you.', isFact: false, explain: 'Myth, usually. People of any age push back when they feel pushed. Miracle\'s parents feel their role in her life is being taken away.' },
        { text: 'More arguments always beat fewer arguments.', isFact: false, explain: 'Myth. Twenty slides can feel like a pressure campaign. One clear reason, after listening, often lands better.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Pushing vs inviting',
      before: {
        label: 'Pushing',
        text: '"You HAVE to let me go. You should trust me. You need to understand that this is my life."',
      },
      after: {
        label: 'Inviting',
        text: '"I\'d really like you to understand why this matters to me. Can I tell you, and then hear what worries you?"',
      },
      notes: [
        '"Have to", "should", "need to" disappear.',
        'It asks permission instead of demanding attention.',
        'It promises to listen to them, too.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Push, and people push back. Invite, and they have room to move.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Myth or Mic Drop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is psychological reactance?',
        options: [
          { text: 'Reacting quickly to news', why: 'Not that kind of reaction.' },
          { text: 'Pushing back when you feel your freedom to choose is being threatened' },
          { text: 'Agreeing with whoever speaks loudest', why: 'Close to the opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Pushing, or inviting?',
        groups: ['Pushing', 'Inviting'],
        items: [
          { text: '"You have to let me go."', group: 0 },
          { text: '"Can I tell you why it matters to me?"', group: 1 },
          { text: '"You should trust me."', group: 0 },
          { text: '"What worries you most?"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'But my PowerPoint is SO good. Twenty slides, with charts!',
        prompt: 'What does Tey say?',
        options: [
          { text: 'It\'s brilliant, and it will feel like a pressure campaign. Start with listening, then one clear reason.' },
          { text: 'Make it forty slides.', why: 'More push, more pushback.' },
          { text: 'Email it to them instead.', why: 'Still a pressure campaign, now with attachments.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pushback when people feel their freedom is threatened is called ___. (one word)',
        answers: ['reactance'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What do some studies suggest about adding "but it\'s your choice"?',
        options: [
          { text: 'It always makes people say no', why: 'Often the opposite.' },
          { text: 'It has no effect', why: 'Some studies find it helps.' },
          { text: 'It can make people more open, because their freedom isn\'t threatened' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s inviting opener in order.',
        lines: ['"I\'d really like you to understand why this matters to me."', '"Can I tell you?"', '"And then I want to hear what worries you."'],
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s opener draft. Which line will trigger reactance?',
        lines: [
          'Mama, Papa, can we talk about the job offers?',
          'You need to accept that I\'m going to Lagos and that\'s final.',
          'I want to hear what worries you most.',
        ],
        bug: 1,
        fix: 'I\'d love you to understand why Lagos matters to me.',
        explanation: '"You need to accept... that\'s final" removes their voice. Expect pushback.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Firm and warm', 'Hard on the point, soft on the person'],
          ['Position', 'What people say'],
          ['Worry underneath', 'What people feel'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: '[[1]], and people push back. [[2]], and they have [[3]] to move.',
        blanks: [['Push'], ['Invite'], ['room', 'space']],
        distractors: ['Shout', 'slides'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an inviting line.',
        tiles: ['Can', 'I', 'tell', 'you', 'why', 'it', 'matters', 'to', 'me?'],
        distractors: ['must'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone pushed you to do something, even something good. How did you react? What would have made you more open?',
    starters: ['When they pushed, I...', 'I would have been more open if...'],
  },
  deepen: {
    title: 'Delete one "should"',
    summary: 'For a day, notice every "you should", "you need to" and "you have to" you say to others. Try replacing one with a question or an invitation, and see how the response changes.',
  },
  notes: 'Psychological reactance: Brehm (1966). Controlling language increases reactance: e.g. Miller, Lane, Deatrick, Young & Potts (2007), Human Communication Research 33(2); Dillard & Shen (2005). Meta-analysis: Rains (2013), Human Communication Research 39(1). "But you are free" technique: Carpenter (2013) meta-analysis, Communication Studies 64(1) — modest effect. All hedged ("suggest", "can").',
};

export default lesson;
