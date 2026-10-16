import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the one-on-one week',
  summary: 'Six one-on-ones in a week. Lucía learned that Marta works until 9 p.m., that Diego wants to mentor someone, and that Sofía has ideas she never says out loud. Quick check before Friday.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use one-on-one and safety tools without notes', 'Connect them to Chapter 1'],
  learn: [
    {
      kind: 'story',
      title: 'Week 3, Thursday evening',
      beats: [
        { speaker: 'lucia', text: 'Six one-on-ones. I talked way less than I thought I would. And I learned more in a week than in six years of sitting next to these people.' },
        { speaker: 'narrator', text: 'Her notebook: "Marta, 9 p.m. most nights?? Diego wants to mentor. Sofía: three ideas, has told nobody. Tomás: scared of breaking things."' },
        { speaker: 'lucia', text: 'Now I just have to do something with it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the best default rhythm for one-on-ones, according to Rogelberg?',
        options: [
          { text: 'Once a year at review time', why: 'Far too rare.' },
          { text: 'Weekly, about 30 minutes' },
          { text: 'Daily, two hours', why: 'Far too much.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a one-on-one in order.',
        lines: ['Their question first', 'Follow-ups', 'How can I help?', 'Next steps, written down'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds psychological safety, or breaks it?',
        groups: ['Builds it', 'Breaks it'],
        items: [
          { text: 'Thanking someone for bad news', group: 0 },
          { text: 'Mocking a "stupid" question', group: 1 },
          { text: 'Admitting your own mistake', group: 0 },
          { text: 'Punishing the person who raised a problem', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Quiz: does psychological safety mean we never disagree?',
        prompt: 'Your answer?',
        options: [
          { text: 'Yes, harmony first.', why: 'That\'s the myth.' },
          { text: 'It means low standards.', why: 'Also a myth.' },
          { text: 'No. It means people CAN disagree, speak up and admit mistakes without paying a price.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a one-on-one, the ___ drives the agenda. (one word)',
        answers: ['employee', 'person', 'report'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Lucía learned Marta works until 9 p.m. most nights. What\'s the best next step?',
        options: [
          { text: 'Ask Marta about it in their next one-on-one and look at her workload together' },
          { text: 'Praise her dedication in the team meeting', why: 'That rewards burning out.' },
          { text: 'Ignore it; it\'s her choice', why: 'It may be a sign she\'s overloaded.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan for Friday. Which line breaks this chapter\'s advice?',
        lines: [
          'Ask Diego if he\'d like to mentor Tomás.',
          'Tell the team Tomás broke the newsletter, as a warning to everyone.',
          'Invite Sofía to share one of her ideas, if she\'d like to.',
        ],
        bug: 1,
        fix: 'Share what WE learned from the newsletter, without blaming anyone.',
        explanation: 'Naming and shaming Tomás would teach the whole team to hide mistakes.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Early wins', 'Small, visible, theirs'],
          ['One-on-ones', 'Weekly, their agenda'],
          ['Leading your friend', 'Name the change'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What was the most important dynamic in Google\'s Project Aristotle?',
        options: [
          { text: 'Having the smartest people', why: 'How teams worked mattered more than who was on them.' },
          { text: 'Psychological safety' },
          { text: 'Free lunch', why: 'Nice, but no.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 so far.',
        template: 'Meet [[1]]. Let them [[2]] most. Make it safe to [[3]] up.',
        blanks: [['weekly'], ['talk'], ['speak']],
        distractors: ['yearly', 'shut'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s lesson of the week.',
        tiles: ['I', 'talked', 'less', 'and', 'learned', 'more.'],
        distractors: ['louder'],
      },
    ],
  },
  reflect: {
    prompt: 'If you had one-on-ones with the people around you this week, what do you think you\'d learn that you don\'t know now?',
    starters: ['I\'d probably learn...', 'I\'d want to ask...'],
  },
  deepen: {
    title: 'One honest question',
    summary: 'Ask one person you work with: "What\'s something about your work you wish I knew?" Then just listen.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapter 1.',
};

export default lesson;
