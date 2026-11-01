import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 — Which layer is broken? Six symptoms, six layers. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Which layer is broken?',
  summary: 'Arjun has a trick for every AI problem: name the symptom, then find the layer. "It\'s slow" and "it\'s wrong" are never the same fix. He gives Kavya and Joel six real symptoms to place.',
  minutes: 11,
  outcomes: [
    'Match common AI problems to the layer that causes them',
    'Know that the fix depends on the layer',
    'Look up a value in a Python dictionary',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Arjun\'s six symptoms, and where to look first:</p><ul><li><strong>"It made up our return policy."</strong> Data and retrieval: the model was never given the right document.</li><li><strong>"It takes 9 seconds to answer."</strong> Model or compute: a large, slow model, or busy chips.</li><li><strong>"The bill tripled this month."</strong> Model choice and orchestration: an expensive model, or huge prompts on every message.</li><li><strong>"It gave a customer the staff discount code."</strong> Orchestration: missing guardrails (Chapter 8).</li><li><strong>"It can\'t say where order R-1042 is."</strong> Orchestration and data: no tool to look orders up (Chapter 7).</li><li><strong>"Nobody knows if it\'s any good."</strong> Evaluation: no tests, no logs (Chapter 10).</li></ul><p>In Python, a <strong>dictionary</strong> stores pairs like these: a key (the symptom) and a value (the layer). <code>where["slow"]</code> looks up the value for the key <code>"slow"</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Symptom to layer',
      caption: 'A dictionary: symptom on the left, layer on the right.',
      code: 'where = {\n    "made-up facts": "Data and retrieval",\n    "slow": "Model or compute",\n    "expensive": "Model choice and orchestration",\n    "leaked a secret": "Orchestration (guardrails)",\n    "no idea if it works": "Evaluation",\n}\nprint(where["slow"])\n',
      challenge: 'Look up "made-up facts".',
    },
  ],
  apply: {
    scenario: 'Find the broken layer.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the symptom to where to look first.',
        pairs: [
          ['Made up the return policy', 'Data and retrieval'],
          ['9 seconds per answer', 'Model or compute'],
          ['Shared a secret code', 'Guardrails (orchestration)'],
          ['Nobody knows if it\'s right', 'Evaluation'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Look up the layer for "leaked a secret" and print it',
        starter: 'where = {\n    "made-up facts": "Data and retrieval",\n    "slow": "Model or compute",\n    "leaked a secret": "Orchestration (guardrails)",\n}\n',
        solution: 'where = {\n    "made-up facts": "Data and retrieval",\n    "slow": "Model or compute",\n    "leaked a secret": "Orchestration (guardrails)",\n}\nprint(where["leaked a secret"])\n',
        hint: 'where["leaked a secret"]',
        checks: [{ message: 'Print Orchestration (guardrails)', outputEquals: 'Orchestration (guardrails)' }],
      },
      {
        kind: 'mcq',
        prompt: '"It takes 9 seconds to answer." What\'s the first thing to check?',
        options: [
          { text: 'The return policy document', why: 'That affects whether it\'s right, not how fast.' },
          { text: 'How big the model is, and the compute it runs on' },
          { text: 'The colour of the chat box', why: 'The app shows the reply; the delay is usually the model.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is the problem about being right, or about being fast and cheap?',
        groups: ['Being right', 'Fast and cheap'],
        items: [
          { text: 'Made-up return policy', group: 0 },
          { text: 'Bill tripled', group: 1 },
          { text: 'Wrong order status', group: 0 },
          { text: '9 seconds to reply', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'It\'s slow AND wrong. Should I switch to a bigger model?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, bigger fixes everything.', why: 'Bigger is often slower and pricier, and still won\'t know your shop.' },
          { text: 'Switch it off.', why: 'Both problems have clear fixes in different layers.' },
          { text: 'A bigger model is usually slower. "Wrong" is probably missing facts. Fix them separately, layer by layer.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'where = {"slow": "Model or compute", "expensive": "Model choice"}\nprint(where["expensive"])',
        language: 'python',
        options: [
          { text: 'Model choice' },
          { text: 'expensive', why: 'It prints the value, not the key.' },
          { text: 'Model or compute', why: 'That\'s the value for "slow".' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a KeyError. Which line?',
        language: 'python',
        lines: ['where = {"slow": "Model or compute"}', 'print(where["Slow"])'],
        bug: 1,
        fix: 'print(where["slow"])',
        explanation: 'Keys must match exactly, capitals included.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Look up a symptom.',
        language: 'python',
        template: 'where = [[1]]"slow": "Model or compute"}\nprint(where[[[2]]])',
        blanks: [['{'], ['"slow"']],
        distractors: ['[', 'slow'],
      },
      {
        kind: 'mcq',
        prompt: '"It can\'t say where order R-1042 is." Which chapter will fix it?',
        options: [
          { text: 'Chips and clouds', why: 'Faster chips won\'t give it the order data.' },
          { text: 'Choosing a model', why: 'No model knows a live order unless it can look it up.' },
          { text: 'Tools and agents: let the assistant look orders up' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which layer would you check first for "nobody knows if it\'s any good"? (one word)',
        answers: ['evaluation', 'Evaluation'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app that annoyed you (slow, wrong, confusing). Which layer do you think was to blame?',
    starters: ['The app was...', 'I think the layer was...'],
  },
  deepen: {
    title: 'Debugging by layer',
    summary: 'Engineers fix AI systems one layer at a time: first check the facts the model was given, then the prompt and steps, then the model itself. Changing the model first is the most common, and most expensive, mistake.',
  },
  notes: 'Symptom-to-layer mapping is a teaching heuristic, not a strict rule; many problems touch more than one layer. Python dict lookup (Python tutorial 5.5).',
};

export default lesson;
