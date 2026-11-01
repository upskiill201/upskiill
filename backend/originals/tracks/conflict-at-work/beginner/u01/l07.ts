import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Myth or Fact: conflict myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Conflict myths',
  summary: 'Femi thinks good teams never argue. Grace thinks time heals everything. Priya has managed teams for ten years and has seen both ideas go badly wrong. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop common myths about workplace conflict',
    'See disagreement as part of good teamwork',
    'Know that time alone rarely fixes things',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Good teams never argue.',
          isFact: false,
          explain: 'Myth. Good teams disagree about the work openly and respectfully. Teams that never disagree often just avoid.',
        },
        {
          text: 'Time heals most work conflicts on its own.',
          isFact: false,
          explain: 'Myth. Avoided conflicts usually grow quieter, not smaller. Grace\'s three days of silence made step 3 worse.',
        },
        {
          text: 'Feeling safe to speak up helps teams learn.',
          isFact: true,
          explain: 'Fact. Amy Edmondson\'s research on psychological safety found that teams who felt safe to raise problems learned and improved more.',
        },
        {
          text: 'You can disagree with someone and still respect them.',
          isFact: true,
          explain: 'Fact. Grace can think Femi\'s design is wrong and still value him as a colleague. Keep it about the task.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Disagreement is normal in good teams. Time rarely fixes conflict; calm, early conversations do.',
    },
  ],
  apply: {
    scenario: 'Conflict myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good teams never argue', group: 0 },
          { text: 'Time heals most conflicts', group: 0 },
          { text: 'Safety to speak up helps teams learn', group: 1 },
          { text: 'You can disagree and still respect', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Amy Edmondson\'s research find?',
        options: [
          { text: 'Teams that felt safe to raise problems learned and improved more' },
          { text: 'Quiet teams perform best', why: 'Speaking up helped.' },
          { text: 'Conflict always destroys teams', why: 'Safe speaking up helped.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'If we argue about step 3, doesn\'t that mean we\'re a bad team?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Yes, stop arguing.', why: 'Task disagreement can help.' },
          { text: 'Argue more, louder.', why: 'Respectfully, about the work.' },
          { text: 'No. Arguing about step 3 is the job. It only turns bad when it\'s about each other instead of the design.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Good teams never argue"', 'Good teams disagree well'],
          ['"Time heals"', 'Early talks heal'],
          ['"Disagreeing is disrespectful"', 'Respect and disagreement go together'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Psychological safety.',
        template: 'Teams that feel safe to raise [[1]] learn and [[2]] more.',
        blanks: [['problems'], ['improve']],
        distractors: ['salaries', 'sleep'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might a team that never disagrees be a warning sign?',
        options: [
          { text: 'It\'s always a great sign', why: 'Silence can hide problems.' },
          { text: 'People may be avoiding problems instead of raising them' },
          { text: 'It means they\'re lazy', why: 'It may mean they\'re afraid.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s new beliefs is a myth?',
        lines: [
          'Disagreeing about work can help.',
          'I can disagree and still respect Femi.',
          'If I wait long enough, it\'ll fix itself.',
          'Raising problems early helps the team.',
        ],
        bug: 2,
        fix: 'If I raise it early and calmly, it gets fixed.',
        explanation: 'Time alone rarely fixes conflict.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many years has Priya managed teams?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A sign of a healthy team, or a warning?',
        groups: ['Healthy', 'Warning'],
        items: [
          { text: 'Open debate about designs', group: 0 },
          { text: 'Nobody ever disagrees in meetings', group: 1 },
          { text: 'People raise risks early', group: 0 },
          { text: 'Complaints only in private chats', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a healthy disagreement.',
        lines: ['Raise it early', 'Keep it about the work', 'Listen to the other view', 'Decide together'],
      },
    ],
  },
  reflect: {
    prompt: 'Which conflict myth has shaped how you behave at work?',
    starters: ['I believed...', 'It made me...'],
  },
  deepen: {
    title: 'Psychological safety',
    summary: 'Edmondson defines psychological safety as a shared belief that the team is safe for taking interpersonal risks: asking questions, admitting mistakes, disagreeing. Conflict skills help build it.',
  },
  notes: 'Edmondson (1999), Administrative Science Quarterly 44(2): psychological safety and team learning. Myth/fact synthesis.',
};

export default lesson;
