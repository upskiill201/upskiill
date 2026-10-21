import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 11 — scams that use AI. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Scams that use AI',
  summary: 'Scammers use AI too: perfect-English phishing, cloned voices, fake video calls. Ada learns the real cases, and the one habit that beats most of them.',
  minutes: 12,
  outcomes: [
    'Know how scammers use AI',
    'Know a real case where a deepfake call cost millions',
    'Verify unusual requests through a second channel',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'How scammers use AI',
      html:
        '<ul>' +
        '<li><strong>Polished phishing:</strong> emails with no spelling mistakes, written in the style of your company. "Bad grammar" is no longer a reliable warning sign.</li>' +
        '<li><strong>Voice cloning:</strong> a few seconds of someone\'s voice from a video can be enough to fake a call or voice note.</li>' +
        '<li><strong>Deepfake video calls:</strong> in early 2024, a finance worker at the engineering firm Arup in Hong Kong paid out about US$25 million after a video call where the "CFO" and colleagues were all deepfakes.</li>' +
        '</ul>' +
        '<h3>The habit that beats most of them</h3>' +
        '<p>For any unusual or urgent request involving money, passwords or data: <strong>verify through a second channel you already know</strong>. Call the person on their known number, or ask in person. Never use contact details from the suspicious message itself.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Urgent request for money, passwords or data? Verify on a second channel you already know, even if it looks or sounds exactly like the person.',
    },
  ],
  apply: {
    scenario: 'Ada learns how AI scams work.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened at Arup in Hong Kong in 2024?',
        options: [
          { text: 'A worker paid about US$25 million after a deepfake video call' },
          { text: 'A phishing email asked for a password', why: 'It was a deepfake video call.' },
          { text: 'Nothing was lost', why: 'About US$25 million was paid.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reliable warning sign, or no longer reliable?',
        groups: ['Still a warning sign', 'No longer reliable'],
        items: [
          { text: 'Urgent pressure to pay now', group: 0 },
          { text: 'Bad spelling', group: 1 },
          { text: 'A request to keep it secret', group: 0 },
          { text: '"It sounded just like him"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I just got a voice note from "Carmen" asking me to send her the agency\'s bank details urgently. Sounds exactly like her.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Call Carmen on her usual number before doing anything. Voices can be cloned now.' },
          { text: 'If it sounds like her, it\'s her.', why: 'Voices can be faked.' },
          { text: 'Reply to the voice note to check.', why: 'Use a channel you already know.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the habit.',
        template: 'Verify on a [[1]] channel you already [[2]].',
        blanks: [['second'], ['know']],
        distractors: ['random', 'received'],
      },
      {
        kind: 'findBug',
        prompt: 'Which verification step is wrong?',
        lines: [
          'Notice the request is unusual',
          'Pause before acting',
          'Call the number given in the suspicious message',
          'Confirm on the person\'s known number',
        ],
        bug: 2,
        fix: 'Delete it; use only contact details you already have.',
        explanation: 'Scammers control the details in their own message.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the scam to how it works.',
        pairs: [
          ['Polished phishing', 'Perfect emails in your company\'s style'],
          ['Voice cloning', 'A fake voice from seconds of audio'],
          ['Deepfake video', 'Fake faces on a live call'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many US dollars did Arup lose? (in millions)',
        answers: ['25', '25 million', '$25 million'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is bad grammar no longer a reliable scam sign?',
        options: [
          { text: 'AI writes polished text for scammers too' },
          { text: 'Scammers took writing classes', why: 'AI writes for them.' },
          { text: 'It never was', why: 'It used to help; less so now.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the habit.',
        tiles: ['Call', 'back', 'on', 'a', 'number', 'you', 'know'],
        distractors: ['their'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Verify first, or fine to act?',
        groups: ['Verify first', 'Fine'],
        items: [
          { text: 'Urgent request to change bank details', group: 0 },
          { text: 'A calendar invite for the usual Monday call', group: 1 },
          { text: '"Send me the customer list tonight"', group: 0 },
          { text: 'A colleague sharing a public article', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s response to a suspicious request.',
        lines: ['Pause', 'Don\'t use the message\'s contact details', 'Call on a known number', 'Report it if it\'s fake'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does pressure ("do it now, tell no one") matter?',
        options: [
          { text: 'Scammers use urgency and secrecy to stop you checking' },
          { text: 'Real bosses always do this', why: 'It\'s a classic scam tactic.' },
          { text: 'It doesn\'t matter', why: 'It\'s a key warning sign.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What unusual request at work would you now verify? Whose known number would you call?',
    starters: ['I\'d verify...', 'I\'d call...'],
  },
  deepen: { title: 'Try it today', summary: 'Agree a simple check with your team: any urgent money or data request is confirmed by a call on a known number.' },
  notes: 'Arup deepfake fraud, Hong Kong, reported February 2024: about HK$200 million (US$25 million). Voice cloning scams are widely reported by law enforcement.',
};

export default lesson;
