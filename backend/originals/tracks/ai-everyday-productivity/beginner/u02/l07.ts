import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: questions for people. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The questions to ask',
  summary: 'Saturday: two viewings, twenty minutes each. Some answers no AI can give: how loud the street is at 11 p.m., whether the water runs in the morning. Tey shows Lucía how AI prepares her to ask people.',
  minutes: 11,
  outcomes: [
    'Use AI to prepare questions for people, not to replace them',
    'Ask AI what you might be forgetting',
    'Bring the answers back to AI to organise them',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Two viewings, twenty minutes each. What do you want to know that no website can tell you?', replies: ['How noisy it is', 'If the landlord is nice'] },
        { tey: 'Exactly. Some answers live only in people and places. AI can\'t visit. But it\'s brilliant at preparing you to ask.', replies: ['How?'] },
        { tey: 'Try: "I\'m viewing a flat in Mexico City for 20 minutes. What should I ask the landlord and what should I check myself? Group them, most important first."', replies: ['What did it say?'] },
        { tey: 'Water pressure and supply. Noise at night. How the building did in past earthquakes and whether it\'s been checked. Who fixes things, and how fast. Phone signal in the bedroom.', replies: ['I\'d never have thought of the earthquake one'] },
        { tey: 'Then the best follow-up of all: "What am I forgetting?" And afterwards, paste your notes back in: "Organise what I found into pros, cons and still unknown."', replies: ['So it\'s before AND after'] },
        { tey: 'Before and after. The middle, the knocking on doors and the listening at 11 p.m., is yours.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'AI before: "What should I ask and check?" You in the middle: ask people, look, listen. AI after: "Organise my notes into pros, cons and unknowns."',
    },
  ],
  apply: {
    scenario: 'Preparing for Saturday\'s viewings.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Who can answer it?',
        groups: ['A person or a visit', 'AI can help'],
        items: [
          { text: 'How loud the street is at 11 p.m.', group: 0 },
          { text: 'A checklist for a viewing', group: 1 },
          { text: 'Whether the shower pressure is good', group: 0 },
          { text: 'Organising your notes afterwards', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best follow-up after the AI gives her a viewing checklist?',
        options: [
          { text: '"Thanks."', why: 'Polite, but she misses the best question.' },
          { text: '"What am I forgetting?"' },
          { text: '"Are you sure?"', why: 'That\'s not a check, and not what she needs here.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Why not just ask the AI if the building is safe?',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'It can\'t see the building. It can tell me what to ask: past earthquakes, structural checks. The landlord and the papers answer.' },
          { text: 'Good idea, I\'ll ask it.', why: 'It has no way of knowing about this building.' },
          { text: 'Safety doesn\'t matter.', why: 'In an earthquake city it matters a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order of the day.',
        template: 'AI [[1]]: what to ask. You in the middle. AI [[2]]: organise the notes.',
        blanks: [['before'], ['after']],
        distractors: ['instead', 'never'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to who answers it.',
        pairs: [
          ['"Has the building had a structural check?"', 'The landlord'],
          ['"Is it loud at night?"', 'Neighbours, or a night visit'],
          ['"Is there phone signal in the bedroom?"', 'Your own phone'],
          ['"What should I check at a viewing?"', 'AI'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s Saturday.',
        lines: ['Ask AI for a viewing checklist', 'Ask "what am I forgetting?"', 'View the flats and ask the landlord', 'Visit the street at night', 'Paste notes into AI: pros, cons, unknowns'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt organises her notes best afterwards?',
        options: [
          { text: 'Thoughts?', why: 'No task.' },
          { text: 'Which flat should I choose?', why: 'It should organise first; she decides.' },
          { text: 'Here are my notes from 2 viewings. Organise them into pros, cons and still unknown for each flat.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Finish the follow-up: "What am I ___?"',
        answers: ['forgetting', 'forgetting?'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which step hands AI a job it can\'t do?',
        lines: [
          'Ask AI what to check at a viewing.',
          'Ask AI how noisy Calle Petén is on Friday nights.',
          'Ask AI to sort my notes into pros and cons.',
        ],
        bug: 1,
        fix: 'Visit on a Friday night, or ask a neighbour.',
        explanation: 'It has no reliable way to know one street\'s noise. That\'s a job for a visit.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'How did the viewings go?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'I let the AI decide.', why: 'She used it before and after; she decided.' },
          { text: 'I didn\'t go, the AI described them.', why: 'It can\'t see them.' },
          { text: 'Flat 5\'s street is silent at 11 p.m. and the water\'s strong. AI sorted my notes; Flat 5 wins on everything but the yearly fee.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a conversation you have coming up (a doctor, a landlord, a teacher, a client)? What three questions would you ask AI to help you prepare?',
    starters: ['I\'m talking to...', 'I\'d prepare by asking...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Before your next appointment or meeting, ask an AI tool: "What should I ask, and what am I forgetting?" Afterwards, paste your notes back and ask it to sort them into decisions, questions and next steps.',
  },
  notes: 'Mexico City is earthquake-prone (e.g. 1985 and 2017); asking about structural reviews is common advice when renting there. Water supply interruptions occur in parts of the city. Calle Petén is a real street in Narvarte, used generically; no claim made about its noise.',
};

export default lesson;
