import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Card deck: must-have vs nice-to-have checklist. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The quick checklist',
  summary: 'The four questions are great on a Sunday. In a shop on a Wednesday, Ada needs something faster. Three cards: a 10-second checklist for any purchase.',
  minutes: 10,
  outcomes: [
    'Use a 10-second need–want check in the moment',
    'Know the warning signs of a want dressed as a need',
    'Decide fast without regret',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The 10-second check.</strong> Before you pay, ask three things:</p><ol><li><strong>Do I already have something that does this?</strong></li><li><strong>Would I buy it at full price, with cash, today?</strong></li><li><strong>Is it on my plan?</strong></li></ol><p>Three yeses (well, a no, a yes and a yes) and you\'re probably fine.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Warning signs</strong> that a want is dressed as a need:</p><ul><li>You\'re explaining to yourself why you need it.</li><li>It\'s "on sale" and you weren\'t looking for it.</li><li>You\'d be embarrassed telling Ngozi (or your own Ngozi) what it cost.</li><li>You feel a rush, not relief.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>Relief vs rush.</strong> Buying a real need usually feels like relief: "good, that\'s sorted." Buying a want feels like a rush: "ooh!" Both are fine. Just know which one you\'re feeling, and only rush on purpose.</p>',
    },
    {
      kind: 'check',
      question: 'Ada wants a third pair of sandals. She has two that are fine. First question of the check?',
      options: ['Do I already have something that does this? Yes.', 'Is it on sale?', 'Will Ngozi like it?'],
      answer: 0,
      explanation: 'She already has two pairs that work. It\'s a want.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In the moment: Do I already have one? Would I buy it at full price today? Is it on my plan? And: is this relief, or a rush?',
    },
  ],
  apply: {
    scenario: 'Wednesday at the shop.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the 10-second check.',
        lines: ['Do I already have something that does this?', 'Would I buy it at full price today?', 'Is it on my plan?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Relief or rush?',
        groups: ['Relief', 'Rush'],
        items: [
          { text: 'Finally buying soap when it ran out', group: 0 },
          { text: 'A flashy bag on sale', group: 1 },
          { text: 'A phone charger when yours broke', group: 0 },
          { text: 'Sneakers you saw in an ad', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a warning sign of a want dressed as a need?',
        options: [
          { text: 'You\'re explaining to yourself why you need it' },
          { text: 'It\'s on your list', why: 'That\'s planned.' },
          { text: 'You ran out of it', why: 'That sounds like a need.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'This dress is 40% off and I\'d look amazing at the conference!',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Run the check: do you have something that works? Would you pay full price? Is it on the plan? If it passes, great.' },
          { text: '40% off! Buy it!', why: 'On sale and unplanned is a warning sign.' },
          { text: 'Never buy dresses.', why: 'She might need something for the conference. Check first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The feeling check.',
        template: 'Is this [[1]], or a [[2]]?',
        blanks: [['relief'], ['rush']],
        distractors: ['need', 'sale'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each warning sign to an example.',
        pairs: [
          ['Explaining why you need it', '"I deserve it, and also..."'],
          ['On sale, not looking for it', '40% off a dress'],
          ['Embarrassed to say the price', 'Hiding the receipt from Ngozi'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which answer to the check is a giveaway?',
        lines: [
          'Do I already have one? No.',
          'Would I buy it at full price today? Only because it\'s on sale.',
          'Is it on my plan? Yes.',
        ],
        bug: 1,
        fix: 'If only the sale makes it worth it, it\'s probably a want.',
        explanation: 'If you wouldn\'t pay full price, the discount is doing the deciding.',
      },
      {
        kind: 'mcq',
        prompt: 'Is buying something for the rush ever okay?',
        options: [
          { text: 'Yes, on purpose, from your fun or upgrade budget' },
          { text: 'Never', why: 'Planned rushes are fine.' },
          { text: 'Always', why: 'Not when it eats the plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ₦40,000 dress at 40% off costs how much?',
        answers: ['24000', '24,000', '₦24,000', '₦24000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Ada already has a dress she loves for the conference. What does the check say about the new one?',
        options: [
          { text: 'It\'s a want; skip it or pay from the upgrade budget' },
          { text: 'It\'s a need', why: 'She already has one that works.' },
          { text: 'It\'s a must-have', why: 'She has one.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Next time you\'re about to buy something, run the 10-second check. What happened?',
    starters: ['I nearly bought...', 'The check said...'],
  },
  deepen: {
    title: 'Speed and regret',
    summary: 'Quick checks like this work because they slow you down just enough. Even a short pause has been shown to reduce impulse purchases. How to Stop Impulse Buying, another course in this set, goes further.',
  },
  notes: 'Quick checklist is a teaching device. Dress 40,000 × 0.6 = 24,000 (fictional).',
};

export default lesson;
