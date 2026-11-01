import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Chat with Tey: the meeting before the meeting (pre-wiring). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The meeting before the meeting',
  summary: 'Next week is the big workshop: all five, plus Brian, picking the fixes. Mrs Achieng stops Remi in the corridor. "If anyone hears something important for the first time in that room, you\'ve already lost." Remi asks Tey what she meant.',
  minutes: 11,
  outcomes: [
    'Know why big meetings shouldn\'t hold surprises',
    'Run short one-to-one chats before a group decision',
    'Use them to listen and adjust, not to lobby',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What do you think Mrs Achieng meant?',
          replies: ['Don\'t surprise people in meetings?', 'Have the meeting before the meeting?'],
        },
        {
          tey: "Both. In a group, people react to surprises defensively: nobody wants to agree to something in front of their colleagues that they haven't had time to think about. So before a big decision, have a short chat with each key person. Some call it pre-wiring. In Japan there's an old word for it: nemawashi, preparing the roots before you move a tree.",
          replies: ['Isn\'t that a bit sneaky?'],
        },
        {
          tey: "Not if it's honest. Sneaky is promising each person something different. Honest is saying the same thing to everyone: \"Here's what I'm going to propose. What do you think? What would worry you?\" Then you listen, and change the proposal if they're right.",
          replies: ['What do I do with what I hear?'],
        },
        {
          tey: "Fix what you can before the meeting. If Felix says the new screen can't be ready in Week 4, move it to Week 5 in the proposal. If Pauline and Wanjiku disagree, now you know before the room does, and you can plan time for it.",
          replies: ['So the workshop is just a formality?'],
        },
        {
          tey: "No. The meeting is where people commit together, in front of each other. Pre-wiring means they arrive ready to decide, not shocked. And when you say \"Felix suggested Week 5\", he hears his idea in the plan. That's the next lesson.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'No surprises in the big room. Before a group decision, talk to each key person. Say the same thing to everyone. Listen, adjust, then decide together.',
    },
  ],
  apply: {
    scenario: 'Tey and Remi, before the workshop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why avoid surprises in a group decision?',
        options: [
          { text: 'Surprises are fun', why: 'Not at work, in front of colleagues.' },
          { text: 'Meetings are too short', why: 'It\'s about how people react, not time.' },
          { text: 'People react defensively when they haven\'t had time to think' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest pre-wiring, or sneaky?',
        groups: ['Honest', 'Sneaky'],
        items: [
          { text: 'Same proposal to everyone', group: 0 },
          { text: 'Promising each person something different', group: 1 },
          { text: '"What would worry you?"', group: 0 },
          { text: '"Don\'t tell the others I said this."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Honestly? The new screen won\'t be ready by Week 4.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'It has to be. I\'ve already put Week 4.', why: 'Then Felix gets surprised in the room instead.' },
          { text: 'Thank you for telling me now. Is Week 5 realistic? I\'ll change it before the workshop.' },
          { text: 'Let\'s not mention it in the workshop.', why: 'Hiding it makes it worse later.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The Japanese word for preparing the roots before moving a tree: ___. (one word)',
        answers: ['nemawashi', 'Nemawashi'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the point of the workshop, if everyone\'s been pre-wired?',
        options: [
          { text: 'People commit together, in front of each other' },
          { text: 'Nothing; cancel it', why: 'Public commitment matters.' },
          { text: 'To surprise Brian', why: 'Brian gets pre-wired too.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Remi hears to what he does.',
        pairs: [
          ['Felix: "Week 4 is too soon."', 'Move it to Week 5'],
          ['Pauline and Wanjiku disagree', 'Plan time for it'],
          ['Njeri: "Tell the warehouse."', 'Add it to the plan'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s pre-wiring plan. Which line is the sneaky one?',
        lines: [
          'Show each person the same one-page proposal.',
          'Tell Pauline the emails come first, and tell Wanjiku audit comes first.',
          'Ask each one: what would worry you?',
        ],
        bug: 1,
        fix: 'Tell both that the order is still open, and ask what they think.',
        explanation: 'Different promises to different people blow up the moment they\'re in one room.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put pre-wiring in order.',
        lines: ['Draft the proposal', 'Chat with each key person', 'Adjust what you can', 'Decide together in the meeting'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'No [[1]] in the big room. Say the [[2]] thing to everyone.',
        blanks: [['surprises'], ['same']],
        distractors: ['questions', 'secret'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s pre-wiring question.',
        tiles: ['What', 'would', 'worry', 'you?'],
        distractors: ['shut'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a meeting where someone got surprised in front of others. How did they react? Who could have talked to them first?',
    starters: ['They were surprised by...', 'If someone had talked to them first...'],
  },
  deepen: {
    title: 'Pre-wire one decision',
    summary: 'Before your next group decision, have a two-minute chat with the one person most likely to be surprised. Same proposal you\'ll share with everyone. Ask what would worry them.',
  },
  notes: 'Pre-wiring / socialising proposals before group decisions is standard influence and change practice (e.g. Kotter; Cohen & Bradford). Nemawashi: Japanese practice of informal consensus-building before formal decisions (associated with the Toyota Production System). Group reactions to surprise: hedged.',
};

export default lesson;
