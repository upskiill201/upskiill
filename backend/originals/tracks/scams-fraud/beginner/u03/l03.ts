import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Reading: phishing, smishing, vishing. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Phishing, smishing, vishing',
  summary: 'Femi laughs at the names, then admits he can\'t tell a fake delivery text from a real one. Here\'s how fake emails, texts and calls work, and the tells that give them away.',
  minutes: 12,
  outcomes: [
    'Explain phishing, smishing and vishing',
    'Spot lookalike addresses and links',
    'Know what to do with a suspicious message',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Fishing for your details',
      html: '<p><strong>Phishing</strong> is a fake email pretending to be a trusted organisation, trying to get you to click a link, open an attachment, or give details. <strong>Smishing</strong> is the same by text (SMS). <strong>Vishing</strong> is by voice call.</p><p><strong>What they want:</strong> your login, card details, one-time codes, or to install something on your device. Often the link leads to a page that looks exactly like your bank, a delivery firm or a government site.</p><p><strong>The tells:</strong></p><ul><li><strong>Lookalike addresses:</strong> a sender or link with a tiny change: an extra letter, a hyphen, a different ending. If a delivery firm\'s real site is "parcelco.co.uk", then "parcelco-redelivery-uk.com" is not it.</li><li><strong>Generic greetings:</strong> "Dear customer". Though some use your real name from leaked data.</li><li><strong>Urgency:</strong> "Your account will be suspended in 24 hours." "Your parcel will be returned."</li><li><strong>Small payments:</strong> "Pay £1.45 to rebook delivery." The small amount is bait to get your full card details.</li><li><strong>Links where you don\'t expect them:</strong> a genuine organisation can send texts, but you never need to use their link; go to their site or app yourself.</li></ul><p><strong>The safe habit:</strong> don\'t click links in unexpected messages. Open the app or type the website yourself. If the message was real, the same information will be there.</p><p><strong>Reporting in the UK:</strong> forward scam texts to 7726 (free), and scam emails to report@phishing.gov.uk.</p>',
    },
    {
      kind: 'check',
      question: 'A text says your parcel is held: "Pay £1.45 at [link]". What\'s the safe move?',
      options: ['Pay £1.45, it\'s tiny', 'Don\'t click; check the delivery firm\'s site or app yourself', 'Reply STOP'],
      answer: 1,
      explanation: 'The small fee is bait for your full card details.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t click links in unexpected messages. Open the app or type the site yourself. Forward scam texts to 7726 and emails to report@phishing.gov.uk.',
    },
  ],
  apply: {
    scenario: 'Phishing, smishing, vishing.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its channel.',
        pairs: [
          ['Phishing', 'Email'],
          ['Smishing', 'Text message'],
          ['Vishing', 'Voice call'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tell-tale sign, or not a sign?',
        groups: ['Tell-tale sign', 'Not a sign'],
        items: [
          { text: 'A lookalike web address', group: 0 },
          { text: 'You typed the site yourself', group: 1 },
          { text: '"Pay £1.45 to rebook"', group: 0 },
          { text: '"Suspended in 24 hours"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for a tiny payment like £1.45?',
        options: [
          { text: 'Because postage is cheap', why: 'It\'s bait.' },
          { text: 'To test your bank', why: 'To capture card details.' },
          { text: 'To get your full card details, which can then be used for much more' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'The text had my real name in it though.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Names leak all the time. The safe move is the same: go to the app yourself.' },
          { text: 'Then it\'s real.', why: 'Names come from leaks.' },
          { text: 'Click carefully.', why: 'Don\'t click at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The safe habit.',
        template: 'Open the [[1]] or type the [[2]] yourself.',
        blanks: [['app'], ['website', 'site']],
        distractors: ['link', 'attachment'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the UK, what number do you forward scam texts to?',
        answers: ['7726'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which web address is NOT a lookalike? (Imagine the real firm is "parcelco.co.uk".)',
        lines: [
          'parcelco-redelivery.com',
          'parce1co.co.uk',
          'parcelco.co.uk',
        ],
        bug: 2,
        fix: 'Only the exact real address is genuine.',
        explanation: 'The first adds words; the second swaps "l" for "1".',
      },
      {
        kind: 'mcq',
        prompt: 'A genuine organisation texts you. Do you need to use its link?',
        options: [
          { text: 'Yes, always', why: 'Going direct is safer.' },
          { text: 'Only if it\'s urgent', why: 'Urgent is a warning sign.' },
          { text: 'No: you can always go to its app or site yourself' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do with a suspicious text.',
        lines: ['Don\'t click', 'Check via the official app or site', 'Forward it to 7726', 'Delete it'],
      },
      {
        kind: 'mcq',
        prompt: 'What do phishing pages usually try to collect?',
        options: [
          { text: 'Your favourite colour', why: 'Logins and card details.' },
          { text: 'Logins, card details and one-time codes' },
          { text: 'Nothing', why: 'They harvest details.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last delivery or bank text you received. Would you have spotted it if it were fake?',
    starters: ['The text said...', 'I\'d spot it by...'],
  },
  deepen: {
    title: 'Hover before you click',
    summary: 'On a computer, hovering over a link shows where it really goes. The words in a link can say anything; the address underneath is what counts. On phones, press and hold to preview.',
  },
  notes: '7726 and report@phishing.gov.uk (NCSC Suspicious Email Reporting Service) are real UK services. Example domains fictional (parcelco). Femi per CAST.',
};

export default lesson;
