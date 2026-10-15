import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint, "The Phone-In Quiz". Reviews lessons 1–4 plus earlier chapters. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'The Phone-In Quiz: Lucía\'s Monday meeting',
  summary: 'Lucía tried the tools at Monday\'s meeting. Diego interrupted twice instead of nine times, and she held the floor both times. Tey celebrates in the only way Tey FM knows how: the Phone-In Quiz.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Hold the floor and lead with decisions without notes', 'Tell cooperative from intrusive interruptions'],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:55 p.m.',
      beats: [
        { speaker: 'lucia', text: 'Two interruptions! Down from nine! I said "Hold that thought, Diego" and he actually... held it. Then when I said "Diego, you wanted to say something?" he looked so happy.' },
        { speaker: 'tey', text: "Ignore-o-Meter: falling! And since you're on a winning streak... it's the Tey FM Phone-In Quiz!" },
        { speaker: 'lucia', text: 'Can I hold that thought?' },
        { speaker: 'tey', text: "Nice try." },
      ],
    },
  ],
  apply: {
    scenario: 'The Tey FM Phone-In Quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a cooperative and an intrusive interruption?',
        options: [
          { text: 'Cooperative is quieter', why: 'Volume isn\'t the difference.' },
          { text: 'Cooperative shows you\'re listening; intrusive takes the floor or topic away' },
          { text: 'There\'s no difference', why: 'There\'s a big one.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Diego interrupts. Put Lucía\'s steps in order.',
        lines: ['Finish her sentence', '"Hold that thought, Diego"', 'Finish her point', 'Return the floor to Diego'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Lucía hold the room, or hurts?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Decision in the first sentence', group: 0 },
          { text: 'A long, slow build-up', group: 1 },
          { text: '"Three quick points, then your ideas"', group: 0 },
          { text: 'Shouting over Diego', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: '(mid-update) Wait wait wait, what about influencers?',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: '"Influencers. Fine. Let\'s talk about influencers."', why: 'And the update disappears again.' },
          { text: '"Diego. Silence."', why: 'Firm, but cold, in front of the team.' },
          { text: '"Good question, I\'ll come to you in one minute. I\'m nearly there."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Research suggests people who feel more ___ in a group tend to interrupt more. (one word)',
        answers: ['senior', 'confident', 'powerful', 'important'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Diego interrupt less on Monday?',
        options: [
          { text: 'There were no gaps to fill, and he knew his turn was coming' },
          { text: 'He was off sick', why: 'He was very much there.' },
          { text: 'Lucía shouted louder', why: 'She didn\'t need to.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s meeting plan. Which line repeats yesterday\'s mistake?',
        lines: [
          'Open with the decision.',
          'Then spend five minutes on background before getting to any point.',
          'Then invite ideas, Diego\'s first.',
        ],
        bug: 1,
        fix: 'Then three quick points on why.',
        explanation: 'A long background section is a gap. Decision, three points, invitation.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which caller?',
        pairs: [
          ['"Hold that thought"', 'Lucía'],
          ['"Donor buddies" with a pause', 'David'],
          ['"A shop with one till"', 'Arjun'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the research on gender and interruptions suggest?',
        options: [
          { text: 'Gender always explains every interruption', why: 'Too strong.' },
          { text: 'Some studies find women are interrupted more; the overall picture is mixed and depends on the setting' },
          { text: 'Gender never matters', why: 'Some research suggests it can.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 so far.',
        template: '[[1]] first. Say how much is [[2]]. Hold that [[3]].',
        blanks: [['Decision'], ['coming'], ['thought']],
        distractors: ['Build-up', 'shout'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a holding phrase.',
        tiles: ['Let', 'me', 'finish', 'this', 'one,', 'then', 'your', 'view.'],
        distractors: ['stop'],
      },
    ],
  },
  reflect: {
    prompt: 'Which tool from this chapter would help you most in your next meeting or group conversation, and how will you use it?',
    starters: ['The tool is...', 'I\'ll use it when...'],
  },
  deepen: {
    title: 'Plan the first sentence',
    summary: 'Before your next meeting, write down your first sentence (the decision or news) and your preview ("three quick points, then your ideas"). Say them out loud once before you go in.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus earlier chapters.',
};

export default lesson;
