import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Saturday morning',
  summary: 'Saturday, 8 a.m., band practice. Ruth arrives with coffee and questions: "So what is this thing, and why that one, and what did you install?" Show what you know.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain vibe coding and the tool choice', 'Recall what you need and how to install it'],
  learn: [
    {
      kind: 'story',
      title: 'Coffee with Ruth',
      beats: [
        { speaker: 'ruth', text: 'Benny tells me you\'re building the band an app with a robot.' },
        { speaker: 'hazel', text: 'An AI coding tool. I installed it last night.' },
        { speaker: 'ruth', text: 'I spent 32 years fixing other people\'s code. Convince me you know what you\'re doing.' },
        { speaker: 'tey', text: 'Ruth asks hard questions. Good. Help Hazel answer them.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: Ruth\'s questions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Ruth: "What does vibe coding actually mean?"',
        options: [
          { text: 'Hacking into apps', why: 'Nothing to do with hacking.' },
          { text: 'You describe what you want, the AI writes the code, and you check it' },
          { text: 'Writing code by hand, slowly', why: 'The AI writes the code.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'And when it says "Done, it works"?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Then it works.', why: 'Ruth\'s eyebrow goes up. "Done" is a claim.' },
          { text: 'That\'s a claim. I open it and test it myself.' },
          { text: 'I ask Benny.', why: 'Benny is enthusiastic, not a test.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reasons this course uses Claude Code, or not reasons?',
        groups: ['A reason', 'Not a reason'],
        items: [
          { text: 'It works on files on your own computer', group: 0 },
          { text: 'It asks before changing files', group: 0 },
          { text: 'It\'s free', group: 1 },
          { text: 'It never makes mistakes', group: 1 },
          { text: 'It works the way professional teams work', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool type to its description.',
        pairs: [
          ['Website builder', 'App appears in a browser, lives on their platform'],
          ['Editor helper', 'AI inside a code editor'],
          ['Coding agent', 'Works in a folder on your computer'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ruth: "Does my free Claude account work?"',
        options: [
          { text: 'Yes, any account works', why: 'The free plan doesn\'t include Claude Code.' },
          { text: 'Only on Tuesdays', why: 'Not a thing.' },
          { text: 'No. Claude Code needs a paid plan; check the price on the pricing page' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'How Hazel installed it, in order.',
        lines: [
          'Open PowerShell',
          'Paste the official install line',
          'Open a new PowerShell window',
          'Run claude --version',
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ruth reads Hazel\'s install notes. Which line is wrong?',
        lines: [
          'Mac: curl -fsSL https://claude.ai/install.sh | bash',
          'Windows: paste the PowerShell line into Command Prompt',
          'Check: claude --version',
        ],
        bug: 1,
        fix: 'Paste the Windows line into PowerShell.',
        explanation: 'Command Prompt says "irm is not recognized".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The command that moves you into a folder.',
        answers: ['cd'],
        placeholder: 'Two letters',
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s summary for Ruth.',
        template: 'The AI writes the code. I decide what to build, and I [[1]] that it works. I only install from the [[2]] docs.',
        blanks: [['check'], ['official']],
        distractors: ['hope', 'forum'],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'And if the school switches to a different AI tool next year?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Most of what I\'m learning carries over: briefing, checking, testing, git, security.' },
          { text: 'Then I start again from zero.', why: 'Most of the skills are habits that every tool needs.' },
          { text: 'I\'ll refuse to use it.', why: 'No need: the skills transfer.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Ruth: "Why not just build it on your phone?"',
        options: [
          { text: 'You can, it\'s the same', why: 'Building needs a computer.' },
          { text: 'Phones are illegal at school', why: 'That\'s not the reason.' },
          { text: 'Lessons work on a phone, but building needs a computer with a terminal' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'The AI\'s job, or Hazel\'s?',
        groups: ['The AI', 'Hazel'],
        items: [
          { text: 'Typing the code', group: 0 },
          { text: 'Knowing what the band needs', group: 1 },
          { text: 'Testing it like a parent would', group: 1 },
          { text: 'Suggesting a way to build it', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Ruth is a sceptic. Who\'s the sceptic in your life who\'ll ask "how do you know it works"? What will you show them?',
  },
  deepen: {
    title: 'Ready check',
    summary: 'Before lesson 6: Claude Code installed (claude --version prints a number) and your plan active. If not, go back to lesson 4.',
  },
  notes: 'Review of lessons 1–4.',
};

export default lesson;
