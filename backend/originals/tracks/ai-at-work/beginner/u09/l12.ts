import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 12 — negotiating with AI's help. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Negotiating with AI\'s help',
  summary: 'The bank says no to full refunds. Ada uses two ideas from the classic negotiation book Getting to Yes, and AI to prepare options.',
  minutes: 12,
  outcomes: [
    'Separate interests from positions',
    'Know your best alternative before you negotiate',
    'Use AI to generate options both sides could accept',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Two ideas that change negotiations',
      html:
        '<p>In <em>Getting to Yes</em> (1981), Roger Fisher and William Ury of the Harvard Negotiation Project set out ideas that are still taught everywhere. Two of the most useful:</p>' +
        '<ul>' +
        '<li><strong>Interests, not positions.</strong> The bank\'s position: "We won\'t pay." Their interest: keeping costs down and keeping a good partner. Ada\'s position: "Pay the refunds." Her interest: shops made whole and trust kept.</li>' +
        '<li><strong>Know your BATNA</strong> (Best Alternative To a Negotiated Agreement). If no deal, what\'s your best option? For Ada: the company pays the 2,400 GHS itself. Knowing that keeps her calm.</li>' +
        '</ul>' +
        '<p>Ask AI: <em>"My interest is X, theirs is probably Y. Suggest 5 options that could satisfy both."</em> Options might be: the bank covers half; waives next month\'s fees; funds a joint message to shops.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Look past positions to interests. Know your best alternative. Ask AI for options that meet both sides\' interests.',
    },
  ],
  apply: {
    scenario: 'Ada negotiates with the bank.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Position, or interest?',
        groups: ['Position', 'Interest'],
        items: [
          { text: '"We won\'t pay"', group: 0 },
          { text: 'Keeping costs down', group: 1 },
          { text: '"Pay all the refunds"', group: 0 },
          { text: 'Keeping shops\' trust', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does BATNA stand for?',
        options: [
          { text: 'Bank Agreement To New Accounts', why: 'Best Alternative To a Negotiated Agreement.' },
          { text: 'Best Alternative To a Negotiated Agreement' },
          { text: 'Basic Approval Then New Action', why: 'Best Alternative To a Negotiated Agreement.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the best options?',
        options: [
          { text: 'How do I win?', why: 'Win-lose framing.' },
          { text: 'My interest is shops made whole and trust kept; the bank\'s is probably low cost and a good partnership. Suggest 5 options that could satisfy both.' },
          { text: 'Write a threat.', why: 'Damages the relationship.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The bank said no. Are the shops out of luck?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, sorry.', why: 'Her company covers it regardless.' },
          { text: 'We\'re suing them.', why: 'Not the plan.' },
          { text: 'No: shops get refunded either way. I\'m now discussing options with the bank, like them covering half or waiving next month\'s fees.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What is Ada\'s BATNA?',
        options: [
          { text: 'Her company pays the 2,400 GHS itself' },
          { text: 'Sue the bank tomorrow', why: 'Not her realistic best alternative.' },
          { text: 'Give up', why: 'She has a real fallback.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Look past [[1]] to [[2]].',
        blanks: [['positions'], ['interests']],
        distractors: ['people', 'threats'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to whose interest it serves.',
        pairs: [
          ['Bank covers half', 'Both: shared cost'],
          ['Bank waives next month\'s fees', 'Bank: no cash out now'],
          ['Joint message to shops', 'Both: trust repaired'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which negotiation move is a mistake?',
        lines: [
          'Know our best alternative first',
          'Ask about the bank\'s concerns',
          'Refuse to discuss anything but full payment',
          'Offer two or three options',
        ],
        bug: 2,
        fix: 'Explore options that meet both interests.',
        explanation: 'Locking into one position blocks a deal.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Getting to Yes published?',
        answers: ['1981'],
        placeholder: 'A year',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question to the bank.',
        tiles: ['What', 'would', 'work', 'for', 'you?'],
        distractors: ['Pay!'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s preparation.',
        lines: ['Know her BATNA', 'Name both sides\' interests', 'Ask AI for options', 'Pick two to propose'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does knowing your BATNA keep you calm?',
        options: [
          { text: 'It makes you aggressive', why: 'It makes you calmer.' },
          { text: 'It doesn\'t', why: 'It reduces pressure.' },
          { text: 'You know you\'re fine even if there\'s no deal, so you don\'t accept a bad one' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a negotiation you\'re in. What\'s the other side\'s interest behind their position? What\'s your BATNA?',
    starters: ['Their interest:', 'My BATNA:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for 5 options that meet both sides\' interests in a disagreement you\'re in.' },
  notes: 'Fisher & Ury (1981), Getting to Yes, Harvard Negotiation Project. See also the Teyro course Negotiation Skills for Beginners.',
};

export default lesson;
