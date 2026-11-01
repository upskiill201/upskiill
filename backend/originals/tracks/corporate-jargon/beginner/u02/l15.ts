import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 plus earlier. Story beat: Zanele takes over the stand-up. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Zanele takes over the stand-up',
  summary: 'Brian asks Zanele to run Thursday afternoon\'s stand-up. She has learned every meeting phrase this week, and she uses all of them. In fifteen minutes.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Use questions, disagreement, steering and wrap-up phrases in a real meeting', 'Spot meeting phrases used at the wrong moment'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 4:00 p.m.',
      beats: [
        { speaker: 'zanele', text: 'Welcome, everyone! The purpose today is a stand-up. Shall we get started? Let\'s take a step back and look at the big picture.' },
        { speaker: 'narrator', text: 'It\'s 4:00 and five seconds. Nobody has said anything yet.' },
        { speaker: 'zanele', text: 'Remi, your update. Actually, to piggyback on that, any other business? No? In the interest of time, let\'s recap!' },
        { speaker: 'remi', text: 'I... haven\'t said anything yet.' },
        { speaker: 'tey', text: "All the right phrases. All in the wrong order. Your turn to sort it out." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3. Zanele\'s stand-up, take two.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Zanele\'s stand-up back in a sensible order.',
        lines: ['Shall we get started?', 'Remi, what did you do, what\'s next, anything blocking you?', 'To recap: two blockers, both going to Brian.', 'Any other business?'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Let\'s take a step back and look at the big picture" odd at 4:00 and five seconds?',
        options: [
          { text: 'It\'s rude to say in a stand-up', why: 'Not rude, just in the wrong place.' },
          { text: 'There\'s nothing to step back from yet: it\'s for steering a meeting that\'s lost' },
          { text: 'Stand-ups don\'t allow steering', why: 'They do, if they go off track. This one hadn\'t started.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to the right moment.',
        pairs: [
          ['Shall we get started?', 'The very beginning'],
          ['Going round in circles', 'When nothing is moving'],
          ['To recap', 'Near the end'],
          ['Sorry to jump in', 'Someone needs to interrupt'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Remi, I think Emeka\'s courier test is pointless. Should I say "with all due respect" in the stand-up?',
        prompt: 'What does Remi advise?',
        options: [
          { text: 'Yes, it\'s very polite.', why: 'It usually warns that something rude is coming.' },
          { text: 'Try "I see it a bit differently, because..." and suggest something. Maybe after the stand-up, with Emeka.' },
          { text: 'Never disagree.', why: 'Disagreeing is fine. The way matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which is it?',
        groups: ['Asking', 'Disagreeing', 'Steering'],
        items: [
          { text: 'Quick clarifying question...', group: 0 },
          { text: 'I see it a bit differently...', group: 1 },
          { text: 'We\'re in the weeds.', group: 2 },
          { text: 'Have we considered testing first?', group: 1 },
          { text: 'Let\'s take a step back.', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'AOB stands for "any other ___". (one word)',
        answers: ['business'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s stand-up update. Which line belongs somewhere else?',
        lines: [
          'Yesterday I tracked the courier test set-up.',
          'Today I\'m finishing the pre-read for Friday.',
          'Now let me go down the rabbit hole of every invoice code.',
          'Blocked: I still need invoice system access.',
        ],
        bug: 2,
        fix: 'Delete it, and take the invoice codes offline.',
        explanation: 'A stand-up is three lines. Rabbit holes go offline.',
      },
      {
        kind: 'mcq',
        prompt: 'Remi has a question that only matters to his own task. When should he ask it?',
        options: [
          { text: 'In the middle of the all-hands', why: 'Two hundred people don\'t need it.' },
          { text: 'Never', why: 'Questions are fine. Just pick the right moment.' },
          { text: 'After the meeting, directly to the person' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What makes a good next step?',
        options: [
          { text: 'A name, a task and a date' },
          { text: 'A good feeling', why: 'Feelings don\'t get things done by Monday.' },
          { text: '"Someone should look at it"', why: 'Someone = no one.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Swamped', 'Very busy'],
          ['Quick win', 'Easy and useful'],
          ['On my radar', 'I\'m aware of it'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Zanele\'s fixed close.',
        template: 'We\'re nearly at [[1]]. To [[2]]: two blockers, both to Brian. Any other [[3]]?',
        blanks: [['time'], ['recap'], ['business']],
        distractors: ['weeds', 'drones'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Zanele should say to open the stand-up.',
        tiles: ['Shall', 'we', 'get', 'started?', 'Remi,', 'you\'re', 'first.'],
        distractors: ['recap', 'AOB'],
      },
    ],
  },
  reflect: {
    prompt: 'Which meeting phrase from this chapter do you most want to use yourself? Write the exact moment you\'ll use it.',
    starters: ['The phrase is...', 'I\'ll use it when...'],
  },
  deepen: {
    title: 'Run a 10-minute stand-up',
    summary: 'With friends, classmates or family: open it, take three lines from everyone, recap, AOB, close. It\'s good practice for running real meetings, and surprisingly fun.',
  },
  notes: 'Review of lessons 11–14 plus earlier in the chapter and Chapter 1.',
};

export default lesson;
