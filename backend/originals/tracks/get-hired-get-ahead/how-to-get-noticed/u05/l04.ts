import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 4 — photo and banner. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Photo and banner',
  summary: 'Clinton doesn\'t own a camera and can\'t afford a photographer. He doesn\'t need either. Kofi, who once made his own music website, talks him through a profile photo taken on a phone, by a window, in five minutes.',
  minutes: 11,
  outcomes: ['Take a good profile photo with a phone', 'Choose a simple banner', 'Keep your photo professional and safe'],
  learn: [
    {
      kind: 'steps',
      title: 'A good photo, on a phone, in five steps',
      steps: [
        { title: '1. Find window light', body: 'Stand facing a window during the day. Soft daylight on your face beats any flash. Avoid strong light behind you, which turns you into a shadow.' },
        { title: '2. Plain background', body: 'A wall, a door, a quiet corner. Nothing that distracts: no posters, no party, no washing on the line.' },
        { title: '3. Face fills most of the frame', body: 'Head and shoulders, face roughly in the middle, looking at the camera. Ask a friend to take it at eye level, or use the timer.' },
        { title: '4. Dress like the job, smile like a person', body: 'Wear what you\'d wear to an interview for that kind of role. A relaxed, natural smile. Recent: it should look like you today.' },
        { title: '5. Banner: simple and relevant', body: 'The wide image behind your photo. Use a plain colour, your city, or something linked to your work, like a screenshot of your project. Never anything personal or rude.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Photo norms differ by country (Chapter 3), but on LinkedIn a clear, friendly photo is normal almost everywhere and helps people recognise you at interviews.',
    },
  ],
  apply: {
    scenario: 'Kofi helps Clinton with his photo.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the photo steps in order.',
        lines: ['Find window light', 'Plain background', 'Face fills most of the frame', 'Dress like the job, natural smile', 'Choose a simple banner'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good profile photo or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Face by a window, plain wall behind', group: 0 },
          { text: 'A group photo with friends', group: 1 },
          { text: 'Head and shoulders, smiling', group: 0 },
          { text: 'Sunglasses and a party drink', group: 1 },
          { text: 'A photo from five years ago', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best free light for a profile photo?',
        options: [
          { text: 'Daylight from a window, facing you' },
          { text: 'The phone\'s flash', why: 'Flash is harsh. Window light is softer.' },
          { text: 'Light behind you', why: 'That turns your face into a shadow.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'You don\'t need a photographer. Got a window and a friend?',
        options: [
          { text: 'Yes. I\'ll stand facing the window, plain wall behind, and you take it at eye level.' },
          { text: 'I\'ll just crop the wedding photo.', why: 'Half his face and a drink. A new photo is easy.' },
          { text: 'I\'ll use a cartoon avatar.', why: 'People want to recognise you at interviews. Use a real photo.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the banner choice to avoid.',
        lines: ['A plain blue background', 'A screenshot of his Njangi Tracker', 'A meme about hating Mondays'],
        bug: 2,
        explanation: 'Funny with friends, odd for a recruiter. Keep the banner simple or work-related.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to its fix.',
        pairs: [
          ['Dark face, bright window behind', 'Turn to face the window'],
          ['Busy background', 'Stand in front of a plain wall'],
          ['Face tiny in the frame', 'Head and shoulders, closer'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should you wear in the photo?',
        options: [
          { text: 'What you\'d wear to an interview for that kind of role' },
          { text: 'A costume', why: 'Keep it like the job.' },
          { text: 'Whatever you slept in', why: 'Dress like the job.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s tip.',
        template: 'Face the [[1]], keep the background [[2]].',
        blanks: [['window', 'light'], ['plain', 'simple']],
        distractors: ['wall', 'busy', 'dark'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The wide image behind your profile photo is called the ___. (one word)',
        answers: ['banner', 'cover', 'background'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which banner fits Clinton best?',
        options: [
          { text: 'A clean screenshot of the Njangi Tracker (with made-up data)' },
          { text: 'A photo of his football team celebrating', why: 'Fun, but not his professional story.' },
          { text: 'The default grey', why: 'Fine, but a work-related banner is better.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your current profile photo (or the one you\'d use). Does it pass all five steps?',
    starters: ['It passes...', 'I need to fix...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take ten photos by a window with a friend or a timer. Pick the one where you look most like yourself on a good day.',
  },
  notes: 'Photo guidance (natural light, plain background, head and shoulders, recent, dress for the role) is standard LinkedIn profile advice. Banner screenshots should use anonymised data (Ch2 privacy). Kofi cameo, consistent with HTML & CSS for Beginners.',
};

export default lesson;
