import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Card deck: making others shine (preparing people to present; multipliers). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Make them shine',
  summary: 'Wednesday. Njeri has never presented to a CEO. Emeka will be on video from Lagos. Wanjiku is terrified of saying one number wrong. Remi\'s new job this week: make five people look as good as they deserve to. Tey deals the cards.',
  minutes: 11,
  outcomes: [
    'Help others present their work with confidence',
    'Set people up to succeed, not just give them a slot',
    'Stay in the background without disappearing',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Giving someone the stage is generous. Setting them up to <strong>succeed</strong> on it is leadership. Liz Wiseman calls leaders who do this <strong>multipliers</strong>: they make other people smarter and more capable, so the team can do more than the leader could alone. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Ask what they want to say</h3><p>Not \"here's your script\". Instead: \"What's the one thing you want Kamau to know about your fix?\" Njeri: \"That the warehouse knew all along.\"</p><h3>Card 2: Give them one slide, one number</h3><p>Two minutes, one slide, one number. Easy to prepare, hard to get wrong.</p><h3>Card 3: Rehearse, privately</h3><p>A ten-minute run-through, just the two of them. Not to correct, but to build confidence. \"That bit about the boxes. Say it exactly like that.\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Handle the hard questions for them</h3><p>Agree in advance: \"If Kamau asks something you don't know, look at me and I'll take it.\" A safety net makes people braver.</p><h3>Card 5: Fix the remote person's setup</h3><p>Test Emeka's video the day before. Make sure he's unmuted. Introduce him properly: \"Emeka joins from Lagos, where six of the 21 days were.\"</p><h3>Card 6: Introduce them with credit</h3><p>Your handover is a gift: \"Njeri found a third of the problem, and nobody in head office knew it. Njeri.\" Then step aside.</p>",
    },
    {
      kind: 'check',
      question: 'What makes people braver when they present?',
      options: ['A safety net: "look at me and I\'ll take it"', 'A longer script', 'Being told not to worry'],
      answer: 0,
      explanation: 'Knowing someone has their back on hard questions.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask what they want to say. One slide, one number. Rehearse privately. Offer a safety net. Fix the remote setup. Introduce them with credit.',
    },
  ],
  apply: {
    scenario: 'Preparing the five.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a multiplier leader do?',
        options: [
          { text: 'Does everyone\'s presentation for them', why: 'That\'s the hero.' },
          { text: 'Makes others more capable, so the team does more than the leader alone' },
          { text: 'Takes the hardest part on stage', why: 'Remi ties it together. The owners shine.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sets them up, or just gives them a slot?',
        groups: ['Sets them up', 'Just a slot'],
        items: [
          { text: 'A private 10-minute rehearsal', group: 0 },
          { text: '"You\'re on at 3:05."', group: 1 },
          { text: '"Look at me and I\'ll take it."', group: 0 },
          { text: 'Writing their script for them', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'njeri',
        message: 'I\'ve never talked to a CEO. What if I freeze?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'You won\'t freeze, don\'t worry.', why: 'Reassurance without a plan.' },
          { text: 'Okay, I\'ll present your part.', why: 'Takes her moment away.' },
          { text: 'Tell it like you told me on Tuesday, the box story. One slide. If you freeze, look at me and I\'ll pick it up.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Liz Wiseman calls leaders who make others more capable ___. (one word)',
        answers: ['multipliers', 'Multipliers'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to Remi\'s support.',
        pairs: [
          ['Njeri', 'A private rehearsal'],
          ['Emeka', 'A video test the day before'],
          ['Wanjiku', 'One slide, one checked number'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "What do you want Kamau to know?" instead of writing a script?',
        options: [
          { text: 'They\'ll speak more naturally and own it' },
          { text: 'Remi is too busy', why: 'It\'s about ownership.' },
          { text: 'Scripts are banned', why: 'Their words work better.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s Friday plan. Which line undermines the five?',
        lines: [
          'Introduce each owner with one line of credit.',
          'Jump in to correct anyone who says a number wrong.',
          'Take any question they look to me for.',
        ],
        bug: 1,
        fix: 'Check every number with them on Thursday.',
        explanation: 'Correcting people mid-sentence in front of the CEO shrinks them. Check in advance.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put preparing a presenter in order.',
        lines: ['Ask what they want to say', 'One slide, one number', 'Rehearse privately', 'Agree the safety net'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Giving the stage is [[1]]. Setting them up to [[2]] is leadership.',
        blanks: [['generous', 'kind'], ['succeed', 'shine']],
        distractors: ['fail', 'lazy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s handover line.',
        tiles: ['Njeri', 'found', 'a', 'third', 'of', 'it.'],
        distractors: ['I'],
      },
    ],
  },
  reflect: {
    prompt: 'Who could you help shine in front of someone important? What would you do to set them up to succeed?',
    starters: ['I could help...', 'I\'d set them up by...'],
  },
  deepen: {
    title: 'Ten-minute rehearsal',
    summary: 'Before someone you work with presents, offer them a ten-minute private run-through. Only say what\'s working. Watch their confidence.',
  },
  notes: 'Liz Wiseman, Multipliers (2010; rev. 2017). Preparing others to present (rehearsal, safety nets, credit in introductions) reflects standard coaching and facilitation practice. Fictional events.',
};

export default lesson;
