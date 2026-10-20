import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: their side of the table. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Their side of the table',
  summary: 'Ada has only thought about her own numbers. Tey asks her to sit in Mr Adeyemi\'s chair: what does it cost him if she leaves? The answer surprises her.',
  minutes: 12,
  outcomes: [
    'Think through the other side\'s interests and alternative',
    'Work out what no deal would cost them',
    'Use their needs to shape your offer',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Sit in his chair. If you leave, what happens to the flat?', replies: ['He finds someone new?'] },
        { tey: 'Eventually. Flats often sit empty for a while, say two months. At ₦1,500,000 a year that\'s ₦125,000 a month, so ₦250,000 lost. Plus about ₦100,000 to repaint and advertise.', replies: ['So a new tenant at ₦1,500,000 gives him...'] },
        { tey: 'About ₦1,150,000 in the first year, and a stranger he doesn\'t know. You at ₦1,350,000, always on time, gives him more, with no risk.', replies: ['So he needs me too.'] },
        { tey: 'Exactly. Don\'t gloat about it. Use it: "I\'d like to stay, and I\'d sign for two years." That speaks straight to his biggest worry.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask: what happens to them if we don\'t agree? Their alternative is often weaker than it looks.',
    },
  ],
  apply: {
    scenario: 'In his chair.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦1,500,000 a year. How much is one month, in naira?',
        answers: ['125000', '125,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two empty months at ₦125,000 each. How much does he lose, in naira?',
        answers: ['250000', '250,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A new tenant at ₦1,500,000, minus ₦250,000 empty and ₦100,000 repainting. What does he get in year one?',
        options: [
          { text: '₦1,150,000' },
          { text: '₦1,500,000', why: 'That ignores the empty months and costs.' },
          { text: '₦1,250,000', why: 'Subtract the ₦100,000 too.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A cost to him if Ada leaves, or not?',
        groups: ['Cost to him', 'Not a cost'],
        items: [
          { text: 'Empty months', group: 0 },
          { text: 'Repainting and adverts', group: 0 },
          { text: 'Ada\'s commute', group: 1 },
          { text: 'Risk of a bad tenant', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I tell him "you\'ll lose ₦350,000 if I go"?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Not like that; it sounds like a threat. Offer what solves his worry: "I\'d like to stay, and I\'ll sign for two years."' },
          { text: 'Yes, say it exactly.', why: 'It sounds like a threat.' },
          { text: 'Keep it secret and say nothing useful.', why: 'Use it to shape your offer.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match his worry to what Ada can offer.',
        pairs: [
          ['Empty months', 'A two-year lease'],
          ['Late rent', 'Pay on the 1st, always'],
          ['Damage to the flat', 'Her two-year clean record'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The question to ask.',
        template: 'What happens to [[1]] if we don\'t [[2]]?',
        blanks: [['them', 'him'], ['agree']],
        distractors: ['me', 'argue'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is Ada at ₦1,350,000 better for him than a new tenant at ₦1,500,000 in year one?',
        options: [
          { text: 'No empty months or costs, and a tenant he already trusts' },
          { text: 'It isn\'t better', why: 'Year one with a new tenant gives about ₦1,150,000.' },
          { text: 'Because Ada is his friend', why: 'It\'s about money and risk.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s notes about his side is a mistake?',
        lines: [
          'He wants to cover higher costs.',
          'Empty months cost him money.',
          'He has all the power; I have none.',
          'He values a reliable tenant.',
        ],
        bug: 2,
        fix: 'We both need this deal.',
        explanation: 'His alternative is weaker than it looks.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tey\'s "their chair" routine.',
        lines: ['Imagine there\'s no deal', 'List what it costs them', 'Find their biggest worry', 'Shape an offer that eases it'],
      },
    ],
  },
  reflect: {
    prompt: 'In your negotiation, what would it cost the other side if you didn\'t agree?',
    starters: ['If we don\'t agree, they would...', 'Their biggest worry is...'],
  },
  deepen: {
    title: 'Perspective-taking',
    summary: 'Research by Adam Galinsky and colleagues found that negotiators who think about the other side\'s interests and alternatives tend to reach better deals, for themselves and both sides.',
  },
  notes: 'Fictional: ₦125,000/month; 2 empty months = ₦250,000; ₦100,000 repaint/adverts; new tenant year one ≈ ₦1,150,000. Perspective-taking in negotiation: Galinsky & Mussweiler (2001); Galinsky, Maddux, Gilin & White (2008), Psychological Science.',
};

export default lesson;
