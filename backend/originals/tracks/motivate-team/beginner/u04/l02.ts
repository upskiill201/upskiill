import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: what feels fair (Adams' equity theory; organisational justice, Colquitt 2001). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What feels fair',
  summary: 'Saturday. Miracle can\'t stop thinking about Bisi\'s face. She\'s never thought of fairness as part of motivation. On the bus, Tey sends her two pieces of research that change how she sees it.',
  minutes: 12,
  outcomes: [
    'Know what equity theory says about fairness',
    'Know the three kinds of fairness at work',
    'Spot unfairness before it drains your team',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Fairness is a motivator',
      html: "<p>In 1963, psychologist <strong>J. Stacy Adams</strong> proposed <strong>equity theory</strong>: people compare what they put in (effort, skill, time) and what they get out (pay, praise, opportunities) with what others put in and get out. When it feels unbalanced, people feel it as unfair, and often reduce their effort, or leave, to rebalance. Bisi put in 19 clinics. Emmanuel put in four. They got the same words. That's an equity problem.</p><h3>Three kinds of fairness</h3><p>Later research on <strong>organisational justice</strong> found that people judge fairness in at least three ways. A review by <strong>Jason Colquitt</strong> and colleagues (2001) linked all three to trust, satisfaction and commitment.</p><ul><li><strong>Distributive:</strong> are the outcomes fair? (Who gets Saturdays, who gets the praise.)</li><li><strong>Procedural:</strong> is the process fair? (Is there a clear rule, or \"whoever's free\"?)</li><li><strong>Interactional:</strong> am I treated with respect and told the truth? (Did anyone explain or ask?)</li></ul><h3>Why process matters so much</h3><p>People often accept an outcome they don't love if the process was fair and they were heard. A rota built together, with a clear rule, feels fair even on your Saturday.</p><h3>Fair isn't the same as equal</h3><p>Equal would be \"great job, everyone\". Fair is recognising each person for what they actually did, with the same rules for everyone.</p>",
    },
    {
      kind: 'check',
      question: 'Which kind of fairness was "whoever\'s free"?',
      options: ['A procedural problem: an unfair process', 'A distributive success', 'Not a fairness issue'],
      answer: 0,
      explanation: 'An unclear rule that lands on the person least likely to complain.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People compare effort and reward with others. Fair outcomes, a fair process, and respectful treatment all matter. Fair isn\'t equal.',
    },
  ],
  apply: {
    scenario: 'The bus, Saturday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does equity theory say?',
        options: [
          { text: 'Everyone should be paid the same', why: 'It\'s about balance, not sameness.' },
          { text: 'People compare their effort and rewards with others\', and react to imbalance' },
          { text: 'Fairness doesn\'t matter', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of fairness?',
        groups: ['Distributive', 'Procedural', 'Interactional'],
        items: [
          { text: 'Who ends up with Saturdays', group: 0 },
          { text: 'A clear rota rule', group: 1 },
          { text: 'Being asked and told the truth', group: 2 },
          { text: 'Who gets named at stand-up', group: 0 },
          { text: 'Built together, not decided alone', group: 1 },
          { text: 'Being treated with respect', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'So "great job, everyone" is unfair? I meant it kindly.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Kind, and equal, but not fair. Fair is recognising what each person actually did.' },
          { text: 'Yes, never praise the team.', why: 'Team praise is fine. It just can\'t replace individual recognition.' },
          { text: 'No, it\'s fine.', why: 'Bisi\'s face said otherwise.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'J. Stacy Adams proposed ___ theory. (one word)',
        answers: ['equity', 'Equity'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of fairness to its question.',
        pairs: [
          ['Distributive', 'Are the outcomes fair?'],
          ['Procedural', 'Is the process fair?'],
          ['Interactional', 'Am I treated with respect?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can a fair process make an unwanted outcome acceptable?',
        options: [
          { text: 'It can\'t', why: 'Research says it often does.' },
          { text: 'People forget outcomes', why: 'They remember how they were treated.' },
          { text: 'People accept outcomes better when the process was fair and they were heard' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s fairness plan. Which line confuses fair with equal?',
        lines: [
          'Build the rota together with a clear rule.',
          'Give everyone identical praise every Friday, to be fair.',
          'Explain decisions honestly when people ask.',
        ],
        bug: 1,
        fix: 'Name what each person actually did every Friday.',
        explanation: 'Identical praise for different work is equal, not fair.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put checking fairness in order.',
        lines: ['Are the outcomes fair?', 'Is the process fair?', 'Are people treated with respect?', 'Fix the weakest one first'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Fair isn\'t [[1]]. Fair is recognising what each person actually [[2]].',
        blanks: [['equal', 'the same'], ['did']],
        distractors: ['paid', 'said'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the key idea.',
        tiles: ['Fair', 'isn\'t', 'the', 'same', 'as', 'equal.'],
        distractors: ['kind.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something at work or school that felt unfair. Was it the outcome, the process, or how you were treated?',
    starters: ['What felt unfair was...', 'It was mainly the...'],
  },
  deepen: {
    title: 'The three questions',
    summary: 'Pick one decision you made recently that affects others. Ask the three fairness questions: outcome, process, respect. Which is weakest?',
  },
  notes: 'J. Stacy Adams (1963), "Toward an understanding of inequity", J. Abnormal and Social Psychology 67(5). Jason A. Colquitt, Donald E. Conlon, Michael J. Wesson, Christopher O. L. H. Porter & K. Yee Ng (2001), "Justice at the millennium: A meta-analytic review", J. Applied Psychology 86(3). Fair process: Thibaut & Walker (1975); Kim & Mauborgne (1997).',
};

export default lesson;
