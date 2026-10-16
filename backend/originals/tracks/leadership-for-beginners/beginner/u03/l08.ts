import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Card deck: making decisions as a new leader (one-way/two-way doors, input vs consensus, disagree and commit). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Making decisions as a new leader',
  summary: 'Should the launch go out with green bags or orange ones? The team has debated for nine days. Lucía keeps saying "let\'s think about it more". Tey deals the decision cards.',
  minutes: 11,
  outcomes: [
    'Tell big, hard-to-undo decisions from small, easy ones',
    'Ask for input without needing everyone to agree',
    'Decide, explain, and move on',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>New leaders often get stuck on decisions: afraid to get it wrong, afraid to upset someone. But not deciding is a decision too, and usually the most expensive one. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: One-way or two-way door?</h3><p>Amazon's Jeff Bezos described two kinds of decisions. <strong>One-way doors</strong> are hard to undo (hiring, a big contract): take your time. <strong>Two-way doors</strong> can be reversed (a banner colour, a meeting time): decide fast, and change it if it's wrong. Most decisions are two-way doors.</p><h3>Card 2: Say who decides</h3><p>Before the debate: \"I'll decide, after hearing everyone,\" or \"Sofía, this is your call.\" Confusion about who decides causes more arguments than the decision itself.</p><h3>Card 3: Input isn't consensus</h3><p>Ask everyone what they think. You don't need everyone to agree. Waiting for full agreement can mean waiting forever.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Set a deadline for deciding</h3><p>\"We'll decide Friday at 12.\" It stops the debate from running nine days.</p><h3>Card 5: Explain the why</h3><p>People accept decisions they disagree with far better when they understand the reasoning and feel they were heard. Researchers call this <strong>procedural justice</strong>: a fair process matters, not just the outcome.</p><h3>Card 6: Disagree and commit</h3><p>Once it's decided, everyone gets behind it, including the people who argued against it. Diego can say \"I'd have picked orange, but I'm in.\" Then you check how it went.</p>",
    },
    {
      kind: 'check',
      question: 'The green-or-orange bag question is...',
      options: ['A two-way door: decide fast', 'A one-way door: take months', 'Not a decision at all'],
      answer: 0,
      explanation: 'It\'s reversible. If orange tests better, change it for the autumn run.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Two-way door? Decide fast. Say who decides. Get input, not consensus. Set a deadline. Explain why. Disagree and commit.',
    },
  ],
  apply: {
    scenario: 'Nine days of green vs orange.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s a two-way door decision?',
        options: [
          { text: 'One that needs two people', why: 'It\'s about whether it can be undone.' },
          { text: 'One you should never make', why: 'You should make it quickly.' },
          { text: 'One you can reverse easily, so decide fast' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'One-way door or two-way door?',
        groups: ['One-way: go slow', 'Two-way: go fast'],
        items: [
          { text: 'Hiring a new team member', group: 0 },
          { text: 'Bag colour for the banner', group: 1 },
          { text: 'Signing a two-year supplier contract', group: 0 },
          { text: 'Moving the stand-up to 9:30', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'I still think orange is better. But fine.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Thanks for arguing for it. It made us think. We\'ll test orange in the autumn run.' },
          { text: 'Well, you lost.', why: 'Makes him less likely to speak up next time.' },
          { text: 'Okay, let\'s do orange then.', why: 'Reopening every decision means nothing gets decided.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Getting behind a decision you argued against: disagree and ___. (one word)',
        answers: ['commit', 'Commit'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its line.',
        pairs: [
          ['Say who decides', '"I\'ll decide, after hearing everyone."'],
          ['Set a deadline', '"We decide Friday at 12."'],
          ['Explain why', '"Green tested better with buyers."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is procedural justice?',
        options: [
          { text: 'A legal process', why: 'Here it\'s about how decisions are made at work.' },
          { text: 'People accept decisions better when the process feels fair and they were heard' },
          { text: 'Letting the team vote on everything', why: 'Fair process doesn\'t mean voting.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s decision message. Which line breaks the cards?',
        lines: [
          'Thanks everyone for your views.',
          'We\'ll keep discussing until we all agree.',
          'I\'ll decide by Friday at 12, and explain why.',
        ],
        bug: 1,
        fix: 'Input, not consensus: I\'ve heard everyone.',
        explanation: 'Waiting for full agreement on a two-way door can mean waiting forever.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good decision in order.',
        lines: ['Say who decides, and by when', 'Hear everyone', 'Decide and explain why', 'Everyone commits'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Get [[1]], not [[2]].',
        blanks: [['input', 'views'], ['consensus', 'agreement']],
        distractors: ['votes', 'permission'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s deadline.',
        tiles: ['We', 'decide', 'Friday', 'at', '12.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'What decision have you been putting off? Is it a one-way or two-way door? What would happen if you decided today?',
    starters: ['The decision is...', 'It\'s a ... door, so...'],
  },
  deepen: {
    title: 'Door check',
    summary: 'Next time you\'re stuck on a choice, ask: "Can I undo this?" If yes, give yourself a deadline of today.',
  },
  notes: 'Jeff Bezos, 2015 Amazon shareholder letter: Type 1 (one-way door) vs Type 2 (two-way door) decisions; "disagree and commit" (2016 letter). Procedural justice: Thibaut & Walker (1975); Kim & Mauborgne, "Fair Process" (HBR 1997). Decision-rights clarity reflects standard RAPID/DACI-style guidance, simplified.',
};

export default lesson;
