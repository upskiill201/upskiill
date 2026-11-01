import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: when they push back (defensiveness; staying curious; not folding). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'When they push back',
  summary: 'The conversation with Diego started well. Then: "Honestly? You\'ve been the boss for ten weeks and you\'re lecturing ME?" Lucía asks for a two-minute break and messages Tey from the corridor.',
  minutes: 11,
  outcomes: [
    'Stay calm when someone gets defensive',
    'Get curious instead of arguing back',
    'Hold your point without folding or fighting',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Breathe. What did he say exactly?',
          replies: ['"You\'ve been the boss for ten weeks and you\'re lecturing ME?"'],
        },
        {
          tey: "That stings. It's also very normal. When people hear criticism, many feel it as a threat, and get defensive. It's not proof the feedback was wrong. It's proof it landed. Your job now: don't fight it, and don't fold.",
          replies: ['What does "don\'t fold" mean?', 'What does "don\'t fight" mean?'],
        },
        {
          tey: 'Fighting is "I\'m your manager, so listen." Folding is "You\'re right, forget it." Both end the conversation. The middle path: get curious. "That sounds like it felt unfair. Tell me more." Often there\'s something real under the push back.',
          replies: ['And if there is?'],
        },
        {
          tey: "Then acknowledge it, honestly. Maybe: \"You're right that I'm new, and you know more about this business than I do.\" Then come back to your point, calmly: \"And I still need everyone to feel safe sharing ideas. That comment made Sofía stop.\" Both things can be true.",
          replies: ['What if he just stays angry?'],
        },
        {
          tey: 'Then pause it. "Let\'s both think about it and pick it up tomorrow." A conversation can take two meetings. What you can\'t do is pretend it didn\'t happen.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Defensiveness means it landed. Don\'t fight, don\'t fold: get curious. Acknowledge what\'s true. Come back to your point. Pause if you need to.',
    },
  ],
  apply: {
    scenario: 'The corridor, two-minute break.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Does Diego\'s defensiveness mean the feedback was wrong?',
        options: [
          { text: 'No. Many people get defensive when feedback lands' },
          { text: 'Yes, she should apologise', why: 'Defensiveness isn\'t proof of anything.' },
          { text: 'Yes, he\'s clearly right', why: 'Both things can be true.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fight, fold, or get curious?',
        groups: ['Fight', 'Fold', 'Curious'],
        items: [
          { text: '"I\'m your manager, so listen."', group: 0 },
          { text: '"You\'re right, forget it."', group: 1 },
          { text: '"Tell me more about that."', group: 2 },
          { text: '"Don\'t take that tone with me."', group: 0 },
          { text: '"Never mind, it\'s fine."', group: 1 },
          { text: '"What feels unfair about it?"', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'You\'ve been the boss for ten weeks and you\'re lecturing ME?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'I\'m the boss. That\'s how it works.', why: 'Fighting. Chapter 1\'s authority myth.' },
          { text: 'Sorry, you\'re right. Forget it.', why: 'Folding. And Sofía stays quiet.' },
          { text: 'You\'re right that I\'m new, and you know more about this business than I do. And I still need Sofía to feel safe sharing ideas.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Instead of fighting or folding, get ___. (one word)',
        answers: ['curious', 'Curious'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why acknowledge what\'s true in his push back?',
        options: [
          { text: 'To lose the argument', why: 'It\'s not a contest.' },
          { text: 'To change the subject', why: 'She comes back to her point.' },
          { text: 'It shows you\'re listening, which makes it easier for him to listen too' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to the line.',
        pairs: [
          ['Get curious', '"Tell me more."'],
          ['Acknowledge', '"You\'re right that I\'m new."'],
          ['Pause', '"Let\'s pick it up tomorrow."'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan for going back in. Which line breaks it?',
        lines: [
          'Acknowledge he knows the business better.',
          'If he\'s still angry, drop it and never mention it again.',
          'Come back to the point about Sofía, calmly.',
        ],
        bug: 1,
        fix: 'If he\'s still angry, pause and pick it up tomorrow.',
        explanation: 'Pausing is fine. Pretending it never happened isn\'t.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put handling push back in order.',
        lines: ['Breathe; don\'t react', 'Get curious', 'Acknowledge what\'s true', 'Come back to your point'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Don\'t [[1]], don\'t [[2]]. Get [[3]].',
        blanks: [['fight'], ['fold'], ['curious']],
        distractors: ['listen', 'angry'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the curious question.',
        tiles: ['What', 'feels', 'unfair', 'about', 'it?'],
        distractors: ['Why'],
      },
    ],
  },
  reflect: {
    prompt: 'When you get defensive, what does it look like? What would help you get curious instead?',
    starters: ['When I get defensive, I...', 'It would help if...'],
  },
  deepen: {
    title: 'Name it to tame it',
    summary: 'Next time you feel defensive, silently name it: "I\'m feeling defensive." Naming the feeling often takes some of the heat out of it.',
  },
  notes: 'Defensive reactions to critical feedback as perceived threat (e.g. SCARF model, Rock 2008; social-evaluative threat research), hedged. "Both/and" acknowledgement and pausing reflect Crucial Conversations guidance. Affect labelling ("name it to tame it"): Lieberman et al. (2007), hedged as "often".',
};

export default lesson;
