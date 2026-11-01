import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Card deck: notice when expectations are met (recognition tied to the bar). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Notice the met ones',
  summary: 'Day 30, 9:00 a.m. The shop goes live. Arjun watches the first orders arrive. Every checklist line holds. Then he realises: for 30 days, he only spoke up when something was missed. Tey deals out the cards for the other half of expectations.',
  minutes: 11,
  outcomes: [
    'Know why noticing met expectations matters as much as missed ones',
    'Recognise work against the bar, specifically',
    'Make "met" as visible as "missed"',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Most leaders talk about expectations only when they're missed. That teaches people that the only way to be noticed is to fail. Expectations work both ways. When the bar is met, say so. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Name the bar they met</h3><p>\"Every product page passed the cheap-Android test. All of them.\" Not \"good job\": the specific expectation, met.</p><h3>Card 2: Say what it made possible</h3><p>\"Because checkout was polished, 140 Diwali orders went through in the first hour without one complaint.\" The impact makes it real.</p><h3>Card 3: Notice the hard ones</h3><p>Kavya hitting every must, after the quiet trade-off on Day 18. Joel flagging a problem in 10 minutes, after Diwali eve. Notice the expectations people worked hardest to meet.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Say it soon</h3><p>The morning it happens, not at the end-of-project review. Recognition that arrives weeks later feels like admin.</p><h3>Card 5: Their way</h3><p>Kavya loves a shout-out in the team chat. Joel would rather get a private message. Ask, or watch.</p><h3>Card 6: Tell the client too</h3><p>\"Joel's checkout handled 140 orders in an hour without a single failure.\" Credit, upwards, by name. Mr Rao might hire Joel directly one day. That's a good thing.</p>",
    },
    {
      kind: 'check',
      question: 'What does talking about expectations only when they\'re missed teach people?',
      options: ['That the only way to be noticed is to fail', 'That they\'re doing well', 'Nothing'],
      answer: 0,
      explanation: 'Met expectations deserve as much attention.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Name the bar they met. Say what it made possible. Notice the hard ones. Say it soon, their way. Tell the client too.',
    },
  ],
  apply: {
    scenario: 'Launch morning, 9 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the best recognition for Kavya this morning?',
        options: [
          { text: '"Good job, team!"', why: 'Too vague to land.' },
          { text: '"Every product page passed the cheap-Android test. That\'s why 140 orders came through on phones."' },
          { text: 'Wait for the end-of-project review', why: 'Then it feels like admin.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific recognition, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: '"Checkout handled 140 orders without a failure."', group: 0 },
          { text: '"Nice work."', group: 1 },
          { text: '"You flagged it in 10 minutes."', group: 0 },
          { text: '"Thanks for everything."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'First 140 orders! Did everything work?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Mostly, yes.', why: 'Undersells a real win.' },
          { text: 'Let\'s see how the week goes.', why: 'Celebrate the met expectation now.' },
          { text: 'Everything. Every page passed the cheap-Android test, and you hit every must since Day 18. That\'s why it\'s working.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Recognition that arrives weeks later feels like ___. (one word)',
        answers: ['admin', 'Admin', 'paperwork'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the line.',
        pairs: [
          ['Name the bar', '"Every page passed the Android test."'],
          ['Say what it made possible', '"140 orders, no complaints."'],
          ['Tell the client', '"Joel\'s checkout handled it all."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why notice Joel flagging a problem in 10 minutes?',
        options: [
          { text: 'It\'s the expectation he worked hardest to meet, after Diwali eve' },
          { text: 'To remind him of his mistake', why: 'It\'s to celebrate the change.' },
          { text: 'It\'s not worth mentioning', why: 'It\'s exactly worth mentioning.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s launch message. Which line misses the point?',
        lines: [
          'Live! 140 orders in the first hour.',
          'Let\'s hope nothing breaks this time.',
          'Kavya\'s pages and Joel\'s checkout held every line of the checklist.',
        ],
        bug: 1,
        fix: 'Every must on our list: met.',
        explanation: 'On launch morning, lead with what was met, not with worry.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put recognising a met expectation in order.',
        lines: ['Name the bar they met', 'Say what it made possible', 'Say it soon, their way', 'Tell the client too'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make [[1]] as visible as [[2]].',
        blanks: [['met'], ['missed']],
        distractors: ['loud', 'secret'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s headline.',
        tiles: ['Every', 'must:', 'met.'],
        distractors: ['missed.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone who meets your expectations every day, quietly. When did you last tell them, specifically?',
    starters: ['They always...', 'I could tell them...'],
  },
  deepen: {
    title: 'One met expectation',
    summary: 'Today, tell one person a specific expectation they met and what it made possible. Do it the way they\'d like it.',
  },
  notes: 'Recognition tied to specific behaviour and impact: Gallup & Workhuman (2023); positive feedback balancing corrective feedback: standard management guidance. Fictional figures (140 orders).',
};

export default lesson;
