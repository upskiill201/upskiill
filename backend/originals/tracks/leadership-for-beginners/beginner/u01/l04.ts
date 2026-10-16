import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Chat with Tey: leading your friend (managing a former peer). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Leading your friend',
  summary: 'The coffee with Marta is at 4 p.m. Lucía has rehearsed it eleven times. Tey offers to help: "Let\'s talk about what to say, and what not to."',
  minutes: 11,
  outcomes: [
    'Talk honestly with a friend you now lead',
    'Name the change instead of pretending it didn\'t happen',
    'Be fair to everyone, including your friends',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Lucía, what do you want Marta to feel when she leaves that coffee?',
          replies: ['That we\'re still friends.', 'That I\'m sorry she didn\'t get it.'],
        },
        {
          tey: "Both kind instincts. Careful with the second, though. You can be sorry she's disappointed without apologising for getting the job. You earned it. So did she, in her way. Start by naming it: \"This is weird. Let's talk about it.\"",
          replies: ['And then?'],
        },
        {
          tey: 'Then ask, and listen. "How are you feeling about it?" Let her be disappointed. Don\'t rush to fix it. People need to feel heard before they can move on.',
          replies: ['What if she\'s angry?'],
        },
        {
          tey: "Then she's angry, and that's okay. Thank her for being honest. Then say what you hope for: \"I'd love us to stay friends. At work, I'll need to be fair to everyone, including you. Can we figure out how that works together?\"",
          replies: ['Should I promise her the next promotion?'],
        },
        {
          tey: "No. Don't promise what you can't control, and don't treat her differently. What you CAN offer: \"I want to help you grow, and I'd like to hear what you want next.\" That's real.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Name the change. Ask how they feel, and listen. Say what you hope for. Be fair to everyone. Promise only what you control.',
    },
  ],
  apply: {
    scenario: 'The coffee with Marta, 4 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s a good way for Lucía to open the coffee?',
        options: [
          { text: '"So, as your new manager..."', why: 'That leads with the title, not the friendship.' },
          { text: '"This is a bit weird for both of us. Can we talk about it?"' },
          { text: '"Did you see the football last night?"', why: 'Avoiding it makes it bigger.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Honestly? I\'m happy for you. I\'m also really disappointed. I wanted it too.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Don\'t be disappointed, it\'s fine!', why: 'That dismisses how she feels.' },
          { text: 'Well, Carmen chose me.', why: 'True, and unkind.' },
          { text: 'Thank you for telling me. That makes total sense. Do you want to talk about it?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Say it, or don\'t?',
        groups: ['Say it', 'Don\'t'],
        items: [
          { text: '"I\'d love us to stay friends."', group: 0 },
          { text: '"You\'ll definitely get the next promotion."', group: 1 },
          { text: '"I need to be fair to everyone, including you."', group: 0 },
          { text: '"I\'ll go easy on you."', group: 1 },
          { text: '"What do you want to do next?"', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Only promise what you can ___. (one word)',
        answers: ['control', 'deliver', 'keep'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why shouldn\'t Lucía treat Marta better than the others?',
        options: [
          { text: 'The rest of the team would notice, and trust in her fairness would break' },
          { text: 'Because Marta doesn\'t deserve it', why: 'It\'s about fairness, not worth.' },
          { text: 'Because friends at work are banned', why: 'Friendships are fine. Favouritism isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the coffee in order.',
        lines: ['Name the change', 'Ask how she feels', 'Listen, without fixing', 'Say what you hope for', 'Offer real help with her growth'],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s rehearsal. Which line should she drop?',
        lines: [
          'I know this is strange for both of us.',
          'I\'m so sorry I got the job instead of you.',
          'I\'d love to hear what you want to do next.',
        ],
        bug: 1,
        fix: 'I\'m sorry you\'re disappointed. I really do get it.',
        explanation: 'Being sorry for her feelings is kind. Apologising for the job itself undermines her own role.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Doer trap', 'Doing your old job instead of leading'],
          ['Hill\'s finding', 'Influence is earned'],
          ['Gallup\'s finding', 'Managers shape engagement'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s advice.',
        template: '[[1]] the change. Ask how they feel and [[2]]. Be [[3]] to everyone.',
        blanks: [['Name'], ['listen'], ['fair']],
        distractors: ['Hide', 'kind'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s opening line.',
        tiles: ['This', 'is', 'weird.', 'Can', 'we', 'talk', 'about', 'it?'],
        distractors: ['manager'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a relationship at work or school that changed recently (a promotion, a new role, a new team)? What would naming it out loud sound like?',
    starters: ['The relationship is...', 'I could say...'],
  },
  deepen: {
    title: 'The honest coffee',
    summary: 'If you lead someone who was your peer, ask them for a coffee this week. Name the change, ask how it feels, and listen for at least five minutes before you say anything about work.',
  },
  notes: 'Practical guidance on managing former peers (name the change, listen, be fair, avoid favouritism and promises outside your control) is consistent with new-manager literature (e.g. Hill, Becoming a Manager).',
};

export default lesson;
