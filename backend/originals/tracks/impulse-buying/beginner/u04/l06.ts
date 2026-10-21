import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: saying no and staying friends. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'No, and still friends',
  summary: 'Yaw\'s Takoradi group chat is planning a December trip: GH₵1,200 each. Yaw, GH₵2,900 in debt, is about to say yes. Tey and Kofi help him find the words for a no that keeps his friends.',
  minutes: 11,
  outcomes: [
    'Say no to group spending honestly and briefly',
    'Stay part of the group without spending',
    'Handle pressure and teasing',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Yaw\'s group chat: "December trip, GH₵1,200 each, who\'s in?" Ten thumbs up. Yaw\'s thumb is hovering. What\'s pulling him?', replies: ['Not wanting to be left out?'] },
        { tey: 'Exactly. And not wanting anyone to guess he\'s in trouble. But a yes means GH₵1,200 more he doesn\'t have, likely on pay later again. So: how to say no and stay in the group?', replies: ['How much should he explain?'] },
        { tey: 'Less than he thinks. "I\'m out for this one, I\'m saving this year" is honest and complete. He doesn\'t owe anyone his debt story. Some friends will ask; he can share if he wants, but he doesn\'t have to.', replies: ['And staying in the group?'] },
        { tey: 'Offer what he can be part of: "I\'ll be home in December. Let\'s do a beach day when you\'re back." Or the planning, the photos, the playlist. People remember who was there, not who paid most.', replies: ['What if they tease him?'] },
        { tey: 'Light teasing usually fades if he stays relaxed: "Haha, I know. Next year I\'m in." Repeat, don\'t explain. If a friend keeps pushing after a clear no, that tells him something about the friend, not about him.', replies: ['Will it change the friendships?'] },
        { tey: 'Usually less than he fears. And often someone else in the chat messages him privately: "Glad you said it. I can\'t afford it either."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A short, honest no, a way to still be part of it, and a relaxed repeat if teased. You don\'t owe anyone your money story.',
    },
  ],
  apply: {
    scenario: 'The December trip.',
    items: [
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'What do I even say in the group chat?',
        prompt: 'Kofi\'s best suggestion?',
        options: [
          { text: '"I\'m out for this one, I\'m saving this year. Beach day when you\'re back? I\'m in for that."' },
          { text: '"I\'m in!" and figure it out later.', why: 'That\'s GH₵1,200 more debt.' },
          { text: 'A long message explaining all his debts.', why: 'He doesn\'t owe anyone his debt story.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps keep the friendship, or not needed?',
        groups: ['Helps', 'Not needed'],
        items: [
          { text: 'Offering a beach day instead', group: 0 },
          { text: 'Explaining every debt in the group chat', group: 1 },
          { text: 'Helping plan or making the playlist', group: 0 },
          { text: 'Apologising ten times', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone teases: "Yaw the saver, eh?" What\'s the best response?',
        options: [
          { text: 'Relaxed and short: "Haha, I know. Next year I\'m in."' },
          { text: 'Get angry', why: 'It turns light teasing into a fight.' },
          { text: 'Give in and say yes', why: 'One joke isn\'t worth GH₵1,200.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The no.',
        template: '"I\'m [[1]] for this one, I\'m [[2]] this year."',
        blanks: [['out'], ['saving']],
        distractors: ['in', 'spending'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Yaw said yes on pay later, his debt would go from GH₵2,900 to how much?',
        answers: ['4100', '4,100', 'GH₵4,100', 'GH₵4100'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to a good response.',
        pairs: [
          ['Big group trip', 'Short no, offer something smaller'],
          ['Light teasing', 'Relaxed repeat'],
          ['Friend keeps pushing', 'Notice what it says about them'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Yaw\'s draft message isn\'t needed?',
        lines: [
          'I\'m out for this one.',
          'I\'m saving this year.',
          'I owe GH₵2,900 on three apps and one is messaging my mum.',
          'Beach day when you\'re back?',
        ],
        bug: 2,
        fix: 'Leave it out, unless he chooses to share with someone he trusts.',
        explanation: 'He can share privately if he wants. A group chat doesn\'t need it.',
      },
      {
        kind: 'mcq',
        prompt: 'What often happens after someone says no in a group chat?',
        options: [
          { text: 'Someone else privately says they can\'t afford it either' },
          { text: 'Everyone leaves the group', why: 'Rarely.' },
          { text: 'They\'re banned from future plans', why: 'Usually not.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the friendly no.',
        lines: ['Short, honest no', 'Offer a way to still be part of it', 'Relaxed repeat if teased'],
      },
      {
        kind: 'mcq',
        prompt: 'What do people tend to remember?',
        options: [
          { text: 'Who was there and part of things, not who paid most' },
          { text: 'Exactly who paid how much', why: 'Most people remember the time together.' },
          { text: 'Nothing', why: 'They remember who showed up.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write the no you\'d send to a group plan you can\'t afford. What could you offer instead?',
    starters: ['I\'d write...', 'I could offer...'],
  },
  deepen: {
    title: 'You\'re probably not alone',
    summary: 'Surveys in many countries find that a large share of young adults have overspent to keep up with friends or felt pressure to join plans they couldn\'t afford. Saying no out loud makes it easier for others to say it too.',
  },
  notes: 'Fictional: December trip GH₵1,200 each; 2,900 + 1,200 = 4,100. Peer spending pressure surveys (e.g. various bank/credit surveys in UK/US); stated qualitatively.',
};

export default lesson;
