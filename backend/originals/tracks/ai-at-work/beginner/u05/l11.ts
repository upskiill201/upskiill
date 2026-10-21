import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 11 — checking a claim: trace it to the original. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Checking a claim',
  summary: 'A news article says "most traders in Accra now refuse cash". Before it goes in the brief, Ada traces it back to where it really came from.',
  minutes: 12,
  outcomes: [
    'Trace a claim back to its original source',
    'Spot when a claim has changed as it travelled',
    'Write the claim as the source actually says it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The claim, then the original',
      before: {
        label: 'The claim, as Ada found it',
        text: 'A blog: "Most traders in Accra now refuse cash, according to a new survey."',
      },
      after: {
        label: 'The original source',
        text: 'The survey itself: "Of 300 traders surveyed in two Accra markets, 54% said they prefer mobile money to cash for payments over 100 cedis." Nothing about refusing cash, and only two markets.',
      },
      notes: [
        '"Prefer for bigger payments" became "refuse cash" as it was repeated.',
        '"300 traders in two markets" became "traders in Accra".',
        'Quote the original, with its limits: "In a survey of 300 traders in two Accra markets, 54% preferred mobile money for payments over 100 cedis."',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Follow a claim upstream to the first source. Use its exact wording and its limits: who was asked, how many, where, when.',
    },
  ],
  apply: {
    scenario: 'Ada is checking a claim for the brief.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What changed as the claim travelled?',
        options: [
          { text: '"Prefer for bigger payments" became "refuse cash", and two markets became all of Accra' },
          { text: 'Nothing', why: 'The meaning changed a lot.' },
          { text: 'Only the number', why: 'The meaning and scope changed.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many traders were in the original survey?',
        answers: ['300'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada checks the claim.',
        lines: ['Find where the blog got it', 'Open the original survey', 'Compare the wording', 'Write it as the source says'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Limit to keep, or detail to drop?',
        groups: ['Keep this limit', 'Fine to drop'],
        items: [
          { text: 'Only two markets', group: 0 },
          { text: 'Only payments over 100 cedis', group: 0 },
          { text: 'The survey\'s font', group: 1 },
          { text: '300 people asked', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Great quote: "most traders refuse cash"! Can we put it on the slide?',
        prompt: 'Best reply?',
        options: [
          { text: 'The original says 54% of 300 traders in two markets prefer mobile money for bigger payments. Let\'s use that: still a strong point, and true.' },
          { text: 'Yes, it\'s in a blog.', why: 'The blog exaggerated the original.' },
          { text: 'No, surveys are useless.', why: 'The real finding is useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Follow a claim [[1]] to the first source, and keep its [[2]].',
        blanks: [['upstream'], ['limits']],
        distractors: ['sideways', 'jokes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which version overstates the survey?',
        lines: [
          '54% of 300 traders in two Accra markets prefer mobile money for payments over 100 cedis.',
          'In two Accra markets, a majority of traders surveyed preferred mobile money for larger payments.',
          'Traders across Ghana have abandoned cash.',
          'A survey of 300 traders found mobile money preferred for bigger payments.',
        ],
        bug: 2,
        fix: 'Use one of the accurate versions.',
        explanation: '"Across Ghana" and "abandoned cash" aren\'t in the source.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to ask of any survey.',
        pairs: [
          ['Who?', 'Traders in two markets'],
          ['How many?', '300'],
          ['What exactly?', 'Preference for payments over 100 cedis'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which AI request helps trace the claim?',
        options: [
          { text: 'Is this claim true?', why: 'It may just agree.' },
          { text: 'This blog says "most traders in Accra refuse cash, according to a new survey". Help me find the original survey and the exact question it asked.' },
          { text: 'Make the claim sound stronger.', why: 'The opposite of checking.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s checking question.',
        tiles: ['Where', 'did', 'this', 'first', 'come', 'from?'],
        distractors: ['probably'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Original source, or someone repeating it?',
        groups: ['Original', 'Repeating it'],
        items: [
          { text: 'The survey report itself', group: 0 },
          { text: 'A blog quoting the survey', group: 1 },
          { text: 'A tweet about the blog', group: 1 },
          { text: 'The researchers\' published data', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What usually happens to claims as they are repeated?',
        options: [
          { text: 'They lose their limits and get stronger' },
          { text: 'They get more accurate', why: 'They usually drift and inflate.' },
          { text: 'They stay exactly the same', why: 'They often change.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a statistic people often quote in your industry. Do you know the original source and its limits?',
    starters: ['The statistic:', 'The original source:'],
  },
  deepen: { title: 'Try it today', summary: 'Take one claim from a news article and follow it upstream to the first source. Note what changed.' },
  notes: 'The blog and survey are fictional. 1 cedi = Ghana\'s currency unit (GHS).',
};

export default lesson;
