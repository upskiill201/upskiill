import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Side by side: avoid it vs address it (Radical Candor's ruinous empathy). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Avoid it vs address it',
  summary: 'Two versions of the next month. In one, Lucía never had the Diego conversation. In the other, she did. Same team, same launch. Look what changes.',
  minutes: 11,
  outcomes: [
    'See the real cost of avoiding a hard conversation',
    'Know what "ruinous empathy" is',
    'Care personally and challenge directly at the same time',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'A month later, two versions',
      before: { label: 'Avoided it', text: 'Diego keeps joking. Sofía never shares the map, or her other two ideas. Tomás learns jokes are how you win here. Marta quietly asks Carmen about a transfer. Lucía tells herself she\'s being "nice".' },
      after: { label: 'Addressed it', text: 'Two awkward conversations with Diego. Then he helps Sofía build the map. It goes up on launch day and gets shared 4,000 times. Sofía pitches idea number two. Diego says, "Fine, the map was good."' },
      notes: [
        'Avoiding it felt kind. It cost the whole team.',
        'The awkward part lasted two meetings. The benefit lasted months.',
        'Diego wasn\'t the villain. He just needed someone to be honest with him.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Former Google and Apple manager <strong>Kim Scott</strong> wrote <em>Radical Candor</em> about this exact trap. She describes good feedback as two things at once: <strong>care personally</strong> and <strong>challenge directly</strong>. When you care but don't challenge, she calls it <strong>ruinous empathy</strong>: being so \"nice\" that you let someone keep making a mistake that hurts them and the team.</p><p>Scott says ruinous empathy is the mistake managers make most often. It feels kind in the moment. It isn't kind over time.</p>",
    },
    {
      kind: 'check',
      question: 'What is "ruinous empathy"?',
      options: ['Caring, but not challenging', 'Challenging, but not caring', 'Neither caring nor challenging'],
      answer: 0,
      explanation: 'So "nice" that you never say the thing that would help.',
    },
  ],
  apply: {
    scenario: 'Two versions of the next month.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Avoided or addressed?',
        groups: ['Avoided', 'Addressed'],
        items: [
          { text: 'Sofía never shares the map', group: 0 },
          { text: 'The map gets shared 4,000 times', group: 1 },
          { text: 'Marta asks about a transfer', group: 0 },
          { text: 'Sofía pitches idea number two', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What two things does Kim Scott say good feedback does at once?',
        options: [
          { text: 'Be nice and be quiet', why: 'That\'s ruinous empathy.' },
          { text: 'Care personally and challenge directly' },
          { text: 'Be loud and be fast', why: 'Not in her model.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But I didn\'t want to hurt Diego\'s feelings.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Caring about his feelings is good. Caring enough to be honest is better. That\'s what helped him in the end.' },
          { text: 'Feelings don\'t matter at work.', why: 'They do. Care AND challenge.' },
          { text: 'Then don\'t ever say anything.', why: 'That\'s ruinous empathy.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kim Scott\'s book: Radical ___. (one word)',
        answers: ['Candor', 'candor', 'Candour', 'candour'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mix to its name.',
        pairs: [
          ['Care + challenge', 'Radical candor'],
          ['Care, no challenge', 'Ruinous empathy'],
          ['Challenge, no care', 'Obnoxious aggression'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'According to Kim Scott, which mistake do managers make most often?',
        options: [
          { text: 'Being too harsh', why: 'It happens, but she says "too nice" is more common.' },
          { text: 'Ruinous empathy' },
          { text: 'Giving too much praise', why: 'Most people get too little.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s reasons for waiting. Which one is ruinous empathy?',
        lines: [
          'I\'ll talk to him today, while it\'s fresh.',
          'He\'s had a hard year, so I\'ll let it slide for now.',
          'I\'ll start with what we both want.',
        ],
        bug: 1,
        fix: 'He\'s had a hard year, so I\'ll be extra kind in HOW I say it.',
        explanation: 'Kindness belongs in the how, not in skipping it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the cost of avoiding it in order.',
        lines: ['The comment goes unaddressed', 'Sofía stops sharing ideas', 'The team learns jokes win', 'Good people start to leave'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Care [[1]], challenge [[2]].',
        blanks: [['personally'], ['directly']],
        distractors: ['loudly', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Diego\'s line, a month later.',
        tiles: ['Fine,', 'the', 'map', 'was', 'good.'],
        distractors: ['cute'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been "too nice" to tell someone something they needed to hear? What happened? What would radical candor have sounded like?',
    starters: ['I didn\'t tell them...', 'Radical candor would be...'],
  },
  deepen: {
    title: 'Kind in the how',
    summary: 'If you\'ve been putting off feedback to be nice, keep the kindness and move it: be kind in how you say it, not by skipping it.',
  },
  notes: 'Kim Scott, Radical Candor (2017): care personally / challenge directly; quadrants radical candor, ruinous empathy, obnoxious aggression, manipulative insincerity; Scott reports ruinous empathy as the most common management mistake. Fictional outcomes (4,000 shares).',
};

export default lesson;
