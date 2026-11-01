import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Reading: protecting what you've built (insurance basics). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Protect what you\'ve built',
  summary: 'Years of saving can vanish in one hospital bill. Folake\'s cousin learnt that the hard way. Here\'s how insurance works in plain words, and how to think about which kinds you might need.',
  minutes: 12,
  outcomes: [
    'Explain what insurance does',
    'Think through which risks are worth insuring',
    'Know the questions to ask before buying cover',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Insurance, plainly',
      html: '<p>Folake\'s cousin had saved for ten years. Then a surgery and two weeks in hospital took almost all of it in a month.</p><p><strong>Insurance</strong> is paying a smaller, regular amount (a <em>premium</em>) so that if something big and expensive happens, someone else pays most of the cost. Many people pay in; the few who have the bad event get paid out.</p><p><strong>What\'s worth insuring?</strong> Things that are <em>unlikely</em> but would be <em>very expensive</em> if they happened:</p><ul><li><strong>Health:</strong> a serious illness or operation. Many employers offer health cover; check what yours includes. Miracle checks hers at Afiya and finds it covers her, but not her dad.</li><li><strong>Life cover:</strong> if people depend on your income, it pays them if you die. If nobody depends on you, it matters less.</li><li><strong>Property:</strong> if losing something (a shop\'s stock, a home) would ruin you.</li></ul><p><strong>What\'s usually not worth insuring?</strong> Small things you could replace from your emergency fund. Extended warranties on phones are often expensive for what they cover.</p><p><strong>Questions before buying cover:</strong> What exactly is covered, and what isn\'t? How much do I pay first myself (the <em>excess</em>)? How do I claim? Is the insurer licensed by the regulator?</p><p>Insurance and an emergency fund work together: the fund handles small and medium shocks; insurance handles the rare huge ones.</p>',
    },
    {
      kind: 'check',
      question: 'Which is most worth insuring?',
      options: ['A cracked phone screen', 'A big hospital bill', 'A lost umbrella'],
      answer: 1,
      explanation: 'Unlikely but very expensive. Small losses come from the emergency fund.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Insure what\'s unlikely but ruinously expensive. Cover small things from your emergency fund. Always read what\'s excluded.',
    },
  ],
  apply: {
    scenario: 'Protecting the plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a premium?',
        options: [
          { text: 'What the insurer pays you', why: 'That\'s a payout or claim.' },
          { text: 'A type of bonus', why: 'It\'s the cost of cover.' },
          { text: 'The regular amount you pay for insurance' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Insure it, or cover it from the emergency fund?',
        groups: ['Insure it', 'Emergency fund'],
        items: [
          { text: 'A serious operation', group: 0 },
          { text: 'A broken phone screen', group: 1 },
          { text: 'Income for children if a parent dies', group: 0 },
          { text: 'A small car repair', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Premium', 'What you pay for cover'],
          ['Excess', 'What you pay first yourself'],
          ['Exclusions', 'What isn\'t covered'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'I\'m 26 and healthy. Why would I need health cover?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Because accidents and surprises don\'t check your age. Your job probably gives you some cover already; check what it includes.' },
          { text: 'You don\'t, ever.', why: 'Unlikely isn\'t impossible.' },
          { text: 'Buy every kind of insurance.', why: 'Insure the big risks, not everything.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What to insure.',
        template: 'Insure what\'s [[1]] but very [[2]].',
        blanks: [['unlikely'], ['expensive']],
        distractors: ['common', 'cheap'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is missing from Miracle\'s check?',
        lines: [
          'Read what\'s covered.',
          'Check the excess.',
          'Sign without reading the exclusions.',
        ],
        bug: 2,
        fix: 'Read the exclusions before signing.',
        explanation: 'Exclusions are where surprises hide.',
      },
      {
        kind: 'mcq',
        prompt: 'Who needs life cover most?',
        options: [
          { text: 'Everyone equally', why: 'It matters most when others depend on you.' },
          { text: 'Nobody', why: 'It protects dependants.' },
          { text: 'People whose income others depend on' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Health cover with a ₦50,000 excess. A ₦900,000 hospital bill. How much does the insurer pay, if fully covered?',
        answers: ['850000', '850,000', '₦850,000', '₦850000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the checks before buying cover.',
        lines: ['What is covered?', 'What isn\'t?', 'What\'s the excess?', 'How do I claim?', 'Is the insurer licensed?'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Miracle find about her work health cover?',
        options: [
          { text: 'It covers her whole family', why: 'It doesn\'t cover her dad.' },
          { text: 'It covers her, but not her dad' },
          { text: 'She has none', why: 'Afiya provides some cover.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which big, unlikely event would hurt you most financially? Is anything protecting you from it?',
    starters: ['The event is...', 'Right now I\'m protected by...'],
  },
  deepen: {
    title: 'Health cover in many countries',
    summary: 'Some countries have national health insurance schemes, some rely on employer cover, and many people pay out of pocket. Find out what applies where you and your family live. It\'s one of the most important checks in a money plan.',
  },
  notes: 'General principles; no insurers or products named (playbook §9). Nigeria has NHIA, Cameroon has limited coverage; stated generally. 900,000 − 50,000 = 850,000.',
};

export default lesson;
