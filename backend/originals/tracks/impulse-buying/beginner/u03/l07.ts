import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Reading: influencers and "everyone has one". */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Influencers and "everyone has one"',
  summary: 'A Ghanaian music producer Kofi follows posts about a GH₵1,200 microphone: "game changer, link in bio". Kofi\'s urge log lights up. Why do recommendations from people we\'ve never met feel so trustworthy?',
  minutes: 12,
  outcomes: [
    'Explain social proof in plain words',
    'Spot paid promotion, labelled or not',
    'Judge a recommendation by what it tells you, not who says it',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why we follow the crowd, and the creator',
      html: '<p><strong>Social proof.</strong> When we\'re unsure what to do, we look at what others do. If everyone has a thing, it feels like the right thing. Psychologist Robert Cialdini described this as one of the strongest levers of persuasion. It\'s why shops show "bestseller" badges and pop-ups say "500 people bought this today".</p><p><strong>Influencers add trust.</strong> When someone you watch every week recommends something, it feels like advice from a friend. Researchers call this a <em>parasocial relationship</em>: you feel you know them, even though they don\'t know you.</p><p><strong>But it\'s often an advert.</strong> Many creators are paid, given free products, or earn a commission from "link in bio". That doesn\'t make them liars. It does mean the recommendation isn\'t neutral. In many countries, paid posts must be clearly labelled ("#ad", "paid partnership"), but labels are often small, missing, or easy to scroll past.</p><p><strong>What to ask:</strong></p><ol><li><strong>Are they paid?</strong> Look for #ad, "sponsored", "partner", affiliate links or discount codes.</li><li><strong>Is it right for me?</strong> A GH₵1,200 microphone is a game changer for a professional studio. For Kofi\'s bedroom beats, a GH₵300 one might do the same job.</li><li><strong>What do non-paid reviews say?</strong> Check two or three sources that don\'t earn from your purchase.</li><li><strong>Would I want it if nobody had it?</strong> If the answer is no, it\'s the crowd you want, not the thing.</li></ol>',
    },
    {
      kind: 'check',
      question: 'A creator uses a discount code "KOFI10" for a product. What does that usually mean?',
      options: ['They found it by chance', 'It\'s always the best product', 'They likely earn something when you use it'],
      answer: 2,
      explanation: 'Codes and affiliate links usually pay the creator a commission.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask four things: Are they paid? Is it right for me? What do unpaid reviews say? Would I want it if nobody had it?',
    },
  ],
  apply: {
    scenario: 'The GH₵1,200 microphone.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is social proof?',
        options: [
          { text: 'Looking at what others do when we\'re unsure what to do' },
          { text: 'Proof that a product works', why: 'It feels like proof, but it\'s just popularity.' },
          { text: 'A legal document', why: 'It\'s a psychological effect.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sign of a paid recommendation, or not?',
        groups: ['Likely paid', 'Not a sign'],
        items: [
          { text: '#ad or "paid partnership"', group: 0 },
          { text: 'A personal discount code', group: 0 },
          { text: '"Link in bio" to a shop', group: 0 },
          { text: 'They bought it with their own money and say so', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to why it matters.',
        pairs: [
          ['Are they paid?', 'The advice may not be neutral'],
          ['Is it right for me?', 'Their needs aren\'t yours'],
          ['What do unpaid reviews say?', 'A fairer picture'],
          ['Would I want it if nobody had it?', 'Separates the thing from the crowd'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'He said it\'s a game changer. He\'s a real producer. I trust him.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Then buy it.', why: 'Trust is fine; checking is better.' },
          { text: 'He\'s a liar.', why: 'Being paid doesn\'t make him a liar. It makes the advice not neutral.' },
          { text: 'He might be right for his studio. Check if he\'s paid, and what a GH₵300 mic would do for your bedroom beats.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The feeling of knowing a creator.',
        template: 'A [[1]] relationship: you feel you know them, but they don\'t [[2]] you.',
        blanks: [['parasocial'], ['know']],
        distractors: ['social', 'pay'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵1,200 microphone vs a GH₵300 one. How much more is the creator\'s pick?',
        answers: ['900', 'GH₵900', '900 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is social proof at work?',
        lines: [
          'I need a better mic for clearer vocals.',
          'A GH₵300 one has good unpaid reviews.',
          'Every producer I follow has the GH₵1,200 one, so it must be the right one for me.',
        ],
        bug: 2,
        fix: 'The right mic is the one that fits my needs and budget.',
        explanation: 'What everyone has isn\'t automatically right for you.',
      },
      {
        kind: 'mcq',
        prompt: 'Why might a paid post be labelled in small text, or not at all?',
        options: [
          { text: 'Labels are illegal', why: 'In many places labels are required.' },
          { text: 'A clear "#ad" can make people trust it less, so some hide it' },
          { text: 'There\'s no reason', why: 'Visibility of labels affects trust.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the check for any recommendation.',
        lines: ['Are they paid?', 'Is it right for me?', 'What do unpaid reviews say?', 'Would I want it if nobody had it?'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi mutes three creators whose posts always trigger urges. What is he doing?',
        options: [
          { text: 'Changing the moment: fewer cues, fewer urges' },
          { text: 'Being rude', why: 'Muting is private and healthy.' },
          { text: 'Missing out on deals', why: 'He can always look when he actually needs something.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which creators or accounts most often make you want to buy? Are they paid? Would muting one help?',
    starters: ['The accounts that trigger me:...', 'Paid? ...', 'I could mute...'],
  },
  deepen: {
    title: 'Disclosure rules',
    summary: 'Advertising regulators in many countries require influencers to clearly label paid content. Rules and enforcement vary widely. If a post looks like an ad, treat it like an ad, label or no label.',
  },
  notes: 'Cialdini, Influence (social proof). Parasocial interaction: Horton & Wohl (1956); influencer marketing research (e.g. Lou & Yuan 2019). Disclosure rules: e.g. US FTC Endorsement Guides, UK ASA/CMA; stated generally. Creator fictional (no real person named).',
};

export default lesson;
