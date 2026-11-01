import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Unit Challenge: the second lift ride, 30 seconds with Mrs Adeyemi. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the second lift ride',
  summary: 'Friday evening, at the Tech Fest finalists\' welcome drinks. Ada steps into the lift. The doors are closing. A hand stops them. It\'s Mrs Adeyemi. She presses 32 and says: "Ah. The database girl."',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 1 tool in one real moment',
    'Give a clear 30-second pitch with an ask',
    'Recover from a bad first impression',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 7:40 p.m. The lift, again.',
      beats: [
        { speaker: 'narrator', text: 'Mrs Adeyemi: "Ah. The database girl. Floor 32 again. Shall we try that again?"' },
        { speaker: 'ada', text: '(inside her head) Breathe. Smile. One sentence. No tables. NO TABLES.' },
        { speaker: 'narrator', text: 'The lift starts moving. Thirty floors, about thirty seconds. Ada has done the work all week. This time, you\'re in the lift with her.' },
      ],
    },
  ],
  apply: {
    scenario: 'The lift. About 30 seconds.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Floor 2. What should Ada say first?',
        options: [
          { text: '"I help office savings groups track who\'s paid, so nobody argues about money."' },
          { text: '"So! The database has improved a lot since Monday."', why: 'The database girl strikes again.' },
          { text: '"Sorry about Monday, I was so nervous, I\'m not usually like that..."', why: 'A long apology eats the ride.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Mrs Adeyemi raises an eyebrow: "Why does that need an app?" Best reply?',
        options: [
          { text: '"It\'s built in Python."', why: 'Not what she asked.' },
          { text: '"Apps are the future."', why: 'Vague, and not about her question.' },
          { text: '"Most groups use a notebook, and every month someone swears they paid. The app reminds everyone and keeps a record."' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s 30 seconds in order.',
        lines: ['One sentence: who, what, so what', 'The problem: the notebook and the arguments', 'What the app does about it', 'Proof: ten people, zero arguments', 'The ask'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: '(in her head, floor 18) She looks interested. Should I tell her about the export button now?',
        prompt: 'Your advice?',
        options: [
          { text: 'Yes, and the settings page.', why: 'Features without a "so that".' },
          { text: 'Say nothing until floor 32.', why: 'She still needs the proof and the ask.' },
          { text: 'No: give the proof. "My office has used it for four months. Ten people, zero arguments."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the 30 seconds, or not?',
        groups: ['Say it', 'Skip it'],
        items: [
          { text: 'Ten people, zero arguments', group: 0 },
          { text: 'The members table', group: 1 },
          { text: 'I\'m looking for a mentor', group: 0 },
          { text: 'A long apology for Monday', group: 1 },
          { text: 'Every month someone swears they paid', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Thirty seconds is about how many words? (a number)',
        answers: ['70', 'seventy', '60', '75', '80'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Floor 29. Ada has said everything except the ask. What\'s her best ask?',
        options: [
          { text: '"So yeah. That\'s it."', why: 'Monday\'s ending.' },
          { text: '"I\'m looking for a mentor to take it to a hundred offices. Could I send you a two-minute demo?"' },
          { text: '"Please make me win."', why: 'Not one a judge can say yes to.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s full 30 seconds. Which line should she cut?',
        lines: [
          'I help office savings groups track who\'s paid, so nobody argues about money.',
          'Most ajo groups use a notebook, and every month someone swears they paid.',
          'Also, fun fact, the dates were really hard to store because of formats.',
          'My office has used it for four months: ten people, zero arguments.',
        ],
        bug: 2,
        fix: 'Delete it. It\'s about her code, not their problem.',
        explanation: 'One technical tangent can undo a great pitch. Stay on the listener\'s problem.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 1 tool.',
        pairs: [
          ['"I help savings groups track who\'s paid"', 'Your one sentence'],
          ['"Nobody forgets, because it reminds them"', 'Features vs benefits'],
          ['No "Oh! Um. Hi."', 'The first ten seconds'],
          ['"Could I send you a demo?"', 'The ask'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Floor 32. Ding. She said: "Much better. Send me the demo. And, Ada? Make it even shorter on stage." Then she smiled! A real smile! ARJUN!',
        prompt: 'What does Arjun reply?',
        options: [
          { text: 'From "the database girl" to "send me the demo" in one week. Now let\'s make it unforgettable.' },
          { text: 'Explain the database to her now.', why: 'Absolutely not.' },
          { text: 'You\'ve won, stop practising.', why: 'Four weeks to go.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Monday Ada, or Friday Ada?',
        groups: ['Monday Ada', 'Friday Ada'],
        items: [
          { text: '"It\'s built in Python..."', group: 0 },
          { text: '"I help savings groups track who\'s paid."', group: 1 },
          { text: '"So yeah. That\'s it."', group: 0 },
          { text: '"Could I send you a demo?"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 in one line.',
        template: 'One [[1]] first. [[2]], not features. End with an [[3]].',
        blanks: [['sentence'], ['Benefits'], ['ask']],
        distractors: ['database', 'apology'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Mrs Adeyemi\'s reply.',
        tiles: ['Much', 'better.', 'Send', 'me', 'the', 'demo.'],
        distractors: ['Hmm.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own 30-second pitch (about 70 words): one sentence, the problem, what you do, proof and an ask. Then time it out loud.',
    starters: ['One sentence: ...', 'Problem: ...', 'Proof: ...', 'Ask: ...'],
  },
  deepen: {
    title: 'Next week: "So, what do you do?"',
    summary: 'Arjun: "Next week there\'s a networking mixer for finalists. Investors, recruiters, other founders. Everyone will ask you one question: \'So, what do you do?\' And you\'ll want to say \'I\'m just a junior designer.\' Don\'t."',
  },
  notes: 'Unit Challenge: reviews Chapter 1. The lift ride, welcome drinks and judge are fictional.',
};

export default lesson;
