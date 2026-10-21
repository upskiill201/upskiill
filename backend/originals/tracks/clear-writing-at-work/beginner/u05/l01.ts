import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: week 9. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Week 9',
  summary: 'Same afternoon as the board approval: late deliveries in Nairobi jumped to 28% and two Saturday drivers quit. Zanele wants to wait a week. Mrs Achieng says write it today.',
  minutes: 11,
  outcomes: [
    'See why bad news should travel early',
    'Know what a hard message needs',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday afternoon',
      beats: [
        { speaker: 'zanele', text: 'The board approved the rollout two hours ago. If I tell Mr Kamau about week 9 now, it looks like I hid it.' },
        { speaker: 'achieng', text: 'If he hears it from Felix on Friday, it looks like you hid it. Today, it looks like you\'re on top of it.' },
        { speaker: 'felix', text: 'Two drivers left for a courier firm. Saturday was short-staffed, so 28% late.' },
        { speaker: 'achieng', text: 'Then that\'s your email: what happened, why, what you\'re doing, and when he\'ll hear next.' },
        { speaker: 'tey', text: 'This chapter: bad news, saying no, feedback, editing with AI, and the final check before you send.' },
      ],
      choice: {
        prompt: 'When should Zanele tell Mr Kamau?',
        options: [
          { text: 'Today, with the cause and a plan', outcome: 'Yes. Early news with a plan keeps trust. Late news costs it.', best: true },
          { text: 'Next week, once the numbers recover', outcome: 'If they don\'t recover, she\'s hidden it for a week.' },
          { text: 'Never: it was one bad week', outcome: 'He just approved a rollout based on these numbers. He needs to know.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Bad news ages badly. Send it early, plainly, with what you\'re doing about it.',
    },
  ],
  apply: {
    scenario: 'Week 9.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'What was the late rate in week 9? (a percentage)',
        answers: ['28', '28%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the two drivers leave?',
        options: [
          { text: 'They joined a courier firm' },
          { text: 'They were fired', why: 'They left for a courier firm.' },
          { text: 'Nobody knows', why: 'Felix says a courier firm.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds trust or costs trust?',
        groups: ['Builds trust', 'Costs trust'],
        items: [
          { text: 'Telling him the same day', group: 0 },
          { text: 'Waiting for him to hear from Felix', group: 1 },
          { text: 'Including a plan', group: 0 },
          { text: 'Hiding it in next month\'s report', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the email to its content.',
        pairs: [
          ['What happened', 'Week 9 late rate rose to 28%'],
          ['Why', 'Two Saturday drivers quit'],
          ['What next', 'Update next Tuesday'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Can I at least start with all the good results first?',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'He knows the good results; he approved them today. Lead with the news, then the plan. One line of context is enough.' },
          { text: 'Yes, three paragraphs of good news first.', why: 'That buries the news.' },
          { text: 'Don\'t mention the good results at all, ever.', why: 'One line of context is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Send bad news [[1]], plainly, with a [[2]].',
        blanks: [['early'], ['plan']],
        distractors: ['late', 'joke'],
      },
      {
        kind: 'mcq',
        prompt: 'Who would Mr Kamau have heard it from on Friday?',
        options: [
          { text: 'Felix' },
          { text: 'Brian', why: 'Felix sends the weekly numbers.' },
          { text: 'The board', why: 'Felix.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Zanele\'s plan is the mistake?',
        lines: [
          'Email Mr Kamau today.',
          'Say what happened and why.',
          'Wait until it recovers before mentioning it.',
          'Say what we\'re doing and when he\'ll hear next.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Waiting turns bad news into hidden news.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Bad news', 'Saying no', 'Feedback', 'Editing with AI', 'The final check'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Saturday drivers quit?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of bad news you waited to share. What did waiting cost?',
    starters: ['I waited because...', 'It cost...'],
  },
  deepen: {
    title: 'The mum effect',
    summary: 'Psychologists call our reluctance to pass on bad news the "MUM effect" (Rosen and Tesser, 1970). Knowing the urge exists makes it easier to override.',
  },
  notes: 'Rosen & Tesser (1970), Sociometry: reluctance to communicate bad news ("MUM effect"). Fictional: week 9 late rate 28%, two drivers quit for a courier firm.',
};

export default lesson;
