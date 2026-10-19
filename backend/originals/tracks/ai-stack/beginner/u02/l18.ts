import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18 — Reading a GPU spec sheet. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a GPU spec sheet',
  summary: 'A cloud provider sends Arjun a spec sheet full of numbers. Joel works out which three actually matter for Ask Rao, and which ones are there to impress.',
  minutes: 11,
  outcomes: [
    'Read the key lines of a GPU spec sheet',
    'Know which numbers matter for running a model',
    'Check a spec sheet against a model in Python',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'A practice spec sheet',
      html: '<p>Here is a made-up spec sheet for a "Practice GPU X". Real ones look like this, with many more lines.</p><ul><li><strong>Memory: 80 GB.</strong> The first thing to check: does your model fit? A 70B model at 8 bits (70 GB) does; at 16 bits (140 GB) it doesn\'t.</li><li><strong>Memory bandwidth: 3 TB/s.</strong> How fast numbers move between memory and the chip. When running a model, this often limits speed more than raw maths does, because every token needs all the weights read again.</li><li><strong>Compute: shown in TFLOPS</strong> (trillions of operations a second). Big numbers, often quoted for special number formats. Useful for training; less telling for running a chatbot.</li><li><strong>Power: 700 W.</strong> Drives electricity and cooling costs.</li><li><strong>Price: $1.50 an hour</strong> (practice). Multiply by the hours you\'ll actually keep it on.</li></ul><p><strong>For Ask Rao, read three lines first:</strong> memory (does it fit?), price (what will the month cost?), and a real speed test with your own prompts. The rest helps experts compare chips.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Check the sheet',
      caption: 'A spec sheet as a dictionary.',
      code: 'gpu = {"memory_gb": 80, "power_w": 700, "per_hour": 1.50}\nmodel_gb = 70 * 1        # 70B at 8-bit\n\nprint("Fits" if model_gb <= gpu["memory_gb"] else "Too big")\nprint(f"Month at 24/7: ${gpu[\'per_hour\'] * 720:,.2f}")\n',
      challenge: 'Try the 70B model at 16-bit (140 GB).',
    },
  ],
  apply: {
    scenario: 'Reading the spec sheet.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print "Fits" if a 140 GB model fits in the GPU\'s memory, otherwise "Too big"',
        starter: 'gpu = {"memory_gb": 80, "per_hour": 1.50}\nmodel_gb = 140\n',
        solution: 'gpu = {"memory_gb": 80, "per_hour": 1.50}\nmodel_gb = 140\nif model_gb <= gpu["memory_gb"]:\n    print("Fits")\nelse:\n    print("Too big")\n',
        hint: 'Compare model_gb with gpu["memory_gb"]',
        checks: [{ message: 'Print Too big', outputEquals: 'Too big' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the spec line to what it tells you.',
        pairs: [
          ['Memory (GB)', 'Whether the model fits'],
          ['Memory bandwidth (TB/s)', 'How fast weights reach the chip'],
          ['Power (W)', 'Electricity and cooling'],
          ['Price per hour', 'What the month will cost'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which spec line should Joel check first for Ask Rao?',
        options: [
          { text: 'Memory: if the model doesn\'t fit, nothing else matters' },
          { text: 'The biggest TFLOPS number', why: 'Impressive, but it doesn\'t tell you if the model fits.' },
          { text: 'The colour of the card', why: 'Not a spec that matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Read first for Ask Rao, or mostly for experts?',
        groups: ['Read first', 'Mostly for experts'],
        items: [
          { text: 'Memory in GB', group: 0 },
          { text: 'Price per hour', group: 0 },
          { text: 'Peak TFLOPS in a special number format', group: 1 },
          { text: 'A speed test with your own prompts', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'This GPU has twice the TFLOPS. It must answer twice as fast!',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Not necessarily. Chatbots are often limited by how fast memory feeds the chip. Only a test with our own prompts tells us.' },
          { text: 'Yes, exactly twice.', why: 'Speed in practice depends on more than TFLOPS.' },
          { text: 'TFLOPS means nothing.', why: 'It matters, especially for training. It just isn\'t the whole story.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'gpu = {"memory_gb": 80, "per_hour": 1.50}\nprint(gpu["per_hour"] * 720)',
        language: 'python',
        options: [
          { text: '1080.0' },
          { text: '80', why: 'It uses per_hour, not memory_gb.' },
          { text: '721.5', why: 'It multiplies.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read a value from the sheet.',
        language: 'python',
        template: 'gpu = {"memory_gb": 80}\nprint(gpu[[[1]]])',
        blanks: [['"memory_gb"']],
        distractors: ['memory_gb', '"80"'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s comparison misleads?',
        lines: [
          'GPU X: 80 GB, $1.50 an hour.',
          'GPU Y: 24 GB, $0.50 an hour.',
          'GPU Y is cheapest, so it\'s best for a 70B model.',
          'Both need a speed test with our prompts.',
        ],
        bug: 2,
        fix: 'A 70B model doesn\'t fit in 24 GB, so GPU Y is out for it.',
        explanation: 'Cheap doesn\'t help if the model won\'t fit.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does memory bandwidth matter for chatbots?',
        options: [
          { text: 'Every token needs the weights read again, so feeding the chip quickly sets the speed' },
          { text: 'It decides the price', why: 'It affects speed; price is a separate line.' },
          { text: 'It doesn\'t', why: 'It often limits how fast replies come out.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 70B model at 8 bits needs 70 GB. Does it fit on an 80 GB GPU? (yes or no)',
        answers: ['yes'],
        placeholder: 'yes or no',
      },
    ],
  },
  reflect: {
    prompt: 'Spec sheets, like phone adverts, lead with impressive numbers. Which numbers do you actually check before buying a phone or laptop?',
    starters: ['I check...', 'I ignore...'],
  },
  deepen: {
    title: 'Real cards',
    summary: 'Real data-centre GPUs come with around 40 to 192 GB of memory depending on the model. Always check the current sheet: the "same" chip name can come in different memory sizes.',
  },
  notes: 'Practice GPU X is made up (80 GB, 3 TB/s, 700 W, $1.50/h), shaped like real data-centre GPU sheets (e.g. Nvidia H100: 80 GB, about 3.35 TB/s on SXM, up to 700 W). LLM inference is often memory-bandwidth-bound. 70B: 8-bit 70 GB, 16-bit 140 GB.',
};

export default lesson;
