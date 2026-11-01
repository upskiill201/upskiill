import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7 — writing good alt text; alt="" for decorative pictures. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'What would Ama hear?',
  summary: 'Ama closes her eyes and listens to Kofi\'s page through her screen reader. "Image. cover-1 dot png." That\'s all she gets. Good alt text paints the picture in words.',
  minutes: 12,
  outcomes: ['Write alt text that says what matters about a picture', 'Use an empty alt for pictures that are only decoration', 'Avoid the common alt-text mistakes'],
  learn: [
    {
      kind: 'reading',
      title: 'A picture in a few words',
      html:
        '<p>Every year, the accessibility group <strong>WebAIM</strong> checks the home pages of the top one million websites. Missing alt text is one of the most common problems they find, year after year. Millions of people use screen readers, and for them, a picture with no alt is a blank, or a file name read out loud.</p>' +
        '<p><strong>Good alt text says what the picture means on this page</strong>, in a short sentence:</p>' +
        '<ul><li>Say what matters, not every detail. "Album cover for Sunrise in Osu: an orange sun rising over the sea" is plenty.</li>' +
        '<li>Don\'t start with "Image of" or "Picture of". Screen readers already say "image".</li>' +
        '<li>If the picture has words in it, like a flyer, include the words that matter.</li>' +
        '<li>If the picture is a link, describe where it goes: "Listen to Sunrise in Osu".</li></ul>' +
        '<p><strong>Decoration gets an empty alt.</strong> A wavy line or a background swirl adds nothing in words. Write <code>alt=""</code> (with nothing between the quotes) and screen readers skip it. Leaving alt out completely is different: then many read out the file name.</p>',
    },
    {
      kind: 'tryIt',
      title: 'What Ama hears',
      caption: 'Three pictures. The first has useful alt. The second is decoration, with alt="". The third has a bad alt. Fix the third.',
      code: '<img src="cover-1.png" alt="Album cover for Sunrise in Osu: an orange sun rising over the sea" width="150" height="150">\n<img src="phone-studio.png" alt="" width="150" height="100">\n<img src="cover-3.png" alt="image of cover-3.png" width="150" height="150">\n',
      challenge: 'Rewrite the third alt: Album cover for Night Bus to Kumasi: a lit road at night.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The test: close your eyes and have someone read you the alt. Do you know what the picture shows, and why it\'s there?',
    },
  ],
  apply: {
    scenario: 'Kofi rewrites his alt text with Ama listening.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which alt text is best for the Sunrise in Osu cover?',
        options: [
          { text: 'image of cover-1.png', why: 'File names mean nothing to a listener, and "image of" is already said.' },
          { text: 'Album cover for Sunrise in Osu: an orange sun rising over the sea' },
          { text: 'A beautiful square image with orange, pink, yellow, dark blue waves, a circle and white letters', why: 'Too much detail, and it misses what it is: the cover for this beat.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the alt text: it should say Album cover for Night Bus to Kumasi, not the file name',
        starter: '<img src="cover-3.png" alt="cover-3.png">\n',
        solution: '<img src="cover-3.png" alt="Album cover for Night Bus to Kumasi">\n',
        hint: 'Change only the alt value.',
        checks: [
          { message: 'The alt describes the cover', dom: { selector: 'img[alt*="Night Bus to Kumasi" i]', count: 1 } },
          { message: 'It\'s still cover-3.png', dom: { selector: 'img[src="cover-3.png"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real alt text, or alt="" (decoration)?',
        groups: ['Real alt text', 'alt="" (decoration)'],
        items: [
          { text: 'Kofi\'s album cover', group: 0 },
          { text: 'A wavy line between sections', group: 1 },
          { text: 'The gig flyer with the date on it', group: 0 },
          { text: 'A background swirl', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The phone-studio.png picture is only decoration. Give it an empty alt so screen readers skip it',
        starter: '<img src="phone-studio.png">\n',
        solution: '<img src="phone-studio.png" alt="">\n',
        hint: 'Add alt="" with nothing between the quotes.',
        checks: [{ message: 'An empty alt for the decoration', dom: { selector: 'img[alt=""]', count: 1 } }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between alt="" and no alt at all?',
        options: [
          { text: 'None', why: 'Big difference: alt="" says "skip me". No alt and many screen readers read the file name.' },
          { text: 'alt="" tells screen readers to skip it; with no alt, many read out the file name' },
          { text: 'No alt is better', why: 'No alt is the most common accessibility mistake on the web.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'My phone said "image, image, image". What ARE they?',
        options: [
          { text: 'They\'re just pictures.', why: 'Ama wants to know what they show. That\'s what alt is for.' },
          { text: 'Nothing important.', why: 'They\'re Kofi\'s album covers. Pretty important.' },
          { text: 'My album covers. I\'ll add alt text so your phone tells you.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the alt text with a classic mistake.',
        language: 'html',
        lines: ['<img src="cover-1.png" alt="Album cover for Sunrise in Osu">', '<img src="cover-2.png" alt="Picture of an image of the cover">', '<img src="phone-studio.png" alt="">'],
        bug: 1,
        fix: '<img src="cover-2.png" alt="Album cover for Jollof Bounce">',
        explanation: '"Picture of an image of" says nothing, and screen readers already say "image". Say what it shows.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the decoration.',
        language: 'html',
        template: '<img src="swirl.png" [[1]]="">',
        blanks: [['alt']],
        distractors: ['src', 'href', 'title'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who checks the top one million home pages for accessibility problems every year? (one word)',
        answers: ['WebAIM', 'webaim'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'The flyer has words on it. Show sound-up-saturdays.png with alt text that includes Sound Up Saturdays and Mensah Beats',
        starter: '',
        solution: '<img src="sound-up-saturdays.png" alt="Flyer: Sound Up Saturdays, live: Mensah Beats, Osu, 8pm, free entry">\n',
        hint: 'Put the flyer\'s important words in the alt.',
        checks: [
          { message: 'The flyer is on the page', dom: { selector: 'img[src="sound-up-saturdays.png"]', count: 1 } },
          { message: 'The alt includes Sound Up Saturdays', dom: { selector: 'img[alt*="Sound Up Saturdays"]', count: 1 } },
          { message: 'The alt includes Mensah Beats', dom: { selector: 'img[alt*="Mensah Beats"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Pick any photo on your phone. Write its alt text in your head in one sentence. What did you leave out, and why?',
    starters: ['My alt text would be...', 'I left out...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Turn on your phone\'s screen reader for a minute on any news site and listen to how it reads the pictures. Some will be great; some will just say "image".',
  },
  notes: 'WebAIM Million (annual report since 2019): "missing alternative text" for images is consistently among the most common detected WCAG failures on home pages. HTML Living Standard §4.8.4.4 (requirements for providing text to act as an alternative for images): empty alt for decorative images; omitting alt is an error. Screen readers commonly read the file name when alt is missing.',
};

export default lesson;
