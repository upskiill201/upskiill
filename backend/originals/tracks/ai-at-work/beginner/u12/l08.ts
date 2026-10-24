import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 8 — image and video tools. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Image and video tools',
  summary: 'The agency wants an AI video ad for the pilot. Ada sorts what image and video tools are good for from the risks of using them.',
  minutes: 12,
  outcomes: [
    'Know what image and video AI tools do well',
    'Know the rules on real people and labelling',
    'Decide when a real photo or video is better',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'AI video tools can make short clips from a text description.',
          isFact: true,
          explain: 'Several tools can generate short video clips. Quality varies, and details like hands and text often go wrong.',
        },
        {
          text: 'It\'s fine to make an AI video of a real person saying something they never said, if it\'s for an ad.',
          isFact: false,
          explain: 'Using someone\'s likeness without consent can be illegal and is deceptive. Many platforms ban it.',
        },
        {
          text: 'Some platforms and laws now require AI-generated content to be labelled.',
          isFact: true,
          explain: 'Rules are spreading: for example, the EU AI Act includes transparency rules for deepfakes, and major platforms ask for AI labels.',
        },
        {
          text: 'An AI video of "happy customers" is as convincing as real customers.',
          isFact: false,
          explain: 'Real testimonials, with permission, are honest. Fake customers in an ad mislead people.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'AI video and images: fine for concepts and mood. Never fake real people or fake customers. Label AI content where rules ask for it.',
    },
  ],
  apply: {
    scenario: 'The agency pitches an AI video ad.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fine to make with AI, or not?',
        groups: ['Fine', 'Not OK'],
        items: [
          { text: 'An animated explainer of how payments work', group: 0 },
          { text: 'A video of a real shop owner saying words she never said', group: 1 },
          { text: 'A mood clip of a busy market at sunrise', group: 0 },
          { text: 'Fake "happy customers" presented as real', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the EU AI Act include about deepfakes?',
        options: [
          { text: 'Nothing', why: 'It includes transparency rules.' },
          { text: 'Transparency rules, such as disclosing AI-generated content' },
          { text: 'A total ban on all AI video', why: 'It requires transparency.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The agency wants to show an AI-generated "shop owner" praising the app. OK?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Sure, nobody can tell.', why: 'It\'s misleading.' },
          { text: 'Only if it\'s short.', why: 'Length doesn\'t fix it.' },
          { text: 'Let\'s not present a fake person as a real customer. Real shop owners, with permission, will be more honest and more convincing.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: 'Never fake real [[1]]. [[2]] AI content where rules ask.',
        blanks: [['people'], ['Label']],
        distractors: ['colours', 'Hide'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to the best choice.',
        pairs: [
          ['Explain how payments work', 'AI animation'],
          ['Show real customer views', 'Real interviews, with permission'],
          ['Set the mood', 'AI mood clip'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the agency\'s plan must change?',
        lines: [
          'Opening: AI mood clip of a market',
          'Middle: AI animation of a payment',
          'End: AI clone of our CEO\'s voice making a promise',
          'Label: "Includes AI-generated scenes"',
        ],
        bug: 2,
        fix: 'Have the CEO record it, or remove it.',
        explanation: 'Cloning a real person\'s voice without consent is deceptive.',
      },
      {
        kind: 'mcq',
        prompt: 'What often goes wrong in AI video?',
        options: [
          { text: 'Colours only', why: 'Fine details.' },
          { text: 'Hands, faces and text' },
          { text: 'Nothing', why: 'Details go wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s label.',
        tiles: ['Includes', 'AI-generated', 'scenes'],
        distractors: ['real'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using someone\'s likeness needs their ... (one word)',
        answers: ['consent', 'permission'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Fake people in ads are fine', group: 0 },
          { text: 'AI can make short video clips', group: 1 },
          { text: 'AI customers convince like real ones', group: 0 },
          { text: 'Some rules require AI labels', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s check on an AI ad.',
        lines: ['Any real people shown or voiced?', 'Do they consent?', 'Would it mislead viewers?', 'Is it labelled where needed?'],
      },
      {
        kind: 'mcq',
        prompt: 'Why are real testimonials better than AI ones?',
        options: [
          { text: 'They\'re cheaper', why: 'Honesty.' },
          { text: 'They aren\'t better', why: 'Fake ones mislead.' },
          { text: 'They\'re honest, and trust is the point of a testimonial' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If your team made an AI video, what would you be comfortable showing, and what wouldn\'t you?',
    starters: ['Comfortable:', 'Not comfortable:'],
  },
  deepen: { title: 'Try it today', summary: 'Check whether the platforms your company posts on require AI-content labels.' },
  notes: 'EU AI Act (Regulation 2024/1689) Article 50 transparency obligations for deepfakes. Platform labelling rules vary. Not legal advice.',
};

export default lesson;
