import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: checking investment firms (UK). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Check before you invest',
  summary: 'Grace wants a simple way to check any investment offer. Tey walks her through the UK regulator\'s register, warning list and the "clone firm" trick.',
  minutes: 12,
  outcomes: [
    'Check a firm on the regulator\'s register',
    'Spot clone firms',
    'Know where to find warnings',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'In the UK, firms offering investments generally need to be authorised by the Financial Conduct Authority, the FCA. It keeps a public register online. Want the steps?', replies: ['Yes please.'] },
        { tey: 'One: get the firm\'s exact name and its registration number. Two: go to the FCA\'s own website by typing the address yourself. Three: search the register. If it isn\'t there, or isn\'t allowed to do what it\'s offering, walk away.', replies: ['What if it is there?'] },
        { tey: 'Then check it\'s really them. Clone firms copy the name, address and number of a real, authorised firm. Use the contact details on the register, not the ones the caller gave you, and contact the firm yourself.', replies: ['Is there a warning list?'] },
        { tey: 'Yes. The FCA publishes a warning list of firms it knows are operating without permission or running scams, and has a ScamSmart section with checks. Search the firm\'s name there too.', replies: ['What about crypto?'] },
        { tey: 'Most crypto is not protected like regulated investments, and many crypto offers are unregulated. If anything goes wrong, there may be no compensation scheme. Be extra careful, and never because a mentor or partner suggested it.', replies: ['And outside the UK?'] },
        { tey: 'Most countries have a regulator and a register: SEBI in India, the SEC in Nigeria and Ghana, and so on. Same method everywhere: the regulator\'s own site, typed yourself, and the contact details from there.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Exact name and number, regulator\'s own site typed yourself, check the register and the warning list, and contact the firm using details from the register, not from the caller.',
    },
  ],
  apply: {
    scenario: 'Checking a firm.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the checks.',
        lines: ['Get the exact name and number', 'Type the regulator\'s address yourself', 'Search the register', 'Search the warning list', 'Contact the firm using register details'],
      },
      {
        kind: 'mcq',
        prompt: 'What is a clone firm?',
        options: [
          { text: 'A scam copying a real authorised firm\'s name and details' },
          { text: 'A real firm\'s branch', why: 'It\'s a copy by scammers.' },
          { text: 'A cheaper version of a bank', why: 'It\'s a scam.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe way to check, or unsafe?',
        groups: ['Safe', 'Unsafe'],
        items: [
          { text: 'Contact details from the register', group: 0 },
          { text: 'The phone number the caller gave', group: 1 },
          { text: 'Typing the regulator\'s site yourself', group: 0 },
          { text: 'A "verify us here" link they sent', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'The firm that called me IS on the register. So it\'s fine?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Yes, definitely fine.', why: 'Clone firms copy real details.' },
          { text: 'Registers are useless.', why: 'They\'re essential; just use them carefully.' },
          { text: 'Maybe a clone. Ring the number on the register, not the one they gave, and ask if they called you.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The UK regulator.',
        template: 'The [[1]] keeps a public [[2]] of authorised firms.',
        blanks: [['FCA', 'Financial Conduct Authority'], ['register']],
        distractors: ['NHS', 'newsletter'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each country to its regulator (as mentioned).',
        pairs: [
          ['UK', 'FCA'],
          ['India', 'SEBI'],
          ['Nigeria', 'SEC'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step lets a clone firm through?',
        lines: [
          'Search the FCA register.',
          'Check the warning list.',
          'Call back on the number in their email to confirm.',
        ],
        bug: 2,
        fix: 'Call the number listed on the register.',
        explanation: 'The email\'s number goes to the clone.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s special about most crypto offers?',
        options: [
          { text: 'They\'re fully protected', why: 'Most aren\'t.' },
          { text: 'They\'re often unregulated, with no compensation if things go wrong' },
          { text: 'They\'re guaranteed by the FCA', why: 'They aren\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are the three letters of the UK\'s financial regulator?',
        answers: ['FCA', 'fca'],
        placeholder: 'Three letters',
      },
      {
        kind: 'mcq',
        prompt: 'What does the FCA\'s warning list contain?',
        options: [
          { text: 'Firms it knows are operating without permission or running scams' },
          { text: 'The best investments', why: 'It\'s a warning list.' },
          { text: 'Bank interest rates', why: 'It\'s warnings about firms.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who regulates investment firms where you live? Bookmark their site now, by typing it.',
    starters: ['The regulator is...', 'I\'ll bookmark...'],
  },
  deepen: {
    title: 'Compensation schemes',
    summary: 'In the UK, the Financial Services Compensation Scheme (FSCS) can protect some money if an authorised firm fails, up to limits. It usually doesn\'t cover unregulated or scam investments. Using authorised firms keeps those protections open.',
  },
  notes: 'FCA register, Warning List, ScamSmart: real FCA services. FSCS limits stated generally. Clone firm warnings: FCA guidance.',
};

export default lesson;
