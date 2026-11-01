import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Unit Challenge, "The Call Back": two minutes on a call with Mr Rao to stop a second disaster. Cliffhanger into Chapter 3 (David). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'The Call Back: two minutes with Mr Rao',
  summary: 'Two weeks later. Arjun calls back in a panic. Mr Rao\'s new marketing head wants a surprise flash sale TONIGHT, before the extra tills are finished. Mr Rao is boarding a flight in ten minutes and has given Arjun two minutes on a call.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 2 tool in one live, spoken moment',
    'Lead with the action when time is short',
    'Make the risk clear without jargon or panic',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, the Call Back',
      beats: [
        { speaker: 'tey', text: "Tey FM, Line 2 is back! Arjun, you sound like you've been running." },
        { speaker: 'arjun', text: 'Tey. Disaster number two is loading. Mr Rao\'s new marketing head wants a flash sale tonight. Only two of the three fixes are done. Mr Rao boards a flight to Delhi in ten minutes. He\'s giving me two minutes on a call.' },
        { speaker: 'arjun', text: 'Old me would start with "So, the checkout architecture..."' },
        { speaker: 'tey', text: "And old you would still be on paragraph one when the plane takes off. Producer, two minutes. Everything from this chapter. Let's get Arjun heard." },
      ],
    },
  ],
  apply: {
    scenario: 'The Call Back. Two minutes before boarding.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Arjun\'s first sentence be?',
        options: [
          { text: '"So, some background on the checkout queue..."', why: 'The plane will leave first.' },
          { text: '"I have twelve concerns."', why: 'Nobody can hold twelve, especially at a boarding gate.' },
          { text: '"Please move tonight\'s flash sale to Saturday. I need two more days."' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Mr Rao asks "Why?" Which answer lands?',
        options: [
          { text: '"The deadlock-mitigation patch isn\'t merged."', why: 'True, and completely unheard.' },
          { text: '"Because I said so."', why: 'Not how you earn trust.' },
          { text: '"We\'ve added one more till, but not enough yet. Tonight it could jam again, like last time."' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s two minutes in order.',
        lines: ['The action: move the sale to Saturday.', 'Why, in the till comparison.', 'The cost, in numbers he can feel.', 'What\'s done and what\'s left: three things.', 'The ask: "Can you tell your marketing head now?"'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'He wants to know how bad it could be. Should I say "23.7% failure probability under load"?',
        prompt: 'Producer, quick!',
        options: [
          { text: 'Yes, precision is everything.', why: 'Not at a boarding gate.' },
          { text: 'Say "about one in four customers might not be able to pay, like last time, when we lost more than your Diwali ad budget."' },
          { text: 'Say "very, very bad".', why: 'Too vague to act on.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Say on the call, or put in the follow-up email?',
        groups: ['Say on the call', 'Follow-up email'],
        items: [
          { text: 'Move the sale to Saturday', group: 0 },
          { text: 'The full list of twelve risks', group: 1 },
          { text: 'One in four customers might not be able to pay', group: 0 },
          { text: 'The technical diagrams', group: 1 },
          { text: 'Can you tell your marketing head now?', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The structure Arjun is using: bottom line up ___. (one word)',
        answers: ['front'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Mr Rao says: "My marketing head says the site is fine now." What\'s the best reply?',
        options: [
          { text: '"It\'s better than last time: one till became two. But a flash sale needs three. Saturday, it\'ll be ready."' },
          { text: '"Your marketing head is wrong."', why: 'True maybe, but it starts a fight, not a decision.' },
          { text: 'Explain database locking in detail.', why: 'The curse of knowledge strikes again.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s closing line. Which one wastes the last seconds?',
        lines: [
          'So: move the sale to Saturday.',
          'Can you tell your marketing head now?',
          'Also, interestingly, there\'s a fascinating history behind how queues work...',
        ],
        bug: 2,
        fix: 'Thanks, Mr Rao. Safe flight.',
        explanation: 'The ask is made. Stop. History lessons can go in the follow-up email, or nowhere.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 2 tool.',
        pairs: [
          ['"Move the sale to Saturday" first', 'BLUF'],
          ['"One till became two"', 'A comparison'],
          ['"One in four customers"', 'A number people can feel'],
          ['Diagrams in the follow-up', 'Details last'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'He said "Saturday it is. Tell marketing I said so." Then: "Arjun, that was the clearest two minutes anyone\'s given me all year." TEY.',
        prompt: 'Tey\'s sign-off?',
        options: [
          { text: 'Now send him a 900-word thank-you email.', why: 'Relapse risk!' },
          { text: 'You were always right, Arjun. Now you\'re right AND heard. That\'s the whole chapter.' },
          { text: 'Next caller.', why: 'Give him a moment!' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Old Arjun, or new Arjun?',
        groups: ['Old Arjun', 'New Arjun'],
        items: [
          { text: 'The warning in paragraph four', group: 0 },
          { text: 'The action in the subject line', group: 1 },
          { text: '"Row-level lock contention"', group: 0 },
          { text: '"A shop with one till"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 in one line.',
        template: 'Answer [[1]]. Plain [[2]]. A number they can [[3]].',
        blanks: [['first'], ['words'], ['feel', 'picture']],
        distractors: ['last', 'jargon'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s first line on the call.',
        tiles: ['Please', 'move', 'tonight\'s', 'sale', 'to', 'Saturday.'],
        distractors: ['architecture', 'so,'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you know a lot about that others need to act on. If you had two minutes, what would your first sentence, your comparison and your ask be?',
    starters: ['First sentence: ...', 'It\'s like...', 'My ask: ...'],
  },
  deepen: {
    title: 'Coming up next on Tey FM: Caller 3',
    summary: 'Tey: "Line 3, and... hello? Line 3, are you there?" A very quiet voice: "Hi. Sorry. It\'s David. I had the best idea in my group project. I said it. Nobody heard. Five minutes later, someone louder said the same thing, and the whole group cheered. For him."',
  },
  notes: 'Unit Challenge: reviews Chapter 2. The flash sale, flight and marketing head are fictional. "Two minutes" is a story device.',
};

export default lesson;
