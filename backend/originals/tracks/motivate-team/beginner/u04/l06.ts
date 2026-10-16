import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Step-by-step: sharing the unpopular work fairly (rotas and workload). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Sharing the hard stuff',
  summary: 'Before Monday\'s rota meeting, Miracle realises it isn\'t just Saturdays. Bisi gets every angry clinic. Halima gets every Hausa call. Chidi gets every "hard one". Tey helps her plan a fair way to share the work nobody wants.',
  minutes: 12,
  outcomes: [
    'Share unpopular work fairly in five steps',
    'Use clear rules instead of "whoever\'s free"',
    'Balance fairness with people\'s strengths',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Sharing the hard stuff in five steps',
      steps: [
        { title: '1. Make it visible', body: 'List the unpopular work: Saturdays, angry clinics, 8 p.m. on-call, data clean-up. Next to each, who\'s actually been doing it. Seeing it is often enough to shock everyone.' },
        { title: '2. Agree a clear rule together', body: '"One Saturday each a month. On-call rotates weekly. Angry clinics go to whoever owns the clinic." A clear rule, agreed together, is procedural fairness.' },
        { title: '3. Respect strengths, but share the load', body: 'Halima is the only Hausa speaker, so Hausa calls are hers. That\'s fine, if something else comes off her plate in return. Fair doesn\'t mean identical tasks.' },
        { title: '4. Give something back', body: 'Saturday shifts earn a weekday off. On-call week means no 9 a.m. stand-up. Unpopular work should cost the same for everyone, and be paid back.' },
        { title: '5. Review it monthly', body: '"Is anyone carrying more than their share?" Two minutes, once a month. Rotas drift back to "whoever\'s free" if nobody checks.' },
      ],
    },
    {
      kind: 'compare',
      title: 'The rota, before and after',
      before: { label: 'Whoever\'s free', text: 'Halima: every Saturday. Bisi: every angry clinic. Chidi: every hard one. Emmanuel: never on-call. (Nobody planned it. It just happened.)' },
      after: { label: 'Agreed rules', text: 'Saturdays: one each a month, with a weekday off. On-call: rotates weekly. Angry clinics: the clinic\'s owner, with Bisi as backup. Hausa calls: Halima, so her data clean-up moves to Emmanuel.' },
      notes: ['The unfairness was nobody\'s plan, so nobody saw it.', 'Clear rules stop the drift.', 'Halima keeps Hausa, and loses something else.'],
    },
  ],
  apply: {
    scenario: 'Planning the rota meeting.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Make it visible', 'Agree a clear rule together', 'Respect strengths, share the load', 'Give something back', 'Review it monthly'],
      },
      {
        kind: 'mcq',
        prompt: 'Why make the unpopular work visible first?',
        options: [
          { text: 'Unplanned unfairness is invisible until someone writes it down' },
          { text: 'To blame people', why: 'It\'s to see the pattern.' },
          { text: 'For the audit', why: 'It\'s for fairness.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair rule, or drift?',
        groups: ['Fair rule', 'Drift'],
        items: [
          { text: 'On-call rotates weekly', group: 0 },
          { text: '"Whoever\'s free"', group: 1 },
          { text: 'Saturday earns a weekday off', group: 0 },
          { text: '"Bisi\'s good with angry ones"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'But I\'m the only one who speaks Hausa. I have to do those calls.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Then you\'ll just have more work.', why: 'That\'s the unfairness again.' },
          { text: 'Let\'s stop Hausa support.', why: 'Clinics need it. Rebalance instead.' },
          { text: 'You do, and you\'re brilliant at them. So your data clean-up moves to Emmanuel. Fair isn\'t identical tasks.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rotas drift back to "whoever\'s free" if nobody ___. (one word)',
        answers: ['checks', 'Checks', 'reviews'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the unpopular work to the new rule.',
        pairs: [
          ['Saturdays', 'One each a month, with a day off'],
          ['On-call', 'Rotates weekly'],
          ['Angry clinics', 'The clinic\'s owner'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give something back for unpopular work?',
        options: [
          { text: 'To bribe people', why: 'It\'s fair repayment.' },
          { text: 'It\'s not needed', why: 'Unpaid extras build resentment.' },
          { text: 'So it costs the same for everyone, and isn\'t a hidden extra' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The draft rota rules. Which line will drift back?',
        lines: [
          'Saturdays: one each a month.',
          'Extra cover: whoever volunteers first.',
          'On-call: rotates weekly.',
        ],
        bug: 1,
        fix: 'Extra cover: next person on the rotation.',
        explanation: '"Whoever volunteers first" lands on the most helpful person, again.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make it [[1]]. Agree a clear [[2]]. Review it [[3]].',
        blanks: [['visible'], ['rule'], ['monthly']],
        distractors: ['secret', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the review question.',
        tiles: ['Is', 'anyone', 'carrying', 'more', 'than', 'their', 'share?'],
        distractors: ['less'],
      },
    ],
  },
  reflect: {
    prompt: 'List the unpopular work in a group you\'re part of. Who\'s really been doing it? What rule would make it fair?',
    starters: ['The unpopular work is...', 'It\'s mostly been...', 'A fair rule: ...'],
  },
  deepen: {
    title: 'Write the hard-stuff list',
    summary: 'Write down the three least popular tasks in your team, and who did them last month. Share it, and agree one rule together.',
  },
  notes: 'Procedural justice in task allocation (Colquitt 2001; Thibaut & Walker 1975); invisible and "non-promotable" work falling on helpful people (e.g. Babcock, Recalde, Vesterlund & Weingart 2017), hedged. Fictional details.',
};

export default lesson;
