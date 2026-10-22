import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11 — Edge: AI on phones and small devices. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Edge: AI on phones',
  summary: 'Joel notices his phone suggests replies and edits photos with no signal at all. The AI is running on the phone itself. Could part of Ask Rao run on a customer\'s phone one day?',
  minutes: 11,
  outcomes: [
    'Explain "edge" AI: models that run on the device',
    'Know its benefits and its limits',
    'Check whether a small model fits a phone\'s budget',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'AI at the edge',
      html: '<p>"Edge" means the device at the edge of the network: your phone, laptop, car or camera, instead of a data centre.</p><p>Modern phones include chips built for AI work, often called <strong>neural processing units (NPUs)</strong>. With a small, shrunk model, a phone can do useful AI on its own: suggest replies, transcribe speech, tidy photos.</p><p><strong>Why do it on the device?</strong></p><ul><li><strong>Privacy:</strong> the text or photo never leaves the phone.</li><li><strong>Offline:</strong> it works with no signal.</li><li><strong>Speed and cost:</strong> no network trip, no per-answer bill.</li></ul><p><strong>The limits:</strong></p><ul><li>Phones have little memory to spare, so models must be <strong>small</strong>: a few billion parameters at most, usually shrunk to 4 bits.</li><li>Small models know less and reason less well than big cloud models.</li><li>Heavy use drains the battery and heats the phone.</li></ul><p>So many products mix the two: simple jobs on the device, hard ones in the cloud.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Will it fit on a phone?',
      caption: 'Suppose the phone can spare 2 GB for a model.',
      code: 'budget_gb = 2.0\nfor billions in [1, 3, 7]:\n    gb = billions * 1_000_000_000 * 0.5 / 1_000_000_000   # 4-bit\n    verdict = "fits" if gb <= budget_gb else "too big"\n    print(f"{billions}B at 4-bit: {gb} GB, {verdict}")\n',
      challenge: 'What if the phone can spare 4 GB?',
    },
  ],
  apply: {
    scenario: 'AI on the device.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'A 3B model at 4 bits (0.5 bytes each). Print "Fits" if it\'s within a 2 GB budget, otherwise "Too big"',
        starter: 'parameters = 3_000_000_000\nbudget_gb = 2.0\n',
        solution: 'parameters = 3_000_000_000\nbudget_gb = 2.0\ngb = parameters * 0.5 / 1_000_000_000\nif gb <= budget_gb:\n    print("Fits")\nelse:\n    print("Too big")\n',
        hint: 'Work out gb, then compare with budget_gb',
        checks: [
          { message: 'Print Fits', outputEquals: 'Fits' },
          { message: 'Work out 1.5 GB', expr: 'gb == 1.5' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A benefit of running AI on the device, or a limit?',
        groups: ['Benefit', 'Limit'],
        items: [
          { text: 'Works with no signal', group: 0 },
          { text: 'Only small models fit', group: 1 },
          { text: 'Data stays on the phone', group: 0 },
          { text: 'Drains the battery', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "edge" mean in "edge AI"?',
        options: [
          { text: 'The newest, most advanced AI', why: 'It\'s about where it runs, not how new it is.' },
          { text: 'Running on the user\'s own device instead of a data centre' },
          { text: 'AI at the edge of the screen', why: 'It means the edge of the network: the device.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the job to why it\'s done there.',
        pairs: [
          ['Next-word suggestions on the phone', 'Instant, and the typing stays private'],
          ['A hard returns question in the cloud', 'Needs a bigger model and the shop\'s data'],
          ['Photo tidying on the phone', 'Works with no signal'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Let\'s put the whole of Ask Rao on customers\' phones. No bill!',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Great, ship it to every phone.', why: 'Small phone models can\'t see the order system or know much.' },
          { text: 'Phones can\'t run any AI.', why: 'They can run small models.' },
          { text: 'Phones can only run small models, and the shop\'s data and orders live on our side anyway. Maybe small helpers on the phone, the real answers in the cloud.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The mix.',
        template: 'Simple jobs on the [[1]], hard ones in the [[2]].',
        blanks: [['device', 'phone'], ['cloud']],
        distractors: ['printer', 'factory'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'gb = 7 * 0.5\nprint("fits" if gb <= 2.0 else "too big")',
        language: 'python',
        options: [
          { text: 'too big' },
          { text: 'fits', why: '7 x 0.5 = 3.5 GB, more than 2.0.' },
          { text: '3.5', why: 'It prints one of the two words.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence about phone AI is wrong?',
        lines: [
          'Phones often include chips designed for AI work.',
          'Small, shrunk models can run on a phone.',
          'A phone can easily run a 70B model at full size.',
          'Running AI on the phone keeps data private.',
        ],
        bug: 2,
        fix: 'Phones can run only small models.',
        explanation: 'A 70B model at 16 bits is 140 GB, far more than a phone\'s memory.',
      },
      {
        kind: 'mcq',
        prompt: 'What are the AI chips in many phones often called?',
        options: [
          { text: 'Foundries', why: 'Foundries are chip factories.' },
          { text: 'Vector databases', why: 'Those store searchable data.' },
          { text: 'Neural processing units (NPUs)' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does NPU stand for? (neural processing ...)',
        answers: ['unit', 'neural processing unit'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which AI feature on your own phone works offline? Would you trust it more or less than a cloud version? Why?',
    starters: ['My phone can...', 'I\'d trust it...'],
  },
  deepen: {
    title: 'Hybrid by design',
    summary: 'Many products route each request: small and private on the device, big and hard to the cloud. Deciding which goes where is an orchestration choice, which you\'ll meet in Chapter 7.',
  },
  notes: 'Edge/on-device AI: NPUs in modern phones; small quantised models (around 1-3B parameters at 4-bit) are typical on-device. 3B x 0.5 B = 1.5 GB. Budget of 2 GB is an illustrative assumption, not a phone spec.',
};

export default lesson;
