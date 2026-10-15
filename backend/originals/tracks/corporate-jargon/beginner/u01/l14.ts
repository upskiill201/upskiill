import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14. Myth or Fact: the "agree" family — aligned, on board, same page, buy-in, sign-off — and which ones don't mean yes. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Aligned, on board, same page',
  summary: 'Does "I hear you" mean yes? Does "I\'m aligned" mean someone will actually do it? The words offices use for agreeing, and the ones that only sound like agreeing.',
  minutes: 12,
  outcomes: [
    'Decode aligned, on board, on the same page, buy-in and sign-off',
    'Spot phrases that sound like yes but aren\'t',
    'Check for a real yes, politely',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: '"I hear you" means "I agree".', isFact: false, explain: 'It means "I understand what you\'re saying". Often it comes right before a "but".' },
        { text: '"We\'re aligned" means we agree on the plan.', isFact: true, explain: 'Yes: aligned = agreeing on the direction, like arrows pointing the same way.' },
        { text: '"Let me think about it" usually means yes.', isFact: false, explain: 'It can mean yes, no or maybe. If you need an answer, ask when you\'ll get it.' },
        { text: '"I\'m on board" means I support it.', isFact: true, explain: 'Yes: picture getting on the boat everyone else is on.' },
        { text: '"Sign-off" means the meeting is over.', isFact: false, explain: 'Sign-off is official approval: "We need the CEO\'s sign-off before we spend this."' },
        { text: '"Buy-in" involves spending money.', isFact: false, explain: 'Buy-in means people\'s real support for an idea. No money changes hands.' },
      ],
    },
    {
      kind: 'story',
      title: 'Friday, 2 p.m.',
      beats: [
        { speaker: 'brian', text: 'So, are we all on the same page? We claim the money back, and Swift Freight stays until Finance is done.' },
        { speaker: 'zanele', text: 'I hear you, Brian.' },
        { speaker: 'narrator', text: 'Brian moves on. At 3 p.m., Zanele emails Swift Freight to cancel their contract.' },
        { speaker: 'brian', text: 'Zanele! I thought we were aligned?' },
        { speaker: 'zanele', text: 'I said I HEARD you. I didn\'t say I agreed.' },
        { speaker: 'tey', text: "Oof. Both of them made a mistake. Zanele hid a \"no\" inside a phrase that sounds like \"yes\". And Brian took the sound of agreement as the real thing. One question would have saved them." },
      ],
    },
    {
      kind: 'text',
      html: "<p>The one question: <strong>\"So, just to confirm, we're going with X?\"</strong></p><p>It's polite, it's quick, and it turns a vague nod into a real yes or a real no. If you disagree, say it in the meeting: \"I see it differently. Can I explain why?\" That's not rude. Disagreeing out loud is far kinder than agreeing out loud and disagreeing by email.</p>",
    },
  ],
  apply: {
    scenario: 'Friday afternoon. The Swift Freight mix-up.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the "agree" words.',
        pairs: [
          ['Aligned', 'Agreeing on the direction'],
          ['On board', 'Supporting it'],
          ['Buy-in', 'Real support from people'],
          ['Sign-off', 'Official approval'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A real yes, or only sounds like one?',
        groups: ['Real yes', 'Not necessarily yes'],
        items: [
          { text: 'I\'m on board', group: 0 },
          { text: 'I hear you', group: 1 },
          { text: 'We\'re aligned', group: 0 },
          { text: 'Let me think about it', group: 1 },
          { text: 'Interesting idea', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: '"We need Mr Kamau\'s sign-off." What does that mean?',
        options: [
          { text: 'The CEO has to end the meeting', why: 'Sign-off here is approval, not ending something.' },
          { text: 'The CEO has to sign a birthday card', why: 'Ha. It\'s official approval.' },
          { text: 'The CEO has to officially approve it' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I hear you on keeping Swift Freight.',
        prompt: 'Remi isn\'t sure if that\'s a yes. What should he reply?',
        options: [
          { text: 'Great, glad you agree!', why: 'That\'s exactly the assumption that caused the mix-up.' },
          { text: 'Why do you always say that?', why: 'Too sharp. A friendly check gets the real answer.' },
          { text: 'Just to confirm: you\'re okay with keeping them until Finance is done?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brian: "Are we all on the same ___?" (one word)',
        answers: ['page'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Zanele disagreed with the plan. What should she have done?',
        options: [
          { text: 'Said "I hear you" and done her own thing', why: 'That\'s what happened, and it caused a mess.' },
          { text: 'Said so in the meeting: "I see it differently. Can I explain why?"' },
          { text: 'Stayed silent forever', why: 'Silence often gets read as agreement.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Brian\'s meeting summary. Which line assumes too much?',
        lines: [
          'Decision: claim the double payment back.',
          'Zanele said "I hear you", so she\'s fully on board.',
          'Swift Freight stays until Finance is done.',
        ],
        bug: 1,
        fix: 'Check with Zanele that she\'s on board.',
        explanation: '"I hear you" means "I understand", not "I agree".',
      },
      {
        kind: 'fillBlank',
        prompt: 'The one question that turns a nod into a yes.',
        template: 'So, just to [[1]], we\'re going with [[2]] the money back?',
        blanks: [['confirm', 'check'], ['claiming']],
        distractors: ['boil', 'hear'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a polite way to disagree in a meeting.',
        tiles: ['I', 'see', 'it', 'differently.', 'Can', 'I', 'explain', 'why?'],
        distractors: ['hear', 'whatever'],
      },
      {
        kind: 'mcq',
        prompt: 'Pauline from Marketing says, "We\'ll need buy-in from the sales team." What does she mean?',
        options: [
          { text: 'The sales team needs to genuinely support the idea' },
          { text: 'The sales team needs to pay for it', why: 'Buy-in is support, not money.' },
          { text: 'The sales team needs to be told about it', why: 'Being told isn\'t the same as supporting it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you nodded along or said "okay" when you didn\'t really agree. What happened next? What could you have said instead?',
    starters: ['I nodded along when...', 'I could have said...'],
  },
  deepen: {
    title: 'Listen for the soft no',
    summary: 'For one week, notice every time someone says "I hear you", "let me think about it" or "interesting". Was it a yes or a no? You\'ll learn a lot about how your workplace or school really talks.',
  },
  notes: '"Aligned" (Cambridge Business English), "on board" (Cambridge: supporting), "on the same page" (Merriam-Webster: in agreement), "buy-in" (Merriam-Webster: acceptance of and willingness to support), "sign-off" (Cambridge: official approval). "I hear you" = I understand (Cambridge).',
};

export default lesson;
