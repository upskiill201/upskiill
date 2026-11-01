import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Card deck: where to report. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Where to report',
  summary: 'Reporting feels pointless when the money\'s gone. It isn\'t. Grace puts every reporting route on three cards for her session handout.',
  minutes: 10,
  outcomes: [
    'Know who to tell after a scam',
    'Report suspicious texts, emails and ads',
    'Understand why reporting matters even for small losses',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: money lost? Your bank first.</strong> Call the number on your card, or 159 in the UK. Then report to the national fraud reporting service. In England, Wales and Northern Ireland that has been Action Fraud; in Scotland, report to Police Scotland on 101. (Check the current service, as names can change.) If someone is in danger or a crime is happening now, call 999.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: suspicious messages.</strong> Forward scam texts to 7726 (free). Forward scam emails to report@phishing.gov.uk. Report scam ads, fake profiles and hacked accounts to the platform using its own report button. Report cold-call investment offers and clone firms to the financial regulator.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: why bother?</strong> Reports help police connect cases and catch gangs, help banks freeze mule accounts, help networks block numbers, and help platforms take down ads. Your £50 report might be the piece that stops someone else losing £50,000. And in the UK, reporting quickly to your bank matters for any reimbursement claim.</p>',
    },
    {
      kind: 'check',
      question: 'A scam text arrives but you didn\'t fall for it. What can you still do?',
      options: ['Forward it to 7726', 'Nothing; no harm done', 'Reply to the scammer'],
      answer: 0,
      explanation: 'It helps networks block the number before it reaches others.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Money lost: bank, then the national fraud report. Texts: 7726. Emails: report@phishing.gov.uk. Ads and accounts: the platform. Every report helps someone else.',
    },
  ],
  apply: {
    scenario: 'Reporting routes.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to where to report.',
        pairs: [
          ['Scam text', '7726'],
          ['Scam email', 'report@phishing.gov.uk'],
          ['Money sent to a scammer', 'Your bank first'],
          ['Fake ad on social media', 'The platform\'s report button'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why report even a small loss?',
        options: [
          { text: 'You\'ll definitely get it back', why: 'Not guaranteed, but it helps.' },
          { text: 'It helps connect cases, freeze mule accounts and protect others' },
          { text: 'It doesn\'t help', why: 'It helps a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Report it, or no point?',
        groups: ['Report it', 'No point'],
        items: [
          { text: 'A scam text you ignored', group: 0 },
          { text: 'A £50 shopping scam', group: 0 },
          { text: 'A fake celebrity ad', group: 0 },
          { text: 'A real message from your gran', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'What if someone\'s being pressured right now, like on the phone with a scammer?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Email the regulator.', why: 'Too slow for an emergency.' },
          { text: 'Wait until it\'s over.', why: 'Act quickly.' },
          { text: 'If a crime is happening now or someone\'s in danger, call 999. Otherwise, bank first, then report.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Texts and emails.',
        template: 'Forward scam texts to [[1]] and scam emails to report@[[2]].gov.uk.',
        blanks: [['7726'], ['phishing']],
        distractors: ['999', 'police'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Scotland, which non-emergency number do you call to report fraud to Police Scotland?',
        answers: ['101'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which belief stops people reporting?',
        lines: [
          'Reports help police connect cases.',
          'My report might protect someone else.',
          'It was only £50, so nobody will care.',
        ],
        bug: 2,
        fix: 'Small reports help build the bigger picture.',
        explanation: 'Gangs often take small amounts from many people.',
      },
      {
        kind: 'mcq',
        prompt: 'Where do you report a clone investment firm?',
        options: [
          { text: 'Your gym', why: 'The regulator.' },
          { text: 'The financial regulator' },
          { text: 'Nowhere', why: 'The regulator wants to know.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the reports after losing money.',
        lines: ['Call your bank', 'Report to the national fraud reporting service', 'Report to the platform where it started', 'Forward any scam texts to 7726'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does reporting quickly to your bank matter in the UK?',
        options: [
          { text: 'It doesn\'t', why: 'Speed matters.' },
          { text: 'Banks charge for late reports', why: 'It\'s about recovery.' },
          { text: 'It matters for any reimbursement claim and for stopping the money' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these reporting routes did you not know about? Save one in your phone now.',
    starters: ['I didn\'t know about...', 'I\'ve saved...'],
  },
  deepen: {
    title: 'Reporting outside the UK',
    summary: 'In India, the national cyber-fraud helpline is 1930. In Nigeria, banks, the police and the EFCC take reports. In Ghana, the Cyber Security Authority runs a reporting line. Find your country\'s route before you need it.',
  },
  notes: 'UK: Action Fraud (England, Wales, NI) — being replaced by a new national service; hedged "check the current service". Police Scotland 101. 7726 and report@phishing.gov.uk real. India 1930. Priya per CAST.',
};

export default lesson;
