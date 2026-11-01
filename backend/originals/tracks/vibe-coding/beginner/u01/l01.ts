import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Myth or Fact: what vibe coding is, and isn't. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Just vibe code it',
  summary: 'Saturday, Frenchmen Street, pouring rain. The band\'s clipboard of gig sign-ups turns to pulp. Benny says, "Just vibe code it, Miss B." Hazel has never coded. Can she?',
  minutes: 11,
  outcomes: [
    'Say in one sentence what vibe coding is',
    'Know what an AI coding tool does well, and where it slips',
    'Know your job in vibe coding: deciding and checking',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Vibe coding means describing what you want in plain words and letting an AI write the code.', isFact: true, explain: 'That\'s it. You say "a page that shows our fundraising total"; the AI writes the HTML, CSS and JavaScript.' },
        { text: 'You have to be a programmer before you can build anything this way.', isFact: false, explain: 'People with no coding background now ship real sites and small apps this way. You do have to learn to check what it builds, which is what this course is for.' },
        { text: 'If the AI says "Done, it works!", it works.', isFact: false, explain: '"Done" is a claim, not proof. AI tools sometimes say they fixed or tested something when they didn\'t. You check.' },
        { text: 'The AI can write code that looks perfect and is still wrong.', isFact: true, explain: 'It writes very fluent code. Fluent isn\'t the same as correct, so a page can look right and add numbers wrong.' },
        { text: 'You still decide what gets built, and whether it\'s good enough.', isFact: true, explain: 'The AI types. You are the director: you decide what to make, you check it, and you say when it\'s done.' },
        { text: 'Once it\'s built, there\'s nothing left to worry about.', isFact: false, explain: 'Real apps need backups, safe passwords and keys, and a way to undo mistakes. Every one of those gets its own chapter.' },
      ],
    },
    {
      kind: 'story',
      title: 'Frenchmen Street, 4 p.m.',
      beats: [
        { speaker: 'narrator', text: 'A second line parade, rain coming sideways. Twenty-four kids in gold shirts, a tuba full of water, and a clipboard turning to paste in Hazel\'s hands.' },
        { speaker: 'hazel', text: 'That was every gig sign-up for the month. And the pledges. Fourteen hundred dollars of pledges.' },
        { speaker: 'benny', text: 'Miss B, nobody uses clipboards. Just vibe code an app. You tell the AI what you want and it builds it.' },
        { speaker: 'hazel', text: 'Benny, I can\'t code. I can barely work the copier.' },
        { speaker: 'benny', text: 'That\'s the point. You don\'t type the code. You just have to know what you want.' },
        { speaker: 'tey', text: 'Benny\'s half right. You don\'t type the code. But "knowing what you want" and "checking what you got" are real skills. That\'s the whole course.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The goal: $18,000 in eight weeks, to take 24 kids to the National Brass Showcase in Washington, D.C. You\'ll build your own projects alongside Hazel\'s.',
    },
  ],
  apply: {
    scenario: 'Under the awning on Frenchmen Street: what is this vibe coding thing?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is vibe coding?',
        options: [
          { text: 'Building software by describing what you want to an AI, which writes the code' },
          { text: 'Coding while listening to music', why: 'Fun, but not what the word means.' },
          { text: 'Copying code from websites until it works', why: 'That\'s a different (older) habit. In vibe coding, an AI writes code from your words.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who does what in vibe coding?',
        groups: ['The AI', 'You'],
        items: [
          { text: 'Types the code', group: 0 },
          { text: 'Decides what to build', group: 1 },
          { text: 'Checks that it really works', group: 1 },
          { text: 'Suggests how to build it', group: 0 },
          { text: 'Says when it\'s good enough', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'It told me "Done! Your app works perfectly." So we\'re finished, right?',
        prompt: 'Hazel\'s best reply?',
        options: [
          { text: 'Yes, it said so.', why: '"Done" is a claim. It needs checking.' },
          { text: 'No, AI never works.', why: 'It often does work. That\'s why the mistakes are easy to miss.' },
          { text: 'Let\'s open it and try it ourselves first.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish Tey\'s rule.',
        template: 'The AI writes the code. I [[1]] what gets built, and I [[2]] that it works.',
        blanks: [['decide'], ['check']],
        distractors: ['hope', 'guess'],
      },
      {
        kind: 'mcq',
        prompt: 'The AI writes a page that looks perfect. What do you still not know?',
        options: [
          { text: 'Whether it has nice colours', why: 'You can see that.' },
          { text: 'Whether it actually does the right thing, like adding the numbers correctly' },
          { text: 'Nothing: if it looks right, it is right', why: 'Code can look right and be wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Code', 'The instructions a computer follows'],
          ['Prompt', 'What you type to the AI'],
          ['App', 'Software people use to get something done'],
          ['Bug', 'A mistake that makes software do the wrong thing'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Benny\'s pep talk is wrong?',
        lines: [
          'You describe what you want in plain words.',
          'The AI writes the code for you.',
          'You never have to check anything.',
          'You can change it by asking again.',
        ],
        bug: 2,
        fix: 'You always check what the AI built.',
        explanation: 'The AI can be confidently wrong. Checking is your half of the job.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word: a mistake in software that makes it do the wrong thing.',
        answers: ['bug', 'a bug'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Hazel can\'t code. What\'s the most useful skill she can bring?',
        options: [
          { text: 'Typing fast', why: 'The AI does the typing.' },
          { text: 'Memorising programming languages', why: 'Useful later, not needed to start.' },
          { text: 'A good keyboard', why: 'Any keyboard works.' },
          { text: 'Knowing exactly what the band needs, and testing it like a real user' },
        ],
        answer: 3,
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'Tey, be honest. Can someone like me really build an app?',
        prompt: 'The honest answer?',
        options: [
          { text: 'Yes, a small real one, if you learn to brief it, check it and keep it safe. That\'s what we\'ll do.' },
          { text: 'Yes, in five minutes, with no effort.', why: 'Fast to start, but a real app takes care and checking.' },
          { text: 'No, only programmers can.', why: 'Beginners do build real things this way now.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing in your life that runs on a "clipboard" (paper, a messy spreadsheet, a group chat) and could be a small app?',
    starters: ['In my life, ... runs on...', 'An app could...'],
  },
  deepen: {
    title: 'Your project list',
    summary: 'Write down three things you\'d love to build: one tiny (a page about you), one small (a tracker or calculator), one real (something other people would log in to). You\'ll build all three in this course.',
  },
  notes: '"Vibe coding" was coined by Andrej Karpathy in February 2025 for building by describing intent to an AI; the course uses the common meaning. Story: Esplanade High and the National Brass Showcase are fictional; Frenchmen Street and second lines are real New Orleans.',
};

export default lesson;
