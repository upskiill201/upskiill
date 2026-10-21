import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 2 — asking good research questions. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Asking good research questions',
  summary: '"Should we launch in Ghana?" is too big to research. Break it into questions you can actually answer.',
  minutes: 12,
  outcomes: [
    'Break a big question into smaller research questions',
    'Make questions specific and answerable',
    'Use AI to find questions you missed',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From one big question to six good ones',
      steps: [
        { title: '1. Write the decision', body: '"Launch in Ghana next, or not?" Research serves a decision.' },
        { title: '2. List what would change the decision', body: 'Customers, competitors, rules, costs, partners, risks.' },
        { title: '3. Turn each into a specific question', body: '"How many small businesses in Accra already use mobile money?" not "What about customers?"' },
        { title: '4. Add how you\'d know', body: '"Source: central bank or telecom regulator data." If you can\'t name a kind of source, the question is too vague.' },
        { title: '5. Ask AI what\'s missing', body: '"Here are my questions for this decision. What important questions am I missing?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Good research questions are specific, answerable, and linked to the decision. If you can\'t say where the answer would come from, sharpen it.',
    },
  ],
  apply: {
    scenario: 'Ada is breaking down Lucía\'s question.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['Write the decision', 'List what would change it', 'Make specific questions', 'Add how you\'d know', 'Ask AI what\'s missing'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific research question, or too vague?',
        groups: ['Specific', 'Too vague'],
        items: [
          { text: 'What licence does a payments company need in Ghana?', group: 0 },
          { text: 'What about the rules?', group: 1 },
          { text: 'Which three apps lead mobile payments in Accra?', group: 0 },
          { text: 'Is Ghana good?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with the decision?',
        options: [
          { text: 'It tells you which questions matter and when to stop' },
          { text: 'It makes the report longer', why: 'It keeps research focused.' },
          { text: 'It doesn\'t matter where you start', why: 'Without a decision, research never ends.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the area to a specific question.',
        pairs: [
          ['Customers', 'How many small businesses in Accra use mobile money?'],
          ['Competitors', 'Which apps do they use now, and why?'],
          ['Rules', 'What licence would we need?'],
          ['Costs', 'What would a 6-month pilot cost?'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best finds Ada\'s blind spots?',
        options: [
          { text: 'Are my questions good?', why: 'Invites "yes".' },
          { text: 'Here are my six research questions for deciding whether to launch in Ghana next. What important questions am I missing? Rank them by how much they could change the decision.' },
          { text: 'Write 50 questions.', why: 'Quantity without priority.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Good research questions are [[1]], answerable, and linked to the [[2]].',
        blanks: [['specific'], ['decision']],
        distractors: ['long', 'weather'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why are you asking about licences? I only care if customers will want it.',
        prompt: 'Best reply?',
        options: [
          { text: 'If we can\'t get a licence in time, customer demand won\'t matter. It could change the decision, so it\'s on the list.' },
          { text: 'You\'re right, I\'ll drop it.', why: 'It could block the launch.' },
          { text: 'The AI told me to.', why: 'Explain why it matters to the decision.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which question is too vague to research?',
        lines: [
          'How many small businesses in Accra use mobile money?',
          'What licence do we need?',
          'What is the vibe in Ghana?',
          'What would a 6-month pilot cost?',
        ],
        bug: 2,
        fix: 'What do small business owners in Accra say they dislike about current payment apps?',
        explanation: '"Vibe" has no clear answer or source.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'If you can\'t name where the answer would come from, the question is too ... (one word)',
        answers: ['vague', 'broad', 'big'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Would this change the launch decision?',
        groups: ['Could change it', 'Unlikely to'],
        items: [
          { text: 'Whether a licence takes 2 months or 2 years', group: 0 },
          { text: 'The colour of competitors\' logos', group: 1 },
          { text: 'Whether small shops already use a free app', group: 0 },
          { text: 'The weather in Accra in June', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s blind-spot question.',
        tiles: ['What', 'important', 'questions', 'am', 'I', 'missing?'],
        distractors: ['good'],
      },
      {
        kind: 'mcq',
        prompt: 'What should each question have next to it?',
        options: [
          { text: 'Where the answer would come from' },
          { text: 'A guess at the answer', why: 'Name the source type instead.' },
          { text: 'A deadline only', why: 'Name the source type.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Take a big question at work. Write three specific research questions and where you\'d find each answer.',
    starters: ['The big question:', 'Question 1:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI "What questions am I missing?" about a decision you\'re facing. Keep the two most important.' },
  notes: 'General research practice. Example questions are illustrative.',
};

export default lesson;
