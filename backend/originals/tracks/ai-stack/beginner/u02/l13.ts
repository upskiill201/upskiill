import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13 — Energy and the cost of compute. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Energy and the cost of compute',
  summary: 'Joel wonders where a GPU\'s hourly price comes from. Part of it is the chip, part is the building, and a big part is electricity: data-centre GPUs draw a lot of power, all day.',
  minutes: 11,
  outcomes: [
    'Know that AI chips use a lot of electricity',
    'Work out energy: power × hours',
    'See why efficient choices are also greener choices',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One GPU, one month',
      text: 'A large data-centre GPU can draw about 700 watts when busy. Running for a month, 24 hours a day, that\'s 0.7 kW x 720 hours = 504 kWh. Cooling the room adds more. Every token you don\'t need is energy you don\'t use.',
      hotspots: [
        { phrase: 'about 700 watts', note: 'The maximum power rating of some top data-centre GPUs. A typical laptop uses a small fraction of that.' },
        { phrase: '0.7 kW x 720 hours = 504 kWh', note: 'Energy = power x time. 700 W is 0.7 kilowatts; a 30-day month is 720 hours; kWh is the unit on an electricity bill.' },
        { phrase: 'Cooling the room adds more', note: 'Data centres also spend energy keeping chips cool, so the real total is higher than the chips alone.' },
        { phrase: 'Every token you don\'t need is energy you don\'t use', note: 'Short prompts, short replies and smaller models cut cost and energy together.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Power x time',
      caption: 'Practice electricity price: $0.15 per kWh (made up).',
      code: 'power_kw = 0.7\nhours = 24 * 30\nprice_per_kwh = 0.15\n\nkwh = power_kw * hours\nprint(f"Energy: {kwh:.0f} kWh")\nprint(f"Electricity: ${kwh * price_per_kwh:.2f}")\n',
      challenge: 'What if it only ran 12 hours a day?',
    },
  ],
  apply: {
    scenario: 'The energy behind each answer.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'A 0.7 kW GPU running 720 hours. Print the energy in kWh, rounded to 1 place',
        starter: 'power_kw = 0.7\nhours = 720\n',
        solution: 'power_kw = 0.7\nhours = 720\nprint(round(power_kw * hours, 1))\n',
        hint: 'round(power_kw * hours, 1)',
        checks: [{ message: 'Print 504.0', outputEquals: '504.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'Energy is...',
        options: [
          { text: 'Power + time', why: 'Multiply: twice the hours is twice the energy.' },
          { text: 'Power x time' },
          { text: 'Power ÷ time', why: 'More time means more energy, so it\'s a multiplication.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it use more energy or less?',
        groups: ['More energy', 'Less energy'],
        items: [
          { text: 'A bigger model for every question', group: 0 },
          { text: 'Shorter replies', group: 1 },
          { text: 'Sending the whole help page every time', group: 0 },
          { text: 'A small model for simple questions', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the unit to what it measures.',
        pairs: [
          ['Watt (W)', 'Power at a moment'],
          ['Kilowatt-hour (kWh)', 'Energy over time'],
          ['Tokens per second', 'Speed of a model'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Energy is the data centre\'s problem, not ours.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'True, ignore it.', why: 'It shows up in prices and in the planet\'s energy use.' },
          { text: 'AI uses no energy.', why: 'Every calculation uses electricity.' },
          { text: 'It\'s in every price we pay, and it\'s real energy used. Lean prompts and smaller models are cheaper AND greener: no trade-off.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Energy in Python.',
        language: 'python',
        template: 'kwh = power_kw [[1]] hours\ncost = kwh [[2]] price_per_kwh',
        blanks: [['*'], ['*']],
        distractors: ['+', '/'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'kwh = 504\nprint(f"${kwh * 0.15:.2f}")',
        language: 'python',
        options: [
          { text: '$75.60' },
          { text: '$75.6', why: ':.2f shows two decimal places.' },
          { text: '$504.15', why: 'It multiplies.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Joel\'s estimate is wrong?',
        lines: [
          'The GPU draws about 0.7 kW when busy.',
          'A month is 720 hours.',
          'Energy is 0.7 + 720 = 720.7 kWh.',
          'Cooling adds more on top.',
        ],
        bug: 2,
        fix: 'Energy is 0.7 x 720 = 504 kWh.',
        explanation: 'Energy is power multiplied by time.',
      },
      {
        kind: 'mcq',
        prompt: 'Which choice cuts both the bill and the energy?',
        options: [
          { text: 'Using the biggest model for "Hi!"', why: 'That uses more of both.' },
          { text: 'Making replies longer', why: 'More tokens, more energy.' },
          { text: 'Sending only the 2 relevant help-page lines instead of the whole page' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many hours are in a 30-day month?',
        answers: ['720'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Knowing that each answer uses real energy, would you design Ask Rao differently? What would you cut first?',
    starters: ['I\'d cut...', 'Because...'],
  },
  deepen: {
    title: 'Efficiency compounds',
    summary: 'A prompt that\'s half as long, a model that\'s half the size and a reply that\'s half as long don\'t save half. Together they save most of the cost and energy.',
  },
  notes: 'Top data-centre GPUs have maximum power ratings around 700 W (e.g. Nvidia H100 SXM, up to 700 W TDP; checked 2026-10). Energy = power x time: 0.7 kW x 720 h = 504 kWh. Electricity price $0.15/kWh is a made-up practice number. Cooling (PUE > 1) adds to data-centre totals.',
};

export default lesson;
