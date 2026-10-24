import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: the scam file v5 (the handout). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The scam file v5: the handout',
  summary: 'Grace turns twelve cases into one page for the whole company. It\'s the document she wishes someone had handed her before "Hi Mum". Tap through version 5.',
  minutes: 11,
  outcomes: [
    'Read a complete personal anti-scam checklist',
    'See how the whole course fits on one page',
    'Make your own one-page version',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s scam file v5',
      text: 'THE RECIPE: urgency, authority, emotion, secrecy. Spot one, slow down. THE PAUSE: stop, challenge, protect. THE ONE CHECK: use my own channel, never theirs. NEVER: share codes, PINs or passwords. Move money to a "safe account". Pay to withdraw. Let money pass through my account. Pay strangers by bank transfer. Pay "recovery" firms. ALWAYS: unique passwords via a manager, three random words. 2SV on email, banking, social. Updates on. Family safe word. IF IT HAPPENS: stop, call the bank (159), secure accounts, save evidence, report, tell someone. FORWARD: texts to 7726, emails to report@phishing.gov.uk. REMEMBER: it\'s a crime done to you. Talk about it.',
      hotspots: [
        { phrase: 'urgency, authority, emotion, secrecy', note: 'Chapter 1: the recipe behind case 1, "Hi Mum", and almost every case since.' },
        { phrase: 'use my own channel, never theirs', note: 'The rule that stopped seven of the twelve cases.' },
        { phrase: 'Pay to withdraw', note: 'Chapter 2: Femi\'s £400 "tax release fee".' },
        { phrase: 'Move money to a "safe account"', note: 'Chapter 3: the call Grace hung up on.' },
        { phrase: 'Let money pass through my account', note: 'Chapter 4: Jayden\'s rule, now company policy too.' },
        { phrase: 'stop, call the bank (159), secure accounts, save evidence, report, tell someone', note: 'Chapter 5: the first hour, in one line.' },
        { phrase: 'it\'s a crime done to you', note: 'The line Maureen asked Grace to put in bold.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The whole course on one page: the recipe, the pause, the one check, six nevers, five always, the first hour, and "it\'s a crime done to you".',
    },
  ],
  apply: {
    scenario: 'Reading the handout.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each section to its chapter.',
        pairs: [
          ['The recipe', 'Chapter 1'],
          ['Never pay to withdraw', 'Chapter 2'],
          ['No "safe account"', 'Chapter 3'],
          ['Never let money pass through', 'Chapter 4'],
          ['If it happens', 'Chapter 5'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A "never" or an "always"?',
        groups: ['Never', 'Always'],
        items: [
          { text: 'Share one-time codes', group: 0 },
          { text: 'Unique passwords via a manager', group: 1 },
          { text: 'Pay "recovery" firms', group: 0 },
          { text: '2SV on email and banking', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which rule stopped the most cases?',
        options: [
          { text: 'Use my own channel, never theirs' },
          { text: 'Antivirus', why: 'The own-channel rule.' },
          { text: 'Ignoring all messages', why: 'The own-channel rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Can we put this in every new starter\'s welcome pack?',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'No, it\'s private.', why: 'It\'s meant to be shared.' },
          { text: 'Only for managers.', why: 'Everyone needs it.' },
          { text: 'Yes, and let\'s run the session every quarter. Scams change; the page gets updated.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The bold line.',
        template: 'It\'s a [[1]] done to you. [[2]] about it.',
        blanks: [['crime'], ['Talk', 'talk']],
        distractors: ['mistake', 'Forget'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many cases did Grace\'s file have by the end?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong on the handout?',
        lines: [
          'Never share codes, PINs or passwords.',
          'Forward scam texts to 7726.',
          'Trust caller ID from your bank\'s number.',
        ],
        bug: 2,
        fix: 'Caller ID can be faked; use your own channel.',
        explanation: 'Spoofing makes caller ID unreliable.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the handout say "spot one, slow down"?',
        options: [
          { text: 'You need all four before worrying', why: 'One is enough.' },
          { text: 'Even one ingredient is enough reason to pause and check' },
          { text: 'To slow your phone down', why: 'To slow your decision.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order all five versions of the file.',
        lines: ['v1: "Hi Mum"', 'v2: investment scams', 'v3: impersonation', 'v4: scams aimed at us', 'v5: the handout'],
      },
      {
        kind: 'mcq',
        prompt: 'Who asked for "it\'s a crime done to you" in bold?',
        options: [
          { text: 'Maureen' },
          { text: 'Callum', why: 'Maureen.' },
          { text: 'Femi', why: 'Maureen.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Make your own one-page handout. What are your three "nevers" and three "always"?',
    starters: ['Never:...', 'Always:...'],
  },
  deepen: {
    title: 'Share the page',
    summary: 'A one-page checklist on the fridge, in a family group or at work reaches people who\'ll never take a course. It\'s one of the most useful things you can make.',
  },
  notes: 'Scam file v5 (fictional). Priya per CAST; Maureen narrated.',
};

export default lesson;
