import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: fraud risk and regulators. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Is it even real?',
  summary: 'The WhatsApp group now says it\'s "SEBI approved". Arjun asks Tey how to check, and what fraud risk looks like when the thing you\'re investing in might not exist.',
  minutes: 12,
  outcomes: [
    'Explain fraud risk',
    'Know how to check whether a provider is regulated',
    'Spot common fake-legitimacy tricks',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Fraud risk is different from the others. With market risk, the thing exists and its price moves. With fraud risk, the thing may not exist at all, or the people may simply take the money.', replies: ['They say they\'re "SEBI approved".'] },
        { tey: 'Then check it yourself. In India, SEBI keeps public lists of registered intermediaries and investment advisers on its own website. Search the exact name and registration number they give you. Don\'t use a link they send.', replies: ['What if they\'re not on it?'] },
        { tey: 'Then they\'re not regulated, whatever they say. Also watch for tricks: a real company\'s name with one letter changed, a registration number that belongs to someone else, or "we\'re registered abroad".', replies: ['Anything else?'] },
        { tey: 'Celebrity photos and screenshots of payouts prove nothing. They\'re easy to fake. Real providers explain where returns come from, show their fees, and never guarantee high returns.', replies: ['And deposits?'] },
        { tey: 'Banks and deposit-taking companies are regulated by the RBI, which also publishes lists. Wherever you are, the rule is the same: check the official regulator\'s own website, by typing the address yourself.', replies: ['So regulated means safe?'] },
        { tey: 'Regulated means someone is watching and there are rules and complaint routes. It doesn\'t mean you can\'t lose money in a market fall. It does make outright theft much less likely.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Check the regulator\'s own website, typed by you, for the exact name and number. Screenshots and celebrity photos prove nothing. Regulated isn\'t risk-free, but unregulated is a huge risk.',
    },
  ],
  apply: {
    scenario: '"SEBI approved".',
    items: [
      {
        kind: 'mcq',
        prompt: 'How is fraud risk different from market risk?',
        options: [
          { text: 'It\'s the same', why: 'Market risk is price moves; fraud is theft.' },
          { text: 'Fraud only affects banks', why: 'It affects investors.' },
          { text: 'With fraud, the investment may not exist or the money may simply be taken' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to check a "regulated" claim.',
        lines: ['Get their exact name and registration number', 'Type the regulator\'s website address yourself', 'Search the official list', 'If they\'re not there, walk away'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real proof, or easy to fake?',
        groups: ['Real proof', 'Easy to fake'],
        items: [
          { text: 'Listed on the regulator\'s own website', group: 0 },
          { text: 'Screenshots of payouts', group: 1 },
          { text: 'A celebrity photo', group: 1 },
          { text: 'Clear, published fees', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'They sent me a link to "check" their registration.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Don\'t use their link. Type the regulator\'s address yourself. Fake check pages are a common trick.' },
          { text: 'Great, click it.', why: 'Their link could be a fake site.' },
          { text: 'Ignore registration.', why: 'Registration matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Check the regulator\'s [[1]] website, typed by [[2]].',
        blanks: [['own', 'official'], ['you', 'yourself']],
        distractors: ['their', 'them'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each trick to what it is.',
        pairs: [
          ['One letter changed in a real name', 'A lookalike company'],
          ['A number that belongs to someone else', 'A borrowed registration'],
          ['"Registered abroad"', 'Avoiding local checks'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step lets the fraud through?',
        lines: [
          'Ask for the exact name and number.',
          'Search the official regulator list.',
          'Trust the certificate PDF they emailed.',
        ],
        bug: 2,
        fix: 'Only trust the regulator\'s own list.',
        explanation: 'PDF certificates are easy to forge.',
      },
      {
        kind: 'mcq',
        prompt: 'Does "regulated" mean you can\'t lose money?',
        options: [
          { text: 'Yes, never', why: 'Markets can still fall.' },
          { text: 'Regulation doesn\'t matter', why: 'It makes theft much less likely.' },
          { text: 'No: you can still lose in a fall, but theft is much less likely' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'In India, who regulates banks and deposit-taking companies?',
        options: [
          { text: 'The WhatsApp group admin', why: 'Definitely not.' },
          { text: 'The RBI' },
          { text: 'Nobody', why: 'The RBI does.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The group claims to be regulated. Where should Arjun check? (Name the regulator for investment advisers in India.)',
        answers: ['SEBI', 'sebi', 'the SEBI website', 'SEBI website'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Who regulates investments where you live? Have you ever checked a provider against their list?',
    starters: ['The regulator is...', 'I have / haven\'t checked...'],
  },
  deepen: {
    title: 'Regulators elsewhere',
    summary: 'Most countries have one: the SEC in Nigeria, Ghana and the US, the FCA in the UK, SEBI and the RBI in India. Many publish warning lists of known unauthorised firms too.',
  },
  notes: 'SEBI publishes registered intermediaries / RIA lists; RBI regulates banks and NBFCs. FCA Warning List exists. General guidance; no firms named.',
};

export default lesson;
