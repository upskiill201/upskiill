import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6 — Why a few companies matter so much: scarcity, prices and a backup plan. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Why a few companies matter',
  summary: 'Arjun reads the news out loud: "GPU rental prices up again." Kavya shrugs. Joel does the maths for Ask Rao, and stops shrugging.',
  minutes: 11,
  outcomes: [
    'Explain why AI chips can be scarce and expensive',
    'See how a chip price change reaches your bill',
    'Plan a backup so one supplier can\'t stop Ask Rao',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Three facts from lesson 4 add up to one big consequence:</p><ul><li>Only a <strong>few companies</strong> design the leading AI chips.</li><li>Only a <strong>few factories</strong> can make the most advanced ones.</li><li>Only <strong>one company</strong> makes the machines that print their tiniest patterns.</li></ul><p>So when demand for AI jumps, chips can\'t be made fast enough. Prices rise, cloud providers ration their best GPUs, and every layer above feels it.</p><p>For a small team like Ask Rao\'s, that means three habits:</p><ol><li><strong>Don\'t depend on one supplier.</strong> Know a second model or provider you could switch to.</li><li><strong>Watch the bill.</strong> A 20% price rise on $1,080 a month is $216 more.</li><li><strong>Use only what you need.</strong> Smaller models and fewer tokens make you less exposed to price swings.</li></ol>',
    },
    {
      kind: 'tryIt',
      title: 'A price rise reaches your bill',
      caption: 'Change the rise.',
      code: 'monthly = 1080.0     # rented GPU, practice price\nrise = 0.20          # 20% more\nnew_monthly = monthly * (1 + rise)\nprint(f"Before: ${monthly:,.2f}")\nprint(f"After: ${new_monthly:,.2f}")\nprint(f"Extra: ${new_monthly - monthly:,.2f}")\n',
      challenge: 'What if prices rose 50%?',
    },
  ],
  apply: {
    scenario: 'Few suppliers, real risk.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can AI chips be in short supply?',
        options: [
          { text: 'They are made from rare gold', why: 'They\'re made from silicon. The bottleneck is factories and machines.' },
          { text: 'Few companies and factories can make them, and new factories take years' },
          { text: 'Nobody wants them', why: 'The opposite: demand is huge.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'A $1,080 monthly GPU bill rises by 20%. Print the new bill, rounded to 2 places',
        starter: 'monthly = 1080.0\nrise = 0.20\n',
        solution: 'monthly = 1080.0\nrise = 0.20\nprint(round(monthly * (1 + rise), 2))\n',
        hint: 'monthly * (1 + rise)',
        checks: [{ message: 'Print 1296.0', outputEquals: '1296.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it make Ask Rao safer from chip shortages, or more exposed?',
        groups: ['Safer', 'More exposed'],
        items: [
          { text: 'A second model ready to switch to', group: 0 },
          { text: 'Only one provider, no backup', group: 1 },
          { text: 'Using a smaller model', group: 0 },
          { text: 'Sending huge prompts every time', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Price rises are a problem for big companies, not us.',
        prompt: "Joel's best reply?",
        options: [
          { text: 'True, small teams pay nothing.', why: 'Everyone pays for compute, directly or through a provider.' },
          { text: 'So let\'s stop using AI.', why: 'Plan for it instead: a backup and lean prompts.' },
          { text: 'They reach us through every price we pay. A small team feels a 20% rise more, not less.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to what it protects against.',
        pairs: [
          ['A second provider', 'One supplier failing or rationing'],
          ['Watching the bill', 'Surprise price rises'],
          ['Smaller models', 'Paying for power you don\'t need'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A price rise in Python.',
        language: 'python',
        template: 'new_monthly = monthly * ([[1]] + rise)',
        blanks: [['1']],
        distractors: ['0', 'rise'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'monthly = 100.0\nprint(monthly * (1 + 0.5))',
        language: 'python',
        options: [
          { text: '150.0' },
          { text: '100.5', why: '1 + 0.5 is 1.5, so it\'s 100 x 1.5.' },
          { text: '50.0', why: 'That would be a 50% cut.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s plan is the riskiest?',
        lines: [
          'Use model-b for most questions.',
          'Keep prompts short.',
          'Never test any other model, so we can\'t switch.',
          'Check the bill every week.',
        ],
        bug: 2,
        fix: 'Keep a second model tested and ready.',
        explanation: 'If the only provider raises prices or goes down, Ask Rao stops.',
      },
      {
        kind: 'mcq',
        prompt: 'A 20% rise on a $1,080 bill adds how much?',
        options: [
          { text: '$20', why: '20% of 1,080 is 216.' },
          { text: '$1,296', why: 'That\'s the new total, not the extra.' },
          { text: '$216' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many companies make the EUV machines for the most advanced chips?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been caught out by depending on one supplier, one app or one person? What backup do you have now?',
    starters: ['I depended on...', 'Now my backup is...'],
  },
  deepen: {
    title: 'Concentration risk',
    summary: 'When a whole industry depends on a few suppliers, it\'s called concentration risk. The AI stack has it at the bottom (chips) and sometimes at the model layer too. Chapter 4 adds a fallback model.',
  },
  notes: 'Practice monthly GPU bill $1,080 (from Chapter 1: $1.50/h x 720 h). 1080 x 1.2 = 1296.0; extra 216. Supply concentration: few leading-edge chip designers and foundries; ASML sole EUV supplier (checked 2026-10).',
};

export default lesson;
