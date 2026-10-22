import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: ward rules v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ward rules v3',
  summary: 'Grace adds the "check the chart" rules: on the ward, you never acted on a guess about a patient. At work, you shouldn\'t act on a guess about a colleague. Tap each new rule.',
  minutes: 11,
  outcomes: [
    'Add misunderstanding rules to your own list',
    'Link each rule to a lesson from this chapter',
    'Use the rules on messages and comments',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s ward rules v3',
      text: 'Rules 1 to 10, plus: Rule 11: Check the chart before you act: what did they actually say? Rule 12: Writing has no voice. Add mine; don\'t invent theirs. Rule 13: Only the bottom rung is a fact. Rule 14: I judge myself by intent and others by impact. Do both ways. Rule 15: If it reads as off, ask lightly.',
      hotspots: [
        { phrase: 'Check the chart before you act', note: 'Lesson 6: pause and separate the words from the story.' },
        { phrase: 'Writing has no voice', note: 'Lesson 2: writers expect about 78% accuracy; readers get about 56%.' },
        { phrase: 'Only the bottom rung is a fact', note: 'Lesson 3: the ladder of inference.' },
        { phrase: 'Do both ways', note: 'Lesson 4: own my impact, ask about their intent.' },
        { phrase: 'If it reads as off, ask lightly', note: 'Lesson 8: the habit Grace and Femi agreed.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v3 adds: check the chart, writing has no voice, the ladder, intent and impact, and ask lightly.',
    },
  ],
  apply: {
    scenario: 'Ward rules v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the lesson.',
        pairs: [
          ['Writing has no voice', 'Tone in writing'],
          ['Only the bottom rung', 'The ladder of inference'],
          ['Both ways', 'Intent vs impact'],
          ['Ask lightly', 'Clearing it up'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rules are on v3 in total?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "check the chart before you act" mean at work?',
        options: [
          { text: 'Look at what was actually said before reacting to your story' },
          { text: 'Read the org chart', why: 'It\'s a nursing metaphor for checking facts.' },
          { text: 'Ask HR', why: 'Check the words first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'From v1 and v2, or new on v3?',
        groups: ['Earlier', 'New on v3'],
        items: [
          { text: 'Lower and slower', group: 0 },
          { text: 'Writing has no voice', group: 1 },
          { text: 'Silence is not peace', group: 0 },
          { text: 'Only the bottom rung is a fact', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Could I share Rule 12 with the whole team?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'No, it\'s embarrassing.', why: 'It helps everyone.' },
          { text: 'Please do. "Writing has no voice" might save us a few cold wars.' },
          { text: 'Only if you credit me in the all-hands.', why: 'Just share it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule 12.',
        template: 'Writing has no [[1]]. Add mine; don\'t [[2]] theirs.',
        blanks: [['voice', 'tone'], ['invent', 'imagine']],
        distractors: ['words', 'copy'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "Do both ways" in Rule 14 ask Grace to do?',
        options: [
          { text: 'Judge everyone harshly', why: 'It asks for fairness in both directions.' },
          { text: 'Ignore impact', why: 'It asks her to own it.' },
          { text: 'Own her impact on others, and ask about their intent' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of v3 is wrong?',
        lines: [
          'Check the chart before you act.',
          'Writing has no voice.',
          'If it reads as off, assume the worst.',
          'Only the bottom rung is a fact.',
        ],
        bug: 2,
        fix: 'If it reads as off, ask lightly.',
        explanation: 'Assuming the worst is climbing the ladder.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the email study, about what percentage of readers got the tone right?',
        answers: ['56', '56%'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new rules as written.',
        lines: ['Check the chart', 'Writing has no voice', 'Only the bottom rung is a fact', 'Intent and impact, both ways', 'Ask lightly'],
      },
    ],
  },
  reflect: {
    prompt: 'Add two misunderstanding rules to your list. Which would have saved you from a recent cold war?',
    starters: ['Rule:...', 'It would have saved me from...'],
  },
  notes: 'Ward rules v3 (fictional) adds Chapter 3 rules.',
};

export default lesson;
