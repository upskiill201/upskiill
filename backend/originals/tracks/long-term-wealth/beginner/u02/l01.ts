import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the missing four months. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The missing four months',
  summary: 'Four months with no employer pension contribution. Miracle is a team lead; her boss is the COO. It feels awkward. What does she do?',
  minutes: 11,
  outcomes: [
    'Know why pension statements are worth checking',
    'Raise a pay or pension problem calmly and clearly',
    'Follow up until it\'s fixed',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday morning',
      beats: [
        { speaker: 'narrator', text: 'Monday, 8:15 a.m. Miracle has the statement open: four months, employer contribution ₦0. At 10% of her pay, that\'s ₦90,000 a month. ₦360,000 missing.' },
        { speaker: 'miracle', text: 'Maybe it\'s a mistake. Maybe it\'s on purpose. Maybe if I raise it I look ungrateful.' },
        { speaker: 'narrator', text: 'Bisi, at the next desk, leans over: "Oh, mine too. I thought that was normal."' },
        { speaker: 'tey', text: 'Pension money is your money, paid for your future. If some is missing, raising it isn\'t ungrateful; it\'s looking after future-you, and maybe your whole team. How should she do it?' },
      ],
      choice: {
        prompt: 'What should Miracle do?',
        options: [
          { text: 'Leave it. It\'s awkward, and it\'ll probably sort itself out.', outcome: 'It might not. Every month it stays missing is a month of growth lost, for her and possibly everyone at Afiya. Silence costs future-Miracle.' },
          { text: 'Post an angry message in the company group chat.', outcome: 'It gets attention, and makes HR defensive and Folake embarrassed in public. A calm, private message with evidence works better and faster.' },
          { text: 'Email HR with the statement attached, copy Folake, and ask calmly for it to be checked and fixed.', outcome: 'Yes. "Hi, my statement shows no employer contribution for the last four months. Could you check? Bisi has noticed the same." Two days later: a payroll error after a system change, now fixed for everyone, with back-payment.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Check your pension statement at least twice a year. If something\'s missing, raise it calmly, in writing, with evidence, and follow up until it\'s fixed.',
    },
  ],
  apply: {
    scenario: 'The missing four months.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '10% of ₦900,000 is how much a month?',
        answers: ['90000', '90,000', '₦90,000', '₦90000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦90,000 a month for 4 months. How much is missing?',
        answers: ['360000', '360,000', '₦360,000', '₦360000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is raising it not "ungrateful"?',
        options: [
          { text: 'Pension money is part of her pay, for her future' },
          { text: 'It is ungrateful', why: 'It\'s her money.' },
          { text: 'Because Folake is her friend', why: 'It\'s about her pay, not friendship.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to raise it, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'A calm email with the statement attached', group: 0 },
          { text: 'An angry post in the company chat', group: 1 },
          { text: 'Following up if there\'s no reply in a week', group: 0 },
          { text: 'Saying nothing for a year', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Mine\'s missing too. I thought that was normal.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'It\'s not normal. I\'m emailing HR today. Can I mention yours too, so they check everyone?' },
          { text: 'It is normal, forget it.', why: 'It\'s missing pay.' },
          { text: 'That\'s your problem.', why: 'It may affect the whole team.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'How to raise it.',
        template: 'Calmly, in [[1]], with [[2]], and follow up until it\'s [[3]].',
        blanks: [['writing'], ['evidence'], ['fixed']],
        distractors: ['public', 'anger'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Miracle\'s draft email should go?',
        lines: [
          'My pension statement shows no employer contribution for four months.',
          'I\'ve attached the statement.',
          'This is outrageous and I\'m telling everyone.',
          'Could you check and let me know?',
        ],
        bug: 2,
        fix: 'Leave it out; calm and clear works better.',
        explanation: 'Accusations make people defensive. Evidence and a clear ask get it fixed.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the email to its job.',
        pairs: [
          ['"My statement shows..."', 'States the problem'],
          ['The attachment', 'Gives evidence'],
          ['"Could you check?"', 'Clear ask'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What was the cause?',
        options: [
          { text: 'A payroll error after a system change, now fixed with back-payment' },
          { text: 'Afiya stopped paying on purpose', why: 'It was an error.' },
          { text: 'Nobody found out', why: 'HR fixed it in two days.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do if a pension payment is missing.',
        lines: ['Check the statement', 'Write a calm email with evidence', 'Copy the right person', 'Follow up if needed', 'Confirm it\'s fixed'],
      },
    ],
  },
  reflect: {
    prompt: 'Do you know where your pension or long-term savings statement is? When will you check it?',
    starters: ['My statement is...', 'I\'ll check it on...'],
  },
  deepen: {
    title: 'If it isn\'t fixed',
    summary: 'In many countries, employers must pay pension contributions on time, and a pension regulator handles complaints when they don\'t. If raising it inside your company doesn\'t work, the regulator is the next step.',
  },
  notes: 'Nigeria: employers must remit pension contributions (Pension Reform Act 2014, enforced by PenCom); stated generally. Bisi per CAST. Payroll error fictional.',
};

export default lesson;
