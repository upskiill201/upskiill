import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Card deck: what you assume about people shows (McGregor's Theory X and Theory Y in practice). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Your assumptions show',
  summary: 'Folake has a rule: every Clinic Success agent must log what they\'re doing every 15 minutes. "Otherwise they slack." Bisi calls it "the babysitting sheet". Miracle wonders what it\'s teaching the team. Tey deals out the cards.',
  minutes: 11,
  outcomes: [
    'Know how a leader\'s assumptions turn into rules',
    'Spot Theory X rules that create the behaviour they fear',
    'Replace control with clarity and trust',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Douglas McGregor's big insight (1960) wasn't just that leaders hold assumptions about people. It was that those assumptions turn into <strong>rules</strong>, and the rules shape how people behave. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Theory X rules</h3><p>Assume people avoid work, and you build rules for that: tracking every 15 minutes, approvals for everything, no trust. The babysitting sheet is a Theory X rule.</p><h3>Card 2: Theory Y rules</h3><p>Assume people want to do good work, and you build different rules: clear goals, freedom in how, help when stuck. Most of what this course teaches is Theory Y in practice.</p><h3>Card 3: The rules teach the behaviour</h3><p>Treat people as untrustworthy, and many stop trying to earn trust. The babysitting sheet doesn't stop slacking. It teaches people to look busy every 15 minutes.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Measure outcomes, not activity</h3><p>Instead of \"what are you doing every 15 minutes?\", ask \"how many clinics went live this week, and are they happy?\" Outcomes tell you what matters. Activity logs tell you who's good at filling in logs.</p><h3>Card 5: Deal with the exception directly</h3><p>If one person really isn't working, talk to that person. Don't build a rule that punishes everyone for one person's behaviour.</p><h3>Card 6: Change the rule with the boss, not around them</h3><p>Miracle can't just bin Folake's sheet. But she can propose a trial: \"Two weeks without the sheet, measured on clinics live. If it drops, we bring it back.\"</p>",
    },
    {
      kind: 'check',
      question: 'What does the babysitting sheet actually teach?',
      options: ['How to look busy every 15 minutes', 'How to do great work', 'How to help clinics'],
      answer: 0,
      explanation: 'Measure activity, and you get activity.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Assumptions become rules, and rules teach behaviour. Measure outcomes, not activity. Deal with one person directly. Change rules with a fair trial.',
    },
  ],
  apply: {
    scenario: 'The babysitting sheet.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was McGregor\'s big insight?',
        options: [
          { text: 'People are lazy', why: 'That\'s Theory X, which he questioned.' },
          { text: 'Rules don\'t matter', why: 'They matter a lot.' },
          { text: 'A leader\'s assumptions become rules, and the rules shape behaviour' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Theory X rule or Theory Y rule?',
        groups: ['Theory X', 'Theory Y'],
        items: [
          { text: 'Log activity every 15 minutes', group: 0 },
          { text: 'Clear goals, freedom in how', group: 1 },
          { text: 'Approval needed for every email', group: 0 },
          { text: 'Measured on clinics live', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Without the sheet, they\'ll slack. I\'ve seen it.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Could we try two weeks without it, measured on clinics live? If the number drops, we bring the sheet back.' },
          { text: 'They won\'t. Trust me.', why: 'Folake needs evidence, not trust.' },
          { text: 'I\'ll quietly stop using it.', why: 'Going around your boss costs trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Measure ___, not activity. (one word)',
        answers: ['outcomes', 'Outcomes', 'results'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the move.',
        pairs: [
          ['Measure outcomes', 'Clinics live this week'],
          ['Deal with the exception', 'Talk to the one person'],
          ['Change it with the boss', 'A two-week trial'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'If one person really isn\'t working, what should Miracle do?',
        options: [
          { text: 'Add a rule for everyone', why: 'That punishes everyone for one person.' },
          { text: 'Talk to that person directly' },
          { text: 'Ignore it', why: 'Address it, with that person.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s trial proposal. Which line is still Theory X?',
        lines: [
          'Two weeks without the 15-minute sheet.',
          'Instead, I\'ll screen-record everyone\'s computer.',
          'We\'ll measure clinics live and clinic satisfaction.',
        ],
        bug: 1,
        fix: 'If the numbers drop, we bring the sheet back.',
        explanation: 'Swapping one surveillance tool for another isn\'t trust.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put changing a Theory X rule in order.',
        lines: ['Name the outcome that matters', 'Propose a fair trial with the boss', 'Measure the outcome', 'Decide together, on evidence'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Measure [[1]], and you get activity. Measure outcomes, and you get [[2]].',
        blanks: [['activity'], ['results', 'outcomes']],
        distractors: ['nothing', 'logs'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the trial offer.',
        tiles: ['Two', 'weeks,', 'measured', 'on', 'clinics', 'live.'],
        distractors: ['sheets'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a rule where you work or study that assumes people can\'t be trusted? What behaviour does it actually create?',
    starters: ['The rule is...', 'It creates...'],
  },
  deepen: {
    title: 'Find one X rule',
    summary: 'Spot one rule that measures activity rather than outcomes. Write down what outcome it\'s supposed to protect. Could you measure that instead?',
  },
  notes: 'Douglas McGregor, The Human Side of Enterprise (1960): Theory X and Theory Y as managerial assumptions that shape organisational practices and become self-fulfilling. Outcome vs activity measurement: standard performance-management guidance. Fictional details.',
};

export default lesson;
