import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Before/After: intent vs impact. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Intent vs impact',
  summary: 'Grace meant her update as helpful. Femi read "Can we look again?" as "your fix failed, again". Both were right about their own side. That\'s the gap between intent and impact.',
  minutes: 12,
  outcomes: [
    'Separate what you meant from how it landed',
    'Talk about impact without accusing',
    'Own your impact without giving up your intent',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Arguing intent vs separating intent and impact',
      before: {
        label: 'Arguing intent',
        text: 'Femi: "Your message made it sound like I failed."\nGrace: "That\'s not what I meant! I was just giving an update!"\nFemi: "Well, that\'s how it came across."\nThey argue about who\'s right. Both are, about different things.',
      },
      after: {
        label: 'Separating them',
        text: 'Grace: "I meant it as a quick update, but I can see "again" might have landed as "you failed again". I\'m sorry it came across that way."\nFemi: "Thanks. And my "Fine." wasn\'t meant to be cold. I was at the hospital."\nGrace: "Oh no. I read it as anger. I\'m glad I asked."',
      },
      notes: [
        'In Difficult Conversations, Stone, Patton and Heen point out that we judge ourselves by our intentions and others by their impact.',
        'You can own the impact ("I see how it landed") without giving up your intent ("I meant it as an update").',
        'Ask about their intent before assuming it.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'We judge ourselves by intent and others by impact. Own your impact; ask about their intent.',
    },
  ],
  apply: {
    scenario: 'Intent and impact.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Intent or impact?',
        groups: ['Intent', 'Impact'],
        items: [
          { text: 'Grace meant it as an update', group: 0 },
          { text: 'Femi felt he\'d failed again', group: 1 },
          { text: 'Femi meant "OK, will do"', group: 0 },
          { text: 'Grace felt he was furious', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do Stone, Patton and Heen say about intent and impact?',
        options: [
          { text: 'We judge ourselves by intent and others by impact' },
          { text: 'Intent is all that matters', why: 'Impact matters too.' },
          { text: 'Impact is all that matters', why: 'Both matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it does.',
        pairs: [
          ['"I meant it as a quick update"', 'States her intent'],
          ['"I can see how it landed"', 'Owns the impact'],
          ['"I\'m sorry it came across that way"', 'Repairs'],
          ['"I read it as anger"', 'Shares her impact'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Your message made me feel like I\'d failed.',
        prompt: "Grace's best reply?",
        options: [
          { text: '"I didn\'t mean that, and I can see how "again" landed. I\'m sorry. Your fix helped 4 of 6; we\'re nearly there."' },
          { text: '"That\'s not what I meant!"', why: 'True, but it ignores the impact.' },
          { text: '"Well, the fix did fail."', why: 'It didn\'t fully fail, and it hurts.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Own your [[1]]; ask about their [[2]].',
        blanks: [['impact'], ['intent', 'intention']],
        distractors: ['salary', 'mistake'],
      },
      {
        kind: 'mcq',
        prompt: 'Does owning your impact mean admitting you meant harm?',
        options: [
          { text: 'No. You can say how it landed and still say what you meant' },
          { text: 'Yes', why: 'Intent and impact are separate.' },
          { text: 'It means you were wrong to speak', why: 'Not at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the fix, how many of 6 users succeeded?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s reply argues intent instead of owning impact?',
        lines: [
          'Thanks for telling me.',
          'I meant it as a quick update.',
          'So you shouldn\'t have felt that way.',
          'I can see how "again" landed.',
        ],
        bug: 2,
        fix: 'I\'m sorry it came across that way.',
        explanation: 'You can\'t argue someone out of how they felt.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a repair after a message lands badly.',
        lines: ['Thank them for telling you', 'Say what you meant', 'Acknowledge how it landed', 'Say sorry for the impact', 'Agree what helps next time'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Asking about intent, or assuming it?',
        groups: ['Asking', 'Assuming'],
        items: [
          { text: '"What did you mean by that?"', group: 0 },
          { text: '"You obviously meant it as a dig."', group: 1 },
          { text: '"Was that a bad time?"', group: 0 },
          { text: '"You\'re clearly annoyed."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone was hurt by something you meant well. How could you have owned the impact?',
    starters: ['I meant...', 'It landed as...'],
  },
  deepen: {
    title: 'The intention invention',
    summary: 'Difficult Conversations warns that we often invent other people\'s intentions from the impact on us: "I felt hurt, so you meant to hurt me." Asking breaks that invention.',
  },
  notes: 'Stone, Patton & Heen, Difficult Conversations (1999): intent vs impact; "we assume they intended the impact we felt". Fictional: fix helped 4 of 6 users.',
};

export default lesson;
