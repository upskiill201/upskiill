import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12 — audio, controls, src: the first playable beat on the page. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Press play',
  summary: 'The moment Kofi has waited three chapters for. One tag, and his beat plays right on the page. Press play in the lesson: that\'s a real Mensah Beats track.',
  minutes: 11,
  outcomes: ['Put playable sound on a page with audio', 'Show the play button with controls', 'Point src at a sound file'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap the parts of the player',
      text: '<h2>Jollof Bounce</h2>\n<audio controls src="beat-2.mp3"></audio>',
      hotspots: [
        { phrase: '<audio', note: 'audio puts a sound on the page. Unlike img, it has a closing tag: </audio>.' },
        { phrase: 'controls', note: 'Shows the player: play, pause, a timeline and volume. Without controls, there\'s nothing to press, so the sound is invisible.' },
        { phrase: 'src="beat-2.mp3"', note: 'Which sound file, just like an img\'s src. .mp3 works in every browser.' },
        { phrase: '</audio>', note: 'The closing tag. Anything you put between the tags shows only in browsers that can\'t play sound (next lesson).' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Press play',
      caption: 'That\'s a real Mensah Beats track, made by Teyro for this course. Press play on the page.',
      code: '<h2>Jollof Bounce</h2>\n<audio controls src="beat-2.mp3"></audio>\n',
      challenge: 'Add a second player for beat-1.mp3, with an h2 Sunrise in Osu above it.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '<audio controls src="beat.mp3"></audio>. controls shows the play button. Without it, nobody can press play.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s beats become playable.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['audio', 'Puts a sound on the page'],
          ['controls', 'Shows the play button'],
          ['src', 'Which sound file'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make Jollof Bounce playable: an audio player with controls for beat-2.mp3',
        starter: '<h2>Jollof Bounce</h2>\n',
        solution: '<h2>Jollof Bounce</h2>\n<audio controls src="beat-2.mp3"></audio>\n',
        hint: '<audio controls src="beat-2.mp3"></audio>',
        checks: [
          { message: 'A sound player', dom: { selector: 'audio', count: 1 } },
          { message: 'It shows the play button', dom: { selector: 'audio[controls]', count: 1 } },
          { message: 'It plays beat-2.mp3', dom: { selector: 'audio', attr: 'src', attrValue: 'beat-2.mp3' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s player has no controls. What do visitors see?',
        options: [
          { text: 'A play button anyway', why: 'Without controls, the browser shows nothing to press.' },
          { text: 'Nothing: the sound is on the page but can\'t be played' },
          { text: 'The file name', why: 'Without controls, nothing shows at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the player nobody can press play on.',
        language: 'html',
        lines: ['<audio controls src="beat-1.mp3"></audio>', '<audio src="beat-2.mp3"></audio>', '<audio controls src="beat-3.mp3"></audio>'],
        bug: 1,
        fix: '<audio controls src="beat-2.mp3"></audio>',
        explanation: 'No controls attribute, so no play button.',
      },
      {
        kind: 'mcq',
        prompt: 'How is audio different from img?',
        options: [
          { text: 'audio has a closing tag, img doesn\'t' },
          { text: 'audio doesn\'t need src', why: 'Both need to know which file: both use src.' },
          { text: 'They\'re the same', why: 'audio plays sound and has a closing tag; img shows a picture and is empty.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I pressed play on your page. That\'s actually Night Bus?! Right in the website?',
        options: [
          { text: 'Right in the website. One audio tag.' },
          { text: 'No, it\'s opening Spotify.', why: 'It plays right on the page, no app needed.' },
          { text: 'It\'s a video.', why: 'It\'s sound only: the audio element.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a player for beat-3.mp3',
        language: 'html',
        tiles: ['<audio', ' controls', ' src="beat-3.mp3"', '>', '</audio>'],
        distractors: [' href="beat-3.mp3"', '<sound>'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the player.',
        language: 'html',
        template: '<audio [[1]] src="beat-1.mp3"></[[2]]>',
        blanks: [['controls'], ['audio']],
        distractors: ['play', 'sound', 'autoplay'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute shows the play button on an audio player?',
        answers: ['controls'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'The full beats section: an h2 My beats, then three players with controls, for beat-1.mp3, beat-2.mp3 and beat-3.mp3',
        starter: '',
        solution: '<h2>My beats</h2>\n<audio controls src="beat-1.mp3"></audio>\n<audio controls src="beat-2.mp3"></audio>\n<audio controls src="beat-3.mp3"></audio>\n',
        hint: 'An h2, then three audio tags, each with controls and its own src.',
        checks: [
          { message: 'A heading My beats', dom: { selector: 'h2', text: 'My beats' } },
          { message: 'Three players with play buttons', dom: { selector: 'audio[controls]', count: 3 } },
          { message: 'One plays beat-3.mp3', dom: { selector: 'audio[src="beat-3.mp3"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What sound would you put on your own page: a song you love, a voice note, a sound from your city?',
    starters: ['I\'d put...', 'Because it...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, put all three Mensah Beats tracks on a page, each under its own heading. Which one is your favourite?',
  },
  notes: 'HTML Living Standard §4.8.10 audio (media element; controls is a boolean attribute). MP3 is supported in all current browsers (MDN, "Media container formats"). Beats are Teyro-made (scratchpad beats.cjs), so no copyright issues. Boolean attributes have empty values, so checks use audio[controls] selectors rather than attr.',
};

export default lesson;
