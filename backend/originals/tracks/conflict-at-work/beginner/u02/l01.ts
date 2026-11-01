import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: the raised voice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The raised voice',
  summary: 'Thursday\'s design review. Grace plays a video of a patient failing step 3. Femi\'s voice rises: "We don\'t have time for this!" The room goes still. Then Grace remembers the ward.',
  minutes: 11,
  outcomes: [
    'Notice how an argument escalates',
    'See your own voice as a tool to calm it',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Design review',
      beats: [
        { speaker: 'narrator', text: 'Grace plays a clip: Mrs Ahmed, 71, taps the wrong button four times and gives up on booking.' },
        { speaker: 'femi', text: '(louder and faster) We don\'t have time for this! Every week there\'s a new problem!' },
        { speaker: 'narrator', text: 'The room goes still. Grace feels her heart thump. Then a ward memory: an angry son, 3 a.m., her voice going lower.' },
        { speaker: 'grace', text: '(slowly, quietly) Femi, I can hear how much pressure the 14th is putting on you. Can we look at the smallest fix?' },
        { speaker: 'narrator', text: 'Femi breathes out. "Sorry. Yeah. What\'s the smallest fix?"' },
        { speaker: 'tey', text: 'This chapter: the calm-down sequence, naming feelings, soft starts, what to say as it heats up, and calming groups.' },
      ],
      choice: {
        prompt: 'What made Grace\'s reply work?',
        options: [
          { text: 'She slowed down, lowered her voice, named his pressure, and moved to a small next step', outcome: 'Yes. Calm is contagious, and so is a clear next step.', best: true },
          { text: 'She proved she was right', outcome: 'She didn\'t argue the point at all; she lowered the temperature first.' },
          { text: 'She told him to calm down', outcome: 'She didn\'t, and that\'s why it worked. "Calm down" usually does the opposite.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When someone\'s voice rises, lower and slow yours. Name what they\'re feeling. Then offer a small next step.',
    },
  ],
  apply: {
    scenario: 'The raised voice.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Calms it down, or heats it up?',
        groups: ['Calms', 'Heats up'],
        items: [
          { text: 'Speaking slower and lower', group: 0 },
          { text: '"Calm down!"', group: 1 },
          { text: 'Naming their pressure', group: 0 },
          { text: 'Raising your voice to match', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "calm down" usually fail?',
        options: [
          { text: 'It works every time', why: 'It usually escalates.' },
          { text: 'It\'s too quiet', why: 'It\'s about what it signals.' },
          { text: 'It sounds like their feelings don\'t count, so they get more upset' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of Grace\'s reply to what it did.',
        pairs: [
          ['Slow, quiet voice', 'Lowered the temperature'],
          ['"I can hear the pressure"', 'Named his feeling'],
          ['"The smallest fix?"', 'Moved to a next step'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'My heart was thumping. How did my voice stay calm?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Luck.', why: 'It\'s a trained skill.' },
          { text: 'Practice. You did it on the ward for 18 years. Your voice can be calm even when your heart isn\'t.' },
          { text: 'You weren\'t really upset.', why: 'Her heart was thumping.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How old is Mrs Ahmed in Grace\'s video?',
        answers: ['71', 'seventy-one'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'When their voice rises, [[1]] and slow [[2]].',
        blanks: [['lower'], ['yours']],
        distractors: ['raise', 'theirs'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask about "the smallest fix"?',
        options: [
          { text: 'To avoid the issue', why: 'It still addresses step 3.' },
          { text: 'Small fixes are always best', why: 'It\'s about lowering pressure first.' },
          { text: 'A small, doable step feels less threatening than a big problem' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Grace\'s first instinct would have escalated things?',
        lines: [
          'Take a breath.',
          'Speak slowly and quietly.',
          'Say: "If you\'d listened last week, we wouldn\'t be here."',
          'Ask about the smallest fix.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Blame meets blame and the fight grows.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['The calm-down sequence', 'Naming feelings', 'Soft starts', 'What to say as it heats up', 'Calming groups'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times did Mrs Ahmed tap the wrong button?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time someone raised their voice at you. What did you do with your own voice?',
    starters: ['They said...', 'My voice...'],
  },
  deepen: {
    title: 'Emotional contagion',
    summary: 'Psychologists call it emotional contagion: people tend to catch the emotions of those around them. A calm, slow voice can spread calm, just as a loud one spreads stress.',
  },
  notes: 'Fictional design review. Emotional contagion: Hatfield, Cacioppo & Rapson, Emotional Contagion (1994).',
};

export default lesson;
