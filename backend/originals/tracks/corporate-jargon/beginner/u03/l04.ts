import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Chat with Tey: say it or spell it? Acronyms vs initialisms, and how to say the common ones out loud. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Say it or spell it?',
  summary: 'In the stand-up, Remi says "the K-P-I deck". Zanele says "the kippy deck". Felix says "ASAP" like a word, "ay-sap". Who\'s right? How do you say these things out loud?',
  minutes: 11,
  outcomes: [
    'Know the difference between saying an acronym as a word and spelling it out',
    'Say the common business acronyms the way most people do',
    'Stop worrying about it when you\'re not sure',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Tuesday stand-up. Zanele: \"I'm finishing the kippy deck.\" Silence. Brian, from home on the screen: \"The... what?\" Zanele: \"K. P. I. Kippy.\" So, Remi, how do you say KPI?",
          replies: ['K-P-I, letter by letter?', 'Kippy, obviously.'],
        },
        {
          tey: "Most people spell it: K-P-I. Here's the rule of thumb. Some short forms are said as a WORD, some are spelled out letter by letter. Strictly speaking, only the word ones are acronyms; the letter ones are called initialisms. Most people call them all acronyms, and that's fine.",
          replies: ['Which ones are words?'],
        },
        {
          tey: "Usually the ones you CAN say easily. NATO, NASA, SIM card, PIN number. At work: \"SaaS\" is often said \"sass\". \"ASAP\" can be either: \"A-S-A-P\" or \"ay-sap\", both are normal.",
          replies: ['And the spelled ones?'],
        },
        {
          tey: "The ones that don't make a word: CEO, KPI, HR, FYI, ETA, OOO, EOD. You'd never say \"fee\" for FYI. Try it. Exactly. Strange.",
          replies: ['What if I don\'t know how to say one?'],
        },
        {
          tey: "Spell it out. Spelling an acronym that's usually said as a word never sounds wrong: it just sounds careful. Saying a spelled one as a word, like \"kippy\", is what makes people blink. Then listen to how others say it, and copy them.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not sure? Spell it out, letter by letter. It\'s never wrong, and next time you\'ll have heard someone else say it.',
    },
  ],
  apply: {
    scenario: 'Tuesday stand-up. The kippy incident.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Usually said as a word, or spelled out?',
        groups: ['Said as a word', 'Spelled out'],
        items: [
          { text: 'NASA', group: 0 },
          { text: 'CEO', group: 1 },
          { text: 'KPI', group: 1 },
          { text: 'PIN', group: 0 },
          { text: 'HR', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do most people say "KPI"?',
        options: [
          { text: '"Kippy"', why: 'Zanele\'s version. Most people spell it.' },
          { text: '"K-P-I"' },
          { text: '"Key-pie"', why: 'Creative. Not common.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Remi isn\'t sure how to say "SLA" out loud. What\'s the safe choice?',
        options: [
          { text: 'Spell it: S-L-A' },
          { text: 'Say "slah"', why: 'If it\'s usually spelled, this will make people blink.' },
          { text: 'Avoid ever saying it', why: 'Spelling it out is always safe.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Was "kippy" really that bad?? Brian\'s face...',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Terrible. Everyone will remember it forever.', why: 'Tease the situation, not the person.' },
          { text: 'Most people spell it, K-P-I. But honestly, it was funny. Brian smiled after.' },
          { text: 'No, "kippy" is correct.', why: 'Kind, but she\'ll say it to the CEO next.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Strictly, a short form spelled letter by letter (like CEO) is called an ... (one word)',
        answers: ['initialism'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match how each is usually said.',
        pairs: [
          ['FYI', '"F-Y-I"'],
          ['SaaS', '"sass"'],
          ['ASAP', '"A-S-A-P" or "ay-sap"'],
          ['ETA', '"E-T-A"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s pronunciation notes. Which one will make people blink?',
        lines: [
          'CEO: C-E-O.',
          'FYI: "fee".',
          'HR: H-R.',
        ],
        bug: 1,
        fix: 'FYI: F-Y-I.',
        explanation: 'FYI is always spelled out. "Fee" is a payment.',
      },
      {
        kind: 'mcq',
        prompt: 'Is it wrong to call CEO an "acronym"?',
        options: [
          { text: 'Yes, you\'ll be corrected', why: 'Almost nobody minds.' },
          { text: 'It\'s an illegal word', why: 'Ha. No.' },
          { text: 'Strictly it\'s an initialism, but most people call them all acronyms, and that\'s fine' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['OOO', 'Out of office'],
          ['TBC', 'To be confirmed'],
          ['BCC', 'Hidden copy'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Zanele\'s fixed stand-up line.',
        tiles: ['I\'m', 'finishing', 'the', 'K-P-I', 'deck', 'today.'],
        distractors: ['kippy'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there an acronym you\'ve been saying (or avoiding) because you weren\'t sure how to pronounce it? How will you say it now?',
    starters: ['The one I wasn\'t sure about is...', 'Now I\'ll say...'],
  },
  deepen: {
    title: 'Listen and copy',
    summary: 'In your next meeting, podcast or video about your field, listen for acronyms said out loud. Write down how people actually say them. Your workplace might have its own habits.',
  },
  notes: 'Acronym vs initialism (Merriam-Webster usage note: many people use "acronym" for both). KPI, CEO, FYI, HR typically spelled; NASA, NATO, PIN said as words; SaaS commonly "sass"; ASAP both. Pronunciations described as "usually"/"most people".',
};

export default lesson;
