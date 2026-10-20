import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13 — sound, kindly: no autoplay, loop, fallback text. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Sound, kindly',
  summary: 'Clinton wants the beat to blast the moment anyone opens the page. Ama opens it in class. Sound on the web has manners: let people press play themselves.',
  minutes: 11,
  outcomes: ['Explain why sound shouldn\'t play by itself', 'Loop a beat with loop', 'Add fallback text inside audio'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Clinton\'s idea: add autoplay, so Jollof Bounce blasts the second the page opens. "Instant vibes!" What could go wrong?',
          replies: ['A lot?', 'Sounds fun'],
        },
        {
          tey: 'Ama opened the page in class. Imagine. Sound that starts by itself is one of the most hated things on the web: people close the tab before they even see the page. People using screen readers can\'t hear their reader over it.',
          replies: ['So no autoplay?'],
        },
        {
          tey: 'No autoplay. Most browsers block sound that starts by itself anyway, so it often doesn\'t even work. Give people the play button and let them choose. That\'s what controls is for.',
          replies: ['What can I add instead?'],
        },
        {
          tey: 'Two kind extras. loop makes the beat start again when it ends: nice for a short loop like Kofi\'s. And text between <audio> and </audio> shows only in browsers that can\'t play sound, so nobody gets a blank space. Try both below.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A kind player',
      caption: 'controls so people choose, loop so the beat keeps going, and fallback text for old browsers. No autoplay.',
      code: '<h2>Jollof Bounce</h2>\n<audio controls loop src="beat-2.mp3">\n  Your browser can\'t play this beat. <a href="beat-2.mp3">Download Jollof Bounce</a>.\n</audio>\n',
      challenge: 'Remove loop, play it to the end, and hear the difference.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never autoplay sound. Let people press play. Many browsers block autoplaying sound anyway.',
    },
  ],
  apply: {
    scenario: 'Kofi makes his players polite.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is autoplay sound a bad idea?',
        options: [
          { text: 'It surprises people, drowns out screen readers, and is often blocked anyway' },
          { text: 'It makes the page slower', why: 'Speed isn\'t the main problem. Surprise sound drives people away.' },
          { text: 'It isn\'t; it\'s the best way to get listeners', why: 'Most people close a tab that blasts sound at them.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Remove autoplay from Clinton\'s player, but keep controls',
        starter: '<audio controls autoplay src="beat-2.mp3"></audio>\n',
        solution: '<audio controls src="beat-2.mp3"></audio>\n',
        hint: 'Delete the word autoplay.',
        checks: [
          { message: 'No autoplay', dom: { selector: 'audio[autoplay]', count: 0 } },
          { message: 'Still has a play button', dom: { selector: 'audio[controls]', count: 1 } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make Sunrise in Osu loop: add loop to the beat-1.mp3 player',
        starter: '<audio controls src="beat-1.mp3"></audio>\n',
        solution: '<audio controls loop src="beat-1.mp3"></audio>\n',
        hint: 'Add the word loop inside the opening tag.',
        checks: [
          { message: 'The beat loops', dom: { selector: 'audio[loop]', count: 1 } },
          { message: 'Still has a play button', dom: { selector: 'audio[controls]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kind, or rude?',
        groups: ['Kind', 'Rude'],
        items: [
          { text: 'A play button the visitor chooses to press', group: 0 },
          { text: 'Sound that starts when the page opens', group: 1 },
          { text: 'Fallback text with a download link', group: 0 },
          { text: 'A player with no controls that plays by itself', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Autoplay = instant vibes. Why are you scared of vibes?',
        options: [
          { text: 'Not scared. People who choose to press play actually listen. People ambushed by sound leave.' },
          { text: 'Fine, autoplay it is.', why: 'Ama opened it in class. Enough said.' },
          { text: 'Vibes are banned.', why: 'Vibes are welcome. Surprise sound isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'When does the text inside this audio show?',
        code: '<audio controls src="beat-3.mp3">\n  Your browser can\'t play this beat.\n</audio>',
        language: 'html',
        options: [
          { text: 'Always, above the player', why: 'Browsers that can play sound hide it.' },
          { text: 'Only in browsers that can\'t play the sound' },
          { text: 'When the beat ends', why: 'It\'s fallback text, for browsers without audio support.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to what it does.',
        pairs: [
          ['controls', 'Shows the play button'],
          ['loop', 'Starts again at the end'],
          ['autoplay', 'Plays by itself (avoid it)'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the looping player.',
        language: 'html',
        template: '<audio controls [[1]] src="beat-2.mp3"></audio>',
        blanks: [['loop']],
        distractors: ['autoplay', 'repeat', 'again'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute should Kofi never put on his players?',
        answers: ['autoplay'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'A kind player for Night Bus to Kumasi: controls, loop, beat-3.mp3, and fallback text inside that says Your browser can\'t play this beat.',
        starter: '',
        solution: '<audio controls loop src="beat-3.mp3">\n  Your browser can\'t play this beat.\n</audio>\n',
        hint: '<audio controls loop src="beat-3.mp3">text</audio>',
        checks: [
          { message: 'A player with a play button', dom: { selector: 'audio[controls]', count: 1 } },
          { message: 'It loops', dom: { selector: 'audio[loop]', count: 1 } },
          { message: 'No autoplay', dom: { selector: 'audio[autoplay]', count: 0 } },
          { message: 'Fallback text inside', dom: { selector: 'audio', text: 'can\'t play this beat' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a site that played sound at you without asking. What did you do?',
    starters: ['The site was...', 'I...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, make one beat loop and one not, and listen to both to the end.',
  },
  notes: 'Browser autoplay policies: Chrome (2018) and Safari block autoplay with sound without user interaction (developer.chrome.com, "Autoplay policy in Chrome"; MDN, "Autoplay guide for media and Web Audio APIs"). WCAG 2.2 SC 1.4.2 Audio Control. Fallback content inside media elements is shown only by user agents that don\'t support the element (HTML Living Standard §4.8.11). The sandboxed preview has no autoplay permission either.',
};

export default lesson;
