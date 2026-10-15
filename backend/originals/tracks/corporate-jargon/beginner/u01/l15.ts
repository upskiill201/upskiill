import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 with some earlier. Story beat: Zanele's group-chat message, three phrases used wrong. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Zanele\'s group chat',
  summary: 'Zanele starts an interns\' group chat to sound like a pro. Her first message has eleven pieces of jargon, and three of them mean the opposite of what she thinks.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Decode the busy, tell-people, meeting and agree words', 'Spot jargon used the wrong way'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'A new WhatsApp group appears on Remi\'s phone: "Synergix Interns". Members: Zanele, Remi. Zanele is typing...' },
        { speaker: 'zanele', text: 'Hi team! Quick heads-up: I put the courier project on the back burner, so it\'s top of my list today. I\'m swamped, so I have loads of bandwidth for new work. FYI, please action this: send me your notes by EOD. Let\'s take it offline!' },
        { speaker: 'remi', text: '(There are two of us. And this IS offline.)' },
        { speaker: 'tey', text: "Bless her. She's using the words with real confidence. Some of them are just pointing the wrong way. Let's see if you can find which ones." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3. The interns\' group chat.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Which part of Zanele\'s message contradicts itself?',
        lines: [
          'Quick heads-up:',
          'I put the courier project on the back burner, so it\'s top of my list today.',
          'Send me your notes by EOD.',
        ],
        bug: 1,
        fix: 'I put the courier project on the back burner, so I\'m pausing it for now.',
        explanation: 'Back burner means paused. It can\'t also be top of her list.',
      },
      {
        kind: 'mcq',
        prompt: '"I\'m swamped, so I have loads of bandwidth." What\'s wrong?',
        options: [
          { text: 'Nothing, it\'s correct', why: 'Swamped = flooded with work. Bandwidth = spare capacity. They can\'t both be true.' },
          { text: 'Swamped means very busy, so she\'d have NO bandwidth' },
          { text: '"Swamped" is too informal', why: 'It\'s fine at work. The problem is it contradicts "loads of bandwidth".' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: '"FYI, please action this." Why is that confusing?',
        options: [
          { text: '"Action" can\'t be a verb', why: 'People do say "action this" at work. The clash is with FYI.' },
          { text: 'It isn\'t confusing', why: 'FYI tells people they only need to read it. Then she asks them to do something.' },
          { text: 'FYI means "no action needed", then she asks for action' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the busy words.',
        pairs: [
          ['Swamped', 'Flooded with work'],
          ['At capacity', 'Completely full'],
          ['Stretched thin', 'Doing too many things at once'],
          ['Bandwidth', 'Spare time and energy'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Do you have the bandwidth to proofread my notes? Ten minutes!',
        prompt: 'Remi is finishing the summary for Brian. Best reply?',
        options: [
          { text: 'I\'d love to, but I\'m on Brian\'s summary until 4:30. Could I do it after, or is it urgent?' },
          { text: 'I\'m swamped, so yes!', why: 'Now Remi is mixing them up too.' },
          { text: 'No bandwidth. Bye.', why: 'Too cold. Offer a real time.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the person need to DO something, or just KNOW?',
        groups: ['Do something', 'Just know'],
        items: [
          { text: 'FYI', group: 1 },
          { text: 'Please action this', group: 0 },
          { text: 'Heads-up', group: 1 },
          { text: 'Ping me the numbers', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A meeting ends. Which action item will actually happen?',
        options: [
          { text: 'The team to look at couriers sometime', why: 'No single owner, no date.' },
          { text: 'Zanele to send the courier list to Brian by Tuesday' },
          { text: 'Couriers: important!', why: 'A feeling, not a task.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The one person responsible for an action item is the ... (one word)',
        answers: ['owner'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real yes, or not necessarily?',
        groups: ['Real yes', 'Not necessarily'],
        items: [
          { text: 'I\'m on board', group: 0 },
          { text: 'I hear you', group: 1 },
          { text: 'We\'re aligned', group: 0 },
          { text: 'Let me think about it', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix Zanele\'s message.',
        template: 'Quick [[1]]: the courier project is on the back burner, so it\'s [[2]] for now. I\'m swamped, so I have [[3]] bandwidth this week.',
        blanks: [['heads-up'], ['paused'], ['no', 'little']],
        distractors: ['top', 'loads'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Week one review: match the phrase.',
        pairs: [
          ['Circle back', 'Come back to it later'],
          ['Loop in', 'Add someone to the conversation'],
          ['Deep dive', 'A detailed look'],
          ['Sign-off', 'Official approval'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Okay, be honest. How was my message?',
        prompt: 'Zanele is a friend. What does Remi say?',
        options: [
          { text: 'Perfect, total pro!', why: 'Kind for ten seconds. Less kind when she sends it to Brian.' },
          { text: 'It was a disaster.', why: 'True-ish, but it helps nobody. Offer to help, and be human about it.' },
          { text: 'Honestly? Three of the phrases point the wrong way. Want me to show you? Took me all week to learn them too.' },
        ],
        answer: 2,
        explanation: 'Tey\'s rule for the cast works for colleagues too: tease the situation, never the person.',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever used a word or phrase confidently and then found out it meant something else? How did you find out?',
    starters: ['The word was...', 'I found out when...'],
  },
  deepen: {
    title: 'The opposite pairs',
    summary: 'Write down the pairs that are easy to mix up: swamped vs bandwidth, FYI vs action needed, back burner vs top priority, "I hear you" vs "I agree". Keep them in your Jargon Notebook.',
  },
  notes: 'Review of lessons 11–14 plus 1–9. "Action" as a verb (Cambridge Business English: to take action on).',
};

export default lesson;
