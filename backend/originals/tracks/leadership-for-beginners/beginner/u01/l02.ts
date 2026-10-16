import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: new-manager myths (Linda Hill, "Becoming the Boss", HBR 2007). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Leadership myths',
  summary: 'That night, Lucía writes a list called "Now I\'m the boss". Number one: "People have to listen to me now." Tey reads it over her shoulder and winces.',
  minutes: 11,
  outcomes: [
    'Spot the myths most new leaders believe',
    'Know the difference between compliance and commitment',
    'See where a leader\'s influence really comes from',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Once you have the title, people have to do what you say.', isFact: false, explain: "Myth. Harvard professor Linda Hill followed new managers through their first year. Many expected their title to give them authority. They found that influence had to be earned: through being trustworthy and good at the job, not through the title." },
        { text: 'Getting people to obey is the same as getting them on board.', isFact: false, explain: 'Myth. Hill calls this compliance vs commitment. People can do what you ask without caring about it. Committed people bring ideas, effort and honesty. That only comes when they trust you.' },
        { text: 'New managers often feel less in control, not more.', isFact: true, explain: 'Fact. Hill found new managers felt hemmed in: by their own boss, their team, other departments. More responsibility, but not more freedom.' },
        { text: 'Your job is now to manage each person one by one.', isFact: false, explain: "Myth, or at least only half of it. Hill's new managers learned that leading the team as a whole (how it works together) matters as much as managing each person." },
        { text: 'You earn influence through character and competence.', isFact: true, explain: 'Fact. People follow leaders they trust to do the right thing (character) and to know what they\'re doing (competence). Both are built day by day.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The title gives you responsibility, not respect. Respect comes from being trustworthy and good at the job.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Tey.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Linda Hill find about new managers and authority?',
        options: [
          { text: 'The title gave them instant respect', why: 'The opposite.' },
          { text: 'Their title didn\'t give them real influence; they had to earn it' },
          { text: 'Authority never matters', why: 'It matters, but it isn\'t enough.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Compliance or commitment?',
        groups: ['Compliance', 'Commitment'],
        items: [
          { text: 'Does the task because the boss said so', group: 0 },
          { text: 'Suggests a better way to do it', group: 1 },
          { text: 'Stays quiet about a problem', group: 0 },
          { text: 'Tells the boss about a problem early', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Number one on my list: 'People have to listen to me now.' That's true, right?",
        prompt: 'What does Tey say?',
        options: [
          { text: "They have to hear you. Whether they listen depends on whether they trust you. That's what the next 90 days are for." },
          { text: 'Yes, you\'re the boss now.', why: 'That\'s the myth.' },
          { text: 'No one will ever listen to you.', why: 'Too gloomy. Trust can be built.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Hill: people can comply without real ___. (one word)',
        answers: ['commitment', 'committment'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the reality.',
        pairs: [
          ['The title gives you authority', 'Influence is earned'],
          ['Obedience is enough', 'You need commitment'],
          ['Managers have more freedom', 'Managers feel hemmed in'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does a leader\'s influence come from, according to Hill?',
        options: [
          { text: 'A bigger office', why: 'Nice, but no.' },
          { text: 'Being the loudest in meetings', why: 'Volume isn\'t influence.' },
          { text: 'Character and competence' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s rewritten list. Which line is still a myth?',
        lines: [
          'I have to earn trust, one week at a time.',
          'From now on, my word is final, so people must just do it.',
          'I lead the team as a whole, not just six separate people.',
        ],
        bug: 1,
        fix: 'I want people to be on board, not just obey.',
        explanation: 'That\'s the authority myth. It gets compliance at best.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put how influence grows in order.',
        lines: ['A new title', 'Small promises kept', 'Trust', 'Real influence'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'The title gives you [[1]], not [[2]]. Respect comes from being [[3]] and good at the job.',
        blanks: [['responsibility'], ['respect'], ['trustworthy']],
        distractors: ['power', 'loud'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s new number one.',
        tiles: ['I', 'have', 'to', 'earn', 'their', 'trust.'],
        distractors: ['demand'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the best leader you\'ve had (at work, school, sport, anywhere). Did people follow them because of their title, or something else?',
    starters: ['The best leader I had...', 'People followed them because...'],
  },
  deepen: {
    title: 'Character and competence',
    summary: 'Write down one thing you can do this week that shows character (keeping a promise, being honest about a mistake) and one that shows competence (helping someone solve a real problem).',
  },
  notes: 'Linda A. Hill, "Becoming the Boss", Harvard Business Review (Jan 2007), and Becoming a Manager (Harvard Business School Press): myths of authority, control, managing one-on-one; compliance vs commitment; influence earned through character and competence.',
};

export default lesson;
