import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 16. Tap to explore: phrases that sound rude by accident — Noted., As per my last email, Please advise, Obviously, Thanks in advance. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Phrases that sound rude by accident',
  summary: 'Remi\'s email to Kestrel is polite in every word. Kestrel\'s reply: "Apologies if we\'ve upset you." Remi rereads it. Some phrases sound much colder in writing than in your head.',
  minutes: 12,
  outcomes: [
    'Spot the phrases that can sound cold or annoyed in writing',
    'Know softer swaps for each',
    'Read your message the way the other person will',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s email to Kestrel (as Kestrel read it)',
      text: 'Noted. As per my last email, the trial starts Monday. Obviously the routes are in the attachment. Please advise on your drivers ASAP. Thanks in advance.',
      hotspots: [
        { phrase: 'Noted.', note: 'One word with a full stop can read as "I heard you, and I\'m not pleased." Warmer: "Thanks, that\'s helpful." or "Got it, thank you."' },
        { phrase: 'As per my last email', note: 'Often read as "I already told you, why didn\'t you read it?" Softer: "Just to confirm," or simply repeat the information kindly.' },
        { phrase: 'Obviously', note: 'Suggests the reader should have known. Delete it. If it were obvious, you wouldn\'t need to say it.' },
        { phrase: 'Please advise', note: 'Common and fine in many offices, but can sound stiff or demanding on its own. Clearer: "Could you let me know..." plus what you need.' },
        { phrase: 'ASAP', note: 'Can feel like pressure with no real deadline. Give a time: "by Wednesday".' },
        { phrase: 'Thanks in advance', note: 'Polite in intent, but some readers hear "you have no choice". "Thanks so much" or "I\'d really appreciate it" lands softer.' },
      ],
    },
    {
      kind: 'compare',
      title: 'The same email, warmer',
      before: {
        label: 'Polite in Remi\'s head',
        text: 'Noted. As per my last email, the trial starts Monday. Obviously the routes are in the attachment. Please advise on your drivers ASAP. Thanks in advance.',
      },
      after: {
        label: 'Polite on the page',
        text: 'Thanks, that\'s helpful. Just to confirm, the trial starts Monday, and the routes are in the attachment. Could you let me know which drivers you\'ll use by Wednesday? Thanks so much.',
      },
      notes: [
        'Every fact is the same. Only the tone changed.',
        'Written words have no smile and no tone of voice. Add warmth on purpose.',
      ],
    },
  ],
  apply: {
    scenario: 'Friday, 9:15. Kestrel thinks Remi is angry.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each phrase to a warmer swap.',
        pairs: [
          ['Noted.', 'Thanks, that\'s helpful.'],
          ['As per my last email', 'Just to confirm,'],
          ['ASAP', 'by Wednesday'],
          ['Thanks in advance', 'Thanks so much'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can "Noted." sound cold?',
        options: [
          { text: 'One word and a full stop can read as "I heard you and I\'m not pleased"' },
          { text: 'It\'s grammatically wrong', why: 'It\'s fine grammatically. It\'s the tone.' },
          { text: 'It\'s a legal term', why: 'Not really. It\'s about tone.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s email to Felix. Which phrase will sting?',
        lines: [
          'Hi Felix,',
          'As per my last three emails, the printer is still broken.',
          'Could you take a look when you\'re back?',
        ],
        bug: 1,
        fix: 'Just following up: the printer is still broken.',
        explanation: '"As per my last three emails" reads as "why are you ignoring me?" A neutral follow-up gets a faster fix.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Warm, or can sound cold?',
        groups: ['Warm', 'Can sound cold'],
        items: [
          { text: 'Got it, thank you!', group: 0 },
          { text: 'Noted.', group: 1 },
          { text: 'Obviously...', group: 1 },
          { text: 'Could you let me know by Wednesday?', group: 0 },
          { text: 'As per my last email...', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Why would "obviously" be rude?? It IS obvious.',
        prompt: 'What does Remi say?',
        options: [
          { text: 'You\'re right, use it more.', why: 'It makes readers feel slow.' },
          { text: 'It suggests they should have known. If it were obvious, you wouldn\'t need to say it.' },
          { text: 'It\'s a swear word.', why: 'It isn\'t, but it can sting.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Swap for "As per my last email": "Just to ___," (one word)',
        answers: ['confirm', 'clarify', 'recap'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does writing need more warmth than speaking?',
        options: [
          { text: 'Written words have no smile or tone of voice, so readers fill in the gap' },
          { text: 'People read more slowly', why: 'Speed isn\'t the issue.' },
          { text: 'Email is a formal medium', why: 'Not always. It\'s about missing tone.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['May I ask who\'s calling?', 'Polite phone question'],
          ['Open question', 'Can\'t be answered yes or no'],
          ['Register', 'How formal your language is'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Warm up Remi\'s line.',
        template: '[[1]], that\'s helpful. Could you let me [[2]] which drivers you\'ll use by [[3]]?',
        blanks: [['Thanks'], ['know'], ['Wednesday']],
        distractors: ['Noted', 'ASAP'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a warm reply to a colleague\'s update.',
        tiles: ['Got', 'it,', 'thank', 'you!'],
        distractors: ['Noted.', 'Obviously'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever received a message that felt cold, and later realised the person didn\'t mean it? Which phrase was it?',
    starters: ['The message said...', 'I think they meant...'],
  },
  deepen: {
    title: 'Read it as them',
    summary: 'Before sending anything important, read it once as the other person, on a bad day. Any phrase that stings? Warm it up.',
  },
  notes: 'Tone perception of "Noted.", "As per my last email", "Thanks in advance", "Please advise" — widely discussed in workplace-communication surveys and commentary; lesson says "can sound" and notes "please advise" is common and fine in many offices.',
};

export default lesson;
