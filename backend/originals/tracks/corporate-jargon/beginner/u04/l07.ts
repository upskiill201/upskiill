import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Tap to explore: swap these words — gonna, wanna, yeah, stuff, kinda, tho, tmrw, lemme. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Swap these words: gonna, yeah, stuff, kinda',
  summary: 'Remi\'s team-chat update is about to be forwarded to the CFO. It was written for Zanele. Eight little words need swapping before it goes up.',
  minutes: 11,
  outcomes: [
    'Spot the casual words that slip into work messages',
    'Swap each for its neutral version',
    'Know where casual words are still fine',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s team-chat update, about to be forwarded',
      text: 'yeah so I\'m gonna finish the tracker stuff tmrw, kinda stuck on the data thing tho. lemme know if u wanna see it',
      hotspots: [
        { phrase: 'yeah', note: 'Casual "yes". In a neutral message, start with the point instead: "I\'ll finish..."' },
        { phrase: 'gonna', note: 'Casual for "going to". Neutral: "I\'m going to" or simply "I\'ll".' },
        { phrase: 'stuff', note: 'Vague. Name the thing: "the tracker", "the delivery data".' },
        { phrase: 'tmrw', note: 'Text shorthand for "tomorrow". Write the word, or better, the day: "on Thursday".' },
        { phrase: 'kinda', note: 'Casual for "kind of". Neutral: "a bit", "slightly", or say exactly what\'s wrong.' },
        { phrase: 'tho', note: 'Text spelling of "though". Neutral: "but" or "however".' },
        { phrase: 'lemme', note: 'Casual for "let me". Neutral: "Let me know".' },
        { phrase: 'wanna', note: 'Casual for "want to". Neutral: "would like to" or "want to".' },
      ],
    },
    {
      kind: 'compare',
      title: 'The version for the CFO',
      before: {
        label: 'For Zanele',
        text: 'yeah so I\'m gonna finish the tracker stuff tmrw, kinda stuck on the data thing tho. lemme know if u wanna see it',
      },
      after: {
        label: 'For anyone',
        text: 'I\'ll finish the delivery tracker on Thursday. I\'m stuck on one thing: the Lagos data arrives a day late. Let me know if you\'d like to see it.',
      },
      notes: [
        'Every casual word is swapped, but it still sounds human, not robotic.',
        '"Stuff" and "the data thing" became the actual names of things.',
        '"tmrw" became a day, which is clearer than "tomorrow" anyway.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Anything you write at work can be forwarded. Write team chats so you wouldn\'t mind the CFO reading them, and keep the really casual stuff for friends.',
    },
  ],
  apply: {
    scenario: 'Tuesday, 2:00. Brian: "Can I forward your update to the CFO?"',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Swap each casual word for its neutral version.',
        pairs: [
          ['gonna', 'going to / I\'ll'],
          ['wanna', 'would like to'],
          ['kinda', 'a bit'],
          ['tho', 'but / however'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best swap for "the tracker stuff"?',
        options: [
          { text: 'the delivery tracker' },
          { text: 'the tracker things', why: 'Still vague.' },
          { text: 'the tracker materials', why: 'More formal, still vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s update for Finance. Which line still needs swapping?',
        lines: [
          'I\'ve updated the courier costs.',
          'October is about 15% higher than September.',
          'Gonna send the full breakdown tmrw.',
        ],
        bug: 2,
        fix: 'I\'ll send the full breakdown on Wednesday.',
        explanation: '"Gonna" and "tmrw" slipped through. And a day is clearer than "tomorrow".',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine as it is, or swap it?',
        groups: ['Fine for any reader', 'Swap it'],
        items: [
          { text: 'Let me know', group: 0 },
          { text: 'lemme know', group: 1 },
          { text: 'I\'ll send it on Thursday', group: 0 },
          { text: 'gonna send it tmrw', group: 1 },
          { text: 'I\'m a bit stuck', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Can I forward your chat update to the CFO?',
        prompt: 'What should Remi do first?',
        options: [
          { text: 'Sure, forward it!', why: 'It was written for Zanele. Rewrite first.' },
          { text: 'Give me five minutes, I\'ll send you a cleaner version for her.' },
          { text: 'No, never forward my messages.', why: 'Forwarding is normal. Just make it ready.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Neutral version of "yeah": ... (one word)',
        answers: ['yes'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Is "gonna" ever okay at work?',
        options: [
          { text: 'No, it\'s always wrong', why: 'People say it out loud all the time, at every level.' },
          { text: 'Only in emails to the CEO', why: 'That\'s the one place to avoid it.' },
          { text: 'Yes: in casual chats with close teammates, and in speech' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Perhaps we could...', 'A gentle suggestion'],
          ['Kind regards', 'Polite sign-off'],
          ['Scope creep', 'A project growing beyond the plan'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Rewrite Remi\'s update.',
        template: 'I\'ll finish the delivery tracker on [[1]]. I\'m [[2]] on one thing. [[3]] me know if you\'d like to see it.',
        blanks: [['Thursday'], ['stuck'], ['Let']],
        distractors: ['tmrw', 'lemme', 'kinda'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Rewrite "wanna see it?" for the CFO.',
        tiles: ['Would', 'you', 'like', 'to', 'see', 'it?'],
        distractors: ['wanna', 'u'],
      },
    ],
  },
  reflect: {
    prompt: 'Which casual words slip into YOUR work or school messages most? Pick two and write their neutral swaps.',
    starters: ['I often write...', 'From now on: ...'],
  },
  deepen: {
    title: 'The forward test',
    summary: 'Before you send a work message, ask: would I be fine if this were forwarded to the most senior person here? If not, swap the casual words.',
  },
  notes: 'Informal spellings (gonna, wanna, kinda, lemme, tho, tmrw) and neutral equivalents — Cambridge/Merriam-Webster informal labels. Contractions (I\'ll, I\'m) retained as acceptable in neutral register.',
};

export default lesson;
