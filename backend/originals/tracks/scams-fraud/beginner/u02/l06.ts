import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Before/After: a fake celebrity ad vs a genuine news story. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The famous face',
  summary: 'An ad in Grace\'s feed: a well-known TV presenter "reveals" the investment that made her rich. It looks like a news article. It isn\'t. Side by side with a real one.',
  minutes: 11,
  outcomes: [
    'Spot fake celebrity endorsement ads',
    'Tell a fake "news" page from a real one',
    'Know why famous faces are used',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two "articles" about money',
      before: {
        label: 'The fake ad',
        text: 'Looks like a news site, but the web address is slightly wrong\nHeadline: "TV star\'s secret: how she turns £250 into £5,000 a week"\nQuotes she never said; photos from other events\n"Banks hate this! Act before it\'s banned"\nA sign-up form for a platform you\'ve never heard of\nComments all glowing, posted minutes apart',
      },
      after: {
        label: 'A genuine news story about investing',
        text: 'On a real news site you typed yourself\nHeadline about markets or savings, no secret trick\nQuotes from named, checkable people\nRisks mentioned; no "act now"\nNo sign-up form for a platform\nNo promise of weekly thousands',
      },
      notes: [
        'Famous faces borrow trust the scammers haven\'t earned. Many celebrities have publicly said their image was used without permission.',
        'Some fake ads now use AI-made videos of real people saying things they never said.',
        'The giveaway is the promise: real journalism doesn\'t tell you to turn £250 into £5,000 a week.',
        'Don\'t click to "check". Close it, and report the ad to the platform.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A famous face plus a get-rich promise plus a sign-up form is a scam. Real news doesn\'t sell you a trading platform.',
    },
  ],
  apply: {
    scenario: 'The famous face.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fake ad or genuine story?',
        groups: ['Fake ad', 'Genuine story'],
        items: [
          { text: '"Banks hate this!"', group: 0 },
          { text: 'Named, checkable sources', group: 1 },
          { text: 'A sign-up form for a platform', group: 0 },
          { text: 'Risks mentioned', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do scammers use celebrity faces?',
        options: [
          { text: 'Celebrities pay them', why: 'Images are used without permission.' },
          { text: 'To borrow trust they haven\'t earned' },
          { text: 'It\'s required for ads', why: 'It\'s a trust trick.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fake-ad trick to its purpose.',
        pairs: [
          ['Looks like a news site', 'Borrows a trusted format'],
          ['"Act before it\'s banned"', 'Creates urgency'],
          ['Glowing comments', 'Fake social proof'],
          ['AI video of a celebrity', 'Makes the endorsement look real'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'It\'s got a video of her actually saying it, though.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Then it\'s real.', why: 'Videos can be faked.' },
          { text: 'Celebrities never lie.', why: 'She probably never said it.' },
          { text: 'Videos can be faked with AI now. The promise of £5,000 a week is the real giveaway.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Real [[1]] doesn\'t sell you a trading [[2]].',
        blanks: [['news', 'journalism'], ['platform']],
        distractors: ['TV', 'newspaper'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The ad claims £250 becomes £5,000 a week. That\'s how many times the starting amount, every week?',
        answers: ['20', 'twenty', '20x'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which response to the ad is risky?',
        lines: [
          'Close it.',
          'Report the ad to the platform.',
          'Click through to see if the site looks real.',
        ],
        bug: 2,
        fix: 'Don\'t click; fake sites can look perfect.',
        explanation: 'Clicking can lead to sign-up pages that harvest your details.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a quick sign the "news site" is fake?',
        options: [
          { text: 'It has photos', why: 'Real sites do too.' },
          { text: 'The web address is slightly different from the real news site' },
          { text: 'It\'s in English', why: 'Not a sign.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do when you see a celebrity investment ad.',
        lines: ['Notice the get-rich promise', 'Don\'t click', 'Report the ad', 'Warn anyone who shared it'],
      },
      {
        kind: 'mcq',
        prompt: 'What have many celebrities said about these ads?',
        options: [
          { text: 'They approved them', why: 'Most say the opposite.' },
          { text: 'Nothing', why: 'Many have spoken out.' },
          { text: 'Their image was used without permission' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen a celebrity "money secret" ad? What did it promise?',
    starters: ['I saw...', 'It promised...'],
  },
  deepen: {
    title: 'Deepfakes',
    summary: 'AI-generated video and audio ("deepfakes") are increasingly used in investment scam ads. Treat any video of a famous person promising easy money as fake until proven otherwise, and never as a reason to invest.',
  },
  notes: 'Fake celebrity ads widely reported (e.g. UK public figures warning of misuse). No celebrities or sites named. Priya per CAST.',
};

export default lesson;
