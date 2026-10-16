import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Chat with Tey: influencing someone far away (Emeka in Lagos; remote influence and video calls). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Influence across 4,000 kilometres',
  summary: 'Emeka in Lagos owns six of the 21 days: his team and Nairobi use different reference numbers, so every refund gets matched by hand. Emeka is lovely. He\'s also on mute, two hours behind, and drowning in Lagos problems. Remi asks Tey for help.',
  minutes: 11,
  outcomes: [
    'Build trust with someone you rarely see',
    'Make remote asks clear and easy to act on',
    'Use video and messages for what each does best',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What\'s hard about Emeka?',
          replies: ['He\'s nice but he never actually does anything.', 'I never see him.'],
        },
        {
          tey: "Careful with the first one. He's probably not ignoring you. He's in Lagos, where your project is far away and his own problems are right in front of him. Out of sight really is out of mind. So your job is to be easy to help from 4,000 km away.",
          replies: ['How?'],
        },
        {
          tey: "First, a relationship. Ask for 15 minutes on video, cameras on, at a time that suits Lagos. Lagos is two hours behind Nairobi, so 11 a.m. for you is 9 a.m. for him. Don't start with the ask. Start with him: how's the Lagos warehouse doing?",
          replies: ['And then the ask?'],
        },
        {
          tey: "Then the ask, specific: \"Could your team add our Nairobi reference number to the return form? One new field.\" Afterwards, write it down: one short message with the ask, why, and the date. Video builds the relationship. Writing makes the ask easy to act on later, when he's looking at it alone.",
          replies: ['What if he forgets?'],
        },
        {
          tey: 'He might. Agree a check-in now: "Can I message you Thursday to see how it\'s going?" Then he\'s expecting it, and it\'s not nagging. And when it works, tell his boss in Lagos what Emeka did. That travels further than you\'d think.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Far away isn\'t ignoring you. Build the relationship on video, at their time. Make the ask specific, then write it down. Agree the check-in. Credit them to their boss.',
    },
  ],
  apply: {
    scenario: 'Tey and Remi, about Emeka.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why might Emeka not be acting on Remi\'s requests?',
        options: [
          { text: 'He doesn\'t like Remi', why: 'Assume distance before dislike.' },
          { text: 'He\'s lazy', why: 'He\'s drowning, not lazy.' },
          { text: 'He\'s far away, and his local problems feel more urgent' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Best on video, or best in writing?',
        groups: ['Video', 'Writing'],
        items: [
          { text: 'Building the relationship', group: 0 },
          { text: 'The exact ask and the date', group: 1 },
          { text: '"How\'s the Lagos warehouse doing?"', group: 0 },
          { text: 'A record he can look back at', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Sorry, was I on mute? So what can Lagos do for you?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'One thing: add our Nairobi reference number to your return form. It would cut six days. I\'ll send the details in writing after this.' },
          { text: 'Lots of things, I\'ll email a list.', why: 'A list from far away gets parked.' },
          { text: 'Just fix the reference numbers.', why: 'Too vague to act on.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lagos is two hours ___ Nairobi. (one word)',
        answers: ['behind', 'Behind'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why agree a Thursday check-in during the call?',
        options: [
          { text: 'To test him', why: 'It\'s to help him remember.' },
          { text: 'Then the follow-up is expected, not nagging' },
          { text: 'Thursday is lucky', why: 'Any agreed day works.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to its job.',
        pairs: [
          ['Video, cameras on', 'Builds the relationship'],
          ['Short written summary', 'Makes the ask easy to act on'],
          ['Credit to his boss', 'Rewards him where it counts'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s plan for Emeka. Which line ignores the distance?',
        lines: [
          'Book 15 minutes at 9 a.m. Lagos time.',
          'Start with the ask straight away, he\'s busy.',
          'Send the ask in writing after the call.',
        ],
        bug: 1,
        fix: 'Start by asking how the Lagos warehouse is doing.',
        explanation: 'Remote relationships need the warm-up even more, because there\'s no corridor chat.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put influencing Emeka in order.',
        lines: ['Book a call at his time', 'Start with him, not the ask', 'Make one specific ask', 'Write it down and agree a check-in'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] builds the relationship. [[2]] makes the ask easy to act on.',
        blanks: [['Video', 'video'], ['Writing', 'writing']],
        distractors: ['Silence', 'Email spam'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s check-in ask.',
        tiles: ['Can', 'I', 'message', 'you', 'Thursday?'],
        distractors: ['daily'],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you work or study with remotely? What would make your asks easier for them to act on?',
    starters: ['I work remotely with...', 'It would help if I...'],
  },
  deepen: {
    title: 'Their time, cameras on',
    summary: 'Next time you need something from someone far away, book 15 minutes at a time that suits them, cameras on. Ask about them first. Send the ask in writing after.',
  },
  notes: 'Remote collaboration: proximity effects on communication and attention (e.g. Allen curve, Allen 1977; distance reduces informal communication), video for relationship building and written follow-up for clarity reflect standard distributed-team guidance. Nairobi (EAT, UTC+3) and Lagos (WAT, UTC+1): two hours. Fictional figures.',
};

export default lesson;
