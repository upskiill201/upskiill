import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Chat with Tey: setting expectations upwards, with a client who reads one line. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Expectations, upwards',
  summary: 'Arjun realises the loyalty-points surprise started weeks ago. He told Mr Rao the Won\'t list on Day 14, in paragraph four of an email. Mr Rao read the first line. Arjun asks Tey how to set expectations with someone who never reads past line one.',
  minutes: 11,
  outcomes: [
    'Set expectations with a busy client or boss',
    'Put the expectation where they\'ll actually see it',
    'Use a steady rhythm so nothing is a surprise',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Where did you tell Mr Rao about the Won\'t list?',
          replies: ['Paragraph four of the Day 14 update.', 'In an attachment.'],
        },
        {
          tey: "Then, honestly, you didn't tell him. You told an email he didn't read. With busy people, an expectation only counts if it's somewhere they'll see it. For Mr Rao, that's the first line.",
          replies: ['So everything goes in line one?'],
        },
        {
          tey: "The most important thing goes in line one. One idea per message. \"Launch on Day 28, as planned. Not in this version: loyalty points, wishlists, reviews.\" Then details below, for whoever reads on.",
          replies: ['What about things he\'ll hate hearing?'],
        },
        {
          tey: "Those first. Bad news goes early and clearly, before he hears it some other way. \"Coupons may slip by two days\" on Day 21 is a small conversation. Discovered on Day 28, it's a crisis. No surprises, upwards.",
          replies: ['How often should I update him?'],
        },
        {
          tey: "Same day, same time, same shape. Every Monday and Thursday at 6 p.m.: one line of status, then the details. A rhythm means he stops calling at 8:15 p.m., because he knows when news is coming.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'An expectation only counts where they\'ll see it. Most important thing in line one. Bad news early. One steady rhythm. No surprises.',
    },
  ],
  apply: {
    scenario: 'Tey and Arjun, about Mr Rao.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Did Arjun really tell Mr Rao about the Won\'t list?',
        options: [
          { text: 'Yes, it was in the email', why: 'In paragraph four. He reads line one.' },
          { text: 'Not really: it was where Mr Rao would never see it' },
          { text: 'Yes, it was in an attachment', why: 'Even further from line one.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good upwards expectation-setting, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Most important thing in line one', group: 0 },
          { text: 'Bad news in paragraph four', group: 1 },
          { text: 'Updates every Monday and Thursday at 6', group: 0 },
          { text: 'Updates whenever there\'s time', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'First line for Thursday\'s update?',
        prompt: 'What does Tey suggest?',
        options: [
          { text: '"Hope you\'re well! Quick update on lots of things..."', why: 'He\'ll stop reading right there.' },
          { text: '"See attached."', why: 'The attachment is where expectations go to die.' },
          { text: '"Launch Day 28 on track; comeback code ready Day 24; points in January."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bad news goes ___ and clearly. (one word)',
        answers: ['early', 'Early', 'first'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to its effect.',
        pairs: [
          ['Line one', 'He actually sees it'],
          ['Bad news early', 'A small talk, not a crisis'],
          ['Steady rhythm', 'No more 8:15 p.m. calls'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a steady update rhythm reduce surprise calls?',
        options: [
          { text: 'He knows when news is coming, so he doesn\'t need to chase' },
          { text: 'He\'ll be too busy to call', why: 'It\'s about knowing, not busyness.' },
          { text: 'It doesn\'t', why: 'Rhythm replaces chasing.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s Monday update. Which line breaks the advice?',
        lines: [
          'Launch Day 28 on track. Coupons may slip two days.',
          'Details below for anyone who wants them.',
          'P.S. Loyalty points aren\'t in this version, by the way.',
        ],
        bug: 2,
        fix: 'Not in this version: loyalty points (January).',
        explanation: 'A P.S. is the last line. Mr Rao reads the first.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put an upwards update in order.',
        lines: ['One-line status, including bad news', 'What\'s not in this version', 'Details below', 'Same time next update'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'An expectation only counts where they\'ll [[1]] it. No [[2]], upwards.',
        blanks: [['see', 'read'], ['surprises']],
        distractors: ['hide', 'emails'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s line-one habit.',
        tiles: ['The', 'important', 'thing', 'goes', 'first.'],
        distractors: ['last.'],
      },
    ],
  },
  reflect: {
    prompt: 'Who above you (a boss, client, teacher, parent) reads only the first line? What expectation have you "told" them that they never actually saw?',
    starters: ['They read...', 'I "told" them...'],
  },
  deepen: {
    title: 'Fix line one',
    summary: 'Before you send your next update upwards, read only its first line. Does it carry the most important expectation? If not, move it there.',
  },
  notes: 'Managing up and "no surprises": Gabarro & Kotter (1980). Answer-first structure: Minto (1987). First-line readers: How to Make People Listen to You (Mr Rao). Fictional details.',
};

export default lesson;
