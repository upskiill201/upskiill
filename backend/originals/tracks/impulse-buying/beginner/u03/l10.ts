import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: find every trick. Cliffhanger: the message about Yaw. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: find every trick',
  summary: 'Mum sends Kofi a screenshot from her own phone: "Is this real? A woman at church says I should buy it." Use everything from Chapter 3 to find every trick. Then Kofi\'s phone buzzes with a message he was never meant to get.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Find every persuasion trick on a real-looking page', 'Explain each trick and its defence to someone else'],
  learn: [
    {
      kind: 'story',
      title: 'Two messages',
      beats: [
        { speaker: 'narrator', text: 'Back in Kumasi. A WhatsApp from Mum: a screenshot of a blender ad. "Kofi, is this real? Sister Grace at church says buy it quickly."' },
        { speaker: 'kofi', text: 'Mum. The woman who taught me "never say last two" is asking ME about a "last two" ad?' },
        { speaker: 'narrator', text: '"On the phone it\'s different. Explain it to me."' },
        { speaker: 'narrator', text: 'Twenty minutes later, as he sends his answer, another message arrives. Unknown number.' },
        { speaker: 'narrator', text: '"This is a message to all contacts of YAW BOATENG. He owes GH₵1,150 and has refused to pay. Tell him to settle immediately or further action will be taken."' },
        { speaker: 'narrator', text: 'Across the room, Yaw\'s phone is face down on his bed, buzzing. And buzzing.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: honest vs pressure selling, scarcity, anchors, decoys, dark patterns, influencers and the sale myth. Chapter 4: what\'s really happening with Yaw, and what a friend does now. First, help Mum.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: Mum\'s blender ad. "Professional blender. Was GH₵2,400, now GH₵699! Only 2 left! Offer ends in 14:59. 1,200 happy customers. Choose: Standard GH₵699, Deluxe GH₵1,149, Deluxe Plus GH₵1,199. Pay later available. Add warranty (pre-ticked) GH₵99. No thanks, I prefer lumpy juice."',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the ad to its trick.',
        pairs: [
          ['"Was GH₵2,400"', 'Anchor'],
          ['"Only 2 left!"', 'Scarcity'],
          ['"Ends in 14:59"', 'Urgency'],
          ['Deluxe at GH₵1,149', 'Decoy'],
          ['"No thanks, I prefer lumpy juice"', 'Confirmshaming'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the first thing Kofi should tell Mum to check?',
        options: [
          { text: 'What blenders like this cost at two or three other shops' },
          { text: 'Whether to buy Deluxe Plus', why: 'That\'s the decoy\'s target.' },
          { text: 'How fast she can order', why: 'Speed is what the ad wants.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Can Mum check it, or not?',
        groups: ['Can check', 'Can\'t check'],
        items: [
          { text: 'Prices at other shops', group: 0 },
          { text: '"1,200 happy customers"', group: 1 },
          { text: 'Whether the timer resets', group: 0 },
          { text: '"Only 2 left"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Standard GH₵699 with the pre-ticked warranty GH₵99. What\'s the total if Mum doesn\'t untick it?',
        answers: ['798', 'GH₵798', '798 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Mum: "But Sister Grace bought one and loves it."',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'That\'s one review, and a good one. Do you need a blender? If yes, compare three prices, untick the warranty, and buy the Standard.' },
          { text: 'Sister Grace was scammed.', why: 'She may have a great blender. It\'s about Mum\'s need and price.' },
          { text: 'Buy Deluxe Plus then.', why: 'The decoy\'s favourite.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Kofi\'s advice to Mum.',
        template: 'Compare three [[1]], untick the [[2]], and ignore the [[3]].',
        blanks: [['prices'], ['warranty', 'box'], ['timer', 'countdown']],
        distractors: ['reviews', 'church'],
      },
      {
        kind: 'mcq',
        prompt: 'Deluxe GH₵1,149, Deluxe Plus GH₵1,199. What is Deluxe for?',
        options: [
          { text: 'To make Deluxe Plus look like a bargain' },
          { text: 'For people who want the middle', why: 'It\'s priced to push people up, not to be chosen.' },
          { text: 'Nothing', why: 'Decoys have a clear job.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Mum\'s plan. Which step is still caught by a trick?',
        lines: [
          'Check two other shops for blender prices.',
          'Buy Standard if I really need one.',
          'Leave the warranty ticked, it\'s probably required.',
          'Ignore the timer.',
        ],
        bug: 2,
        fix: 'Untick the warranty unless I chose it.',
        explanation: 'Pre-ticked boxes are sneaking. Required costs would be in the price.',
      },
      {
        kind: 'mcq',
        prompt: 'Why might "pay later" be risky for Mum?',
        options: [
          { text: 'It hides the "ouch" and adds a debt with rules she may not have read' },
          { text: 'It\'s always illegal', why: 'It\'s legal. The risks are in the terms.' },
          { text: 'It isn\'t risky', why: 'Missed payments can bring fees and pressure.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Kofi walks Mum through the ad.',
        lines: ['Do you need it?', 'Ignore the "was" price', 'Compare three real prices', 'Ignore the timer and stock claims', 'Untick the add-ons', 'Decide tomorrow'],
      },
      {
        kind: 'mcq',
        prompt: 'The message about Yaw went to all his contacts. Which Chapter 2 or 3 idea does it connect to?',
        options: [
          { text: 'Pay-later and loan apps that take contact access, the risk Kofi saw in Budgeting' },
          { text: 'Anchoring', why: 'This is about debt collection, not prices.' },
          { text: 'Decoys', why: 'This is about debt.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The ad\'s "was" price is GH₵2,400 and the sale price GH₵699. What percent off does it claim? (Round to the nearest whole number.)',
        answers: ['71', '71%', '71 percent'],
        placeholder: 'A percent',
      },
    ],
  },
  reflect: {
    prompt: 'Who in your family might fall for one of these tricks? How would you explain it to them, kindly?',
    starters: ['I\'d explain to...', 'I\'d say...'],
  },
  notes: 'Chapter 3 challenge. Mum\'s blender ad (fictional). Sister Grace (narrated, church member; not cast-Grace). 1 − 699/2400 = 70.9% → 71. Cliffhanger: debt-collection message to Yaw\'s contacts (GH₵1,150 to one app; total GH₵2,900 across three revealed in Ch4).',
};

export default lesson;
