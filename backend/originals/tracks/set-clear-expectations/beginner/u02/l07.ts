import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: handoffs between people (interface agreements). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Mind the handoff',
  summary: 'Day 10. Kavya\'s product page sends the size as "M". Joel\'s cart expects "Medium". Every order shows "size: undefined". Both did their own piece perfectly. The bug lives exactly between them. Arjun asks Tey why this keeps happening.',
  minutes: 11,
  outcomes: [
    'Know why handoffs are where expectations break',
    'Agree what passes between two people\'s work',
    'Test the handoff early, not at the end',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Whose bug is it?',
          replies: ['Kavya\'s, she sends "M".', 'Joel\'s, he expects "Medium".', 'Nobody\'s?'],
        },
        {
          tey: "It's the handoff's. Each piece met its own expectations. Nobody set expectations for what passes BETWEEN them. In software that's called an interface. Every team has them: a designer handing to a developer, a cook handing to a waiter.",
          replies: ['So how do I set expectations for a handoff?'],
        },
        {
          tey: "Get both people together for ten minutes and agree three things: what gets passed, in what form, and how you'll know it arrived right. \"The product page sends the size as S, M, L or XL. The cart shows it in full. If it's missing, the cart shows an error, not 'undefined'.\"",
          replies: ['Who owns the handoff?'],
        },
        {
          tey: "Good question. Pick one. Usually the person receiving it: they know what they need. Write it on the ownership list: \"Size handoff: Joel owns the format, Kavya follows it.\"",
          replies: ['And how do we stop it happening again?'],
        },
        {
          tey: "Test the handoff early. Before either piece is finished, send one fake order through both. A broken handoff on Day 10 is a ten-minute fix. On launch night, it's a crisis.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Bugs live between people. Agree what passes, in what form, and how you\'ll know it arrived right. Give the handoff an owner. Test it early.',
    },
  ],
  apply: {
    scenario: 'The "undefined" bug.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Whose bug was "size: undefined"?',
        options: [
          { text: 'Kavya\'s alone', why: '"M" is a reasonable choice.' },
          { text: 'The handoff\'s: nobody agreed what passes between them' },
          { text: 'Joel\'s alone', why: '"Medium" is a reasonable choice too.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a handoff agreement, or not?',
        groups: ['Handoff agreement', 'Not part of it'],
        items: [
          { text: 'Size sent as S, M, L or XL', group: 0 },
          { text: 'Kavya\'s favourite colour', group: 1 },
          { text: 'If missing, show an error', group: 0 },
          { text: 'Joel\'s working hours', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'ll just change mine to "Medium". Fixed.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Thanks! Let\'s also write the format down, so the next field doesn\'t break the same way. Joel owns it.' },
          { text: 'Great, done.', why: 'Fixes one field. The next handoff breaks the same way.' },
          { text: 'No, Joel should change his.', why: 'Who changes matters less than writing it down.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In software, what passes between two pieces is an ___. (one word)',
        answers: ['interface', 'Interface', 'API', 'contract'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the handoff question to the answer.',
        pairs: [
          ['What gets passed?', 'The size'],
          ['In what form?', 'S, M, L or XL'],
          ['How do we know it arrived?', 'Missing shows an error'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who should usually own a handoff\'s format?',
        options: [
          { text: 'Both, equally', why: 'Two owners again.' },
          { text: 'The person receiving it, who knows what they need' },
          { text: 'Nobody; it\'s obvious', why: 'That\'s how "undefined" happened.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan. Which line leaves the risk in place?',
        lines: [
          'Kavya and Joel agree the size format, in writing.',
          'We\'ll test the whole order flow on launch day.',
          'Joel owns the format; Kavya follows it.',
        ],
        bug: 1,
        fix: 'We send one fake order through both pieces today.',
        explanation: 'A handoff tested on launch day becomes a launch-night crisis.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put setting a handoff in order.',
        lines: ['Get both people together', 'Agree what passes and its form', 'Name one owner', 'Test it early'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Bugs live [[1]] people. Test the handoff [[2]].',
        blanks: [['between'], ['early', 'now']],
        distractors: ['inside', 'later'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the test idea.',
        tiles: ['Send', 'one', 'fake', 'order', 'through.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Where in your work or studies does something pass from one person to another? Has anything ever got lost there? What would a handoff agreement say?',
    starters: ['Work passes from... to...', 'The agreement would say...'],
  },
  deepen: {
    title: 'Find one handoff',
    summary: 'Pick one handoff you\'re part of. Ask the other person: "What do you need from me, in what form, and how will you know it\'s right?"',
  },
  notes: 'Interfaces/handoffs as failure points: common in software engineering (integration bugs, contract testing) and operations (handoff errors, e.g. patient handover research). Early integration testing: standard practice. Fictional details.',
};

export default lesson;
