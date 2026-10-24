import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4 — From sand to chip: designers, foundries and lithography machines. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'From sand to chip',
  summary: 'Joel reads that a chip "designed in California" was "made in Taiwan" using a machine "built in the Netherlands". Three countries for one chip? Tey sorts the myths from the facts.',
  minutes: 11,
  outcomes: [
    'Tell chip designers, chip factories and machine makers apart',
    'Know the role of TSMC and ASML in AI chips',
    'Store the supply chain in a Python dictionary',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The company whose name is on an AI chip usually makes it in its own factory.',
          isFact: false,
          explain: 'Myth. Many chip companies, Nvidia among them, design chips and pay a separate factory, a "foundry", to manufacture them.',
        },
        {
          text: 'TSMC, in Taiwan, manufactures chips for many of the best-known chip designers.',
          isFact: true,
          explain: 'Fact. It is the world\'s largest contract chip maker, and many of the most advanced AI chips are made in its factories.',
        },
        {
          text: 'The most advanced chips are printed with light, using machines from a single Dutch company.',
          isFact: true,
          explain: 'Fact. The tiniest patterns are printed with extreme ultraviolet (EUV) light, and ASML, in the Netherlands, is the only maker of those machines.',
        },
        {
          text: 'Chips are made from rare metals found in only one country.',
          isFact: false,
          explain: 'Myth. The base is silicon, refined from ordinary sand. What\'s rare is the skill, the machines and the factories.',
        },
        {
          text: 'Building a new advanced chip factory takes years and costs billions of dollars.',
          isFact: true,
          explain: 'Fact. That\'s why there are so few, and why AI chips can be in short supply.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Who does what',
      caption: 'A dictionary: job on the left, an example on the right.',
      code: 'chain = {\n    "design": "Nvidia (GPUs), Google (TPUs)",\n    "manufacture": "TSMC (a foundry)",\n    "printing machines": "ASML (EUV lithography)",\n    "rent to you": "cloud providers",\n}\nfor job, who in chain.items():\n    print(f"{job}: {who}")\n',
      challenge: 'Print only who manufactures the chips.',
    },
  ],
  apply: {
    scenario: 'The chip supply chain.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the company to its job.',
        pairs: [
          ['Nvidia', 'Designs GPUs'],
          ['TSMC', 'Manufactures chips for others'],
          ['ASML', 'Makes EUV chip-printing machines'],
          ['A cloud provider', 'Rents the chips to you'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print who manufactures the chips, using the dictionary',
        starter: 'chain = {\n    "design": "Nvidia",\n    "manufacture": "TSMC",\n    "printing machines": "ASML",\n}\n',
        solution: 'chain = {\n    "design": "Nvidia",\n    "manufacture": "TSMC",\n    "printing machines": "ASML",\n}\nprint(chain["manufacture"])\n',
        hint: 'chain["manufacture"]',
        checks: [{ message: 'Print TSMC', outputEquals: 'TSMC' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is a foundry?',
        options: [
          { text: 'A company that designs chips', why: 'Designers design; foundries manufacture.' },
          { text: 'A factory that manufactures chips designed by other companies' },
          { text: 'A data centre', why: 'Data centres run chips; foundries make them.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Chips start as refined sand (silicon)', group: 1 },
          { text: 'Every chip company owns its factory', group: 0 },
          { text: 'One company makes the EUV printing machines', group: 1 },
          { text: 'New chip factories are quick and cheap to build', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Why should a shop assistant care where chips are made?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'It doesn\'t matter at all.', why: 'The supply of chips shapes prices and availability.' },
          { text: 'So we can build our own factory.', why: 'That costs billions and takes years.' },
          { text: 'Because so few places can make them, chips are scarce and expensive, and that shows up in every AI price we pay.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chain.',
        template: 'Companies [[1]] chips, foundries [[2]] them, and clouds [[3]] them to you.',
        blanks: [['design'], ['manufacture', 'make'], ['rent']],
        distractors: ['eat', 'sell'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'chain = {"design": "Nvidia", "manufacture": "TSMC"}\nprint(len(chain))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '4', why: 'len() counts the pairs, not the words.' },
          { text: 'TSMC', why: 'len() gives a number.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Joel\'s summary is wrong?',
        lines: [
          'Nvidia designs many AI GPUs.',
          'TSMC manufactures chips for other companies.',
          'ASML designs the GPUs that run Ask Rao.',
          'Cloud providers rent chips by the hour.',
        ],
        bug: 2,
        fix: 'ASML makes the machines that print chips.',
        explanation: 'ASML builds lithography machines; it doesn\'t design GPUs.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a chip\'s journey.',
        lines: ['Sand is refined into silicon', 'A company designs the chip', 'A foundry prints it with lithography machines', 'A cloud provider installs it in a data centre', 'Ask Rao rents time on it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which company makes the EUV machines that print the tiniest chip patterns?',
        answers: ['ASML'],
        placeholder: 'A company',
      },
    ],
  },
  reflect: {
    prompt: 'One chip can involve three countries and dozens of companies. What everyday object do you own that probably has a long, hidden supply chain?',
    starters: ['My... probably comes from...', 'I never thought about...'],
  },
  deepen: {
    title: 'Why chips are news',
    summary: 'Because so few companies and places can make the most advanced chips, governments treat them as a strategic resource, with export rules and new factory projects. It\'s one reason AI prices can swing.',
  },
  notes: 'Well-established: Nvidia is fabless (designs, outsources manufacturing); TSMC (Taiwan) is the largest contract chipmaker and manufactures many leading AI chips; ASML (Netherlands) is the sole supplier of EUV lithography systems; chips are made on silicon wafers refined from silica (sand); leading-edge fabs cost billions and take years. Checked 2026-10.',
};

export default lesson;
