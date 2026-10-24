import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: the pause list v1, 11 urges. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The pause list v1: 11 urges',
  summary: 'One week of logging. Eleven urges. Kofi expected three. Tap through his first week\'s log and see what jumps out.',
  minutes: 11,
  outcomes: [
    'Read a week of urges for patterns',
    'Spot repeated times, feelings and places',
    'Count what you bought, waited on and let go',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s pause list v1 (week 1)',
      text: 'URGES: 11. BOUGHT: 4 (GH₵310). WAITED: 4. LET GO: 3. AFTER 10 P.M.: 7 of 11. FEELINGS: bored 4, stressed 3, sad 2, happy 2. WHERE: phone in bed 7, Kejetia with Yaw 2, hall shop 2. BIGGEST: headphones GH₵300, waited, didn\'t buy. ADS INVOLVED: 6 of 11.',
      hotspots: [
        { phrase: 'URGES: 11', note: 'Kofi guessed he\'d have three. Most people underestimate how often they feel the pull, until they count.' },
        { phrase: 'BOUGHT: 4 (GH₵310)', note: 'A phone case, two snacks and a GH₵250 jersey he\'d logged on Wednesday then bought on Saturday.' },
        { phrase: 'WAITED: 4', note: 'By the next morning, he still wanted only one of them. The want faded.' },
        { phrase: 'AFTER 10 P.M.: 7 of 11', note: 'The biggest pattern. Late nights are where most of his urges live.' },
        { phrase: 'FEELINGS: bored 4, stressed 3, sad 2, happy 2', note: 'Nine of the eleven came with a difficult feeling. Chapter 2 is about this.' },
        { phrase: 'WHERE: phone in bed 7', note: 'Not the market, not the mall. His bed, his phone, scrolling.' },
        { phrase: 'ADS INVOLVED: 6 of 11', note: 'More than half started with an ad. Chapter 3 looks at what those ads are doing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Count your urges for one week before trying to change anything. The numbers usually point straight at the pattern.',
    },
  ],
  apply: {
    scenario: 'Reading week 1.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Bought 4, waited 4, let go of some. Total 11. How many did he let go?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest pattern in Kofi\'s log?',
        options: [
          { text: 'Most urges happen at Kejetia', why: 'Only 2 of 11.' },
          { text: 'Most urges happen after 10 p.m., on his phone in bed' },
          { text: 'Most urges happen when he\'s happy', why: 'Only 2 of 11.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A difficult feeling, or a good one?',
        groups: ['Difficult', 'Good'],
        items: [
          { text: 'Bored', group: 0 },
          { text: 'Stressed', group: 0 },
          { text: 'Happy', group: 1 },
          { text: 'Sad', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bored 4 + stressed 3 + sad 2. How many urges came with a difficult feeling?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each finding to the chapter that deals with it.',
        pairs: [
          ['Difficult feelings', 'Ch 2: why I really bought it'],
          ['6 of 11 started with an ad', 'Ch 3: the tricks'],
          ['Shopping with Yaw', 'Ch 4: everyone\'s buying it'],
          ['After 10 p.m. in bed', 'Ch 5: spend on purpose'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: '11 urges in a week! I thought I had three.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Almost everyone guesses low. Now you know, and you let go of or waited on 7 of the 11. That\'s a good week.' },
          { text: 'That\'s terrible.', why: 'Counting is progress, not failure.' },
          { text: 'Stop logging; it\'s depressing.', why: 'The log is how he\'ll change it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Week-one rule.',
        template: '[[1]] before you try to [[2]].',
        blanks: [['Count'], ['change']],
        distractors: ['Spend', 'hide'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion doesn\'t match the log?',
        lines: [
          'Late nights are my danger zone.',
          'Ads start more than half of my urges.',
          'Shopping with Yaw is where most of my urges come from.',
        ],
        bug: 2,
        fix: 'Shopping with Yaw was 2 of 11; my phone in bed was 7.',
        explanation: 'Read the numbers, not the story you expect.',
      },
      {
        kind: 'mcq',
        prompt: 'Of the 4 urges he waited on, he still wanted 1 the next morning. What does that suggest?',
        options: [
          { text: 'Waiting doesn\'t work', why: 'Three of four faded.' },
          { text: 'Waiting lets most wants fade' },
          { text: 'He should buy everything immediately', why: 'Most of the urges disappeared with time.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to read a week of urges.',
        lines: ['Count the urges', 'Count bought, waited and let go', 'Look for repeated times', 'Look for repeated feelings', 'Look for repeated places and ads'],
      },
    ],
  },
  reflect: {
    prompt: 'After one week of your own log, how many urges? What\'s the biggest pattern?',
    starters: ['I logged... urges', 'The biggest pattern:...'],
  },
  deepen: {
    title: 'The pause list grows',
    summary: 'This is v1 of Kofi\'s pause list. Over the course it becomes v5: a list of his own rules for when he feels the pull, built from what his log teaches him.',
  },
  notes: 'Week-1 log (fictional): 11 urges; bought 4 (310: jersey 250, case 40, snacks 20); waited 4; let go 3; 7 after 10 p.m.; feelings bored 4, stressed 3, sad 2, happy 2; phone in bed 7, Kejetia 2, hall shop 2; ads 6.',
};

export default lesson;
