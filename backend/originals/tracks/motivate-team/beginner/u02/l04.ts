import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Myth or Fact: purpose at work (meaningful work research). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Purpose isn\'t just for charities',
  summary: 'Emmanuel, half joking: "Purpose is for doctors and charities. We fix logins." Bisi, not joking: "Tell that to Mrs Lawal." Tey steps in with a round of myth or fact.',
  minutes: 11,
  outcomes: [
    'Know what research says about meaningful work',
    'Know that ordinary jobs can feel meaningful',
    'Avoid purpose talk that sounds fake',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Only jobs like doctors and teachers can feel meaningful.', isFact: false, explain: 'Myth. Research by Amy Wrzesniewski and colleagues found people in all kinds of jobs, including hospital cleaners, describe their work as meaningful when they see how it helps others. Meaning often comes from how people see the work, not just the job title.' },
        { text: 'People who find their work meaningful tend to be more engaged.', isFact: true, explain: 'Fact, broadly. Reviews of the research link meaningful work with higher engagement, commitment and well-being. It\'s one of the strongest predictors of how people feel about their jobs.' },
        { text: 'A mission statement on the wall is enough to give people purpose.', isFact: false, explain: 'Myth. Purpose comes from experiences, like Nurse Adaeze\'s call, not from slogans. Posters can even backfire if they don\'t match what people see every day.' },
        { text: 'People can reshape their own jobs to make them more meaningful.', isFact: true, explain: 'Fact. Wrzesniewski and Jane Dutton (2001) called it job crafting: people changing tasks, relationships or how they think about their work. Bisi calling clinics "my clinics" is job crafting.' },
        { text: 'Talking about purpose once, at the start, is enough.', isFact: false, explain: 'Myth. Meaning fades in the daily grind of tickets. That\'s why the Monday clinic story matters: it reconnects people every week.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Any job can feel meaningful when people see who it helps. Purpose comes from experiences, not posters. People can craft their own jobs. Reconnect often.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Emmanuel and Bisi.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Wrzesniewski find about hospital cleaners?',
        options: [
          { text: 'None found it meaningful', why: 'Many did.' },
          { text: 'Many described their work as meaningful when they saw how it helped patients' },
          { text: 'Only managers found it meaningful', why: 'The cleaners themselves did.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Only doctors\' jobs can be meaningful', group: 0 },
          { text: 'Meaningful work links to engagement', group: 1 },
          { text: 'A poster gives people purpose', group: 0 },
          { text: 'People can craft their own jobs', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Emmanuel says we "just fix logins".',
        prompt: 'What does Miracle say to the team?',
        options: [
          { text: 'Emmanuel, that\'s very negative.', why: 'It\'s a joke with a real question in it. Answer it.' },
          { text: 'Purpose is overrated.', why: 'The research disagrees.' },
          { text: 'We do fix logins. And every fixed login is a clinic that can send results to a mother in two hours. Both are true.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Reshaping your own job to make it more meaningful is job ___. (one word)',
        answers: ['crafting', 'Crafting'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the researchers.',
        pairs: [
          ['Job crafting', 'Wrzesniewski and Dutton'],
          ['Task significance', 'Adam Grant'],
          ['Job characteristics model', 'Hackman and Oldham'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why reconnect people to purpose every week?',
        options: [
          { text: 'Meaning fades in the daily grind' },
          { text: 'People forget the company name', why: 'It\'s the impact they forget.' },
          { text: 'It doesn\'t need repeating', why: 'It fades without it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s purpose plan. Which line won\'t work?',
        lines: [
          'A real clinic story every Monday.',
          'A big "We Change Lives" poster by the door.',
          'Let people name their own clinics on the board.',
        ],
        bug: 1,
        fix: 'A visit to a live clinic for each person this quarter.',
        explanation: 'Posters don\'t create purpose. Experiences do.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building meaning in order.',
        lines: ['Show real impact', 'Connect it to each person\'s work', 'Let people craft their jobs', 'Reconnect every week'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Purpose comes from [[1]], not [[2]].',
        blanks: [['experiences', 'experience'], ['posters', 'slogans']],
        distractors: ['pay', 'speeches'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s answer.',
        tiles: ['Both', 'are', 'true.'],
        distractors: ['false.'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the most "ordinary" part of your work or studies? Who does it help, even indirectly?',
    starters: ['The most ordinary part is...', 'It helps...'],
  },
  deepen: {
    title: 'Craft one thing',
    summary: 'Change one small thing about how you do your work or see it, so it connects more to who it helps. That\'s job crafting.',
  },
  notes: 'Amy Wrzesniewski & Jane E. Dutton (2001), "Crafting a job: Revisioning employees as active crafters of their work", Academy of Management Review 26(2); hospital cleaner study (Wrzesniewski, Dutton & Debebe 2003). Meaningful work and engagement: e.g. Allan, Batz-Barbarich, Sterling & Tay (2019) meta-analysis, J. Management Studies, hedged as "broadly".',
};

export default lesson;
