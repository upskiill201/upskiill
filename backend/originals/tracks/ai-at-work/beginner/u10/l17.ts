import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 17 — when something goes wrong. Story: the earlier paste. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When something goes wrong',
  summary: 'Tolu admits something: last week, before Ada stopped him, he had already pasted ten shop owners\' details into a free AI tool. What now?',
  minutes: 12,
  outcomes: [
    'Respond quickly and calmly to a data mistake',
    'Know why speed matters for reporting',
    'Create a culture where people report mistakes',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tolu\'s confession',
      beats: [
        { speaker: 'narrator', text: 'Thursday. Tolu, quietly: "Last week I pasted ten shop owners\' names and phone numbers into a free AI tool. I\'m sorry."' },
        { speaker: 'ada', text: 'Thank you for telling me. That was the right thing. Let\'s tell Tobi and our data protection contact now.' },
        { speaker: 'narrator', text: 'The data protection contact asks: what data, how many people, which tool, when, and has the chat been deleted?' },
        { speaker: 'tey', text: 'Speed matters. Many data laws, including Nigeria\'s and the EU\'s, require serious breaches to be reported to the regulator within 72 hours of the company knowing.' },
        { speaker: 'ada', text: 'And no blame. If Tolu gets shouted at, the next person hides it.' },
      ],
      choice: {
        prompt: 'What should Ada do first?',
        options: [
          { text: 'Thank Tolu, then tell Tobi and the data protection contact straight away', outcome: 'Yes. Fast reporting and no blame.', best: true },
          { text: 'Tell Tolu to keep quiet and delete the chat', outcome: 'Hiding a breach can make it far worse, legally and for trust.' },
          { text: 'Report it next month in the review', outcome: 'Deadlines may be as short as 72 hours.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Data mistake? Report it at once to your manager and data protection contact: what, how many, which tool, when. Thank people who own up.',
    },
  ],
  apply: {
    scenario: 'Tolu reports his earlier paste.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s response.',
        lines: ['Thank Tolu for telling her', 'Tell Tobi', 'Tell the data protection contact', 'Gather the facts', 'Follow their advice'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Many data laws require reporting serious breaches within how many hours?',
        answers: ['72', 'seventy-two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Facts the data protection contact needs, or not?',
        groups: ['Needed', 'Not needed'],
        items: [
          { text: 'What data was pasted', group: 0 },
          { text: 'How many people', group: 0 },
          { text: 'Tolu\'s lunch order', group: 1 },
          { text: 'Which tool and when', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why thank Tolu instead of blaming him?',
        options: [
          { text: 'If people are punished for reporting, the next mistake gets hidden' },
          { text: 'To be nice only', why: 'It protects future reporting.' },
          { text: 'It doesn\'t matter', why: 'Culture decides whether people report.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I heard there was a data slip with our shops. Should I be worried?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Thanks for asking. Ten owners\' contact details went into a free AI tool. We reported it the same day and our data protection lead is handling it. I\'ll update you Friday.' },
          { text: 'Nothing happened.', why: 'Be honest.' },
          { text: 'It was Tolu\'s fault.', why: 'Blame doesn\'t help.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Report it at [[1]]. [[2]] people who own up.',
        blanks: [['once'], ['Thank']],
        distractors: ['Christmas', 'Blame'],
      },
      {
        kind: 'findBug',
        prompt: 'Which response is wrong?',
        lines: [
          'Thank Tolu for being honest',
          'Tell the data protection contact today',
          'Delete the chat and tell nobody',
          'Learn what process would prevent it',
        ],
        bug: 2,
        fix: 'Delete the chat and report it.',
        explanation: 'Hiding a breach makes it worse.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to Tolu\'s answer.',
        pairs: [
          ['What data?', 'Names and phone numbers'],
          ['How many?', 'Ten shop owners'],
          ['Which tool?', 'A free AI chat'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first words to Tolu.',
        tiles: ['Thank', 'you', 'for', 'telling', 'me'],
        distractors: ['How', 'dare'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps after a mistake, or hurts?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Reporting quickly', group: 0 },
          { text: 'Hiding it', group: 1 },
          { text: 'Fixing the process', group: 0 },
          { text: 'Public blame', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shop owners\' details did Tolu paste?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should change after the incident?',
        options: [
          { text: 'A clear rule and an approved tool, so it\'s easy to do the right thing' },
          { text: 'Nothing', why: 'Fix the process.' },
          { text: 'Ban all computers', why: 'Overreaction.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If you made a data mistake tomorrow, who would you tell first? Do you know their name?',
    starters: ['I\'d tell...', 'Their name:'],
  },
  deepen: { title: 'Try it today', summary: 'Find out how your company wants data mistakes reported, and how fast.' },
  notes: 'GDPR Art. 33 and the Nigeria Data Protection Act 2023 require notifying the regulator of qualifying breaches within 72 hours of becoming aware. General guidance, not legal advice.',
};

export default lesson;
