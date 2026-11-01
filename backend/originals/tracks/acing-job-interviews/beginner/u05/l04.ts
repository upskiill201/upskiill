import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat with Tey: the panel, jargon, and final-round questions. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The panel',
  summary: 'Brian Otieno: "Let\'s deep-dive your value-add and see if there\'s alignment." Tey helps Remi handle a jargon-heavy panel, and choose his final-round questions.',
  minutes: 12,
  outcomes: [
    'Clarify jargon politely in an interview',
    'Answer a panel, not just one person',
    'Ask strong final-round questions',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'If you\'re not sure what a phrase means, check: "Just to be sure, by value-add do you mean what I\'d bring to the team?" It\'s confident, not ignorant.', replies: ['And there are three people on the panel.'] },
        { tey: 'Answer the person who asked, but look at all of them as you go. Learn their names and roles at the start, and use them.', replies: ['What questions should I ask at the end?'] },
        { tey: 'Final rounds are a good time for: "What would make someone really successful in this internship?" and "What\'s the team working on that interns might help with?"', replies: ['And one for Brian?'] },
        { tey: 'Ask about him: "What do you enjoy most about leading this team?" People like being asked, and his answer tells you what the culture is really like.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Clarify jargon calmly, look at the whole panel, and ask one question about success in the role and one about the interviewer.',
    },
  ],
  apply: {
    scenario: 'The panel.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Brian says "value-add". Remi isn\'t sure what he means. Best move?',
        options: [
          { text: 'Nod and answer something else', why: 'He may answer the wrong question.' },
          { text: '"I don\'t understand jargon."', why: 'Clarify politely instead.' },
          { text: '"Just to be sure, by value-add do you mean what I\'d bring to the team?"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good panel habit, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'Learning their names at the start', group: 0 },
          { text: 'Only looking at the friendliest person', group: 1 },
          { text: 'Looking around the panel as you answer', group: 0 },
          { text: 'Ignoring the quietest panellist', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it reveals.',
        pairs: [
          ['"What makes an intern really successful?"', 'What they value'],
          ['"What might interns help with?"', 'The real work'],
          ['"What do you enjoy about leading this team?"', 'The culture'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'So, if we onboard you, how do you move the needle in your first sprint?',
        prompt: "Remi's best reply?",
        options: [
          { text: '"Do you mean what I\'d deliver in my first few weeks? I\'d learn the team\'s data first, then take one small problem end to end, like checking late routes."' },
          { text: '"I\'d move many needles."', why: 'Copying jargon says nothing.' },
          { text: '"No idea."', why: 'Clarify, then answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Clarifying jargon.',
        template: '"Just to be [[1]], by value-add do you [[2]] what I\'d bring to the team?"',
        blanks: [['sure'], ['mean']],
        distractors: ['rude', 'hate'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask Brian about himself?',
        options: [
          { text: 'To flatter him into hiring you', why: 'It\'s genuine curiosity.' },
          { text: 'It\'s too personal', why: 'It\'s about his work.' },
          { text: 'People like being asked, and the answer shows the real culture' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people are on Remi\'s panel?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which of Remi\'s final-round questions should he drop?',
        lines: [
          'What would make someone really successful here?',
          'What might interns help with this quarter?',
          'How soon can I take holiday?',
          'What do you enjoy most about leading this team?',
        ],
        bug: 2,
        fix: 'How do interns get feedback here?',
        explanation: 'Holiday questions are for the offer stage.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Plain answer or jargon answer?',
        groups: ['Plain', 'Jargon'],
        items: [
          { text: '"I\'d learn the data, then fix one small problem."', group: 0 },
          { text: '"I\'d leverage synergies going forward."', group: 1 },
          { text: '"I\'d ask the team what\'s most urgent."', group: 0 },
          { text: '"I\'d circle back on low-hanging fruit."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good panel interview.',
        lines: ['Learn their names', 'Answer each question with STAR', 'Clarify jargon if needed', 'Ask your questions', 'Thank each of them'],
      },
    ],
  },
  reflect: {
    prompt: 'Write two final-round questions you\'d ask: one about success in the role, one about the interviewer.',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'Plain answers win',
    summary: 'Even when interviewers use jargon, plain, specific answers are easier to score and remember. If you want to learn the jargon, Corporate Jargon is Remi\'s next course.',
  },
  notes: 'Fictional panel with Brian Otieno (CAST.md: speaks almost entirely in jargon). Panel and question advice is common careers guidance.',
};

export default lesson;
