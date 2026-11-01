import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Reading: mental accounting. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The pots in your head',
  summary: 'GH₵50 from a beat feels different from GH₵50 from Mum. It shouldn\'t, but it does. Kofi learns how the "pots" in our heads can help a budget, and how they can trick it.',
  minutes: 12,
  outcomes: [
    'Explain mental accounting in plain words',
    'Use pots to protect money on purpose',
    'Spot when a pot is tricking you',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Mental accounting',
      html: '<p>Economist Richard Thaler, who later won a Nobel prize, noticed something odd: people treat money differently depending on where it came from and what they\'ve labelled it for. He called it <strong>mental accounting</strong>.</p><p>A cedi is a cedi. You can spend any cedi on anything. But our heads sort money into <strong>pots</strong>: "allowance money", "beat money", "birthday money", "fun money".</p><p><strong>When pots help.</strong> Kofi\'s whole budget is a set of pots on purpose. "Bus home" money is hard to spend on kelewele because it has a name and a job. That\'s mental accounting working <em>for</em> you.</p><p><strong>When pots trick you:</strong></p><ul><li><strong>"Found money" feels free.</strong> GH₵50 from a beat, a refund or a gift feels like a bonus, so it\'s spent faster and on things you\'d never buy with "real" money. Kofi\'s split rule exists to stop exactly this.</li><li><strong>"It\'s from the fun pot, so it\'s fine."</strong> Even after fun is overspent, a new purchase gets mentally filed under "fun" and waved through.</li><li><strong>Saving and borrowing at once.</strong> Some people keep savings untouched while paying high fees on a loan, because the savings pot feels sacred. Sometimes using savings to clear an expensive debt is the smarter move.</li></ul><p><strong>The fix:</strong> keep the pots, but remember they\'re all one money. Before spending found money, ask: "Would I buy this with allowance money?" If not, it doesn\'t deserve beat money either.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi gets a GH₵50 refund and wants to spend it on a jersey he\'d never buy with allowance money. What does the question test suggest?',
      options: ['Don\'t: if it\'s not worth allowance money, it\'s not worth refund money', 'Buy it: refunds are free money', 'Save half and spend half on the jersey'],
      answer: 0,
      explanation: 'Found money is still money. The split rule can still give some of it to enjoy, on something actually worth it.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Pots are useful labels, but every cedi is the same cedi. Ask: would I buy this with my main money?',
    },
  ],
  apply: {
    scenario: 'The pots in Kofi\'s head.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its meaning.',
        pairs: [
          ['Mental accounting', 'Treating money by its label'],
          ['Found money', 'Feels free, gets spent fast'],
          ['Named pot', 'Money with a job'],
          ['The question test', 'Would I buy it with main money?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is the pot helping or tricking?',
        groups: ['Helping', 'Tricking'],
        items: [
          { text: '"Bus home" money left alone', group: 0 },
          { text: 'Gift money spent on something he\'d never usually buy', group: 1 },
          { text: 'A named sinking fund for exams', group: 0 },
          { text: '"It\'s fun money" after fun is already spent', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who first described mental accounting?',
        options: [
          { text: 'Richard Thaler, an economist who later won a Nobel prize' },
          { text: 'A banker selling savings accounts', why: 'It came from research in behavioural economics.' },
          { text: 'Elizabeth Warren', why: 'She popularised 50/30/20, not mental accounting.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'This beat money is a bonus. It doesn\'t really count, right?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Right, bonuses don\'t count.', why: 'That\'s the found-money trap exactly.' },
          { text: 'Never spend bonus money.', why: 'The split rule gives part of it to enjoy. Just on purpose.' },
          { text: 'It counts like any other cedi. That\'s why your split rule decides its job before your head does.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix.',
        template: 'Keep the [[1]], but remember they\'re all one [[2]].',
        blanks: [['pots'], ['money']],
        distractors: ['loans', 'bank'],
      },
      {
        kind: 'mcq',
        prompt: 'Someone has GH₵500 saved and owes GH₵300 on a loan charging 20% a month. What might be smarter?',
        options: [
          { text: 'Never touch savings, whatever happens', why: 'That treats the savings pot as sacred while the loan grows.' },
          { text: 'Consider using savings to clear the expensive loan, then rebuild savings' },
          { text: 'Borrow more to keep both', why: 'That makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is mental accounting tricking Kofi?',
        lines: [
          'The bus-home pot is for the bus.',
          'This GH₵30 refund is free money, so the GH₵30 jersey is free.',
          'Fun money is GH₵20 a week.',
        ],
        bug: 1,
        fix: 'This GH₵30 refund is real money; split it by the rule.',
        explanation: 'Nothing is free. A refund spent on a jersey is GH₵30 not saved.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A GH₵60 gift, split 50/25/25. How much is for enjoying?',
        answers: ['15', 'GH₵15', '15 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How does Kofi\'s budget use mental accounting on purpose?',
        options: [
          { text: 'It doesn\'t; budgets ignore labels', why: 'Every line is a label with a job.' },
          { text: 'By keeping all money in one unlabelled pile', why: 'That\'s month 1.' },
          { text: 'Every line is a named pot with a job, which makes it harder to spend on the wrong thing' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do when found money arrives.',
        lines: ['Notice it feels "free"', 'Remember it\'s real money', 'Apply the split rule', 'Ask the question test before buying'],
      },
    ],
  },
  reflect: {
    prompt: 'What "found money" did you get recently (a gift, refund, extra shift)? Where did it go?',
    starters: ['I got...', 'It went on...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Read more: Nudge and Misbehaving',
    summary: 'Richard Thaler\'s Misbehaving (2015) tells how behavioural economics began, including mental accounting. He won the Nobel Memorial Prize in Economic Sciences in 2017.',
  },
  notes: 'Thaler, R. H. (1985). Mental accounting and consumer choice. Marketing Science, 4(3), 199–214; Thaler (1999). Mental accounting matters. JBDM, 12(3). Nobel 2017 (Sveriges Riksbank Prize). Saving-while-borrowing puzzle documented (e.g. Gross & Souleles 2002). 20%/month loan example matches Ch2 L6.',
};

export default lesson;
