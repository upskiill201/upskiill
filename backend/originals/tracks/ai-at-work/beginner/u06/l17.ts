import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 17 — when plans change. Story: the bank moves the date. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When plans change',
  summary: 'Ten days before launch, the bank says settlement won\'t be ready until 15 September. Tolu panics. Ada shows him how to replan in an hour.',
  minutes: 12,
  outcomes: [
    'Replan calmly when something big changes',
    'Use AI to see what a change affects',
    'Tell people early, with options',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Two weeks late',
      beats: [
        { speaker: 'narrator', text: 'Tuesday. The bank emails: settlement for pilot shops won\'t be ready until 15 September, two weeks after launch.' },
        { speaker: 'ada', text: 'Paste the plan and the email in. Ask: "What tasks does this change affect, and what are our options?"' },
        { speaker: 'narrator', text: 'The AI lists 9 affected tasks and three options: delay launch two weeks; launch with daily manual settlement; launch with 10 shops instead of 20.' },
        { speaker: 'ada', text: 'Now we check each option with the people who\'d do the work, and take two of them to Tobi today.' },
        { speaker: 'tey', text: 'A change is just new information. Replan the parts it touches, and tell people early, with options, not just the problem.' },
      ],
      choice: {
        prompt: 'What should Tolu send Tobi?',
        options: [
          { text: 'The change, what it affects, two realistic options with their costs, and his recommendation', outcome: 'Yes. Tobi can decide in five minutes.', best: true },
          { text: 'Just the bank\'s email, forwarded', outcome: 'Tobi has to do all the thinking.' },
          { text: 'Nothing until the launch, in case it fixes itself', outcome: 'It won\'t, and the surprise will be worse.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When plans change: what changed, what it affects, two or three options with costs, your recommendation. Send it today.',
    },
  ],
  apply: {
    scenario: 'The bank has moved the settlement date.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Tolu\'s replan.',
        lines: ['Note what changed', 'Find what it affects', 'List options with costs', 'Check options with the people involved', 'Recommend one to Tobi'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps most?',
        options: [
          { text: 'What do I do?', why: 'Too open.' },
          { text: 'Here\'s our plan and the bank\'s email. Which tasks does the delay affect, and what are 3 realistic options, each with its cost and risk?' },
          { text: 'Rewrite the whole plan.', why: 'Only replan what the change touches.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Affected by the settlement delay, or not?',
        groups: ['Affected', 'Not affected'],
        items: [
          { text: 'First live payments at the launch', group: 0 },
          { text: 'Printing flyers', group: 1 },
          { text: 'Shop payout promises', group: 0 },
          { text: 'Booking the market permit', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I heard the bank is late. Is the launch cancelled?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Probably, yes.', why: 'There are real options.' },
          { text: 'Not cancelled. We have two options with Tobi today: launch on time with manual daily settlement, or move it two weeks. Decision by tonight.' },
          { text: 'Nothing\'s changed.', why: 'Don\'t hide it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Tell people [[1]], with [[2]], not just the problem.',
        blanks: [['early'], ['options']],
        distractors: ['late', 'excuses'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each option to its main cost.',
        pairs: [
          ['Delay two weeks', 'Shops wait; momentum drops'],
          ['Manual daily settlement', 'Extra work for Ada and the bank'],
          ['Launch with 10 shops', 'Less data from the pilot'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tolu\'s message to Tobi is missing something?',
        lines: [
          'Change: bank settlement ready 15 Sept, not 1 Sept.',
          'Affects: 9 tasks, mainly launch-day payments.',
          'Options: there are some options.',
          'Recommendation: launch on time with manual settlement.',
        ],
        bug: 2,
        fix: 'Options: (a) manual daily settlement, extra work; (b) delay 2 weeks, shops wait.',
        explanation: 'Tobi needs the options and their costs.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tasks did the AI say the delay affects?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question Ada asks the AI.',
        tiles: ['What', 'does', 'this', 'change', 'affect?'],
        distractors: ['fix'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm replan, or panic?',
        groups: ['Calm', 'Panic'],
        items: [
          { text: 'Listing what\'s affected', group: 0 },
          { text: 'Rewriting the whole plan at midnight', group: 1 },
          { text: 'Checking options with the people involved', group: 0 },
          { text: 'Telling nobody', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why check options with the people who\'d do the work?',
        options: [
          { text: 'To share the blame', why: 'It\'s about realistic options.' },
          { text: 'No need; AI listed them', why: 'The AI doesn\'t know their workload.' },
          { text: 'They know if it\'s really possible, and what it costs them' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'When should Tolu tell Tobi?',
        options: [
          { text: 'Today, with options' },
          { text: 'After the launch', why: 'Too late.' },
          { text: 'Once it\'s fixed', why: 'Early is better.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a plan that changed suddenly. Did you bring options, or just the problem?',
    starters: ['The change:', 'Next time I\'ll bring...'],
  },
  deepen: { title: 'Try it today', summary: 'Next time something changes, write: what changed, what it affects, two options, your recommendation.' },
  notes: 'Fictional scenario and dates.',
};

export default lesson;
