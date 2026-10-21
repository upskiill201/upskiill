import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 7 — spotting trends in numbers. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Spotting trends in numbers',
  summary: 'Payments rose three weeks in a row. Is that a trend, or noise? Learn the simple checks before you tell Carmen "it\'s growing".',
  minutes: 12,
  outcomes: [
    'Tell a trend from normal ups and downs',
    'Know when averages mislead',
    'Ask AI to describe patterns, then check them',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Trend or noise?',
      html:
        '<ul>' +
        '<li><strong>Look at enough points.</strong> Two weeks up isn\'t a trend. Four or more weeks in the same direction is more convincing.</li>' +
        '<li><strong>Check the size.</strong> 600 to 610 is a 2% wobble. 400 to 600 is real movement.</li>' +
        '<li><strong>Look for one-offs.</strong> A market holiday or a promotion can spike one week.</li>' +
        '<li><strong>Averages can hide things.</strong> If two big shops do half the payments, the "average shop" doesn\'t exist. The <strong>median</strong> (the middle value) is often more honest.</li>' +
        '</ul>' +
        '<p>Ask AI: <em>"Here is my weekly table. Describe any patterns, say how confident you are, and list one-offs that might explain them."</em> Then look at the numbers yourself.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Enough points, a real size, no one-offs. Use the median when a few big values dominate.',
    },
  ],
  apply: {
    scenario: 'Ada looks at four weeks of pilot data.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Likely trend, or likely noise?',
        groups: ['Likely trend', 'Likely noise'],
        items: [
          { text: '400, 470, 530, 600 over four weeks', group: 0 },
          { text: '600, 612, 598, 605', group: 1 },
          { text: 'One big spike in a holiday week', group: 1 },
          { text: 'Steady rise every week for six weeks', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the median?',
        options: [
          { text: 'The middle value when you sort them' },
          { text: 'The average', why: 'The average is the mean.' },
          { text: 'The biggest value', why: 'That\'s the maximum.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Shop payments this week: 2, 3, 3, 4, 88. What is the median?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'For those five shops (2, 3, 3, 4, 88), the average is 20. Why is the median more honest here?',
        options: [
          { text: 'One huge shop pulls the average up; most shops did 2-4' },
          { text: 'Averages are always wrong', why: 'Only when a few values dominate.' },
          { text: 'It isn\'t', why: '20 describes no real shop.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request finds patterns most honestly?',
        options: [
          { text: 'Show me the growth.', why: 'Assumes there is growth.' },
          { text: 'Here\'s my weekly table. Describe any patterns, say how confident you are, and list one-offs that might explain them.' },
          { text: 'Make it look good.', why: 'Not analysis.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Payments jumped 30% in week 3! Can I tell Carmen we\'re growing fast?',
        prompt: 'Week 3 had a market festival. Best reply?',
        options: [
          { text: 'Week 3 had the festival, so part of that is a one-off. Weeks 1 to 4 overall show steady growth, about 15% a week. Let\'s say that.' },
          { text: 'Yes, 30% growth!', why: 'One-off spike.' },
          { text: 'No growth at all.', why: 'The overall trend is up.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Enough [[1]], a real [[2]], no one-offs.',
        blanks: [['points'], ['size']],
        distractors: ['colours', 'guess'],
      },
      {
        kind: 'findBug',
        prompt: 'Which claim isn\'t supported by two weeks of data?',
        lines: [
          'Week 1: 400 payments',
          'Week 2: 450 payments',
          'Payments rose 50 between weeks 1 and 2',
          'Payments will keep growing every week',
        ],
        bug: 3,
        fix: 'Too early to call a trend; watch the next few weeks.',
        explanation: 'Two points can\'t show a trend, let alone the future.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the mistake it prevents.',
        pairs: [
          ['Enough points', 'Calling two weeks a trend'],
          ['Real size', 'Treating a 2% wobble as news'],
          ['One-offs', 'Credit for a festival spike'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s add-on to the AI request.',
        tiles: ['Say', 'how', 'confident', 'you', 'are'],
        distractors: ['loudly'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Average or median?',
        groups: ['Average is fine', 'Median is better'],
        items: [
          { text: 'Payments when shops are all similar', group: 0 },
          { text: 'Payments when two shops do half', group: 1 },
          { text: 'Daily temperatures in one month', group: 0 },
          { text: 'Payment amounts with a few huge ones', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do after AI describes a pattern?',
        options: [
          { text: 'Look at the numbers herself to confirm it' },
          { text: 'Put it straight in the deck', why: 'Check it first.' },
          { text: 'Ask for a bigger pattern', why: 'Confirm first.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "trend" someone claimed at work. Did it have enough points, a real size and no one-offs?',
    starters: ['The trend:', 'Did it pass?'],
  },
  deepen: { title: 'Try it today', summary: 'Find one average you use at work. Check the median too. Are they close?' },
  notes: 'Median vs mean is standard statistics. Figures fictional.',
};

export default lesson;
