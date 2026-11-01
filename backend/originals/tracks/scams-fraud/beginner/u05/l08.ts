import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or Fact: protection and recovery myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Questions from the session',
  summary: 'Grace runs a pilot session for her team. The questions come thick and fast. Five beliefs from the room, tested.',
  minutes: 10,
  outcomes: [
    'Correct common protection and recovery myths',
    'Know what antivirus and banks can and can\'t do',
    'Leave with realistic expectations',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If I have antivirus, I\'m protected from scams.',
          isFact: false,
          explain: 'Myth. Antivirus helps against some malicious software, but most scams trick people, not computers. No software stops you sending money to someone you believe.',
        },
        {
          text: 'Once money is lost to a scam, it\'s always gone forever.',
          isFact: false,
          explain: 'Myth. Sometimes it can be frozen, recovered or reimbursed, especially if reported quickly. Not always, but often enough to make reporting worthwhile.',
        },
        {
          text: 'Changing your email password and turning on two-step checks are two of the most effective things you can do.',
          isFact: true,
          explain: 'Fact. Your email is the key to your other accounts, and two-step checks stop most password-only attacks.',
        },
        {
          text: 'Talking openly about scams at work helps reduce fraud.',
          isFact: true,
          explain: 'Fact. People who\'ve discussed scams are more likely to pause, check and report, and less likely to hide a mistake.',
        },
        {
          text: 'Scams will stop if you\'re careful for a few months.',
          isFact: false,
          explain: 'Myth. Scams keep evolving. The habits (pause, own channel, unique passwords, 2SV, report) need to be lifelong, like seatbelts.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The pilot session',
      beats: [
        { speaker: 'narrator', text: 'Callum, arms folded at the back: "I\'ve got antivirus, so I\'m fine." Ten minutes later, he\'s writing down "three random words".' },
        { speaker: 'priya', text: 'Best-attended lunch session we\'ve ever had.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Antivirus doesn\'t stop people being tricked. Lost money can sometimes be recovered: report fast. Email password and 2SV matter most. Talk openly. Keep the habits for life.',
    },
  ],
  apply: {
    scenario: 'Questions from the session.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Antivirus stops scams', group: 0 },
          { text: 'Email password and 2SV are very effective', group: 1 },
          { text: 'Lost money is always gone forever', group: 0 },
          { text: 'Talking openly reduces fraud', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t antivirus stop most scams?',
        options: [
          { text: 'Antivirus is useless', why: 'It helps with malware.' },
          { text: 'Most scams trick people, not computers' },
          { text: 'It can', why: 'Scams target people.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Callum asks: "How long do I need to keep all this up?"',
        prompt: 'Grace\'s best answer?',
        options: [
          { text: 'A few months.', why: 'Scams keep evolving.' },
          { text: 'Until he feels safe.', why: 'Feeling safe is when people stop checking.' },
          { text: 'For life, like seatbelts. Scams keep changing, but the habits keep working.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The lifelong habits.',
        template: 'Pause, own channel, unique passwords, [[1]], [[2]].',
        blanks: [['2SV', 'two-step checks'], ['report']],
        distractors: ['antivirus', 'ignore'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"I have antivirus"', 'Scams trick people'],
          ['"The money\'s gone forever"', 'Sometimes it can be recovered'],
          ['"A few careful months"', 'Lifelong habits'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement from the room is wrong?',
        lines: [
          'Reporting fast can help recover money.',
          'Talking about scams helps people pause.',
          'Antivirus means I don\'t need two-step checks.',
        ],
        bug: 2,
        fix: 'Use both; they protect against different things.',
        explanation: '2SV stops password-only attacks; antivirus doesn\'t.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does talking openly at work help?',
        options: [
          { text: 'It fills lunch breaks', why: 'It changes behaviour.' },
          { text: 'People are more likely to pause, check, report and not hide mistakes' },
          { text: 'It doesn\'t', why: 'Openness helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many myths and facts were tested in this session?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Grace\'s session.',
        lines: ['Tell the "Hi Mum" story', 'Teach the recipe', 'Show the scam file', 'Answer myths', 'Hand out the one-page checklist'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Callum end up writing down?',
        options: [
          { text: 'His password', why: 'Never.' },
          { text: 'Nothing', why: 'He took notes.' },
          { text: '"Three random words"' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which belief from the session would people where you work or study most need to hear?',
    starters: ['They\'d need to hear...'],
  },
  deepen: {
    title: 'Security culture',
    summary: 'Organisations with strong "security culture", where people feel safe reporting mistakes quickly, tend to suffer less damage from fraud and hacks. Blame makes people hide things; openness gets problems fixed fast.',
  },
  notes: 'Callum narrated; Priya per CAST.',
};

export default lesson;
