import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: five yeses, five different plans. The missing shared goal. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Five yeses, five plans',
  summary: 'Week 3, Wednesday. For the first time, all five are in one room. Remi asks, "So, what are we fixing?" Felix says the system. Pauline says the emails. Njeri says the form. Everyone said yes to Remi, and everyone said yes to something different.',
  minutes: 11,
  outcomes: [
    'See why one-to-one yeses don\'t add up to one plan',
    'Notice the cost of a goal that lives only in your head',
    'Know this chapter\'s goal: turn your idea into one everyone owns',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 3, Wednesday, 10:00 a.m.',
      beats: [
        { speaker: 'remi', text: 'Thank you all for coming. So, in one sentence, what are we fixing?' },
        { speaker: 'felix', text: 'The refund system. A new screen.' },
        { speaker: 'pauline', text: 'The refund emails. Customers don\'t know what\'s happening.' },
        { speaker: 'njeri', text: 'The signature form. Obviously.' },
        { speaker: 'emeka', text: '(unmuting) The reference numbers? Sorry, was I supposed to say that?' },
        { speaker: 'narrator', text: 'Wanjiku says nothing and writes "sample check" on her pad. Five people, five fixes, and every one of them thinks they agreed with Remi. They did. Separately.' },
      ],
      choice: {
        prompt: 'What should Remi do?',
        options: [
          {
            text: 'Go to the whiteboard: "You\'re all right. Let\'s write one goal that covers all five, together."',
            outcome: 'Twenty minutes and three crossed-out drafts later, the board says: "Every business refund paid within 5 days, with no new audit errors." Njeri adds "and the warehouse gets told when it\'s done." Everyone laughs. Everyone agrees.',
            best: true,
          },
          {
            text: '"Let me just tell you the plan I\'ve put together."',
            outcome: 'Remi\'s plan, with five people quietly checking whether their part made the cut. Two of them didn\'t, and you can see it on their faces.',
          },
          {
            text: '"Great, let\'s each do our own fix."',
            outcome: 'Five separate projects. Six weeks later, nobody can say if refunds are faster, because nobody agreed what "faster" meant.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Remi had a goal. It just lived in his head. Each person filled in the gaps with their own piece. One-to-one yeses are a great start, but they don't add up to <strong>one</strong> plan until people agree it together. <strong>This chapter:</strong> building a shared goal, meeting people before the meeting, why people value what they help build, running a meeting you don't own, giving credit, and turning \"yes\" into real commitments.</p>",
    },
  ],
  apply: {
    scenario: 'The first full meeting, Week 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did five people describe five different fixes?',
        options: [
          { text: 'They weren\'t listening', why: 'They were. To different conversations.' },
          { text: 'Each agreed with Remi separately, and filled the gaps with their own part' },
          { text: 'They disagree with each other', why: 'They don\'t, yet. They just never compared notes.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds one plan, or keeps five?',
        groups: ['One plan', 'Five plans'],
        items: [
          { text: 'Writing one goal together', group: 0 },
          { text: '"Let\'s each do our own fix."', group: 1 },
          { text: '"You\'re all right. Let\'s combine them."', group: 0 },
          { text: 'Separate updates to each person', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'So which is it: the system, the emails or the form?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'The system. Sorry, everyone else.', why: 'Picks a winner before agreeing the goal.' },
          { text: 'Whatever you all prefer.', why: 'Too vague. Lead the room to a shared goal.' },
          { text: 'All of them, probably. Let\'s write the goal first, then see which fixes get us there.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A goal that lives only in your ___ isn\'t shared. (one word)',
        answers: ['head', 'Head', 'mind'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building the shared goal in order.',
        lines: ['Hear everyone\'s fix', 'Say they\'re all part of it', 'Write one goal together', 'Check each fix against the goal'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the whiteboard goal do that Remi\'s private goal didn\'t?',
        options: [
          { text: 'Everyone can see it, say it, and check their work against it' },
          { text: 'It\'s longer', why: 'It\'s one sentence.' },
          { text: 'It came from Kamau', why: 'It came from the room.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s notes after the meeting. Which line forgets the lesson?',
        lines: [
          'Goal: every business refund paid within 5 days, no new audit errors.',
          'I\'ll tweak the wording tonight to match my original plan.',
          'Next: each person maps their fix to the goal.',
        ],
        bug: 1,
        fix: 'Send the exact goal from the board to everyone today.',
        explanation: 'Quietly changing an agreed goal turns "ours" back into "mine".',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 2 review.',
        pairs: [
          ['Currencies', 'What people value'],
          ['Interests', 'Why they want it'],
          ['Small test', 'Easy to say yes to'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Turn [[1]] idea into one [[2]] owns.',
        blanks: [['your', 'my'], ['everyone', 'everybody']],
        distractors: ['nobody', 'Kamau'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Remi says at the whiteboard.',
        tiles: ['You\'re', 'all', 'right.', 'Let\'s', 'write', 'one', 'goal.'],
        distractors: ['wrong.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a group you\'re part of. If you asked everyone "what are we trying to do?", would you get one answer or several?',
    starters: ['I think we\'d get...', 'One shared goal could be...'],
  },
  deepen: {
    title: 'The one-sentence test',
    summary: 'Ask three people in a group you belong to: "In one sentence, what are we trying to do?" Compare the answers. The gaps are your work.',
  },
  notes: 'Story setup. Shared goals and team alignment: Kouzes & Posner ("inspire a shared vision"); Project Aristotle (structure and clarity). Fictional events.',
};

export default lesson;
