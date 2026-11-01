import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: giving autonomy safely (fixed vs free; task, time, technique, team). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Room to run, safely',
  summary: 'Miracle wants to give everyone what Bisi got: room to try things. But Afiya handles medical results, and some things really can\'t be improvised. Tey shows her how to give real freedom inside clear guardrails.',
  minutes: 12,
  outcomes: [
    'Separate what\'s fixed from what\'s free',
    'Give autonomy in more than one way',
    'Keep it safe without taking it back',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Autonomy in five steps',
      steps: [
        { title: '1. Say what\'s fixed, and why', body: '"Fixed: patient data rules, medical wording checked by Halima, and the goal: clinics live within a day." Few, clear and explained. Guardrails people understand feel like safety, not control.' },
        { title: '2. Say what\'s free', body: '"Free: how you onboard, what you say, which language, your call order." Out loud. People often don\'t take freedom unless they\'re told they have it.' },
        { title: '3. Offer more than one kind', body: 'Writer Daniel Pink describes four kinds of autonomy at work: over the task (what you do), time (when), technique (how) and team (who with). Chidi wants task. Halima wants technique. Bisi wants all four.' },
        { title: '4. Match it to experience', body: 'Bisi, four years in: wide freedom. Halima, new to tech: freedom on technique, with a buddy for the first month. More room as confidence grows.' },
        { title: '5. Agree how you\'ll stay in touch', body: '"Tell me if a clinic is stuck for more than a day. Otherwise, it\'s yours." A light check-in, agreed up front, isn\'t micromanaging.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Miracle\'s message, two ways',
      before: { label: 'Vague freedom', text: '"Feel free to try new things!" (Nobody does. They don\'t know what\'s allowed.)' },
      after: { label: 'Clear freedom', text: '"Fixed: patient data rules and checked medical wording. Free: how you onboard, the language, your call order. Stuck over a day? Tell me. Otherwise it\'s yours."' },
      notes: ['"Feel free" without limits feels risky, so people freeze.', 'Clear limits make the free part feel safe.', 'The check-in is agreed, not imposed.'],
    },
  ],
  apply: {
    scenario: 'Giving everyone room to run.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Say what\'s fixed, and why', 'Say what\'s free', 'Offer more than one kind', 'Match it to experience', 'Agree how you\'ll stay in touch'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "Feel free to try new things!" often fail?',
        options: [
          { text: 'People don\'t want freedom', why: 'Bisi wanted it badly.' },
          { text: 'It\'s too short', why: 'It\'s missing the limits.' },
          { text: 'Without clear limits, freedom feels risky, so people freeze' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed or free?',
        groups: ['Fixed', 'Free'],
        items: [
          { text: 'Patient data rules', group: 0 },
          { text: 'Which language to use', group: 1 },
          { text: 'Medical wording checked', group: 0 },
          { text: 'Your call order', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Can I really onboard Kano clinics my own way? In Hausa?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Better stick to the script for now.', why: 'Takes away the autonomy she\'s ready for.' },
          { text: 'Yes. Your way, your language. Keep patient data rules and get medical terms checked. Bisi can buddy you for the first month.' },
          { text: 'Do whatever you want.', why: 'No guardrails on medical data isn\'t safe.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Daniel Pink\'s four kinds: task, time, technique and ___. (one word)',
        answers: ['team', 'Team'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to the autonomy they want most.',
        pairs: [
          ['Chidi', 'Task: his own problem'],
          ['Halima', 'Technique: her own way'],
          ['Bisi', 'All four'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give Halima less freedom than Bisi at first?',
        options: [
          { text: 'She\'s newer to tech; freedom grows with confidence' },
          { text: 'Miracle trusts Bisi more as a person', why: 'It\'s about experience, not trust in character.' },
          { text: 'Halima doesn\'t want it', why: 'She does. On technique, she gets it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s autonomy message. Which line takes it back?',
        lines: [
          'Fixed: patient data rules and checked medical wording.',
          'Free: how you onboard, but run every change past me first.',
          'Stuck over a day? Tell me.',
        ],
        bug: 1,
        fix: 'Free: how you onboard, the language, your call order.',
        explanation: '"Free, but check everything with me" isn\'t freedom.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Few clear [[1]], lots of real [[2]].',
        blanks: [['limits', 'guardrails', 'rules'], ['freedom', 'room']],
        distractors: ['meetings', 'orders'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the light check-in.',
        tiles: ['Stuck', 'over', 'a', 'day?', 'Tell', 'me.'],
        distractors: ['hour?'],
      },
    ],
  },
  reflect: {
    prompt: 'In your work or studies, what\'s fixed and what\'s free? Has anyone ever told you clearly? Which kind of autonomy do you want most?',
    starters: ['Fixed: ...', 'Free: ...', 'I want most...'],
  },
  deepen: {
    title: 'Say the free part out loud',
    summary: 'If you lead anyone, tell them clearly: "Here\'s what\'s fixed, and here\'s what\'s yours to decide." Watch what they try.',
  },
  notes: 'Daniel H. Pink, Drive (2009): autonomy over task, time, technique and team (popular synthesis of self-determination research). Matching autonomy to readiness: situational leadership (Hersey & Blanchard). Fictional details.',
};

export default lesson;
