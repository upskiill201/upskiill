import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Step-by-step: questions that find interests. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Questions that find interests',
  summary: 'Ada can\'t trade if she doesn\'t know what Mr Adeyemi values. Lucía gives her five questions that get people talking about what really matters to them.',
  minutes: 12,
  outcomes: [
    'Ask open questions that reveal interests',
    'Follow up instead of jumping to numbers',
    'Find what matters most to the other side',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five questions',
      steps: [
        { title: '1. "What made you decide on this?"', body: 'Gets the reason behind the position. He says: service charges and repair costs went up.' },
        { title: '2. "What matters most to you in a tenant?"', body: 'He says: paying on time, and not having to look for someone new every year.' },
        { title: '3. "What worries you about this?"', body: 'He worries about the flat sitting empty, and about the gate lock someone keeps breaking.' },
        { title: '4. "What would a great outcome look like for you?"', body: 'He says: a reliable tenant, a fair rent, no hassle.' },
        { title: '5. "If we could solve X, would that help with Y?"', body: '"If I signed for two years, would that help with the rent?" Now you\'re testing a trade.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask open questions ("what", "how"), then listen. The other side will usually tell you what they value.',
    },
  ],
  apply: {
    scenario: 'Ada\'s questions.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five questions.',
        lines: ['What made you decide on this?', 'What matters most to you?', 'What worries you?', 'What would a great outcome look like?', 'If we solved X, would that help with Y?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Open question or closed?',
        groups: ['Open', 'Closed'],
        items: [
          { text: '"What matters most to you in a tenant?"', group: 0 },
          { text: '"Will you take ₦1,300,000?"', group: 1 },
          { text: '"What worries you about this?"', group: 0 },
          { text: '"Is that your final offer?"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match his answer to the interest it reveals.',
        pairs: [
          ['"Service charges went up"', 'Covering rising costs'],
          ['"Pay on time"', 'Reliable income'],
          ['"Not every year"', 'Avoiding empty months'],
          ['"The gate lock"', 'Less hassle with repairs'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which question tests a trade?',
        options: [
          { text: '"If I signed for two years, would that help with the rent?"' },
          { text: '"What matters most to you?"', why: 'That finds interests; it doesn\'t test a trade yet.' },
          { text: '"Why so expensive?"', why: 'That sounds like an attack.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What if he just says "I want more money"?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Follow up: "What\'s driving that, rising costs?" Money is usually a means to something. Find the something.' },
          { text: 'Then there\'s nothing to trade.', why: 'There\'s usually a reason behind "more money".' },
          { text: 'Tell him that\'s greedy.', why: 'That ends the questions.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Open questions.',
        template: 'Open questions start with "what" or "[[1]]". Then [[2]].',
        blanks: [['how'], ['listen']],
        distractors: ['is', 'argue'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do closed questions find fewer interests?',
        options: [
          { text: 'They can be answered with yes or no, so people don\'t explain' },
          { text: 'They\'re rude', why: 'They\'re fine, just less revealing.' },
          { text: 'They find more', why: 'Open questions get people talking.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Ada\'s planned questions will shut the talk down?',
        lines: [
          'What made you decide on the rise?',
          'What matters most to you in a tenant?',
          'Don\'t you think ₦1,500,000 is unfair?',
          'What would a great outcome look like?',
        ],
        bug: 2,
        fix: 'What worries you about renting the flat?',
        explanation: 'A loaded question makes him defend his number.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does Lucía give Ada?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which question finds which kind of answer?',
        groups: ['Reasons', 'Worries', 'Trades'],
        items: [
          { text: '"What made you decide on this?"', group: 0 },
          { text: '"What worries you?"', group: 1 },
          { text: '"If I signed for two years, would that help?"', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write three open questions you could ask the other side in your negotiation.',
    starters: ['1. What...', '2. How...'],
  },
  deepen: {
    title: 'Questions as a skill',
    summary: 'Research by Alison Wood Brooks and colleagues found that people who ask more follow-up questions are better liked, and good negotiators spend more of their time asking than telling.',
  },
  notes: 'Fictional landlord answers. Follow-up questions and liking: Huang, Yeomans, Brooks, Minson & Gino (2017), JPSP 113(3). Skilled negotiators ask more questions: Rackham, "The behavior of successful negotiators" (Huthwaite research).',
};

export default lesson;
