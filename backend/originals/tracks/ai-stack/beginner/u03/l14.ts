import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14 — Multimodal: images and voice. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Images and voice',
  summary: 'A customer sends Ask Rao a photo of a kurta with a torn seam, and asks for a refund. Can a language model even look at a photo? Tey explains how images and voice become tokens too.',
  minutes: 11,
  outcomes: [
    'Explain how models can handle images and voice',
    'Know that images become many tokens',
    'Work out how many patches an image is cut into',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Many modern models are multimodal: they take text AND images, sometimes audio. The trick is the same as with words: turn everything into tokens.', replies: ['How does a photo become tokens?'] },
        { tey: 'It\'s cut into a grid of small squares, called patches. Each patch becomes a token the model can read alongside your text. A 512 x 512 photo cut into 32 x 32 patches is a 16 x 16 grid: 256 tokens.', replies: ['So photos are expensive?'] },
        { tey: 'Often more than a whole message of text. And voice? Speech is usually turned into text first (speech-to-text), or into audio tokens, then answered.', replies: ['Should Ask Rao read photos?'] },
        { tey: 'Maybe for damaged items: the help page already asks for a photo within 48 hours. But a model saying "refund approved" from a photo is a big decision. Better: it describes the photo, and a person decides.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Cutting a photo into patches',
      caption: 'Each patch is about one token for the model.',
      code: 'width, height = 512, 512\npatch = 32\npatches = (width // patch) * (height // patch)\nprint(patches, "patches")\n',
      challenge: 'What about a 1024 x 1024 photo?',
    },
  ],
  apply: {
    scenario: 'Photos and voice.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'A 1024 x 1024 photo cut into 32 x 32 patches. Print the number of patches',
        starter: 'width, height = 1024, 1024\npatch = 32\n',
        solution: 'width, height = 1024, 1024\npatch = 32\nprint((width // patch) * (height // patch))\n',
        hint: '(width // patch) * (height // patch)',
        checks: [{ message: 'Print 1024', outputEquals: '1024' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does "multimodal" mean?',
        options: [
          { text: 'A model that handles more than one kind of input, like text and images' },
          { text: 'A model with many users', why: 'It\'s about kinds of input, not users.' },
          { text: 'Several models in a row', why: 'One model, several kinds of input.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the input to how it becomes tokens.',
        pairs: [
          ['Text', 'Cut into word pieces'],
          ['Image', 'Cut into a grid of patches'],
          ['Voice', 'Turned into text or audio tokens'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A safe job for Ask Rao with photos, or one for a person?',
        groups: ['Ask Rao can help', 'A person should decide'],
        items: [
          { text: 'Describing the damage in the photo', group: 0 },
          { text: 'Approving a refund', group: 1 },
          { text: 'Checking a photo was attached', group: 0 },
          { text: 'Deciding the customer is lying', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Let\'s let Ask Rao approve refunds from photos. Fast!',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Fast, and risky: it can be fooled or simply wrong, and money moves. Let it describe the photo and pass it to a person to approve.' },
          { text: 'Yes, automate all refunds.', why: 'Money decisions need a human check.' },
          { text: 'Models can\'t see photos.', why: 'Multimodal ones can.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print((512 // 32) * (512 // 32))',
        language: 'python',
        options: [
          { text: '256' },
          { text: '16', why: 'That\'s one side of the grid. Multiply both sides.' },
          { text: '32', why: 'That\'s the patch size.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Photo to tokens.',
        template: 'A photo is cut into a grid of [[1]], and each one becomes about one [[2]].',
        blanks: [['patches'], ['token']],
        distractors: ['pixels', 'page'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: [
          'Multimodal models can read images and text.',
          'A photo can cost more tokens than a text message.',
          'Images cost nothing because they aren\'t words.',
          'Speech is often turned into text first.',
        ],
        bug: 2,
        fix: 'Images become tokens too, and are often costly.',
        explanation: 'A 512 x 512 photo is about 256 patch tokens.',
      },
      {
        kind: 'mcq',
        prompt: 'The help page says "send a photo within 48 hours". What\'s a sensible first photo feature for Ask Rao?',
        options: [
          { text: 'Confirm a photo arrived, describe it, and pass it to the team' },
          { text: 'Automatically refund every photo', why: 'Money needs a human decision.' },
          { text: 'Ignore photos', why: 'The policy asks for them; helping is good.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are the small squares a photo is cut into called?',
        answers: ['patches', 'patch'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Would you trust an AI to judge a photo of damage in your own refund request? What would make you trust it more?',
    starters: ['I would/wouldn\'t trust it because...', 'I\'d trust it more if...'],
  },
  deepen: {
    title: 'Humans in the loop',
    summary: 'For decisions that move money or affect people, let the model prepare and a person decide. Chapter 8 makes this a rule: some actions always need a human\'s approval.',
  },
  notes: 'Vision transformers split images into fixed-size patches embedded as tokens (Dosovitskiy et al. 2020, 16x16 patches; sizes vary by model). Illustrative: 512/32 = 16 -> 256 patches; 1024/32 = 32 -> 1024. Speech is commonly transcribed (ASR) or tokenized as audio.',
};

export default lesson;
