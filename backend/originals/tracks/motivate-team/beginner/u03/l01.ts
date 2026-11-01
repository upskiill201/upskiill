import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: Bisi rewrites the onboarding script over a weekend. Autonomy vs control. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The weekend script',
  summary: 'Week 4, Monday. Bisi has rewritten the entire clinic onboarding script over the weekend. It\'s shorter, warmer, and in plain English, Yoruba and Pidgin. Nobody approved it. She\'s already used it on three clinics. All three went live the same day.',
  minutes: 11,
  outcomes: [
    'See how autonomy can unlock motivation',
    'Notice the leader\'s urge to control',
    'Know this chapter\'s goal: give people room to run, safely',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 4, Monday, 8:50 a.m.',
      beats: [
        { speaker: 'bisi', text: 'Before you say anything: I rewrote the script. The old one was written by a consultant who\'d never met a nurse. Three clinics went live on Saturday using mine.' },
        { speaker: 'narrator', text: 'Miracle reads it. It\'s brilliant. It\'s also not approved, it\'s in three languages nobody reviewed, and Folake has a rule about scripts.' },
        { speaker: 'narrator', text: 'Miracle feels two things at once: delight, and an itch to take control. Bisi is watching her face. Four years, three managers, and this is the first time she\'s tried something big.' },
      ],
      choice: {
        prompt: 'What should Miracle say?',
        options: [
          {
            text: '"This is brilliant, Bisi. Let\'s keep it. Can we agree what needs checking, like the medical terms, and then it\'s yours to run?"',
            outcome: 'Bisi\'s face changes. Halima offers to check the medical wording. By Wednesday, the script is official, and Bisi owns it.',
            best: true,
          },
          {
            text: '"You can\'t change scripts without approval. Please use the old one."',
            outcome: 'Correct, technically. Bisi goes back to the old script, and quietly back to doing the minimum.',
          },
          {
            text: '"Great! I\'ll rewrite it properly and send it round."',
            outcome: 'Miracle\'s version is fine. Bisi\'s name isn\'t on it. She doesn\'t try anything big again for a long time.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Bisi had ideas for four years. Nobody asked, nobody let her try. The moment she had room, she ran. Autonomy, having some choice in how you work, is one of the three needs from Chapter 1, and it's often the hardest for leaders to give, because giving it means letting go. <strong>This chapter:</strong> what rewards do and don't do, giving autonomy safely, building mastery, the power of small progress, confidence, and what to do when someone's idea fails.</p>",
    },
  ],
  apply: {
    scenario: 'Monday, the weekend script.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Bisi rewrite the script on her own?',
        options: [
          { text: 'She was bored at the weekend', why: 'She cared enough to spend her weekend on it.' },
          { text: 'She\'d had ideas for years and finally had room to try' },
          { text: 'To annoy Folake', why: 'She wanted clinics to go live faster.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Gives autonomy, or takes it back?',
        groups: ['Gives autonomy', 'Takes it back'],
        items: [
          { text: '"Let\'s keep it. It\'s yours to run."', group: 0 },
          { text: '"Use the old script."', group: 1 },
          { text: '"What needs checking?"', group: 0 },
          { text: '"I\'ll rewrite it properly."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'So... am I in trouble?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'A little. Next time ask first.', why: 'True, but it buries the big win.' },
          { text: 'Not this time.', why: 'Sounds like a warning.' },
          { text: 'The opposite. Three clinics live in one day! Let\'s get Halima to check the medical terms, then it\'s officially yours.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Having some choice in how you work: ___. (one word)',
        answers: ['autonomy', 'Autonomy'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s response in order.',
        lines: ['Say what\'s brilliant', 'Agree what needs checking', 'Get it checked quickly', 'Hand ownership to Bisi'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I\'ll rewrite it properly" a mistake?',
        options: [
          { text: 'It takes the ownership, and Bisi\'s name, away from her' },
          { text: 'Miracle can\'t write', why: 'She can. That\'s not the issue.' },
          { text: 'It\'s too slow', why: 'Ownership is the issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s message to Folake. Which line takes autonomy back?',
        lines: [
          'Bisi rewrote the onboarding script; three clinics went live in a day.',
          'From now on, I\'ll approve every line of every script myself.',
          'Halima is checking the medical terms by Wednesday.',
        ],
        bug: 1,
        fix: 'Bisi will own the script, with a medical check on changes.',
        explanation: 'Approving every line herself makes Miracle the bottleneck and Bisi a typist.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 2 review.',
        pairs: [
          ['Task significance', 'Seeing who you help'],
          ['Task identity', 'A whole piece of work'],
          ['Outcome goal', 'Clinics, not tickets'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Give people [[1]] to run, with [[2]] that keep it safe.',
        blanks: [['room', 'space', 'freedom'], ['guardrails', 'checks']],
        distractors: ['orders', 'rules'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s first words.',
        tiles: ['This', 'is', 'brilliant,', 'Bisi.'],
        distractors: ['wrong'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you had an idea at work or school and someone let you run with it, or didn\'t. How did it change how much you cared?',
    starters: ['I had an idea to...', 'When they let me / didn\'t let me...'],
  },
  deepen: {
    title: 'Let one idea run',
    summary: 'If someone you lead has an idea, ask: "What would need checking for this to be safe?" Then let them run it.',
  },
  notes: 'Story setup. Autonomy as a basic psychological need (Deci & Ryan). Fictional events.',
};

export default lesson;
