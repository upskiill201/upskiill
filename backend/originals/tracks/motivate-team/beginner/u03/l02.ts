import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Myth or Fact: rewards and intrinsic motivation (Lepper et al. 1973; Deci, Koestner & Ryan 1999; Cerasoli et al. 2014). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Rewards can backfire',
  summary: 'Folake loves Bisi\'s script. "Let\'s pay ₦5,000 for every script improvement anyone makes!" It sounds generous. Miracle has a strange feeling it might ruin the thing that made Bisi do it in the first place. Myth or fact?',
  minutes: 11,
  outcomes: [
    'Know when rewards help and when they backfire',
    'Know the difference between quality and quantity effects',
    'Use recognition without turning work into a transaction',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Paying people for something they already enjoy always makes them do more of it.', isFact: false, explain: 'Myth. In a famous study by Mark Lepper, David Greene and Richard Nisbett (1973), children who loved drawing were promised a reward for it. Later, they drew less in free time than children who weren\'t promised one. The reward turned play into work. Researchers call it the overjustification effect.' },
        { text: 'Expected, "do this, get that" rewards can reduce interest in tasks people already enjoy.', isFact: true, explain: 'Fact. A review of 128 experiments by Edward Deci, Richard Koestner and Richard Ryan (1999) found that expected, tangible rewards tied to doing an interesting task tended to reduce people\'s own interest in it.' },
        { text: 'Rewards never work.', isFact: false, explain: 'Myth. Rewards can work well for routine, boring tasks, and for quantity. A review by Christopher Cerasoli and colleagues (2014) found that incentives were better at predicting quantity of work, while intrinsic motivation was better at predicting quality.' },
        { text: 'Unexpected thanks after the fact is less likely to backfire.', isFact: true, explain: 'Fact, broadly. Surprise recognition ("that script was brilliant, here\'s lunch on me") tends to feel like appreciation, not payment, so it doesn\'t turn the work into a transaction.' },
        { text: 'Bisi rewrote the script mainly because she wanted a bonus.', isFact: false, explain: 'Myth. She did it because she cared about the nurses and had ideas nobody let her try. Paying per script risks replacing that reason with a price.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Expected rewards for enjoyable work can kill the joy. Incentives drive quantity; intrinsic motivation drives quality. Thank people after, not "do this, get that".',
    },
  ],
  apply: {
    scenario: 'Myth or fact: the ₦5,000-per-script idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened to children promised a reward for drawing?',
        options: [
          { text: 'They drew more forever', why: 'The opposite, later.' },
          { text: 'They later drew less in free time than others' },
          { text: 'Nothing changed', why: 'Their own interest dropped.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Rewards for enjoyable work always help', group: 0 },
          { text: 'Expected rewards can reduce interest', group: 1 },
          { text: 'Rewards never work', group: 0 },
          { text: 'Surprise thanks rarely backfires', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '₦5,000 per script improvement! Generous, right?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Generous, yes. But research says paying for things people already love can make them care less. Could we thank Bisi publicly and give her ownership instead?' },
          { text: 'Great idea!', why: 'Risks turning Bisi\'s care into a price.' },
          { text: 'Money is bad.', why: 'Too simple. It depends on the task.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When a reward replaces your own reason for doing something: the over___ effect. (one word)',
        answers: ['justification', 'Justification'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to the researchers.',
        pairs: [
          ['Children and drawing', 'Lepper, Greene and Nisbett'],
          ['128 experiments reviewed', 'Deci, Koestner and Ryan'],
          ['Quality vs quantity', 'Cerasoli and colleagues'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When can incentives work well?',
        options: [
          { text: 'For creative work people love', why: 'That\'s where they backfire most.' },
          { text: 'Never', why: 'They can work for routine quantity.' },
          { text: 'For routine tasks and quantity' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s counter-proposal. Which line repeats the risk?',
        lines: [
          'Bisi owns the onboarding script from now on.',
          'Anyone who suggests a change gets ₦5,000 each time.',
          'We thank people at stand-up when their ideas work.',
        ],
        bug: 1,
        fix: 'Good ideas get tried, and named on the board when they work.',
        explanation: 'A fixed price per idea is the "do this, get that" reward that backfires.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put rewarding well in order.',
        lines: ['Notice the good work', 'Thank them specifically', 'Give them more ownership', 'Only incentivise routine quantity'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Incentives drive [[1]]. Intrinsic motivation drives [[2]].',
        blanks: [['quantity'], ['quality']],
        distractors: ['nothing', 'speed'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s alternative.',
        tiles: ['Thank', 'her,', 'then', 'let', 'her', 'own', 'it.'],
        distractors: ['pay'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you do because you enjoy it. How would it feel if someone started paying you per piece? Would you care more or less?',
    starters: ['I enjoy...', 'If I were paid per piece...'],
  },
  deepen: {
    title: 'Thank after, not before',
    summary: 'Next time you want to reward good work, try a specific, unexpected thank-you after it happens, instead of announcing a prize in advance.',
  },
  notes: 'Mark R. Lepper, David Greene & Richard E. Nisbett (1973), "Undermining children\'s intrinsic interest with extrinsic reward", J. Personality & Social Psychology 28(1). Edward L. Deci, Richard Koestner & Richard M. Ryan (1999), meta-analysis of 128 studies, Psychological Bulletin 125(6). Christopher P. Cerasoli, Jessica M. Nicklin & Michael T. Ford (2014), meta-analysis, Psychological Bulletin 140(4): intrinsic motivation predicted quality; incentives predicted quantity. ₦ = Nigerian naira.',
};

export default lesson;
