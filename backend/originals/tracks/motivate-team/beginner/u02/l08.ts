import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Side by side: "close more tickets" vs "get Dr Bello's clinic live". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Tickets vs people',
  summary: 'Two ways to ask Emmanuel to help with a stuck clinic in Abeokuta. One is about the queue. One is about Dr Bello, who has 60 patients waiting and a laptop that won\'t log in. Same task. Very different Emmanuel.',
  minutes: 11,
  outcomes: [
    'Frame a task around the person it helps',
    'See how framing changes effort',
    'Do it honestly, without guilt-tripping',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Miracle asks Emmanuel for help',
      before: { label: 'About the queue', text: '"Emmanuel, can you take ticket #5102? The queue is getting long and we need to bring the numbers down."' },
      after: { label: 'About the person', text: '"Emmanuel, Dr Bello in Abeokuta has 60 patients waiting and can\'t log in. You fixed the same thing in Ibadan last week. Could you call her now?"' },
      notes: [
        'The first is about Miracle\'s numbers. The second is about Dr Bello\'s patients.',
        '"You fixed the same thing last week" adds competence, honestly.',
        'No guilt: it\'s just the truth about who\'s waiting.',
      ],
    },
    {
      kind: 'text',
      html: "<p>The same task can feel like a chore or a mission, depending on how it's framed. \"Bring the numbers down\" points at the manager's dashboard. \"Dr Bello has 60 patients waiting\" points at a person. Grant's research suggests the second framing taps into task significance: people work harder when they can picture who's on the other end.</p><p>The line between motivating and manipulating is honesty. It's true that Dr Bello is waiting. Don't exaggerate it, don't invent it, and don't use it to guilt people into overtime. Just tell them who the work is for.</p>",
    },
    {
      kind: 'check',
      question: 'What makes person-framing honest rather than manipulative?',
      options: ['It\'s true, not exaggerated, and not used to guilt people', 'It\'s emotional', 'It\'s short'],
      answer: 0,
      explanation: 'Tell the truth about who the work is for. Nothing more.',
    },
  ],
  apply: {
    scenario: 'Asking Emmanuel to help.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'About the queue, or about the person?',
        groups: ['Queue', 'Person'],
        items: [
          { text: '"Take ticket #5102."', group: 0 },
          { text: '"Dr Bello has 60 patients waiting."', group: 1 },
          { text: '"Bring the numbers down."', group: 0 },
          { text: '"Her laptop won\'t log in."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add "You fixed the same thing in Ibadan last week"?',
        options: [
          { text: 'To flatter him', why: 'It\'s true, so it\'s not flattery.' },
          { text: 'To guilt him', why: 'It\'s encouragement.' },
          { text: 'It honestly reminds him he\'s good at this: competence' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Dr Bello? On it. Was it the same password-reset bug?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Looks like it. Thank you. Tell me how she gets on.' },
          { text: 'Finally, some effort from you.', why: 'He just stepped up. Don\'t punish that.' },
          { text: 'Just close it fast.', why: 'Back to the queue framing.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The line between motivating and manipulating is ___. (one word)',
        answers: ['honesty', 'Honesty', 'truth'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the queue line to its person version.',
        pairs: [
          ['"Take #5102."', '"Dr Bello can\'t log in."'],
          ['"Bring numbers down."', '"60 patients are waiting."'],
          ['"Close it fast."', '"Tell me how she gets on."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When does person-framing become manipulation?',
        options: [
          { text: 'Always', why: 'Honest framing is fine.' },
          { text: 'When it\'s exaggerated, invented or used to guilt people into overtime' },
          { text: 'Never', why: 'It can be misused.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s message at 6:55 p.m. Which line crosses the line?',
        lines: [
          'Dr Bello in Abeokuta can\'t log in.',
          'If you go home now, those patients suffer because of you.',
          'Could someone take it first thing tomorrow?',
        ],
        bug: 1,
        fix: 'She\'s closing soon, so tomorrow at 8 is fine.',
        explanation: 'Guilt about leaving on time is manipulation, not motivation.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a person-framed ask in order.',
        lines: ['Who is waiting', 'What\'s wrong', 'Why you\'re the right person', 'The ask'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Tell them [[1]] the work is for. Nothing [[2]].',
        blanks: [['who'], ['more', 'else']],
        distractors: ['why', 'less'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the person-framed opener.',
        tiles: ['Dr', 'Bello', 'has', '60', 'patients', 'waiting.'],
        distractors: ['tickets'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a task you ask others to do often. Who is it really for? How could you say that honestly?',
    starters: ['The task is...', 'It\'s really for...'],
  },
  deepen: {
    title: 'Reframe one ask',
    summary: 'Next time you ask someone for help, start with who it helps, truthfully. Leave the dashboard out.',
  },
  notes: 'Prosocial framing and task significance: Grant (2008); Grant & Hofmann (2011), "It\'s not all about me", Psychological Science 22(12), hand-hygiene signs framed around patients increased compliance, hedged. Ethical line: honesty, no guilt. Fictional details.',
};

export default lesson;
