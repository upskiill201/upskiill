import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Step-by-step: make your alternative stronger. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Make your alternative stronger',
  summary: 'Tuesday. Arjun has three days to turn "no idea" into a real alternative. Five steps, starting with a call he\'s been putting off: to Grace\'s company, Kinwell.',
  minutes: 12,
  outcomes: [
    'Turn a vague alternative into a real one',
    'Put a number on your BATNA',
    'Set your walk-away from it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to a stronger BATNA',
      steps: [
        { title: '1. List every option', body: 'Kinwell might extend Arjun\'s contract. Two leads from last month never got a proposal. Or the team could build their own product.' },
        { title: '2. Make the best one real', body: 'He calls Kinwell. Priya, Grace\'s manager, offers a 12-week extension: £18,000, needing Arjun and half of Kavya\'s time.' },
        { title: '3. Put a number on it', body: 'Kinwell: £18,000 minus £6,000 in costs. Arjun keeps £12,000 for 12 weeks, with Joel free for other work.' },
        { title: '4. Set your walk-away from it', body: 'Harlow & Finch phase one costs £25,000. To beat Kinwell, Arjun must keep more than £12,000. Walk-away: £37,000.' },
        { title: '5. Keep improving', body: 'He sends proposals to both old leads. Even if neither lands by Friday, he feels the difference.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'List options, make the best one real, put a number on it, set your walk-away from it, and keep improving it.',
    },
  ],
  apply: {
    scenario: 'Three days to a better BATNA.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['List every option', 'Make the best one real', 'Put a number on it', 'Set your walk-away from it', 'Keep improving'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kinwell pays £18,000; costs are £6,000. What does Arjun keep, in pounds?',
        answers: ['12000', '12,000', '£12,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Phase one costs £25,000. To keep £12,000, what\'s the walk-away, in pounds?',
        answers: ['37000', '37,000', '£37,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Pryce offers £35,000. Compared with the walk-away?',
        options: [
          { text: '£2,000 below it: Kinwell would be better' },
          { text: 'Above it', why: '£35,000 is less than £37,000.' },
          { text: 'Exactly at it', why: 'It\'s £2,000 short.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A real alternative, or just a hope?',
        groups: ['Real', 'Hope'],
        items: [
          { text: 'Kinwell\'s written 12-week offer', group: 0 },
          { text: '"Someone will probably hire us"', group: 1 },
          { text: 'A proposal sent to an old lead', group: 0 },
          { text: '"Maybe Pryce will change his mind"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Kinwell is less exciting than Harlow & Finch.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'True, so I\'d prefer Harlow & Finch at a fair price. But Kinwell means I don\'t have to accept an unfair one.' },
          { text: 'Then forget Kinwell.', why: 'It\'s what gives him power.' },
          { text: 'Then take Kinwell and drop Harlow & Finch.', why: 'He still wants the bigger deal, fairly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'From BATNA to walk-away.',
        template: 'Your [[1]] comes from your BATNA: the deal must [[2]] it.',
        blanks: [['walk-away', 'walkaway'], ['beat']],
        distractors: ['logo', 'copy'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep improving the BATNA after setting a walk-away?',
        options: [
          { text: 'A better alternative raises the walk-away and makes you calmer' },
          { text: 'It\'s not needed', why: 'BATNAs can always improve.' },
          { text: 'To cancel Harlow & Finch', why: 'It\'s to negotiate from strength.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Arjun\'s BATNA working is wrong?',
        lines: [
          'Kinwell: £18,000 for 12 weeks.',
          'Costs: £6,000.',
          'So Kinwell is worth £18,000 to me.',
          'Walk-away for Harlow & Finch: £37,000.',
        ],
        bug: 2,
        fix: 'So Kinwell is worth £12,000 to me.',
        explanation: 'Compare what he keeps, not the headline.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to what Arjun did with it.',
        pairs: [
          ['Kinwell', 'Called and got a written offer'],
          ['Two old leads', 'Sent proposals'],
          ['Own product', 'Left on the list for now'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'List your alternatives for a negotiation. Pick the best one: what could you do this week to make it real?',
    starters: ['My options:...', 'This week I will...'],
  },
  deepen: {
    title: 'Before, not during',
    summary: 'You can\'t build a BATNA in the middle of a meeting. The time to improve it is before you sit down, which is why the best negotiators are always quietly building alternatives.',
  },
  notes: 'Fictional: Kinwell 12-week extension £18,000, costs £6,000 → £12,000; Harlow & Finch phase one costs £25,000 → walk-away £37,000; Pryce £35,000 is £2,000 short. BATNA improvement: Getting to Yes, ch. 6.',
};

export default lesson;
