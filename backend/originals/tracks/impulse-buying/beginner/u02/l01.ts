import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the pattern. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The pattern',
  summary: 'Two weeks of logging. Kofi shares the log on a video call with Miracle. She reads it in silence, then asks: "What were you feeling before every one of these?" What he does next is your call.',
  minutes: 11,
  outcomes: [
    'Link urges to the feelings and moments before them',
    'Choose a change that targets the real trigger',
    'See why banning things rarely works',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The call',
      beats: [
        { speaker: 'narrator', text: 'A video call. Miracle in Lagos, still in her work lanyard. Kofi in Room 214, the log on his screen: 23 urges in two weeks.' },
        { speaker: 'miracle', text: 'What were you feeling right before these?' },
        { speaker: 'kofi', text: 'Bored. Stressed about the anatomy test. Sad after the match. Lonely, I guess, when Yaw\'s out.' },
        { speaker: 'miracle', text: 'And where were you?' },
        { speaker: 'kofi', text: 'In bed. On my phone. After 10.' },
        { speaker: 'miracle', text: 'So it\'s not "Kofi buys things". It\'s "Kofi, tired and feeling bad, alone, late, with a phone full of shops". That\'s a pattern. Patterns can be changed.' },
        { speaker: 'tey', text: 'This is the heart of the chapter: the urge isn\'t about the thing. It\'s about a feeling, in a moment. Change the moment, and the urge loses its power. What should Kofi try first?' },
      ],
      choice: {
        prompt: 'What should Kofi try first?',
        options: [
          { text: 'Delete every shopping app forever.', outcome: 'It helps, for a week, and he reinstalls one "just to check something". Bans without a replacement tend to snap back.' },
          { text: 'After 10 p.m., phone charges across the room, and he keeps something else by his bed for bad nights: music on his old speaker, a book, a voice note to a friend.', outcome: 'Yes. It changes the moment where most urges live, and gives the feeling somewhere else to go. Urges after 10 p.m. drop from 7 a week to 2.', best: true },
          { text: 'Only buy cheap things at night.', outcome: 'Cheap things at night still add up, and still feed the habit of buying to feel better.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The urge isn\'t about the thing. It\'s about a feeling, in a moment. Change the moment and give the feeling somewhere else to go.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s pattern.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Part of Kofi\'s pattern, or not?',
        groups: ['Part of the pattern', 'Not part of it'],
        items: [
          { text: 'After 10 p.m.', group: 0 },
          { text: 'Feeling bored, stressed, sad or lonely', group: 0 },
          { text: 'At the market on Saturday mornings', group: 1 },
          { text: 'Alone, in bed, on his phone', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Miracle mean by "patterns can be changed"?',
        options: [
          { text: 'Kofi should change his personality', why: 'The situation, not the person.' },
          { text: 'Patterns are random', why: 'His log shows a clear repeat.' },
          { text: 'If urges come from a feeling in a moment, changing the moment can change the urge' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Urges after 10 p.m. drop from 7 a week to 2. How many fewer?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I\'ll just delete every shopping app forever.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Perfect, that solves it.', why: 'Without a replacement, the urge finds another way.' },
          { text: 'Try it, but also change the moment: phone across the room after 10, and something else for bad nights. Bans alone tend to snap back.' },
          { text: 'Don\'t bother.', why: 'Changes to the moment work well.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The heart of the chapter.',
        template: 'The urge isn\'t about the [[1]]. It\'s about a [[2]], in a moment.',
        blanks: [['thing'], ['feeling']],
        distractors: ['price', 'shop'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each bad night to something Kofi can do instead.',
        pairs: [
          ['Bored', 'Make a beat on the old speaker'],
          ['Stressed about a test', 'Ten minutes of flashcards, then sleep'],
          ['Sad after a match', 'Voice note to Efua or Miracle'],
          ['Lonely', 'Go and sit in the hall common room'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which change doesn\'t touch the real trigger?',
        lines: [
          'Phone charges across the room after 10.',
          'Something else by the bed for bad nights.',
          'Only buy items under GH₵50 at night.',
        ],
        bug: 2,
        fix: 'No buying at night at all: screenshot it, decide in the morning.',
        explanation: 'A price limit still lets the feeling-then-buy habit run every night.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do bans without a replacement often fail?',
        options: [
          { text: 'The feeling is still there, and it finds another way out' },
          { text: 'Bans are illegal', why: 'Nothing to do with law.' },
          { text: 'They always work', why: 'Kofi reinstalled an app within a week.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi logged 23 urges in two weeks. About how many a week? (Round to the nearest whole number.)',
        answers: ['12', 'twelve', '11.5', '11'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Kofi worked out his pattern.',
        lines: ['Logged every urge', 'Read the log with Miracle', 'Noticed the feelings', 'Noticed the time and place', 'Changed the moment'],
      },
    ],
  },
  reflect: {
    prompt: 'When and where do most of your urges happen? What feeling comes just before?',
    starters: ['Most of my urges happen...', 'Just before, I usually feel...'],
  },
  deepen: {
    title: 'Not just for shopping',
    summary: 'The same "feeling, moment, habit" pattern shows up in snacking, scrolling and other habits we use to feel better. The tools in this chapter work on those too.',
  },
  notes: 'Fictional: 23 urges in 2 weeks; after-10 p.m. urges drop 7 → 2/week after the phone-across-the-room change.',
};

export default lesson;
