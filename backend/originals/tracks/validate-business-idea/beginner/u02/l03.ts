import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Step-by-step: the Mom Test rules. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The Mom Test',
  summary: 'Miracle sends Clinton a book title: "The Mom Test". The idea: ask questions so good that even your mum can\'t lie to you to be nice. Three rules, five steps.',
  minutes: 12,
  outcomes: [
    'Know the three Mom Test rules',
    'Run a customer conversation in five steps',
    'Recognise when a conversation went wrong',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A conversation in five steps',
      steps: [
        { title: 'The three rules', body: '1. Talk about their life, not your idea. 2. Ask about specifics in the past, not opinions about the future. 3. Talk less and listen more.' },
        { title: '1. Open with their world', body: '"What\'s the hardest part of living in the hostel during rainy season?" Then stop talking.' },
        { title: '2. Find a real moment', body: 'When something comes up, anchor it: "When did that last happen? Walk me through it."' },
        { title: '3. Dig for cost', body: '"How long did that take? Have you ever paid for help? How much? What else have you tried?" Time, money and workarounds show how much it hurts.' },
        { title: '4. Ask what matters', body: '"How big a deal is this compared to everything else in your week?" Some problems are real but small.' },
        { title: '5. Close and ask for more', body: '"Who else should I talk to about this?" Good conversations lead to more good conversations. Then write notes straight away (lesson 8).' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If you talked more than they did, the conversation went wrong.',
    },
  ],
  apply: {
    scenario: 'Running the conversation.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps of a conversation.',
        lines: ['Open with their world', 'Find a real moment', 'Dig for cost', 'Ask what matters', 'Close and ask who else to talk to'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is it called "The Mom Test"?',
        options: [
          { text: 'You should only interview your mum', why: 'It\'s a test your questions should pass.' },
          { text: 'Good questions get honest answers even from someone who loves you and wants to be nice' },
          { text: 'Mums are the target customers', why: 'It\'s about honesty, not a customer group.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to a question that follows it.',
        pairs: [
          ['Their life, not your idea', '"What\'s hardest about hostel life?"'],
          ['Specifics in the past', '"When did that last happen?"'],
          ['Dig for cost', '"How much did you pay?"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this question from?',
        groups: ['Find a moment', 'Dig for cost', 'Close'],
        items: [
          { text: '"Walk me through last Saturday."', group: 0 },
          { text: '"How long did the washing take?"', group: 1 },
          { text: '"Who else should I talk to?"', group: 2 },
          { text: '"Have you ever paid someone to do it?"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I talked for 15 minutes about my plans and she said it sounds great. Good conversation?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, she liked it.', why: 'That\'s a compliment, not evidence.' },
          { text: 'Talk even longer next time.', why: 'Listening is where the learning is.' },
          { text: 'You talked, she was polite. You learned almost nothing about her week. Next time, ask and listen.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The third rule.',
        template: 'Talk [[1]] and listen [[2]].',
        blanks: [['less'], ['more']],
        distractors: ['louder', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'A student talks for 12 minutes and Clinton for 3. What share of the conversation was the student talking?',
        options: [
          { text: '75%', why: '12 out of 15 minutes is 80%.' },
          { text: '80%' },
          { text: '12%', why: 'It\'s 12 of 15 minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Clinton\'s conversation broke a rule?',
        lines: [
          'Asked what\'s hardest about hostel life.',
          'Asked her to walk him through last Saturday.',
          'Explained his app for ten minutes.',
          'Asked who else he should talk to.',
        ],
        bug: 2,
        fix: 'Keep asking about her week; save the idea for later.',
        explanation: 'Rule 1: their life, not your idea. Rule 3: listen more.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Last step of every conversation: ask who else you should ... to?',
        answers: ['talk', 'speak'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Did the conversation go well or badly?',
        groups: ['Went well', 'Went badly'],
        items: [
          { text: 'They described last Saturday in detail', group: 0 },
          { text: 'They said "great idea!" and nothing else', group: 1 },
          { text: 'They told you what they paid and why', group: 0 },
          { text: 'You did most of the talking', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Plan your first conversation using the five steps. What\'s your opening question?',
    starters: ['I\'ll open with...', 'Then I\'ll ask...'],
  },
  deepen: {
    title: 'The book',
    summary: '"The Mom Test" by Rob Fitzpatrick is short and practical. Its core: compliments are worthless, facts about the past are gold, and asking for commitments shows how real the interest is.',
  },
  notes: 'Mom Test rules: Rob Fitzpatrick, The Mom Test (2013): (1) talk about their life instead of your idea, (2) ask about specifics in the past instead of generics or opinions about the future, (3) talk less and listen more. The five-step structure is this course\'s teaching device.',
};

export default lesson;
