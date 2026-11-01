import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Sunday, 8:01 p.m.',
  summary: 'Week 7. At 8 p.m. Kofi\'s phone says "Laptop: check the jar." At 8:01 the GH₵70 has already moved. He didn\'t have to do anything. Check what you know: automatic saving, pay yourself first, distance and names.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Set up saving that runs without you', 'Choose the right distance and name for each pot'],
  learn: [
    {
      kind: 'story',
      title: 'It moved',
      beats: [
        { speaker: 'kofi', text: 'It moved on its own. I didn\'t even open the app.' },
        { speaker: 'efua', text: 'Welcome to the boring club. Best club there is.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: on autopilot.',
    items: [
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Pay yourself [[1]].',
        blanks: [['first']],
        distractors: ['last', 'later'],
      },
      {
        kind: 'mcq',
        prompt: 'When should savings move?',
        options: [
          { text: 'At the end of the month, if there\'s some left', why: 'That\'s "save what\'s left". It rarely works.' },
          { text: 'Whenever he remembers', why: 'He forgot in weeks 5 and 6.' },
          { text: 'When money arrives, before spending' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reachable within a day, or with distance?',
        groups: ['Reachable', 'With distance'],
        items: [
          { text: 'Emergency fund', group: 0 },
          { text: 'Laptop jar', group: 1 },
          { text: 'Holiday in a year', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵230 on the 1st plus GH₵70 every Sunday for 4 Sundays. Total for the month?',
        answers: ['510', 'GH₵510', '510 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the research.',
        pairs: [
          ['Commitment account', 'Philippines study'],
          ['Photo on savings envelope', 'India study'],
          ['Goal reminders', 'Reminder study'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I named my savings "Sneakers fund". Is that earmarking?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'No, sneakers don\'t count.', why: 'Any goal counts. Earmarking is about the name and purpose.' },
          { text: 'Yes! Now put it in its own pot and add a weekly reminder.' },
          { text: 'Rename it "Savings 2".', why: 'Vague names are easier to raid.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this system will leak?',
        lines: [
          'Transfer scheduled for payday.',
          'Savings pot named for the goal.',
          'Savings pot linked to the food delivery app.',
        ],
        bug: 2,
        fix: 'Keep savings unlinked from spending apps.',
        explanation: 'One tap from a food order is too close.',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵90 leaked in two missed weeks. What fixed it?',
        options: [
          { text: 'Trying harder', why: 'He already tried.' },
          { text: 'A bigger goal', why: 'The goal wasn\'t the issue.' },
          { text: 'A system that moves money without relying on memory' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what\'s a leak?',
        options: [
          { text: 'Money that buys nothing you value' },
          { text: 'Any spending at all', why: 'Choices with real value aren\'t leaks.' },
          { text: 'Only big spending', why: 'Most leaks are small and repeated.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 2: at GH₵20 an hour, how many hours is GH₵140?',
        answers: ['7', 'seven', '7 hours'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the automatic set-up.',
        lines: ['Pick payday', 'Decide the amount', 'Schedule the transfer', 'Make it hard to reverse', 'Check it worked'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you set anything up to save automatically yet? If not, what\'s the one step you could do today?',
    starters: ['I\'ve set up...', 'Today I could...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4 with two Chapter 2 review items.',
};

export default lesson;
