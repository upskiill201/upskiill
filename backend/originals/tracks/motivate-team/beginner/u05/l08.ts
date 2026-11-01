import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Chat with Tey: the leader's own motivation (who motivates the motivator). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Who motivates you?',
  summary: 'Thursday, 11 p.m. The team went home at 7. Miracle didn\'t. She\'s been answering Folake, checking the board and worrying about clinic 300. She realises she\'s been looking after everyone\'s three needs except her own. She opens Tey.',
  minutes: 11,
  outcomes: [
    'Notice when a leader is running on empty',
    'Apply the course\'s tools to yourself',
    'Ask for support upwards',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'When did you last go home at 7?',
          replies: ['Week 1, maybe.', 'I don\'t remember.'],
        },
        {
          tey: "So the team has a rule you don't follow. That's common: leaders protect everyone's energy except their own. But everything in this course applies to you too. Your three needs: competence, relatedness, autonomy. How are they?",
          replies: ['Competence: okay. Relatedness: lonely. Autonomy: Folake messages me constantly.'],
        },
        {
          tey: "That's honest. Lonely is common for new leaders: you're not quite one of the team any more. Who could you talk to? Your friend Ada works at a startup here in Lagos and knows the pressure. Arjun just ran his first team in Bengaluru. You don't have to do this alone.",
          replies: ['And Folake?'],
        },
        {
          tey: "Manage up, like the team taught you. Ask for what you need: \"Could we agree one update at 6 p.m. instead of messages through the day?\" You set a rhythm for the team. Set one for yourself.",
          replies: ['And going home?'],
        },
        {
          tey: "Tomorrow, home by 7. Same rule as everyone. Your team watches what you do more than what you say. If you burn out in Week 9, all eight weeks of their progress lose their leader.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Leaders need the same three needs. Find people outside the team to talk to. Manage up for what you need. Follow your own rules: your team copies what you do.',
    },
  ],
  apply: {
    scenario: 'Thursday, 11 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the common leader trap Tey describes?',
        options: [
          { text: 'Working too little', why: 'The opposite.' },
          { text: 'Caring too little', why: 'Miracle cares a lot. That\'s the trap.' },
          { text: 'Protecting everyone\'s energy except their own' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of Miracle\'s needs is it?',
        groups: ['Competence', 'Relatedness', 'Autonomy'],
        items: [
          { text: 'Knowing she\'s getting good at leading', group: 0 },
          { text: 'Someone to talk to who gets it', group: 1 },
          { text: 'Fewer messages from Folake', group: 2 },
          { text: 'Seeing the team improve', group: 0 },
          { text: 'A call with Ada', group: 1 },
          { text: 'Choosing her own update rhythm', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'If I go home at 7, what if something breaks?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'That\'s what the on-call phone is for. You built it for the team. It works for you too.' },
          { text: 'Then stay.', why: 'And burn out by Week 9.' },
          { text: 'Something always breaks.', why: 'True. The system handles it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Your team copies what you ___, more than what you say. (one word)',
        answers: ['do', 'Do'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Miracle\'s problem to the fix.',
        pairs: [
          ['Lonely', 'Talk to Ada or Arjun'],
          ['Constant messages', 'One update at 6 p.m.'],
          ['Never going home', 'Home by 7, like everyone'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is loneliness common for new leaders?',
        options: [
          { text: 'Leaders don\'t like people', why: 'Miracle clearly does.' },
          { text: 'They\'re not quite one of the team any more' },
          { text: 'It isn\'t common', why: 'It\'s very common.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan for Friday. Which line breaks her own rule?',
        lines: [
          'Ask Folake for one 6 p.m. update instead of messages.',
          'Stay late tonight and tomorrow, just to be safe.',
          'Call Ada on Sunday.',
        ],
        bug: 1,
        fix: 'Home by 7; on-call covers the evening.',
        explanation: 'The rule that protects the team protects the leader too.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put looking after yourself as a leader in order.',
        lines: ['Check your own three needs', 'Find someone outside to talk to', 'Ask upwards for what you need', 'Follow your own rules'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Everything in this course applies to [[1]] too.',
        blanks: [['you', 'yourself', 'leaders']],
        distractors: ['nobody', 'them'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s ask to Folake.',
        tiles: ['One', 'update', 'at', '6', 'p.m.?'],
        distractors: ['hourly'],
      },
    ],
  },
  reflect: {
    prompt: 'If you lead anything, how are your own three needs right now? Who could you talk to who understands?',
    starters: ['Competence: ...', 'Relatedness: ...', 'Autonomy: ...'],
  },
  deepen: {
    title: 'Follow your own rule',
    summary: 'Pick one rule you set for others (home by a time, breaks, no late messages). Follow it yourself for a week.',
  },
  notes: 'Leader well-being and loneliness: e.g. Rokach (2014) on leadership loneliness; leader role modelling of norms (social learning, Bandura). Self-determination needs apply to leaders as to anyone (Deci & Ryan). Ada and Arjun\'s roles follow CAST.md. Fictional details.',
};

export default lesson;
