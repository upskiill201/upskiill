import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: what leaders listen for. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What leaders listen for',
  summary: 'Carmen writes down the four questions she hears Señora Ibarra ask in almost every meeting. If Lucía answers them before they\'re asked, she won\'t be interrupted.',
  minutes: 12,
  outcomes: [
    'Know the four questions leaders usually ask',
    'Answer them before they\'re asked',
    'Prepare for a senior meeting in ten minutes',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Carmen\'s four questions',
      html: '<p>Senior leaders vary, but many ask versions of the same four questions. Carmen\'s list, from years of meetings with Señora Ibarra:</p><ol><li><strong>"What do you want from us?"</strong> A decision, approval, money, or just to inform.</li><li><strong>"Why?"</strong> The one or two reasons that matter most, with a number.</li><li><strong>"What\'s the risk?"</strong> The main thing that could go wrong, and your plan for it.</li><li><strong>"What else did you consider?"</strong> The options you rejected, and why.</li></ol><p>This works like the pyramid structure Barbara Minto taught at McKinsey: start with the answer, then give the supporting reasons, then detail only on request.</p><p>A ten-minute prep: write one line for each question. If you can\'t write one, that\'s the gap they\'ll find.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'What do you want? Why? What\'s the risk? What else did you consider? Answer all four before they ask.',
    },
  ],
  apply: {
    scenario: 'The four questions.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Carmen\'s four questions.',
        lines: ['What do you want from us?', 'Why?', 'What\'s the risk?', 'What else did you consider?'],
      },
      {
        kind: 'mcq',
        prompt: 'Who taught the pyramid structure at McKinsey?',
        options: [
          { text: 'Señora Ibarra', why: 'She\'s Nopal\'s CEO.' },
          { text: 'Carmen', why: 'Barbara Minto.' },
          { text: 'Barbara Minto' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to Lucía\'s answer.',
        pairs: [
          ['What do you want?', '"Approval to go permanent and enter Monterrey"'],
          ['Why?', '"38% above target for nine weeks"'],
          ['What\'s the risk?', '"Toluca plant at 85% capacity"'],
          ['What else?', '"A national launch, rejected as too fast"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which question does this answer?',
        groups: ['What\'s the risk?', 'What else did you consider?'],
        items: [
          { text: '"The plant could hit capacity."', group: 0 },
          { text: '"We looked at a national launch."', group: 1 },
          { text: '"Stock could run short in Guadalajara."', group: 0 },
          { text: '"We considered waiting until spring."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what percentage capacity is the Toluca plant?',
        answers: ['85', '85%'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why would they care about options I rejected?',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'It shows you thought it through. If you skip it, they\'ll ask, and you\'ll look like you didn\'t.' },
          { text: 'They don\'t. Skip it.', why: 'It shows your thinking.' },
          { text: 'To fill time.', why: 'To show your thinking.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pyramid.',
        template: 'Start with the [[1]], then the supporting [[2]].',
        blanks: [['answer'], ['reasons']],
        distractors: ['history', 'jokes'],
      },
      {
        kind: 'mcq',
        prompt: 'What does it mean if you can\'t write one line for a question?',
        options: [
          { text: 'They won\'t ask it', why: 'They probably will.' },
          { text: 'Nothing', why: 'It\'s your gap.' },
          { text: 'That\'s the gap they\'ll find' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s prep doesn\'t answer any of the four questions?',
        lines: [
          'Want: approval to go permanent.',
          'Why: 38% above target.',
          'Risk: the plant at 85%.',
          'Fun fact: the photo shoot used 400 bags of chips.',
        ],
        bug: 3,
        fix: 'Else: a national launch, rejected as too fast.',
        explanation: 'A fun fact isn\'t one of the four.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does the prep take?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'For a decision you need from someone senior, write one line for each of the four questions.',
    starters: ['Want:...', 'Risk:...'],
  },
  deepen: {
    title: 'The pyramid principle',
    summary: 'Minto\'s idea: put the main point at the top, group the supporting reasons under it, and detail under those. Listeners get the answer first and can stop whenever they\'ve heard enough.',
  },
  notes: 'Minto, The Pyramid Principle (McKinsey; book first published 1987). "Four questions": practical heuristic, not a study. Fictional: Toluca plant at 85% capacity.',
};

export default lesson;
