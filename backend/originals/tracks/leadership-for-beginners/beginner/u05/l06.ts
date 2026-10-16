import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Side by side: hero vs leader (the hero trap in a crisis; multiplying vs diminishing). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Hero vs leader',
  summary: 'Sunday night, 11 p.m. The last 6,000 bags. Everyone has gone home. Lucía is in the warehouse, alone, with a sticker gun. She has been here before, on Day 1. Two versions of Monday morning.',
  minutes: 11,
  outcomes: [
    'Tell a hero leader from a real leader',
    'See what the hero habit costs the team',
    'Know how to multiply what your team can do',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Monday morning, two versions',
      before: { label: 'The hero', text: 'Lucía finished all 6,000 alone by 4 a.m. She\'s grey, short-tempered and forgets Carmen\'s 10 a.m. call. The team feels oddly flat: it was their crisis, and she took the end of it away.' },
      after: { label: 'The leader', text: 'Lucía went home at 11:10. On Sunday morning, Diego suggested two shops lend people for an hour. 6,000 done by noon. On Monday, Lucía is rested, sharp, and the team tells the story as theirs.' },
      notes: [
        'The hero is admired for a day. The leader gets a stronger team.',
        'The best idea (borrowing shop staff) came from Diego, not Lucía.',
        'A rested leader makes better calls on the day that matters most.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Researcher <strong>Liz Wiseman</strong> (in <em>Multipliers</em>) describes two kinds of leaders. <strong>Diminishers</strong> do the thinking and the heroics themselves, so their teams shrink to helpers. <strong>Multipliers</strong> get the best thinking out of other people, so their teams can do far more than the leader could alone.</p><p>In a crisis the hero urge is strongest. It feels like responsibility. But Chapter 1 was right: \"I'll just do it myself\" keeps your team small. In a crisis it also leaves you too tired to lead.</p>",
    },
    {
      kind: 'check',
      question: 'Who came up with the best idea on Sunday?',
      options: ['Diego', 'Lucía', 'Carmen'],
      answer: 0,
      explanation: 'The leader went home, and the team found a better answer. That\'s multiplying.',
    },
  ],
  apply: {
    scenario: 'Sunday night, the warehouse.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Hero or leader?',
        groups: ['Hero', 'Leader'],
        items: [
          { text: 'Finishing it alone at 4 a.m.', group: 0 },
          { text: 'Going home and coming back rested', group: 1 },
          { text: '"I\'ve got it, you all go."', group: 0 },
          { text: '"Any ideas for the last 6,000?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a "multiplier" leader do?',
        options: [
          { text: 'Gets the best thinking out of other people' },
          { text: 'Does twice as much work as everyone', why: 'That\'s the hero.' },
          { text: 'Counts things', why: 'Not quite.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But it\'s my responsibility. I should finish it.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, stay all night.', why: 'And forget Carmen\'s call at 10.' },
          { text: 'It\'s not your problem.', why: 'It is. Just not alone.' },
          { text: 'Your responsibility is that it gets done, and that you can lead on Monday. Not that your hands do every sticker.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Liz Wiseman\'s book about leaders who amplify their teams: ___. (one word)',
        answers: ['Multipliers', 'multipliers'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the leader to what happens.',
        pairs: [
          ['Diminisher', 'The team shrinks to helpers'],
          ['Multiplier', 'The team does more than the leader alone'],
          ['Hero', 'Admired for a day, exhausted on Monday'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the team feel "oddly flat" in the hero version?',
        options: [
          { text: 'They were jealous', why: 'They felt left out of their own win.' },
          { text: 'They didn\'t care', why: 'They cared a lot.' },
          { text: 'Lucía took the end of their crisis away from them' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s Sunday night plan. Which line is the hero?',
        lines: [
          'Ask the team for ideas on the last 6,000.',
          'Send everyone home, then quietly finish it myself.',
          'Go home by 11:10. Check-in at 9.',
        ],
        bug: 1,
        fix: 'Pick it up together at 9, with fresh eyes.',
        explanation: 'Quietly finishing alone is the hero trap, and she\'d miss the team\'s better idea.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put being a multiplier in order.',
        lines: ['Name the problem', 'Ask the team for ideas', 'Let them own the answer', 'Give them the credit'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'The hero is [[1]] for a day. The leader gets a [[2]] team.',
        blanks: [['admired'], ['stronger', 'better']],
        distractors: ['tired', 'smaller'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the multiplier question.',
        tiles: ['Any', 'ideas', 'for', 'this?'],
        distractors: ['Mine'],
      },
    ],
  },
  reflect: {
    prompt: 'When have you played the hero (staying late, doing it all yourself)? What would have happened if you\'d asked others instead?',
    starters: ['I played the hero when...', 'If I\'d asked...'],
  },
  deepen: {
    title: 'Ask before you rescue',
    summary: 'Next time you\'re about to save the day alone, stop and ask one person: "Any ideas for this?" Their answer might be better than yours.',
  },
  notes: 'Liz Wiseman with Greg McKeown, Multipliers: How the Best Leaders Make Everyone Smarter (2010; rev. 2017): multipliers vs diminishers. Fictional events.',
};

export default lesson;
