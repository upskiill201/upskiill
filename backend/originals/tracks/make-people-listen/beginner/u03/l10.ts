import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Unit Challenge, "The Call Back": David presents the group project. Cliffhanger into Chapter 4 (Lucía). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'The Call Back: the presentation',
  summary: 'Presentation day. David calls from the corridor outside the lecture hall. His hands are shaking. Junior is inside. So is the professor, and sixty classmates. He\'s on in four minutes.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 3 tool in one live moment',
    'Manage nerves with what the research says',
    'Present clearly, as yourself',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, the Call Back',
      beats: [
        { speaker: 'tey', text: "Tey FM, Line 3 is back! David? I can actually hear you this time." },
        { speaker: 'david', text: 'I\'m in the corridor. Four minutes. Sixty people. The professor. Junior is sitting in the front row. My hands are shaking so much my notes card is rattling.' },
        { speaker: 'tey', text: "Remember the illusion of transparency? Your hands feel like an earthquake. From the third row, they look like hands." },
        { speaker: 'david', text: '(a breath) Okay. Okay. Producer, help me.' },
        { speaker: 'tey', text: "Four minutes, producer. Everything from this chapter. Let's walk him in." },
      ],
    },
  ],
  apply: {
    scenario: 'The Call Back. Four minutes to go.',
    items: [
      {
        kind: 'mcq',
        prompt: 'David\'s hands are shaking. What\'s the most helpful thing to tell him?',
        options: [
          { text: 'Nerves are normal, and audiences notice far less than speakers think' },
          { text: 'Everyone will see it, so hide your hands', why: 'The illusion of transparency talking.' },
          { text: 'Cancel the presentation', why: 'Absolutely not.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s first ten seconds on stage in order.',
        lines: ['Walk to the front.', 'Breathe.', 'Look up at the room.', 'Say the headline: "214 students signed up to donate blood."', 'Pause.'],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Should I open with "Sorry, I\'m not very good at this, so..."?',
        prompt: 'Producer, quick!',
        options: [
          { text: 'Make it funnier: "Sorry for wasting your time."', why: 'Still a shrinker.' },
          { text: 'Yes, lower their expectations.', why: 'Then they\'ll listen for weakness, not ideas.' },
          { text: 'No apology. Open with the headline: "214 students signed up to donate blood."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'On stage: do it, or skip it?',
        groups: ['Do it', 'Skip it'],
        items: [
          { text: 'Pause before "donor buddies"', group: 0 },
          { text: 'Read every word from the card', group: 1 },
          { text: 'Share eye contact around the room', group: 0 },
          { text: 'Stare only at Junior', group: 1 },
          { text: 'Tell the story about Ama', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Speak loud enough for the ___ row. (one word)',
        answers: ['back', 'last'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'The professor asks: "Whose idea was donor buddies?" Junior starts to answer. What should David do?',
        options: [
          { text: 'Stay silent so there\'s no conflict', why: 'That\'s what happened last time.' },
          { text: '"Junior always steals my ideas!"', why: 'Calm and kind wins here.' },
          { text: 'Say calmly: "That was mine. And the group made it work: Junior got the sports teams to sign up."' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Halfway through, David\'s mind goes blank. What helps most?',
        options: [
          { text: 'Apologise many times', why: 'That turns a small pause into a big moment.' },
          { text: 'Pause, breathe, glance at the keyword card, and carry on' },
          { text: 'Run out of the room', why: 'Tempting. No.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'David\'s closing. Which line throws away the ending?',
        lines: [
          'So: 214 donors, one in three with a buddy.',
          'We suggest running it every term.',
          'Um, so, yeah, that\'s it, I guess, sorry, any questions maybe?',
        ],
        bug: 2,
        fix: 'Thank you. (pause) Questions?',
        explanation: 'A strong finish is short and clear. Shrinkers at the end make the whole talk feel smaller.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 3 tool.',
        pairs: [
          ['Shaking hands, but carrying on', 'The illusion of transparency'],
          ['Pause before "donor buddies"', 'The power of the pause'],
          ['"That was mine, and the group made it work"', 'Reclaiming an idea kindly'],
          ['"Good news: 214 students"', 'Headline first'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Tey. The professor said "Excellent work, David." And Junior high-fived me. He said "Bro, you were LOUD." I wasn\'t loud. I was just... clear.',
        prompt: 'Tey\'s sign-off?',
        options: [
          { text: 'That\'s it, David. Not louder: clearer. And everyone heard you.' },
          { text: 'Now go and be loud all the time.', why: 'He found his own way. Keep it.' },
          { text: 'Next caller.', why: 'Let him enjoy it!' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Old David, or new David?',
        groups: ['Old David', 'New David'],
        items: [
          { text: 'Ideas said into his notebook', group: 0 },
          { text: 'A breath, eyes up, the headline', group: 1 },
          { text: '"Sorry, it\'s probably stupid"', group: 0 },
          { text: '"That was mine, and the group made it work"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 in one line.',
        template: 'Not [[1]]: [[2]]. Breathe, [[3]], and stop.',
        blanks: [['louder'], ['clearer'], ['pause']],
        distractors: ['quieter', 'apologise'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build David\'s opening line.',
        tiles: ['214', 'students', 'signed', 'up', 'to', 'donate', 'blood.'],
        distractors: ['Sorry,', 'um'],
      },
    ],
  },
  reflect: {
    prompt: 'Imagine your next presentation or important conversation. What will you do in the first ten seconds, and what will you do if your mind goes blank?',
    starters: ['First ten seconds: ...', 'If I go blank: ...'],
  },
  deepen: {
    title: 'Coming up next on Tey FM: Caller 4',
    summary: 'Tey: "Line 4, all the way from Mexico City. Lucía! Congratulations on the promotion!" Lucía: "Thank you. I lead a team of six now. There\'s just one problem. His name is Diego. He finishes my sentences. Wrongly. In every meeting."',
  },
  notes: 'Unit Challenge: reviews Chapter 3 plus Chapter 2 callbacks. Presentation, professor and classmates are fictional.',
};

export default lesson;
