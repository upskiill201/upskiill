import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Card deck: what counts as an impulse buy. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What counts as an impulse buy?',
  summary: 'Is buying kelewele on the way home an impulse buy? What about the boots? Researchers have a clear way to tell. Four cards, one idea each.',
  minutes: 10,
  outcomes: [
    'Define an impulse buy in plain words',
    'Tell planned, unplanned and impulse purchases apart',
    'Know that not every unplanned buy is a problem',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>An impulse buy</strong> is a purchase made on a sudden, strong urge to buy something now, without much thought about whether you need it or can afford it.</p><p>Consumer researcher Dennis Rook (1987) described the "buying impulse" as sudden, powerful and persistent: an urge that feels like it has to be acted on <em>right now</em>.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Three kinds of purchase:</strong></p><ul><li><strong>Planned:</strong> you decided before you saw it. "I need a new charger; I\'ll buy one on Saturday."</li><li><strong>Unplanned but fine:</strong> you didn\'t plan it, but it fits your needs and budget. Out of soap, you see soap, you buy soap.</li><li><strong>Impulse:</strong> a sudden urge, triggered by a feeling or a trick, often for something you didn\'t need. The 2:14 a.m. boots.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>The signs of an impulse buy:</strong></p><ul><li>It feels urgent: "now or never".</li><li>A feeling is driving it: excitement, sadness, boredom, stress.</li><li>You skip the usual questions: do I need it? does it fit my budget?</li><li>Afterwards, there\'s often regret, or the good feeling fades fast.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>Not all impulses are bad.</strong> A GH₵12 kelewele on a hard day, inside your fun line, is a small, harmless treat. The problem is impulse buys that are big, frequent, unaffordable, or regretted. This course is about those.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi runs out of toothpaste, sees it at the hall shop, buys it. What kind of purchase?',
      options: ['Impulse', 'Unplanned but fine', 'Planned'],
      answer: 1,
      explanation: 'He didn\'t plan it, but it\'s a need, and no urge or trick was involved.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'An impulse buy: sudden, urgent, driven by a feeling or a trick, skipping the usual questions. Small ones inside your budget are fine; big, frequent or regretted ones are the problem.',
    },
  ],
  apply: {
    scenario: 'Sorting Kofi\'s purchases.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Planned, unplanned-but-fine, or impulse?',
        groups: ['Planned', 'Unplanned but fine', 'Impulse'],
        items: [
          { text: 'The laptop, saved for 16 weeks', group: 0 },
          { text: 'Toothpaste when he ran out', group: 1 },
          { text: 'The 2:14 a.m. boots', group: 2 },
          { text: 'A phone case from a pop-up ad after an exam', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a sign of an impulse buy?',
        options: [
          { text: 'It\'s on your shopping list', why: 'That\'s planned.' },
          { text: 'You compared three prices first', why: 'That\'s careful buying.' },
          { text: 'It feels like now or never' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each sign to an example.',
        pairs: [
          ['Urgency', '"Ends in 04:59"'],
          ['A feeling driving it', 'Upset after the penalty'],
          ['Skipped questions', 'Never checked the size or returns'],
          ['Regret afterwards', 'The box of wrong-size boots'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'So is every kelewele I buy an impulse buy I should feel bad about?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'No. Small treats inside your fun line are fine. We\'re after the big, frequent or regretted ones.' },
          { text: 'Yes, stop buying kelewele.', why: 'Small planned treats are part of a plan that lasts.' },
          { text: 'Nothing is an impulse buy.', why: 'The boots definitely were.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rook\'s description.',
        template: 'Sudden, [[1]] and persistent: an urge to buy right [[2]].',
        blanks: [['powerful', 'strong'], ['now']],
        distractors: ['weak', 'later'],
      },
      {
        kind: 'findBug',
        prompt: 'Which purchase is wrongly labelled?',
        lines: [
          'Bus ticket home, booked a week ahead: planned.',
          'Rice when the bag ran out: unplanned but fine.',
          'Three T-shirts from an ad at midnight "because they were cheap": planned.',
        ],
        bug: 2,
        fix: 'Three T-shirts from a midnight ad: impulse.',
        explanation: 'Midnight, an ad, "because they were cheap": all signs of an impulse.',
      },
      {
        kind: 'mcq',
        prompt: 'Which impulse buys does this course care most about?',
        options: [
          { text: 'Every unplanned GH₵2 purchase', why: 'Small, affordable treats aren\'t the problem.' },
          { text: 'Only online ones', why: 'Impulses happen in markets and shops too.' },
          { text: 'Big, frequent, unaffordable or regretted ones' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many kinds of purchase did the lesson describe? (A number.)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'For Yaw: fine treat, or problem impulse?',
        groups: ['Fine treat', 'Problem impulse'],
        items: [
          { text: 'A GH₵10 drink after training', group: 0 },
          { text: 'GH₵600 sneakers on "pay later" at 1 a.m.', group: 1 },
          { text: 'Suya with friends from his fun money', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the signs as an impulse unfolds.',
        lines: ['A feeling or a trick', 'A sudden urge', 'Skipping the usual questions', 'Buying fast', 'The good feeling fades'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last three purchases. Which were planned, which unplanned but fine, and which were impulses?',
    starters: ['Planned:...', 'Unplanned but fine:...', 'Impulse:...'],
  },
  deepen: {
    title: 'When it\'s more than impulse',
    summary: 'For a small number of people, buying becomes compulsive: hard to stop, causing serious debt or distress, and continuing despite harm. If that sounds like you or someone you know, talking to a doctor, counsellor or a support service can help. This course is for everyday impulse buying.',
  },
  notes: 'Rook, D. W. (1987). The buying impulse. Journal of Consumer Research, 14(2), 189–199. Compulsive buying disorder: estimated in a minority of adults (e.g. Maraz et al. 2016 meta-analysis ~5%); stated qualitatively; non-clinical framing and signpost per playbook §9.',
};

export default lesson;
