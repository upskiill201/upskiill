import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: when not to ask AI. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'When not to ask AI',
  summary: 'Day 28. Tomás asks AI whether Abuela can take her blood-pressure pills with mezcal at the party. Lucía takes his phone away, kindly. Sort the myths from the facts about when AI is the wrong tool.',
  minutes: 11,
  outcomes: [
    'Know the situations where AI should not be your first or only source',
    'Use AI to prepare questions for professionals',
    'Keep decisions about people and relationships yours',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'In an emergency, ask AI what to do first.', isFact: false, explain: 'Call your local emergency number first (911 in Mexico and many other countries). Minutes matter more than explanations.' },
        { text: 'AI can help you understand a medicine leaflet, but questions about your own medicine belong with a doctor or pharmacist.', isFact: true, explain: 'Understanding words is fine. "Can Abuela mix her pills with mezcal?" is for her pharmacist or doctor.' },
        { text: 'For big legal or money decisions, AI can help you prepare, and a qualified professional should advise.', isFact: true, explain: 'Like the lease: AI found the clauses and the questions; a professional is for the big calls.' },
        { text: 'AI should decide relationship questions for you, like whether to forgive your brother.', isFact: false, explain: 'It can help you think it through. It doesn\'t know your brother, your history or your heart. The decision is yours.' },
        { text: 'Anything you type into an AI chat stays completely private.', isFact: false, explain: 'Chats may be stored or reviewed depending on the tool and settings. Placeholders, always.' },
        { text: 'If it really matters and you can\'t check it, don\'t rely on AI alone.', isFact: true, explain: 'The simplest rule in the course. Fast is good. Checked is better. Uncheckable and important needs a person.' },
      ],
    },
    {
      kind: 'story',
      title: 'Day 28, the hotel lobby in Oaxaca',
      beats: [
        { speaker: 'tomas', text: '(on a video call) I asked AI about Abuela\'s pills and mezcal. It said "in moderation".' },
        { speaker: 'lucia', text: 'Tomás, I love you, but Abuela\'s pharmacist is two streets away. I\'m asking her.' },
        { speaker: 'tey', text: 'The pharmacist said: no mezcal with those pills. Some questions have a person whose job is to answer them.' },
      ],
    },
  ],
  apply: {
    scenario: 'When AI is the wrong tool.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'AI is fine to start with, or ask a person first?',
        groups: ['AI is fine', 'A person first'],
        items: [
          { text: 'Ideas for the party playlist', group: 0 },
          { text: 'Abuela\'s pills and alcohol', group: 1 },
          { text: 'A guest collapses', group: 1 },
          { text: 'Questions to ask the pharmacist', group: 0 },
          { text: 'Whether a contract is legally sound', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A guest faints at the party. What\'s the first step?',
        options: [
          { text: 'Call the emergency number (911 in Mexico) and follow their instructions' },
          { text: 'Ask AI what fainting means', why: 'Minutes matter. Call first.' },
          { text: 'Post in the family group chat', why: 'Call the emergency number first.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'But the AI said "in moderation". That sounds reasonable.',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'True, it does.', why: 'Reasonable-sounding isn\'t the same as right for Abuela.' },
          { text: 'Reasonable for whom? It doesn\'t know her pills or her health. The pharmacist does, and she said no.' },
          { text: 'AI is always wrong about health.', why: 'It can explain things; it can\'t advise on her medicine.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The simplest rule.',
        template: 'If it really [[1]] and you can\'t [[2]] it, don\'t rely on AI alone.',
        blanks: [['matters'], ['check']],
        distractors: ['rhymes', 'spell'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is a good use of AI before Abuela\'s pharmacy visit?',
        options: [
          { text: 'Can Abuela drink mezcal with her pills?', why: 'That\'s the pharmacist\'s question.' },
          { text: 'What should I ask a pharmacist about an older relative\'s blood-pressure medicine and a party with alcohol?' },
          { text: 'Which pills should Abuela stop taking?', why: 'Only her doctor can answer that.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which use of AI is the wrong one?',
        lines: [
          'Asking AI to decide whether to forgive Mateo for the memes.',
          'Asking AI for questions to ask a lawyer.',
          'Asking AI to explain a word in a medicine leaflet.',
        ],
        bug: 0,
        fix: 'Use AI to think it through; decide yourself.',
        explanation: 'Relationship decisions need your history and your heart. AI has neither.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to who answers it.',
        pairs: [
          ['A guest collapses', 'Emergency services'],
          ['Pills and alcohol', 'A pharmacist or doctor'],
          ['A big contract', 'A lawyer or advice service'],
          ['Party playlist ideas', 'AI'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the emergency number in Mexico? (A number.)',
        answers: ['911'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'So when do you NOT use AI?',
        prompt: 'Lucía\'s short list?',
        options: [
          { text: 'Never use it for anything personal.', why: 'She used it for her speech, carefully.' },
          { text: 'I always use it.', why: 'Not for emergencies or her grandmother\'s medicine.' },
          { text: 'Emergencies, my own health and medicine, big legal or money calls without a professional, and decisions about people I love.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the healthy role for AI in serious matters?',
        options: [
          { text: 'Preparing your questions and understanding the words, then a qualified person advises' },
          { text: 'Making the decision', why: 'Not for serious matters.' },
          { text: 'No role at all', why: 'It can help you prepare.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a question you\'ve asked AI (or the internet) that really belonged with a professional? Who should you have asked?',
    starters: ['I asked...', 'I should have asked...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Save your local emergency number in your phone if it isn\'t already. Then, before your next appointment with a doctor, pharmacist or advisor, ask AI: "What questions should I ask about [topic]?"',
  },
  notes: '911 is Mexico\'s national emergency number (since 2017). Mixing alcohol with some blood-pressure medicines can cause problems; the lesson defers to a pharmacist and gives no medical advice. Playbook §9: health topics stay practical and point to professionals.',
};

export default lesson;
