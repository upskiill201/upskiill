import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: the aso-ebi question. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The aso-ebi question',
  summary: '₦85,000 for cousin Chiamaka\'s aso-ebi. Ada\'s mum expects her to buy it. Her Mexico plan says she can\'t. It isn\'t a gym membership; it\'s family. What does Ada do?',
  minutes: 12,
  outcomes: [
    'See that some spending is about values, not just need or want',
    'Find a way to honour what matters without overspending',
    'Talk to family about money calmly',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday deadline',
      beats: [
        { speaker: 'narrator', text: 'Thursday night. The aso-ebi payment is due tomorrow. The family WhatsApp has 140 unread messages, most of them photos of fabric.' },
        { speaker: 'ada', text: 'If I don\'t buy it, I\'m the only cousin in different clothes in every photo. Mum will be embarrassed. But ₦85,000...' },
        { speaker: 'narrator', text: 'Ngozi looks up from her sewing machine. She sells fabric for a living.' },
        { speaker: 'narrator', text: '"The ₦85,000 pack is fabric, gele and the tailor your aunt chose. The fabric alone is about ₦40,000. My tailor friend sews for ₦15,000. Your own gele is fine; nobody checks."' },
        { speaker: 'ada', text: 'Wait. I can wear the aso-ebi for ₦55,000?' },
        { speaker: 'tey', text: 'Here\'s the thing: family matters enormously to Ada. Cutting it to zero would cost her something money can\'t fix. But "matters a lot" doesn\'t have to mean "pay whatever is asked". What should she do?' },
      ],
      choice: {
        prompt: 'What should Ada do?',
        options: [
          { text: 'Pay the full ₦85,000 pack: it\'s family.', outcome: 'She honours the family, at ₦30,000 more than she needs to. That ₦30,000 is a fifth of a month of the Mexico plan, for no extra joy.' },
          { text: 'Don\'t buy it: Mexico comes first.', outcome: 'She saves ₦85,000 and loses something she really values: being part of the day with her family. That\'s a cost too.' },
          { text: 'Buy the fabric, use Ngozi\'s tailor and her own gele: about ₦55,000. Call Mum first to explain.', outcome: 'Yes. Family stays at the top of her values, she\'s in every photo, and she saves ₦30,000. Mum\'s reply: "Clever girl. Your aunt overcharges anyway."', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When something truly matters, don\'t cut it to zero. Find the version that honours it without overpaying.',
    },
  ],
  apply: {
    scenario: 'The aso-ebi question.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Full pack ₦85,000; Ada\'s version ₦55,000. How much does she save?',
        answers: ['30000', '30,000', '₦30,000', '₦30000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why not just skip the aso-ebi to save ₦85,000?',
        options: [
          { text: 'Family is one of her deepest values; missing out costs something money can\'t fix' },
          { text: 'It\'s illegal to skip', why: 'It\'s about her values.' },
          { text: 'She has plenty of money', why: 'She needs every naira for Mexico.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its cost.',
        pairs: [
          ['Fabric only', '₦40,000'],
          ['Ngozi\'s tailor friend', '₦15,000'],
          ['Ada\'s own gele', '₦0'],
          ['The aunt\'s full pack', '₦85,000'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'For Ada: matters a lot, or matters little?',
        groups: ['Matters a lot', 'Matters little'],
        items: [
          { text: 'Being part of family celebrations', group: 0 },
          { text: 'Using the aunt\'s chosen tailor', group: 1 },
          { text: 'Growing as a designer', group: 0 },
          { text: 'A gym she never visits', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Mum, I\'m getting the aso-ebi fabric but sewing with Ngozi\'s tailor. I\'m saving for Mexico. Is that okay?',
        prompt: 'Why is this a good message?',
        options: [
          { text: 'It honours the family, explains the reason briefly, and asks rather than hides' },
          { text: 'It\'s rude', why: 'It\'s respectful and honest.' },
          { text: 'It\'s too long', why: 'Short and clear.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'When something truly matters, don\'t cut it to [[1]]. Find the version that honours it without [[2]].',
        blanks: [['zero'], ['overpaying']],
        distractors: ['half', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought treats family like a gym membership?',
        lines: [
          'Family matters a lot to me.',
          'I\'ll find a cheaper way to take part.',
          'It\'s just spending, so I\'ll cancel it like the gym.',
        ],
        bug: 2,
        fix: 'It\'s a value, so I\'ll honour it in a smarter way.',
        explanation: 'Some spending is about who you are. Cut the overpaying, not the value.',
      },
      {
        kind: 'mcq',
        prompt: 'How did Ngozi help?',
        options: [
          { text: 'She knew the real costs and a cheaper tailor: insider knowledge' },
          { text: 'She paid for it', why: 'She shared knowledge, not money.' },
          { text: 'She told Ada to skip it', why: 'She found a better version.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s Mexico saving is ₦85,000 a month. How much of one month does the ₦55,000 aso-ebi use?',
        answers: ['55000', '55,000', '₦55,000', '₦55000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada handled the aso-ebi.',
        lines: ['Notice it matters to her', 'Find the real costs', 'Choose a cheaper version', 'Tell Mum honestly', 'Pay on time'],
      },
    ],
  },
  reflect: {
    prompt: 'What spending matters to you because of family, culture or community? Is there a version that honours it for less?',
    starters: ['What matters:...', 'A cheaper version:...'],
  },
  deepen: {
    title: 'Aso-ebi and belonging',
    summary: 'In Nigeria, aso-ebi (matching fabric worn by family and friends at weddings and celebrations) is about belonging and honouring the people you love. Many cultures have something similar. Money advice that ignores these things doesn\'t fit real life.',
  },
  notes: 'Aso-ebi costs (fictional): pack ₦85,000; fabric ₦40,000 + tailor ₦15,000 = ₦55,000. Paid as a one-off from this month\'s saving (Ch5 reconciliation adds a freelance gig). Mum\'s reply narrated.',
};

export default lesson;
