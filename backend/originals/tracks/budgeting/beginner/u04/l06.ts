import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: saying no to friends without losing them. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'No, without losing friends',
  summary: 'After Cape Coast, Kofi\'s fun line is empty for three weeks, and the invitations keep coming: a jollof night, a match ticket, a group gift. Tey teaches the kind, clear no.',
  minutes: 11,
  outcomes: [
    'Say no to spending without saying no to the friend',
    'Offer a free or cheaper alternative',
    'Avoid over-explaining and apologising',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Three invitations this week, and GH₵0 of fun money. Kofi\'s instinct is to say yes and "figure it out". What usually happens next?', replies: ['It comes out of food money.'] },
        { tey: 'Exactly. So let\'s practise a no that keeps the friendship. Three parts: warm, clear, and an alternative.', replies: ['What does warm mean?'] },
        { tey: 'Warm means you show you want the person, not the bill: "I\'d love to." Clear means one honest reason, short: "My fun money\'s spent this month." Then the alternative: "Can I come for the first hour?" or "Let\'s cook at mine on Friday instead."', replies: ['Shouldn\'t I explain more?'] },
        { tey: 'Usually not. Long explanations sound like guilt and invite people to argue. "I\'m on a budget this month" is a complete sentence.', replies: ['What if they push?'] },
        { tey: 'Say it again, kindly, the same way. "I really can\'t this month. Next month I\'m in." Most friends back off. The ones who keep pushing are telling you something useful.', replies: ['And the group gift?'] },
        { tey: 'Offer what fits: "I can do GH₵10, or I\'ll make the birthday card." Giving what you can, without apology, is generous. Nobody needs your food money for a cake.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Warm, clear, alternative. "I\'d love to. My fun money\'s spent this month. Can we cook at mine Friday instead?"',
    },
  ],
  apply: {
    scenario: 'Three invitations, no fun money.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the kind no in order.',
        lines: ['Warm: "I\'d love to."', 'Clear: one honest reason', 'Alternative: something free or cheaper'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Jollof night at the new place tonight, GH₵45 a plate. Coming?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Sorry sorry, I\'m so broke, I\'m such a failure, my budget, my mum...', why: 'Over-explaining sounds like guilt and invites debate.' },
          { text: 'Can\'t. Bye.', why: 'Clear but cold. No warmth, no alternative.' },
          { text: 'I\'d love to, but my fun money\'s gone this month. Come and eat at the hall kitchen with us Friday?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Warm, clear, or alternative?',
        groups: ['Warm', 'Clear', 'Alternative'],
        items: [
          { text: '"I\'d love to come."', group: 0 },
          { text: '"I\'m on a budget this month."', group: 1 },
          { text: '"Can I join for the first hour?"', group: 2 },
          { text: '"Let\'s cook at mine instead."', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does over-explaining often backfire?',
        options: [
          { text: 'It sounds like guilt and invites people to argue you out of it' },
          { text: 'People don\'t care about reasons', why: 'They do. One short reason is enough.' },
          { text: 'It takes too long', why: 'Time isn\'t the main issue. Guilt and debate are.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A complete sentence.',
        template: '"I\'m on a [[1]] this month" is a [[2]] sentence.',
        blanks: [['budget'], ['complete']],
        distractors: ['loan', 'sad'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Come on, it\'s just GH₵45! Live a little!',
        prompt: 'Kofi\'s best reply when pushed?',
        options: [
          { text: 'Fine, I\'ll take it from food.', why: 'One push and the plan folds. Repeat the no instead.' },
          { text: 'I really can\'t this month. Next month I\'m in, first jollof is on me.' },
          { text: 'Stop pressuring me!', why: 'Fair feeling, but a calm repeat works better.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the invitation to a good alternative.',
        pairs: [
          ['Restaurant night', 'Cook together at the hall'],
          ['Match ticket', 'Watch on the hall TV'],
          ['Group gift', 'Give what fits, or make a card'],
          ['Shopping trip', 'Come along, buy nothing'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The group gift asks GH₵30 each. Kofi offers GH₵10. How much less is that?',
        answers: ['20', 'GH₵20', '20 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes this no weaker?',
        lines: [
          'I\'d love to come to the match.',
          'My fun money\'s spent this month.',
          'I\'m so sorry, I feel terrible, I\'m the worst friend.',
          'Want to watch it on the hall TV with me?',
        ],
        bug: 2,
        fix: 'Leave the apology out.',
        explanation: 'A heavy apology turns a clear, kind no into an opening for debate.',
      },
      {
        kind: 'mcq',
        prompt: 'A friend keeps pushing after three kind nos. What is it telling Kofi?',
        options: [
          { text: 'That he should give in', why: 'Pushing isn\'t a reason to spend food money.' },
          { text: 'Something useful about how that friend treats his limits' },
          { text: 'That budgets ruin friendships', why: 'Most friends respect a clear no. This is about one friend\'s habit.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own kind no for an invitation you often get. Warm, clear, alternative.',
    starters: ['I\'d love to...', 'But...', 'How about...'],
  },
  deepen: {
    title: 'Money friends',
    summary: 'People with similar money goals make budgets easier. Efua and Kofi cook together, split bulk buys and suggest free plans. You don\'t need new friends; you just need one or two people who know your plan and like the free option too.',
  },
  notes: 'Fictional prices: jollof night GH₵45 a plate; group gift GH₵30 each, Kofi offers GH₵10. Technique is general assertiveness practice (warm/clear/alternative), no study claimed.',
};

export default lesson;
