import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: the trigger map. Cliffhanger: six parcels on Yaw's bed. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the trigger map',
  summary: 'Abena\'s urge log arrives with a note from Efua: "Can you map her triggers?" Use everything from Chapter 2. Then Kofi comes back to Room 214 and finds six parcels on Yaw\'s bed. All delivered today.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a trigger map from someone else\'s log', 'Use HALT + BS, identity and habit swaps together'],
  learn: [
    {
      kind: 'story',
      title: 'Six parcels',
      beats: [
        { speaker: 'efua', text: 'Abena started a log after hearing about yours. Two weeks, 18 urges. Can you map them?' },
        { speaker: 'kofi', text: 'Give it here. I\'m basically a professional now.' },
        { speaker: 'narrator', text: 'That evening Kofi gets back to Room 214. On Yaw\'s bed: six parcels. Sneakers. A watch. A speaker. Two shirts. A box he can\'t identify.' },
        { speaker: 'kofi', text: 'Yaw... did these all come today?' },
        { speaker: 'yaw', text: 'Don\'t start, chale. It\'s all "pay later". I haven\'t paid anything yet. It\'s fine.' },
        { speaker: 'narrator', text: 'Yaw doesn\'t open a single one. He puts his headphones in and turns to the wall.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: the feeling underneath, HALT + BS, buying to be someone, and swapping the habit. Something is going on with Yaw. Chapter 3 starts somewhere unexpected: Mum\'s stall at Makola. First, Abena\'s map.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: Abena\'s 18 urges. After 9 p.m.: 11. Sunday evenings: 6. Feelings: lonely 7, bored 5, stressed 4, happy 2. Where: social media 12, the campus shop 6.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s Abena\'s biggest feeling trigger?',
        options: [
          { text: 'Lonely' },
          { text: 'Happy', why: 'Only 2 of 18.' },
          { text: 'Stressed', why: '4 of 18. Lonely is 7.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lonely 7 + bored 5 + stressed 4. How many came with a difficult feeling?',
        answers: ['16', 'sixteen'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Name Abena\'s main trigger.',
        template: '"When I\'m on social media after 9 p.m., feeling [[1]], I [[2]]."',
        blanks: [['lonely'], ['buy', 'shop', 'buy things']],
        distractors: ['rich', 'sleep'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Abena\'s feelings to a swap.',
        pairs: [
          ['Lonely', 'Call her mum or knock on a friend\'s door'],
          ['Bored', 'Start the novel by her bed'],
          ['Stressed', 'Ten minutes of the assignment, then rest'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Six urges on Sunday evenings. What might be behind it?',
        options: [
          { text: 'Sunday evenings may feel lonely, before the week starts' },
          { text: 'Shops are cheaper on Sundays', why: 'The feelings point to loneliness, not price.' },
          { text: 'Nothing; it\'s random', why: 'Six of 18 is a pattern.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Abena wants to delete social media completely. Good idea?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'It could help, but the loneliness would still be there. Pair it with a swap: a Sunday call home, phone away after 9.' },
          { text: 'Yes, that fixes everything.', why: 'Bans without a swap tend to snap back.' },
          { text: 'No, she should buy less expensive things.', why: 'The feeling is the trigger, not the price.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Abena\'s if-then plan.',
        template: '"If it\'s Sunday evening and I feel lonely, [[1]] I call my mum."',
        blanks: [['then']],
        distractors: ['never', 'maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'For Abena: changes the moment, or swaps the routine?',
        groups: ['Changes the moment', 'Swaps the routine'],
        items: [
          { text: 'Phone in a drawer after 9 p.m.', group: 0 },
          { text: 'Call her mum instead of scrolling', group: 1 },
          { text: 'Mute shopping accounts', group: 0 },
          { text: 'Read instead of browsing', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Abena\'s draft map. Which line won\'t help?',
        lines: [
          'Trigger 1: social media after 9, lonely. Swap: call a person.',
          'Trigger 2: Sunday evenings. Swap: cook with her hall friends.',
          'Trigger 3: campus shop. Swap: try harder.',
        ],
        bug: 2,
        fix: 'Trigger 3: campus shop. Swap: go with a list and only what\'s on it.',
        explanation: '"Try harder" isn\'t a swap. It\'s willpower, which runs out.',
      },
      {
        kind: 'mcq',
        prompt: 'Yaw says "It\'s all pay later, I haven\'t paid anything." What does that suggest?',
        options: [
          { text: 'The "ouch" of paying has been pushed into the future, and it may be piling up' },
          { text: 'Everything is free', why: 'Pay later means paying later, usually with conditions.' },
          { text: 'Nothing to worry about', why: 'Six parcels in a day, unopened, is a worrying sign.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how you mapped Abena\'s triggers.',
        lines: ['Count the details', 'Find the biggest feeling', 'Name the trigger', 'Pick a swap with a similar reward', 'Write it as if-then'],
      },
      {
        kind: 'mcq',
        prompt: 'Yaw doesn\'t open a single parcel. Which Chapter 2 idea might explain it?',
        options: [
          { text: 'Buying to fix a feeling, not because he wanted the things' },
          { text: 'He doesn\'t like parcels', why: 'He bought six.' },
          { text: 'He forgot', why: 'They\'re on his bed.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there someone in your life whose spending worries you? What might be going on underneath?',
    starters: ['I\'m worried about...', 'Underneath, maybe...'],
  },
  notes: 'Chapter 2 challenge. Abena\'s log (fictional): 18 urges; after 9 p.m. 11; Sunday evenings 6; lonely 7, bored 5, stressed 4, happy 2; social media 12, campus shop 6. Cliffhanger: six pay-later parcels on Yaw\'s bed (Chapter 4 reveal: GH₵2,900 across three apps).',
};

export default lesson;
