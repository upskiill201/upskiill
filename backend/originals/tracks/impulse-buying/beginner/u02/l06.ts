import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Reading: buying to be someone. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Buying to be someone',
  summary: 'The 2:14 a.m. boots weren\'t just boots. They were the winning captain\'s boots. Sometimes we don\'t buy a thing; we buy who we think it will make us. Here\'s how identity drives spending.',
  minutes: 12,
  outcomes: [
    'Explain how identity and image drive purchases',
    'Spot "buying to be someone" in your own urges',
    'Find better ways to become who you want to be',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The captain\'s boots',
      html: '<p>Kofi missed a penalty. Twenty minutes later, an ad showed him the exact boots the winning captain wears. Was it a coincidence that he wanted <em>those</em> boots, that night?</p><p>Not really. People often buy things that stand for who they want to be: the athlete\'s boots, the producer\'s headphones, the successful person\'s watch. Psychologists have found that when people feel a gap in an identity they care about, they sometimes reach for <strong>symbols</strong> of it, a bit like filling the gap with an object (Wicklund and Gollwitzer, 1981, called this "symbolic self-completion").</p><p><strong>Why it\'s powerful:</strong></p><ul><li><strong>Ads sell identities, not products.</strong> "Be unstoppable." "Made for winners." The product is the ticket into a group.</li><li><strong>Social media shows the highlight reel.</strong> Everyone\'s best moments, with the things they own in the frame.</li><li><strong>It hits hardest when we feel small.</strong> After a loss, an exam, a rejection.</li></ul><p><strong>The catch:</strong> the boots don\'t make Kofi score penalties. Practice does. The object is a shortcut that doesn\'t go anywhere.</p><p><strong>The better question:</strong> "Who am I trying to be, and what would actually get me there?" For Kofi: 30 minutes of penalty practice twice a week, free. For the producer\'s headphones: finishing more beats, and saving for the gear that genuinely improves them.</p>',
    },
    {
      kind: 'check',
      question: 'An ad says "Made for winners" next to boots. What is it really selling?',
      options: ['An identity: being a winner', 'Better grip', 'A discount'],
      answer: 0,
      explanation: 'The product is presented as a ticket into being a certain kind of person.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When an urge is about who you want to be, ask: what would actually get me there? It\'s rarely the object.',
    },
  ],
  apply: {
    scenario: 'The captain\'s boots.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Kofi want the captain\'s boots that night especially?',
        options: [
          { text: 'His old boots were broken', why: 'They were fine. The feeling was the gap.' },
          { text: 'He\'d just missed a penalty and felt a gap in his footballer identity' },
          { text: 'The ad was random', why: 'The timing and the boots matched his feeling exactly.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Buying a thing, or buying an identity?',
        groups: ['Mostly the thing', 'Mostly an identity'],
        items: [
          { text: 'Soap', group: 0 },
          { text: '"The headphones top producers use"', group: 1 },
          { text: 'A bus ticket', group: 0 },
          { text: '"Made for winners" boots after a loss', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each identity to what would really build it.',
        pairs: [
          ['Better footballer', 'Penalty practice twice a week'],
          ['Better producer', 'Finish a beat every week'],
          ['Better student', 'A study routine that works'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'If I had better headphones, I\'d be a real producer.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'True, buy them tonight.', why: 'Headphones don\'t finish beats.' },
          { text: 'You\'ll never be a real producer.', why: 'Unkind, and he already earns from it.' },
          { text: 'Real producers finish beats. You\'re already selling them. Save for gear that improves the sound, when you need it.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The better question.',
        template: 'Who am I trying to [[1]], and what would actually get me [[2]]?',
        blanks: [['be'], ['there']],
        distractors: ['buy', 'paid'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this ad is selling an identity?',
        lines: [
          'Sizes 38 to 46.',
          'Rubber studs for firm ground.',
          'Be unstoppable.',
        ],
        bug: 2,
        fix: 'A fact about the product, like weight or material.',
        explanation: '"Be unstoppable" sells a feeling about who you\'ll become, not anything about the boots.',
      },
      {
        kind: 'mcq',
        prompt: 'When does "buying to be someone" hit hardest?',
        options: [
          { text: 'When we feel great', why: 'It can happen then, but gaps make it stronger.' },
          { text: 'When we feel small: after a loss, a rejection or a bad exam' },
          { text: 'Never', why: 'It\'s a well-documented pattern.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Penalty practice twice a week for 8 weeks. How many sessions?',
        answers: ['16', 'sixteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the identity check.',
        lines: ['Notice the urge', 'Ask: who am I trying to be?', 'Ask: what would really get me there?', 'Do that instead, or plan the purchase if it truly helps'],
      },
      {
        kind: 'mcq',
        prompt: 'When is buying gear for an identity actually fine?',
        options: [
          { text: 'Never', why: 'Sometimes the right tool really helps.' },
          { text: 'Whenever an ad says so', why: 'That\'s the trap.' },
          { text: 'When it\'s planned and genuinely helps you do the thing' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you wanted because of who it would make you. What would actually make you that person?',
    starters: ['I wanted... because...', 'What would really help is...'],
  },
  deepen: {
    title: 'Highlight reels',
    summary: 'Social media shows people\'s best moments, and often what they own. Comparing your everyday to their highlights can make you feel behind, and make buying feel like catching up. Muting accounts that make you want to buy is a simple, effective step.',
  },
  notes: 'Wicklund, R. A., & Gollwitzer, P. M. (1981/1982). Symbolic self-completion. Identity-based marketing and social comparison (Festinger 1954); stated generally.',
};

export default lesson;
