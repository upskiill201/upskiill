import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Tap to explore: remembering people — Grace's contact notes and the "how did it go?" callback. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Remembering people',
  summary: 'Femi remembers everything: your dog\'s name, your sister\'s exam, the thing you were nervous about on Tuesday. Grace assumed he had a superpower. He has a notes app.',
  minutes: 11,
  outcomes: [
    'Keep simple notes so you remember what matters to people',
    'Use the "how did it go?" callback',
    'Make people feel remembered, without being creepy',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Femi\'s notes app (shared with permission)',
      text: 'Joy (reception): daughter starting uni in Leeds in Sept. Mr Okonkwo: Arsenal fan, tease gently on Mondays. Aisha: pottery class Thursdays; mum was in hospital, ask how she is. Ravi: moved from Leicester, job interview at a health-tech firm Friday. Grace: once asked me about my pain levels.',
      hotspots: [
        { phrase: 'daughter starting uni in Leeds', note: 'A big life event. In September, "Has your daughter settled in Leeds?" will mean a lot to Joy.' },
        { phrase: 'Arsenal fan', note: 'A safe, easy topic. Monday morning small talk sorted for the year.' },
        { phrase: 'tease gently on Mondays', note: 'Femi only teases people he knows well, and gently. Strangers don\'t get teased.' },
        { phrase: 'mum was in hospital, ask how she is', note: 'The most important kind of note. Remembering someone\'s hard week is a real kindness.' },
        { phrase: 'job interview at a health-tech firm Friday', note: 'A perfect callback: on Monday, "How did the interview go?" People rarely forget who asked.' },
        { phrase: 'once asked me about my pain levels', note: 'Some details are just for fun.' },
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>The callback:</strong> the single most powerful small-talk move there is. \"How did the interview go?\" \"Is your mum home yet?\" \"Did the pottery bowl survive the kiln?\" It says: <em>I listened, and I remembered.</em></p><p><strong>How to remember:</strong> a quick note on your phone after a conversation. Name, one or two details, anything coming up. Ten seconds.</p><p><strong>Not creepy:</strong> only note things people chose to tell you, keep them private, and don't recite them like a file. \"You mentioned an interview, how did it go?\" is warm. \"On the 14th at 2:15 you said...\" is alarming.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'After a conversation: name + one or two details + anything coming up. Next time, ask "How did it go?"',
    },
  ],
  apply: {
    scenario: 'Monday. Femi\'s secret.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s Femi\'s "superpower"?',
        options: [
          { text: 'He keeps short notes and asks about them later' },
          { text: 'A photographic memory', why: 'Just a notes app.' },
          { text: 'He reads everyone\'s emails', why: 'Absolutely not.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good to note, or not okay?',
        groups: ['Good to note', 'Not okay'],
        items: [
          { text: 'Something they chose to tell you', group: 0 },
          { text: 'Details you found by searching their private life', group: 1 },
          { text: 'An upcoming interview they mentioned', group: 0 },
          { text: 'Gossip someone told you about them', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Monday. Ravi walks into the café.)',
        prompt: 'Grace remembers his interview on Friday. Best callback?',
        options: [
          { text: 'Hi.', why: 'She knows about the interview!' },
          { text: 'Ravi! How did Friday\'s interview go?' },
          { text: 'On Thursday at 7:42 p.m. you told me about an interview...', why: 'Too precise. Alarming.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The question that shows you remembered: "How did it ___?" (one word)',
        answers: ['go'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What should a quick contact note include?',
        options: [
          { text: 'Their full life history', why: 'Ten seconds, not ten minutes.' },
          { text: 'Their salary', why: 'Not something to note.' },
          { text: 'Name, one or two details, anything coming up' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s notes on new contacts. Which line shouldn\'t be there?',
        lines: [
          'Chloe: designer, patient app launching in March.',
          'Gerald: kitchen extension, pipes in the wrong wall.',
          'Dr Reid: found her home address online, nice house.',
        ],
        bug: 2,
        fix: 'Dr Reid: Salford Royal, outpatients, liked the app.',
        explanation: 'Only note what people chose to share with you. Searching for private details crosses a line.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the note to the callback.',
        pairs: [
          ['Daughter starting uni', '"Has she settled in Leeds?"'],
          ['Mum in hospital', '"How\'s your mum doing?"'],
          ['Pottery class', '"Did the bowl survive the kiln?"'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['5-second recovery', 'Acknowledge, apologise once, move on'],
          ['Punch up, not down', 'Safe humour'],
          ['Moment, problem, turn, point', 'A 30-second story'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s note after meeting Chloe.',
        template: 'Chloe: [[1]], patient app launching in [[2]].',
        blanks: [['designer'], ['March']],
        distractors: ['salary', 'address'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a callback.',
        tiles: ['How', 'did', 'the', 'interview', 'go?'],
        distractors: ['address', 'salary'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of three people you talked to this week. Write a short note for each: name, one detail, anything coming up.',
    starters: ['1. ...', '2. ...', '3. ...'],
  },
  deepen: {
    title: 'Start a people note',
    summary: 'Create a note on your phone called "People". After any good conversation, add one line. In a month, you\'ll have callbacks for everyone, and people will think you have a superpower too.',
  },
  notes: 'Callback/remembering details is practical relationship advice; consistent with responsiveness (feeling understood and cared for) as a driver of liking (Huang et al. 2017). Privacy caution included.',
};

export default lesson;
