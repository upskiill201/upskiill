import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. The hook: Grace's first coffee machine, Nurse Mode, and the idea that small talk is a skill she already has. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Nurse Mode',
  summary: 'Monday, 8:52. Grace\'s first day in tech. A stranger at the coffee machine says "Morning!" and Grace, after 18 years on hospital wards, replies: "And how are we feeling today?"',
  minutes: 11,
  outcomes: [
    'Know what small talk is, and why it feels harder than it is',
    'Spot the one move that rescues almost any awkward start',
    'See small talk as a skill you can learn, not a personality',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:52 a.m., Manchester',
      beats: [
        { speaker: 'narrator', text: 'Grace, 44. Eighteen years as a ward nurse. Today: day one as a junior UX researcher at Kinwell, a small company that builds an app for booking hospital appointments.' },
        { speaker: 'narrator', text: 'She has handled cardiac arrests, furious relatives and a man who bit her. She has never been this nervous. The office kitchen is full of people in their twenties wearing trainers.' },
        { speaker: 'femi', text: 'Morning! You must be the new researcher?' },
        { speaker: 'grace', text: 'And how are we feeling today? Any pain at all?' },
        { speaker: 'narrator', text: 'Silence. The coffee machine gurgles. Grace would like the floor to open.' },
        { speaker: 'tey', text: "Hi, I'm Tey. That, right there, is Nurse Mode: when Grace is nervous, her old job takes over. Don't worry. What she says next decides how this goes." },
      ],
      choice: {
        prompt: 'What should Grace say next?',
        options: [
          {
            text: 'Laugh at herself: "Sorry, eighteen years of nursing. I\'m Grace. I promise I won\'t take your blood pressure."',
            outcome: 'Femi laughs so hard he spills his tea. "I\'m Femi, I\'m a developer. Honestly? I could do with someone asking how I\'m feeling." They\'re friends from that moment.',
            best: true,
          },
          {
            text: 'Say nothing, grab her coffee and leave.',
            outcome: 'Femi decides she must be shy, or annoyed. Grace spends the morning replaying the moment. It\'s a long morning.',
          },
          {
            text: 'Pretend it was a joke she planned all along.',
            outcome: 'Femi isn\'t sure whether to laugh. Neither is Grace. The conversation stalls and they both stare at the coffee machine.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>Small talk</strong> is the light, friendly chat people have about easy things: the weather, the weekend, the coffee, the traffic. It isn't about the information. Nobody needs to know it's raining in Manchester; it's always raining in Manchester. It's about saying <em>\"I see you, and I'm friendly.\"</em></p><p>Notice what saved Grace: <strong>she laughed at the situation and said her name.</strong> Small talk doesn't need to be clever. It needs to be warm.</p><p>And here's the secret this whole course builds to: Grace spent 18 years putting nervous strangers at ease on hospital wards. She is already good at this. She just doesn't know it yet. Most people who dread small talk are better at it than they think.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'An awkward start is fixed by warmth, not wit. Smile, laugh at the situation (never at them), and say your name.',
    },
  ],
  apply: {
    scenario: 'Monday morning. Grace\'s first day at Kinwell.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is small talk mainly for?',
        options: [
          { text: 'Sharing important information', why: 'Nobody needs the weather report. The point is the connection.' },
          { text: 'Showing you\'re friendly and making a connection' },
          { text: 'Proving you\'re clever', why: 'Small talk works best when it\'s simple and warm.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Typical small talk, or a serious conversation?',
        groups: ['Small talk', 'Serious conversation'],
        items: [
          { text: 'How was your weekend?', group: 0 },
          { text: 'Can we discuss your performance review?', group: 1 },
          { text: 'This coffee machine is a mystery.', group: 0 },
          { text: 'Is it ever not raining here?', group: 0 },
          { text: 'I need to tell you about the budget cuts.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Morning! You must be the new researcher?',
        prompt: 'Grace gets a second chance. Best reply?',
        options: [
          { text: 'Yes.', why: 'True, but it ends the conversation.' },
          { text: 'And how are we feeling today?', why: 'Nurse Mode strikes again.' },
          { text: 'I am! I\'m Grace, first day. Any tips for the coffee machine?' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What rescued Grace\'s awkward start?',
        options: [
          { text: 'Laughing at the situation and saying her name' },
          { text: 'A clever joke she had prepared', why: 'She didn\'t need to be clever, just warm.' },
          { text: 'Leaving quickly', why: 'Leaving made it worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey\'s rule: an awkward start is fixed by warmth, not ... (one word)',
        answers: ['wit', 'cleverness', 'jokes'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s plan for tomorrow\'s coffee machine. Which line will make it harder?',
        lines: [
          'Smile and say good morning.',
          'Say my name and ask theirs.',
          'Prepare three very clever jokes and use all of them.',
        ],
        bug: 2,
        fix: 'Ask one easy question, like "How long have you been at Kinwell?"',
        explanation: 'Prepared jokes put pressure on both people. A simple, friendly question does more.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to what helps.',
        pairs: [
          ['You said something odd', 'Laugh at the situation'],
          ['You\'re meeting someone new', 'Say your name'],
          ['The chat is stuck', 'Ask an easy question'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Grace be better at small talk than she thinks?',
        options: [
          { text: 'Nurses are naturally loud', why: 'It\'s not about volume.' },
          { text: 'She\'s spent years putting nervous strangers at ease, which is the same skill' },
          { text: 'Everyone in tech loves nurses', why: 'Nice, but not the reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s better first line.',
        template: 'Sorry, eighteen years of [[1]]. I\'m [[2]]. I promise I won\'t take your blood [[3]].',
        blanks: [['nursing'], ['Grace'], ['pressure']],
        distractors: ['coding', 'temperature'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a warm, simple first line.',
        tiles: ['Morning!', 'I\'m', 'Grace,', 'it\'s', 'my', 'first', 'day.'],
        distractors: ['pain', 'feeling'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a job, hobby or role where you already put people at ease (customers, younger siblings, teammates, patients). What do you do there that could help you with small talk?',
    starters: ['In ..., I already...', 'I could use that by...'],
  },
  deepen: {
    title: 'Your "Nurse Mode"',
    summary: 'What do YOU do when you\'re nervous around strangers: go quiet, talk too much, crack jokes? Notice it this week. Knowing your Nurse Mode is the first step to steering it.',
  },
  notes: 'Small talk as bonding, not information (phatic communion; Malinowski 1923, taught in lesson 3). Grace profile per CAST.md (2026-10-15). Kinwell is fictional.',
};

export default lesson;
