import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: the expectations conversation (after the fix). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The expectations conversation',
  summary: 'The bug is fixed. But Arjun knows one conversation is still needed: Joel sat on a launch-blocking problem for four hours. Arjun doesn\'t want to scold him. He doesn\'t want to pretend it didn\'t matter either. He asks Tey how.',
  minutes: 11,
  outcomes: [
    'Have a calm conversation about a missed expectation',
    'Restate the expectation, the gap and the impact',
    'Agree what happens next time, together',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'When will you talk to him?',
          replies: ['Tonight, while it\'s fresh.', 'After launch.'],
        },
        {
          tey: "Tonight, but short: ten calm minutes on a call, once it's fixed. Not a lecture. Launch is tomorrow, and he needs the new agreement before then, plus sleep and confidence. Soon enough to matter, calm enough to learn.",
          replies: ['What do I actually say?'],
        },
        {
          tey: "Four parts. The expectation: \"Our agreement says: stuck for more than an hour, say so.\" The gap: \"On Friday you were stuck for four hours.\" The impact: \"It nearly blocked launch, and I found out at 9 p.m.\" Then ask: \"What made it hard to say?\"",
          replies: ['And if he says he was embarrassed?'],
        },
        {
          tey: "Believe him. And own your part: \"I think I made launch eve feel like a test. That's on me.\" Then agree something specific together: \"If it's launch-blocking, you message me within 15 minutes, even if it's just 'stuck, looking'.\"",
          replies: ['Should I mention how good his other work is?'],
        },
        {
          tey: "Yes, but separately, and sincerely. Not as a sandwich. Joel did brilliant work all month. Tell him that on its own, because it's true. Then this one gap won't define the whole project in his head.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Soon and private. The expectation, the gap, the impact, then ask. Own your part. Agree a specific next time. Praise separately, sincerely.',
    },
  ],
  apply: {
    scenario: 'Tey and Arjun, after the fix.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When should Arjun talk to Joel about it?',
        options: [
          { text: 'On tomorrow\'s launch call, with everyone', why: 'Public, and on the most stressful morning.' },
          { text: 'Never; it\'s fixed', why: 'The fix doesn\'t stop it happening again.' },
          { text: 'Tonight, briefly and privately, once it\'s fixed' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to the line.',
        pairs: [
          ['The expectation', '"Stuck over an hour: say so."'],
          ['The gap', '"You were stuck for four hours."'],
          ['The impact', '"It nearly blocked launch."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good expectations conversation, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: '"What made it hard to say?"', group: 0 },
          { text: '"You always hide things."', group: 1 },
          { text: '"I made launch eve feel like a test."', group: 0 },
          { text: 'Doing it in the team chat', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Honestly? I didn\'t want to be the one who broke launch.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Well, you nearly did.', why: 'True, and it confirms his fear.' },
          { text: 'That makes sense, and I think I made it feel that way. Next time it\'s launch-blocking, message me within 15 minutes, even "stuck, looking". Deal?' },
          { text: 'Don\'t worry about it.', why: 'Skips the agreement for next time.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the expectation, the gap and the impact, you ___. (one word)',
        answers: ['ask', 'Ask', 'listen'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why praise Joel\'s other work separately, not in the same breath?',
        options: [
          { text: 'So it\'s sincere, and not a sandwich that hides the point' },
          { text: 'To make him feel worse', why: 'It\'s to put the gap in proportion.' },
          { text: 'It doesn\'t matter', why: 'Sandwiches blur both messages.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for the call. Which line breaks the conversation?',
        lines: [
          'Restate the "stuck over an hour" agreement.',
          'Tell him the whole team noticed he went quiet.',
          'Ask what made it hard to say.',
        ],
        bug: 1,
        fix: 'Say what it meant for me: I found out at 9 p.m.',
        explanation: '"The whole team noticed" turns a private talk into a public judgement.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the expectations conversation in order.',
        lines: ['The expectation', 'The gap', 'The impact', 'Ask, and listen', 'Agree next time together'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Soon and [[1]]. Own your [[2]]. Agree a specific next [[3]].',
        blanks: [['private'], ['part'], ['time', 'step']],
        distractors: ['public', 'excuse'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the new agreement.',
        tiles: ['Stuck?', 'Message', 'me', 'in', '15', 'minutes.'],
        distractors: ['tomorrow.'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a missed expectation you\'ve never talked about with the person? Write the four parts: expectation, gap, impact, question.',
    starters: ['Expectation: ...', 'Gap: ...', 'Question: ...'],
  },
  deepen: {
    title: 'Four parts, once',
    summary: 'If there\'s a gap you\'ve been avoiding, have the four-part conversation this week, privately. End with one specific agreement.',
  },
  notes: 'Conversation structure draws on SBI feedback (Center for Creative Leadership), Crucial Conversations ("start with heart", mutual purpose) and psychological safety (Edmondson). Fictional events.',
};

export default lesson;
