import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: the organiser presses play. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the organiser presses play',
  summary: 'The organiser has five minutes between meetings to decide Kofi\'s set time. She opens his page and goes straight for the play button. Permission, sound and figures, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Use pictures you have the right to use, with credit', 'Build kind, playable audio players', 'Package covers with figure and figcaption'],
  learn: [
    {
      kind: 'story',
      title: 'Five minutes',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, 1:55pm. A message from the organiser: "Between meetings. Listening to your stuff now. Deciding your set time today."' },
        { speaker: 'kofi', text: 'Now?! Okay. Is everything playable? Does anything autoplay? Did I credit David\'s photo?' },
        { speaker: 'miracle', text: 'Breathe. Check it the way she\'ll use it: open it, press play.' },
        { speaker: 'tey', text: 'Five minutes to make sure her five minutes go well. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: get the page ready for the organiser.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'The player has no play button. Add controls',
        starter: '<audio src="beat-2.mp3"></audio>\n',
        solution: '<audio controls src="beat-2.mp3"></audio>\n',
        hint: 'Add controls inside the opening tag.',
        checks: [{ message: 'A play button', dom: { selector: 'audio[controls]', count: 1 } }],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the player that will ambush her between meetings.',
        language: 'html',
        lines: ['<audio controls src="beat-1.mp3"></audio>', '<audio controls autoplay src="beat-2.mp3"></audio>', '<audio controls loop src="beat-3.mp3"></audio>'],
        bug: 1,
        fix: '<audio controls src="beat-2.mp3"></audio>',
        explanation: 'autoplay. Let her press play herself.',
      },
      {
        kind: 'mcq',
        prompt: 'The photo at the top was taken by David. What does the page need?',
        options: [
          { text: 'Nothing, Kofi is in the photo', why: 'Being in the photo doesn\'t make Kofi its owner. David took it.' },
          { text: 'A credit to David, with his permission' },
          { text: '"Photo: the internet"', why: 'David took it. Credit David.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Package Jollof Bounce: a figure with cover-2.png (with alt), a figcaption Jollof Bounce, and a player for beat-2.mp3',
        starter: '',
        solution: '<figure>\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n  <figcaption>Jollof Bounce</figcaption>\n  <audio controls src="beat-2.mp3"></audio>\n</figure>\n',
        hint: 'figure > img, figcaption, audio.',
        checks: [
          { message: 'The cover in a figure', dom: { selector: 'figure img[src="cover-2.png"]', count: 1 } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'A caption', dom: { selector: 'figcaption', text: 'Jollof Bounce' } },
          { message: 'A player in the figure', dom: { selector: 'figure audio[controls]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ready for the organiser, or not yet?',
        groups: ['Ready', 'Not yet'],
        items: [
          { text: 'A player with controls', group: 0 },
          { text: 'A player with autoplay', group: 1 },
          { text: 'David\'s photo, credited', group: 0 },
          { text: 'A crowd photo from an image search', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to what it does.',
        pairs: [
          ['controls', 'Shows the play button'],
          ['loop', 'Plays again at the end'],
          ['autoplay', 'Plays by itself: avoid it'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the organiser see?',
        code: '<figure>\n  <img src="cover-3.png" alt="Album cover for Night Bus to Kumasi">\n  <figcaption>Night Bus to Kumasi</figcaption>\n</figure>',
        language: 'html',
        options: [
          { text: 'Only the caption', why: 'The picture shows too; the alt is read only if it can\'t.' },
          { text: 'The cover, with Night Bus to Kumasi written under it' },
          { text: 'The cover with its alt text written under it', why: 'The alt isn\'t shown when the picture loads. The figcaption is.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'She\'s listening right now. Anything on the page you\'re not allowed to use?',
        options: [
          { text: 'No. My own covers, my own beats, and David\'s photo with his OK and his name on it.' },
          { text: 'Just one photo from Google, but it\'s small.', why: 'Small doesn\'t make it OK. Swap it for one he has the right to use.' },
          { text: 'I don\'t know.', why: 'Kofi should know: every picture should be his own or used with permission.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the credit.',
        language: 'html',
        template: '<p><small>Photo by <[[1]] href="https://instagram.com/david">David</a></small></p>',
        blanks: [['a']],
        distractors: ['img', 'link', 'cite'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make Night Bus kind: controls and loop, no autoplay, and fallback text Your browser can\'t play this beat.',
        starter: '<audio autoplay src="beat-3.mp3"></audio>\n',
        solution: '<audio controls loop src="beat-3.mp3">Your browser can\'t play this beat.</audio>\n',
        hint: 'Replace autoplay with controls loop, and put the text between the tags.',
        checks: [
          { message: 'A play button', dom: { selector: 'audio[controls]', count: 1 } },
          { message: 'It loops', dom: { selector: 'audio[loop]', count: 1 } },
          { message: 'No autoplay', dom: { selector: 'audio[autoplay]', count: 0 } },
          { message: 'Fallback text', dom: { selector: 'audio', text: 'can\'t play this beat' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element groups a picture with its caption?',
        answers: ['figure', '<figure>'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'The organiser had five minutes. If someone had five minutes on your page, what would you want them to see and hear?',
    starters: ['In five minutes they\'d...', 'The first thing would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open your playground page as if you\'re a busy stranger with five minutes. What do you look at first? What would you change?',
  },
  notes: 'Checkpoint 3 of Chapter 3: reviews copyright and credit (l11), audio/controls (l12), autoplay/loop/fallback (l13), figure/figcaption and linked images (l14).',
};

export default lesson;
