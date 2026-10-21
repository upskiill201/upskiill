import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 18 — visuals that look AI-made (and how to avoid it). */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Visuals that look AI-made',
  summary: 'Glossy purple gradients, the same smiling stock faces, too many icons. Audiences spot "AI slop" fast. Myths and facts about keeping your deck human.',
  minutes: 12,
  outcomes: [
    'Spot the tell-tale signs of generic AI visuals',
    'Make AI-assisted slides look like your own',
    'Prefer real, specific material',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'More icons and effects make slides look more professional.',
          isFact: false,
          explain: 'Lots of decorative icons, gradients and effects look generic and distract from the message.',
        },
        {
          text: 'Real, specific details, like your own photos and numbers, make a deck more convincing.',
          isFact: true,
          explain: 'Specifics show it\'s your work about your situation. Generic images could be from anyone.',
        },
        {
          text: 'Using your company\'s own colours and fonts makes AI-assisted slides feel like yours.',
          isFact: true,
          explain: 'A consistent template, not whatever the tool picks, keeps the deck on-brand.',
        },
        {
          text: 'If a slide was drafted with AI, audiences will always reject it.',
          isFact: false,
          explain: 'They react to generic, empty slides, not to the tool. Clear, specific, honest slides work however they were made.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your template, your photos, your numbers, few icons, no effects. Specific beats shiny.',
    },
  ],
  apply: {
    scenario: 'Ada gives her deck a final look.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Feels human and specific, or generic AI?',
        groups: ['Human and specific', 'Generic AI'],
        items: [
          { text: 'A real photo from the Makola launch', group: 0 },
          { text: 'Glossy purple gradient background', group: 1 },
          { text: 'The company\'s own template', group: 0 },
          { text: 'Six random icons per slide', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes audiences reject a slide?',
        options: [
          { text: 'Generic, empty content, not the tool used' },
          { text: 'Any AI involvement', why: 'They react to empty slides.' },
          { text: 'Using real photos', why: 'Real photos help.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI made your slides look super glossy. Keep that style?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I\'m switching to our company template and real launch photos. Glossy looks generic; ours looks like it actually happened.' },
          { text: 'Yes, glossy is professional.', why: 'Glossy often reads as generic.' },
          { text: 'I\'ll add more effects.', why: 'Less is more.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] beats shiny. Use your own [[2]].',
        blanks: [['Specific'], ['template', 'photos']],
        distractors: ['Glossy', 'gradients'],
      },
      {
        kind: 'findBug',
        prompt: 'Which slide choice looks most like generic AI?',
        lines: [
          'Company template, brand colours',
          'Real photo of a shop owner (with permission)',
          'A stock image of people in suits high-fiving',
          'Chart from the real pilot data',
        ],
        bug: 2,
        fix: 'A real photo from the pilot, or no image.',
        explanation: 'Generic stock "success" images say nothing about your work.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the generic choice to a specific swap.',
        pairs: [
          ['Stock high-five photo', 'Real launch photo'],
          ['Random icons', 'One meaningful chart'],
          ['Tool\'s default theme', 'Company template'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request keeps AI-drafted slides on-brand?',
        options: [
          { text: 'Make my slides pop.', why: 'Invites effects.' },
          { text: 'Draft the slide text only. I\'ll put it into our company template with our own photos and charts.' },
          { text: 'Design everything however you like.', why: 'Off-brand defaults.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s design rule.',
        tiles: ['Few', 'icons,', 'no', 'effects'],
        distractors: ['more'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Specific beats ... (one word)',
        answers: ['shiny', 'glossy'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'More effects look more professional', group: 0 },
          { text: 'Real details are more convincing', group: 1 },
          { text: 'Any AI help ruins a deck', group: 0 },
          { text: 'Your own template feels more like yours', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s final design pass.',
        lines: ['Switch to the company template', 'Swap stock images for real ones', 'Remove extra icons and effects', 'Check every slide has one idea'],
      },
      {
        kind: 'mcq',
        prompt: 'Why use real photos from the pilot?',
        options: [
          { text: 'They prove it really happened' },
          { text: 'They\'re prettier', why: 'They\'re evidence.' },
          { text: 'No reason', why: 'They add proof.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your last deck. What\'s one generic element you\'d replace with something specific?',
    starters: ['Generic:', 'Replace with:'],
  },
  deepen: { title: 'Try it today', summary: 'Replace one stock image in a deck with a real photo or a real chart.' },
  notes: 'General design guidance.',
};

export default lesson;
