import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Story with a choice: awkward moments, and how to recover. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Awkward moments, and how to recover',
  summary: 'Saturday, Priya\'s birthday drinks. Grace confidently says to the man next to Priya, "You must be her husband!" He is her brother. Every head turns. Small talk\'s worst nightmare has arrived.',
  minutes: 12,
  outcomes: [
    'Recover from an awkward moment in a few seconds',
    'Apologise lightly, without making it bigger',
    'Help someone else out of an awkward moment',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 8 p.m., a bar in Chorlton',
      beats: [
        { speaker: 'narrator', text: 'Priya\'s birthday. Grace is proud to be invited. She spots Priya with a tall man, his arm round her shoulders.' },
        { speaker: 'grace', text: 'You must be Priya\'s husband! Lovely to meet you!' },
        { speaker: 'narrator', text: 'A pause. "I\'m her brother, Raj. Her husband is at the bar." Priya is trying very hard not to laugh.' },
        { speaker: 'grace', text: '(Floor. Open. Now. Please.)' },
        { speaker: 'tey', text: "Everyone has a moment like this. What matters is the next five seconds. Watch." },
      ],
      choice: {
        prompt: 'What should Grace do?',
        options: [
          {
            text: 'Laugh, apologise once, and move on: "Oh no! Sorry, Raj, I\'ve just married you to your sister. I\'m Grace, I work with Priya. Please tell me you\'re the fun sibling."',
            outcome: 'Raj laughs. "I am, obviously." Priya finally laughs too. Ten minutes later, Raj is telling the story to everyone as "the best introduction I\'ve ever had".',
            best: true,
          },
          {
            text: 'Apologise over and over for five minutes.',
            outcome: 'By the fifth "I\'m so so sorry", Raj is comforting HER. A small moment has become a big one.',
          },
          {
            text: 'Pretend it didn\'t happen and walk to the bar.',
            outcome: 'It hangs in the air all evening. Raj isn\'t sure if she\'s embarrassed or rude.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>The 5-second recovery:</strong></p><ol><li><strong>Acknowledge it, lightly.</strong> A small laugh at yourself. \"Oh no!\"</li><li><strong>Apologise once.</strong> Short and real. Not five times: that makes it bigger.</li><li><strong>Move forward.</strong> Say your name, ask a question, make it a story you share.</li></ol><p><strong>Other classic moments:</strong></p><ul><li><strong>Forgot a name you should know:</strong> \"I'm so sorry, my brain has dropped your name, and we've met three times. Remind me?\"</li><li><strong>Said something that landed wrong:</strong> \"That came out badly. What I meant was...\"</li><li><strong>Someone else's awkward moment:</strong> rescue them. \"Honestly, I did exactly the same last week.\" Then change the subject.</li></ul><p>People remember how you handled it far more than the mistake itself. Usually, they remember it fondly.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Acknowledge lightly, apologise once, move forward. An awkward moment handled warmly often becomes the best story of the night.',
    },
  ],
  apply: {
    scenario: 'Saturday night. Priya\'s birthday.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the 5-second recovery in order.',
        lines: ['Acknowledge it lightly', 'Apologise once', 'Move forward with a question'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does apologising five times make it worse?',
        options: [
          { text: 'Apologising is always wrong', why: 'Once is right. Five is too many.' },
          { text: 'It\'s too quiet', why: 'Volume isn\'t the issue.' },
          { text: 'It makes a small moment big, and the other person ends up comforting you' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good recovery, or makes it worse?',
        groups: ['Good recovery', 'Makes it worse'],
        items: [
          { text: '"Oh no! Sorry, Raj. I\'m Grace."', group: 0 },
          { text: 'Walking off without a word', group: 1 },
          { text: 'Five minutes of apologies', group: 1 },
          { text: '"That came out badly. What I meant was..."', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: '(laughing) You married me to my brother.',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'I\'m so sorry, I\'m so sorry, I\'m so sorry...', why: 'Priya is laughing. Laugh with her.' },
          { text: 'It wasn\'t my fault.', why: 'Owning it lightly works much better.' },
          { text: 'I did. In my defence, he\'s very tall and very supportive. Happy birthday!' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a recovery, apologise ___. (one word, how many times)',
        answers: ['once', 'one'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Grace has met Femi\'s girlfriend three times and forgotten her name. What does she say?',
        options: [
          { text: 'Avoid her all night', why: 'It gets worse every time.' },
          { text: '"I\'m so sorry, my brain has dropped your name, and we\'ve met three times. Remind me?"' },
          { text: 'Call her "lovely" all night', why: 'She\'ll notice.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Femi spills his drink on a stranger. Grace tries to help. Which line makes it worse?',
        lines: [
          'Here, have these napkins!',
          'Femi, you\'re SO clumsy, this happens every single time!',
          'Honestly, I knocked a whole tray over last month.',
        ],
        bug: 1,
        fix: 'Can I get you another drink?',
        explanation: 'Rescue people from awkward moments; don\'t spotlight them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Safe humour', 'Laugh at yourself or the situation'],
          ['Bridge question', 'Invites a real answer'],
          ['Listen, don\'t fix', 'When someone shares something hard'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s recovery line.',
        template: 'Oh [[1]]! Sorry, Raj. I\'m [[2]], I work with Priya.',
        blanks: [['no'], ['Grace']],
        distractors: ['yes', 'Priya'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "it came out wrong" rescue.',
        tiles: ['That', 'came', 'out', 'badly.', 'What', 'I', 'meant', 'was...'],
        distractors: ['sorry', 'sorry!'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your most awkward small-talk moment? Rewrite how you\'d handle it now with the 5-second recovery.',
    starters: ['The moment was...', 'Now I\'d say...'],
  },
  deepen: {
    title: 'Your awkward-moment line',
    summary: 'Pick one recovery line you can use for anything: "Oh no, that came out wrong!" Having it ready means the next awkward moment will last five seconds, not five minutes.',
  },
  notes: 'Recovery advice is practical; aligns with the liking-gap finding that people judge us more kindly than we judge ourselves (Boothby et al. 2018). Raj (Priya\'s brother) is a named extra; Chorlton is in Manchester.',
};

export default lesson;
