import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. "Rewind" (Before/After): the mumble vs the headline. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Rewind: the mumble vs the headline',
  summary: 'The producer has a recording of David\'s update to the group last week, and one from this week. Same student. Same news. Tey plays them back to back.',
  minutes: 11,
  outcomes: [
    'Turn a mumbled update into a clear headline',
    'Drop the apologies and qualifiers that shrink your point',
    'Finish with a clear next step',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Rewind: David\'s update',
      before: {
        label: 'Last week: the mumble',
        text: '(looking at phone) "Um, sorry, so I just, I kind of called the hospital? And I think they said maybe we could possibly do the drive, but I\'m not sure, it\'s probably fine, sorry, that\'s it, I guess."',
      },
      after: {
        label: 'This week: the headline',
        text: '(looking up) "Good news: the hospital said yes. (pause) The blood drive is on Wednesday the 12th, in the cafeteria, 11 to 3. Next step: we need ten volunteers. Who\'s in?"',
      },
      notes: [
        'The headline first: "Good news: the hospital said yes."',
        'No apologies. Nothing to apologise for.',
        'The facts: day, place, time.',
        'One clear next step, and a question that gets a reply.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>The shrinkers.</strong> Some words make a statement smaller every time you add one:</p><ul><li><strong>Apologies:</strong> \"sorry, sorry, sorry\" (when nothing went wrong)</li><li><strong>Qualifiers:</strong> \"kind of\", \"I think maybe\", \"possibly\", \"I guess\"</li><li><strong>Dismissals:</strong> \"it\'s probably nothing\", \"that\'s it, I guess\"</li></ul><p>One \"I think\" is fine, and honest when you're unsure. But when you <em>know</em> something (the hospital said yes!), say it like you know it.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Headline first. Facts next. One next step. Cut the shrinkers when you know you\'re right.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Rewind.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the headline in David\'s update?',
        options: [
          { text: '"Um, sorry, so I just..."', why: 'That\'s the mumble.' },
          { text: '"Who\'s in?"', why: 'That\'s the next step, at the end.' },
          { text: '"Good news: the hospital said yes."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of shrinker is it?',
        groups: ['Apology', 'Qualifier', 'Dismissal'],
        items: [
          { text: 'Sorry, sorry', group: 0 },
          { text: 'I kind of think maybe', group: 1 },
          { text: 'It\'s probably nothing', group: 2 },
          { text: 'Possibly', group: 1 },
          { text: 'That\'s it, I guess', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s headline update in order.',
        lines: ['Good news: the hospital said yes.', 'Wednesday the 12th, cafeteria, 11 to 3.', 'We need ten volunteers.', 'Who\'s in?'],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'If I don\'t say "I think maybe", won\'t I sound arrogant?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'When you\'re unsure, "I think" is honest. When you KNOW (the hospital said yes), say it like you know it.' },
          { text: 'Yes, add more qualifiers.', why: 'They shrink true facts into guesses.' },
          { text: 'Arrogant is good.', why: 'Clear isn\'t arrogant. That\'s the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Words like "sorry", "kind of" and "I guess" are called ___ in this lesson. (one word)',
        answers: ['shrinkers', 'shrinker'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why end with "Who\'s in?"',
        options: [
          { text: 'To fill the silence', why: 'It\'s a request, not filler.' },
          { text: 'It gives everyone a clear next step and invites a reply' },
          { text: 'It\'s polite to ask questions', why: 'True, but the point is action.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'David\'s update for the professor. Which line shrinks the news?',
        lines: [
          'The hospital confirmed the blood drive for the 12th.',
          'Sorry, it\'s probably not a big deal, I guess.',
          'We already have eight of the ten volunteers we need.',
        ],
        bug: 1,
        fix: 'It\'s the first student-run drive on campus this year.',
        explanation: 'It IS a big deal. Apologising and dismissing it makes good news sound unimportant.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Too much eye contact', 'Can feel like pressure'],
          ['Hints', 'Fog'],
          ['Reclaiming an idea', '"That builds on what I said"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'David\'s headline.',
        template: 'Good [[1]]: the hospital said [[2]]. Next step: we need ten [[3]].',
        blanks: [['news'], ['yes'], ['volunteers', 'people']],
        distractors: ['sorry', 'maybe'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a headline.',
        tiles: ['Good', 'news:', 'the', 'hospital', 'said', 'yes.'],
        distractors: ['sorry,', 'maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last update you gave. Did it start with a headline or a mumble? Rewrite your first sentence as a headline.',
    starters: ['I said...', 'Headline version: ...'],
  },
  deepen: {
    title: 'Count your sorries',
    summary: 'For one day, notice every "sorry" you say or type when nothing went wrong. Replace a few with "thanks" ("Thanks for waiting" instead of "Sorry I\'m late") or nothing at all.',
  },
  notes: 'Hedges/qualifiers and over-apologising as clarity reducers: standard communication advice. Lesson keeps "I think" as honest when uncertain.',
};

export default lesson;
