import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Myth or Fact: de-escalation myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'De-escalation myths',
  summary: 'Jayden says you should "let it all out". Femi thinks taking a break is running away. Grace checks what the research says. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Know that venting usually increases anger',
    'See a planned break as a skill, not avoiding',
    'Use calm voice and pace on purpose',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Venting your anger, like shouting or punching a pillow, gets it out of your system.',
          isFact: false,
          explain: 'Myth. In Brad Bushman\'s 2002 study, people who hit a punching bag while thinking about someone who had annoyed them became angrier and more aggressive than people who did nothing.',
        },
        {
          text: 'Taking a break in an argument is just avoiding it.',
          isFact: false,
          explain: 'Myth, if you agree when you\'ll return. A planned pause lets both sides calm down enough to think. Avoiding means never coming back.',
        },
        {
          text: 'A calm, slower voice can help calm the other person.',
          isFact: true,
          explain: 'Fact. People tend to pick up the emotions around them. Grace\'s quiet, slow voice helped Femi breathe out.',
        },
        {
          text: 'You can stay calm on the outside even when you feel upset inside.',
          isFact: true,
          explain: 'Fact. Grace\'s heart was thumping, and her voice was steady. It\'s a skill you can practise.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Venting feeds anger. Planned breaks and a calm voice cool it.',
    },
  ],
  apply: {
    scenario: 'De-escalation myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Venting gets anger out', group: 0 },
          { text: 'A break is always avoiding', group: 0 },
          { text: 'A calm voice can calm others', group: 1 },
          { text: 'You can be calm outside, upset inside', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happened in Bushman\'s venting study?',
        options: [
          { text: 'Venting calmed them', why: 'It made them angrier.' },
          { text: 'Nothing changed', why: 'Anger and aggression rose.' },
          { text: 'People who hit a punching bag while thinking about the person got angrier' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Bushman\'s venting study published?',
        answers: ['2002'],
        placeholder: 'A year',
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Just shout it out, Mum. You\'ll feel better.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Research says shouting usually makes people angrier. I\'ll take a walk, then talk to him calmly.' },
          { text: 'Good idea, I\'ll shout.', why: 'Venting tends to feed anger.' },
          { text: 'I\'ll never mention it.', why: 'Calm down, then address it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Let it all out"', 'Venting feeds anger'],
          ['"Breaks are running away"', 'Planned breaks help'],
          ['"Feel calm or you can\'t act calm"', 'Calm outside is a skill'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Venting [[1]] anger. A planned [[2]] cools it.',
        blanks: [['feeds', 'increases'], ['break', 'pause']],
        distractors: ['ends', 'shout'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a break different from avoiding?',
        options: [
          { text: 'It\'s shorter', why: 'The key is coming back.' },
          { text: 'There\'s no difference', why: 'Returning is the difference.' },
          { text: 'You agree when you\'ll come back' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s plan is a myth?',
        lines: [
          'Take a 20-minute walk.',
          'Come back at 3 to talk.',
          'Shout into a pillow first to get it out.',
          'Start soft when I return.',
        ],
        bug: 2,
        fix: 'Do something calming instead.',
        explanation: 'Venting tends to increase anger.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Cools anger, or feeds it?',
        groups: ['Cools', 'Feeds'],
        items: [
          { text: 'A walk outside', group: 0 },
          { text: 'Replaying the argument in your head', group: 1 },
          { text: 'A cup of tea with a friend', group: 0 },
          { text: 'Ranting in the team chat', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a healthy way to handle anger at work.',
        lines: ['Notice the anger', 'Take a planned break', 'Do something calming', 'Return and start soft'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you usually do when you\'re angry at work? Does it cool the anger or feed it?',
    starters: ['I usually...', 'It tends to...'],
  },
  deepen: {
    title: 'Catharsis',
    summary: 'The idea that venting releases anger, called catharsis, is old and popular. Most modern studies find the opposite: rehearsing anger keeps it alive. Distraction and calm activity work better.',
  },
  notes: 'Bushman (2002), "Does venting anger feed or extinguish the flame? Catharsis, rumination, distraction, anger, and aggressive responding", Personality and Social Psychology Bulletin 28(6). Emotional contagion: Hatfield et al. (1994).',
};

export default lesson;
