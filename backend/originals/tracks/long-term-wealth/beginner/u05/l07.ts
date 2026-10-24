import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Chat with Tey: talking about money with family. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The hardest conversation',
  summary: 'Before the weekend in Buea, Miracle was dreading the conversation more than the numbers. How do you talk to a parent about money without hurting them? Tey talks her through it.',
  minutes: 12,
  outcomes: [
    'Open a money conversation with respect',
    'Listen before fixing',
    'Agree a plan together',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Money conversations with parents are hard because they touch pride, fear and love all at once. Want a simple shape for it?', replies: ['Yes, please.'] },
        { tey: 'Start with respect, not numbers. Something like: "Dad, you\'ve looked after me my whole life. I\'d love us to plan the next part together."', replies: ['Then what?'] },
        { tey: 'Ask, then listen. "What worries you most about retiring?" Let him talk, even if it takes a while. People share the real problem only when they feel heard.', replies: ['When do I bring up the plan?'] },
        { tey: 'After listening. Then work on it together: write the real numbers on paper, side by side. A plan he helped build is one he\'ll actually follow.', replies: ['What if he gets defensive?'] },
        { tey: 'Slow down. Say what you see: "This is hard to talk about. We can stop and pick it up tomorrow." No blame about the past. The question is only: what do we do next?', replies: ['And at the end?'] },
        { tey: 'Agree one or two clear things, like the fixed monthly support and a buffer, and a date to check in. Then thank him. He just did something brave.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Respect first, then ask and listen, then plan together on paper. No blame about the past. End with one or two clear agreements and a check-in date.',
    },
  ],
  apply: {
    scenario: 'Talking to Dad.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the conversation.',
        lines: ['Start with respect', 'Ask what worries him', 'Listen', 'Plan together on paper', 'Agree a check-in date'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with respect, not numbers?',
        options: [
          { text: 'Numbers don\'t matter', why: 'They matter, after trust.' },
          { text: 'To save time', why: 'It\'s about trust, not time.' },
          { text: 'Money talks touch pride and fear; respect makes it safe to be honest' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Dad says: "I should have saved. I was foolish."',
        prompt: 'What\'s the best response?',
        options: [
          { text: 'Yes, you should have.', why: 'Blame shuts the conversation down.' },
          { text: 'You weren\'t foolish, you were looking after all of us. Let\'s just work out what happens next.' },
          { text: 'Let\'s not talk about it.', why: 'Avoiding it leaves him alone with the fear.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the conversation, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: '"What worries you most?"', group: 0 },
          { text: '"Why didn\'t you save?"', group: 1 },
          { text: 'Writing numbers side by side', group: 0 },
          { text: 'Deciding everything before arriving', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The key question.',
        template: 'No blame about the [[1]]. The question is only: what do we do [[2]]?',
        blanks: [['past'], ['next']],
        distractors: ['future', 'wrong'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to what to say.',
        pairs: [
          ['Opening', '"I\'d love us to plan this together"'],
          ['He gets defensive', '"We can pick it up tomorrow"'],
          ['The end', '"Thank you for talking about this"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Emmanuel\'s plan for talking to his mum will backfire?',
        lines: [
          'Ask what she\'s worried about.',
          'Listen without interrupting.',
          'Show her a finished spreadsheet and tell her what to do.',
        ],
        bug: 2,
        fix: 'Build the plan with her.',
        explanation: 'People follow plans they helped make.',
      },
      {
        kind: 'mcq',
        prompt: 'Why plan "on paper, side by side"?',
        options: [
          { text: 'It makes the numbers a shared problem, not a judgement' },
          { text: 'Paper is cheaper', why: 'It\'s about working together.' },
          { text: 'It hides the numbers', why: 'It shows them, together.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many clear agreements does Tey suggest ending with? (Say "one or two" or a number.)',
        answers: ['one or two', '1 or 2', '2', 'two', '1-2'],
        placeholder: 'Your answer',
      },
      {
        kind: 'mcq',
        prompt: 'What does Tey call Dad\'s part in the conversation?',
        options: [
          { text: 'Foolish', why: 'Tey calls it brave.' },
          { text: 'Brave' },
          { text: 'Unnecessary', why: 'It was necessary and brave.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'How would you open a money conversation with someone in your family? Write your first sentence.',
    starters: ['I\'d say: "..."'],
  },
  deepen: {
    title: 'Talk early',
    summary: 'Many families only talk about money in a crisis. Talking earlier, while parents are still working, gives everyone more choices: more years to save, more time to plan, and less fear.',
  },
  notes: 'General communication principles. Emmanuel\'s mum: narrated.',
};

export default lesson;
