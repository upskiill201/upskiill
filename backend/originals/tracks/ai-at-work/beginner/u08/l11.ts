import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 11 — images you're allowed to use. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Images you\'re allowed to use',
  summary: 'Ada found a perfect photo online and almost dropped it into the deck. Who owns images, and what about AI ones? The basics every presenter needs.',
  minutes: 12,
  outcomes: [
    'Know that most online images aren\'t free to use',
    'Know the basics of AI images and ownership',
    'Pick safe image sources for work',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Who owns the picture?',
      html:
        '<ul>' +
        '<li><strong>Online images are usually owned by someone.</strong> Finding it in a search doesn\'t mean you can use it.</li>' +
        '<li><strong>Safe sources:</strong> your own photos (with people\'s permission), your company\'s image library, stock images you have a licence for, or images marked for free reuse with the terms checked.</li>' +
        '<li><strong>AI images:</strong> each tool has terms about how you can use what it makes, so check them for work use. In the US, the Copyright Office has said images made entirely by AI, without human creative input, can\'t be copyrighted. Rules differ by country.</li>' +
        '<li><strong>Never</strong> use AI to make images of real people, or copy a living artist\'s style or another company\'s brand.</li>' +
        '</ul>' +
        '<p>If in doubt, ask your company\'s marketing or legal team which sources are approved.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Found online isn\'t free to use. Use your own, your company\'s, licensed stock, or AI images within the tool\'s terms. No fake images of real people or brands.',
    },
  ],
  apply: {
    scenario: 'Ada picks images for the founders\' deck.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Safe to use at work, or not?',
        groups: ['Safe', 'Not safe'],
        items: [
          { text: 'A photo Ada took at launch, with permission', group: 0 },
          { text: 'A photo copied from a news website', group: 1 },
          { text: 'A licensed stock image', group: 0 },
          { text: 'An AI image of a real politician using our app', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ada found the perfect photo in an image search. Can she use it?',
        options: [
          { text: 'Yes, it\'s on the internet', why: 'Online isn\'t free.' },
          { text: 'Not unless she checks the licence and it allows her use' },
          { text: 'Yes, if she credits the website', why: 'Credit isn\'t permission.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What has the US Copyright Office said about images made entirely by AI?',
        options: [
          { text: 'The AI company owns all copyright', why: 'The Office focused on human authorship.' },
          { text: 'They are banned', why: 'They\'re allowed; just not copyrightable alone.' },
          { text: 'They can\'t be copyrighted without human creative input' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you make an AI image of our CEO shaking hands with a famous footballer for the deck?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I\'d rather not: a fake image of real people could mislead and cause legal trouble. How about a real photo of the CEO at the launch?' },
          { text: 'Sure, it\'ll look great.', why: 'Fake images of real people are a no.' },
          { text: 'Only if it\'s small.', why: 'Size doesn\'t make it OK.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: 'Found [[1]] isn\'t free to use. Check the [[2]].',
        blanks: [['online'], ['licence', 'license', 'terms']],
        distractors: ['offline', 'colour'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the image source to what to check.',
        pairs: [
          ['Your own photo of people', 'Their permission'],
          ['Stock image', 'The licence'],
          ['AI image', 'The tool\'s terms of use'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which image in Ada\'s deck is a problem?',
        lines: [
          'Cover: AI illustration, within the tool\'s terms',
          'Slide 4: launch photo, owners agreed',
          'Slide 5: a rival app\'s logo, edited to look worse',
          'Slide 6: licensed stock photo of Accra',
        ],
        bug: 2,
        fix: 'Remove it.',
        explanation: 'Altering another company\'s brand is a legal and ethical risk.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question for the marketing team.',
        tiles: ['Which', 'image', 'sources', 'are', 'approved?'],
        distractors: ['free'],
      },
      {
        kind: 'sortGroups',
        prompt: 'OK with an AI image tool, or never?',
        groups: ['OK', 'Never'],
        items: [
          { text: 'An abstract market scene', group: 0 },
          { text: 'A real person who didn\'t agree', group: 1 },
          { text: 'A simple concept illustration', group: 0 },
          { text: 'A copy of a living artist\'s signature style', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Does crediting a website give you permission to use its photo? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s image check.',
        lines: ['Where did it come from?', 'Who owns it?', 'Does the licence or terms allow this use?', 'Are real people in it, and did they agree?'],
      },
      {
        kind: 'mcq',
        prompt: 'Who should Ada ask if she\'s unsure?',
        options: [
          { text: 'The AI tool', why: 'Ask the people responsible.' },
          { text: 'Nobody', why: 'Ask when unsure.' },
          { text: 'Her company\'s marketing or legal team' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where do the images in your last presentation come from? Were you allowed to use them?',
    starters: ['The images came from...', 'Allowed?'],
  },
  deepen: { title: 'Try it today', summary: 'Find out where your company keeps approved images, and which stock sites it has licences for.' },
  notes: 'US Copyright Office: Zarya of the Dawn decision (Feb 2023) and registration guidance (Mar 2023) require human authorship. Not legal advice; rules vary by country.',
};

export default lesson;
